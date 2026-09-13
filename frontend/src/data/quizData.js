export const DIAGNOSTIC_QUESTIONS = [
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
