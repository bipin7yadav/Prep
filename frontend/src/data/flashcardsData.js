export const FLASHCARDS_DATA = [
  {
    id: "fc1",
    category: "SQL & DBMS",
    question: "What is the difference between TRUNCATE and DELETE in SQL?",
    answerHinglish: "DELETE DML command hai jo row-by-row delete karta hai, triggers fire karta hai, aur Rollback ho sakta hai (WAL log me record hota hai). TRUNCATE DDL command hai jo entire data pages deallocate karta hai, zero row-level logs banata hai, triggers fire nahi karta, aur bohot fast hota hai.",
    codeSnippet: "-- DELETE: Row-by-row, logged, reversible\nDELETE FROM transactions WHERE status = 'FAILED';\n\n-- TRUNCATE: Page deallocation, instant, resets auto-increment\nTRUNCATE TABLE temp_audit_logs;",
    tag: "DBMS Core"
  },
  {
    id: "fc2",
    category: "SQL & DBMS",
    question: "How does a B+ Tree index optimize range queries compared to a Hash Index?",
    answerHinglish: "Hash index sirf equality match (=) me O(1) deta hai, par range queries (WHERE amount BETWEEN 1000 AND 5000) me fail ho jata hai kyunki keys unsorted hoti hain. B+ Tree ke sabhi leaf nodes doubly-linked list se connected hote hain aur sorted order me store hote hain, isliye range scan sequential leaf traversal se super fast hoti hai.",
    codeSnippet: "-- B+ Tree can do binary search to lower bound then scan linked leaves:\nSELECT * FROM accounts WHERE balance >= 50000 AND balance <= 100000;",
    tag: "Indexing"
  },
  {
    id: "fc3",
    category: "SQL & DBMS",
    question: "What is a Deadlock and how does MySQL InnoDB detect it?",
    answerHinglish: "Jab do transactions ek doosre ke locks release hone ka wait karti hain (Circular wait: T1 holds A waits for B; T2 holds B waits for A). InnoDB automatic 'Wait-For Graph' analyze karta hai. Cycle milte hi jo transaction kam cost waali (least rows modified) hoti hai usko automatically ROLLBACK karke error throw kar deta hai (Deadlock found when trying to get lock; try restarting transaction).",
    codeSnippet: "-- Prevention: Always acquire locks in deterministic alphabetical/primary-key order!\n-- In both T1 & T2: Lock Account_min first, then Account_max.",
    tag: "Concurrency"
  },
  {
    id: "fc4",
    category: "Node.js & JS",
    question: "What is the difference between process.nextTick() and setImmediate()?",
    answerHinglish: "process.nextTick() libuv ke event loop ka part nahi hai—ye V8 microtask queue ke saath har synchronous operation ke turant baad run hota hai. Jabki setImmediate() event loop ke 'Check phase' me run hota hai, yaani I/O polling ke baad.",
    codeSnippet: "setImmediate(() => console.log('1: Check phase'));\nprocess.nextTick(() => console.log('2: Next tick (Microtask)'));\n// Output:\n// 2: Next tick (Microtask)\n// 1: Check phase",
    tag: "Event Loop"
  },
  {
    id: "fc5",
    category: "Node.js & JS",
    question: "What is Backpressure in Node.js Streams and how do you handle it?",
    answerHinglish: "Jab Readable stream se data aane ki speed Writable stream ke process/write karne ki speed se bohot zyada fast ho, to memory buffer fill hone lagta hai. Writable stream 'false' return karti hai (buffer full). Readable stream ko 'pause()' karna padta hai aur Writable ke 'drain' event pe 'resume()' karna padta hai. `stream.pipe()` ya `pipeline()` isko automatically handle karta hai.",
    codeSnippet: "const { pipeline } = require('stream/promises');\nawait pipeline(\n  fs.createReadStream('large_banking_ledger.csv'),\n  zlib.createGzip(),\n  fs.createWriteStream('ledger.csv.gz')\n);",
    tag: "Streams"
  },
  {
    id: "fc6",
    category: "React.js",
    question: "What triggers a re-render in a React component and how do you prevent unnecessary ones?",
    answerHinglish: "Re-render 3 cheezon se trigger hota hai: 1) Local State change (setState), 2) Parent component ka re-render hona, 3) Subscribed Context value change. Rokne ke liye: 1) React.memo se child component wrap karo (shallow prop comparison), 2) useCallback se callback functions memoize karo, 3) useMemo se heavy computation results cache karo.",
    codeSnippet: "const CustomerCard = React.memo(({ customer, onSelect }) => {\n  return <div onClick={() => onSelect(customer.id)}>{customer.name}</div>;\n});",
    tag: "Performance"
  },
  {
    id: "fc7",
    category: "System Design",
    question: "What is an Idempotency Key and how is it implemented?",
    answerHinglish: "Client ek unique UUID (Idempotency Key) HTTP header (`X-Idempotency-Key`) me bhejta hai. Server request aate hi Redis me `SET idempotency_key:uuid status=PROCESSING NX EX 120` karta hai. Agar key already exist karti hai to 409 Conflict ya cached response return kar deta hai. Agar transaction complete hoti hai to DB me response store karke Redis update kar deta hai.",
    codeSnippet: "// Express Middleware Check:\nconst key = req.headers['x-idempotency-key'];\nconst cached = await redis.get(`idemp:${key}`);\nif (cached) return res.json(JSON.parse(cached));",
    tag: "FinTech"
  },
  {
    id: "fc8",
    category: "System Design",
    question: "What is the Transactional Outbox Pattern?",
    answerHinglish: "Dual-write problem solve karne ke liye: Database me transaction commit hone ke baad agar Kafka publish fail ho jaye to data inconsistent ho jata hai. Solution: Database ke andar hi ek 'outbox' table banao aur usi same ACID transaction me outbox row insert karo. Ek Debezium CDC ya background worker outbox table ko poll karke Kafka me publish karta hai guaranteed delivery ke saath.",
    codeSnippet: "-- Single ACID transaction:\nBEGIN;\nUPDATE accounts SET balance = balance - 500 WHERE id = 101;\nINSERT INTO outbox (aggregate_type, payload, status) \n  VALUES ('PAYMENT', '{\"amount\": 500, \"acc\": 101}', 'PENDING');\nCOMMIT;",
    tag: "Distributed Systems"
  },
  {
    id: "fc9",
    category: "Banking & FinTech",
    question: "What are the 4 parties in a standard UPI payment flow?",
    answerHinglish: "1) Payer PSP (Google Pay, PhonePe, IDFC First Mobile App jo user initiate karta hai), 2) Remitter Bank (jo customer ka account debit karta hai), 3) NPCI Switch (central national router jo VPA resolve karta hai aur request forward karta hai), 4) Beneficiary Bank (jo receiver ka account credit karta hai) aur Payee PSP.",
    codeSnippet: "Payer PSP -> NPCI -> Remitter Bank (Debit)\n                  -> Beneficiary Bank (Credit) -> Payee PSP",
    tag: "UPI Rails"
  },
  {
    id: "fc10",
    category: "Banking & FinTech",
    question: "What is the fundamental rule of Double-Entry Bookkeeping in banking software?",
    answerHinglish: "Har transaction ke do sides hote hain: DEBIT aur CREDIT. Balance sheet equation: Assets = Liabilities + Equity. Customer ke liye deposit 'Credit' hota hai par Bank ke perspective se customer deposit 'Liability' hota hai! Kisi bhi journal entry me: SUM(debits) === SUM(credits) hona chahiye, warna transaction database me save nahi ho sakti.",
    codeSnippet: "-- Transfer ₹5000 from Acc A to Acc B:\nINSERT INTO ledger_entries (account_id, type, amount) VALUES (A, 'DEBIT', 5000);\nINSERT INTO ledger_entries (account_id, type, amount) VALUES (B, 'CREDIT', 5000);\n-- Verification: Total Debits (5000) == Total Credits (5000)",
    tag: "Ledger"
  },
  {
    id: "fc11",
    category: "Python & Data",
    question: "What does Broadcasting mean in NumPy?",
    answerHinglish: "Broadcasting NumPy ka rule hai jo different shape ke arrays pe arithmetic operations perform karne deta hai bina memory copy kiye. Rules: 1) Dimensions ko right-to-left match kiya jata hai, 2) Dono dimensions equal hon ya unme se ek ki dimension 1 ho. Agar dimension 1 hai to wo stretch ho jati hai matching size tak.",
    codeSnippet: "import numpy as np\nmatrix = np.ones((3, 3)) # shape (3, 3)\nrow = np.array([1, 2, 3]) # shape (3,)\nresult = matrix + row # row automatically broadcasts across all 3 rows!",
    tag: "NumPy"
  },
  {
    id: "fc12",
    category: "Python & Data",
    question: "What is the difference between .apply() and vectorized operations in pandas?",
    answerHinglish: "Vectorized operations (jaise `df['balance'] * 1.05`) C-level speed pe contiguous memory pe run hote hain (extremely fast). Jabki `.apply(lambda x: ...)` standard Python loop run karta hai har individual row/element pe Python interpreter me, jo 50x to 100x slow hota hai. Always prioritize vectorized functions over .apply().",
    codeSnippet: "# Fast (Vectorized C-speed):\ndf['interest'] = df['balance'] * 0.07\n\n# Slow (Python loop overhead):\ndf['interest'] = df['balance'].apply(lambda b: b * 0.07)",
    tag: "pandas"
  },
  {
    id: "fc13",
    category: "Security",
    question: "What is RBI's mandate on Card Tokenization (CoFT)?",
    answerHinglish: "RBI ke rules ke mutabik koi bhi merchant (jaise Amazon, Flipkart, Swiggy) ya payment aggregator customer ka actual 16-digit card number (PAN) aur CVV save nahi kar sakta. Card details ko Card Network (Visa/Mastercard/RuPay) ke pass bhejkar ek device-and-merchant-specific non-sensitive Token generate kiya jata hai. Sirf Token aur last 4 digits store karne allowed hain.",
    codeSnippet: "-- Stored on merchant server:\n-- pan_token: 'TKN_88392194819238'\n-- card_last4: '4312'\n-- token_expiry: '12/28'",
    tag: "Compliance"
  },
  {
    id: "fc14",
    category: "Low-Level Design",
    question: "Explain the Open-Closed Principle (OCP) with an IDFC payment gateway example.",
    answerHinglish: "Classes should be open for extension, but closed for modification. Agar kal IDFC Bank naya 'CBDC (e-Rupee)' payment method add karna chahta hai, to purana checkout code modify nahi hona chahiye. Ek `PaymentProcessor` interface banao jise har naya method implement kare, aur Factory/Strategy pattern se dynamically instantiate karo.",
    codeSnippet: "interface PaymentMethod {\n  process(amount: number): Promise<TransactionResult>;\n}\nclass UpiPayment implements PaymentMethod { ... }\nclass ErupeePayment implements PaymentMethod { ... } // New without touching Upi!",
    tag: "SOLID"
  }
];
