package com.leetcode.clone.Problem;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.Problem.dto.CreateProblemDto;
import com.leetcode.clone.Problem.dto.CreateProblemResponseDto;
import com.leetcode.clone.Problem.dto.CreateTestCaseDto;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/admin/problems")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')") // only ADMIN can create problems
    public ResponseEntity<CreateProblemResponseDto> createProblem(@RequestBody CreateProblemDto req) {
        CreateProblemResponseDto body = problemService.createProblem(req);
        HttpStatus status = body.isSuccess() ? HttpStatus.CREATED : HttpStatus.CONFLICT;
        return ResponseEntity.status(status).body(body);
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteProblem(@PathVariable UUID id) {

        return problemService.deleteProblem(id);

    }

    @PostMapping("/test-case")
    @PreAuthorize("hasRole('ADMIN')") // only ADMIN can create problems
    public String addTestCases(@RequestBody CreateTestCaseDto req) {
        return problemService.addTestCases(req);
    }


    @DeleteMapping("/test-case/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTestCase(@PathVariable UUID id) {

        return problemService.deleteTestCase(id);

    }
}
