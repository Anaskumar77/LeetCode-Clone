package com.leetcode.clone.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterResponseDto {

    private boolean success;

    private RegisterStatus message;

    private ResponseUserDto user;
}
