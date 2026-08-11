/* Kingdom Principles presenter cues.
   Gives the presenter enough slide context to stay aligned without looking back at P1.
   Read-only: no sync ownership, navigation wrappers, or DOM observers.
*/
(function(){
  'use strict';

  function clean(value){
    const box=document.createElement('div');
    box.innerHTML=String(value||'');
    return String(box.textContent||box.innerText||'').replace(/\s+/g,' ').trim();
  }

  function slideAt(index){
    try{return Array.isArray(LESSON1_SLIDES)?LESSON1_SLIDES[index]:null;}catch(e){return null;}
  }
  function notesAt(index){
    try{return NOTES_L1&&NOTES_L1[index]?clean(NOTES_L1[index]):'';}catch(e){return '';}
  }
  function slideTitle(slide){
    if(!slide) return 'End';
    if(slide.t==='cover') return clean(slide.title||'Cover');
    if(slide.t==='sc') return clean(slide.ref||'Scripture');
    if(slide.t==='te') return clean(slide.hl||'Teaching');
    if(slide.t==='big') return clean(slide.text||slide.sup||'Statement');
    if(slide.t==='final') return clean(slide.text||slide.kicker||'Closing');
    return clean(slide.title||slide.ref||'Current Slide');
  }
  function pointsFor(slide){
    if(!slide) return [];
    if(Array.isArray(slide.pts)) return slide.pts.map(clean).filter(Boolean);
    if(slide.t==='sc') return [clean(slide.text),clean(slide.tk)].filter(Boolean);
    if(slide.t==='big') return [clean(slide.text),clean(slide.ref)].filter(Boolean);
    if(slide.t==='cover') return [clean(slide.ref),clean(slide.text)].filter(Boolean);
    if(slide.t==='final') return [clean(slide.text),clean(slide.sub)].filter(Boolean);
    return [clean(slide.ref)].filter(Boolean);
  }
  function cueData(index){
    const slide=slideAt(index);
    return {
      number:index+1,
      count:(function(){try{return LESSON1_SLIDES.length}catch(e){return 0}})(),
      title:slideTitle(slide),
      ref:clean(slide&&slide.ref),
      points:pointsFor(slide),
      note:notesAt(index),
      next:slideTitle(slideAt(index+1))
    };
  }
  function esc(value){
    return String(value||'').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];});
  }
  function pointsHtml(data,compact){
    if(!data.points.length) return '<div class="kp-cue-empty">No slide points.</div>';
    const max=compact?4:6;
    return '<ul class="kp-cue-points">'+data.points.slice(0,max).map(function(point){return '<li>'+esc(point)+'</li>';}).join('')+'</ul>';
  }

  function installConfidence(){
    const screen=document.getElementById('confidence-screen');
    const main=screen&&screen.querySelector('.conf-main');
    if(!main||document.getElementById('kp-conf-cues')) return;
    const panel=document.createElement('div');
    panel.id='kp-conf-cues';
    panel.className='kp-conf-cues';
    panel.innerHTML='<div class="kp-cue-head"><span>Slide Points</span><span id="kp-conf-position">1 / 22</span></div><div id="kp-conf-points"></div><div class="kp-cue-note"><b>Talk Track</b><span id="kp-conf-note"></span></div>';
    main.appendChild(panel);
  }

  function installAdmin(){
    const center=document.querySelector('#admin-hub .ctrl-center');
    if(!center||document.getElementById('kp-admin-cues')) return;
    const notes=center.querySelector('.ctrl-notes');
    const panel=document.createElement('div');
    panel.id='kp-admin-cues';
    panel.className='kp-admin-cues';
    panel.innerHTML='<div class="kp-admin-cue-head"><span>Current Slide Points</span><span id="kp-admin-position"></span></div><div id="kp-admin-points"></div><div class="kp-admin-next"><b>Next</b><span id="kp-admin-next"></span></div>';
    if(notes) center.insertBefore(panel,notes);
    else center.appendChild(panel);
  }

  function render(index){
    const data=cueData(index);
    const confPoints=document.getElementById('kp-conf-points');
    const confPos=document.getElementById('kp-conf-position');
    const confNote=document.getElementById('kp-conf-note');
    if(confPoints) confPoints.innerHTML=pointsHtml(data,false);
    if(confPos) confPos.textContent=data.number+' / '+data.count;
    if(confNote) confNote.textContent=data.note||'Stay with the point on screen.';

    const adminPoints=document.getElementById('kp-admin-points');
    const adminPos=document.getElementById('kp-admin-position');
    const adminNext=document.getElementById('kp-admin-next');
    if(adminPoints) adminPoints.innerHTML=pointsHtml(data,true);
    if(adminPos) adminPos.textContent=data.number+' / '+data.count;
    if(adminNext) adminNext.textContent=data.next||'End';
  }

  function refresh(index){
    installConfidence();
    installAdmin();
    let active=Number(index);
    if(!Number.isFinite(active)){
      try{active=Number(curSlide);}catch(e){active=0;}
    }
    active=Math.max(0,active||0);
    render(active);
  }

  function wrap(name){
    const original=window[name];
    if(typeof original!=='function'||original.__kpPresenterCueWrapped) return;
    const wrapped=function(){
      const result=original.apply(this,arguments);
      const idx=Number(arguments[0]);
      queueMicrotask(function(){refresh(Number.isFinite(idx)?idx:undefined);});
      return result;
    };
    wrapped.__kpPresenterCueWrapped=true;
    window[name]=wrapped;
    try{if(name==='updateConfidence') updateConfidence=wrapped;if(name==='updateCtrlSurface') updateCtrlSurface=wrapped;}catch(e){}
  }

  function boot(){
    installConfidence();
    installAdmin();
    wrap('updateConfidence');
    wrap('updateCtrlSurface');
    refresh();
    [250,900].forEach(function(delay){setTimeout(function(){wrap('updateConfidence');wrap('updateCtrlSurface');refresh();},delay);});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
