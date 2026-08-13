/* Kingdom Principles timer + standby control.
   Timer stays at 00:00 until Start, then every slide message carries the same
   timer origin so confidence and remote stay synchronized across devices.
*/
(function(){
  'use strict';
  const TIMER_KEY='kp_timer_started_at';

  function setTimerOrigin(value){
    const n=Number(value)||0;
    window.KP_TIMER_STARTED_AT=n||null;
    try{if(n)localStorage.setItem(TIMER_KEY,String(n));else localStorage.removeItem(TIMER_KEY);}catch(e){}
  }
  function timerOrigin(){return Number(window.KP_TIMER_STARTED_AT)||0;}
  function renderTimer(){
    const origin=timerOrigin();
    let seconds=0;
    if(origin)seconds=Math.max(0,Math.floor((Date.now()-origin)/1000));
    const value=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
    ['cmd-timer','mm-timer','conf-timer'].forEach(function(id){const el=document.getElementById(id);if(el)el.textContent=value;});
  }

  // Replace the legacy page-load timer with a display loop that waits for Start.
  window.startTimer=function(){
    if(window.__kpTimerInterval)return;
    renderTimer();
    window.__kpTimerInterval=setInterval(renderTimer,500);
  };
  try{startTimer=window.startTimer;}catch(e){}

  function wrapSend(){
    const original=window.sbSend;
    if(typeof original!=='function'||original.__kpTimerWrapped)return;
    const wrapped=function(message){
      let next=message;
      if(message&&message.type==='slide'){
        next=Object.assign({},message,{timer_started_at:timerOrigin()||null});
      }
      return original.call(this,next);
    };
    wrapped.__kpTimerWrapped=true;
    window.sbSend=wrapped;
    try{sbSend=wrapped;}catch(e){}
  }

  function wrapStart(){
    const original=window.startPresentation;
    if(typeof original!=='function'||original.__kpTimerWrapped)return;
    const wrapped=function(){
      setTimerOrigin(Date.now());
      window.startTimer();
      return original.apply(this,arguments);
    };
    wrapped.__kpTimerWrapped=true;
    window.startPresentation=wrapped;
    try{startPresentation=wrapped;}catch(e){}
  }

  function confidenceStandby(){
    const status=document.getElementById('conf-status');if(status)status.textContent='Standby';
    const kicker=document.getElementById('conf-current-kicker');if(kicker)kicker.textContent='Waiting';
    const title=document.getElementById('conf-current-title');if(title)title.textContent='Kingdom Principles';
    const ref=document.getElementById('conf-current-ref');if(ref)ref.textContent=(window.LESSON_DATA&&window.LESSON_DATA.title)||'Ready for presentation';
    const next=document.getElementById('conf-next-title');if(next)next.textContent='Ready';
    const notes=document.getElementById('conf-notes-text');if(notes)notes.textContent='Waiting for presenter to start.';
  }
  function applyStandby(){
    setTimerOrigin(null);
    renderTimer();
    try{presentationStarted=false;curSlide=0;}catch(e){}
    const overlay=document.getElementById('p1-sc-overlay');if(overlay)overlay.classList.remove('show');
    const ssl=document.getElementById('ssl');if(ssl)ssl.classList.remove('on');
    const p1=document.getElementById('p1-wait');if(p1)p1.classList.remove('hidden');
    const p1s=document.getElementById('p1-status');if(p1s){p1s.textContent='Standby';p1s.classList.remove('live');}
    const sp=document.getElementById('sp-content');if(sp)sp.style.display='none';
    const spw=document.getElementById('sp-wait');if(spw)spw.classList.remove('hidden');
    try{if(typeof clearOBS==='function')clearOBS();}catch(e){}
    confidenceStandby();
    const mmType=document.getElementById('mm-type');if(mmType)mmType.textContent='Standby';
    const mmTitle=document.getElementById('mm-title');if(mmTitle)mmTitle.textContent='Waiting Screen · QR Ready';
    const mmNum=document.getElementById('mm-num');if(mmNum)mmNum.textContent='—';
    const start=document.getElementById('mm-prev-start');if(start){start.textContent='Start';start.classList.add('start');}
  }

  window.kpStandby=function(){
    applyStandby();
    try{window.sbSend({type:'standby',lesson:(window.LESSON_SLUG||'lesson-1'),ts:Date.now()});}catch(e){}
  };

  function wrapMessages(){
    const original=window.handleMessage;
    if(typeof original!=='function'||original.__kpTimerWrapped)return;
    const wrapped=function(message){
      if(message&&message.timer_started_at)setTimerOrigin(message.timer_started_at);
      if(message&&message.type==='standby'){applyStandby();return;}
      return original.apply(this,arguments);
    };
    wrapped.__kpTimerWrapped=true;
    window.handleMessage=wrapped;
    try{handleMessage=wrapped;}catch(e){}
  }

  function installButtons(){
    const actions=document.querySelector('#mobile-mode .mm-actions');
    if(actions&&!document.getElementById('kp-mm-standby')){
      const button=document.createElement('button');
      button.id='kp-mm-standby';button.className='mm-action';button.textContent='Standby / QR';button.onclick=function(){window.kpStandby();};
      actions.appendChild(button);
    }
    const bar=document.querySelector('#admin-hub .cmd-bar');
    if(bar&&!document.getElementById('kp-admin-standby')){
      const button=document.createElement('button');
      button.id='kp-admin-standby';button.className='cmd-pill';button.textContent='Standby / QR';button.onclick=function(){window.kpStandby();};
      const right=bar.querySelector('.cmd-right');
      if(right)bar.insertBefore(button,right);else bar.appendChild(button);
    }
  }

  function boot(){
    setTimerOrigin(null);
    wrapSend();wrapStart();wrapMessages();installButtons();window.startTimer();
    [250,900].forEach(function(delay){setTimeout(function(){wrapSend();wrapStart();wrapMessages();installButtons();},delay);});
    window.KP_TIMER_SYNC='start-controlled-v1';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
