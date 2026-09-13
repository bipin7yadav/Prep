export const RESUME_PROJECTS = [
  {
    id: "config-driven-ui",
    title: "Config-Driven Dynamic UI Engine",
    company: "Invizio Solutions",
    role: "SDE II",
    techStack: ["React 18", "TypeScript", "JSON Schema", "React Hook Form", "Zod", "Tailwind CSS"],
    metrics: [
      "Reduced form release cycle by 70% (Zero frontend redeployments for new flows)",
      "Supports 15+ complex component types with conditional visibility & cross-field validations",
      "Cut bundle size by 35% using dynamic component imports"
    ],
    pitchHinglish: "Invizio Solutions me business teams ko har campaign ya onboarding flow ke liye naye forms chahiye hote the, jisme developer sprint waste hoti thi. Maine ek Schema-Driven Dynamic Form Engine banaya jo backend se JSON schema consume karke runtime pe dynamically forms render karta hai with custom validation rules without requiring any frontend code release.",
    architecture: `
+------------------+         JSON Schema         +---------------------+
| Backend / CMS    | --------------------------> | FormRenderer Engine |
| API / Config DB  |                             +----------+----------+
+------------------+                                        |
                                                            v
                                            +-------------------------------+
                                            | FieldRegistry Dynamic Resolver|
                                            +---------------+---------------+
                                                            |
                       +-------------------+----------------+--------------------+
                       |                   |                                     |
                       v                   v                                     v
             [ TextInput / Masked ]  [ Currency / IFSC ]              [ File / Doc KYC ]
                       |                   |                                     |
                       +-------------------+----------------+--------------------+
                                                            v
                                            +-------------------------------+
                                            | Zod Validator & State Reducer |
                                            +-------------------------------+
    `,
    hardQuestions: [
      {
        q: "How did you handle dynamic validations when fields depend on each other (e.g. If Account Type == 'Current', require GSTIN)?",
        answer: "JSON schema me humne condition block define kiya: `{ 'if': { 'account_type': 'CURRENT' }, 'then': { 'fields': ['gstin'], 'rules': { 'gstin': { 'required': true, 'regex': '^[0-9]{2}[A-Z]{5}...' } } } }`. React Hook Form ke `watch()` aur Zod superRefine() ka use karke dynamic schema generate kiya jo state change pe reactive validation trigger karta hai."
      },
      {
        q: "Doesn't a large JSON schema cause unnecessary re-renders in React when typing in a single field?",
        answer: "Haan, initially uncontrolled vs controlled inputs ka issue tha. Maine form state ko global state se alag kiya aur React Hook Form use kiya jo non-controlling refs pe kaam karta hai. Sirf modified field re-render hoti hai, poora dynamic form tree re-render nahi hota."
      }
    ]
  },
  {
    id: "bulk-image-upload",
    title: "High-Throughput Bulk Image Upload & Processing Pipeline",
    company: "Invizio Solutions",
    role: "SDE II",
    techStack: ["Node.js", "Express", "AWS S3", "Sharp", "BullMQ / Redis", "Worker Threads"],
    metrics: [
      "Handles 500+ concurrent image uploads without HTTP gateway timeout",
      "65% reduction in S3 storage cost via WebP conversion and lossless compression",
      "99.9% processing success rate with automatic retry queue"
    ],
    pitchHinglish: "Hamare portal pe users bulk product aur KYC images upload karte the. Shuru me sync upload tha jo Express event loop aur network bandwidth block kar deta tha. Maine isko asynchronous multi-stage pipeline me redesign kiya: client pre-signed URLs se directly S3 pe upload karta hai, S3 event webhook Node.js worker queue (BullMQ + Redis) me push karta hai, aur background me Sharp library WebP conversion aur multi-resolution thumbnails generate karti hai.",
    architecture: `
+------------+   1. Request Pre-signed URL    +-------------------+
|  Browser   | -----------------------------> | Node.js API Gateway|
|  Client    | <----------------------------- | (Generates AWS URL)|
+-----+------+   2. Pre-signed S3 PUT URL     +-------------------+
      |
      | 3. Direct Binary PUT (Zero server bandwidth)
      v
+------------------+   4. ObjectCreated   +-------------------+
|   AWS S3 Bucket  | -------------------> | BullMQ / Redis Q  |
+------------------+                      +---------+---------+
                                                    |
                                                    | 5. Job Dispatch
                                                    v
                                          +-------------------+
                                          | Sharp Worker Node |
                                          | (Resize -> WebP)  |
                                          +---------+---------+
                                                    | 6. Save Optimized Assets
                                                    v
                                          +-------------------+
                                          |  S3 CDN / CloudFront
                                          +-------------------+
    `,
    hardQuestions: [
      {
        q: "Why did you use pre-signed URLs instead of uploading files through Express multipart/form-data?",
        answer: "Multipart upload me large binary data hamare application server ke memory aur network bandwidth ko consume karta hai. Direct pre-signed URL se browser directly S3 pe upload karta hai. Hamara Express server sirf authorization aur temporary cryptographic token issue karta hai, making it virtually stateless and immune to upload traffic spikes."
      },
      {
        q: "How did you prevent users from uploading malicious executable files disguised as images?",
        answer: "File extension trust nahi kiya. Worker level pe 'file-type' library se file ke initial bytes (Magic Numbers) inspect kiye (e.g. FF D8 FF for JPEG, 89 50 4E 47 for PNG). Sharp parsing ke dauran agar invalid format mila to job instantly quarantine ho jati hai."
      }
    ]
  },
  {
    id: "mysql-optimization",
    title: "MySQL 40% Query Performance Optimization",
    company: "Invizio Solutions",
    role: "SDE II",
    techStack: ["MySQL 8.0", "InnoDB", "EXPLAIN ANALYZE", "B+ Tree Composite Indexes", "Keyset Pagination"],
    metrics: [
      "40% reduction in average query latency across high-frequency transactional tables",
      "Eliminated 100% of full-table scans on audit and transaction queries",
      "Cut p99 API response time from 1,200ms to 280ms"
    ],
    pitchHinglish: "Production me jaise jaise data 10 million rows cross kiya, hamari reporting aur transaction listing queries slow ho gayi thi. Maine slow query log enable kiya, EXPLAIN ANALYZE se execution plans check kiye, jahan full table scan dikha wahan high-selectivity columns pe composite B+ tree indexes lagaye, ORM ke N+1 queries ko indexed JOINs me convert kiya, aur slow OFFSET pagination ko keyset cursor pagination me replace kiya.",
    architecture: `
BEFORE OPTIMIZATION:
[Client] -> SELECT * FROM tx ORDER BY created_at LIMIT 50 OFFSET 100000;
              |
              +--> Full Table Scan (Scans 100,050 rows, discards 100,000) -> 1,450ms!

AFTER OPTIMIZATION (Keyset / Cursor Pagination):
[Client] -> SELECT * FROM tx WHERE id < ? ORDER BY id DESC LIMIT 50;
              |
              +--> Index Range Scan on Primary Key B+ Tree -> 3ms! (Direct jump)
    `,
    hardQuestions: [
      {
        q: "Why is `LIMIT 50 OFFSET 100000` so slow in MySQL?",
        answer: "MySQL offset 100000 ke liye pehle 100,050 rows disk se read karta hai, memory me buffer karta hai, aur fir pehle 100,000 discard karke aakhri 50 rows return karta hai. Iska time complexity O(N) ho jata hai. Keyset pagination me hum `WHERE id < last_seen_id` lagate hain jo B+ Tree me direct O(log N) jump karta hai."
      },
      {
        q: "What order of columns do you choose when creating a Composite Index `(A, B, C)`?",
        answer: "Leftmost Prefix rule ke mutabik: 1) Sabse pehle equality conditions waale columns jinme high cardinality (selectivity) ho, 2) Uske baad range conditions waale column, aur 3) Agar ORDER BY clause hai to sorting column. Kyunki range condition ke baad B+ Tree ka composite sorting break ho jata hai."
      }
    ]
  },
  {
    id: "booknook-razorpay",
    title: "Booknook E-Commerce & Razorpay Payment Integration",
    company: "Personal / Featured Project",
    role: "Full-Stack Engineer",
    techStack: ["React", "Node.js", "Express", "Razorpay Payment Gateway", "HMAC-SHA256", "MongoDB/PostgreSQL"],
    metrics: [
      "Zero payment discrepancy rate with webhook signature verification",
      "Automated inventory reservation with TTL expiration"
    ],
    pitchHinglish: "Booknook me secure checkout ke liye maine Razorpay Payment Gateway integrate kiya. Key challenge double-spending aur malicious client tamper rokna tha. Server-side order creation, HMAC-SHA256 cryptographic signature validation on webhook callbacks, aur payment status idempotency check implement kiya taaki user agar refresh bhi kare to payment duplicate na ho.",
    architecture: `
[User Browser]       1. Click Checkout       [Booknook Server]
      | ------------------------------------> | (Create Order on Razorpay API)
      | <------------------------------------ | (Returns order_id, key_id, amount)
      |
      | 2. Razorpay Checkout Modal (Customer pays UPI/Card)
      v
[Razorpay Switch] -------------------------> [Booknook Server (Webhook)]
                  3. Post webhook event        |
                  (signature, payment_id)      +--> 4. Verify HMAC-SHA256 signature
                                               +--> 5. Deduct stock & mark PAID
    `,
    hardQuestions: [
      {
        q: "What happens if the customer completes the payment on Razorpay but closes the browser before your frontend success page loads?",
        answer: "Isi liye hum frontend response pe depend nahi karte! Razorpay server directly hamare backend webhook endpoint pe event bhejta hai (`payment.captured`). Hamara server webhook verify karke database me order status 'PAID' mark karta hai. Jab user wapas aayega to uska order already confirmed dikhega."
      }
    ]
  }
];
