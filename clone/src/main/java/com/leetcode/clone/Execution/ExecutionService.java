package com.leetcode.clone.Execution;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Execution.dto.ExecutionRequest;
import com.leetcode.clone.Execution.dto.ExecutionResult;

import java.io.*;
import java.nio.file.*;
import java.util.concurrent.*;

@Slf4j
@Service
public class ExecutionService {

    private static final String DOCKER_IMAGE = "python:3.9-slim";
    private static final int DEFAULT_TIMEOUT_SECONDS = 5;

    public ExecutionResult execute(ExecutionRequest request) {
        Path tempDir = null;
        try {
            // 1. Create a temp directory to hold the script and input
            tempDir = Files.createTempDirectory("judge_");

            // 2. Write user code to script.py
            Path scriptFile = tempDir.resolve("script.py");
            Files.writeString(scriptFile, request.getSourceCode());

            // 3. Write stdin to input.txt
            Path inputFile = tempDir.resolve("input.txt");
            String stdin = request.getStdin() != null ? request.getStdin() : "";
            Files.writeString(inputFile, stdin);

            int timeout = request.getTimeLimitSeconds() > 0
                    ? request.getTimeLimitSeconds()
                    : DEFAULT_TIMEOUT_SECONDS;

            // 4. Run Docker container
            return runInDocker(tempDir, timeout, request.getExpectedOutput());

        } catch (Exception e) {
            log.error("Execution failed", e);
            return ExecutionResult.builder()
                    .status("RUNTIME_ERROR")
                    .stderr(e.getMessage())
                    .passed(false)
                    .build();
        } finally {
            // 5. Cleanup temp directory
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

        ProcessBuilder pb = new ProcessBuilder(
                "docker", "run",
                "--rm",                          // remove container after run
                "--network", "none",             // no internet access
                "--memory", "128m",              // 128MB memory limit
                "--cpus", "0.5",                 // half a CPU
                "-v", mountPath + ":/code",      // mount temp dir
                "-w", "/code",                   // working directory
                DOCKER_IMAGE,
                "sh", "-c", "python script.py < input.txt"
        );

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
        String stderr = "";

        try {
            stdout = stdoutFuture.get(2, TimeUnit.SECONDS);
            stderr = stderrFuture.get(2, TimeUnit.SECONDS);
        } catch (ExecutionException | TimeoutException e) {
            log.warn("Could not read process output", e);
        }

        int exitCode = process.exitValue();

        // Runtime error
        if (exitCode != 0) {
            return ExecutionResult.builder()
                    .status("RUNTIME_ERROR")
                    .stdout(stdout)
                    .stderr(stderr)
                    .executionTimeMs(executionTime)
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
                .passed(passed)
                .actualOutput(actualOutput)
                .expectedOutput(expected)
                .build();
    }

    // Read process stream asynchronously to avoid blocking
    private Future<String> readStreamAsync(InputStream inputStream) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        return executor.submit(() -> {
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