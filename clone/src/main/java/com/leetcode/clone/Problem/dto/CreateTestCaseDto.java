package com.leetcode.clone.Problem.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public class CreateTestCaseDto {

    @NotBlank
    private UUID id;

    @NotBlank
    private UUID problem;

    @NotBlank
    private String input;

    @NotBlank
    private String expectedOutput;

    @NotBlank
    private boolean isSample;

    @NotBlank
    private int orderIndex; 
}

