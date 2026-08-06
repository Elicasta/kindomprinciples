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

  const SPANISH_SCRIPTURES = {
    'ps139-13-18': {
      ref:'Salmos 139:13-18',
      text:'Porque tú formaste mis entrañas; Tú me hiciste en el vientre de mi madre. Te alabaré; porque formidables, maravillosas son tus obras; Estoy maravillado, Y mi alma lo sabe muy bien. No fue encubierto de ti mi cuerpo, Bien que en oculto fui formado, Y entretejido en lo más profundo de la tierra. Mi embrión vieron tus ojos, Y en tu libro estaban escritas todas aquellas cosas Que fueron luego formadas, Sin faltar una de ellas. ¡Cuán preciosos me son, oh Dios, tus pensamientos! ¡Cuán grande es la suma de ellos! Si los enumero, se multiplican más que la arena; Despierto, y aún estoy contigo.'
    },
    'mt3-17': {
      ref:'Mateo 3:17',
      text:'Y hubo una voz de los cielos, que decía: Este es mi Hijo amado, en quien tengo complacencia.'
    },
    'mt4-1-3': {
      ref:'Mateo 4:1-3',
      text:'Entonces Jesús fue llevado por el Espíritu al desierto, para ser tentado por el diablo. Y después de haber ayunado cuarenta días y cuarenta noches, tuvo hambre. Y vino a él el tentador, y le dijo: Si eres Hijo de Dios, di que estas piedras se conviertan en pan.'
    },
    'mt4-4': {
      ref:'Mateo 4:4',
      text:'Él respondió y dijo: Escrito está: No solo de pan vivirá el hombre, sino de toda palabra que sale de la boca de Dios.'
    },
    'mt4-5-7': {
      ref:'Mateo 4:5-7',
      text:'Entonces el diablo le llevó a la santa ciudad, y le puso sobre el pináculo del templo, y le dijo: Si eres Hijo de Dios, échate abajo; porque escrito está: A sus ángeles mandará acerca de ti, y, En sus manos te sostendrán, Para que no tropieces con tu pie en piedra. Jesús le dijo: Escrito está también: No tentarás al Señor tu Dios.'
    },
    'mt4-8-10': {
      ref:'Mateo 4:8-10',
      text:'Otra vez le llevó el diablo a un monte muy alto, y le mostró todos los reinos del mundo y la gloria de ellos, y le dijo: Todo esto te daré, si postrado me adorares. Entonces Jesús le dijo: Vete, Satanás, porque escrito está: Al Señor tu Dios adorarás, y a él sólo servirás.'
    },
    'rom8-14-17': {
      ref:'Romanos 8:14-17',
      text:'Porque todos los que son guiados por el Espíritu de Dios, estos son hijos de Dios. Pues no habéis recibido el espíritu de esclavitud para estar otra vez en temor, sino que habéis recibido el espíritu de adopción, por el cual clamamos: ¡Abba, Padre! El Espíritu mismo da testimonio a nuestro espíritu, de que somos hijos de Dios. Y si hijos, también herederos; herederos de Dios y coherederos con Cristo.'
    },
    'prov29-25': {
      ref:'Proverbios 29:25',
      text:'El temor del hombre pondrá lazo; Mas el que confía en Jehová será exaltado.'
    },
    'col3-3': {
      ref:'Colosenses 3:3',
      text:'Porque habéis muerto, y vuestra vida está escondida con Cristo en Dios.'
    },
    'ps139-14': {
      ref:'Salmos 139:14',
      text:'Te alabaré; porque formidables, maravillosas son tus obras; Estoy maravillado, Y mi alma lo sabe muy bien.'
    }
  };

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

  function installSpanishScriptures(){
    try{
      if(Array.isArray(VERSE_BANK)){
        VERSE_BANK.forEach(function(verse){
          const translated = SPANISH_SCRIPTURES[verse.id];
          if(translated){
            verse.ref_es = translated.ref;
            verse.rvr = translated.text;
          }
        });
      }
    }catch(error){ console.warn('Verse bank Spanish install skipped', error); }

    try{
      if(Array.isArray(SCRIPTURE_MAP)){
        SCRIPTURE_MAP.forEach(function(entry){
          const englishRef = String(entry.ref_en || entry.ref || '').replace(/\s+KJV$/i,'').trim();
          const verse = Array.isArray(VERSE_BANK)
            ? VERSE_BANK.find(function(item){ return item.ref === englishRef || englishRef.indexOf(item.ref) !== -1; })
            : null;
          const translated = verse ? SPANISH_SCRIPTURES[verse.id] : null;
          if(translated){
            entry.ref_es = translated.ref;
            entry.text_es = translated.text;
          }
        });
      }
    }catch(error){ console.warn('Scripture map Spanish install skipped', error); }

    try{
      const originalGet = window.getVBSpanish || (typeof getVBSpanish === 'function' ? getVBSpanish : null);
      const translatedGet = function(id){
        const translated = SPANISH_SCRIPTURES[id];
        if(translated) return translated.text;
        return originalGet ? originalGet(id) : '';
      };
      window.getVBSpanish = translatedGet;
      try{ getVBSpanish = translatedGet; }catch(error){}
    }catch(error){ console.warn('Spanish verse resolver install skipped', error); }
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
      installSpanishScriptures();
      classifySlides(document);
    });
  }

  function boot(){
    installSpanishScriptures();
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
