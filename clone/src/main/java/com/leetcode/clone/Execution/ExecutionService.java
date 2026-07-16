package com.leetcode.clone.Execution;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Execution.dto.ExecutionRequest;
import com.leetcode.clone.Execution.dto.ExecutionResult;

import java.io.*;
import java.nio.file.*;
import java.util.concurrent.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class ExecutionService {

    private final DriverCodeGenerator driverCodeGenerator;

    @Value("${leetcode.execution.shared-path:}")
    private String sharedPath;

    @Value("${leetcode.execution.volume-name:}")
    private String volumeName;

    private static final String DOCKER_IMAGE = "leetcode-python-runner:latest";
    private static final int DEFAULT_TIMEOUT_SECONDS = 5;

    private static final ExecutorService EXECUTOR_SERVICE = Executors.newCachedThreadPool(r -> {
        Thread t = new Thread(r);
        t.setDaemon(true);
        return t;
    });

    public ExecutionResult execute(ExecutionRequest request) {
        Path tempDir = null;
        try {
            // 1. Create a temp directory to hold the script and input
            if (sharedPath != null && !sharedPath.trim().isEmpty()) {
                Path parentDir = Paths.get(sharedPath);
                if (!Files.exists(parentDir)) {
                    Files.createDirectories(parentDir);
                }
                tempDir = Files.createTempDirectory(parentDir, "judge_");
            } else {
                tempDir = Files.createTempDirectory("judge_");
            }

            // 2. Resolve driver code:
            // Priority 1: Manual driverCode on request (override)
            // Priority 2: Auto-generate from function signature
            // Priority 3: Raw stdin/stdout mode (no driver code)
            String resolvedDriverImports = request.getDriverImports();
            String resolvedDriverCode = request.getDriverCode();

            if ((resolvedDriverCode == null || resolvedDriverCode.isBlank())
                    && request.getFunctionName() != null && !request.getFunctionName().isBlank()
                    && request.getParams() != null && !request.getParams().isEmpty()) {
                // Auto-generate from function signature
                DriverCodeGenerator.GeneratedDriver generated = driverCodeGenerator.generate(
                        request.getFunctionName(),
                        request.getParams(),
                        request.getReturnType());
                resolvedDriverImports = generated.driverImports;
                resolvedDriverCode = generated.driverCode;
            }

            // 3. Assemble script.py: driverImports + user code + driverCode
            Path scriptFile = tempDir.resolve("script.py");
            StringBuilder fullScript = new StringBuilder();

            // Part 1: Driver imports (ListNode, TreeNode class definitions)
            if (resolvedDriverImports != null && !resolvedDriverImports.isBlank()) {
                fullScript.append(resolvedDriverImports).append("\n\n");
            }

            // Part 2: User's Solution class
            fullScript.append(request.getSourceCode()).append("\n\n");

            // Part 3: Driver harness (parse input → call Solution → print result)
            if (resolvedDriverCode != null && !resolvedDriverCode.isBlank()) {
                fullScript.append(resolvedDriverCode).append("\n");
            }

            log.info("=== EXECUTING SCRIPT ===\n{}\n========================", fullScript.toString());
            Files.writeString(scriptFile, fullScript.toString());

            // 4. Write stdin to input.txt
            Path inputFile = tempDir.resolve("input.txt");
            String stdin = request.getStdin() != null ? request.getStdin() : "";
            log.info("=== STDIN ===\n{}\n=============", stdin);
            Files.writeString(inputFile, stdin);

            int timeout = request.getTimeLimitSeconds() > 0
                    ? request.getTimeLimitSeconds()
                    : DEFAULT_TIMEOUT_SECONDS;

            // 5. Run Docker container
            return runInDocker(tempDir, timeout, request.getExpectedOutput());

        } catch (Exception e) {
            log.error("Execution failed", e);
            return ExecutionResult.builder()
                    .status("RUNTIME_ERROR")
                    .stderr(e.getMessage())
                    .passed(false)
                    .build();
        } finally {
            // 6. Cleanup temp directory
            if (tempDir != null) {
                deleteDirectory(tempDir.toFile());
            }
        }
    }

    private ExecutionResult runInDocker(Path tempDir, int timeoutSeconds, String expectedOutput)
            throws IOException, InterruptedException {

        // Convert Windows path to Docker-compatible path if needed
        String mountPath = tempDir.toAbsolutePath().toString();

        // On Windows, convert C:\path to /c/path for Docker
        if (mountPath.contains(":\\")) {
            mountPath = "/" + String.valueOf(mountPath.charAt(0)).toLowerCase()
                    + mountPath.substring(2).replace("\\", "/");
        }

        String volumeMount;
        String workDir;
        if (volumeName != null && !volumeName.trim().isEmpty()) {
            volumeMount = volumeName + ":/code";
            workDir = "/code/" + tempDir.getFileName().toString();
        } else {
            volumeMount = mountPath + ":/code";
            workDir = "/code";
        }

        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run",
                "--rm",
                "--network", "none",
                "--memory", "128m",
                "--cpus", "0.5",
                "-v", volumeMount,
                "-w", workDir,
                DOCKER_IMAGE,
                // /usr/bin/time -f '%M' prints peak memory in KB to stderr
                // We use __MEM__ marker to separate it from actual program stderr
                "sh", "-c",
                "/usr/bin/time -f '__MEM__:%M' python script.py < input.txt 2>time_output.txt;" +
                        "EXIT_CODE=$?;" +
                        "cat time_output.txt >&2;" +
                        "exit $EXIT_CODE");

        pb.redirectErrorStream(false);

        long startTime = System.currentTimeMillis();
        Process process = pb.start();

        // Read stdout and stderr concurrently
        Future<String> stdoutFuture = readStreamAsync(process.getInputStream());
        Future<String> stderrFuture = readStreamAsync(process.getErrorStream());

        // Wait with timeout
        boolean finished = process.waitFor(timeoutSeconds, TimeUnit.SECONDS);
        long executionTime = System.currentTimeMillis() - startTime;

        if (!finished) {
            process.destroyForcibly();
            return ExecutionResult.builder()
                    .status("TIME_LIMIT_EXCEEDED")
                    .stderr("Time limit of " + timeoutSeconds + "s exceeded")
                    .executionTimeMs(executionTime)
                    .passed(false)
                    .build();
        }

        String stdout = "";
        String rawStderr = "";

        try {
            stdout = stdoutFuture.get(2, TimeUnit.SECONDS);
            rawStderr = stderrFuture.get(2, TimeUnit.SECONDS);
        } catch (ExecutionException | TimeoutException e) {
            log.warn("Could not read process output", e);
        }

        // Parse memory usage from stderr
        // /usr/bin/time outputs "__MEM__:1234" (peak KB) in stderr
        Long memoryUsageKb = null;
        StringBuilder cleanStderr = new StringBuilder();

        for (String line : rawStderr.split("\n")) {
            if (line.startsWith("__MEM__:")) {
                try {
                    memoryUsageKb = Long.parseLong(line.replace("__MEM__:", "").trim());
                } catch (NumberFormatException e) {
                    log.warn("Could not parse memory usage from: {}", line);
                }
            } else {
                // Keep actual program error lines
                cleanStderr.append(line).append("\n");
            }
        }

        String stderr = cleanStderr.toString().trim();
        int exitCode = process.exitValue();

        // Runtime error
        if (exitCode != 0) {
            return ExecutionResult.builder()
                    .status("RUNTIME_ERROR")
                    .stdout(stdout)
                    .stderr(stderr)
                    .executionTimeMs(executionTime)
                    .memoryUsageKb(memoryUsageKb)
                    .passed(false)
                    .build();
        }

        // Compare output
        String actualOutput = stdout.trim();
        String expected = expectedOutput != null ? expectedOutput.trim() : null;

        boolean passed = expected != null && expected.equals(actualOutput);
        String status = expected == null ? "ACCEPTED"
                : (passed ? "ACCEPTED" : "WRONG_ANSWER");

        return ExecutionResult.builder()
                .status(status)
                .stdout(stdout)
                .stderr(stderr)
                .executionTimeMs(executionTime)
                .memoryUsageKb(memoryUsageKb)
                .passed(passed)
                .actualOutput(actualOutput)
                .expectedOutput(expected)
                .build();
    }

    // Read process stream asynchronously to avoid blocking
    private Future<String> readStreamAsync(InputStream inputStream) {
        return EXECUTOR_SERVICE.submit(() -> {
            StringBuilder sb = new StringBuilder();
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(inputStream))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    sb.append(line).append("\n");
                }
            }
            return sb.toString();
        });
    }

    private void deleteDirectory(File dir) {
        if (dir.isDirectory()) {
            for (File child : dir.listFiles()) {
                deleteDirectory(child);
            }
        }
        dir.delete();
    }
}