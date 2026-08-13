/* P2 follows the active lesson and keeps supporting Scripture on screen. */
(function(){
  'use strict';
  const route=location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
  if(route!=='scripture'&&route!=='scriptures')return;
  function valid(sc){return !!(sc&&String(sc.text_en||sc.kjv||'').trim());}
  function current(index){
    let list=[];try{list=Array.isArray(SCRIPTURE_MAP)?SCRIPTURE_MAP:[];}catch(e){}
    if(!list.length)return null;
    index=Math.max(0,Math.min(Number(index)||0,list.length-1));
    if(valid(list[index]))return list[index];
    for(let i=index-1;i>=0;i--)if(valid(list[i]))return list[i];
    for(let i=0;i<list.length;i++)if(valid(list[i]))return list[i];
    return null;
  }
  function show(sc){
    if(!valid(sc))return;
    const wait=document.getElementById('sp-wait');if(wait)wait.classList.add('hidden');
    const content=document.getElementById('sp-content');if(content)content.style.display='flex';
    const pr=document.getElementById('sp-ref-en'),pt=document.getElementById('sp-tx-en');
    const sr=document.getElementById('sp-ref-es'),st=document.getElementById('sp-tx-es');
    if(pr)pr.textContent=sc.ref_es||sc.ref_en||sc.ref||'';
    if(pt)pt.textContent=sc.text_es||sc.rvr||sc.text_en||sc.kjv||'';
    if(sr)sr.textContent=(sc.ref_en||sc.ref||'')+((sc.ref_en||sc.ref)?' · KJV':'');
    if(st)st.textContent=sc.text_en||sc.kjv||'';
    document.body.classList.add('p2-live');
    document.querySelectorAll('#ssl,#ss-slides,.ss-stage').forEach(function(el){if(el)el.style.display='none';});
  }
  function standby(){document.body.classList.remove('p2-live');const c=document.getElementById('sp-content');if(c)c.style.display='none';const w=document.getElementById('sp-wait');if(w)w.classList.remove('hidden');}
  const prior=window.handleMessage;
  window.handleMessage=function(msg){
    if(msg&&msg.type==='lesson_select'){if(typeof prior==='function')prior.apply(this,arguments);standby();return;}
    if(msg&&msg.type==='standby'){standby();return;}
    if(msg&&msg.type==='slide'){if(typeof prior==='function')prior.apply(this,arguments);show(current(msg.slide));return;}
    if(msg&&msg.type==='scripture'){show(msg.scripture||msg.payload||msg);return;}
    if(msg&&msg.type==='scripture_clear'){if(msg.manual)standby();return;}
    return typeof prior==='function'?prior.apply(this,arguments):undefined;
  };
  try{handleMessage=window.handleMessage;}catch(e){}
  window.KP_P2_CURRENT='persistent-scripture-v1';
})();
