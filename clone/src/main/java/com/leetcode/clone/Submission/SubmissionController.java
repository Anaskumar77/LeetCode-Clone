package com.leetcode.clone.Submission;

import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.Submission.dto.SubmissionDto;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController("api/submission")
public class SubmissionController {

    private SubmissionService submissionService;

    @PostMapping("/")
    public String Submission(@RequestBody SubmissionDto submissionDto) {
        return submissionService.Submit(submissionDto);
    }
    
    
}
