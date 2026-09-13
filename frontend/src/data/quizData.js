export const DIAGNOSTIC_QUESTIONS = [
  
  {
    "id": "tricky-quiz-js-01",
    "category": "JavaScript & V8 Internals",
    "question": "In Node.js, what is the exact console output order of this asynchronous code snippet?\n\nsetTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nprocess.nextTick(() => console.log('NextTick'));",
    "options": [
      "NextTick -> Promise -> Timeout",
      "Timeout -> Promise -> NextTick",
      "Promise -> NextTick -> Timeout",
      "NextTick -> Timeout -> Promise"
    ],
    "correct": 0,
    "explanation": "process.nextTick has the highest priority microtask queue in Node.js, drained before the Promise microtask queue. Both microtask queues drain completely before the event loop advances to the macrotask phase (setTimeout).",
    "moduleRef": "03-JAVASCRIPT"
  },
  {
    "id": "tricky-quiz-js-02",
    "category": "JavaScript & V8 Internals",
    "question": "Why does `0.1 + 0.2 === 0.3` evaluate to false in JavaScript?",
    "options": [
      "JavaScript uses 32-bit integers for decimal calculations",
      "IEEE 754 binary floating-point representation causes repeating binary fraction rounding errors (0.30000000000000004)",
      "Strict equality (===) requires identical memory references",
      "JavaScript automatically casts decimals into ASCII strings"
    ],
    "correct": 1,
    "explanation": "Because 0.1 and 0.2 cannot be represented finitely in base-2 floating-point format, their sum is 0.30000000000000004, causing equality comparison with 0.3 to fail. Banking amounts should always be handled in integer cents/paise or BigInt.",
    "moduleRef": "03-JAVASCRIPT"
  },
  {
    "id": "tricky-quiz-js-03",
    "category": "JavaScript & V8 Internals",
    "question": "What is the console output of: `for (var i = 0; i < 3; i++) { setTimeout(() => console.log(i), 0); }`?",
    "options": [
      "0, 1, 2",
      "3, 3, 3",
      "undefined, undefined, undefined",
      "ReferenceError: i is not defined"
    ],
    "correct": 1,
    "explanation": "Because `var` is function-scoped, a single shared variable `i` is hoisted. When the asynchronous callbacks execute after the call stack empties, the loop has completed with `i = 3`.",
    "moduleRef": "03-JAVASCRIPT"
  },
  {
    "id": "tricky-quiz-js-04",
    "category": "JavaScript & V8 Internals",
    "question": "Why should banking lookups use `Object.create(null)` instead of `{}` for dictionary caching?",
    "options": [
      "It compresses string keys with gzip",
      "It creates an object with no prototype chain, preventing prototype pollution and accidental shadowing of methods like toString()",
      "It automatically synchronizes with Redis",
      "It allocates memory directly on the GPU"
    ],
    "correct": 1,
    "explanation": "Object.create(null) has no prototype, making it immune to Prototype Pollution exploits and eliminating inherited Object.prototype properties.",
    "moduleRef": "03-JAVASCRIPT"
  },
  {
    "id": "tricky-quiz-js-05",
    "category": "JavaScript & V8 Internals",
    "question": "What happens when an arrow function is defined as a method inside an object literal: `const obj = { x: 10, getX: () => this.x }; obj.getX()`?",
    "options": [
      "Returns 10",
      "Returns undefined (or throws in strict mode) because arrow functions inherit `this` from the enclosing lexical scope, not the object literal",
      "Throws a SyntaxError",
      "Creates a new instance of obj"
    ],
    "correct": 1,
    "explanation": "Object literals do NOT create a lexical scope. Arrow functions resolve `this` from their outer enclosing scope (module or global window), where `x` is undefined.",
    "moduleRef": "03-JAVASCRIPT"
  },
  {
    "id": "tricky-quiz-py-01",
    "category": "Python & Data Ecosystem",
    "question": "What happens when you execute: `t = ([1, 2], 3); t[0] += [4, 5]`?",
    "options": [
      "Raises TypeError, and the list remains [1, 2]",
      "Executes successfully, producing ([1, 2, 4, 5], 3)",
      "Raises TypeError, BUT the list inside the tuple is mutated to [1, 2, 4, 5]",
      "Raises AttributeError because tuples cannot hold lists"
    ],
    "correct": 2,
    "explanation": "`+=` calls `list.__iadd__`, which extends the list in-place on the heap. Then the bytecode STORE_SUBSCR attempts to assign the reference back to t[0], which fails and raises TypeError on the immutable tuple.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "tricky-quiz-py-02",
    "category": "Python & Data Ecosystem",
    "question": "Why does `def record(val, ledger=[]): ledger.append(val); return ledger` accumulate values across subsequent function calls?",
    "options": [
      "Python stores all lists in global threadpool memory",
      "Default arguments are evaluated once at function definition time and stored in the function's `__defaults__` attribute",
      "Python compilers automatically memoize all lists",
      "The garbage collector ignores variables named ledger"
    ],
    "correct": 1,
    "explanation": "Default parameter expressions are evaluated at definition time. The exact same list instance is reused for all subsequent calls that omit the second argument.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "tricky-quiz-py-03",
    "category": "Python & Data Ecosystem",
    "question": "What is the output of `[f(2) for f in [lambda x: x * i for i in range(4)]]`?",
    "options": [
      "[0, 2, 4, 6]",
      "[6, 6, 6, 6]",
      "[0, 0, 0, 0]",
      "[2, 4, 6, 8]"
    ],
    "correct": 1,
    "explanation": "Python closures are late-binding; `i` is looked up when the lambda is called, at which point the loop has finished and `i = 3`. Each lambda computes 2 * 3 = 6.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "tricky-quiz-py-04",
    "category": "Python & Data Ecosystem",
    "question": "How does `__slots__ = ('id', 'amt')` optimize memory in a financial transaction class?",
    "options": [
      "It converts Python objects into raw JSON strings",
      "It eliminates the per-instance `__dict__`, reducing RAM usage by 40% to 60% per instance",
      "It disables garbage collection on transaction objects",
      "It compresses memory using LZ4 compression"
    ],
    "correct": 1,
    "explanation": "Declaring `__slots__` prevents the creation of a dynamic dictionary (`__dict__`) for each instance, using a compact C-style struct of attribute pointers instead.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "tricky-quiz-py-05",
    "category": "Python & Data Ecosystem",
    "question": "What does a custom context manager's `__exit__` method returning `True` signify?",
    "options": [
      "The transaction was committed successfully",
      "Any exception that occurred inside the `with` block is SUPPRESSED and execution continues normally",
      "The database connection was closed",
      "The exception should be re-raised immediately"
    ],
    "correct": 1,
    "explanation": "If `__exit__` returns `True`, Python swallows the active exception. If it returns `False` or `None`, the exception is re-raised.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "tricky-quiz-sql-01",
    "category": "SQL & Advanced DBMS",
    "question": "Why does `SELECT * FROM accounts WHERE id NOT IN (SELECT id FROM frozen)` return 0 rows if the `frozen` table contains a single row with `id = NULL`?",
    "options": [
      "The database engine encounters a fatal syntax crash",
      "In SQL Three-Valued Logic, `x <> NULL` evaluates to UNKNOWN, making the entire AND chain evaluate to UNKNOWN and filtering out every row",
      "The query planner automatically aborts queries containing NULL subqueries",
      "NULL values automatically match all integer IDs"
    ],
    "correct": 1,
    "explanation": "`NOT IN` expands to a chain of `<>` comparisons. Because comparison with NULL produces UNKNOWN, `TRUE AND UNKNOWN` yields UNKNOWN, so the WHERE clause matches zero rows. Use `NOT EXISTS` instead.",
    "moduleRef": "05-SQL-DBMS"
  },
  {
    "id": "tricky-quiz-sql-02",
    "category": "SQL & Advanced DBMS",
    "question": "How do you avoid deadlocks when two concurrent processes transfer funds between Account A and Account B in opposite directions?",
    "options": [
      "Increase lock timeout to 60 seconds",
      "Enforce Deterministic Lock Ordering: always acquire locks in sorted order of account ID regardless of transfer direction",
      "Use dirty reads (READ UNCOMMITTED) for both transactions",
      "Disable foreign key checks during money transfers"
    ],
    "correct": 1,
    "explanation": "Sorting the account IDs before acquiring row locks (`SELECT FOR UPDATE`) ensures both transactions request locks in the same sequence, mathematically preventing cycles in the wait-for graph.",
    "moduleRef": "05-SQL-DBMS"
  },
  {
    "id": "tricky-quiz-sql-03",
    "category": "SQL & Advanced DBMS",
    "question": "What is the problem with using default `SUM(amount) OVER (PARTITION BY acc_id ORDER BY txn_date)` for customer passbooks?",
    "options": [
      "It sorts rows in descending order by default",
      "Default framing is `RANGE`, which groups identical timestamps together and produces identical combined running totals for peer rows instead of step-by-step increments",
      "Window functions cannot be used with partition keys",
      "It throws an exception if transactions exceed 1,000 rows"
    ],
    "correct": 1,
    "explanation": "Default framing with `ORDER BY` is `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`. Transactions occurring on the same date are treated as peers and lumped together. Specify `ROWS` for physical step-by-step totals.",
    "moduleRef": "05-SQL-DBMS"
  },
  {
    "id": "tricky-quiz-sql-04",
    "category": "SQL & Advanced DBMS",
    "question": "Given a composite B+ Tree index on `(branch_code, txn_date, amount)`, which query CANNOT use the index efficiently?",
    "options": [
      "`WHERE branch_code = 'B01' AND txn_date = '2026-03-01'`",
      "`WHERE branch_code = 'B01'`",
      "`WHERE txn_date = '2026-03-01' AND amount > 5000`",
      "`WHERE branch_code = 'B01' AND amount = 500`"
    ],
    "correct": 2,
    "explanation": "Under the Leftmost Prefix Rule, a composite index cannot be used if the leading column (`branch_code`) is missing from the filter criteria, forcing a Full Table Scan.",
    "moduleRef": "05-SQL-DBMS"
  },
  {
    "id": "tricky-quiz-sql-05",
    "category": "SQL & Advanced DBMS",
    "question": "What does `SELECT SUM(amount) FROM transactions WHERE 1 = 0` evaluate to, and what is the production safeguard?",
    "options": [
      "0; no safeguard needed",
      "NULL; wrap with `COALESCE(SUM(amount), 0)` to prevent null pointer bugs in downstream code",
      "Raises an empty table exception",
      "Returns a blank string"
    ],
    "correct": 1,
    "explanation": "Aggregate `SUM()` over zero matching rows returns `NULL`, NOT `0`. In financial backend logic, `NULL + 100` yields `NULL`, causing calculation corruption. Always use `COALESCE(SUM(...), 0)`.",
    "moduleRef": "05-SQL-DBMS"
  },
  {
    "id": "pandas-q1",
    "category": "Python & Pandas",
    "question": "In pandas, what is the key difference between df.loc[1:3] and df.iloc[1:3] on a DataFrame with default integer index?",
    "options": [
      "df.loc includes rows with index labels 1, 2, and 3; df.iloc includes rows at integer positions 1 and 2 only",
      "df.loc excludes index 3, while df.iloc includes index 3",
      "Both return identical row slices in all circumstances",
      "df.loc only accepts string column names and crashes on integer row slices"
    ],
    "correct": 0,
    "explanation": ".loc is label-based, so stop endpoints are INCLUSIVE (labels 1, 2, 3). .iloc is integer position-based, so stop endpoints are EXCLUSIVE (positions 1 and 2 only).",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q2",
    "category": "Python & Pandas",
    "question": "What happens when you run df.drop('amount') without specifying the axis parameter?",
    "options": [
      "The 'amount' column is removed successfully",
      "Pandas raises a KeyError because axis defaults to 0 (rows), and it looks for a row labeled 'amount'",
      "Pandas automatically detects whether 'amount' is a row or column",
      "The command executes asynchronously in the background"
    ],
    "correct": 1,
    "explanation": "In df.drop(), axis defaults to 0 (axis='index'). To drop a column, you must explicitly pass axis=1 or columns='amount'.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q3",
    "category": "Python & Pandas",
    "question": "Why does df[(df.amount > 5000) & (df.status == 'SUCCESS')] require parentheses around each condition?",
    "options": [
      "In Python, bitwise & has higher operator precedence than comparison operators (>, ==)",
      "Parentheses force pandas to execute the filter in parallel C threads",
      "Parentheses are optional and purely for aesthetic formatting",
      "Because Python garbage collector requires grouped scopes"
    ],
    "correct": 0,
    "explanation": "Because bitwise & has higher precedence than > and ==, without parentheses Python evaluates 5000 & df.status, causing an invalid operand TypeError.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q4",
    "category": "Python & Pandas",
    "question": "Which pandas method converts low-cardinality string columns (e.g. 'SUCCESS', 'FAILED') into integer-coded categories to save up to 85% memory?",
    "options": [
      "df['status'].astype('int32')",
      "df['status'].astype('category')",
      "df['status'].to_categorical()",
      "df['status'].compress_memory()"
    ],
    "correct": 1,
    "explanation": "Converting strings to category dtype stores 1-byte integer codes pointing to an immutable array of unique categories, eliminating repetitive Python string heap allocations.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q5",
    "category": "Python & Pandas",
    "question": "What is the primary cause of a SettingWithCopyWarning in pandas?",
    "options": [
      "Attempting to write data to a read-only CSV file",
      "Chained assignment (df[condition]['col'] = val) where pandas cannot guarantee whether the slice is a memory view or copy",
      "Using .loc with valid integer indexes",
      "Allocating more memory than available physical RAM"
    ],
    "correct": 1,
    "explanation": "Chained indexing causes ambiguous view-versus-copy assignment. The fix is always performing single-stage assignment via df.loc[condition, 'col'] = val.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q6",
    "category": "Python & Pandas",
    "question": "When performing a 3-way reconciliation using pd.merge(df1, df2, on='txn_id', how='outer', indicator=True), what does indicator=True provide?",
    "options": [
      "A progress bar indicating merge completion percentage",
      "A new column named _merge with values 'both', 'left_only', or 'right_only' to pinpoint unmatched ledger rows",
      "A boolean flag that automatically drops unmatched rows",
      "An indicator of network latency during the database fetch"
    ],
    "correct": 1,
    "explanation": "indicator=True appends a categorical column called _merge displaying whether each row key came from the left DataFrame only, right DataFrame only, or both, making settlement reconciliation trivial.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q7",
    "category": "Python & Pandas",
    "question": "If s1 = pd.Series([10, 20], index=['A', 'B']) and s2 = pd.Series([30, 40], index=['B', 'C']), what is (s1 + s2)['A']?",
    "options": [
      "10",
      "40",
      "NaN",
      "0"
    ],
    "correct": 2,
    "explanation": "Pandas performs automatic index alignment. Label 'A' exists in s1 (10) but is missing in s2 (NaN). 10 + NaN evaluates to NaN.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q8",
    "category": "Python & Pandas",
    "question": "In financial tick data with missing weekend records, which method propagates the last known valid price forward?",
    "options": [
      "df['price'].fillna(0)",
      "df['price'].ffill()",
      "df['price'].bfill()",
      "df['price'].interpolate(method='linear')"
    ],
    "correct": 1,
    "explanation": ".ffill() (forward fill) carries forward the last valid recorded price to subsequent missing timestamps, accurately modeling last traded price.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q9",
    "category": "Python & Pandas",
    "question": "Why is df.duplicated(keep=False) essential in forensic fraud transaction audits?",
    "options": [
      "It deletes all duplicated records permanently from disk",
      "It marks EVERY instance of duplicated keys as True so investigators inspect all colliding rows, not just second occurrences",
      "It encrypts duplicate card numbers with SHA-256",
      "It performs a fast fuzzy string match on customer names"
    ],
    "correct": 1,
    "explanation": "keep=False marks all copies (first, second, third, etc.) of duplicate rows as True, allowing fraud analysts to compare all identical collision events side-by-side.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q10",
    "category": "Python & Pandas",
    "question": "Why does using for _, row in df.iterrows() degrade performance severely on large financial datasets?",
    "options": [
      "It blocks Python event loop thread pool",
      "It creates a new pandas Series for each row on the Python heap, bypassing C-level vectorized SIMD execution",
      "It forces garbage collection after every iteration",
      "It writes temporary files to /tmp"
    ],
    "correct": 1,
    "explanation": "iterrows() instantiates a Series object for each row and performs overhead-heavy type conversions in pure Python, running up to 1,000x slower than vectorized pandas/NumPy operations.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q11",
    "category": "Python & Pandas",
    "question": "How should uncleaned ledger amount strings containing invalid values like 'ERROR' or 'NULL' be safely converted to floats?",
    "options": [
      "df['amount'].astype(float)",
      "pd.to_numeric(df['amount'], errors='coerce')",
      "df['amount'].apply(int)",
      "float(df['amount'])"
    ],
    "correct": 1,
    "explanation": "pd.to_numeric(..., errors='coerce') converts unparseable strings into NaN without throwing a ValueError exception, allowing subsequent imputation.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q12",
    "category": "Python & Pandas",
    "question": "Why is drop_first=True specified when creating dummy variables with pd.get_dummies() for statistical/ML modeling?",
    "options": [
      "To remove the header row from the DataFrame",
      "To prevent the Dummy Variable Trap (perfect multicollinearity) by leaving out one reference category",
      "To drop the first transaction from the customer history",
      "To sort dummy columns in reverse alphabetical order"
    ],
    "correct": 1,
    "explanation": "If a categorical column has k categories, k dummy columns create a perfect linear dependency (their sum equals 1), causing multicollinearity in regression models. drop_first=True retains k-1 columns.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q13",
    "category": "Python & Pandas",
    "question": "What does .unstack() do to a multi-level grouped aggregation Series like df.groupby(['branch', 'year'])['revenue'].sum()?",
    "options": [
      "Drops all missing values from the result",
      "Pivots the innermost index level ('year') into columns, creating a wide 2D DataFrame",
      "Merges the Series with the original raw table",
      "Flattens the index into a single tuple"
    ],
    "correct": 1,
    "explanation": "unstack() pivots an index level of a Series or DataFrame into column headers, converting a hierarchical tall representation into a clean, wide matrix.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q14",
    "category": "Python & Pandas",
    "question": "How do you refer to an active Python variable named cutoff_amount inside df.query()?",
    "options": [
      "df.query('amount > $cutoff_amount')",
      "df.query('amount > @cutoff_amount')",
      "df.query('amount > :cutoff_amount')",
      "df.query('amount > ?cutoff_amount')"
    ],
    "correct": 1,
    "explanation": "The @ prefix in df.query() allows referencing environment variables in the local Python scope.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q15",
    "category": "Python & Pandas",
    "question": "Which pandas method transforms a column containing list elements (e.g. ['UPI', 'CASHBACK']) into separate individual rows?",
    "options": [
      "df.melt()",
      "df.explode()",
      "df.flatten()",
      "df.split()"
    ],
    "correct": 1,
    "explanation": "df.explode() unrolls list-like values in a target column into separate rows, repeating the index and non-target column values.",
    "moduleRef": "01-PYTHON"
  },
  {
    id: "q1",
    category: "SQL & DBMS",
    question: "In a high-concurrency bank account transfer, how do you prevent race conditions (two simultaneous debit transactions reading the same balance)?",
    options: [
      "Use SELECT balance FROM accounts WHERE id = ? with a standard transaction",
      "Use SELECT balance FROM accounts WHERE id = ? FOR UPDATE to acquire an exclusive row-level lock",
      "Use an optimistic lock by updating without any WHERE clause check",
      "Wrap the SELECT query in a JavaScript setTimeout() to stagger requests"
    ],
    correct: 1,
    explanation: "SELECT ... FOR UPDATE row-level exclusive (X) lock acquire karta hai. Jab tak transaction COMMIT ya ROLLBACK nahi hoti, dusri transaction wait state me rehti hai. Isse race conditions aur negative balance prevention ensure hota hai.",
    moduleRef: "05-SQL-DBMS"
  },
  {
    id: "q2",
    category: "SQL & DBMS",
    question: "Which SQL window function will calculate the cumulative running balance for an IDFC account ordered by transaction date without collapsing rows?",
    options: [
      "SUM(amount) GROUP BY account_id",
      "SUM(amount) OVER (PARTITION BY account_id ORDER BY transaction_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)",
      "CUMULATIVE_SUM(amount) ON (account_id)",
      "ROW_NUMBER() OVER (ORDER BY amount)"
    ],
    correct: 1,
    explanation: "Window function SUM(...) OVER (PARTITION BY ... ORDER BY ...) har row ke liye running total calculate karta hai bina group by collapse kiye. Banking passbook printing me ye standard technique hai.",
    moduleRef: "05-SQL-DBMS"
  },
  {
    id: "q3",
    category: "SQL & DBMS",
    question: "What is the key difference between MySQL's default isolation level (Repeatable Read) and Read Committed regarding Phantom Reads?",
    options: [
      "Repeatable Read allows dirty reads, while Read Committed does not",
      "Repeatable Read in InnoDB uses Gap Locks & Next-Key Locks to prevent Phantom Reads during locking reads; Read Committed only locks individual rows",
      "Read Committed uses table locks exclusively",
      "Repeatable Read converts all queries into asynchronous background jobs"
    ],
    correct: 1,
    explanation: "InnoDB's Repeatable Read uses Next-Key Locking (Record Lock + Gap Lock) jo records ke beech ke gap ko lock karta hai taaki koi dusra session new row insert na kar sake, eliminating Phantom Reads for locking reads.",
    moduleRef: "05-SQL-DBMS"
  },
  {
    id: "q4",
    category: "Node.js & Express",
    question: "In Node.js libuv event loop, in what order do `process.nextTick`, `Promise.then`, `setImmediate`, and `setTimeout(fn, 0)` execute?",
    options: [
      "setTimeout -> setImmediate -> process.nextTick -> Promise.then",
      "process.nextTick -> Promise.then (Microtasks) -> setTimeout (Timers phase) -> setImmediate (Check phase)",
      "setImmediate -> setTimeout -> process.nextTick -> Promise.then",
      "Promise.then -> process.nextTick -> setImmediate -> setTimeout"
    ],
    correct: 1,
    explanation: "process.nextTick queue has highest priority and executes immediately after current synchronous operation, followed by Promise microtask queue, then libuv moves to the Timers phase (setTimeout), and Check phase (setImmediate) executes later.",
    moduleRef: "04-NODE-EXPRESS"
  },
  {
    id: "q5",
    category: "Node.js & Express",
    question: "Why should you NEVER use `fs.readFileSync()` or heavy synchronous regex parsing inside an Express route handler handling banking requests?",
    options: [
      "Node.js will crash with an out of memory error immediately",
      "It blocks the single Node.js Event Loop thread, causing all concurrent user requests to stall until the file/regex completes",
      "Browsers will refuse to accept synchronous responses",
      "V8 engine automatically converts sync methods to web workers"
    ],
    correct: 1,
    explanation: "Node.js single-threaded event loop pe chalta hai. Agar koi CPU-intensive sync task ya synchronous I/O run hota hai, to event loop freeze ho jata hai aur kisi bhi doosre customer ki request process nahi ho sakti.",
    moduleRef: "04-NODE-EXPRESS"
  },
  {
    id: "q6",
    category: "React.js",
    question: "How does React 18 Fiber architecture differ from the legacy Stack reconciler?",
    options: [
      "Fiber is written in C++ while Stack was written in JavaScript",
      "Fiber represents each element as a unit of work (Fiber node) allowing interruptible, asynchronous, time-sliced rendering; Stack reconciler was synchronous and blocking",
      "Fiber completely removes the Virtual DOM in favor of direct DOM mutations",
      "Fiber only works with class components"
    ],
    correct: 1,
    explanation: "Legacy stack reconciler synchronous tha—bade component trees render hote waqt UI freeze ho jata tha. Fiber virtual call stack banata hai linked list structure me, allowing high priority tasks (typing, clicks) to interrupt low priority renders.",
    moduleRef: "10-REACT"
  },
  {
    id: "q7",
    category: "React.js",
    question: "In React, when should you use `useCallback` vs `useMemo`?",
    options: [
      "useCallback is for async calls; useMemo is for sync calls",
      "useCallback memoizes a function definition across renders; useMemo memoizes the computed return value of a function",
      "useCallback is only used with Redux; useMemo is only used with Context",
      "There is no difference, they are exact aliases"
    ],
    correct: 1,
    explanation: "useCallback(fn, deps) function reference ko stabilize karta hai taaki child components jo React.memo se wrapped hain faltu me re-render na hon. useMemo(() => compute(), deps) expensive calculations ke result ko cache karta hai.",
    moduleRef: "10-REACT"
  },
  {
    id: "q8",
    category: "System Design",
    question: "How is Idempotency guaranteed in a Payment Gateway API when a customer's network disconnects and retries the transaction?",
    options: [
      "By relying on client IP address and browser user-agent",
      "The client sends a unique Idempotency-Key (UUID v4) with the header; the server checks a distributed cache (Redis) and DB table, returning the saved response if already processed",
      "By rejecting all duplicate requests with HTTP 500 error",
      "By storing payment details in browser localStorage"
    ],
    correct: 1,
    explanation: "Client transaction create karte time unique UUIDv4 Idempotency-Key bhejta hai. Server pehle Redis distributed lock leta hai, check karta hai agar ye key already processed hai to cached result return kar deta hai bina paise dobara kate.",
    moduleRef: "06-SYSTEM-DESIGN"
  },
  {
    id: "q9",
    category: "System Design",
    question: "In distributed microservices, why is the Saga Pattern preferred over Two-Phase Commit (2PC) for cross-service banking workflows?",
    options: [
      "2PC requires NoSQL databases while Saga requires SQL",
      "2PC is synchronous and holds distributed locks across all services, creating high latency and single-point-of-failure bottlenecks; Saga uses local transactions with compensating rollbacks",
      "Sagas do not support rollback",
      "2PC is faster and has zero locking overhead"
    ],
    correct: 1,
    explanation: "2PC me agar ek bhi microservice slow ya down hui, to sabhi databases lock ho jate hain. Saga pattern me har service apni local transaction execute karti hai, aur agar koi step fail hota hai to backward compensating transactions (e.g., refund) fire hoti hain.",
    moduleRef: "06-SYSTEM-DESIGN"
  },
  {
    id: "q10",
    category: "Banking & FinTech",
    question: "In India's UPI 2.0 architecture, what role does the NPCI (National Payments Corporation of India) Switch play?",
    options: [
      "It directly stores customer bank account balances",
      "It acts as the central national routing switch that resolves VPAs, validates transactions, and facilitates real-time interbank settlement between Remitter and Beneficiary banks",
      "It prints debit cards for Indian banks",
      "It generates OTPs on customer mobile devices"
    ],
    correct: 1,
    explanation: "NPCI UPI Switch central hub hai jo Payer PSP, Remitter Bank (debit), Beneficiary Bank (credit), aur Payee PSP ko connect karta hai. Ye VPA (e.g. user@idfcbank) ko IFSC/Account me resolve karta hai aur interbank clearing supervise karta hai.",
    moduleRef: "11-BANKING-FINTECH"
  },
  {
    id: "q11",
    category: "Banking & FinTech",
    question: "Why must every core banking transaction record both a DEBIT and a CREDIT entry (Double-Entry Bookkeeping)?",
    options: [
      "To pay double tax to the government",
      "Because of the fundamental accounting equation (Assets = Liabilities + Equity); money cannot appear or disappear, every debit must have an equal and offsetting credit",
      "It is a legacy rule that is no longer required in modern databases",
      "To keep two copies of data in case of disk failure"
    ],
    correct: 1,
    explanation: "Double-entry bookkeeping me har rupee traceable hota hai. Agar customer A ke account se ₹10,000 debit hote hain, to bank ke cash/settlement ya customer B ke account me ₹10,000 credit honge. Total sum of Debits always equals total sum of Credits.",
    moduleRef: "11-BANKING-FINTECH"
  },
  {
    id: "q12",
    category: "Security & Compliance",
    question: "According to RBI Data Localization guidelines and PCI-DSS, which of the following is STRICTLY FORBIDDEN to store after transaction authorization?",
    options: [
      "Masked Card Number (first 6 and last 4 digits)",
      "Card CVV/CVC and Plaintext PIN / PIN Block",
      "Cardholder Name",
      "Transaction Reference ID"
    ],
    correct: 1,
    explanation: "PCI-DSS requirement 3.2 aur RBI rules ke tehat Card Verification Value (CVV/CVC) aur PIN block ko authorization ke baad store karna completely illegal hai. Sirf masked PAN aur non-sensitive tokens store kiye ja sakte hain.",
    moduleRef: "08-SECURITY"
  },
  {
    id: "q13",
    category: "Python & Data",
    question: "Why is a NumPy vectorized array operation up to 50x-100x faster than a Python standard `for` loop iterating over a list?",
    options: [
      "NumPy runs in the cloud using GPU clusters automatically",
      "NumPy arrays are homogeneous, stored in contiguous C-memory buffers, bypassing Python dynamic type checking and utilizing CPU SIMD vector instructions",
      "Python lists are stored on hard disk while NumPy is stored in RAM",
      "NumPy compiles code into JavaScript"
    ],
    correct: 1,
    explanation: "Python lists pointers store karte hain aur har iteration pe type checking (dynamic typing overhead) hoti hai. NumPy homogeneous (e.g., float64) memory me contiguous block me store hota hai aur CPU ke SIMD registers (Single Instruction Multiple Data) se parallel execution karta hai.",
    moduleRef: "01-PYTHON-DATA"
  },
  {
    id: "q14",
    category: "Python & Data",
    question: "In pandas, what is the critical difference between `df.loc[0:3]` and `df.iloc[0:3]`?",
    options: [
      "loc is for integers, iloc is for strings",
      "loc is label-based and INCLUDES both endpoints (0, 1, 2, 3); iloc is integer position-based and EXCLUDES the stop index (0, 1, 2)",
      "loc only works on Series; iloc works on DataFrames",
      "loc is deprecated in pandas 2.0+"
    ],
    correct: 1,
    explanation: "df.loc[] label-based hota hai aur stop label ko INCLUDE karta hai (3 include hoga). df.iloc[] zero-based integer index position pe kaam karta hai aur standard Python slicing ki tarah stop index ko EXCLUDE karta hai (sirf 0, 1, 2 aayenge).",
    moduleRef: "01-PYTHON-DATA"
  },
  {
    id: "q15",
    category: "Python & Data",
    question: "Which pandas expression is the direct equivalent of the SQL query: `SELECT customer_id, SUM(amount) FROM tx GROUP BY customer_id HAVING SUM(amount) > 50000`?",
    options: [
      "tx.groupby('customer_id')['amount'].sum().loc[lambda x: x > 50000]",
      "tx.filter('amount > 50000').groupby('customer_id')",
      "tx.select('customer_id', 'amount').sum().where(50000)",
      "tx.pivot_table(values='amount', index='customer_id')"
    ],
    correct: 0,
    explanation: "df.groupby('customer_id')['amount'].sum() GROUP BY and aggregation perform karta hai. Uske baad .loc[lambda x: x > 50000] filtered aggregate values provide karta hai, jo SQL ke HAVING clause ke barabar hai.",
    moduleRef: "01-PYTHON-DATA"
  },
  {
    id: "q16",
    category: "Python & Data",
    question: "In Matplotlib's Object-Oriented (OO) API, what is the structural difference between `fig` (Figure) and `ax` (Axes)?",
    options: [
      "fig is for 3D plots; ax is for 2D plots",
      "Figure is the overall canvas / top-level container; Axes is the actual coordinate plane/plot with data, labels, ticks, and lines",
      "fig is deprecated; only ax should be used",
      "Axes is an array of data points; Figure is the file format (PNG/PDF)"
    ],
    correct: 1,
    explanation: "Figure canvas/page hai jisme multiple subplots ho sakte hain. Axes actual individual chart/coordinate system hai jisme x-axis, y-axis, title aur plotted lines rehte hain. Production dashboards me OO API (fig, ax = plt.subplots()) standard practice hai.",
    moduleRef: "01-PYTHON-DATA"
  },
  {
    id: "q17",
    category: "DSA & Core",
    question: "Given a stream of banking transactions, which algorithmic approach is optimal to find if there are any 3 transactions that sum up to zero?",
    options: [
      "3 nested for-loops giving O(N^3) time",
      "Sort the array in O(N log N), then use a fixed outer pointer and Two Pointers (left & right) for the remaining elements giving O(N^2) time and O(1) extra space",
      "Use recursion with O(2^N) time",
      "Store everything in a Trie giving O(N!) time"
    ],
    correct: 1,
    explanation: "3Sum problem: Array ko sort karke O(N log N), ek loop se first element fix karo aur bache hue subarray pe Two Pointers (left and right) move karo. Ye O(N^2) optimal time and O(1) auxiliary space me solve hota hai.",
    moduleRef: "02-DSA"
  },
  {
    id: "q18",
    category: "DSA & Core",
    question: "In real-time fraud monitoring, you need to check if a user makes more than 5 high-value transactions within any continuous 10-minute window. What data structure / pattern is best?",
    options: [
      "Binary Search Tree",
      "Sliding Window with a Double-Ended Queue (Deque) storing transaction timestamps",
      "Depth-First Search (DFS) on a graph",
      "Bubble Sort on the transaction list"
    ],
    correct: 1,
    explanation: "Sliding window with Deque (monotonic queue): Har naye transaction timestamp ke aane pe, window ke start se purane timestamps (jo current_time - 10min se purane hain) pop_left() kar do. Agar Deque ka size > 5 ho jaye to fraud alert trigger karo. Har element ek baar push aur ek baar pop hota hai -> O(1) amortized.",
    moduleRef: "02-DSA"
  },
  {
    id: "q19",
    category: "Architecture",
    question: "Which GoF design pattern is most appropriate when IDFC First Bank needs to support multiple payment gateways (Razorpay, PayU, BillDesk, NPCI Direct) switchable at runtime without altering core checkout logic?",
    options: [
      "Singleton Pattern",
      "Strategy Pattern",
      "Prototype Pattern",
      "Decorator Pattern"
    ],
    correct: 1,
    explanation: "Strategy Pattern payment processing algorithm ko encapsulate karta hai ek common PaymentStrategy interface ke peeche. Runtime pe context object decide karta hai ki kaunsa gateway call karna hai bina if/else ladders ke.",
    moduleRef: "07-LOW-LEVEL-DESIGN"
  },
  {
    id: "q20",
    category: "Resume Defense",
    question: "In your Invizio Solutions resume, how did you achieve a 40% query performance optimization in MySQL?",
    options: [
      "By restarting the MySQL server every hour",
      "By analyzing slow query logs with EXPLAIN, replacing full-table scans with composite B+ Tree indexes, eliminating N+1 ORM queries via JOINs, and replacing OFFSET pagination with keyset/cursor pagination",
      "By dropping all foreign key constraints",
      "By switching MySQL to SQLite"
    ],
    correct: 1,
    explanation: "EXPLAIN ANALYZE run karke WHERE aur ORDER BY columns pe composite index banaya, redundant queries ko single query with JOIN me convert kiya, aur deep OFFSET pagination (SELECT ... OFFSET 100000) ko keyset pagination (WHERE id > last_seen_id) me badla.",
    moduleRef: "12-RESUME-DEFENSE"
  },
  {
    id: "q21",
    category: "Resume Defense",
    question: "In your Bulk Image Upload system, why did you choose asynchronous background queue processing instead of processing in the HTTP request cycle?",
    options: [
      "Because HTTP requests cannot transfer images",
      "Image resizing/compression is CPU-bound and I/O heavy; doing it synchronously blocks HTTP worker threads, leading to gateway timeouts (504) and poor user experience under concurrent load",
      "Because AWS S3 requires background queues only",
      "Because Node.js does not support POST requests"
    ],
    correct: 1,
    explanation: "Sync upload me client wait karta rehta hai aur server connection pool exhaust ho jata hai. Async approach me user ko instant 202 Accepted response milta hai, files direct S3 pre-signed URL se upload hoti hain, aur BullMQ/Redis worker background me Sharp image compression process karta hai.",
    moduleRef: "12-RESUME-DEFENSE"
  },
  {
    id: "q22",
    category: "JavaScript",
    question: "What will `console.log(typeof NaN)` and `console.log(NaN === NaN)` output in JavaScript, and why?",
    options: [
      "'undefined' and true",
      "'number' and false, because IEEE 754 floating point standard specifies NaN is never equal to any value, including itself",
      "'object' and true",
      "'nan' and false"
    ],
    correct: 1,
    explanation: "IEEE 754 standard ke according NaN numeric type ka non-representable value hai, isliye typeof NaN 'number' hota hai. Standard ke mutabik NaN kisi se bhi equal nahi hota, even apne aap se (NaN === NaN is false). To check NaN, use Number.isNaN().",
    moduleRef: "03-JAVASCRIPT"
  },
  {
    id: "q23",
    category: "DevOps & Cloud",
    question: "What is the primary security advantage of using a Multi-Stage Docker build for deploying a Node.js banking API to production?",
    options: [
      "It allows running multiple databases in the same container",
      "It isolates the build environment (compilers, devDependencies, git, secret keys) and copies ONLY the production bundle and runtime node_modules into a minimal, rootless distroless image",
      "It makes the container run at 2x CPU speed",
      "It replaces Linux kernel with Docker kernel"
    ],
    correct: 1,
    explanation: "Multi-stage builds me build tools, test dependencies, aur temporary files build stage me hi reh jate hain. Final production image me sirf lightweight runtime aur compiled code rehta hai, reducing vulnerabilities and image attack surface dramatically.",
    moduleRef: "09-DEVOPS-CLOUD"
  },
  {
    id: "q24",
    category: "Backend & Systems",
    question: "When should you use Redis distributed locks (Redlock algorithm) versus Database Row-level locking in a banking application?",
    options: [
      "Redis lock for multi-service coordination and rate-limiting outside the DB transaction; Database row-level lock (FOR UPDATE) for atomic balance mutations inside the relational ACID boundary",
      "Redis locks must replace all database transactions completely",
      "Database locks should never be used in production",
      "Redlock is only for caching images"
    ],
    correct: 0,
    explanation: "Redis distributed locks microservice level pe cross-service race condition aur duplicate webhooks ko block karne ke liye ideal hain. Par actual balance deduction aur ledger entry me relational DB ka SELECT FOR UPDATE aur ACID transaction compulsory hai data integrity ke liye.",
    moduleRef: "06-SYSTEM-DESIGN"
  }
];
