# Daily Preparation Plan (2–3 Hours / Day)
### Adaptive Engineering Study Schedule for IDFC FIRST Bank Developer

> [!TIP]
> **Adaptive Feedback Loop:** Every time you finish a day or complete an exercise, tell me:
> 1. What you completed
> 2. What concept was confusing or where your solution failed
> 3. Your self-assessed confidence (1–10)
> 
> I will dynamically modify subsequent days: injecting targeted revisions if a concept is shaky, or advancing to senior-level architectural challenges if you master it quickly.

---

## 🗓️ Week 1: Foundations, Python for Problem Solving & Core SQL

### Day 1: Asymptotic Complexity Analysis & Banking SQL Setup
* **Goal:** Master exact Big-O calculation (worst/average/amortized) and set up the local banking database.
* **Estimated Time:** 2 hrs 30 min
  - Theory & Reading: 45 min
  - Hands-on SQL Setup: 40 min
  - Problem Solving: 35 min
  - Daily Quiz & Self-Audit: 20 min
* **Reading Material:**
  - Read [00-FOUNDATION/complexity-analysis.md](file:///home/bipin/Desktop/BankInterview/00-FOUNDATION/complexity-analysis.md)
  - Review [05-SQL-DBMS/schema.sql](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/schema.sql)
* **Hands-on Exercise:**
  - Execute `sqlite3 banking.db < 05-SQL-DBMS/schema.sql` in your terminal to create and seed the practice banking database.
  - Verify tables: `customers`, `accounts`, `transactions`, `beneficiaries`, `cards`, `loans`, `payments`.
* **Coding Problems:**
  1. Determine the exact time and auxiliary space complexity of 5 given code snippets in [00-FOUNDATION/complexity-analysis.md](file:///home/bipin/Desktop/BankInterview/00-FOUNDATION/complexity-analysis.md#practical-exercise).
  2. Explain why dynamic array resizing (`list.append` in Python or `Array.push` in JS) is O(1) amortized but O(N) worst case.
* **SQL Practice:**
  1. Write a query to list all active `SAVINGS` accounts with balances exceeding ₹50,000, joined with customer name and phone number.
  2. Calculate total deposit volume vs withdrawal volume across the entire bank for the last 30 days.
* **Interview Question of the Day:**
  - *"How does the V8 engine allocate memory when an array dynamically grows, and how does this differ from Python list growth?"*
* **Expected Outcome:** You can immediately analyze nested loops, recursion trees, and dynamic arrays without guesswork, and your local banking database is seeded and querying.

---

### Day 2: Array & Hashing Patterns in Python
* **Goal:** Master frequency hashing, dictionary internals, and two-sum style lookups in Python.
* **Estimated Time:** 2 hrs 30 min
  - Python Built-ins & Theory: 40 min
  - Algorithmic Problem Solving: 50 min
  - Banking SQL Practice: 35 min
  - Revision & Active Recall: 15 min
* **Reading Material:**
  - [01-PYTHON/python-fundamentals.md](file:///home/bipin/Desktop/BankInterview/01-PYTHON/python-fundamentals.md)
  - [02-DSA/arrays.md](file:///home/bipin/Desktop/BankInterview/02-DSA/arrays.md) & [02-DSA/hashing.md](file:///home/bipin/Desktop/BankInterview/02-DSA/hashing.md)
* **Coding Problems (Implement in clean Python):**
  1. **Two Sum:** Given transaction amounts, find two that sum to a target settlement amount (O(N) time, O(N) space).
  2. **Group Anagrams / Account Beneficiary Deduplication:** Group accounts by normalized name tokens using hash maps.
  3. **Longest Consecutive Sequence:** Find the longest consecutive sequence in an unsorted array in O(N) time using a hash set.
* **SQL Practice:**
  1. Find customers who have more than one account in the same branch.
  2. Detect potential duplicate transactions: same `from_account_id`, `to_account_id`, and `amount` within a 5-minute window.
* **Interview Question of the Day:**
  - *"How does Python handle hash collisions in dicts (open addressing vs chaining), and what is the worst-case lookup complexity?"*
* **Expected Outcome:** Fast, idiomatically clean Python implementations of hashing patterns with zero syntax hesitation.

---

### Day 3: Advanced SQL Joins, Subqueries & Filtering
* **Goal:** Master multi-table joins, correlated subqueries, and `EXISTS` vs `IN` performance on banking data.
* **Estimated Time:** 2 hrs 30 min
  - SQL Theory & Plan Analysis: 45 min
  - Hands-on SQL Queries: 55 min
  - DSA Revision (Hashing): 30 min
  - Model Answer Practice: 20 min
* **Reading Material:**
  - [05-SQL-DBMS/joins.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/joins.md)
  - [05-SQL-DBMS/subqueries.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/subqueries.md)
* **SQL Practice:**
  1. **Unlinked Accounts:** Find all customers who have registered accounts but have never performed a transaction (LEFT JOIN with `NULL` check vs `NOT EXISTS`).
  2. **High-Value Spenders:** Find customers whose average transaction amount is strictly greater than the overall bank-wide average transaction amount (Correlated Subquery).
  3. **Self-Join Beneficiary Audit:** Query all transactions where the sender and receiver belong to the same parent customer.
* **Coding Problem:**
  - **Subarray Sum Equals K:** Find total number of continuous subarrays whose sum equals K using prefix sum + hash map.
* **Interview Question of the Day:**
  - *"Why is `SELECT ... WHERE EXISTS (SELECT 1 ...)` typically faster than `IN` when dealing with nullable foreign key columns?"*
* **Expected Outcome:** You can explain join execution algorithms (Hash Join, Merge Join, Nested Loop Join) and optimize subqueries effortlessly.

---

### Day 4: Two Pointers & Sliding Window Patterns
* **Goal:** Master array traversal with two pointers and variable/fixed sliding windows.
* **Estimated Time:** 2 hrs 30 min
  - Pattern Theory: 35 min
  - Algorithmic Problem Solving: 65 min
  - SQL Practice: 30 min
  - Flashcard Revision: 20 min
* **Reading Material:**
  - [02-DSA/two-pointers.md](file:///home/bipin/Desktop/BankInterview/02-DSA/two-pointers.md)
  - [02-DSA/sliding-window.md](file:///home/bipin/Desktop/BankInterview/02-DSA/sliding-window.md)
* **Coding Problems:**
  1. **Three Sum:** Find all unique triplets that sum to 0 without duplicates (O(N²) time, O(1) extra space).
  2. **Container With Most Water:** Two pointers moving inwards greedily.
  3. **Longest Substring Without Repeating Characters:** Dynamic sliding window with hash map.
  4. **Minimum Size Subarray Sum:** Dynamic window finding minimal length ≥ target sum.
* **SQL Practice:**
  1. Identify accounts that had transactions on 3 consecutive days.
* **Interview Question of the Day:**
  - *"When does a sliding window require a shrink phase, and how do you guarantee O(N) amortized time even with a nested `while` loop?"*
* **Expected Outcome:** Instinctive recognition of when to apply two pointers (sorted input, palindromes, shrinking windows).

---

### Day 5: Node.js Architecture, Event Loop & libuv Internals
* **Goal:** Elevate your Node.js expertise to the level of a core architect who can whiteboard libuv internals.
* **Estimated Time:** 2 hrs 45 min
  - Internals Theory: 50 min
  - Code Tracing & Debugging: 45 min
  - Interview Practice: 40 min
  - DSA Spaced Repetition: 30 min
* **Reading Material:**
  - [04-NODE-EXPRESS/event-loop.md](file:///home/bipin/Desktop/BankInterview/04-NODE-EXPRESS/event-loop.md)
  - [03-JAVASCRIPT/event-loop.md](file:///home/bipin/Desktop/BankInterview/03-JAVASCRIPT/event-loop.md)
* **Practical Exercise:**
  - Write an experiment script with `setTimeout(0)`, `setImmediate`, `process.nextTick`, `Promise.resolve`, and `fs.readFile` callback to predict and verify the exact execution order.
* **Interview Questions of the Day:**
  1. *"What is the exact difference between `process.nextTick()` and `setImmediate()`? In what phase does each execute?"*
  2. *"Node.js is called single-threaded, yet `crypto.pbkdf2` and `fs.readFile` run concurrently. Where and how do they execute?"*
  3. *"How does event loop lag impact a banking microservice's 99th percentile response latency, and how do you monitor it?"*
* **Expected Outcome:** Unshakeable confidence explaining V8, libuv, thread pool size (`UV_THREADPOOL_SIZE`), and microtask prioritization.

---

### Day 6: SQL Window Functions & Common Table Expressions (CTEs)
* **Goal:** Master senior SQL features essential for banking statements, running balances, and fraud detection.
* **Estimated Time:** 2 hrs 30 min
  - Window Function Theory: 40 min
  - Complex SQL Problem Solving: 60 min
  - DSA Coding: 30 min
  - Summary & Review: 20 min
* **Reading Material:**
  - [05-SQL-DBMS/window-functions.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/window-functions.md)
  - [05-SQL-DBMS/cte.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/cte.md)
* **SQL Practice (Run on `banking.db`):**
  1. **Running Account Balance:** Calculate cumulative running balance for each account ordered by transaction timestamp.
  2. **Top 3 Transactions per Customer:** Using `DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY amount DESC)`.
  3. **Month-over-Month Transaction Growth:** Using `LAG()` to calculate percentage volume change per account.
  4. **Fraud Velocity Detection:** Find all accounts that performed ≥ 3 transactions of ≥ ₹10,000 within any 1-hour window.
* **Coding Problem:**
  - **Trapping Rain Water:** Hard two-pointer / monotonic stack problem with banking liquidity analogy.
* **Expected Outcome:** Fluent mastery of window frames (`ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`) and CTE organization.

---

### Day 7: ACID Transactions, Concurrency & Locking + Week 1 Mock
* **Goal:** Understand exactly how database engines prevent money from disappearing during concurrent transfers.
* **Estimated Time:** 3 hrs 00 min
  - Concurrency & ACID Theory: 50 min
  - Hands-on Concurrency Simulation: 40 min
  - Week 1 Comprehensive Mock Interview: 60 min
  - Plan Recalibration: 30 min
* **Reading Material:**
  - [05-SQL-DBMS/acid.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/acid.md)
  - [05-SQL-DBMS/locking.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/locking.md)
  - [05-SQL-DBMS/isolation-levels.md](file:///home/bipin/Desktop/BankInterview/05-SQL-DBMS/isolation-levels.md)
* **Hands-on Simulation:**
  - Write a Node.js script that attempts 10 concurrent debit requests of ₹500 on an account with a balance of ₹1,000.
  - Observe the race condition without locking.
  - Fix it using PostgreSQL/SQLite transactions with `SELECT ... FOR UPDATE` (Pessimistic locking) and version-based update (Optimistic locking).
* **Week 1 Assessment & Mock:**
  - Trigger `Start mock interview` in chat for a 30-minute evaluation covering Week 1 topics.

---

## 🗓️ Week 2 Preview: Monotonic Stacks, Binary Search & Node.js Streams
* **Day 8:** Monotonic Stacks & Queues (`Next Greater Element`, `Daily Temperatures`).
* **Day 9:** Node.js Streams, Buffers & Backpressure Handling (Uploading large financial audit logs).
* **Day 10:** Binary Search on Arrays & Search Space Reduction (`Search in Rotated Sorted Array`).
* **Day 11:** Database Indexing Internals: B+ Trees, Clustered vs Secondary Indexes, Composite Index Leftmost Prefix Rule.
* **Day 12:** Linked Lists & LRU Cache Implementation (Python & Node.js).
* **Day 13:** Express Architecture: Middleware Pipelines, Centralized Error Handling & Validation.
* **Day 14:** Phase 1 Comprehensive Review, Weak Spot Elimination & Coding Mock.
