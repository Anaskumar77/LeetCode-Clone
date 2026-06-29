package com.leetcode.clone.Execution;

import com.leetcode.clone.Problem.dto.ParamDto;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Generates Python driver code from a function signature.
 *
 * The generated script has 3 parts:
 *   1. Helper functions (build_ll, build_tree, etc.) — only when needed
 *   2. Parse stdin JSON and build arguments
 *   3. Call Solution().functionName(args) and print the result
 */
@Component
public class DriverCodeGenerator {

    // ─── Python helper snippets ────────────────────────────────────────────

    private static final String LL_BUILD_HELPER =
            "def build_ll(arr):\n" +
            "    if not arr: return None\n" +
            "    head = ListNode(arr[0])\n" +
            "    curr = head\n" +
            "    for v in arr[1:]:\n" +
            "        curr.next = ListNode(v)\n" +
            "        curr = curr.next\n" +
            "    return head\n";

    private static final String LL_SERIALIZE_HELPER =
            "def ll_to_arr(head):\n" +
            "    r = []\n" +
            "    while head:\n" +
            "        r.append(head.val)\n" +
            "        head = head.next\n" +
            "    return r\n";

    private static final String TREE_BUILD_HELPER =
            "from collections import deque\n" +
            "def build_tree(arr):\n" +
            "    if not arr or arr[0] is None: return None\n" +
            "    root = TreeNode(arr[0])\n" +
            "    q = deque([root])\n" +
            "    i = 1\n" +
            "    while q and i < len(arr):\n" +
            "        node = q.popleft()\n" +
            "        if i < len(arr) and arr[i] is not None:\n" +
            "            node.left = TreeNode(arr[i])\n" +
            "            q.append(node.left)\n" +
            "        i += 1\n" +
            "        if i < len(arr) and arr[i] is not None:\n" +
            "            node.right = TreeNode(arr[i])\n" +
            "            q.append(node.right)\n" +
            "        i += 1\n" +
            "    return root\n";

    private static final String TREE_SERIALIZE_HELPER =
            "def tree_to_arr(root):\n" +
            "    if not root: return []\n" +
            "    r, q = [], deque([root])\n" +
            "    while q:\n" +
            "        node = q.popleft()\n" +
            "        if node:\n" +
            "            r.append(node.val)\n" +
            "            q.append(node.left)\n" +
            "            q.append(node.right)\n" +
            "        else:\n" +
            "            r.append(None)\n" +
            "    while r and r[-1] is None: r.pop()\n" +
            "    return r\n";

    // ─── driverImports snippets ────────────────────────────────────────────

    private static final String LISTNODE_CLASS =
            "class ListNode:\n" +
            "    def __init__(self, val=0, next=None):\n" +
            "        self.val = val\n" +
            "        self.next = next\n";

    private static final String TREENODE_CLASS =
            "class TreeNode:\n" +
            "    def __init__(self, val=0, left=None, right=None):\n" +
            "        self.val = val\n" +
            "        self.left = left\n" +
            "        self.right = right\n";

    // ─── Public API ────────────────────────────────────────────────────────

    public static class GeneratedDriver {
        public final String driverImports;
        public final String driverCode;

        public GeneratedDriver(String driverImports, String driverCode) {
            this.driverImports = driverImports;
            this.driverCode = driverCode;
        }
    }

    /**
     * Generate driverImports and driverCode from a function signature.
     *
     * @param functionName  e.g. "twoSum"
     * @param params        e.g. [{"name":"nums","type":"int[]"}, {"name":"target","type":"int"}]
     * @param returnType    e.g. "int[]", "ListNode", "bool"
     */
    public GeneratedDriver generate(String functionName, List<ParamDto> params, String returnType) {
        boolean needsLlBuild     = params.stream().anyMatch(p -> "ListNode".equals(p.getType()));
        boolean needsTreeBuild   = params.stream().anyMatch(p -> "TreeNode".equals(p.getType()));
        boolean needsLlSerialize = "ListNode".equals(returnType);
        boolean needsTreeSerialize = "TreeNode".equals(returnType);

        // ── Build driverImports ───────────────────────────────────────────
        StringBuilder imports = new StringBuilder();
        if (needsLlBuild || needsLlSerialize) {
            imports.append(LISTNODE_CLASS).append("\n");
        }
        if (needsTreeBuild || needsTreeSerialize) {
            imports.append(TREENODE_CLASS).append("\n");
        }

        // ── Build driverCode ──────────────────────────────────────────────
        StringBuilder code = new StringBuilder();
        code.append("import json, sys\n\n");

        // Inject helper functions
        if (needsLlBuild) {
            code.append(LL_BUILD_HELPER).append("\n");
        }
        if (needsLlSerialize) {
            code.append(LL_SERIALIZE_HELPER).append("\n");
        }
        if (needsTreeBuild) {
            code.append(TREE_BUILD_HELPER).append("\n");
        }
        if (needsTreeSerialize) {
            code.append(TREE_SERIALIZE_HELPER).append("\n");
        }

        // Parse stdin
        code.append("data = json.loads(sys.stdin.read())\n");

        // Build argument list
        StringBuilder args = new StringBuilder();
        for (int i = 0; i < params.size(); i++) {
            ParamDto p = params.get(i);
            String argExpr = switch (p.getType()) {
                case "ListNode" -> "build_ll(data[\"" + p.getName() + "\"])";
                case "TreeNode" -> "build_tree(data[\"" + p.getName() + "\"])";
                default         -> "data[\"" + p.getName() + "\"]";
            };
            args.append(argExpr);
            if (i < params.size() - 1) args.append(", ");
        }

        // Call Solution and print result
        code.append("result = Solution().").append(functionName).append("(").append(args).append(")\n");

        String printExpr = switch (returnType != null ? returnType : "") {
            case "ListNode" -> "json.dumps(ll_to_arr(result))";
            case "TreeNode" -> "json.dumps(tree_to_arr(result))";
            default         -> "json.dumps(result)";
        };
        code.append("print(").append(printExpr).append(")\n");

        return new GeneratedDriver(
                imports.isEmpty() ? null : imports.toString().trim(),
                code.toString()
        );
    }
}
