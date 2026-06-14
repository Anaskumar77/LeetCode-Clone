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
        List<String> categories) {
}