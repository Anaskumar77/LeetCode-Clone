package com.leetcode.clone.Problem.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Data
@Builder
@Entity
@Table(name = "test_cases")
@NoArgsConstructor
@AllArgsConstructor
public class TestCase {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "problem_id")
    private ProblemEntity problem;

    // JSON string sent as stdin to the script
    // Example: {"nums": [2, 7, 11, 15], "target": 9}
    @Column(columnDefinition = "TEXT")
    private String input;

    // Expected output string (what program should print)
    // Example: [0, 1]
    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    // Sample test cases are shown to user
    // Hidden test cases are only used for final verdict
    private boolean isSample;

    private int orderIndex; // test case #1, #2, #3...
}