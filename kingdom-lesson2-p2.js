/* Lesson 2 P2 scripture routing. */
(function(){
  'use strict';
  if(location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase()!=='scriptures') return;

  function show(sc){
    if(!sc||!sc.text_en)return;
    const wait=document.getElementById('sp-wait');
    const content=document.getElementById('sp-content');
    if(wait)wait.classList.add('hidden');
    if(content)content.style.display='flex';
    const mr=document.getElementById('sp-ref-en');
    const mt=document.getElementById('sp-tx-en');
    const er=document.getElementById('sp-ref-es');
    const et=document.getElementById('sp-tx-es');
    if(mr)mr.textContent=sc.ref_es||sc.ref_en||'';
    if(mt)mt.textContent=sc.text_es||sc.text_en||'';
    if(er)er.textContent=(sc.ref_en||'')+(sc.ref_en?' · KJV':'');
    if(et)et.textContent=sc.text_en||'';
    document.body.classList.add('p2-live');
  }

  const prior=window.handleMessage;
  window.handleMessage=function(msg){
    if(msg&&msg.lesson==='lesson-2'&&msg.type==='slide'){
      const i=Math.max(0,Number(msg.slide)||0);
      try{
        const slide=Array.isArray(LESSON1_SLIDES)?LESSON1_SLIDES[i]:null;
        const sc=Array.isArray(SCRIPTURE_MAP)?SCRIPTURE_MAP[i]:null;
        if(slide&&slide.t==='sc'&&sc&&sc.text_en)show(sc);
      }catch(e){}
      return;
    }
    if(msg&&msg.lesson==='lesson-2'&&msg.type==='scripture'){
      show(msg.scripture||msg.payload||msg);
      return;
    }
    if(msg&&msg.lesson==='lesson-2'&&msg.type==='scripture_clear'&&!msg.manual)return;
    return typeof prior==='function'?prior.apply(this,arguments):undefined;
  };
  try{handleMessage=window.handleMessage;}catch(e){}
})();
