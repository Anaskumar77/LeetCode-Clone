package com.leetcode.clone.Auth.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.leetcode.clone.Auth.model.RoleEnum;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseUserDto {

    @NotNull
    private UUID id;

    @NotBlank
    private String name;

    @Email
    @NotBlank
    private String email;

    @Nullable
    private String imgUrl;

    @Nullable
    private RoleEnum role;

    @Nullable
    private LocalDateTime createdAt;

    @Nullable
    private LocalDateTime updatedAt;

}
