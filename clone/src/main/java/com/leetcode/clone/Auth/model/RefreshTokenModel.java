package com.leetcode.clone.Auth.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class RefreshTokenModel {

    @Id
    private UUID id;

    @Column(nullable = false)
    private String refreshToken;

    @Column(nullable = false)
    private UUID userId;

    @Column(nullable = false)
    private Boolean isRevoked;

}
