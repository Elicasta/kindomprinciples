/* Lesson 2 closing response polls. */
(function(){
  'use strict';
  const POLLS=[
    {id:'kp-l2-close',question:'Does my daily schedule support my claim that Jesus is King?',options:['Yes','Mostly','Not consistently','I need to reorder it'],anonymous:false},
    {id:'kp-l2-audit',question:'Which area is exposing your priorities most clearly right now?',options:['Time','Money','Thought','Relationships','Anxiety'],anonymous:false},
    {id:'kp-l2-practice',question:'Which visible priority change do you need to make this week?',options:['Prayer time','Repair a relationship','Remove an unhealthy influence','Change a spending habit','Sabbath rhythm','Stop giving tomorrow today’s attention'],anonymous:false}
  ];
  function clone(v){return JSON.parse(JSON.stringify(v));}
  function apply(){
    if(window.LESSON_SLUG!=='lesson-2')return;
    window.POLL_BANK=clone(POLLS);
    if(window.KINGDOM_LESSON2)window.KINGDOM_LESSON2.pollBank=clone(POLLS);
    try{if(typeof renderPollBank==='function')renderPollBank();}catch(e){}
  }
  const oldAdmin=window.adminSelectLesson;
  if(typeof oldAdmin==='function'){window.adminSelectLesson=function(slug){const r=oldAdmin.apply(this,arguments);if(slug==='lesson-2')apply();return r;};try{adminSelectLesson=window.adminSelectLesson;}catch(e){}}
  function boot(){apply();window.KP_LESSON2_POLLS=POLLS.length;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
