package com.leetcode.clone.User.Favorite;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.User.Favorite.dto.FavoriteResponseDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;

    /**
     * POST /api/favorites/{problemId} — Add a problem to favorites
     */
    @PostMapping("/{problemId}")
    public ResponseEntity<FavoriteResponseDto> addFavorite(
            @PathVariable UUID problemId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        FavoriteResponseDto response = favoriteService.addFavorite(userEmail, problemId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/favorites?count=10 — Get favorite problems for the authenticated
     * user
     */
    @GetMapping()
    public ResponseEntity<List<FavoriteResponseDto>> getFavorites(
            @RequestParam(defaultValue = "10") int count,
            Authentication authentication) {
        String userEmail = authentication.getName();
        List<FavoriteResponseDto> favorites = favoriteService.getFavorites(userEmail, count);
        return ResponseEntity.ok(favorites);
    }

    /**
     * GET /api/favorites/{problemId}/check — Check if a problem is favorited
     */
    @GetMapping("/{problemId}/check")
    public ResponseEntity<Map<String, Boolean>> isFavorited(
            @PathVariable UUID problemId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        boolean favorited = favoriteService.isFavorited(userEmail, problemId);
        return ResponseEntity.ok(Map.of("favorited", favorited));
    }

    /**
     * DELETE /api/favorites/{problemId} — Remove a problem from favorites
     */
    @DeleteMapping("/{problemId}")
    public ResponseEntity<Map<String, String>> removeFavorite(
            @PathVariable UUID problemId,
            Authentication authentication) {

        String userEmail = authentication.getName();
        String message = favoriteService.removeFavorite(userEmail, problemId);
        return ResponseEntity.ok(Map.of("message", message));
    }
}
