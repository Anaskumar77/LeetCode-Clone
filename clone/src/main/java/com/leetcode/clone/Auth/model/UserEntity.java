package com.leetcode.clone.Auth.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Email
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private RoleEnum role = RoleEnum.USER;

    @Column(nullable = true)
    private String imgUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // ── Solving Stats
    @Builder.Default
    private Integer totalSolved = 0;
    @Builder.Default
    private Integer easySolved = 0;
    @Builder.Default
    private Integer mediumSolved = 0;
    @Builder.Default
    private Integer hardSolved = 0;
    @Builder.Default
    private Integer totalPoints = 0;

    @Builder.Default
    private Integer totalSubmissions = 0;
    @Builder.Default
    private Integer acceptedSubmissions = 0;

    // ── Streak
    @Builder.Default
    private Integer currentStreak = 0;
    @Builder.Default
    private Integer maxStreak = 0;

    @Column(nullable = true)
    private LocalDate lastSolvedDate;

    // ── Ranking
    @Column(nullable = true)
    private Integer globalRank;

}