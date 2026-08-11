/* Kingdom Principles P2 scripture-only controller.
   P2 never renders teaching slides or bullet points. It follows the current
   slide's associated scripture and keeps the last scripture when none exists.
*/
(function(){
  'use strict';

  const isP2 = location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase() === 'scriptures';
  if(!isP2) return;

  const BIBLE = {
    ps13913:{ref_en:'Psalm 139:13',text_en:'For thou hast possessed my reins: thou hast covered me in my mother’s womb.',ref_es:'Salmos 139:13',text_es:'Porque tú formaste mis entrañas; tú me hiciste en el vientre de mi madre.'},
    ps13914:{ref_en:'Psalm 139:14',text_en:'I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.',ref_es:'Salmos 139:14',text_es:'Te alabaré; porque formidables, maravillosas son tus obras; estoy maravillado, y mi alma lo sabe muy bien.'},
    mt317:{ref_en:'Matthew 3:17',text_en:'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',ref_es:'Mateo 3:17',text_es:'Y hubo una voz de los cielos, que decía: Este es mi Hijo amado, en quien tengo complacencia.'},
    mt413:{ref_en:'Matthew 4:1-3',text_en:'Then was Jesus led up of the Spirit into the wilderness to be tempted of the devil. And when he had fasted forty days and forty nights, he was afterward an hungred. And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread.',ref_es:'Mateo 4:1-3',text_es:'Entonces Jesús fue llevado por el Espíritu al desierto, para ser tentado por el diablo. Y después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre. Y vino a él el tentador, y le dijo: Si eres Hijo de Dios, di que estas piedras se conviertan en pan.'},
    mt434:{ref_en:'Matthew 4:3-4',text_en:'And when the tempter came to him, he said, If thou be the Son of God, command that these stones be made bread. But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.',ref_es:'Mateo 4:3-4',text_es:'Y vino a él el tentador, y le dijo: Si eres Hijo de Dios, di que estas piedras se conviertan en pan. Él respondió y dijo: Escrito está: No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios.'},
    mt44:{ref_en:'Matthew 4:4',text_en:'But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.',ref_es:'Mateo 4:4',text_es:'Él respondió y dijo: Escrito está: No sólo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios.'},
    mt457:{ref_en:'Matthew 4:5-7',text_en:'Then the devil taketh him up into the holy city, and setteth him on a pinnacle of the temple, And saith unto him, If thou be the Son of God, cast thyself down: for it is written, He shall give his angels charge concerning thee: and in their hands they shall bear thee up, lest at any time thou dash thy foot against a stone. Jesus said unto him, It is written again, Thou shalt not tempt the Lord thy God.',ref_es:'Mateo 4:5-7',text_es:'Entonces el diablo le llevó a la santa ciudad, y le puso sobre el pináculo del templo, y le dijo: Si eres Hijo de Dios, échate abajo; porque escrito está: A sus ángeles mandará acerca de ti, y, en sus manos te sostendrán, para que no tropieces con tu pie en piedra. Jesús le dijo: Escrito está también: No tentarás al Señor tu Dios.'},
    mt4810:{ref_en:'Matthew 4:8-10',text_en:'Again, the devil taketh him up into an exceeding high mountain, and sheweth him all the kingdoms of the world, and the glory of them; And saith unto him, All these things will I give thee, if thou wilt fall down and worship me. Then saith Jesus unto him, Get thee hence, Satan: for it is written, Thou shalt worship the Lord thy God, and him only shalt thou serve.',ref_es:'Mateo 4:8-10',text_es:'Otra vez le llevó el diablo a un monte muy alto, y le mostró todos los reinos del mundo y la gloria de ellos, y le dijo: Todo esto te daré, si postrado me adorares. Entonces Jesús le dijo: Vete, Satanás, porque escrito está: Al Señor tu Dios adorarás, y a él sólo servirás.'},
    rom81417:{ref_en:'Romans 8:14-17',text_en:'For as many as are led by the Spirit of God, they are the sons of God. For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father. The Spirit itself beareth witness with our spirit, that we are the children of God: And if children, then heirs; heirs of God, and joint-heirs with Christ.',ref_es:'Romanos 8:14-17',text_es:'Porque todos los que son guiados por el Espíritu de Dios, éstos son hijos de Dios. Pues no habéis recibido el espíritu de esclavitud para estar otra vez en temor, sino que habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre! El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios. Y si hijos, también herederos; herederos de Dios y coherederos con Cristo.'},
    prov2925:{ref_en:'Proverbs 29:25',text_en:'The fear of man bringeth a snare: but whoso putteth his trust in the LORD shall be safe.',ref_es:'Proverbios 29:25',text_es:'El temor del hombre pondrá lazo; mas el que confía en Jehová será exaltado.'},
    col33:{ref_en:'Colossians 3:3',text_en:'For ye are dead, and your life is hid with Christ in God.',ref_es:'Colosenses 3:3',text_es:'Porque habéis muerto, y vuestra vida está escondida con Cristo en Dios.'}
  };

  const BY_SLIDE = {
    1:'ps13914',
    4:'mt317',
    5:'mt317',
    6:'mt413',
    8:'mt317',
    9:'mt413',
    10:'rom81417',
    11:'mt44',
    13:'mt44',
    16:'mt434',
    17:'mt457',
    18:'mt4810',
    20:'rom81417'
  };

  function showScripture(sc){
    if(!sc) return;
    document.body.classList.add('p2-live');
    const wait=document.getElementById('sp-wait');
    const content=document.getElementById('sp-content');
    if(wait) wait.classList.add('hidden');
    if(content) content.style.display='flex';

    const mainRef=document.getElementById('sp-ref-en');
    const mainText=document.getElementById('sp-tx-en');
    const supportRef=document.getElementById('sp-ref-es');
    const supportText=document.getElementById('sp-tx-es');
    if(mainRef) mainRef.textContent=sc.ref_es || sc.ref_en || '';
    if(mainText) mainText.textContent=sc.text_es || sc.text_en || '';
    if(supportRef) supportRef.textContent=sc.ref_en ? sc.ref_en+' · KJV' : '';
    if(supportText) supportText.textContent=sc.text_en || '';

    document.querySelectorAll('#ssl,#ss-slides,.ss-stage,.slide:not(#sp-content .slide)').forEach(function(el){
      if(el && !el.closest('#sp-content')) el.style.display='none';
    });
    document.documentElement.dataset.kpP2Mode='scripture-only';
  }

  function slideNumber(message){
    const raw = message && (message.slide ?? message.index ?? message.active_slide);
    const n = Number(raw);
    return Number.isFinite(n) ? Math.max(0,Math.floor(n)) : null;
  }

  function scriptureForSlide(index){
    const key=BY_SLIDE[index];
    return key ? BIBLE[key] : null;
  }

  const previous=window.handleMessage;
  window.handleMessage=function(message){
    if(message && message.type==='slide'){
      const index=slideNumber(message);
      const scripture=index===null?null:scriptureForSlide(index);
      if(scripture) showScripture(scripture);
      return;
    }
    if(message && message.type==='scripture'){
      showScripture(message.scripture || message.payload || message);
      return;
    }
    if(message && message.type==='scripture_clear'){
      // Auto P2 emits clear commands for non-scripture teaching slides. Ignore those
      // so the concurrent scripture remains visible. Explicit Clear P2 carries manual:true.
      if(message.manual && typeof previous==='function') return previous.apply(this,arguments);
      return;
    }
    if(message && (message.type==='lesson_select' || message.type==='presentation_start')){
      return;
    }
    return typeof previous==='function' ? previous.apply(this,arguments) : undefined;
  };

  const style=document.createElement('style');
  style.id='kp-p2-scripture-only-css';
  style.textContent='body.scripture-mode #ssl,body.scripture-mode #ss-slides,body.scripture-mode .ss-stage{display:none!important}body.scripture-mode #scripture-display{display:flex!important}body.scripture-mode #sp-content{z-index:20!important}';
  document.head.appendChild(style);

  document.documentElement.dataset.kpP2Mode='scripture-only';
})();
