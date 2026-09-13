"""
IDFC FIRST Bank — Banking Transaction Analytics Mini-Project
End-to-End Pipeline: Raw Data -> NumPy -> pandas -> Cleaning -> Aggregations -> Matplotlib
"""

import matplotlib
matplotlib.use('Agg') # Run in headless mode without GUI display
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

print("=" * 70)
print("🏦 IDFC FIRST BANK — TRANSACTION DATA ANALYTICS PIPELINE")
print("=" * 70)

# ----------------------------------------------------------------------
# STEP 1: LOAD & INSPECT DATA
# ----------------------------------------------------------------------
csv_file = "01-PYTHON/transactions.csv"
df = pd.read_csv(csv_file)
print(f"1. Loaded {len(df)} transactions from {csv_file}")
print(f"   Shape: {df.shape} | Columns: {list(df.columns)}")

# ----------------------------------------------------------------------
# STEP 2: DATA CLEANING & PREPROCESSING
# ----------------------------------------------------------------------
# Handle missing amounts by imputing median
missing_amounts = df["amount"].isna().sum()
if missing_amounts > 0:
    median_val = df["amount"].median()
    df["amount"] = df["amount"].fillna(median_val)
    print(f"2. Imputed {missing_amounts} missing amount values with median: ₹{median_val:.2f}")

# Handle missing merchant categories with 'UNKNOWN'
df["merchant_category"] = df["merchant_category"].fillna("UNKNOWN")

# Convert timestamp column to proper datetime
df["timestamp"] = pd.to_datetime(df["timestamp"])
df["date"] = df["timestamp"].dt.date
df = df.sort_values("timestamp").reset_index(drop=True)

# ----------------------------------------------------------------------
# STEP 3: BEGINNER ANALYTICS
# ----------------------------------------------------------------------
total_txns = len(df)
total_volume = df["amount"].sum()
avg_ticket = df["amount"].mean()
max_txn = df["amount"].max()
status_counts = df["status"].value_counts().to_dict()

print("\n--- BEGINNER ANALYTICS SUMMARY ---")
print(f"Total Transactions: {total_txns:,}")
print(f"Total Settled Volume: ₹{total_volume:,.2f}")
print(f"Average Ticket Size: ₹{avg_ticket:,.2f}")
print(f"Maximum Single Transaction: ₹{max_txn:,.2f}")
print(f"Transaction Status Breakdown: {status_counts}")

# ----------------------------------------------------------------------
# STEP 4: INTERMEDIATE ANALYTICS (GROUPBY & AGGREGATIONS)
# ----------------------------------------------------------------------
# Spend by category
category_perf = df.groupby("merchant_category").agg(
    volume=("amount", "sum"),
    txn_count=("transaction_id", "count"),
    avg_ticket=("amount", "mean")
).sort_values("volume", ascending=False)

# Failed transaction rate
failed_rate = (df["status"] == "FAILED").mean() * 100
print(f"\n--- INTERMEDIATE METRICS ---")
print(f"System-wide Failure Rate: {failed_rate:.2f}%")
print("\nTop Merchant Categories by Spend:")
print(category_perf.head(5))

# ----------------------------------------------------------------------
# STEP 5: ADVANCED ANALYTICS (FRAUD / ANOMALY DETECTION WITH NUMPY)
# ----------------------------------------------------------------------
# Anomaly Detection: Transactions > Mean + 3 * StdDev (Z-score > 3)
mean_amt = np.mean(df["amount"])
std_amt = np.std(df["amount"])
anomaly_threshold = mean_amt + (3 * std_amt)

anomalies = df[df["amount"] > anomaly_threshold]
print(f"\n--- ADVANCED FRAUD ANOMALY DETECTION ---")
print(f"Mean: ₹{mean_amt:.2f}, StdDev: ₹{std_amt:.2f}")
print(f"Statistically Flagged Anomaly Threshold: > ₹{anomaly_threshold:,.2f}")
print(f"Total Suspicious High-Value Transactions Detected: {len(anomalies)}")
if len(anomalies) > 0:
    print(anomalies[["transaction_id", "customer_id", "amount", "merchant_category", "status"]].head(5))

# ----------------------------------------------------------------------
# STEP 6: VISUALIZATION DASHBOARD (MATPLOTLIB OBJECT-ORIENTED API)
# ----------------------------------------------------------------------
fig, axes = plt.subplots(2, 2, figsize=(14, 9))
fig.suptitle("IDFC FIRST Bank — Transaction Analytics & Health Dashboard", fontsize=16, fontweight="bold", color="#9b1c1c")

# Plot 1: Daily Transaction Volume Trend
daily_volume = df.groupby("date")["amount"].sum()
axes[0, 0].plot(daily_volume.index, daily_volume.values, color="#9b1c1c", linewidth=2)
axes[0, 0].set_title("Daily Transaction Volume (₹)", fontweight="bold")
axes[0, 0].set_ylabel("Volume (₹)")
axes[0, 0].grid(True, linestyle="--", alpha=0.5)
axes[0, 0].tick_params(axis="x", rotation=30)

# Plot 2: Spend Volume by Category (Bar Chart)
axes[0, 1].bar(category_perf.index, category_perf["volume"] / 1000, color="#2b6cb0", edgecolor="black")
axes[0, 1].set_title("Total Spend by Category (in ₹ Thousands)", fontweight="bold")
axes[0, 1].set_ylabel("Volume (₹ '000)")
axes[0, 1].tick_params(axis="x", rotation=35)
axes[0, 1].grid(axis="y", linestyle="--", alpha=0.5)

# Plot 3: Status Distribution (Pie Chart)
status_colors = ["#38a169", "#e53e3e", "#dd6b20"]
axes[1, 0].pie(status_counts.values(), labels=status_counts.keys(), autopct="%1.1f%%", colors=status_colors, startangle=140)
axes[1, 0].set_title("Transaction Success vs Failure Ratio", fontweight="bold")

# Plot 4: Transaction Amount Histogram with Anomaly Cutoff
axes[1, 1].hist(df["amount"], bins=30, color="#4a5568", edgecolor="white")
axes[1, 1].axvline(anomaly_threshold, color="red", linestyle="--", linewidth=2, label=f"Anomaly Cutoff (>₹{int(anomaly_threshold):,})")
axes[1, 1].set_title("Transaction Amount Distribution", fontweight="bold")
axes[1, 1].set_xlabel("Amount (₹)")
axes[1, 1].set_ylabel("Count")
axes[1, 1].legend()

plt.tight_layout()
output_chart = "01-PYTHON/banking_analytics_dashboard.png"
fig.savefig(output_chart, dpi=300)
plt.close(fig)

print(f"\n✓ Analytics Complete! Dashboard visual saved to: {output_chart}")
print("=" * 70)
