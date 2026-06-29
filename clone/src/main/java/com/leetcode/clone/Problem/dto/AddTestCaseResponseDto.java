package com.leetcode.clone.Problem.dto;

import java.util.List;

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
    private TestCaseResponse testCase;           // single
    private List<TestCaseResponse> testCases;   // bulk
}
