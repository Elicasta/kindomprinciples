from __future__ import annotations

from pathlib import Path
import re
import runpy

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
STABILIZER = ROOT / "scripts" / "stabilize-kingdom-runtime.py"


def main() -> None:
    runpy.run_path(str(STABILIZER), run_name="__main__")

    source = INDEX.read_text(encoding="utf-8")

    source = source.replace(
        'THE <span>MINISTRY</span>',
        'KINGDOM <span>PRINCIPLES</span>',
    )
    source = source.replace('theministry.vercel.app', 'kindomprinciples.vercel.app')

    # Fix stale internal names and known output bugs in the preserved shell.
    source = source.replace("sbClient.channel('ministry-sync')", "sbClient.channel('kingdom-sync')")
    source = source.replace(
        "const slide=LESSON1_SLIDES[i-1] || LESSON1_SLIDES[0];\n  const nextSlide=LESSON1_SLIDES[i] || null;",
        "const slide=LESSON1_SLIDES[i] || LESSON1_SLIDES[0];\n  const nextSlide=LESSON1_SLIDES[i+1] || null;",
        1,
    )
    source = source.replace("if(ref) ref.textContent=cur.ref || 'Matthew 10';", "if(ref) ref.textContent=cur.ref || 'Kingdom Principles';")
    source = source.replace("sbSend({type:'scripture_clear'});", "sbSend({type:'scripture_clear',manual:true});", 1)

    css_tag = '<link href="/kingdom-presentation-fit.css" rel="stylesheet" id="kingdom-presentation-fit-css"/>'
    p2_css_tag = '<link href="/kingdom-p2-scripture.css" rel="stylesheet" id="kingdom-p2-scripture-css"/>'
    fixes_tag = '<script src="/kingdom-production-fixes.js" id="kingdom-production-fixes-js"></script>'
    fallback_tag = '<script src="/kingdom-sync-fallback.js" id="kingdom-sync-fallback-js"></script>'
    p2_js_tag = '<script src="/kingdom-p2-scripture.js" id="kingdom-p2-scripture-js"></script>'
    p2_only_tag = '<script src="/kingdom-p2-scripture-only.js" id="kingdom-p2-scripture-only-js"></script>'

    source = re.sub(r'\s*<link[^>]+id="kingdom-presentation-fit-css"[^>]*>\s*', "\n", source)
    source = re.sub(r'\s*<link[^>]+id="kingdom-p2-scripture-css"[^>]*>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-production-fixes-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-sync-fallback-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-slide-fixes-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-p2-scripture-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-p2-scripture-only-js"[^>]*></script>\s*', "\n", source)
    source = re.sub(r'\s*<script[^>]+id="kingdom-final-slides-js"[^>]*></script>\s*', "\n", source)

    if "</head>" not in source or "</body>" not in source:
        raise RuntimeError("index.html is missing closing head/body tags")

    source = source.replace("</head>", f"{css_tag}\n{p2_css_tag}\n</head>", 1)
    source = source.replace("</body>", f"{fixes_tag}\n{fallback_tag}\n{p2_js_tag}\n{p2_only_tag}\n</body>", 1)

    required = [
        "kingdom-presentation-fit.css",
        "kingdom-p2-scripture.css",
        "kingdom-production-fixes.js",
        "kingdom-sync-fallback.js",
        "kingdom-p2-scripture.js",
        "kingdom-p2-scripture-only.js",
        "KINGDOM <span>PRINCIPLES</span>",
        "kindomprinciples.vercel.app",
        "channel('kingdom-sync')",
        "const slide=LESSON1_SLIDES[i] || LESSON1_SLIDES[0]",
        "const nextSlide=LESSON1_SLIDES[i+1] || null",
        "scripture_clear',manual:true",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing production marker: {marker}")

    forbidden_runtime_layers = [
        "kingdom-slide-fixes.js",
        "kingdom-final-slides.js",
    ]
    surviving = [marker for marker in forbidden_runtime_layers if marker in source]
    if surviving:
        raise RuntimeError(f"legacy repair scripts survived production transform: {surviving}")

    if 'theministry.vercel.app' in source:
        raise RuntimeError("legacy join domain survived production transform")
    if "channel('ministry-sync')" in source:
        raise RuntimeError("legacy realtime channel survived production transform")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom production shell stabilized: confidence, OBS, P2 clear semantics, and sync channel fixed")


if __name__ == "__main__":
    main()
