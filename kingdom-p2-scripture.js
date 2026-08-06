/* P2 scripture sizing helper. Keeps Spanish and English on the same current cue. */
(function(){
  'use strict';

  function classify(){
    const content=document.getElementById('sp-content');
    const spanish=document.getElementById('sp-tx-en');
    if(!content||!spanish) return;
    const length=(spanish.textContent||'').trim().length;
    content.classList.toggle('p2-long',length>240&&length<=430);
    content.classList.toggle('p2-xlong',length>430);
    spanish.dataset.length=length>430?'xlong':length>240?'long':'normal';
  }

  function boot(){
    classify();
    const content=document.getElementById('sp-content');
    if(content){
      const observer=new MutationObserver(classify);
      observer.observe(content,{subtree:true,childList:true,characterData:true});
    }
    window.addEventListener('kingdom:sync-state',classify);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
