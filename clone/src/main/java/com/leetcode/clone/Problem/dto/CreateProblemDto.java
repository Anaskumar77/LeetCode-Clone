package com.leetcode.clone.Problem.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

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
        String driverImports,
        String driverCode) {
}
