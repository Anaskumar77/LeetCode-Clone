package com.leetcode.clone.Problem.dto;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class CreateTestCaseDto {

    @NotNull
    private UUID problem;

    @NotBlank
    private String input;

    @NotBlank
    private String expectedOutput;

    @JsonProperty("isSample")
    private boolean isSample;

    @PositiveOrZero
    private int orderIndex; 
}

