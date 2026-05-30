package com.leetcode.clone.Auth.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "refresh_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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
