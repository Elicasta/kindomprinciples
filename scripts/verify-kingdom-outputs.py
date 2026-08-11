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
    qr_svg = QR_SVG.read_text(encoding="utf-8")

    for path in [DATA_JS, FIXES_JS, SUPABASE_JS, FALLBACK_JS, P2_JS]:
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
            "KP_STABLE_RUNTIME='native-slides-v1'",
            "t:'te', n:'16'",
            "t:'te', n:'17'",
            "t:'te', n:'18'",
            "t:'te', n:'19'",
            "t:'te', n:'20'",
            "Psalm 139:13",
            "Psalm 139:14",
            "Psalm 139:15",
            "Psalm 139:16",
            "Psalm 139:17",
            "Psalm 139:18",
            "hidden:true",
        ],
        "stable lesson runtime",
    )

    if "characterData:true" in data_js:
        raise RuntimeError("input-lag character mutation observer survived")

    forbidden_custom_types = ["t:'triad'", "t:'pressure'", "t:'practice'"]
    surviving_custom = [marker for marker in forbidden_custom_types if marker in data_js]
    if surviving_custom:
        raise RuntimeError(f"unsupported custom slide types survived: {surviving_custom}")

    forbidden_repair_scripts = ["kingdom-slide-fixes.js", "kingdom-final-slides.js"]
    surviving_repairs = [marker for marker in forbidden_repair_scripts if marker in index]
    if surviving_repairs:
        raise RuntimeError(f"legacy slide repair scripts are still loaded: {surviving_repairs}")

    require(
        p2_css,
        [
            "Spanish RVR1960, primary",
            "English KJV",
            "#sp-ref-en",
            "#sp-tx-en",
            "#sp-ref-es",
            "#sp-tx-es",
            "grid-template-columns:18px minmax(0,1fr)",
            "border-top:1px solid",
            "background:var(--gold)",
            "p2-xlong",
        ],
        "approved Spanish-first P2 composition",
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

    print("Kingdom outputs verified: native 22-slide deck, split verse bank, Spanish-first P2, Supabase, and resilient sync")


if __name__ == "__main__":
    main()
