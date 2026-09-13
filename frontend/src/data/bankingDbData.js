export const BANKING_DB_TABLES = {
  customers: {
    columns: ["customer_id", "first_name", "last_name", "email", "phone", "pan_number", "kyc_status", "created_at"],
    rows: [
      [1, "Bipin", "Yadav", "bipin.yadav@example.com", "+91-9876543210", "ABCDE1234F", "VERIFIED", "2023-01-15"],
      [2, "Aarav", "Sharma", "aarav.sharma@example.com", "+91-9811122233", "BCDEF2345G", "VERIFIED", "2023-02-10"],
      [3, "Priya", "Nair", "priya.nair@example.com", "+91-9822233344", "CDEFG3456H", "VERIFIED", "2023-03-05"],
      [4, "Vikram", "Mehta", "vikram.mehta@example.com", "+91-9833344455", "DEFGH4567I", "PENDING_DOCS", "2023-04-12"],
      [5, "Ananya", "Deshmukh", "ananya.d@example.com", "+91-9844455566", "EFGHI5678J", "VERIFIED", "2023-05-20"]
    ]
  },
  accounts: {
    columns: ["account_id", "customer_id", "account_number", "account_type", "balance", "currency", "status", "created_at"],
    rows: [
      [101, 1, "IDFC00010001", "SAVINGS", 145200.50, "INR", "ACTIVE", "2023-01-15"],
      [102, 1, "IDFC00010002", "CURRENT", 450000.00, "INR", "ACTIVE", "2023-01-20"],
      [103, 2, "IDFC00020001", "SAVINGS", 89400.00, "INR", "ACTIVE", "2023-02-10"],
      [104, 3, "IDFC00030001", "SALARY", 235600.75, "INR", "ACTIVE", "2023-03-05"],
      [105, 4, "IDFC00040001", "SAVINGS", 12000.00, "INR", "DORMANT", "2023-04-12"],
      [106, 5, "IDFC00050001", "WEALTH", 1250000.00, "INR", "ACTIVE", "2023-05-20"]
    ]
  },
  transactions: {
    columns: ["tx_id", "from_account_id", "to_account_id", "amount", "tx_type", "channel", "status", "created_at"],
    rows: [
      [1001, 101, 103, 5000.00, "TRANSFER", "UPI", "COMPLETED", "2024-03-01 10:15:00"],
      [1002, 102, 106, 50000.00, "TRANSFER", "IMPS", "COMPLETED", "2024-03-01 11:30:00"],
      [1003, 104, 101, 1200.00, "TRANSFER", "UPI", "COMPLETED", "2024-03-02 09:45:00"],
      [1004, 105, 103, 3000.00, "TRANSFER", "NEFT", "FAILED", "2024-03-02 14:20:00"],
      [1005, 106, 102, 100000.00, "TRANSFER", "RTGS", "COMPLETED", "2024-03-03 16:00:00"],
      [1006, 101, 104, 2500.00, "TRANSFER", "UPI", "COMPLETED", "2024-03-04 12:10:00"]
    ]
  },
  cards: {
    columns: ["card_id", "account_id", "card_number_last4", "card_type", "network", "status", "daily_limit"],
    rows: [
      [501, 101, "4312", "DEBIT", "VISA", "ACTIVE", 50000.00],
      [502, 102, "8821", "CREDIT", "MASTERCARD", "ACTIVE", 200000.00],
      [503, 104, "9014", "DEBIT", "RUPAY", "ACTIVE", 75000.00],
      [504, 106, "1192", "CREDIT", "VISA_INFINITE", "ACTIVE", 500000.00]
    ]
  },
  loans: {
    columns: ["loan_id", "customer_id", "loan_type", "principal_amount", "interest_rate", "tenure_months", "status"],
    rows: [
      [701, 1, "HOME_LOAN", 4500000.00, 8.45, 240, "DISBURSED"],
      [702, 3, "PERSONAL_LOAN", 500000.00, 11.25, 36, "DISBURSED"],
      [703, 5, "CAR_LOAN", 1200000.00, 9.10, 60, "ACTIVE"]
    ]
  }
};

export const SAMPLE_INTERVIEW_QUERIES = [
  {
    id: "q_window",
    title: "Running Account Balance (Window Function)",
    difficulty: "Medium",
    sql: `SELECT 
  tx_id, 
  created_at, 
  amount, 
  tx_type,
  SUM(CASE WHEN to_account_id = 101 THEN amount ELSE -amount END) 
    OVER (ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_net
FROM transactions 
WHERE from_account_id = 101 OR to_account_id = 101;`,
    explanation: "OVER clause without GROUP BY maintains individual rows and calculates the running cumulative net debit/credit balance as transactions occur over time."
  },
  {
    id: "q_rank",
    title: "Top 2 Largest Transactions Per Customer (DENSE_RANK)",
    difficulty: "Hard",
    sql: `WITH RankedTx AS (
  SELECT 
    c.customer_id, 
    c.first_name, 
    t.amount, 
    t.channel,
    DENSE_RANK() OVER (PARTITION BY c.customer_id ORDER BY t.amount DESC) as rank_num
  FROM customers c
  JOIN accounts a ON c.customer_id = a.customer_id
  JOIN transactions t ON a.account_id = t.from_account_id
)
SELECT customer_id, first_name, amount, channel 
FROM RankedTx 
WHERE rank_num <= 2;`,
    explanation: "DENSE_RANK() partitions by customer and assigns rank in descending order of amount. CTE allows outer query to filter where rank_num <= 2 cleanly."
  },
  {
    id: "q_pessimistic",
    title: "Atomic Debit with Row Locking (SELECT FOR UPDATE)",
    difficulty: "Critical",
    sql: `-- Transaction Block in Banking Switch
BEGIN TRANSACTION;

SELECT balance FROM accounts 
WHERE account_id = 101 
FOR UPDATE;

-- Application checks: balance >= 5000
UPDATE accounts 
SET balance = balance - 5000 
WHERE account_id = 101;

INSERT INTO transactions (from_account_id, to_account_id, amount, tx_type, channel, status)
VALUES (101, 103, 5000, 'TRANSFER', 'UPI', 'COMPLETED');

COMMIT;`,
    explanation: "FOR UPDATE acquires an exclusive X-lock on the record. Prevents dirty reads and double-spending across concurrent threads."
  }
];
