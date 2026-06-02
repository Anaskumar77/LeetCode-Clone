package com.leetcode.clone.Problem.dto;

import java.util.UUID;

import lombok.Builder;

@Builder
public record TestCaseResponse(
        UUID id,
        UUID problemId,
        String input,
        String expectedOutput,
        boolean isSample,
        int orderIndex) {
}
