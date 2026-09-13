import os
import glob
import re
import json
import markdown

DOMAIN_MAP = {
    "00-FOUNDATION": "Foundations & Complexity",
    "01-PYTHON": "Python & Data Ecosystem",
    "02-DSA": "Data Structures & Algorithms",
    "03-JAVASCRIPT": "JavaScript & V8 Internals",
    "04-NODE-EXPRESS": "Node.js & Backend Architecture",
    "05-SQL-DBMS": "SQL & Advanced DBMS",
    "06-SYSTEM-DESIGN": "Distributed System Design",
    "07-LOW-LEVEL-DESIGN": "Low-Level Design & SOLID",
    "08-SECURITY": "FinTech Security & RBI Compliance",
    "09-DEVOPS-CLOUD": "DevOps, Containers & Cloud",
    "10-REACT": "React.js & Frontend Architecture",
    "11-BANKING-FINTECH": "Banking Rails & Protocols",
    "12-INTERVIEW": "Interview Questions & Project Defense",
    "14-CHEATSHEETS": "High-Yield Cheatsheets",
    "15-FLASHCARDS": "Active Recall Flashcards",
    "16-JAVA": "Java Enterprise Ecosystem"
}

PRIORITY_MAP = {
    "01-PYTHON/numpy.md": "🔴 Must Know",
    "01-PYTHON/pandas.md": "🔴 Must Know",
    "01-PYTHON/matplotlib.md": "🟠 High Priority",
    "01-PYTHON/pipeline.md": "🔴 Must Know",
    "02-DSA/sliding-window.md": "🔴 Must Know",
    "02-DSA/two-pointers.md": "🔴 Must Know",
    "02-DSA/hashing.md": "🔴 Must Know",
    "03-JAVASCRIPT/event-loop.md": "🔴 Must Know",
    "04-NODE-EXPRESS/event-loop.md": "🔴 Must Know",
    "05-SQL-DBMS/window-functions.md": "🔴 Must Know",
    "05-SQL-DBMS/acid.md": "🔴 Must Know",
    "05-SQL-DBMS/locking.md": "🔴 Must Know",
    "05-SQL-DBMS/isolation-levels.md": "🔴 Must Know",
    "06-SYSTEM-DESIGN/payment-system.md": "🔴 Must Know",
    "10-REACT/react-fundamentals.md": "🔴 Must Know",
    "11-BANKING-FINTECH/upi.md": "🔴 Must Know",
    "12-INTERVIEW/project-deep-dive.md": "🔴 Must Know",
    "12-INTERVIEW/idfc-question-bank.md": "🔴 Must Know"
}

def clean_title(text):
    cleaned = re.sub(r'^#+\s*', '', text)
    cleaned = re.sub(r'[^\w\s\-\.\,\:\(\)\&\+\/]', '', cleaned)
    return cleaned.strip()

def transform_callouts(html):
    def callout_replacer(match):
        content = match.group(1)
        lower = content.lower()
        if 'simple language' in lower or 'hinglish' in lower or '💡' in content:
            c_type = 'callout-idea'
            icon = '💡'
            header = 'HINGLISH MENTAL MODEL'
        elif 'warning' in lower or 'trap' in lower or 'mistake' in lower or '⚠️' in content:
            c_type = 'callout-warning'
            icon = '⚠️'
            header = 'COMMON INTERVIEW TRAP'
        elif 'bank' in lower or 'upi' in lower or 'payment' in lower or '🏦' in content:
            c_type = 'callout-banking'
            icon = '🏦'
            header = 'BANKING & FINTECH SCENARIO'
        elif 'interview' in lower or 'tip' in lower or '🎤' in content:
            c_type = 'callout-interview'
            icon = '🎤'
            header = '30-SECOND INTERVIEW ANSWER'
        else:
            c_type = 'callout-tip'
            icon = '📌'
            header = 'KEY ENGINEERING INSIGHT'
        return f'<div class="callout {c_type}"><div class="callout-header"><span>{icon}</span> {header}</div><div class="callout-body">{content}</div></div>'
    return re.sub(r'<blockquote>(.*?)</blockquote>', callout_replacer, html, flags=re.DOTALL)

def bundle_all_markdown():
    root_dir = "/home/bipin/Desktop/BankInterview"
    md_files = sorted(glob.glob(os.path.join(root_dir, "*", "*.md")))
    # Also add root roadmaps
    for root_md in ["00-MASTER-ROADMAP.md", "01-DAILY-PLAN.md", "02-PROGRESS-TRACKER.md"]:
        p = os.path.join(root_dir, root_md)
        if os.path.exists(p):
            md_files.append(p)
            
    print(f"Found {len(md_files)} markdown files to bundle.")
    
    lessons = []
    
    for fpath in md_files:
        rel_path = os.path.relpath(fpath, root_dir)
        with open(fpath, 'r', encoding='utf-8') as f:
            raw_text = f.read()
            
        parts = rel_path.split(os.sep)
        folder = parts[0] if len(parts) > 1 else "ROADMAPS"
        filename = parts[-1]
        
        # Determine ID and Domain
        lesson_id = rel_path.replace(os.sep, '-').replace('.md', '').lower()
        domain = DOMAIN_MAP.get(folder, "Roadmaps & Trackers")
        
        # Extract title
        title = filename.replace('.md', '').replace('-', ' ').title()
        headings = []
        for line in raw_text.split('\n'):
            if line.startswith('# '):
                title = clean_title(line)
                break
            elif line.startswith('## ') or line.startswith('### '):
                h_text = clean_title(line)
                if len(h_text) > 2 and h_text not in headings:
                    headings.append(h_text)
                    
        # Estimate read time (avg 200 words per min)
        words = len(raw_text.split())
        read_time_min = max(5, round(words / 180))
        read_time = f"{read_time_min} min"
        
        # Determine Priority & Difficulty
        priority = PRIORITY_MAP.get(rel_path, "🟠 High Priority" if "CHEATSHEET" not in rel_path else "🟡 Good to Know")
        difficulty = "Advanced" if any(w in rel_path for w in ["locking", "acid", "payment", "pipeline", "solid", "security"]) else "Intermediate"
        
        # Extract Hinglish pitch or summary
        summary = ""
        quotes = re.findall(r'>\s*["\']?(.*?)["\']?\n', raw_text)
        if quotes:
            summary = quotes[0].strip()
        if not summary or len(summary) < 20:
            summary = f"Comprehensive deep dive into {title} covering architecture, implementation details, and banking interview scenarios."
            
        # Convert Markdown to HTML with code highlighting & tables
        html = markdown.markdown(
            raw_text,
            extensions=['tables', 'fenced_code', 'codehilite', 'attr_list']
        )
        html = transform_callouts(html)
        
        lessons.append({
            "id": lesson_id,
            "filePath": rel_path,
            "folder": folder,
            "filename": filename,
            "title": title,
            "domain": domain,
            "readTime": read_time,
            "priority": priority,
            "difficulty": difficulty,
            "summary": summary[:280],
            "headings": headings[:8],
            "wordCount": words,
            "html": html
        })
        
    # Write to frontend/src/data/lessonsContent.js
    out_file = os.path.join(root_dir, "frontend", "src", "data", "lessonsContent.js")
    
    # We output valid JS
    js_content = "/* Auto-generated lesson content bundle - All 45+ Markdown documents */\n\n"
    js_content += f"export const LESSONS_COUNT = {len(lessons)};\n\n"
    js_content += "export const LESSONS_CONTENT = " + json.dumps(lessons, indent=2) + ";\n\n"
    js_content += "export const LESSONS_BY_ID = Object.fromEntries(LESSONS_CONTENT.map(l => [l.id, l]));\n"
    
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(js_content)
        
    out_size_mb = round(os.path.getsize(out_file) / (1024 * 1024), 2)
    print(f"✓ Successfully compiled {len(lessons)} lessons into {out_file} ({out_size_mb} MB)")

if __name__ == "__main__":
    bundle_all_markdown()
