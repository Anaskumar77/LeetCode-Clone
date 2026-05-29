package com.leetcode.clone.Auth.dto;

import java.util.UUID;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseUserDto {

    @NotBlank
    private UUID id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @Nullable
    private String imgUrl;

    @Nullable
    private String createdAt;

    @Nullable
    private String updatedAt;

}
