# Active Recall Flashcards for IDFC FIRST Bank Interview

---

## 💳 Banking & FinTech Flashcards

### Flashcard B1
* **Q:** What is the core rule of double-entry bookkeeping?
* **A:** Every transaction must record at least one Debit and one Credit such that:
  $$\sum \text{Debits} = \sum \text{Credits}$$
  The net financial sum of any balanced transaction entry is strictly zero.

---

### Flashcard B2
* **Q:** What is an Idempotency Key in a payment API?
* **A:** A unique client-generated token (typically UUIDv4) transmitted in headers (`X-Idempotency-Key`). It guarantees that duplicate retries of an identical request will execute the underlying business logic and financial debit exactly once, returning the cached outcome on subsequent calls.

---

### Flashcard B3
* **Q:** What are the 4 main payment rails in India?
* **A:**
  1. **UPI:** Instant real-time gross settlement 24/7/365, VPA-based, capped at ₹1-5 Lakh.
  2. **IMPS:** Instant 24/7 account-based settlement, capped at ₹5 Lakh.
  3. **NEFT:** Deferred Net Settlement in 30-minute batches 24/7, no upper limit.
  4. **RTGS:** Real-Time Gross Settlement for high-value transactions (minimum ₹2 Lakh).

---

### Flashcard B4
* **Q:** What does PCI-DSS strictly forbid regarding card security?
* **A:** Never store Sensitive Authentication Data (SAD) after authorization—specifically the 3-digit **CVV/CVC** or raw card PIN, even if encrypted.

---

## 🗄️ SQL & DBMS Flashcards

### Flashcard S1
* **Q:** What does ACID stand for?
* **A:**
  - **Atomicity:** All statements commit or all rollback (WAL undo logs).
  - **Consistency:** All integrity constraints and invariants remain valid.
  - **Isolation:** Concurrent transactions execute without mutual interference (2PL/MVCC).
  - **Durability:** Committed transactions survive system crashes (WAL `fsync`).

---

### Flashcard S2
* **Q:** What is the difference between `RANK()` and `DENSE_RANK()`?
* **A:** In ties:
  - `RANK()` assigns identical ranks and skips subsequent values ($1, 2, 2, 4$).
  - `DENSE_RANK()` assigns identical ranks and does NOT skip subsequent values ($1, 2, 2, 3$).

---

### Flashcard S3
* **Q:** What is a Write-Ahead Log (WAL)?
* **A:** An append-only disk log where transaction changes must be recorded and flushed via sequential `fsync()` *before* any actual data pages are modified on disk storage.

---

### Flashcard S4
* **Q:** Why is `NOT IN` dangerous when subquery results contain `NULL`?
* **A:** Due to SQL's three-valued logic, `x != NULL` evaluates to `UNKNOWN`. If any subquery row is `NULL`, the entire `NOT IN` conjunction evaluates to `UNKNOWN`, causing the query to return zero rows silently. Use `NOT EXISTS` instead.

---

## ⚡ Node.js & JavaScript Flashcards

### Flashcard N1
* **Q:** What is the execution difference between `process.nextTick()` and `setImmediate()`?
* **A:**
  - `process.nextTick()` belongs to the process microtask queue; it runs immediately when the active call stack clears, before the event loop advances.
  - `setImmediate()` belongs to the libuv **Check phase** (macrotask). Inside an I/O callback, `setImmediate` always runs before `setTimeout(0)`.

---

### Flashcard N2
* **Q:** Which Node.js asynchronous operations use the 4-thread worker pool?
* **A:** Only `fs`, `crypto`, `zlib`, and `dns.lookup`. Network I/O (`http`, `https`, `tls`, `net`) uses non-blocking OS kernel notifications (`epoll`/`kqueue`) and bypasses the thread pool entirely.

---

### Flashcard N3
* **Q:** What causes a Stale Closure in React?
* **A:** When a hook closure (like `useEffect` or `useCallback`) captures state or prop values from an earlier render because those values were omitted from the dependency array.

---

## 🏗️ System Design Flashcards

### Flashcard D1
* **Q:** What is the CAP theorem trade-off in banking?
* **A:** Banking systems are **CP systems** (Consistency & Partition Tolerance). In a network partition, the system rejects writes or degrades availability to guarantee that financial balances are never duplicated or double-spent.

---

### Flashcard D2
* **Q:** How do you guarantee message ordering in Apache Kafka?
* **A:** Kafka guarantees strict message ordering **only within a single partition**. By setting the message key to `account_id`, all events for that account are routed to the same partition and processed strictly in chronological order.
