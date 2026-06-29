package com.leetcode.clone.Problem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParamDto {
    // Parameter name, e.g. "nums", "head", "target"
    private String name;

    // Parameter type, e.g. "int[]", "str", "bool", "ListNode", "TreeNode"
    private String type;
}
