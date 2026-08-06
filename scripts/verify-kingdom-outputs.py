from __future__ import annotations

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
FIT_CSS = ROOT / "kingdom-presentation-fit.css"
FIXES_JS = ROOT / "kingdom-production-fixes.js"
DATA_JS = ROOT / "kingdom-v2.js"
SUPABASE_JS = ROOT / "kingdom-supabase.js"


def require(text: str, markers: list[str], label: str) -> None:
    missing = [marker for marker in markers if marker not in text]
    if missing:
        raise RuntimeError(f"{label} missing markers: {missing}")


def node_check(path: Path) -> None:
    subprocess.run(["node", "--check", str(path)], check=True)


def main() -> None:
    index = INDEX.read_text(encoding="utf-8")
    fit_css = FIT_CSS.read_text(encoding="utf-8")
    fixes_js = FIXES_JS.read_text(encoding="utf-8")
    data_js = DATA_JS.read_text(encoding="utf-8")
    supabase_js = SUPABASE_JS.read_text(encoding="utf-8")

    node_check(DATA_JS)
    node_check(FIXES_JS)
    node_check(SUPABASE_JS)

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
            "kingdom-production-fixes.js",
            "kingdom-supabase.js",
            "vpppznyhrickcabpfvfx.supabase.co",
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
        supabase_js,
        [
            "kingdom-principles-live",
            "x-client-id",
            ".from('attendees')",
            ".from('questions')",
            ".from('responses')",
            "setTimeout(function(){ saveWorkbookAnswer(textarea); }, 850)",
            "postgres_changes",
        ],
        "Kingdom Supabase integration",
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

    forbidden = [
        "THE <span>MINISTRY</span>",
        "assets/ministry-bg.jpeg",
        "assets/qr-ministry.png",
        "ministry2026",
        "cgliqvizpcctqhsldixn.supabase.co",
    ]
    surviving = [marker for marker in forbidden if marker in index]
    if surviving:
        raise RuntimeError(f"legacy production markers survived: {surviving}")

    print("Kingdom output, performance, and Supabase verification passed")


if __name__ == "__main__":
    main()
