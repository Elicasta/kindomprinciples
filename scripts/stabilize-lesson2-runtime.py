from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PATH = ROOT / "kingdom-lesson2.js"

OLD = """  function boot(){
    snapshotLesson1();
    installChooser();
    const saved=(new URLSearchParams(location.search).get('lesson')||localStorage.getItem('kp_selected_lesson')||'lesson-1');
    if(saved==='lesson-2')applyLesson('lesson-2',0);
    [400,1200,3200].forEach(function(delay){setTimeout(function(){installChooser();if(current==='lesson-2')applyLesson('lesson-2',curSlide||0);},delay);});
    window.KINGDOM_LESSON2=PAYLOAD2;
  }
"""

NEW = """  function boot(){
    snapshotLesson1();
    installChooser();
    const saved=(new URLSearchParams(location.search).get('lesson')||localStorage.getItem('kp_selected_lesson')||'lesson-1');
    window.KINGDOM_LESSON2=PAYLOAD2;
    if(saved==='lesson-2')applyLesson('lesson-2',0);
    // Do not re-apply lesson data on delayed timers. Those retries could rebuild
    // the deck while presenting and make outputs appear to jump back to slide 1.
    setTimeout(installChooser,300);
    document.documentElement.dataset.kpLesson2Stable='true';
  }
"""


def main():
    source = PATH.read_text(encoding="utf-8")
    if OLD in source:
        source = source.replace(OLD, NEW, 1)
    elif "kpLesson2Stable" not in source:
        raise RuntimeError("Lesson 2 boot block not found")
    if "[400,1200,3200]" in source:
        raise RuntimeError("Lesson 2 delayed reapply survived")
    PATH.write_text(source, encoding="utf-8")
    print("Lesson 2 runtime stabilized: no delayed lesson reapply")

if __name__ == "__main__":
    main()
