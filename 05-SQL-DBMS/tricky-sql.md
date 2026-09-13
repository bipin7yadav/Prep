# 🔥 Most Asked & Tricky SQL & DBMS Interview Questions
### The Senior Engineer Playbook: Concurrency, Three-Valued Logic, Indexing, Window Functions & FinTech Gotchas

> **Target Role:** Senior / Core Developer (3+ Years Experience) | Strategic Projects, Bengaluru  
> **Prerequisites:** ANSI SQL, Relational Algebra, Indexing Internals, Transaction Isolation.  
> **Key Focus:** 3-Valued Logic bugs, deadlock avoidance, window function edge cases, and high-concurrency ledger design.

---

## 📋 Quick Navigation

1. [Three-Valued Logic (3VL) & The Fatal `NOT IN (NULL)` Trap](#1-three-valued-logic-3vl--the-fatal-not-in-null-trap)
2. [Preventing Double-Spending: Atomic Decrement vs `SELECT ... FOR UPDATE` vs Optimistic Locking](#2-preventing-double-spending-atomic-decrement-vs-select--for-update-vs-optimistic-locking)
3. [Deadlock Prevention in Two-Account Fund Transfers](#3-deadlock-prevention-in-two-account-fund-transfers)
4. [Running Totals: `ROWS` vs `RANGE` in Window Frames](#4-running-totals-rows-vs-range-in-window-frames)
5. [`ROW_NUMBER()` vs `RANK()` vs `DENSE_RANK()`](#5-rownumber-vs-rank-vs-denserank)
6. [Recursive CTEs: Tracing Money Laundering Mule Account Chains](#6-recursive-ctes-tracing-money-laundering-mule-account-chains)
7. [Anti-Joins: `NOT EXISTS` vs `LEFT JOIN ... IS NULL` vs `NOT IN`](#7-anti-joins-not-exists-vs-left-join--is-null-vs-not-in)
8. [Composite B+ Tree Indexing & The Leftmost Prefix Rule](#8-composite-b-tree-indexing--the-leftmost-prefix-rule)
9. [The Gaps and Islands Problem: Consecutive Days of Banking Activity](#9-the-gaps-and-islands-problem-consecutive-days-of-banking-activity)
10. [Aggregate Functions with NULL & The `COALESCE` Imperative](#10-aggregate-functions-with-null--the-coalesce-imperative)

---

## 1. Three-Valued Logic (3VL) & The Fatal `NOT IN (NULL)` Trap

### 💡 Why Interviewers Ask This
One of the single most dangerous traps in SQL. A query that works perfectly in testing with non-null mock data can return **0 rows** in production the moment a single `NULL` value exists.

### 🧩 Tricky Query Puzzle
Suppose you have two tables: `accounts` and `frozen_accounts`:

```sql
-- accounts: 100 active accounts
-- frozen_accounts: IDs [10, 20, NULL]
SELECT * 
FROM accounts 
WHERE account_id NOT IN (SELECT account_id FROM frozen_accounts);
```

How many rows does this query return?

### ❌ Intuitive (Wrong) Answer
"98 rows — it excludes accounts 10 and 20, and ignores the NULL."

### ✅ Actual Shocking Output
**0 rows! (Empty Result Set)**

### 🧠 The Mathematical Mechanics: SQL Three-Valued Logic
SQL does not use two-valued boolean logic (`TRUE`/`FALSE`). It uses **Three-Valued Logic: `TRUE`, `FALSE`, `UNKNOWN`**.

When you write `x NOT IN (10, 20, NULL)`, SQL expands it into:
```sql
(x <> 10) AND (x <> 20) AND (x <> NULL)
```
In SQL, any direct comparison with `NULL` (including `<>` or `=`) evaluates to **`UNKNOWN`**!
Now substitute boolean logic:
```sql
TRUE AND TRUE AND UNKNOWN  ==>  UNKNOWN
```
A `WHERE` clause only accepts rows where the predicate evaluates to strictly **`TRUE`**. Because every row evaluates to `UNKNOWN`, **every single account is filtered out!**

### 🛠️ Production Fixes

```sql
-- Fix 1: NOT EXISTS (Best Practice - Immune to NULLs & Fast Semi-Join)
SELECT a.*
FROM accounts a
WHERE NOT EXISTS (
    SELECT 1 
    FROM frozen_accounts f 
    WHERE f.account_id = a.account_id
);

-- Fix 2: Explicitly filter NULLs inside subquery
SELECT *
FROM accounts
WHERE account_id NOT IN (
    SELECT account_id 
    FROM frozen_accounts 
    WHERE account_id IS NOT NULL
);
```

---

## 2. Preventing Double-Spending: Atomic Decrement vs `SELECT ... FOR UPDATE` vs Optimistic Locking

### 💡 Why This Matters at IDFC FIRST Bank
When a customer attempts two simultaneous UPI debit requests (or clicks the payment button twice within 10 milliseconds), both requests might read a balance of ₹1,000 and attempt to deduct ₹700, resulting in a ₹-400 illegal overdraft.

### 🛠️ 3 Concurrency Strategies Compared

#### Approach 1: Atomic In-Place Decrement (Fastest & Simplest)
```sql
UPDATE accounts
SET balance = balance - :debit_amount,
    updated_at = NOW()
WHERE account_id = :acc_id 
  AND balance >= :debit_amount;
```
- **How it works:** Relies on database row-level locking during the write.
- **Verification in Backend Code:** Inspect the affected rows count (`result.rowCount` in Node.js / `rowcount` in Python).
  - If `rowCount == 1`: Deduction succeeded!
  - If `rowCount == 0`: Insufficient balance (or account doesn't exist). Return HTTP 400.
- **Trade-off:** No need for multi-statement transactions or explicit lock holding. Ideal for simple single-account debit operations.

#### Approach 2: Pessimistic Row Locking (`SELECT ... FOR UPDATE`)
```sql
BEGIN;

-- Acquires an exclusive row-level lock (X Lock) on this specific account
SELECT balance 
FROM accounts 
WHERE account_id = :acc_id 
FOR UPDATE;

-- Application checks: if balance >= debit_amount
UPDATE accounts 
SET balance = balance - :debit_amount 
WHERE account_id = :acc_id;

-- Record double-entry ledger entry
INSERT INTO ledger_entries (account_id, amount, type) VALUES (:acc_id, :debit_amount, 'DEBIT');

COMMIT;
```
- **How it works:** Forces concurrent transactions reading the same row to wait until this transaction commits or rolls back.
- **Trade-off:** Strongest consistency for multi-table banking workflows, but can cause connection pool queuing under massive contention.

#### Approach 3: Optimistic Locking with Version / Sequence Column
```sql
-- Step 1: Read balance and current version
SELECT balance, version FROM accounts WHERE account_id = :acc_id;

-- Step 2: Conditional update
UPDATE accounts
SET balance = balance - :debit_amount,
    version = version + 1
WHERE account_id = :acc_id 
  AND version = :old_version 
  AND balance >= :debit_amount;
```
- **Trade-off:** Zero database lock contention, but requires client-side retry loops with exponential backoff if `rowCount == 0`.

---

## 3. Deadlock Prevention in Two-Account Fund Transfers

### 💡 The Deadlock Scenario
- Transaction 1: Transfers money from Account A to Account B.
  - Step 1: Locks Account A (`SELECT FOR UPDATE WHERE id = 'A'`)
  - Step 2: Attempts to lock Account B...
- Transaction 2 (Simultaneous): Transfers money from Account B to Account A.
  - Step 1: Locks Account B (`SELECT FOR UPDATE WHERE id = 'B'`)
  - Step 2: Attempts to lock Account A...
- **Result:** Deadlock! Transaction 1 waits for B, while Transaction 2 waits for A. The database engine detects a cycle in the wait-for graph and forcibly aborts one of the transactions.

### 🛡️ The Definitive Fix: Deterministic Lock Ordering
Always acquire locks in a globally consistent, deterministic order (e.g. sorted by `account_id`):

```python
def transfer_funds(from_acc: int, to_acc: int, amount: float):
    # Enforce deterministic order regardless of debit vs credit
    first_id, second_id = sorted([from_acc, to_acc])
    
    with db.transaction():
        # Lock in strict numerical order:
        db.execute("SELECT 1 FROM accounts WHERE id = :id FOR UPDATE", {"id": first_id})
        db.execute("SELECT 1 FROM accounts WHERE id = :id FOR UPDATE", {"id": second_id})
        
        # Now execute debit and credit safely with zero deadlock risk:
        db.execute("UPDATE accounts SET balance = balance - :amt WHERE id = :from_id", ...)
        db.execute("UPDATE accounts SET balance = balance + :amt WHERE id = :to_id", ...)
```

---

## 4. Running Totals: `ROWS` vs `RANGE` in Window Frames

### 💡 Why Interviewers Ask This
Window functions are tested in every senior SQL round. Interviewers check if you know why default window framing can cause incorrect running balances when duplicate timestamps exist!

### 🧩 Tricky Query Puzzle
What is the difference between these two queries?

```sql
-- Query A:
SUM(amount) OVER (
    PARTITION BY account_id 
    ORDER BY txn_date
)

-- Query B:
SUM(amount) OVER (
    PARTITION BY account_id 
    ORDER BY txn_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

### ✅ The Critical Difference
- **Default Frame (Query A):** In ANSI SQL, when `ORDER BY` is present without an explicit frame specification, the default is:
  `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`!
  `RANGE` treats all rows with **identical `ORDER BY` values (peers)** as a single group!
  If a customer executes 3 transactions on the exact same date `'2026-03-01'`, `RANGE` will compute the sum of **all three transactions** and show the identical combined total on all three rows!
- **Explicit Physical Frame (Query B):** `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` treats rows **physically line-by-line**, calculating the true step-by-step cumulative running balance as printed on a banking passbook.

```sql
-- BANKING PASSBOOK STANDARD:
SELECT 
    txn_id,
    txn_date,
    amount,
    SUM(amount) OVER (
        PARTITION BY account_id 
        ORDER BY txn_date, txn_id 
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS running_balance
FROM transactions;
```

---

## 5. `ROW_NUMBER()` vs `RANK()` vs `DENSE_RANK()`

### 💡 The Comparison Matrix (Scores: 100, 100, 90, 80)

| Value | `ROW_NUMBER()` | `RANK()` | `DENSE_RANK()` | Explanation |
| :---: | :---: | :---: | :---: | :--- |
| **100** | 1 | 1 | 1 | First tie |
| **100** | 2 | 1 | 1 | Tied score gets same rank |
| **90** | 3 | **3** | **2** | `RANK()` skips rank 2; `DENSE_RANK()` does not skip! |
| **80** | 4 | 4 | 3 | Next score |

### 🏦 High-Yield Interview Question: Find the 2nd Highest Account Balance
```sql
WITH RankedBalances AS (
    SELECT 
        account_id,
        balance,
        DENSE_RANK() OVER (ORDER BY balance DESC) AS rnk
    FROM accounts
)
SELECT account_id, balance
FROM RankedBalances
WHERE rnk = 2;
```
*Why `DENSE_RANK()` over `LIMIT 1 OFFSET 1`?*  
Because if two wealthy accounts tie for 1st place with ₹10,00,000, `LIMIT 1 OFFSET 1` will return the second tied account (still ₹10,00,000!). `DENSE_RANK()` correctly returns the true second highest distinct balance tier.

---

## 6. Recursive CTEs: Tracing Money Laundering Mule Account Chains

### 💡 Production FinTech Scenario
A fraud ring launders illicit funds by hopping money through a chain of accounts:  
`Account 101 -> Account 102 -> Account 105 -> Account 109`.  
How do you trace the entire transfer chain from source to final destination using a single SQL query?

### 💻 Production Recursive CTE Query
```sql
WITH RECURSIVE TransferChain AS (
    -- Anchor Member: Starting illicit transaction
    SELECT 
        from_account,
        to_account,
        amount,
        txn_date,
        1 AS hop_depth,
        ARRAY[from_account, to_account] AS path
    FROM transfers
    WHERE from_account = 101

    UNION ALL

    -- Recursive Member: Find subsequent hops
    SELECT 
        t.from_account,
        t.to_account,
        t.amount,
        t.txn_date,
        tc.hop_depth + 1,
        path || t.to_account
    FROM transfers t
    JOIN TransferChain tc ON t.from_account = tc.to_account
    -- Guard against circular infinite money laundering loops:
    WHERE NOT (t.to_account = ANY(tc.path))
      AND tc.hop_depth < 10
)
SELECT hop_depth, from_account, to_account, amount, path
FROM TransferChain
ORDER BY hop_depth;
```

---

## 7. Anti-Joins: `NOT EXISTS` vs `LEFT JOIN ... IS NULL` vs `NOT IN`

### 💡 The Goal
Find all customers who have **never executed a credit card transaction**:

```sql
-- Method 1: NOT EXISTS (Recommended)
SELECT c.customer_id, c.name
FROM customers c
WHERE NOT EXISTS (
    SELECT 1 
    FROM card_transactions t 
    WHERE t.customer_id = c.customer_id
);

-- Method 2: LEFT JOIN ... WHERE NULL
SELECT c.customer_id, c.name
FROM customers c
LEFT JOIN card_transactions t ON c.customer_id = t.customer_id
WHERE t.customer_id IS NULL;
```

### ⚖️ Performance & Safety Comparison
1. **`NOT EXISTS`:** Always safe with `NULL` values. The query planner uses a **Hash Anti-Join** and stops searching as soon as the first matching record is found (Early Exit).
2. **`LEFT JOIN ... IS NULL`:** Safe with `NULL`s, but requires building the entire joined result set in memory before filtering out rows where the right column is null.
3. **`NOT IN`:** Extremely dangerous if the subquery returns even a single `NULL` (returns 0 rows).

---

## 8. Composite B+ Tree Indexing & The Leftmost Prefix Rule

### 💡 The Scenario
Suppose you create a composite index on a banking transactions table:
```sql
CREATE INDEX idx_txn_branch_date_amt ON transactions(branch_code, txn_date, amount);
```

Which of the following queries will effectively use the index?

```sql
-- Query 1:
SELECT * FROM transactions WHERE branch_code = 'B001' AND txn_date = '2026-03-01';
-- Query 2:
SELECT * FROM transactions WHERE txn_date = '2026-03-01' AND amount > 5000;
-- Query 3:
SELECT * FROM transactions WHERE branch_code = 'B001' AND amount = 5000;
```

### ✅ Analysis & Leftmost Prefix Rule
- **Query 1: Uses Index!** Matches `branch_code` (leading column) and `txn_date` (second column).
- **Query 2: FAILS to use index (Full Table Scan)!** The leading column `branch_code` is missing. A composite index is sorted like a phonebook (Last Name, First Name). You cannot use a phonebook to look up people by First Name without checking every entry.
- **Query 3: Uses Partial Index.** It uses the index to filter by `branch_code`, but cannot use the index for `amount` because `txn_date` was skipped.

### 💡 Pro Interview Tip: The Covering Index (`INCLUDE`)
```sql
CREATE INDEX idx_covering ON transactions(account_id, txn_date) INCLUDE (amount, status);
```
In PostgreSQL, `INCLUDE` stores payload columns directly in the leaf pages of the B+ Tree without adding them to the index search key. This allows **Index-Only Scans** without expensive heap table lookups!

---

## 9. The Gaps and Islands Problem: Consecutive Days of Banking Activity

### 💡 FinTech Scenario
Find customers who have maintained an active transaction streak for **3 or more consecutive days**.

### 💻 Solution using Difference of Dates (`ROW_NUMBER()` Trick)
```sql
WITH DistinctDays AS (
    -- Step 1: Deduplicate multiple transactions on same day
    SELECT DISTINCT customer_id, CAST(txn_date AS DATE) AS act_date
    FROM transactions
),
NumberedDays AS (
    -- Step 2: Assign a continuous sequence number
    SELECT 
        customer_id,
        act_date,
        ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY act_date) AS seq
    FROM DistinctDays
),
Islands AS (
    -- Step 3: (act_date - seq days) remains CONSTANT for consecutive dates!
    SELECT 
        customer_id,
        act_date,
        act_date - (seq * INTERVAL '1 day') AS island_group
    FROM NumberedDays
)
SELECT 
    customer_id,
    MIN(act_date) AS streak_start,
    MAX(act_date) AS streak_end,
    COUNT(*) AS consecutive_days
FROM Islands
GROUP BY customer_id, island_group
HAVING COUNT(*) >= 3
ORDER BY consecutive_days DESC;
```

---

## 10. Aggregate Functions with NULL & The `COALESCE` Imperative

### 💡 Critical Gotchas

1. **`COUNT(*)` vs `COUNT(column)`:**
   - `COUNT(*)` counts total rows in the partition (including rows where all columns are NULL).
   - `COUNT(column)` counts only rows where `column IS NOT NULL`.
2. **`SUM(amount)` on an empty table or all NULLs:**
   - Evaluates to **`NULL`**, NOT `0`!
   - In financial calculations, `NULL + 100` evaluates to `NULL`.
   - **Production Rule:** Always wrap numeric aggregations with `COALESCE`:
     ```sql
     SELECT COALESCE(SUM(amount), 0) AS total_disbursed FROM loans WHERE status = 'REJECTED';
     ```
3. **`AVG(score)` ignores NULLs:**
   - If scores are `[10, 20, NULL]`, `AVG` computes `(10 + 20) / 2 = 15`, NOT `30 / 3 = 10`.
   - If you want NULLs treated as zero: `AVG(COALESCE(score, 0))`.
