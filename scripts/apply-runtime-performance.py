from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
RUNTIME = ROOT / "kingdom-v2.js"

OLD_BOOT = """  function boot(){
    rebuildLessonSurfaces();
    applyAll();
    [100,350,800,1600,3000].forEach(function(delay){setTimeout(function(){rebuildLessonSurfaces();applyAll();},delay);});
    const observer=new MutationObserver(function(){ if(!applying) requestAnimationFrame(applyAll); });
    observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('pageshow',function(){setTimeout(function(){rebuildLessonSurfaces();applyAll();},80);});
"""

NEW_BOOT = """  function boot(){
    rebuildLessonSurfaces();
    applyAll();
    setTimeout(applyAll,120);
    setTimeout(applyAll,700);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('pageshow',function(){setTimeout(applyAll,80);});
"""


def main() -> None:
    runtime = RUNTIME.read_text(encoding="utf-8")
    if OLD_BOOT not in runtime:
        if "characterData:true" in runtime:
            raise RuntimeError("Kingdom runtime observer changed and performance patch could not be applied")
    else:
        runtime = runtime.replace(OLD_BOOT, NEW_BOOT, 1)
        RUNTIME.write_text(runtime, encoding="utf-8")

    source = INDEX.read_text(encoding="utf-8")

    # Point the preserved engine at the dedicated Kingdom project.
    source = source.replace(
        "https://cgliqvizpcctqhsldixn.supabase.co",
        "https://vpppznyhrickcabpfvfx.supabase.co",
    )
    source = source.replace(
        "sb_publishable_C0O6QwRy2nJIJLHCGuXWA_nZfrqTyi",
        "sb_publishable_ZvmCwSVoRGcxU3iBIwAh2Q_wqKiw9co",
    )

    js_tag = '<script src="/kingdom-supabase.js" id="kingdom-supabase-js"></script>'
    source = re.sub(r'\s*<script[^>]+id="kingdom-supabase-js"[^>]*></script>\s*', "\n", source)
    if "</body>" not in source:
        raise RuntimeError("index.html is missing </body>")
    source = source.replace("</body>", f"{js_tag}\n</body>", 1)

    required = [
        "vpppznyhrickcabpfvfx.supabase.co",
        "sb_publishable_ZvmCwSVoRGcxU3iBIwAh2Q_wqKiw9co",
        "kingdom-supabase.js",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing runtime performance marker: {marker}")

    if "characterData:true" in runtime:
        raise RuntimeError("full-document character mutation observer survived")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom runtime performance and Supabase wiring applied")


if __name__ == "__main__":
    main()
