# ⚡ pandas Last-Minute Revision: High-Yield Cram Sheets

Designed for quick review before technical interviews at IDFC FIRST Bank.

---

## ⏱️ 5-Minute Emergency Review

- **Selection Core:**
  - `df.loc[rows, cols]` ⟹ **Label-based** (both start and stop labels are **INCLUSIVE**).
  - `df.iloc[rows, cols]` ⟹ **0-indexed integer position** (start is inclusive, stop is **EXCLUSIVE**).
- **Axis Invariant:**
  - `axis=0` / `'index'` ⟹ Moves **downwards across rows** (collapses rows into 1 value per column).
  - `axis=1` / `'columns'` ⟹ Moves **horizontally across columns** (collapses columns into 1 value per row).
- **Multiple Boolean Filter:**
  - `df[(df['amount'] > 1000) & (df['status'] == 'SUCCESS')]` (Brackets `(...)` are mandatory!).
- **Prevent `SettingWithCopyWarning`:**
  - Never use chained indexing: `df[df['a'] > 0]['b'] = 10` ❌
  - Always use `.loc`: `df.loc[df['a'] > 0, 'b'] = 10` ✅
- **Groupby Split-Apply-Combine:**
  - `df.groupby('branch')['amount'].agg(['count', 'sum', 'mean'])`.

---

## ⏱️ 15-Minute Review

- **Data Ingestion Subsetting:**
  - `pd.read_csv('ledger.csv', usecols=['id', 'amount'], nrows=10000)` saves memory upfront.
- **Vectorized String Accessor (`.str`):**
  - `df['vpa'].str.split('@').str[1]` extracts PSP handle without Python loops.
  - `df['narration'].str.contains('SALARY', case=False)`.
- **Date Handling (`.dt`):**
  - `df['ts'] = pd.to_datetime(df['ts'])`
  - `df['ts'].dt.hour`, `df['ts'].dt.day_name()`, `df['ts'].dt.dayofweek`.
- **Type Coercion:**
  - `pd.to_numeric(df['dirty_col'], errors='coerce')` turns unparseable values into `NaN`.
- **Deduplication:**
  - `df.duplicated(keep=False)` marks ALL copies as True (crucial for fraud audits).
  - `df.drop_duplicates(subset=['idempotency_key'], keep='first')`.
- **Relational Merge:**
  - `pd.merge(df1, df2, on='acc_id', how='left', indicator=True)` audits join drops via `_merge` column.

---

## ⏱️ 30-Minute Deep Revision

- **Memory Optimization (`category` Dtype):**
  - String columns store 8-byte pointers to individual Python heap objects.
  - `df['channel'] = df['channel'].astype('category')` replaces strings with 1-byte integer codes and a category dictionary, reducing memory usage by up to 85%.
  - Check true memory usage with: `df.info(memory_usage='deep')`.
- **Index Alignment in Arithmetic:**
  - When computing `s1 + s2`, pandas aligns on **index labels**, NOT on integer position!
  - If a label exists in `s1` but not `s2`, the result is `NaN`.
- **Function Application Matrix:**
  - `Series.map()`: Element-wise using a dictionary or single-argument mapper.
  - `Series.apply()`: Element-wise using complex lambda or custom function.
  - `DataFrame.apply(axis=0|1)`: Runs function across each column or row.
  - `DataFrame.map()` (formerly `applymap`): Runs function element-wise on every cell in a 2D table.
- **MultiIndex Operations:**
  - `unstack()`: Pivots innermost index level into column headers.
  - `stack()`: Collapses column headers into innermost index level.
  - `df.xs('MUMBAI', level='city')`: Selects cross-section from MultiIndex.

---

## ⏱️ 1-Hour Comprehensive Interview Drill

### 10 Rapid-Fire Code Output Puzzles

1. **Puzzle 1: `loc` slicing with integer index**
   ```python
   s = pd.Series([10, 20, 30, 40], index=[3, 2, 1, 0])
   print(s.loc[2:0])
   # Answer: Returns 20, 30, 40 (label-based slice starting from label 2 to label 0 inclusive!)
   ```

2. **Puzzle 2: Bitwise filtering without brackets**
   ```python
   # What error does df[df.amount > 1000 & df.status == 'A'] throw?
   # Answer: TypeError / ValueError because & has higher operator precedence than > and ==.
   ```

3. **Puzzle 3: Series addition with mismatched indexes**
   ```python
   a = pd.Series([1, 2], index=['x', 'y'])
   b = pd.Series([3, 4], index=['y', 'z'])
   print((a + b)['x'])
   # Answer: NaN (Index 'x' does not exist in Series b).
   ```

4. **Puzzle 4: Drop axis default**
   ```python
   # What does df.drop('col_name') do?
   # Answer: Throws KeyError because axis defaults to 0 (rows), not columns!
   ```

5. **Puzzle 5: Creating columns with dot notation**
   ```python
   df.new_col = [1, 2, 3]
   # Did this add a column to df?
   # Answer: NO. It sets a monkey-patched Python attribute on the DataFrame object.
   ```\n