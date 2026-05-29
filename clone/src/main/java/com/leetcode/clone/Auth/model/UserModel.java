package com.leetcode.clone.Auth.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;

public class UserModel {

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
    private RoleEntity role = RoleEntity.USER;

    @Column(nullable = true)
    private String imgUrl;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;


    // ── Solving Stats 
    private Integer totalSolved         = 0;
    private Integer easySolved          = 0;
    private Integer mediumSolved        = 0;
    private Integer hardSolved          = 0;
    private Integer totalPoints         = 0;

    private Integer totalSubmissions    = 0;
    private Integer acceptedSubmissions = 0;

    // ── Streak
    private Integer currentStreak       = 0;
    private Integer maxStreak           = 0;

    @Column(nullable = true)
    private LocalDate lastSolvedDate;

    // ── Ranking
    @Column(nullable = true) 
    private Integer globalRank;



}