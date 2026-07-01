package com.leetcode.clone.Problem.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class BulkTestCaseUploadDto {

    @NotNull
    private UUID problem;

    @NotEmpty
    @Valid
    private List<TestCaseItemDto> testCases;
}
