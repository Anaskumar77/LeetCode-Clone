package com.leetcode.clone.Execution.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExecutionResult {

    // "ACCEPTED", "WRONG_ANSWER", "TIME_LIMIT_EXCEEDED", "RUNTIME_ERROR", "COMPILE_ERROR"
    private String status;

    private String stdout;
    private String stderr;

    private Long executionTimeMs;

    // per test case
    private boolean passed;
    private String expectedOutput;
    private String actualOutput;
}