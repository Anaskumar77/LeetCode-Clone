package com.leetcode.clone.Problem.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddTestCaseResponseDto {

    private boolean success;
    private ProblemStatus message;
    private String error;
    private TestCaseResponse testCase;
}
