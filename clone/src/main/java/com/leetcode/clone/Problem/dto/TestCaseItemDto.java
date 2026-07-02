package com.leetcode.clone.Problem.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class TestCaseItemDto {

    @NotNull
    private String input;

    @NotNull
    private String expectedOutput;

    @JsonProperty("isSample")
    private boolean isSample;

    @PositiveOrZero
    private int orderIndex;
}
