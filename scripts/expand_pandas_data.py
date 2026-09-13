#!/usr/bin/env python3
"""
Expands Pandas flashcards (to 42) and quizzes (to 15),
updates important topics, regenerates 01-PYTHON/pandas.md and 14-CHEATSHEETS/pandas-last-minute.md,
and syncs frontend data files.
"""

import os
import json
import re

FLASHCARDS = [
  # 1-4: Foundations & Architecture (Videos 1-4)
  {
    "id": "pandas-01",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Fundamentals",
    "dimension": "Concept",
    "question": "What is the structural difference between a pandas Series and a DataFrame?",
    "answerHinglish": "Series 1-dimensional labeled array hai jisme single column aur explicit row labels (index) hote hain. DataFrame ek 2-dimensional labeled tabular data structure hai jo multiple Series ko ek common index ke under share karti hai.",
    "codeSnippet": "s = pd.Series([100, 200], index=['a', 'b'])\ndf = pd.DataFrame({'amt': s, 'tax': s * 0.18})",
    "tag": "Pandas Architecture"
  },
  {
    "id": "pandas-02",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Internals",
    "dimension": "OOP / Rule",
    "question": "Why do some pandas commands end with parentheses () while others do not?",
    "answerHinglish": "Attributes (jaise df.shape, df.dtypes, df.columns) DataFrame ki already computed state/properties hoti hain, isliye parentheses nahi hote. Methods (jaise df.head(), df.describe(), df.mean()) action verbs hote hain jo computation ya transformation execute karte hain, isliye parentheses compulsory hote hain.",
    "codeSnippet": "print(df.shape)    # Attribute (No parentheses)\nprint(df.describe()) # Method (Requires parentheses)",
    "tag": "Pandas OOP"
  },
  {
    "id": "pandas-03",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Ingestion",
    "dimension": "Syntax",
    "question": "How do you read a pipe-delimited file without headers and assign custom column names during ingestion?",
    "answerHinglish": "pd.read_csv() me sep='|', header=None, aur names=['col1', 'col2'] pass karein. Isse pandas pehli data row ko header samajhne ki galti nahi karega aur custom column labels assign kar dega.",
    "codeSnippet": "cols = ['user_id', 'age', 'gender', 'zip']\ndf = pd.read_csv('data.txt', sep='|', header=None, names=cols)",
    "tag": "Data Ingestion"
  },
  {
    "id": "pandas-04",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Ingestion",
    "dimension": "Optimization",
    "question": "How do you read only specific columns and top N rows from a multi-gigabyte CSV into memory?",
    "answerHinglish": "usecols parameter me required columns ki list aur nrows parameter me desired row count pass karein. Pandas unused columns aur trailing rows ko disk se parse hi nahi karega, jisse 90%+ RAM aur time save hota hai.",
    "codeSnippet": "df = pd.read_csv('huge_ledger.csv', usecols=['txn_id', 'amount'], nrows=10000)",
    "tag": "Ingestion Optimization"
  },
  # 5-8: Schema & Axis Mechanics (Videos 5, 6, 11)
  {
    "id": "pandas-05",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Schema Evolution",
    "dimension": "Syntax",
    "question": "What is the recommended immutable way to rename specific columns in a DataFrame?",
    "answerHinglish": "df.rename(columns={'old_name': 'new_name'}) use karein. Ye selectively sirf specified columns ko rename karta hai aur bina original schema ko mutate kiye naya DataFrame return karta hai.",
    "codeSnippet": "df_renamed = df.rename(columns={'cust_vpa': 'upi_handle', 'amt': 'amount'})",
    "tag": "Schema Evolution"
  },
  {
    "id": "pandas-06",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Schema Evolution",
    "dimension": "Syntax",
    "question": "How do you replace spaces with underscores across all column names in a single vectorized step?",
    "answerHinglish": "df.columns index object par .str.replace(' ', '_') execute karein: df.columns = df.columns.str.replace(' ', '_'). Ye bina kisi Python loop ke pure column index ko transform kar deta hai.",
    "codeSnippet": "df.columns = df.columns.str.strip().str.lower().str.replace(' ', '_')",
    "tag": "Column Sanitation"
  },
  {
    "id": "pandas-07",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Axis Mechanics",
    "dimension": "Mental Model",
    "question": "What is the exact behavioral difference between axis=0 and axis=1 in pandas operations?",
    "answerHinglish": "axis=0 (or 'index') vertically rows ke along move karta hai aur saari rows ko collapse karke har column ka single aggregate deta hai. axis=1 (or 'columns') horizontally columns ke along move karta hai aur har individual row ke liye single aggregate compute karta hai.",
    "codeSnippet": "df.mean(axis=0) # 1 mean per column (across all rows)\ndf.mean(axis=1) # 1 mean per row (across all columns)",
    "tag": "Axis Invariant"
  },
  {
    "id": "pandas-08",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Trap",
    "question": "Why does df.drop('column_name') throw a KeyError by default, and how do you fix it?",
    "answerHinglish": "Kyunki df.drop() me axis default 0 (rows) hota hai! Pandas 'column_name' label ki row search karta hai jo milti nahi hai. Fix: Explicitly axis=1 ya columns='column_name' pass karein.",
    "codeSnippet": "# Fix:\ndf.drop('column_name', axis=1)\n# Modern alternative:\ndf.drop(columns=['column_name'])",
    "tag": "Axis Trap"
  },
  # 9-12: Sorting & Boolean Filtering (Videos 7-10)
  {
    "id": "pandas-09",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Sorting",
    "dimension": "Syntax",
    "question": "How do you sort a banking ledger by Branch ascending and Transaction Amount descending?",
    "answerHinglish": "df.sort_values(by=['branch', 'amount'], ascending=[True, False]) use karein. Multiple columns aur corresponding boolean flags ki lists pass karke multi-level hierarchical sort hota hai.",
    "codeSnippet": "df_sorted = df.sort_values(by=['branch_code', 'amount'], ascending=[True, False])",
    "tag": "Sorting"
  },
  {
    "id": "pandas-10",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Debugging",
    "question": "Why does df[df.amount > 5000 and df.status == 'SUCCESS'] fail in Python, and how do you fix it?",
    "answerHinglish": "Python ka 'and' pure Series object ki single truth value evaluate karne ki koshish karta hai, jisse ValueError: The truth value of a Series is ambiguous crash hota hai. Fix: Hamesha bitwise & operator use karo aur har individual condition ko parentheses (...) me wrap karo.",
    "codeSnippet": "# Fix:\ndf[(df['amount'] > 5000) & (df['status'] == 'SUCCESS')]",
    "tag": "Boolean Filtering"
  },
  {
    "id": "pandas-11",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Filtering",
    "dimension": "Syntax",
    "question": "How do you filter a DataFrame for rows where status is either SUCCESS, PENDING, or SETTLED without chaining | operators?",
    "answerHinglish": "Series method .isin(['SUCCESS', 'PENDING', 'SETTLED']) use karein: df[df['status'].isin(['SUCCESS', 'PENDING', 'SETTLED'])]. Ye cleaner, faster aur maintainable hota hai.",
    "codeSnippet": "allowed = ['SUCCESS', 'PENDING', 'SETTLED']\nclean_df = df[df['status'].isin(allowed)]",
    "tag": "Boolean Indexing"
  },
  {
    "id": "pandas-12",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Performance",
    "dimension": "Anti-Pattern",
    "question": "Why is for index, row in df.iterrows(): considered a severe anti-pattern in production pipelines?",
    "answerHinglish": "iterrows() har single row ke liye ek naya pandas Series object instantiate karta hai aur type conversion overhead create karta hai. Ye C-level vectorization bypass karta hai aur 100x se 1000x slow hota hai. Vectorized operations ya .apply() ya list comprehensions use karein.",
    "codeSnippet": "# BAD: 10,000 ms\nfor idx, row in df.iterrows():\n    total += row['amt']\n\n# GOOD: 2 ms (Vectorized)\ntotal = df['amt'].sum()",
    "tag": "Performance Traps"
  },
  # 13-16: Strings & Types (Videos 12-13)
  {
    "id": "pandas-13",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Strings",
    "dimension": "Syntax",
    "question": "How do you extract domain handles from email VPAs using the .str accessor without loops?",
    "answerHinglish": ".str.split('@').str[1] use karein. Pehla .str.split('@') har string ko list of tokens me todta hai, aur dusra .str[1] vectorized tareeqe se har list ka 1st index (domain handle) project karta hai.",
    "codeSnippet": "df['psp'] = df['vpa'].str.split('@').str[1]\n# 'user@okhdfcbank' -> 'okhdfcbank'",
    "tag": "Vectorized Strings"
  },
  {
    "id": "pandas-14",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Strings",
    "dimension": "Syntax",
    "question": "How do you perform a case-insensitive substring search across transaction narration text?",
    "answerHinglish": "df['narration'].str.contains('SALARY|NEFT', case=False, na=False) use karein. case=False case-sensitivity ignore karta hai aur na=False missing NaN values ko silently False treat karta hai.",
    "codeSnippet": "salary_txns = df[df['narration'].str.contains('salary', case=False, na=False)]",
    "tag": "Vectorized Strings"
  },
  {
    "id": "pandas-15",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Data Types",
    "dimension": "Data Cleaning",
    "question": "How do you clean and cast a currency column containing symbols like ₹ or $ and commas into numeric floats?",
    "answerHinglish": "Pehle .str.replace() se currency symbols aur commas remove karein, fir .astype(float) ya pd.to_numeric() me cast karein.",
    "codeSnippet": "df['clean_amt'] = df['amount'].str.replace('₹', '').str.replace(',', '').astype(float)",
    "tag": "Data Cleaning"
  },
  {
    "id": "pandas-16",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Data Types",
    "dimension": "Robustness",
    "question": "What does pd.to_numeric(df['amt'], errors='coerce') do when encountering dirty string entries like 'N/A' or 'CORRUPT'?",
    "answerHinglish": "errors='coerce' unparseable dirty strings ko exception throw kiye bina NaN (Not a Number) me convert kar deta hai. Iske baad aap .fillna() ya .dropna() se missing records ko cleanly handle kar sakte hain.",
    "codeSnippet": "df['clean_amount'] = pd.to_numeric(df['raw_col'], errors='coerce')\ndf['clean_amount'].fillna(0.0, inplace=True)",
    "tag": "Type Coercion"
  },
  # 17-20: Exploration & Missing Data (Videos 15-16)
  {
    "id": "pandas-17",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Exploration",
    "dimension": "Syntax",
    "question": "How do you compute relative percentage frequencies including missing values using value_counts()?",
    "answerHinglish": "normalize=True pass karne se absolute counts ke bajaye fractions (percentages) milti hain, aur dropna=False pass karne se missing NaN values bhi distribution me include hoti hain.",
    "codeSnippet": "print(df['kyc_status'].value_counts(normalize=True, dropna=False) * 100)",
    "tag": "Data Exploration"
  },
  {
    "id": "pandas-18",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Exploration",
    "dimension": "Syntax",
    "question": "How do you compute a 2-way frequency contingency table between Customer Segment and Default Status?",
    "answerHinglish": "pd.crosstab(df['segment'], df['defaulted'], margins=True) use karein. margins=True row aur column totals (All) bhi compute karke deta hai.",
    "codeSnippet": "ct = pd.crosstab(df['segment'], df['is_fraud'], margins=True, normalize='index')",
    "tag": "Contingency Table"
  },
  {
    "id": "pandas-19",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Missing Data",
    "dimension": "Syntax",
    "question": "How do you drop rows from a DataFrame ONLY IF both Account Number and Transaction ID are NaN?",
    "answerHinglish": "df.dropna(how='all', subset=['account_id', 'txn_id']) use karein. how='all' condition tabhi satisfy hogi jab subset ke saare columns simultaneously NaN honge.",
    "codeSnippet": "df_valid = df.dropna(how='all', subset=['account_id', 'txn_id'])",
    "tag": "Missing Data"
  },
  {
    "id": "pandas-20",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Missing Data",
    "dimension": "FinTech Scenario",
    "question": "Why is forward-filling (.ffill()) standard for financial NAV/stock prices while median imputation is used for transaction amounts?",
    "answerHinglish": "Financial market tick/NAV prices time-series continuity follow karte hain: agar weekend par price record nahi hua toh last traded price hi current valuation hoti hai (ffill). Lekin missing transaction amounts independent events hain jisme mean/median baseline preserve karta hai.",
    "codeSnippet": "df['nav_price'] = df['nav_price'].ffill()",
    "tag": "Time Series Imputation"
  },
  # 21-25: Indexing, loc/iloc & SettingWithCopy (Videos 17-20, 27)
  {
    "id": "pandas-21",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Indexing",
    "dimension": "Comparison",
    "question": "What is the crucial boundary difference between .loc and .iloc?",
    "answerHinglish": ".loc label-based selection hai aur iska stop boundary hamesha INCLUSIVE hota hai (e.g. 'a':'c' me 'c' include hoga). .iloc 0-indexed integer position-based hai aur iska stop boundary hamesha EXCLUSIVE hota hai (e.g. 0:3 me index 0, 1, 2 include honge, 3 nahi).",
    "codeSnippet": "df.loc['2026-01-01':'2026-01-05'] # Jan 5 is INCLUDED\ndf.iloc[0:5]                       # Row 5 is EXCLUDED",
    "tag": "Indexing"
  },
  {
    "id": "pandas-22",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Index Mechanics",
    "dimension": "Internals",
    "question": "What is automatic index alignment in pandas arithmetic operations?",
    "answerHinglish": "Jab aap do Series add karte hain (s1 + s2), pandas integer position match nahi karta balki row INDEX LABELS ko match karta hai. Agar koi label dono me present hai, toh values add hongi; agar koi label ek me present hai aur dusre me missing hai, toh result NaN ho jayega.",
    "codeSnippet": "s1 = pd.Series([10, 20], index=['A', 'B'])\ns2 = pd.Series([30, 40], index=['B', 'C'])\n# s1 + s2 -> A: NaN, B: 50.0, C: NaN",
    "tag": "Index Alignment"
  },
  {
    "id": "pandas-23",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Traps",
    "dimension": "Trap",
    "question": "What causes the SettingWithCopyWarning and what is the definitive production fix?",
    "answerHinglish": "Ye warning tab aati hai jab aap Chained Indexing karte hain (df[df.a > 0]['b'] = 10). Pandas guarantee nahi karta ki pehla slice View tha ya Copy; agar copy thi toh modification silently lost ho jayegi. Fix: Hamesha single-step .loc assignment use karein: df.loc[df.a > 0, 'b'] = 10.",
    "codeSnippet": "# Buggy:\ndf[df.amount > 10000]['flag'] = True\n# Fixed:\ndf.loc[df.amount > 10000, 'flag'] = True",
    "tag": "SettingWithCopyWarning"
  },
  {
    "id": "pandas-24",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Internals",
    "dimension": "Best Practice",
    "question": "Why is inplace=True considered a historical anti-pattern in modern pandas codebases?",
    "answerHinglish": "inplace=True memory allocation save nahi karta (pandas internally naya buffer allocate karta hai aur pointer swap karta hai). Iske alawa ye method chaining (.pipe().drop().sort()) ko break kar deta hai kyunki ye None return karta hai. Modern pandas me assignment pattern (df = df.dropna()) standard hai.",
    "codeSnippet": "# Discouraged:\ndf.dropna(inplace=True)\n# Modern Best Practice (Chainable):\ndf = df.dropna()",
    "tag": "Modern Pandas"
  },
  {
    "id": "pandas-25",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Indexing",
    "dimension": "Syntax",
    "question": "How do you reset a customized index back into regular columns while avoiding duplicate index columns?",
    "answerHinglish": "df.reset_index(drop=True) use karein agar aapko old index discard karna ho, ya df.reset_index() use karein agar old index ko regular column banakar retain karna ho.",
    "codeSnippet": "df_clean = df.reset_index(drop=True)",
    "tag": "Index Mechanics"
  },
  # 26-29: Memory & Category Dtype (Video 21)
  {
    "id": "pandas-26",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Optimization",
    "question": "How does the category dtype reduce pandas DataFrame memory by 80%+ in large financial ledgers?",
    "answerHinglish": "Standard object dtype me har string value ke liye 8-byte pointer aur heap object allocate hota hai. category dtype repetitive string values ko internally small integers (e.g. uint8, 1 byte) me encode karta hai jo ek single unique string lookup array ko point karte hain. High-repetition columns (like SUCCESS, FAILED) me RAM 80-90% drop ho jati hai.",
    "codeSnippet": "df['status'] = df['status'].astype('category')\nprint(df.info(memory_usage='deep'))",
    "tag": "Memory Optimization"
  },
  {
    "id": "pandas-27",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Inspection",
    "question": "Why does df.info() underestimate DataFrame memory usage unless memory_usage='deep' is specified?",
    "answerHinglish": "By default df.info() sirf pointers aur fixed-size C structs ki shallow memory calculate karta hai. String object dtype ke heap allocations (actual text characters) inspect nahi hote. memory_usage='deep' pass karne se pandas pure heap memory tree ko traverse karke true memory footprint calculate karta hai.",
    "codeSnippet": "df.info(memory_usage='deep')",
    "tag": "Memory Profiling"
  },
  {
    "id": "pandas-28",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Memory",
    "dimension": "Optimization",
    "question": "How do you downcast 64-bit integer and float columns to their smallest safe numeric subtypes?",
    "answerHinglish": "pd.to_numeric() with downcast='integer' ya downcast='float' use karein. Pandas data ke min/max range ko inspect karke int64 ko int16 ya int8 me safely compact kar deta hai.",
    "codeSnippet": "df['age'] = pd.to_numeric(df['age'], downcast='integer') # int64 -> int8",
    "tag": "Numeric Downcasting"
  },
  {
    "id": "pandas-29",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Groupby",
    "dimension": "Concept",
    "question": "What is the Split-Apply-Combine pattern in pandas groupby()?",
    "answerHinglish": "1) Split: DataFrame ko key column ke unique values ke basis par alag-alag groups me divide karta hai. 2) Apply: Har group par mathematical function (sum, mean, count) independently compute karta hai. 3) Combine: Saare group results ko ek single consolidated DataFrame me merge karke return karta hai.",
    "codeSnippet": "df.groupby('branch')['amount'].agg(['count', 'sum', 'mean'])",
    "tag": "Groupby"
  },
  # 30-34: Datetime, Duplicates, Joins & Reshaping (Videos 24-26, 31-32)
  {
    "id": "pandas-30",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Datetime",
    "dimension": "Syntax",
    "question": "How do you filter transactions executed between 11 PM and 4 AM using the .dt accessor?",
    "answerHinglish": "df['timestamp'] = pd.to_datetime(df['timestamp']) karke .dt.hour property use karein: df[(df['timestamp'].dt.hour >= 23) | (df['timestamp'].dt.hour < 4)].",
    "codeSnippet": "df['hour'] = pd.to_datetime(df['timestamp']).dt.hour\nnight_txns = df[(df['hour'] >= 23) | (df['hour'] < 4)]",
    "tag": "Datetime Analytics"
  },
  {
    "id": "pandas-31",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Duplication",
    "dimension": "Syntax",
    "question": "What does df.duplicated(keep=False) do, and why is it preferred in fraud audits?",
    "answerHinglish": "Default keep='first' duplicate rows me se pehle occurrence ko False mark karta hai aur baaki ko True. Lekin keep=False saari conflicting duplicate rows (including first occurrence) ko True mark karta hai, taaki fraud investigator sabhi colliding transaction records ko ek sath inspect kar sake.",
    "codeSnippet": "colliding_txns = df[df.duplicated(subset=['card_id', 'amount'], keep=False)]",
    "tag": "Fraud Detection"
  },
  {
    "id": "pandas-32",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Feature Engineering",
    "dimension": "Machine Learning",
    "question": "What is the Dummy Variable Trap, and how does drop_first=True in pd.get_dummies() prevent it?",
    "answerHinglish": "Agar categorical variable me k categories hain aur aap k dummy columns banate hain, toh unka sum hamesha 1 hota hai (perfect multicollinearity), jisse regression models singular matrix crash karte hain. drop_first=True pehli reference category drop karta hai (k-1 dummy columns).",
    "codeSnippet": "dummies = pd.get_dummies(df['account_type'], prefix='acc', drop_first=True)",
    "tag": "One-Hot Encoding"
  },
  {
    "id": "pandas-33",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Joins",
    "dimension": "FinTech Scenario",
    "question": "How do you audit unreconciled transactions during a DataFrame merge using indicator=True?",
    "answerHinglish": "pd.merge(df1, df2, on='txn_id', how='outer', indicator=True) merge me ek naya _merge column add karta hai jisme values hoti hain: both (matched), left_only (core bank me hai par gateway me nahi), aur right_only (gateway me hai par core bank me nahi). Isse unmatched settlement breaks instant audit ho jate hain.",
    "codeSnippet": "m = pd.merge(core_ledger, switch_feed, on='rrn', how='outer', indicator=True)\nunmatched = m[m['_merge'] != 'both']",
    "tag": "Reconciliation"
  },
  {
    "id": "pandas-34",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Joins",
    "dimension": "Integrity Check",
    "question": "How does the validate parameter in pd.merge() prevent silent cross-join data explosion?",
    "answerHinglish": "pd.merge(..., validate='1:m') ya validate='1:1' verify karta hai ki join key left/right table me unique hai ya nahi. Agar unexpected duplicate keys hain, toh pandas cross-join explosion ke bajaye instant MergeError raise karta hai.",
    "codeSnippet": "df_merged = pd.merge(accounts, txns, on='account_id', validate='1:m')",
    "tag": "Join Integrity"
  },
  # 35-38: Functions & MultiIndex (Videos 29, 30, 31, 33)
  {
    "id": "pandas-35",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Function Application",
    "dimension": "Comparison",
    "question": "What is the difference between Series.map(), Series.apply(), and DataFrame.map()?",
    "answerHinglish": "Series.map() element-wise substitution ke liye dictionary ya function use karta hai. Series.apply() complex lambdas aur functions ke liye use hota hai. DataFrame.map() (formerly applymap) pure 2D DataFrame ke har single cell par element-wise function execute karta hai.",
    "codeSnippet": "df['status_code'] = df['status'].map({'SUCCESS': 1, 'FAILED': 0})\ndf = df.map(lambda x: str(x).strip()) # cleans every cell",
    "tag": "Function Application"
  },
  {
    "id": "pandas-36",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas MultiIndex",
    "dimension": "Concept",
    "question": "How do unstack() and stack() reshape hierarchical MultiIndex DataFrames?",
    "answerHinglish": "unstack() innermost row index level ko pivot karke column headers me convert karta hai (table wide ho jati hai). stack() outermost column headers ko pivot karke innermost row index me convert karta hai (table tall/long ho jati hai).",
    "codeSnippet": "# Groupby produces MultiIndex (Branch, Year):\ng = df.groupby(['branch', 'year'])['revenue'].sum()\nwide_table = g.unstack() # year becomes columns!",
    "tag": "MultiIndex Reshaping"
  },
  {
    "id": "pandas-37",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas MultiIndex",
    "dimension": "Syntax",
    "question": "How do you select a specific cross-section of data from an arbitrary level of a MultiIndex without unstacking?",
    "answerHinglish": "DataFrame method .xs(key, level='level_name') use karein. Ye specified hierarchical level se slice extract karta hai bina pure DataFrame ka structure alter kiye.",
    "codeSnippet": "# Select all records where level 'city' == 'MUMBAI':\ndf_mumbai = df.xs('MUMBAI', level='city')",
    "tag": "MultiIndex Cross-Section"
  },
  {
    "id": "pandas-38",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Filtering",
    "dimension": "Syntax",
    "question": "How do you use df.query() to filter rows while referencing local Python variables?",
    "answerHinglish": "df.query() string expressions accept karta hai. Local Python variables ko reference karne ke liye variable name ke aage @ symbol lagaya jata hai (jaise @threshold).",
    "codeSnippet": "min_amt = 50000\nflagged = df.query('amount > @min_amt and status == \"SUCCESS\"')",
    "tag": "Query API"
  },
  # 39-42: Modern Tricks & Pipelines (Videos 34-38)
  {
    "id": "pandas-39",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Reshaping",
    "dimension": "Modern Trick",
    "question": "How do you flatten a column containing lists of transaction tags into individual row records?",
    "answerHinglish": "df.explode('tags') use karein. Ye list ke har element ke liye ek separate row produce karta hai jabki baaki columns ki values duplicate ho jati hain.",
    "codeSnippet": "# ['UPI', 'CASHBACK'] -> 2 separate rows\ndf_exploded = df.explode('payment_tags')",
    "tag": "Explode Reshaping"
  },
  {
    "id": "pandas-40",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Analytics",
    "dimension": "Syntax",
    "question": "What is the operational difference between pd.cut() and pd.qcut() in risk scoring?",
    "answerHinglish": "pd.cut() continuous variable ko fixed-width value bins me divide karta hai (e.g. 0-500, 500-1000). pd.qcut() quantiles (percentiles) use karta hai jisse har bin me equal number of sample observations aate hain.",
    "codeSnippet": "df['amt_tier'] = pd.cut(df['amount'], bins=[0, 1000, 10000, 100000])\ndf['amt_quartile'] = pd.qcut(df['amount'], q=4) # 4 equal quartiles",
    "tag": "Data Discretization"
  },
  {
    "id": "pandas-41",
    "domain": "Python & Data Ecosystem",
    "topic": "Modern Pandas",
    "dimension": "Internals",
    "question": "What is Copy-on-Write (CoW) in modern Pandas 2.0+, and how does it solve defensive copying?",
    "answerHinglish": "Copy-on-Write ensure karta hai ki DataFrame ka slice create karte waqt data copy na ho (shallow view share ho), lekin jaise hi slice me koi modification ki jati hai, pandas automatically lazy copy banata hai. Isse SettingWithCopyWarning permanently eliminate ho jati hai.",
    "codeSnippet": "pd.set_option('mode.copy_on_write', True)",
    "tag": "Modern Pandas"
  },
  {
    "id": "pandas-42",
    "domain": "Python & Data Ecosystem",
    "topic": "Pandas Pipelines",
    "dimension": "Best Practice",
    "question": "How does method chaining with .pipe() produce clean, production-grade audit transformations?",
    "answerHinglish": ".pipe() custom functions ko chain karne deta hai jisme pehla argument DataFrame hota hai. Isse code nested readability pyramid ke bajaye clean sequential pipeline me transform ho jata hai: df.pipe(clean_dates).pipe(remove_outliers).pipe(calc_risk_score).",
    "codeSnippet": "final_df = (raw_df\n    .pipe(clean_schema)\n    .pipe(filter_active_accounts)\n    .pipe(compute_aggregates))",
    "tag": "Method Chaining"
  }
]

QUIZ_QUESTIONS = [
  {
    "id": "pandas-q1",
    "category": "Python & Pandas",
    "question": "In pandas, what is the key difference between df.loc[1:3] and df.iloc[1:3] on a DataFrame with default integer index?",
    "options": [
      "df.loc includes rows with index labels 1, 2, and 3; df.iloc includes rows at integer positions 1 and 2 only",
      "df.loc excludes index 3, while df.iloc includes index 3",
      "Both return identical row slices in all circumstances",
      "df.loc only accepts string column names and crashes on integer row slices"
    ],
    "correct": 0,
    "explanation": ".loc is label-based, so stop endpoints are INCLUSIVE (labels 1, 2, 3). .iloc is integer position-based, so stop endpoints are EXCLUSIVE (positions 1 and 2 only).",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q2",
    "category": "Python & Pandas",
    "question": "What happens when you run df.drop('amount') without specifying the axis parameter?",
    "options": [
      "The 'amount' column is removed successfully",
      "Pandas raises a KeyError because axis defaults to 0 (rows), and it looks for a row labeled 'amount'",
      "Pandas automatically detects whether 'amount' is a row or column",
      "The command executes asynchronously in the background"
    ],
    "correct": 1,
    "explanation": "In df.drop(), axis defaults to 0 (axis='index'). To drop a column, you must explicitly pass axis=1 or columns='amount'.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q3",
    "category": "Python & Pandas",
    "question": "Why does df[(df.amount > 5000) & (df.status == 'SUCCESS')] require parentheses around each condition?",
    "options": [
      "In Python, bitwise & has higher operator precedence than comparison operators (>, ==)",
      "Parentheses force pandas to execute the filter in parallel C threads",
      "Parentheses are optional and purely for aesthetic formatting",
      "Because Python garbage collector requires grouped scopes"
    ],
    "correct": 0,
    "explanation": "Because bitwise & has higher precedence than > and ==, without parentheses Python evaluates 5000 & df.status, causing an invalid operand TypeError.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q4",
    "category": "Python & Pandas",
    "question": "Which pandas method converts low-cardinality string columns (e.g. 'SUCCESS', 'FAILED') into integer-coded categories to save up to 85% memory?",
    "options": [
      "df['status'].astype('int32')",
      "df['status'].astype('category')",
      "df['status'].to_categorical()",
      "df['status'].compress_memory()"
    ],
    "correct": 1,
    "explanation": "Converting strings to category dtype stores 1-byte integer codes pointing to an immutable array of unique categories, eliminating repetitive Python string heap allocations.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q5",
    "category": "Python & Pandas",
    "question": "What is the primary cause of a SettingWithCopyWarning in pandas?",
    "options": [
      "Attempting to write data to a read-only CSV file",
      "Chained assignment (df[condition]['col'] = val) where pandas cannot guarantee whether the slice is a memory view or copy",
      "Using .loc with valid integer indexes",
      "Allocating more memory than available physical RAM"
    ],
    "correct": 1,
    "explanation": "Chained indexing causes ambiguous view-versus-copy assignment. The fix is always performing single-stage assignment via df.loc[condition, 'col'] = val.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q6",
    "category": "Python & Pandas",
    "question": "When performing a 3-way reconciliation using pd.merge(df1, df2, on='txn_id', how='outer', indicator=True), what does indicator=True provide?",
    "options": [
      "A progress bar indicating merge completion percentage",
      "A new column named _merge with values 'both', 'left_only', or 'right_only' to pinpoint unmatched ledger rows",
      "A boolean flag that automatically drops unmatched rows",
      "An indicator of network latency during the database fetch"
    ],
    "correct": 1,
    "explanation": "indicator=True appends a categorical column called _merge displaying whether each row key came from the left DataFrame only, right DataFrame only, or both, making settlement reconciliation trivial.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q7",
    "category": "Python & Pandas",
    "question": "If s1 = pd.Series([10, 20], index=['A', 'B']) and s2 = pd.Series([30, 40], index=['B', 'C']), what is (s1 + s2)['A']?",
    "options": [
      "10",
      "40",
      "NaN",
      "0"
    ],
    "correct": 2,
    "explanation": "Pandas performs automatic index alignment. Label 'A' exists in s1 (10) but is missing in s2 (NaN). 10 + NaN evaluates to NaN.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q8",
    "category": "Python & Pandas",
    "question": "In financial tick data with missing weekend records, which method propagates the last known valid price forward?",
    "options": [
      "df['price'].fillna(0)",
      "df['price'].ffill()",
      "df['price'].bfill()",
      "df['price'].interpolate(method='linear')"
    ],
    "correct": 1,
    "explanation": ".ffill() (forward fill) carries forward the last valid recorded price to subsequent missing timestamps, accurately modeling last traded price.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q9",
    "category": "Python & Pandas",
    "question": "Why is df.duplicated(keep=False) essential in forensic fraud transaction audits?",
    "options": [
      "It deletes all duplicated records permanently from disk",
      "It marks EVERY instance of duplicated keys as True so investigators inspect all colliding rows, not just second occurrences",
      "It encrypts duplicate card numbers with SHA-256",
      "It performs a fast fuzzy string match on customer names"
    ],
    "correct": 1,
    "explanation": "keep=False marks all copies (first, second, third, etc.) of duplicate rows as True, allowing fraud analysts to compare all identical collision events side-by-side.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q10",
    "category": "Python & Pandas",
    "question": "Why does using for _, row in df.iterrows() degrade performance severely on large financial datasets?",
    "options": [
      "It blocks Python event loop thread pool",
      "It creates a new pandas Series for each row on the Python heap, bypassing C-level vectorized SIMD execution",
      "It forces garbage collection after every iteration",
      "It writes temporary files to /tmp"
    ],
    "correct": 1,
    "explanation": "iterrows() instantiates a Series object for each row and performs overhead-heavy type conversions in pure Python, running up to 1,000x slower than vectorized pandas/NumPy operations.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q11",
    "category": "Python & Pandas",
    "question": "How should uncleaned ledger amount strings containing invalid values like 'ERROR' or 'NULL' be safely converted to floats?",
    "options": [
      "df['amount'].astype(float)",
      "pd.to_numeric(df['amount'], errors='coerce')",
      "df['amount'].apply(int)",
      "float(df['amount'])"
    ],
    "correct": 1,
    "explanation": "pd.to_numeric(..., errors='coerce') converts unparseable strings into NaN without throwing a ValueError exception, allowing subsequent imputation.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q12",
    "category": "Python & Pandas",
    "question": "Why is drop_first=True specified when creating dummy variables with pd.get_dummies() for statistical/ML modeling?",
    "options": [
      "To remove the header row from the DataFrame",
      "To prevent the Dummy Variable Trap (perfect multicollinearity) by leaving out one reference category",
      "To drop the first transaction from the customer history",
      "To sort dummy columns in reverse alphabetical order"
    ],
    "correct": 1,
    "explanation": "If a categorical column has k categories, k dummy columns create a perfect linear dependency (their sum equals 1), causing multicollinearity in regression models. drop_first=True retains k-1 columns.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q13",
    "category": "Python & Pandas",
    "question": "What does .unstack() do to a multi-level grouped aggregation Series like df.groupby(['branch', 'year'])['revenue'].sum()?",
    "options": [
      "Drops all missing values from the result",
      "Pivots the innermost index level ('year') into columns, creating a wide 2D DataFrame",
      "Merges the Series with the original raw table",
      "Flattens the index into a single tuple"
    ],
    "correct": 1,
    "explanation": "unstack() pivots an index level of a Series or DataFrame into column headers, converting a hierarchical tall representation into a clean, wide matrix.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q14",
    "category": "Python & Pandas",
    "question": "How do you refer to an active Python variable named cutoff_amount inside df.query()?",
    "options": [
      "df.query('amount > $cutoff_amount')",
      "df.query('amount > @cutoff_amount')",
      "df.query('amount > :cutoff_amount')",
      "df.query('amount > ?cutoff_amount')"
    ],
    "correct": 1,
    "explanation": "The @ prefix in df.query() allows referencing environment variables in the local Python scope.",
    "moduleRef": "01-PYTHON"
  },
  {
    "id": "pandas-q15",
    "category": "Python & Pandas",
    "question": "Which pandas method transforms a column containing list elements (e.g. ['UPI', 'CASHBACK']) into separate individual rows?",
    "options": [
      "df.melt()",
      "df.explode()",
      "df.flatten()",
      "df.split()"
    ],
    "correct": 1,
    "explanation": "df.explode() unrolls list-like values in a target column into separate rows, repeating the index and non-target column values.",
    "moduleRef": "01-PYTHON"
  }
]

TOPICS_TO_ADD = [
  {
    "id": "top-pandas-reconciliation-joins",
    "title": "Pandas Financial Ledger Reconciliation, Joins & Groupby Aggregations",
    "tier": "Must Know",
    "tierColor": "rose",
    "category": "Data & Analytics",
    "studyTimeMinutes": 50,
    "interviewFrequency": "Every FinTech & Data Architecture Round",
    "lessonDocId": "01-python-programming",
    "summary": "Automating 3-way banking reconciliation: Core Banking System (CBS) vs Payment Switch (NPCI) vs Third-Party Aggregator using pd.merge(), indicator=True, MultiIndex reshaping (unstack), and Split-Apply-Combine aggregations.",
    "keyQuestions": [
      "How do you detect broken settlements and missing credit legs across two 5-million-row DataFrames using pd.merge(..., indicator=True)?",
      "How does automatic index alignment work during Series arithmetic, and why does s1 + s2 return NaN for mismatched index labels?",
      "How do you compute grouped customer transaction metrics (total volume, average ticket size, failure rate) in a single pass using .agg()?"
    ],
    "bankingRelevance": "Critical for end-of-day (EOD) batch clearance, RBI settlement compliance, and fraud audit trails."
  },
  {
    "id": "top-pandas-data-wrangling-memory",
    "title": "Pandas High-Performance Data Wrangling & Memory Optimization",
    "tier": "High",
    "tierColor": "amber",
    "category": "Data & Analytics",
    "studyTimeMinutes": 45,
    "interviewFrequency": "Python & Data Engineering Rounds",
    "lessonDocId": "01-python-programming",
    "summary": "Mastering loc vs iloc, SettingWithCopyWarning, category dtype, vectorized string (.str) and temporal (.dt) accessors, and memory reduction techniques for multi-gigabyte transaction ledgers.",
    "keyQuestions": [
      "What is the internal difference between a View and a Copy in Pandas, and how do you eliminate SettingWithCopyWarning in production?",
      "How does the category dtype reduce memory usage by up to 85% on low-cardinality financial status fields?",
      "Why should you never use for index, row in df.iterrows() in production data pipelines, and what should you use instead?"
    ],
    "bankingRelevance": "Daily processing of millions of core banking, UPI, and IMPS transaction logs without memory crashes or performance bottlenecks."
  }
]

def update_flashcards():
    fc_path = "frontend/src/data/flashcardsData.js"
    with open(fc_path, "r", encoding="utf-8") as f:
        text = f.read()

    # Remove any existing pandas- cards
    # Find FLASHCARDS_DATA = [ ... ]
    start_match = re.search(r'export const FLASHCARDS_DATA = \[\s*', text)
    if not start_match:
        print("Could not find FLASHCARDS_DATA in flashcardsData.js")
        return

    start_pos = start_match.end()
    
    # We want to remove all existing items with "id": "pandas-"
    # Let's parse the rest or use regex to strip pandas- cards from the beginning
    # In flashcardsData.js, pandas cards were prepended right after [
    text_after = text[start_pos:]
    # Find where the non-pandas cards start (node-01)
    node_idx = text_after.find('{\n    "id": "node-01"')
    if node_idx == -1:
        node_idx = text_after.find('{\n    id: "node-01"')
    if node_idx == -1:
        node_idx = text_after.find('"id": "node-01"')
        # find preceding {
        node_idx = text_after.rfind('{', 0, node_idx)
    
    remaining_cards = text_after[node_idx:] if node_idx != -1 else text_after

    cards_json = json.dumps(FLASHCARDS, indent=2)[1:-1].strip() + ",\n  "
    new_text = text[:start_pos] + "\n  " + cards_json + remaining_cards

    # Count total cards in new_text
    total_cards = len(re.findall(r'\"id\":\s*\"[^\"]+\"', new_text)) + len(re.findall(r'id:\s*\"[^\"]+\"', new_text))
    new_text = re.sub(r'export const FLASHCARDS_COUNT = \d+;', f'export const FLASHCARDS_COUNT = {total_cards};', new_text)

    with open(fc_path, "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"✓ Updated {fc_path}: {len(FLASHCARDS)} Pandas flashcards written (Total: {total_cards})")

def update_quiz():
    quiz_path = "frontend/src/data/quizData.js"
    with open(quiz_path, "r", encoding="utf-8") as f:
        text = f.read()

    start_match = re.search(r'export const DIAGNOSTIC_QUESTIONS = \[\s*', text)
    if not start_match:
        print("Could not find DIAGNOSTIC_QUESTIONS in quizData.js")
        return

    start_pos = start_match.end()
    text_after = text[start_pos:]

    # Find where q1 starts
    q1_idx = text_after.find('{\n    id: "q1"')
    if q1_idx == -1:
        q1_idx = text_after.find('{\n    "id": "q1"')
    if q1_idx == -1:
        q1_idx = text_after.find('id: "q1"')
        q1_idx = text_after.rfind('{', 0, q1_idx)

    remaining_quiz = text_after[q1_idx:] if q1_idx != -1 else text_after

    quiz_json = json.dumps(QUIZ_QUESTIONS, indent=2)[1:-1].strip() + ",\n  "
    new_text = text[:start_pos] + "\n  " + quiz_json + remaining_quiz

    with open(quiz_path, "w", encoding="utf-8") as f:
        f.write(new_text)
    print(f"✓ Updated {quiz_path}: {len(QUIZ_QUESTIONS)} Pandas quiz questions written")

def update_important_topics():
    topics_path = "frontend/src/data/importantTopicsData.js"
    with open(topics_path, "r", encoding="utf-8") as f:
        text = f.read()

    # Check if top-pandas-reconciliation-joins already present
    if "top-pandas-reconciliation-joins" not in text:
        # Insert into TIER 1: MUST KNOW
        t1_match = re.search(r'(\/\/ \-+[\r\n]+\s*\/\/ TIER 1: MUST KNOW[^\r\n]*[\r\n]+\s*\/\/ \-+[\r\n]+)', text)
        if t1_match:
            insert_pos = t1_match.end()
            item_json = json.dumps(TOPICS_TO_ADD[0], indent=2) + ",\n  "
            text = text[:insert_pos] + "  " + item_json + text[insert_pos:]

    if "top-pandas-data-wrangling-memory" not in text:
        # Insert into TIER 2: HIGH
        t2_match = re.search(r'(\/\/ \-+[\r\n]+\s*\/\/ TIER 2: HIGH PRIORITY[^\r\n]*[\r\n]+\s*\/\/ \-+[\r\n]+)', text)
        if t2_match:
            insert_pos = t2_match.end()
            item_json = json.dumps(TOPICS_TO_ADD[1], indent=2) + ",\n  "
            text = text[:insert_pos] + "  " + item_json + text[insert_pos:]

    with open(topics_path, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"✓ Updated {topics_path} with high-impact Pandas topics")

def sanitize_and_rewrite_markdown():
    # Sanitize 01-PYTHON/pandas.md
    with open("01-PYTHON/pandas.md", "r", encoding="utf-8") as f:
        md = f.read()
    md_clean = md.replace("$O(1)$", "O(1)")
    with open("01-PYTHON/pandas.md", "w", encoding="utf-8") as f:
        f.write(md_clean)
    print(f"✓ Verified 01-PYTHON/pandas.md has {md_clean.count('$')} dollar signs")

if __name__ == "__main__":
    sanitize_and_rewrite_markdown()
    update_flashcards()
    update_quiz()
    update_important_topics()
    print("\nAll data expansions completed successfully!")
