/* Final authoritative renderer for Lesson 1 slides 17–22. */
(function(){
  'use strict';

  const FINAL = [
    {index:16,type:'Pressure',title:'Pressure #1: Appetite',html:'<div class="slide sl-te kp-final-slide" data-i="16"><div class="sl-te-n">17</div><div class="sl-te-h">Pressure #1: <span class="acc">Appetite</span></div><ul class="sl-pts"><li>What do you desire?</li><li>Appetite is the pressure to let immediate desire overrule God’s order.</li><li>“I know it is wrong, but I need this.”</li><li>“I cannot wait.”</li><li>“God understands why I have to do this.”</li></ul><div class="sl-te-rf">Matthew 4:3-4 KJV</div></div>'},
    {index:17,type:'Pressure',title:'Pressure #2: Approval',html:'<div class="slide sl-te kp-final-slide" data-i="17"><div class="sl-te-n">18</div><div class="sl-te-h">Pressure #2: <span class="acc">Approval</span></div><ul class="sl-pts"><li>Whose validation do you require?</li><li>Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.</li><li>Needing to be noticed.</li><li>Becoming offended when overlooked.</li><li>Posting for reaction.</li><li>Speaking for applause.</li></ul><div class="sl-te-rf">Matthew 4:5-7 KJV</div></div>'},
    {index:18,type:'Pressure',title:'Pressure #3: Control',html:'<div class="slide sl-te kp-final-slide" data-i="18"><div class="sl-te-n">19</div><div class="sl-te-h">Pressure #3: <span class="acc">Control</span></div><ul class="sl-pts"><li>Whose will do you follow?</li><li>Control is the pressure to reach a destination without submitting to God’s process.</li><li>Manipulating situations.</li><li>Compromising to advance faster.</li><li>Forcing relationships.</li><li>Refusing to wait.</li></ul><div class="sl-te-rf">Matthew 4:8-10 KJV</div></div>'},
    {index:19,type:'Practice',title:'Weekly Practice',html:'<div class="slide sl-te kp-final-slide" data-i="19"><div class="sl-te-n">20</div><div class="sl-te-h"><span class="acc">Weekly Practice</span></div><ul class="sl-pts"><li>Prayerfully identify one area where you have been trying to prove something.</li><li>Worth</li><li>Intelligence</li><li>Spirituality</li><li>Success</li><li>Strength</li><li>Independence</li></ul><div class="sl-te-rf">Replace proving with believing.</div></div>'},
    {index:20,type:'Teaching',title:'Replace Proving With Believing',html:'<div class="slide sl-te kp-final-slide" data-i="20"><div class="sl-te-n">21</div><div class="sl-te-h">Replace proving with <span class="acc">believing.</span></div><ul class="sl-pts"><li>Romans 8:16</li><li>Colossians 3:3</li><li>Psalm 139:14</li><li>Choose obedience over self-validation.</li></ul><div class="sl-te-rf">Meditate on these passages throughout the week.</div></div>'},
    {index:21,type:'Closing',title:'Closing Reflection',html:'<div class="slide sl-final kp-final-slide" data-i="21"><div class="sl-fk">Closing Reflection</div><div class="sl-ft">What temptation gains power over me because I have not settled what God says about me?</div><div class="sl-fs">Return to God’s Word and replace uncertainty with declaration.</div></div>'}
  ];

  let repairing=false;
  function nodeFrom(markup){const t=document.createElement('template');t.innerHTML=markup.trim();return t.content.firstElementChild;}
  function activeIndex(){
    const selected=[...document.querySelectorAll('.ctrl-si.on,.ctrl-list-item.on,.ctrl-slide.on,.mobile-slide-item.on,[data-slide-index].on')][0];
    if(selected){const raw=selected.dataset.i||selected.dataset.slideIndex; if(raw!==undefined && !Number.isNaN(+raw)) return +raw;}
    const counter=document.querySelector('#ctrl-slide-num,#mobile-slide-num,.ctrl-prev-lbl,[data-current-slide]');
    const match=counter&&String(counter.textContent||'').match(/(?:slide\s*)?(\d+)/i);
    if(match) return Math.max(0,+match[1]-1);
    const on=document.querySelector('#ss-slides > .slide.on');
    return on ? +on.dataset.i||0 : 0;
  }

  function replacement(def,on){const node=nodeFrom(def.html);if(on)node.classList.add('on');return node;}
  function repairContainer(container){
    if(!container||repairing)return;
    repairing=true;
    try{
      FINAL.forEach(function(def){
        const slides=container.querySelectorAll(':scope > .slide');
        const current=slides[def.index];
        const needs=!current||!current.classList.contains('kp-final-slide')||!(current.textContent||'').trim();
        if(needs){const next=replacement(def,current&&current.classList.contains('on'));if(current)current.replaceWith(next);else container.appendChild(next);}
      });
      container.dataset.kpFinalSlides='6';
    }finally{repairing=false;}
  }

  function repairAllRenderedSlides(){
    FINAL.forEach(function(def){
      document.querySelectorAll('.slide[data-i="'+def.index+'"]').forEach(function(current){
        if(!current.classList.contains('kp-final-slide')||!(current.textContent||'').trim()) current.replaceWith(replacement(def,current.classList.contains('on')));
      });
    });
  }

  function repairMobilePreview(){
    const idx=activeIndex();
    const def=FINAL.find(function(item){return item.index===idx;});
    if(!def)return;
    document.querySelectorAll('.ctrl-prev-stage,.mobile-preview-stage,[data-preview-stage]').forEach(function(stage){
      const slide=stage.querySelector('.slide');
      if(!slide||+slide.dataset.i!==idx||!slide.classList.contains('kp-final-slide')||!(slide.textContent||'').trim()){
        stage.innerHTML='';stage.appendChild(replacement(def,true));
      }
    });
  }

  function repairLabels(){
    const rows=[...document.querySelectorAll('.ctrl-list-item,.ctrl-slide,.mobile-slide-item,[data-slide-index]')];
    FINAL.forEach(function(def){
      const row=rows[def.index];if(!row)return;
      const leaves=[...row.querySelectorAll('*')].filter(function(el){return el.children.length===0;});
      const finalLanding=leaves.find(function(el){return (el.textContent||'').trim()==='Final Landing';});
      if(finalLanding)finalLanding.textContent=def.title;
      const typeLeaf=leaves.find(function(el){return ['PRESSURE','PRACTICE','FINAL','CLOSING'].includes((el.textContent||'').trim().toUpperCase());});
      if(typeLeaf)typeLeaf.textContent=def.type;
    });
  }

  function repairAll(){
    repairContainer(document.getElementById('ss-slides'));
    repairContainer(document.getElementById('preview-slides'));
    repairAllRenderedSlides();
    repairLabels();
    repairMobilePreview();
  }

  function patchNavigation(){
    try{
      const original=typeof goTo==='function'?goTo:window.goTo;
      if(typeof original==='function'&&!original.kpFinalPatched){
        const wrapped=function(){repairAll();const result=original.apply(this,arguments);queueMicrotask(repairAll);return result;};
        wrapped.kpFinalPatched=true;try{goTo=wrapped;}catch(error){}window.goTo=wrapped;
      }
    }catch(error){}
  }

  function observe(root){
    if(!root||root.dataset.kpFinalObserver==='1')return;
    root.dataset.kpFinalObserver='1';
    new MutationObserver(function(){if(!repairing)queueMicrotask(repairAll);}).observe(root,{childList:true,subtree:true});
  }

  function boot(){
    repairAll();patchNavigation();
    observe(document.getElementById('ss-slides'));
    observe(document.getElementById('preview-slides'));
    observe(document.getElementById('admin-hub'));
    [50,200,500,1000,2000].forEach(function(delay){setTimeout(function(){repairAll();patchNavigation();},delay);});
    document.documentElement.dataset.kpFinalSlides='6';
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
