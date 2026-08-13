/* Refresh Lesson 2 Spanish after local or synced lesson switches. */
(function(){
  'use strict';
  function refresh(){
    if(window.LESSON_SLUG!=='lesson-2')return;
    const es=window.KINGDOM_LESSON2_SPANISH||{};
    try{(VERSE_BANK||[]).forEach(function(v){const row=es[v.ref];if(row){v.ref_es=row.ref;v.rvr=row.text;}});}catch(e){}
    try{(SCRIPTURE_MAP||[]).forEach(function(v){const row=es[v.ref_en];if(row){v.ref_es=row.ref;v.text_es=row.text;}});}catch(e){}
  }
  const priorAdmin=window.adminSelectLesson;
  if(typeof priorAdmin==='function'){
    window.adminSelectLesson=function(slug){const result=priorAdmin.apply(this,arguments);if(slug==='lesson-2')refresh();return result;};
    try{adminSelectLesson=window.adminSelectLesson;}catch(e){}
  }
  const priorMessage=window.handleMessage;
  if(typeof priorMessage==='function'){
    window.handleMessage=function(msg){const result=priorMessage.apply(this,arguments);if(msg&&msg.lesson==='lesson-2')refresh();return result;};
    try{handleMessage=window.handleMessage;}catch(e){}
  }
  window.kpRefreshLesson2Spanish=refresh;
})();
