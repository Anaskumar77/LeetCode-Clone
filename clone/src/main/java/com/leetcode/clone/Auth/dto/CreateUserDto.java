package com.leetcode.clone.Auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateUserDto {

    @NotBlank(message = "Name must include a value")
    private String name;

    @NotBlank(message = "Email must include a value")
    @Email(message = "Invalid Email format")
    private String email;

    @NotBlank(message = "Password must include a value")
    private String password;

}