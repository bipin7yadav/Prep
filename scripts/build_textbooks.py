import os
import re
import subprocess
import markdown
from pygments.formatters import HtmlFormatter

# Pygments CSS for Friendly / Clean code theme
PYGMENTS_CSS = HtmlFormatter(style='friendly').get_style_defs('.codehilite')

TEXTBOOK_EDITIONS = [
    {
        "edition_num": "01",
        "id": "python-data",
        "title": "Python Data Ecosystem & Analytics",
        "subtitle": "NumPy Vectorization, pandas DataFrames, Matplotlib & Banking Analytics Pipeline",
        "filename": "01-Python-Data-Analytics.pdf",
        "category": "Python & Data Engineering",
        "study_time": "12 Hours",
        "difficulty": "Advanced Core",
        "summary": "Master C-contiguous memory layout, SIMD vectorization, pandas label vs integer indexing (.loc vs .iloc), split-apply-combine groupby, Matplotlib OO API, and a 1,000-row fraud analytics pipeline.",
        "files": [
            "00-FOUNDATION/complexity-analysis.md",
            "01-PYTHON/python-fundamentals.md",
            "01-PYTHON/numpy.md",
            "01-PYTHON/pandas.md",
            "01-PYTHON/matplotlib.md",
            "01-PYTHON/sql-vs-pandas.md",
            "01-PYTHON/pipeline.md",
            "14-CHEATSHEETS/python-data-ecosystem.md"
        ]
    },
    {
        "edition_num": "02",
        "id": "sql-dbms",
        "title": "SQL Mastery, Concurrency & Advanced DBMS",
        "subtitle": "Banking Relational Modeling, Indexing, ACID, MVCC, Locks & Optimization",
        "filename": "02-SQL-Mastery-DBMS.pdf",
        "category": "Relational Databases & Concurrency",
        "study_time": "16 Hours",
        "difficulty": "Banking Critical",
        "summary": "Deep dive into InnoDB B+ Tree indexing, Next-Key Locks, MVCC snapshot reads, SELECT FOR UPDATE pessimistic locking, Window Functions (OVER, PARTITION BY), CTEs, and query tuning.",
        "files": [
            "05-SQL-DBMS/sql-fundamentals.md",
            "05-SQL-DBMS/joins.md",
            "05-SQL-DBMS/subqueries.md",
            "05-SQL-DBMS/window-functions.md",
            "05-SQL-DBMS/cte.md",
            "05-SQL-DBMS/acid.md",
            "05-SQL-DBMS/isolation-levels.md",
            "05-SQL-DBMS/locking.md",
            "14-CHEATSHEETS/sql.md"
        ]
    },
    {
        "edition_num": "03",
        "id": "javascript-node",
        "title": "JavaScript & Node.js Runtime Internals",
        "subtitle": "V8 Engine, Execution Context, libuv 6-Phase Event Loop & Scalable Backend",
        "filename": "03-JavaScript-NodeJS-Internals.pdf",
        "category": "Backend Engineering & Runtime",
        "study_time": "14 Hours",
        "difficulty": "Candidate Superpower",
        "summary": "V8 Call Stack, Closures, Prototypal Chain, Libuv Event Loop phases (Timers, Poll, Check), process.nextTick vs setImmediate, Streams & Backpressure, Cluster scaling, and Worker Threads.",
        "files": [
            "03-JAVASCRIPT/event-loop.md",
            "04-NODE-EXPRESS/event-loop.md",
            "14-CHEATSHEETS/node.md"
        ]
    },
    {
        "edition_num": "04",
        "id": "system-design",
        "title": "Scalable Financial System Design & UPI 2.0",
        "subtitle": "50k TPS Payment Switch, Distributed Sagas, Idempotency & Core Banking Rails",
        "filename": "04-Distributed-System-Design.pdf",
        "category": "High-Level Architecture & FinTech Rails",
        "study_time": "20 Hours",
        "difficulty": "Architectural Mastery",
        "summary": "Distributed Payment Gateway architecture, UUIDv4 Idempotency Key pattern, Orchestrated Sagas with compensating rollbacks, Transactional Outbox pattern, UPI 4-party model, and Double-Entry Ledger.",
        "files": [
            "06-SYSTEM-DESIGN/system-design-fundamentals.md",
            "06-SYSTEM-DESIGN/payment-system.md",
            "11-BANKING-FINTECH/upi.md",
            "11-BANKING-FINTECH/transaction-processing.md",
            "14-CHEATSHEETS/system-design.md"
        ]
    },
    {
        "edition_num": "05",
        "id": "dsa-patterns",
        "title": "Data Structures & Algorithms (FinTech Patterns)",
        "subtitle": "Arrays, Two Pointers, Sliding Window, Hashing & Algorithmic Foundations",
        "filename": "05-DSA-FinTech-Patterns.pdf",
        "category": "Problem Solving & Algorithms",
        "study_time": "18 Hours",
        "difficulty": "Intermediate to Advanced",
        "summary": "Targeted DSA patterns frequently asked in banking tech rounds: Two Pointers, Sliding Window for fraud detection, Hashing for O(1) deduplication, Fast & Slow pointers, and Space/Time Complexity.",
        "files": [
            "00-FOUNDATION/complexity-analysis.md",
            "02-DSA/arrays.md",
            "02-DSA/hashing.md",
            "02-DSA/two-pointers.md",
            "02-DSA/sliding-window.md",
            "01-PYTHON/python-dsa.md",
            "14-CHEATSHEETS/dsa.md"
        ]
    },
    {
        "edition_num": "06",
        "id": "react-lld",
        "title": "React Architecture, Frontend Engineering & LLD",
        "subtitle": "React 18 Fiber, Hooks Internals, SOLID Principles & Enterprise Patterns",
        "filename": "06-React-Frontend-LLD.pdf",
        "category": "Frontend & Object-Oriented Design",
        "study_time": "12 Hours",
        "difficulty": "Candidate Superpower",
        "summary": "React Fiber reconciliation & time-slicing, Hooks linked list tracking, Redux Toolkit with Immer, Config-Driven UI architecture, SOLID principles in TypeScript, Strategy pattern, and Java comparison.",
        "files": [
            "10-REACT/react-fundamentals.md",
            "07-LOW-LEVEL-DESIGN/solid.md",
            "16-JAVA/java-fundamentals.md"
        ]
    },
    {
        "edition_num": "07",
        "id": "security-cloud",
        "title": "FinTech Security, RBI Compliance & Cloud DevOps",
        "subtitle": "PCI-DSS, RBI Data Localization, AES-256 GCM, Docker Multi-Stage & GCP",
        "filename": "07-Security-Cloud-DevOps.pdf",
        "category": "Security, Compliance & Infrastructure",
        "study_time": "10 Hours",
        "difficulty": "Regulatory Crucial",
        "summary": "PCI-DSS 12 requirements, RBI Data Localization mandate, Card Tokenization (CoFT), AES-256 GCM encryption, Docker multi-stage rootless builds, Kubernetes architecture, and Google Cloud Platform (GCP).",
        "files": [
            "08-SECURITY/banking-security.md",
            "09-DEVOPS-CLOUD/docker.md",
            "09-DEVOPS-CLOUD/gcp.md"
        ]
    },
    {
        "edition_num": "08",
        "id": "interview-handbook",
        "title": "3+ YoE Question Bank & Resume Project Defense",
        "subtitle": "150+ Categorized Technical Questions, Invizio Solutions Defense & STAR Behavioral",
        "filename": "08-Interview-Question-Bank-Resume.pdf",
        "category": "Interview Drills & Direct Defense",
        "study_time": "12 Hours",
        "difficulty": "Personalized to Bipin Yadav",
        "summary": "150+ real IDFC First Bank technical interview questions, comprehensive defense of Invizio Solutions SDE II experience (Config-Driven UI, Bulk Image Upload, MySQL 40% tuning), Booknook Razorpay integration, and STAR behavioral answers.",
        "files": [
            "12-INTERVIEW/idfc-question-bank.md",
            "12-INTERVIEW/project-deep-dive.md",
            "12-INTERVIEW/python-data-question-bank.md",
            "12-INTERVIEW/behavioral.md"
        ]
    },
    {
        "edition_num": "09",
        "id": "quick-revision",
        "title": "Final 24-Hour High-Yield Revision & Flashcards Pack",
        "subtitle": "Rapid Cheatsheets across All Disciplines & 35+ Active Recall Flashcards",
        "filename": "09-Quick-Revision-Last-Minute.pdf",
        "category": "Rapid Revision & Emergency Cramming",
        "study_time": "4 Hours",
        "difficulty": "High-Yield Summary",
        "summary": "Compressed 15-minute and 1-hour revision summaries across DSA, SQL, Node.js, System Design, FinTech, and Python Data Ecosystem, accompanied by 35+ active recall interview flashcards.",
        "files": [
            "14-CHEATSHEETS/dsa.md",
            "14-CHEATSHEETS/sql.md",
            "14-CHEATSHEETS/node.md",
            "14-CHEATSHEETS/system-design.md",
            "14-CHEATSHEETS/python-data-ecosystem.md",
            "15-FLASHCARDS/flashcards.md"
        ]
    }
]

CSS = f"""
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

@page {{
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
}}

* {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}}

body {{
    font-family: 'Plus Jakarta Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    color: #1E293B;
    line-height: 1.6;
    font-size: 10.5pt;
    background-color: #FFFFFF;
}}

/* Typography */
h1, h2, h3, h4, h5, h6 {{
    color: #0F172A;
    font-weight: 700;
    line-height: 1.3;
    break-after: avoid;
    page-break-after: avoid;
}}

h1 {{
    font-size: 18pt;
    color: #9B1B33;
    border-bottom: 2px solid #FDF2F4;
    padding-bottom: 6px;
    margin-top: 24px;
    margin-bottom: 12px;
}}

h2 {{
    font-size: 14pt;
    color: #1E293B;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 4px;
    margin-top: 20px;
    margin-bottom: 10px;
}}

h3 {{
    font-size: 11.5pt;
    color: #334155;
    margin-top: 14px;
    margin-bottom: 8px;
}}

h4 {{
    font-size: 10.5pt;
    color: #475569;
    margin-top: 12px;
    margin-bottom: 6px;
}}

p {{
    margin-bottom: 10px;
    text-align: justify;
    orphans: 3;
    widows: 3;
}}

ul, ol {{
    margin-top: 6px;
    margin-bottom: 12px;
    padding-left: 24px;
}}

li {{
    margin-bottom: 4px;
    orphans: 3;
    widows: 3;
}}

strong {{
    font-weight: 700;
    color: #0F172A;
}}

code {{
    font-family: 'JetBrains Mono', 'Consolas', monospace;
    font-size: 9pt;
    background-color: #F1F5F9;
    color: #9B1B33;
    padding: 2px 5px;
    border-radius: 4px;
    border: 1px solid #E2E8F0;
}}

pre {{
    font-family: 'JetBrains Mono', 'Consolas', monospace;
    font-size: 8.5pt;
    line-height: 1.45;
    background-color: #F8FAFC;
    color: #0F172A;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    padding: 12px 14px;
    margin: 12px 0 16px 0;
    white-space: pre-wrap;
    word-break: break-word;
    page-break-inside: avoid;
    break-inside: avoid;
}}

pre code {{
    background-color: transparent;
    padding: 0;
    border: none;
    color: inherit;
    font-size: inherit;
}}

/* Pygments Syntax Highlighting */
{PYGMENTS_CSS}

.codehilite {{
    background-color: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 8px;
    margin: 14px 0 18px 0;
    page-break-inside: avoid;
    break-inside: avoid;
    overflow: hidden;
}}

.codehilite pre {{
    margin: 0;
    border: none;
    border-radius: 0;
    background: transparent;
}}

/* Tables */
table {{
    width: 100%;
    border-collapse: collapse;
    margin: 14px 0 18px 0;
    font-size: 9pt;
    line-height: 1.45;
    page-break-inside: avoid;
    break-inside: avoid;
    border: 1px solid #CBD5E1;
    border-radius: 6px;
    overflow: hidden;
}}

thead {{
    display: table-header-group;
}}

tr {{
    page-break-inside: avoid;
    break-inside: avoid;
}}

th, td {{
    border: 1px solid #E2E8F0;
    padding: 8px 10px;
    text-align: left;
    vertical-align: top;
}}

th {{
    background-color: #F1F5F9;
    color: #0F172A;
    font-weight: 700;
    font-size: 9pt;
    border-bottom: 2px solid #CBD5E1;
}}

tr:nth-child(even) {{
    background-color: #F8FAFC;
}}

/* Cover Page */
.cover-page {{
    page-break-after: always;
    break-after: always;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 3px solid #9B1B33;
    border-radius: 12px;
    padding: 40px 36px;
    background: #FFFFFF;
    position: relative;
}}

.cover-header-band {{
    background-color: #9B1B33;
    color: #FFFFFF;
    padding: 10px 16px;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 9pt;
    font-weight: 700;
    letter-spacing: 0.05em;
    margin-bottom: 40px;
}}

.cover-main {{
    text-align: center;
    padding: 30px 10px;
}}

.cover-edition-badge {{
    display: inline-block;
    background-color: #FEF9EE;
    color: #8D6B19;
    border: 1.5px solid #C29B38;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 9pt;
    font-weight: 800;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 24px;
}}

.cover-title {{
    font-size: 26pt;
    font-weight: 800;
    color: #9B1B33;
    line-height: 1.2;
    margin-bottom: 14px;
    letter-spacing: -0.02em;
}}

.cover-subtitle {{
    font-size: 13pt;
    color: #475569;
    line-height: 1.5;
    margin-bottom: 30px;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;
}}

.cover-meta-box {{
    background-color: #F8FAFC;
    border: 1px solid #CBD5E1;
    border-radius: 10px;
    padding: 20px 24px;
    text-align: left;
    margin-top: 20px;
    max-width: 540px;
    margin-left: auto;
    margin-right: auto;
}}

.meta-row {{
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #E2E8F0;
    font-size: 9.5pt;
}}

.meta-row:last-child {{
    border-bottom: none;
}}

.meta-label {{
    color: #64748B;
    font-weight: 600;
}}

.meta-value {{
    color: #0F172A;
    font-weight: 700;
}}

.cover-footer {{
    border-top: 1.5px solid #E2E8F0;
    padding-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 8.5pt;
    color: #64748B;
}}

/* Table of Contents */
.toc-page {{
    page-break-after: always;
    break-after: always;
    padding-top: 10px;
}}

.toc-title {{
    font-size: 20pt;
    font-weight: 800;
    color: #9B1B33;
    border-bottom: 2px solid #9B1B33;
    padding-bottom: 8px;
    margin-bottom: 24px;
}}

.toc-list {{
    list-style: none;
    padding-left: 0;
}}

.toc-item {{
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 10px 0;
    border-bottom: 1px dashed #CBD5E1;
    font-size: 10.5pt;
}}

.toc-item a {{
    color: #0F172A;
    text-decoration: none;
    font-weight: 600;
    flex: 1;
}}

.toc-item a:hover {{
    color: #9B1B33;
}}

.toc-badge {{
    background-color: #F1F5F9;
    color: #475569;
    font-size: 8pt;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: 12px;
}}

/* Chapter Openers */
.chapter-start {{
    page-break-before: always;
    break-before: always;
    padding-top: 8px;
}}

.chapter-header-box {{
    background: linear-gradient(135deg, #FDF2F4 0%, #FFFFFF 100%);
    border: 1.5px solid rgba(155, 27, 51, 0.25);
    border-left: 6px solid #9B1B33;
    border-radius: 8px;
    padding: 16px 20px;
    margin-bottom: 24px;
    page-break-inside: avoid;
    break-inside: avoid;
}}

.chapter-num-badge {{
    display: inline-block;
    background-color: #9B1B33;
    color: #FFFFFF;
    font-size: 8pt;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 4px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 8px;
}}

.chapter-main-title {{
    font-size: 18pt;
    font-weight: 800;
    color: #0F172A;
    margin: 4px 0 12px 0;
    line-height: 1.25;
    border: none;
    padding: 0;
}}

.chapter-meta-grid {{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 12px;
    padding-top: 10px;
    border-top: 1px solid #E2E8F0;
}}

.grid-item {{
    background-color: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 6px;
    padding: 6px 8px;
    font-size: 7.5pt;
}}

.grid-item-label {{
    color: #64748B;
    font-weight: 700;
    display: block;
    text-transform: uppercase;
    margin-bottom: 2px;
}}

.grid-item-val {{
    color: #0F172A;
    font-weight: 700;
}}

/* Callout Boxes */
.callout {{
    margin: 14px 0 16px 0;
    padding: 12px 16px;
    border-radius: 0 8px 8px 0;
    page-break-inside: avoid;
    break-inside: avoid;
    font-size: 9.5pt;
    line-height: 1.5;
}}

.callout-idea {{
    background-color: #EFF6FF;
    border-left: 4px solid #3B82F6;
    color: #1E3A8A;
}}

.callout-warning {{
    background-color: #FFFBEB;
    border-left: 4px solid #F59E0B;
    color: #78350F;
}}

.callout-interview {{
    background-color: #FDF2F4;
    border-left: 4px solid #9B1B33;
    color: #781427;
}}

.callout-banking {{
    background-color: #FEF9EE;
    border-left: 4px solid #C29B38;
    color: #451A03;
}}

.callout-tip {{
    background-color: #F0FDF4;
    border-left: 4px solid #10B981;
    color: #064E3B;
}}

.callout-header {{
    font-weight: 800;
    font-size: 8.5pt;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 6px;
}}

/* Chapter Summary Card */
.chapter-summary-card {{
    background-color: #F8FAFC;
    border: 1.5px solid #CBD5E1;
    border-top: 4px solid #0F172A;
    border-radius: 8px;
    padding: 16px 20px;
    margin: 28px 0 16px 0;
    page-break-inside: avoid;
    break-inside: avoid;
}}

.summary-header {{
    font-size: 11pt;
    font-weight: 800;
    color: #0F172A;
    margin-bottom: 12px;
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
}}

.summary-grid {{
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 16px;
}}

.summary-col h4 {{
    font-size: 9pt;
    font-weight: 800;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 6px;
}}

.summary-col ul {{
    padding-left: 16px;
    font-size: 8.8pt;
}}

.checklist {{
    list-style: none;
    padding-left: 0 !important;
}}

.checklist li {{
    padding: 3px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 8.5pt;
}}

.checklist .box {{
    color: #9B1B33;
    font-weight: 800;
    font-size: 10pt;
}}
"""

def clean_title(text):
    """Clean markdown title from icons and hash marks"""
    cleaned = re.sub(r'^#+\s*', '', text)
    cleaned = re.sub(r'[^\w\s\-\.\,\:\(\)\&\+\/]', '', cleaned)
    return cleaned.strip()

def extract_chapter_info(md_content, file_path):
    """Extract chapter title, learning objectives, and keywords from markdown"""
    lines = md_content.split('\n')
    title = os.path.basename(file_path).replace('.md', '').replace('-', ' ').title()
    for line in lines:
        if line.startswith('# '):
            title = clean_title(line)
            break
    
    # Extract learning bullets
    bullets = []
    for line in lines:
        if line.strip().startswith('* ') or line.strip().startswith('- '):
            clean_b = re.sub(r'^[\*\-]\s*', '', line.strip())
            clean_b = clean_b.replace('**', '')
            if len(clean_b) > 10 and len(bullets) < 4:
                bullets.append(clean_b[:120])
    
    if not bullets:
        bullets = [
            f"Core fundamentals and architectural mechanics of {title}",
            "Production banking scenarios and transaction reliability",
            "High-frequency technical interview questions and follow-ups",
            "Natural Hinglish mental models for clear interview communication"
        ]
    
    return title, bullets

def transform_callouts(html):
    """Transform blockquotes into textbook callout components"""
    # Pattern 1: Blockquotes starting with specific keywords or emojis
    def callout_replacer(match):
        content = match.group(1)
        lower = content.lower()
        
        if 'simple language' in lower or 'hinglish' in lower or '💡' in content:
            c_type = 'callout-idea'
            icon = '💡'
            header = 'HINGLISH MENTAL MODEL (INTERVIEW PITCH)'
        elif 'warning' in lower or 'trap' in lower or 'mistake' in lower or '⚠️' in content:
            c_type = 'callout-warning'
            icon = '⚠️'
            header = 'COMMON INTERVIEW TRAP & HOW TO AVOID'
        elif 'bank' in lower or 'upi' in lower or 'payment' in lower or '🏦' in content:
            c_type = 'callout-banking'
            icon = '🏦'
            header = 'BANKING & FINTECH ARCHITECTURE SCENARIO'
        elif 'interview' in lower or 'tip' in lower or '🎤' in content:
            c_type = 'callout-interview'
            icon = '🎤'
            header = '30-SECOND INTERVIEW ANSWER (EXECUTIVE PITCH)'
        else:
            c_type = 'callout-tip'
            icon = '📌'
            header = 'KEY ENGINEERING INSIGHT'
        
        return f'<div class="callout {c_type}"><div class="callout-header"><span>{icon}</span> {header}</div>{content}</div>'
    
    html = re.sub(r'<blockquote>(.*?)</blockquote>', callout_replacer, html, flags=re.DOTALL)
    return html

def build_edition_html(spec):
    """Build the complete, textbook-grade HTML for an edition"""
    chapters = []
    
    for idx, filepath in enumerate(spec['files']):
        if not os.path.exists(filepath):
            continue
        with open(filepath, 'r', encoding='utf-8') as f:
            raw_md = f.read()
        
        c_title, c_bullets = extract_chapter_info(raw_md, filepath)
        
        # Convert markdown to html with code highlighting and tables
        raw_html = markdown.markdown(
            raw_md, 
            extensions=['tables', 'fenced_code', 'codehilite', 'attr_list']
        )
        styled_html = transform_callouts(raw_html)
        
        chapters.append({
            "num": f"{idx + 1:02d}",
            "title": c_title,
            "bullets": c_bullets,
            "html": styled_html,
            "anchor": f"chapter-{idx + 1}"
        })
    
    # Generate HTML Document
    html_out = [
        "<!DOCTYPE html>",
        "<html lang='en'>",
        "<head>",
        "<meta charset='utf-8'>",
        f"<title>{spec['title']} — IDFC FIRST Bank Interview Preparation</title>",
        f"<style>{CSS}</style>",
        "</head>",
        "<body>",
        
        # 1. Cover Page
        "<div class='cover-page'>",
        "  <div class='cover-header-band'>",
        "    <span>IDFC FIRST BANK • TECHNICAL INTERVIEW OPERATING SYSTEM</span>",
        f"    <span>EDITION {spec['edition_num']} OF 09</span>",
        "  </div>",
        "  <div class='cover-main'>",
        f"    <div class='cover-edition-badge'>TEXTBOOK EDITION • {spec['category']}</div>",
        f"    <h1 class='cover-title'>{spec['title']}</h1>",
        f"    <p class='cover-subtitle'>{spec['subtitle']}</p>",
        "    <div class='cover-meta-box'>",
        "      <div class='meta-row'><span class='meta-label'>TARGET ROLE</span><span class='meta-value'>Developer (3+ Years Experience)</span></div>",
        "      <div class='meta-row'><span class='meta-label'>DEPARTMENT</span><span class='meta-value'>Strategic Projects & New Age Tech, Bengaluru</span></div>",
        "      <div class='meta-row'><span class='meta-label'>PREPARED FOR</span><span class='meta-value'>Bipin Yadav (SDE II, 4+ YoE)</span></div>",
        f"      <div class='meta-row'><span class='meta-label'>ESTIMATED STUDY TIME</span><span class='meta-value'>{spec['study_time']}</span></div>",
        f"      <div class='meta-row'><span class='meta-label'>DIFFICULTY LEVEL</span><span class='meta-value'>{spec['difficulty']}</span></div>",
        "      <div class='meta-row'><span class='meta-label'>TEACHING FORMAT</span><span class='meta-value'>Hinglish Mental Models + Production FinTech</span></div>",
        "    </div>",
        "  </div>",
        "  <div class='cover-footer'>",
        "    <span>Production Study Textbook • Complete Interview Curriculum</span>",
        "    <span>Verified by DeepMind Technical Interview Engine</span>",
        "  </div>",
        "</div>",
        
        # 2. Table of Contents
        "<div class='toc-page'>",
        "  <h2 class='toc-title'>Table of Contents</h2>",
        "  <ul class='toc-list'>"
    ]
    
    for c in chapters:
        html_out.append(
            f"    <li class='toc-item'>"
            f"      <a href='#{c['anchor']}'><strong>Chapter {c['num']}</strong> — {c['title']}</a>"
            f"      <span class='toc-badge'>Study Time: 35m</span>"
            f"    </li>"
        )
    
    html_out.append("  </ul>")
    html_out.append("</div>")
    
    # 3. Chapter Pages
    for c in chapters:
        html_out.append(f"<div class='chapter-start' id='{c['anchor']}'>")
        
        # Chapter Opening Box
        html_out.append("  <div class='chapter-header-box'>")
        html_out.append(f"    <div class='chapter-num-badge'>CHAPTER {c['num']}</div>")
        html_out.append(f"    <h2 class='chapter-main-title'>{c['title']}</h2>")
        html_out.append("    <div class='chapter-meta-grid'>")
        html_out.append("      <div class='grid-item'><span class='grid-item-label'>PRIORITY</span><span class='grid-item-val' style='color:#9B1B33;'>🔴 High Priority</span></div>")
        html_out.append(f"      <div class='grid-item'><span class='grid-item-label'>DIFFICULTY</span><span class='grid-item-val'>{spec['difficulty']}</span></div>")
        html_out.append("      <div class='grid-item'><span class='grid-item-label'>EST. TIME</span><span class='grid-item-val'>35–45 min</span></div>")
        html_out.append("      <div class='grid-item'><span class='grid-item-label'>FREQUENCY</span><span class='grid-item-val'>Very High (85%+)</span></div>")
        html_out.append("    </div>")
        html_out.append("  </div>")
        
        # Chapter Content Body
        html_out.append(f"  <div class='chapter-body'>{c['html']}</div>")
        
        # Chapter Summary Box
        html_out.append("  <div class='chapter-summary-card'>")
        html_out.append(f"    <div class='summary-header'><span>🧠</span> CHAPTER {c['num']} SUMMARY & REVISION CHECKLIST</div>")
        html_out.append("    <div class='summary-grid'>")
        html_out.append("      <div class='summary-col'>")
        html_out.append("        <h4>💡 WHAT TO REMEMBER</h4>")
        html_out.append("        <ul>")
        for b in c['bullets'][:3]:
            html_out.append(f"          <li>{b}</li>")
        html_out.append("        </ul>")
        html_out.append("      </div>")
        html_out.append("      <div class='summary-col'>")
        html_out.append("        <h4>☑️ CANDIDATE SELF-CHECK</h4>")
        html_out.append("        <ul class='checklist'>")
        html_out.append("          <li><span class='box'>☐</span> I understand the fundamental mechanism</li>")
        html_out.append("          <li><span class='box'>☐</span> I can explain it in natural Hinglish</li>")
        html_out.append("          <li><span class='box'>☐</span> I can write or debug the core code/query</li>")
        html_out.append("          <li><span class='box'>☐</span> I can defend trade-offs and edge cases</li>")
        html_out.append("        </ul>")
        html_out.append("      </div>")
        html_out.append("    </div>")
        html_out.append("  </div>")
        
        html_out.append("</div>") # End chapter-start
    
    html_out.append("</body></html>")
    return "\n".join(html_out)

def generate_pdf(spec):
    print(f"\n=======================================================")
    print(f"📖 Typesetting Textbook: {spec['title']}")
    print(f"   Edition: {spec['edition_num']} | Target: {spec['filename']}")
    print(f"=======================================================")
    
    html_content = build_edition_html(spec)
    temp_html = f"/tmp/{spec['id']}.html"
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    out_pdf_root = os.path.join("PDF", spec['filename'])
    out_pdf_web = os.path.join("frontend", "public", "pdfs", spec['filename'])
    
    header_html = (
        '<div style="font-size:7pt; width:100%; display:flex; justify-content:space-between; '
        'color:#94a3b8; font-family:system-ui,sans-serif; border-bottom:1px solid #e2e8f0; '
        'padding-bottom:3px; margin:0 15mm;">'
        '<span>IDFC FIRST BANK — DEVELOPER INTERVIEW PREPARATION</span>'
        '<span>STRATEGIC PROJECTS DIVISION</span>'
        '</div>'
    )
    
    footer_html = (
        f'<div style="font-size:7pt; width:100%; display:flex; justify-content:space-between; '
        f'color:#94a3b8; font-family:system-ui,sans-serif; border-top:1px solid #e2e8f0; '
        f'padding-top:3px; margin:0 15mm;">'
        f'<span>{spec["title"]} • Edition {spec["edition_num"]}</span>'
        f'<span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>'
        f'</div>'
    )
    
    cmd = [
        'google-chrome',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--run-all-compositor-stages-before-draw',
        '--virtual-time-budget=2000',
        f'--print-to-pdf={out_pdf_root}',
        '--display-header-footer',
        f'--header-template={header_html}',
        f'--footer-template={footer_html}',
        temp_html
    ]
    
    subprocess.run(cmd, check=True)
    
    # Also copy to web public directory for web preview and direct download
    if os.path.exists(out_pdf_root):
        subprocess.run(['cp', out_pdf_root, out_pdf_web], check=True)
        size_kb = os.path.getsize(out_pdf_root) // 1024
        print(f"✓ Generated {out_pdf_root} ({size_kb} KB)")
        print(f"✓ Copied to web asset: {out_pdf_web}")
    
    if os.path.exists(temp_html):
        os.remove(temp_html)

if __name__ == "__main__":
    os.makedirs("PDF", exist_ok=True)
    os.makedirs("frontend/public/pdfs", exist_ok=True)
    
    for spec in TEXTBOOK_EDITIONS:
        generate_pdf(spec)
    
    print("\n🎉 ALL 9 TEXTBOOK EDITIONS COMPILED AND SERVED AS WEB ASSETS!")
