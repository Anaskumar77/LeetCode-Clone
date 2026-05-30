package com.leetcode.clone.Submission.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class SubmissionDto {

    @NotNull
    public UUID problemId;

    @NotBlank
    public String sourceCode;

    @NotNull
    public Integer languageId;

}
