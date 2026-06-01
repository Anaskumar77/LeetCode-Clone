package com.leetcode.clone.Problem;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.leetcode.clone.Problem.dto.CreateProblemDto;
import com.leetcode.clone.Problem.dto.CreateProblemResponseDto;
import com.leetcode.clone.Problem.dto.CreateTestCaseDto;
import com.leetcode.clone.Problem.dto.DifficultyEnum;
import com.leetcode.clone.Problem.dto.ProblemResponse;
import com.leetcode.clone.Problem.dto.ProblemStatus;
import com.leetcode.clone.Problem.models.ProblemEntity;
import com.leetcode.clone.Problem.repository.ProblemRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class ProblemService {

    private final ProblemRepository problemRepo;
    public CreateProblemResponseDto createProblem(CreateProblemDto req) {

        if (problemRepo.existsBySlug(req.slug())) {
            return CreateProblemResponseDto.builder()
                    .success(false)
                    .message(ProblemStatus.PROBLEM_ALREADY_EXISTS)
                    .problem(null)
                    .build();

        }

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
                .testCases(new ArrayList<>())
                .build();

        ProblemEntity repoRes = problemRepo.save(problem);

        return CreateProblemResponseDto.builder()
                .success(true)
                .message(ProblemStatus.PROBLEM_CREATED)
                .problem(toProblemResponse(repoRes))
                .build();

    }



    public List<ProblemResponse> getProblems(int page, int size, String difficulty) {

        Pageable pageable = PageRequest.of(page, size);
        Page<ProblemEntity> problems;

        if (difficulty == null || difficulty.isBlank()) {
            problems = problemRepo.findAll(pageable);
        } else {
            DifficultyEnum difficultyEnum = DifficultyEnum.valueOf(difficulty.trim().toUpperCase());
            
            problems = problemRepo.findByDifficulty(difficultyEnum, pageable);
        }

        return problems.getContent().stream()
                .map(this::toProblemResponse)
                .toList();

    }



    private ProblemResponse toProblemResponse(ProblemEntity entity) {

        return ProblemResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .description(entity.getDescription())
                .difficulty(entity.getDifficulty())
                .timeLimit(entity.getTimeLimit())
                .memoryLimit(entity.getMemoryLimit())
                .starterCode(entity.getStarterCode())
                .build();

    }



    public String deleteProblem(UUID id) {
        return "hello";
    }



    public String addTestCases(CreateTestCaseDto testCaseDto) {
        return "hello";
    }



    public String deleteTestCase(UUID id) {
        return "hello";
    }

}

