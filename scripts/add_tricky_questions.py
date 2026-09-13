#!/usr/bin/env python3
"""
Adds most asked and tricky questions of JS, Python, and SQL to:
1. frontend/src/data/flashcardsData.js (30 new cards)
2. frontend/src/data/quizData.js (15 new quiz questions)
3. frontend/src/data/importantTopicsData.js (3 new Must-Know topics)
"""

import os
import json
import re

TRICKY_FLASHCARDS = [
  # --- JavaScript Tricky Questions (1-10) ---
  {
    "id": "tricky-js-01",
    "domain": "JavaScript & V8 Internals",
    "topic": "Event Loop & Microtasks",
    "dimension": "Code Output Puzzle",
    "question": "What is the exact execution order of process.nextTick vs Promise.then vs setTimeout(0)?",
    "answerHinglish": "Synchronous call stack pehle empty hota hai. Uske baad Node.js me process.nextTick queue execute hoti hai, fir Promise microtask queue drain hoti hai, aur sabse aakhri me Macrotasks (jaise setTimeout 0) run hote hain.",
    "codeSnippet": "setTimeout(() => console.log('Timeout'), 0);\nPromise.resolve().then(() => console.log('Promise'));\nprocess.nextTick(() => console.log('NextTick'));\n// Output: NextTick -> Promise -> Timeout",
    "tag": "Event Loop Trap"
  },
  {
    "id": "tricky-js-02",
    "domain": "JavaScript & V8 Internals",
    "topic": "Scoping & Closures",
    "dimension": "Classic Trap",
    "question": "Why does for (var i=0; i<3; i++) setTimeout(()=>console.log(i), 0) print 3 three times, and how do you fix it?",
    "answerHinglish": "var function-scoped hota hai, isliye poore loop me ek single i variable share hota hai. Timer callback run hone tak loop complete ho chuka hota hai aur i ki value 3 ho jati hai. Fix: 'let' use karein jo har iteration ke liye ek alag block scope aur fresh binding banata hai.",
    "codeSnippet": "// Fix:\nfor (let i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 0); // 0, 1, 2\n}",
    "tag": "Closure Scoping"
  },
  {
    "id": "tricky-js-03",
    "domain": "JavaScript & V8 Internals",
    "topic": "FinTech Floating Point",
    "dimension": "FinTech Trap",
    "question": "Why does 0.1 + 0.2 === 0.3 evaluate to false, and how MUST currency amounts be handled in banking?",
    "answerHinglish": "JavaScript IEEE 754 64-bit binary floating-point use karta hai jisme 0.1 aur 0.2 base-2 binary fractions me exactly represent nahi ho sakte (0.30000000000000004). Banking me kabhi raw floats use na karein: hamesha paise/cents (integers) me compute karein ya BigInt/Decimal library use karein.",
    "codeSnippet": "// Banking Rule: 100.50 INR -> 10050 paise\nconst amountPaise = 10050n;\nconst taxPaise = 1809n;\nconst total = amountPaise + taxPaise;",
    "tag": "Currency IEEE 754"
  },
  {
    "id": "tricky-js-04",
    "domain": "JavaScript & V8 Internals",
    "topic": "this Binding",
    "dimension": "Trap",
    "question": "Why does an arrow function defined as an object method fail to access this.property?",
    "answerHinglish": "Arrow functions ke paas apna 'this' nahi hota; wo surrounding lexical scope se 'this' inherit karte hain. Object literal `{ ... }` koi lexical scope create nahi karta! Isliye arrow function me 'this' outer module/window ko point karta hai, object ko nahi.",
    "codeSnippet": "const bank = {\n  name: 'IDFC',\n  getName: () => this.name // undefined!\n};",
    "tag": "this Binding"
  },
  {
    "id": "tricky-js-05",
    "domain": "JavaScript & V8 Internals",
    "topic": "Type Coercion",
    "dimension": "Code Output Puzzle",
    "question": "What does [] == ![] evaluate to in JavaScript, and why?",
    "answerHinglish": "Evaluates to true! Step 1: ![] converts to boolean false. Step 2: [] == false. Step 3: Boolean converts to number: [] == 0. Step 4: Array converts to primitive string \"\": \"\" == 0. Step 5: \"\" converts to number: 0 == 0 -> true!",
    "codeSnippet": "console.log([] == ![]); // true\nconsole.log([] + []);   // \"\"\nconsole.log([] + {});   // \"[object Object]\"",
    "tag": "Type Coercion"
  },
  {
    "id": "tricky-js-06",
    "domain": "JavaScript & V8 Internals",
    "topic": "Security & Prototypes",
    "dimension": "Security",
    "question": "Why is Object.create(null) preferred over {} for high-security in-memory hash maps in banking?",
    "answerHinglish": "`{}` Object.prototype se properties (like toString, hasOwnProperty) inherit karta hai, jisse Prototype Pollution attacks ka risk rehta hai. `Object.create(null)` ka koi prototype chain nahi hota (`__proto__ === undefined`), isliye ye 100% clean key-value lookup guarantee karta hai.",
    "codeSnippet": "const safeMap = Object.create(null);\nconsole.log('toString' in safeMap); // false!",
    "tag": "Prototype Pollution"
  },
  {
    "id": "tricky-js-07",
    "domain": "JavaScript & V8 Internals",
    "topic": "Promise Concurrency",
    "dimension": "Comparison",
    "question": "When should you choose Promise.allSettled over Promise.all in banking workflows?",
    "answerHinglish": "Promise.all 'Fail-Fast' hota hai (koi ek bhi reject hua toh turant abort kar deta hai). EOD statements ya bulk notification batch processing me agar 1 account fail ho toh baaki 9,999 ko process hona chahiye; iske liye Promise.allSettled use karte hain kyunki ye kabhi reject nahi hota aur sabka status deta hai.",
    "codeSnippet": "const results = await Promise.allSettled(userPromises);\nconst failed = results.filter(r => r.status === 'rejected');",
    "tag": "Promise Patterns"
  },
  {
    "id": "tricky-js-08",
    "domain": "JavaScript & V8 Internals",
    "topic": "V8 Optimization",
    "dimension": "V8 Internals",
    "question": "How do inconsistent property insertion orders de-optimize V8 Hidden Classes into slow dictionary mode?",
    "answerHinglish": "V8 dynamic objects ke liye internal Hidden Classes (Shapes) banata hai. Agar do objects me same properties alag-alag order me add ki jayein, toh V8 alag transition tree banata hai aur inline caches (IC) fail ho jate hain. Object slow hash-table dictionary mode me chala jata hai.",
    "codeSnippet": "// Always initialize all fields in the constructor in identical order:\nclass Account {\n  constructor(id, pan = null) {\n    this.id = id;\n    this.pan = pan;\n  }\n}",
    "tag": "V8 Hidden Classes"
  },
  {
    "id": "tricky-js-09",
    "domain": "JavaScript & V8 Internals",
    "topic": "Async Rate Limiting",
    "dimension": "Implementation",
    "question": "What is the core architectural difference between Debounce and Throttle?",
    "answerHinglish": "Debounce events ke shant hone ka wait karta hai (user typing stop kare tab 300ms baad call ho - IFSC search). Throttle guaranteed interval rate enforce karta hai (user chahe 100 baar click kare, function har 2 second me max 1 baar hi execute hoga - Payment submit button).",
    "codeSnippet": "// Debounce: waits for idle period\n// Throttle: caps execution frequency",
    "tag": "Debounce vs Throttle"
  },
  {
    "id": "tricky-js-10",
    "domain": "JavaScript & V8 Internals",
    "topic": "Deep Cloning",
    "dimension": "Trap",
    "question": "What are the 3 major pitfalls of using JSON.parse(JSON.stringify(obj)) for deep copying?",
    "answerHinglish": "1) Date objects ko ISO strings me convert kar deta hai (Date instance lost). 2) undefined, Function, aur Symbol properties ko silently drop kar deta hai. 3) Circular references par TypeError throw karke crash ho jata hai. Modern fix: structuredClone(obj) use karein.",
    "codeSnippet": "const deepCopy = structuredClone(accountObject);",
    "tag": "Deep Clone"
  },

  # --- Python Tricky Questions (11-20) ---
  {
    "id": "tricky-py-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Internals",
    "dimension": "Memory Trap",
    "question": "Why does a = 256; b = 256; a is b return True, but x = 257; y = 257; x is y return False in REPL?",
    "answerHinglish": "CPython startup par -5 se 256 tak ke small integers ka array pre-allocate kar leta hai. Is range ke integers hamesha same memory object share karte hain. 257 cache range se bahar hai, isliye heap par do alag PyObject allocate hote hain. Hamesha value ke liye '==' use karein!",
    "codeSnippet": "a = 256; b = 256\nprint(a is b) # True (Cached)\nx = 257; y = 257\nprint(x is y) # False in REPL",
    "tag": "Small Int Cache"
  },
  {
    "id": "tricky-py-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Functions",
    "dimension": "Classic Trap",
    "question": "What is the Mutable Default Argument trap, and what does def f(val, acc=[]) do internally?",
    "answerHinglish": "Default arguments function definition time par sirf ek baar evaluate hote hain aur function object ke `__defaults__` attribute me store ho jate hain. Subsequent calls bina argument ke usi same list ko mutate karti rehti hain. Fix: Sentinel pattern `acc=None` use karein.",
    "codeSnippet": "# Fix:\ndef f(val, acc=None):\n    if acc is None:\n        acc = []\n    acc.append(val)\n    return acc",
    "tag": "Default Arg Trap"
  },
  {
    "id": "tricky-py-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Closures",
    "dimension": "Code Output Puzzle",
    "question": "What does [lambda x: x*i for i in range(4)] return when each function is called with 2, and why?",
    "answerHinglish": "Returns [6, 6, 6, 6]! Python closures late-binding hoti hain; 'i' ki value call time par dekhi jati hai, definition time par nahi. Loop khatam hone par i=3 hota hai, isliye sabhi 2*3=6 compute karte hain. Fix: default argument freeze `lambda x, i=i: x*i` use karein.",
    "codeSnippet": "# Fix:\nfuncs = [lambda x, i=i: x * i for i in range(4)]\nprint([f(2) for f in funcs]) # [0, 2, 4, 6]",
    "tag": "Late Binding Closures"
  },
  {
    "id": "tricky-py-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Bytecode",
    "dimension": "Brain Teaser",
    "question": "What happens when t = ([1, 2], 3); t[0] += [4, 5] is executed?",
    "answerHinglish": "TypeError raise hota hai AND list mutate ho jati hai! `+=` internally `__iadd__` call karke heap par list ko in-place extend kar deta hai ([1, 2, 4, 5]). Uske baad bytecode STORE_SUBSCR tuple me assignment try karta hai jo immutable hone ke kaaran TypeError throw karta hai.",
    "codeSnippet": "t = ([1, 2], 3)\ntry:\n    t[0] += [4, 5]\nexcept TypeError:\n    pass\nprint(t) # ([1, 2, 4, 5], 3)!",
    "tag": "Tuple Mutation Trap"
  },
  {
    "id": "tricky-py-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Concurrency",
    "dimension": "GIL Internals",
    "question": "Does NumPy matrix computation release the Python GIL?",
    "answerHinglish": "Yes! NumPy, Pandas C-extensions, aur SciPy heavy array/matrix mathematical operations execute karte waqt GIL release kar dete hain. Isliye NumPy C-level threads me multiple CPU cores par parallelly execute ho sakta hai, jabki pure Python loops 1 core par limit rehte hain.",
    "codeSnippet": "# NumPy releases GIL during heavy C-array calculations\nresult = np.dot(matrix_a, matrix_b)",
    "tag": "GIL & NumPy"
  },
  {
    "id": "tricky-py-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Python OOP",
    "dimension": "MRO & Super",
    "question": "In Python multiple inheritance Diamond Problem, how does super() prevent parent methods from being called twice?",
    "answerHinglish": "super() direct parent ko call nahi karta balki C3 Linearization algorithm se bani class ki MRO (Method Resolution Order) list me agle class ko call karta hai. Is tarah diamond apex class poore hierarchy me sirf ek baar run hoti hai.",
    "codeSnippet": "class D(B, C): pass\nprint([cls.__name__ for cls in D.mro()])\n# ['D', 'B', 'C', 'A', 'object']",
    "tag": "MRO Diamond Problem"
  },
  {
    "id": "tricky-py-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Memory",
    "dimension": "Optimization",
    "question": "How does __slots__ save 50%+ memory in classes handling millions of transaction objects?",
    "answerHinglish": "Standard Python class har instance ke liye dynamic `__dict__` allocate karti hai (~150-200 bytes per object). `__slots__ = ('id', 'amt')` declare karne se Python per-instance dict eliminate kar deta hai aur fixed C-style pointer struct banata hai, reducing RAM by 40-60%.",
    "codeSnippet": "class FastTxn:\n    __slots__ = ('id', 'amount')\n    def __init__(self, id, amt):\n        self.id = id\n        self.amount = amt",
    "tag": "Slots Optimization"
  },
  {
    "id": "tricky-py-08",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Context Managers",
    "dimension": "Exception Handling",
    "question": "How does a context manager's __exit__ method suppress an exception?",
    "answerHinglish": "Agar `__exit__(self, exc_type, exc_val, exc_tb)` method explicitly `True` return kare, toh Python with-block ke andar hui exception ko suppress kar deta hai aur program normally continue hota hai. Agar False ya None return kare, toh exception re-raise ho jati hai.",
    "codeSnippet": "def __exit__(self, exc_type, exc_val, exc_tb):\n    if issubclass(exc_type, TransientError):\n        return True # Suppress!\n    return False # Re-raise fatal",
    "tag": "Context Managers"
  },
  {
    "id": "tricky-py-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Operators",
    "dimension": "Brain Teaser",
    "question": "Why does False == False in [False] print True in Python?",
    "answerHinglish": "Python me comparisons chain hoti hain jaise `a < b < c` -> `(a < b) and (b < c)`. Isliye `False == False in [False]` internally expand hota hai: `(False == False) and (False in [False])`. Both evaluate to True, so result is True!",
    "codeSnippet": "print(False == False in [False]) # True!",
    "tag": "Chained Comparisons"
  },
  {
    "id": "tricky-py-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Python Flow Control",
    "dimension": "Control Flow Trap",
    "question": "What does a function return if both try and finally blocks have explicit return statements?",
    "answerHinglish": "Finally block ka return statement hamesha try block ke return statement ko silently overwrite kar deta hai! Finally block function stack frame exit hone se pehle execute hota hai, isliye uska return value jeet jata hai.",
    "codeSnippet": "def f():\n    try:\n        return 100\n    finally:\n        return 200\nprint(f()) # 200",
    "tag": "Finally Return Override"
  },

  # --- SQL & DBMS Tricky Questions (21-30) ---
  {
    "id": "tricky-sql-01",
    "domain": "SQL & Advanced DBMS",
    "topic": "SQL Three-Valued Logic",
    "dimension": "Catastrophic Trap",
    "question": "Why does SELECT * FROM accounts WHERE id NOT IN (SELECT id FROM frozen) return 0 rows if frozen has even a single NULL?",
    "answerHinglish": "SQL 3-valued logic (TRUE, FALSE, UNKNOWN) follow karta hai. `x NOT IN (1, 2, NULL)` expand hota hai: `(x <> 1) AND (x <> 2) AND (x <> NULL)`. SQL me `x <> NULL` hamesha UNKNOWN hota hai. Poora expression UNKNOWN ban jata hai aur saari rows filter ho jati hain. Hamesha NOT EXISTS use karein!",
    "codeSnippet": "-- FIX:\nSELECT * FROM accounts a\nWHERE NOT EXISTS (\n  SELECT 1 FROM frozen f WHERE f.id = a.id\n);",
    "tag": "NOT IN NULL Trap"
  },
  {
    "id": "tricky-sql-02",
    "domain": "SQL & Advanced DBMS",
    "topic": "Concurrency & Locking",
    "dimension": "FinTech Solution",
    "question": "How do you prevent double-spending in a high-concurrency bank balance debit without explicit transactions?",
    "answerHinglish": "Atomic in-place conditional decrement use karein: `UPDATE accounts SET balance = balance - :amt WHERE id = :id AND balance >= :amt;`. Backend me check karein rowCount: agar 1 hai toh success, agar 0 hai toh insufficient balance.",
    "codeSnippet": "UPDATE accounts\nSET balance = balance - 500\nWHERE id = 'ACC-101' AND balance >= 500;",
    "tag": "Atomic Decrement"
  },
  {
    "id": "tricky-sql-03",
    "domain": "SQL & Advanced DBMS",
    "topic": "Deadlock Prevention",
    "dimension": "FinTech Architecture",
    "question": "How do you guarantee zero deadlocks when transferring funds between two arbitrary accounts concurrently?",
    "answerHinglish": "Deterministic Lock Ordering enforce karein: chahe transfer A to B ho ya B to A, locks hamesha sorted account_id order me acquire karein (`first, second = sorted([acc_a, acc_b])`). Isse cycle in wait-for graph kabhi ban hi nahi sakti.",
    "codeSnippet": "-- Lock lower ID first, then higher ID:\nSELECT * FROM accounts WHERE id = :lower_id FOR UPDATE;\nSELECT * FROM accounts WHERE id = :higher_id FOR UPDATE;",
    "tag": "Deadlock Prevention"
  },
  {
    "id": "tricky-sql-04",
    "domain": "SQL & Advanced DBMS",
    "topic": "Window Frames",
    "dimension": "FinTech Passbook Bug",
    "question": "Why does default SUM(amt) OVER (ORDER BY date) produce buggy running balances when transactions have duplicate timestamps?",
    "answerHinglish": "ORDER BY ke sath default frame specification `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW` hoti hai. RANGE identical timestamp wale rows (peers) ko combine karke duplicate dates par same aggregate total dikhata hai. True passbook running balance ke liye explicit `ROWS` frame specify karna compulsory hai.",
    "codeSnippet": "SUM(amount) OVER (\n  PARTITION BY account_id \n  ORDER BY txn_date, txn_id \n  ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n)",
    "tag": "Window Frame ROWS vs RANGE"
  },
  {
    "id": "tricky-sql-05",
    "domain": "SQL & Advanced DBMS",
    "topic": "Ranking Functions",
    "dimension": "Comparison",
    "question": "Why is DENSE_RANK() preferred over LIMIT 1 OFFSET 1 to find the second highest balance?",
    "answerHinglish": "Agar top 2 accounts ka balance exactly same ho (tie: ₹10,00,000 each), toh `LIMIT 1 OFFSET 1` dusre tied account ko hi return kar dega (still ₹10L). `DENSE_RANK()` tied rows ko same rank 1 deta hai aur strictly next unique balance tier ko rank 2 assign karta hai.",
    "codeSnippet": "WITH R AS (\n  SELECT balance, DENSE_RANK() OVER (ORDER BY balance DESC) as rk\n  FROM accounts\n)\nSELECT balance FROM R WHERE rk = 2;",
    "tag": "Ranking Functions"
  },
  {
    "id": "tricky-sql-06",
    "domain": "SQL & Advanced DBMS",
    "topic": "Hierarchical Data",
    "dimension": "FinTech Fraud Detection",
    "question": "How do you trace multi-hop circular money laundering mule account chains using SQL?",
    "answerHinglish": "Recursive Common Table Expression (CTE) use karein with an Anchor Member (starting transfer) and a Recursive Member (subsequent hops). Cycle detection ke liye visited account IDs ka array track karein (`WHERE NOT (to_account = ANY(path))`).",
    "codeSnippet": "WITH RECURSIVE MuleChain AS (\n  SELECT from_acc, to_acc, 1 as hop, ARRAY[from_acc, to_acc] as path\n  FROM txns WHERE from_acc = 101\n  UNION ALL\n  SELECT t.from_acc, t.to_acc, mc.hop + 1, path || t.to_acc\n  FROM txns t JOIN MuleChain mc ON t.from_acc = mc.to_acc\n  WHERE NOT (t.to_acc = ANY(mc.path)) AND mc.hop < 10\n)",
    "tag": "Recursive CTE"
  },
  {
    "id": "tricky-sql-07",
    "domain": "SQL & Advanced DBMS",
    "topic": "B+ Tree Indexing",
    "dimension": "Optimization",
    "question": "If an index exists on (branch, txn_date, amount), why does WHERE txn_date = '2026-03-01' cause a Full Table Scan?",
    "answerHinglish": "Leftmost Prefix Rule ke mutabiq! Composite B+ Tree index leading column (branch) ke hisaab se pehle sorted hota hai, fir txn_date ke hisaab se. Ye phonebook jaisa hai: bina Last Name ke aap First Name se binary search nahi kar sakte.",
    "codeSnippet": "-- Uses Index:\nWHERE branch = 'B01' AND txn_date = '2026-03-01'\n-- Full Table Scan:\nWHERE txn_date = '2026-03-01'",
    "tag": "Leftmost Prefix Rule"
  },
  {
    "id": "tricky-sql-08",
    "domain": "SQL & Advanced DBMS",
    "topic": "B+ Tree Indexing",
    "dimension": "Covering Index",
    "question": "What is the purpose of the INCLUDE clause in PostgreSQL CREATE INDEX?",
    "answerHinglish": "Payload non-key columns ko B+ Tree leaf pages me store karta hai bina unhe index search key me include kiye. Isse index size chota rehta hai aur queries bina table heap ko touch kiye 'Index-Only Scan' execute kar sakti hain.",
    "codeSnippet": "CREATE INDEX idx_cov ON txns(account_id, txn_date) \nINCLUDE (amount, status);",
    "tag": "Covering Index"
  },
  {
    "id": "tricky-sql-09",
    "domain": "SQL & Advanced DBMS",
    "topic": "Gaps and Islands",
    "dimension": "Advanced Analytics",
    "question": "How do you detect consecutive days of customer transaction activity (streak analysis)?",
    "answerHinglish": "ROW_NUMBER() trick use karein: `(txn_date - ROW_NUMBER() * INTERVAL '1 day')`. Consecutive dates ke liye ye difference CONSTANT rehta hai, jo islands (streaks) ko ek unique group identifier provide karta hai jise GROUP BY kiya ja sakta hai.",
    "codeSnippet": "SELECT customer_id, MIN(act_date), MAX(act_date), COUNT(*)\nFROM (\n  SELECT customer_id, act_date,\n         act_date - (ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY act_date) * INTERVAL '1 day') as grp\n  FROM user_active_days\n)\nGROUP BY customer_id, grp HAVING COUNT(*) >= 3;",
    "tag": "Gaps and Islands"
  },
  {
    "id": "tricky-sql-10",
    "domain": "SQL & Advanced DBMS",
    "topic": "Aggregations & NULLs",
    "dimension": "Trap",
    "question": "What does SELECT SUM(amount) FROM txns WHERE 1=0 return, and why does it break financial code?",
    "answerHinglish": "Returns NULL, NOT 0! JavaScript ya Python backend me `null + 500` null ya TypeError create karta hai. Production banking rule: Aggregate functions ko hamesha `COALESCE(SUM(amount), 0)` se wrap karein.",
    "codeSnippet": "-- Correct Banking Query:\nSELECT COALESCE(SUM(amount), 0) AS total_settled \nFROM settlements \nWHERE status = 'SUCCESS';",
    "tag": "COALESCE Aggregation"
  }
]

TRICKY_QUIZ_QUESTIONS = [
  # --- JavaScript (5) ---
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

  # --- Python (5) ---
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

  # --- SQL & DBMS (5) ---
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
  }
]

TOPICS_TO_ADD = [
  {
    "id": "top-tricky-javascript",
    "title": "JavaScript Core Internals: Event Loop, Closures, this & Coercion Traps",
    "tier": "Must Know",
    "tierColor": "rose",
    "category": "JavaScript & V8 Internals",
    "studyTimeMinutes": 45,
    "interviewFrequency": "Every Full-Stack / Node.js Round",
    "lessonDocId": "03-javascript-tricky-js",
    "summary": "Deep dive into microtask vs macrotask execution order (process.nextTick, Promise.then, queueMicrotask), var loop closure traps, this binding rules, IEEE 754 floating point currency bugs (0.1 + 0.2), and V8 Hidden Class de-optimizations.",
    "keyQuestions": [
      "What is the exact console execution order between process.nextTick, Promise.resolve, setTimeout(0), and queueMicrotask?",
      "Why does 0.1 + 0.2 !== 0.3, and how MUST currency amounts be computed in production banking APIs?",
      "How do inconsistent property insertion orders de-optimize V8 engine Hidden Classes into slow dictionary mode?"
    ],
    "bankingRelevance": "Critical for writing non-blocking payment webhook handlers, race-condition-free event listeners, and accurate financial calculations."
  },
  {
    "id": "top-tricky-python",
    "title": "Python Internals: GIL, Memory Caching, MRO & Bytecode Gotchas",
    "tier": "Must Know",
    "tierColor": "rose",
    "category": "Python & Data Ecosystem",
    "studyTimeMinutes": 45,
    "interviewFrequency": "Every Python / Data Round",
    "lessonDocId": "01-python-tricky-python",
    "summary": "Mastering CPython internals: Small integer caching (-5 to 256), mutable default argument evaluation time, late-binding closures in lambdas, the tuple mutation mystery (STORE_SUBSCR vs INPLACE_ADD), C3 MRO in diamond inheritance, and __slots__ RAM optimization.",
    "keyQuestions": [
      "Why does t[0] += [4, 5] raise a TypeError AND mutate the list inside the tuple?",
      "Why does def func(val, acc=[]) accumulate data across independent function calls, and what is the bytecode root cause?",
      "Does NumPy release the Python GIL during heavy array and matrix mathematical operations?"
    ],
    "bankingRelevance": "Prevents memory leaks in high-frequency batch ledger engines and ensures thread-safe data pipelines."
  },
  {
    "id": "top-tricky-sql",
    "title": "Advanced SQL: Concurrency Locks, 3VL, Recursive CTEs & Window Frames",
    "tier": "Must Know",
    "tierColor": "rose",
    "category": "SQL & Advanced DBMS",
    "studyTimeMinutes": 50,
    "interviewFrequency": "Every Senior Backend Round",
    "lessonDocId": "05-sql-dbms-tricky-sql",
    "summary": "Mastering Three-Valued Logic (NOT IN with NULL disaster), atomic balance decrements vs SELECT FOR UPDATE, deterministic lock ordering for deadlock prevention, ROWS vs RANGE window frames for passbook running totals, and Recursive CTEs for tracing fraud mule accounts.",
    "keyQuestions": [
      "Why does WHERE id NOT IN (SELECT id FROM t) return ZERO rows if table t contains even a single NULL value?",
      "How do you mathematically guarantee zero deadlocks when transferring funds between two arbitrary bank accounts simultaneously?",
      "What is the critical behavioral difference between default RANGE and explicit ROWS in window function running balances?"
    ],
    "bankingRelevance": "Absolute prerequisite for core ledger balance integrity, transaction ACID guarantees, and AML fraud detection."
  }
]

def update_flashcards():
    fc_path = "frontend/src/data/flashcardsData.js"
    with open(fc_path, "r", encoding="utf-8") as f:
        text = f.read()

    # Check if already added
    if "tricky-js-01" in text:
        print("Tricky flashcards already present in flashcardsData.js")
        return

    start_match = re.search(r'export const FLASHCARDS_DATA = \[\s*', text)
    if not start_match:
        print("Could not find FLASHCARDS_DATA in flashcardsData.js")
        return

    start_pos = start_match.end()
    cards_json = json.dumps(TRICKY_FLASHCARDS, indent=2)[1:-1].strip() + ",\n  "
    new_text = text[:start_pos] + "\n  " + cards_json + text[start_pos:]

    total_cards = len(re.findall(r'\"id\":\s*\"[^\"]+\"', new_text)) + len(re.findall(r'id:\s*\"[^\"]+\"', new_text))
    new_text = re.sub(r'export const FLASHCARDS_COUNT = \d+;', f'export const FLASHCARDS_COUNT = {total_cards};', new_text)

    with open(fc_path, "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"✓ Added {len(TRICKY_FLASHCARDS)} tricky flashcards to {fc_path} (Total: {total_cards})")

def update_quiz():
    quiz_path = "frontend/src/data/quizData.js"
    with open(quiz_path, "r", encoding="utf-8") as f:
        text = f.read()

    if "tricky-quiz-js-01" in text:
        print("Tricky quiz questions already present in quizData.js")
        return

    start_match = re.search(r'export const DIAGNOSTIC_QUESTIONS = \[\s*', text)
    if not start_match:
        print("Could not find DIAGNOSTIC_QUESTIONS in quizData.js")
        return

    start_pos = start_match.end()
    quiz_json = json.dumps(TRICKY_QUIZ_QUESTIONS, indent=2)[1:-1].strip() + ",\n  "
    new_text = text[:start_pos] + "\n  " + quiz_json + text[start_pos:]

    with open(quiz_path, "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"✓ Added {len(TRICKY_QUIZ_QUESTIONS)} tricky quiz questions to {quiz_path}")

def update_important_topics():
    topics_path = "frontend/src/data/importantTopicsData.js"
    with open(topics_path, "r", encoding="utf-8") as f:
        text = f.read()

    added = 0
    for topic in TOPICS_TO_ADD:
        if topic["id"] not in text:
            # Insert into TIER 1: MUST KNOW
            t1_match = re.search(r'(\/\/ \-+[\r\n]+\s*\/\/ TIER 1: MUST KNOW[^\r\n]*[\r\n]+\s*\/\/ \-+[\r\n]+)', text)
            if t1_match:
                insert_pos = t1_match.end()
                item_json = json.dumps(topic, indent=2) + ",\n  "
                text = text[:insert_pos] + "  " + item_json + text[insert_pos:]
                added += 1

    with open(topics_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"✓ Added {added} Must-Know tricky topics to {topics_path}")

if __name__ == "__main__":
    update_flashcards()
    update_quiz()
    update_important_topics()
    print("\nTricky questions data integration complete!")
