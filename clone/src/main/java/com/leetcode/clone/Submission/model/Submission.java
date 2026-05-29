package com.leetcode.clone.Submission.model;


import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.*;

@Entity
@Table(name = "submissions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private UUID problemId;
    private UUID userId;

    @Column(columnDefinition = "TEXT")
    private String sourceCode;

    private String language;     // "python", "javascript"

    // Final verdict
    private String status;       // ACCEPTED, WRONG_ANSWER, TLE, RUNTIME_ERROR

    private int totalTestCases;
    private int passedTestCases;

    private Long executionTimeMs;  // slowest test case time

    private LocalDateTime submittedAt;

    // Individual test case results stored as JSON
    @OneToMany(mappedBy = "submission", cascade = CascadeType.ALL)
    private List<TestCaseResult> testCaseResults;
}
