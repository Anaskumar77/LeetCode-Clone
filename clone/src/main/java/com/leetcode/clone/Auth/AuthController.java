package com.leetcode.clone.Auth;

import com.leetcode.clone.Auth.dto.CreateUserDto;
import com.leetcode.clone.Auth.dto.LoginDto;
import com.leetcode.clone.Auth.dto.RegisterResponseDto;
import com.leetcode.clone.Auth.repository.UserRepository;
import com.leetcode.clone.Auth.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
class AuthController {

    private final UserRepository userRepo;

    private final AuthService authService;

    @GetMapping("/great")
    public String Great() {
        return "Hello from Great";
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody CreateUserDto reqBody) {
        return ResponseEntity.ok(authService.register(reqBody));
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        return "Login";
    }

    @GetMapping("/me")
    public String me(@RequestParam String userId) {
        return "/me";
    }

    @PostMapping("/refresh")
    public String refresh(@RequestBody String entity) {
        return "/refres";
    }

}