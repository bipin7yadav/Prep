-- ============================================================================
-- IDFC FIRST Bank Interview Practice Database Schema
-- Compatible with SQLite3, PostgreSQL, and MySQL
-- Tables: customers, accounts, transactions, beneficiaries, cards, loans, payments
-- ============================================================================

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS beneficiaries;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS customers;

-- 1. Customers Table
CREATE TABLE customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    pan_number VARCHAR(10) UNIQUE NOT NULL,
    kyc_status VARCHAR(20) NOT NULL CHECK (kyc_status IN ('VERIFIED', 'PENDING', 'REJECTED')),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Accounts Table
CREATE TABLE accounts (
    account_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('SAVINGS', 'CURRENT', 'SALARY', 'FIXED_DEPOSIT')),
    branch_code VARCHAR(10) NOT NULL,
    balance DECIMAL(15, 2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0.00),
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'DORMANT', 'FROZEN', 'CLOSED')),
    version INTEGER NOT NULL DEFAULT 1, -- For Optimistic Locking
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE RESTRICT
);

-- 3. Beneficiaries Table
CREATE TABLE beneficiaries (
    beneficiary_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    beneficiary_name VARCHAR(100) NOT NULL,
    beneficiary_account_number VARCHAR(20) NOT NULL,
    beneficiary_ifsc VARCHAR(11) NOT NULL,
    bank_name VARCHAR(100) NOT NULL,
    transfer_limit DECIMAL(12, 2) NOT NULL DEFAULT 50000.00,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- 4. Transactions Table (Core Banking Ledger)
CREATE TABLE transactions (
    transaction_id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_reference VARCHAR(36) UNIQUE NOT NULL, -- UUID or Idempotency Key
    from_account_id INTEGER,
    to_account_id INTEGER,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'INTEREST', 'PENALTY')),
    payment_channel VARCHAR(20) NOT NULL CHECK (payment_channel IN ('UPI', 'NEFT', 'RTGS', 'IMPS', 'ATM', 'NETBANKING', 'BRANCH')),
    amount DECIMAL(15, 2) NOT NULL CHECK (amount > 0.00),
    status VARCHAR(20) NOT NULL CHECK (status IN ('SUCCESS', 'PENDING', 'FAILED', 'REVERSED')),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES accounts(account_id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(account_id)
);

-- 5. Cards Table
CREATE TABLE cards (
    card_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_id INTEGER NOT NULL,
    card_number_masked VARCHAR(19) NOT NULL, -- e.g. 4111-XXXX-XXXX-1234
    card_type VARCHAR(20) NOT NULL CHECK (card_type IN ('DEBIT', 'CREDIT')),
    expiry_month INTEGER NOT NULL CHECK (expiry_month BETWEEN 1 AND 12),
    expiry_year INTEGER NOT NULL CHECK (expiry_year >= 2024),
    daily_limit DECIMAL(10, 2) NOT NULL DEFAULT 25000.00,
    is_blocked INTEGER NOT NULL DEFAULT 0 CHECK (is_blocked IN (0, 1)),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

-- 6. Loans Table
CREATE TABLE loans (
    loan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    loan_type VARCHAR(30) NOT NULL CHECK (loan_type IN ('HOME', 'PERSONAL', 'AUTO', 'EDUCATION')),
    principal_amount DECIMAL(15, 2) NOT NULL CHECK (principal_amount > 0),
    interest_rate DECIMAL(5, 2) NOT NULL CHECK (interest_rate > 0),
    tenure_months INTEGER NOT NULL CHECK (tenure_months > 0),
    outstanding_amount DECIMAL(15, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'CLOSED', 'DEFAULTED')),
    sanctioned_date DATE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- 7. Payments Table (Merchant & Bill Settlements)
CREATE TABLE payments (
    payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    account_id INTEGER NOT NULL,
    merchant_name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'UTILITIES', 'SHOPPING', 'FOOD', 'ENTERTAINMENT'
    amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
    status VARCHAR(20) NOT NULL CHECK (status IN ('SUCCESS', 'PENDING', 'FAILED')),
    idempotency_key VARCHAR(64) UNIQUE NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

-- ============================================================================
-- INDEXES FOR QUERY OPTIMIZATION
-- ============================================================================
CREATE INDEX idx_accounts_customer_id ON accounts(customer_id);
CREATE INDEX idx_transactions_from_acc ON transactions(from_account_id);
CREATE INDEX idx_transactions_to_acc ON transactions(to_account_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_ref ON transactions(transaction_reference);
CREATE INDEX idx_payments_idempotency ON payments(idempotency_key);

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Customers
INSERT INTO customers (customer_id, first_name, last_name, email, phone, pan_number, kyc_status, city, state) VALUES
(1, 'Aarav', 'Sharma', 'aarav.sharma@example.com', '+919876543210', 'ABCDE1234F', 'VERIFIED', 'Bengaluru', 'Karnataka'),
(2, 'Priya', 'Nair', 'priya.nair@example.com', '+919876543211', 'BCDEF2345G', 'VERIFIED', 'Bengaluru', 'Karnataka'),
(3, 'Rohan', 'Verma', 'rohan.verma@example.com', '+919876543212', 'CDEFG3456H', 'VERIFIED', 'Mumbai', 'Maharashtra'),
(4, 'Ananya', 'Iyer', 'ananya.iyer@example.com', '+919876543213', 'DEFGH4567I', 'PENDING', 'Chennai', 'Tamil Nadu'),
(5, 'Vikram', 'Singh', 'vikram.singh@example.com', '+919876543214', 'EFGHI5678J', 'VERIFIED', 'Delhi', 'Delhi'),
(6, 'Neha', 'Gupta', 'neha.gupta@example.com', '+919876543215', 'FGHIJ6789K', 'REJECTED', 'Pune', 'Maharashtra');

-- Accounts
INSERT INTO accounts (account_id, customer_id, account_number, account_type, branch_code, balance, status, version) VALUES
(101, 1, 'IDFC1000000001', 'SAVINGS', 'BLR001', 125000.00, 'ACTIVE', 1),
(102, 1, 'IDFC1000000002', 'SALARY', 'BLR001', 84500.00, 'ACTIVE', 1),
(103, 2, 'IDFC1000000003', 'SAVINGS', 'BLR002', 450000.00, 'ACTIVE', 1),
(104, 3, 'IDFC1000000004', 'CURRENT', 'MUM001', 25000.00, 'ACTIVE', 1),
(105, 4, 'IDFC1000000005', 'SAVINGS', 'CHN001', 1200.00, 'ACTIVE', 1),
(106, 5, 'IDFC1000000006', 'SAVINGS', 'DEL001', 98000.00, 'ACTIVE', 1),
(107, 3, 'IDFC1000000007', 'SAVINGS', 'MUM001', 5000.00, 'DORMANT', 1);

-- Beneficiaries
INSERT INTO beneficiaries (customer_id, beneficiary_name, beneficiary_account_number, beneficiary_ifsc, bank_name, transfer_limit) VALUES
(1, 'Priya Nair', 'IDFC1000000003', 'IDFB0000002', 'IDFC FIRST Bank', 100000.00),
(1, 'Tech Solutions Pvt Ltd', 'HDFC0001234567', 'HDFC0000001', 'HDFC Bank', 200000.00),
(2, 'Aarav Sharma', 'IDFC1000000001', 'IDFB0000001', 'IDFC FIRST Bank', 50000.00),
(3, 'Swiggy Merchant', 'ICIC0009876543', 'ICIC0000005', 'ICICI Bank', 10000.00);

-- Transactions (Simulating realistic high-volume ledger)
INSERT INTO transactions (transaction_reference, from_account_id, to_account_id, transaction_type, payment_channel, amount, status, description, created_at) VALUES
('TXN-2026-0001', NULL, 101, 'DEPOSIT', 'NETBANKING', 50000.00, 'SUCCESS', 'Salary Credit March 2026', '2026-03-01 09:15:00'),
('TXN-2026-0002', 101, 103, 'TRANSFER', 'UPI', 12500.00, 'SUCCESS', 'Rent Payment Priya', '2026-03-02 11:30:00'),
('TXN-2026-0003', 103, 101, 'TRANSFER', 'IMPS', 2500.00, 'SUCCESS', 'Dinner Split', '2026-03-03 14:20:00'),
('TXN-2026-0004', 101, NULL, 'WITHDRAWAL', 'ATM', 10000.00, 'SUCCESS', 'Cash withdrawal Indiranagar ATM', '2026-03-05 18:45:00'),
('TXN-2026-0005', 104, 101, 'TRANSFER', 'NEFT', 75000.00, 'SUCCESS', 'Consulting invoice payment', '2026-03-07 10:00:00'),
('TXN-2026-0006', 101, 104, 'TRANSFER', 'UPI', 15000.00, 'FAILED', 'UPI Switch Timeout', '2026-03-08 16:10:00'),
('TXN-2026-0007', 106, 103, 'TRANSFER', 'RTGS', 200000.00, 'SUCCESS', 'High value asset transfer', '2026-03-09 13:00:00'),
('TXN-2026-0008', 101, 103, 'TRANSFER', 'UPI', 3500.00, 'SUCCESS', 'Utility bill share', '2026-03-10 19:22:00'),
('TXN-2026-0009', 103, NULL, 'WITHDRAWAL', 'ATM', 5000.00, 'SUCCESS', 'ATM withdrawal Koramangala', '2026-03-11 12:00:00'),
('TXN-2026-0010', 101, 103, 'TRANSFER', 'UPI', 1500.00, 'SUCCESS', 'Grocery split', '2026-03-12 10:15:00');

-- Cards
INSERT INTO cards (account_id, card_number_masked, card_type, expiry_month, expiry_year, daily_limit, is_blocked) VALUES
(101, '4111-XXXX-XXXX-8921', 'DEBIT', 8, 2028, 50000.00, 0),
(102, '5241-XXXX-XXXX-3412', 'DEBIT', 11, 2027, 100000.00, 0),
(103, '4212-XXXX-XXXX-9011', 'DEBIT', 3, 2029, 200000.00, 0),
(104, '5521-XXXX-XXXX-7722', 'CREDIT', 6, 2027, 300000.00, 0);

-- Loans
INSERT INTO loans (customer_id, loan_type, principal_amount, interest_rate, tenure_months, outstanding_amount, status, sanctioned_date) VALUES
(1, 'HOME', 5000000.00, 8.50, 240, 4780000.00, 'ACTIVE', '2024-01-15'),
(2, 'AUTO', 1200000.00, 9.25, 60, 850000.00, 'ACTIVE', '2025-05-10'),
(5, 'PERSONAL', 300000.00, 11.50, 36, 120000.00, 'ACTIVE', '2025-02-20');

-- Payments
INSERT INTO payments (customer_id, account_id, merchant_name, category, amount, status, idempotency_key, payment_date) VALUES
(1, 101, 'Amazon India', 'SHOPPING', 4299.00, 'SUCCESS', 'IDEM-AMZN-991283', '2026-03-04 15:30:00'),
(1, 101, 'BESCOM Electricity', 'UTILITIES', 2340.00, 'SUCCESS', 'IDEM-BESCOM-00129', '2026-03-06 11:10:00'),
(2, 103, 'Zomato', 'FOOD', 850.00, 'SUCCESS', 'IDEM-ZOM-883712', '2026-03-08 20:45:00'),
(3, 104, 'MakeMyTrip', 'TRAVEL', 18500.00, 'SUCCESS', 'IDEM-MMT-102938', '2026-03-10 08:30:00');
