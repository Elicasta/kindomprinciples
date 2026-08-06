from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"


def main() -> None:
    source = INDEX.read_text(encoding="utf-8")

    # Fix markup where the legacy brand was split by a span and escaped the first transform.
    source = source.replace(
        'THE <span>MINISTRY</span>',
        'KINGDOM <span>PRINCIPLES</span>',
    )

    # Remove the final visible legacy join destination.
    source = source.replace('theministry.vercel.app', 'kindomprinciples.vercel.app')

    css_tag = '<link href="/kingdom-presentation-fit.css" rel="stylesheet" id="kingdom-presentation-fit-css"/>'
    fixes_tag = '<script src="/kingdom-production-fixes.js" id="kingdom-production-fixes-js"></script>'
    fallback_tag = '<script src="/kingdom-sync-fallback.js" id="kingdom-sync-fallback-js"></script>'

    # Idempotent injection for local and Vercel builds.
    source = re.sub(r'\s*<link[^>]+id="kingdom-presentation-fit-css"[^>]*>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-production-fixes-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-sync-fallback-js"[^>]*></script>\s*', "\n", source)

    if "</head>" not in source or "</body>" not in source:
        raise RuntimeError("index.html is missing closing head/body tags")

    source = source.replace("</head>", f"{css_tag}\n</head>", 1)
    source = source.replace("</body>", f"{fixes_tag}\n{fallback_tag}\n</body>", 1)

    required = [
        "kingdom-presentation-fit.css",
        "kingdom-production-fixes.js",
        "kingdom-sync-fallback.js",
        "KINGDOM <span>PRINCIPLES</span>",
        "kindomprinciples.vercel.app",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing production marker: {marker}")

    if 'theministry.vercel.app' in source:
        raise RuntimeError("legacy join domain survived production transform")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom Principles production fixes applied")


if __name__ == "__main__":
    main()
