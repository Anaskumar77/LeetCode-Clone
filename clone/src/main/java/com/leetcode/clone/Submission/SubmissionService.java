package com.leetcode.clone.Submission;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leetcode.clone.Execution.ExecutionService;
import com.leetcode.clone.Execution.dto.ExecutionRequest;
import com.leetcode.clone.Execution.dto.ExecutionResult;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.models.TestCase;
import com.leetcode.clone.Problem.repository.ProblemRepository;
import com.leetcode.clone.Submission.dto.SubmissionDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final ExecutionService executionService;
    private final ProblemRepository problemRepository;

    @Transactional
    public String submit(SubmissionDto submissionDto) {
        Optional<ProblemEntity> problemOpt = problemRepository.findById(submissionDto.problemId);

        if (problemOpt.isEmpty()) {
            return "Problem not found";
        }

        ProblemEntity problem = problemOpt.get();
        List<TestCase> testCases = problem.getTestCases();

        for (TestCase testCase : testCases) {
            ExecutionRequest request = ExecutionRequest.builder()
                    .sourceCode(submissionDto.sourceCode)
                    .stdin(testCase.getInput())
                    .expectedOutput(testCase.getExpectedOutput())
                    .timeLimitSeconds(problem.getTimeLimit())
                    .build();

            ExecutionResult result = executionService.execute(request);

            if (!result.isPassed()) {
                return "Failed on test case: " + testCase.getOrderIndex() + ". Status: " + result.getStatus();
            }
        }

        return "All test cases passed!";
    }

}
