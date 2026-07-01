# 🔴 HARD (5 Problems)

> **Workflow**: POST each problem → grab returned `id` → paste into `"problem"` field of its test-case request.

---

## H1. Median of Two Sorted Arrays *(Array / Binary Search)*

### POST `/api/admin/problems/`
```json
{
  "title": "Median of Two Sorted Arrays",
  "slug": "median-of-two-sorted-arrays",
  "description": "Given two sorted arrays `nums1` and `nums2` of sizes `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
  "difficulty": "HARD",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def findMedianSortedArrays(nums1: list[int], nums2: list[int]) -> float:\n    pass",
  "functionName": "findMedianSortedArrays",
  "returnType": "double",
  "params": [
    { "name": "nums1", "type": "int[]" },
    { "name": "nums2", "type": "int[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Binary Search", "Divide and Conquer"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[1,3]\n[2]",     "expectedOutput": "2.00000", "isSample": true,  "orderIndex": 0 },
    { "input": "[1,2]\n[3,4]",   "expectedOutput": "2.50000", "isSample": true,  "orderIndex": 1 },
    { "input": "[]\n[1]",        "expectedOutput": "1.00000", "isSample": false, "orderIndex": 2 },
    { "input": "[2]\n[]",        "expectedOutput": "2.00000", "isSample": false, "orderIndex": 3 },
    { "input": "[1,3,5]\n[2,4,6]", "expectedOutput": "3.50000", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## H2. Trapping Rain Water *(Array / Two Pointers / Stack)*

### POST `/api/admin/problems/`
```json
{
  "title": "Trapping Rain Water",
  "slug": "trapping-rain-water",
  "description": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
  "difficulty": "HARD",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def trap(height: list[int]) -> int:\n    pass",
  "functionName": "trap",
  "returnType": "int",
  "params": [
    { "name": "height", "type": "int[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Two Pointers", "Stack", "Dynamic Programming", "Monotonic Stack"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[0,1,0,2,1,0,1,3,2,1,2,1]", "expectedOutput": "6", "isSample": true,  "orderIndex": 0 },
    { "input": "[4,2,0,3,2,5]",               "expectedOutput": "9", "isSample": true,  "orderIndex": 1 },
    { "input": "[1,0,1]",                     "expectedOutput": "1", "isSample": false, "orderIndex": 2 },
    { "input": "[3,0,0,2,0,4]",               "expectedOutput": "10","isSample": false, "orderIndex": 3 },
    { "input": "[0,0,0,0]",                   "expectedOutput": "0", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## H3. Serialize and Deserialize Binary Tree *(Tree / DFS / Design)*

### POST `/api/admin/problems/`
```json
{
  "title": "Serialize and Deserialize Binary Tree",
  "slug": "serialize-and-deserialize-binary-tree",
  "description": "Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a tree to a string. Deserialization is the reverse. Implement `serialize(root)` which returns a string, and `deserialize(data)` which reconstructs and returns the root of the tree.",
  "difficulty": "HARD",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "class Codec:\n    def serialize(self, root) -> str:\n        pass\n    def deserialize(self, data: str):\n        pass",
  "functionName": "serialize",
  "returnType": "str",
  "params": [
    { "name": "root", "type": "TreeNode" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Tree", "DFS", "BFS", "Design", "Binary Tree"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[1,2,3,null,null,4,5]", "expectedOutput": "[1,2,3,null,null,4,5]", "isSample": true,  "orderIndex": 0 },
    { "input": "[]",                    "expectedOutput": "[]",                    "isSample": true,  "orderIndex": 1 },
    { "input": "[1]",                   "expectedOutput": "[1]",                   "isSample": false, "orderIndex": 2 },
    { "input": "[1,2,null,3]",          "expectedOutput": "[1,2,null,3]",          "isSample": false, "orderIndex": 3 },
    { "input": "[5,4,7,3,null,2,null,-1,null,9]", "expectedOutput": "[5,4,7,3,null,2,null,-1,null,9]", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## H4. Word Ladder *(Graph / BFS)*

### POST `/api/admin/problems/`
```json
{
  "title": "Word Ladder",
  "slug": "word-ladder",
  "description": "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence where every consecutive pair of words differs by exactly one letter and every intermediate word exists in `wordList`. Given `beginWord`, `endWord`, and `wordList`, return the number of words in the shortest transformation sequence, or 0 if no such sequence exists.",
  "difficulty": "HARD",
  "timeLimit": 2000,
  "memoryLimit": 256,
  "starterCode": "def ladderLength(beginWord: str, endWord: str, wordList: list[str]) -> int:\n    pass",
  "functionName": "ladderLength",
  "returnType": "int",
  "params": [
    { "name": "beginWord", "type": "str"   },
    { "name": "endWord",   "type": "str"   },
    { "name": "wordList",  "type": "str[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Hash Table", "String", "BFS", "Graph"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "hit\ncog\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]", "expectedOutput": "5", "isSample": true,  "orderIndex": 0 },
    { "input": "hit\ncog\n[\"hot\",\"dot\",\"dog\",\"lot\",\"log\"]",         "expectedOutput": "0", "isSample": true,  "orderIndex": 1 },
    { "input": "a\nc\n[\"a\",\"b\",\"c\"]",                                   "expectedOutput": "2", "isSample": false, "orderIndex": 2 },
    { "input": "hot\ndot\n[\"hot\",\"dot\"]",                                 "expectedOutput": "2", "isSample": false, "orderIndex": 3 },
    { "input": "lost\nmass\n[\"most\",\"mast\",\"mass\",\"last\",\"lost\"]",  "expectedOutput": "5", "isSample": false, "orderIndex": 4 }
  ]
}
```

---

## H5. Largest Rectangle in Histogram *(Array / Stack / Monotonic Stack)*

### POST `/api/admin/problems/`
```json
{
  "title": "Largest Rectangle in Histogram",
  "slug": "largest-rectangle-in-histogram",
  "description": "Given an array of integers `heights` representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
  "difficulty": "HARD",
  "timeLimit": 1000,
  "memoryLimit": 256,
  "starterCode": "def largestRectangleArea(heights: list[int]) -> int:\n    pass",
  "functionName": "largestRectangleArea",
  "returnType": "int",
  "params": [
    { "name": "heights", "type": "int[]" }
  ],
  "driverImports": null,
  "driverCode": null,
  "categories": ["Array", "Stack", "Monotonic Stack"]
}
```

### POST `/api/admin/problems/test-case`
```json
{
  "problem": "<PROBLEM_ID>",
  "testCases": [
    { "input": "[2,1,5,6,2,3]", "expectedOutput": "10", "isSample": true,  "orderIndex": 0 },
    { "input": "[2,4]",         "expectedOutput": "4",  "isSample": true,  "orderIndex": 1 },
    { "input": "[1]",           "expectedOutput": "1",  "isSample": false, "orderIndex": 2 },
    { "input": "[6,7,5,2,4,5,9,3]", "expectedOutput": "16", "isSample": false, "orderIndex": 3 },
    { "input": "[1,1,1,1,1]",   "expectedOutput": "5",  "isSample": false, "orderIndex": 4 }
  ]
}
```
