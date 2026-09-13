# DSA Last-Minute Algorithmic Patterns Cheatsheet

---

## 🧭 The Top 14 Algorithmic Patterns Quick Reference

| Pattern | Trigger in Problem Statement | Core Data Structure | Typical Complexity |
| :--- | :--- | :--- | :---: |
| **1. Frequency Hash Map** | "Find duplicates", "Frequency of elements", "Anagrams" | `collections.Counter` / `dict` | O(N) Time, O(N) Space |
| **2. Two Pointers** | "Sorted array", "Find pair summing to target", "Palindromes" | Two integer indices (`L`, `R`) | O(N) Time, O(1) Space |
| **3. Sliding Window** | "Contiguous subarray/substring", "Longest/Shortest with condition" | Two indices + Hash Map | O(N) Time, O(K) Space |
| **4. Fast & Slow Pointers** | "Cycle detection in linked list", "Find middle of linked list" | `slow`, `fast` pointers | O(N) Time, O(1) Space |
| **5. Prefix Sum** | "Subarray sum equals K", "Range sum queries" | Array / Running sum | O(N) Time, O(1) query |
| **6. Monotonic Stack** | "Next greater element", "Daily temperatures", "Stock span" | `list` as stack | O(N) Time, O(N) Space |
| **7. Top K Elements** | "Find K largest / K most frequent", "Running median" | `heapq` (Min-Heap / Max-Heap)| O(N log K) Time |
| **8. Binary Search** | "Sorted input", "Find peak", "Search rotated sorted array", "Min of Max" | `left`, `right`, `mid` | O(log N) Time, O(1) Space |
| **9. BFS (Level Order)** | "Shortest path in unweighted graph/grid", "Level-by-level tree" | `collections.deque` | O(V + E) Time, O(V) Space |
| **10. DFS (Backtracking)** | "Generate all combinations/permutations/subsets", "Islands in grid" | Recursion / Call Stack | O(2^N) or O(N!) Time |
| **11. Merge Intervals** | "Overlapping intervals", "Meeting rooms schedule" | Sort by `start_time` | O(N log N) Time |
| **12. Dynamic Programming** | "Overlapping subproblems", "Max/Min path", "Number of ways" | 1D / 2D table or memo dict | O(N) or O(N * M) |
| **13. Greedy** | "Interval scheduling", "Jump game", "Local optimum yields global" | Priority Queue or Sort | O(N log N) Time |
| **14. Union-Find (DSU)** | "Connected components", "Detect cycle in undirected graph" | `parent` and `rank` arrays | O(alpha(N)) ≈ O(1) |

---

## 🐍 Python High-Yield Syntax Snippets

```python
# 1. Monotonic Deque for O(1) pops and appends:
from collections import deque
q = deque()
q.append(1)
q.popleft() # O(1) vs list.pop(0) which is O(N)!

# 2. Min-Heap & Max-Heap:
import heapq
min_h = []
heapq.heappush(min_h, 10)
val = heapq.heappop(min_h)
# Max-heap: push negative values
heapq.heappush(min_h, -10)
val = -heapq.heappop(min_h)

# 3. Safe Binary Search Mid Calculation:
mid = left + (right - left) // 2

# 4. In-Place Reversal:
def reverse_range(arr, l, r):
    while l < r:
        arr[l], arr[r] = arr[r], arr[l]
        l += 1
        r -= 1

# 5. Defaultdict without KeyError:
from collections import defaultdict
graph = defaultdict(list)
counts = defaultdict(int)
```
