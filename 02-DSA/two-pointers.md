# Two Pointers Algorithmic Patterns

## 1. Why This Matters
Two-pointer techniques are fundamental to passing algorithmic screening interviews at top engineering hubs like IDFC FIRST Bank. The pattern eliminates nested loops ($O(N^2)$) and reduces problems to linear $O(N)$ scans with $O(1)$ auxiliary space. Interviewers frequently test two pointers on financial series, sorted settlement logs, deduplication, and pair-matching scenarios.

---

## 2. Prerequisites
- Zero-indexed array addressing.
- Sorting fundamentals (understanding that pre-sorting an array takes $O(N \log N)$ and often unlocks $O(N)$ two-pointer traversal).

---

## 3. Concept

### Taxonomy of Two Pointers
1. **Opposite-Direction Pointers (Converging):** One pointer starts at the beginning (`left = 0`) and the other at the end (`right = len - 1`). They move toward each other based on comparison conditions (e.g., Two Sum on sorted array, 3-Sum, Container With Most Water).
2. **Same-Direction Pointers (Fast & Slow):** Both pointers start at index $0$, but advance at different rates or under different conditions (e.g., Linked List cycle detection, in-place duplicate removal).
3. **Dual-Array Pointers:** One pointer in Array A and one pointer in Array B (e.g., Merge Sorted Arrays, intersection of two banking transaction logs).

```mermaid
flowchart LR
    subgraph Converging["Opposite-Direction (Sorted Array)"]
        L["Left Pointer →"] --> E["[ 2,  5,  7,  11,  15 ]"] <-- R["← Right Pointer"]
    end
```

---

## 4. Simple Example: Two Sum on a Sorted Array ($O(N)$ Time, $O(1)$ Space)

```python
def two_sum_sorted(nums: list[int], target: int) -> list[int]:
    """
    Finds 1-based indices of two numbers that sum to target.
    Requires array to be pre-sorted.
    """
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1   # Need larger sum
        else:
            right -= 1  # Need smaller sum
    return []
```

---

## 5. Real-World Banking Example: Inter-Bank Netting & Settlement Matching
At end-of-day clearing, the banking switch matches credit claims against debit obligations across institutions. Given sorted lists of receivables and payables, dual pointers can reconcile mutual netting obligations in a single $O(N + M)$ pass without building multi-gigabyte hash tables in memory.

---

## 6. Code: 3-Sum (Finding Unique Triplets Summing to Zero)

### Problem Statement
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that $i \ne j, i \ne k, \text{ and } j \ne k$, and $\text{nums}[i] + \text{nums}[j] + \text{nums}[k] == 0$. The solution set must **not contain duplicate triplets**.

### Clarifying Questions
1. *Can the elements be negative?* Yes.
2. *Does the order of triplets in the output matter?* No.
3. *What should be returned if fewer than 3 elements exist?* Return an empty list `[]`.

### Optimized Algorithm: Sort + Converging Two Pointers
1. Sort the array in $O(N \log N)$.
2. Iterate `i` from $0$ to $N - 3$. If $\text{nums}[i] > 0$, break early (three positive numbers can never sum to 0).
3. Skip duplicate values of `nums[i]` to prevent duplicate triplets.
4. For each fixed `i`, initialize `left = i + 1` and `right = N - 1`.
5. Run the standard two-pointer check for `target = -nums[i]`.
6. When a matching triplet is found, increment `left` and decrement `right`, skipping any identical adjacent values.

```python
def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort() # O(N log N)
    n = len(nums)
    triplets = []

    for i in range(n - 2):
        # Optimization: If the smallest number > 0, three numbers cannot sum to 0
        if nums[i] > 0:
            break
            
        # Avoid duplicate triplets for the first element
        if i > 0 and nums[i] == nums[i - 1]:
            continue

        left, right = i + 1, n - 1
        target = -nums[i]

        while left < right:
            two_sum = nums[left] + nums[right]
            if two_sum == target:
                triplets.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1

                # Skip duplicate elements for second and third positions
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1

            elif two_sum < target:
                left += 1
            else:
                right -= 1

    return triplets

# Test cases
print(three_sum([-1, 0, 1, 2, -1, -4])) # [[-1, -1, 2], [-1, 0, 1]]
print(three_sum([0, 1, 1]))             # []
print(three_sum([0, 0, 0]))             # [[0, 0, 0]]
```

- **Time Complexity:** $O(N^2)$ (Sorting takes $O(N \log N)$, outer loop runs $N$ times, inner two-pointer scan takes $O(N)$).
- **Space Complexity:** $O(1)$ auxiliary space (excluding sorting stack space, typically $O(\log N)$).
- **Edge Cases:** Array with all zeroes, all positive, all negative, array with identical duplicates.

---

## 7. How It Works Internally: Invariant Preservation
The mathematical foundation of two pointers is **search space reduction**.
- In an unsorted array, there are $\binom{N}{2} = \frac{N(N-1)}{2}$ possible pairs.
- By sorting the array, we establish a strict monotonic invariant: if $\text{nums}[\text{left}] + \text{nums}[\text{right}] > \text{target}$, then *no other element* paired with `nums[right]` could ever equal target, because all other available elements are $\ge \text{nums}[\text{left}]$.
- Therefore, `right` can be safely discarded forever in $O(1)$ step. Each comparison eliminates an entire row or column from the candidate matrix.

---

## 8. Common Mistakes
1. **Failing to Skip Duplicates in 3-Sum:** Not skipping duplicate elements after recording a triplet results in duplicate entries in the output list.
2. **Off-by-One While Skipping Duplicates:** Incrementing `left` without checking `left < right` can cause index out-of-bounds exceptions.
3. **Applying Converging Pointers to Unsorted Arrays:** Converging two pointers *only* works if the search space exhibits monotonicity (e.g., sorted array or geometric boundary).

---

## 9. Performance / Complexity Matrix

| Problem | Naive Complexity | Two-Pointer Time | Auxiliary Space |
| :--- | :---: | :---: | :---: |
| **Two Sum (Sorted)** | $O(N^2)$ | $O(N)$ | $O(1)$ |
| **3-Sum** | $O(N^3)$ | $O(N^2)$ | $O(1)$ |
| **Container With Most Water** | $O(N^2)$ | $O(N)$ | $O(1)$ |
| **Trapping Rain Water** | $O(N^2)$ | $O(N)$ | $O(1)$ |
| **Remove Duplicates from Sorted Array** | $O(N^2)$ | $O(N)$ | $O(1)$ |

---

## 10. Interview Questions (Easy $\to$ Medium $\to$ Hard)

### Easy
- **Q:** Explain how to detect a cycle in a singly linked list using fast and slow pointers (Floyd's Tortoise and Hare algorithm).

### Medium
- **Q:** Given an array representing vertical lines, find two lines that together with the x-axis form a container containing the most water (*Container With Most Water*).

### Hard
- **Q:** Given $N$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using $O(1)$ auxiliary space.

---

## 11. Follow-up Questions from Interviewer
- *"In Container With Most Water, why is it mathematically safe to advance the pointer pointing to the shorter line? Could advancing the taller line ever yield a larger area?"*
- *"Can you extend 3-Sum to 4-Sum and $K$-Sum? What is the generalized time complexity for $K$-Sum?"* *(Answer: $O(N^{K-1})$ time).*

---

## 12. Model Answer: Container With Most Water Greediness

> **Interviewer:** *"Why do we always move the pointer pointing to the shorter line?"*
> 
> **Model Answer:**
> "The area of water between two lines at indices $L$ and $R$ is given by:
> $$\text{Area} = \min(H[L], H[R]) \times (R - L)$$
> 
> The width $(R - L)$ starts at its maximum possible value and strictly decreases by 1 on every step.
> 
> The height of the water is strictly capped by the **shorter line**.
> 
> - If we were to move the **taller line** inwards, the width decreases, but the maximum possible height is still constrained by the unchanged shorter line (or an even shorter one). Therefore, moving the taller line can **never** increase the area.
> - The *only* hope of finding a larger area despite the decreasing width is to find a significantly taller line to replace the current limiting bottleneck. Thus, we must advance the pointer pointing to the shorter line.
> 
> This greedy choice guarantees that no potential maximum area is ever skipped, enabling an optimal $O(N)$ single-pass solution with $O(1)$ auxiliary space."

```python
def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        current_water = min(height[left], height[right]) * width
        max_water = max(max_water, current_water)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water
```

---

## 13. Practical Exercise
Implement **Trapping Rain Water** using two pointers:
Maintain `left_max` and `right_max`. If `height[left] < height[right]`, process `left`: if `height[left] >= left_max`, update `left_max`; otherwise, add `left_max - height[left]` to total water. Then increment `left`. Handle `right` symmetrically.

---

## 14. Quick Revision
- Converging pointers require monotonic sorted arrays.
- Fast and slow pointers find cycle lengths and midpoints of linked lists.
- 3-Sum = Sort ($O(N \log N)$) + Outer loop ($N$) + Two pointers ($N$) = $O(N^2)$.
- Always advance the bottleneck pointer in area maximization problems.

---

## 15. Interview Checklist
- [ ] Writes 3-Sum cleanly without duplicate triplets.
- [ ] Proves mathematically why the shorter line moves in Container With Most Water.
- [ ] Solves Trapping Rain Water in $O(N)$ time and $O(1)$ auxiliary space.
- [ ] Can explain fast and slow pointer cycle detection.
