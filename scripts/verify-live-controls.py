from pathlib import Path
import re
import subprocess

ROOT=Path(__file__).resolve().parents[1]
INDEX=ROOT/'index.html'
FILES=[
    ROOT/'kingdom-lesson2.js',
    ROOT/'kingdom-p2-current.js',
    ROOT/'kingdom-live-control.js',
    ROOT/'kingdom-timer-standby.js',
    ROOT/'kingdom-lesson2-verse-split.js',
    ROOT/'kingdom-lesson2-polls.js',
    ROOT/'kingdom-lesson2-spanish-refresh.js',
]

def need(text,markers,label):
    missing=[m for m in markers if m not in text]
    if missing: raise RuntimeError(f'{label} missing: {missing}')

def main():
    for path in FILES:
        subprocess.run(['node','--check',str(path)],check=True)

    index=INDEX.read_text(encoding='utf-8')
    need(index,[
        'kingdom-lesson2-spanish-refresh.js','kingdom-lesson2-verse-split.js','kingdom-lesson2-polls.js',
        'kingdom-live-control.js','kingdom-timer-standby.js','kingdom-p2-current.js'
    ],'generated index live controls')
    if 'kingdom-p2-scripture-only.js' in index:
        raise RuntimeError('legacy hard-coded P2 controller is still loaded')

    lesson=(ROOT/'kingdom-lesson2.js').read_text(encoding='utf-8')
    if '[400,1200,3200]' in lesson:
        raise RuntimeError('Lesson 2 delayed reapply loop survived')
    need(lesson,['kpLesson2Stable','const SLIDES2=[','const NOTES2={','Does my daily schedule support my claim that Jesus is King?'],'Lesson 2 stable runtime')
    slide_block=lesson.split('const SLIDES2=[',1)[1].split('const NOTES2={',1)[0]
    if slide_block.count("{t:") != 48:
        raise RuntimeError(f'Lesson 2 expected 48 slides, found {slide_block.count("{t:")}')
    notes_block=lesson.split('const NOTES2={',1)[1].split('const VERSES2=[',1)[0]
    notes=len(re.findall(r'^\s*\d+:',notes_block,re.M))
    if notes != 48:
        raise RuntimeError(f'Lesson 2 expected 48 presenter notes, found {notes}')

    p2=(ROOT/'kingdom-p2-current.js').read_text(encoding='utf-8')
    need(p2,["route!=='scripture'&&route!=='scriptures'",'persistent-scripture-v2','for(let i=index-1;i>=0;i--)','KINGDOM_LESSON2_SPANISH'],'persistent Spanish-first P2')

    timer=(ROOT/'kingdom-timer-standby.js').read_text(encoding='utf-8')
    need(timer,['KP_TIMER_STARTED_AT','timer_started_at','Standby / QR','type:\'standby\'','start-controlled-v1'],'timer and standby')

    mobile=(ROOT/'kingdom-live-control.js').read_text(encoding='utf-8')
    need(mobile,['Current Points','Verse Bank','Up Next','kp-mm-points'],'mobile reference dashboard')

    split=(ROOT/'kingdom-lesson2-verse-split.js').read_text(encoding='utf-8')
    need(split,['Matthew 6:19-21','Haggai 1:5-6','KP_LESSON2_SPLIT_VERSES','installResolver'],'individual Lesson 2 verse bank')

    polls=(ROOT/'kingdom-lesson2-polls.js').read_text(encoding='utf-8')
    need(polls,['kp-l2-close','kp-l2-audit','kp-l2-practice','Does my daily schedule support my claim that Jesus is King?'],'Lesson 2 closing polls')

    print('Live controls verified: 48-slide Lesson 2, persistent P2, split verse bank, synced Start timer, standby QR, remote points, closing polls')

if __name__=='__main__':
    main()
