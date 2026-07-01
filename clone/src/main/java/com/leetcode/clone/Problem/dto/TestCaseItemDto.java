package com.leetcode.clone.Problem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class TestCaseItemDto {

    @NotBlank
    private String input;

    @NotBlank
    private String expectedOutput;

    @JsonProperty("isSample")
    private boolean isSample;

    @PositiveOrZero
    private int orderIndex;
}
