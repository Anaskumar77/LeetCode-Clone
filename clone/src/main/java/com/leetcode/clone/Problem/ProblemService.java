package com.leetcode.clone.Problem;

import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.leetcode.clone.Problem.dto.CreateProblemDto;
import com.leetcode.clone.Problem.dto.ProblemResponse;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.repository.ProblemRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepo;

    public ProblemResponse createProblem(CreateProblemDto req) {

        ProblemEntity problem = ProblemEntity.builder()
                .title(req.title())
                .slug(req.slug())
                .description(req.description())
                .difficulty(req.difficulty())
                .timeLimit(req.timeLimit())
                .memoryLimit(req.memoryLimit())
                .starterCode(req.starterCode())
                .driverImports(req.driverImports())
                .driverCode(req.driverCode())
                .testCases(new ArrayList<>()) // empty, added separately
                .build();
        ProblemEntity repoRes = problemRepo.save(problem);

        ProblemResponse problemResponse = ProblemResponse.builder()
                .id(repoRes.getId())
                .title(repoRes.getTitle())
                .slug(repoRes.getSlug())
                .description(repoRes.getDescription())
                .difficulty(repoRes.getDifficulty())
                .timeLimit(repoRes.getTimeLimit())
                .memoryLimit(repoRes.getMemoryLimit())
                .starterCode(repoRes.getStarterCode())
                .build();

        return problemResponse;
    }

}
