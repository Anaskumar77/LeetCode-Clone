package com.leetcode.clone.Auth.dto;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

public class RegisterResponseDto {
    
    @NotBlank
    private Boolean success;

    @Nullable
    private ResponseUserDto user;

}
