package com.leetcode.clone.Auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenResponseDto {

    private Boolean success;

    private RegisterStatus message;

    private String accessToken;

    private ResponseUserDto user;

}
