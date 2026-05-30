package com.leetcode.clone.Auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Auth.dto.CreateUserDto;
import com.leetcode.clone.Auth.dto.RegisterResponseDto;
import com.leetcode.clone.Auth.dto.RegisterStatus;
import com.leetcode.clone.Auth.dto.ResponseUserDto;
import com.leetcode.clone.Auth.model.UserEntity;
import com.leetcode.clone.Auth.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;

    private final PasswordEncoder passwordEncoder;

    public RegisterResponseDto register(CreateUserDto userDto) {

        if (userRepo.existsByEmail(userDto.getEmail())) {
            return new RegisterResponseDto(false, RegisterStatus.USER_ALREADY_EXISTS, null);
        }
        UserEntity user = UserEntity.builder()
                .email(userDto.getEmail())
                .name(userDto.getName()).password(passwordEncoder.encode(userDto.getPassword())).build();

        UserEntity userRes = userRepo.save(user);

        ResponseUserDto responseUserDto = ResponseUserDto.builder()
                .id(userRes.getId())
                .email(userRes.getEmail())
                .name(userRes.getName()).build();

        return new RegisterResponseDto(true, RegisterStatus.USER_CREATED, responseUserDto);

    }

    // public LoginResponseDto login(LoginDto loginDto) {

    // if (!userRepo.existsByEmail(loginDto.getEmail())) {
    // return new LoginResponseDto(false, RegisterStatus.USER_DOES_NOT_EXIST, null,
    // null);
    // }

    // // create access and refresh token

    // // return new LoginResponseDto(true,RegisterStatus.LOGIN_SUCCESSFULL,)

    // }

}