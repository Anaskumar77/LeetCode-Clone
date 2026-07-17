package com.leetcode.clone.Submission;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.leetcode.clone.Execution.ExecutionService;
import com.leetcode.clone.Execution.dto.ExecutionRequest;
import com.leetcode.clone.Execution.dto.ExecutionResult;
import com.leetcode.clone.Problem.dto.ParamDto;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.models.TestCase;
import com.leetcode.clone.Problem.repository.ProblemRepository;
import com.leetcode.clone.Submission.dto.SubmissionDto;
import com.leetcode.clone.Submission.dto.DailyActivityDto;
import com.leetcode.clone.Submission.dto.CalendarResponseDto;
import com.leetcode.clone.Submission.repository.SubmissionRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;
import java.time.format.DateTimeFormatter;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final ExecutionService executionService;
    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    public String submit(SubmissionDto submissionDto) {
        Optional<ProblemEntity> problemOpt = problemRepository.findById(submissionDto.problemId);

        if (problemOpt.isEmpty()) {
            return "Problem not found";
        }

        ProblemEntity problem = problemOpt.get();
        List<TestCase> testCases = problem.getTestCases();

        // Parse params JSON string into List<ParamDto>
        List<ParamDto> params = null;
        if (problem.getParams() != null && !problem.getParams().isBlank()) {
            try {
                params = objectMapper.readValue(problem.getParams(), new TypeReference<List<ParamDto>>() {
                });
            } catch (Exception e) {
                // If parsing fails, leave params null — driver code won't auto-generate
            }
        }

        for (TestCase testCase : testCases) {
            ExecutionRequest request = ExecutionRequest.builder()
                    .sourceCode(submissionDto.sourceCode)
                    .stdin(testCase.getInput())
                    .expectedOutput(testCase.getExpectedOutput())
                    .timeLimitSeconds(problem.getTimeLimit())
                    .functionName(problem.getFunctionName())
                    .returnType(problem.getReturnType())
                    .params(params)
                    .driverImports(problem.getDriverImports())
                    .driverCode(problem.getDriverCode())
                    .build();

            ExecutionResult result = executionService.execute(request);

            if (!result.isPassed()) {
                return "Failed on test case: " + testCase.getOrderIndex() + ". Status: " + result.getStatus();
            }
        }

        return "All test cases passed!";
    }

    public CalendarResponseDto getCalendarData(UUID userId, int year) {
        List<Object[]> rawData = submissionRepository.findActivityCalendarByUserIdAndYear(userId, year);
        List<DailyActivityDto> days = new ArrayList<>();
        
        int currentStreak = 0;
        int maxStreak = 0;
        int totalSubmissions = 0;
        
        LocalDate prevDate = null;
        int tempStreak = 0;

        for (Object[] row : rawData) {
            String dateStr = (String) row[0];
            int count = ((Number) row[1]).intValue();
            
            days.add(new DailyActivityDto(dateStr, count));
            totalSubmissions += count;
            
            LocalDate currDate = LocalDate.parse(dateStr, DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            
            if (prevDate == null) {
                tempStreak = 1;
            } else {
                if (prevDate.plusDays(1).equals(currDate)) {
                    tempStreak++;
                } else if (!prevDate.equals(currDate)) {
                    tempStreak = 1; // reset if gap
                }
            }
            if (tempStreak > maxStreak) {
                maxStreak = tempStreak;
            }
            prevDate = currDate;
        }
        
        // Calculate current streak (if last submission was today or yesterday)
        if (prevDate != null) {
            LocalDate today = LocalDate.now();
            if (prevDate.equals(today) || prevDate.equals(today.minusDays(1))) {
                currentStreak = tempStreak;
            }
        }
        
        return CalendarResponseDto.builder()
                .days(days)
                .currentStreak(currentStreak)
                .maxStreak(maxStreak)
                .totalSubmissions(totalSubmissions)
                .build();
    }
}
