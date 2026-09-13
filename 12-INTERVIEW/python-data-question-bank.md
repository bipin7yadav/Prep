# Python, NumPy, pandas & Matplotlib Master Question Bank (135+ Questions)
### Tailored for Developer (3+ Years Experience) | IDFC FIRST Bank Strategic Projects

---

# 🐍 Part 1: Python Core & Advanced (50 Questions)

1. **Python mein variables memory kaise allocate karte hain?**  
   *Answer:* Python mein variables stack/namespace mein name tags hote hain jo heap-allocated `PyObject` structs ko point karte hain.
2. **Difference between `is` and `==`?**  
   *Answer:* `is` memory address/identity compare karta hai (`id(a) == id(b)`). `==` value equality compare karta hai (`a.__eq__(b)`).
3. **Mutable vs Immutable types list out karo.**  
   *Answer:* Immutable: `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`. Mutable: `list`, `dict`, `set`, `bytearray`.
4. **Shallow copy aur Deep copy mein kya farq hai?**  
   *Answer:* Shallow copy outer container naya banata hai par nested references share karta hai. Deep copy recursively sabhi nested objects ko clone karta hai.
5. **Default mutable argument trap kya hota hai? (`def f(a=[])`)**  
   *Answer:* Default list function definition time par sirf ek baar banti hai. Subsequent calls me state accumulate hota rehta hai. Always use `a=None`.
6. **Python ka Garbage Collection kaise ka
am karta hai?**  
   *Answer:* Reference counting (primary) + 3-generation cyclic garbage collector (detects reference cycles).
7. **What is a reference cycle in Python?**  
   *Answer:* Jab do objects ek doosre ko refer karein (`a.b = b`, `b.a = a`), unka reference count kabhi zero nahi hota, cyclic GC required hota hai.
8. **Generators aur normal functions mein kya difference hai?**  
   *Answer:* Normal function `return` par stack frame destroy karta hai; generator `yield` par state pause karta hai aur O(1) memory mein stream produce karta hai.
9. **`range()` vs `list(range())` memory difference?**  
   *Answer:* `range()` generator jaisa lightweight object hai jo start/stop/step store karta hai (O(1) RAM); `list()` pura array memory mein allocate karta hai (O(N) RAM).
10. **Decorators kya hote hain aur `@functools.wraps` kyu lagate hain?**  
    *Answer:* Decorator higher-order function hai jo doosre function ki behavior extend karta hai. `@wraps` original function ka name aur docstring preserve karta hai.
11. **Context Manager (`with` statement) ka internal working kya hai?**  
    *Answer:* `__enter__()` resource acquire karta hai, `__exit__()` cleanup guarantee karta hai chahe exception throw ho.
12. **What is `*args` and `**kwargs`?**  
    *Answer:* `*args` arbitrary positional arguments ko tuple mein capture karta hai; `**kwargs` keyword arguments ko dict mein capture karta hai.
13. **List comprehension vs Generator expression syntax aur memory difference?**  
    *Answer:* `[x for x in data]` list banata hai (immediate, eager); `(x for x in data)` generator banata hai (lazy, memory efficient).
14. **What is a Lambda function and when should you avoid it?**  
    *Answer:* Anonymous one-line function (`lambda x: x*2`). Avoid when logic is multi-line or complex (hurts readability and debugging stack traces).
15. **What is the Global Interpreter Lock (GIL)?**  
    *Answer:* CPython ka mutex jo ek time par sirf ek native thread ko Python bytecode execute karne deta hai to protect memory reference counts.
16. **How do you achieve true CPU parallelism in Python despite the GIL?**  
    *Answer:* Use `multiprocessing` module (spawns separate OS processes with independent memory and GILs) or offload to C-extensions like NumPy.
17. **What is Duck Typing?**  
    *Answer:* *"If it walks like a duck and quacks like a duck, it's a duck."* Object ke type ke bajaye uske methods/attributes par focus karna.
18. **Difference between `__str__` and `__repr__`?**  
    *Answer:* `__str__` human-readable display string hoti hai; `__repr__` unambiguous developer/debugging string hoti hai jo ideal case mein `eval(repr(obj)) == obj` banaye.
19. **What are magic / dunder methods? Name 4 important ones.**  
    *Answer:* Double underscore methods: `__init__`, `__eq__`, `__lt__`, `__len__`, `__getitem__`.
20. **How does Python handle Multiple Inheritance? What is MRO?**  
    *Answer:* Method Resolution Order (MRO) C3 Linearization algorithm use karke determine karta hai ki kis order mein parent classes search hongi.
21. **What is `super()` and why is it preferred over explicit parent calls?**
22. **What are dataclasses in Python 3.7+?**  
    *Answer:* `@dataclass` decorator classes ko auto-generate karta hai with `__init__`, `__repr__`, aur `__eq__`.
23. **What is the difference between `@staticmethod` and `@classmethod`?**  
    *Answer:* `@classmethod` first argument mein class `cls` leta hai (factory methods ke liye best); `@staticmethod` na `self` leta hai na `cls` (pure utility function).
24. **How do you make an immutable class/object in Python?**  
    *Answer:* Use `@dataclass(frozen=True)` or `typing.NamedTuple`.
25. **What is the `__slots__` attribute in a class?**  
    *Answer:* Class ke instance dictionary (`__dict__`) ko prevent karta hai, fixed memory slots allocate karke RAM usage ~40% kam karta hai.
26. **What is `itertools`? Name two high-yield functions.**  
    *Answer:* Memory-efficient iteration library: `itertools.chain()` (combining iterables), `itertools.islice()`.
27. **What does `functools.lru_cache` do?**  
    *Answer:* Memoizes function return values using a Least Recently Used in-memory cache.
28. **How does Python manage string interning?**  
    *Answer:* Common short strings aur identifiers ko singleton memory addresses par reuse karta hai.
29. **What is the difference between `list.sort()` and `sorted()`?**  
    *Answer:* `list.sort()` in-place mutate karta hai (returns `None`, O(1) space); `sorted()` naya sorted list return karta hai (O(N) space).
30. **How do you define type hints in Python? Does Python enforce them at runtime?**  
    *Answer:* `def f(x: int) -> str:`. No, Python type hints are ignored at runtime; enforced via static linters like `mypy`.
31. **What is the difference between `try...except...else...finally`?**
32. **Can `finally` block override a `return` statement in `try`?**  
    *Answer:* Yes! If `finally` returns a value, it overwrites the return value of `try`.
33. **What is monkey patching in Python?**  
    *Answer:* Runtime par kisi class ya module ke attributes/methods ko dynamically overwrite karna.
34. **What is an Abstract Base Class (`abc.ABC`)?**
35. **Difference between `collections.defaultdict` and `dict.setdefault()`?**
36. **How does `collections.Counter` handle non-existent keys?**  
    *Answer:* Returns `0` instead of raising `KeyError`.
37. **What is a WeakReference (`weakref`)?**  
    *Answer:* Object ko refer karta hai bina uska reference count badhaye, circular reference memory leaks avoid karne ke liye.
38. **How do you profile memory and execution time in Python?**  
    *Answer:* `cProfile` execution time ke liye, `tracemalloc` / `memory_profiler` RAM allocations ke liye.
39. **What is `__name__ == '__main__'`?**
40. **How does slicing create new lists? Does it copy elements?**  
    *Answer:* Slicing creates a new list container, but copies the references (shallow copy).
41. **What is `sys.getsizeof()`? Does it count nested objects?**  
    *Answer:* Returns memory of outer object header only; does not recursively measure nested heap objects.
42. **How does Python's `bisect` algorithm work?**
43. **Difference between `append()` and `extend()` in lists?**
44. **What happens when you use `+` on two lists vs `extend()`?**  
    *Answer:* `+` instantiates a brand new third list; `extend()` modifies the first list in-place.
45. **How do you swap two variables in Python without temporary variable?** (`a, b = b, a`).
46. **What is variable unpacking and the starred expression (`first, *rest = [1, 2, 3]`)?**
47. **How does Python optimize small integers between -5 and 256?**  
    *Answer:* CPython pre-allocates an integer array cache for `[-5, 256]`; identical integer literals share the exact same memory address.
48. **Difference between `math.floor()` and integer division `//` with negative numbers?**  
    *Answer:* Both perform floor division toward negative infinity: `-5 // 2 == -3`.
49. **What is a Property decorator (`@property`)?**  
    *Answer:* Method ko attribute access syntax (`acc.balance`) ke through call karne deta hai, getter/setter abstraction ke liye.
50. **How do you create a custom exception class in Python?**  
    *Answer:* Inherit from `Exception`: `class InsufficientFundsError(Exception): pass`.

---

# 🔢 Part 2: NumPy Interview Questions (25 Questions)

1. **NumPy array aur Python list mein fundamental difference kya hai?**
2. **What is an `ndarray` and what are its 4 primary metadata attributes?** (`shape`, `dtype`, `size`, `strides`).
3. **What is the difference between `axis=0` and `axis=1` in a 2D array?**
4. **Explain the two mathematical rules of NumPy Broadcasting.**
5. **Why are vectorized operations faster than Python loops?** (SIMD, contiguous memory, zero type check overhead).
6. **Difference between a Slice View and a Copy in NumPy?**
7. **What is the difference between `flatten()` and `ravel()`?**
8. **What does `arr.reshape(3, -1)` do?**
9. **How does boolean indexing work under the hood?**
10. **Difference between `np.zeros()` and `np.empty()`?**
11. **Difference between `np.arange()` and `np.linspace()`?**
12. **What is the difference between `np.dot()` and `*` operator on 2D arrays?**
13. **How does NumPy handle missing numbers? Why is `np.nan == np.nan` False?**
14. **What is `np.where(condition, x, y)`?**
15. **How do you normalize an array between 0 and 1 using NumPy?**
16. **What is Fancy Indexing in NumPy?**
17. **How do you calculate standard deviation and variance in NumPy?** (`np.std()`, `np.var()`).
18. **Difference between `np.sum(axis=0)` vs `np.sum(axis=1)`?**
19. **What is `np.clip(arr, min_val, max_val)`?**
20. **How do you find indices of elements matching a condition?** (`np.where(arr > 10)`).
21. **Difference between `np.concatenate`, `np.vstack`, and `np.hstack`?**
22. **What is memory alignment and C-contiguous vs Fortran-contiguous order?**
23. **How do you convert an array's data type safely?** (`arr.astype(np.float32)`).
24. **How do you find the unique elements and their frequencies in NumPy?** (`np.unique(arr, return_counts=True)`).
25. **Why should you never use `np.append()` inside a loop?** (Re-allocates and copies the entire array every iteration).

---

# 🐼 Part 3: pandas Interview Questions (40 Questions)

1. **What is the difference between a pandas Series and a DataFrame?**
2. **`loc` vs `iloc` difference with examples?**
3. **Explain Split-Apply-Combine in `df.groupby()`.**
4. **How do you perform a SQL `LEFT JOIN` in pandas?**
5. **Difference between `dropna()` and `fillna()`?**
6. **What is the difference between `df.isnull()` and `df.isna()`?**
7. **How do you filter a DataFrame by multiple conditions? Why do you need `&` instead of `and`?**
8. **What does `reset_index()` do and when is it necessary?**
9. **Difference between `sort_values()` and `sort_index()`?**
10. **How do you remove duplicate rows in a DataFrame?** (`drop_duplicates()`).
11. **What is the difference between `merge()` and `concat()`?**
12. **Why is `apply()` slower than vectorized operations?**
13. **How do you optimize memory usage using categorical dtypes?**
14. **How do you read a massive 20GB CSV file in pandas with limited RAM?** (`chunksize`).
15. **How do you convert a string column to datetime?** (`pd.to_datetime()`).
16. **What is `dt` accessor in pandas?**
17. **How do you calculate a rolling 7-day transaction average?** (`df['amount'].rolling(7).mean()`).
18. **What is `pivot_table()` and how is it different from `groupby()`?**
19. **What is `melt()` in pandas?**
20. **What does `df.describe()` display?**
21. **How do you find the percentage of missing values per column?**
22. **Difference between `Series.map()` and `Series.apply()`?**
23. **How do you select rows where a string column contains a substring?** (`.str.contains()`).
24. **Why is `inplace=True` discouraged in modern pandas?**
25. **How do you rename specific columns in a DataFrame?**
26. **What is `value_counts()` and what does `normalize=True` do?**
27. **What is `transform()` in groupby and how is it different from `agg()`?**
28. **How do you calculate cumulative running sum of transactions?** (`cumsum()`).
29. **How do you find the top 3 transactions per customer in pandas?** (`groupby('cust_id')['amount'].nlargest(3)`).
30. **What is `crosstab()` in pandas?**
31. **Difference between shallow and deep copy in DataFrame?** (`df.copy(deep=True)`).
32. **How do you set a custom index in a DataFrame?** (`set_index()`).
33. **What does `df.select_dtypes(include=[np.number])` do?**
34. **How do you merge two DataFrames where join column names differ?** (`left_on`, `right_on`).
35. **What is Forward Fill (`ffill`) and Backward Fill (`bfill`)?**
36. **How do you randomly sample rows from a DataFrame?** (`df.sample()`).
37. **How do you compute correlation between numeric columns?** (`df.corr()`).
38. **How do you export a DataFrame to a SQL database?** (`to_sql()`).
39. **What is `pd.Categorical` and how does it optimize sorting?**
40. **How do you handle timezone conversion in datetime columns?** (`dt.tz_convert()`).

---

# 📊 Part 4: Matplotlib Interview Questions (20 Questions)

1. **Figure aur Axes mein kya difference hai?**
2. **Why is the Object-Oriented API (`fig, ax = plt.subplots()`) preferred over `plt.plot()`?**
3. **What is the purpose of `plt.tight_layout()`?**
4. **How do you save a chart as an image without displaying a GUI window?**
5. **How do you configure Matplotlib to run on a headless Linux server?** (`matplotlib.use('Agg')`).
6. **When should you choose a Histogram over a Bar Chart?**
7. **What is a Scatter Plot used for?**
8. **How do you add annotations with callout arrows to a plot?** (`ax.annotate()`).
9. **How do you create twin axes (two Y-axes sharing the same X-axis)?** (`ax.twinx()`).
10. **What parameter controls marker transparency to prevent overplotting?** (`alpha`).
11. **How do you customize date formatting on the X-axis?** (`mdates.DateFormatter`).
12. **How do you rotate tick labels so they don't overlap?** (`ax.tick_params(rotation=45)`).
13. **How do you create a horizontal bar chart?** (`ax.barh()`).
14. **How do you change the global theme / style sheet in Matplotlib?** (`plt.style.use()`).
15. **What is a Box Plot (`ax.boxplot()`) and what 5 metrics does it show?**
16. **How do you add a horizontal threshold line across a plot?** (`ax.axhline()`).
17. **How do you control the resolution of saved images?** (`dpi` parameter).
18. **How do you prevent memory leaks when generating hundreds of plots in a loop?** (`plt.close(fig)`).
19. **How do you create a pie chart with percentage labels?** (`autopct='%1.1f%%'`).
20. **How does pandas integrate natively with Matplotlib?** (`df.plot(ax=ax)`).
