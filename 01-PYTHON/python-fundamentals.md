# Python Fundamentals, OOP, Internals & Advanced Concepts

## 1. Why This Matters (Interview Perspective)
IDFC FIRST Bank ke job description mein **"Java / Python / C++"** explicitly mentioned hai. Aapka primary backend experience Node.js/Express mein hai aur aapne Python mainly DSA ke liye use kiya hai. Lekin interview mein agar interviewer Python par switch karta hai, toh woh sirf basic loops nahi puchega. Woh puchega:
- Python ka memory model (pointers, heap allocations, mutability).
- Generators (`yield`) vs Lists memory footprint.
- Decorators kaise kaam karte hain under the hood.
- Magic methods (`__eq__`, `__repr__`, `__lt__`) custom sorting aur OOP design ke liye.
Is module ka goal aapko data scientist banana nahi hai, balki **ek confident 3+ YoE developer ki tarah Python discuss aur code karne ke kabil banana hai**.

---

## 2. Python Fundamentals (Hinglish + Code)

### Simple Language Mein:
> "Python mein sab kuch ek **Object** hota hai. Variables koi memory box nahi hote jisme value rakhi hoti hai; variables bas ek **Name Tag (Pointer)** hote hain jo heap par bane object ko point karte hain."

### 1. Variables, Data Types & Slicing
```python
# Numbers & Strings
age: int = 28
balance: float = 45200.50
bank_name: str = "IDFC FIRST Bank"

# Slicing: [start : stop : step]
account_num = "IDFB1000928371"
bank_code = account_num[0:4]    # 'IDFB'
last_four = account_num[-4:]    # '8371'
reversed_str = account_num[::-1] # Pure string reverse in O(N)
```

### 2. Lists, Tuples, Sets, Dictionaries

| Data Structure | Syntax | Mutability | Duplicates? | Ordered? | Under the Hood |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **`list`** | `[1, 2, 3]` | **Mutable** | Yes | Yes | Dynamic Array (`PyObject**`) |
| **`tuple`** | `(1, 2, 3)` | **Immutable** | Yes | Yes | Fixed-size array (Cache friendly) |
| **`set`** | `{1, 2, 3}` | **Mutable** | **No** | No | Hash Table (Keys only, $O(1)$ avg) |
| **`dict`** | `{"a": 1}` | **Mutable** | No (Keys) | **Yes (3.7+)** | Compact Hash Table ($O(1)$ avg) |

```python
# Unpacking and *args, **kwargs
def process_transaction(txn_id: str, *amounts, **metadata):
    """
    *amounts captures positional args as a tuple
    **metadata captures keyword args as a dictionary
    """
    total = sum(amounts)
    channel = metadata.get("channel", "UPI")
    print(f"Txn: {txn_id}, Total: ₹{total}, Channel: {channel}")

process_transaction("TXN_101", 500, 1200, 350, channel="IMPS", merchant="Swiggy")
# Output: Txn: TXN_101, Total: ₹2050, Channel: IMPS
```

### 3. Comprehensions (List, Dict, Set)
> "Loop likhne ke bajaye ek line mein readable aur fast collection banana."

```python
# List Comprehension (Filtered & Transformed)
raw_amounts = [1500, -200, 8000, 0, 12000]
credits_only = [amt for amt in raw_amounts if amt > 0]
# [1500, 8000, 12000]

# Dict Comprehension: Customer ID to normalized account map
accounts = [("CUST_101", "SAVINGS"), ("CUST_102", "CURRENT")]
acc_dict = {cust_id: acc_type for cust_id, acc_type in accounts}
# {'CUST_101': 'SAVINGS', 'CUST_102': 'CURRENT'}

# Set Comprehension: Unique merchant categories
merchants = ["Swiggy", "Zomato", "Swiggy", "Amazon", "Uber"]
unique_merchants = {m.upper() for m in merchants}
# {'SWIGGY', 'ZOMATO', 'AMAZON', 'UBER'}
```

---

## 3. Python OOP (Object-Oriented Programming)

### Core Pillars:
1. **Encapsulation:** Data aur methods ko ek unit (class) mein bind karna. Private members convention se `_single_underscore` (internal) ya `__double_underscore` (name mangling) hote hain.
2. **Inheritance:** Parent class ki functionality reuse karna.
3. **Polymorphism:** Same method name different classes mein alag behave kare (Duck Typing: *"If it walks like a duck and quacks like a duck, it's a duck"*).
4. **Abstraction:** Complex implementation hide karke clean interface provide karna (`abc.ABC`).

```python
from abc import ABC, abstractmethod

# Abstraction: Interface for payment rails
class PaymentRail(ABC):
    @abstractmethod
    def transfer(self, from_acc: str, to_acc: str, amount: float) -> bool:
        pass

# Inheritance & Polymorphism
class UpiRail(PaymentRail):
    def transfer(self, from_acc: str, to_acc: str, amount: float) -> bool:
        print(f"[UPI] Transferring ₹{amount} from {from_acc} to {to_acc} via NPCI")
        return True

class NeftRail(PaymentRail):
    def transfer(self, from_acc: str, to_acc: str, amount: float) -> bool:
        print(f"[NEFT] Queuing ₹{amount} in RBI half-hourly clearing batch")
        return True
```

### Magic Methods (Dunder Methods)
Interviewers love asking about `__repr__`, `__eq__`, aur `__lt__`:

```python
class BankAccount:
    def __init__(self, account_number: str, balance: float):
        self.account_number = account_number
        self.balance = balance

    # User-friendly string (used by print(acc) and str(acc))
    def __str__(self) -> str:
        return f"Account({self.account_number}): ₹{self.balance:,.2f}"

    # Developer/Debug representation (used in interactive shells and logs)
    def __repr__(self) -> str:
        return f"BankAccount(account_number='{self.account_number}', balance={self.balance})"

    # Equality check (acc1 == acc2)
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, BankAccount):
            return False
        return self.account_number == other.account_number

    # Less-than comparator (Unlocks natural sorting: accounts.sort() by balance!)
    def __lt__(self, other: "BankAccount") -> bool:
        return self.balance < other.balance

# Testing Dunder methods:
acc1 = BankAccount("IDFC_101", 45000.0)
acc2 = BankAccount("IDFC_102", 12000.0)
acc3 = BankAccount("IDFC_103", 95000.0)

accounts = [acc1, acc2, acc3]
accounts.sort() # Uses __lt__ automatically!
print(accounts)
# Output sorted by balance: [IDFC_102 (12k), IDFC_101 (45k), IDFC_103 (95k)]
```

---

## 4. Python Internals (Memory, GC, Copying & Generators)

### 1. References & Mutability
> "Numbers, Strings, Tuples immutable hote hain (unhe modify nahi kiya ja sakta, naya object banta hai). Lists, Dicts, Sets mutable hote hain (same memory address par modify hote hain)."

```python
# Pass-by-object-reference trap:
def add_bonus(acc_balance: float, transaction_list: list):
    acc_balance += 500          # Float is immutable -> local variable rebinds!
    transaction_list.append(500) # List is mutable -> caller's list updates in place!

bal = 1000.0
txns = []
add_bonus(bal, txns)
print(bal)   # Still 1000.0 (Unchanged!)
print(txns)  # [500] (Mutated!)
```

### 2. Shallow Copy vs Deep Copy
- **Shallow Copy (`copy.copy()` or `list.copy()`):** Outer container ka naya object banta hai, lekin nested objects ke references same rehte hain.
- **Deep Copy (`copy.deepcopy()`):** Recursively saare nested objects ki independent duplicate copy banata hai.

```python
import copy

nested = [[1, 2], [3, 4]]
shallow = copy.copy(nested)
deep = copy.deepcopy(nested)

nested[0][0] = 999
print(shallow[0][0]) # 999 (Affected! Shared nested reference)
print(deep[0][0])    # 1   (Unaffected! Fully independent clone)
```

### 3. Garbage Collection & Memory Management
Python memory management do mechanisms par chalti hai:
1. **Reference Counting (Primary):** Har object ke header mein `ob_refcnt` hota hai. Jab koi variable us object ko point karta hai, count badhta hai (`+1`). Jab variable scope se bahar nikalta hai ya `del` hota hai, count ghat-ta hai (`-1`). Jaise hi `ob_refcnt == 0`, memory **immediately free** ho jaati hai.
2. **Generational Garbage Collector (Cyclic GC):**
   - Agar do objects ek doosre ko refer kar rahe hain (`A.child = B` aur `B.parent = A`), toh dono ka reference count kabhi zero nahi hoga (**Reference Cycle**).
   - Python ka cyclic GC 3 generations (Gen 0, Gen 1, Gen 2) maintain karta hai. Young objects Gen 0 mein aate hain. GC periodic interval par circular references detect karke collect karta hai.

### 4. Generators (`yield`) — Processing Millions of Records Without OOM
> "Agar 10 million transactions ka CSV read karna hai, toh list mein read karne se 8GB RAM bhar jayegi aur server crash ho jayega. Generator ek time par **sirf ek item** memory mein rakhta hai."

```python
from typing import Generator

def read_large_transaction_stream(file_path: str) -> Generator[dict, None, None]:
    """Generator: Produces one record at a time in O(1) memory."""
    with open(file_path, "r") as f:
        header = f.readline().strip().split(",")
        for line in f:
            values = line.strip().split(",")
            yield dict(zip(header, values)) # Pauses execution and yields control!

# Usage:
# stream = read_large_transaction_stream("huge_txns.csv")
# for txn in stream:
#     process_payment(txn)  # Memory stays strictly bounded under 20MB!
```

### 5. Decorators — Enterprise Cross-Cutting Concerns (Logging, Auth, Timing)
> "Decorator ek function hota hai jo doosre function ko argument ki tarah leta hai, uski functionality extend karta hai, aur naya function return karta hai."

```python
import time
from functools import wraps

def audit_log(func):
    """Decorator that logs execution time and parameters for banking audits."""
    @wraps(func) # Preserves original function's name and docstring
    def wrapper(*args, **kwargs):
        start_time = time.time()
        print(f"[AUDIT] Starting {func.__name__} with args={args}")
        try:
            result = func(*args, **kwargs)
            duration_ms = (time.time() - start_time) * 1000
            print(f"[AUDIT] {func.__name__} completed in {duration_ms:.2f}ms")
            return result
        except Exception as e:
            print(f"[AUDIT ALERT] {func.__name__} failed with error: {e}")
            raise
    return wrapper

@audit_log
def debit_account(account_id: str, amount: float):
    time.sleep(0.05) # Simulate DB latency
    return f"Debited ₹{amount} from {account_id}"

print(debit_account("ACC_1001", 2500.0))
```

### 6. Context Managers (`with` statement)
> "Resource cleanup (DB connections close karna, files close karna, locks release karna) guarantee karta hai, chahe exception hi kyu na aa jaye."

```python
class DatabaseTransaction:
    """Custom Context Manager simulating ACID transaction scope."""
    def __init__(self, connection_name: str):
        self.conn = connection_name

    def __enter__(self):
        print(f"BEGIN TRANSACTION on {self.conn}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"ROLLBACK TRANSACTION due to exception: {exc_val}")
            return False # Re-raise exception
        else:
            print("COMMIT TRANSACTION")
            return True

# Safe usage:
with DatabaseTransaction("IDFC_Core_DB"):
    print("Executing SQL: UPDATE accounts SET balance = balance - 1000")
    # If error happens here, ROLLBACK triggers automatically!
```

---

## 5. Advanced Python Tools (`collections`, `itertools`, `dataclasses`)

```python
# 1. dataclasses: Clean data containers without boilerplate __init__ and __repr__
from dataclasses import dataclass

@dataclass
class CustomerProfile:
    customer_id: str
    pan_number: str
    kyc_verified: bool
    risk_score: float = 0.0

cust = CustomerProfile("CUST_101", "ABCDE1234F", True)
print(cust) # CustomerProfile(customer_id='CUST_101', pan_number='ABCDE1234F', kyc_verified=True, risk_score=0.0)

# 2. functools.lru_cache: Built-in Memoization
from functools import lru_cache

@lru_cache(maxsize=128)
def calculate_compound_interest(principal: float, rate: float, years: int) -> float:
    print(f"Computing interest for P={principal}, r={rate}, t={years}")
    return principal * ((1 + rate) ** years)

# First call computes; second call returns from cache in O(1)!
calculate_compound_interest(100000, 0.07, 5)
calculate_compound_interest(100000, 0.07, 5) # Instant cache hit!
```

---

## 6. Quick Revision & Interview Flashcards
- **Variables = Pointers:** Python variables heap objects ko refer karte hain.
- **Reference Counting + Generational GC:** Python ref count 0 hote hi free karta hai; cycles ko cyclic GC handle karta hai.
- **Generators (`yield`):** Lazy evaluation, memory consumption strictly $O(1)$.
- **Decorators:** Functions that wrap other functions (syntactic sugar `@decorator`).
- **Context Managers (`__enter__`, `__exit__`):** Guarantees resource cleanup even on crashes.
