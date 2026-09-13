# ⚡ Last-Minute Python Data Ecosystem Cheatsheet

---

## 🐍 Python in 5 Minutes

### 1. Types & Mutability
* **Immutable (Cannot change in-place):** `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`.
* **Mutable (In-place changes):** `list`, `dict`, `set`, `bytearray`.
* **List vs Tuple:** List mutable hai (`[1, 2]`); Tuple immutable hai (`(1, 2)` - faster, hashable, can be dict keys).
* **Dict vs Set:** Dict key-value map hai; Set unique keys only hai (both $O(1)$ avg lookups).

### 2. Copying & References
* `b = a` $\implies$ Same pointer (mutating `b` mutates `a`).
* `shallow = a.copy()` $\implies$ New outer container, shared nested objects.
* `deep = copy.deepcopy(a)` $\implies$ Completely independent recursive clone.

### 3. Comprehensions & Packing
* `[x*2 for x in arr if x > 0]` (List) | `{k: v for k, v in pairs}` (Dict)
* `def f(*args, **kwargs)`: `*args` captures tuple, `**kwargs` captures dictionary.

### 4. Generators, Decorators & Context Managers
* **Generator (`yield`):** Lazy evaluation, produces 1 item at a time in $O(1)$ memory.
* **Decorator (`@func`):** Wraps another function to add logging/auth without altering code.
* **Context Manager (`with`):** Guarantees `__exit__()` cleanup on DB connections/files.

---

## 🔢 NumPy in 3 Minutes

### 1. ndarray Anatomy
* **Contiguous memory:** C-style contiguous buffer of homogeneous bytes (unlike scattered Python lists).
* **`shape`:** Dimension tuple (e.g., `(2, 3)` = 2 rows, 3 cols).
* **`axis=0`:** Down rows (column-wise). **`axis=1`:** Across cols (row-wise).
* **`dtype`:** Data type (`int64`, `float32`).

### 2. Slicing & Reshape
* **Slices are Views:** Modifying `arr[1:3]` modifies the original array! Use `.copy()` if you need independence.
* **`reshape(3, -1)`:** `-1` auto-calculates remaining dimension.
* **`flatten()`:** Always returns a copy. **`ravel()`:** Returns a view when possible.

### 3. Broadcasting & Vectorization
* **Broadcasting Rules:** Dimensions match or one of them is 1 (stretches along size 1).
* **Vectorization:** Replaces slow Python loops with hardware SIMD C-level CPU instructions (40x–80x faster).

---

## 🐼 pandas in 5 Minutes

### 1. Core Structures
* **Series:** 1D labeled array. **DataFrame:** 2D labeled table of Series.

### 2. Selection: `loc` vs `iloc`
* **`df.loc['row', 'col']`:** **Label-based** (inclusive of end boundary).
* **`df.iloc[0:5, 0:2]`:** **Integer-position based** (0-indexed, exclusive of end boundary).

### 3. Filtering & Cleaning
* Multiple filters: `df[(df['amt'] > 1000) & (df['status'] == 'SUCCESS')]` (use `&` and `|` with parentheses).
* Missing Data: `df.isna().sum()` | `df.dropna()` | `df['amt'].fillna(df['amt'].median())`.
* Duplicates: `df.drop_duplicates(subset=['txn_id'])`.

### 4. GroupBy & Merging
* **Split-Apply-Combine:**
  ```python
  df.groupby('category')['amt'].agg(['sum', 'mean', 'count']).reset_index()
  ```
* **SQL Merges:**
  ```python
  pd.merge(df1, df2, on='cust_id', how='left') # SQL: LEFT JOIN
  pd.concat([df1, df2], axis=0)                # SQL: UNION ALL
  ```
* **Avoid `iterrows()`:** Vectorize with `np.select` or list comprehensions instead of loops.

---

## 📊 Matplotlib in 2 Minutes

### 1. Anatomy: Figure vs Axes
* **Figure:** The overall canvas/window.
* **Axes:** The actual individual plot/graph (x-axis, y-axis, data points, title).

### 2. Object-Oriented Interface (Recommended)
```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4))
ax.plot(x, y, color="#9b1c1c", label="Trend")
ax.set_title("IDFC Transaction Volume")
ax.set_xlabel("Date")
ax.set_ylabel("Volume (₹)")
ax.grid(True, linestyle="--")
ax.legend()
plt.tight_layout()
fig.savefig("chart.png", dpi=300)
plt.close(fig)
```

### 3. Chart Types
* **Line (`ax.plot`):** Time-series trends.
* **Bar (`ax.bar`):** Categorical comparisons.
* **Histogram (`ax.hist`):** Numerical distribution.
* **Scatter (`ax.scatter`):** Relationship / correlations between two variables.
