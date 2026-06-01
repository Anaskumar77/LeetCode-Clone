package com.leetcode.clone.Auth.service;



import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Auth.dto.CreateUserDto;
import com.leetcode.clone.Auth.dto.LoginDto;
import com.leetcode.clone.Auth.dto.LoginResponseDto;
import com.leetcode.clone.Auth.dto.RegisterResponseDto;
import com.leetcode.clone.Auth.dto.RegisterStatus;
import com.leetcode.clone.Auth.dto.ResponseUserDto;
import com.leetcode.clone.Auth.model.RoleEnum;
import com.leetcode.clone.Auth.model.UserEntity;
import com.leetcode.clone.Auth.repository.UserRepository;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class AuthService {

    private static final String REFRESH_TOKEN_COOKIE = "refreshToken";
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

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
                .name(userRes.getName()).createdAt(userRes.getCreatedAt()).updatedAt(userRes.getUpdatedAt()).build();

        return new RegisterResponseDto(true, RegisterStatus.USER_CREATED, responseUserDto);
    }


    public LoginResponseDto login(LoginDto req, HttpServletResponse response) {
        UserEntity user = userRepo.findByEmail(req.getEmail()).orElse(null);
        if (user == null || !passwordEncoder.matches(req.getPassword(), user.getPassword())) {
 
                return LoginResponseDto.builder()
                    .success(false)
                    .message(RegisterStatus.LOGIN_FAILED)
                    .build();
        }

        RoleEnum role = user.getRole() != null ? user.getRole() : RoleEnum.USER;
        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(role.name())
                .build();

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        setRefreshTokenCookie(response, refreshToken);

        ResponseUserDto responseUser = ResponseUserDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .imgUrl(user.getImgUrl())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();

        return LoginResponseDto.builder()
                .success(true)
                .message(RegisterStatus.LOGIN_SUCCESSFULL)
                .accessToken(accessToken)
                .user(responseUser)
                .build();
    }

    private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE, refreshToken)
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(jwtService.getRefreshExpirationSeconds())
                .sameSite("Lax")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

    }



}

