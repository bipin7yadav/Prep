/* Master Curated Multi-Dimensional Flashcards for IDFC FIRST Bank (200+ Cards) */

export const FLASHCARDS_COUNT = 296;

export const FLASHCARDS_DATA = [
  
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
    "answerHinglish": "Agar top 2 accounts ka balance exactly same ho (tie: \u20b910,00,000 each), toh `LIMIT 1 OFFSET 1` dusre tied account ko hi return kar dega (still \u20b910L). `DENSE_RANK()` tied rows ko same rank 1 deta hai aur strictly next unique balance tier ko rank 2 assign karta hai.",
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
  },
  {
    "id": "pandas-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Fundamentals",
    "dimension": "Concept",
    "question": "What is the structural difference between a pandas Series and a DataFrame?",
    "answerHinglish": "Series 1-dimensional labeled array hai jisme single column aur explicit row labels (index) hote hain. DataFrame ek 2-dimensional labeled tabular data structure hai jo multiple Series ko ek common index ke under share karti hai.",
    "codeSnippet": "s = pd.Series([100, 200], index=['a', 'b'])\ndf = pd.DataFrame({'amt': s, 'tax': s * 0.18})",
    "tag": "Pandas Architecture"
  },
  {
    "id": "pandas-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Internals",
    "dimension": "OOP / Rule",
    "question": "Why do some pandas commands end with parentheses () while others do not?",
    "answerHinglish": "Attributes (jaise df.shape, df.dtypes, df.columns) DataFrame ki already computed state/properties hoti hain, isliye parentheses nahi hote. Methods (jaise df.head(), df.describe(), df.mean()) action verbs hote hain jo computation ya transformation execute karte hain, isliye parentheses compulsory hote hain.",
    "codeSnippet": "print(df.shape)    # Attribute (No parentheses)\nprint(df.describe()) # Method (Requires parentheses)",
    "tag": "Pandas OOP"
  },
  {
    "id": "pandas-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Ingestion",
    "dimension": "Syntax",
    "question": "How do you read a pipe-delimited file without headers and assign custom column names during ingestion?",
    "answerHinglish": "pd.read_csv() me sep='|', header=None, aur names=['col1', 'col2'] pass karein. Isse pandas pehli data row ko header samajhne ki galti nahi karega aur custom column labels assign kar dega.",
    "codeSnippet": "cols = ['user_id', 'age', 'gender', 'zip']\ndf = pd.read_csv('data.txt', sep='|', header=None, names=cols)",
    "tag": "Data Ingestion"
  },
  {
    "id": "pandas-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Ingestion",
    "dimension": "Optimization",
    "question": "How do you read only specific columns and top N rows from a multi-gigabyte CSV into memory?",
    "answerHinglish": "usecols parameter me required columns ki list aur nrows parameter me desired row count pass karein. Pandas unused columns aur trailing rows ko disk se parse hi nahi karega, jisse 90%+ RAM aur time save hota hai.",
    "codeSnippet": "df = pd.read_csv('huge_ledger.csv', usecols=['txn_id', 'amount'], nrows=10000)",
    "tag": "Ingestion Optimization"
  },
  {
    "id": "pandas-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Schema Evolution",
    "dimension": "Syntax",
    "question": "What is the recommended immutable way to rename specific columns in a DataFrame?",
    "answerHinglish": "df.rename(columns={'old_name': 'new_name'}) use karein. Ye selectively sirf specified columns ko rename karta hai aur bina original schema ko mutate kiye naya DataFrame return karta hai.",
    "codeSnippet": "df_renamed = df.rename(columns={'cust_vpa': 'upi_handle', 'amt': 'amount'})",
    "tag": "Schema Evolution"
  },
  {
    "id": "pandas-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Schema Evolution",
    "dimension": "Syntax",
    "question": "How do you replace spaces with underscores across all column names in a single vectorized step?",
    "answerHinglish": "df.columns index object par .str.replace(' ', '_') execute karein: df.columns = df.columns.str.replace(' ', '_'). Ye bina kisi Python loop ke pure column index ko transform kar deta hai.",
    "codeSnippet": "df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')",
    "tag": "Column Sanitation"
  },
  {
    "id": "pandas-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Axis Mechanics",
    "dimension": "Mental Model",
    "question": "What is the exact behavioral difference between axis=0 and axis=1 in pandas operations?",
    "answerHinglish": "axis=0 (or 'index') vertically rows ke along move karta hai aur saari rows ko collapse karke har column ka single aggregate deta hai. axis=1 (or 'columns') horizontally columns ke along move karta hai aur har individual row ke liye single aggregate compute karta hai.",
    "codeSnippet": "df.mean(axis=0) # 1 mean per column (across all rows)\ndf.mean(axis=1) # 1 mean per row (across all columns)",
    "tag": "Axis Invariant"
  },
  {
    "id": "pandas-08",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Trap",
    "question": "Why does df.drop('column_name') throw a KeyError by default, and how do you fix it?",
    "answerHinglish": "Kyunki df.drop() me axis default 0 (rows) hota hai! Pandas 'column_name' label ki row search karta hai jo milti nahi hai. Fix: Explicitly axis=1 ya columns='column_name' pass karein.",
    "codeSnippet": "# Fix:\ndf.drop('column_name', axis=1)\n# Modern alternative:\ndf.drop(columns=['column_name'])",
    "tag": "Axis Trap"
  },
  {
    "id": "pandas-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Sorting",
    "dimension": "Syntax",
    "question": "How do you sort a banking ledger by Branch ascending and Transaction Amount descending?",
    "answerHinglish": "df.sort_values(by=['branch', 'amount'], ascending=[True, False]) use karein. Multiple columns aur corresponding boolean flags ki lists pass karke multi-level hierarchical sort hota hai.",
    "codeSnippet": "df_sorted = df.sort_values(by=['branch_code', 'amount'], ascending=[True, False])",
    "tag": "Sorting"
  },
  {
    "id": "pandas-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Debugging",
    "question": "Why does df[df.amount > 5000 and df.status == 'SUCCESS'] fail in Python, and how do you fix it?",
    "answerHinglish": "Python ka 'and' pure Series object ki single truth value evaluate karne ki koshish karta hai, jisse ValueError: The truth value of a Series is ambiguous crash hota hai. Fix: Hamesha bitwise & operator use karo aur har individual condition ko parentheses (...) me wrap karo.",
    "codeSnippet": "# Fix:\ndf[(df['amount'] > 5000) & (df['status'] == 'SUCCESS')]",
    "tag": "Boolean Filtering"
  },
  {
    "id": "pandas-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Filtering",
    "dimension": "Syntax",
    "question": "How do you filter a DataFrame for rows where status is either SUCCESS, PENDING, or SETTLED without chaining | operators?",
    "answerHinglish": "Series method .isin(['SUCCESS', 'PENDING', 'SETTLED']) use karein: df[df['status'].isin(['SUCCESS', 'PENDING', 'SETTLED'])]. Ye cleaner, faster aur maintainable hota hai.",
    "codeSnippet": "allowed = ['SUCCESS', 'PENDING', 'SETTLED']\nclean_df = df[df['status'].isin(allowed)]",
    "tag": "Boolean Indexing"
  },
  {
    "id": "pandas-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Performance",
    "dimension": "Anti-Pattern",
    "question": "Why is for index, row in df.iterrows(): considered a severe anti-pattern in production pipelines?",
    "answerHinglish": "iterrows() har single row ke liye ek naya pandas Series object instantiate karta hai aur type conversion overhead create karta hai. Ye C-level vectorization bypass karta hai aur 100x se 1000x slow hota hai. Vectorized operations ya .apply() ya list comprehensions use karein.",
    "codeSnippet": "# BAD: 10,000 ms\nfor idx, row in df.iterrows():\n    total += row['amt']\n\n# GOOD: 2 ms (Vectorized)\ntotal = df['amt'].sum()",
    "tag": "Performance Traps"
  },
  {
    "id": "pandas-13",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Strings",
    "dimension": "Syntax",
    "question": "How do you extract domain handles from email VPAs using the .str accessor without loops?",
    "answerHinglish": ".str.split('@').str[1] use karein. Pehla .str.split('@') har string ko list of tokens me todta hai, aur dusra .str[1] vectorized tareeqe se har list ka 1st index (domain handle) project karta hai.",
    "codeSnippet": "df['psp'] = df['vpa'].str.split('@').str[1]\n# 'user@okhdfcbank' -> 'okhdfcbank'",
    "tag": "Vectorized Strings"
  },
  {
    "id": "pandas-14",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Strings",
    "dimension": "Syntax",
    "question": "How do you perform a case-insensitive substring search across transaction narration text?",
    "answerHinglish": "df['narration'].str.contains('SALARY|NEFT', case=False, na=False) use karein. case=False case-sensitivity ignore karta hai aur na=False missing NaN values ko silently False treat karta hai.",
    "codeSnippet": "salary_txns = df[df['narration'].str.contains('salary', case=False, na=False)]",
    "tag": "Vectorized Strings"
  },
  {
    "id": "pandas-15",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Data Types",
    "dimension": "Data Cleaning",
    "question": "How do you clean and cast a currency column containing symbols like \u20b9 or $ and commas into numeric floats?",
    "answerHinglish": "Pehle .str.replace() se currency symbols aur commas remove karein, fir .astype(float) ya pd.to_numeric() me cast karein.",
    "codeSnippet": "df['clean_amt'] = df['amount'].str.replace('\u20b9', '').str.replace(',', '').astype(float)",
    "tag": "Data Cleaning"
  },
  {
    "id": "pandas-16",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Data Types",
    "dimension": "Robustness",
    "question": "What does pd.to_numeric(df['amt'], errors='coerce') do when encountering dirty string entries like 'N/A' or 'CORRUPT'?",
    "answerHinglish": "errors='coerce' unparseable dirty strings ko exception throw kiye bina NaN (Not a Number) me convert kar deta hai. Iske baad aap .fillna() ya .dropna() se missing records ko cleanly handle kar sakte hain.",
    "codeSnippet": "df['clean_amount'] = pd.to_numeric(df['raw_col'], errors='coerce')\ndf['clean_amount'].fillna(0.0, inplace=True)",
    "tag": "Type Coercion"
  },
  {
    "id": "pandas-17",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Exploration",
    "dimension": "Syntax",
    "question": "How do you compute relative percentage frequencies including missing values using value_counts()?",
    "answerHinglish": "normalize=True pass karne se absolute counts ke bajaye fractions (percentages) milti hain, aur dropna=False pass karne se missing NaN values bhi distribution me include hoti hain.",
    "codeSnippet": "print(df['kyc_status'].value_counts(normalize=True, dropna=False) * 100)",
    "tag": "Data Exploration"
  },
  {
    "id": "pandas-18",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Exploration",
    "dimension": "Syntax",
    "question": "How do you compute a 2-way frequency contingency table between Customer Segment and Default Status?",
    "answerHinglish": "pd.crosstab(df['segment'], df['defaulted'], margins=True) use karein. margins=True row aur column totals (All) bhi compute karke deta hai.",
    "codeSnippet": "ct = pd.crosstab(df['segment'], df['is_fraud'], margins=True, normalize='index')",
    "tag": "Contingency Table"
  },
  {
    "id": "pandas-19",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Missing Data",
    "dimension": "Syntax",
    "question": "How do you drop rows from a DataFrame ONLY IF both Account Number and Transaction ID are NaN?",
    "answerHinglish": "df.dropna(how='all', subset=['account_id', 'txn_id']) use karein. how='all' condition tabhi satisfy hogi jab subset ke saare columns simultaneously NaN honge.",
    "codeSnippet": "df_valid = df.dropna(how='all', subset=['account_id', 'txn_id'])",
    "tag": "Missing Data"
  },
  {
    "id": "pandas-20",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Missing Data",
    "dimension": "FinTech Scenario",
    "question": "Why is forward-filling (.ffill()) standard for financial NAV/stock prices while median imputation is used for transaction amounts?",
    "answerHinglish": "Financial market tick/NAV prices time-series continuity follow karte hain: agar weekend par price record nahi hua toh last traded price hi current valuation hoti hai (ffill). Lekin missing transaction amounts independent events hain jisme mean/median baseline preserve karta hai.",
    "codeSnippet": "df['nav_price'] = df['nav_price'].ffill()",
    "tag": "Time Series Imputation"
  },
  {
    "id": "pandas-21",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Indexing",
    "dimension": "Comparison",
    "question": "What is the crucial boundary difference between .loc and .iloc?",
    "answerHinglish": ".loc label-based selection hai aur iska stop boundary hamesha INCLUSIVE hota hai (e.g. 'a':'c' me 'c' include hoga). .iloc 0-indexed integer position-based hai aur iska stop boundary hamesha EXCLUSIVE hota hai (e.g. 0:3 me index 0, 1, 2 include honge, 3 nahi).",
    "codeSnippet": "df.loc['2026-01-01':'2026-01-05'] # Jan 5 is INCLUDED\ndf.iloc[0:5]                       # Row 5 is EXCLUDED",
    "tag": "Indexing"
  },
  {
    "id": "pandas-22",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Index Mechanics",
    "dimension": "Internals",
    "question": "What is automatic index alignment in pandas arithmetic operations?",
    "answerHinglish": "Jab aap do Series add karte hain (s1 + s2), pandas integer position match nahi karta balki row INDEX LABELS ko match karta hai. Agar koi label dono me present hai, toh values add hongi; agar koi label ek me present hai aur dusre me missing hai, toh result NaN ho jayega.",
    "codeSnippet": "s1 = pd.Series([10, 20], index=['A', 'B'])\ns2 = pd.Series([30, 40], index=['B', 'C'])\n# s1 + s2 -> A: NaN, B: 50.0, C: NaN",
    "tag": "Index Alignment"
  },
  {
    "id": "pandas-23",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Trap",
    "question": "What causes the SettingWithCopyWarning and what is the definitive production fix?",
    "answerHinglish": "Ye warning tab aati hai jab aap Chained Indexing karte hain (df[df.a > 0]['b'] = 10). Pandas guarantee nahi karta ki pehla slice View tha ya Copy; agar copy thi toh modification silently lost ho jayegi. Fix: Hamesha single-step .loc assignment use karein: df.loc[df.a > 0, 'b'] = 10.",
    "codeSnippet": "# Buggy:\ndf[df.amount > 10000]['flag'] = True\n# Fixed:\ndf.loc[df.amount > 10000, 'flag'] = True",
    "tag": "SettingWithCopyWarning"
  },
  {
    "id": "pandas-24",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Internals",
    "dimension": "Best Practice",
    "question": "Why is inplace=True considered a historical anti-pattern in modern pandas codebases?",
    "answerHinglish": "inplace=True memory allocation save nahi karta (pandas internally naya buffer allocate karta hai aur pointer swap karta hai). Iske alawa ye method chaining (.pipe().drop().sort()) ko break kar deta hai kyunki ye None return karta hai. Modern pandas me assignment pattern (df = df.dropna()) standard hai.",
    "codeSnippet": "# Discouraged:\ndf.dropna(inplace=True)\n# Modern Best Practice (Chainable):\ndf = df.dropna()",
    "tag": "Modern Pandas"
  },
  {
    "id": "pandas-25",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Indexing",
    "dimension": "Syntax",
    "question": "How do you reset a customized index back into regular columns while avoiding duplicate index columns?",
    "answerHinglish": "df.reset_index(drop=True) use karein agar aapko old index discard karna ho, ya df.reset_index() use karein agar old index ko regular column banakar retain karna ho.",
    "codeSnippet": "df_clean = df.reset_index(drop=True)",
    "tag": "Index Mechanics"
  },
  {
    "id": "pandas-26",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Optimization",
    "question": "How does the category dtype reduce pandas DataFrame memory by 80%+ in large financial ledgers?",
    "answerHinglish": "Standard object dtype me har string value ke liye 8-byte pointer aur heap object allocate hota hai. category dtype repetitive string values ko internally small integers (e.g. uint8, 1 byte) me encode karta hai jo ek single unique string lookup array ko point karte hain. High-repetition columns (like SUCCESS, FAILED) me RAM 80-90% drop ho jati hai.",
    "codeSnippet": "df['status'] = df['status'].astype('category')\nprint(df.info(memory_usage='deep'))",
    "tag": "Memory Optimization"
  },
  {
    "id": "pandas-27",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Inspection",
    "question": "Why does df.info() underestimate DataFrame memory usage unless memory_usage='deep' is specified?",
    "answerHinglish": "By default df.info() sirf pointers aur fixed-size C structs ki shallow memory calculate karta hai. String object dtype ke heap allocations (actual text characters) inspect nahi hote. memory_usage='deep' pass karne se pandas pure heap memory tree ko traverse karke true memory footprint calculate karta hai.",
    "codeSnippet": "df.info(memory_usage='deep')",
    "tag": "Memory Profiling"
  },
  {
    "id": "pandas-28",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Optimization",
    "question": "How do you downcast 64-bit integer and float columns to their smallest safe numeric subtypes?",
    "answerHinglish": "pd.to_numeric() with downcast='integer' ya downcast='float' use karein. Pandas data ke min/max range ko inspect karke int64 ko int16 ya int8 me safely compact kar deta hai.",
    "codeSnippet": "df['age'] = pd.to_numeric(df['age'], downcast='integer') # int64 -> int8",
    "tag": "Numeric Downcasting"
  },
  {
    "id": "pandas-29",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Groupby",
    "dimension": "Concept",
    "question": "What is the Split-Apply-Combine pattern in pandas groupby()?",
    "answerHinglish": "1) Split: DataFrame ko key column ke unique values ke basis par alag-alag groups me divide karta hai. 2) Apply: Har group par mathematical function (sum, mean, count) independently compute karta hai. 3) Combine: Saare group results ko ek single consolidated DataFrame me merge karke return karta hai.",
    "codeSnippet": "df.groupby('branch')['amount'].agg(['count', 'sum', 'mean'])",
    "tag": "Groupby"
  },
  {
    "id": "pandas-30",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Datetime",
    "dimension": "Syntax",
    "question": "How do you filter transactions executed between 11 PM and 4 AM using the .dt accessor?",
    "answerHinglish": "df['timestamp'] = pd.to_datetime(df['timestamp']) karke .dt.hour property use karein: df[(df['timestamp'].dt.hour >= 23) | (df['timestamp'].dt.hour < 4)].",
    "codeSnippet": "df['hour'] = pd.to_datetime(df['timestamp']).dt.hour\nnight_txns = df[(df['hour'] >= 23) | (df['hour'] < 4)]",
    "tag": "Datetime Analytics"
  },
  {
    "id": "pandas-31",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Duplication",
    "dimension": "Syntax",
    "question": "What does df.duplicated(keep=False) do, and why is it preferred in fraud audits?",
    "answerHinglish": "Default keep='first' duplicate rows me se pehle occurrence ko False mark karta hai aur baaki ko True. Lekin keep=False saari conflicting duplicate rows (including first occurrence) ko True mark karta hai, taaki fraud investigator sabhi colliding transaction records ko ek sath inspect kar sake.",
    "codeSnippet": "colliding_txns = df[df.duplicated(subset=['card_id', 'amount'], keep=False)]",
    "tag": "Fraud Detection"
  },
  {
    "id": "pandas-32",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Feature Engineering",
    "dimension": "Machine Learning",
    "question": "What is the Dummy Variable Trap, and how does drop_first=True in pd.get_dummies() prevent it?",
    "answerHinglish": "Agar categorical variable me k categories hain aur aap k dummy columns banate hain, toh unka sum hamesha 1 hota hai (perfect multicollinearity), jisse regression models singular matrix crash karte hain. drop_first=True pehli reference category drop karta hai (k-1 dummy columns).",
    "codeSnippet": "dummies = pd.get_dummies(df['account_type'], prefix='acc', drop_first=True)",
    "tag": "One-Hot Encoding"
  },
  {
    "id": "pandas-33",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Joins",
    "dimension": "FinTech Scenario",
    "question": "How do you audit unreconciled transactions during a DataFrame merge using indicator=True?",
    "answerHinglish": "pd.merge(df1, df2, on='txn_id', how='outer', indicator=True) merge me ek naya _merge column add karta hai jisme values hoti hain: both (matched), left_only (core bank me hai par gateway me nahi), aur right_only (gateway me hai par core bank me nahi). Isse unmatched settlement breaks instant audit ho jate hain.",
    "codeSnippet": "m = pd.merge(core_ledger, switch_feed, on='rrn', how='outer', indicator=True)\nunmatched = m[m['_merge'] != 'both']",
    "tag": "Reconciliation"
  },
  {
    "id": "pandas-34",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Joins",
    "dimension": "Integrity Check",
    "question": "How does the validate parameter in pd.merge() prevent silent cross-join data explosion?",
    "answerHinglish": "pd.merge(..., validate='1:m') ya validate='1:1' verify karta hai ki join key left/right table me unique hai ya nahi. Agar unexpected duplicate keys hain, toh pandas cross-join explosion ke bajaye instant MergeError raise karta hai.",
    "codeSnippet": "df_merged = pd.merge(accounts, txns, on='account_id', validate='1:m')",
    "tag": "Join Integrity"
  },
  {
    "id": "pandas-35",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Function Application",
    "dimension": "Comparison",
    "question": "What is the difference between Series.map(), Series.apply(), and DataFrame.map()?",
    "answerHinglish": "Series.map() element-wise substitution ke liye dictionary ya function use karta hai. Series.apply() complex lambdas aur functions ke liye use hota hai. DataFrame.map() (formerly applymap) pure 2D DataFrame ke har single cell par element-wise function execute karta hai.",
    "codeSnippet": "df['status_code'] = df['status'].map({'SUCCESS': 1, 'FAILED': 0})\ndf = df.map(lambda x: str(x).strip()) # cleans every cell",
    "tag": "Function Application"
  },
  {
    "id": "pandas-36",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas MultiIndex",
    "dimension": "Concept",
    "question": "How do unstack() and stack() reshape hierarchical MultiIndex DataFrames?",
    "answerHinglish": "unstack() innermost row index level ko pivot karke column headers me convert karta hai (table wide ho jati hai). stack() outermost column headers ko pivot karke innermost row index me convert karta hai (table tall/long ho jati hai).",
    "codeSnippet": "# Groupby produces MultiIndex (Branch, Year):\ng = df.groupby(['branch', 'year'])['revenue'].sum()\nwide_table = g.unstack() # year becomes columns!",
    "tag": "MultiIndex Reshaping"
  },
  {
    "id": "pandas-37",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas MultiIndex",
    "dimension": "Syntax",
    "question": "How do you select a specific cross-section of data from an arbitrary level of a MultiIndex without unstacking?",
    "answerHinglish": "DataFrame method .xs(key, level='level_name') use karein. Ye specified hierarchical level se slice extract karta hai bina pure DataFrame ka structure alter kiye.",
    "codeSnippet": "# Select all records where level 'city' == 'MUMBAI':\ndf_mumbai = df.xs('MUMBAI', level='city')",
    "tag": "MultiIndex Cross-Section"
  },
  {
    "id": "pandas-38",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Filtering",
    "dimension": "Syntax",
    "question": "How do you use df.query() to filter rows while referencing local Python variables?",
    "answerHinglish": "df.query() string expressions accept karta hai. Local Python variables ko reference karne ke liye variable name ke aage @ symbol lagaya jata hai (jaise @threshold).",
    "codeSnippet": "min_amt = 50000\nflagged = df.query('amount > @min_amt and status == \"SUCCESS\"')",
    "tag": "Query API"
  },
  {
    "id": "pandas-39",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Reshaping",
    "dimension": "Modern Trick",
    "question": "How do you flatten a column containing lists of transaction tags into individual row records?",
    "answerHinglish": "df.explode('tags') use karein. Ye list ke har element ke liye ek separate row produce karta hai jabki baaki columns ki values duplicate ho jati hain.",
    "codeSnippet": "# ['UPI', 'CASHBACK'] -> 2 separate rows\ndf_exploded = df.explode('payment_tags')",
    "tag": "Explode Reshaping"
  },
  {
    "id": "pandas-40",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Analytics",
    "dimension": "Syntax",
    "question": "What is the operational difference between pd.cut() and pd.qcut() in risk scoring?",
    "answerHinglish": "pd.cut() continuous variable ko fixed-width value bins me divide karta hai (e.g. 0-500, 500-1000). pd.qcut() quantiles (percentiles) use karta hai jisse har bin me equal number of sample observations aate hain.",
    "codeSnippet": "df['amt_tier'] = pd.cut(df['amount'], bins=[0, 1000, 10000, 100000])\ndf['amt_quartile'] = pd.qcut(df['amount'], q=4) # 4 equal quartiles",
    "tag": "Data Discretization"
  },
  {
    "id": "pandas-41",
    "domain": "Python & Data Ecosystem",
    "topic": "Modern Pandas",
    "dimension": "Internals",
    "question": "What is Copy-on-Write (CoW) in modern Pandas 2.0+, and how does it solve defensive copying?",
    "answerHinglish": "Copy-on-Write ensure karta hai ki DataFrame ka slice create karte waqt data copy na ho (shallow view share ho), lekin jaise hi slice me koi modification ki jati hai, pandas automatically lazy copy banata hai. Isse SettingWithCopyWarning permanently eliminate ho jati hai.",
    "codeSnippet": "pd.set_option('mode.copy_on_write', True)",
    "tag": "Modern Pandas"
  },
  {
    "id": "pandas-42",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Pipelines",
    "dimension": "Best Practice",
    "question": "How does method chaining with .pipe() produce clean, production-grade audit transformations?",
    "answerHinglish": ".pipe() custom functions ko chain karne deta hai jisme pehla argument DataFrame hota hai. Isse code nested readability pyramid ke bajaye clean sequential pipeline me transform ho jata hai: df.pipe(clean_dates).pipe(remove_outliers).pipe(calc_risk_score).",
    "codeSnippet": "final_df = (raw_df\n    .pipe(clean_schema)\n    .pipe(filter_active_accounts)\n    .pipe(compute_aggregates))",
    "tag": "Method Chaining"
  },
  {
    "id": "node-01",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Loop",
    "dimension": "Concept",
    "question": "What is the Node.js Event Loop at a fundamental architectural level?",
    "answerHinglish": "Node.js JavaScript execution ke liye single main thread use karta hai. Event Loop ek continuous C/C++ loop hai (provided by libuv) jo asynchronously non-blocking I/O operations ko OS kernel aur worker pool ko delegate karke callbacks ko prioritize aur execute karta hai.",
    "codeSnippet": "// Single-threaded execution, but async I/O:\nfs.readFile('ledger.csv', (err, data) => {\n  console.log('Read completed in callback');\n});",
    "tag": "Event Loop"
  },
  {
    "id": "node-02",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Loop",
    "dimension": "Why",
    "question": "Why does Node.js use an Event-Driven Single-Threaded model instead of Thread-Per-Request like Apache/Java?",
    "answerHinglish": "Thread-per-request model mein har incoming HTTP request 1MB se 2MB memory allocate karti hai. 10,000 concurrent connections par 10-20GB RAM sirf thread stack memory mein waste ho jati hai aur CPU context switching overhead badh jata hai. Node.js single thread par event loop use karke lakho concurrent connections ko minimal memory footprint par handle karta hai.",
    "tag": "Architecture"
  },
  {
    "id": "node-03",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Loop",
    "dimension": "How",
    "question": "What are the 6 main phases of the Libuv Event Loop in exact order?",
    "answerHinglish": "1) Timers (setTimeout, setInterval), 2) Pending Callbacks (I/O errors), 3) Idle/Prepare (internals), 4) Poll (retrieve new I/O events & execute I/O callbacks), 5) Check (setImmediate), 6) Close Callbacks (socket.on('close')). Har phase ke beech mein Microtask queue run hoti hai.",
    "tag": "Libuv Phases"
  },
  {
    "id": "node-04",
    "domain": "Node.js & Backend Architecture",
    "topic": "Microtasks",
    "dimension": "Comparison",
    "question": "What is the execution priority difference between `process.nextTick()` and `Promise.then()`?",
    "answerHinglish": "Dono microtasks hain jo current synchronous operation ke turant baad run hote hain, par `process.nextTick` queue ki priority `Promise` microtask queue se hamesha pehle hoti hai. V8 pehle saare `nextTick` callbacks drain karta hai, fir Promise callbacks process karta hai.",
    "codeSnippet": "Promise.resolve().then(() => console.log('Promise'));\nprocess.nextTick(() => console.log('NextTick'));\n// Output: NextTick -> Promise",
    "tag": "Microtasks"
  },
  {
    "id": "node-05",
    "domain": "Node.js & Backend Architecture",
    "topic": "Timers",
    "dimension": "Comparison",
    "question": "When does `setImmediate()` execute before `setTimeout(fn, 0)` in Node.js?",
    "answerHinglish": "Agar dono ko kisi I/O callback ke andar call kiya jaye (jaise `fs.readFile`), toh `setImmediate` hamesha `setTimeout(0)` se pehle execute hoga! Kyunki I/O callback Poll phase mein run hota hai, aur Poll phase ke turant baad Check phase (`setImmediate`) aata hai, jabki Timers phase agle loop cycle mein aayega.",
    "codeSnippet": "fs.readFile('test.txt', () => {\n  setTimeout(() => console.log('Timeout'), 0);\n  setImmediate(() => console.log('Immediate'));\n});\n// Guaranteed Output: Immediate -> Timeout",
    "tag": "Timers"
  },
  {
    "id": "node-06",
    "domain": "Node.js & Backend Architecture",
    "topic": "Threadpool",
    "dimension": "How",
    "question": "Which specific Node.js operations use the Libuv Thread Pool (default 4 threads)?",
    "answerHinglish": "Sirf 4 specific operations thread pool use karte hain: 1) `fs` (file system sync/async), 2) `crypto` (pbkdf2, randomBytes, scrypt), 3) `zlib` (compression/decompression), 4) `dns.lookup` (system resolver). Network sockets (`http`, `https`, `net`) OS epoll/kqueue use karte hain aur thread pool use nahi karte!",
    "tag": "Threadpool"
  },
  {
    "id": "node-07",
    "domain": "Node.js & Backend Architecture",
    "topic": "Streams",
    "dimension": "Concept",
    "question": "What is Backpressure in Node.js Streams and why is it dangerous in banking APIs?",
    "answerHinglish": "Jab Readable stream se data aane ki speed Writable stream ke process/write karne ki speed se bohot zyada fast ho, toh memory buffer fill hone lagta hai. Writable stream `false` return karti hai. Agar backpressure handle na kiya jaye, toh process RAM exhaust ho jayegi aur OOM crash ho jayega.",
    "codeSnippet": "const canWrite = writable.write(chunk);\nif (!canWrite) {\n  readable.pause();\n  writable.once('drain', () => readable.resume());\n}",
    "tag": "Streams"
  },
  {
    "id": "node-08",
    "domain": "Node.js & Backend Architecture",
    "topic": "Streams",
    "dimension": "Production",
    "question": "Why is `pipeline()` from 'stream/promises' preferred over `.pipe()` in production?",
    "answerHinglish": "Standard `.pipe()` stream errors aur unexpected premature close ko properly propagate ya clean up nahi karta, leading to file descriptor leaks. `stream.pipeline()` saare streams ke errors ko catch karta hai aur resources ko safely destroy karta hai.",
    "codeSnippet": "const { pipeline } = require('stream/promises');\nawait pipeline(readStream, transformGzip, writeStream);",
    "tag": "Production"
  },
  {
    "id": "node-09",
    "domain": "Node.js & Backend Architecture",
    "topic": "Scaling",
    "dimension": "Comparison",
    "question": "Cluster Module vs Worker Threads in Node.js: When should you use which?",
    "answerHinglish": "Cluster Module alag-alag OS processes spawn karta hai jo same server port share karte hain (Multi-process, zero memory sharing) - ideal for scaling I/O HTTP servers across CPU cores. Worker Threads ek hi process ke andar multiple threads chalate hain jo SharedArrayBuffer se memory share kar sakte hain - ideal for CPU-bound tasks like crypto hashing, image processing, or data analytics.",
    "tag": "Multi-core"
  },
  {
    "id": "node-10",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Loop Blocking",
    "dimension": "Debugging",
    "question": "Predict the bug: A route handler runs `JSON.parse()` on a 50MB string. What happens to other bank customers?",
    "answerHinglish": "JSON.parse() synchronous CPU-bound operation hai. Jab tak 50MB string parse ho rahi hoti hai (say 800ms), Node.js ka single Main Thread block ho jata hai. Is 800ms ke dauran kisi bhi doosre customer ki payment request, login, ya health check process nahi hogi aur timeout ho jayegi!",
    "tag": "Debugging"
  },
  {
    "id": "node-11",
    "domain": "Node.js & Backend Architecture",
    "topic": "Memory Leaks",
    "dimension": "Debugging",
    "question": "What is the most common cause of memory leaks in Node.js banking microservices?",
    "answerHinglish": "1) Global arrays ya maps jisme cache entries store kiye jaate hain bina TTL ke, 2) Event Listeners (`emitter.on()`) jo unmount/close hone par remove nahi kiye jaate (`emitter.removeListener()`), 3) Closures jo unused large outer scope variables ko unintentionally retain karte hain.",
    "tag": "Memory Leaks"
  },
  {
    "id": "node-12",
    "domain": "Node.js & Backend Architecture",
    "topic": "High-Throughput",
    "dimension": "Banking",
    "question": "How do you handle 10,000 incoming UPI payment webhooks per second in Node.js without crashing?",
    "answerHinglish": "Express server ko lightweight ingestion gateway banao: Request aate hi JWT/HMAC signature verify karo, turant Redis BullMQ ya Kafka queue mein job push karo (`await queue.add('payment_event', payload)`), aur instant HTTP 202 Accepted return kar do. Heavy business logic, balance deduction aur database updates background worker pool process karega.",
    "tag": "Banking Rail"
  },
  {
    "id": "node-13",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Loop",
    "dimension": "Interview",
    "question": "Explain how you monitor Event Loop Lag in a production Node.js service.",
    "answerHinglish": "Hum `perf_hooks` ka `monitorEventLoopDelay({ resolution: 20 })` use karte hain ya Prometheus client se `nodejs_eventloop_lag_seconds` metric collect karte hain. Agar p99 event loop lag 50ms cross karta hai, toh alert trigger hota hai ki synchronous CPU blocking ho rahi hai.",
    "tag": "Monitoring"
  },
  {
    "id": "node-14",
    "domain": "Node.js & Backend Architecture",
    "topic": "Error Handling",
    "dimension": "Scenario",
    "question": "What should your application do if an `uncaughtException` occurs in Node.js?",
    "answerHinglish": "Uncaught exception aane par application state corrupt ho chuki hoti hai (memory leaks, half-written database sockets). Best practice: Error ko synchronous log karo, active connections ko gracefully finish karne ka 5 second wait karo, aur process ko `process.exit(1)` karke crash hone do. PM2, Docker, ya Kubernetes pod automatically clean new instance restart kar dega.",
    "tag": "Resilience"
  },
  {
    "id": "node-15",
    "domain": "Node.js & Backend Architecture",
    "topic": "V8 Engine",
    "dimension": "How",
    "question": "How does V8 Engine garbage collection (Scavenge vs Mark-Sweep-Compact) work?",
    "answerHinglish": "V8 heap ko do generations mein split karta hai: 1) New Space (Young generation, 1-64MB) jahan naye objects allocate hote hain. Ye fast Cheney algorithm (Scavenge) use karta hai jo live objects ko doosre semi-space mein copy karta hai. 2) Old Space jahan long-lived objects survive karke promote hote hain. Ye infrequent Mark-Sweep-Compact algorithm use karta hai.",
    "tag": "V8 Internals"
  },
  {
    "id": "node-16",
    "domain": "Node.js & Backend Architecture",
    "topic": "Middleware",
    "dimension": "Code",
    "question": "Why is the order of Express middleware critical for transaction security?",
    "answerHinglish": "Express middleware pipeline FIFO order mein execute hoti hai. Rate limiting, CORS, aur Authentication middleware ko hamesha body-parser aur transaction routes se pehle aana chahiye. Warna unauthenticated attacker large payloads bhejkar server memory exhaust kar sakta hai before auth check.",
    "tag": "Express Security"
  },
  {
    "id": "node-17",
    "domain": "Node.js & Backend Architecture",
    "topic": "Graceful Shutdown",
    "dimension": "Production",
    "question": "How do you implement Graceful Shutdown in a banking Node.js app when receiving SIGTERM?",
    "answerHinglish": "`process.on('SIGTERM', async () => ...)`: 1) Naye HTTP incoming requests accept karna band karo (`server.close()`), 2) Existing ongoing financial transactions ko complete hone do, 3) Database connection pools aur Redis clients ko cleanly close karo (`await pool.end()`), 4) Exit process cleanly with code 0.",
    "tag": "DevOps"
  },
  {
    "id": "node-18",
    "domain": "Node.js & Backend Architecture",
    "topic": "Crypto",
    "dimension": "Banking",
    "question": "Why should password hashing (bcrypt/argon2) never run synchronously on the Main Thread?",
    "answerHinglish": "Bcrypt intentionally CPU-intensive cost factor (e.g. cost 12 = ~250ms CPU time) use karta hai brute-force attacks rokne ke liye. Sync run karne par event loop 250ms freeze ho jayega. Node.js mein asynchronous `bcrypt.hash()` use karo jo C++ worker thread pool par execute hota hai bina main thread roke.",
    "tag": "Security"
  },
  {
    "id": "node-19",
    "domain": "Node.js & Backend Architecture",
    "topic": "Event Emitter",
    "dimension": "Code",
    "question": "What happens if an EventEmitter emits an 'error' event and has no listener registered?",
    "answerHinglish": "Agar koi `error` event emit hota hai aur uska koi `.on('error', ...)` listener registered nahi hai, toh Node.js default behavior ke mutabik unhandled exception throw karta hai, stack trace print karta hai, aur poora Node.js process crash kar deta hai!",
    "tag": "Event Emitter"
  },
  {
    "id": "node-20",
    "domain": "Node.js & Backend Architecture",
    "topic": "libuv",
    "dimension": "Follow-up",
    "question": "How does `UV_THREADPOOL_SIZE` impact performance in high-load encryption/file processing?",
    "answerHinglish": "Default size 4 threads hoti hai. Agar 20 concurrent cryptographic operations ya file reads aate hain, toh pehle 4 execute honge aur baaki 16 queue mein wait karenge. `process.env.UV_THREADPOOL_SIZE = 16` ya 64 set karke multi-core server par thread pool scaling ki ja sakti hai.",
    "tag": "Optimization"
  },
  {
    "id": "sql-01",
    "domain": "SQL & Advanced DBMS",
    "topic": "ACID",
    "dimension": "Concept",
    "question": "Explain ACID properties specifically in the context of an IDFC Bank account transfer.",
    "answerHinglish": "A (Atomicity): Debit aur Credit dono commit honge ya dono rollback honge. C (Consistency): Total account balances aur negative balance checks hamesha valid rahenge. I (Isolation): Ek hi account par concurrent transactions ek doosre ka dirty balance nahi dekhenge. D (Durability): Commit hone ke baad server crash ho jaye tab bhi data safe rahega (WAL fsync).",
    "tag": "ACID"
  },
  {
    "id": "sql-02",
    "domain": "SQL & Advanced DBMS",
    "topic": "Durability",
    "dimension": "How",
    "question": "How does Write-Ahead Logging (WAL) guarantee durability before data hits actual disk tables?",
    "answerHinglish": "Data pages ko random disk locations par write karna slow hota hai. Isliye DBMS pehle saare changes ko sequential append-only Write-Ahead Log (WAL) mein write karta hai aur disk par `fsync()` call karta hai. Crash hone par database WAL replay karke uncommitted transactions ko undo aur committed ko redo kar leta hai.",
    "tag": "WAL"
  },
  {
    "id": "sql-03",
    "domain": "SQL & Advanced DBMS",
    "topic": "Isolation",
    "dimension": "Comparison",
    "question": "What is the difference between Dirty Read, Non-Repeatable Read, and Phantom Read?",
    "answerHinglish": "1) Dirty Read: Transaction uncommitted data read kar leti hai jo baad mein rollback ho jata hai. 2) Non-Repeatable Read: Same transaction mein same row ko dobara read karne par data badal jata hai (doosre session ne UPDATE commit kiya). 3) Phantom Read: Same range query dobara run karne par rows count badal jata hai (doosre session ne naye rows INSERT kiye).",
    "tag": "Isolation"
  },
  {
    "id": "sql-04",
    "domain": "SQL & Advanced DBMS",
    "topic": "Locking",
    "dimension": "Code",
    "question": "How does `SELECT ... FOR UPDATE` prevent race conditions in double-spending?",
    "answerHinglish": "Ye targeted row par Exclusive (X) Lock acquire karta hai. Jab tak transaction COMMIT ya ROLLBACK nahi hoti, doosra koi bhi session us row ko modify ya `FOR UPDATE` read nahi kar sakta. Dono parallel requests sequential ho jaati hain.",
    "codeSnippet": "BEGIN;\nSELECT balance FROM accounts WHERE account_id = 101 FOR UPDATE;\n-- Now balance is safely locked for balance check & update\nUPDATE accounts SET balance = balance - 500 WHERE account_id = 101;\nCOMMIT;",
    "tag": "Pessimistic Lock"
  },
  {
    "id": "sql-05",
    "domain": "SQL & Advanced DBMS",
    "topic": "Locking",
    "dimension": "Comparison",
    "question": "Pessimistic Locking vs Optimistic Locking: When to use which in FinTech?",
    "answerHinglish": "Pessimistic Locking (`FOR UPDATE`): High-contention financial balance mutations jahan conflict chances high hain aur rollback cost bohot dangerous hai. Optimistic Locking (version column check `WHERE version = 3`): Low-contention user profile updates ya ticket booking jahan conflicts rare hain aur retry acceptable hai.",
    "tag": "Locking"
  },
  {
    "id": "sql-06",
    "domain": "SQL & Advanced DBMS",
    "topic": "Deadlocks",
    "dimension": "How",
    "question": "How does MySQL InnoDB detect deadlocks, and how should application code prevent them?",
    "answerHinglish": "InnoDB continuous 'Wait-For Graph' maintain karta hai. Agar circular dependency (T1 waits for T2, T2 waits for T1) milti hai, toh least expensive transaction ko rollback karke error 1213 throw kar deta hai. Prevention: Hamesha locks ko ek deterministic sorted order mein acquire karo (e.g. Account_A aur Account_B mein hamesha min(A,B) ko pehle lock karo).",
    "tag": "Deadlocks"
  },
  {
    "id": "sql-07",
    "domain": "SQL & Advanced DBMS",
    "topic": "InnoDB Locks",
    "dimension": "How",
    "question": "What is a Next-Key Lock in MySQL InnoDB Repeatable Read?",
    "answerHinglish": "Next-Key Lock = Record Lock + Gap Lock. Ye actual index record ko lock karne ke saath-saath us record ke pehle aane waale gap ko bhi lock karta hai. Is wajah se doosre sessions us gap ke beech mein nayi rows INSERT nahi kar sakte, successfully eliminating Phantom Reads!",
    "tag": "Next-Key Lock"
  },
  {
    "id": "sql-08",
    "domain": "SQL & Advanced DBMS",
    "topic": "MVCC",
    "dimension": "Concept",
    "question": "What is Multi-Version Concurrency Control (MVCC) and why does it say 'Readers never block Writers'?",
    "answerHinglish": "MVCC mein jab koi transaction row update karti hai, toh purana data overwrite nahi hota\u2014balki undo logs mein purana snapshot version save rehta hai. Isliye SELECT queries (readers) snapshot version read karti hain bina kisi lock ke, jabki UPDATE (writers) latest version modify karte hain. Readers aur Writers ek doosre ko block nahi karte!",
    "tag": "MVCC"
  },
  {
    "id": "sql-09",
    "domain": "SQL & Advanced DBMS",
    "topic": "B+ Tree",
    "dimension": "Why",
    "question": "Why do relational databases use B+ Trees for indexes instead of Binary Search Trees or Hash Tables?",
    "answerHinglish": "1) Disk I/O: B+ Tree bohot wide aur flat hota hai (high fanout), 3-4 disk block reads mein millions rows traverse ho jaate hain. 2) Range Scans: B+ Tree ke sabhi leaf nodes doubly linked list se jude hote hain, isliye range queries (`BETWEEN 1000 AND 5000`) leaf scan se superfast hoti hain, jabki Hash Table range query support nahi kar sakta.",
    "tag": "B+ Tree"
  },
  {
    "id": "sql-10",
    "domain": "SQL & Advanced DBMS",
    "topic": "Window Functions",
    "dimension": "Code",
    "question": "Write the SQL Window Function to print running account balance without collapsing rows.",
    "answerHinglish": "`SUM(amount) OVER (PARTITION BY account_id ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`. Ye har row ke liye cumulative sum calculate karta hai bina aggregate collapse kiye.",
    "codeSnippet": "SELECT tx_id, created_at, amount,\n  SUM(amount) OVER (\n    PARTITION BY account_id \n    ORDER BY created_at\n    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW\n  ) as running_balance\nFROM transactions;",
    "tag": "Window Functions"
  },
  {
    "id": "sql-11",
    "domain": "SQL & Advanced DBMS",
    "topic": "Window Functions",
    "dimension": "Comparison",
    "question": "What is the difference between `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()`?",
    "answerHinglish": "Identical values (ties) aane par: 1) `ROW_NUMBER()` hamesha strictly unique sequential number deta hai (1, 2, 3, 4). 2) `RANK()` ties ko same rank deta hai aur subsequent ranks skip karta hai (1, 2, 2, 4). 3) `DENSE_RANK()` ties ko same rank deta hai par gap skip nahi karta (1, 2, 2, 3).",
    "tag": "Window Functions"
  },
  {
    "id": "sql-12",
    "domain": "SQL & Advanced DBMS",
    "topic": "CTE",
    "dimension": "Concept",
    "question": "What is a Recursive Common Table Expression (CTE) and where is it used in banking?",
    "answerHinglish": "Recursive CTE ek temporary named result set hai jo apne aap ko repeatedly reference karta hai jab tak termination condition meet na ho. Banking mein ye Employee hierarchy, Account sub-tree relations, ya Transaction trail graph traversal (AML money laundering rings) detect karne ke liye use hota hai.",
    "tag": "CTE"
  },
  {
    "id": "sql-13",
    "domain": "SQL & Advanced DBMS",
    "topic": "Pagination",
    "dimension": "Performance",
    "question": "Why is `LIMIT 50 OFFSET 1000000` a critical performance hazard, and what is Keyset Pagination?",
    "answerHinglish": "`OFFSET 1000000` ke liye MySQL pehle 1,000,050 rows disk se read karta hai, memory buffer mein sort karta hai, aur pehle 1000000 discard karta hai -> $O(N)$ latency. Keyset pagination mein hum indexed pointer use karte hain: `WHERE id < last_seen_id ORDER BY id DESC LIMIT 50`, jo B+ Tree mein direct $O(\\log N)$ lookup karta hai!",
    "tag": "Pagination"
  },
  {
    "id": "sql-14",
    "domain": "SQL & Advanced DBMS",
    "topic": "Composite Index",
    "dimension": "How",
    "question": "Explain the Leftmost Prefix Rule in MySQL Composite Indexes.",
    "answerHinglish": "Agar index `(status, created_at, customer_id)` par hai, toh query B+ Tree use karegi sirf tab jab `status` WHERE clause mein present ho. Agar query sirf `WHERE created_at = ...` karegi, toh composite index bypass ho jayega aur full table scan hoga!",
    "tag": "Indexing"
  },
  {
    "id": "sql-15",
    "domain": "SQL & Advanced DBMS",
    "topic": "Indexing",
    "dimension": "Production",
    "question": "Why can adding too many indexes on a banking transaction table degrade write throughput?",
    "answerHinglish": "Har INSERT ya UPDATE par database ko primary table ke saath-saath har secondary B+ Tree index ko bhi synchronously update karna padta hai, leading to page splits, random disk writes, aur lock contention. High-frequency banking tables par sirf selective read query indexes hone chahiye.",
    "tag": "Performance"
  },
  {
    "id": "sql-16",
    "domain": "SQL & Advanced DBMS",
    "topic": "EXPLAIN",
    "dimension": "Debugging",
    "question": "What key indicators in `EXPLAIN ANALYZE` output prove that a query needs optimization?",
    "answerHinglish": "1) `type: ALL` (Full Table Scan instead of Index Scan), 2) `rows` scanned count returned rows se 100x zyada ho, 3) `Extra: Using filesort` ya `Using temporary`, 4) High execution time in nested loop join branches.",
    "tag": "EXPLAIN"
  },
  {
    "id": "sql-17",
    "domain": "SQL & Advanced DBMS",
    "topic": "Null Logic",
    "dimension": "Debugging",
    "question": "Why does `SELECT * FROM accounts WHERE id NOT IN (SELECT account_id FROM blocked)` return 0 rows if blocked contains NULL?",
    "answerHinglish": "SQL three-valued logic use karta hai (`TRUE`, `FALSE`, `UNKNOWN`). `id != NULL` evaluates to `UNKNOWN`. Agar subquery mein ek bhi NULL hai, toh poori NOT IN conjunction `UNKNOWN` ban jaati hai, aur query silently 0 rows return karti hai! Always use `NOT EXISTS` instead.",
    "tag": "SQL Traps"
  },
  {
    "id": "sql-18",
    "domain": "SQL & Advanced DBMS",
    "topic": "Sharding",
    "dimension": "Scenario",
    "question": "What is the best Shard Key for an IDFC Core Banking database?",
    "answerHinglish": "`customer_id` ya `account_id` best shard key hai kyunki 95% banking transactions single customer ya account ke context mein hoti hain. Isse saari customer queries single shard par route hoti hain (No cross-shard distributed joins). Cross-bank transfers asynchronous payment queues se settle hote hain.",
    "tag": "Sharding"
  },
  {
    "id": "sql-19",
    "domain": "SQL & Advanced DBMS",
    "topic": "Database Isolation",
    "dimension": "Interview",
    "question": "What is Write Skew anomaly and which isolation level is required to prevent it?",
    "answerHinglish": "Write Skew: Do concurrent transactions disjoint rows update karti hain jo milkar ek global constraint break kar deti hain (e.g. Balance_A + Balance_B >= 0, T1 updates A, T2 updates B). Repeatable Read isko prevent nahi kar sakta! Iske liye `SERIALIZABLE` isolation level ya explicit table/lock coordination chahiye.",
    "tag": "Write Skew"
  },
  {
    "id": "sql-20",
    "domain": "SQL & Advanced DBMS",
    "topic": "Connection Pooling",
    "dimension": "Production",
    "question": "What happens if your Node.js backend opens 5,000 direct database connections to MySQL?",
    "answerHinglish": "MySQL crash ho jayega (Too many connections error). Har connection thread 5-10MB memory aur OS context switching overhead consume karti hai. Solution: Connection Pooler (HikariCP, ProxySQL) use karo jo backend ko fixed pool (e.g. 50-100 high-performance connections) ke through multiplex karta hai.",
    "tag": "Connection Pool"
  },
  {
    "id": "sys-01",
    "domain": "Distributed System Design",
    "topic": "Idempotency",
    "dimension": "Concept",
    "question": "What is an Idempotency Key in payment gateways and how is it implemented?",
    "answerHinglish": "Client request header mein unique UUIDv4 bhejta hai (`X-Idempotency-Key`). Server Redis mein `SET key status=PROCESSING NX EX 120` karta hai. Agar key already exist karti hai toh server duplicate execution rokk kar saved response return karta hai.",
    "tag": "Idempotency"
  },
  {
    "id": "sys-02",
    "domain": "Distributed System Design",
    "topic": "Saga Pattern",
    "dimension": "Concept",
    "question": "Why is the Saga Pattern preferred over 2-Phase Commit (2PC) in distributed microservices?",
    "answerHinglish": "2PC synchronous blocking protocol hai jo sabhi databases par distributed locks hold karta hai. Agar ek service slow ho toh poora system freeze ho jata hai. Saga pattern local transactions use karta hai; agar koi step fail hota hai toh backward compensating transactions (refund, unlock) execute hoti hain.",
    "tag": "Sagas"
  },
  {
    "id": "sys-03",
    "domain": "Distributed System Design",
    "topic": "Saga Types",
    "dimension": "Comparison",
    "question": "Orchestrated Saga vs Choreographed Saga: Which is better for banking?",
    "answerHinglish": "Banking ke liye Orchestrated Saga superior hai! Ek central Saga Orchestrator state machine maintain karta hai, har step ka audit log track karta hai, timeouts handle karta hai, aur failure par compensation fire karta hai. Choreography (event-driven) complex workflows mein cyclical dependencies aur audit mushkil bana deti hai.",
    "tag": "Sagas"
  },
  {
    "id": "sys-04",
    "domain": "Distributed System Design",
    "topic": "Outbox Pattern",
    "dimension": "How",
    "question": "How does the Transactional Outbox Pattern solve the Dual-Write Problem?",
    "answerHinglish": "Dual-write: DB commit hone ke baad Kafka publish fail ho sakti hai. Solution: Same relational ACID transaction ke andar business table update karo aur ek `outbox` table mein message insert karo. Ek Debezium CDC ya background poller outbox table se read karke Kafka mein guaranteed at-least-once deliver karta hai.",
    "tag": "Outbox Pattern"
  },
  {
    "id": "sys-05",
    "domain": "Distributed System Design",
    "topic": "UPI Architecture",
    "dimension": "Banking",
    "question": "Explain the 4-Party Model in India's UPI ecosystem.",
    "answerHinglish": "1) Payer PSP (Google Pay, IDFC App jo user request bhejta hai), 2) Remitter Bank (jo customer ka account debit karta hai), 3) NPCI Switch (central router jo VPA resolve karta hai aur interbank messaging karta hai), 4) Beneficiary Bank (jo receiver ka account credit karta hai) aur Payee PSP.",
    "tag": "UPI 2.0"
  },
  {
    "id": "sys-06",
    "domain": "Distributed System Design",
    "topic": "UPI PIN",
    "dimension": "Security",
    "question": "Where is the customer's UPI PIN verified? Does Google Pay or IDFC app see it?",
    "answerHinglish": "NO! PSP apps kabhi bhi customer ka MPIN nahi dekh sakti. NPCI ki Common Library (CL) SDK app ke andar sandboxed chalti hai. PIN client device par hardware public key se encrypt hota hai aur directly Remitter Bank ke HSM (Hardware Security Module) par verify hota hai.",
    "tag": "UPI Security"
  },
  {
    "id": "sys-07",
    "domain": "Distributed System Design",
    "topic": "Settlement",
    "dimension": "Banking",
    "question": "What is the difference between Real-Time Authorization and Interbank Settlement?",
    "answerHinglish": "Authorization: Real-time (sub-second) customer account debit aur credit confirm hota hai. Settlement: Actual interbank money movement RBI ke Real Time Gross Settlement (RTGS) ya Deferred Net Settlement (DNS) batches mein din mein multiple times central bank settlement accounts ke beech hota hai.",
    "tag": "Settlement"
  },
  {
    "id": "sys-08",
    "domain": "Distributed System Design",
    "topic": "Double-Entry Ledger",
    "dimension": "Concept",
    "question": "What is the immutable rule of Double-Entry Bookkeeping in banking software?",
    "answerHinglish": "Har transaction entry mein: $\\sum \\text{Debits} = \\sum \\text{Credits}$. Kabhi bhi existing ledger row ko UPDATE ya DELETE nahi kiya jata (Immutable append-only). Agar koi mistake ho, toh offsetting reversing journal entry create ki jaati hai.",
    "tag": "Ledger"
  },
  {
    "id": "sys-09",
    "domain": "Distributed System Design",
    "topic": "Distributed Caching",
    "dimension": "Scenario",
    "question": "What is Cache Stampede (Thundering Herd) and how do you prevent it in account balance lookups?",
    "answerHinglish": "Jab high-frequency cache key (e.g. viral merchant balance) expire hoti hai, toh lakho concurrent requests ek saath database hit karti hain, causing DB crash. Prevention: 1) Redis Mutex Distributed Lock (sirf 1 request DB se fetch kare baaki wait karein), 2) Early probabilistic expiration (XFetch algorithm).",
    "tag": "Caching"
  },
  {
    "id": "sys-10",
    "domain": "Distributed System Design",
    "topic": "Kafka",
    "dimension": "How",
    "question": "How do you guarantee strict message ordering in Kafka for customer transactions?",
    "answerHinglish": "Kafka strict ordering sirf ek single partition ke andar guarantee karta hai. Isliye transaction event publish karte waqt Partition Key = `account_id` set karo. Us specific account ke saare events hamesha same partition aur same consumer thread par FIFO order mein process honge.",
    "tag": "Kafka"
  },
  {
    "id": "sys-11",
    "domain": "Distributed System Design",
    "topic": "Rate Limiting",
    "dimension": "How",
    "question": "Token Bucket vs Leaky Bucket algorithm for banking API rate limiting?",
    "answerHinglish": "Token Bucket: Tokens fixed rate par refill hote hain, burst traffic allow karta hai jab tak tokens available hain - ideal for user-facing API gateways. Leaky Bucket: Requests constant rate par queue se leak hoti hain, traffic spikes ko smooth karta hai - ideal for external third-party payment switch egress.",
    "tag": "Rate Limiting"
  },
  {
    "id": "sys-12",
    "domain": "Distributed System Design",
    "topic": "CAP Theorem",
    "dimension": "Interview",
    "question": "Where does a core banking transaction engine sit in the CAP Theorem?",
    "answerHinglish": "Banking engine hamesha **CP (Consistency & Partition Tolerance)** choose karta hai! Network partition aane par availability degrade ya reject karna chalega, par inconsistent balance ya double spending kabhi bhi acceptable nahi hai.",
    "tag": "CAP Theorem"
  },
  {
    "id": "sys-13",
    "domain": "Distributed System Design",
    "topic": "Dead Letter Queue",
    "dimension": "Production",
    "question": "What is a Dead Letter Queue (DLQ) and what is the protocol for unprocessable payment events?",
    "answerHinglish": "Jab koi payment message consumer par retry limit (e.g. 5 retries with exponential backoff) exhaust kar leta hai, toh use discard nahi kiya jata\u2014balki DLQ mein push kiya jata hai. Alerts trigger hote hain aur automated reconciliation/manual ops team inspect karke fix karti hai.",
    "tag": "DLQ"
  },
  {
    "id": "sys-14",
    "domain": "Distributed System Design",
    "topic": "Scale Math",
    "dimension": "Interview",
    "question": "Calculate TPS and storage: IDFC processes 50 million daily transactions. What is the average TPS and daily storage at 500 bytes per record?",
    "answerHinglish": "Daily seconds = 86,400. Avg TPS = $50,000,000 / 86,400 \\approx 580$ TPS. Peak TPS (3x-4x) $\\approx 2,000 - 2,500$ TPS. Daily storage = $50,000,000 \\times 500$ bytes $\\approx 25$ GB/day (approx 9.1 TB per year without replication).",
    "tag": "Scale Math"
  },
  {
    "id": "sys-15",
    "domain": "Distributed System Design",
    "topic": "Distributed Locking",
    "dimension": "Comparison",
    "question": "Why is Redis Redlock sometimes criticized for financial transactions?",
    "answerHinglish": "Distributed systems researcher Martin Kleppmann ne prove kiya tha ki Redis distributed locks asynchronous clock drift aur GC pauses par fail ho sakte hain. Isliye Redis lock multi-service webhook deduplication ke liye theek hai, par actual balance deduction ke liye relational DB ACID lock compulsory hai.",
    "tag": "Redlock"
  },
  {
    "id": "sys-16",
    "domain": "Distributed System Design",
    "topic": "ISO 8583",
    "dimension": "Banking",
    "question": "What is ISO 8583 vs ISO 20022 in banking communications?",
    "answerHinglish": "ISO 8583 legacy bitmap binary message format hai jo ATM aur Point of Sale (POS) card networks use karte hain. ISO 20022 modern XML/JSON based rich financial messaging standard hai jo modern interbank transfers (RTGS/SWIFT) aur UPI APIs use karte hain.",
    "tag": "ISO Protocols"
  },
  {
    "id": "sys-17",
    "domain": "Distributed System Design",
    "topic": "Circuit Breaker",
    "dimension": "Resilience",
    "question": "How does a Circuit Breaker pattern protect banking services from downstream partner failures?",
    "answerHinglish": "3 states: 1) Closed (normal), 2) Open (downstream partner bank slow/failing, immediate fallback response without waiting), 3) Half-Open (sample requests bhejkar check karta hai partner recover hua ya nahi). Isse thread pool exhaustion prevent hota hai.",
    "tag": "Circuit Breaker"
  },
  {
    "id": "sys-18",
    "domain": "Distributed System Design",
    "topic": "Database Replication",
    "dimension": "How",
    "question": "How do you handle Replication Lag in a banking Read-Replica setup?",
    "answerHinglish": "Customer ne transaction perform kiya aur turant passbook refresh kiya. Agar read replica par lag hai, toh use purana balance dikhega! Solution: Sticky Sessions / Read-your-own-writes pattern: Mutation ke baad agle 5 seconds tak usi user ki reads Primary Database par route karo.",
    "tag": "Replication Lag"
  },
  {
    "id": "sys-19",
    "domain": "Distributed System Design",
    "topic": "Disaster Recovery",
    "dimension": "Production",
    "question": "What is RPO and RTO in banking infrastructure?",
    "answerHinglish": "RPO (Recovery Point Objective): Disaster ke waqt kitna data loss acceptable hai (Banking target: RPO = 0, zero financial loss). RTO (Recovery Time Objective): System ko dobara operational hone mein kitna time lag sakta hai (Banking target: RTO < 5 minutes via multi-region failover).",
    "tag": "Disaster Recovery"
  },
  {
    "id": "sys-20",
    "domain": "Distributed System Design",
    "topic": "API Gateway",
    "dimension": "Architecture",
    "question": "What core responsibilities must an Enterprise FinTech API Gateway handle?",
    "answerHinglish": "1) TLS Termination & mTLS verification, 2) Rate limiting & DDoS protection, 3) Token authentication & JWT validation, 4) Request payload sanitization (SQLi/XSS), 5) Dynamic routing to microservices, 6) Distributed tracing correlation ID injection.",
    "tag": "API Gateway"
  },
  {
    "id": "py-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Mutability",
    "dimension": "Concept",
    "question": "Which core Python data types are mutable vs immutable?",
    "answerHinglish": "Immutable (cannot modify in-place): int, float, str, tuple, frozenset, bool, bytes. Mutable (modify in-place): list, dict, set, bytearray. Function default arguments mein mutable type (`def f(x=[])`) use karna famous Python bug hai.",
    "tag": "Mutability"
  },
  {
    "id": "py-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Copying",
    "dimension": "Comparison",
    "question": "What is the memory difference between Shallow Copy and Deep Copy?",
    "answerHinglish": "Shallow Copy (`arr.copy()` ya `list(arr)`): Naya outer container banta hai, par nested objects ke references/pointers share hote hain. Deep Copy (`copy.deepcopy(arr)`): Recursively har nested object ki completely independent duplicate copy memory mein banata hai.",
    "tag": "Memory"
  },
  {
    "id": "py-03",
    "domain": "Python & Data Ecosystem",
    "topic": "GIL",
    "dimension": "Concept",
    "question": "What is the Global Interpreter Lock (GIL) in CPython and what are its concurrency limits?",
    "answerHinglish": "GIL ek mutex hai jo ensure karta hai ki ek time par sirf 1 thread Python bytecode execute kare (CPython thread safety ke liye). Is wajah se multi-threading CPU-bound tasks ko 8 CPU cores par parallel nahi chala sakti. Solution: `multiprocessing` module ya C-extensions (NumPy).",
    "tag": "GIL"
  },
  {
    "id": "py-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Garbage Collection",
    "dimension": "How",
    "question": "How does Python manage memory and detect garbage objects?",
    "answerHinglish": "Python 2 mechanisms use karta hai: 1) Reference Counting (Primary): Har object ka refcount track hota hai. Zero hote hi memory instantly deallocate hoti hai. 2) Generational Cycle Detector (Secondary): Circular references (`A.ref = B; B.ref = A`) ko clean karne ke liye 3 generations (Gen0, Gen1, Gen2) mein threshold based scanning hoti hai.",
    "tag": "Garbage Collection"
  },
  {
    "id": "py-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Generators",
    "dimension": "Why",
    "question": "Why use Generators (`yield`) instead of returning a large List in data processing?",
    "answerHinglish": "List saare millions elements ko memory mein ek saath allocate karti hai ($O(N)$ RAM). Generator lazy evaluation use karta hai\u2014ek time par sirf 1 element memory mein calculate hota hai ($O(1)$ RAM). 10GB transaction log stream karne ke liye generators essential hain.",
    "codeSnippet": "def read_transactions(file):\n    with open(file) as f:\n        for line in f:\n            yield parse_tx(line) # O(1) memory!",
    "tag": "Generators"
  },
  {
    "id": "py-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Decorators",
    "dimension": "How",
    "question": "How does a Python Decorator work, and why must you use `@functools.wraps`?",
    "answerHinglish": "Decorator ek higher-order function hai jo doosre function ko wrap karke bina source code modify kiye functionality extend karta hai. `@functools.wraps(fn)` original function ke metadata (`__name__`, `__doc__`) ko preserve karta hai, warna debugging aur logging mein wrapped function ka naam overwrite ho jata hai.",
    "tag": "Decorators"
  },
  {
    "id": "py-07",
    "domain": "Python & Data Ecosystem",
    "topic": "OOP Dunder",
    "dimension": "Comparison",
    "question": "What is the difference between `__str__` and `__repr__` in Python OOP?",
    "answerHinglish": "`__str__`: End-user readable representation (e.g. `Account 101 (Bal: \u20b950,000)`). `__repr__`: Developer unambiguous representation (ideal format: code that could recreate the object, e.g. `Account(acc_id=101, balance=50000.0)`). Agar `__str__` defined nahi hai toh Python fallback karke `__repr__` call karta hai.",
    "tag": "OOP"
  },
  {
    "id": "py-08",
    "domain": "Python & Data Ecosystem",
    "topic": "MRO",
    "dimension": "How",
    "question": "How does Method Resolution Order (MRO) resolve the Diamond Problem in multiple inheritance?",
    "answerHinglish": "Python C3 Linearization algorithm use karta hai. Ye ensure karta hai: 1) Children parents se pehle check hote hain, 2) Multiple parents class definition ke order mein check hote hain, 3) Monotonicity preserve hoti hai. Class ka `ClassName.__mro__` dekh kar search order inspect kiya ja sakta hai.",
    "tag": "MRO"
  },
  {
    "id": "py-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Packing",
    "dimension": "Code",
    "question": "Explain `*args` and `**kwargs` with parameter unpacking.",
    "answerHinglish": "`*args` variable positional arguments ko ek `tuple` mein pack karta hai. `**kwargs` variable keyword arguments ko ek `dict` mein pack karta hai. Calling side par `func(*my_list)` ya `func(**my_dict)` unpacking perform karta hai.",
    "tag": "Syntax"
  },
  {
    "id": "py-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Context Managers",
    "dimension": "How",
    "question": "How do `with` statements and Context Managers guarantee resource cleanup?",
    "answerHinglish": "Object ko `__enter__()` aur `__exit__(exc_type, exc_val, exc_tb)` implement karna hota hai. Chahe code mein exception aaye ya early `return` ho, `__exit__` hamesha guaranteed execute hota hai (database locks release karna, files close karna).",
    "tag": "Context Managers"
  },
  {
    "id": "py-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Collections",
    "dimension": "Code",
    "question": "Which Python `collections` structures are most important for coding interviews?",
    "answerHinglish": "1) `collections.defaultdict`: Missing keys par automatically default value initialize karta hai (no KeyError). 2) `collections.Counter`: O(N) frequency counts. 3) `collections.deque`: O(1) append/pop from both ends (Sliding Window/BFS).",
    "tag": "Collections"
  },
  {
    "id": "py-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Heapq",
    "dimension": "Code",
    "question": "How does `heapq` work in Python? Is it Min-Heap or Max-Heap?",
    "answerHinglish": "Python ka `heapq` module default mein **Min-Heap** implement karta hai (`heapq.heappop` smallest element deta hai). Max-Heap banane ke liye numbers ko `-val` negate karke push karna padta hai.",
    "tag": "Heap"
  },
  {
    "id": "py-13",
    "domain": "Python & Data Ecosystem",
    "topic": "List Comprehensions",
    "dimension": "Performance",
    "question": "Why are List Comprehensions faster than manual `for` loops with `.append()`?",
    "answerHinglish": "List comprehension C-level bytecode optimization use karta hai (`LIST_APPEND` instruction) jo Python interpreter ke function lookup aur method call overhead (`list.append`) ko bypass karta hai (approx 20-30% faster).",
    "tag": "Performance"
  },
  {
    "id": "py-14",
    "domain": "Python & Data Ecosystem",
    "topic": "Scope",
    "dimension": "Debugging",
    "question": "Explain the LEGB rule in Python variable scoping.",
    "answerHinglish": "Python variables ko 4 levels par search karta hai: 1) **L**ocal (function ke andar), 2) **E**nclosing (outer nested functions), 3) **G**lobal (module level), 4) **B**uilt-in (`len`, `range`, `print`). Inner function mein outer variable rebind karne ke liye `nonlocal` ya `global` keyword chahiye.",
    "tag": "Scope"
  },
  {
    "id": "py-15",
    "domain": "Python & Data Ecosystem",
    "topic": "Typing",
    "dimension": "Interview",
    "question": "What is Duck Typing in Python?",
    "answerHinglish": "'If it walks like a duck and quacks like a duck, it is a duck.' Python object ke explicit class type par depend nahi karta, balki uske methods/attributes par depend karta hai. Agar object `__iter__` implement karta hai, toh use iterate kiya ja sakta hai regardless of its class.",
    "tag": "Duck Typing"
  },
  {
    "id": "py-16",
    "domain": "Python & Data Ecosystem",
    "topic": "Banking Code",
    "dimension": "Banking",
    "question": "Why should you use the `decimal.Decimal` module instead of `float` for bank balance math in Python?",
    "answerHinglish": "Standard IEEE 754 `float` binary fractions use karta hai jisme rounding errors aate hain (`0.1 + 0.2 == 0.30000000000000004`). Financial systems mein exact base-10 arithmetic chahiye taaki paisa/cents mismatch na ho. Always use `Decimal('0.1')` for currency.",
    "tag": "Banking Math"
  },
  {
    "id": "np-01",
    "domain": "Python & Data Ecosystem",
    "topic": "NumPy Memory",
    "dimension": "Concept",
    "question": "Why is a NumPy ndarray 50x-100x faster than a Python standard list?",
    "answerHinglish": "Python list pointers ki array hoti hai jahan har element scattered heap memory mein hota hai aur type checking hoti hai. NumPy homogeneous data ko contiguous C-style memory block mein store karta hai aur CPU SIMD (Single Instruction Multiple Data) registers se hazaron calculations ek cycle mein parallel karta hai.",
    "tag": "NumPy"
  },
  {
    "id": "np-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Broadcasting",
    "dimension": "How",
    "question": "What are the two rules of NumPy Broadcasting?",
    "answerHinglish": "Dimensions ko right-to-left match kiya jata hai: 1) Dono dimensions equal hon, YA 2) Unme se kisi ek ki dimension 1 ho. Agar dimension 1 hai, toh wo automatically doosre array ke matching size tak stretch ho jaati hai bina memory duplicate kiye.",
    "codeSnippet": "A = np.ones((3, 3)) # shape (3, 3)\nB = np.array([10, 20, 30]) # shape (3,)\nC = A + B # B broadcasts across all 3 rows!",
    "tag": "Broadcasting"
  },
  {
    "id": "np-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Axis",
    "dimension": "Concept",
    "question": "What is the direction of `axis=0` vs `axis=1` in a 2D NumPy array?",
    "answerHinglish": "`axis=0` vertically rows ke across move karta hai (har column ka sum/mean deta hai, output shape collapses rows). `axis=1` horizontally columns ke across move karta hai (har row ka sum/mean deta hai, output shape collapses columns).",
    "tag": "Axis"
  },
  {
    "id": "np-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Views vs Copies",
    "dimension": "Debugging",
    "question": "Predict the bug: `sub = arr[0:5]; sub[0] = 999`. Did `arr` change?",
    "answerHinglish": "YES! Basic slicing (`arr[0:5]`) hamesha **View** return karta hai jo same underlying memory buffer point karta hai. `sub[0]` modify karne se original `arr[0]` bhi 999 ban jayega! Independent copy ke liye `arr[0:5].copy()` use karo.",
    "tag": "Views vs Copies"
  },
  {
    "id": "np-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Vectorization",
    "dimension": "Comparison",
    "question": "Vectorized calculation vs Python Loop: Write the vectorized syntax for 5% tax deduction on 1 million balances.",
    "answerHinglish": "Loop: `[b * 0.95 for b in balances]` (Slow, 1 million loop iterations). Vectorized: `net_balances = balances * 0.95` (Blazing fast, executed in compiled C buffer with zero Python interpreter overhead).",
    "tag": "Vectorization"
  },
  {
    "id": "np-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Reshape",
    "dimension": "Code",
    "question": "What is the difference between `np.reshape()`, `np.ravel()`, and `np.flatten()`?",
    "answerHinglish": "`reshape(r, c)` array ka view naye shape mein deta hai. `ravel()` 1D view return karta hai (modifying mutates original). `flatten()` 1D independent copy return karta hai (safe from mutation).",
    "tag": "Reshaping"
  },
  {
    "id": "np-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Boolean Masking",
    "dimension": "Code",
    "question": "How does Boolean Masking work for fraud threshold filtering?",
    "answerHinglish": "`mask = amounts > 100000` ek boolean array deta hai (`[True, False, True]`). `high_tx = amounts[mask]` sirf True elements extract karta hai. Multiple conditions ke liye bitwise operators use karo: `(amounts > 100000) & (channels == 'UPI')`.",
    "tag": "Filtering"
  },
  {
    "id": "np-08",
    "domain": "Python & Data Ecosystem",
    "topic": "NaN",
    "dimension": "Debugging",
    "question": "Why does `np.mean(arr)` return `nan` if the array contains even one missing value?",
    "answerHinglish": "Standard NumPy functions IEEE standard follow karte hain jahan kisi bhi number aur NaN ka result NaN hota hai. Missing values ignore karke calculation karne ke liye nan-safe functions use karo: `np.nanmean(arr)`, `np.nansum(arr)`, `np.nanstd(arr)`.",
    "tag": "NaN Handling"
  },
  {
    "id": "np-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Memory Order",
    "dimension": "How",
    "question": "What is C-order vs Fortran-order memory layout in NumPy arrays?",
    "answerHinglish": "C-order (`order='C'`, row-major): Rows sequentially contiguous memory mein store hoti hain (Row iteration fast). Fortran-order (`order='F'`, column-major): Columns sequentially contiguous memory mein store hoti hain (Column iteration fast).",
    "tag": "Memory Order"
  },
  {
    "id": "np-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Aggregations",
    "dimension": "Code",
    "question": "How do you find the index of the highest transaction per customer using NumPy?",
    "answerHinglish": "`np.argmax(amounts, axis=1)` max value ka integer index return karta hai along the specified axis. Isse exact transaction offset mil jata hai without sorting.",
    "tag": "Aggregations"
  },
  {
    "id": "np-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Where",
    "dimension": "Code",
    "question": "Explain `np.where(condition, x, y)` with a banking risk scoring example.",
    "answerHinglish": "Ye SQL ke `CASE WHEN condition THEN x ELSE y END` ka vectorized equivalent hai: `risk_labels = np.where(amounts > 500000, 'HIGH_RISK', 'NORMAL')`. C-level speed par poore array ko classify karta hai.",
    "tag": "Conditionals"
  },
  {
    "id": "np-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Select",
    "dimension": "Code",
    "question": "How do you evaluate multiple tiered conditions in NumPy using `np.select`?",
    "answerHinglish": "`np.select(conditions_list, choices_list, default)`: Multiple tiered rules evaluate karta hai: `conds = [amt > 1000000, amt > 100000]; choices = ['TIER_1', 'TIER_2']; np.select(conds, choices, default='TIER_3')`.",
    "tag": "Multi-condition"
  },
  {
    "id": "np-13",
    "domain": "Python & Data Ecosystem",
    "topic": "Math",
    "dimension": "Interview",
    "question": "What is the difference between `*` and `@` operator on 2D NumPy arrays?",
    "answerHinglish": "`*` element-wise multiplication karta hai (`A * B` multiplies corresponding elements). `@` (ya `np.matmul(A, B)`) matrix dot product multiplication karta hai (Row by Column dot product).",
    "tag": "Matrix Math"
  },
  {
    "id": "np-14",
    "domain": "Python & Data Ecosystem",
    "topic": "Memory Optimization",
    "dimension": "Production",
    "question": "How can downcasting numeric dtypes save 75% memory on 100M banking rows?",
    "answerHinglish": "Default `int64` 8 bytes leta hai. Agar column customer age ya transaction status code (0-10) store karta hai, toh `int8` (1 byte) use karke memory 800MB se ghata kar 100MB ki ja sakti hai (`arr.astype(np.int8)`).",
    "tag": "Optimization"
  },
  {
    "id": "np-15",
    "domain": "Python & Data Ecosystem",
    "topic": "Random",
    "dimension": "Scenario",
    "question": "Why use `np.random.default_rng(seed)` instead of legacy `np.random.seed()`?",
    "answerHinglish": "`default_rng()` modern PCG64 bit-generator use karta hai jo faster, statistically superior, aur thread-safe hai. Legacy `np.random.seed` global state share karta hai jo concurrent multi-threaded pipelines mein race condition create karta hai.",
    "tag": "RNG"
  },
  {
    "id": "np-16",
    "domain": "Python & Data Ecosystem",
    "topic": "Linear Algebra",
    "dimension": "Banking",
    "question": "Where does NumPy Linear Algebra (`np.linalg`) apply in banking risk models?",
    "answerHinglish": "Credit risk correlation matrices, portfolio variance optimization (Markowitz Efficient Frontier: covariance matrix math $w^T \\Sigma w$), aur credit card fraud anomaly detection (Principal Component Analysis - PCA via SVD).",
    "tag": "Risk Models"
  },
  {
    "id": "pd-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Indexing",
    "dimension": "Comparison",
    "question": "What is the crucial boundary difference between `.loc` and `.iloc` in pandas?",
    "answerHinglish": "`.loc[0:3]` label-based selection hai aur end boundary ko **INCLUDE** karta hai (rows 0, 1, 2, 3 saari aayengi). `.iloc[0:3]` integer position-based selection hai aur end boundary ko **EXCLUDE** karta hai (sirf rows 0, 1, 2 aayengi).",
    "tag": "pandas Indexing"
  },
  {
    "id": "pd-02",
    "domain": "Python & Data Ecosystem",
    "topic": "GroupBy",
    "dimension": "Concept",
    "question": "Explain Split-Apply-Combine in pandas `groupby()`.",
    "answerHinglish": "1) **Split:** Data ko keys (e.g. `customer_id`) ke basis par groups mein divide karta hai. 2) **Apply:** Har group par aggregation (`.sum()`, `.mean()`, `.count()`) compute karta hai. 3) **Combine:** Summarized results ko ek consolidated summary DataFrame mein stitch karta hai.",
    "tag": "GroupBy"
  },
  {
    "id": "pd-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Performance",
    "dimension": "Production",
    "question": "Why is `for idx, row in df.iterrows()` a catastrophic performance anti-pattern?",
    "answerHinglish": "`iterrows()` har single row ke liye naya pandas Series object instantiate karta hai aur type conversion karta hai (50x-100x slower). Always use vectorized operations, `.groupby()`, ya `np.where()` instead.",
    "tag": "Performance"
  },
  {
    "id": "pd-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Merge",
    "dimension": "Comparison",
    "question": "Explain `df.merge()` vs `df.join()` vs `pd.concat()`.",
    "answerHinglish": "`merge()`: SQL JOIN style database merging on arbitrary columns (on='customer_id', how='left'). `join()`: Index-based merging (left join on index). `concat()`: Axis ke along tables ko vertically (stacking rows) ya horizontally (appending columns) bind karta hai.",
    "tag": "Merging"
  },
  {
    "id": "pd-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Missing Data",
    "dimension": "How",
    "question": "What is the difference between `df.dropna()` and `df.fillna()` for financial data?",
    "answerHinglish": "`dropna()` missing values waali rows ya columns ko discard karta hai (can cause loss of valid records). `fillna()` missing values ko impute karta hai (e.g. `df['balance'].fillna(0)` ya forward-fill `df['rate'].ffill()` for time-series interest rates).",
    "tag": "Data Cleaning"
  },
  {
    "id": "pd-06",
    "domain": "Python & Data Ecosystem",
    "topic": "SQL vs pandas",
    "dimension": "Comparison",
    "question": "What is the pandas equivalent of SQL `HAVING SUM(amount) > 50000`?",
    "answerHinglish": "`df.groupby('customer_id')['amount'].sum().loc[lambda x: x > 50000]` ya `.filter(lambda g: g['amount'].sum() > 50000)`. Pehle aggregation hoti hai, fir grouped aggregate result filter hota hai.",
    "tag": "SQL Translation"
  },
  {
    "id": "pd-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Rolling Windows",
    "dimension": "Banking",
    "question": "How do you calculate a 7-day rolling average of transaction amounts in pandas?",
    "answerHinglish": "`df.set_index('created_at')['amount'].rolling(window='7D').mean()`. Ye rolling time-window par continuous moving average compute karta hai, essential for customer spending anomaly detection.",
    "tag": "Time Series"
  },
  {
    "id": "pd-08",
    "domain": "Python & Data Ecosystem",
    "topic": "Categories",
    "dimension": "Optimization",
    "question": "How does converting `object` columns to `category` dtype optimize memory in transaction data?",
    "answerHinglish": "Agar column mein repetitive text strings hain (e.g. `channel`: 'UPI', 'IMPS', 'NEFT' across 10M rows), `category` dtype har unique string ko integer code (1 byte) se represent karta hai, reducing DataFrame memory consumption by 80%!",
    "tag": "Memory Optimization"
  },
  {
    "id": "pd-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Apply",
    "dimension": "Why",
    "question": "When should you use `.apply()` and when should you avoid it in pandas?",
    "answerHinglish": "Avoid when standard vectorized operations exist (`df['a'] + df['b']`). Use only for complex custom Python business logic that cannot be vectorized across C-code (e.g. calling an external encryption library or parsing complex JSON payloads).",
    "tag": "Apply"
  },
  {
    "id": "pd-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Pivot Tables",
    "dimension": "Code",
    "question": "How do you create a pivot table showing monthly transaction volume per payment channel in pandas?",
    "answerHinglish": "`df.pivot_table(index='month', columns='channel', values='amount', aggfunc='sum', fill_value=0)`. Ye tabular report generate karta hai jahan rows months hain, columns channels hain, aur cells sum of amounts hain.",
    "tag": "Pivoting"
  },
  {
    "id": "pd-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Query",
    "dimension": "Code",
    "question": "How does `df.query('amount > 10000 and channel == \"UPI\"')` improve readability?",
    "answerHinglish": "Boolean indexing `df[(df['amount'] > 10000) & (df['channel'] == 'UPI')]` syntax verbose aur error-prone hota hai. `df.query()` string-based SQL-like syntax deta hai aur memory buffer optimize karta hai using `numexpr`.",
    "tag": "Query"
  },
  {
    "id": "pd-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Duplicates",
    "dimension": "Banking",
    "question": "How do you find and drop duplicate transaction requests in pandas?",
    "answerHinglish": "`df.duplicated(subset=['customer_id', 'amount', 'created_at'], keep='first')` duplicates identify karta hai. `df.drop_duplicates(subset=['idempotency_key'], keep='first', inplace=True)` deduplication karta hai.",
    "tag": "Deduplication"
  },
  {
    "id": "pd-13",
    "domain": "Python & Data Ecosystem",
    "topic": "Datetime",
    "dimension": "How",
    "question": "Why is `pd.to_datetime(df['timestamp'])` essential before time-series analysis?",
    "answerHinglish": "CSV se read karne par timestamps plain `object` (string) hote hain. `pd.to_datetime()` unhe `datetime64[ns]` type mein convert karta hai, enabling `.dt.hour`, `.dt.day_name()`, time resampling (`.resample('M')`), aur timezone conversions.",
    "tag": "Datetime"
  },
  {
    "id": "pd-14",
    "domain": "Python & Data Ecosystem",
    "topic": "Cumulative",
    "dimension": "Code",
    "question": "What pandas function computes cumulative transaction balance per account?",
    "answerHinglish": "`df.groupby('account_id')['amount'].cumsum()`. Ye SQL Window function `SUM(...) OVER (PARTITION BY ... ORDER BY ...)` ka direct pandas equivalent hai.",
    "tag": "Window Equivalent"
  },
  {
    "id": "pd-15",
    "domain": "Python & Data Ecosystem",
    "topic": "Outliers",
    "dimension": "Data Science",
    "question": "How do you clip extreme transaction amounts to the 99th percentile in pandas?",
    "answerHinglish": "`cap = df['amount'].quantile(0.99); df['amount_capped'] = df['amount'].clip(upper=cap)`. Ye fraud outliers ko normalize karne aur distribution skewness theek karne ke liye standard practice hai.",
    "tag": "Data Prep"
  },
  {
    "id": "pd-16",
    "domain": "Python & Data Ecosystem",
    "topic": "Memory Leak",
    "dimension": "Production",
    "question": "What is `SettingWithCopyWarning` in pandas and how do you fix it?",
    "answerHinglish": "Ye warning tab aati hai jab aap slice of a slice par assignment karte hain (`df[df['a']>0]['b'] = 5`), kyunki pandas guarantee nahi karta ki view modify hoga ya copy. Fix: Always use `.loc` directly: `df.loc[df['a'] > 0, 'b'] = 5`.",
    "tag": "SettingWithCopy"
  },
  {
    "id": "pd-17",
    "domain": "Python & Data Ecosystem",
    "topic": "String Vectorization",
    "dimension": "Code",
    "question": "How do you extract the 4-digit bank branch code from an IFSC string in pandas?",
    "answerHinglish": "`df['ifsc'].str.slice(0, 4)` ya regex `df['ifsc'].str.extract(r'^([A-Z]{4})')`. `.str` accessor C-speed string vectorization provide karta hai bina Python loop ke.",
    "tag": "String Ops"
  },
  {
    "id": "pd-18",
    "domain": "Python & Data Ecosystem",
    "topic": "File Formats",
    "dimension": "Production",
    "question": "Why use Parquet instead of CSV for 50GB banking data pipelines in pandas?",
    "answerHinglish": "Parquet columnar storage format hai with Snappy compression. CSV se 80% chota hota hai disk par, schema aur data types retain karta hai, aur query run karte waqt sirf required columns read karta hai (Column pruning), making it 10x-20x faster than reading CSV.",
    "tag": "Parquet"
  },
  {
    "id": "pd-19",
    "domain": "Python & Data Ecosystem",
    "topic": "SQL Export",
    "dimension": "How",
    "question": "How does `df.to_sql('table_name', con=engine, if_exists='append', chunksize=10000)` handle batching?",
    "answerHinglish": "`chunksize=10000` data ko batches mein split karta hai taaki database server par single query packet limit (`max_allowed_packet`) breach na ho aur client-side memory consume na ho.",
    "tag": "DB Export"
  },
  {
    "id": "pd-20",
    "domain": "Python & Data Ecosystem",
    "topic": "Pipeline",
    "dimension": "Architecture",
    "question": "What is method chaining with `.pipe()` in pandas?",
    "answerHinglish": "Method chaining allows clean ETL: `df.pipe(clean_data).pipe(calculate_tax).pipe(flag_fraud)`. Code readable banta hai without ugly temporary variables ya nested function calls.",
    "tag": "Pipelines"
  },
  {
    "id": "mpl-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Matplotlib Anatomy",
    "dimension": "Concept",
    "question": "What is the structural hierarchy between Figure and Axes in Matplotlib?",
    "answerHinglish": "Figure poora outer window/canvas/page container hai. Axes actual individual graph/coordinate system hai jisme x-axis, y-axis, title, ticks aur plotted lines hoti hain. Ek Figure mein multiple Axes (subplots) ho sakte hain.",
    "tag": "Matplotlib"
  },
  {
    "id": "mpl-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Matplotlib API",
    "dimension": "Comparison",
    "question": "Object-Oriented (OO) API vs `pyplot` state-machine API: Why is OO API compulsory for production dashboards?",
    "answerHinglish": "`plt.plot()` state-machine API global active figure track karta hai jo concurrent multi-threaded web servers ya multiple subplots mein race conditions aur figure bleed karta hai. OO API (`fig, ax = plt.subplots()`) explicit figure aur axes references deta hai jo modular, testable aur thread-safe hai.",
    "tag": "OO API"
  },
  {
    "id": "mpl-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Subplots",
    "dimension": "Code",
    "question": "How do you create a 2x2 grid of subplots for a 4-metric banking analytics dashboard?",
    "answerHinglish": "`fig, axes = plt.subplots(2, 2, figsize=(14, 10))`. `axes` ek 2x2 NumPy array of Axes ban jata hai. Subplots ko access karne ke liye `axes[0, 0].bar(...)`, `axes[0, 1].plot(...)`, `axes[1, 0].hist(...)`, `axes[1, 1].scatter(...)` use karte hain.",
    "tag": "Subplots"
  },
  {
    "id": "mpl-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Memory Leaks",
    "dimension": "Production",
    "question": "Why must you call `plt.close(fig)` when generating charts in a backend API service?",
    "answerHinglish": "Matplotlib internally active figures ki global list maintain karta hai. Agar aap `plt.close(fig)` call nahi karenge, toh memory deallocate nahi hogi aur har incoming HTTP request par RAM badhti jayegi jab tak server Out-Of-Memory (OOM) crash na ho jaye.",
    "tag": "Memory Leak"
  },
  {
    "id": "mpl-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Charts",
    "dimension": "Banking",
    "question": "Which chart type is best for showing Transaction Volume Trends over time vs Payment Channel breakdown?",
    "answerHinglish": "Trends over time: **Line Chart** (`ax.plot(dates, volume)`) with moving averages. Channel breakdown: **Bar Chart** (`ax.bar(channels, count)`) ya **Donut Chart** with percentage annotations.",
    "tag": "Chart Selection"
  },
  {
    "id": "mpl-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Histograms",
    "dimension": "Data Science",
    "question": "Why use log scale (`ax.set_yscale('log')`) when plotting banking transaction amounts?",
    "answerHinglish": "Banking transactions highly right-skewed hoti hain (99% transactions \u20b910 se \u20b95,000 ke beech hoti hain, jabki 1% \u20b950 Lakh+ hoti hain). Linear scale par high values low values ko squash kar deti hain. Log scale distribution spread ko visually interpretable banata hai.",
    "tag": "Data Distribution"
  },
  {
    "id": "mpl-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Formatting",
    "dimension": "Code",
    "question": "How do you format y-axis values as Indian Rupee strings ('\u20b91.2 Cr', '\u20b950 K') in Matplotlib?",
    "answerHinglish": "Use `matplotlib.ticker.FuncFormatter`: `def rupee_fmt(x, p): return f'\u20b9{x/1e5:.1f}L'; ax.yaxis.set_major_formatter(FuncFormatter(rupee_fmt))`.",
    "tag": "Axis Formatting"
  },
  {
    "id": "mpl-08",
    "domain": "Python & Data Ecosystem",
    "topic": "Heatmap",
    "dimension": "Banking",
    "question": "How does a 2D Heatmap (`ax.imshow()`) help in IDFC credit card fraud detection?",
    "answerHinglish": "X-axis = Hour of day (0-23), Y-axis = Day of week (Mon-Sun), Cell color = Fraud attempt density. Heatmap se visual pattern instantly dikhta hai ki fraud spikes raat 2 AM se 4 AM ke beech weekends par concentrate hoti hain.",
    "tag": "Fraud Heatmap"
  },
  {
    "id": "mpl-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Layout",
    "dimension": "Code",
    "question": "What does `fig.tight_layout()` do?",
    "answerHinglish": "Ye subplots, axis labels, titles aur ticks ke beech spacing ko automatically adjust karta hai taaki overlapping text aur cut-off labels prevent ho sakein.",
    "tag": "Layout"
  },
  {
    "id": "mpl-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Export",
    "dimension": "Code",
    "question": "How do you save publication-quality charts to disk in Matplotlib?",
    "answerHinglish": "`fig.savefig('dashboard.png', dpi=300, bbox_inches='tight')`. `dpi=300` crisp high resolution deta hai aur `bbox_inches='tight'` extra whitespace trim karta hai.",
    "tag": "Export"
  },
  {
    "id": "mpl-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Multiple Y-Axes",
    "dimension": "Code",
    "question": "How do you plot Transaction Count and Average Latency on the same chart with two different Y-axes?",
    "answerHinglish": "`ax2 = ax1.twinx()`. Ye same x-axis share karta hai par right side par independent y-axis create karta hai, allowing two different units on one visual.",
    "tag": "Twin Axis"
  },
  {
    "id": "mpl-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Styling",
    "dimension": "Design",
    "question": "How do you apply a clean corporate theme in Matplotlib?",
    "answerHinglish": "`plt.style.use('seaborn-v0_8-whitegrid')` ya custom rcParams: `plt.rcParams['font.family'] = 'sans-serif'`, spine borders hide karna (`ax.spines['top'].set_visible(False)`).",
    "tag": "Styling"
  },
  {
    "id": "react-01",
    "domain": "React.js & Frontend Architecture",
    "topic": "Fiber",
    "dimension": "Concept",
    "question": "What is React Fiber and how does it differ from the legacy Stack Reconciler?",
    "answerHinglish": "Legacy Stack Reconciler synchronous tha\u2014bade UI updates ke dauran main thread block ho jata tha aur UI freeze ho jati thi. Fiber ek virtual stack frame hai jisme har element unit of work (Fiber node) hota hai. Ye interruptible, asynchronous, time-sliced rendering allow karta hai taaki high-priority user input (typing/clicks) pehle render ho.",
    "tag": "React Fiber"
  },
  {
    "id": "react-02",
    "domain": "React.js & Frontend Architecture",
    "topic": "Concurrent Mode",
    "dimension": "How",
    "question": "How does React 18 Concurrent Mode implement Time-Slicing?",
    "answerHinglish": "React rendering work ko small 5ms chunks mein split karta hai using cooperative scheduling (`MessageChannel`/`requestIdleCallback`). Har 5ms baad React check karta hai agar browser queue mein koi urgent event hai (like user typing in IFSC search). Agar hai, toh current render pause hota hai aur user event execute hota hai!",
    "tag": "Concurrent React"
  },
  {
    "id": "react-03",
    "domain": "React.js & Frontend Architecture",
    "topic": "Hooks Internals",
    "dimension": "How",
    "question": "How do `useState` and `useEffect` track state internally across renders?",
    "answerHinglish": "Fiber node ke andar ek singly-linked list of hooks hoti hai (`fiber.memoizedState -> hook1 -> hook2 -> hook3`). Har render par React hooks ko unke exact call order ke index par traverse karta hai. Isi wajah se Hooks ko loops, conditions ya nested functions mein call karna strictly forbidden hai!",
    "tag": "Hooks Internals"
  },
  {
    "id": "react-04",
    "domain": "React.js & Frontend Architecture",
    "topic": "Stale Closures",
    "dimension": "Debugging",
    "question": "What causes a Stale Closure in `useEffect` and how do you fix it?",
    "answerHinglish": "Jab `useEffect` callback outer scope ke state/prop ko reference karta hai par use dependency array `[]` mein pass nahi karta. Callback initial render ke purane value ko trap kar leta hai. Fix: 1) State ko dependency array mein include karo, 2) Functional state updater use karo: `setCount(prev => prev + 1)`.",
    "tag": "Stale Closure"
  },
  {
    "id": "react-05",
    "domain": "React.js & Frontend Architecture",
    "topic": "Memoization",
    "dimension": "Comparison",
    "question": "What is the exact distinction between `useCallback`, `useMemo`, and `React.memo`?",
    "answerHinglish": "`React.memo(Component)`: Higher-order component jo child component ke props ko shallow compare karke re-render skip karta hai. `useCallback(fn, deps)`: Function reference ko memoize karta hai. `useMemo(() => val, deps)`: Expensive calculation ke return value ko memoize karta hai.",
    "tag": "Memoization"
  },
  {
    "id": "react-06",
    "domain": "React.js & Frontend Architecture",
    "topic": "State Updates",
    "dimension": "How",
    "question": "Why are React state updates batched and how does React 18 Automatic Batching work?",
    "answerHinglish": "React multiple `setState` calls ko group karke single re-render trigger karta hai DOM thrashing rokne ke liye. React 18 mein Automatic Batching Promises, `setTimeout`, aur native event handlers ke andar bhi kaam karti hai bina kisi manual wrapper ke.",
    "tag": "Batching"
  },
  {
    "id": "react-07",
    "domain": "React.js & Frontend Architecture",
    "topic": "Redux Toolkit",
    "dimension": "Why",
    "question": "Why does Redux Toolkit allow mutating syntax like `state.balance += 500`?",
    "answerHinglish": "Redux Toolkit internally **Immer** library use karta hai. Immer JavaScript `Proxy` objects se changes ko track karta hai aur background mein complete immutable new state tree generate karta hai. Developer ko nested spread operators (`{ ...state, accounts: { ...state.accounts } }`) likhne ki zaroorat nahi padti.",
    "tag": "Redux Toolkit"
  },
  {
    "id": "react-08",
    "domain": "React.js & Frontend Architecture",
    "topic": "Context API",
    "dimension": "Production",
    "question": "What is the primary performance pitfall of using React Context for global state in complex apps?",
    "answerHinglish": "Jab Context value change hoti hai, toh us context ko consume karne waale saare components automatically re-render hote hain, chahe unhe sirf value ka ek chota sa unchanged part chahiye ho! Solution: Split contexts (e.g. AuthContext, ThemeContext, PaymentContext) ya Zustand/Redux use karo with fine-grained selectors.",
    "tag": "Context Pitfall"
  },
  {
    "id": "react-09",
    "domain": "React.js & Frontend Architecture",
    "topic": "Config-Driven UI",
    "dimension": "Banking",
    "question": "How does a Config-Driven UI architecture reduce frontend deployment cycles in banking onboarding?",
    "answerHinglish": "Backend API se JSON schema aata hai jo fields, labels, input types (PAN, Aadhaar, Account Type), conditional visibility aur validation regex define karta hai. Frontend generic FormRenderer engine chalata hai jo schema consume karke forms render karta hai. Naya banking flow release karne ke liye zero frontend code deployment chahiye!",
    "tag": "Config-Driven UI"
  },
  {
    "id": "react-10",
    "domain": "React.js & Frontend Architecture",
    "topic": "Keys",
    "dimension": "Debugging",
    "question": "Why is using array `index` as the `key` prop in a dynamic list of banking accounts an anti-pattern?",
    "answerHinglish": "Agar list mein items reorder, filter, ya delete hote hain, toh indexes shift ho jaate hain. React DOM nodes ko match karne ke liye key use karta hai; index badalne par wrong component state bind ho sakti hai (e.g. Account 2 ka input field Account 1 ke data ke saath render ho jaye). Always use persistent unique ID (`account.id`).",
    "tag": "React Keys"
  },
  {
    "id": "react-11",
    "domain": "React.js & Frontend Architecture",
    "topic": "Code Splitting",
    "dimension": "Performance",
    "question": "How do `React.lazy()` and `Suspense` optimize initial load time for heavy banking portals?",
    "answerHinglish": "Default bundle mein poora portal download hota hai (3-5MB). `React.lazy(() => import('./LoanDashboard'))` route-level code splitting karta hai. Loan dashboard ka JS bundle sirf tab download hota hai jab user us tab par navigate kare, cutting initial bundle size by 60%+.",
    "tag": "Code Splitting"
  },
  {
    "id": "react-12",
    "domain": "React.js & Frontend Architecture",
    "topic": "Optimistic UI",
    "dimension": "UX",
    "question": "What is an Optimistic UI update in a banking mobile/web checkout?",
    "answerHinglish": "Server confirmation ka wait kiye bina client turant UI update kar deta hai (e.g. Beneficiary added icon instantly shows checkmark). Background network request fail hone par UI rollback ho jaati hai aur error toast dikhaya jata hai. Perceived speed improve hoti hai.",
    "tag": "Optimistic UI"
  },
  {
    "id": "react-13",
    "domain": "React.js & Frontend Architecture",
    "topic": "useRef",
    "dimension": "Concept",
    "question": "What are the two primary use cases of `useRef` in React?",
    "answerHinglish": "1) Direct DOM access (e.g. input focus karna, scroll position measure karna). 2) Storing mutable values that persist across renders without triggering a re-render when updated (e.g. storing timer IDs, previous prop values, tracking render counts).",
    "tag": "useRef"
  },
  {
    "id": "react-14",
    "domain": "React.js & Frontend Architecture",
    "topic": "Custom Hooks",
    "dimension": "Architecture",
    "question": "How do Custom Hooks promote clean architecture in banking UI applications?",
    "answerHinglish": "UI presentation ko business logic se detach karte hain. Jaise `useAccountBalance(accountId)` data fetching, polling, caching, error states aur websocket subscription ko encapsulate karta hai; component sirf `{ balance, isLoading }` render karta hai.",
    "tag": "Custom Hooks"
  },
  {
    "id": "react-15",
    "domain": "React.js & Frontend Architecture",
    "topic": "Error Boundaries",
    "dimension": "Resilience",
    "question": "What is a React Error Boundary and where should it be placed in a banking app?",
    "answerHinglish": "Class component jo `componentDidCatch` ya `getDerivedStateFromError` implement karta hai. Ye child component crash ko catch karke fallback UI render karta hai taaki poora page blank white screen na bane. Payment widget, transaction list, aur loan calculator ke around independent error boundaries honi chahiye.",
    "tag": "Error Boundary"
  },
  {
    "id": "react-16",
    "domain": "React.js & Frontend Architecture",
    "topic": "Form Performance",
    "dimension": "Performance",
    "question": "Controlled vs Uncontrolled inputs with React Hook Form in high-complexity 50-field KYC forms?",
    "answerHinglish": "Controlled inputs (`useState` on change) har keystroke par poore component tree ko re-render karte hain (laggy typing on 50 fields). React Hook Form uncontrolled refs use karta hai jo keystrokes par re-render nahi hote, validating data via Zod schema only on blur/submit for 60fps performance.",
    "tag": "Form Architecture"
  },
  {
    "id": "sec-01",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "PCI-DSS",
    "dimension": "Concept",
    "question": "What is PCI-DSS and what are its core mandates for card data?",
    "answerHinglish": "Payment Card Industry Data Security Standard (12 requirements). Core rule: Cardholder Data (PAN, Cardholder Name, Expiry) must be encrypted at rest and in transit. Sensitive Authentication Data (SAD - CVV/CVC, PIN, PIN Block) must NEVER be stored after transaction authorization, even if encrypted!",
    "tag": "PCI-DSS"
  },
  {
    "id": "sec-02",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "RBI Localization",
    "dimension": "Banking",
    "question": "Explain the RBI Data Localization Directive for payment systems in India.",
    "answerHinglish": "RBI mandate: Saara payment data (customer credentials, transaction logs, settlement data, audit trails) must be stored ONLY in physical servers located in India. Processing overseas allow hai temporarily par settlement ke 24 hours ke andar external data wipe hona chahiye aur final storage India mein hona chahiye.",
    "tag": "RBI Directive"
  },
  {
    "id": "sec-03",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "Tokenization",
    "dimension": "How",
    "question": "How does Card on File Tokenization (CoFT) work and why did RBI mandate it?",
    "answerHinglish": "Merchants (Amazon, Swiggy) 16-digit card number (PAN) aur CVV save nahi kar sakte. Card Network (Visa/Mastercard/RuPay) card ko ek device-and-merchant-specific non-sensitive 16-digit Token se replace karta hai. Token leak hone par bhi attacker doosre merchant par use nahi kar sakta.",
    "tag": "Tokenization"
  },
  {
    "id": "sec-04",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "Encryption at Rest",
    "dimension": "How",
    "question": "Why is AES-256 GCM preferred over AES-256 CBC for database column encryption?",
    "answerHinglish": "AES-256 GCM (Galois/Counter Mode) Authenticated Encryption provide karta hai (Confidentiality + Integrity via Auth Tag). Ciphertext tampering detect ho jaati hai. AES-256 CBC integrity check nahi deta aur Padding Oracle attacks ke against vulnerable hota hai.",
    "tag": "Encryption"
  },
  {
    "id": "sec-05",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "HSM",
    "dimension": "Concept",
    "question": "What is a Hardware Security Module (HSM) and why is it used in banking core switches?",
    "answerHinglish": "HSM ek physical tamper-resistant hardware appliance hai jo cryptographic keys ko generate, store aur execute karta hai. Master keys kabhi bhi hardware chip se plain text mein bahar nahi nikalti. Physical intrusion detect hone par chip self-destructs (zeroization).",
    "tag": "HSM"
  },
  {
    "id": "sec-06",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "mTLS",
    "dimension": "How",
    "question": "What is Mutual TLS (mTLS) and where is it mandatory in banking microservices?",
    "answerHinglish": "Standard TLS mein sirf client server ka certificate verify karta hai. mTLS mein server aur client dono ek doosre ke cryptographic X.509 certificates verify karte hain. Banking core switches, NPCI UPI APIs, aur internal payment microservices ke beech mTLS compulsory hota hai.",
    "tag": "mTLS"
  },
  {
    "id": "sec-07",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "OWASP",
    "dimension": "Security",
    "question": "What is Broken Object Level Authorization (BOLA / IDOR) in banking REST APIs?",
    "answerHinglish": "Attacker request parameter change karta hai: `GET /api/v1/accounts/102/statement` jabki logged-in user 101 hai. Agar server session check mein verify nahi karta ki Account 102 logged-in user ka hai ya nahi, toh attacker doosre customer ka statement dekh sakta hai. Fix: Enforce object ownership checks at the database query level.",
    "tag": "OWASP"
  },
  {
    "id": "sec-08",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "SQL Injection",
    "dimension": "Code",
    "question": "How do Parameterized Queries prevent SQL Injection fundamentally in DBMS engines?",
    "answerHinglish": "Parameterized query SQL code aur user data ko physically separate phases mein process karti hai. Database pehle SQL statement ko compile karke fixed Abstract Syntax Tree (AST) banata hai. User input baad mein purely string literal parameter bind hota hai\u2014input kabhi bhi SQL executable code nahi ban sakta.",
    "tag": "SQLi Prevention"
  },
  {
    "id": "sec-09",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "XSS",
    "dimension": "Security",
    "question": "Stored XSS vs Reflected XSS in banking portals: How does React protect against XSS?",
    "answerHinglish": "React default mein JSX expressions ke andar variables ko automatically escape karta hai string literals mein (`<div>{userInput}</div>`). Attackers script tag inject nahi kar sakte jab tak developer explicitly `dangerouslySetInnerHTML` use na kare.",
    "tag": "XSS"
  },
  {
    "id": "sec-10",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "Audit Logs",
    "dimension": "Compliance",
    "question": "What are Tamper-Proof Audit Logs and why are they mandatory for RBI compliance?",
    "answerHinglish": "Har financial transaction, employee admin action, aur balance adjustment append-only immutable storage mein log hona chahiye with cryptographic hash chaining (blockchain-style: each log entry contains hash of previous entry). Koi bhi admin ya attacker logs modify ya delete nahi kar sakta without breaking the hash chain.",
    "tag": "Audit Logs"
  },
  {
    "id": "sec-11",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "JWT",
    "dimension": "Security",
    "question": "What is the danger of storing JWT tokens in browser `localStorage` in banking applications?",
    "answerHinglish": "Agar website par koi XSS vulnerability exist karti hai, toh malicious script `localStorage.getItem('token')` se session token chura sakti hai. Best practice: Auth tokens ko `HttpOnly`, `Secure`, `SameSite=Strict` cookies mein store karo, jise JavaScript access nahi kar sakti.",
    "tag": "JWT Security"
  },
  {
    "id": "sec-12",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "CSRF",
    "dimension": "Security",
    "question": "How does `SameSite=Strict` cookie attribute prevent Cross-Site Request Forgery (CSRF)?",
    "answerHinglish": "`SameSite=Strict` cookie ko kisi bhi third-party site se aane waali request ke saath send hone se block karta hai. Agar user malicious website par click karta hai, toh browser bank cookie attach nahi karega, preventing unauthorized transfer.",
    "tag": "CSRF"
  },
  {
    "id": "sec-13",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "MFA",
    "dimension": "Banking",
    "question": "What are the 3 factors of Multi-Factor Authentication (MFA)?",
    "answerHinglish": "1) Knowledge: Something you know (Password / PIN). 2) Possession: Something you have (Phone OTP / Hardware FIDO key / SIM Binding). 3) Inherence: Something you are (Fingerprint / Face ID biometrics). Banking transactions require at least 2 distinct factors.",
    "tag": "MFA"
  },
  {
    "id": "sec-14",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "SIM Binding",
    "dimension": "Banking",
    "question": "What is Device & SIM Binding in modern Indian mobile banking apps (UPI)?",
    "answerHinglish": "App registration ke waqt device hardware IMEI/UUID aur physical SIM card se encrypted SMS silently bank gateway ko bhejti hai. User session hardware device aur registered phone number se cryptographically tie ho jata hai. SIM swap ya remote device login prevent hota hai.",
    "tag": "SIM Binding"
  },
  {
    "id": "sec-15",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "Data Masking",
    "dimension": "Compliance",
    "question": "What is Dynamic Data Masking for Aadhaar and PAN numbers?",
    "answerHinglish": "Database aur logs mein sensitive identifiers mask hone chahiye: Aadhaar card ke pehle 8 digits mask hote hain (`XXXX-XXXX-1234`), aur PAN card ke beech ke characters mask hote hain (`ABCXX1234X`). Customer care agents sirf unmasked last 4 digits dekh sakte hain.",
    "tag": "Masking"
  },
  {
    "id": "sec-16",
    "domain": "FinTech Security & RBI Compliance",
    "topic": "API Security",
    "dimension": "Production",
    "question": "How do you protect internal banking microservices from Server-Side Request Forgery (SSRF)?",
    "answerHinglish": "Internal services par egress firewall rules lagao. User-supplied URLs ko resolve karte waqt private IP ranges (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `169.254.169.254` cloud metadata) ko strictly block karo via URL validation allowlist.",
    "tag": "SSRF"
  },
  {
    "id": "devops-01",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Docker Multi-Stage",
    "dimension": "Concept",
    "question": "Why are Multi-Stage Docker builds mandatory for production Node.js banking containers?",
    "answerHinglish": "Build environment (compilers, npm build, TypeScript tools, devDependencies) ko separate stage mein isolate kiya jata hai. Final production image mein sirf lightweight runtime (`node:alpine` ya Distroless) aur compiled JS copy hoti hai. Image size 1GB se ghatkar 80MB ho jaati hai aur vulnerabilities 90% kam ho jaati hain.",
    "tag": "Docker Multi-Stage"
  },
  {
    "id": "devops-02",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Rootless Containers",
    "dimension": "Security",
    "question": "Why should Docker containers NEVER run as `root` user in banking production?",
    "answerHinglish": "Agar attacker kisi application vulnerability (RCE) ke through container compromise karta hai, aur container root user par chal raha hai, toh container escape attack se attacker host Linux kernel aur poore underlying server ka root control le sakta hai. Always use `USER node` ya non-root UID 10001.",
    "tag": "Container Security"
  },
  {
    "id": "devops-03",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Kubernetes Pods",
    "dimension": "Concept",
    "question": "What is a Kubernetes Pod and why doesn't K8s manage containers directly?",
    "answerHinglish": "Pod Kubernetes ki smallest deployable unit hai jo ek ya zyada containers (tightly coupled sidecars, logging proxies) ko encapsulate karti hai. Pod ke sabhi containers same Linux network namespace (same IP address, localhost communication) aur shared storage volumes share karte hain.",
    "tag": "Kubernetes"
  },
  {
    "id": "devops-04",
    "domain": "DevOps, Containers & Cloud",
    "topic": "HPA",
    "dimension": "Scaling",
    "question": "How does Horizontal Pod Autoscaler (HPA) scale banking microservices during salary day spikes?",
    "answerHinglish": "HPA Metrics Server se CPU/Memory utilization aur custom metrics (Kafka lag, HTTP requests per sec) monitor karta hai. Target threshold (e.g. CPU > 70%) cross hone par HPA Deployment replica count ko scale up karta hai (e.g. 5 pods se 50 pods) in seconds.",
    "tag": "Autoscaling"
  },
  {
    "id": "devops-05",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Deployments",
    "dimension": "Comparison",
    "question": "Blue-Green Deployment vs Canary Deployment: Which is preferred for banking releases?",
    "answerHinglish": "Canary Deployment banking ke liye preferred hai! Naya version sirf 2% traffic ko route kiya jata hai (real production validation). Automated metrics (error rates, p99 latency) monitor hote hain. Agar error spike hoti hai toh rollback immediate hota hai with minimal impact. Blue-Green 100% switch karta hai jisme failure risk high hota hai.",
    "tag": "Deployments"
  },
  {
    "id": "devops-06",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Probes",
    "dimension": "How",
    "question": "Explain the difference between Liveness, Readiness, and Startup Probes in Kubernetes.",
    "answerHinglish": "Startup Probe: Verifies app has finished initialization (slow cache warmup). Readiness Probe: Verifies if pod is ready to accept user traffic (if failing, removes pod from Service load balancer). Liveness Probe: Verifies if process is deadlocked/frozen (if failing, K8s kills and restarts the container).",
    "tag": "K8s Probes"
  },
  {
    "id": "devops-07",
    "domain": "DevOps, Containers & Cloud",
    "topic": "GCP Cloud Run",
    "dimension": "Cloud",
    "question": "What are the architectural benefits of Google Cloud Run for FinTech microservices?",
    "answerHinglish": "Fully managed serverless container runtime: 1) Scale to zero when idle (cost saving), 2) Instant scaling to thousands of container instances on demand, 3) Automated HTTPS with managed TLS certificates, 4) Built-in IAM security integration, 5) Fast deployment via container images.",
    "tag": "GCP Cloud Run"
  },
  {
    "id": "devops-08",
    "domain": "DevOps, Containers & Cloud",
    "topic": "GCP Cloud SQL",
    "dimension": "Cloud",
    "question": "How does Cloud SQL High Availability (HA) guarantee automatic regional failover?",
    "answerHinglish": "Primary database instance zone A mein hota hai aur synchronous block-level replication ke through Standby instance zone B mein maintain rehta hai. Zone A down hone par Cloud SQL within 60 seconds standby zone B par automatic failover trigger karta hai with identical IP address.",
    "tag": "GCP Cloud SQL"
  },
  {
    "id": "devops-09",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Observability",
    "dimension": "Concept",
    "question": "What are the 3 Pillars of Observability in distributed banking systems?",
    "answerHinglish": "1) **Metrics** (Prometheus): Numeric aggregations over time (TPS, error rate, p99 latency, CPU). 2) **Logs** (ELK/Fluentd): Timestamped textual records of specific events (audit logs, stack traces). 3) **Traces** (OpenTelemetry / Jaeger): End-to-end distributed request tracking across 10 microservices via unified `trace_id`.",
    "tag": "Observability"
  },
  {
    "id": "devops-10",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Secrets",
    "dimension": "Security",
    "question": "Why should Database Passwords and API Keys NEVER exist in Dockerfiles or Git commits?",
    "answerHinglish": "Git history permanent hoti hai aur Docker image layers inspect kiye ja sakte hain. Solution: Cloud Secret Manager (GCP Secret Manager / HashiCorp Vault) use karo. Secrets runtime par environment variables ya mounted files ke through inject hote hain with automatic secret rotation.",
    "tag": "Secret Management"
  },
  {
    "id": "devops-11",
    "domain": "DevOps, Containers & Cloud",
    "topic": "CI/CD",
    "dimension": "Production",
    "question": "What automated gates must a banking CI/CD pipeline enforce before merging code?",
    "answerHinglish": "1) Static Code Analysis (SonarQube) for code quality, 2) Unit & Integration test suite with >80% code coverage, 3) Software Composition Analysis (Snyk) for dependency CVE vulnerabilities, 4) SAST/DAST security scanning, 5) Multi-person senior engineer code review approval.",
    "tag": "CI/CD"
  },
  {
    "id": "devops-12",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Kubernetes Ingress",
    "dimension": "How",
    "question": "What is the role of an Ingress Controller (Nginx/Traefik) in Kubernetes?",
    "answerHinglish": "Cluster ke bahar se aane waale HTTP/HTTPS traffic ko manage karta hai. Ye URL path routing (`/api/payments -> payments-service`, `/api/accounts -> accounts-service`), SSL termination, aur header rewrites handle karta hai.",
    "tag": "Ingress"
  },
  {
    "id": "devops-13",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Infrastructure as Code",
    "dimension": "Concept",
    "question": "Why is Terraform (IaC) mandatory for multi-region banking disaster recovery?",
    "answerHinglish": "Manual cloud console configuration error-prone hoti hai aur disaster ke waqt recreate karna mushkil hota hai. Terraform declarative code mein VPCs, subnets, K8s clusters, aur DB instances define karta hai. Single command (`terraform apply`) se poora identical secondary banking region 15 minute mein spin-up ho jata hai.",
    "tag": "Terraform"
  },
  {
    "id": "devops-14",
    "domain": "DevOps, Containers & Cloud",
    "topic": "Service Mesh",
    "dimension": "Architecture",
    "question": "What does a Service Mesh (Istio) provide for inter-service security?",
    "answerHinglish": "Istio har pod ke saath Envoy sidecar proxy inject karta hai. Ye transparent mutual TLS (mTLS) between microservices, fine-grained access control policies, distributed tracing, aur advanced traffic shifting bina application code change kiye provide karta hai.",
    "tag": "Service Mesh"
  },
  {
    "id": "lld-01",
    "domain": "Low-Level Design & SOLID",
    "topic": "SRP",
    "dimension": "Concept",
    "question": "Explain Single Responsibility Principle (SRP) with an account service violation.",
    "answerHinglish": "Ek class ke paas change hone ka sirf 1 reason hona chahiye. Violation: `AccountManager` class jo account balance bhi debit karti hai, PDF receipt bhi generate karti hai, aur SMS notification bhi send karti hai. Fix: Split into `AccountService` (balance), `ReceiptGenerator` (PDF), and `NotificationService` (SMS).",
    "tag": "SOLID"
  },
  {
    "id": "lld-02",
    "domain": "Low-Level Design & SOLID",
    "topic": "OCP",
    "dimension": "Design",
    "question": "How do you implement Open-Closed Principle (OCP) for supporting 10 payment methods?",
    "answerHinglish": "Classes should be open for extension, but closed for modification. `PaymentProcessor` interface banao jise `UpiPayment`, `CreditCardPayment`, `NetBankingPayment` implement karein. Kal naya 'CBDC e-Rupee' add karte waqt existing checkout code modify nahi hoga\u2014sirf naya class extend hoga.",
    "tag": "SOLID"
  },
  {
    "id": "lld-03",
    "domain": "Low-Level Design & SOLID",
    "topic": "Strategy Pattern",
    "dimension": "Code",
    "question": "Write the Strategy Pattern structure for dynamic payment gateway routing in TypeScript.",
    "answerHinglish": "`interface PaymentStrategy { pay(amount: number): Promise<Result>; }`. Context class `PaymentService` runtime par selected strategy inject karti hai (`new PaymentService(new RazorpayStrategy())`), eliminating long ugly `if-else` ladders.",
    "tag": "Strategy Pattern"
  },
  {
    "id": "lld-04",
    "domain": "Low-Level Design & SOLID",
    "topic": "Factory Pattern",
    "dimension": "Design",
    "question": "When is the Factory Pattern applied in banking card issuance?",
    "answerHinglish": "Jab card creation logic complex parameters par depend karti hai (Customer CIBIL score, account type). `CardFactory.createCard(customer)` return karta hai `DebitCard`, `CreditCard`, ya `ForexCard` with pre-configured daily limits and reward engines.",
    "tag": "Factory Pattern"
  },
  {
    "id": "lld-05",
    "domain": "Low-Level Design & SOLID",
    "topic": "Observer Pattern",
    "dimension": "Concept",
    "question": "How does the Observer Pattern power real-time bank transaction notifications?",
    "answerHinglish": "Subject (`Account`) state change hone par registered Observers ko notify karta hai (`notifyObservers(event)`). Observers: `SmsAlertService`, `EmailService`, `FraudDetectionService`, `PushNotificationService`. Account ko observers ke concrete implementations ki knowledge nahi hoti (Loose Coupling).",
    "tag": "Observer Pattern"
  },
  {
    "id": "lld-06",
    "domain": "Low-Level Design & SOLID",
    "topic": "Decorator Pattern",
    "dimension": "Design",
    "question": "How does the Decorator Pattern add Transaction Surcharge or Logging without modifying base payment classes?",
    "answerHinglish": "Decorator base `Payment` interface implement karta hai aur ek `Payment` object ko wrap karta hai. Runtime par functionality add hoti hai: `new SurchargeFeeDecorator(new CurrencyConversionDecorator(new BaseUpiPayment()))`.",
    "tag": "Decorator Pattern"
  },
  {
    "id": "lld-07",
    "domain": "Low-Level Design & SOLID",
    "topic": "State Pattern",
    "dimension": "Banking",
    "question": "Model a Bank Account lifecycle using the State Pattern.",
    "answerHinglish": "States: `PendingKycState`, `ActiveState`, `SuspendedState`, `ClosedState`. Har state class `deposit()`, `withdraw()`, `freeze()` method implement karti hai. `SuspendedState` mein `withdraw()` call karne par `AccountSuspendedException` throw hota hai bina class ke andar 20 boolean flags ke.",
    "tag": "State Pattern"
  },
  {
    "id": "lld-08",
    "domain": "Low-Level Design & SOLID",
    "topic": "Singleton",
    "dimension": "Comparison",
    "question": "Why is Singleton Pattern often considered an anti-pattern in modern unit testing?",
    "answerHinglish": "Singleton global mutable state create karta hai jo unit tests ke beech bleed karta hai (tests become dependent on execution order). Unit tests mein mock ya stub inject karna difficult hota hai. Best practice: Dependency Injection (DI) container use karo jo lifecycle manage kare.",
    "tag": "Singleton"
  },
  {
    "id": "lld-09",
    "domain": "Low-Level Design & SOLID",
    "topic": "Builder Pattern",
    "dimension": "Code",
    "question": "Why is the Builder Pattern ideal for Home Loan Application objects?",
    "answerHinglish": "Home loan application mein 25 optional parameters hote hain (co-applicant, property docs, tenure, interest type). Telescoping constructor (`new Loan(a, b, c, null, null, true, ...)`) unreadable hota hai. Builder fluent API deta hai: `LoanBuilder.setAmount(50L).setTenure(240).addCoApplicant(user).build()`.",
    "tag": "Builder Pattern"
  },
  {
    "id": "lld-10",
    "domain": "Low-Level Design & SOLID",
    "topic": "LSP",
    "dimension": "Concept",
    "question": "Explain Liskov Substitution Principle (LSP) with a banking account violation.",
    "answerHinglish": "Subclass ko parent class ki jagah replace kiya ja sake without breaking functionality. Violation: `FixedDepositAccount` extends `BankAccount`, par FD mein `withdraw()` call karne par exception throw hoti hai kyunki tenure locked hai! Fix: Separate `WithdrawableAccount` interface.",
    "tag": "SOLID"
  },
  {
    "id": "lld-11",
    "domain": "Low-Level Design & SOLID",
    "topic": "ISP",
    "dimension": "Concept",
    "question": "Explain Interface Segregation Principle (ISP).",
    "answerHinglish": "Clients should not be forced to depend on methods they do not use. Ek giant `BankUserInterface` banane ke bajaye jisme 50 methods hon (`applyLoan`, `tradeStocks`, `depositCash`), split karo into small cohesive interfaces: `LoanApplicant`, `StockTrader`, `CashDepositor`.",
    "tag": "SOLID"
  },
  {
    "id": "lld-12",
    "domain": "Low-Level Design & SOLID",
    "topic": "DIP",
    "dimension": "Concept",
    "question": "Explain Dependency Inversion Principle (DIP).",
    "answerHinglish": "High-level modules should not depend on low-level modules; both should depend on abstractions. Example: `PaymentService` directly `MySQLConnection` instantiate nahi karega; wo `TransactionRepository` interface par depend karega, aur runtime par dependency inject hogi.",
    "tag": "SOLID"
  },
  {
    "id": "lld-13",
    "domain": "Low-Level Design & SOLID",
    "topic": "Dependency Injection",
    "dimension": "Architecture",
    "question": "Constructor Injection vs Property/Field Injection: Why is Constructor Injection preferred?",
    "answerHinglish": "Constructor Injection immutability ensure karta hai (`readonly`), guarantees karta hai ki object kabhi half-initialized state mein create nahi hoga, aur pure unit testing mein bina kisi framework ke direct mocks pass karne deta hai.",
    "tag": "Dependency Injection"
  },
  {
    "id": "lld-14",
    "domain": "Low-Level Design & SOLID",
    "topic": "Composite Pattern",
    "dimension": "Banking",
    "question": "Where does the Composite Pattern apply in Wealth Management portfolios?",
    "answerHinglish": "Portfolio ek tree structure hota hai: Parent Portfolio -> Child Portfolios (Mutual Funds, Stocks, Gold). Composite Pattern uniform interface provide karta hai (`getValue()`), allowing individual asset aur complex nested portfolio group ko identically calculate karna.",
    "tag": "Composite Pattern"
  },
  {
    "id": "res-01",
    "domain": "Interview Questions & Project Defense",
    "topic": "Config-Driven UI",
    "dimension": "Concept",
    "question": "Explain the architecture of your Config-Driven UI project at Invizio Solutions in 60 seconds.",
    "answerHinglish": "Business teams ko frequent form updates chahiye the jo developer release cycle block karte the. Maine ek Schema-Driven Dynamic Form Engine banaya: Backend JSON schema provide karta hai with validation rules, frontend React engine component registry se input types resolve karta hai, aur React Hook Form + Zod dynamic validation run karta hai with zero frontend redeployment.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-02",
    "domain": "Interview Questions & Project Defense",
    "topic": "Config-Driven UI",
    "dimension": "Performance",
    "question": "How did you prevent unnecessary re-renders in your Config-Driven UI when typing in a single field?",
    "answerHinglish": "Form state ko global context se detach kiya. Uncontrolled inputs using React Hook Form register refs use kiye. Sirf modified field internally re-render hoti hai, poora 50-field dynamic tree re-render nahi hota.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-03",
    "domain": "Interview Questions & Project Defense",
    "topic": "Bulk Upload",
    "dimension": "Architecture",
    "question": "Why did you redesign the Bulk Image Upload pipeline from synchronous to asynchronous at Invizio?",
    "answerHinglish": "Sync multipart uploads Express event loop memory aur HTTP worker connections ko block kar dete the, leading to 504 gateway timeouts under concurrent load. Async redesign: Browser pre-signed S3 URL se direct upload karta hai, S3 event BullMQ/Redis worker queue trigger karta hai, aur background mein Sharp library WebP compression perform karti hai.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-04",
    "domain": "Interview Questions & Project Defense",
    "topic": "Bulk Upload",
    "dimension": "Security",
    "question": "How did you prevent users from uploading malicious executable files disguised as `.jpg` images?",
    "answerHinglish": "File extension par trust nahi kiya. Worker processing ke dauran `file-type` package se file ke initial bytes (Magic Numbers: e.g. `FF D8 FF` for JPEG, `89 50 4E 47` for PNG) verify kiye. Non-image signatures detect hote hi job quarantine ho jaati hai.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-05",
    "domain": "Interview Questions & Project Defense",
    "topic": "MySQL Tuning",
    "dimension": "Production",
    "question": "Walk me through how you achieved 40% MySQL query optimization at Invizio Solutions.",
    "answerHinglish": "1) Slow Query Log enable kiya with `long_query_time = 1s`. 2) High-latency queries par `EXPLAIN ANALYZE` run kiya, jahan full table scan (`type: ALL`) dikha wahan high-selectivity columns par composite B+ Tree index banaya. 3) ORM ke N+1 queries ko indexed JOINs mein convert kiya. 4) Deep OFFSET pagination ko keyset cursor pagination (`WHERE id < ?`) mein replace kiya.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-06",
    "domain": "Interview Questions & Project Defense",
    "topic": "MySQL Tuning",
    "dimension": "How",
    "question": "What metrics proved your 40% database optimization was successful?",
    "answerHinglish": "P99 API latency 1,200ms se drop hokar 280ms hui, average query execution time on high-frequency transaction tables 40% reduce hua, aur CPU utilization on production RDS MySQL instance 85% se 48% par stabilize hua.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-07",
    "domain": "Interview Questions & Project Defense",
    "topic": "Booknook Razorpay",
    "dimension": "Banking",
    "question": "How did you implement Razorpay Webhook signature verification in Booknook?",
    "answerHinglish": "Razorpay request header `x-razorpay-signature` bhejta hai. Backend par raw request body aur webhook secret ka cryptographic HMAC-SHA256 digest calculate kiya (`crypto.createHmac('sha256', secret).update(rawBody).digest('hex')`). Timing-safe comparison `crypto.timingSafeEqual` se verify karke payment capture confirm kiya.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-08",
    "domain": "Interview Questions & Project Defense",
    "topic": "Booknook Razorpay",
    "dimension": "Debugging",
    "question": "What happened if a customer paid on Razorpay but closed the browser before your frontend callback?",
    "answerHinglish": "Hamara architecture frontend client redirect par depend nahi karta! Razorpay server-to-server asynchronous webhook (`payment.captured`) hamare backend endpoint par event send karta hai. Backend database mein order status 'PAID' mark karta hai, ensuring zero payment discrepancies.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-09",
    "domain": "Interview Questions & Project Defense",
    "topic": "Booknook Inventory",
    "dimension": "Concurrency",
    "question": "How did you prevent overselling inventory during concurrent flash sales in Booknook?",
    "answerHinglish": "Checkout initiate hote waqt Redis TTL lock se inventory temporary reserve ki (10-minute hold). Database level par atomic decrement query lagayi: `UPDATE products SET stock = stock - 1 WHERE id = ? AND stock > 0`. Agar affected rows 0 aati hain, toh out-of-stock response return hota hai.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-10",
    "domain": "Interview Questions & Project Defense",
    "topic": "Video Library",
    "dimension": "Architecture",
    "question": "Why did you choose Redux Toolkit + Immer for your Video Library application?",
    "answerHinglish": "Video playback state, watch history, dynamic playlist reordering, aur user bookmarks complex nested state trees create karte hain. Redux Toolkit central predictable store provide karta hai aur Immer deeply nested updates ko clean mutable syntax mein safely immutable banata hai.",
    "tag": "Resume Defense"
  },
  {
    "id": "res-11",
    "domain": "Interview Questions & Project Defense",
    "topic": "Leadership",
    "dimension": "Behavioral",
    "question": "As an SDE II, how did you mentor junior engineers at Invizio Solutions?",
    "answerHinglish": "Regular PR code reviews with architectural context (explaining 'why' not just syntax), conducting internal tech talks on Node.js streams and SQL indexing, pairing on complex production bugs, and establishing standardized linting and testing conventions.",
    "tag": "STAR Behavioral"
  },
  {
    "id": "res-12",
    "domain": "Interview Questions & Project Defense",
    "topic": "Production Incident",
    "dimension": "Behavioral",
    "question": "Describe a major production outage you resolved under pressure (STAR format).",
    "answerHinglish": "S: High traffic surge par API gateway 504 timeout de raha tha. T: Root cause detect karke service restore karni thi. A: PM2 logs aur slow query log inspect kiya; paaya ki unindexed LIKE search query database connection pool exhaust kar rahi thi. Temporary query kill kiya, read replica route kiya, aur composite index create kiya. R: System restored in 18 minutes; permanent circuit breaker implement kiya.",
    "tag": "STAR Behavioral"
  },
  {
    "id": "res-13",
    "domain": "Interview Questions & Project Defense",
    "topic": "Conflict",
    "dimension": "Behavioral",
    "question": "Tell me about a technical disagreement with a Senior/Product Manager.",
    "answerHinglish": "Product manager chahte the ki bulk upload frontend se synchronously ho taaki user ko progress bar dikhe. Maine explain kiya ki slow 3G network par 500 concurrent users server crash kar denge. Solution: Compromise nikala\u2014asynchronous S3 upload with WebSocket real-time progress events.",
    "tag": "STAR Behavioral"
  },
  {
    "id": "res-14",
    "domain": "Interview Questions & Project Defense",
    "topic": "Why IDFC First Bank",
    "dimension": "Behavioral",
    "question": "Why do you want to join IDFC FIRST Bank Strategic Projects Division specifically?",
    "answerHinglish": "IDFC FIRST Bank technology-first mindset ke saath traditional banking ko new-age digital rails (UPI 2.0, paperless account opening, real-time fraud engines) par reinvent kar raha hai. Mere 4+ years ke scalable Node/React/SQL experience aur financial reliability passion ke liye Strategic Projects engineering ideal challenge hai.",
    "tag": "STAR Behavioral"
  },
  {
    "id": "dsa-01",
    "domain": "Data Structures & Algorithms",
    "topic": "Two Pointers",
    "dimension": "Concept",
    "question": "When can you apply the Two-Pointer pattern in coding interviews?",
    "answerHinglish": "Array sorted hona chahiye (ya sort kiya ja sake in $O(N \\log N)$) aur problem pairwise search, reversal, ya partitioning maang rahi ho. Left pointer start par aur Right pointer end par move karke $O(N^2)$ brute force ko $O(N)$ linear time mein reduce karta hai.",
    "tag": "Two Pointers"
  },
  {
    "id": "dsa-02",
    "domain": "Data Structures & Algorithms",
    "topic": "Sliding Window",
    "dimension": "Concept",
    "question": "Fixed-Size vs Dynamic-Size Sliding Window: When to use which?",
    "answerHinglish": "Fixed-Size: Window size $K$ pehle se pata ho (e.g. Max sum of 7-day rolling transactions). Dynamic-Size: Window size condition par depend kare (e.g. Longest substring with at most $K$ distinct characters, Minimum window substring).",
    "tag": "Sliding Window"
  },
  {
    "id": "dsa-03",
    "domain": "Data Structures & Algorithms",
    "topic": "Sliding Window Deque",
    "dimension": "Banking",
    "question": "How do you detect if a customer performed > 5 high-value transactions in any continuous 10-minute window?",
    "answerHinglish": "Monotonic Deque (queue): Naye transaction timestamp $T$ aane par, window ke start se purane timestamps ($< T - 10\\text{min}$) `popleft()` kar do. Fir current timestamp append karo. Agar `len(deque) > 5`, toh instant fraud alert trigger karo! Amortized $O(1)$ per transaction.",
    "tag": "Fraud Detection"
  },
  {
    "id": "dsa-04",
    "domain": "Data Structures & Algorithms",
    "topic": "Monotonic Stack",
    "dimension": "Concept",
    "question": "What is a Monotonic Stack and what problems does it solve in $O(N)$?",
    "answerHinglish": "Stack jisme elements strictly increasing ya strictly decreasing order mein maintain rehte hain. Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram, aur Stock Span problems ko $O(N)$ time mein solve karta hai.",
    "tag": "Monotonic Stack"
  },
  {
    "id": "dsa-05",
    "domain": "Data Structures & Algorithms",
    "topic": "Fast & Slow Pointers",
    "dimension": "How",
    "question": "Explain Floyd's Cycle Detection (Tortoise and Hare) algorithm.",
    "answerHinglish": "Do pointers: Slow 1 step move karta hai, Fast 2 steps move karta hai. Agar linked list mein cycle hai, toh Fast aur Slow hamesha cycle ke andar meet karenge ($O(N)$ time, $O(1)$ space). Cycle start point dhundhne ke liye: Meeting ke baad Slow ko head par le aao, aur dono ko 1-1 step move karo; jahan meet karenge wo cycle start hai.",
    "tag": "Fast Slow"
  },
  {
    "id": "dsa-06",
    "domain": "Data Structures & Algorithms",
    "topic": "Binary Search",
    "dimension": "Concept",
    "question": "What is 'Binary Search on Answer Space' and where does it apply?",
    "answerHinglish": "Jab answer directly calculate nahi ho sakta par range known hai (e.g. Min speed to deliver, Koko eating bananas, Book allocation). Low aur High bounds set karke Mid calculate karte hain aur feasibility check `is_valid(mid)` karte hain. Time complexity $O(N \\log(\\text{range}))$.",
    "tag": "Binary Search"
  },
  {
    "id": "dsa-07",
    "domain": "Data Structures & Algorithms",
    "topic": "Hashing",
    "dimension": "How",
    "question": "How does a Hash Table handle collisions (Chaining vs Open Addressing)?",
    "answerHinglish": "Chaining: Same bucket par linked list ya balanced BST maintain hoti hai (Java HashMap uses Red-Black Tree after 8 collisions). Open Addressing: Linear Probing / Quadratic Probing se agla available empty slot search kiya jata hai.",
    "tag": "Hashing"
  },
  {
    "id": "dsa-08",
    "domain": "Data Structures & Algorithms",
    "topic": "Heaps",
    "dimension": "Comparison",
    "question": "Why use a Min-Heap of size $K$ to find the $K$ Largest Elements in a stream of 1 billion transactions?",
    "answerHinglish": "Poore 1 billion numbers ko sort karna $O(N \\log N)$ time aur huge memory lega. Min-Heap of size $K$ maintain karo: Har number aane par agar wo heap top se bada hai, toh heap replace karo. Memory sirf $O(K)$ aur time $O(N \\log K)$!",
    "tag": "Heap Stream"
  },
  {
    "id": "dsa-09",
    "domain": "Data Structures & Algorithms",
    "topic": "Trees",
    "dimension": "Concept",
    "question": "Lowest Common Ancestor (LCA) in a Binary Search Tree vs Normal Binary Tree?",
    "answerHinglish": "BST: Values compare karke direct binary search: agar dono values root se choti hain toh left jao, dono badi hain toh right jao, split point hi LCA hai ($O(H)$ time). Normal Tree: Postorder traversal se left aur right search karo; jahan dono non-null milen wo node LCA hai ($O(N)$ time).",
    "tag": "Trees"
  },
  {
    "id": "dsa-10",
    "domain": "Data Structures & Algorithms",
    "topic": "Graphs",
    "dimension": "Banking",
    "question": "How do you detect Circular Money Laundering rings in a transaction graph?",
    "answerHinglish": "Accounts = Nodes, Transactions = Directed Edges. Directed graph mein cycle detection algorithm run karo: DFS with 3-color marking (White = unvisited, Gray = visiting in current recursion stack, Black = visited). Gray node dobara hit hona cycle (money laundering loop) confirm karta hai.",
    "tag": "Graph AML"
  },
  {
    "id": "dsa-11",
    "domain": "Data Structures & Algorithms",
    "topic": "Topological Sort",
    "dimension": "How",
    "question": "What is Kahn's Algorithm for Topological Sorting?",
    "answerHinglish": "In-degree (incoming edges count) calculate karo. In-degree 0 waale nodes ko Queue mein push karo. Queue se pop karke result mein add karo aur neighbors ka in-degree decrement karo. Agar result length != total nodes, graph mein cycle exist karti hai.",
    "tag": "Topological Sort"
  },
  {
    "id": "dsa-12",
    "domain": "Data Structures & Algorithms",
    "topic": "Dynamic Programming",
    "dimension": "Concept",
    "question": "What are the two core properties that identify a Dynamic Programming (DP) problem?",
    "answerHinglish": "1) **Overlapping Subproblems:** Same subproblem baar-baar calculate hoti hai (e.g. Fibonacci, Coin Change). 2) **Optimal Substructure:** Overall optimal solution smaller subproblems ke optimal solutions se compose kiya ja sakta hai.",
    "tag": "DP"
  },
  {
    "id": "dsa-13",
    "domain": "Data Structures & Algorithms",
    "topic": "Kadane's Algorithm",
    "dimension": "Code",
    "question": "Explain Kadane's Algorithm for Maximum Subarray Sum in $O(N)$ time.",
    "answerHinglish": "Array traverse karte waqt running `current_sum = max(num, current_sum + num)` update karo (purani negative running sum discard karke naya start karo agar choti hai). Overall `max_sum = max(max_sum, current_sum)` track karo.",
    "tag": "Kadane"
  },
  {
    "id": "dsa-14",
    "domain": "Data Structures & Algorithms",
    "topic": "Trie",
    "dimension": "Banking",
    "question": "Why is a Trie (Prefix Tree) optimal for Bank IFSC code auto-complete?",
    "answerHinglish": "Search time complexity sirf prefix length par depend karti hai ($O(L)$), regardless of whether there are 10,000 or 10,000,000 branches in the database. Shared prefixes ('IDFB000...') memory compress karte hain.",
    "tag": "Trie"
  },
  {
    "id": "dsa-15",
    "domain": "Data Structures & Algorithms",
    "topic": "Space Complexity",
    "dimension": "Comparison",
    "question": "Auxiliary Space vs Total Space Complexity: Explain with recursive merge sort.",
    "answerHinglish": "Total Space = Input size + Extra space. Auxiliary Space = Sirf extra temporary memory jo algorithm use karta hai input ke alawa. Recursive Merge Sort ka Auxiliary Space $O(N)$ temporary arrays + $O(\\log N)$ recursion call stack space hota hai.",
    "tag": "Complexity"
  },
  {
    "id": "dsa-16",
    "domain": "Data Structures & Algorithms",
    "topic": "Bit Manipulation",
    "dimension": "Code",
    "question": "How does `n & (n - 1)` work in Brian Kernighan's bit algorithm?",
    "answerHinglish": "`n & (n - 1)` integer $n$ ke lowest set bit (rightmost 1) ko zero clear kar deta hai. Set bits count karne ke liye loop chalao jab tak $n=0$ na ho jaye ($O(\\text{number of set bits})$ time).",
    "tag": "Bitwise"
  },
  {
    "id": "java-01",
    "domain": "Java Enterprise Ecosystem",
    "topic": "JVM Memory",
    "dimension": "Concept",
    "question": "What are the main components of JVM Memory Architecture?",
    "answerHinglish": "1) Heap Space: Shared memory for objects (Eden, Survivor S0/S1, Tenured/Old Gen). 2) JVM Stack: Per-thread stack frames for local primitives and call addresses. 3) Metaspace: Class metadata, static methods. 4) Program Counter (PC) Register.",
    "tag": "JVM"
  },
  {
    "id": "java-02",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Garbage Collection",
    "dimension": "Comparison",
    "question": "G1GC vs ZGC in high-throughput Java banking services?",
    "answerHinglish": "G1GC (Garbage-First): Heap ko multiple regions mein divide karta hai, target pause time (e.g. 200ms) maintain karta hai. ZGC (Z Garbage Collector): Ultra-low latency concurrent collector jo terabytes ke heap par bhi stop-the-world pauses ko < 1ms guarantee karta hai.",
    "tag": "Java GC"
  },
  {
    "id": "java-03",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Spring Boot",
    "dimension": "Concept",
    "question": "What is the Inversion of Control (IoC) container and Dependency Injection in Spring Boot?",
    "answerHinglish": "Objects ke creation aur lifecycle ka control developer se lekar Spring Framework ko transfer ho jata hai (Inversion of Control). Developer `@Service` aur `@Repository` annotate karta hai, aur Spring IoC Container runtime par `@Autowired` ke through dependencies inject karta hai.",
    "tag": "Spring Boot"
  },
  {
    "id": "java-04",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Concurrency",
    "dimension": "Comparison",
    "question": "Java Thread-per-request vs Node.js Event Loop: What are the latency and throughput trade-offs?",
    "answerHinglish": "Java: Heavy memory per connection (1MB/thread), excellent for multi-core CPU heavy calculations. Node.js: Lightweight single thread event loop, handles 10x concurrent I/O connections with low RAM, but CPU tasks block event loop. Modern Java 21 Virtual Threads (Project Loom) provides best of both worlds.",
    "tag": "Java vs Node"
  },
  {
    "id": "java-05",
    "domain": "Java Enterprise Ecosystem",
    "topic": "JPA Hibernate",
    "dimension": "Debugging",
    "question": "What is the N+1 Query Problem in Spring Data JPA / Hibernate?",
    "answerHinglish": "Jab 1 query parent list fetch karti hai (`SELECT * FROM accounts`), aur lazy loading ke karan code loop chalakar har account ke customer ko alag query se fetch karta hai ($N$ additional queries). Fix: `JOIN FETCH` ya `@EntityGraph` use karo single query mein load karne ke liye.",
    "tag": "Hibernate"
  },
  {
    "id": "java-06",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Connection Pooling",
    "dimension": "Production",
    "question": "Why is HikariCP the default connection pool in Spring Boot banking backends?",
    "answerHinglish": "HikariCP bytecode-level micro-optimizations use karta hai (eliminating delegate wrappers, lock-free collections), making it 10x faster than legacy c3p0 or Apache DBCP with near-zero connection acquisition latency.",
    "tag": "HikariCP"
  },
  {
    "id": "java-07",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Multithreading",
    "dimension": "How",
    "question": "What is the role of `volatile` keyword in Java multithreading?",
    "answerHinglish": "`volatile` variable CPU core cache mein store nahi hota\u2014har read aur write directly main RAM se hoti hai. Ye guarantees karta hai ki ek thread ka update baaki saare threads ko instantly visible ho (Visibility guarantee, though not atomic).",
    "tag": "Java Concurrency"
  },
  {
    "id": "java-08",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Exceptions",
    "dimension": "Comparison",
    "question": "Checked vs Unchecked Exceptions in Java banking APIs?",
    "answerHinglish": "Checked Exceptions (`IOException`, `SQLException` extends `Exception`): Compile-time enforce hoti hain (must catch or declare `throws`). Unchecked Exceptions (`NullPointerException`, `IllegalArgumentException` extends `RuntimeException`): Runtime failures, no compiler enforcement required.",
    "tag": "Java Exceptions"
  },
  {
    "id": "java-09",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Transactions",
    "dimension": "Banking",
    "question": "How does Spring `@Transactional(propagation = Propagation.REQUIRED)` work?",
    "answerHinglish": "Spring AOP proxy method call ko intercept karta hai. Agar already koi active transaction chal rahi hai toh usme join karta hai; agar koi transaction nahi hai toh nayi relational database transaction start karta hai aur unhandled exception par automatic rollback karta hai.",
    "tag": "Spring Transactions"
  },
  {
    "id": "java-10",
    "domain": "Java Enterprise Ecosystem",
    "topic": "Immutability",
    "dimension": "Code",
    "question": "What is a Java `record` (introduced in Java 14/16) and where is it used in DTOs?",
    "answerHinglish": "Immutable data carrier class: Boilerplate getters, `equals()`, `hashCode()`, aur `toString()` automatically compiler generate karta hai (`public record AccountResponse(String id, BigDecimal balance) {}`). Ideal for banking API response DTOs.",
    "tag": "Java Records"
  }
];

export const FLASHCARDS = FLASHCARDS_DATA;
