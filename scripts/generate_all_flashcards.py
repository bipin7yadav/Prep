import json

# Import the base 60 from scripts/generate_flashcards.py
import sys
sys.path.append('scripts')
from generate_flashcards import FLASHCARDS as BASE_CARDS

ADDITIONAL_CARDS = [
    # -------------------------------------------------------------
    # 4. PYTHON FUNDAMENTALS & INTERNALS (16 CARDS)
    # -------------------------------------------------------------
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
        "answerHinglish": "List saare millions elements ko memory mein ek saath allocate karti hai ($O(N)$ RAM). Generator lazy evaluation use karta hai—ek time par sirf 1 element memory mein calculate hota hai ($O(1)$ RAM). 10GB transaction log stream karne ke liye generators essential hain.",
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
        "answerHinglish": "`__str__`: End-user readable representation (e.g. `Account 101 (Bal: ₹50,000)`). `__repr__`: Developer unambiguous representation (ideal format: code that could recreate the object, e.g. `Account(acc_id=101, balance=50000.0)`). Agar `__str__` defined nahi hai toh Python fallback karke `__repr__` call karta hai.",
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

    # -------------------------------------------------------------
    # 5. NUMPY DATA ECOSYSTEM (16 CARDS)
    # -------------------------------------------------------------
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

    # -------------------------------------------------------------
    # 6. PANDAS DATA MANIPULATION (20 CARDS)
    # -------------------------------------------------------------
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
    }
]

ALL_CARDS = BASE_CARDS + ADDITIONAL_CARDS
print(f"Total Combined Master Flashcards: {len(ALL_CARDS)}")

with open("/home/bipin/Desktop/BankInterview/frontend/src/data/flashcardsData.js", "w") as f:
    f.write("/* Master Curated Multi-Dimensional Flashcards for IDFC FIRST Bank (200+ Cards) */\n\n")
    f.write(f"export const FLASHCARDS_COUNT = {len(ALL_CARDS)};\n\n")
    f.write("export const FLASHCARDS_DATA = " + json.dumps(ALL_CARDS, indent=2) + ";\n")

print("✓ Successfully written to frontend/src/data/flashcardsData.js")
