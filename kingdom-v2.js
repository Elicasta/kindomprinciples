/* Kingdom Principles v2
   Converts the original presentation engine without replacing its controls or outputs.
*/
(function(){
  'use strict';

  const SERIES = {
    slug: 'kingdom-principles',
    title: 'Kingdom Principles',
    eyebrow: 'Kingdom Decisions Series',
    subtitle: 'The Principle of Identity',
    tagline: 'Identity must be settled before pressure comes.'
  };

  const META = {
    'lesson-1': {
      num:'01', label:'Lesson 1', dateShort:'August 6', dateLong:'August 6, 2026',
      title:'The Principle of Identity',
      text:'Matthew 3:13-17 · Matthew 4:1-11',
      slides:'22 Slides',
      tagline:'Identity must be settled before pressure comes.',
      reflectionTitle:'The Principle of Identity',
      reflectionMeta:'5 sections · 20 questions',
      open:true
    },
    'lesson-2': {
      num:'02', label:'Lesson 2', dateShort:'Coming Soon', dateLong:'Coming Soon',
      title:'Priority', text:'What is organizing my life?', slides:'Locked',
      tagline:'What is organizing my life?', reflectionTitle:'Priority', reflectionMeta:'Coming soon', open:false
    },
    'lesson-3': {
      num:'03', label:'Lesson 3', dateShort:'Coming Soon', dateLong:'Coming Soon',
      title:'Alignment', text:'Am I living under the authority I want to carry?', slides:'Locked',
      tagline:'Am I living under the authority I want to carry?', reflectionTitle:'Alignment', reflectionMeta:'Coming soon', open:false
    }
  };

  const SLIDES = [
    {
      t:'cover', eyebrow:'Kingdom Decisions Series', lesson:'Lesson 1',
      title:'The Principle of Identity', ref:'Identity must be settled before pressure comes.',
      date:'August 6, 2026', text:'Matthew 3:13-17 · Matthew 4:1-11'
    },
    {
      t:'sc', ref:'Psalm 139:13-18 KJV',
      text:'“I will praise thee; for I am <span class="acc">fearfully and wonderfully made</span>...”',
      tk:'Identity begins with God’s knowledge of us, not our performance before others.'
    },
    {
      t:'big', sup:'Kingdom Principle',
      text:'You cannot consistently make Kingdom decisions while allowing <span class="acc">pressure, appetite, and people</span> to define who you are.',
      ref:'Before a person can make stable decisions, they must know who God says they are.'
    },
    {
      t:'te', n:'01',
      hl:'The Principle of <span class="acc">Identity</span>',
      pts:['Identity is not built by attention, achievement, approval, or appetite.','Identity is received from God and confirmed by His Word.']
    },
    {
      t:'te', n:'01',
      hl:'Identity must be settled <span class="acc">before pressure comes.</span>',
      pts:['Matthew 3:17 KJV','“This is my beloved Son, in whom I am well pleased.”','The Father declared Jesus’ identity before Jesus performed miracles, preached sermons, or called disciples.'],
      ref:'Principle #1'
    },
    {
      t:'big', sup:'Heaven Speaks First',
      text:'God says: <span class="acc">“This is my beloved Son.”</span><br>Then pressure says: <span class="acc">“If thou be the Son of God...”</span>',
      ref:'The enemy did not attack Jesus’ hunger first. He attacked God’s declaration first.'
    },
    {
      t:'big', sup:'The Pattern',
      text:'God speaks.<br><span class="acc">Pressure questions.</span><br>Faith believes.',
      ref:'The wilderness did not change Jesus’ identity. It tested whether He believed what the Father had spoken.'
    },
    {
      t:'te', n:'02',
      hl:'Identity will be tested <span class="acc">after it is established.</span>',
      pts:['1. God establishes identity before the wilderness.','2. Pressure attacks what God has spoken.','3. Insecurity demands proof.'],
      ref:'Principle #2'
    },
    {
      t:'sc', ref:'Matthew 3:17 KJV',
      text:'“This is my beloved Son, in whom I am well pleased.”',
      tk:'God prepares identity before He permits pressure.'
    },
    {
      t:'sc', ref:'Matthew 4:3 KJV',
      text:'“If thou be the Son of God...”',
      tk:'The devil does not create a new identity. He questions the one already given.'
    },
    {
      t:'sc', ref:'Romans 8:14-17 KJV',
      text:'“The Spirit itself beareth witness with our spirit, that we are the children of God.”',
      tk:'When God has already spoken, we do not need people to repeat it.'
    },
    {
      t:'te', n:'03',
      hl:'Temptation serves the purpose of <span class="acc">refining identity.</span>',
      pts:['Temptation often offers something outside the Father’s order.','Bread without waiting.','Recognition without humility.','Authority without the cross.'],
      ref:'Principle #3'
    },
    {
      t:'big', sup:'Shortcuts vs. Process',
      text:'The enemy promises <span class="acc">shortcuts.</span><br>God develops sons through <span class="acc">process.</span>',
      ref:'Satan offers crowns without submission. Satan offers the kingdom without the King.'
    },
    {
      t:'te', n:'03',
      hl:'Jesus answered with <span class="acc">the Word.</span>',
      pts:['Three times Jesus answered: “It is written...”','Jesus did not argue, defend Himself, or explain His identity.','He answered from Scripture.'],
      ref:'Identity anchored in Scripture remains stable under pressure.'
    },
    {
      t:'big', sup:'Principle #4',
      text:'Settled identity produces <span class="acc">stable obedience.</span>',
      ref:'Jesus did not need bread, spectacle, or kingdoms to prove He was God’s Son. Identity settled by God produces obedience that is not dependent upon circumstances.'
    },
    {
      t:'triad',
      title:'The Three Identity Pressures',
      items:[
        {name:'Appetite', question:'What do you desire?'},
        {name:'Approval', question:'Whose validation do you require?'},
        {name:'Control', question:'Whose will do you follow?'}
      ]
    },
    {
      t:'pressure', number:'01', title:'Appetite', question:'What do you desire?',
      ref:'Matthew 4:3-4 KJV',
      principle:'Appetite is the pressure to let immediate desire overrule God’s order.',
      examples:['“I know it is wrong, but I need this.”','“I cannot wait.”','“God understands why I have to do this.”']
    },
    {
      t:'pressure', number:'02', title:'Approval', question:'Whose validation do you require?',
      ref:'Matthew 4:5-7 KJV',
      principle:'Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.',
      examples:['Needing to be noticed.','Becoming offended when overlooked.','Posting for reaction.','Speaking for applause.']
    },
    {
      t:'pressure', number:'03', title:'Control', question:'Whose will do you follow?',
      ref:'Matthew 4:8-10 KJV',
      principle:'Control is the pressure to reach a destination without submitting to God’s process.',
      examples:['Manipulating situations.','Compromising to advance faster.','Forcing relationships.','Refusing to wait.']
    },
    {
      t:'practice', title:'Weekly Practice',
      copy:'Prayerfully identify one area where you have been trying to prove something.',
      items:['Worth','Intelligence','Spirituality','Success','Strength','Independence']
    },
    {
      t:'te', n:'21',
      hl:'Replace proving with <span class="acc">believing.</span>',
      pts:['Romans 8:16','Colossians 3:3','Psalm 139:14','Choose obedience over self-validation.'],
      ref:'Meditate on these passages throughout the week.'
    },
    {
      t:'final', kicker:'Closing Reflection',
      text:'What temptation gains power over me because I have not settled what God says about me?',
      sub:'Return to God’s Word and replace uncertainty with declaration.'
    }
  ];

  const NOTES = {
    0:'Open the series and state the key thought: Identity must be settled before pressure comes.',
    1:'Read Psalm 139:13-18. Emphasize that identity begins with God’s knowledge of us, not our performance before others.',
    2:'Before a person can make stable decisions, they must know who God says they are.',
    3:'Identity is received from God and confirmed by His Word.',
    4:'The Father declared Jesus’ identity before Jesus performed miracles, preached sermons, or called disciples.',
    5:'The enemy did not attack Jesus’ hunger first. He attacked God’s declaration first.',
    6:'The wilderness did not change Jesus’ identity. It tested whether He believed what the Father had spoken.',
    7:'Walk through the three movements: God establishes, pressure attacks, insecurity demands proof.',
    8:'God prepares identity before He permits pressure.',
    9:'The devil does not create a new identity. He questions the one already given.',
    10:'When God has already spoken, we do not need people to repeat it.',
    11:'Temptation often offers something outside the Father’s order.',
    12:'Satan offers crowns without submission. Satan offers the kingdom without the King.',
    13:'Jesus did not argue, defend Himself, or explain His identity. He answered from Scripture.',
    14:'Identity settled by God produces obedience that is not dependent upon circumstances.',
    15:'Introduce appetite, approval, and control as the three identity pressures.',
    16:'Appetite asks whether immediate desire will overrule God’s order.',
    17:'Approval becomes a trap when identity is rooted in people’s opinions.',
    18:'Control tries to reach the destination without submitting to God’s process.',
    19:'Give the room time to identify one area where they have been trying to prove something.',
    20:'Choose obedience over self-validation.',
    21:'Pause. Let everyone write an answer before closing.'
  };

  const VERSES = [
    {id:'ps139-13-18',ref:'Psalm 139:13-18',kjv:'For thou hast possessed my reins: thou hast covered me in my mother’s womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well. My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth. Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them. How precious also are thy thoughts unto me, O God! how great is the sum of them! If I should count them, they are more in number than the sand: when I awake, I am still with thee.',slides:[1]},
    {id:'mt3-17',ref:'Matthew 3:17',kjv:'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',slides:[4,5,8]},
    {id:'mt4-1-3',ref:'Matthew 4:1-3',kjv:'Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred. And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread.',slides:[5,6,9,16]},
    {id:'mt4-4',ref:'Matthew 4:4',kjv:'But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.',slides:[13,16]},
    {id:'mt4-5-7',ref:'Matthew 4:5-7',kjv:'Then the devil taketh him up into the holy city, and setteth him on a pinnacle of the temple, And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee: and in their hands they shall bear thee up, lest at any time thou dash thy foot against a stone. Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God.',slides:[17]},
    {id:'mt4-8-10',ref:'Matthew 4:8-10',kjv:'Again, the devil taketh him up into an exceeding high mountain, and sheweth him all the kingdoms of the world, and the glory of them; And saith unto him, All these things will I give thee, if thou wilt fall down and worship me. Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve.',slides:[18]},
    {id:'rom8-14-17',ref:'Romans 8:14-17',kjv:'For as many as are led by the Spirit of God, they are the sons of God. For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father. The Spirit itself beareth witness with our spirit, that we are the children of God: And if children, then heirs; heirs of God, and joint-heirs with Christ.',slides:[10,20]},
    {id:'prov29-25',ref:'Proverbs 29:25',kjv:'The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe.',slides:[17]},
    {id:'col3-3',ref:'Colossians 3:3',kjv:'For ye are dead, and your life is hid with Christ in God.',slides:[20]},
    {id:'ps139-14',ref:'Psalm 139:14',kjv:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',slides:[1,20]}
  ];

  const SCRIPTURES = SLIDES.map(function(slide){
    const ref = slide.ref || '';
    const match = VERSES.find(function(v){ return ref.indexOf(v.ref) !== -1 || (slide.t==='sc' && v.slides.indexOf(SLIDES.indexOf(slide)) !== -1); });
    return match ? {ref_en:match.ref,text_en:match.kjv,ref_es:match.ref,text_es:match.kjv} : {ref_en:ref,text_en:'',ref_es:ref,text_es:''};
  });

  const QUESTIONS_DATA = [
    {section:'Section 1: Identity',questions:[
      {num:'1',text:'In your own words, what does it mean for identity to be settled in God?'},
      {num:'2',text:'Read Matthew 3:17. What did the Father declare about Jesus before Jesus entered the wilderness?'},
      {num:'3',text:'Why is it important that God spoke identity before Jesus performed public ministry?'},
      {num:'4',text:'What is one thing people often use to define themselves besides God’s Word?'}
    ]},
    {section:'Section 2: Pressure',questions:[
      {num:'5',text:'Read Matthew 4:3. What phrase did the enemy use to question Jesus’ identity?'},
      {num:'6',text:'What does this reveal about how pressure often works?'},
      {num:'7',text:'Have you ever felt pressure to prove who you are? Briefly explain.'},
      {num:'8',text:'Which is harder for you: waiting on God, being overlooked, or giving up control? Why?'}
    ]},
    {section:'Section 3: The Three Identity Pressures',questions:[
      {num:'9',text:'Appetite: What is one desire that can become dangerous if it overrules obedience?'},
      {num:'10',text:'Approval: Whose opinion are you most tempted to seek for validation?'},
      {num:'11',text:'Control: What is one area where you struggle to trust God’s process?'},
      {num:'12',text:'Which of the three pressures, appetite, approval, or control, do you need to watch most closely this week?'}
    ]},
    {section:'Section 4: Scripture Response',questions:[
      {num:'13',text:'Read Romans 8:16. What does the Spirit bear witness to?'},
      {num:'14',text:'Read Colossians 3:3. What does it mean that your life is “hid with Christ in God”?'},
      {num:'15',text:'Read Psalm 139:14. What does this verse teach you about how God sees you?'}
    ]},
    {section:'Section 5: Personal Reflection',questions:[
      {num:'16',text:'What temptation gains power over you when you forget what God says about you?'},
      {num:'17',text:'What have you been trying to prove?'},
      {num:'18',text:'What would it look like this week to stop proving and start believing?'},
      {num:'19',text:'Write one sentence declaring what God says about your identity.'},
      {num:'20',text:'Write one obedience step you will take this week.'}
    ]}
  ];

  const POLLS = [
    {id:'kp-l1-p1',question:'When pressure comes, what area do people usually question first?',options:['Their schedule','Their identity','Their finances','Their talents'],correct:1,anonymous:false},
    {id:'kp-l1-p2',question:'In Matthew 4, what did the enemy challenge when he said, “If thou be the Son of God”?',options:['Jesus’ hunger','Jesus’ location','God’s declaration','The disciples’ faith'],correct:2,anonymous:false},
    {id:'kp-l1-p3',question:'Which identity pressure is connected to immediate desire?',options:['Appetite','Approval','Control','Comparison'],correct:0,anonymous:false},
    {id:'kp-l1-p4',question:'Which identity pressure asks, “Whose validation do you require?”',options:['Appetite','Approval','Control','Fear'],correct:1,anonymous:false},
    {id:'kp-l1-p5',question:'Which identity pressure tries to reach the destination without God’s process?',options:['Appetite','Approval','Control','Confusion'],correct:2,anonymous:false},
    {id:'kp-l1-p6',question:'What did Jesus use to answer temptation?',options:['Emotion','Explanation','Scripture','Silence only'],correct:2,anonymous:false},
    {id:'kp-l1-p7',question:'Which statement best summarizes the lesson?',options:['God only speaks after we succeed.','Identity is earned through performance.','Settled identity produces stable obedience.','Pressure means God has left us.'],correct:2,anonymous:false}
  ];

  const PAYLOAD = {
    slug:'lesson-1',label:'Lesson 1',title:'The Principle of Identity',
    text:'Matthew 3:13-17 · Matthew 4:1-11',slides:SLIDES,notes:NOTES,
    scriptureMap:SCRIPTURES,verseBank:VERSES,questions:QUESTIONS_DATA,pollBank:POLLS
  };

  function clearObject(target){ Object.keys(target || {}).forEach(function(key){ delete target[key]; }); }
  function replaceArray(target, source){ if(Array.isArray(target)){ target.splice(0,target.length); source.forEach(function(item){ target.push(JSON.parse(JSON.stringify(item))); }); } }
  function strip(value){ const d=document.createElement('div'); d.innerHTML=String(value||''); return (d.textContent||'').trim(); }

  function installData(){
    try{ replaceArray(LESSON1_SLIDES, SLIDES); }catch(e){}
    try{ clearObject(NOTES_L1); Object.assign(NOTES_L1, NOTES); }catch(e){}
    try{ replaceArray(SCRIPTURE_MAP, SCRIPTURES); }catch(e){}
    try{ replaceArray(VERSE_BANK, VERSES); }catch(e){}
    try{ replaceArray(QUESTIONS, QUESTIONS_DATA); }catch(e){}
    try{
      clearObject(HOME_LESSON_META);
      Object.keys(META).forEach(function(key){ HOME_LESSON_META[key]=Object.assign({},META[key]); });
      window.HOME_LESSON_META=HOME_LESSON_META;
    }catch(e){}
    window.POLL_BANK=JSON.parse(JSON.stringify(POLLS));
    window.SERIES_CONFIG={slug:SERIES.slug,title:SERIES.title};
    window.SERIES_SLUG=SERIES.slug;
    window.LESSON_SLUG='lesson-1';
    window.LESSON_DATA={slug:'lesson-1',label:'Lesson 1',title:'The Principle of Identity',text:'Matthew 3:13-17 · Matthew 4:1-11'};
  }

  function installRegistry(){
    try{ normalizeLessonSlug=function(){ return 'lesson-1'; }; }catch(e){}
    try{ requestedLessonSlug=function(){ return 'lesson-1'; }; }catch(e){}
    try{ dateBasedLessonSlug=function(){ return 'lesson-1'; }; }catch(e){}
    try{ lessonPayload=function(){ return PAYLOAD; }; }catch(e){}
    try{ window.normalizeLessonSlug=function(){ return 'lesson-1'; }; }catch(e){}
    try{ window.lessonPayload=function(){ return PAYLOAD; }; }catch(e){}
  }

  function renderKingdomSlide(s,i){
    const d='data-i="'+i+'"';
    if(s.t==='cover'){
      return '<div class="slide sl-cover" '+d+'><div class="sl-cover-bg"></div><div class="sl-cover-ov"></div><div class="sl-cover-body"><div class="sl-cey">'+s.eyebrow+'</div><div class="sl-ct"><span class="tt">KINGDOM</span><span class="tm">PRINCIPLES</span></div><div class="sl-cln">'+s.lesson+'</div><div class="sl-cnm">'+s.title+'</div><div class="sl-crf">'+s.ref+'</div><div class="sl-cft"><div class="sl-cm"><div class="sl-cml">Presenter</div><div class="sl-cmv">Elder Eli Castaneda</div></div><div class="sl-cm"><div class="sl-cml">Date</div><div class="sl-cmv">'+s.date+'</div></div><div class="sl-cm"><div class="sl-cml">Primary Text</div><div class="sl-cmv">'+s.text+'</div></div></div></div></div>';
    }
    if(s.t==='triad'){
      return '<div class="slide kp-triad" '+d+'><div class="kp-triad-head">'+s.title+'</div><div class="kp-triad-grid">'+s.items.map(function(item,index){return '<div class="kp-triad-card" data-n="0'+(index+1)+'"><div class="kp-triad-name">'+item.name+'</div><div class="kp-triad-q">'+item.question+'</div></div>';}).join('')+'</div></div>';
    }
    if(s.t==='pressure'){
      return '<div class="slide kp-pressure" '+d+'><div><div class="kp-pressure-label">Pressure #'+s.number+' · '+s.question+'</div><div class="kp-pressure-title">'+s.title+'</div><div class="kp-pressure-principle">'+s.principle+'</div></div><div class="kp-pressure-side"><div class="kp-pressure-ref">'+s.ref+'</div><div class="kp-pressure-examples">'+s.examples.map(function(item){return '<div class="kp-pressure-example">'+item+'</div>';}).join('')+'</div></div></div>';
    }
    if(s.t==='practice'){
      return '<div class="slide kp-practice" '+d+'><div><div class="kp-section-kicker">Lesson 1</div><div class="kp-practice-title">'+s.title+'</div><div class="kp-practice-copy">'+s.copy+'</div></div><div class="kp-practice-list">'+s.items.map(function(item){return '<div class="kp-practice-item">'+item+'</div>';}).join('')+'</div></div>';
    }
    return null;
  }

  function installRenderer(){
    const original=window.renderSlide || (typeof renderSlide==='function'?renderSlide:null);
    const renderer=function(s,i){
      const custom=renderKingdomSlide(s,i);
      if(custom) return custom;
      return original ? original(s,i) : '';
    };
    try{ renderSlide=renderer; }catch(e){}
    window.renderSlide=renderer;

    const labeler=function(s){
      if(!s) return {type:'Waiting',title:'Kingdom Principles',ref:'The Principle of Identity'};
      const map={cover:'Cover',sc:'Scripture',te:'Teaching',big:'Statement',final:'Closing',triad:'Framework',pressure:'Pressure',practice:'Practice'};
      let title=s.title||s.ref||s.hl||s.text||'Slide';
      return {type:map[s.t]||s.t,title:strip(title).substring(0,64),ref:s.ref||''};
    };
    try{ slideLabel=labeler; }catch(e){}
    window.slideLabel=labeler;
  }

  function attendeeLoginWithoutPassword(){
    const originalShow=window.showModal || (typeof showModal==='function'?showModal:null);
    const originalCheck=window.checkPw || (typeof checkPw==='function'?checkPw:null);
    if(originalShow){
      const wrapped=function(type){
        document.body.classList.toggle('kp-admin-modal',type==='admin');
        originalShow(type);
        const isAdmin=type==='admin';
        const sub=document.getElementById('mo-sub');
        const code=document.getElementById('mo-access-code');
        const pw=document.getElementById('mo-pw');
        const email=document.getElementById('mo-email');
        const name=document.getElementById('mo-name');
        if(sub) sub.textContent=isAdmin?'Enter the admin code.':'Enter your name and email.';
        if(code) code.classList.remove('on');
        if(pw){ pw.style.display=isAdmin?'block':'none'; if(!isAdmin) pw.value='kingdom2026'; }
        if(email){ email.style.display=isAdmin?'none':'block'; email.onkeydown=function(event){if(event.key==='Enter') window.checkPw();}; }
        if(name && !isAdmin) name.onkeydown=function(event){if(event.key==='Enter'&&email) email.focus();};
      };
      try{ showModal=wrapped; }catch(e){}
      window.showModal=wrapped;
    }
    if(originalCheck){
      const wrappedCheck=function(){
        const name=document.getElementById('mo-name');
        const isAdmin=!name || getComputedStyle(name).display==='none' || document.body.classList.contains('kp-admin-modal');
        if(!isAdmin){
          const email=document.getElementById('mo-email');
          const pw=document.getElementById('mo-pw');
          if(!name.value.trim() || !email || !email.value.trim()){
            const err=document.getElementById('mo-err'); if(err){err.textContent='Enter your name and email.';err.classList.add('on');}
            return;
          }
          if(pw) pw.value='kingdom2026';
        }
        return originalCheck.apply(this,arguments);
      };
      try{ checkPw=wrappedCheck; }catch(e){}
      window.checkPw=wrappedCheck;
    }
  }

  function brandStaticUI(){
    document.title='Kingdom Principles · The Principle of Identity';
    document.documentElement.dataset.series='kingdom-principles';
    const setText=function(selector,value){document.querySelectorAll(selector).forEach(function(node){node.textContent=value;});};
    const setHTML=function(selector,value){document.querySelectorAll(selector).forEach(function(node){node.innerHTML=value;});};
    setHTML('.mo-title','KINGDOM <span>PRINCIPLES</span>');
    setHTML('.hub-logo','KINGDOM <span>PRINCIPLES</span>');
    setHTML('.q-logo','KINGDOM <span>PRINCIPLES</span>');
    setHTML('.sc-title','<span class="tt">KINGDOM</span><span class="tm">PRINCIPLES</span>');
    setHTML('.hub-title','KINGDOM <span>PRINCIPLES</span>');
    setText('.sc-ey','KINGDOM DECISIONS SERIES');
    setText('.hub-ey','KINGDOM DECISIONS SERIES');
    setText('.sc-sub','THE PRINCIPLE OF IDENTITY');
    setText('.hub-sub','THE PRINCIPLE OF IDENTITY');
    setText('.sc-tag',SERIES.tagline);
    setText('.hub-ref',SERIES.tagline);
    setText('.series-lbl','SERIES PROGRESS · KINGDOM PRINCIPLES');
    setText('.q-hero-title','THE PRINCIPLE OF IDENTITY');
    setText('.q-hero-sub','Stop proving. Start believing.');
    document.querySelectorAll('img[src*="qr-ministry"]').forEach(function(img){img.src='/assets/qr-kingdom.svg';});
    document.querySelectorAll('img[src*="qr-guide"]').forEach(function(img){img.src='/assets/qr-guide-gold.svg';});
    document.querySelectorAll('[placeholder*="access code" i]').forEach(function(el){if(el.id!=='mo-pw')el.placeholder='';});
  }

  function rebuildLessonSurfaces(){
    installData();
    installRegistry();
    try{ if(typeof applySelectedLesson==='function') applySelectedLesson('lesson-1'); }catch(e){}
    try{ if(typeof updateLandingLessonState==='function') updateLandingLessonState('lesson-1'); }catch(e){}
    try{ if(typeof buildSlides==='function'){ const ss=document.getElementById('ss-slides'); if(ss) buildSlides(ss,SLIDES); const preview=document.getElementById('preview-slides'); if(preview) buildSlides(preview,SLIDES); } }catch(e){}
    try{ if(typeof renderDots==='function') renderDots(SLIDES.length); }catch(e){}
    try{ if(typeof buildCtrlSurface==='function') buildCtrlSurface(); }catch(e){}
    try{ if(typeof buildVerseBank==='function') buildVerseBank(); }catch(e){}
    try{ if(typeof buildMobileVerseList==='function') buildMobileVerseList(); }catch(e){}
    try{ if(typeof buildQuestionnaire==='function') buildQuestionnaire(); }catch(e){}
    try{ if(typeof renderPollBank==='function') renderPollBank(); }catch(e){}
    try{ if(typeof goTo==='function') goTo(0); }catch(e){}
  }

  function cleanLessonChooser(){
    document.querySelectorAll('.lesson-pill').forEach(function(btn){
      const slug=btn.dataset.lesson;
      if(slug==='lesson-1'){
        btn.textContent='LESSON 1'; btn.classList.add('on'); btn.dataset.locked='false';
      }else if(slug==='lesson-2'){
        btn.textContent='LESSON 2 · PRIORITY'; btn.classList.remove('on'); btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();};
      }else if(slug==='lesson-3'){
        btn.textContent='LESSON 3 · ALIGNMENT'; btn.classList.remove('on'); btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();};
      }else{
        btn.remove();
      }
    });
    const host=document.querySelector('#admin-hub .cmd-bar');
    if(host){
      ['lesson-1','lesson-2','lesson-3'].forEach(function(slug){
        if(!host.querySelector('.lesson-pill[data-lesson="'+slug+'"]')){
          const btn=document.createElement('button'); btn.className='cmd-pill lesson-pill'+(slug==='lesson-1'?' on':''); btn.dataset.lesson=slug;
          btn.textContent=slug==='lesson-1'?'LESSON 1':slug==='lesson-2'?'LESSON 2 · PRIORITY':'LESSON 3 · ALIGNMENT';
          if(slug==='lesson-1') btn.onclick=function(){ if(typeof adminSelectLesson==='function') adminSelectLesson('lesson-1'); };
          else{ btn.dataset.locked='true'; btn.onclick=function(event){event.preventDefault();}; }
          host.appendChild(btn);
        }
      });
    }
  }

  function removeLegacyVisibleText(){
    const bad=/THE FIVE OUTCOMES OF MINISTRY|THE PRICE OF BEING SENT|THE DISCIPLINE OF THE SENT|THE MAKING OF A MINISTER|WHAT IT TAKES TO MAKE IT|MATTHEW 10 SERIES|JUNE 18|JUNE 25|JULY 2|JULY 9|JULY 16/i;
    document.querySelectorAll('body *').forEach(function(node){
      if(node.children.length===0 && bad.test(node.textContent||'')){
        const parent=node.closest('.lesson-pill,.s-cell,.lcard');
        if(parent && !parent.dataset.kpProtected) parent.remove();
      }
    });
  }

  let applying=false;
  function applyAll(){
    if(applying) return;
    applying=true;
    try{
      brandStaticUI();
      cleanLessonChooser();
      removeLegacyVisibleText();
    }finally{applying=false;}
  }

  installData();
  installRegistry();
  installRenderer();
  attendeeLoginWithoutPassword();

  function boot(){
    rebuildLessonSurfaces();
    applyAll();
    [100,350,800,1600,3000].forEach(function(delay){setTimeout(function(){rebuildLessonSurfaces();applyAll();},delay);});
    const observer=new MutationObserver(function(){ if(!applying) requestAnimationFrame(applyAll); });
    observer.observe(document.documentElement,{childList:true,subtree:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
  window.addEventListener('pageshow',function(){setTimeout(function(){rebuildLessonSurfaces();applyAll();},80);});
})();
