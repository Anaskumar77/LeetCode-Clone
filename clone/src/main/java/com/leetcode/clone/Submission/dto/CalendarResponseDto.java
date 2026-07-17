package com.leetcode.clone.Submission.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CalendarResponseDto {
    private List<DailyActivityDto> days;
    private int currentStreak;
    private int maxStreak;
    private int totalSubmissions;
}
