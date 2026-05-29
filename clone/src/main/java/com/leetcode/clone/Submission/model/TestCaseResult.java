package com.leetcode.clone.Submission.model;


import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "test_case_results")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseResult {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submission_id")
    private Submission submission;

    private int testCaseIndex;     // which test case (1, 2, 3...)
    
    private boolean passed;

    @Column(columnDefinition = "TEXT")
    private String input;           // the input used

    @Column(columnDefinition = "TEXT")
    private String expectedOutput;

    @Column(columnDefinition = "TEXT")
    private String actualOutput;

    private String status;          // ACCEPTED, WRONG_ANSWER, TLE, RUNTIME_ERROR
    
    private Long executionTimeMs;
}
