from pathlib import Path

INDEX = Path('index.html')
SCRIPT_TAG = '<script src="/kingdom-principles.js"></script>'
MARKER = '<!-- Kingdom Principles runtime override -->'

text = INDEX.read_text(encoding='utf-8')

if SCRIPT_TAG not in text:
    injection = f'\n{MARKER}\n{SCRIPT_TAG}\n'
    if '</body>' not in text:
        raise SystemExit('index.html has no closing body tag')
    text = text.replace('</body>', injection + '</body>', 1)

# Safe static metadata replacements. Runtime labels are handled by the override.
text = text.replace('<title>The Ministry — Matthew 10 Series</title>', '<title>Kingdom Principles — The Principle of Identity</title>')
text = text.replace("family=Barlow+Condensed:wght@400;600;700;800;900&amp;family=Barlow:wght@300;400;500&amp;family=Playfair+Display:ital,wght@0,400;0,700;1,400", "family=Montserrat:wght@500;600;700&amp;family=EB+Garamond:ital,wght@0,400;1,400")

INDEX.write_text(text, encoding='utf-8')
