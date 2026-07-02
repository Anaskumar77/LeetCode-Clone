package com.leetcode.clone.User.Favorite.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.leetcode.clone.User.Favorite.model.FavoriteProblem;

@Repository
public interface FavoriteProblemRepository extends JpaRepository<FavoriteProblem, UUID> {

    List<FavoriteProblem> findByUserId(UUID userId);

    List<FavoriteProblem> findByUserId(UUID userId, Pageable pageable);

    Optional<FavoriteProblem> findByUserIdAndProblemId(UUID userId, UUID problemId);

    boolean existsByUserIdAndProblemId(UUID userId, UUID problemId);

    void deleteByUserIdAndProblemId(UUID userId, UUID problemId);
}
