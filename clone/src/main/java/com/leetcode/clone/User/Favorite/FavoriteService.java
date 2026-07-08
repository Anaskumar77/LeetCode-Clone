package com.leetcode.clone.User.Favorite;

import java.util.List;
import java.util.UUID;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.leetcode.clone.Auth.model.UserEntity;
import com.leetcode.clone.Auth.repository.UserRepository;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.repository.ProblemRepository;
import com.leetcode.clone.User.Favorite.dto.FavoriteResponseDto;
import com.leetcode.clone.User.Favorite.model.FavoriteProblem;
import com.leetcode.clone.User.Favorite.repository.FavoriteProblemRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteProblemRepository favoriteRepo;
    private final UserRepository userRepo;
    private final ProblemRepository problemRepo;

    /**
     * Add a problem to the authenticated user's favorites.
     */
    public FavoriteResponseDto addFavorite(String userEmail, UUID problemId) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProblemEntity problem = problemRepo.findById(problemId)
                .orElseThrow(() -> new RuntimeException("Problem not found for id: " + problemId));

        // Check if already favorited
        if (favoriteRepo.existsByUserIdAndProblemId(user.getId(), problemId)) {
            throw new RuntimeException("Problem is already in your favorites");
        }

        try {
            FavoriteProblem favorite = FavoriteProblem.builder()
                    .user(user)
                    .problem(problem)
                    .build();

            FavoriteProblem saved = favoriteRepo.save(favorite);
            log.info("Favorite added: userId={}, problemId={}", user.getId(), problemId);

            return toResponse(saved);
        } catch (DataIntegrityViolationException ex) {
            log.warn("Duplicate favorite: userId={}, problemId={}", user.getId(), problemId);
            throw new RuntimeException("Problem is already in your favorites");
        }
    }

    /**
     * Get favorite problems for the authenticated user.
     * When count is 0, returns ALL favorites; otherwise limits to count.
     */
    public List<FavoriteResponseDto> getFavorites(String userEmail, int count) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<FavoriteProblem> favorites;
        if (count <= 0) {
            favorites = favoriteRepo.findByUserId(user.getId());
        } else {
            Pageable pageable = PageRequest.of(0, count, Sort.by(Sort.Direction.DESC, "createdAt"));
            favorites = favoriteRepo.findByUserId(user.getId(), pageable);
        }
        log.info("Fetched {} favorites for userId={}", favorites.size(), user.getId());

        return favorites.stream()
                .map(this::toResponse)
                .toList();
    }

    /**
     * Check if a specific problem is favorited by the authenticated user.
     */
    public boolean isFavorited(String userEmail, UUID problemId) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return favoriteRepo.existsByUserIdAndProblemId(user.getId(), problemId);
    }

    /**
     * Remove a problem from the authenticated user's favorites.
     */
    @Transactional
    public String removeFavorite(String userEmail, UUID problemId) {
        UserEntity user = userRepo.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        FavoriteProblem favorite = favoriteRepo.findByUserIdAndProblemId(user.getId(), problemId)
                .orElseThrow(() -> new RuntimeException("Favorite not found for problemId: " + problemId));

        favoriteRepo.delete(favorite);
        log.info("Favorite removed: userId={}, problemId={}", user.getId(), problemId);

        return "Favorite removed successfully";
    }

    private FavoriteResponseDto toResponse(FavoriteProblem entity) {
        ProblemEntity problem = entity.getProblem();
        return FavoriteResponseDto.builder()
                .id(entity.getId())
                .problemId(problem.getId())
                .problemTitle(problem.getTitle())
                .problemSlug(problem.getSlug())
                .difficulty(problem.getDifficulty())
                .createdAt(entity.getCreatedAt())
                .build();
    }
}
