package com.leetcode.clone.Submission;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
