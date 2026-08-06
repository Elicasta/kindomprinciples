from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RUNTIME = ROOT / "kingdom-v2.js"

OLD = """  function boot(){
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

NEW = """  function boot(){
    // Build the Kingdom surfaces once. The previous full-document observer
    // rescanned and rewrote the page on text mutations, which caused input lag.
    rebuildLessonSurfaces();
    applyAll();
    [160,600,1400].forEach(function(delay){
      setTimeout(function(){ if(!applying) applyAll(); },delay);
    });
    document.documentElement.dataset.kpRuntimeOptimized='true';
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('pageshow',function(){setTimeout(function(){if(!applying)applyAll();},80);});
"""


def main() -> None:
    source = RUNTIME.read_text(encoding="utf-8")
    if OLD not in source:
        if "kpRuntimeOptimized" in source and "characterData:true" not in source:
            print("Kingdom runtime already optimized")
            return
        raise RuntimeError("Could not locate the legacy full-document observer block")

    source = source.replace(OLD, NEW, 1)

    if "characterData:true" in source:
        raise RuntimeError("A characterData observer survived runtime optimization")
    if "kpRuntimeOptimized" not in source:
        raise RuntimeError("Runtime optimization marker missing")

    RUNTIME.write_text(source, encoding="utf-8")
    print("Kingdom runtime input-lag optimization complete")


if __name__ == "__main__":
    main()
