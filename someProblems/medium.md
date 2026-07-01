# 🟡 MEDIUM (5 Problems)

> **Workflow**: POST each problem → grab returned `id` → paste into `"problem"` field of its test-case request.

---

## M1. Longest Substring Without Repeating Characters *(String / Sliding Window)*

### POST `/api/admin/problems/`
```json
{
  "title": "Longest Substring Without Repeating Characters",
  "slug": "longest-substring-without-repeating-characters",
  "description": "Given a string `s`, find the length of the longest substring without repeating characters.",
  "difficulty": "MEDIUM",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def lengthOfLongestSubstring(s: str) -> int:\n    pass",
  "functionName": "lengthOfLongestSubstring",
  "returnType": "int",
  "params": [
    { "name": "s", "type": "str" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["String", "Sliding Window", "Hash Table"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "abcabcbb", "expectedOutput": "3",  "isSample": true,  "orderIndex": 0 },
    { "input": "bbbbb",    "expectedOutput": "1",  "isSample": true,  "orderIndex": 1 },
    { "input": "pwwkew",   "expectedOutput": "3",  "isSample": false, "orderIndex": 2 },
    { "input": "",         "expectedOutput": "0",  "isSample": false, "orderIndex": 3 },
    { "input": "dvdf",     "expectedOutput": "3",  "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## M2. Group Anagrams *(String / Hash Table)*

### POST `/api/admin/problems/`
```json
{
  "title": "Group Anagrams",
  "slug": "group-anagrams",
  "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of a different word using all the original letters exactly once.",
  "difficulty": "MEDIUM",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def groupAnagrams(strs: list[str]) -> list[list[str]]:\n    pass",
  "functionName": "groupAnagrams",
  "returnType": "str[][]",
  "params": [
    { "name": "strs", "type": "str[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "String", "Hash Table", "Sorting"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", "expectedOutput": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]", "isSample": true,  "orderIndex": 0 },
    { "input": "[\"\"]",                                          "expectedOutput": "[[\"\"]]",                                                  "isSample": true,  "orderIndex": 1 },
    { "input": "[\"a\"]",                                        "expectedOutput": "[[\"a\"]]",                                                  "isSample": false, "orderIndex": 2 },
    { "input": "[\"abc\",\"bca\",\"cab\",\"xyz\",\"zyx\"]",      "expectedOutput": "[[\"abc\",\"bca\",\"cab\"],[\"xyz\",\"zyx\"]]",              "isSample": false, "orderIndex": 3 },
    { "input": "[\"ab\",\"ba\",\"cd\",\"dc\",\"ef\"]",           "expectedOutput": "[[\"ab\",\"ba\"],[\"cd\",\"dc\"],[\"ef\"]]",                 "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## M3. Number of Islands *(Graph / BFS / DFS)*

### POST `/api/admin/problems/`
```json
{
  "title": "Number of Islands",
  "slug": "number-of-islands",
  "description": "Given an `m x n` 2D binary grid where `'1'` represents land and `'0'` represents water, return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
  "difficulty": "MEDIUM",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def numIslands(grid: list[list[str]]) -> int:\n    pass",
  "functionName": "numIslands",
  "returnType": "int",
  "params": [
    { "name": "grid", "type": "char[][]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Graph", "BFS", "DFS", "Matrix"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "expectedOutput": "1", "isSample": true,  "orderIndex": 0 },
    { "input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "expectedOutput": "3", "isSample": true,  "orderIndex": 1 },
    { "input": "[[\"0\"]]",                                                                                                                       "expectedOutput": "0", "isSample": false, "orderIndex": 2 },
    { "input": "[[\"1\"]]",                                                                                                                       "expectedOutput": "1", "isSample": false, "orderIndex": 3 },
    { "input": "[[\"1\",\"0\",\"1\"],[\"0\",\"1\",\"0\"],[\"1\",\"0\",\"1\"]]",                                                                   "expectedOutput": "5", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## M4. Coin Change *(Dynamic Programming)*

### POST `/api/admin/problems/`
```json
{
  "title": "Coin Change",
  "slug": "coin-change",
  "description": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins needed to make up that amount. If that amount cannot be made up by any combination of the coins, return `-1`.",
  "difficulty": "MEDIUM",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def coinChange(coins: list[int], amount: int) -> int:\n    pass",
  "functionName": "coinChange",
  "returnType": "int",
  "params": [
    { "name": "coins",  "type": "int[]" },
    { "name": "amount", "type": "int"   }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Dynamic Programming", "BFS"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[1,5,10,25]\n30", "expectedOutput": "2",  "isSample": true,  "orderIndex": 0 },
    { "input": "[2]\n3",          "expectedOutput": "-1", "isSample": true,  "orderIndex": 1 },
    { "input": "[1]\n0",          "expectedOutput": "0",  "isSample": false, "orderIndex": 2 },
    { "input": "[1,2,5]\n11",     "expectedOutput": "3",  "isSample": false, "orderIndex": 3 },
    { "input": "[186,419,83,408]\n6249", "expectedOutput": "20", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## M5. Binary Tree Level Order Traversal *(Tree / BFS)*

### POST `/api/admin/problems/`
```json
{
  "title": "Binary Tree Level Order Traversal",
  "slug": "binary-tree-level-order-traversal",
  "description": "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
  "difficulty": "MEDIUM",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def levelOrder(root) -> list[list[int]]:\n    pass",
  "functionName": "levelOrder",
  "returnType": "int[][]",
  "params": [
    { "name": "root", "type": "TreeNode" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Tree", "BFS", "Binary Tree"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[3,9,20,null,null,15,7]", "expectedOutput": "[[3],[9,20],[15,7]]", "isSample": true,  "orderIndex": 0 },
    { "input": "[1]",                     "expectedOutput": "[[1]]",               "isSample": true,  "orderIndex": 1 },
    { "input": "[]",                      "expectedOutput": "[]",                  "isSample": false, "orderIndex": 2 },
    { "input": "[1,2,3,4,5]",             "expectedOutput": "[[1],[2,3],[4,5]]",   "isSample": false, "orderIndex": 3 },
    { "input": "[1,null,2,null,3]",       "expectedOutput": "[[1],[2],[3]]",       "isSample": false, "orderIndex": 4 }
  ]
}
```
