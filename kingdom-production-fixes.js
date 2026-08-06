/* Final production fixes layered after the preserved presentation engine. */
(function(){
  'use strict';

  const EN_BRAND = 'KINGDOM <span>PRINCIPLES</span>';
  const ES_BRAND = 'PRINCIPIOS <span>DEL REINO</span>';
  const BRAND_SELECTORS = [
    '.mo-title',
    '.hub-logo',
    '.hub-title',
    '.q-logo',
    '.ss-lbl',
    '.pw-ti',
    '.sp-wt',
    '.conf-brand',
    '.mm-brand',
    '#online-brand-main'
  ];

  function isSpanish(){
    const path = String(location.pathname || '').toLowerCase();
    return path.includes('espanol') || document.body.classList.contains('tm-spanish-mode') || Boolean(window.TM_LANG_ES);
  }

  function applyBranding(){
    const value = isSpanish() ? ES_BRAND : EN_BRAND;
    BRAND_SELECTORS.forEach(function(selector){
      document.querySelectorAll(selector).forEach(function(node){
        if(node.innerHTML !== value) node.innerHTML = value;
      });
    });

    const onlineSub = document.getElementById('online-brand-sub');
    if(onlineSub){
      onlineSub.textContent = isSpanish() ? 'Serie Decisiones del Reino' : 'Kingdom Decisions Series';
    }

    const p1Sub = document.querySelector('.pw-sb');
    if(p1Sub && /Matthew|Ministry/i.test(p1Sub.textContent || '')){
      p1Sub.textContent = isSpanish()
        ? 'El Principio de Identidad · Proyector Principal'
        : 'The Principle of Identity · Main Projector';
    }

    const scriptureSub = document.querySelector('.sp-ws');
    if(scriptureSub && /Matthew|Ministry|Scriptures/i.test(scriptureSub.textContent || '')){
      scriptureSub.textContent = isSpanish()
        ? 'Escrituras · RVR 1960 / KJV'
        : 'Scriptures · RVR 1960 / KJV';
    }
  }

  function normalizeText(value){
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function classifySlide(slide){
    if(!slide) return;
    const copy = slide.querySelector('.sl-big-text');
    slide.classList.remove('kp-copy-short','kp-copy-medium','kp-copy-long');
    if(!copy) return;

    const length = normalizeText(copy.textContent).length;
    if(length >= 105) slide.classList.add('kp-copy-long');
    else if(length >= 62) slide.classList.add('kp-copy-medium');
    else slide.classList.add('kp-copy-short');
  }

  function classifySlides(root){
    const scope = root && root.querySelectorAll ? root : document;
    if(scope.matches && scope.matches('.slide')) classifySlide(scope);
    scope.querySelectorAll('.slide').forEach(classifySlide);
  }

  let queued = false;
  function refresh(){
    if(queued) return;
    queued = true;
    requestAnimationFrame(function(){
      queued = false;
      applyBranding();
      classifySlides(document);
    });
  }

  function boot(){
    refresh();
    const observer = new MutationObserver(function(mutations){
      let relevant = false;
      mutations.forEach(function(mutation){
        mutation.addedNodes.forEach(function(node){
          if(node.nodeType !== 1) return;
          if(node.matches && (node.matches('.slide') || node.matches(BRAND_SELECTORS.join(',')))) relevant = true;
          if(node.querySelector && (node.querySelector('.slide') || node.querySelector(BRAND_SELECTORS.join(',')))) relevant = true;
        });
      });
      if(relevant) refresh();
    });
    observer.observe(document.documentElement, {childList:true, subtree:true});

    [100,300,700,1400,3000].forEach(function(delay){ setTimeout(refresh, delay); });
    window.addEventListener('pageshow', refresh);
    window.addEventListener('resize', refresh);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
