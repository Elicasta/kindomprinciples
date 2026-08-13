from __future__ import annotations

from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
FIT_CSS = ROOT / "kingdom-presentation-fit.css"
P2_CSS = ROOT / "kingdom-p2-scripture.css"
P2_JS = ROOT / "kingdom-p2-scripture.js"
P2_ONLY_JS = ROOT / "kingdom-p2-scripture-only.js"
FIXES_JS = ROOT / "kingdom-production-fixes.js"
DATA_JS = ROOT / "kingdom-v2.js"
LESSON2_JS = ROOT / "kingdom-lesson2.js"
CUES_JS = ROOT / "kingdom-presenter-cues.js"
SUPABASE_JS = ROOT / "kingdom-supabase.js"
FALLBACK_JS = ROOT / "kingdom-sync-fallback.js"
ADMIN_HEALTH_JS = ROOT / "kingdom-admin-health.js"
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
    p2_only_js = P2_ONLY_JS.read_text(encoding="utf-8")
    fixes_js = FIXES_JS.read_text(encoding="utf-8")
    data_js = DATA_JS.read_text(encoding="utf-8")
    lesson2_js = LESSON2_JS.read_text(encoding="utf-8")
    cues_js = CUES_JS.read_text(encoding="utf-8")
    supabase_js = SUPABASE_JS.read_text(encoding="utf-8")
    fallback_js = FALLBACK_JS.read_text(encoding="utf-8")
    admin_health_js = ADMIN_HEALTH_JS.read_text(encoding="utf-8")
    qr_svg = QR_SVG.read_text(encoding="utf-8")

    for path in [DATA_JS, LESSON2_JS, CUES_JS, FIXES_JS, SUPABASE_JS, FALLBACK_JS, P2_JS, P2_ONLY_JS, ADMIN_HEALTH_JS]:
        node_check(path)

    require(index,[
        "route==='projector'","route==='scriptures'","route==='obslowerthirds'","route==='confidence'",
        "id=\"ssl\"","id=\"scripture-display\"","id=\"obs-screen\"","id=\"confidence-screen\"",
        "kingdom-presentation-fit.css","kingdom-p2-scripture.css","kingdom-p2-scripture.js",
        "kingdom-production-fixes.js","kingdom-supabase.js","kingdom-admin-health.js",
        "kingdom-sync-fallback.js","kingdom-presenter-cues.js","kingdom-lesson2.js",
        "vpppznyhrickcabpfvfx.supabase.co","kindomprinciples.vercel.app","KINGDOM <span>PRINCIPLES</span>",
        "channel('kingdom-sync')","const slide=LESSON1_SLIDES[i] || LESSON1_SLIDES[0]",
        "const nextSlide=LESSON1_SLIDES[i+1] || null","scripture_clear',manual:true",
    ],"generated index")

    require(index,[
        "document.body.classList.add('projector-mode')","document.body.classList.add('scripture-mode')",
        "document.body.classList.add('obs-mode')","document.body.classList.add('confidence-mode')",
    ],"route mode activation")

    require(data_js,[
        "The Principle of Identity","22 Slides","scriptureMap:SCRIPTURES","pollBank:POLLS","questions:QUESTIONS_DATA",
        "kpRuntimeOptimized","KP_STABLE_RUNTIME='native-slides-v1'","t:'te', n:'16'","t:'te', n:'17'",
        "t:'te', n:'18'","t:'te', n:'19'","t:'te', n:'20'","Psalm 139:13","Psalm 139:18",
        "hidden:true","rvr:'Porque tú formaste mis entrañas","slides:'48 Slides'","adminSelectLesson('lesson-2')",
    ],"stable lesson runtime")

    require(lesson2_js,[
        "const SLIDES2=[","const NOTES2={","const VERSES2=[","const PAYLOAD2=",
        "Whatever Comes First Becomes Your Master","Your priorities reveal what you trust, what you value, and what you believe can sustain you.",
        "Matthew 6:19-34","Your treasure reveals your <span class=\"acc\">heart.</span>",
        "Your eye determines how you <span class=\"acc\">interpret life.</span>",
        "Your master determines whom you <span class=\"acc\">serve.</span>",
        "Your anxiety reveals what you believe holds your <span class=\"acc\">future.</span>",
        "Your priority determines what organizes <span class=\"acc\">everything else.</span>",
        "Does my daily schedule support my claim that Jesus is King?","window.KINGDOM_LESSON2=PAYLOAD2",
    ],"Lesson 2 Priority runtime")
    if lesson2_js.count("{t:") != 48:
        raise RuntimeError(f"Lesson 2 must contain exactly 48 slides, found {lesson2_js.count('{t:')}")
    if len([line for line in lesson2_js.splitlines() if line.strip().startswith(tuple(str(i)+":" for i in range(48)))]) < 48:
        raise RuntimeError("Lesson 2 presenter notes are incomplete")

    if "characterData:true" in data_js:
        raise RuntimeError("input-lag character mutation observer survived")
    forbidden_custom_types=["t:'triad'","t:'pressure'","t:'practice'"]
    surviving_custom=[marker for marker in forbidden_custom_types if marker in data_js]
    if surviving_custom:
        raise RuntimeError(f"unsupported custom slide types survived: {surviving_custom}")

    forbidden_repair_scripts=["kingdom-slide-fixes.js","kingdom-final-slides.js"]
    surviving_repairs=[marker for marker in forbidden_repair_scripts if marker in index]
    if surviving_repairs:
        raise RuntimeError(f"legacy slide repair scripts are still loaded: {surviving_repairs}")

    require(p2_css,[
        "Spanish RVR1960, primary","English KJV","#sp-ref-en","#sp-tx-en","#sp-ref-es","#sp-tx-es",
        "grid-template-columns:18px minmax(0,1fr)","border-top:1px solid","background:var(--gold)","p2-xlong",
    ],"approved Spanish-first P2 composition")
    require(p2_js,["MutationObserver","p2-long","p2-xlong","kingdom:sync-state"],"adaptive P2 scripture sizing")

    require(cues_js,["Slide Points","Talk Track","Current Slide Points","pointsFor(slide)","updateConfidence","updateCtrlSurface"],"presenter cue surfaces")

    require(supabase_js,[
        "kingdom-principles-live","x-client-id",".from('attendees')",".from('questions')",".from('responses')",
        ".from('votes')","saveWorkbookAnswer(textarea)","saveVote(poll, selected, anonymous)","window.kingdomDataReady = true;",
    ],"Kingdom Supabase persistence integration")

    require(admin_health_js,["System Ready","Open P1","Open P2","OBS Lower","Confidence","kpSyncTransport","setInterval(update,1500)"],"admin system health panel")
    if "MutationObserver" in admin_health_js:
        raise RuntimeError("admin health panel must remain observer-free")

    require(fallback_js,["rest/v1/sync_state?id=eq.1","INTERVAL_MS = 700","window.handleMessage","Live ✓","Sync retrying","kpSyncTransport"],"resilient sync fallback")
    require(fixes_js,["SPANISH_SCRIPTURES","Salmos 139:13-18","Mateo 3:17","Mateo 4:8-10","Romanos 8:14-17","verse.rvr = translated.text","entry.text_es = translated.text"],"Spanish scripture payload")
    require(fit_css,[".slide.kp-copy-long .sl-big-text","body.projector-mode .slide.kp-copy-long .sl-big-text","@media(max-width:768px)","#ssl .slide.kp-copy-long .sl-big-text"],"adaptive presentation sizing")
    require(qr_svg,["#D6A63B","<svg","<path"],"Kingdom join QR")

    forbidden=["THE <span>MINISTRY</span>","assets/ministry-bg.jpeg","assets/qr-ministry.png","ministry2026","cgliqvizpcctqhsldixn.supabase.co","theministry.vercel.app","channel('ministry-sync')"]
    surviving=[marker for marker in forbidden if marker in index]
    if surviving:
        raise RuntimeError(f"legacy production markers survived: {surviving}")

    print("Kingdom outputs verified: Lesson 1 stable, Lesson 2 exact 48-slide Priority deck, presenter cues, P2, Supabase, and single sync path")


if __name__ == "__main__":
    main()
