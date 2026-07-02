package com.leetcode.clone.Problem;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.leetcode.clone.Problem.dto.CategoryCountDto;
import com.leetcode.clone.Problem.dto.ProblemResponse;
import com.leetcode.clone.Problem.dto.TestCaseResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemsController {

    private final ProblemService problemService;

    @GetMapping()
    public ResponseEntity<List<ProblemResponse>> getProblems(
            @RequestParam(required = false) String difficulty,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int count) {
        return ResponseEntity.ok(problemService.getProblems(page, count, difficulty));
    }

    ////////////////////////////////////////////////////////////////////////////////////

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryCountDto>> getCategoryCounts() {
        return ResponseEntity.ok(problemService.getCategoryCounts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemResponse> getSpecificProblem(@PathVariable UUID id) {

        return ResponseEntity.ok(problemService.getSpecificProblem(id));
    }

    @GetMapping("/test-case/{id}")
    public ResponseEntity<List<TestCaseResponse>> getTestCases(@PathVariable UUID id) {
        return ResponseEntity.ok(problemService.getTestCasesForProblem(id));
    }

}
