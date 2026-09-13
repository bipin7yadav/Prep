# ⚡ 10-Minute Rapid Revision: Tricky JS, Python & SQL Gotchas
### The High-Yield Cram Sheet for IDFC FIRST Bank Technical Rounds

---

## 🟨 JavaScript Tricky Rapid Fire

| Topic | The Code / Trap | Correct Answer & Why |
| :--- | :--- | :--- |
| **Microtask Priority** | `setTimeout(f, 0)` vs `Promise.resolve().then(f)` | `Promise` runs **first**. Call stack empties -> Microtasks completely drained -> Macrotasks execute. |
| **`var` in Loop** | `for (var i=0; i<3; i++) setTimeout(()=>console.log(i), 0)` | Prints `3, 3, 3`. `var` is function-scoped; all closures share the same `i`. Fix: use `let`. |
| **Currency Math** | `0.1 + 0.2 === 0.3` | Evaluates to `false` (`0.30000000000000004`) due to IEEE 754 floating point. In banking, always compute in **paise / cents** (integers) or `BigInt`. |
| **Temporal Dead Zone** | Accessing `let x` before declaration | Throws `ReferenceError`. `let` and `const` are hoisted into TDZ without initialization. |
| **`this` in Arrow Func** | `const obj = { a: 10, b: () => this.a }` | `obj.b()` returns `undefined`. Arrow functions inherit `this` from the enclosing lexical scope (global/module), not `{}`. |
| **Type Coercion** | `[] == ![]` | Evaluates to `true`! `![]` -> `false` -> `0`; `[]` -> `""` -> `0`; `0 == 0` is `true`. |
| **Prototype Pollution** | `const map = Object.create(null)` | Has NO prototype chain (`__proto__ === undefined`), preventing inherited properties and prototype pollution. |
| **Debounce vs Throttle** | Search autocomplete vs Payment submit button | **Debounce:** Waits for quiet period before running (search). **Throttle:** Guarantees execution at most once per interval (payment button). |
| **Promise Concurrency** | `Promise.all` vs `Promise.allSettled` | `all` fails-fast on the first rejection. `allSettled` waits for all to complete regardless of rejection. |
| **V8 Hidden Classes** | Adding properties in different order to objects | De-optimizes V8 into slow dictionary mode! Always initialize properties in the exact same order in constructors. |

---

## 🐍 Python Tricky Rapid Fire

| Topic | The Code / Trap | Correct Answer & Why |
| :--- | :--- | :--- |
| **Small Int Cache** | `a = 256; b = 256; a is b` vs `257` | `256` is `True` (cached from `-5` to `256`). `257` is `False` in REPL (separate heap allocations). Always use `==` for values. |
| **Mutable Default Arg** | `def f(val, acc=[]): acc.append(val); return acc` | Subsequent calls without 2nd arg share the same list in `f.__defaults__`! Fix: `acc=None`. |
| **Late-Binding Closure** | `[lambda x: x*i for i in range(4)]` | All functions evaluate with `i=3` when called! Fix: bind default arg `lambda x, i=i: x*i`. |
| **Tuple Mutation** | `t = ([1, 2], 3); t[0] += [4, 5]` | **Raises `TypeError` AND mutates list!** `+=` mutates list in-place via `__iadd__`, then fails when assigning back to tuple. |
| **GIL & CPU Parallelism** | Why `threading` doesn't speed up heavy math | CPython GIL allows only 1 native thread to execute bytecode at a time. Use `multiprocessing` or C-extensions (NumPy). |
| **NumPy & GIL** | Does NumPy array math hold the GIL? | **No.** NumPy releases the GIL during vectorized C/Fortran array computations across multiple cores. |
| **C3 MRO & `super()`** | Diamond inheritance `class D(B, C)` | `super()` calls the next class in the **MRO list**, NOT necessarily the direct parent! Resolves diamond without duplicates. |
| **`__slots__` Optimization** | `__slots__ = ('id', 'amt')` | Prevents per-instance `__dict__` creation. Reduces memory footprint by **40% to 60%** in large ledgers. |
| **`__exit__` Exception** | Context manager `__exit__` returns `True` | **Suppresses** the exception and continues normal execution. Returning `False` re-raises. |
| **`finally` Return Trap** | `try: return 100 finally: return 200` | Returns **`200`**! An explicit `return` in `finally` silently overwrites any return from `try`. |

---

## 🐬 SQL & DBMS Tricky Rapid Fire

| Topic | The Query / Trap | Correct Answer & Why |
| :--- | :--- | :--- |
| **`NOT IN` with `NULL`** | `WHERE id NOT IN (SELECT id FROM t)` where `t.id` has a `NULL` | Returns **0 rows**! `x <> NULL` is `UNKNOWN`, making the entire `AND` condition `UNKNOWN`. Always use `NOT EXISTS`. |
| **Double-Spending** | Concurrent UPI debits reading same balance | Use atomic in-place decrement `UPDATE accounts SET balance = balance - :amt WHERE id = :id AND balance >= :amt` or `SELECT ... FOR UPDATE`. |
| **Deadlock Avoidance** | Transferring between Account A and Account B | **Deterministic lock ordering:** Always lock accounts in sorted order by `account_id` (`first, second = sorted([a, b])`). |
| **Running Total Frame** | Default `OVER (ORDER BY dt)` vs explicit `ROWS` | Default uses `RANGE`, combining rows with duplicate timestamps. For true ledger step-by-step balance, use `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. |
| **Tied Ranks** | Find 2nd highest balance | Use `DENSE_RANK() OVER (ORDER BY balance DESC)`. `LIMIT 1 OFFSET 1` fails if two top accounts have identical balances. |
| **Anti-Join Efficiency** | `NOT EXISTS` vs `LEFT JOIN ... IS NULL` | `NOT EXISTS` uses a fast Hash Anti-Join and stops searching on the first match (early exit); safe with `NULL`s. |
| **Leftmost Prefix Rule** | Index on `(branch, date, amount)`. Query on `WHERE date = ...` | **Full Table Scan!** You cannot skip the leading column of a composite B+ Tree index. |
| **Covering Index** | `CREATE INDEX ... INCLUDE (amount, status)` | Stores payload columns directly in B+ Tree leaf pages without indexing them, enabling fast **Index-Only Scans**. |
| **`COUNT(*)` vs `COUNT(col)`** | Table with 10 rows where 3 rows have `col = NULL` | `COUNT(*)` returns `10`. `COUNT(col)` returns `7`. |
| **`SUM` on Empty Table** | `SELECT SUM(amount) FROM txns WHERE 1=0` | Returns **`NULL`**, not `0`! Always write `COALESCE(SUM(amount), 0)` in banking queries. |
