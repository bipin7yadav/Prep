# Two Pointers Algorithmic Patterns

## 1. Why This Matters
Two-pointer techniques are fundamental to passing algorithmic screening interviews at top engineering hubs like IDFC FIRST Bank. The pattern eliminates nested loops (O(N²)) and reduces problems to linear O(N) scans with O(1) auxiliary space. Interviewers frequently test two pointers on financial series, sorted settlement logs, deduplication, and pair-matching scenarios.

---

## 2. Prerequisites
- Zero-indexed array addressing.
- Sorting fundamentals (understanding that pre-sorting an array takes O(N log N) and often unlocks O(N) two-pointer traversal).

---

## 3. Concept

### Taxonomy of Two Pointers
1. **Opposite-Direction Pointers (Converging):** One pointer starts at the beginning (`left = 0`) and the other at the end (`right = len - 1`). They move toward each other based on comparison conditions (e.g., Two Sum on sorted array, 3-Sum, Container With Most Water).
2. **Same-Direction Pointers (Fast & Slow):** Both pointers start at index 0, but advance at different rates or under different conditions (e.g., Linked List cycle detection, in-place duplicate removal).
3. **Dual-Array Pointers:** One pointer in Array A and one pointer in Array B (e.g., Merge Sorted Arrays, intersection of two banking transaction logs).

```mermaid
flowchart LR
    subgraph Converging["Opposite-Direction (Sorted Array)"]
        L["Left Pointer →"] --> E["[ 2,  5,  7,  11,  15 ]"] <-- R["← Right Pointer"]
    end
```

---

## 4. Simple Example: Two Sum on a Sorted Array (O(N) Time, O(1) Space)

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
At end-of-day clearing, the banking switch matches credit claims against debit obligations across institutions. Given sorted lists of receivables and payables, dual pointers can reconcile mutual netting obligations in a single O(N + M) pass without building multi-gigabyte hash tables in memory.

---

## 6. Code: 3-Sum (Finding Unique Triplets Summing to Zero)

### Problem Statement
Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that i ≠ j, i ≠ k,  and  j ≠ k, and nums[i] + nums[j] + nums[k] == 0. The solution set must **not contain duplicate triplets**.

### Clarifying Questions
1. *Can the elements be negative?* Yes.
2. *Does the order of triplets in the output matter?* No.
3. *What should be returned if fewer than 3 elements exist?* Return an empty list `[]`.

### Optimized Algorithm: Sort + Converging Two Pointers
1. Sort the array in O(N log N).
2. Iterate `i` from 0 to N - 3. If nums[i] > 0, break early (three positive numbers can never sum to 0).
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

- **Time Complexity:** O(N²) (Sorting takes O(N log N), outer loop runs N times, inner two-pointer scan takes O(N)).
- **Space Complexity:** O(1) auxiliary space (excluding sorting stack space, typically O(log N)).
- **Edge Cases:** Array with all zeroes, all positive, all negative, array with identical duplicates.

---

## 7. How It Works Internally: Invariant Preservation
The mathematical foundation of two pointers is **search space reduction**.
- In an unsorted array, there are binom{N}{2} = N(N-1) / 2 possible pairs.
- By sorting the array, we establish a strict monotonic invariant: if nums[left] + nums[right] > target, then *no other element* paired with `nums[right]` could ever equal target, because all other available elements are ≥ nums[left].
- Therefore, `right` can be safely discarded forever in O(1) step. Each comparison eliminates an entire row or column from the candidate matrix.

---

## 8. Common Mistakes
1. **Failing to Skip Duplicates in 3-Sum:** Not skipping duplicate elements after recording a triplet results in duplicate entries in the output list.
2. **Off-by-One While Skipping Duplicates:** Incrementing `left` without checking `left < right` can cause index out-of-bounds exceptions.
3. **Applying Converging Pointers to Unsorted Arrays:** Converging two pointers *only* works if the search space exhibits monotonicity (e.g., sorted array or geometric boundary).

---

## 9. Performance / Complexity Matrix

| Problem | Naive Complexity | Two-Pointer Time | Auxiliary Space |
| :--- | :---: | :---: | :---: |
| **Two Sum (Sorted)** | O(N²) | O(N) | O(1) |
| **3-Sum** | O(N³) | O(N²) | O(1) |
| **Container With Most Water** | O(N²) | O(N) | O(1) |
| **Trapping Rain Water** | O(N²) | O(N) | O(1) |
| **Remove Duplicates from Sorted Array** | O(N²) | O(N) | O(1) |

---

### 🟢 Easy Question: Cycle Detection & Entry in Singly Linked List (Floyd's Algorithm)
**Q:** Explain how to detect whether a linked list contains a cycle, and mathematically derive how to locate the exact node where the cycle begins using fast and slow pointers.

**Complete Answer:**
Floyd's Cycle Finding Algorithm uses two pointers: `slow` (moves 1 step at a time) and `fast` (moves 2 steps at a time).
1. **Cycle Detection:** If there is no cycle, `fast` reaches `None`. If there is a cycle, `fast` enters the cycle and laps `slow` from behind, closing the gap by 1 node per step until `slow == fast`.
2. **Finding the Cycle Entry Point (Mathematical Proof):**
   - Let `F` = distance from head to cycle entrance.
   - Let `C` = length of the cycle.
   - Let `a` = distance from cycle entrance to the meeting point.
   - Distance traveled by `slow` = `F + a`.
   - Distance traveled by `fast` = `F + a + n * C` (where `n` is number of complete loops `fast` made).
   - Since `fast` travels at 2x speed:
     `2 * (F + a) = F + a + n * C`
     `F + a = n * C`
     `F = n * C - a = (n - 1) * C + (C - a)`.
   - Notice: `C - a` is the remaining distance from the meeting point to the cycle entrance!
   - Therefore, if we place one pointer at the `head` and keep another pointer at the `meeting_point`, and advance both at 1 step per tick, they will collide at the cycle entrance after exactly `F` steps.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def detect_cycle_entry(head: ListNode | None) -> ListNode | None:
    """Detects cycle and returns the entrance node.
    Time Complexity: O(N).
    Auxiliary Space: O(1).
    """
    if not head or not head.next:
        return None

    slow = head
    fast = head

    # Step 1: Detect collision
    has_cycle = False
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            has_cycle = True
            break

    if not has_cycle:
        return None

    # Step 2: Reset slow to head; advance both at 1x speed to find entry
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next

    return slow
```

---

### 🟠 Medium Question: Container With Most Water
**Q:** Given an array representing vertical lines, find two lines that together with the x-axis form a container containing the most water.

**Complete Answer:**
Use converging two pointers starting at opposite boundaries (`left = 0`, `right = len(height) - 1`). Compute `current_area = min(height[left], height[right]) * (right - left)`. Advance the pointer with the smaller height.

```python
def max_area(height: list[int]) -> int:
    """Finds maximum container water volume.
    Time Complexity: O(N) single pass.
    Auxiliary Space: O(1).
    """
    left, right = 0, len(height) - 1
    max_water = 0

    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, h * width)

        # Greedily discard the limiting bottleneck
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_water

# Verification
assert max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]) == 49
assert max_area([1, 1]) == 1
```

---

### 🔴 Hard Question: Trapping Rain Water in O(1) Auxiliary Space
**Q:** Given an array of non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining using strictly **O(1) auxiliary space**.

**Complete Answer:**
- **Core Principle:** Water trapped at index `i` is determined by `min(max_left, max_right) - height[i]`.
- **Two-Pointer Optimization:** Instead of precomputing left and right max arrays (which takes O(N) auxiliary memory), use two pointers (`left` and `right`) and maintain `left_max` and `right_max`.
  - If `left_max < right_max`, the water capacity on the left side is strictly constrained by `left_max` regardless of future peaks on the right. We process `height[left]` and advance `left`.
  - Otherwise, water on the right side is constrained by `right_max`. We process `height[right]` and advance `right`.

```python
def trap_rain_water(height: list[int]) -> int:
    """Calculates trapped rainwater in O(N) time and O(1) space."""
    if not height:
        return 0

    left, right = 0, len(height) - 1
    left_max = height[left]
    right_max = height[right]
    total_water = 0

    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            total_water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            total_water += right_max - height[right]

    return total_water

# Verification
assert trap_rain_water([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]) == 6
assert trap_rain_water([4, 2, 0, 3, 2, 5]) == 9
```

---

## 11. Follow-up Questions from Interviewer with Complete Answers

### 🎤 Follow-up 1
**Interviewer:** *"In Container With Most Water, why is it mathematically safe to advance the pointer pointing to the shorter line? Could advancing the taller line ever yield a larger area?"*

**Complete Answer:**
- The area between lines `L` and `R` is: `Area(L, R) = min(H[L], H[R]) * (R - L)`.
- Suppose without loss of generality that `H[L] ≤ H[R]`. Then `Area(L, R) = H[L] * (R - L)`.
- If we keep `L` fixed and move the taller line `R` inwards to any index `R' < R`:
  - The width strictly shrinks: `(R' - L) < (R - L)`.
  - The new height is `min(H[L], H[R']) ≤ H[L]`.
  - Therefore, `Area(L, R') ≤ H[L] * (R' - L) < H[L] * (R - L) = Area(L, R)`.
- **Mathematical Conclusion:** For the current `L`, pairing it with *any* other inner line will strictly produce a smaller area than `Area(L, R)`.
- Therefore, line `L` can never be part of any larger container than the one we have already examined. It is mathematically impossible to miss the global maximum by discarding `L` (`left += 1`).

---

### 🎤 Follow-up 2
**Interviewer:** *"Can you generalize 3-Sum to K-Sum? How do you implement a clean recursive reduction in Python, and what is the tight asymptotic bound?"*

**Complete Answer:**
- **Generalized K-Sum Reduction Strategy:**
  1. Sort the input array once in `O(N log N)`.
  2. Reduce `K-Sum` recursively to `(K - 1)-Sum` by fixing the first element and calling `K_sum(target - nums[i])`.
  3. Base Case: When `K == 2`, solve using the standard two-pointer technique in `O(N)` time.
  4. **Pruning Optimizations:**
     - If `nums[start] * K > target` or `nums[-1] * K < target`, break immediately (impossible to reach target).
     - Skip identical consecutive numbers (`if i > start and nums[i] == nums[i - 1]: continue`) to guarantee uniqueness.
- **Time Complexity:** `O(N^(K - 1))` time. For 3-Sum: `O(N²)`. For 4-Sum: `O(N³)`.

```python
def k_sum(nums: list[int], target: int, k: int) -> list[list[int]]:
    """Generalized K-Sum solver with recursion and duplicate skipping."""
    nums.sort()

    def k_sum_helper(start: int, target: int, k: int) -> list[list[int]]:
        res = []
        if start >= len(nums):
            return res

        # Average value pruning
        avg = target // k
        if nums[start] > avg or nums[-1] < avg:
            return res

        # Base case: 2-Sum via two pointers
        if k == 2:
            left, right = start, len(nums) - 1
            while left < right:
                curr_sum = nums[left] + nums[right]
                if curr_sum == target:
                    res.append([nums[left], nums[right]])
                    left += 1
                    right -= 1
                    while left < right and nums[left] == nums[left - 1]:
                        left += 1
                    while left < right and nums[right] == nums[right + 1]:
                        right -= 1
                elif curr_sum < target:
                    left += 1
                else:
                    right -= 1
            return res

        # Recursive step: reduce K to K-1
        for i in range(start, len(nums) - k + 1):
            if i > start and nums[i] == nums[i - 1]:
                continue
            sub_results = k_sum_helper(i + 1, target - nums[i], k - 1)
            for sub in sub_results:
                res.append([nums[i]] + sub)

        return res

    return k_sum_helper(0, target, k)

# Verification
assert k_sum([1, 0, -1, 0, -2, 2], 0, 4) == [
    [-2, -1, 1, 2],
    [-2, 0, 0, 2],
    [-1, 0, 0, 1]
]
```

---

## 13. Practical Exercise
Implement **Trapping Rain Water** using two pointers:
Maintain `left_max` and `right_max`. If `height[left] < height[right]`, process `left`: if `height[left] >= left_max`, update `left_max`; otherwise, add `left_max - height[left]` to total water. Then increment `left`. Handle `right` symmetrically.

---

## 14. Quick Revision
- Converging pointers require monotonic sorted arrays.
- Fast and slow pointers find cycle lengths and midpoints of linked lists.
- 3-Sum = Sort (O(N log N)) + Outer loop (N) + Two pointers (N) = O(N²).
- Always advance the bottleneck pointer in area maximization problems.

---

## 15. Interview Checklist
- [ ] Writes 3-Sum cleanly without duplicate triplets.
- [ ] Proves mathematically why the shorter line moves in Container With Most Water.
- [ ] Solves Trapping Rain Water in O(N) time and O(1) auxiliary space.
- [ ] Can explain fast and slow pointer cycle detection.
