package com.leetcode.clone.Auth.dto;

import java.util.UUID;

import jakarta.annotation.Nullable;
import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class ResponseUserDto {
    
    private UUID id;
    private String name;

    @Email
    private String email;

    @Nullable
    private String imgUrl;

    @Nullable
    private String createdAt;

    @Nullable
    private String updatedAt;

}
