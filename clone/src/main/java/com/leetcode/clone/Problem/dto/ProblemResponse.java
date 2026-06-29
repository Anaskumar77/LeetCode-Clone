package com.leetcode.clone.Problem.dto;

import java.util.UUID;

import lombok.Builder;

import java.util.List;

@Builder
public record ProblemResponse(
        UUID id,
        String title,
        String slug,
        String description,
        DifficultyEnum difficulty,
        int timeLimit,
        int memoryLimit,
        String starterCode,
        // Function signature for auto driver code generation
        String functionName,
        String returnType,
        List<ParamDto> params,
        // Manual override driver code (if set on the problem)
        String driverImports,
        String driverCode,
        List<String> categories) {
}