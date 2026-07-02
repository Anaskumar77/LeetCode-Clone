package com.leetcode.clone.Problem;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.leetcode.clone.Problem.dto.AddTestCaseResponseDto;
import com.leetcode.clone.Problem.dto.BulkTestCaseUploadDto;
import com.leetcode.clone.Problem.dto.CategoryCountDto;
import com.leetcode.clone.Problem.dto.CreateProblemDto;
import com.leetcode.clone.Problem.dto.CreateProblemResponseDto;
import com.leetcode.clone.Problem.dto.CreateTestCaseDto;
import com.leetcode.clone.Problem.dto.DifficultyEnum;
import com.leetcode.clone.Problem.dto.ParamDto;
import com.leetcode.clone.Problem.dto.ProblemResponse;
import com.leetcode.clone.Problem.dto.ProblemStatus;
import com.leetcode.clone.Problem.dto.TestCaseItemDto;
import com.leetcode.clone.Problem.dto.TestCaseResponse;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.models.TestCase;
import com.leetcode.clone.Problem.repository.ProblemRepository;
import com.leetcode.clone.Problem.repository.TestCaseRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepo;
    private final TestCaseRepository testCaseRepo;
    private final ObjectMapper objectMapper;

    public CreateProblemResponseDto createProblem(CreateProblemDto req) {
        try {
            String validationError = validateCreateRequest(req);
            if (validationError != null) {
                log.warn("Invalid create problem request: {}", validationError);
                return failure(ProblemStatus.INVALID_REQUEST, validationError);
            }

            if (problemRepo.existsBySlug(req.slug())) {
                log.warn("Duplicate problem slug rejected: {}", req.slug());
                return failure(ProblemStatus.PROBLEM_ALREADY_EXISTS,
                        "A problem with slug '" + req.slug() + "' already exists");
            }

            // Serialize params list to JSON string for storage
            String paramsJson = null;
            if (req.params() != null && !req.params().isEmpty()) {
                try {
                    paramsJson = objectMapper.writeValueAsString(req.params());
                } catch (Exception e) {
                    log.warn("Could not serialize params: {}", e.getMessage());
                }
            }

            ProblemEntity problem = ProblemEntity.builder()
                    .title(req.title())
                    .slug(req.slug())
                    .description(req.description())
                    .difficulty(req.difficulty())
                    .timeLimit(req.timeLimit())
                    .memoryLimit(req.memoryLimit())
                    .starterCode(req.starterCode())
                    .functionName(req.functionName())
                    .returnType(req.returnType())
                    .params(paramsJson)
                    .driverImports(req.driverImports())
                    .driverCode(req.driverCode())
                    .categories(req.categories() != null ? req.categories() : new ArrayList<>())
                    .testCases(new ArrayList<>())
                    .build();

            ProblemEntity saved = problemRepo.save(problem);
            log.info("Problem created successfully: id={}, slug={}", saved.getId(), saved.getSlug());

            return CreateProblemResponseDto.builder()
                    .success(true)
                    .message(ProblemStatus.PROBLEM_CREATED)
                    .problem(toProblemResponse(saved))
                    .build();

        } catch (DataIntegrityViolationException ex) {
            log.warn("Duplicate problem constraint violation for slug={}", req.slug(), ex);
            return failure(ProblemStatus.PROBLEM_ALREADY_EXISTS,
                    "A problem with slug '" + req.slug() + "' already exists");

        } catch (Exception ex) {
            log.error("Unexpected error while creating problem slug={}", req != null ? req.slug() : null, ex);
            return failure(ProblemStatus.PROBLEM_CREATION_FAILED,
                    "An unexpected error occurred while creating the problem");
        }
    }

    private String validateCreateRequest(CreateProblemDto req) {
        if (req == null) {
            return "Request body is required";
        }
        if (req.title() == null || req.title().isBlank()) {
            return "Title is required";
        }
        if (req.slug() == null || req.slug().isBlank()) {
            return "Slug is required";
        }
        if (req.difficulty() == null) {
            return "Difficulty is required";
        }
        return null;
    }

    private CreateProblemResponseDto failure(ProblemStatus status, String error) {
        return CreateProblemResponseDto.builder()
                .success(false)
                .message(status)
                .error(error)
                .problem(null)
                .build();
    }

    public List<CategoryCountDto> getCategoryCounts() {
        return problemRepo.countProblemsByCategory();
    }

    public List<String> getAllCategories() {
        return problemRepo.findAllDistinctCategories();
    }

    public List<ProblemResponse> getProblems(int page, int size, String difficulty) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ProblemEntity> problems;

        if (difficulty == null || difficulty.isBlank()) {
            problems = problemRepo.findAll(pageable);
        } else {
            DifficultyEnum difficultyEnum = DifficultyEnum.valueOf(difficulty.trim().toUpperCase());

            problems = problemRepo.findByDifficulty(difficultyEnum, pageable);
        }

        return problems.getContent().stream()
                .map(this::toProblemResponse)
                .toList();

    }

    public ProblemResponse getSpecificProblem(UUID id) {

        ProblemEntity problem = problemRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Problem not found"));

        return toProblemResponse(problem);

    }

    private ProblemResponse toProblemResponse(ProblemEntity entity) {
        // Deserialize params JSON string back to List<ParamDto>
        List<ParamDto> paramsList = Collections.emptyList();
        if (entity.getParams() != null && !entity.getParams().isBlank()) {
            try {
                paramsList = objectMapper.readValue(entity.getParams(), new TypeReference<List<ParamDto>>() {
                });
            } catch (Exception e) {
                log.warn("Could not deserialize params for problem {}: {}", entity.getId(), e.getMessage());
            }
        }

        return ProblemResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .description(entity.getDescription())
                .difficulty(entity.getDifficulty())
                .timeLimit(entity.getTimeLimit())
                .memoryLimit(entity.getMemoryLimit())
                .starterCode(entity.getStarterCode())
                .functionName(entity.getFunctionName())
                .returnType(entity.getReturnType())
                .params(paramsList)
                .driverImports(entity.getDriverImports())
                .driverCode(entity.getDriverCode())
                .categories(entity.getCategories())
                .build();
    }

    public String deleteProblem(UUID id) {
        if (!problemRepo.existsById(id)) {
            log.warn("Delete problem failed: problem not found id={}", id);
            throw new ProblemNotFoundException("Problem not found for id: " + id);
        }

        problemRepo.deleteById(id);
        log.info("Problem deleted successfully: id={}", id);
        return "Problem deleted successfully";
    }

    @Transactional
    public void deleteAll() {
        problemRepo.deleteAll();
        log.info("All problems deleted successfully");
    }

    public AddTestCaseResponseDto addTestCases(CreateTestCaseDto req) {
        try {
            String validationError = validateTestCaseRequest(req);
            if (validationError != null) {
                log.warn("Invalid add test case request: {}", validationError);
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.INVALID_REQUEST)
                        .error(validationError)
                        .build();
            }

            ProblemEntity problem = problemRepo.findById(req.getProblem()).orElse(null);
            if (problem == null) {
                log.warn("Add test case failed: problem not found id={}", req.getProblem());
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.PROBLEM_NOT_FOUND)
                        .error("Problem not found for id: " + req.getProblem())
                        .build();
            }

            TestCase testCase = TestCase.builder()
                    .problem(problem)
                    .input(req.getInput())
                    .expectedOutput(req.getExpectedOutput())
                    .isSample(req.isSample())
                    .orderIndex(req.getOrderIndex())
                    .build();

            TestCase saved = testCaseRepo.save(testCase);
            log.info("Test case added: id={}, problemId={}, orderIndex={}",
                    saved.getId(), problem.getId(), saved.getOrderIndex());

            return AddTestCaseResponseDto.builder()
                    .success(true)
                    .message(ProblemStatus.TEST_CASE_ADDED)
                    .testCase(toTestCaseResponse(saved))
                    .build();
        } catch (Exception ex) {
            log.error("Unexpected error while adding test case for problem={}",
                    req != null ? req.getProblem() : null, ex);
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.TEST_CASE_CREATION_FAILED)
                    .error("An unexpected error occurred while creating the test case")
                    .build();
        }
    }

    public String deleteTestCase(UUID id) {
        return "hello";
    }

    /**
     * Accepts a single JSON body containing a problem UUID and a list of test
     * cases.
     */
    @Transactional
    public AddTestCaseResponseDto addTestCasesBulk(BulkTestCaseUploadDto upload) {
        if (upload == null || upload.getTestCases() == null || upload.getTestCases().isEmpty()) {
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.INVALID_REQUEST)
                    .error("Request must contain a problem ID and at least one test case")
                    .build();
        }

        UUID problemId = upload.getProblem();
        ProblemEntity problem = problemRepo.findById(problemId).orElse(null);
        if (problem == null) {
            log.warn("Bulk add test case failed: problem not found id={}", problemId);
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.PROBLEM_NOT_FOUND)
                    .error("Problem not found for id: " + problemId)
                    .build();
        }

        // Validate each item before touching the DB
        List<TestCaseItemDto> items = upload.getTestCases();
        for (int i = 0; i < items.size(); i++) {
            TestCaseItemDto item = items.get(i);
            if (item.getInput() == null) {
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.INVALID_REQUEST)
                        .error("Item at index " + i + ": input is required")
                        .build();
            }
            if (item.getExpectedOutput() == null) {
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.INVALID_REQUEST)
                        .error("Item at index " + i + ": expectedOutput is required")
                        .build();
            }
            if (item.getOrderIndex() < 0) {
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.INVALID_REQUEST)
                        .error("Item at index " + i + ": orderIndex must be >= 0")
                        .build();
            }
        }

        try {
            ProblemEntity finalProblem = problem;
            List<TestCase> testCases = items.stream()
                    .map(item -> TestCase.builder()
                            .problem(finalProblem)
                            .input(item.getInput())
                            .expectedOutput(item.getExpectedOutput())
                            .isSample(item.isSample())
                            .orderIndex(item.getOrderIndex())
                            .build())
                    .toList();

            List<TestCase> saved = testCaseRepo.saveAll(testCases);
            log.info("Bulk test case add: {} test cases saved for problemId={}", saved.size(), problemId);

            List<TestCaseResponse> responses = saved.stream()
                    .map(this::toTestCaseResponse)
                    .toList();

            return AddTestCaseResponseDto.builder()
                    .success(true)
                    .message(ProblemStatus.TEST_CASE_ADDED)
                    .testCases(responses)
                    .build();

        } catch (Exception ex) {
            log.error("Unexpected error during bulk test case save for problemId={}", problemId, ex);
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.TEST_CASE_CREATION_FAILED)
                    .error("An unexpected error occurred while saving test cases")
                    .build();
        }
    }

    @Transactional
    public AddTestCaseResponseDto addTestCasesBulk(List<CreateTestCaseDto> requests) {
        if (requests == null || requests.isEmpty()) {
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.INVALID_REQUEST)
                    .error("Request list must not be empty")
                    .build();
        }

        // Validate each item upfront before touching the DB
        for (int i = 0; i < requests.size(); i++) {
            String error = validateTestCaseRequest(requests.get(i));
            if (error != null) {
                log.warn("Bulk add test case: validation failed at index {}: {}", i, error);
                return AddTestCaseResponseDto.builder()
                        .success(false)
                        .message(ProblemStatus.INVALID_REQUEST)
                        .error("Item at index " + i + ": " + error)
                        .build();
            }
        }

        // Resolve problem once — all items must share the same problemId
        UUID problemId = requests.get(0).getProblem();
        ProblemEntity problem = problemRepo.findById(problemId).orElse(null);
        if (problem == null) {
            log.warn("Bulk add test case failed: problem not found id={}", problemId);
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.PROBLEM_NOT_FOUND)
                    .error("Problem not found for id: " + problemId)
                    .build();
        }

        try {
            List<TestCase> testCases = requests.stream()
                    .map(req -> TestCase.builder()
                            .problem(problem)
                            .input(req.getInput())
                            .expectedOutput(req.getExpectedOutput())
                            .isSample(req.isSample())
                            .orderIndex(req.getOrderIndex())
                            .build())
                    .toList();

            List<TestCase> saved = testCaseRepo.saveAll(testCases);
            log.info("Bulk test case add: {} test cases saved for problemId={}", saved.size(), problemId);

            List<TestCaseResponse> responses = saved.stream()
                    .map(this::toTestCaseResponse)
                    .toList();

            return AddTestCaseResponseDto.builder()
                    .success(true)
                    .message(ProblemStatus.TEST_CASE_ADDED)
                    .testCases(responses)
                    .build();

        } catch (Exception ex) {
            log.error("Unexpected error during bulk test case save for problemId={}", problemId, ex);
            return AddTestCaseResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.TEST_CASE_CREATION_FAILED)
                    .error("An unexpected error occurred while saving test cases")
                    .build();
        }
    }

    public List<TestCaseResponse> getTestCasesForProblem(UUID problemId) {
        if (problemId == null) {
            throw new IllegalArgumentException("problemId must not be null");
        }
        List<TestCase> testCases = testCaseRepo.findByProblemIdOrderByOrderIndexAsc(problemId);
        return testCases.stream()
                .map(this::toTestCaseResponse)
                .toList();
    }

    private String validateTestCaseRequest(CreateTestCaseDto req) {
        if (req == null) {
            return "Request body is required";
        }
        if (req.getProblem() == null) {
            return "problem is required";
        }
        if (req.getInput() == null) {
            return "input is required";
        }
        if (req.getExpectedOutput() == null) {
            return "expectedOutput is required";
        }
        if (req.getOrderIndex() < 0) {
            return "orderIndex must be greater than or equal to 0";
        }
        return null;
    }

    private TestCaseResponse toTestCaseResponse(TestCase entity) {
        return TestCaseResponse.builder()
                .id(entity.getId())
                .problemId(entity.getProblem().getId())
                .input(entity.getInput())
                .expectedOutput(entity.getExpectedOutput())
                .isSample(entity.isSample())
                .orderIndex(entity.getOrderIndex())
                .build();
    }

}
