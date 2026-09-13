# System Design Last-Minute Interview Cheatsheet

---

## 🔢 Numbers Every Engineer Must Know (Latencies)
```text
L1 Cache Reference:              ~0.5 ns
Branch Mispredict:               ~5 ns
L2 Cache Reference:              ~7 ns
Mutex Lock/Unlock:               ~25 ns
Main Memory (RAM) Reference:     ~100 ns
Compress 1KB with Snappy:        ~3 µs
Send 1KB over 1Gbps Network:     ~10 µs
Read 1MB Sequentially from SSD:  ~1 ms
Disk Seek (HDD):                 ~10 ms
Send Packet Across Datacenter:   ~0.5 ms
Round Trip (Mumbai to US-East):  ~150 ms
```

---

## 📈 High Availability & Uptime SLAs

| Availability Target | Annual Allowed Downtime | Daily Allowed Downtime | Typical Tier |
| :--- | :---: | :---: | :--- |
| **99% ("Two Nines")** | 3.65 days | 14.4 minutes | Internal testing tools |
| **99.9% ("Three Nines")** | 8.76 hours | 43.2 seconds | Standard SaaS apps |
| **99.99% ("Four Nines")** | 52.6 minutes | 4.32 seconds | High-priority API gateways |
| **99.999% ("Five Nines")**| 5.26 minutes | 0.43 seconds | **Core Banking Solution & Payment Rails** |

---

## 🧠 Redis Caching Strategies & Defenses

1. **Cache-Aside (Lazy Loading):** App reads cache. On miss, reads DB, writes to cache, returns. (Most common).
2. **Write-Through:** App writes to cache; cache synchronously writes to DB before acknowledging.
3. **Write-Behind (Write-Back):** App writes to cache; cache asynchronously batches writes to DB. (High write throughput, risk of data loss on crash).
4. **Cache Penetration Defense:** Querying keys that don't exist in DB.
   - *Fix:* Cache `null` with short TTL, or use a **Bloom Filter** at the gateway.
5. **Cache Stampede / Breakdown:** Hot key with high QPS expires; thousands of requests hit DB simultaneously.
   - *Fix:* Mutual exclusion lock (Mutex in Redis) or probabilistic early expiration (XFetch algorithm).

---

## 📨 Apache Kafka Quick Architecture
- **Topic:** Logical stream of messages.
- **Partition:** Ordered, append-only log of immutable messages. The unit of parallelism.
- **Partition Key:** Messages with the same key (e.g., `account_id`) **always go to the same partition**, guaranteeing chronological ordering per account.
- **Consumer Group:** Multiple workers reading a topic. Each partition is consumed by strictly **one** consumer within a group.
- **Replication Factor:** $N$ copies across brokers (typical in banking: 3 replicas with `min.insync.replicas = 2` and `acks = all` for zero message loss).
