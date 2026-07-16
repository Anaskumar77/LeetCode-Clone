package com.leetcode.clone.Auth.service;



import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Auth.dto.CreateUserDto;
import com.leetcode.clone.Auth.dto.LoginDto;
import com.leetcode.clone.Auth.dto.LoginResponseDto;
import com.leetcode.clone.Auth.dto.RefreshTokenResponseDto;
import com.leetcode.clone.Auth.dto.RegisterResponseDto;
import com.leetcode.clone.Auth.dto.RegisterStatus;
import com.leetcode.clone.Auth.dto.ResponseUserDto;
import com.leetcode.clone.Auth.model.RoleEnum;
import com.leetcode.clone.Auth.model.UserEntity;
import com.leetcode.clone.Auth.repository.UserRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Value("${admin.secret}")
    private String adminSecret;

    private static final String REFRESH_TOKEN_COOKIE = "refreshToken";
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public RegisterResponseDto register(CreateUserDto userDto) {


        if (userRepo.existsByEmail(userDto.getEmail())) {
            return new RegisterResponseDto(false, RegisterStatus.USER_ALREADY_EXISTS, null);
        }

        
        
         RoleEnum role = (userDto.getAdminSecret() != null && userDto.getAdminSecret().equals(adminSecret))
            ? RoleEnum.ADMIN
            : RoleEnum.USER;

        UserEntity user = UserEntity.builder()
                .email(userDto.getEmail())
                .name(userDto.getName())
                .password(passwordEncoder.encode(userDto.getPassword()))
                .role(role)
                .build();

        UserEntity userRes = userRepo.save(user);

        ResponseUserDto responseUserDto = ResponseUserDto.builder()
                .id(userRes.getId())
                .email(userRes.getEmail())
                .name(userRes.getName())
                .role(userRes.getRole())
                .createdAt(userRes.getCreatedAt())
                .updatedAt(userRes.getUpdatedAt())
                .build();

        return new RegisterResponseDto(true, RegisterStatus.USER_CREATED, responseUserDto);
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
                .role(user.getRole())
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


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    public RefreshTokenResponseDto refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = extractRefreshToken(request);
        if (refreshToken == null || refreshToken.isBlank()) {
            return failedRefresh(response);
        }

        try {
            String email = jwtService.extractUsername(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);

            if (!jwtService.isTokenValid(refreshToken, userDetails)) {
                return failedRefresh(response);
            }

            String accessToken = jwtService.generateToken(userDetails);
            String newRefreshToken = jwtService.generateRefreshToken(userDetails);
            setRefreshTokenCookie(response, newRefreshToken);

            // Build user profile for the frontend
            UserEntity userEntity = userRepo.findByEmail(email).orElse(null);
            ResponseUserDto userDto = null;
            if (userEntity != null) {
                userDto = ResponseUserDto.builder()
                        .id(userEntity.getId())
                        .email(userEntity.getEmail())
                        .name(userEntity.getName())
                        .role(userEntity.getRole())
                        .imgUrl(userEntity.getImgUrl())
                        .createdAt(userEntity.getCreatedAt())
                        .updatedAt(userEntity.getUpdatedAt())
                        .build();
            }

            return RefreshTokenResponseDto.builder()
                    .success(true)
                    .message(RegisterStatus.REFRESH_TOKEN_SUCCESS)
                    .accessToken(accessToken)
                    .user(userDto)
                    .build();
        } catch (Exception e) {
            return failedRefresh(response);
        }
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    private RefreshTokenResponseDto failedRefresh(HttpServletResponse response) {
        clearRefreshTokenCookie(response);
        return RefreshTokenResponseDto.builder()
                .success(false)
                .message(RegisterStatus.REFRESH_TOKEN_FAILED)
                .build();
    }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    private String extractRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            return null;
        }
        for (Cookie cookie : cookies) {
            if (REFRESH_TOKEN_COOKIE.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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

    private void clearRefreshTokenCookie(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from(REFRESH_TOKEN_COOKIE, "")
                .httpOnly(true)
                .secure(false)
                .path("/api/auth")
                .maxAge(0)
                .sameSite("Lax")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

}

