
package com.leetcode.clone.Execution.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.leetcode.clone.Problem.dto.ParamDto;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExecutionRequest {

    private String sourceCode;     // user's Python code (the Solution class)
    private String stdin;          // test case input as JSON
    private String expectedOutput; // expected output for verdict
    private int timeLimitSeconds;  // default 5

    // ─── Function signature for auto driver code generation ───────────────
    private String functionName;   // e.g. "twoSum"
    private String returnType;     // e.g. "int[]", "ListNode", "bool"
    private List<ParamDto> params; // e.g. [{"name":"nums","type":"int[]"},...]

    // ─── Manual override (optional) — takes priority over auto-generation ─
    private String driverImports;  // class definitions (ListNode, TreeNode, etc.)
    private String driverCode;     // full harness code
}