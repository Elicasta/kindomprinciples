/* Final authoritative renderer for Lesson 1 slides 17–22. */
(function(){
  'use strict';

  const FINAL = [
    {
      index:16,
      html:'<div class="slide sl-te kp-final-slide" data-i="16"><div class="sl-te-n">17</div><div class="sl-te-h">Pressure #1: <span class="acc">Appetite</span></div><ul class="sl-pts"><li>What do you desire?</li><li>Appetite is the pressure to let immediate desire overrule God’s order.</li><li>“I know it is wrong, but I need this.”</li><li>“I cannot wait.”</li><li>“God understands why I have to do this.”</li></ul><div class="sl-te-rf">Matthew 4:3-4 KJV</div></div>'
    },
    {
      index:17,
      html:'<div class="slide sl-te kp-final-slide" data-i="17"><div class="sl-te-n">18</div><div class="sl-te-h">Pressure #2: <span class="acc">Approval</span></div><ul class="sl-pts"><li>Whose validation do you require?</li><li>Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.</li><li>Needing to be noticed.</li><li>Becoming offended when overlooked.</li><li>Posting for reaction.</li><li>Speaking for applause.</li></ul><div class="sl-te-rf">Matthew 4:5-7 KJV</div></div>'
    },
    {
      index:18,
      html:'<div class="slide sl-te kp-final-slide" data-i="18"><div class="sl-te-n">19</div><div class="sl-te-h">Pressure #3: <span class="acc">Control</span></div><ul class="sl-pts"><li>Whose will do you follow?</li><li>Control is the pressure to reach a destination without submitting to God’s process.</li><li>Manipulating situations.</li><li>Compromising to advance faster.</li><li>Forcing relationships.</li><li>Refusing to wait.</li></ul><div class="sl-te-rf">Matthew 4:8-10 KJV</div></div>'
    },
    {
      index:19,
      html:'<div class="slide sl-te kp-final-slide" data-i="19"><div class="sl-te-n">20</div><div class="sl-te-h"><span class="acc">Weekly Practice</span></div><ul class="sl-pts"><li>Prayerfully identify one area where you have been trying to prove something.</li><li>Worth</li><li>Intelligence</li><li>Spirituality</li><li>Success</li><li>Strength</li><li>Independence</li></ul><div class="sl-te-rf">Replace proving with believing.</div></div>'
    },
    {
      index:20,
      html:'<div class="slide sl-te kp-final-slide" data-i="20"><div class="sl-te-n">21</div><div class="sl-te-h">Replace proving with <span class="acc">believing.</span></div><ul class="sl-pts"><li>Romans 8:16</li><li>Colossians 3:3</li><li>Psalm 139:14</li><li>Choose obedience over self-validation.</li></ul><div class="sl-te-rf">Meditate on these passages throughout the week.</div></div>'
    },
    {
      index:21,
      html:'<div class="slide sl-final kp-final-slide" data-i="21"><div class="sl-fk">Closing Reflection</div><div class="sl-ft">What temptation gains power over me because I have not settled what God says about me?</div><div class="sl-fs">Return to God’s Word and replace uncertainty with declaration.</div></div>'
    }
  ];

  let repairing=false;

  function nodeFrom(markup){
    const template=document.createElement('template');
    template.innerHTML=markup.trim();
    return template.content.firstElementChild;
  }

  function repairContainer(container){
    if(!container || repairing) return;
    repairing=true;
    try{
      FINAL.forEach(function(def){
        let slides=container.querySelectorAll(':scope > .slide');
        let current=slides[def.index];
        const needsReplacement=!current || !current.classList.contains('kp-final-slide') || !(current.textContent||'').trim();
        if(needsReplacement){
          const replacement=nodeFrom(def.html);
          if(current) current.replaceWith(replacement);
          else container.appendChild(replacement);
        }
      });
      container.dataset.kpFinalSlides='6';
    }finally{
      repairing=false;
    }
  }

  function repairAll(){
    repairContainer(document.getElementById('ss-slides'));
    repairContainer(document.getElementById('preview-slides'));
  }

  function patchNavigation(){
    try{
      const original=typeof goTo==='function' ? goTo : window.goTo;
      if(typeof original==='function' && !original.kpFinalPatched){
        const wrapped=function(index){
          repairAll();
          return original.apply(this,arguments);
        };
        wrapped.kpFinalPatched=true;
        try{goTo=wrapped;}catch(error){}
        window.goTo=wrapped;
      }
    }catch(error){}
  }

  function observeContainer(container){
    if(!container || container.dataset.kpFinalObserver==='1') return;
    container.dataset.kpFinalObserver='1';
    new MutationObserver(function(){
      if(!repairing) queueMicrotask(function(){repairContainer(container);});
    }).observe(container,{childList:true});
  }

  function boot(){
    repairAll();
    patchNavigation();
    observeContainer(document.getElementById('ss-slides'));
    observeContainer(document.getElementById('preview-slides'));
    [50,200,500,1000,2000].forEach(function(delay){setTimeout(function(){repairAll();patchNavigation();},delay);});
    document.documentElement.dataset.kpFinalSlides='6';
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
