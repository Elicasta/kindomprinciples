from __future__ import annotations

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
FIT_CSS = ROOT / "kingdom-presentation-fit.css"
P2_CSS = ROOT / "kingdom-p2-scripture.css"
P2_JS = ROOT / "kingdom-p2-scripture.js"
FIXES_JS = ROOT / "kingdom-production-fixes.js"
DATA_JS = ROOT / "kingdom-v2.js"
SUPABASE_JS = ROOT / "kingdom-supabase.js"
FALLBACK_JS = ROOT / "kingdom-sync-fallback.js"
SLIDE_FIXES_JS = ROOT / "kingdom-slide-fixes.js"
QR_SVG = ROOT / "assets" / "qr-kingdom.svg"


def require(text: str, markers: list[str], label: str) -> None:
    missing = [marker for marker in markers if marker not in text]
    if missing:
        raise RuntimeError(f"{label} missing markers: {missing}")


def node_check(path: Path) -> None:
    subprocess.run(["node", "--check", str(path)], check=True)


def main() -> None:
    index = INDEX.read_text(encoding="utf-8")
    fit_css = FIT_CSS.read_text(encoding="utf-8")
    p2_css = P2_CSS.read_text(encoding="utf-8")
    p2_js = P2_JS.read_text(encoding="utf-8")
    fixes_js = FIXES_JS.read_text(encoding="utf-8")
    data_js = DATA_JS.read_text(encoding="utf-8")
    supabase_js = SUPABASE_JS.read_text(encoding="utf-8")
    fallback_js = FALLBACK_JS.read_text(encoding="utf-8")
    slide_fixes_js = SLIDE_FIXES_JS.read_text(encoding="utf-8")
    qr_svg = QR_SVG.read_text(encoding="utf-8")

    for path in [DATA_JS, FIXES_JS, SUPABASE_JS, FALLBACK_JS, SLIDE_FIXES_JS, P2_JS]:
        node_check(path)

    require(
        index,
        [
            "route==='projector'",
            "route==='scriptures'",
            "route==='obslowerthirds'",
            "route==='confidence'",
            "id=\"ssl\"",
            "id=\"scripture-display\"",
            "id=\"obs-screen\"",
            "id=\"confidence-screen\"",
            "kingdom-presentation-fit.css",
            "kingdom-p2-scripture.css",
            "kingdom-p2-scripture.js",
            "kingdom-production-fixes.js",
            "kingdom-supabase.js",
            "kingdom-sync-fallback.js",
            "kingdom-slide-fixes.js",
            "vpppznyhrickcabpfvfx.supabase.co",
            "kindomprinciples.vercel.app",
            "KINGDOM <span>PRINCIPLES</span>",
        ],
        "generated index",
    )

    require(
        index,
        [
            "document.body.classList.add('projector-mode')",
            "document.body.classList.add('scripture-mode')",
            "document.body.classList.add('obs-mode')",
            "document.body.classList.add('confidence-mode')",
        ],
        "route mode activation",
    )

    require(
        data_js,
        [
            "The Principle of Identity",
            "22 Slides",
            "scriptureMap:SCRIPTURES",
            "pollBank:POLLS",
            "questions:QUESTIONS_DATA",
            "kpRuntimeOptimized",
        ],
        "lesson data and optimized runtime",
    )

    if "characterData:true" in data_js:
        raise RuntimeError("input-lag character mutation observer survived")

    require(
        slide_fixes_js,
        [
            "Psalm 139:13",
            "Psalm 139:14",
            "Psalm 139:15",
            "Psalm 139:16",
            "Psalm 139:17",
            "Psalm 139:18",
            "slide.t==='triad'",
            "slide.t==='pressure'",
            "slide.t==='practice'",
            "kp-render-fallback",
            "kpSlidesVerified",
            "buildSlides(main,slides)",
            "buildSlides(preview,slides)",
        ],
        "final slide and verse-bank repair",
    )

    require(
        p2_css,
        [
            "Spanish RVR, primary",
            "English KJV, concurrent support",
            "#sp-ref-en",
            "#sp-tx-en",
            "#sp-ref-es",
            "#sp-tx-es",
            "grid-template-rows:auto minmax(0,1fr) auto auto",
            "p2-xlong",
        ],
        "Spanish-primary P2 layout",
    )
    require(
        p2_js,
        [
            "MutationObserver",
            "p2-long",
            "p2-xlong",
            "kingdom:sync-state",
        ],
        "adaptive P2 scripture sizing",
    )

    require(
        supabase_js,
        [
            "kingdom-principles-live",
            "x-client-id",
            ".from('attendees')",
            ".from('questions')",
            ".from('responses')",
            ".from('votes')",
            "saveWorkbookAnswer(textarea)",
            "saveVote(poll, selected, anonymous)",
            "postgres_changes",
        ],
        "Kingdom Supabase integration",
    )

    require(
        fallback_js,
        [
            "rest/v1/sync_state?id=eq.1",
            "INTERVAL_MS = 700",
            "window.handleMessage",
            "Live ✓",
            "Sync retrying",
            "kpSyncTransport",
        ],
        "resilient sync fallback",
    )

    require(
        fixes_js,
        [
            "SPANISH_SCRIPTURES",
            "Salmos 139:13-18",
            "Mateo 3:17",
            "Mateo 4:8-10",
            "Romanos 8:14-17",
            "verse.rvr = translated.text",
            "entry.text_es = translated.text",
        ],
        "Spanish scripture payload",
    )

    require(
        fit_css,
        [
            ".slide.kp-copy-long .sl-big-text",
            "body.projector-mode .slide.kp-copy-long .sl-big-text",
            "@media(max-width:768px)",
            "#ssl .slide.kp-copy-long .sl-big-text",
        ],
        "adaptive presentation sizing",
    )

    require(qr_svg, ["#D6A63B", "<svg", "<path"], "Kingdom join QR")

    forbidden = [
        "THE <span>MINISTRY</span>",
        "assets/ministry-bg.jpeg",
        "assets/qr-ministry.png",
        "ministry2026",
        "cgliqvizpcctqhsldixn.supabase.co",
        "theministry.vercel.app",
    ]
    surviving = [marker for marker in forbidden if marker in index]
    if surviving:
        raise RuntimeError(f"legacy production markers survived: {surviving}")

    print("Kingdom outputs, P2 concurrent scripture, all 22 slides, split verse bank, Supabase, and sync fallback verified")


if __name__ == "__main__":
    main()
