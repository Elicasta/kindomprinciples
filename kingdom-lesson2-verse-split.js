/* Split Lesson 2 grouped verse-bank entries without altering slide copy. */
(function(){
  'use strict';
  const PLANS={
    'Matthew 6:19-21':{refs:['Matthew 6:19','Matthew 6:20','Matthew 6:21'],en:[125,264],es:[106,218]},
    'Proverbs 3:9-10':{refs:['Proverbs 3:9','Proverbs 3:10'],en:[84],es:[72]},
    'Proverbs 11:24-26':{refs:['Proverbs 11:24','Proverbs 11:25','Proverbs 11:26'],en:[122,210],es:[114,191]},
    'Proverbs 11:27-28':{refs:['Proverbs 11:27','Proverbs 11:28'],en:[104],es:[79]},
    'Matthew 6:22-23':{refs:['Matthew 6:22','Matthew 6:23'],en:[107],es:[98]},
    'Proverbs 23:4-5':{refs:['Proverbs 23:4','Proverbs 23:5'],en:[52],es:[55]},
    '1 Timothy 6:6-8':{refs:['1 Timothy 6:6','1 Timothy 6:7','1 Timothy 6:8'],en:[46,130],es:[62,133]},
    '1 Timothy 6:9-10':{refs:['1 Timothy 6:9','1 Timothy 6:10'],en:[148],es:[154]},
    'Matthew 6:27-30':{refs:['Matthew 6:27','Matthew 6:28','Matthew 6:29','Matthew 6:30'],en:[67,190,284],es:[82,189,274]},
    'Matthew 6:31-32':{refs:['Matthew 6:31','Matthew 6:32'],en:[116],es:[82]},
    'Matthew 6:33-34':{refs:['Matthew 6:33','Matthew 6:34'],en:[107],es:[95]},
    'Haggai 1:5-6':{refs:['Haggai 1:5','Haggai 1:6'],en:[64],es:[80]}
  };
  function copy(v){return JSON.parse(JSON.stringify(v));}
  function cut(text,points){const cuts=[0].concat(points,[String(text||'').length]);return cuts.slice(0,-1).map((start,i)=>String(text||'').slice(start,cuts[i+1]).trim());}
  function esRef(ref){return ref.replace('Matthew','Mateo').replace('Proverbs','Proverbios').replace('1 Timothy','1 Timoteo').replace('Haggai','Hageo');}
  function build(source){
    const out=[];
    source.forEach(function(v){
      const plan=PLANS[v.ref];
      if(!plan){out.push(copy(v));return;}
      const en=cut(v.kjv,plan.en),es=cut(v.rvr,plan.es);
      plan.refs.forEach(function(ref,i){out.push({id:ref.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),ref:ref,ref_es:esRef(ref),kjv:en[i]||'',rvr:es[i]||''});});
    });
    return out;
  }
  function installResolver(){
    const prior=window.getVBSpanish;
    const resolver=function(id){
      try{const row=(VERSE_BANK||[]).find(function(v){return v.id===id;});if(row&&row.rvr)return row.rvr;}catch(e){}
      return typeof prior==='function'?prior(id):'';
    };
    window.getVBSpanish=resolver;try{getVBSpanish=resolver;}catch(e){}
  }
  function apply(){
    if(window.LESSON_SLUG!=='lesson-2')return;
    try{
      const bank=build(Array.isArray(VERSE_BANK)?VERSE_BANK:[]);
      if(bank.length<25)return;
      VERSE_BANK.splice(0,VERSE_BANK.length,...bank);
      if(window.KINGDOM_LESSON2)window.KINGDOM_LESSON2.verseBank=copy(bank);
      installResolver();
      if(typeof buildVerseBank==='function')buildVerseBank();
      if(typeof buildMobileVerseList==='function')buildMobileVerseList();
      window.KP_LESSON2_SPLIT_VERSES=bank.length;
    }catch(e){console.warn('Lesson 2 verse split skipped',e);}
  }
  const oldAdmin=window.adminSelectLesson;
  if(typeof oldAdmin==='function'){window.adminSelectLesson=function(slug){const r=oldAdmin.apply(this,arguments);if(slug==='lesson-2')apply();return r;};try{adminSelectLesson=window.adminSelectLesson;}catch(e){}}
  function boot(){installResolver();apply();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
