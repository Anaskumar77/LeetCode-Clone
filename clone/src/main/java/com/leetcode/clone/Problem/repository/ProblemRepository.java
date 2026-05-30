package com.leetcode.clone.Problem.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.leetcode.clone.Problem.models.ProblemEntity;

public interface ProblemRepository extends JpaRepository<ProblemEntity, UUID> {

}
