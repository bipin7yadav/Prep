# SQL & DBMS Last-Minute Interview Cheatsheet

---

## ⚡ SQL Logical Execution Order
```text
1. FROM & JOIN     (Combines tables)
2. ON              (Filters join rows)
3. WHERE           (Filters base rows before grouping - NO AGGREGATES!)
4. GROUP BY        (Aggregates rows into buckets)
5. HAVING          (Filters aggregated groups)
6. SELECT          (Calculates expressions & column aliases)
7. DISTINCT        (Deduplicates output)
8. ORDER BY        (Sorts results)
9. LIMIT / OFFSET  (Paginates results)
```

---

## 🪟 Window Functions Cheat Sheet
```sql
-- General Syntax:
FUNCTION() OVER (
    PARTITION BY category_col 
    ORDER BY sort_col 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)

-- Key Ranking Differences:
ROW_NUMBER()  -- 1, 2, 3, 4 (Always unique sequential integers)
RANK()        -- 1, 2, 2, 4 (Ties get same rank, subsequent rank skipped)
DENSE_RANK()  -- 1, 2, 2, 3 (Ties get same rank, NO rank skipped - Top N salaries!)

-- Navigation:
LAG(col, 1)   -- Reads value from previous row (Gap / time difference)
LEAD(col, 1)  -- Reads value from next row

-- Running Total (Explicit Frame is faster than default RANGE!):
SUM(amount) OVER (
    PARTITION BY account_id 
    ORDER BY created_at 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

---

## 🛡️ ACID & Database Concurrency Cheat Sheet

| Isolation Level | Dirty Read | Non-Repeatable Read | Phantom Read | Default In |
| :--- | :---: | :---: | :---: | :--- |
| **Read Uncommitted** | ❌ Allowed | ❌ Allowed | ❌ Allowed | — |
| **Read Committed** | ✅ Prevented | ❌ Allowed | ❌ Allowed | **Postgres / Oracle** |
| **Repeatable Read** | ✅ Prevented | ✅ Prevented | ✅ Prevented in Postgres | **MySQL (InnoDB)** |
| **Serializable** | ✅ Prevented | ✅ Prevented | ✅ Prevented | SQLite / High Security |

### Locking Commands
```sql
-- Pessimistic Lock (Blocks other readers and writers):
SELECT * FROM accounts WHERE account_id = 101 FOR UPDATE;

-- Pessimistic Lock (Fail immediately if locked):
SELECT * FROM accounts WHERE account_id = 101 FOR UPDATE NOWAIT;

-- Task Queue Processing (Skip locked rows to prevent worker pileup):
SELECT * FROM job_queue WHERE status = 'PENDING' LIMIT 1 FOR UPDATE SKIP LOCKED;

-- Optimistic Lock Check:
UPDATE accounts 
SET balance = balance - 100, version = version + 1 
WHERE account_id = 101 AND version = :read_version;
```

---

## 🏎️ B+ Tree Indexing Rules
1. **Leftmost Prefix Rule:** If composite index is on `(A, B, C)`:
   - `WHERE A = 1` $\to$ **Index Scan (Yes)**
   - `WHERE A = 1 AND B = 2` $\to$ **Index Scan (Yes)**
   - `WHERE B = 2 AND C = 3` $\to$ **Sequential Scan (No index used!)**
2. **Range Breaks Indexing:** If query has `WHERE A = 1 AND B > 5 AND C = 10`:
   - Column `A` uses index seek.
   - Column `B` uses index range scan.
   - Column `C` **cannot** use the index; must be filtered after scan!
3. **Clustered Index:** Leaf nodes contain full data rows (1 per table).
4. **Secondary Index:** Leaf nodes contain indexed column + Primary Key pointer.
5. **Covering Index:** Index contains *all* projected columns, bypassing table data pages entirely.
