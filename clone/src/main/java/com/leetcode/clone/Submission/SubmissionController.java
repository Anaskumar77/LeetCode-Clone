package com.leetcode.clone.Submission;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.Submission.dto.CalendarResponseDto;
import com.leetcode.clone.Submission.dto.SubmissionDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/submission")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping("/")
    public java.util.Map<String, Object> Submission(@RequestBody SubmissionDto submissionDto) {
        String status = submissionService.submit(submissionDto);
        java.util.Map<String, Object> response = new java.util.HashMap<>();
        response.put("status", status);
        response.put("passed", "All test cases passed!".equals(status));
        return response;
    }

    @GetMapping("/calendar/{userId}")
    public ResponseEntity<CalendarResponseDto> getCalendar(
            @PathVariable UUID userId,
            @RequestParam(defaultValue = "2024") int year) {
        return ResponseEntity.ok(submissionService.getCalendarData(userId, year));
    }
}
