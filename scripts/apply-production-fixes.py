from __future__ import annotations

from pathlib import Path
import re
import runpy

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
RUNTIME = ROOT / "kingdom-v2.js"
STABILIZER = ROOT / "scripts" / "stabilize-kingdom-runtime.py"
LESSON2_STABILIZER = ROOT / "scripts" / "stabilize-lesson2-runtime.py"
LIVE_VERIFY = ROOT / "scripts" / "verify-live-controls.py"


def main() -> None:
    runpy.run_path(str(STABILIZER), run_name="__main__")
    runpy.run_path(str(LESSON2_STABILIZER), run_name="__main__")

    runtime = RUNTIME.read_text(encoding="utf-8")
    runtime = runtime.replace(
        "num:'02', label:'Lesson 2', dateShort:'Coming Soon', dateLong:'Coming Soon',\n      title:'Priority', text:'What is organizing my life?', slides:'Locked',\n      tagline:'What is organizing my life?', reflectionTitle:'Priority', reflectionMeta:'Coming soon', open:false",
        "num:'02', label:'Lesson 2', dateShort:'August 13', dateLong:'August 13, 2026',\n      title:'The Principle of Priority', text:'Matthew 6:19-34', slides:'48 Slides',\n      tagline:'Whatever Comes First Becomes Your Master', reflectionTitle:'The Principle of Priority', reflectionMeta:'Closing response · Weekly practice', open:true",
        1,
    )
    runtime = runtime.replace(
        "btn.textContent='LESSON 2 · PRIORITY'; btn.classList.remove('on'); btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();};",
        "btn.textContent='LESSON 2 · PRIORITY'; btn.classList.remove('on'); btn.dataset.locked='false'; btn.onclick=function(){ if(window.adminSelectLesson) window.adminSelectLesson('lesson-2'); };",
        1,
    )
    runtime = runtime.replace(
        "else{ btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();}; }",
        "else if(slug==='lesson-2'){ btn.dataset.locked='false'; btn.onclick=function(){ if(window.adminSelectLesson) window.adminSelectLesson('lesson-2'); }; } else{ btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();}; }",
        1,
    )
    if "slides:'48 Slides'" not in runtime or "adminSelectLesson('lesson-2')" not in runtime:
        raise RuntimeError("Lesson 2 chooser wiring did not apply")
    RUNTIME.write_text(runtime, encoding="utf-8")

    source = INDEX.read_text(encoding="utf-8")
    source = source.replace('THE <span>MINISTRY</span>', 'KINGDOM <span>PRINCIPLES</span>')
    source = source.replace('theministry.vercel.app', 'kindomprinciples.vercel.app')
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
    cue_css_tag = '<link href="/kingdom-presenter-cues.css" rel="stylesheet" id="kingdom-presenter-cues-css"/>'

    scripts = [
        ('kingdom-production-fixes-js','/kingdom-production-fixes.js'),
        ('kingdom-sync-fallback-js','/kingdom-sync-fallback.js'),
        ('kingdom-p2-scripture-js','/kingdom-p2-scripture.js'),
        ('kingdom-lesson2-js','/kingdom-lesson2.js'),
        ('kingdom-lesson2-spanish-js','/kingdom-lesson2-spanish.js'),
        ('kingdom-lesson2-spanish-refresh-js','/kingdom-lesson2-spanish-refresh.js'),
        ('kingdom-lesson2-verse-split-js','/kingdom-lesson2-verse-split.js'),
        ('kingdom-lesson2-polls-js','/kingdom-lesson2-polls.js'),
        ('kingdom-projector-content-js','/kingdom-projector-content.js'),
        ('kingdom-presenter-cues-js','/kingdom-presenter-cues.js'),
        ('kingdom-live-control-js','/kingdom-live-control.js'),
        ('kingdom-timer-standby-js','/kingdom-timer-standby.js'),
        ('kingdom-p2-current-js','/kingdom-p2-current.js'),
    ]

    ids = [
        "kingdom-presentation-fit-css","kingdom-p2-scripture-css","kingdom-presenter-cues-css",
        "kingdom-p2-scripture-only-js","kingdom-slide-fixes-js","kingdom-final-slides-js",
    ] + [item[0] for item in scripts]
    for marker in ids:
        source = re.sub(r'\s*<(?:link|script)[^>]+id="'+re.escape(marker)+r'"[^>]*>(?:</script>)?\s*', "\n", source)

    if "</head>" not in source or "</body>" not in source:
        raise RuntimeError("index.html is missing closing head/body tags")

    source = source.replace("</head>", f"{css_tag}\n{p2_css_tag}\n{cue_css_tag}\n</head>", 1)
    script_html='\n'.join(f'<script src="{path}" id="{sid}"></script>' for sid,path in scripts)
    source = source.replace("</body>", f"{script_html}\n</body>", 1)

    required = [
        "kingdom-presentation-fit.css","kingdom-p2-scripture.css","kingdom-presenter-cues.css",
        "kingdom-production-fixes.js","kingdom-sync-fallback.js","kingdom-p2-scripture.js",
        "kingdom-lesson2.js","kingdom-lesson2-spanish.js","kingdom-lesson2-spanish-refresh.js",
        "kingdom-lesson2-verse-split.js","kingdom-lesson2-polls.js","kingdom-projector-content.js",
        "kingdom-presenter-cues.js","kingdom-live-control.js","kingdom-timer-standby.js","kingdom-p2-current.js",
        "KINGDOM <span>PRINCIPLES</span>","kindomprinciples.vercel.app","channel('kingdom-sync')",
        "const slide=LESSON1_SLIDES[i] || LESSON1_SLIDES[0]","const nextSlide=LESSON1_SLIDES[i+1] || null",
        "scripture_clear',manual:true",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing production marker: {marker}")

    forbidden_runtime_layers = ["kingdom-slide-fixes.js", "kingdom-final-slides.js", "kingdom-p2-scripture-only.js"]
    surviving = [marker for marker in forbidden_runtime_layers if marker in source]
    if surviving:
        raise RuntimeError(f"legacy runtime layer survived production transform: {surviving}")

    if 'theministry.vercel.app' in source:
        raise RuntimeError("legacy join domain survived production transform")
    if "channel('ministry-sync')" in source:
        raise RuntimeError("legacy realtime channel survived production transform")

    INDEX.write_text(source, encoding="utf-8")
    runpy.run_path(str(LIVE_VERIFY), run_name="__main__")
    print("Kingdom production shell stabilized with Lesson 2 live controls, projector polish, timer sync, and persistent P2 Scripture")


if __name__ == "__main__":
    main()
