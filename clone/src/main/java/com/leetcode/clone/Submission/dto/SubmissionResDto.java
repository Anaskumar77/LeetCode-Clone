package com.leetcode.clone.Submission.dto;

import java.util.List;
import java.util.UUID;


import com.leetcode.clone.Execution.dto.ExecutionResult;

import lombok.Builder;
import lombok.Data;


@Builder
@Data
public class SubmissionResDto {
    private UUID submissionId;
    private String finalStatus;      
    private Integer totalTestCases;      
    private Integer passedTestCases;    
    private List<ExecutionResult> results;    
    
}
