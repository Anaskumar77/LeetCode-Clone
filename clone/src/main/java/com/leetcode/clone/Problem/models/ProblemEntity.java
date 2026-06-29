
package com.leetcode.clone.Problem.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

import com.leetcode.clone.Problem.dto.DifficultyEnum;

@Entity
@Table(name = "problems")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProblemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String title;
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Enumerated(EnumType.STRING)
    private DifficultyEnum difficulty;

    @Builder.Default
    private int timeLimit = 5;

    @Builder.Default
    private int memoryLimit = 128;

    @Column(columnDefinition = "TEXT")
    private String starterCode;

    // ─── Function Signature (for auto driver code generation) ───
    private String functionName; // e.g. "twoSum"
    private String returnType;   // e.g. "int[]", "ListNode", "bool"

    // JSON array of ParamDto: [{"name":"nums","type":"int[]"},{"name":"target","type":"int"}]
    @Column(columnDefinition = "TEXT")
    private String params;

    // ─── Driver code (auto-generated or manual override) ───
    @Column(columnDefinition = "TEXT")
    private String driverImports;

    @Column(columnDefinition = "TEXT")
    private String driverCode;

    @Builder.Default
    @OneToMany(mappedBy = "problem", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TestCase> testCases = new ArrayList<>();

    @Builder.Default
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "problem_categories", joinColumns = @JoinColumn(name = "problem_id"))
    @Column(name = "category")
    private List<String> categories = new ArrayList<>();
}
