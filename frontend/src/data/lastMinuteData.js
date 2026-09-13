/* Master Last-Minute Cram & Emergency Revision Dataset for IDFC FIRST Bank Developer */

export const LAST_MINUTE_MODES = [
  {
    id: "5m",
    name: "5-Min Elevator Pitch",
    badge: "⚡ 5 Mins",
    timeBudget: "5 minutes",
    description: "The 5 Architectural Invariants of Banking Systems you must mention to instantly sound like a seasoned FinTech engineer.",
    sections: [
      {
        title: "1. The Strict Idempotency Invariant",
        keyPoint: "Never process a financial transaction without a unique Idempotency-Key.",
        soundbite: "Clients generate a UUIDv4 Idempotency-Key header. We insert `(idempotency_key, status, response_body)` into a database table with a UNIQUE constraint BEFORE debiting. If a network timeout occurs and client retries, the unique constraint hits and returns the cached response without double-debiting.",
        codeSnippet: `CREATE TABLE payment_idempotency (
  idempotency_key VARCHAR(64) PRIMARY KEY,
  account_id VARCHAR(32) NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(20) NOT NULL, -- PENDING, COMPLETED, FAILED
  response_body JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`
      },
      {
        title: "2. The Transactional Outbox Pattern",
        keyPoint: "You cannot atomically update a database and publish to Kafka in one step.",
        soundbite: "Do NOT publish to Kafka inside your HTTP request handler. Instead, write the business entity update AND the Kafka event into the same relational database in a single ACID transaction (`outbox_events` table). A Debezium CDC worker or background polling thread publishes from outbox to Kafka with At-Least-Once delivery guarantees.",
        codeSnippet: `BEGIN TRANSACTION;
  UPDATE accounts SET balance = balance - 500 WHERE id = 'acc_123';
  INSERT INTO outbox_events (aggregate_id, event_type, payload)
  VALUES ('acc_123', 'MONEY_DEBITED', '{"amount": 500}');
COMMIT;`
      },
      {
        title: "3. The Double-Entry Bookkeeping Rule",
        keyPoint: "Money is never created or destroyed in a ledger; it only moves between accounts.",
        soundbite: "For every credit, there must be an equal debit: $\\sum \\text{Debits} == \\sum \\text{Credits}$. Account balances are computed as the sum of ledger entries, or maintained with an append-only audit trail and periodic reconciliation snapshots.",
        codeSnippet: `-- Double-Entry Invariant:
-- Entry 1: Debit Customer Checking Account (-500)
-- Entry 2: Credit Merchant Settlement Account (+500)
-- Total Net Delta: 0`
      },
      {
        title: "4. Pessimistic vs Optimistic Balance Locking",
        soundbite: "In high-contention bank accounts (e.g. corporate or high-frequency wallets), `SELECT balance FROM accounts WHERE id = 1` followed by `UPDATE accounts SET balance = balance - 100` causes a race condition (Lost Update). Use `SELECT ... FOR UPDATE` (Pessimistic row lock) or `UPDATE accounts SET balance = balance - 100, version = version + 1 WHERE id = 1 AND version = current_version` (Optimistic lock).",
        codeSnippet: `-- Pessimistic Locking
SELECT balance FROM accounts WHERE id = 'acc_user' FOR UPDATE;
-- Locks row until transaction COMMIT or ROLLBACK.`
      },
      {
        title: "5. Short-Lived JWT + Server-Side Rotation",
        soundbite: "Stateless JWT access tokens live for 5-15 minutes max, sent in HTTP-only, Secure, SameSite=Strict cookies (never localStorage). Long-lived Refresh Tokens are stored hashed in Redis or DB with family rotation—if an old refresh token is reused, revoke the entire token family immediately as a breach.",
        codeSnippet: `// Cookie config:
res.cookie('access_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 15 * 60 * 1000 // 15 mins
});`
      }
    ]
  },

  {
    id: "15m",
    name: "15-Min Pre-Interview Warm-Up",
    badge: "⏱️ 15 Mins",
    timeBudget: "15 minutes",
    description: "Language internals, runtime memory models, and core execution phases to ace technical screeners.",
    sections: [
      {
        title: "Node.js Event Loop Execution Phases",
        soundbite: "libuv loop runs through 6 phases: 1) Timers (setTimeout, setInterval), 2) Pending Callbacks (I/O errors), 3) Idle/Prepare, 4) Poll (incoming connections & file reads), 5) Check (setImmediate), 6) Close Callbacks (socket.on('close')).\n\nCRITICAL: Microtasks (process.nextTick and Promise.then) run IMMEDIATELY after the current operation finishes, BEFORE the event loop moves to the next phase. `process.nextTick` executes before `Promise` microtasks!",
        codeSnippet: `console.log('1');
setTimeout(() => console.log('2: timeout'), 0);
setImmediate(() => console.log('3: immediate'));
process.nextTick(() => console.log('4: nextTick'));
Promise.resolve().then(() => console.log('5: promise'));
console.log('6');
// Output: 1 -> 6 -> 4 -> 5 -> 2 (or 3 depending on timer clock tick) -> 3`
      },
      {
        title: "React 18 Fiber Reconciliation & Batching",
        soundbite: "React 16+ replaced the stack reconciler with Fiber. A Fiber node is a unit of work (JavaScript object with child, sibling, return pointers). Fiber allows React to pause, resume, or abort rendering work based on priority (Concurrent Mode, useTransition). React 18 also introduced Automatic Batching across promises, timeouts, and native event handlers.",
        codeSnippet: `// React 18 Automatic Batching:
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Re-renders ONLY ONCE in React 18 (in React 17 this triggered 2 re-renders)
}, 1000);`
      },
      {
        title: "SQL Index Mechanics & The Leftmost Prefix Rule",
        soundbite: "PostgreSQL and MySQL use B+ Trees for primary and secondary indexes. Leaf nodes form a doubly linked list for O(log N) point lookups and fast range scans. If you create a composite index on `(user_id, status, created_at)`, queries filtering by `user_id` or `(user_id, status)` will use the index, but queries filtering solely by `created_at` or `status` CANNOT use the index due to the leftmost prefix rule.",
        codeSnippet: `CREATE INDEX idx_trans_user_status ON transactions (user_id, status, created_at);
-- Uses index: WHERE user_id = 101 AND status = 'SUCCESS'
-- Uses index: WHERE user_id = 101
-- SKIPS index (Sequential Scan): WHERE status = 'SUCCESS'`
      },
      {
        title: "Python GIL & Mutability Trap",
        soundbite: "The CPython Global Interpreter Lock (GIL) is a mutex that prevents multiple native threads from executing Python bytecodes simultaneously. It protects CPython memory management from race conditions. For CPU-bound tasks (data crunching, math), multi-threading provides ZERO speedup—use `multiprocessing` or NumPy (which releases the GIL during C loops). For I/O-bound tasks (API calls, DB reads), `asyncio` or threading is ideal.",
        codeSnippet: `# Mutable Default Trap:
def append_tx(tx_id, tx_list=[]): # WRONG! Shared across all calls!
    tx_list.append(tx_id)
    return tx_list

# Correct Python Idiom:
def append_tx(tx_id, tx_list=None):
    if tx_list is None:
        tx_list = []
    tx_list.append(tx_id)
    return tx_list`
      }
    ]
  },

  {
    id: "30m",
    name: "30-Min Rapid Architecture Refresher",
    badge: "🛡️ 30 Mins",
    timeBudget: "30 minutes",
    description: "High-yield distributed systems failure patterns, Redis caching edge cases, and Kafka mechanics.",
    sections: [
      {
        title: "Redis Caching Failure Modes & Defenses",
        soundbite: "1. Cache Avalanche: Thousands of keys expire at the same second, overwhelming the DB. Fix: Add random jitter to TTL (`TTL = 3600 + rand(0, 300)`).\n2. Cache Breakdown (Hotspot Invalidated): A single super-hot key (e.g. IDFC homepage interest rate banner) expires, and 10,000 concurrent requests hammer the DB. Fix: Mutex locking (Redis `SET key val NX EX 5`) so only 1 worker regenerates the cache.\n3. Cache Penetration: Malicious requests for non-existent IDs (e.g. `GET /account/-999999`) bypass cache and hit DB. Fix: Bloom Filter in front of cache + Cache null values with short TTL (60s).",
        codeSnippet: `// Mutex Lock for Cache Breakdown
const lock = await redis.set('lock:hot_key', '1', 'NX', 'EX', 5);
if (lock) {
  const data = await db.fetchHotData();
  await redis.set('hot_key', JSON.stringify(data), 'EX', 3600);
  await redis.del('lock:hot_key');
} else {
  // Wait 50ms and retry from cache
  await sleep(50);
  return redis.get('hot_key');
}`
      },
      {
        title: "Kafka Consumer Groups & Partition Assignment",
        soundbite: "In Kafka, a single partition can only be read by one consumer instance within a consumer group at any given time. If you have 10 partitions and 4 consumers, consumers read ~2-3 partitions each. If you scale to 12 consumers, 2 consumers will sit idle! Key partitioning (`hash(account_id) % num_partitions`) guarantees that all transactions for the same bank account arrive in exact chronological order at the same consumer.",
        codeSnippet: `// Key choice matters:
// Message Key = account_id -> Guarantees FIFO per account
// Message Key = null       -> Round-robin across all partitions (breaks account order!)`
      },
      {
        title: "Circuit Breaker Pattern (Resilience4j / Envoy)",
        soundbite: "When an external dependency (e.g. SMS gateway or NPCI UPI validation) slows down or fails, threads queue up, consuming connection pools and crashing the banking API. A Circuit Breaker monitors the failure rate: Closed (Normal) -> Open (Instantly rejects requests with fallback without calling dependency) -> Half-Open (Sends a small probe of requests to test recovery).",
        codeSnippet: `State Transition:
[Closed: Success > 95%] --(Failures > 50%)--> [Open: Fail Fast / Fallback]
                                                       | (Sleep 30s)
                                                       v
[Closed] <--(Probe passes)-- [Half-Open: Test 5 reqs] --(Probe fails)--> [Open]`
      },
      {
        title: "Zero-Downtime Database Schema Migration (Expand & Contract)",
        soundbite: "Never drop or rename a column in production directly! If changing `user.phone` to `user.mobile_number`: Phase 1: Expand (Add new column `mobile_number` nullable). Phase 2: Dual Write (Application code writes to both `phone` and `mobile_number`). Phase 3: Backfill (Background worker migrates old rows). Phase 4: Read switch (Application reads from `mobile_number`). Phase 5: Contract (Deprecate and drop `phone`).",
        codeSnippet: `Phase 1: ALTER TABLE users ADD COLUMN mobile_number VARCHAR(15);
Phase 2: App writes to BOTH old and new columns.
Phase 3: UPDATE users SET mobile_number = phone WHERE mobile_number IS NULL;
Phase 4: App reads from mobile_number only.
Phase 5: ALTER TABLE users DROP COLUMN phone;`
      }
    ]
  },

  {
    id: "1h",
    name: "1-Hour System Design & Resume War-Room",
    badge: "🎯 1 Hour",
    timeBudget: "60 minutes",
    description: "IDFC payment gateway architecture blueprint & defense playbook for Bipin's resume projects (Invizio & Neog).",
    sections: [
      {
        title: "IDFC Scalable Payment Gateway Architecture",
        soundbite: "Standard 7-tier design to pitch in System Design round:\n1. CloudFlare CDN + WAF (DDoS protection, SSL termination).\n2. Kong / NGINX API Gateway (Rate limiting token bucket, JWT auth verification, routing).\n3. Payment Orchestration Service (Validates request, checks Idempotency Table in PostgreSQL).\n4. Double-Entry Accounting Ledger (Debits payer, credits escrow/payee with row-level locks).\n5. Kafka Event Bus (Topics: `payment.initiated`, `payment.completed`, `payment.failed`).\n6. PSP Connectors & Webhook Worker (Async workers communicate with NPCI/Visa/Mastercard).\n7. Notification Service (WebSockets / SSE to push confirmation to React mobile app).",
        codeSnippet: `[Client Web/App]
       │ (HTTPS + Idempotency-Key)
       ▼
[API Gateway: Kong] ── (Rate Limit / Auth Check)
       │
       ▼
[Payment Orchestrator Service]
   ├── Checks PostgreSQL (Idempotency Table)
   ├── Updates Ledger (SELECT ... FOR UPDATE)
   └── Publishes to Kafka (Transactional Outbox)
       │
   [Kafka Cluster]
       ├── [PSP Webhook Worker] ──> [NPCI / Bank Network]
       ├── [Audit Log Worker]   ──> [Cassandra / S3]
       └── [Notification Svc]   ──> [FCM / WebPush]`
      },
      {
        title: "Bipin's Resume Defense: Invizio Solutions (SDE II)",
        soundbite: "Pitch: 'At Invizio Solutions, I engineered high-concurrency Node.js and React full-stack applications serving thousands of active users. Key achievements:\n1. Architected modular REST microservices with Node.js and Express, implementing Redis caching that dropped P99 API latency from 450ms to 45ms.\n2. Designed normalized SQL schemas in PostgreSQL with B-tree composite indexing, eliminating sequential scans on multi-million row transaction tables.\n3. Built resilient payment and authentication pipelines with short-lived JWTs, CSRF protection, and webhook verification workers with exponential backoff retries.'",
        codeSnippet: `// Key Metric to Mention:
// "Reduced database CPU utilization by 40% through composite B-tree indexing"
// "Maintained 99.95% uptime during festive flash traffic surges"`
      },
      {
        title: "Bipin's Resume Defense: Neog Camp / Full-Stack Work",
        soundbite: "Pitch: 'Prior to Invizio, through intensive full-stack engineering at Neog, I mastered deep React fundamentals—building custom hooks, optimizing bundle sizes via code splitting and lazy loading, and state management using Redux Toolkit and React Context with memoization. This gave me strong end-to-end empathy from pixel-perfect rendering to backend database isolation.'",
        codeSnippet: `// Front-End Optimization Soundbite:
// "Leveraged React.lazy() and dynamic imports to reduce initial bundle size by 35%, improving Core Web Vitals (LCP < 1.8s)."`
      }
    ]
  },

  {
    id: "today",
    name: "🚨 Interview Today / Tomorrow Battlecard",
    badge: "🚨 EMERGENCY",
    timeBudget: "Glanceable",
    description: "The emergency cheat-sheet to review 30 minutes before your IDFC FIRST Bank interview call.",
    sections: [
      {
        title: "Top 5 Golden Rules for the Coding Round",
        soundbite: "1. NEVER jump into coding immediately. Ask 3 clarifying questions (Constraints on N, can numbers be negative, how should edge cases like empty inputs be handled?).\n2. State the Brute Force first ($O(N^2)$ or $O(2^N)$), state why it is inefficient, then propose your optimized approach ($O(N)$ Two-Pointer / Sliding Window / Hash Map / Heap).\n3. Walk through an example test case on whiteboard or code comments before writing syntax.\n4. Write clean Python code with descriptive variable names (`current_sum`, `min_heap`, `prev_node`).\n5. Analyze both Time and Space complexity explicitly without waiting for interviewer to ask.",
        codeSnippet: `# Quick Coding Template:
def solve_problem(nums: list[int]) -> int:
    # 1. Edge cases
    if not nums:
        return 0
    # 2. State & Data structure
    lookup = {}
    # 3. Iteration
    # 4. Return result with O(N) time and O(1) space`
      },
      {
        title: "Top 5 IDFC FIRST Bank Culture & Behavioral Anchors",
        soundbite: "1. Customer-First Ethics: IDFC FIRST Bank was founded on zero hidden charges, monthly interest credits on savings accounts, and ethical digital banking. Always frame architectural decisions around customer trust and reliability.\n2. Ownership & Accountability: When asked 'Tell me about a production incident you caused or fixed', follow STAR: Situation (high-concurrency payment timeout), Task (prevent duplicate debits), Action (implemented Redis lock and idempotency table), Result (zero data corruption, 99.99% reliability).\n3. Collaborative Engineering: Express enthusiasm for working with cross-functional strategic projects teams (backend, mobile, risk, security).",
        codeSnippet: `// Behavioral STAR Framework:
// S: Situation (What was the context?)
// T: Task (What was your exact responsibility?)
// A: Action (What specific engineering steps did YOU take?)
// R: Result (Quantifiable outcome: % latency reduced, $ saved, uptime)`
      }
    ]
  }
];
