package com.leetcode.clone.Problem.dto;

import java.util.UUID;

import lombok.Builder;

@Builder
public record ProblemResponse(
        UUID id,
        String title,
        String slug,
        String description,
        DifficultyEnum difficulty,
        int timeLimit,
        int memoryLimit,
        String starterCode) {
}