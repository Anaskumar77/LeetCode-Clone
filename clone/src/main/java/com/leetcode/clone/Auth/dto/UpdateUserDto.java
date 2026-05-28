package com.leetcode.clone.Auth.dto;

import java.util.UUID;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

public class UpdateUserDto {

    @NotBlank
    private UUID id;

    @Nullable()
    private String name;

    @Nullable()
    private String email;

    @Nullable()
    private String password;

}
