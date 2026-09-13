#!/usr/bin/env python3
"""
Sanitize raw LaTeX dollar-sign math formatting across Markdown documents into clean,
human-readable Unicode text suitable for textbook reading, PDFs, and web UI.
"""

import os
import glob
import re

def clean_math_expression(inner: str) -> str:
    inner = inner.strip()
    # Summations
    inner = re.sub(r"\\sum_\{([^}]+)\}\^\{([^}]+)\}", r"Σ(\1 to \2)", inner)
    inner = re.sub(r"\\sum_\{([^}]+)\}", r"Σ(\1)", inner)
    inner = re.sub(r"\\sum\b", "Σ", inner)
    
    # Fractions & Roots
    inner = re.sub(r"\\frac\{([^\}]+)\}\{([^\}]+)\}", r"\1 / \2", inner)
    inner = re.sub(r"\\sqrt\{([^\}]+)\}", r"√(\1)", inner)
    
    # Text and Modulo
    inner = re.sub(r"\\text\{([^\}]+)\}", r"\1", inner)
    inner = re.sub(r"\\pmod\s*\{?([^}\s\$\)]+)\}?", r"mod \1", inner)
    inner = re.sub(r"\\pmod\b", "mod", inner)
    inner = re.sub(r"\bpmod\b", "mod", inner)
    
    # Math functions and relations
    inner = re.sub(r"\\log\b", "log", inner)
    inner = re.sub(r"\\approx\b", "≈", inner)
    inner = re.sub(r"\\le\b|\\leq\b", "≤", inner)
    inner = re.sub(r"\\ge\b|\\geq\b", "≥", inner)
    inner = re.sub(r"\\times\b", "*", inner)
    inner = re.sub(r"\\cdot\b", "*", inner)
    inner = re.sub(r"\\ne\b|\\neq\b", "≠", inner)
    inner = re.sub(r"\\in\b", "∈", inner)
    inner = re.sub(r"\\notin\b", "∉", inner)
    inner = re.sub(r"\\to\b", "→", inner)
    inner = re.sub(r"\\implies\b", "⟹", inner)
    inner = re.sub(r"\\Omega\b", "Ω", inner)
    inner = re.sub(r"\\Theta\b", "Θ", inner)
    inner = re.sub(r"\\Delta\b", "Δ", inner)
    inner = re.sub(r"\\Phi\b", "Φ", inner)
    inner = re.sub(r"\\dots\b|\\cdots\b|\\ldots\b", "...", inner)
    inner = re.sub(r"\\%", "%", inner)
    
    # Powers and Subscripts
    inner = re.sub(r"\^2\b", "²", inner)
    inner = re.sub(r"\^3\b", "³", inner)
    inner = re.sub(r"\^k\b", "^k", inner)
    inner = re.sub(r"_1\b", "₁", inner)
    inner = re.sub(r"_2\b", "₂", inner)
    inner = re.sub(r"_i\b", "ᵢ", inner)
    inner = re.sub(r"_\{([^\}]+)\}", r"_\1", inner)
    inner = re.sub(r"\\_", "_", inner)
    
    # Remaining latex commands
    inner = re.sub(r"\\([a-zA-Z]+)", r"\1", inner)
    inner = inner.replace("\\", "")
    
    return inner.strip()

def sanitize_markdown_text(text: str) -> str:
    # Split text into code blocks / inline code vs regular markdown text
    # Code tokens must not be modified
    token_pattern = re.compile(r"(```[\s\S]*?```|`[^`\n]+`)")
    parts = token_pattern.split(text)
    
    for i in range(0, len(parts), 2):
        chunk = parts[i]
        
        # 1. Multi-line display math: $$ ... $$
        def display_replacer(m):
            return clean_math_expression(m.group(1))
        chunk = re.sub(r"\$\$([^\$]+?)\$\$", display_replacer, chunk, flags=re.DOTALL)
        
        # 2. Inline math: $ ... $ (ignoring JS template literals ${...} or escaped \$)
        def inline_replacer(m):
            math_content = m.group(1)
            # If it looks like a price or plain dollar without math, check if it has math characters
            return clean_math_expression(math_content)
            
        chunk = re.sub(r"(?<!\\)\$(?!\s|{)([^\$\n`]+?)(?<!\s)\$", inline_replacer, chunk)
        
        parts[i] = chunk
        
    return "".join(parts)

def process_all_markdown_files(root_dir: str):
    md_files = glob.glob(os.path.join(root_dir, "**", "*.md"), recursive=True)
    md_files = [f for f in md_files if "node_modules" not in f and ".git" not in f]
    
    modified_count = 0
    total_dollar_fixes = 0
    
    for fpath in md_files:
        with open(fpath, "r", encoding="utf-8") as fp:
            original = fp.read()
            
        cleaned = sanitize_markdown_text(original)
        if cleaned != original:
            with open(fpath, "w", encoding="utf-8") as fp:
                fp.write(cleaned)
            modified_count += 1
            print(f"✓ Cleaned math formatting in: {os.path.relpath(fpath, root_dir)}")
            
    print(f"\nCompleted! Cleaned math formatting across {modified_count} markdown files.")

if __name__ == "__main__":
    repo_root = "/home/bipin/Desktop/BankInterview"
    process_all_markdown_files(repo_root)
