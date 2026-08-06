/* Kingdom Principles slide and verse-bank repair. */
(function(){
  'use strict';

  function clone(value){ return JSON.parse(JSON.stringify(value)); }
  function html(value){ return String(value == null ? '' : value); }
  function safeItems(value){ return Array.isArray(value) ? value : []; }

  const PSALM_139 = [
    {id:'ps139-13',ref:'Psalm 139:13',kjv:'For thou hast possessed my reins: thou hast covered me in my mother’s womb.',slides:[1]},
    {id:'ps139-14',ref:'Psalm 139:14',kjv:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',slides:[1,20]},
    {id:'ps139-15',ref:'Psalm 139:15',kjv:'My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth.',slides:[1]},
    {id:'ps139-16',ref:'Psalm 139:16',kjv:'Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them.',slides:[1]},
    {id:'ps139-17',ref:'Psalm 139:17',kjv:'How precious also are thy thoughts unto me, O God! how great is the sum of them!',slides:[1]},
    {id:'ps139-18',ref:'Psalm 139:18',kjv:'If I should count them, they are more in number than the sand: when I awake, I am still with thee.',slides:[1]}
  ];

  function replacePsalmEntries(bank){
    if(!Array.isArray(bank)) return bank;
    const remaining=bank.filter(function(verse){
      return !verse || !/^ps139-(13-18|13|14|15|16|17|18)$/.test(String(verse.id||''));
    });
    const firstPsalmIndex=Math.max(0,bank.findIndex(function(verse){ return verse && /^ps139-/.test(String(verse.id||'')); }));
    remaining.splice(firstPsalmIndex,0,...clone(PSALM_139));
    bank.splice(0,bank.length,...remaining);
    return bank;
  }

  function repairVerseBank(){
    try{ if(typeof VERSE_BANK !== 'undefined') replacePsalmEntries(VERSE_BANK); }catch(error){}
    if(Array.isArray(window.VERSE_BANK)) replacePsalmEntries(window.VERSE_BANK);

    try{
      if(typeof window.lessonPayload==='function'){
        const payload=window.lessonPayload('lesson-1');
        if(payload && Array.isArray(payload.verseBank)) replacePsalmEntries(payload.verseBank);
      }
    }catch(error){ console.warn('Psalm 139 verse-bank repair failed',error); }

    try{ if(typeof buildVerseBank==='function') buildVerseBank(); }catch(error){ console.warn('Verse bank rebuild failed',error); }
    try{ if(typeof buildMobileVerseList==='function') buildMobileVerseList(); }catch(error){}
  }

  function renderCustom(slide,index){
    const data='data-i="'+index+'"';
    if(slide.t==='triad'){
      return '<div class="slide kp-triad" '+data+'><div class="kp-triad-head">'+html(slide.title)+'</div><div class="kp-triad-grid">'+safeItems(slide.items).map(function(item,itemIndex){
        return '<div class="kp-triad-card" data-n="0'+(itemIndex+1)+'"><div class="kp-triad-name">'+html(item.name)+'</div><div class="kp-triad-q">'+html(item.question)+'</div></div>';
      }).join('')+'</div></div>';
    }
    if(slide.t==='pressure'){
      return '<div class="slide kp-pressure" '+data+'><div><div class="kp-pressure-label">Pressure #'+html(slide.number)+' · '+html(slide.question)+'</div><div class="kp-pressure-title">'+html(slide.title)+'</div><div class="kp-pressure-principle">'+html(slide.principle)+'</div></div><div class="kp-pressure-side"><div class="kp-pressure-ref">'+html(slide.ref)+'</div><div class="kp-pressure-examples">'+safeItems(slide.examples).map(function(item){
        return '<div class="kp-pressure-example">'+html(item)+'</div>';
      }).join('')+'</div></div></div>';
    }
    if(slide.t==='practice'){
      return '<div class="slide kp-practice" '+data+'><div><div class="kp-section-kicker">Lesson 1</div><div class="kp-practice-title">'+html(slide.title)+'</div><div class="kp-practice-copy">'+html(slide.copy)+'</div></div><div class="kp-practice-list">'+safeItems(slide.items).map(function(item){
        return '<div class="kp-practice-item">'+html(item)+'</div>';
      }).join('')+'</div></div>';
    }
    return null;
  }

  function installSafeRenderer(){
    const previous=window.renderSlide || (typeof renderSlide==='function' ? renderSlide : null);
    const repaired=function(slide,index){
      try{
        const custom=renderCustom(slide,index);
        if(custom) return custom;
        const output=previous ? previous(slide,index) : '';
        if(output) return output;
      }catch(error){
        console.error('Slide render failed',index+1,slide && slide.t,error);
      }
      return '<div class="slide kp-render-fallback" data-i="'+index+'"><div class="kp-render-fallback-kicker">Lesson 1</div><div class="kp-render-fallback-title">'+html(slide && (slide.title||slide.hl||slide.kicker||slide.sup||slide.ref)||'Kingdom Principles')+'</div><div class="kp-render-fallback-copy">'+html(slide && (slide.text||slide.copy||slide.sub||slide.principle)||'')+'</div></div>';
    };
    try{ renderSlide=repaired; }catch(error){}
    window.renderSlide=repaired;
  }

  function rebuildSlides(){
    let slides=[];
    try{
      const payload=typeof window.lessonPayload==='function' ? window.lessonPayload('lesson-1') : null;
      slides=payload && Array.isArray(payload.slides) ? payload.slides : [];
    }catch(error){}
    if(!slides.length){
      try{ if(typeof LESSON1_SLIDES!=='undefined' && Array.isArray(LESSON1_SLIDES)) slides=LESSON1_SLIDES; }catch(error){}
    }
    if(!slides.length) return;

    try{
      const main=document.getElementById('ss-slides');
      if(main && typeof buildSlides==='function') buildSlides(main,slides);
      const preview=document.getElementById('preview-slides');
      if(preview && typeof buildSlides==='function') buildSlides(preview,slides);
      if(typeof renderDots==='function') renderDots(slides.length);
      if(typeof buildCtrlSurface==='function') buildCtrlSurface();
      if(typeof goTo==='function') goTo(Math.min(Number(window.currentSlide||0),slides.length-1));
      document.documentElement.dataset.kpSlidesVerified=String(slides.length);
    }catch(error){ console.error('Kingdom slide surface rebuild failed',error); }
  }

  function boot(){
    repairVerseBank();
    installSafeRenderer();
    rebuildSlides();
    setTimeout(function(){ repairVerseBank(); rebuildSlides(); },350);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
