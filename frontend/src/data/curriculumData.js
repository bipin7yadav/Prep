export const CURRICULUM_MODULES = [
  {
    id: "00-FOUNDATION",
    num: "00",
    title: "Foundations & Complexity Analysis",
    category: "DSA & Core",
    icon: "Gauge",
    hours: "4h",
    difficulty: "Core",
    desc: "Time & Space complexity, Big-O, Big-Theta, Big-Omega, amortized analysis, recursion stack overhead.",
    hinglishSummary: "Interview me complexity sirf calculate nahi karni hoti—hardware cache misses, branch prediction aur recursion call-stack overhead ko connect karke explain karna hota hai.",
    topics: [
      "Asymptotic notations (O, Ω, Θ)",
      "Amortized O(1) in dynamic arrays (ArrayList/Vector/JS Array)",
      "Space complexity: Auxiliary vs Input memory",
      "Recursion stack limits & tail call optimization"
    ],
    markdownPath: "00-FOUNDATION/complexity-analysis.md",
    pdfBook: "PDF/01-Foundations-DSA.pdf"
  },
  {
    id: "01-PYTHON-DATA",
    num: "01",
    title: "Python Data Ecosystem & Analytics",
    category: "Python & Data",
    icon: "Database",
    hours: "12h",
    difficulty: "Advanced",
    badge: "Special Module",
    desc: "NumPy arrays vs lists, vectorization, pandas DataFrame indexing (.loc vs .iloc), groupby aggregations, Matplotlib OO API, and 1,000-row banking transaction pipeline.",
    hinglishSummary: "Python loops slow hote hain kyunki dynamic type checking har iteration me hoti hai. NumPy C-contiguous memory aur SIMD vectorization se 100x fast execution deta hai. Pandas SQL ke GROUP BY, JOIN aur Window functions ka Python equivalent hai.",
    topics: [
      "NumPy: ndarray memory layout, broadcasting rules, vectorization vs loops",
      "pandas: Series vs DataFrame, .loc label vs .iloc integer, missing data imputation",
      "pandas: GroupBy split-apply-combine, rolling window aggregations, merge/join",
      "Matplotlib: Figure vs Axes hierarchy, Subplots, Heatmaps, Bar charts",
      "SQL to pandas Rosetta Stone (WHERE -> df.query, GROUP BY -> .groupby, JOIN -> .merge)",
      "Production ETL Pipeline: Reading 1,000 banking transactions, fraud scoring & analytics dashboard"
    ],
    markdownPath: "01-PYTHON/pipeline.md",
    pdfBook: "PDF/11-Python-Data-Analytics.pdf"
  },
  {
    id: "02-DSA",
    num: "02",
    title: "Data Structures & Algorithms",
    category: "DSA & Core",
    icon: "Binary",
    hours: "18h",
    difficulty: "Intermediate",
    desc: "Arrays, Two-Pointers, Sliding Window, Hashing, Fast-Slow pointers, Monotonic Stacks, Binary Search variants.",
    hinglishSummary: "IDFC First Bank me DSA problems practical scenario based aate hain jaise Sliding Window for Fraud Detection (ek window me max transactions limit), Two Pointers for pairing payments, Hashing for O(1) deduplication.",
    topics: [
      "Arrays & In-place mutations (Two Sum, 3Sum, Kadane's Algorithm)",
      "Two Pointers & Fast-Slow pointer cycle detection",
      "Sliding Window (Fixed size for rolling averages, Dynamic size for longest valid window)",
      "Hashing: Hash collision strategies, Open Addressing vs Chaining, Load Factor"
    ],
    markdownPath: "02-DSA/sliding-window.md",
    pdfBook: "PDF/01-Foundations-DSA.pdf"
  },
  {
    id: "03-JAVASCRIPT",
    num: "03",
    title: "JavaScript Deep Dive & V8 Internals",
    category: "Frontend & JS",
    icon: "FileCode",
    hours: "8h",
    difficulty: "Core",
    desc: "Execution Contexts, Call Stack, Scope Chain, Closures, Prototypal Inheritance, Event Loop, Microtasks vs Macrotasks.",
    hinglishSummary: "JS single-threaded hai par asynchronous kaise? V8 engine call stack aur heap manage karta hai, jabki browser/Node.js Web APIs, libuv event loop, aur microtask queue (Promises) provide karte hain jo macro-task queue se pehle execute hoti hain.",
    topics: [
      "V8 Call Stack, Global Execution Context, Variable Environment",
      "Closures in memory: [[Scopes]] chain and memory leaks",
      "Event Loop: Microtasks (process.nextTick, Promise) vs Macrotasks (setTimeout, setImmediate)",
      "Prototypes: __proto__ vs prototype, prototypal inheritance chain",
      "Modern ES6+: Generators, Iterators, WeakMap/WeakSet for garbage collection"
    ],
    markdownPath: "03-JAVASCRIPT/event-loop.md",
    pdfBook: "PDF/02-JavaScript-NodeJS.pdf"
  },
  {
    id: "04-NODE-EXPRESS",
    num: "04",
    title: "Node.js & Express Production Backend",
    category: "Backend & Systems",
    icon: "Server",
    hours: "14h",
    difficulty: "Advanced",
    desc: "Libuv event loop phases, Streams & Buffer management, Cluster module, Worker Threads, middleware pipelines, error handling, rate limiting.",
    hinglishSummary: "Node.js me heavy CPU tasks (like cryptographic hashing ya PDF generation) Main Thread ko block kar dete hain. Solution: Worker Threads ya cluster module. Banking APIs me memory leak se bachne ke liye Streams use karte hain.",
    topics: [
      "Libuv 6 Phases: Timers, Pending callbacks, Idle/Prepare, Poll, Check, Close",
      "process.nextTick vs setImmediate timing guarantees",
      "Streams (Readable, Writable, Transform) & Backpressure handling",
      "Cluster module & Multi-core scaling vs Worker Threads",
      "Enterprise Express architecture: Controller-Service-Repository pattern, centralized error boundary"
    ],
    markdownPath: "04-NODE-EXPRESS/event-loop.md",
    pdfBook: "PDF/02-JavaScript-NodeJS.pdf"
  },
  {
    id: "05-SQL-DBMS",
    num: "05",
    title: "SQL & Advanced DBMS Internals",
    category: "Database",
    icon: "DatabaseZap",
    hours: "16h",
    difficulty: "Critical",
    badge: "IDFC Core",
    desc: "ACID properties, MVCC, Isolation levels, Dirty Read, Phantom Read, B+ Tree indexing, Locking (Row-level, Gap locks), Window Functions, CTEs.",
    hinglishSummary: "Banking system ka heart SQL engine hai! SELECT FOR UPDATE pessimistic locking provide karta hai double-spending rokne ke liye. Window functions (ROW_NUMBER, RANK, SUM OVER) account statements aur audit analytics me essential hain.",
    topics: [
      "ACID in Banking: Atomicity via WAL (Write-Ahead Log), Durability via fsync",
      "Transaction Isolation: Read Uncommitted, Read Committed, Repeatable Read, Serializable",
      "Concurrency anomalies: Dirty Reads, Non-Repeatable Reads, Phantom Reads, Write Skew",
      "Locking: Shared (S), Exclusive (X), Intent Locks, Gap Locks, Next-Key Locks",
      "Deadlock detection & graph cycles (Wait-For Graph)",
      "Window Functions: OVER (PARTITION BY ... ORDER BY), Running balance calculation",
      "CTE (Common Table Expressions) & Recursive hierarchical queries"
    ],
    markdownPath: "05-SQL-DBMS/window-functions.md",
    pdfBook: "PDF/03-SQL-DBMS.pdf"
  },
  {
    id: "06-SYSTEM-DESIGN",
    num: "06",
    title: "High-Level Distributed System Design",
    category: "System Design",
    icon: "Layers",
    hours: "20h",
    difficulty: "Architectural",
    desc: "Distributed Payment Switch, Idempotency keys, Saga pattern (Orchestration vs Choreography), Outbox pattern, Sharding, Read-replicas, Caching.",
    hinglishSummary: "Payment gateway design me network drops common hain. Client duplicate button click kare to do baar paise na kate—isliye unique Idempotency Key use hota hai. Distributed transactions me 2PC blocking hoti hai, isliye Sagas (with compensating transactions) use karte hain.",
    topics: [
      "UPI & Payment Gateway High-Level Architecture (50,000 TPS)",
      "Idempotency Key Pattern: Redis distributed lock + Database unique constraint",
      "Saga Pattern: Choreography vs Orchestrator for multi-service money transfer",
      "Transactional Outbox Pattern with Debezium/Kafka CDC",
      "Distributed Caching: Redis Cluster, Cache-Aside, Write-Through, Cache Stampede prevention",
      "Database Sharding by CustomerID / AccountID & Consistent Hashing"
    ],
    markdownPath: "06-SYSTEM-DESIGN/payment-system.md",
    pdfBook: "PDF/04-System-Design.pdf"
  },
  {
    id: "07-LOW-LEVEL-DESIGN",
    num: "07",
    title: "Low-Level Object-Oriented Design (LLD)",
    category: "Architecture",
    icon: "Cpu",
    hours: "10h",
    difficulty: "Advanced",
    desc: "SOLID Principles in TypeScript/Node, Strategy Pattern for Payment methods, Factory, Observer/Pub-Sub, Decorator, State Pattern for Account lifecycle.",
    hinglishSummary: "Open-Closed Principle: Naya payment method (UPI, NEFT, Credit Card) add karte waqt existing code modify nahi hona chahiye. Strategy pattern se interface define karo aur runtime pe inject karo.",
    topics: [
      "SOLID in Banking: SRP, OCP, LSP, ISP, DIP with clean TypeScript examples",
      "Strategy Pattern: Dynamic payment routing (UPI, IMPS, RTGS)",
      "Factory Pattern: Card issuance (Debit vs Credit vs Forex)",
      "Observer / Event-Driven Pattern: Account balance change notification engine",
      "State Pattern: Bank Account Lifecycle (PENDING_KYC -> ACTIVE -> SUSPENDED -> CLOSED)"
    ],
    markdownPath: "07-LOW-LEVEL-DESIGN/solid.md",
    pdfBook: "PDF/05-LLD-Design-Patterns.pdf"
  },
  {
    id: "08-SECURITY",
    num: "08",
    title: "FinTech Security & RBI Regulatory Compliance",
    category: "Security & Compliance",
    icon: "ShieldCheck",
    hours: "8h",
    difficulty: "Critical",
    badge: "Banking Crucial",
    desc: "PCI-DSS compliance, RBI Data Localization mandate, AES-256 GCM encryption at rest, TLS 1.3 in transit, HSM for PIN/keys, Tokenization.",
    hinglishSummary: "Banks sensitive credit card numbers (PAN) plain text me store nahi kar sakte. PCI-DSS ke rules aur RBI Tokenization mandate ke mutabik card ko unique non-sensitive Token se replace kiya jata hai. Sare payments logs me PAN mask karna padta hai.",
    topics: [
      "PCI-DSS 12 Core Requirements & PAN Tokenization",
      "RBI Data Localization Directive: End-to-end data processing & storage in India",
      "Cryptographic key lifecycle: HSM (Hardware Security Module) & KMS",
      "OWASP Top 10 FinTech Edition: SQL Injection, IDOR, Broken Object Level Auth, SSRF",
      "Mutual TLS (mTLS) between microservices and NPCI switch"
    ],
    markdownPath: "08-SECURITY/banking-security.md",
    pdfBook: "PDF/06-Security-DevOps.pdf"
  },
  {
    id: "09-DEVOPS-CLOUD",
    num: "09",
    title: "DevOps, Containers & Cloud Architecture",
    category: "DevOps & Cloud",
    icon: "Cloud",
    hours: "8h",
    difficulty: "Intermediate",
    desc: "Docker multi-stage builds, Container security, Kubernetes pods/deployments, GCP infrastructure, CI/CD pipeline, Observability (Prometheus/Grafana).",
    hinglishSummary: "Production container me root user se app run karna security risk hai. Non-root user, alpine/distroless base images aur multi-stage builds se lightweight aur secure containers banaye jate hain.",
    topics: [
      "Docker: Multi-stage builds for minimal attack surface and small images",
      "Kubernetes: Pods, Services, Ingress, Horizontal Pod Autoscaling (HPA)",
      "Google Cloud Platform (GCP): Cloud Run, GKE, Cloud SQL, Cloud IAM",
      "Observability in FinTech: Distributed Tracing with OpenTelemetry, Prometheus metrics, ELK logs"
    ],
    markdownPath: "09-DEVOPS-CLOUD/docker.md",
    pdfBook: "PDF/06-Security-DevOps.pdf"
  },
  {
    id: "10-REACT",
    num: "10",
    title: "React.js & Modern Frontend Architecture",
    category: "Frontend & JS",
    icon: "Code2",
    hours: "12h",
    difficulty: "Advanced",
    badge: "Bipin's Core",
    desc: "Virtual DOM reconciliation, Fiber architecture, React 18 concurrent features, Hooks internals, useMemo/useCallback performance, Redux Toolkit, Config-Driven UI.",
    hinglishSummary: "React Fiber ek virtual stack frame hai jo rendering work ko chunks me split karke interruptible banata hai. Config-driven UI me backend se JSON metadata aata hai aur frontend dynamic forms render karta hai bina code redeployment ke.",
    topics: [
      "React Fiber Architecture: Reconciliation vs Commit phases, Time-slicing",
      "Hooks Internals: How useState and useEffect track state via fiber linked lists",
      "Performance optimization: React.memo, useMemo, useCallback, Code Splitting (lazy/Suspense)",
      "State Management: Redux Toolkit, Context API pitfalls, Immer for immutable updates",
      "Config-Driven UI Architecture: Schema-driven rendering for banking onboarding journeys"
    ],
    markdownPath: "10-REACT/react-fundamentals.md",
    pdfBook: "PDF/07-React-Frontend.pdf"
  },
  {
    id: "11-BANKING-FINTECH",
    num: "11",
    title: "Banking Rails & FinTech Protocols",
    category: "FinTech Domain",
    icon: "Landmark",
    hours: "14h",
    difficulty: "Critical",
    badge: "IDFC Domain",
    desc: "UPI 2.0 architecture, NPCI Switch, IMPS vs RTGS vs NEFT, Double-Entry Bookkeeping Ledger, ISO 8583 / ISO 20022 messaging.",
    hinglishSummary: "Double-entry bookkeeping me har transaction ka debit aur credit balance match hona chahiye: Total Debits = Total Credits. Paisa hawa se create nahi hota. UPI me 4-party model hota hai: Payer PSP, Remitter Bank, NPCI Switch, Beneficiary Bank, Payee PSP.",
    topics: [
      "UPI Ecosystem: 4-Party Model, VPA resolution, MPIN verification via Common Library (CL)",
      "NPCI Settlement: Real-time authorization vs deferred net settlement (DNS)",
      "IMPS (24x7 real-time) vs RTGS (high-value gross settlement) vs NEFT (batch clearing)",
      "Double-Entry Accounting Ledger: Debit/Credit ledger schema, Immutable audit logs",
      "ISO 8583 Card Transactions vs ISO 20022 XML Messaging in Modern Core Banking"
    ],
    markdownPath: "11-BANKING-FINTECH/upi.md",
    pdfBook: "PDF/08-Banking-FinTech.pdf"
  },
  {
    id: "12-RESUME-DEFENSE",
    num: "12",
    title: "Resume Deep Dive & Project Defense",
    category: "Interview Special",
    icon: "UserCheck",
    hours: "10h",
    difficulty: "Personalized",
    badge: "Bipin Yadav",
    desc: "Defense of Invizio Solutions SDE II experience: Config-driven UI, Bulk Image Upload pipeline, MySQL 40% query optimization, Booknook Razorpay integration.",
    hinglishSummary: "Interviewer poochega: 'Aapne MySQL queries 40% kaise optimize ki?' Explain karo EXPLAIN ANALYZE, composite index creation on (status, created_at), N+1 query elimination using JOINs, aur slow query log profiling.",
    topics: [
      "Project 1: Config-Driven UI — Schema design, dynamic validation, zero-deployment form updates",
      "Project 2: Bulk Image Upload System — Async processing, S3 pre-signed URLs, sharp image compression, queue worker",
      "Project 3: MySQL 40% Performance Tuning — Query profiling, composite B+ Tree indexing, cursor pagination",
      "Project 4: Booknook E-Commerce — Razorpay webhook verification, HMAC-SHA256 signature, idempotency handling",
      "Project 5: Video Library App — Redux Toolkit with Immer, optimistic UI updates, infinite scrolling"
    ],
    markdownPath: "12-INTERVIEW/project-deep-dive.md",
    pdfBook: "PDF/09-Interview-Question-Bank.pdf"
  },
  {
    id: "16-JAVA",
    num: "16",
    title: "Java Ecosystem & Node.js Comparison",
    category: "Backend & Systems",
    icon: "Coffee",
    hours: "6h",
    difficulty: "Bridge",
    desc: "Java vs Node.js runtime comparison, JVM memory model, Spring Boot dependency injection vs Express, multithreading vs Event Loop.",
    hinglishSummary: "IDFC First Bank me heavy legacy aur core banking services Spring Boot / Java me hain jabki new-age microservices Node.js/Python me hain. Dono ke trade-offs explain karne se aap standout karoge.",
    topics: [
      "JVM Memory Model: Heap (Eden, Survivor, Tenured), Metaspace, GC (G1GC vs ZGC)",
      "Multithreading (Thread-per-request) vs Event-Driven (Libuv Single Thread + Worker Pool)",
      "Spring Boot Architecture: IoC Container, Dependency Injection, JPA/Hibernate ORM",
      "Node.js vs Java: Throughput, latency, memory footprint, startup time trade-offs"
    ],
    markdownPath: "16-JAVA/java-fundamentals.md",
    pdfBook: "PDF/09-Interview-Question-Bank.pdf"
  }
];
