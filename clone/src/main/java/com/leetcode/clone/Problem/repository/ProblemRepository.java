package com.leetcode.clone.Problem.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.leetcode.clone.Problem.dto.DifficultyEnum;
import com.leetcode.clone.Problem.models.ProblemEntity;

public interface ProblemRepository extends JpaRepository<ProblemEntity, UUID> {

    boolean existsBySlug(String slug);

    Page<ProblemEntity> findByDifficulty(DifficultyEnum difficulty, Pageable pageable);

}
