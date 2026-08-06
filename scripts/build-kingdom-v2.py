from __future__ import annotations

from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
RUNTIME = ROOT / "kingdom-v2.js"


def replace_all(text: str, replacements: dict[str, str]) -> str:
    for old, new in replacements.items():
        text = text.replace(old, new)
    return text


def validate_runtime() -> None:
    runtime = RUNTIME.read_text(encoding="utf-8")

    # Fail the deployment before a browser sees malformed JavaScript.
    subprocess.run(["node", "--check", str(RUNTIME)], check=True)

    expected_markers = [
        "const SLIDES = [",
        "const POLLS = [",
        "const QUESTIONS_DATA = [",
        "The Principle of Identity",
        "Pressure #",
        "Weekly Practice",
        "Closing Reflection",
    ]
    for marker in expected_markers:
        if marker not in runtime:
            raise RuntimeError(f"runtime is missing marker: {marker}")

    slide_count = runtime.count("      t:")
    if slide_count != 22:
        raise RuntimeError(f"expected 22 lesson slides, found {slide_count}")

    if "The Ministry" in runtime or "THE MINISTRY" in runtime:
        raise RuntimeError("legacy series branding exists in the Kingdom runtime")


def main() -> None:
    validate_runtime()
    source = INDEX.read_text(encoding="utf-8")

    # The branch starts from the untouched full-featured presentation app.
    # These replacements remove the old series identity before the browser parses it.
    source = replace_all(
        source,
        {
            "The Ministry — Matthew 10 Series": "Kingdom Principles — The Principle of Identity",
            "THE MINISTRY": "KINGDOM PRINCIPLES",
            "The Ministry": "Kingdom Principles",
            "the-ministry": "kingdom-principles",
            "MINISTRY2026": "KINGDOM2026",
            "ministry2026": "kingdom2026",
            "assets/ministry-bg.jpeg": "assets/kingdom-bg.svg",
            "assets/qr-ministry.png": "assets/qr-kingdom.svg",
            "assets/qr-guide.png": "assets/qr-guide-gold.svg",
            "Called Close. Sent Far.": "Identity Before Pressure.",
            "CALLED CLOSE. SENT FAR.": "IDENTITY BEFORE PRESSURE.",
            "A MATTHEW CHAPTER 10 SERIES": "KINGDOM DECISIONS SERIES",
            "A Matthew Chapter 10 Series": "Kingdom Decisions Series",
            "Matthew 10 Series": "Kingdom Decisions Series",
            "The Price of Being Sent": "The Principle of Identity",
            "THE PRICE OF BEING SENT": "THE PRINCIPLE OF IDENTITY",
            "The Discipline of the Sent": "Priority",
            "THE DISCIPLINE OF THE SENT": "PRIORITY",
            "The Making of a Minister": "Alignment",
            "THE MAKING OF A MINISTER": "ALIGNMENT",
            "What It Takes to Make It": "Coming Soon",
            "WHAT IT TAKES TO MAKE IT": "COMING SOON",
            "The Five Outcomes of Ministry": "Coming Soon",
            "THE FIVE OUTCOMES OF MINISTRY": "COMING SOON",
            "Ministry does not begin with a platform. It begins with a call.": "Identity must be settled before pressure comes.",
            "Every action has a reaction.": "Identity must be settled before pressure comes.",
            "Matthew 10:1-10": "Matthew 3:13-17 · Matthew 4:1-11",
            "June 18, 2026": "August 6, 2026",
            "June 18": "August 6",
            "#E8180D": "#D6A63B",
            "#e8180d": "#D6A63B",
            "#C41409": "#B8872E",
            "#c41409": "#B8872E",
            "#D4933B": "#D6A63B",
            "232,24,13": "214,166,59",
            "232, 24, 13": "214, 166, 59",
        },
    )

    # Replace the original font request with the approved series typography.
    source = re.sub(
        r'<link href="https://fonts\.googleapis\.com/css2\?family=Bebas\+Neue[^>]+>',
        '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=EB+Garamond:ital,wght@0,400;1,400&family=Montserrat:wght@500;600;700&display=swap" rel="stylesheet"/>',
        source,
        count=1,
    )

    css_tag = '<link href="/kingdom-v2.css" rel="stylesheet" id="kingdom-v2-css"/>'
    js_tag = '<script src="/kingdom-v2.js" id="kingdom-v2-js"></script>'

    # Idempotent injection. Local rebuilds and Vercel rebuilds cannot stack tags.
    source = re.sub(r'\s*<link[^>]+id="kingdom-v2-css"[^>]*>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-v2-js"[^>]*></script>\s*', "\n", source)

    if "</head>" not in source or "</body>" not in source:
        raise RuntimeError("index.html is missing the expected closing tags")

    source = source.replace("</head>", f"{css_tag}\n</head>", 1)
    source = source.replace("</body>", f"{js_tag}\n</body>", 1)

    # Build-time assertions catch the failures that caused the earlier bad deploys.
    required = [
        "kingdom-v2.css",
        "kingdom-v2.js",
        "KINGDOM PRINCIPLES",
        "kingdom-principles",
        "assets/kingdom-bg.svg",
        "#D6A63B",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing build marker: {marker}")

    forbidden_visible = [
        "The Ministry — Matthew 10 Series",
        "assets/ministry-bg.jpeg",
        "assets/qr-ministry.png",
        "ministry2026",
        "#E8180D",
        "232,24,13",
    ]
    for marker in forbidden_visible:
        if marker in source:
            raise RuntimeError(f"legacy marker survived transformation: {marker}")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom Principles v2 build complete")


if __name__ == "__main__":
    main()
