/* Kingdom Principles live control runtime. */
(function(){
  'use strict';
  let mode='points';
  function clean(value){const d=document.createElement('div');d.innerHTML=String(value||'');return String(d.textContent||'').replace(/\s+/g,' ').trim();}
  function currentSlide(){try{return Array.isArray(LESSON1_SLIDES)?LESSON1_SLIDES[curSlide]:null;}catch(e){return null;}}
  function points(slide){
    if(!slide)return [];
    if(Array.isArray(slide.pts))return slide.pts.map(clean).filter(Boolean);
    if(slide.t==='sc')return ['Scripture: '+clean(slide.ref),clean((NOTES_L1||{})[curSlide])].filter(Boolean);
    if(slide.t==='big')return [clean(slide.text),clean(slide.ref)].filter(Boolean);
    if(slide.t==='cover')return [clean(slide.ref),clean(slide.text)].filter(Boolean);
    if(slide.t==='final')return [clean(slide.text),clean(slide.sub)].filter(Boolean);
    return [clean(slide.ref)].filter(Boolean);
  }
  function install(){
    const section=document.querySelector('#mobile-mode .mm-verses');
    const list=document.getElementById('mm-verse-list');
    if(!section||!list)return;
    let panel=document.getElementById('kp-mm-points');
    if(!panel){panel=document.createElement('div');panel.id='kp-mm-points';panel.className='kp-mm-points';list.parentNode.insertBefore(panel,list);}
    const head=section.querySelector('.mm-v-head span:first-child');if(head)head.textContent=mode==='points'?'Current Points':'Verse Bank';
    let toggle=document.getElementById('kp-mm-verses-toggle');
    if(!toggle){
      toggle=Array.from(document.querySelectorAll('#mobile-mode .mm-actions button')).find(function(b){return /bible bank|verse bank/i.test(b.textContent||'');});
      if(toggle)toggle.id='kp-mm-verses-toggle';
      else{
        const actions=document.querySelector('#mobile-mode .mm-actions');
        if(actions){toggle=document.createElement('button');toggle.id='kp-mm-verses-toggle';toggle.className='mm-action';actions.appendChild(toggle);}
      }
      if(toggle)toggle.onclick=function(){mode=mode==='points'?'verses':'points';render();};
    }
    if(toggle)toggle.textContent=mode==='points'?'Verse Bank':'Points';
  }
  function render(){
    install();
    const panel=document.getElementById('kp-mm-points'),list=document.getElementById('mm-verse-list');
    if(!panel||!list)return;
    if(mode==='verses'){panel.style.display='none';list.style.display='grid';return;}
    panel.style.display='block';list.style.display='none';
    const slide=currentSlide(),items=points(slide);
    let next='End';try{if(LESSON1_SLIDES[curSlide+1]&&window.slideLabel)next=clean(window.slideLabel(LESSON1_SLIDES[curSlide+1]).title);}catch(e){}
    panel.innerHTML='<div class="kp-mm-point-list">'+items.map(function(item){return '<div class="kp-mm-point">'+item+'</div>';}).join('')+'</div><div class="kp-mm-next"><b>Up Next</b><span>'+next+'</span></div>';
  }
  const oldUpdate=window.updateMobileMode;
  if(typeof oldUpdate==='function'){window.updateMobileMode=function(){const r=oldUpdate.apply(this,arguments);render();return r;};try{updateMobileMode=window.updateMobileMode;}catch(e){}}
  const style=document.createElement('style');style.textContent='.kp-mm-points{overflow:auto;padding:12px;min-height:0}.kp-mm-point-list{display:grid;gap:9px}.kp-mm-point{border-left:3px solid var(--red);background:#111;padding:11px 12px;font-family:var(--fc);font-size:.83rem;font-weight:800;line-height:1.25;color:rgba(241,237,228,.9)}.kp-mm-next{margin-top:12px;padding-top:10px;border-top:1px solid var(--ln);display:grid;gap:4px}.kp-mm-next b{font-family:var(--fc);font-size:.56rem;letter-spacing:.16em;text-transform:uppercase;color:var(--red)}.kp-mm-next span{font-family:var(--fc);font-size:.74rem;font-weight:800;text-transform:uppercase;color:rgba(241,237,228,.65)}';document.head.appendChild(style);
  function boot(){install();render();window.KP_LIVE_CONTROL=true;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
