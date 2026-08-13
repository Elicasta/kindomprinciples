/* Kingdom Principles - Lesson 2: The Principle of Priority
   Slide copy follows the supplied 48-slide deck. Presenter notes are aligned
   from the supplied lesson notes and do not alter visible slide wording.
*/
(function(){
  'use strict';

  const META2={
    num:'02',label:'Lesson 2',dateShort:'August 13',dateLong:'August 13, 2026',
    title:'The Principle of Priority',text:'Matthew 6:19-34',slides:'48 Slides',
    tagline:'Whatever Comes First Becomes Your Master',
    reflectionTitle:'The Principle of Priority',reflectionMeta:'Closing response · Weekly practice',open:true
  };

  const SLIDES2=[
    {t:'cover',eyebrow:'Kingdom Decisions Series',lesson:'Lesson 2',title:'The Principle of Priority',ref:'Whatever Comes First Becomes Your Master',date:'August 13, 2026',text:'Matthew 6:19-34'},
    {t:'sc',ref:'Matthew 6:33 KJV',text:'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.'},
    {t:'big',sup:'Kingdom Principle',text:'Your priorities reveal what you trust, what you value, and what you believe can sustain you.'},
    {t:'te',n:'04',hl:'Matthew 6 Is <span class="acc">Connected</span>',pts:['Matthew 6 is not a collection of random teachings about money, eyesight, masters, anxiety, and seeking the Kingdom.','They are connected.']},
    {t:'te',n:'05',hl:'Hidden <span class="acc">Blind Spot</span>',pts:['Many people say God is first because they attend church.','But priority is not measured by the order in which we list things.']},
    {t:'te',n:'06',hl:'Priority Is <span class="acc">Revealed By</span>',pts:['what receives our best time','what controls our mood','what we protect from interruption','what we continually think about','what we fear losing','what we sacrifice obedience to preserve']},
    {t:'big',sup:'Primary Text',text:'Matthew 6:19-34'},
    {t:'big',sup:'Priority',text:'Your treasure reveals your <span class="acc">heart.</span>'},
    {t:'sc',ref:'Matthew 6:19-21 KJV',text:'Lay not up for yourselves treasures upon earth, where moth and rust doth corrupt, and where thieves break through and steal: But lay up for yourselves treasures in heaven, where neither moth nor rust doth corrupt, and where thieves do not break through nor steal: For where your treasure is, there will your heart be also.'},
    {t:'sc',ref:'Proverbs 3:9-10 KJV',text:'Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine.'},
    {t:'te',n:'11',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Treasure is more than money.','Treasure receives our attention, sacrifice, protection, and emotional investment.','The heart follows investment.','We choose heaven or earth.']},
    {t:'te',n:'12',hl:'How It <span class="acc">Shows Up</span>',pts:['Giving God whatever time remains','Changing spending habits only after financial pressure arrives','Protecting comfort more than obedience','Measuring value by what is accumulated instead of what is surrendered']},
    {t:'big',sup:'Question',text:'What happens when we let it show up <span class="acc">too often?</span>'},
    {t:'sc',ref:'Proverbs 11:24-26 KJV',text:'There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty. The liberal soul shall be made fat: and he that watereth shall be watered also himself. He that withholdeth corn, the people shall curse him: but blessing shall be upon the head of him that selleth it.'},
    {t:'sc',ref:'Proverbs 11:27-28 KJV',text:'He that diligently seeketh good procureth favour: but he that seeketh mischief, it shall come unto him. He that trusteth in his riches shall fall; but the righteous shall flourish as a branch.'},
    {t:'big',sup:'Summary Teaching Point',text:'Growth and abundance are not determine by the method, its determined by how aligned you are with God.'},
    {t:'big',sup:'Priority',text:'Your eye determines how you <span class="acc">interpret life.</span>'},
    {t:'sc',ref:'Matthew 6:22-23 KJV',text:'The light of the body is the eye: if therefore thine eye be single, thy whole body shall be full of light. But if thine eye be evil, thy whole body shall be full of darkness. If therefore the light that is in thee be darkness, how great is that darkness!'},
    {t:'te',n:'19',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Vision affects the whole life.','What we continually focus on shapes how we interpret everything else.']},
    {t:'te',n:'20',hl:'How It <span class="acc">Shows Up</span>',pts:['Being physically present in prayer but mentally consumed by tomorrow','Continually thinking about money, status, image, or outcomes','Letting comparison shape contentment','Seeing life through pressure instead of through trust']},
    {t:'sc',ref:'Proverbs 23:4-5 KJV',text:'Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.'},
    {t:'te',n:'22',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Sometimes we place our eyes on the wrong treasures and it ends up being for nothing.','We set our eyes on things that may seem valuable all for them to fly away.']},
    {t:'big',sup:'Priority',text:'Your master determines whom you <span class="acc">serve.</span>'},
    {t:'sc',ref:'Matthew 6:24 KJV',text:'No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.'},
    {t:'te',n:'25',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Two masters cannot share the throne.','Divided loyalty eventually becomes practical disobedience.']},
    {t:'te',n:'26',hl:'How It <span class="acc">Shows Up</span>',pts:['Allowing financial pressure to justify dishonesty','Making career decisions without considering spiritual health','Sacrificing conviction to preserve opportunity','Wanting God to support our priorities instead of submitting our priorities to Him']},
    {t:'sc',ref:'1 Timothy 6:6-8 KJV',text:'But godliness with contentment is great gain. For we brought nothing into this world, and it is certain we can carry nothing out. And having food and raiment let us be therewith content.'},
    {t:'sc',ref:'1 Timothy 6:9-10 KJV',text:'But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition. For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.'},
    {t:'te',n:'29',hl:'Summary <span class="acc">Teaching Point</span>',pts:['We avoid serving two masters only when we prioritize treasuring the right things the right way with the right attitude.','When we set our hearts on being loyal to money and riches then fall into many hurtful lust which drives us to perdition.']},
    {t:'big',sup:'Priority',text:'Your anxiety reveals what you believe holds your <span class="acc">future.</span>'},
    {t:'sc',ref:'Matthew 6:25 KJV',text:'Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment?'},
    {t:'sc',ref:'Matthew 6:26 KJV',text:'Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?'},
    {t:'te',n:'33',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Worry is often a priority disorder.','The way we know what you care about is what you worry about.','We carry responsibility for things God never placed under our control.','We often worry because we forget who is in control.']},
    {t:'te',n:'34',hl:'How It <span class="acc">Shows Up</span>',pts:['Letting tomorrow’s needs consume today’s obedience','Trying to control what God never assigned to us','Treating worry as responsibility','Carrying pressure that prayer was meant to surrender']},
    {t:'big',sup:'Priority',text:'Your priority determines what organizes <span class="acc">everything else.</span>'},
    {t:'sc',ref:'Matthew 6:27-30 KJV',text:'Which of you by taking thought can add one cubit unto his stature? And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these. Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith?'},
    {t:'sc',ref:'Matthew 6:31-32 KJV',text:'Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things.'},
    {t:'sc',ref:'Matthew 6:33-34 KJV',text:'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.'},
    {t:'te',n:'39',hl:'Summary <span class="acc">Teaching Point</span>',pts:['Your priorities show your faith.','Your faith determines your priority.','If you have small faith that God will provide, then you will live worrying and trying to organize your life the best that you can.','“Seek first” is an ordering principle.','Jesus establishes what must govern work, food, clothing, and responsibility.']},
    {t:'big',sup:'Question',text:'How are you ordering <span class="acc">your life?</span>'},
    {t:'te',n:'41',hl:'How It <span class="acc">Shows Up</span>',pts:['Treating church, prayer, and Scripture as additions rather than governing structures','Neglecting family while claiming to provide for family','Organizing life around urgency instead of the Kingdom','Giving God agreement in principle but not priority in practice']},
    {t:'sc',ref:'Haggai 1:5-6 KJV',text:'Now therefore thus saith the LORD of hosts; Consider your ways. Ye have sown much, and bring in little; ye eat, but ye have not enough; ye drink, but ye are not filled with drink; ye clothe you, but there is none warm; and he that earneth wages earneth wages to put it into a bag with holes.'},
    {t:'sc',ref:'Haggai 1:7 KJV',text:'Thus saith the LORD of hosts; Consider your ways.'},
    {t:'te',n:'44',hl:'Summary <span class="acc">Teaching Point</span>',pts:['The Lord tells us consider your ways, stop for a moment and consider where you’re at.','See if all your toil has brought you the happiness or fulfillment you want.','Sometimes because are priorities are wrong we are never blessed by God.']},
    {t:'big',sup:'Closing Response',text:'Closing Response'},
    {t:'te',n:'46',hl:'Practical <span class="acc">Framework</span>',pts:['Time — What consistently receives my best attention?','Money — What does my spending reveal that I value?','Thought — What occupies my mind when nothing else demands it?','Relationships — Who has the strongest influence over my decisions?','Anxiety — What am I trying to control because I do not trust God with it?']},
    {t:'te',n:'47',hl:'Weekly <span class="acc">Practice</span>',pts:['Choose one visible priority change:','establish a prayer time','repair a neglected relationship','remove an unhealthy influence','change a spending habit','establish a Sabbath rhythm','stop giving tomorrow’s problems today’s attention']},
    {t:'final',kicker:'Closing Question',text:'Does my daily schedule support my claim that Jesus is King?'}
  ];

  const NOTES2={
    0:'Open with the title: Whatever Comes First Becomes Your Master. Frame priority as the ordering principle for the lesson.',
    1:'Read Matthew 6:33. Keep “seek first” in front of the room. This is the governing text for the whole lesson.',
    2:'State the Kingdom Principle: priorities reveal trust, value, and what we believe can sustain us.',
    3:'Explain that Matthew 6:19-34 is connected. Treasure, eyesight, masters, anxiety, and seeking the Kingdom all expose priority.',
    4:'Many people say God is first because they attend church. Priority is not measured by the order in which we list things.',
    5:'Slow down here. Priority is revealed by best time, mood, protected space, repeated thoughts, feared losses, and what we preserve at the expense of obedience.',
    6:'Introduce Matthew 6:19-34 as the primary text and the structure for the next movements.',
    7:'First movement: treasure. Your treasure reveals your heart.',
    8:'Read Matthew 6:19-21. Emphasize “lay not up.” We actively place treasure. Jesus says the heart follows where treasure is placed.',
    9:'Use Proverbs 3:9-10 to connect firstfruits with visible priority and honoring God with substance.',
    10:'Treasure is more than money. It receives attention, sacrifice, protection, and emotional investment. The heart follows investment. We choose heaven or earth.',
    11:'Make this practical: leftovers for God, reactive spending changes, protecting comfort, and measuring value by accumulation instead of surrender.',
    12:'Ask what happens when this pattern is allowed to repeat too often. Transition to Proverbs 11.',
    13:'Read Proverbs 11:24-26. Contrast scattering and increasing with withholding and poverty.',
    14:'Continue through Proverbs 11:27-28. The issue lands on trust: he that trusteth in his riches shall fall.',
    15:'Land the point exactly: growth and abundance are not determine by the method, its determined by how aligned you are with God.',
    16:'Second movement: the eye. Your eye determines how you interpret life.',
    17:'Read Matthew 6:22-23. Connect the condition of the eye to the condition of the whole body.',
    18:'Vision affects the whole life. What we continually focus on shapes how we interpret everything else.',
    19:'Apply it: prayer with tomorrow dominating the mind, money/status/image, comparison, and interpreting life through pressure instead of trust.',
    20:'Read Proverbs 23:4-5. Riches can make themselves wings. What the eye fixes on can disappear.',
    21:'Look at this: sometimes we place our eyes on the wrong treasures and it ends up being for nothing. Things that seem valuable can fly away.',
    22:'Third movement: master. Your master determines whom you serve.',
    23:'Read Matthew 6:24. Do not soften Jesus’ language. Two masters cannot share the throne.',
    24:'Divided loyalty eventually becomes practical disobedience.',
    25:'Show the divided-master problem in real decisions: dishonesty under pressure, career without spiritual health, sacrificing conviction, asking God to support our priorities.',
    26:'Read 1 Timothy 6:6-8. Godliness with contentment is great gain.',
    27:'Read 1 Timothy 6:9-10. The desire to be rich creates a snare and pierces people through with many sorrows.',
    28:'We avoid serving two masters by treasuring the right things, the right way, with the right attitude. Loyalty to riches pulls people toward hurtful lusts.',
    29:'Fourth movement: anxiety. Anxiety reveals what you believe holds your future.',
    30:'Read Matthew 6:25. Jesus connects daily needs to trust.',
    31:'Read Matthew 6:26. The Father feeds the birds. Ask: Are ye not much better than they?',
    32:'Worry is often a priority disorder. What we worry about reveals what we care about. We carry responsibility God never placed under our control.',
    33:'Apply it: tomorrow consuming today, controlling what was never assigned, calling worry responsibility, carrying pressure prayer was meant to surrender.',
    34:'Fifth movement: your priority determines what organizes everything else.',
    35:'Read Matthew 6:27-30. Anxiety cannot add a cubit. The lilies expose the limits of our control and the sufficiency of God.',
    36:'Read Matthew 6:31-32. The Father already knows what you need.',
    37:'Read Matthew 6:33-34. “Seek first” is the ordering command. Tomorrow has its own trouble.',
    38:'Your priorities show your faith, but your faith also determines your priority. Small faith in God’s provision produces worry and self-organization. Seek first governs work, food, clothing, and responsibility.',
    39:'Ask the room plainly: How are you ordering your life?',
    40:'Show the disorder: spiritual life treated as an addition, family neglected in the name of provision, urgency governing life, agreement without practice.',
    41:'Read Haggai 1:5-6. “Consider your ways.” Much activity can still produce little when the order is wrong.',
    42:'Repeat Haggai 1:7. Stop and consider your ways.',
    43:'Ask whether all the toil has actually produced the happiness or fulfillment desired. Sometimes wrong priorities leave us outside the blessing we are asking God for.',
    44:'Move into response. This is not only a teaching conclusion; give people room to examine their actual order.',
    45:'Walk through all five areas: time, money, thought, relationships, anxiety. Let each diagnostic question expose visible priority.',
    46:'Ask everyone to choose one visible priority change. Keep it concrete and measurable this week.',
    47:'Close with the diagnostic question: Does my daily schedule support my claim that Jesus is King? Pause and let the question sit.'
  };

  const VERSES2=[
    {id:'mt6-33',ref:'Matthew 6:33',kjv:'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.',slides:[1,37]},
    {id:'mt6-19-21',ref:'Matthew 6:19-21',kjv:'Lay not up for yourselves treasures upon earth, where moth and rust doth corrupt, and where thieves break through and steal: But lay up for yourselves treasures in heaven, where neither moth nor rust doth corrupt, and where thieves do not break through nor steal: For where your treasure is, there will your heart be also.',slides:[8]},
    {id:'prov3-9-10',ref:'Proverbs 3:9-10',kjv:'Honour the LORD with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine.',slides:[9]},
    {id:'prov11-24-26',ref:'Proverbs 11:24-26',kjv:'There is that scattereth, and yet increaseth; and there is that withholdeth more than is meet, but it tendeth to poverty. The liberal soul shall be made fat: and he that watereth shall be watered also himself. He that withholdeth corn, the people shall curse him: but blessing shall be upon the head of him that selleth it.',slides:[13]},
    {id:'prov11-27-28',ref:'Proverbs 11:27-28',kjv:'He that diligently seeketh good procureth favour: but he that seeketh mischief, it shall come unto him. He that trusteth in his riches shall fall; but the righteous shall flourish as a branch.',slides:[14]},
    {id:'mt6-22-23',ref:'Matthew 6:22-23',kjv:'The light of the body is the eye: if therefore thine eye be single, thy whole body shall be full of light. But if thine eye be evil, thy whole body shall be full of darkness. If therefore the light that is in thee be darkness, how great is that darkness!',slides:[17]},
    {id:'prov23-4-5',ref:'Proverbs 23:4-5',kjv:'Labour not to be rich: cease from thine own wisdom. Wilt thou set thine eyes upon that which is not? for riches certainly make themselves wings; they fly away as an eagle toward heaven.',slides:[20]},
    {id:'mt6-24',ref:'Matthew 6:24',kjv:'No man can serve two masters: for either he will hate the one, and love the other; or else he will hold to the one, and despise the other. Ye cannot serve God and mammon.',slides:[23]},
    {id:'1tim6-6-8',ref:'1 Timothy 6:6-8',kjv:'But godliness with contentment is great gain. For we brought nothing into this world, and it is certain we can carry nothing out. And having food and raiment let us be therewith content.',slides:[26]},
    {id:'1tim6-9-10',ref:'1 Timothy 6:9-10',kjv:'But they that will be rich fall into temptation and a snare, and into many foolish and hurtful lusts, which drown men in destruction and perdition. For the love of money is the root of all evil: which while some coveted after, they have erred from the faith, and pierced themselves through with many sorrows.',slides:[27]},
    {id:'mt6-25',ref:'Matthew 6:25',kjv:'Therefore I say unto you, Take no thought for your life, what ye shall eat, or what ye shall drink; nor yet for your body, what ye shall put on. Is not the life more than meat, and the body than raiment?',slides:[30]},
    {id:'mt6-26',ref:'Matthew 6:26',kjv:'Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?',slides:[31]},
    {id:'mt6-27-30',ref:'Matthew 6:27-30',kjv:'Which of you by taking thought can add one cubit unto his stature? And why take ye thought for raiment? Consider the lilies of the field, how they grow; they toil not, neither do they spin: And yet I say unto you, That even Solomon in all his glory was not arrayed like one of these. Wherefore, if God so clothe the grass of the field, which to day is, and to morrow is cast into the oven, shall he not much more clothe you, O ye of little faith?',slides:[35]},
    {id:'mt6-31-32',ref:'Matthew 6:31-32',kjv:'Therefore take no thought, saying, What shall we eat? or, What shall we drink? or, Wherewithal shall we be clothed? (For after all these things do the Gentiles seek:) for your heavenly Father knoweth that ye have need of all these things.',slides:[36]},
    {id:'mt6-33-34',ref:'Matthew 6:33-34',kjv:'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof.',slides:[37]},
    {id:'hag1-5-6',ref:'Haggai 1:5-6',kjv:'Now therefore thus saith the LORD of hosts; Consider your ways. Ye have sown much, and bring in little; ye eat, but ye have not enough; ye drink, but ye are not filled with drink; ye clothe you, but there is none warm; and he that earneth wages earneth wages to put it into a bag with holes.',slides:[41]},
    {id:'hag1-7',ref:'Haggai 1:7',kjv:'Thus saith the LORD of hosts; Consider your ways.',slides:[42]}
  ];

  const SCRIPTURES2=SLIDES2.map(function(slide,index){
    const ref=String(slide.ref||'').replace(/\s+KJV$/i,'');
    const match=VERSES2.find(function(v){return ref.indexOf(v.ref)!==-1||v.slides.indexOf(index)!==-1;});
    return match?{ref_en:match.ref,text_en:match.kjv,ref_es:match.ref,text_es:''}:{ref_en:ref,text_en:'',ref_es:ref,text_es:''};
  });

  const QUESTIONS2=[
    {section:'Priority Audit',questions:[
      {num:'1',text:'What consistently receives my best attention?'},
      {num:'2',text:'What does my spending reveal that I value?'},
      {num:'3',text:'What occupies my mind when nothing else demands it?'},
      {num:'4',text:'Who has the strongest influence over my decisions?'},
      {num:'5',text:'What am I trying to control because I do not trust God with it?'},
      {num:'6',text:'What visible priority change will I make this week?'},
      {num:'7',text:'Does my daily schedule support my claim that Jesus is King?'}
    ]}
  ];

  const PAYLOAD2={slug:'lesson-2',label:'Lesson 2',title:'The Principle of Priority',text:'Matthew 6:19-34',slides:SLIDES2,notes:NOTES2,scriptureMap:SCRIPTURES2,verseBank:VERSES2,questions:QUESTIONS2,pollBank:[]};
  let lesson1=null;
  let current='lesson-1';

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function replaceArray(target,source){if(!Array.isArray(target))return;target.splice(0,target.length);source.forEach(function(v){target.push(clone(v));});}
  function replaceObject(target,source){if(!target)return;Object.keys(target).forEach(function(k){delete target[k];});Object.assign(target,clone(source));}
  function snapshotLesson1(){
    if(lesson1)return;
    try{lesson1={slides:clone(LESSON1_SLIDES),notes:clone(NOTES_L1),scriptureMap:clone(SCRIPTURE_MAP),verseBank:clone(VERSE_BANK),questions:clone(QUESTIONS),pollBank:clone(window.POLL_BANK||[]),data:clone(window.LESSON_DATA||{})};}catch(e){}
  }
  function rebuild(index){
    index=Math.max(0,Math.min(Number(index)||0,LESSON1_SLIDES.length-1));
    try{if(typeof buildSlides==='function'){const stage=document.getElementById('ss-slides');if(stage)buildSlides(stage,LESSON1_SLIDES);const preview=document.getElementById('preview-slides');if(preview)buildSlides(preview,LESSON1_SLIDES);}}catch(e){}
    try{if(typeof renderDots==='function')renderDots(LESSON1_SLIDES.length);}catch(e){}
    try{if(typeof buildCtrlSurface==='function')buildCtrlSurface();}catch(e){}
    try{if(typeof buildVerseBank==='function')buildVerseBank();}catch(e){}
    try{if(typeof buildMobileVerseList==='function')buildMobileVerseList();}catch(e){}
    try{if(typeof buildQuestionnaire==='function')buildQuestionnaire();}catch(e){}
    try{if(typeof updateLandingLessonState==='function')updateLandingLessonState(current);}catch(e){}
    try{if(typeof updateCtrlSurface==='function')updateCtrlSurface(index);}catch(e){}
    try{if(typeof updateMobileMode==='function')updateMobileMode(index);}catch(e){}
    try{if(typeof updateConfidence==='function')updateConfidence(index);}catch(e){}
    try{curSlide=index;}catch(e){}
  }
  function applyPayload(payload,index){
    replaceArray(LESSON1_SLIDES,payload.slides);
    replaceObject(NOTES_L1,payload.notes);
    replaceArray(SCRIPTURE_MAP,payload.scriptureMap);
    replaceArray(VERSE_BANK,payload.verseBank);
    replaceArray(QUESTIONS,payload.questions);
    window.POLL_BANK=clone(payload.pollBank||[]);
    window.LESSON_SLUG=payload.slug;
    window.LESSON_DATA={slug:payload.slug,label:payload.label,title:payload.title,text:payload.text};
    current=payload.slug;
    try{localStorage.setItem('kp_selected_lesson',current);}catch(e){}
    document.title='Kingdom Principles · '+payload.title;
    rebuild(index||0);
    document.querySelectorAll('.lesson-pill').forEach(function(btn){btn.classList.toggle('on',btn.dataset.lesson===current);});
  }
  function applyLesson(slug,index){
    snapshotLesson1();
    if(slug==='lesson-2'){applyPayload(PAYLOAD2,index);return PAYLOAD2;}
    if(slug==='lesson-1'&&lesson1){
      applyPayload({slug:'lesson-1',label:'Lesson 1',title:'The Principle of Identity',text:'Matthew 3:13-17 · Matthew 4:1-11',slides:lesson1.slides,notes:lesson1.notes,scriptureMap:lesson1.scriptureMap,verseBank:lesson1.verseBank,questions:lesson1.questions,pollBank:lesson1.pollBank},index);return lesson1;
    }
    return null;
  }

  function installChooser(){
    try{if(window.HOME_LESSON_META){window.HOME_LESSON_META['lesson-2']=Object.assign({},META2);}}catch(e){}
    document.querySelectorAll('.lesson-pill[data-lesson="lesson-2"]').forEach(function(btn){btn.textContent='LESSON 2 · PRIORITY';btn.dataset.locked='false';btn.classList.remove('locked');btn.onclick=function(){window.adminSelectLesson('lesson-2');};});
  }

  const oldAdmin=window.adminSelectLesson;
  window.adminSelectLesson=function(slug){
    if(slug==='lesson-2'||slug==='lesson-1'){
      applyLesson(slug,0);
      try{if(typeof sbSend==='function')sbSend({type:'lesson_select',lesson:slug,slide:0});}catch(e){}
      return;
    }
    return typeof oldAdmin==='function'?oldAdmin.apply(this,arguments):undefined;
  };
  try{adminSelectLesson=window.adminSelectLesson;}catch(e){}

  const oldHandle=window.handleMessage;
  window.handleMessage=function(msg){
    if(msg&&msg.type==='lesson_select'&&(msg.lesson==='lesson-1'||msg.lesson==='lesson-2')){applyLesson(msg.lesson,Number(msg.slide)||0);return;}
    if(msg&&msg.lesson==='lesson-2'&&current!=='lesson-2')applyLesson('lesson-2',Number(msg.slide)||0);
    if(msg&&msg.lesson==='lesson-1'&&current!=='lesson-1')applyLesson('lesson-1',Number(msg.slide)||0);
    return typeof oldHandle==='function'?oldHandle.apply(this,arguments):undefined;
  };
  try{handleMessage=window.handleMessage;}catch(e){}

  function boot(){
    snapshotLesson1();
    installChooser();
    const saved=(new URLSearchParams(location.search).get('lesson')||localStorage.getItem('kp_selected_lesson')||'lesson-1');
    if(saved==='lesson-2')applyLesson('lesson-2',0);
    [400,1200,3200].forEach(function(delay){setTimeout(function(){installChooser();if(current==='lesson-2')applyLesson('lesson-2',curSlide||0);},delay);});
    window.KINGDOM_LESSON2=PAYLOAD2;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
