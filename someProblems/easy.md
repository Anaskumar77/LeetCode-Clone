# 🟢 EASY (5 Problems)

> **Workflow**: POST each problem first → grab the returned `id` → paste it into the `"problem"` field of the matching test-case request.

---

## 1. Two Sum *(Arrays / Hash Map)*

### POST `/api/admin/problems/`
```json
{
  "title": "Two Sum",
  "slug": "two-sum",
  "description": "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
  "difficulty": "EASY",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def twoSum(nums: list[int], target: int) -> list[int]:\n    pass",
  "functionName": "twoSum",
  "returnType": "int[]",
  "params": [
    { "name": "nums",   "type": "int[]" },
    { "name": "target", "type": "int"   }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Hash Table"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[2,7,11,15]\n9",  "expectedOutput": "[0,1]", "isSample": true,  "orderIndex": 0 },
    { "input": "[3,2,4]\n6",      "expectedOutput": "[1,2]", "isSample": true,  "orderIndex": 1 },
    { "input": "[1,5,3,7]\n8",    "expectedOutput": "[1,3]", "isSample": false, "orderIndex": 2 },
    { "input": "[0,4,3,0]\n0",    "expectedOutput": "[0,3]", "isSample": false, "orderIndex": 3 },
    { "input": "[-3,4,3,90]\n0",  "expectedOutput": "[0,2]", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## 2. Reverse String *(Strings)*

### POST `/api/admin/problems/`
```json
{
  "title": "Reverse String",
  "slug": "reverse-string",
  "description": "Write a function that reverses a string. The input is given as an array of characters `s`. You must do it in-place with O(1) extra memory.",
  "difficulty": "EASY",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def reverseString(s: list[str]) -> None:\n    pass",
  "functionName": "reverseString",
  "returnType": "void",
  "params": [
    { "name": "s", "type": "char[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["String", "Two Pointers"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "expectedOutput": "[\"o\",\"l\",\"l\",\"e\",\"h\"]", "isSample": true,  "orderIndex": 0 },
    { "input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "expectedOutput": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]", "isSample": true,  "orderIndex": 1 },
    { "input": "[\"a\"]",                           "expectedOutput": "[\"a\"]",                           "isSample": false, "orderIndex": 2 },
    { "input": "[\"a\",\"b\"]",                     "expectedOutput": "[\"b\",\"a\"]",                     "isSample": false, "orderIndex": 3 },
    { "input": "[\"A\",\"B\",\"C\",\"D\",\"E\"]",  "expectedOutput": "[\"E\",\"D\",\"C\",\"B\",\"A\"]",  "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## 3. FizzBuzz *(Math / Simulation)*

### POST `/api/admin/problems/`
```json
{
  "title": "FizzBuzz",
  "slug": "fizz-buzz",
  "description": "Given an integer `n`, return a string array where: `answer[i] == \"FizzBuzz\"` if `i` is divisible by 3 and 5, `answer[i] == \"Fizz\"` if divisible by 3, `answer[i] == \"Buzz\"` if divisible by 5, otherwise `answer[i]` is the string representation of `i`. (1-indexed)",
  "difficulty": "EASY",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def fizzBuzz(n: int) -> list[str]:\n    pass",
  "functionName": "fizzBuzz",
  "returnType": "str[]",
  "params": [
    { "name": "n", "type": "int" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Math", "Simulation", "String"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "3",  "expectedOutput": "[\"1\",\"2\",\"Fizz\"]",                                                                         "isSample": true,  "orderIndex": 0 },
    { "input": "5",  "expectedOutput": "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\"]",                                                         "isSample": true,  "orderIndex": 1 },
    { "input": "1",  "expectedOutput": "[\"1\"]",                                                                                       "isSample": false, "orderIndex": 2 },
    { "input": "15", "expectedOutput": "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\",\"Fizz\",\"7\",\"8\",\"Fizz\",\"Buzz\",\"11\",\"Fizz\",\"13\",\"14\",\"FizzBuzz\"]", "isSample": false, "orderIndex": 3 },
    { "input": "10", "expectedOutput": "[\"1\",\"2\",\"Fizz\",\"4\",\"Buzz\",\"Fizz\",\"7\",\"8\",\"Fizz\",\"Buzz\"]",                   "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## 4. Maximum Depth of Binary Tree *(Tree / DFS)*

### POST `/api/admin/problems/`
```json
{
  "title": "Maximum Depth of Binary Tree",
  "slug": "maximum-depth-of-binary-tree",
  "description": "Given the `root` of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
  "difficulty": "EASY",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def maxDepth(root) -> int:\n    pass",
  "functionName": "maxDepth",
  "returnType": "int",
  "params": [
    { "name": "root", "type": "TreeNode" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Tree", "DFS", "BFS", "Binary Tree"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[3,9,20,null,null,15,7]", "expectedOutput": "3", "isSample": true,  "orderIndex": 0 },
    { "input": "[1,null,2]",              "expectedOutput": "2", "isSample": true,  "orderIndex": 1 },
    { "input": "[]",                      "expectedOutput": "0", "isSample": false, "orderIndex": 2 },
    { "input": "[1]",                     "expectedOutput": "1", "isSample": false, "orderIndex": 3 },
    { "input": "[1,2,3,4,5,null,null]",   "expectedOutput": "3", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## 5. Palindrome Number *(Math)*

### POST `/api/admin/problems/`
```json
{
  "title": "Palindrome Number",
  "slug": "palindrome-number",
  "description": "Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise. An integer is a palindrome when it reads the same forward and backward. Negative numbers are not palindromes.",
  "difficulty": "EASY",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def isPalindrome(x: int) -> bool:\n    pass",
  "functionName": "isPalindrome",
  "returnType": "bool",
  "params": [
    { "name": "x", "type": "int" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Math"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "121",  "expectedOutput": "true",  "isSample": true,  "orderIndex": 0 },
    { "input": "-121", "expectedOutput": "false", "isSample": true,  "orderIndex": 1 },
    { "input": "10",   "expectedOutput": "false", "isSample": false, "orderIndex": 2 },
    { "input": "0",    "expectedOutput": "true",  "isSample": false, "orderIndex": 3 },
    { "input": "1221", "expectedOutput": "true",  "isSample": false, "orderIndex": 4 }
  ]
}
```
