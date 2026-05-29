package com.leetcode.clone.Auth;

import org.springframework.beans.factory.annotation.Autowired;
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
class AuthService {

    private final UserRepository userRepo;

    private final PasswordEncoder passwordEncoder;

    public RegisterResponseDto register(CreateUserDto userDto) {

        if (userRepo.existsByEmail(userDto.getEmail())) {
            return new RegisterResponseDto(false, RegisterStatus.USER_ALREADY_EXISTS, null);
        }
        UserEntity user = new UserEntity();
        user.setEmail(userDto.getEmail());
        user.setName(userDto.getName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        UserEntity userRes = userRepo.save(user);

        ResponseUserDto responseUserDto = ResponseUserDto.builder()
                .id(userRes.getId())
                .email(userRes.getEmail())
                .name(userRes.getName()).build();

        return new RegisterResponseDto(true, RegisterStatus.USER_CREATED, responseUserDto);

    }

}