package com.leetcode.clone.Problem;

import java.util.Map;
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
import com.leetcode.clone.Problem.dto.AddTestCaseResponseDto;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/admin/problems")
@RequiredArgsConstructor
public class AdminProblemController {

    private final ProblemService problemService;

    @PostMapping("/")
    @PreAuthorize("hasRole('ADMIN')") // only ADMIN can create problems
    public ResponseEntity<CreateProblemResponseDto> createProblem(@Valid @RequestBody CreateProblemDto req) {
        System.out.print(req);
        CreateProblemResponseDto body = problemService.createProblem(req);
        return ResponseEntity.status(resolveCreateProblemStatus(body)).body(body);
        
    }

    private HttpStatus resolveCreateProblemStatus(CreateProblemResponseDto body) {
        if (body.isSuccess()) {
            return HttpStatus.CREATED;
        }
        return switch (body.getMessage()) {
            case PROBLEM_ALREADY_EXISTS -> HttpStatus.CONFLICT;
            case INVALID_REQUEST -> HttpStatus.BAD_REQUEST;
            case PROBLEM_CREATION_FAILED -> HttpStatus.INTERNAL_SERVER_ERROR;
            default -> HttpStatus.BAD_REQUEST;
        };
    }


    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> deleteProblem(@PathVariable UUID id) {
        String message = problemService.deleteProblem(id);
        return ResponseEntity.ok(Map.of("message", message));
    }

    @PostMapping("/test-case")
    @PreAuthorize("hasRole('ADMIN')") // only ADMIN can create problems
    public ResponseEntity<AddTestCaseResponseDto> addTestCases(@Valid @RequestBody CreateTestCaseDto req) {
        AddTestCaseResponseDto body = problemService.addTestCases(req);
        return ResponseEntity.status(resolveTestCaseStatus(body)).body(body);
    }


    @DeleteMapping("/test-case/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteTestCase(@PathVariable UUID id) {

        return problemService.deleteTestCase(id);

    }

    private HttpStatus resolveTestCaseStatus(AddTestCaseResponseDto body) {
        if (body.isSuccess()) {
            return HttpStatus.CREATED;
        }
        return switch (body.getMessage()) {
            case INVALID_REQUEST -> HttpStatus.BAD_REQUEST;
            case PROBLEM_NOT_FOUND -> HttpStatus.NOT_FOUND;
            case TEST_CASE_CREATION_FAILED -> HttpStatus.INTERNAL_SERVER_ERROR;
            default -> HttpStatus.BAD_REQUEST;
        };
    }
}
