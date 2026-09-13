import os
import subprocess
import markdown

PDF_SPECS = [
    {
        "title": "Book 1: Python & Data Structures & Algorithms",
        "subtitle": "IDFC FIRST Bank Developer Preparation | Strategic Projects",
        "filename": "PDF/01-Python-DSA.pdf",
        "files": [
            "00-FOUNDATION/complexity-analysis.md",
            "01-PYTHON/python-fundamentals.md",
            "02-DSA/arrays.md",
            "02-DSA/hashing.md",
            "02-DSA/two-pointers.md",
            "02-DSA/sliding-window.md",
            "14-CHEATSHEETS/dsa.md"
        ]
    },
    {
        "title": "Book 2: SQL & Database Management Systems",
        "subtitle": "Banking Relational Modeling, Indexing, ACID & Locking",
        "filename": "PDF/02-SQL-DBMS.pdf",
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
        "title": "Book 3: JavaScript & Node.js Runtime Internals",
        "subtitle": "V8 Engine, libuv Event Loop, Threadpool & Concurrency",
        "filename": "PDF/03-JavaScript-Node.pdf",
        "files": [
            "03-JAVASCRIPT/event-loop.md",
            "04-NODE-EXPRESS/event-loop.md",
            "14-CHEATSHEETS/node.md"
        ]
    },
    {
        "title": "Book 4: Backend Engineering & Low-Level Design",
        "subtitle": "SOLID Principles, Design Patterns & Enterprise Cross-Stack",
        "filename": "PDF/04-Backend-Engineering.pdf",
        "files": [
            "07-LOW-LEVEL-DESIGN/solid.md",
            "10-REACT/react-fundamentals.md",
            "16-JAVA/java-fundamentals.md"
        ]
    },
    {
        "title": "Book 5: Scalable Financial System Design",
        "subtitle": "Payment Switches, Distributed Ledgers & Resilient Architecture",
        "filename": "PDF/05-System-Design.pdf",
        "files": [
            "06-SYSTEM-DESIGN/system-design-fundamentals.md",
            "06-SYSTEM-DESIGN/payment-system.md",
            "14-CHEATSHEETS/system-design.md"
        ]
    },
    {
        "title": "Book 6: Banking Application Security & Compliance",
        "subtitle": "PCI-DSS, RBI Guidelines, AES-256 & OWASP Defenses",
        "filename": "PDF/06-Security.pdf",
        "files": [
            "08-SECURITY/banking-security.md"
        ]
    },
    {
        "title": "Book 7: DevOps & Cloud Infrastructure for Banking",
        "subtitle": "Docker Multi-Stage, Kubernetes & GCP Enterprise Architecture",
        "filename": "PDF/07-DevOps-Cloud.pdf",
        "files": [
            "09-DEVOPS-CLOUD/docker.md",
            "09-DEVOPS-CLOUD/gcp.md"
        ]
    },
    {
        "title": "Book 8: Indian Digital Banking Rails & FinTech",
        "subtitle": "UPI 2.0, NPCI Switch, Double-Entry Ledgers & Sagas",
        "filename": "PDF/08-Banking-FinTech.pdf",
        "files": [
            "11-BANKING-FINTECH/upi.md",
            "11-BANKING-FINTECH/transaction-processing.md"
        ]
    },
    {
        "title": "Book 9: 3+ YoE Interview Question Bank & Project Defense",
        "subtitle": "Categorized Questions, Behavioral STAR & Project Deep Dive",
        "filename": "PDF/09-Interview-Question-Bank.pdf",
        "files": [
            "12-INTERVIEW/idfc-question-bank.md",
            "12-INTERVIEW/project-deep-dive.md",
            "12-INTERVIEW/behavioral.md"
        ]
    },
    {
        "title": "Book 10: Final 24-Hour High-Yield Revision Pack",
        "subtitle": "Last-Minute Cheatsheets & Active Recall Flashcards",
        "filename": "PDF/10-Final-Revision.pdf",
        "files": [
            "14-CHEATSHEETS/dsa.md",
            "14-CHEATSHEETS/sql.md",
            "14-CHEATSHEETS/node.md",
            "14-CHEATSHEETS/system-design.md",
            "15-FLASHCARDS/flashcards.md"
        ]
    }
]

CSS = """
@page {
    size: A4;
    margin: 20mm 15mm 20mm 15mm;
    @bottom-right {
        content: counter(page);
    }
}
body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
    color: #1a202c;
    line-height: 1.6;
    font-size: 11pt;
}
.cover-page {
    page-break-after: always;
    text-align: center;
    padding-top: 150px;
}
.cover-title {
    font-size: 26pt;
    font-weight: 800;
    color: #9b1c1c; /* IDFC Maroon style */
    margin-bottom: 12px;
}
.cover-subtitle {
    font-size: 14pt;
    color: #4a5568;
    margin-bottom: 40px;
}
.cover-badge {
    display: inline-block;
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    color: #742a2a;
}
.cover-meta {
    margin-top: 80px;
    font-size: 10pt;
    color: #718096;
}
.chapter-break {
    page-break-before: always;
}
h1 {
    font-size: 18pt;
    color: #9b1c1c;
    border-bottom: 2px solid #fed7d7;
    padding-bottom: 6px;
    margin-top: 30px;
}
h2 {
    font-size: 14pt;
    color: #2d3748;
    margin-top: 24px;
    border-bottom: 1px solid #edf2f7;
    padding-bottom: 4px;
}
h3 {
    font-size: 12pt;
    color: #4a5568;
    margin-top: 18px;
}
pre {
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 10px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 9pt;
    white-space: pre-wrap;
    word-break: break-word;
    page-break-inside: avoid;
}
code {
    background-color: #edf2f7;
    padding: 2px 4px;
    border-radius: 4px;
    font-family: 'Consolas', 'Courier New', monospace;
    font-size: 9.5pt;
}
pre code {
    background-color: transparent;
    padding: 0;
}
table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
}
th, td {
    border: 1px solid #cbd5e0;
    padding: 8px 10px;
    text-align: left;
}
th {
    background-color: #edf2f7;
    font-weight: 700;
    color: #2d3748;
}
tr:nth-child(even) {
    background-color: #f7fafc;
}
blockquote {
    border-left: 4px solid #9b1c1c;
    padding: 8px 16px;
    margin: 16px 0;
    background-color: #fff5f5;
    color: #742a2a;
    border-radius: 0 6px 6px 0;
}
ul, ol {
    margin-top: 6px;
    padding-left: 22px;
}
li {
    margin-bottom: 4px;
}
"""

def generate_book(spec):
    print(f"Building: {spec['title']} -> {spec['filename']}")
    html_parts = [
        "<!DOCTYPE html>",
        "<html>",
        "<head>",
        "<meta charset='utf-8'>",
        f"<title>{spec['title']}</title>",
        f"<style>{CSS}</style>",
        "</head>",
        "<body>",
        "<div class='cover-page'>",
        f"<div class='cover-title'>{spec['title']}</div>",
        f"<div class='cover-subtitle'>{spec['subtitle']}</div>",
        "<div class='cover-badge'>IDFC FIRST Bank | Strategic Projects Developer (3+ Years Experience)</div>",
        "<div class='cover-meta'>Personalized Hinglish Interview Preparation System • Production Ready</div>",
        "</div>"
    ]

    md_extensions = ['tables', 'fenced_code']

    for idx, filepath in enumerate(spec['files']):
        if not os.path.exists(filepath):
            print(f"  Warning: {filepath} not found, skipping.")
            continue
        
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        html = markdown.markdown(content, extensions=md_extensions)
        html_parts.append(f"<div class='chapter-break'>{html}</div>")

    html_parts.append("</body></html>")
    full_html = "\n".join(html_parts)

    temp_html = spec['filename'].replace('.pdf', '.html')
    with open(temp_html, 'w', encoding='utf-8') as f:
        f.write(full_html)

    # Convert to PDF via headless chrome
    cmd = [
        'google-chrome',
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        f"--print-to-pdf={spec['filename']}",
        temp_html
    ]
    subprocess.run(cmd, check=True)
    if os.path.exists(temp_html):
        os.remove(temp_html)
    print(f"✓ Generated {spec['filename']} ({os.path.getsize(spec['filename'])} bytes)")

if __name__ == "__main__":
    os.makedirs("PDF", exist_ok=True)
    for spec in PDF_SPECS:
        generate_book(spec)
    print("\nAll 10 Interview Preparation PDFs Generated Successfully!")
