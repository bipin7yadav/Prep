# IDFC FIRST Bank High-Yield Interview Question Bank
### Curated for Developer (3+ Years Experience) | Strategic Projects, Bengaluru

---

## 📂 Category 1: Python & Algorithmic Problem Solving (DSA)

### Q1.1: Invert a Binary Tree & Level-Order Traversal (BFS)
- **Topic:** Trees & Queues | **Difficulty:** Easy-Medium
- **Expected Answer Depth:** Explain why BFS uses `collections.deque` rather than a standard list to maintain O(V) time.
- **Model Answer:**
  "We traverse level-by-level using a FIFO queue. At each level, we measure `queue.length`, iterate through all nodes at the current depth, swap their left and right child pointers, and enqueue non-null children. Because `collections.deque.popleft()` operates in O(1) time compared to Python list's O(N) memory shift, total time complexity is strictly O(N) with O(W) auxiliary space, where W is the maximum tree width."
- **Follow-up:** *"What is the maximum width of a full binary tree with N nodes?"* (Answer: ≈ N/2 at the leaf level).

### Q1.2: Longest Substring with At Most K Distinct Characters
- **Topic:** Sliding Window & Hash Map | **Difficulty:** Medium
- **Expected Answer Depth:** Dynamic sliding window with hash map tracking character frequencies.
- **Model Answer:**
  "We expand a right pointer, adding each character to a frequency map. When `len(map) > k`, we increment the left pointer, decrementing frequencies and deleting keys when they hit 0, until the map contains ≤ k keys. We update `max_len = max(max_len, right - left + 1)`. Time complexity is O(N) amortized because each character enters and leaves the window at most once."
- **Follow-up:** *"What if the alphabet size is bounded to 256 ASCII characters? What is the space complexity?"* (Answer: O(1) bounded by 256).

---

## 📂 Category 2: Node.js & Express Production Backend

### Q2.1: The Microtask vs Macrotask Event Loop Execution Order
- **Topic:** Event Loop & libuv | **Difficulty:** Medium
- **Expected Answer Depth:** Explain why `process.nextTick` executes before `Promise.then`, and why `setImmediate` runs before `setTimeout(0)` inside an I/O callback.
- **Model Answer:**
  "In Node.js, `process.nextTick()` belongs to the process microtask queue, which has higher priority than the V8 Promise microtask queue. Both microtask queues are drained immediately when the active C++ call stack empties, before the libuv event loop moves to the next macrotask phase.
  Inside an I/O callback (such as `fs.readFile`), the event loop is in the **Poll phase**. When the callback finishes, the loop advances directly to the **Check phase**, where `setImmediate` callbacks reside, before looping around to the **Timers phase** (`setTimeout`). Therefore, `setImmediate` is guaranteed to execute before `setTimeout` in an I/O context."
- **Follow-up:** *"What happens if you have an unhandled promise rejection in Node.js 18+?"* (Answer: In Node.js 15+, unhandled rejections terminate the process with a non-zero exit code).

### Q2.2: Memory Leaks in Long-Running Node.js Processes
- **Topic:** V8 Garbage Collection & Profiling | **Difficulty:** Hard
- **Expected Answer Depth:** Identify closure leaks, uncleared intervals, and global event listener accumulation. Explain how to debug with heap snapshots.
- **Model Answer:**
  "Common causes of memory leaks in Node.js include:
  1. **Accumulating Event Listeners:** Failing to remove event listeners (`emitter.on`) creates retained references.
  2. **Stale Closures:** Long-lived closures retaining large outer scopes.
  3. **Global Caches Without TTL:** In-memory objects acting as unbounded caches.
  
  **Diagnosis:** We generate heap snapshots using `v8.writeHeapSnapshot()` or the Chrome DevTools inspector protocol under load. In DevTools, we use the **Summary** and **Comparison** views to detect classes with growing `Retained Size` and inspect their retainers tree to identify the reference path preventing Garbage Collection."
- **Follow-up:** *"How does the V8 Scavenger (Young Generation) differ from Mark-Sweep-Compact (Old Generation)?"*

---

## 📂 Category 3: SQL & Database Management (DBMS)

### Q3.1: Preventing Double-Spending & Race Conditions on Balance Deduction
- **Topic:** Concurrency & Locking | **Difficulty:** Hard
- **Expected Answer Depth:** Compare Pessimistic locking (`SELECT ... FOR UPDATE`) vs Optimistic locking with a version column vs atomic decrement.
- **Model Answer:**
  "To prevent race conditions during concurrent balance deductions:
  1. **Atomic Decrement:** `UPDATE accounts SET balance = balance - :amt WHERE account_id = :id AND balance >= :amt;`. If rows affected is 0, the balance was insufficient.
  2. **Pessimistic Locking:** `BEGIN; SELECT balance FROM accounts WHERE account_id = :id FOR UPDATE;`. This acquires an exclusive row lock, forcing concurrent transactions to block until commit.
  3. **Optimistic Locking:** Read `balance` and `version`. Update using `WHERE account_id = :id AND version = :v`. If rows affected is 0, retry with exponential backoff.
  
  In banking, Pessimistic locking is standard for individual accounts experiencing high debit contention to avoid high abort rates."
- **Follow-up:** *"How do you prevent deadlocks when transferring funds between two accounts simultaneously?"* (Answer: Enforce deterministic lock ordering by sorting account IDs).

### Q3.2: Clustered vs Secondary Indexes and B+ Tree Depth
- **Topic:** Indexing Internals | **Difficulty:** Medium-Hard
- **Expected Answer Depth:** Explain why B+ Trees are preferred over B-Trees for disk storage, and describe the structure of leaf nodes.
- **Model Answer:**
  "In a **Clustered Index** (the Primary Key in MySQL InnoDB), the physical table rows are stored directly in the leaf pages of the B+ Tree. In a **Secondary Index**, leaf nodes store the indexed column values plus the clustered primary key pointer, requiring a secondary **bookmark lookup** to fetch non-indexed columns.
  
  B+ Trees store data records *strictly in the leaf nodes*; internal nodes only store navigation keys and child pointers. This maximizes the **fan-out factor** (branching factor), allowing a 3-to-4 level B+ Tree to index hundreds of millions of records with minimal disk seeks. Furthermore, leaf nodes are doubly linked, making range scans (`BETWEEN x AND y`) extremely fast."
- **Follow-up:** *"What is a Covering Index?"* (Answer: An index that contains all columns requested by the `SELECT` query, eliminating the secondary bookmark lookup entirely).

---

## 📂 Category 4: System Design & Banking Engineering

### Q4.1: Designing an Idempotent Payment Switch
- **Topic:** Distributed Systems & Payment Rails | **Difficulty:** Hard
- **Expected Answer Depth:** End-to-end architecture with Redis locks, database uniqueness constraints, and response replay.
- **Model Answer:**
  "1. The client generates a unique UUIDv4 `X-Idempotency-Key` header with the payment request.
  2. The API Gateway queries Redis: `SET idempotency:<key> 'PROCESSING' NX EX 86400`.
  3. If Redis returns false, the request is duplicate. If status is `PROCESSING`, return HTTP 409 Conflict. If `COMPLETED`, return the cached response payload immediately without hitting downstream banking switches.
  4. If acquired, execute the payment orchestrator saga.
  5. Save the final result in PostgreSQL with a `UNIQUE(idempotency_key)` constraint.
  6. Update Redis with the final response payload and return HTTP 200/201 to the client."
- **Follow-up:** *"What if Redis crashes before the payment finishes?"* (Answer: The PostgreSQL database table's unique constraint acts as the durable secondary fallback guard).

### Q4.2: Designing a High-Priority OTP SMS & Push Delivery Engine
- **Topic:** Queues & SLAs | **Difficulty:** Medium-Hard
- **Expected Answer Depth:** Sub-3-second delivery, multi-vendor telco failover, dead-letter queues.
- **Model Answer:**
  "Banking OTPs require < 3s SLA. We use an API gateway fronting **Kafka or Redis Streams** with separate priority queues (`otp-high-priority` vs `promotional-low-priority`).
  Worker services integrate with at least 3 distinct SMS aggregators (e.g., Twilio, Infobip, Karix).
  A circuit breaker tracks delivery latency per aggregator. If Vendor A's latency spikes above 1.5s, traffic automatically diverts to Vendor B.
  If an SMS fails permanently, workers dispatch a fallback WhatsApp or Voice OTP."
- **Follow-up:** *"How do you prevent OTP brute-force attacks?"* (Answer: Distributed rate limiting in Redis: max 3 attempts per OTP token, max 5 OTP requests per phone number per hour).

---

## 📂 Category 5: Application Security & FinTech Compliance

### Q5.1: PCI-DSS Compliance & Card Data Tokenization
- **Topic:** Payment Security | **Difficulty:** Medium
- **Expected Answer Depth:** Explain tokenization and explain why CVV cannot be saved.
- **Model Answer:**
  "Under PCI-DSS Level 1:
  1. Card Verification Values (CVV/CVC) must **never be stored** after authorization under any circumstances, even if encrypted.
  2. Primary Account Numbers (PANs) cannot be stored in plain text. They must be tokenized via card network vaults (Visa Token Service / Mastercard MDES) or encrypted using AES-256-GCM.
  3. When displayed to users or customer support agents, PANs must be masked (showing only first 6 and last 4 digits).
  4. All communication across the internal network must enforce TLS 1.3 with strong cipher suites."
- **Follow-up:** *"What is the RBI Tokenization mandate for Indian e-commerce merchants?"* (Answer: Merchants cannot store actual card numbers on file; they must use RBI-compliant device-based or network-based tokens).

---

## 📂 Category 6: Behavioral & Leadership (STAR Method for 3+ YoE)

### Q6.1: Handling a Critical Production Outage in a Live Payment Gateway
- **Format:** Situation → Task → Action → Result
- **Expected Depth:** Systematic triage, blameless post-mortem, prevention of recurring faults.
- **Model Answer:**
  - **Situation:** During a month-end salary credit surge, our core payment routing service experienced a sudden spike in 504 gateway timeouts; p99 latency jumped from 200ms to 8 seconds.
  - **Task:** As the on-call engineer, I had to restore payment routing immediately and diagnose the root cause without corrupting financial ledgers.
  - **Action:**
    1. Checked Grafana dashboard and saw database connection pool exhaustion.
    2. Checked active database queries via `pg_stat_activity` and discovered a reporting query holding exclusive table locks on the accounts table.
    3. Safely terminated the rogue query PID (`pg_terminate_backend`), immediately recovering API latencies.
    4. Diverted all read-heavy reporting queries to a dedicated read replica.
  - **Result:** Fully recovered system within 8 minutes with zero financial loss. Conducted a blameless post-mortem and added automated query timeout limits (`statement_timeout = 3000ms`) to prevent long locks from ever recurring.

---

## 📂 Category 7: Questions to Ask the IDFC FIRST Bank Interviewer
*High-caliber engineering questions that demonstrate technical maturity:*
1. *"How does the Strategic Projects division manage database sharding and cross-region disaster recovery for your core transaction switches?"*
2. *"What is your current migration strategy between synchronous REST orchestration and event-driven architectures using Apache Kafka?"*
3. *"How does IDFC FIRST Bank maintain sub-second UPI switch latencies during massive festival traffic spikes?"*
