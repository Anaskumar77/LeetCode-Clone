package com.leetcode.clone.Problem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CreateProblemDto(
        @NotBlank(message = "Title is required")
        String title,
        @NotBlank(message = "Slug is required")
        String slug,
        String description,
        @NotNull(message = "Difficulty is required")
        DifficultyEnum difficulty,
        int timeLimit,
        int memoryLimit,
        String starterCode,
        // Function signature for auto driver code generation
        String functionName,
        String returnType,
        List<ParamDto> params,
        // Optional manual override — if set, takes priority over auto-generation
        String driverImports,
        String driverCode,
        List<String> categories) {
}
