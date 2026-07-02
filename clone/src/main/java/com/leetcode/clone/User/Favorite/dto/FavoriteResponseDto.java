package com.leetcode.clone.User.Favorite.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.leetcode.clone.Problem.dto.DifficultyEnum;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponseDto {

    private UUID id;
    private UUID problemId;
    private String problemTitle;
    private String problemSlug;
    private DifficultyEnum difficulty;
    private LocalDateTime createdAt;
}
