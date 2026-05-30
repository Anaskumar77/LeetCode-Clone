package com.leetcode.clone.Problem.dto;

public record CreateProblemDto(
        String title,
        String slug,
        String description,
        DifficultyEnum difficulty,
        int timeLimit,
        int memoryLimit,
        String starterCode,
        String driverImports,
        String driverCode) {
}
