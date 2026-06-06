
package com.leetcode.clone.Execution.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExecutionRequest {

    private String sourceCode; // user's Python code
    private String stdin; // input for the program
    private String expectedOutput; // expected output for verdict
    private int timeLimitSeconds; // default 5
}