/* Projector content normalization for Kingdom Principles. */
(function(){
  'use strict';

  function patchLesson2(){
    try{
      if(window.KINGDOM_LESSON2&&Array.isArray(window.KINGDOM_LESSON2.slides)&&window.KINGDOM_LESSON2.slides[6]){
        window.KINGDOM_LESSON2.slides[6].sup='Our Reading Today';
        window.KINGDOM_LESSON2.slides[6].text='Matthew 6:19-34';
      }
      if(window.LESSON_SLUG==='lesson-2'&&Array.isArray(LESSON1_SLIDES)&&LESSON1_SLIDES[6]){
        LESSON1_SLIDES[6].sup='Our Reading Today';
        LESSON1_SLIDES[6].text='Matthew 6:19-34';
      }
    }catch(e){}
  }

  function markScriptureSlides(){
    if(!document.body.classList.contains('projector-mode'))return;
    try{
      document.querySelectorAll('#ss-slides .slide').forEach(function(node,index){
        const slide=Array.isArray(LESSON1_SLIDES)?LESSON1_SLIDES[index]:null;
        if(!slide)return;
        const ref=String(slide.ref||'');
        const hasBibleRef=/\b(?:Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation|Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalm|Proverbs|Ecclesiastes|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi)\b/i.test(ref);
        node.classList.toggle('kp-has-scripture-ref',hasBibleRef);
      });
    }catch(e){}
  }

  const oldAdmin=window.adminSelectLesson;
  if(typeof oldAdmin==='function'){
    window.adminSelectLesson=function(slug){
      const result=oldAdmin.apply(this,arguments);
      if(slug==='lesson-2')patchLesson2();
      return result;
    };
    try{adminSelectLesson=window.adminSelectLesson;}catch(e){}
  }

  const oldBuild=window.buildSlides;
  if(typeof oldBuild==='function'){
    window.buildSlides=function(){
      patchLesson2();
      const result=oldBuild.apply(this,arguments);
      if(document.body.classList.contains('projector-mode'))requestAnimationFrame(markScriptureSlides);
      return result;
    };
    try{buildSlides=window.buildSlides;}catch(e){}
  }

  function boot(){patchLesson2();markScriptureSlides();window.KP_PROJECTOR_CONTENT='reading-title-v1';}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
