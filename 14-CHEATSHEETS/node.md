# Node.js & Backend Architecture Last-Minute Cheatsheet

---

## ⚡ libuv Event Loop Phase Order
```text
Synchronous Call Stack (V8)
       ↓
[ Microtask Drain: process.nextTick → Promise Microtasks ]
       ↓
1. Timers Phase        (setTimeout, setInterval callbacks)
[ Microtask Drain ]
       ↓
2. Pending I/O Phase   (System/TCP error callbacks)
[ Microtask Drain ]
       ↓
3. Idle / Prepare      (libuv internal use)
[ Microtask Drain ]
       ↓
4. Poll Phase          (Retrieve I/O events via epoll/kqueue; executes I/O callbacks)
[ Microtask Drain ]
       ↓
5. Check Phase         (setImmediate callbacks)
[ Microtask Drain ]
       ↓
6. Close Callbacks     (socket.on('close'))
[ Microtask Drain ]
```

---

## 🚀 Key Differences & Interview Gotchas
1. **`process.nextTick()` vs `setImmediate()`:**
   - `process.nextTick()` is **not** part of libuv; executes immediately after current synchronous code. Infinite recursion freezes the server!
   - `setImmediate()` runs during the libuv **Check phase**.
   - Inside an I/O callback, `setImmediate` **always runs before** `setTimeout(0)`.
2. **What uses the libuv Worker Thread Pool (`UV_THREADPOOL_SIZE = 4`)?**
   - **Uses Thread Pool:** `fs` (file system), `crypto` (`pbkdf2`, `scrypt`), `zlib` (compression), `dns.lookup`.
   - **Does NOT use Thread Pool:** Network sockets (`http`, `https`, `tls`, `net`), `dns.resolve` (handled non-blocking via OS `epoll`/`kqueue`).
3. **Streams & Backpressure:**
   ```javascript
   // Anti-Pattern (Leaks RAM when client network is slow):
   fs.readFile('huge.csv', (err, data) => res.send(data));

   // Production Pattern with Backpressure (Stream pipeline):
   const { pipeline } = require('stream/promises');
   await pipeline(fs.createReadStream('huge.csv'), res);
   ```

---

## 🔍 Memory Leak Detection in Node.js
- **Tool:** Chrome DevTools (`node --inspect`) or `v8.writeHeapSnapshot()`.
- **Top 3 Culprits:**
  1. Unbounded global caching objects without TTL/eviction.
  2. Unremoved event listeners (`emitter.on` inside request handlers).
  3. Stale closures retaining large outer function scope objects.
- **Metric to watch:** `process.memoryUsage().heapUsed` vs `heapTotal`.

---

## ⚖️ Clustering vs Worker Threads

| Dimension | Cluster Module (`cluster`) | Worker Threads (`worker_threads`) |
| :--- | :--- | :--- |
| **Model** | Multi-Process (Forking) | Multi-Thread within single process |
| **Memory** | Isolated memory space per core | Shared memory via `SharedArrayBuffer` |
| **Port Sharing** | Shares same server port via master proxy | Run within existing master process |
| **Best Used For** | Scaling web servers across CPU cores | Heavy CPU tasks (image resize, crypto) |
