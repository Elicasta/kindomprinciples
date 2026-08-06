/* Kingdom Principles series override. Preserves the stable presentation engine. */
(() => {
  const slides = [
    {t:'cover', eyebrow:'The Principle of Identity', lesson:'Kingdom Decisions Series', title:'The Principle of Identity', ref:'Identity must be settled before pressure comes.'},
    {t:'sc', ref:'Psalm 139:13-18 KJV', text:'“I will praise thee; for I am fearfully and wonderfully made...” (Psalm 139:14)', tk:'Identity begins with God’s knowledge of us, not our performance before others.'},
    {t:'big', sup:'Kingdom Principle', text:'You cannot consistently make Kingdom decisions while allowing pressure, appetite, and people to define who you are.'},
    {t:'te', n:'', hl:'Today’s Principle', pts:['The Principle of Identity','Identity is not built by attention, achievement, approval, or appetite.','Identity is received from God and confirmed by His Word.']},
    {t:'te', n:'01', hl:'Principle #1', pts:['Identity must be settled before pressure comes.','<span class="hi">Matthew 3:17 KJV</span>','“This is my beloved Son, in whom I am well pleased.”','The Father declared Jesus’ identity before Jesus performed miracles, preached sermons, or called disciples.'], ref:'Matthew 3:17 KJV'},
    {t:'big', sup:'Heaven Speaks First', text:'God says: <span class="acc">“This is my beloved Son.”</span><br>Then pressure says: <span class="acc">“If thou be the Son of God...”</span>', ref:'The enemy did not attack Jesus’ hunger first. He attacked God’s declaration first.'},
    {t:'big', sup:'The Pattern', text:'God speaks. Pressure questions. Faith believes.', ref:'The wilderness did not change Jesus’ identity. It tested whether He believed what the Father had spoken.'},
    {t:'te', n:'02', hl:'Principle #2', pts:['Identity will be tested after it is established.','1. God establishes identity before the wilderness.','2. Pressure attacks what God has spoken.','3. Insecurity demands proof.']},
    {t:'te', n:'', hl:'God Establishes Identity', pts:['<span class="hi">Matthew 3:17 KJV</span>','“This is my beloved Son, in whom I am well pleased.”','<span class="hi">Principle:</span> God prepares identity before He permits pressure.'], ref:'Matthew 3:17 KJV'},
    {t:'te', n:'', hl:'Pressure Attacks Declaration', pts:['<span class="hi">Matthew 4:3 KJV</span>','“If thou be the Son of God...”','The devil does not create a new identity. He questions the one already given.'], ref:'Matthew 4:3 KJV'},
    {t:'te', n:'', hl:'Insecurity Demands Proof', pts:['<span class="hi">Romans 8:14-17 KJV</span>','“The Spirit itself beareth witness with our spirit, that we are the children of God.”','When God has already spoken, we do not need people to repeat it.'], ref:'Romans 8:14-17 KJV'},
    {t:'te', n:'03', hl:'Principle #3', pts:['Temptation serves the purpose of refining identity.','Temptation often offers something outside the Father’s order.','Bread without waiting.','Recognition without humility.','Authority without the cross.']},
    {t:'big', sup:'Shortcuts vs. Process', text:'The enemy promises shortcuts.<br>God develops sons through process.', ref:'Satan offers crowns without submission. Satan offers the kingdom without the King.'},
    {t:'te', n:'', hl:'Jesus Answered With the Word', pts:['Three times Jesus answered: <span class="hi">“It is written...”</span>','Jesus did not argue, defend Himself, or explain His identity. He answered from Scripture.']},
    {t:'te', n:'04', hl:'Principle #4', pts:['Settled identity produces stable obedience.','Jesus did not need bread, spectacle, or kingdoms to prove He was God’s Son.','<span class="hi">Key thought:</span> Identity settled by God produces obedience that is not dependent upon circumstances.']},
    {t:'te', n:'', hl:'The Three Identity Pressures', pts:['<span class="hi">Appetite, Approval, and Control</span>','These pressures expose:','Appetite: What do you desire?','Approval: Whose validation do you require?','Control: Whose will do you follow?']},
    {t:'te', n:'01', hl:'Pressure #1, Appetite', pts:['<span class="hi">Matthew 4:3-4 KJV</span>','<span class="hi">Principle:</span> Appetite is the pressure to let immediate desire overrule God’s order.','<span class="hi">Daily examples:</span>','“I know it is wrong, but I need this.”','“I cannot wait.”','“God understands why I have to do this.”'], ref:'Matthew 4:3-4 KJV'},
    {t:'te', n:'02', hl:'Pressure #2, Approval', pts:['<span class="hi">Matthew 4:5-7 KJV</span>','<span class="hi">Principle:</span> Approval becomes a trap when identity is rooted in people’s opinions instead of God’s declaration.','<span class="hi">Daily examples:</span>','Needing to be noticed.','Becoming offended when overlooked.','Posting for reaction.','Speaking for applause.'], ref:'Matthew 4:5-7 KJV'},
    {t:'te', n:'03', hl:'Pressure #3, Control', pts:['<span class="hi">Matthew 4:8-10 KJV</span>','<span class="hi">Principle:</span> Control is the pressure to reach a destination without submitting to God’s process.','<span class="hi">Daily examples:</span>','Manipulating situations.','Compromising to advance faster.','Forcing relationships.','Refusing to wait.'], ref:'Matthew 4:8-10 KJV'},
    {t:'te', n:'', hl:'Weekly Practice', pts:['Prayerfully identify one area where you have been trying to prove something.','<span class="hi">Possible areas:</span>','Worth','Intelligence','Spirituality','Success','Strength','Independence']},
    {t:'te', n:'', hl:'Replace Proving With Believing', pts:['<span class="hi">Meditate on:</span>','Romans 8:16','Colossians 3:3','Psalm 139:14','<span class="hi">Challenge:</span> Choose obedience over self-validation.']},
    {t:'final', kicker:'Closing Reflection', text:'What temptation gains power over me because I have not settled what God says about me?', sub:'Return to God’s Word and replace uncertainty with declaration.'}
  ];

  const notes = {
    0:'Introduce the series and key thought.',1:'Read Psalm 139:13-18. Emphasize verse 14.',2:'State the governing Kingdom principle slowly.',3:'Define identity as received from God.',4:'The Father speaks before public ministry.',5:'Contrast the two voices.',6:'Let the three-part pattern land.',7:'Preview the three ways identity is tested.',8:'Declaration precedes pressure.',9:'Pressure questions what God said.',10:'The Spirit confirms sonship.',11:'Explain temptation as refinement.',12:'Contrast shortcuts with process.',13:'Jesus answers from Scripture.',14:'Stable identity produces stable obedience.',15:'Introduce appetite, approval, and control.',16:'Apply appetite to immediate desire.',17:'Apply approval to public validation.',18:'Apply control to shortcuts and manipulation.',19:'Give quiet space for personal identification.',20:'Move from proving to believing.',21:'Close with reflection and prayer.'
  };

  const scriptures = [
    null,
    {ref_en:'Psalm 139:13-18',text_en:'For thou hast possessed my reins: thou hast covered me in my mother’s womb. I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well. My substance was not hid from thee, when I was made in secret, and curiously wrought in the lowest parts of the earth. Thine eyes did see my substance, yet being unperfect; and in thy book all my members were written, which in continuance were fashioned, when as yet there was none of them. How precious also are thy thoughts unto me, O God! how great is the sum of them! If I should count them, they are more in number than the sand: when I awake, I am still with thee.',ref_es:'Salmo 139:13-18',text_es:''},
    null,null,
    {ref_en:'Matthew 3:17',text_en:'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',ref_es:'Mateo 3:17',text_es:''},
    {ref_en:'Matthew 3:17 / Matthew 4:3',text_en:'This is my beloved Son, in whom I am well pleased. If thou be the Son of God, command that these stones be made bread.',ref_es:'Mateo 3:17 / Mateo 4:3',text_es:''},
    null,null,
    {ref_en:'Matthew 3:17',text_en:'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',ref_es:'Mateo 3:17',text_es:''},
    {ref_en:'Matthew 4:3',text_en:'And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread.',ref_es:'Mateo 4:3',text_es:''},
    {ref_en:'Romans 8:14-17',text_en:'For as many as are led by the Spirit of God, they are the sons of God. For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father. The Spirit itself beareth witness with our spirit, that we are the children of God: And if children, then heirs; heirs of God, and joint-heirs with Christ.',ref_es:'Romanos 8:14-17',text_es:''},
    null,null,null,null,null,
    {ref_en:'Matthew 4:3-4',text_en:'And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread. But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.',ref_es:'Mateo 4:3-4',text_es:''},
    {ref_en:'Matthew 4:5-7',text_en:'Then the devil taketh him up into the holy city, and setteth him on a pinnacle of the temple, And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee: and in their hands they shall bear thee up, lest at any time thou dash thy foot against a stone. Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God.',ref_es:'Mateo 4:5-7',text_es:''},
    {ref_en:'Matthew 4:8-10',text_en:'Again, the devil taketh him up into an exceeding high mountain, and sheweth him all the kingdoms of the world, and the glory of them; And saith unto him, All these things will I give thee, if thou wilt fall down and worship me. Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve.',ref_es:'Mateo 4:8-10',text_es:''},
    null,
    {ref_en:'Romans 8:16 / Colossians 3:3 / Psalm 139:14',text_en:'The Spirit itself beareth witness with our spirit, that we are the children of God. For ye are dead, and your life is hid with Christ in God. I will praise thee; for I am fearfully and wonderfully made.',ref_es:'Romanos 8:16 / Colosenses 3:3 / Salmo 139:14',text_es:''},
    null
  ];

  const verses = [
    {id:'kp-ps139',ref:'Psalm 139:13-18',kjv:scriptures[1].text_en,slides:[1]},
    {id:'kp-mt317',ref:'Matthew 3:17',kjv:'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',slides:[4,5,8]},
    {id:'kp-mt41-3',ref:'Matthew 4:1-3',kjv:'Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred. And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread.',slides:[5,9]},
    {id:'kp-rom814',ref:'Romans 8:14-17',kjv:scriptures[10].text_en,slides:[10]},
    {id:'kp-mt434',ref:'Matthew 4:3-4',kjv:scriptures[16].text_en,slides:[16]},
    {id:'kp-mt457',ref:'Matthew 4:5-7',kjv:scriptures[17].text_en,slides:[17]},
    {id:'kp-mt4810',ref:'Matthew 4:8-10',kjv:scriptures[18].text_en,slides:[18]},
    {id:'kp-prov2925',ref:'Proverbs 29:25',kjv:'The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe.',slides:[17]},
    {id:'kp-rom816',ref:'Romans 8:16',kjv:'The Spirit itself beareth witness with our spirit, that we are the children of God.',slides:[20]},
    {id:'kp-col33',ref:'Colossians 3:3',kjv:'For ye are dead, and your life is hid with Christ in God.',slides:[20]},
    {id:'kp-ps13914',ref:'Psalm 139:14',kjv:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',slides:[1,20]}
  ];

  const questions = [
    {section:'Section 1: Identity',questions:[
      {num:'1',text:'In your own words, what does it mean for identity to be settled in God?'},
      {num:'2',text:'Read Matthew 3:17. What did the Father declare about Jesus before Jesus entered the wilderness?'},
      {num:'3',text:'Why is it important that God spoke identity before Jesus performed public ministry?'},
      {num:'4',text:'What is one thing people often use to define themselves besides God’s Word?'}]},
    {section:'Section 2: Pressure',questions:[
      {num:'1',text:'Read Matthew 4:3. What phrase did the enemy use to question Jesus’ identity?'},
      {num:'2',text:'What does this reveal about how pressure often works?'},
      {num:'3',text:'Have you ever felt pressure to prove who you are? Briefly explain.'},
      {num:'4',text:'Which is harder for you: waiting on God, being overlooked, or giving up control? Why?'}]},
    {section:'Section 3: The Three Identity Pressures',questions:[
      {num:'1',text:'Appetite: What is one desire that can become dangerous if it overrules obedience?'},
      {num:'2',text:'Approval: Whose opinion are you most tempted to seek for validation?'},
      {num:'3',text:'Control: What is one area where you struggle to trust God’s process?'},
      {num:'4',text:'Which of the three pressures, appetite, approval, or control, do you need to watch most closely this week?'}]},
    {section:'Section 4: Scripture Response',questions:[
      {num:'1',text:'Read Romans 8:16. What does the Spirit bear witness to?'},
      {num:'2',text:'Read Colossians 3:3. What does it mean that your life is “hid with Christ in God”?'},
      {num:'3',text:'Read Psalm 139:14. What does this verse teach you about how God sees you?'}]},
    {section:'Section 5: Personal Reflection',questions:[
      {num:'1',text:'What temptation gains power over you when you forget what God says about you?'},
      {num:'2',text:'What have you been trying to prove?'},
      {num:'3',text:'What would it look like this week to stop proving and start believing?'},
      {num:'4',text:'Write one sentence declaring what God says about your identity.'},
      {num:'5',text:'Write one obedience step you will take this week.'}]},
    {section:'Closing Prayer Prompt',questions:[
      {num:'Prayer',text:'Lord, help me receive what You have already declared. Teach me to stop proving myself through performance, people, appetite, or control. Settle my identity in Your Word, and help me obey from sonship, not insecurity. Amen.'}]}
  ];

  const polls = [
    {id:'kp-poll-1',type:'choice',question:'When pressure comes, what area do people usually question first?',options:['Their schedule','Their identity','Their finances','Their talents']},
    {id:'kp-poll-2',type:'choice',question:'In Matthew 4, what did the enemy challenge when he said, “If thou be the Son of God”?',options:['Jesus’ hunger','Jesus’ location','God’s declaration','The disciples’ faith']},
    {id:'kp-poll-3',type:'choice',question:'Which identity pressure is connected to immediate desire?',options:['Appetite','Approval','Control','Comparison']},
    {id:'kp-poll-4',type:'choice',question:'Which identity pressure asks, “Whose validation do you require?”',options:['Appetite','Approval','Control','Fear']},
    {id:'kp-poll-5',type:'choice',question:'Which identity pressure tries to reach the destination without God’s process?',options:['Appetite','Approval','Control','Confusion']},
    {id:'kp-poll-6',type:'choice',question:'What did Jesus use to answer temptation?',options:['Emotion','Explanation','Scripture','Silence only']},
    {id:'kp-poll-7',type:'choice',question:'Which statement best summarizes the lesson?',options:['God only speaks after we succeed.','Identity is earned through performance.','Settled identity produces stable obedience.','Pressure means God has left us.']}
  ];

  LESSON1_SLIDES.splice(0, LESSON1_SLIDES.length, ...slides);
  SCRIPTURE_MAP.splice(0, SCRIPTURE_MAP.length, ...scriptures);
  VERSE_BANK.splice(0, VERSE_BANK.length, ...verses);
  QUESTIONS.splice(0, QUESTIONS.length, ...questions);
  Object.keys(NOTES_L1).forEach(k => delete NOTES_L1[k]);
  Object.assign(NOTES_L1, notes);
  window.POLL_BANK = polls;
  window.LESSON_SLUG = 'lesson-1';

  renderSlide = function(s,i){
    const d=` data-i="${i}"`;
    if(s.t==='cover') return `<div class="slide sl-cover"${d}><div class="sl-cover-bg"></div><div class="sl-cover-ov"></div><div class="sl-cover-body"><div class="sl-cey">${s.eyebrow}</div><div class="sl-ct"><span class="tt">KINGDOM</span><span class="tm">PRINCIPLES</span></div><div class="sl-cln">${s.lesson}</div><div class="sl-cnm">${s.title}</div><div class="sl-crf">${s.ref}</div><div class="sl-cft"><div class="sl-cm"><div class="sl-cml">Presenter</div><div class="sl-cmv">Elder Eli Castaneda</div></div><div class="sl-cm"><div class="sl-cml">Lesson</div><div class="sl-cmv">The Principle of Identity</div></div><div class="sl-cm"><div class="sl-cml">Primary Text</div><div class="sl-cmv">Matthew 3:13-17 through Matthew 4:1-11</div></div></div></div></div>`;
    if(s.t==='sc') return `<div class="slide sl-sc"${d}><div class="sl-sc-mk"></div><div class="sl-sc-rf">&#10013; ${s.ref}</div><div class="sl-sc-tx">${s.text}</div><div class="sl-sc-tk">${s.tk}</div></div>`;
    if(s.t==='te') return `<div class="slide sl-te"${d}><div class="sl-te-n">${s.n||''}</div><div class="sl-te-h">${s.hl}</div><ul class="sl-pts">${(s.pts||[]).map(p=>`<li>${p}</li>`).join('')}</ul>${s.ref?`<div class="sl-te-ref">${s.ref}</div>`:''}</div>`;
    if(s.t==='big') return `<div class="slide sl-big"${d}>${s.sup?`<div class="sl-big-sup">${s.sup}</div>`:''}<div class="sl-big-text">${s.text}</div>${s.ref?`<div class="sl-big-ref">${s.ref}</div>`:''}</div>`;
    if(s.t==='final') return `<div class="slide sl-final"${d}><div class="sl-fk">${s.kicker}</div><div class="sl-ft">${s.text}</div><div class="sl-fl">${s.sub}</div></div>`;
    return '';
  };

  const css = document.createElement('style');
  css.textContent = `
    :root{--bg:#071521;--bgd:#0D2232;--bgc:#101417;--bgcc:#0D2232;--w:#E8E3D9;--mu:#A7A9A6;--ln:rgba(232,227,217,.14);--red:#D6A63B;--redd:#B8872E;--rdim:rgba(214,166,59,.14);--gold:#F2D48A;--fd:'Bebas Neue',Impact,sans-serif;--fc:'Montserrat','Helvetica Neue',sans-serif;--fb:'Montserrat','Helvetica Neue',sans-serif;--fp:'EB Garamond',Georgia,serif}
    .sc-bg,.hub-hero-bg,.ss-stage-bg,.sl-cover-bg,.sp-bg,.poll-screen::before{background-image:linear-gradient(135deg,#071521,#0D2232 58%,#101417)!important;filter:none!important}
    .sc-ov,.hub-hero-ov,.sl-cover-ov,.sp-bg-ov{background:radial-gradient(circle at 80% 15%,rgba(214,166,59,.16),transparent 38%),linear-gradient(110deg,rgba(7,21,33,.96),rgba(13,34,50,.78))!important}
    .sl-sc-tx{font-family:var(--fp)!important}.sl-big-text,.sl-ft{max-width:1200px}.sl-pts li{font-family:var(--fc);font-weight:500}.sl-te-h{color:var(--w)}
    .kp-principles-table{display:grid;grid-template-columns:80px 1fr 2fr;gap:1px;background:var(--ln);margin-top:26px}.kp-principles-table>*{background:var(--bgd);padding:12px 14px}
  `;
  document.head.appendChild(css);

  function replaceText(selector,text){const el=document.querySelector(selector);if(el)el.textContent=text;}
  function brandDOM(){
    document.title='Kingdom Principles — The Principle of Identity';
    document.querySelectorAll('.sc-title,.hub-title').forEach(el=>el.innerHTML='<span class="tt">KINGDOM</span> <span class="tm">PRINCIPLES</span>');
    document.querySelectorAll('.hub-logo,.q-logo,.ss-lbl,.pw-ti,.sp-wt,.conf-brand,.mm-brand,.mo-title').forEach(el=>el.innerHTML='KINGDOM <span>PRINCIPLES</span>');
    replaceText('.sc-ey','KINGDOM DECISIONS SERIES'); replaceText('.sc-sub','The Principle of Identity'); replaceText('.sc-tag','Identity must be settled before pressure comes.');
    replaceText('.hub-ey','Kingdom Decisions Series'); replaceText('.hub-sub','The Principle of Identity'); replaceText('.hub-ref','What voice is defining me?');
    replaceText('.q-hero-ey','Lesson 1 · End of Session'); replaceText('.q-hero-title','The Principle of Identity'); replaceText('.q-hero-sub','Identity must be settled before pressure comes.');
    replaceText('.sp-corner','Kingdom Principles · Lesson 1 · RVR 1960 / KJV'); replaceText('.obs-series','Kingdom Principles · The Principle of Identity');
    replaceText('#cmd-stitle','The Principle of Identity'); replaceText('#mm-title','The Principle of Identity'); replaceText('#conf-current-title','The Principle of Identity'); replaceText('#conf-current-ref','Kingdom Decisions Series');
    document.querySelectorAll('.ss-count,#cmd-ctr,#pnav-ctr,#mm-num').forEach(el=>el.textContent=`1/${slides.length}`);
    document.querySelectorAll('.sc-si').forEach((el,i)=>{el.classList.toggle('active',i===0);el.classList.toggle('locked',i!==0);el.textContent=i===0?'Lesson 1 · Identity':i===1?'Lesson 2 · Priority':'Lesson 3 · Alignment';});
    const seriesRow=document.querySelector('.series-row'); if(seriesRow) seriesRow.innerHTML='<div class="s-cell active" onclick="openSS()"><div class="cd">Week 1</div><div><span class="cn">01 ·</span> Identity</div></div><div class="s-cell locked"><div class="cd">Week 2</div><div><span class="cn">02 ·</span> Priority</div><span class="cl">🔒</span></div><div class="s-cell locked"><div class="cd">Week 3</div><div><span class="cn">03 ·</span> Alignment</div><span class="cl">🔒</span></div>';
    const body=document.querySelector('.hub-body'); if(body){const cards=body.querySelectorAll('.lcard');if(cards[0])cards[0].innerHTML='<div><div class="lc-wk">Lesson 1 · Week 1</div><div class="lc-ti">The Principle of Identity</div><div class="lc-rf">Matthew 3:13-17 through Matthew 4:1-11 · 22 Slides</div></div><div style="display:flex;align-items:center;gap:12px"><div class="lc-bg live">Live</div><div>→</div></div>';if(cards[1]){const rf=cards[1].querySelector('.lc-rf');if(rf)rf.textContent='6 sections · 21 prompts';}}
    document.querySelectorAll('.sc-pass span,.mo-access-code span').forEach(el=>el.textContent='kingdom2026');
    document.querySelectorAll('.sc-qr-url,.projector-wait-qr-card span').forEach(el=>{if((el.textContent||'').includes('theministry'))el.textContent='kindomprinciples.vercel.app';});
    if(typeof buildQuestionnaire==='function')buildQuestionnaire();
    if(typeof renderPollBank==='function')renderPollBank();
  }
  document.addEventListener('DOMContentLoaded',()=>setTimeout(brandDOM,0));
})();
