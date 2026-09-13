/* Master Important Topics Matrix for IDFC FIRST Bank Developer Role */

export const IMPORTANT_TOPICS = [
  // -------------------------------------------------------------
  // TIER 1: MUST KNOW (100% Probability in IDFC Interview)
  // -------------------------------------------------------------
  {
    id: "top-node-event-loop",
    title: "Node.js Event Loop & Asynchronous Architecture",
    tier: "Must Know",
    tierColor: "rose",
    category: "Node.js & Backend",
    studyTimeMinutes: 45,
    interviewFrequency: "Every Technical Round",
    lessonDocId: "03-nodejs-backend",
    summary: "Complete breakdown of libuv phases (Timers, Pending Callbacks, Poll, Check, Close) and Microtask Queue (process.nextTick vs Promise.then). Why Node.js remains single-threaded for execution but utilizes threadpool for crypto/fs.",
    keyQuestions: [
      "What is the exact execution order between process.nextTick, Promise.resolve, setTimeout(fn, 0), and setImmediate?",
      "How does libuv threadpool size (UV_THREADPOOL_SIZE) impact heavy crypto hashing or disk I/O in high-concurrency banking microservices?",
      "How do you handle CPU-intensive tasks without blocking the main event loop in Node.js?"
    ],
    bankingRelevance: "Critical for handling 10,000+ simultaneous payment webhook callbacks and SSE notifications without event loop lag."
  },
  {
    id: "top-sql-acid-indexing",
    title: "SQL ACID Transactions, Isolation Levels & B-Tree Indexing",
    tier: "Must Know",
    tierColor: "rose",
    category: "Databases",
    studyTimeMinutes: 60,
    interviewFrequency: "Every Technical Round",
    lessonDocId: "05-database-management",
    summary: "Deep dive into ACID guarantees, WAL (Write-Ahead Logging), isolation levels (Read Committed vs Repeatable Read vs Serializable), Dirty Reads, Non-Repeatable Reads, Phantom Reads, and B-Tree vs Hash indexing.",
    keyQuestions: [
      "How do you prevent money duplication when two debit transactions occur concurrently on the same account? (SELECT ... FOR UPDATE vs Optimistic Locking)",
      "Explain the internal storage mechanics of a B+ Tree index and why composite index column order matters (Leftmost prefix rule).",
      "What is MVCC (Multi-Version Concurrency Control) in PostgreSQL and how does it prevent reader-writer contention?"
    ],
    bankingRelevance: "Core ledger integrity and balance transfer atomicity—zero tolerance for phantom updates or money creation."
  },
  {
    id: "top-microservices-idempotency",
    title: "Microservices Idempotency & Distributed Saga Pattern",
    tier: "Must Know",
    tierColor: "rose",
    category: "System Design & Architecture",
    studyTimeMinutes: 50,
    interviewFrequency: "System Design & Senior Arch",
    lessonDocId: "08-software-architecture",
    summary: "Designing robust idempotency keys with unique database constraints and Redis locks. Choreography vs Orchestration Sagas for distributed banking transactions without 2-Phase Commit (2PC).",
    keyQuestions: [
      "How do you guarantee that a network timeout during a payment gateway call doesn't double-charge the customer?",
      "What is a Compensating Transaction in a Saga pattern when the third step of an account onboarding workflow fails?",
      "Why is 2-Phase Commit (2PC) rarely used in modern cloud-native banking microservices?"
    ],
    bankingRelevance: "Every payment request, UPI transaction, and IMPS transfer must be strictly idempotent."
  },
  {
    id: "top-banking-security-auth",
    title: "Banking Security: OAuth2, JWT Rotation, RBAC & OWASP Top 10",
    tier: "Must Know",
    tierColor: "rose",
    category: "Security & Banking",
    studyTimeMinutes: 45,
    interviewFrequency: "Every Technical Round",
    lessonDocId: "10-idfc-first-bank-profile",
    summary: "Securing APIs in a zero-trust banking environment: Short-lived access tokens + Refresh token rotation, HTTP-only secure SameSite cookies, SQL Injection parameterized queries, and strict RBAC/ABAC authorization.",
    keyQuestions: [
      "Why should JWT access tokens never be stored in browser localStorage for a banking portal?",
      "How do you revoke a stateless JWT immediately if a user's phone is reported stolen or account is suspended?",
      "Explain IDOR (Insecure Direct Object Reference) and how to prevent account number tampering in API endpoints."
    ],
    bankingRelevance: "RBI cybersecurity compliance, data leakage prevention, and customer account session security."
  },
  {
    id: "top-react-rendering-state",
    title: "React Virtual DOM, Fiber Reconciliation & Custom Hooks",
    tier: "Must Know",
    tierColor: "rose",
    category: "Web & Frontend",
    studyTimeMinutes: 40,
    interviewFrequency: "Full-Stack & Frontend Rounds",
    lessonDocId: "04-web-development",
    summary: "React 18 Fiber architecture, concurrent rendering, batching, re-rendering triggers, memoization (useMemo, useCallback, React.memo), and building custom hooks for reusable API state.",
    keyQuestions: [
      "What is the difference between Virtual DOM diffing and Fiber reconciliation? Why can Fiber interrupt and resume rendering?",
      "When does useMemo actually hurt performance rather than help it?",
      "How would you optimize a high-frequency financial trading ticker or banking dashboard rendering 500 updates per second?"
    ],
    bankingRelevance: "IDFC customer portal and internal corporate banker dashboards require buttery smooth, zero-jank UX."
  },
  {
    id: "top-python-core-internals",
    title: "Python Core Internals: Memory, GIL, Mutability & Decorators",
    tier: "Must Know",
    tierColor: "rose",
    category: "Python Core",
    studyTimeMinutes: 45,
    interviewFrequency: "Python Rounds",
    lessonDocId: "01-python-programming",
    summary: "Pass-by-object-reference, mutable default argument trap, Global Interpreter Lock (GIL) implications for CPU vs I/O bound concurrency, custom decorators, and generator memory efficiency.",
    keyQuestions: [
      "What happens when you use `def add_item(val, items=[])` in Python? Why is this a major bug?",
      "How does the Python GIL affect multi-threading vs multi-processing? When would you choose Celery vs asyncio?",
      "Write a custom caching or timing decorator with `functools.wraps`."
    ],
    bankingRelevance: "Data ingestion pipelines, transaction ETL, and automated reconciliation scripts written in Python."
  },

  // -------------------------------------------------------------
  // TIER 2: HIGH PROBABILITY (70% - 90% Probability)
  // -------------------------------------------------------------
  {
    id: "top-caching-redis",
    title: "Distributed Caching with Redis: Patterns & Stampede Prevention",
    tier: "High",
    tierColor: "amber",
    category: "System Design & Architecture",
    studyTimeMinutes: 40,
    interviewFrequency: "System Design & Backend",
    lessonDocId: "08-software-architecture",
    summary: "Cache-Aside, Write-Through, Write-Behind, Cache Invalidation strategies, TTL jitter to prevent Cache Avalanche, Bloom filters for Cache Penetration, and Mutex locking for Cache Breakdown.",
    keyQuestions: [
      "Explain Cache Breakdown vs Cache Avalanche vs Cache Penetration and how to mitigate each in a banking API.",
      "How do you maintain cache-database consistency when a customer updates their phone number or account status?",
      "What is Redis cluster sharding and how does consistent hashing distribute keys?"
    ],
    bankingRelevance: "Sub-millisecond balance checks and user profile caching under high burst traffic (e.g. Diwali sales)."
  },
  {
    id: "top-kafka-event-driven",
    title: "Event-Driven Architecture with Apache Kafka",
    tier: "High",
    tierColor: "amber",
    category: "System Design & Architecture",
    studyTimeMinutes: 45,
    interviewFrequency: "System Design & Backend",
    lessonDocId: "08-software-architecture",
    summary: "Topics, Partitions, Consumer Groups, Offsets, Log Compaction, Exactly-Once Semantics (producer idempotence + transactional outbox), and handling Dead Letter Queues (DLQ).",
    keyQuestions: [
      "How does Kafka guarantee message ordering within a partition, and what key should you use for banking transactions?",
      "Explain the Transactional Outbox Pattern to achieve reliable database update + Kafka message publishing.",
      "What happens during a consumer rebalance and how do you handle poisoned/unparseable messages?"
    ],
    bankingRelevance: "Real-time payment streaming, fraud detection event pipelines, and audit notification fanout."
  },
  {
    id: "top-docker-k8s-devops",
    title: "Containerization, Kubernetes Pod Lifecycle & CI/CD Pipelines",
    tier: "High",
    tierColor: "amber",
    category: "DevOps & Cloud",
    studyTimeMinutes: 35,
    interviewFrequency: "DevOps & Senior Engineering",
    lessonDocId: "07-devops-practices",
    summary: "Multi-stage Docker builds, Kubernetes Pods, Deployments, Services, Ingress, Liveness vs Readiness Probes, Zero-Downtime Rolling Updates, and automated CI/CD pipeline stages.",
    keyQuestions: [
      "Why is readinessProbe critical in preventing 502/503 errors during rolling deployments in Kubernetes?",
      "How do multi-stage Docker builds keep container image sizes minimal and secure for production?",
      "What is Blue-Green vs Canary deployment and how does a bank perform instant rollback if failure rates spike?"
    ],
    bankingRelevance: "IDFC FIRST Bank enterprise cloud deployment on Kubernetes with zero service disruption."
  },
  {
    id: "top-system-design-payment",
    title: "System Design: Scalable Payment Gateway & Ledger Service",
    tier: "High",
    tierColor: "amber",
    category: "System Design & Architecture",
    studyTimeMinutes: 60,
    interviewFrequency: "System Design Round",
    lessonDocId: "08-software-architecture",
    summary: "End-to-end architecture: API Gateway, Rate Limiter, Payment Orchestrator, Double-Entry Bookkeeping Ledger, PSP Connectors (Razorpay/Stripe/UPI), Webhook Reconciliation Worker, and Audit Logs.",
    keyQuestions: [
      "How do you design a double-entry bookkeeping ledger where debits must always balance credits across all accounts?",
      "How do you handle third-party PSP webhooks arriving out of order or arriving before the synchronous API response returns?",
      "How do you handle ledger reconciliation when 0.01% of payments are stuck in 'PENDING' status at midnight?"
    ],
    bankingRelevance: "Directly mirrors the strategic projects being built by IDFC FIRST Bank's digital banking team."
  },

  // -------------------------------------------------------------
  // TIER 3: GOOD TO KNOW (40% - 60% Probability)
  // -------------------------------------------------------------
  {
    id: "top-python-numpy-pandas",
    title: "Python NumPy & pandas for Data Analytics & Reconciliation",
    tier: "Good",
    tierColor: "emerald",
    category: "Data & Analytics",
    studyTimeMinutes: 40,
    interviewFrequency: "Python & Data Rounds",
    lessonDocId: "02-python-data-analytics",
    summary: "Vectorized array operations vs Python loops, pandas DataFrame filtering, `groupby`, `merge`, handling missing data with `fillna`/`dropna`, and memory optimization for large financial CSV files.",
    keyQuestions: [
      "Why are vectorized NumPy operations 50x-100x faster than standard Python `for` loops?",
      "How do you use `pd.merge()` to perform an outer join reconciliation between internal bank ledger and NPCI clearance sheets?",
      "How do you handle a 5GB transaction CSV in pandas without running out of RAM? (Use `chunksize` in `pd.read_csv`)."
    ],
    bankingRelevance: "End-of-day bank reconciliation batches and fraud anomaly detection scripts."
  },
  {
    id: "top-nosql-mongo-cassandra",
    title: "NoSQL vs Relational: MongoDB, DynamoDB & Cassandra Trade-offs",
    tier: "Good",
    tierColor: "emerald",
    category: "Databases",
    studyTimeMinutes: 35,
    interviewFrequency: "System Design & Database",
    lessonDocId: "05-database-management",
    summary: "CAP Theorem applied to banking, document vs wide-column vs relational stores, schema design for high-write immutable transaction audit logs, and partition keys.",
    keyQuestions: [
      "Why do banks keep the core ledger in PostgreSQL/Oracle but store transaction audit trails or user clickstreams in NoSQL/Cassandra?",
      "Explain the CAP Theorem trade-off: why can a banking transfer system never compromise on Consistency for Availability?"
    ],
    bankingRelevance: "Audit log storage, notification history, and analytics event logging."
  },
  {
    id: "top-resilience-circuit-breaker",
    title: "Resilience Patterns: Circuit Breaker, Bulkhead & Rate Limiting",
    tier: "Good",
    tierColor: "emerald",
    category: "System Design & Architecture",
    studyTimeMinutes: 35,
    interviewFrequency: "Architecture Round",
    lessonDocId: "08-software-architecture",
    summary: "Circuit Breaker states (Closed, Open, Half-Open), Bulkhead thread isolation, Token Bucket and Leaky Bucket algorithms for rate limiting at the API Gateway.",
    keyQuestions: [
      "How does a Circuit Breaker prevent cascading failure when an external SMS OTP provider goes down?",
      "Explain the Token Bucket algorithm used by API Gateways to throttle abusive client requests."
    ],
    bankingRelevance: "Preventing upstream partner outages (NPCI, SMS gateways, Visa/Mastercard) from crashing internal bank services."
  },

  // -------------------------------------------------------------
  // TIER 4: NICE TO HAVE (20% - 40% Probability)
  // -------------------------------------------------------------
  {
    id: "top-grpc-proto-event-sourcing",
    title: "gRPC vs REST, Protocol Buffers & Event Sourcing (CQRS)",
    tier: "Nice",
    tierColor: "slate",
    category: "System Design & Architecture",
    studyTimeMinutes: 30,
    interviewFrequency: "Senior Arch / Specialized",
    lessonDocId: "08-software-architecture",
    summary: "HTTP/2 binary framing vs HTTP/1.1 JSON, Protobuf serialization speed, Command Query Responsibility Segregation (CQRS) and Event Sourcing mechanics.",
    keyQuestions: [
      "Why is gRPC significantly faster than REST JSON for inter-microservice communication within a private Kubernetes cluster?",
      "What is Event Sourcing and how does storing state changes as immutable events guarantee a tamper-proof audit trail?"
    ],
    bankingRelevance: "High-throughput inter-service communication and immutable audit ledgers."
  },
  {
    id: "top-python-matplotlib",
    title: "Python Data Visualization with Matplotlib",
    tier: "Nice",
    tierColor: "slate",
    category: "Data & Analytics",
    studyTimeMinutes: 20,
    interviewFrequency: "Analytical Rounds",
    lessonDocId: "02-python-data-analytics",
    summary: "Figures, Axes, line plots, histograms, bar charts, and exporting charts for executive reporting.",
    keyQuestions: [
      "How do you plot a distribution of transaction amounts to identify fraud outliers using a histogram and boxplot?"
    ],
    bankingRelevance: "Portfolio analytics, risk metrics plotting, and executive reporting."
  }
];
