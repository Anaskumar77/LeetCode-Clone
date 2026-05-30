package com.leetcode.clone.Submission;

import org.springframework.stereotype.Service;

import com.leetcode.clone.Execution.ExecutionService;
import com.leetcode.clone.Submission.dto.SubmissionDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private final ExecutionService executionService;

    public String submit(SubmissionDto submissionDto) {
        return "Submission received";
    }

}
