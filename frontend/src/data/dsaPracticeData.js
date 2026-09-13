/* Curated Master DSA Practice Dataset with Python Solutions & Banking Scenarios */

export const DSA_PROBLEMS_COUNT = 21;

export const DSA_PROBLEMS = [
  {
    "id": "dsa-kadane",
    "title": "Maximum Subarray Sum (Kadane's Algorithm)",
    "category": "Arrays",
    "difficulty": "Medium",
    "pattern": "Prefix Running State / Dynamic Programming",
    "statement": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    "constraints": "1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
    "intuitionHinglish": "Socho agar purana running sum negative (< 0) ho chuka hai, toh aage aane waale kisi bhi element mein use add karne se faida nahi hoga\u2014wo sum ko sirf kam hi karega! Isliye agar running sum negative ho jaye, toh use reset karke current element se naya start karo.",
    "approach": "Traverse the array while maintaining two variables: `current_sum` and `max_sum`. At each step, `current_sum = max(num, current_sum + num)`. Update `max_sum = max(max_sum, current_sum)`.",
    "pythonSolution": "def maxSubArray(nums: list[int]) -> int:\n    current_sum = 0\n    max_sum = float('-inf')\n    \n    for num in nums:\n        # If current_sum becomes negative, discard and start fresh from num\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n        \n    return max_sum\n\n# Test Example:\n# nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4] -> Output: 6 ([4, -1, 2, 1])",
    "timeComplexity": "O(N) \u2014 Single linear scan",
    "spaceComplexity": "O(1) \u2014 Auxiliary constant space",
    "commonMistakes": "Initializing max_sum to 0 instead of float('-inf') (fails when all numbers are negative, e.g. [-5, -2, -8]).",
    "interviewerFollowUps": [
      "What if the interviewer asks you to return the actual start and end indices of the subarray?",
      "What if the array is circular (Circular Maximum Subarray)?"
    ],
    "bankingScenario": "Calculating maximum profit or net cashflow recovery period across a sequence of volatile trading ledger days."
  },
  {
    "id": "dsa-merge-intervals",
    "title": "Merge Overlapping Intervals",
    "category": "Arrays",
    "difficulty": "Medium",
    "pattern": "Sorting & Interval Sweep",
    "statement": "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    "constraints": "1 <= intervals.length <= 10^4, intervals[i].length == 2, 0 <= start_i <= end_i <= 10^4",
    "intuitionHinglish": "Pehle intervals ko unke start time ke basis par sort kar lo. Sort karne ke baad overlapping intervals hamesha bagal-bagal (adjacent) aa jayenge. Agar agle interval ka start pehle interval ke end se chota ya barabar hai, toh merge kar do!",
    "approach": "1. Sort intervals by start time using `intervals.sort(key=lambda x: x[0])`.\n2. Iterate through intervals. If result list is empty or current start > previous end, append.\n3. Else, merge by updating previous end: `result[-1][1] = max(result[-1][1], current_end)`.",
    "pythonSolution": "def merge(intervals: list[list[int]]) -> list[list[int]]:\n    if not intervals:\n        return []\n        \n    # Sort primarily by interval start time\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    \n    for start, end in intervals[1:]:\n        prev_start, prev_end = merged[-1]\n        \n        if start <= prev_end:\n            # Overlapping: expand previous interval's end boundary\n            merged[-1][1] = max(prev_end, end)\n        else:\n            # Non-overlapping: append as fresh interval\n            merged.append([start, end])\n            \n    return merged",
    "timeComplexity": "O(N log N) \u2014 Due to sorting",
    "spaceComplexity": "O(N) \u2014 To store merged output",
    "commonMistakes": "Forgetting to update with max(prev_end, end) when one interval completely swallows another, e.g. [1, 10] and [2, 5].",
    "interviewerFollowUps": [
      "How would you insert a new interval into an already sorted non-overlapping list in O(N) without full re-sorting?"
    ],
    "bankingScenario": "Consolidating overlapping loan moratorium periods or scheduled maintenance blackout windows."
  },
  {
    "id": "dsa-3sum",
    "title": "3Sum (Zero Sum Triplets)",
    "category": "Two Pointers",
    "difficulty": "Medium",
    "pattern": "Sort + Fixed Outer Loop + Two Pointers",
    "statement": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    "constraints": "3 <= nums.length <= 3000, -10^5 <= nums[i] <= 10^5",
    "intuitionHinglish": "Brute force 3 nested loops $O(N^3)$ time lega. Agar hum pehle array ko sort kar lein $O(N \\log N)$, toh hum ek element ko fix karke bache hue array par Two Pointers (Left and Right) chala sakte hain! Sum < 0 ho toh left aage badhao, Sum > 0 ho toh right peeche lao.",
    "approach": "1. Sort `nums`.\n2. Loop `i` from 0 to n-3. Skip duplicates if `nums[i] == nums[i-1]`.\n3. Set `left = i + 1`, `right = n - 1`.\n4. Check `total = nums[i] + nums[left] + nums[right]`. If 0, record triplet and skip duplicate inner numbers. If < 0, `left += 1`. If > 0, `right -= 1`.",
    "pythonSolution": "def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    n = len(nums)\n    \n    for i in range(n - 2):\n        # Optimization: if smallest number > 0, sum can never be 0\n        if nums[i] > 0:\n            break\n        # Skip duplicate outer anchor values\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n            \n        left = i + 1\n        right = n - 1\n        \n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            \n            if total == 0:\n                res.append([nums[i], nums[left], nums[right]])\n                # Skip duplicate elements on left and right\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n            elif total < 0:\n                left += 1\n            else:\n                right -= 1\n                \n    return res",
    "timeComplexity": "O(N^2) \u2014 Outer loop runs N times, inner two-pointer runs O(N)",
    "spaceComplexity": "O(1) auxiliary (or O(N) for sorting depending on language)",
    "commonMistakes": "Not skipping duplicate numbers properly, producing identical triplets in output.",
    "interviewerFollowUps": [
      "Can you solve 3Sum Closest (finding triplet whose sum is closest to a target)?"
    ],
    "bankingScenario": "Multi-party payment offsetting: finding 3 accounts whose net transfer debits and credits cancel out perfectly to zero."
  },
  {
    "id": "dsa-longest-substring-without-repeating",
    "title": "Longest Substring Without Repeating Characters",
    "category": "Sliding Window",
    "difficulty": "Medium",
    "pattern": "Dynamic Sliding Window with Hash Map / Set",
    "statement": "Given a string `s`, find the length of the longest substring without duplicate characters.",
    "constraints": "0 <= s.length <= 5 * 10^4, `s` consists of English letters, digits, symbols and spaces.",
    "intuitionHinglish": "Window expand karte jao `right` pointer se. Agar koi character repeat ho jaye jo current window ke andar hai, toh `left` pointer ko direct duplicate character ke pichle index ke aage jump kara do! Isse baar-baar 1-1 step shrink karne ki zaroorat nahi padti.",
    "approach": "Use a dictionary `char_map` storing `{character: last_seen_index}`. Maintain `left = 0` and `max_len = 0`. For each `right` from 0 to n-1: if `s[right]` in `char_map` and `char_map[s[right]] >= left`, jump `left = char_map[s[right]] + 1`. Update `char_map[s[right]] = right` and `max_len = max(max_len, right - left + 1)`.",
    "pythonSolution": "def lengthOfLongestSubstring(s: str) -> int:\n    char_map = {} # char -> last seen index\n    left = 0\n    max_len = 0\n    \n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            # Jump left boundary past the previous occurrence\n            left = char_map[char] + 1\n            \n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n        \n    return max_len",
    "timeComplexity": "O(N) \u2014 Every character is visited once",
    "spaceComplexity": "O(min(N, M)) \u2014 Space for hash map where M is alphabet size (at most 128 ASCII)",
    "commonMistakes": "Forgetting the condition `char_map[char] >= left`. If an old character was seen BEFORE `left`, jumping left backwards would corrupt the window!",
    "interviewerFollowUps": [
      "What if at most K distinct characters are allowed?",
      "What if you need to return the actual longest substring string, not just length?"
    ],
    "bankingScenario": "Validating non-repeating unique verification codes or transaction token sequences."
  },
  {
    "id": "dsa-sliding-window-maximum",
    "title": "Sliding Window Maximum (Fraud Bursts)",
    "category": "Sliding Window",
    "difficulty": "Hard",
    "pattern": "Monotonic Deque (Double-Ended Queue)",
    "statement": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position. Return the max sliding window.",
    "constraints": "1 <= nums.length <= 10^5, 1 <= k <= nums.length",
    "intuitionHinglish": "Har window mein max element dhundhna hai. Agar koi naya number aata hai jo Deque ke pichle numbers se bada hai, toh purane chote numbers ab kabhi bhi max nahi ban sakte! Unhe piche se `pop()` kar do. Is tarah Deque hamesha strictly decreasing order mein rehta hai aur `deque[0]` par hamesha current window ka maximum hota hai.",
    "approach": "1. Maintain `collections.deque` storing indices.\n2. For each index `i`: remove elements outside window (`deque[0] <= i - k`).\n3. Remove smaller elements from back of deque while `nums[deque[-1]] < nums[i]`.\n4. Append `i` to deque.\n5. If `i >= k - 1`, append `nums[deque[0]]` to result.",
    "pythonSolution": "from collections import deque\n\ndef maxSlidingWindow(nums: list[int], k: int) -> list[int]:\n    dq = deque() # Stores INDICES of candidate max elements\n    res = []\n    \n    for i, num in enumerate(nums):\n        # 1. Remove indices that are out of current window [i - k + 1, i]\n        if dq and dq[0] < i - k + 1:\n            dq.popleft()\n            \n        # 2. Maintain monotonic decreasing order: pop smaller elements from back\n        while dq and nums[dq[-1]] < num:\n            dq.pop()\n            \n        # 3. Add current index\n        dq.append(i)\n        \n        # 4. Record max element once first full window of size k is formed\n        if i >= k - 1:\n            res.append(nums[dq[0]])\n            \n    return res",
    "timeComplexity": "O(N) \u2014 Each element is pushed and popped from Deque at most once",
    "spaceComplexity": "O(K) \u2014 Maximum size of deque is k",
    "commonMistakes": "Storing values instead of indices in deque (makes it impossible to check if the maximum has slid out of the window).",
    "interviewerFollowUps": [
      "How does this apply to real-time high-value fraud detection across sliding time windows?"
    ],
    "bankingScenario": "Real-time monitoring of peak transaction volume or largest debit spike in any rolling 1-hour window."
  },
  {
    "id": "dsa-two-sum",
    "title": "Two Sum",
    "category": "Hashing",
    "difficulty": "Easy",
    "pattern": "Hash Map Complement Lookup",
    "statement": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    "constraints": "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9",
    "intuitionHinglish": "Jab hum number `x` par hain, hume bas ye dekhna hai ki kya uska complement `target - x` humne pehle dekha hai? Hash map mein har dekhe hue number ka index save karte jao. O(1) lookup se single pass mein solve ho jata hai!",
    "approach": "Initialize `seen = {}`. For each index `i, num` in `nums`: calculate `diff = target - num`. If `diff` in `seen`, return `[seen[diff], i]`. Else store `seen[num] = i`.",
    "pythonSolution": "def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {} # value -> index\n    \n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n        \n    return []",
    "timeComplexity": "O(N) \u2014 Single pass through array",
    "spaceComplexity": "O(N) \u2014 Auxiliary hash map",
    "commonMistakes": "Checking if complement is in array using `if complement in nums` which is an O(N) operation inside loop, making it O(N^2) instead of O(N) hash lookup!",
    "interviewerFollowUps": [
      "What if the input array is already sorted? (Use Two Pointers for O(1) extra space)."
    ],
    "bankingScenario": "Pairing matching debit and credit payment legs in double-entry reconciliation."
  },
  {
    "id": "dsa-longest-consecutive",
    "title": "Longest Consecutive Sequence",
    "category": "Hashing",
    "difficulty": "Medium",
    "pattern": "Hash Set Intelligent Sequence Start",
    "statement": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(N) time.",
    "constraints": "0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9",
    "intuitionHinglish": "Agar hum array ko set mein daal lein, toh hum O(1) mein lookup kar sakte hain. Key trick: Koi number `x` tabhi kisi sequence ka start ban sakta hai agar `x - 1` set mein NA ho! Agar `x - 1` exist karta hai, toh hum use skip karte hain kyunki wo already kisi badi sequence ka part hoga.",
    "approach": "1. Put all numbers into `num_set = set(nums)`.\n2. For each `num` in `num_set`: if `num - 1 not in num_set`, this is a sequence start.\n3. Count consecutive numbers (`curr = num + 1`, `length += 1`) while `curr in num_set`.\n4. Update `max_len = max(max_len, length)`.",
    "pythonSolution": "def longestConsecutive(nums: list[int]) -> int:\n    num_set = set(nums)\n    longest = 0\n    \n    for num in num_set:\n        # Check if num is the beginning of a sequence\n        if num - 1 not in num_set:\n            curr_num = num\n            curr_streak = 1\n            \n            while curr_num + 1 in num_set:\n                curr_num += 1\n                curr_streak += 1\n                \n            longest = max(longest, curr_streak)\n            \n    return longest",
    "timeComplexity": "O(N) \u2014 Each number is visited at most twice",
    "spaceComplexity": "O(N) \u2014 Hash set storage",
    "commonMistakes": "Iterating over every number without checking `if num - 1 not in num_set`, which causes O(N^2) worst case on consecutive sequences.",
    "interviewerFollowUps": [
      "Can you solve this if the stream of numbers is infinite and numbers arrive one by one? (Use Union-Find)."
    ],
    "bankingScenario": "Detecting consecutive check number clearing streaks or sequential fraud invoice numbers."
  },
  {
    "id": "dsa-valid-parentheses",
    "title": "Valid Parentheses",
    "category": "Stack",
    "difficulty": "Easy",
    "pattern": "LIFO Stack Matching",
    "statement": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "constraints": "1 <= s.length <= 10^4",
    "intuitionHinglish": "Jo bracket sabse aakhri mein open hua hai, use sabse pehle close hona chahiye (LIFO - Last In First Out). Stack mein open brackets push karte jao; closing bracket aane par stack top se matching check karo.",
    "approach": "Use a stack and a dictionary `{')': '(', '}': '{', ']': '['}`. For char in s: if closing, check if stack not empty and top matches; else append open. At end, return `len(stack) == 0`.",
    "pythonSolution": "def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    \n    for char in s:\n        if char in mapping:\n            # Closing bracket: pop top element or dummy mismatch\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            # Opening bracket: push to stack\n            stack.append(char)\n            \n    return len(stack) == 0",
    "timeComplexity": "O(N) \u2014 Single pass scan",
    "spaceComplexity": "O(N) \u2014 Worst case all opening brackets in stack",
    "commonMistakes": "Not checking if stack is empty before popping (causes IndexError).",
    "interviewerFollowUps": [
      "How would you validate nested JSON payload structures in an API gateway?"
    ],
    "bankingScenario": "Validating JSON schemas and nested XML tags in ISO 20022 financial messages."
  },
  {
    "id": "dsa-next-greater-element",
    "title": "Next Greater Element (Monotonic Stack)",
    "category": "Stack",
    "difficulty": "Medium",
    "pattern": "Monotonic Decreasing Stack",
    "statement": "Given an array `nums`, find the next greater element for each element in the array. If no greater element exists to the right, output -1.",
    "constraints": "1 <= nums.length <= 10^5",
    "intuitionHinglish": "Right to left traverse karo. Stack mein elements strictly decreasing order mein maintain karo. Jo element current number se chote hain, wo aage aane waale kisi bhi element ke liye 'next greater' nahi ban sakte, unhe `pop()` kar do!",
    "approach": "Traverse from right to left (n-1 down to 0). While stack and stack[-1] <= nums[i]: pop. Result[i] = stack[-1] if stack else -1. Push nums[i] to stack.",
    "pythonSolution": "def nextGreaterElements(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [-1] * n\n    stack = [] # Monotonic decreasing stack\n    \n    for i in range(n - 1, -1, -1):\n        # Pop elements that are smaller than or equal to current number\n        while stack and stack[-1] <= nums[i]:\n            stack.pop()\n            \n        if stack:\n            res[i] = stack[-1]\n            \n        stack.append(nums[i])\n        \n    return res",
    "timeComplexity": "O(N) \u2014 Each element pushed and popped at most once",
    "spaceComplexity": "O(N) \u2014 For stack storage",
    "commonMistakes": "Using nested loops giving O(N^2) TLE on large arrays.",
    "interviewerFollowUps": [
      "What if the array is circular? (Loop 2 * n - 1 down to 0 using modulo index `i % n`)."
    ],
    "bankingScenario": "Finding the next higher interest rate hike or stock price breakout point."
  },
  {
    "id": "dsa-reverse-linked-list",
    "title": "Reverse Linked List",
    "category": "Linked List",
    "difficulty": "Easy",
    "pattern": "Three-Pointer Iterative Pointer Reversal",
    "statement": "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    "constraints": "Number of nodes in range [0, 5000]",
    "intuitionHinglish": "3 pointers maintain karo: `prev`, `curr`, aur `next_temp`. Har node par `curr.next` ko piche `prev` ki taraf point kara do, aur teeno pointers ko 1-1 step aage move karte jao.",
    "approach": "Initialize `prev = None`, `curr = head`. While `curr`: `temp = curr.next; curr.next = prev; prev = curr; curr = temp`. Return `prev`.",
    "pythonSolution": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head: ListNode | None) -> ListNode | None:\n    prev = None\n    curr = head\n    \n    while curr:\n        next_node = curr.next # Save next pointer\n        curr.next = prev      # Reverse pointer backwards\n        prev = curr           # Move prev forward\n        curr = next_node      # Move curr forward\n        \n    return prev # New head of reversed list",
    "timeComplexity": "O(N) \u2014 Traverses the list once",
    "spaceComplexity": "O(1) \u2014 In-place pointer manipulation",
    "commonMistakes": "Losing the reference to `curr.next` before reversing the link (breaks the traversal).",
    "interviewerFollowUps": [
      "Can you solve it recursively in O(N) call stack space?",
      "Can you reverse between position Left and Right in a single pass?"
    ],
    "bankingScenario": "Reversing an append-only linked list of financial audit ledger blocks for chronological review."
  },
  {
    "id": "dsa-linked-list-cycle",
    "title": "Linked List Cycle Detection (Floyd's Tortoise & Hare)",
    "category": "Linked List",
    "difficulty": "Easy",
    "pattern": "Fast and Slow Pointers",
    "statement": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it using O(1) memory.",
    "constraints": "Number of nodes in range [0, 10^4]",
    "intuitionHinglish": "Ek circular running track par agar do runners daudte hain\u2014ek 1x speed par (slow) aur doosra 2x speed par (fast)\u2014toh fast runner hamesha slow runner ko peeche se lap karke catch kar lega! Agar fast runner `None` hit karta hai, toh list linear hai (no cycle).",
    "approach": "Set `slow = head, fast = head`. While `fast and fast.next`: `slow = slow.next; fast = fast.next.next`. If `slow == fast`, return True. Return False if loop terminates.",
    "pythonSolution": "def hasCycle(head: ListNode | None) -> bool:\n    slow = head\n    fast = head\n    \n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        \n        if slow == fast:\n            return True # Met inside the cycle!\n            \n    return False # Reached the end (no cycle)",
    "timeComplexity": "O(N) \u2014 Linear traversal",
    "spaceComplexity": "O(1) \u2014 No extra memory",
    "commonMistakes": "Only checking `while fast:` without checking `while fast and fast.next:` (raises AttributeError on `fast.next.next`).",
    "interviewerFollowUps": [
      "How do you find the exact node where the cycle begins? (Reset slow to head, move both 1 step at a time until they meet)."
    ],
    "bankingScenario": "Detecting circular routing loops in banking payment routing networks."
  },
  {
    "id": "dsa-search-rotated-array",
    "title": "Search in Rotated Sorted Array",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Modified Binary Search on Partitioned Order",
    "statement": "There is an integer array `nums` sorted in ascending order (with distinct values), rotated at an unknown pivot index. Given `target`, return the index of `target` if it is in `nums`, or -1 if not in `nums` in O(log N) time.",
    "constraints": "1 <= nums.length <= 5000, -10^4 <= nums[i] <= 10^4",
    "intuitionHinglish": "Jab bhi rotated sorted array ko mid par kaatoge, ek side hamesha strictly sorted hogi! Check karo: Kya left half sorted hai (`nums[low] <= nums[mid]`)? Agar haan, toh check karo kya target left half ke range mein hai. Agar nahi, toh right half mein search karo.",
    "approach": "1. `low = 0, high = n - 1`.\n2. `mid = (low + high) // 2`.\n3. If `nums[mid] == target`, return mid.\n4. If left half is sorted (`nums[low] <= nums[mid]`): if `nums[low] <= target < nums[mid]`, `high = mid - 1`; else `low = mid + 1`.\n5. Else (right half is sorted): if `nums[mid] < target <= nums[high]`, `low = mid + 1`; else `high = mid - 1`.",
    "pythonSolution": "def search(nums: list[int], target: int) -> int:\n    low = 0\n    high = len(nums) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        \n        if nums[mid] == target:\n            return mid\n            \n        # Check if left half is normally sorted\n        if nums[low] <= nums[mid]:\n            if nums[low] <= target < nums[mid]:\n                high = mid - 1\n            else:\n                low = mid + 1\n        # Otherwise, right half MUST be sorted\n        else:\n            if nums[mid] < target <= nums[high]:\n                low = mid + 1\n            else:\n                high = mid - 1\n                \n    return -1",
    "timeComplexity": "O(log N) \u2014 Binary search division",
    "spaceComplexity": "O(1) \u2014 Constant memory",
    "commonMistakes": "Using `<` instead of `<=` in `nums[low] <= nums[mid]` (fails on 2-element arrays).",
    "interviewerFollowUps": [
      "What if duplicate numbers are allowed in the array? (Worst case degrades to O(N) when nums[low] == nums[mid] == nums[high])."
    ],
    "bankingScenario": "Searching in circular partitioned account log files or time-shifted audit events."
  },
  {
    "id": "dsa-lca-tree",
    "title": "Lowest Common Ancestor in Binary Tree",
    "category": "Trees",
    "difficulty": "Medium",
    "pattern": "Postorder Depth-First Search (DFS)",
    "statement": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes `p` and `q`.",
    "constraints": "Number of nodes in range [2, 10^5], All Node.val are unique",
    "intuitionHinglish": "Bottom-up socho! Agar current node khud `p` ya `q` hai, toh wahi se wapas return ho jao. Agar left subtree se bhi non-null answer mile aur right subtree se bhi non-null answer mile, iska matlab ek node left mein hai aur doosra right mein hai\u2014toh current node hi unka Lowest Common Ancestor hai!",
    "approach": "Base case: If root is None or root == p or root == q: return root. Recurse left and right. If left and right: return root. Return left if left else right.",
    "pythonSolution": "class TreeNode:\n    def __init__(self, x):\n        self.val = x\n        self.left = None\n        self.right = None\n\ndef lowestCommonAncestor(root: TreeNode | None, p: TreeNode, q: TreeNode) -> TreeNode | None:\n    # Base Case: Reached leaf or found either target node\n    if not root or root == p or root == q:\n        return root\n        \n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    \n    # If both subtrees returned non-null, root is the LCA split point\n    if left and right:\n        return root\n        \n    # Otherwise return the non-null branch\n    return left if left else right",
    "timeComplexity": "O(N) \u2014 May visit all nodes",
    "spaceComplexity": "O(H) \u2014 Height of tree recursion stack space",
    "commonMistakes": "Assuming the tree is a Binary Search Tree (BST) when it's a general Binary Tree.",
    "interviewerFollowUps": [
      "How would the solution simplify if the tree was guaranteed to be a BST? (No recursion needed; just compare values with root in O(H) time)."
    ],
    "bankingScenario": "Finding the lowest common reporting manager in an employee hierarchy or common parent corporate entity."
  },
  {
    "id": "dsa-level-order",
    "title": "Binary Tree Level Order Traversal (BFS)",
    "category": "Trees",
    "difficulty": "Medium",
    "pattern": "Breadth-First Search with Queue",
    "statement": "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    "constraints": "Number of nodes in range [0, 2000]",
    "intuitionHinglish": "Level-by-level traverse karne ke liye FIFO Queue use karo. Har level ke start par queue ka size measure kar lo (`level_size = len(queue)`). Utne hi elements ko pop karke current level list mein add karo aur unke children queue mein push karo.",
    "approach": "Use `collections.deque([root])`. While queue: `level = []`. For `_ in range(len(queue))`: popleft, append val to level, push left/right children. Append level to results.",
    "pythonSolution": "from collections import deque\n\ndef levelOrder(root: TreeNode | None) -> list[list[int]]:\n    if not root:\n        return []\n        \n    queue = deque([root])\n    result = []\n    \n    while queue:\n        level_size = len(queue)\n        current_level = []\n        \n        for _ in range(level_size):\n            node = queue.popleft()\n            current_level.append(node.val)\n            \n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n                \n        result.append(current_level)\n        \n    return result",
    "timeComplexity": "O(N) \u2014 Visits every node once",
    "spaceComplexity": "O(W) \u2014 Maximum width of tree in queue (up to N/2 nodes at lowest level)",
    "commonMistakes": "Not snapshotting `level_size = len(queue)` at the start of loop (iterating dynamically mixes levels).",
    "interviewerFollowUps": [
      "How would you implement Zigzag / Spiral level order traversal?"
    ],
    "bankingScenario": "Hierarchy level audits in organization structures or distributed cluster topology mapping."
  },
  {
    "id": "dsa-course-schedule",
    "title": "Course Schedule (Cycle Detection / Topological Sort)",
    "category": "Graphs",
    "difficulty": "Medium",
    "pattern": "Kahn's Algorithm (BFS In-degree Topological Sort)",
    "statement": "There are `numCourses` courses labeled from 0 to numCourses - 1. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you must take course b_i first if you want to take course a_i. Return true if you can finish all courses, else false.",
    "constraints": "1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000",
    "intuitionHinglish": "Agar dependencies mein cycle hai (A depends on B, B depends on A), toh courses kabhi finish nahi ho sakte! Kahn's Algorithm use karo: Har course ka `in_degree` (prerequisites count) nikalo. Jiska in_degree 0 hai use queue mein dalo aur process karte waqt uske dependent courses ka in_degree ghatate jao.",
    "approach": "1. Build adjacency list `adj` and array `in_degree`.\n2. Push all nodes with `in_degree == 0` into `queue`.\n3. Count processed nodes. While queue: pop node, `count += 1`. For neighbor in `adj[node]`: `in_degree[neighbor] -= 1`; if 0, push.\n4. Return `count == numCourses`.",
    "pythonSolution": "from collections import deque\n\ndef canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    adj = {i: [] for i in range(numCourses)}\n    in_degree = [0] * numCourses\n    \n    for course, prereq in prerequisites:\n        adj[prereq].append(course)\n        in_degree[course] += 1\n        \n    # Queue initially contains courses with 0 prerequisites\n    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    completed_count = 0\n    \n    while queue:\n        curr = queue.popleft()\n        completed_count += 1\n        \n        for neighbor in adj[curr]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n                \n    return completed_count == numCourses",
    "timeComplexity": "O(V + E) \u2014 Standard BFS on graph",
    "spaceComplexity": "O(V + E) \u2014 Adjacency list and queue",
    "commonMistakes": "Constructing graph with reversed edge direction (e.g. course -> prereq instead of prereq -> course).",
    "interviewerFollowUps": [
      "Can you return the actual valid course ordering sequence? (Course Schedule II)."
    ],
    "bankingScenario": "Batch job dependency scheduling in nightly banking settlements or distributed build DAGs."
  },
  {
    "id": "dsa-coin-change",
    "title": "Coin Change (Minimum Coins)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "Bottom-Up Unbounded Knapsack DP",
    "statement": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    "constraints": "1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1, 0 <= amount <= 10^4",
    "intuitionHinglish": "Greedy approach fail ho sakti hai (e.g. coins [1, 3, 4], amount = 6: Greedy picks 4+1+1 = 3 coins, but optimal is 3+3 = 2 coins!). Isliye DP table banate hain jahan `dp[i]` represents minimum coins needed to make amount `i`.",
    "approach": "1. Initialize `dp = [float('inf')] * (amount + 1)`, set `dp[0] = 0`.\n2. For `i` from 1 to `amount`: for `coin` in `coins`: if `i - coin >= 0`: `dp[i] = min(dp[i], dp[i - coin] + 1)`.\n3. Return `dp[amount]` if != inf else -1.",
    "pythonSolution": "def coinChange(coins: list[int], amount: int) -> int:\n    # dp[i] = minimum coins required to make amount i\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0 # 0 coins needed to make amount 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if i - coin >= 0:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n                \n    return dp[amount] if dp[amount] != float('inf') else -1",
    "timeComplexity": "O(amount * len(coins)) \u2014 Nested loops",
    "spaceComplexity": "O(amount) \u2014 1D DP array",
    "commonMistakes": "Assuming Greedy (always picking largest coin) works (only works for canonical currency systems like USD/INR, fails on arbitrary coin sets).",
    "interviewerFollowUps": [
      "What if you need to count the total number of distinct ways to make change? (Coin Change 2)."
    ],
    "bankingScenario": "ATM cash cassette dispensation: finding the optimal note combination to minimize physical cash dispense count."
  },
  {
    "id": "dsa-kth-largest",
    "title": "Kth Largest Element in an Array (Min-Heap)",
    "category": "Heaps / Priority Queue",
    "difficulty": "Medium",
    "pattern": "Min-Heap of size K",
    "statement": "Given an integer array  and an integer , return the th largest element in the array. Note that it is the th largest element in the sorted order, not the th distinct element.",
    "constraints": "1 <= k <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
    "intuitionHinglish": "Agar humein Kth largest element chahiye, toh hum ek Min-Heap banate hain jiska size maximum K hoga. Heap ke top par hamesha un K largest elements ka 'sabse chota' element hoga! Jab heap ka size > K ho, toh smallest ko pop kar do. Scan khatam hone ke baad heap[0] hi answer hoga!",
    "approach": "Use Python's  module. Push numbers into a min-heap. If heap size exceeds k, pop the smallest element. At the end, root of min-heap () is the k-th largest element. Alternatively, use .",
    "pythonSolution": "import heapq\n\ndef findKthLargest(nums: list[int], k: int) -> int:\n    min_heap = []\n    \n    for num in nums:\n        heapq.heappush(min_heap, num)\n        # Keep heap size strictly <= k\n        if len(min_heap) > k:\n            heapq.heappop(min_heap)\n            \n    # The root of the min-heap holds the kth largest element\n    return min_heap[0]\n\n# Alternative one-liner:\n# return heapq.nlargest(k, nums)[-1]",
    "timeComplexity": "O(N log K) \u2014 Significantly faster than full sort O(N log N) when K << N",
    "spaceComplexity": "O(K) \u2014 Min-heap holds at most K elements",
    "commonMistakes": "Building a Max-Heap of size N (takes O(N) space and O(K log N) pop operations) instead of bounded Min-Heap of size K.",
    "interviewerFollowUps": [
      "Can you solve this in O(N) average time using QuickSelect (Hoare's Selection Algorithm)?",
      "How does this scale in a streaming system with millions of transactions arriving per second?"
    ],
    "bankingScenario": "Real-time streaming ledger: tracking the top 100 highest-value transactions in the last hour for anti-money laundering (AML) threshold alerts."
  },
  {
    "id": "dsa-lru-cache",
    "title": "LRU Cache (Least Recently Used Cache)",
    "category": "Design / Queues",
    "difficulty": "Medium",
    "pattern": "Hash Map + Doubly Linked List",
    "statement": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement , , and  with O(1) average time complexity for both operations.",
    "constraints": "1 <= capacity <= 3000, 0 <= key <= 10^4, 0 <= value <= 10^5, at most 2*10^5 calls",
    "intuitionHinglish": "O(1) lookup ke liye Hash Map chahiye. O(1) ordering aur eviction ke liye Doubly Linked List chahiye (Head par least recently used, Tail par most recently used). Python mein  internally yahi exact pattern implement karta hai!",
    "approach": "Use . In , if key exists, call  and return value. In , if key exists update and . If new and at capacity,  (evicts oldest from front), then insert new key.",
    "pythonSolution": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        # Mark as most recently accessed\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        \n        # Evict least recently used (first item)\n        if len(self.cache) > self.capacity:\n            self.cache.popitem(last=False)\n\n# Interviewer might ask for raw Doubly Linked List implementation:\n# class Node: prev, next, key, val\n# class LRUCache: dummy head/tail pointers + dict of key -> Node",
    "timeComplexity": "O(1) for both get() and put()",
    "spaceComplexity": "O(capacity) \u2014 Stores up to capacity key-value pairs",
    "commonMistakes": "Using a standard list for eviction queue (list.remove() is O(N), ruining the O(1) guarantee).",
    "interviewerFollowUps": [
      "How do you make this thread-safe for a multi-threaded banking web server? (Use threading.RLock or concurrent.futures).",
      "How would you implement LFU (Least Frequently Used) cache?"
    ],
    "bankingScenario": "High-speed API caching for customer auth tokens, KYC verification status, and real-time account balances."
  },
  {
    "id": "dsa-first-last-position",
    "title": "Find First and Last Position in Sorted Array",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Binary Search Lower & Upper Bounds",
    "statement": "Given an array of integers  sorted in non-decreasing order, find the starting and ending position of a given  value. If target is not found, return . You must write an algorithm with O(log n) runtime complexity.",
    "constraints": "0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9, nums is non-decreasing",
    "intuitionHinglish": "Kyunki array sorted hai, hum do alag binary searches chala sakte hain: ek first occurrence dhundne ke liye (target milne par right = mid - 1 karke left side search continue rakho), aur dusra last occurrence dhundne ke liye (target milne par left = mid + 1 karke right side search continue rakho).",
    "approach": "Write a helper function . Inside standard binary search, when , save . If finding first, continue searching left (). If finding last, continue searching right ().",
    "pythonSolution": "def searchRange(nums: list[int], target: int) -> list[int]:\n    def find_bound(find_first: bool) -> int:\n        left, right = 0, len(nums) - 1\n        bound = -1\n        \n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                bound = mid\n                if find_first:\n                    right = mid - 1 # Look further left\n                else:\n                    left = mid + 1  # Look further right\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n                \n        return bound\n        \n    return [find_bound(True), find_bound(False)]",
    "timeComplexity": "O(log N) \u2014 Two binary search runs",
    "spaceComplexity": "O(1) \u2014 Iterative pointers",
    "commonMistakes": "Finding target once with binary search and then doing linear scan in both directions (degrades to O(N) in worst case like [5, 5, 5, 5, 5]).",
    "interviewerFollowUps": [
      "How does Python's built-in  and  solve this?"
    ],
    "bankingScenario": "Binary searching transaction audit timestamps to retrieve all audit logs between  and  in log(N) time."
  },
  {
    "id": "dsa-subsets",
    "title": "Subsets (Power Set Generation)",
    "category": "Backtracking",
    "difficulty": "Medium",
    "pattern": "Backtracking / Cascading / Bit Manipulation",
    "statement": "Given an integer array  of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    "constraints": "1 <= nums.length <= 10, -10 <= nums[i] <= 10, all elements are unique",
    "intuitionHinglish": "Har index par hamare paas do hi options hote hain: ya toh us number ko subset mein include karo, ya fir exclude karo. Recursion se hum dono decisions explore karte hain aur leaf nodes par full subset capture ho jata hai.",
    "approach": "Use recursive backtracking with  and . At each recursive step, append a copy of  to results. Loop from  to : include , recurse with , then pop to backtrack.",
    "pythonSolution": "def subsets(nums: list[int]) -> list[list[int]]:\n    result = []\n    \n    def backtrack(start_index: int, current_path: list[int]):\n        # Add current path snapshot\n        result.append(list(current_path))\n        \n        for i in range(start_index, len(nums)):\n            # Pick\n            current_path.append(nums[i])\n            # Explore next\n            backtrack(i + 1, current_path)\n            # Un-pick (Backtrack)\n            current_path.pop()\n            \n    backtrack(0, [])\n    return result\n\n# Alternative iterative cascading:\n# res = [[]]\n# for num in nums:\n#     res += [curr + [num] for curr in res]\n# return res",
    "timeComplexity": "O(N * 2^N) \u2014 2^N subsets, each takes up to O(N) to copy",
    "spaceComplexity": "O(N) recursion stack (excluding output space)",
    "commonMistakes": "Appending  directly () instead of making a copy ( or ), causing all results to reference the same mutated list.",
    "interviewerFollowUps": [
      "What if the input contains duplicates and we must not generate duplicate subsets? (Subsets II: sort first and skip duplicates: if i > start and nums[i] == nums[i-1]: continue)."
    ],
    "bankingScenario": "Generating combinations of banking regulatory compliance rules to test edge case combinations in sandbox environments."
  },
  {
    "id": "dsa-house-robber",
    "title": "House Robber (Non-Adjacent Maximum)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "State Machine / Pick vs Skip DP",
    "statement": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night. Return the maximum amount of money you can rob tonight without alerting the police.",
    "constraints": "1 <= nums.length <= 100, 0 <= nums[i] <= 400",
    "intuitionHinglish": "Har ghar par sirf do choices hain: 1) Rob karo (toh pichle ghar ko skip karna padega, `nums[i] + rob_prev2`), ya 2) Skip karo (toh pichle ghar tak ka best loot carry forward hoga, `rob_prev1`). Dono ka maximum le lo!",
    "approach": "Space optimized: Maintain `prev1 = 0, prev2 = 0`. For num in nums: `temp = max(num + prev2, prev1); prev2 = prev1; prev1 = temp`. Return prev1.",
    "pythonSolution": "def rob(nums: list[int]) -> int:\n    prev2 = 0 # Represents max loot up to house i-2\n    prev1 = 0 # Represents max loot up to house i-1\n    \n    for num in nums:\n        current = max(num + prev2, prev1)\n        prev2 = prev1\n        prev1 = current\n        \n    return prev1",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Only 2 variables maintained",
    "commonMistakes": "Using full O(N) array when only previous two states are needed.",
    "interviewerFollowUps": [
      "What if the houses are arranged in a circle? (House Robber II: solve for nums[1:] and nums[:-1] and take maximum)."
    ],
    "bankingScenario": "Selecting non-adjacent credit card transaction promotions to maximize customer cashback rewards without violating anti-stacking policies."
  }
];


export const DSA_CATEGORIES = [
  'All',
  'Arrays',
  'Two Pointers',
  'Sliding Window',
  'Hashing',
  'Stack',
  'Linked List',
  'Binary Search',
  'Trees',
  'Heaps / Priority Queue',
  'Design / Queues',
  'Graphs',
  'Dynamic Programming',
  'Backtracking'
];

export const PYTHON_DSA_CHEATSHEET = [
  {
    topic: 'Collections & Queues (O(1) popleft)',
    code: `from collections import deque, defaultdict, Counter

# Deque: O(1) append & pop from both ends
q = deque([1, 2, 3])
q.append(4)
first = q.popleft() # O(1) unlike list.pop(0) which is O(N)

# Defaultdict: avoids KeyError
graph = defaultdict(list)
graph['u'].append('v')
freq = defaultdict(int)

# Counter: instant frequency map
counts = Counter('banana') # {'a': 3, 'n': 2, 'b': 1}
most_common_2 = counts.most_common(2) # [('a', 3), ('n', 2)]`
  },
  {
    topic: 'Heaps & Priority Queues (heapq)',
    code: `import heapq

# Min-Heap by default
heap = []
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
smallest = heapq.heappop(heap) # 5

# Heapify in-place O(N)
nums = [4, 1, 7, 3]
heapq.heapify(nums)

# Max-Heap trick: multiply values by -1
max_heap = []
heapq.heappush(max_heap, -val)
largest = -heapq.heappop(max_heap)

# K Largest / Smallest
top3 = heapq.nlargest(3, nums)
bot3 = heapq.nsmallest(3, nums)`
  },
  {
    topic: 'Binary Search Templates',
    code: `# Standard Binary Search
def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2 # or left + (right - left) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# Python bisect module
import bisect
nums = [1, 2, 4, 4, 4, 6]
idx_left = bisect.bisect_left(nums, 4)   # Index 2 (first 4)
idx_right = bisect.bisect_right(nums, 4) # Index 5 (after last 4)`
  },
  {
    topic: 'Sorting & Custom Lambdas',
    code: `# Sort by second element ascending, then first descending
items = [(1, 5), (2, 3), (3, 3)]
items.sort(key=lambda x: (x[1], -x[0]))

# Sort dictionary by values descending
sorted_by_val = sorted(my_dict.items(), key=lambda x: x[1], reverse=True)

# List slicing tricks
rev = nums[::-1]          # Reverse list
sub = nums[1:5]           # Sublist
shallow_copy = nums[:]    # Clone list`
  },
  {
    topic: 'Tree & Graph DFS / BFS Templates',
    code: `# BFS (Shortest path in unweighted graph)
from collections import deque
def bfs(graph, start):
    visited = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

# Recursion Limit Increase (for deep DFS)
import sys
sys.setrecursionlimit(200000)`
  }
];
