package com.leetcode.clone.Problem.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leetcode.clone.Problem.models.TestCase;

import java.util.List;

public interface TestCaseRepository extends JpaRepository<TestCase, UUID> {

    List<TestCase> findByProblemIdOrderByOrderIndexAsc(UUID problemId);

    List<TestCase> findByProblemIdAndIsSampleTrueOrderByOrderIndexAsc(UUID problemId);
}
