package com.leetcode.clone.Submission.dto;

import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public class SubmissionDto {

    @NotBlank
    public UUID problemId;

    @NotBlank
    public String sourceCode;
    
    @NotBlank
    public Integer languageId ;
    
}
