/* Curated Master DSA Practice Dataset with Python Solutions & Banking Scenarios */

export const DSA_PROBLEMS_COUNT = 47;

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
    "pythonSolution": "def maxSubArray(nums: list[int]) -> int:\n    current_sum = 0\n    max_sum = float('-inf')\n    \n    for num in nums:\n        current_sum = max(num, current_sum + num)\n        max_sum = max(max_sum, current_sum)\n        \n    return max_sum\n\n# Test Example:\n# nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4] -> Output: 6 ([4, -1, 2, 1])",
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
    "pythonSolution": "def merge(intervals: list[list[int]]) -> list[list[int]]:\n    if not intervals:\n        return []\n        \n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    \n    for start, end in intervals[1:]:\n        prev_start, prev_end = merged[-1]\n        \n        if start <= prev_end:\n            merged[-1][1] = max(prev_end, end)\n        else:\n            merged.append([start, end])\n            \n    return merged",
    "timeComplexity": "O(N log N) \u2014 Due to sorting",
    "spaceComplexity": "O(N) \u2014 To store merged output",
    "commonMistakes": "Forgetting to update with max(prev_end, end) when one interval completely swallows another, e.g. [1, 10] and [2, 5].",
    "interviewerFollowUps": [
      "How would you insert a new interval into an already sorted non-overlapping list in O(N) without full re-sorting?"
    ],
    "bankingScenario": "Consolidating overlapping loan moratorium periods or scheduled maintenance blackout windows."
  },
  {
    "id": "dsa-stock-1",
    "title": "Best Time to Buy and Sell Stock (Single Transaction)",
    "category": "Arrays",
    "difficulty": "Easy",
    "pattern": "Greedy Tracking / Running Minimum",
    "statement": "You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve. If no profit can be achieved, return 0.",
    "constraints": "1 <= prices.length <= 10^5, 0 <= prices[i] <= 10^4",
    "intuitionHinglish": "Har din socho: 'Agar maine stock ko aaj tak ke sabse saste daam (`min_price`) par khareeda hota aur aaj becha hota, toh mujhe kitna profit milta?' Pure array mein chalte hue minimum buy price aur maximum profit ko continuously update karte raho!",
    "approach": "Initialize `min_price = float('inf')` and `max_profit = 0`. For price in prices: update `min_price = min(min_price, price)` and `max_profit = max(max_profit, price - min_price)`. Return `max_profit`.",
    "pythonSolution": "def maxProfit(prices: list[int]) -> int:\n    min_price = float('inf')\n    max_profit = 0\n    \n    for price in prices:\n        if price < min_price:\n            min_price = price\n        elif price - min_price > max_profit:\n            max_profit = price - min_price\n            \n    return max_profit\n\n# Test:\n# prices = [7, 1, 5, 3, 6, 4] -> Output: 5 (Buy at 1, Sell at 6)",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Two scalar variables",
    "commonMistakes": "Trying nested loops O(N^2) or selling before buying.",
    "interviewerFollowUps": [
      "What if you are allowed to complete as many transactions as you like? (Stock II: sum all positive differences `price[i] - price[i-1]`).",
      "What if you can only complete at most 2 transactions? (Stock III: 4-state DP)."
    ],
    "bankingScenario": "Maximizing currency arbitrage spread on foreign exchange (Forex) rate fluctuations within a 24-hour trading cycle."
  },
  {
    "id": "dsa-stock-2",
    "title": "Best Time to Buy and Sell Stock II (Multiple Transactions)",
    "category": "Arrays",
    "difficulty": "Medium",
    "pattern": "Greedy / Peak-Valley Accumulation",
    "statement": "You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `i`th day. On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. Find and return the maximum profit you can achieve.",
    "constraints": "1 <= prices.length <= 3 * 10^4, 0 <= prices[i] <= 10^4",
    "intuitionHinglish": "Kyunki hum jitni marzi chahe transactions kar sakte hain, isliye har bar jab agle din price pichle din se zyada ho (`prices[i] > prices[i-1]`), hum immediately buy and sell karke profit capture kar sakte hain! Sare upward slopes ka sum hi total maximum profit hota hai.",
    "approach": "Iterate from index 1 to n-1. If `prices[i] > prices[i-1]`, add `prices[i] - prices[i-1]` to `total_profit`. Return `total_profit`.",
    "pythonSolution": "def maxProfitII(prices: list[int]) -> int:\n    max_profit = 0\n    for i in range(1, len(prices)):\n        if prices[i] > prices[i - 1]:\n            max_profit += prices[i] - prices[i - 1]\n    return max_profit\n\n# Test:\n# prices = [7, 1, 5, 3, 6, 4] -> Output: 7 (Buy at 1, Sell at 5 (+4); Buy at 3, Sell at 6 (+3) = 7)",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Single accumulator",
    "commonMistakes": "Overcomplicating with dynamic programming when greedy capturing of all upward slopes is mathematically optimal.",
    "interviewerFollowUps": [
      "What if there is a transaction fee for every trade? (State machine DP with `hold` and `cash` states).",
      "What if there is a 1-day cooldown period after selling? (Stock with Cooldown: 3 states)."
    ],
    "bankingScenario": "High-frequency algorithmic trading desk capturing micro-spreads across intraday equity order books."
  },
  {
    "id": "dsa-product-except-self",
    "title": "Product of Array Except Self",
    "category": "Arrays",
    "difficulty": "Medium",
    "pattern": "Prefix and Suffix Accumulation",
    "statement": "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must write an algorithm that runs in O(n) time and without using the division operator.",
    "constraints": "2 <= nums.length <= 10^5, -30 <= nums[i] <= 30. The product of any prefix or suffix fits in a 32-bit integer.",
    "intuitionHinglish": "Division use karna mana hai (aur agar array mein zero ho toh division by zero error aa jata hai). Kisi bhi element `i` ke liye: product except self = (elements to the left of `i` ka product) * (elements to the right of `i` ka product)! Hum ek left-to-right pass mein prefix products calculate karte hain, aur fir right-to-left pass mein suffix multiply kar dete hain.",
    "approach": "1. Initialize `res = [1] * n`.\n2. Left pass: `res[i] = res[i-1] * nums[i-1]`.\n3. Right pass: Maintain `postfix = 1`. For i from n-1 down to 0: `res[i] *= postfix; postfix *= nums[i]`.\n4. Return `res` in O(1) auxiliary space.",
    "pythonSolution": "def productExceptSelf(nums: list[int]) -> list[int]:\n    n = len(nums)\n    res = [1] * n\n    \n    # Prefix pass: res[i] stores product of all elements to the left of i\n    prefix = 1\n    for i in range(n):\n        res[i] = prefix\n        prefix *= nums[i]\n        \n    # Suffix pass: multiply with product of all elements to the right of i\n    postfix = 1\n    for i in range(n - 1, -1, -1):\n        res[i] *= postfix\n        postfix *= nums[i]\n        \n    return res\n\n# Test:\n# nums = [1, 2, 3, 4] -> Output: [24, 12, 8, 6]",
    "timeComplexity": "O(N) \u2014 Two linear passes",
    "spaceComplexity": "O(1) \u2014 Output array doesn't count as extra auxiliary memory",
    "commonMistakes": "Using total product division (fails completely when array contains 0 or multiple zeros).",
    "interviewerFollowUps": [
      "How does this handle multiple zeroes? (Notice the prefix/postfix approach naturally outputs zeroes everywhere except possibly at the index of a single zero without any division errors)."
    ],
    "bankingScenario": "Multi-asset collateral valuation: calculating the portfolio risk weighting when excluding one volatile asset tier at a time."
  },
  {
    "id": "dsa-max-product-subarray",
    "title": "Maximum Product Subarray",
    "category": "Arrays",
    "difficulty": "Medium",
    "pattern": "Min/Max Dual Dynamic State",
    "statement": "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
    "constraints": "1 <= nums.length <= 2 * 10^4, -10 <= nums[i] <= 10",
    "intuitionHinglish": "Addition mein sirf negative hone se sum ghat-ta hai, lekin multiplication mein do negative numbers milkar ek bohot bada POSITIVE number ban sakte hain! Isliye har index par humein dono maintain karne padte hain: `current_max` (sabse bada product) aur `current_min` (sabse chota/negative product). Agar current number negative ho, toh min aur max swap ho jate hain!",
    "approach": "Maintain `cur_max = 1, cur_min = 1, res = max(nums)`. For each num: if num < 0, swap `cur_max` and `cur_min`. Then `cur_max = max(num, cur_max * num)`, `cur_min = min(num, cur_min * num)`. Update `res = max(res, cur_max)`.",
    "pythonSolution": "def maxProduct(nums: list[int]) -> int:\n    res = max(nums)\n    cur_max, cur_min = 1, 1\n    \n    for n in nums:\n        if n < 0:\n            # Negative flips max into min and min into max\n            cur_max, cur_min = cur_min, cur_max\n            \n        cur_max = max(n, cur_max * n)\n        cur_min = min(n, cur_min * n)\n        \n        res = max(res, cur_max)\n        \n    return res\n\n# Test:\n# nums = [2, 3, -2, 4] -> Output: 6 ([2, 3])\n# nums = [-2, 3, -4] -> Output: 24 (all three: -2 * 3 * -4 = 24)",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 In-place scalar variables",
    "commonMistakes": "Only tracking current_max and resetting on negative numbers, which misses double-negative massive positive products like `[-2, 3, -4]`.",
    "interviewerFollowUps": [
      "How do you handle zeroes in the array? (Notice when num is 0, cur_max and cur_min reset to 0, and the next element re-starts naturally)."
    ],
    "bankingScenario": "Compounded interest multiplier calculations across variable inflation-linked bond tranches."
  },
  {
    "id": "dsa-3sum",
    "title": "3Sum (Zero Sum Triplets)",
    "category": "Two Pointers",
    "difficulty": "Medium",
    "pattern": "Sort + Fixed Outer Loop + Two Pointers",
    "statement": "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. Notice that the solution set must not contain duplicate triplets.",
    "constraints": "3 <= nums.length <= 3000, -10^5 <= nums[i] <= 10^5",
    "intuitionHinglish": "Brute force 3 nested loops O(N^3) time lega. Agar hum pehle array ko sort kar lein O(N log N), toh hum ek element ko fix karke bache hue array par Two Pointers (Left and Right) chala sakte hain! Sum < 0 ho toh left aage badhao, Sum > 0 ho toh right peeche lao.",
    "approach": "1. Sort `nums`.\n2. Loop `i` from 0 to n-3. Skip duplicates if `nums[i] == nums[i-1]`.\n3. Set `left = i + 1`, `right = n - 1`.\n4. Check `total = nums[i] + nums[left] + nums[right]`. If 0, record triplet and skip duplicate inner numbers. If < 0, `left += 1`. If > 0, `right -= 1`.",
    "pythonSolution": "def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort()\n    res = []\n    n = len(nums)\n    \n    for i in range(n - 2):\n        if nums[i] > 0:\n            break\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n            \n        left, right = i + 1, n - 1\n        while left < right:\n            total = nums[i] + nums[left] + nums[right]\n            if total == 0:\n                res.append([nums[i], nums[left], nums[right]])\n                while left < right and nums[left] == nums[left + 1]:\n                    left += 1\n                while left < right and nums[right] == nums[right - 1]:\n                    right -= 1\n                left += 1\n                right -= 1\n            elif total < 0:\n                left += 1\n            else:\n                right -= 1\n                \n    return res",
    "timeComplexity": "O(N^2) \u2014 Outer loop runs N times, inner two-pointer runs O(N)",
    "spaceComplexity": "O(1) auxiliary",
    "commonMistakes": "Not skipping duplicate numbers properly, producing identical triplets in output.",
    "interviewerFollowUps": [
      "Can you solve 3Sum Closest (finding triplet whose sum is closest to a target)?"
    ],
    "bankingScenario": "Detecting zero-sum reconciliation imbalances across 3 interrelated clearing bank ledger entries."
  },
  {
    "id": "dsa-container-water",
    "title": "Container With Most Water",
    "category": "Two Pointers",
    "difficulty": "Medium",
    "pattern": "Shrinking Two Pointers Greedy",
    "statement": "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    "constraints": "n == height.length, 2 <= n <= 10^5, 0 <= height[i] <= 10^4",
    "intuitionHinglish": "Water area = `min(height[left], height[right]) * (right - left)`. Width toh sabse pehle widest hi hogi (left = 0, right = n-1). Ab width toh har step par 1 kam hogi hi. Area badhane ka ek hi rasta hai: jo boundary CHOTI hai (shorter line), use discard karke aage badho taaki koi lambi boundary mil sake!",
    "approach": "Place `left = 0, right = n - 1`. Compute area = `min(height[left], height[right]) * (right - left)`. Update `max_area`. If `height[left] < height[right]`, `left += 1`; else `right -= 1`. Repeat until pointers meet.",
    "pythonSolution": "def maxArea(height: list[int]) -> int:\n    left, right = 0, len(height) - 1\n    max_water = 0\n    \n    while left < right:\n        width = right - left\n        h = min(height[left], height[right])\n        max_water = max(max_water, width * h)\n        \n        # Always move the smaller pillar inward\n        if height[left] < height[right]:\n            left += 1\n        else:\n            right -= 1\n            \n    return max_water\n\n# Test:\n# height = [1, 8, 6, 2, 5, 4, 8, 3, 7] -> Output: 49 (between index 1 (8) and index 8 (7): min(8, 7) * 7 = 49)",
    "timeComplexity": "O(N) \u2014 Left and right pointers meet after N steps",
    "spaceComplexity": "O(1) \u2014 Two pointer indices",
    "commonMistakes": "Moving the larger pillar inward (which guarantees that area will only decrease, since width decreases and height cannot exceed the already smaller boundary).",
    "interviewerFollowUps": [
      "Why is this greedy approach guaranteed to find the global optimum without missing any container? (Proof: moving the taller wall can never increase area because the shorter wall still restricts the height and width is smaller)."
    ],
    "bankingScenario": "Capacity planning: identifying optimal start and end time windows for high-throughput batch transaction ingestion without buffer spillover."
  },
  {
    "id": "dsa-trapping-rain-water",
    "title": "Trapping Rain Water",
    "category": "Two Pointers",
    "difficulty": "Hard",
    "pattern": "Two Pointers with Left/Right Max Bounds",
    "statement": "Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "constraints": "n == height.length, 1 <= n <= 2 * 10^4, 0 <= height[i] <= 10^5",
    "intuitionHinglish": "Kisi bhi single bar index `i` par kitna paani ruke ga? `min(max_height_to_left, max_height_to_right) - height[i]`. Agar hum do pointers (left and right) use karein aur maintain karein `left_max` aur `right_max`: agar `left_max < right_max`, toh hume pata hai ki left side se paani trap hone ki limitation `left_max` hi hai (right side chahe kitni bhi unchi ho)! Isliye left ko process karo aur `left += 1`.",
    "approach": "Maintain `left = 0, right = n-1, left_max = 0, right_max = 0, total_water = 0`. While `left < right`: if `height[left] < height[right]`, if `height[left] >= left_max` update `left_max`, else `total_water += left_max - height[left]`; `left += 1`. Else do symmetric logic for `right`.",
    "pythonSolution": "def trap(height: list[int]) -> int:\n    if not height:\n        return 0\n        \n    left, right = 0, len(height) - 1\n    left_max, right_max = 0, 0\n    trapped_water = 0\n    \n    while left < right:\n        if height[left] < height[right]:\n            if height[left] >= left_max:\n                left_max = height[left]\n            else:\n                trapped_water += left_max - height[left]\n            left += 1\n        else:\n            if height[right] >= right_max:\n                right_max = height[right]\n            else:\n                trapped_water += right_max - height[right]\n            right -= 1\n            \n    return trapped_water\n\n# Test:\n# height = [0,1,0,2,1,0,1,3,2,1,2,1] -> Output: 6",
    "timeComplexity": "O(N) \u2014 Each index visited at most once",
    "spaceComplexity": "O(1) \u2014 Optimized two-pointer approach avoids O(N) prefix/suffix arrays",
    "commonMistakes": "Allocating two O(N) arrays when the two-pointer approach achieves O(1) space cleanly.",
    "interviewerFollowUps": [
      "Can you solve this using a Monotonic Decreasing Stack? (Stack stores bar indices; when current bar > stack.top(), pop and calculate trapped horizontal water layers)."
    ],
    "bankingScenario": "Capital reserve buffering: calculating buffer liquidity retained across fluctuating intraday payment settlement obligations."
  },
  {
    "id": "dsa-longest-substring-no-repeat",
    "title": "Longest Substring Without Repeating Characters",
    "category": "Sliding Window",
    "difficulty": "Medium",
    "pattern": "Dynamic Sliding Window with Hash Map Indexing",
    "statement": "Given a string `s`, find the length of the longest substring without repeating characters.",
    "constraints": "0 <= s.length <= 5 * 10^4, s consists of English letters, digits, symbols and spaces.",
    "intuitionHinglish": "Ek dynamic window maintain karo `[left, right]`. Jaise hi koi duplicate character mile, `left` pointer ko pichle duplicate character ke index ke aage jump karwa do (`left = last_seen_index + 1`).",
    "approach": "Use a dictionary `char_map` storing character to its latest index. Iterate `right` through string: if `s[right]` in `char_map` and `char_map[s[right]] >= left`, update `left = char_map[s[right]] + 1`. Update `char_map[s[right]] = right` and `max_len = max(max_len, right - left + 1)`.",
    "pythonSolution": "def lengthOfLongestSubstring(s: str) -> int:\n    char_map = {}\n    left = 0\n    max_len = 0\n    \n    for right, char in enumerate(s):\n        if char in char_map and char_map[char] >= left:\n            left = char_map[char] + 1\n            \n        char_map[char] = right\n        max_len = max(max_len, right - left + 1)\n        \n    return max_len",
    "timeComplexity": "O(N) \u2014 Both left and right move at most N times",
    "spaceComplexity": "O(min(N, M)) where M is alphabet size (at most 128 for ASCII)",
    "commonMistakes": "Not checking if `char_map[char] >= left`, causing left to jump backwards into an already discarded window.",
    "interviewerFollowUps": [
      "What if you are allowed at most K duplicate characters? (Window expands until duplicate count > K)."
    ],
    "bankingScenario": "Scanning streaming audit event tokens to identify the longest anomaly-free operational window."
  },
  {
    "id": "dsa-sliding-window-maximum",
    "title": "Sliding Window Maximum (Fraud Bursts)",
    "category": "Sliding Window",
    "difficulty": "Hard",
    "pattern": "Monotonic Decreasing Deque",
    "statement": "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. Return the max sliding window.",
    "constraints": "1 <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4, 1 <= k <= nums.length",
    "intuitionHinglish": "Window mein sabse bada number dhoondhne ke liye hum ek Monotonic Decreasing Deque use karte hain jisme elements descending order mein hote hain. Agar naya aane wala number pichle numbers se bada hai, toh pichle chote numbers kabhi max nahi ban sakte\u2014unhe deque ke peeche se pop kar do!",
    "approach": "Maintain a `deque` of indices. Before adding index `i`: 1) Pop elements from left if out of bounds (`dq[0] <= i - k`). 2) Pop elements from right while `nums[dq[-1]] < nums[i]`. 3) Append `i`. 4) If `i >= k - 1`, append `nums[dq[0]]` to result.",
    "pythonSolution": "from collections import deque\n\ndef maxSlidingWindow(nums: list[int], k: int) -> list[int]:\n    dq = deque() # Stores indices, values are in strictly decreasing order\n    res = []\n    \n    for i, num in enumerate(nums):\n        # 1. Evict elements outside current window\n        if dq and dq[0] <= i - k:\n            dq.popleft()\n            \n        # 2. Maintain monotonic decreasing invariant\n        while dq and nums[dq[-1]] < num:\n            dq.pop()\n            \n        dq.append(i)\n        \n        # 3. First window completes at index k - 1\n        if i >= k - 1:\n            res.append(nums[dq[0]])\n            \n    return res",
    "timeComplexity": "O(N) \u2014 Every index pushed and popped from deque at most once",
    "spaceComplexity": "O(K) \u2014 Deque size strictly bounded by window size K",
    "commonMistakes": "Storing values instead of indices in deque (makes window boundary eviction impossible).",
    "interviewerFollowUps": [
      "What if K is very small (K=3) vs very large (K=N/2)? How does this compare with a Max-Heap O(N log K)?"
    ],
    "bankingScenario": "Real-time fraud burst detection: finding the peak transaction velocity in rolling 5-minute windows."
  },
  {
    "id": "dsa-min-window-substring",
    "title": "Minimum Window Substring",
    "category": "Sliding Window",
    "difficulty": "Hard",
    "pattern": "Two Pointers with Frequency Matching Map",
    "statement": "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.",
    "constraints": "m == s.length, n == t.length, 1 <= m, n <= 10^5, s and t consist of uppercase and lowercase English letters.",
    "intuitionHinglish": "Hum `t` ki frequency count banate hain aur maintain karte hain `have` aur `need` counters. `right` pointer ko aage badha kar characters window mein add karo jab tak `have == need` na ho jaye (valid window). Jaise hi window valid ho, `left` pointer ko contract karke window ko chota karo jab tak wo valid rehti hai, aur minimum length update karo!",
    "approach": "1. `target_counts = Counter(t)`. `window_counts = defaultdict(int)`.\n2. `have = 0, need = len(target_counts)`.\n3. Expand `right`. If `s[right]` in `target` and count matches, `have += 1`.\n4. While `have == need`: record min window, shrink `left`, update counts.",
    "pythonSolution": "from collections import Counter, defaultdict\n\ndef minWindow(s: str, t: str) -> str:\n    if not t or not s:\n        return \"\"\n        \n    target_counts = Counter(t)\n    window_counts = defaultdict(int)\n    \n    have, need = 0, len(target_counts)\n    res, min_len = [-1, -1], float('inf')\n    left = 0\n    \n    for right, char in enumerate(s):\n        window_counts[char] += 1\n        \n        if char in target_counts and window_counts[char] == target_counts[char]:\n            have += 1\n            \n        while have == need:\n            # Update result window if smaller\n            if (right - left + 1) < min_len:\n                min_len = right - left + 1\n                res = [left, right]\n                \n            # Shrink from left\n            left_char = s[left]\n            window_counts[left_char] -= 1\n            if left_char in target_counts and window_counts[left_char] < target_counts[left_char]:\n                have -= 1\n            left += 1\n            \n    return s[res[0]:res[1] + 1] if min_len != float('inf') else \"\"\n\n# Test:\n# s = \"ADOBECODEBANC\", t = \"ABC\" -> Output: \"BANC\" ",
    "timeComplexity": "O(M + N) \u2014 Each character processed at most twice (by left and right)",
    "spaceComplexity": "O(M + N) \u2014 Hash maps for frequencies",
    "commonMistakes": "Comparing full frequency dictionaries inside the loop (makes it O(26 * N)) instead of tracking the scalar `have == need` variable.",
    "interviewerFollowUps": [
      "How do you optimize this when string S is huge and contains mostly characters not present in T? (Filter S into a list of `(index, char)` tuples first)."
    ],
    "bankingScenario": "KYC Identity Stream Parsing: extracting the shortest log segment containing all required customer identity verification tokens."
  },
  {
    "id": "dsa-two-sum",
    "title": "Two Sum",
    "category": "Hashing",
    "difficulty": "Easy",
    "pattern": "Complement Hash Map Lookup",
    "statement": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    "constraints": "2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9, -10^9 <= target <= 10^9",
    "intuitionHinglish": "Har number `x` ke liye check karo: kya iska complement (`target - x`) hum pehle dekh chuke hain? Hash Map use karke hum O(1) time mein complement dhoondh sakte hain!",
    "approach": "Create a dictionary `seen = {}`. For `i, num` in enumerate(nums): compute `complement = target - num`. If complement in seen, return `[seen[complement], i]`. Else store `seen[num] = i`.",
    "pythonSolution": "def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    "timeComplexity": "O(N) \u2014 Single pass with O(1) hash lookups",
    "spaceComplexity": "O(N) \u2014 Hash map holds up to N entries",
    "commonMistakes": "Adding current number to map before checking complement (causes using the same index twice if `target == 2 * num`).",
    "interviewerFollowUps": [
      "What if the array is already sorted? (Use Two Pointers Left/Right in O(1) space)."
    ],
    "bankingScenario": "Finding two counterpart transactions that perfectly offset each other in bilateral interbank settlement."
  },
  {
    "id": "dsa-subarray-sum-k",
    "title": "Subarray Sum Equals K",
    "category": "Hashing",
    "difficulty": "Medium",
    "pattern": "Prefix Sum with Frequency Hash Map",
    "statement": "Given an array of integers `nums` and an integer `k`, return the total number of subarrays whose sum equals to `k`.",
    "constraints": "1 <= nums.length <= 2 * 10^4, -1000 <= nums[i] <= 1000, -10^7 <= k <= 10^7",
    "intuitionHinglish": "Kyunki array mein negative numbers ho sakte hain, Sliding Window kaam nahi karega! Prefix Sum socho: Agar `prefix_sum[j] - prefix_sum[i] == k`, toh subarray `nums[i+1...j]` ka sum exactly `k` hoga! Isliye hum ek hash map mein dekhte hain ki `current_sum - k` pehle kitni baar aa chuka hai.",
    "approach": "Initialize `prefix_counts = {0: 1}`, `current_sum = 0, count = 0`. For num in nums: `current_sum += num`. `count += prefix_counts.get(current_sum - k, 0)`. `prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1`.",
    "pythonSolution": "def subarraySum(nums: list[int], k: int) -> int:\n    prefix_counts = {0: 1} # Base case: empty prefix sum 0 has count 1\n    current_sum = 0\n    total_subarrays = 0\n    \n    for num in nums:\n        current_sum += num\n        # If (current_sum - k) exists in history, those prefixes form a valid subarray\n        total_subarrays += prefix_counts.get(current_sum - k, 0)\n        prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1\n        \n    return total_subarrays\n\n# Test:\n# nums = [1, 1, 1], k = 2 -> Output: 2\n# nums = [1, -1, 0], k = 0 -> Output: 3 ([1, -1], [0], [1, -1, 0])",
    "timeComplexity": "O(N) \u2014 Single pass with O(1) hash map operations",
    "spaceComplexity": "O(N) \u2014 Prefix sum frequency map",
    "commonMistakes": "Forgetting base case `{0: 1}`, which fails when an exact prefix from index 0 sums to k.",
    "interviewerFollowUps": [
      "Why doesn't the sliding window (two pointers) approach work here? (Because elements can be negative, sum is not monotonically increasing)."
    ],
    "bankingScenario": "Auditing transaction ledger: counting all continuous transaction sequences whose net sum equals a target chargeback amount."
  },
  {
    "id": "dsa-group-anagrams",
    "title": "Group Anagrams",
    "category": "Hashing",
    "difficulty": "Medium",
    "pattern": "Character Frequency Tuple Keying",
    "statement": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    "constraints": "1 <= strs.length <= 10^4, 0 <= strs[i].length <= 100, lowercase English letters only.",
    "intuitionHinglish": "Do words anagrams tab hote hain jab unke characters ki frequency exact same hoti hai. Hum har word ke liye ek 26-element character count tuple bana sakte hain aur use Hash Map ki KEY bana sakte hain! Sorted string ko key banana bhi kaam karta hai, lekin 26-element tuple O(K) time leta hai jabki sort O(K log K) leta hai.",
    "approach": "Use `defaultdict(list)`. For each string, compute 26-element frequency tuple `count = [0] * 26`. Use `tuple(count)` as dict key and append string to `ans[tuple(count)]`. Return `list(ans.values())`.",
    "pythonSolution": "from collections import defaultdict\n\ndef groupAnagrams(strs: list[str]) -> list[list[str]]:\n    groups = defaultdict(list)\n    \n    for s in strs:\n        # 26-character count array converted to immutable tuple for dict key\n        count = [0] * 26\n        for char in s:\n            count[ord(char) - ord('a')] += 1\n            \n        groups[tuple(count)].append(s)\n        \n    return list(groups.values())\n\n# Test:\n# strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"] -> [[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]",
    "timeComplexity": "O(N * K) where N is number of strings and K is max length of string",
    "spaceComplexity": "O(N * K) to store grouped strings in hash map",
    "commonMistakes": "Using mutable list as dictionary key (in Python, dict keys must be hashable/immutable, so use `tuple(count)`).",
    "interviewerFollowUps": [
      "What if strings contain Unicode or special characters? (Use sorted string as key or Counter tuple)."
    ],
    "bankingScenario": "Clustering suspicious account transactions sharing scrambled merchant identifier signatures."
  },
  {
    "id": "dsa-longest-consecutive-sequence",
    "title": "Longest Consecutive Sequence",
    "category": "Hashing",
    "difficulty": "Medium",
    "pattern": "Hash Set Intelligent Sequence Start Detection",
    "statement": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    "constraints": "0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9",
    "intuitionHinglish": "Agar sort karenge toh O(N log N) lagega. O(N) ke liye hum saare numbers ko ek Hash Set mein daal dete hain. Ek number kisi sequence ka START tabhi hoga agar `(num - 1)` set mein NAHI ho! Agar `(num - 1)` present hai, toh use skip kar do. Sirf start numbers se aage count karo.",
    "approach": "1. Convert `nums` to set `num_set`.\n2. For `num` in `num_set`: if `num - 1 not in num_set`, it's sequence start. Count how long consecutive streak extends: `curr = num, streak = 1; while curr + 1 in num_set: curr += 1, streak += 1`. 3. Track `max_streak`.",
    "pythonSolution": "def longestConsecutive(nums: list[int]) -> int:\n    num_set = set(nums)\n    longest_streak = 0\n    \n    for num in num_set:\n        # Only start counting if num is the beginning of a sequence\n        if num - 1 not in num_set:\n            current_num = num\n            current_streak = 1\n            \n            while current_num + 1 in num_set:\n                current_num += 1\n                current_streak += 1\n                \n            longest_streak = max(longest_streak, current_streak)\n            \n    return longest_streak",
    "timeComplexity": "O(N) \u2014 Each number visited at most twice",
    "spaceComplexity": "O(N) \u2014 Hash set storage",
    "commonMistakes": "Iterating through original list with duplicates instead of set (causes repeated scans).",
    "interviewerFollowUps": [
      "Can you solve this using Union-Find (Disjoint Set Union)?"
    ],
    "bankingScenario": "Identifying the longest consecutive sequence of daily compliance audits completed without any missing day gap."
  },
  {
    "id": "dsa-valid-parentheses",
    "title": "Valid Parentheses",
    "category": "Stack",
    "difficulty": "Easy",
    "pattern": "LIFO Stack Matching",
    "statement": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "constraints": "1 <= s.length <= 10^4",
    "intuitionHinglish": "Har closing bracket ko uske sabse recent unclosed opening bracket se match hona chahiye. LIFO (Last In First Out) property ke liye Stack best data structure hai!",
    "approach": "Use a stack. If char is opening bracket, push. If closing, check if stack is empty or `stack.pop()` doesn't match corresponding opening bracket. At end, `return len(stack) == 0`.",
    "pythonSolution": "def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    \n    for char in s:\n        if char in mapping:\n            # Closing bracket: pop top element or dummy mismatch\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top:\n                return False\n        else:\n            # Opening bracket: push to stack\n            stack.append(char)\n            \n    return len(stack) == 0",
    "timeComplexity": "O(N) \u2014 Single linear scan",
    "spaceComplexity": "O(N) \u2014 Stack storage in worst case (e.g. '((((((')",
    "commonMistakes": "Popping from empty stack without boundary check or forgetting to check if stack is empty at the end.",
    "interviewerFollowUps": [
      "How would you validate mathematical expressions with operators and precedence? (Shunting-Yard Algorithm)."
    ],
    "bankingScenario": "Validating syntax of ISO-8583 financial message payload envelopes before decryption."
  },
  {
    "id": "dsa-daily-temperatures",
    "title": "Daily Temperatures (Next Greater Settlement Day)",
    "category": "Stack",
    "difficulty": "Medium",
    "pattern": "Monotonic Decreasing Stack",
    "statement": "Given an array of integers `temperatures` represents daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i`th day to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0` instead.",
    "constraints": "1 <= temperatures.length <= 10^5, 30 <= temperatures[i] <= 100",
    "intuitionHinglish": "Humein har din ke liye aage aane wala 'pehla bada number' chahiye. Hum ek Monotonic Decreasing Stack maintain karte hain jo indices store karta hai. Jaise hi current temperature stack ke top wale temperature se bada hota hai, iska matlab stack ke top wale din ko uska answer mil gaya! Use pop karo aur day difference calculate karo.",
    "approach": "Initialize `res = [0] * len(T)`. Stack stores indices. For `i, temp` in enumerate(T): while `stack` and `temp > T[stack[-1]]`: `prev_i = stack.pop(); res[prev_i] = i - prev_i`. Then `stack.append(i)`.",
    "pythonSolution": "def dailyTemperatures(temperatures: list[int]) -> list[int]:\n    n = len(temperatures)\n    res = [0] * n\n    stack = [] # Stores indices of temperatures in strictly decreasing order\n    \n    for i, temp in enumerate(temperatures):\n        while stack and temp > temperatures[stack[-1]]:\n            prev_idx = stack.pop()\n            res[prev_idx] = i - prev_idx\n        stack.append(i)\n        \n    return res\n\n# Test:\n# temperatures = [73,74,75,71,69,72,76,73] -> Output: [1,1,4,2,1,1,0,0]",
    "timeComplexity": "O(N) \u2014 Each element pushed and popped at most once",
    "spaceComplexity": "O(N) \u2014 Stack size",
    "commonMistakes": "Storing temperatures instead of indices in the stack.",
    "interviewerFollowUps": [
      "How would you solve this if the array was circular? (Loop 2*N times with index `i % N`)."
    ],
    "bankingScenario": "Calculating customer loan delinquency recovery lag: how many days until ledger balance exceeds previous overdraft threshold."
  },
  {
    "id": "dsa-min-stack",
    "title": "Min Stack (O(1) Minimum Balance Tracker)",
    "category": "Stack",
    "difficulty": "Medium",
    "pattern": "Dual Stack / Tuple State Tracking",
    "statement": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1). Implement `MinStack()` with `push(val)`, `pop()`, `top()`, and `getMin()`.",
    "constraints": "-2^31 <= val <= 2^31 - 1, at most 3 * 10^4 calls will be made to methods.",
    "intuitionHinglish": "Normal stack mein minimum element dhoondhne ke liye O(N) scan karna padta hai. O(1) ke liye har value ke saath hum us waqt tak ka minimum bhi pair karke stack mein store kar lete hain: `(val, current_min)`! Jab koi element pop hoga, toh uske sath ka minimum bhi nikal jayega aur purana minimum automatically restore ho jayega.",
    "approach": "Maintain list `stack` where each entry is a tuple `(val, min_val)`. In `push(val)`, new min is `min(val, stack[-1][1])` if stack else `val`. In `pop()`, simply `stack.pop()`. In `top()`, return `stack[-1][0]`. In `getMin()`, return `stack[-1][1]`.",
    "pythonSolution": "class MinStack:\n    def __init__(self):\n        self.stack = [] # List of tuples: (val, current_min_at_this_level)\n\n    def push(self, val: int) -> None:\n        if not self.stack:\n            self.stack.append((val, val))\n        else:\n            current_min = min(val, self.stack[-1][1])\n            self.stack.append((val, current_min))\n\n    def pop(self) -> None:\n        if self.stack:\n            self.stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1][0] if self.stack else -1\n\n    def getMin(self) -> int:\n        return self.stack[-1][1] if self.stack else -1",
    "timeComplexity": "O(1) for all operations (push, pop, top, getMin)",
    "spaceComplexity": "O(N) \u2014 Storing paired tuples",
    "commonMistakes": "Only keeping a single scalar `min_val` variable (fails when the minimum element is popped, leaving no way to know what the previous minimum was without rescanning).",
    "interviewerFollowUps": [
      "Can you implement Min Stack with O(1) extra space using mathematical encoding? (`val - min_val` encoding trick)."
    ],
    "bankingScenario": "Real-time ledger audit monitor: tracking customer minimum intraday account balance for MAB (Minimum Average Balance) penalty enforcement."
  },
  {
    "id": "dsa-next-greater-element",
    "title": "Next Greater Element (Monotonic Stack)",
    "category": "Stack",
    "difficulty": "Medium",
    "pattern": "Monotonic Decreasing Stack with Hash Map",
    "statement": "The next greater element of some element `x` in an array is the first greater element that is to the right of `x` in the same array. Find all next greater elements in `nums2` for elements in `nums1`.",
    "constraints": "1 <= nums1.length <= nums2.length <= 1000, 0 <= nums1[i], nums2[i] <= 10^4",
    "intuitionHinglish": "Array ko traverse karte waqt elements ko stack mein push karte jao. Jaise hi koi bada number mile, stack ke un sabhi numbers ko pop kar do jo is naye number se chote hain\u2014un sabhi ke liye 'Next Greater Element' yahi naya number hai!",
    "approach": "Use a stack and hash map `next_greater = {}`. For num in `nums2`: while stack and stack[-1] < num: `next_greater[stack.pop()] = num`. Append num to stack. Finally map each element of `nums1` using `next_greater.get(x, -1)`.",
    "pythonSolution": "def nextGreaterElement(nums1: list[int], nums2: list[int]) -> list[int]:\n    stack = []\n    next_greater = {}\n    \n    for num in nums2:\n        while stack and stack[-1] < num:\n            next_greater[stack.pop()] = num\n        stack.append(num)\n        \n    return [next_greater.get(x, -1) for x in nums1]",
    "timeComplexity": "O(N + M) \u2014 Linear time",
    "spaceComplexity": "O(N) \u2014 Hash map and stack storage",
    "commonMistakes": "Nested loops resulting in O(N*M) time.",
    "interviewerFollowUps": [
      "What if array has duplicate elements? (Store indices in stack instead of raw values)."
    ],
    "bankingScenario": "Credit limit laddering: finding the next threshold limit upgrade eligibility for account holders."
  },
  {
    "id": "dsa-reverse-linked-list",
    "title": "Reverse Linked List",
    "category": "Linked List",
    "difficulty": "Easy",
    "pattern": "Iterative Pointer Reversal",
    "statement": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "constraints": "0 <= number of nodes <= 5000, -5000 <= Node.val <= 5000",
    "intuitionHinglish": "Har node ke pointer ko aage point karne ki jagah piche (`prev`) point karwa do! Pointer cut karne se pehle agle node ka reference `next_node` mein save karna mat bhoolna.",
    "approach": "Maintain `prev = None, curr = head`. While `curr`: save `nxt = curr.next`, reverse link `curr.next = prev`, shift `prev = curr`, shift `curr = nxt`. Return `prev`.",
    "pythonSolution": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef reverseList(head: ListNode) -> ListNode:\n    prev = None\n    curr = head\n    \n    while curr:\n        nxt = curr.next  # Save next node\n        curr.next = prev # Reverse link\n        prev = curr      # Move prev forward\n        curr = nxt       # Move curr forward\n        \n    return prev",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 In-place pointer manipulation",
    "commonMistakes": "Losing reference to `curr.next` before assigning `curr.next = prev`.",
    "interviewerFollowUps": [
      "How would you reverse only a sublist between position left and right? (Reverse Linked List II)."
    ],
    "bankingScenario": "Reversing an audit trail chain for reverse reconciliation chronologies."
  },
  {
    "id": "dsa-linked-list-cycle",
    "title": "Linked List Cycle Detection (Floyd's Tortoise & Hare)",
    "category": "Linked List",
    "difficulty": "Easy",
    "pattern": "Fast & Slow Pointers (Floyd's Cycle Finding)",
    "statement": "Given `head`, the head of a linked list, determine if the linked list has a cycle in it.",
    "constraints": "0 <= number of nodes <= 10^4, -10^5 <= Node.val <= 10^5",
    "intuitionHinglish": "Socho ek circular race track par do runners hain: ek slow (1 step) aur ek fast (2 steps). Agar track straight hai, toh fast runner end par pahuch jayega. Lekin agar track mein loop/cycle hai, toh fast runner slow runner ko zaroor lap karke match karega (`slow == fast`)!",
    "approach": "Set `slow = head, fast = head`. While `fast and fast.next`: `slow = slow.next`, `fast = fast.next.next`. If `slow == fast`, return `True`. If loop terminates, return `False`.",
    "pythonSolution": "def hasCycle(head: ListNode) -> bool:\n    slow = head\n    fast = head\n    \n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        \n        if slow == fast:\n            return True\n            \n    return False",
    "timeComplexity": "O(N) \u2014 Linear time",
    "spaceComplexity": "O(1) \u2014 Two pointer variables",
    "commonMistakes": "Using a Hash Set of visited nodes (takes O(N) extra memory when Floyd's Tortoise & Hare takes O(1) space).",
    "interviewerFollowUps": [
      "Can you find the exact start node of the cycle? (Cycle II: when slow meets fast, reset slow to head, move both 1 step at a time until they meet)."
    ],
    "bankingScenario": "Detecting circular payment routing loops where routing rules inadvertently create an infinite retry ring."
  },
  {
    "id": "dsa-merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "category": "Linked List",
    "difficulty": "Easy",
    "pattern": "Dummy Head Pointers",
    "statement": "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    "constraints": "0 <= number of nodes in both lists <= 50, -100 <= Node.val <= 100",
    "intuitionHinglish": "Ek Dummy Node banao jisse head pointer lose na ho. Fir dono lists ke heads compare karo: jo chota hai, dummy tail ke next me jod do aur us list ke pointer ko aage badhao.",
    "approach": "Create `dummy = ListNode()`. `curr = dummy`. While `l1 and l2`: if `l1.val <= l2.val`: `curr.next = l1; l1 = l1.next` else: `curr.next = l2; l2 = l2.next`. Advance `curr = curr.next`. Attach remaining list. Return `dummy.next`.",
    "pythonSolution": "def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:\n    dummy = ListNode(-1)\n    curr = dummy\n    \n    while list1 and list2:\n        if list1.val <= list2.val:\n            curr.next = list1\n            list1 = list1.next\n        else:\n            curr.next = list2\n            list2 = list2.next\n        curr = curr.next\n        \n    curr.next = list1 if list1 else list2\n    return dummy.next",
    "timeComplexity": "O(N + M) \u2014 Linear in size of both lists",
    "spaceComplexity": "O(1) \u2014 Re-linking existing nodes",
    "commonMistakes": "Creating brand new nodes instead of re-pointing `.next` pointers of existing nodes.",
    "interviewerFollowUps": [
      "How do you scale this to merge K sorted linked lists? (Merge K Sorted Lists using Min-Heap)."
    ],
    "bankingScenario": "Merging two chronological settlement ledger chains into a unified reconciliation stream."
  },
  {
    "id": "dsa-merge-k-sorted-lists",
    "title": "Merge K Sorted Lists",
    "category": "Linked List",
    "difficulty": "Hard",
    "pattern": "Min-Heap / Divide & Conquer",
    "statement": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    "constraints": "k == lists.length, 0 <= k <= 10^4, 0 <= total nodes <= 10^4",
    "intuitionHinglish": "Har list ka pehla node ek Min-Heap mein daal do (size K). Heap ke top par hamesha sabhi lists ka sabse chota node hoga! Use pop karke merged list mein jodo, aur usi list ka agla node heap mein push kar do.",
    "approach": "Use Python `heapq`. Store tuples `(node.val, index, node)` to avoid tie comparison issues. Pop smallest, append to dummy list, push `node.next` into heap if present.",
    "pythonSolution": "import heapq\n\ndef mergeKLists(lists: list[ListNode]) -> ListNode:\n    dummy = ListNode(0)\n    curr = dummy\n    min_heap = []\n    \n    # Push the head of each list into heap\n    for i, node in enumerate(lists):\n        if node:\n            # Tuple: (node.val, unique_index, node)\n            heapq.heappush(min_heap, (node.val, i, node))\n            \n    while min_heap:\n        val, i, smallest_node = heapq.heappop(min_heap)\n        curr.next = smallest_node\n        curr = curr.next\n        \n        if smallest_node.next:\n            heapq.heappush(min_heap, (smallest_node.next.val, i, smallest_node.next))\n            \n    return dummy.next",
    "timeComplexity": "O(N log K) where N is total nodes and K is number of lists",
    "spaceComplexity": "O(K) \u2014 Min-heap holds at most K nodes at any time",
    "commonMistakes": "Pushing `(node.val, node)` into heap without unique tie-breaker index, causing Python `TypeError: '<' not supported between instances of 'ListNode'` when node values are equal.",
    "interviewerFollowUps": [
      "Can you solve this with Divide and Conquer (merging pairs of lists) without extra heap memory?"
    ],
    "bankingScenario": "Consolidating live transaction feeds from K external payment partner gateways (UPI, Visa, Mastercard, RuPay, IMPS) in chronological order."
  },
  {
    "id": "dsa-remove-nth-from-end",
    "title": "Remove Nth Node From End of List",
    "category": "Linked List",
    "difficulty": "Medium",
    "pattern": "Fast and Slow Fixed-Gap Pointers",
    "statement": "Given the head of a linked list, remove the `n`th node from the end of the list and return its head.",
    "constraints": "The number of nodes in the list is `sz`, 1 <= sz <= 30, 0 <= Node.val <= 100, 1 <= n <= sz",
    "intuitionHinglish": "List ki length pehle se calculate karne ki zaroorat nahi hai. Ek Dummy node banao, aur do pointers lo: `fast` aur `slow`. Pehle `fast` ko `n + 1` steps aage bhej do. Fir dono ko 1-1 step aage badhao jab tak `fast` None na ho jaye. `slow` pointer theek us node ke piche khada hoga jise delete karna hai!",
    "approach": "Create `dummy = ListNode(0, head)`. `fast = slow = dummy`. Move `fast` ahead `n + 1` steps. While `fast`: move both `fast = fast.next`, `slow = slow.next`. Then bypass target: `slow.next = slow.next.next`. Return `dummy.next`.",
    "pythonSolution": "def removeNthFromEnd(head: ListNode, n: int) -> ListNode:\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    \n    # Advance fast by n + 1 positions\n    for _ in range(n + 1):\n        fast = fast.next\n        \n    # Move both until fast reaches the end\n    while fast:\n        fast = fast.next\n        slow = slow.next\n        \n    # Delete the nth node\n    slow.next = slow.next.next\n    return dummy.next",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Two pointer variables",
    "commonMistakes": "Not using a dummy node, which fails when removing the first node of the list (`n == len(list)`).",
    "interviewerFollowUps": [
      "Can you do this with a recursive postorder call stack?"
    ],
    "bankingScenario": "Purging the Nth oldest unacknowledged webhook notification in an account event replay queue."
  },
  {
    "id": "dsa-search-rotated-array",
    "title": "Search in Rotated Sorted Array",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Modified Binary Search / Sorted Half Identification",
    "statement": "Given the array `nums` after possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or -1 if it is not in `nums` in O(log n) runtime.",
    "constraints": "1 <= nums.length <= 5000, -10^4 <= nums[i] <= 10^4, all values unique",
    "intuitionHinglish": "Rotated array mein `mid` calculate karne ke baad ek side HAMESHA normally sorted hoti hai (ya toh left se mid, ya mid se right). Pehle identify karo kaunsi side sorted hai. Agar target us sorted side ke range mein lie karta hai, toh waha search karo; warna dusri side jao!",
    "approach": "While `left <= right`: calculate `mid`. If `nums[mid] == target`, return mid. If `nums[left] <= nums[mid]` (left is sorted): if `nums[left] <= target < nums[mid]`, `right = mid - 1` else `left = mid + 1`. Else (right is sorted): if `nums[mid] < target <= nums[right]`, `left = mid + 1` else `right = mid - 1`.",
    "pythonSolution": "def search(nums: list[int], target: int) -> int:\n    left, right = 0, len(nums) - 1\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target:\n            return mid\n            \n        # Check if left half is sorted\n        if nums[left] <= nums[mid]:\n            if nums[left] <= target < nums[mid]:\n                right = mid - 1 # Target in left sorted range\n            else:\n                left = mid + 1\n        # Otherwise, right half is sorted\n        else:\n            if nums[mid] < target <= nums[right]:\n                left = mid + 1  # Target in right sorted range\n            else:\n                right = mid - 1\n                \n    return -1",
    "timeComplexity": "O(log N) \u2014 Halving search space each step",
    "spaceComplexity": "O(1) \u2014 Iterative pointers",
    "commonMistakes": "Not using strict `<` vs `<=` properly when testing boundary ranges.",
    "interviewerFollowUps": [
      "What if nums contains duplicate elements? (Degrades to O(N) worst case if `nums[left] == nums[mid] == nums[right]`)."
    ],
    "bankingScenario": "Searching round-robin partitioned transaction logs shifted during partition rebalancing."
  },
  {
    "id": "dsa-first-last-position",
    "title": "Find First and Last Position in Sorted Array",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Binary Search Lower & Upper Bounds",
    "statement": "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value. If target is not found, return `[-1, -1]`. You must write an algorithm with O(log n) runtime complexity.",
    "constraints": "0 <= nums.length <= 10^5, -10^9 <= nums[i] <= 10^9, nums is non-decreasing",
    "intuitionHinglish": "Kyunki array sorted hai, hum do alag binary searches chala sakte hain: ek first occurrence dhundne ke liye (target milne par right = mid - 1 karke left side search continue rakho), aur dusra last occurrence dhundne ke liye (target milne par left = mid + 1 karke right side search continue rakho).",
    "approach": "Write helper `find_bound(find_first)`. When `nums[mid] == target`, record `ans = mid`. If `find_first` look left (`right = mid - 1`), else look right (`left = mid + 1`).",
    "pythonSolution": "def searchRange(nums: list[int], target: int) -> list[int]:\n    def find_bound(find_first: bool) -> int:\n        left, right = 0, len(nums) - 1\n        bound = -1\n        while left <= right:\n            mid = (left + right) // 2\n            if nums[mid] == target:\n                bound = mid\n                if find_first:\n                    right = mid - 1\n                else:\n                    left = mid + 1\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        return bound\n        \n    return [find_bound(True), find_bound(False)]",
    "timeComplexity": "O(log N) \u2014 Two binary search passes",
    "spaceComplexity": "O(1) \u2014 Constant memory",
    "commonMistakes": "Binary searching target once and then doing linear scan left/right (degrades to O(N) when all elements are identical).",
    "interviewerFollowUps": [
      "How does `bisect.bisect_left` and `bisect.bisect_right` implement this in Python?"
    ],
    "bankingScenario": "Retrieving index bounds for all customer transactions occurring on a specific fiscal calendar date."
  },
  {
    "id": "dsa-find-min-rotated",
    "title": "Find Minimum in Rotated Sorted Array",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Binary Search Mid vs Right Comparison",
    "statement": "Given the sorted rotated array `nums` of unique elements, return the minimum element of this array in O(log n) time.",
    "constraints": "n == nums.length, 1 <= n <= 5000, -5000 <= nums[i] <= 5000, all integers are unique.",
    "intuitionHinglish": "Humein rotation inflection point (pivot) dhoondhna hai. Mid element ko HAMESHA `nums[right]` se compare karo: agar `nums[mid] > nums[right]`, iska matlab pivot right side mein hai (`left = mid + 1`). Agar `nums[mid] <= nums[right]`, pivot left side ya mid par hi hai (`right = mid`). Jab pointers meet karenge, wahi minimum hoga!",
    "approach": "Set `left = 0, right = len(nums) - 1`. While `left < right`: `mid = (left + right) // 2`. If `nums[mid] > nums[right]`: `left = mid + 1` else: `right = mid`. Return `nums[left]`.",
    "pythonSolution": "def findMin(nums: list[int]) -> int:\n    left, right = 0, len(nums) - 1\n    \n    while left < right:\n        mid = (left + right) // 2\n        if nums[mid] > nums[right]:\n            # Minimum must lie strictly in right half\n            left = mid + 1\n        else:\n            # Minimum is at mid or in left half\n            right = mid\n            \n    return nums[left]\n\n# Test:\n# nums = [3,4,5,1,2] -> Output: 1\n# nums = [4,5,6,7,0,1,2] -> Output: 0",
    "timeComplexity": "O(log N) \u2014 Halving search range",
    "spaceComplexity": "O(1) \u2014 In-place pointers",
    "commonMistakes": "Comparing `nums[mid]` against `nums[left]` instead of `nums[right]` (fails when array is not rotated).",
    "interviewerFollowUps": [
      "What if elements are not unique? (Find Minimum in Rotated Sorted Array II: when `nums[mid] == nums[right]`, decrement `right -= 1`)."
    ],
    "bankingScenario": "Locating the lowest historical interest rate record in a circularly rotated database partition."
  },
  {
    "id": "dsa-ship-within-days",
    "title": "Capacity To Ship Packages Within D Days",
    "category": "Binary Search",
    "difficulty": "Medium",
    "pattern": "Binary Search on Answer Space (Monotonic Predicate)",
    "statement": "A conveyor belt has packages that must be shipped within `days` days. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.",
    "constraints": "1 <= days <= weights.length <= 5 * 10^4, 1 <= weights[i] <= 500",
    "intuitionHinglish": "Capacity ki minimum possible value kya hogi? Sabse bhari package ka weight `max(weights)`. Maximum value kya hogi? Saare packages ka total sum `sum(weights)`. Is range `[max, sum]` par Binary Search chalao! Har mid capacity ke liye check karo: kya is capacity se hum D din mein ship kar sakte hain?",
    "approach": "1. `left = max(weights), right = sum(weights)`. 2. While `left <= right`: `mid = (left + right) // 2`. Helper `can_ship(cap)` calculates days needed. If days <= D: `ans = mid, right = mid - 1` (try smaller capacity). Else: `left = mid + 1`.",
    "pythonSolution": "def shipWithinDays(weights: list[int], days: int) -> int:\n    def can_ship(capacity: int) -> bool:\n        needed_days = 1\n        current_load = 0\n        for w in weights:\n            if current_load + w > capacity:\n                needed_days += 1\n                current_load = w\n            else:\n                current_load += w\n        return needed_days <= days\n\n    left = max(weights)\n    right = sum(weights)\n    ans = right\n    \n    while left <= right:\n        mid = (left + right) // 2\n        if can_ship(mid):\n            ans = mid\n            right = mid - 1 # Try to find smaller valid capacity\n        else:\n            left = mid + 1  # Need more capacity\n            \n    return ans\n\n# Test:\n# weights = [1,2,3,4,5,6,7,8,9,10], days = 5 -> Output: 15",
    "timeComplexity": "O(N * log(sum(weights) - max(weights)))",
    "spaceComplexity": "O(1) auxiliary",
    "commonMistakes": "Setting `left = 0` instead of `max(weights)` (impossible to ship a single item larger than ship capacity).",
    "interviewerFollowUps": [
      "What other problems use this exact same pattern? (Koko Eating Bananas, Split Array Largest Sum, Painter's Partition Problem)."
    ],
    "bankingScenario": "Batch job scheduling: determining the minimum daily transaction processing bandwidth required to clear a backlog within regulatory settlement deadlines."
  },
  {
    "id": "dsa-lowest-common-ancestor",
    "title": "Lowest Common Ancestor in Binary Tree",
    "category": "Trees",
    "difficulty": "Medium",
    "pattern": "Recursive Postorder Traversal",
    "statement": "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.",
    "constraints": "Number of nodes between 2 and 10^5, all Node.val are unique, p != q, p and q exist in tree.",
    "intuitionHinglish": "Postorder (bottom-up) DFS chalao. Agar current node khud `p` ya `q` hai, toh use return kar do. Dono left aur right subtrees se results mangwao. Agar left aur right dono se non-null result mila, iska matlab ek node left mein hai aur dusra right mein\u2014isliye current node hi inka LCA hai!",
    "approach": "Base cases: if `not root or root == p or root == q`, return `root`. Recursively find `left = lowestCommonAncestor(root.left, p, q)` and `right = lowestCommonAncestor(root.right, p, q)`. If both `left and right`, return `root`. Else return `left or right`.",
    "pythonSolution": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n    if not root or root == p or root == q:\n        return root\n        \n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    \n    if left and right:\n        return root # Both branches found one target each\n        \n    return left if left else right",
    "timeComplexity": "O(N) \u2014 Visits each node once in worst case",
    "spaceComplexity": "O(H) where H is tree height (recursion call stack)",
    "commonMistakes": "Not returning `root` immediately when `root == p or root == q`.",
    "interviewerFollowUps": [
      "How does this simplify if the tree is a Binary Search Tree (BST)? (Use BST property: if both values < root, go left; if both > root, go right; else root is LCA in O(H) without checking entire tree)."
    ],
    "bankingScenario": "Organizational corporate hierarchies: finding the closest common approving manager for dual-signoff high-value wire transfers."
  },
  {
    "id": "dsa-level-order-traversal",
    "title": "Binary Tree Level Order Traversal (BFS)",
    "category": "Trees",
    "difficulty": "Medium",
    "pattern": "Queue BFS Level-by-Level",
    "statement": "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    "constraints": "0 <= number of nodes <= 2000, -1000 <= Node.val <= 1000",
    "intuitionHinglish": "Level-by-level print karne ke liye Queue (BFS) use hota hai. Har level par loop shuru hone se pehle queue ka size snapshot le lo (`level_size = len(queue)`). Utne hi elements ko pop karke current level list mein add karo aur unke children ko queue mein daalo.",
    "approach": "Use `collections.deque([root])`. While queue: get `level_size = len(queue)`. Iterate `level_size` times: popleft node, append `node.val` to level array, push left/right children. Append level array to result.",
    "pythonSolution": "from collections import deque\n\ndef levelOrder(root: TreeNode) -> list[list[int]]:\n    if not root:\n        return []\n        \n    result = []\n    queue = deque([root])\n    \n    while queue:\n        level_size = len(queue)\n        current_level = []\n        \n        for _ in range(level_size):\n            node = queue.popleft()\n            current_level.append(node.val)\n            \n            if node.left:\n                queue.append(node.left)\n            if node.right:\n                queue.append(node.right)\n                \n        result.append(current_level)\n        \n    return result",
    "timeComplexity": "O(N) \u2014 Every node processed once",
    "spaceComplexity": "O(W) where W is maximum width of the tree (at most N/2 for full binary tree)",
    "commonMistakes": "Using standard list `pop(0)` which is O(N) instead of `deque.popleft()` which is O(1).",
    "interviewerFollowUps": [
      "How would you implement Zigzag / Spiral Level Order Traversal? (Alternate popping or reverse levels with odd index)."
    ],
    "bankingScenario": "Visualizing banking branch network tiers from regional headquarters down to rural customer service points."
  },
  {
    "id": "dsa-validate-bst",
    "title": "Validate Binary Search Tree",
    "category": "Trees",
    "difficulty": "Medium",
    "pattern": "DFS with Range Invariants [low, high]",
    "statement": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    "constraints": "Number of nodes between 1 and 10^4, -2^31 <= Node.val <= 2^31 - 1",
    "intuitionHinglish": "Sirf ye check karna kaafi nahi hai ki `root.left < root < root.right`. Left subtree ke SARE nodes root se chote hone chahiye, aur Right subtree ke SARE nodes root se bade hone chahiye! Isliye har recursive call mein hum valid range pass karte hain: `(low_limit, high_limit)`.",
    "approach": "Define helper `validate(node, low, high)`. If `not node`: return True. If not (`low < node.val < high`): return False. Recurse `validate(node.left, low, node.val) and validate(node.right, node.val, high)`.",
    "pythonSolution": "def isValidBST(root: TreeNode) -> bool:\n    def validate(node, low=float('-inf'), high=float('inf')):\n        if not node:\n            return True\n        if not (low < node.val < high):\n            return False\n        # Left subtree must be < node.val; Right subtree must be > node.val\n        return (validate(node.left, low, node.val) and \n                validate(node.right, node.val, high))\n                \n    return validate(root)\n\n# Alternative Inorder Traversal Property:\n# An inorder traversal of a valid BST must yield strictly ascending values!",
    "timeComplexity": "O(N) \u2014 Visits each node once",
    "spaceComplexity": "O(H) \u2014 Recursion stack bounded by tree height",
    "commonMistakes": "Only checking parent-child condition `node.left.val < node.val`, which misses violations where a deeper left node is larger than an ancestor.",
    "interviewerFollowUps": [
      "How can you validate a BST iteratively using an Inorder Traversal stack?"
    ],
    "bankingScenario": "Validating relational database B-Tree index page structures for pointer consistency and corruption checks."
  },
  {
    "id": "dsa-tree-max-path-sum",
    "title": "Binary Tree Maximum Path Sum",
    "category": "Trees",
    "difficulty": "Hard",
    "pattern": "Postorder Traversal with Global Max Tracker",
    "statement": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. The path sum of a path is the sum of the node's values in the path. Given the `root` of a binary tree, return the maximum path sum of any non-empty path.",
    "constraints": "Number of nodes between 1 and 3 * 10^4, -1000 <= Node.val <= 1000",
    "intuitionHinglish": "Kisi bhi node ko bridge banakar path banaya ja sakta hai: `left_gain + node.val + right_gain`. Lekin parent ko aage return karte waqt hum sirf EK hi arm (either left or right) return kar sakte hain, kyunki path branch nahi ho sakta! Agar kisi subtree ka gain negative ho, toh use ignore (0) kar do.",
    "approach": "Maintain `max_sum = float('-inf')`. Helper `max_gain(node)`: if not node return 0. `left = max(0, max_gain(node.left))`, `right = max(0, max_gain(node.right))`. Update `max_sum = max(max_sum, node.val + left + right)`. Return `node.val + max(left, right)`.",
    "pythonSolution": "def maxPathSum(root: TreeNode) -> int:\n    max_sum = float('-inf')\n    \n    def max_gain(node: TreeNode) -> int:\n        nonlocal max_sum\n        if not node:\n            return 0\n            \n        # Ignore negative contributions\n        left_gain = max(0, max_gain(node.left))\n        right_gain = max(0, max_gain(node.right))\n        \n        # Current node acts as arch/bridge of the path\n        current_path_sum = node.val + left_gain + right_gain\n        max_sum = max(max_sum, current_path_sum)\n        \n        # For parent's path, we can only choose the single best branch\n        return node.val + max(left_gain, right_gain)\n        \n    max_gain(root)\n    return max_sum",
    "timeComplexity": "O(N) \u2014 Each node visited once",
    "spaceComplexity": "O(H) \u2014 Height of tree recursion stack",
    "commonMistakes": "Returning `node.val + left_gain + right_gain` to the parent call (a path cannot bifurcate through both children and continue upward).",
    "interviewerFollowUps": [
      "What if path must start at the root and end at a leaf? (Standard DFS root-to-leaf)."
    ],
    "bankingScenario": "Credit underwriting decision trees: evaluating the path of maximum cumulative customer repayment credit score."
  },
  {
    "id": "dsa-kth-largest",
    "title": "Kth Largest Element in an Array",
    "category": "Heaps / Priority Queue",
    "difficulty": "Medium",
    "pattern": "Min-Heap of Size K",
    "statement": "Given an integer array `nums` and an integer `k`, return the `k`th largest element in the array.",
    "constraints": "1 <= k <= nums.length <= 10^5, -10^4 <= nums[i] <= 10^4",
    "intuitionHinglish": "Size K ka Min-Heap banate hain. Heap ke root par hamesha un K sabse bade elements ka 'smallest' element hoga. Jab bhi heap size > K ho, root ko pop kar do. Scan ke baad root (`heap[0]`) hi Kth largest hoga!",
    "approach": "Push elements to min-heap. If `len(min_heap) > k`: `heapq.heappop(min_heap)`. Return `min_heap[0]`.",
    "pythonSolution": "import heapq\n\ndef findKthLargest(nums: list[int], k: int) -> int:\n    min_heap = []\n    for num in nums:\n        heapq.heappush(min_heap, num)\n        if len(min_heap) > k:\n            heapq.heappop(min_heap)\n    return min_heap[0]\n\n# Alternative one-liner:\n# return heapq.nlargest(k, nums)[-1]",
    "timeComplexity": "O(N log K) \u2014 Much faster than full sort O(N log N) when K << N",
    "spaceComplexity": "O(K) \u2014 Heap size strictly bounded by K",
    "commonMistakes": "Creating a Max-Heap of size N which uses O(N) space and O(K log N) pops.",
    "interviewerFollowUps": [
      "Can you achieve O(N) average time complexity? (QuickSelect algorithm)."
    ],
    "bankingScenario": "Real-time streaming ledger: tracking the top 100 highest-value transactions in the last hour for anti-money laundering (AML) threshold alerts."
  },
  {
    "id": "dsa-find-median-stream",
    "title": "Find Median from Data Stream (Two Heaps)",
    "category": "Heaps / Priority Queue",
    "difficulty": "Hard",
    "pattern": "Two Heaps (Max-Heap + Min-Heap)",
    "statement": "The median is the middle value in an ordered integer list. Design a data structure that supports adding numbers from a data stream and finding the median in O(1) time.",
    "constraints": "-10^5 <= num <= 10^5, at most 5 * 10^4 calls to `addNum` and `findMedian`.",
    "intuitionHinglish": "Stream ko do halves mein divide kar lo: Chote numbers ka Max-Heap (`small`, inverted values) aur Bade numbers ka Min-Heap (`large`). Dono heaps ka size ya toh equal hoga ya `small` ka size 1 zyada hoga. Median ya toh `small[0]` hoga (odd count) ya dono roots ka average (even count)!",
    "approach": "1. `small` (max-heap) holds lower half, `large` (min-heap) holds upper half.\n2. In `addNum(num)`: push to `small`. Pop largest from `small` and push to `large`. If `len(large) > len(small)`, pop from `large` to `small`.\n3. In `findMedian()`: if sizes unequal, return `small[0]`; else return `(small[0] + large[0]) / 2.0`.",
    "pythonSolution": "import heapq\n\nclass MedianFinder:\n    def __init__(self):\n        # small is a Max-Heap (stores negative numbers to emulate max-heap)\n        self.small = []\n        # large is a Min-Heap\n        self.large = []\n\n    def addNum(self, num: int) -> None:\n        # Step 1: Push to small (max-heap)\n        heapq.heappush(self.small, -num)\n        \n        # Step 2: Ensure largest in small <= smallest in large\n        if self.small and self.large and (-self.small[0] > self.large[0]):\n            val = -heapq.heappop(self.small)\n            heapq.heappush(self.large, val)\n            \n        # Step 3: Maintain size balance (small can have at most 1 more element than large)\n        if len(self.small) > len(self.large) + 1:\n            val = -heapq.heappop(self.small)\n            heapq.heappush(self.large, val)\n        elif len(self.large) > len(self.small):\n            val = heapq.heappop(self.large)\n            heapq.heappush(self.small, -val)\n\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large):\n            return float(-self.small[0])\n        return (-self.small[0] + self.large[0]) / 2.0",
    "timeComplexity": "O(log N) for `addNum`, O(1) for `findMedian`",
    "spaceComplexity": "O(N) \u2014 Stores incoming stream elements in two heaps",
    "commonMistakes": "Re-sorting the array on every insertion (O(N log N) per query, which times out).",
    "interviewerFollowUps": [
      "What if 99% of numbers in stream are between 0 and 100? (Use bucket counting array for O(1) add and find)."
    ],
    "bankingScenario": "Real-time algorithmic trading: streaming continuous pricing feeds to calculate median bid-ask spreads for market maker order execution."
  },
  {
    "id": "dsa-lru-cache",
    "title": "LRU Cache (Least Recently Used Cache)",
    "category": "Design / Queues",
    "difficulty": "Medium",
    "pattern": "Hash Map + Doubly Linked List",
    "statement": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) average time complexity for `get` and `put`.",
    "constraints": "1 <= capacity <= 3000, 0 <= key <= 10^4, 0 <= value <= 10^5, at most 2*10^5 calls",
    "intuitionHinglish": "O(1) lookup ke liye Hash Map chahiye. O(1) ordering aur eviction ke liye Doubly Linked List chahiye. Python mein `collections.OrderedDict` internally yahi exact pattern implement karta hai!",
    "approach": "Use `collections.OrderedDict`. In `get(key)`: if key exists, call `move_to_end(key)` and return value. In `put(key, value)`: update and `move_to_end`. If new and exceeds capacity, `popitem(last=False)` (evict least recently used from front).",
    "pythonSolution": "from collections import OrderedDict\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = OrderedDict()\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        self.cache.move_to_end(key)\n        return self.cache[key]\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.move_to_end(key)\n        self.cache[key] = value\n        \n        if len(self.cache) > self.capacity:\n            # Evict least recently used (first item)\n            self.cache.popitem(last=False)",
    "timeComplexity": "O(1) for both get() and put()",
    "spaceComplexity": "O(capacity) \u2014 Stores up to capacity key-value pairs",
    "commonMistakes": "Using standard list for eviction (list.remove() is O(N), ruining O(1) guarantee).",
    "interviewerFollowUps": [
      "How do you implement raw Doubly Linked List without OrderedDict? (Node with prev/next pointers + dummy head/tail).",
      "How do you make this thread-safe in a banking API server? (Use threading.Lock or RLock)."
    ],
    "bankingScenario": "Sub-millisecond API caching for customer session auth tokens and real-time account balances."
  },
  {
    "id": "dsa-course-schedule",
    "title": "Course Schedule (Cycle Detection / Topological Sort)",
    "category": "Graphs",
    "difficulty": "Medium",
    "pattern": "Kahn's Algorithm (BFS In-Degree) / Directed Cycle Detection",
    "statement": "There are a total of `numCourses` courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where `prerequisites[i] = [a_i, b_i]` indicates that you must take course b_i first if you want to take course a_i. Return true if you can finish all courses. Otherwise, return false.",
    "constraints": "1 <= numCourses <= 2000, 0 <= prerequisites.length <= 5000",
    "intuitionHinglish": "Agar dependencies mein koi cycle hai (A depends on B, B depends on A), toh courses complete nahi ho sakte! Kahn's Algorithm use karo: Sabhi nodes ka `in_degree` (incoming edges) count karo. Jin nodes ka in-degree 0 hai, unhe queue mein daalo. Queue se pop karke unke neighbors ka in-degree kam karo. Agar total processed courses == numCourses, koi cycle nahi hai!",
    "approach": "Build adjacency list and `in_degree` array. Enqueue all nodes with `in_degree == 0`. While queue: pop node, increment `processed_count`, decrement neighbors' in-degree. If neighbor reaches 0 in-degree, enqueue. Return `processed_count == numCourses`.",
    "pythonSolution": "from collections import deque, defaultdict\n\ndef canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    adj = defaultdict(list)\n    in_degree = [0] * numCourses\n    \n    for dest, src in prerequisites:\n        adj[src].append(dest)\n        in_degree[dest] += 1\n        \n    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    completed = 0\n    \n    while queue:\n        node = queue.popleft()\n        completed += 1\n        \n        for neighbor in adj[node]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0:\n                queue.append(neighbor)\n                \n    return completed == numCourses",
    "timeComplexity": "O(V + E) where V is numCourses and E is prerequisites",
    "spaceComplexity": "O(V + E) for adjacency list and queue",
    "commonMistakes": "Reversing the dependency direction (`dest -> src` instead of `src -> dest`).",
    "interviewerFollowUps": [
      "What if you need to return the actual topological order? (Course Schedule II)."
    ],
    "bankingScenario": "Validating inter-service microservice startup dependencies in container orchestration pipelines."
  },
  {
    "id": "dsa-number-of-islands",
    "title": "Number of Islands (Fraud Network Clusters)",
    "category": "Graphs",
    "difficulty": "Medium",
    "pattern": "2D Grid BFS / DFS Connected Components",
    "statement": "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    "constraints": "m == grid.length, n == grid[i].length, 1 <= m, n <= 300, grid[i][j] is '0' or '1'.",
    "intuitionHinglish": "Grid ko traverse karo. Jab bhi koi unvisited land cell `'1'` mile, ek naya island count increment karo, aur fir BFS ya DFS chala kar us pure island ke saare connected `'1'`s ko sink karke `'0'` (water) bana do taaki wo dobara count na hon!",
    "approach": "Loop through `r, c`. If `grid[r][c] == '1'`: increment `islands_count`, run `bfs(r, c)` or `dfs(r, c)` to mark all 4-directionally adjacent cells as `'0'`. Return `islands_count`.",
    "pythonSolution": "from collections import deque\n\ndef numIslands(grid: list[list[str]]) -> int:\n    if not grid:\n        return 0\n        \n    rows, cols = len(grid), len(grid[0])\n    island_count = 0\n    \n    def bfs(start_r, start_c):\n        queue = deque([(start_r, start_c)])\n        grid[start_r][start_c] = '0' # Mark visited in-place\n        \n        while queue:\n            r, c = queue.popleft()\n            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == '1':\n                    grid[nr][nc] = '0' # Sink land\n                    queue.append((nr, nc))\n\n    for r in range(rows):\n        for c in range(cols):\n            if grid[r][c] == '1':\n                island_count += 1\n                bfs(r, c)\n                \n    return island_count\n\n# Test:\n# grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]] -> Output: 2",
    "timeComplexity": "O(M * N) \u2014 Each cell visited at most constant number of times",
    "spaceComplexity": "O(min(M, N)) \u2014 Queue space for BFS",
    "commonMistakes": "Marking cell visited when popping from queue instead of when pushing to queue (causes duplicate entries in queue and memory limit exceeded).",
    "interviewerFollowUps": [
      "What if you are not allowed to modify the input grid? (Use a `visited = set()` of `(r, c)` pairs)."
    ],
    "bankingScenario": "Clustering isolated fraudulent merchant rings across a transaction co-occurrence graph."
  },
  {
    "id": "dsa-accounts-merge",
    "title": "Accounts Merge (Customer KYC Deduplication)",
    "category": "Graphs",
    "difficulty": "Medium",
    "pattern": "Disjoint Set Union (DSU) / Connected Components",
    "statement": "Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are emails representing emails of the account. Merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts.",
    "constraints": "1 <= accounts.length <= 1000, 2 <= accounts[i].length <= 10, name consists of English letters.",
    "intuitionHinglish": "Har email ko ek graph node samjho. Ek account ke saare emails ke beech mein edges hain. Agar do accounts mein koi ek bhi email common hai, toh wo pura graph connected component ban jata hai! Hum Disjoint Set Union (DSU) ya standard DFS se connected components group karke merge kar sakte hain.",
    "approach": "1. Map each email to account index and build DSU.\n2. Union all emails within the same account.\n3. Group emails by their DSU root representative.\n4. Sort emails and prefix with account holder name.",
    "pythonSolution": "from collections import defaultdict\n\nclass DSU:\n    def __init__(self, size):\n        self.parent = list(range(size))\n    def find(self, i):\n        if self.parent[i] == i:\n            return i\n        self.parent[i] = self.find(self.parent[i])\n        return self.parent[i]\n    def union(self, i, j):\n        root_i = self.find(i)\n        root_j = self.find(j)\n        if root_i != root_j:\n            self.parent[root_i] = root_j\n\ndef accountsMerge(accounts: list[list[str]]) -> list[list[str]]:\n    dsu = DSU(len(accounts))\n    email_to_account = {}\n    \n    for i, acc in enumerate(accounts):\n        for email in acc[1:]:\n            if email in email_to_account:\n                # Common email: merge current account i with previous account\n                dsu.union(i, email_to_account[email])\n            else:\n                email_to_account[email] = i\n                \n    # Group emails by their root account\n    merged_emails = defaultdict(set)\n    for email, acc_idx in email_to_account.items():\n        root = dsu.find(acc_idx)\n        merged_emails[root].add(email)\n        \n    res = []\n    for root_idx, emails in merged_emails.items():\n        name = accounts[root_idx][0]\n        res.append([name] + sorted(list(emails)))\n        \n    return res",
    "timeComplexity": "O(N * K * log(K)) where K is max emails per user (due to sorting output)",
    "spaceComplexity": "O(N * K) for DSU and mapping dictionary",
    "commonMistakes": "Merging based on customer name alone (two different customers can have the same name, e.g. 'John').",
    "interviewerFollowUps": [
      "How does path compression and union-by-rank optimize DSU operations to near O(1) alpha(N) time?"
    ],
    "bankingScenario": "Core Banking KYC reconciliation: deduplicating multiple savings, credit card, and Demat accounts belonging to the same PAN / Aadhaar card."
  },
  {
    "id": "dsa-coin-change",
    "title": "Coin Change (Minimum Coins for Currency Dispensation)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "Unbounded Knapsack / Bottom-Up 1D DP",
    "statement": "You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    "constraints": "1 <= coins.length <= 12, 1 <= coins[i] <= 2^31 - 1, 0 <= amount <= 10^4",
    "intuitionHinglish": "Greedy approach har currency system ke liye kaam nahi karta (jaise agar coins [1, 3, 4] hain aur target 6 hai, toh greedy 4+1+1=3 coins dega, jabki optimal 3+3=2 coins hai). Isliye Dynamic Programming: `dp[i]` = amount `i` banane ke liye minimum kitne coins chahiye. `dp[i] = min(dp[i], dp[i - coin] + 1)`.",
    "approach": "Create `dp = [float('inf')] * (amount + 1)`, set `dp[0] = 0`. For `i` from 1 to `amount`: for each `coin` in `coins`: if `i - coin >= 0`: `dp[i] = min(dp[i], dp[i - coin] + 1)`. Return `dp[amount]` if not inf else -1.",
    "pythonSolution": "def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0 # 0 coins needed for amount 0\n    \n    for i in range(1, amount + 1):\n        for coin in coins:\n            if i - coin >= 0:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n                \n    return dp[amount] if dp[amount] != float('inf') else -1\n\n# Test:\n# coins = [1, 2, 5], amount = 11 -> Output: 3 (5 + 5 + 1)",
    "timeComplexity": "O(amount * len(coins))",
    "spaceComplexity": "O(amount) \u2014 1D DP array",
    "commonMistakes": "Assuming greedy (always picking largest coin) works (only works for canonical currencies like USD/INR, fails on arbitrary coin sets).",
    "interviewerFollowUps": [
      "What if you need to count the total number of distinct ways to make change? (Coin Change 2: loop coins outer, amount inner)."
    ],
    "bankingScenario": "ATM cash cassette dispensation: finding the optimal note combination to minimize physical cash dispense count."
  },
  {
    "id": "dsa-house-robber",
    "title": "House Robber (Non-Adjacent Maximum)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "Pick vs Skip State Machine DP",
    "statement": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected. Return the maximum amount of money you can rob tonight without alerting the police.",
    "constraints": "1 <= nums.length <= 100, 0 <= nums[i] <= 400",
    "intuitionHinglish": "Har ghar par sirf do choices hain: 1) Rob karo (toh pichle ghar ko skip karna padega, `nums[i] + prev2`), ya 2) Skip karo (toh pichle ghar tak ka best loot carry forward hoga, `prev1`). Dono ka maximum le lo!",
    "approach": "Space optimized: Maintain `prev1 = 0, prev2 = 0`. For num in nums: `temp = max(num + prev2, prev1); prev2 = prev1; prev1 = temp`. Return prev1.",
    "pythonSolution": "def rob(nums: list[int]) -> int:\n    prev2 = 0 # Max loot up to house i-2\n    prev1 = 0 # Max loot up to house i-1\n    \n    for num in nums:\n        current = max(num + prev2, prev1)\n        prev2 = prev1\n        prev1 = current\n        \n    return prev1",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Only 2 scalar variables",
    "commonMistakes": "Using full O(N) array when only previous two states are needed.",
    "interviewerFollowUps": [
      "What if houses are in a circle? (House Robber II: run for nums[1:] and nums[:-1] and take maximum)."
    ],
    "bankingScenario": "Selecting non-adjacent credit card transaction promotions to maximize customer cashback rewards without violating anti-stacking policies."
  },
  {
    "id": "dsa-longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence (LIS)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "Patience Sorting with Binary Search",
    "statement": "Given an integer array `nums`, return the length of the longest strictly increasing subsequence in O(n log n) time.",
    "constraints": "1 <= nums.length <= 2500, -10^4 <= nums[i] <= 10^4",
    "intuitionHinglish": "O(N^2) DP bohot aasan hai, lekin interview mein O(N log N) maangte hain! Patience Sorting trick: Ek array `tails` maintain karo. Har number ke liye dekho ki kya wo `tails` ke kisi element ko replace kar sakta hai (`bisect_left`). Agar wo sabse bada hai toh `tails` ke end me append ho jayega. Length of `tails` hi answer hai!",
    "approach": "1. Maintain list `tails = []`. 2. For `x` in `nums`: use `idx = bisect.bisect_left(tails, x)`. If `idx == len(tails)`, append `x`. Else replace `tails[idx] = x`. 3. Return `len(tails)`.",
    "pythonSolution": "import bisect\n\ndef lengthOfLIS(nums: list[int]) -> int:\n    tails = []\n    \n    for x in nums:\n        idx = bisect.bisect_left(tails, x)\n        if idx == len(tails):\n            tails.append(x)\n        else:\n            tails[idx] = x\n            \n    return len(tails)\n\n# Test:\n# nums = [10, 9, 2, 5, 3, 7, 101, 18] -> Output: 4 ([2, 3, 7, 101])",
    "timeComplexity": "O(N log N) \u2014 Binary search for each of the N numbers",
    "spaceComplexity": "O(N) \u2014 `tails` array stores at most N elements",
    "commonMistakes": "Using `bisect_right` instead of `bisect_left` (allows duplicate non-decreasing sequences instead of strictly increasing).",
    "interviewerFollowUps": [
      "How would you reconstruct the actual elements of the LIS? (Track predecessor indices)."
    ],
    "bankingScenario": "Identifying longest sequential upgrade streaks in customer credit risk scores across successive quarterly reviews."
  },
  {
    "id": "dsa-word-break",
    "title": "Word Break (Transaction Narration Tokenizer)",
    "category": "Dynamic Programming",
    "difficulty": "Medium",
    "pattern": "1D Bottom-Up Boolean DP",
    "statement": "Given a string `s` and a dictionary of strings `wordDict`, return true if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    "constraints": "1 <= s.length <= 300, 1 <= wordDict.length <= 1000, 1 <= wordDict[i].length <= 20",
    "intuitionHinglish": "`dp[i]` = kya `s[0...i]` tak ki substring dictionary words mein successfully segment ho sakti hai? Agar koi `j < i` aisa hai jaha `dp[j] == True` aur `s[j...i]` dictionary mein exist karta hai, toh `dp[i] = True`!",
    "approach": "Create `dp = [False] * (len(s) + 1)`, `dp[0] = True`. Convert `wordDict` to set. For `i` from 1 to `len(s)`: for `j` from 0 to `i`: if `dp[j] and s[j:i] in word_set`: `dp[i] = True; break`. Return `dp[len(s)]`.",
    "pythonSolution": "def wordBreak(s: str, wordDict: list[str]) -> bool:\n    word_set = set(wordDict)\n    n = len(s)\n    dp = [False] * (n + 1)\n    dp[0] = True # Base case: empty string\n    \n    for i in range(1, n + 1):\n        for j in range(i):\n            if dp[j] and s[j:i] in word_set:\n                dp[i] = True\n                break\n                \n    return dp[n]\n\n# Test:\n# s = \"leetcode\", wordDict = [\"leet\",\"code\"] -> Output: True\n# s = \"applepenapple\", wordDict = [\"apple\",\"pen\"] -> Output: True",
    "timeComplexity": "O(N^2 * K) where N is string length and K is substring hashing/slice",
    "spaceComplexity": "O(N) \u2014 Boolean DP table",
    "commonMistakes": "Using pure recursive backtracking without memoization (causes exponential O(2^N) timeout on testcases like 'aaaaaaaab').",
    "interviewerFollowUps": [
      "What if you need to return all possible segmented sentences? (Word Break II with Backtracking + Memoization)."
    ],
    "bankingScenario": "Tokenizing unformatted credit card transaction narrations (e.g. 'AMZNMKTPIN') into canonical merchant category codes."
  },
  {
    "id": "dsa-subsets",
    "title": "Subsets (Power Set Generation)",
    "category": "Backtracking",
    "difficulty": "Medium",
    "pattern": "Backtracking / Cascading / Bit Manipulation",
    "statement": "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    "constraints": "1 <= nums.length <= 10, -10 <= nums[i] <= 10, all elements are unique",
    "intuitionHinglish": "Har index par hamare paas do hi options hote hain: ya toh us number ko subset mein include karo, ya fir exclude karo. Recursion se hum dono decisions explore karte hain aur leaf nodes par full subset capture ho jata hai.",
    "approach": "Use recursive backtracking with `start_index` and `current_subset`. At each recursive step, append a copy of `current_subset` to results. Loop from `start` to `len(nums)`: include `nums[i]`, recurse with `i + 1`, then pop to backtrack.",
    "pythonSolution": "def subsets(nums: list[int]) -> list[list[int]]:\n    result = []\n    \n    def backtrack(start_index: int, current_path: list[int]):\n        result.append(list(current_path))\n        \n        for i in range(start_index, len(nums)):\n            current_path.append(nums[i])\n            backtrack(i + 1, current_path)\n            current_path.pop()\n            \n    backtrack(0, [])\n    return result",
    "timeComplexity": "O(N * 2^N) \u2014 2^N subsets, each takes up to O(N) to copy",
    "spaceComplexity": "O(N) recursion stack",
    "commonMistakes": "Appending `current_path` directly (`result.append(current_path)`) instead of making a copy (`list(current_path)`), causing all results to reference the same mutated list.",
    "interviewerFollowUps": [
      "What if input contains duplicates? (Subsets II: sort first and skip duplicates `if i > start and nums[i] == nums[i-1]: continue`)."
    ],
    "bankingScenario": "Generating combinations of banking regulatory compliance rules to test edge case combinations in sandbox environments."
  },
  {
    "id": "dsa-combination-sum",
    "title": "Combination Sum (ATM Dispense Combinations)",
    "category": "Backtracking",
    "difficulty": "Medium",
    "pattern": "Backtracking with Unbounded Element Reuse",
    "statement": "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`. You may return the combinations in any order. The same number may be chosen from `candidates` an unlimited number of times.",
    "constraints": "1 <= candidates.length <= 30, 2 <= candidates[i] <= 40, 1 <= target <= 40",
    "intuitionHinglish": "Decision tree socho: Har step par hum current candidate ko pick kar sakte hain (kyunki reuse allowed hai, hum same index par re-recurse karte hain), ya skip karke agle index par ja sakte hain. Agar `remaining_sum == 0`, valid combination mil gaya! Agar `remaining_sum < 0`, backtrack kar jao.",
    "approach": "Sort candidates for early pruning. Define `backtrack(start, current_path, remaining)`: if remaining == 0: append copy. For i from start to n: if `candidates[i] > remaining`: break (pruning). Append `candidates[i]`, recurse with `start=i`, then pop.",
    "pythonSolution": "def combinationSum(candidates: list[int], target: int) -> list[list[int]]:\n    candidates.sort() # Enables early pruning\n    result = []\n    \n    def backtrack(start_idx: int, path: list[int], remaining: int):\n        if remaining == 0:\n            result.append(list(path))\n            return\n            \n        for i in range(start_idx, len(candidates)):\n            # Prune search branch if candidate exceeds remaining target\n            if candidates[i] > remaining:\n                break\n                \n            path.append(candidates[i])\n            # Reuse of same candidate allowed, so pass i as next start_idx\n            backtrack(i, path, remaining - candidates[i])\n            path.pop()\n            \n    backtrack(0, [], target)\n    return result\n\n# Test:\n# candidates = [2,3,6,7], target = 7 -> Output: [[2,2,3],[7]]",
    "timeComplexity": "O(N^(target/min_candidate)) in worst case exponential decision tree",
    "spaceComplexity": "O(target / min_candidate) recursion stack depth",
    "commonMistakes": "Passing `i + 1` instead of `i` when element reuse is permitted.",
    "interviewerFollowUps": [
      "What if each candidate can only be used once? (Combination Sum II)."
    ],
    "bankingScenario": "Generating valid currency note dispensation profiles for ATM cash cassette controllers."
  },
  {
    "id": "dsa-single-number",
    "title": "Single Number (Unpaired Transaction Identification)",
    "category": "Bit Manipulation",
    "difficulty": "Easy",
    "pattern": "XOR Cancellation Property",
    "statement": "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. You must implement a solution with a linear runtime complexity and use only constant extra space.",
    "constraints": "1 <= nums.length <= 3 * 10^4, -3 * 10^4 <= nums[i] <= 3 * 10^4",
    "intuitionHinglish": "XOR operator ki do properties hoti hain: 1) `a ^ a = 0` (same numbers ek dusre ko cancel out kar dete hain), 2) `a ^ 0 = a`. Agar hum array ke saare numbers ko aapas mein XOR kar dein, toh saare duplicate pairs 0 ban kar cancel ho jayenge aur sirf akela single number bachega!",
    "approach": "Initialize `res = 0`. For num in nums: `res ^= num`. Return `res`.",
    "pythonSolution": "def singleNumber(nums: list[int]) -> int:\n    res = 0\n    for num in nums:\n        res ^= num\n    return res\n\n# Test:\n# nums = [4, 1, 2, 1, 2] -> Output: 4 (1^1=0, 2^2=0, 0^4=4)",
    "timeComplexity": "O(N) \u2014 Single pass",
    "spaceComplexity": "O(1) \u2014 Only 1 accumulator variable",
    "commonMistakes": "Using Hash Map or Set (works in O(N) time but violates the strict O(1) space constraint).",
    "interviewerFollowUps": [
      "What if every number appears three times except one? (Single Number II: bit count mod 3 or bitwise state machines)."
    ],
    "bankingScenario": "Detecting an unmatched double-entry bookkeeping leg where an offsetting credit or debit was dropped in network transit."
  },
  {
    "id": "dsa-number-of-1-bits",
    "title": "Number of 1 Bits (Hamming Weight)",
    "category": "Bit Manipulation",
    "difficulty": "Easy",
    "pattern": "Brian Kernighan's Bit Trick `n & (n - 1)`",
    "statement": "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    "constraints": "1 <= n <= 2^31 - 1",
    "intuitionHinglish": "Brian Kernighan's Algorithm: Operation `n & (n - 1)` hamesha number ke sabse rightmost set bit (least significant 1-bit) ko 0 bana deta hai! Isliye loop utni hi baar chalega jitne usme 1-bits hain, bina saare 32 bits check kiye.",
    "approach": "Maintain `count = 0`. While `n > 0`: `n = n & (n - 1); count += 1`. Return `count`.",
    "pythonSolution": "def hammingWeight(n: int) -> int:\n    count = 0\n    while n > 0:\n        # Clears the least significant set bit\n        n = n & (n - 1)\n        count += 1\n    return count\n\n# Test:\n# n = 11 (binary 1011) -> Output: 3",
    "timeComplexity": "O(K) where K is number of set bits (at most 32 operations)",
    "spaceComplexity": "O(1) \u2014 Constant memory",
    "commonMistakes": "Looping 32 times with `n >> 1` when Kernighan's trick finishes in only K iterations.",
    "interviewerFollowUps": [
      "How does CPU hardware implement this instruction natively? (`POPCNT` instruction)."
    ],
    "bankingScenario": "Fast parity bit verification for hardware cryptographic security modules (HSM) verifying PIN blocks."
  }
];


export const DSA_CATEGORIES = [
  "All",
  "Arrays",
  "Two Pointers",
  "Sliding Window",
  "Hashing",
  "Stack",
  "Linked List",
  "Binary Search",
  "Trees",
  "Heaps / Priority Queue",
  "Design / Queues",
  "Graphs",
  "Dynamic Programming",
  "Backtracking",
  "Bit Manipulation"
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
