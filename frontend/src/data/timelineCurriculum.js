export const TIMELINE_TRACKS = {
  "7D": {
    id: "7D",
    name: "7-Day Emergency Sprint",
    intensity: "Extreme Sprint",
    dailyCommitment: "8.0 hrs/day (56 hrs total)",
    depthMode: "⚡ Interview Essentials",
    depthBadge: "badge-red",
    tagline: "Prioritize top 20% high-frequency concepts that produce 80% of interview questions. Skip low-probability deep dives.",
    strategy: {
      studyFocus: "Strictly 🔴 Must-Know concepts: Two Pointers/Sliding Window, SQL Joins/Window Functions/Locking, Node.js Event Loop, UPI 4-party flow, and Bipin's Invizio Resume Defense.",
      skipTopics: ["Java Metaspace & JVM Internals", "Complex Matplotlib styling", "Advanced Kubernetes Ingress setup", "Obscure DP algorithms"],
      skimTopics: ["DevOps Docker multi-stage", "Secondary design patterns (Composite, Decorator)", "Full ACID WAL replay internals"],
      deepDiveTopics: ["SELECT FOR UPDATE & Pessimistic Locks", "Idempotency Key & Redis Lock", "Node.js Event Loop Microtasks", "MySQL 40% Tuning Pitch"]
    },
    dailyTargets: {
      studyHours: 8,
      lessonsPerDay: 4,
      flashcardsPerDay: 30,
      dsaProblemsPerDay: 3,
      quizzesPerDay: 1,
      mockInterviewsTotal: 2
    },
    allowedPriorities: ["🔴 Must Know"],
    prescribedPlan: [
      { day: 1, title: "Day 1: Baseline Diagnostic & Python/NumPy Essentials", task: "Take 24-Q Quiz + Master NumPy homogeneous memory vs Python lists + 30 Flashcards" },
      { day: 2, title: "Day 2: SQL Advanced Concurrency & Window Functions", task: "Practice SELECT FOR UPDATE, Next-Key Locks, and SUM OVER running balance queries" },
      { day: 3, title: "Day 3: Node.js Event Loop & Libuv Internals", task: "Master process.nextTick vs setImmediate, Streams backpressure, and worker pools" },
      { day: 4, title: "Day 4: UPI 2.0 Rails & Distributed Payment Switch", task: "Diagram 50k TPS Payment Switch, Idempotency Key UUID, and Orchestrated Sagas" },
      { day: 5, title: "Day 5: High-Yield DSA Banking Patterns", task: "Solve Two Pointers (3Sum), Sliding Window (Max Window), and Monotonic Queue" },
      { day: 6, title: "Day 6: Bipin Yadav's Resume Project Defense", task: "Deliver 60-second pitches on Config-Driven UI, S3 Upload, and MySQL 40% Tuning" },
      { day: 7, title: "Day 7: Full Mock Interview & Last-Minute Revision", task: "Simulate 60-min Tech Round + Review 15-Minute Cram Sheets + Mistake Book" }
    ]
  },
  "14D": {
    id: "14D",
    name: "14-Day Fast-Track",
    intensity: "Intensive",
    dailyCommitment: "5.0 hrs/day (70 hrs total)",
    depthMode: "🎯 High-Yield Drills",
    depthBadge: "badge-red",
    tagline: "Comprehensive coverage of core banking backend, advanced relational SQL, Python data ecosystem, and daily coding drills.",
    strategy: {
      studyFocus: "🔴 Must Know + 🟠 High Priority: Complete SQL concurrency, Node runtime, pandas DataFrames & GroupBy, Distributed Sagas, and Resume STAR.",
      skipTopics: ["Deep Java bytecode tuning", "Complex N-Queens backtracking", "Advanced GCP IAM cross-project federation"],
      skimTopics: ["Secondary design patterns", "Detailed ISO 8583 bitmaps"],
      deepDiveTopics: ["ACID vs MVCC snapshot reads", "pandas .loc vs .iloc & groupby", "Saga Orchestrator with compensation", "Config-Driven UI Zod validation"]
    },
    dailyTargets: {
      studyHours: 5,
      lessonsPerDay: 3,
      flashcardsPerDay: 20,
      dsaProblemsPerDay: 2,
      quizzesPerDay: 1,
      mockInterviewsTotal: 3
    },
    allowedPriorities: ["🔴 Must Know", "🟠 High Priority"],
    prescribedPlan: [
      { day: "1-2", title: "Days 1-2: Foundations, Complexity & Python Core", task: "Big-O, memory layout, Python OOP, generators, decorators" },
      { day: "3-4", title: "Days 3-4: NumPy & pandas Data Ecosystem", task: "Broadcasting, vectorization, DataFrame .loc/.iloc, GroupBy, missing data" },
      { day: "5-6", title: "Days 5-6: SQL Joins, Window Functions & CTEs", task: "Master DENSE_RANK, cumulative running balances, recursive CTEs" },
      { day: "7-8", title: "Days 7-8: Advanced DBMS: ACID, MVCC, Locking & Deadlocks", task: "Next-Key Locks, gap locking, deadlock Wait-For graphs, EXPLAIN profiling" },
      { day: "9-10", title: "Days 9-10: Node.js Libuv Event Loop & Express Architecture", task: "Microtask queues, Streams, cluster scaling, worker threads" },
      { day: "11-12", title: "Days 11-12: Distributed Payment Switch & UPI Rails", task: "50k TPS switch, idempotency, Sagas, Outbox CDC, NPCI switch" },
      { day: "13-14", title: "Days 13-14: Resume Defense & Full Mock Interviews", task: "STAR behavioral models, Invizio projects deep dive, final cram pack" }
    ]
  },
  "1M": {
    id: "1M",
    name: "1-Month Comprehensive",
    intensity: "Recommended Track",
    dailyCommitment: "3.0 hrs/day (90 hrs total)",
    depthMode: "📖 Interview + Deep Concept",
    depthBadge: "badge-gold",
    tagline: "Balanced, thorough preparation. Master 40+ DSA problems, complete SQL queries, Node internals, Python data analytics pipeline, and Payment Gateway design.",
    strategy: {
      studyFocus: "All 16 Curriculum Modules: DSA patterns, SQL concurrency, Node/Express, React Fiber, Python Data Pipeline, System Design, Security, and LLD.",
      skipTopics: ["Obscure DP bitmasking"],
      skimTopics: ["Legacy Java Spring XML configs"],
      deepDiveTopics: ["Everything in Core Curriculum + Production Edge Cases"]
    },
    dailyTargets: {
      studyHours: 3,
      lessonsPerDay: 2,
      flashcardsPerDay: 15,
      dsaProblemsPerDay: 2,
      quizzesPerDay: 1,
      mockInterviewsTotal: 5
    },
    allowedPriorities: ["🔴 Must Know", "🟠 High Priority", "🟡 Good to Know"],
    prescribedPlan: [
      { day: "Week 1", title: "Week 1: Foundations, DSA Core & Python Ecosystem", task: "Two Pointers, Sliding Window, Hashing, Python internals, NumPy vectorization" },
      { day: "Week 2", title: "Week 2: pandas Analytics & Advanced Relational DBMS", task: "GroupBy, ETL pipeline, ACID, MVCC, Locks, Deadlocks, Window functions" },
      { day: "Week 3", title: "Week 3: Node.js Backend, React Fiber & Low-Level Design", task: "Event Loop, Streams, React 18 Concurrent, SOLID in TypeScript, Strategy pattern" },
      { day: "Week 4", title: "Week 4: System Design, FinTech Rails, Security & Mocks", task: "Payment Switch, Sagas, UPI 2.0, PCI-DSS, RBI Localization, Resume defense" }
    ]
  },
  "2M": {
    id: "2M",
    name: "2-Month Deep-Dive",
    intensity: "Thorough",
    dailyCommitment: "2.5 hrs/day (135 hrs total)",
    depthMode: "🧠 Deep Understanding + Production",
    depthBadge: "badge-blue",
    tagline: "End-to-end coding implementations, 60+ DSA problems, distributed caching, Kafka, GCP Cloud infrastructure, and full project deconstruction.",
    strategy: {
      studyFocus: "Master all core domains with hands-on code writing, benchmarking, and real-world microservice resiliency patterns.",
      skipTopics: [],
      skimTopics: [],
      deepDiveTopics: ["Distributed consensus, Redis clustering, Docker multi-stage, GCP Cloud Run, Kafka partitions"]
    },
    dailyTargets: {
      studyHours: 2.5,
      lessonsPerDay: 1,
      flashcardsPerDay: 12,
      dsaProblemsPerDay: 2,
      quizzesPerDay: 1,
      mockInterviewsTotal: 8
    },
    allowedPriorities: ["🔴 Must Know", "🟠 High Priority", "🟡 Good to Know", "🟢 Nice to Have"],
    prescribedPlan: [
      { day: "Month 1", title: "Month 1: DSA Mastery & Core Backend Internals", task: "60 DSA problems, Libuv source mechanics, advanced InnoDB locking, Python data analytics" },
      { day: "Month 2", title: "Month 2: High-Level System Design, DevOps & Enterprise Defense", task: "Distributed microservices, Kafka partition ordering, GCP GKE, PCI-DSS, 8 mock interviews" }
    ]
  },
  "3M": {
    id: "3M",
    name: "3-Month Full Mastery",
    intensity: "Mastery",
    dailyCommitment: "2.0 hrs/day (180 hrs total)",
    depthMode: "🏗️ Complete Architectural Mastery",
    depthBadge: "badge-green",
    tagline: "Full stack engineering excellence. Master 80+ DSA problems, Java/Spring Boot enterprise bridge, and distributed systems leadership.",
    strategy: {
      studyFocus: "Enterprise-grade software engineering, cross-stack comparison (Java vs Node), advanced algorithms, and leadership STAR scenarios.",
      skipTopics: [],
      skimTopics: [],
      deepDiveTopics: ["JVM memory tuning, ZGC vs G1GC, Spring IoC, distributed sagas, security threat modeling"]
    },
    dailyTargets: {
      studyHours: 2,
      lessonsPerDay: 1,
      flashcardsPerDay: 10,
      dsaProblemsPerDay: 1,
      quizzesPerDay: 1,
      mockInterviewsTotal: 12
    },
    allowedPriorities: ["🔴 Must Know", "🟠 High Priority", "🟡 Good to Know", "🟢 Nice to Have"],
    prescribedPlan: [
      { day: "Month 1", title: "Month 1: Algorithmic Rigor & Data Pipelines", task: "Trees, Graphs, DP, NumPy, pandas, Matplotlib analytics dashboards" },
      { day: "Month 2", title: "Month 2: Enterprise Relational Databases & Backend Engineering", task: "InnoDB internals, distributed transaction patterns, React Fiber, Node streams" },
      { day: "Month 3", title: "Month 3: Banking Rails, Java Ecosystem & Staff Defense", task: "UPI 2.0, NPCI settlement, Spring Boot comparison, 12 rigorous mock rounds" }
    ]
  },
  "6M": {
    id: "6M",
    name: "6-Month Career Transformation",
    intensity: "Career Transformation",
    dailyCommitment: "1.5 hrs/day (300 hrs total)",
    depthMode: "🚀 Deep Dive + Production + Staff Architect",
    depthBadge: "badge-gray",
    tagline: "Systematic 6-phase master curriculum. Complete computer science foundations to Staff / Lead Developer defense at IDFC FIRST Bank.",
    strategy: {
      studyFocus: "End-to-end master curriculum covering deep operating systems, networks, database internals, 100+ DSA problems, and FinTech architecture leadership.",
      skipTopics: [],
      skimTopics: [],
      deepDiveTopics: ["All 16 domains at Staff/Principal engineer level"]
    },
    dailyTargets: {
      studyHours: 1.5,
      lessonsPerDay: 1,
      flashcardsPerDay: 8,
      dsaProblemsPerDay: 1,
      quizzesPerDay: 1,
      mockInterviewsTotal: 20
    },
    allowedPriorities: ["🔴 Must Know", "🟠 High Priority", "🟡 Good to Know", "🟢 Nice to Have"],
    prescribedPlan: [
      { day: "Month 1-2", title: "Phase 1: Computer Science Core & Comprehensive DSA", task: "100+ algorithmic problems across all 14 patterns, complexity theory" },
      { day: "Month 3-4", title: "Phase 2: Database Internals & Full Backend Runtime", task: "B+ Tree source algorithms, MVCC rollback segments, Libuv C++ architecture" },
      { day: "Month 5-6", title: "Phase 3: Large-Scale Financial Systems & Principal Defense", task: "Multi-datacenter active-active design, high-frequency settlement, 20 mocks" }
    ]
  }
};

export const TIMELINE_CONFIGS = TIMELINE_TRACKS;
