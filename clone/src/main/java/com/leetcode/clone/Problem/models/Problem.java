package com.leetcode.clone.Problem.models;

import jakarta.persistence.Entity;



import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity
@Table(name = "problems")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Problem {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;                // "Two Sum"
    private String slug;                 // "two-sum" (used in URL)
    private String description;          // full problem statement

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;       // EASY, MEDIUM, HARD

    private int timeLimit;               // seconds, default 5
    private int memoryLimit;             // MB, default 128

    // Starter code shown to user in the editor
    @Column(columnDefinition = "TEXT")
    private String starterCode;

    // Driver imports (goes at TOP of assembled script)
    @Column(columnDefinition = "TEXT")
    private String driverImports;

    // Driver code (goes at BOTTOM, parses input and calls user function)
    @Column(columnDefinition = "TEXT")
    private String driverCode;

    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestCase> testCases;

    public enum Difficulty {
        EASY, MEDIUM, HARD
    }
}