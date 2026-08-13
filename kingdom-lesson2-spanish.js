/* Spanish scripture payload for Kingdom Principles Lesson 2. */
(function(){
  'use strict';

  const ES={
    'Matthew 6:33':{ref:'Mateo 6:33',text:'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.'},
    'Matthew 6:19-21':{ref:'Mateo 6:19-21',text:'No os hagáis tesoros en la tierra, donde la polilla y el orín corrompen, y donde ladrones minan y hurtan; sino haceos tesoros en el cielo, donde ni la polilla ni el orín corrompen, y donde ladrones no minan ni hurtan. Porque donde esté vuestro tesoro, allí estará también vuestro corazón.'},
    'Proverbs 3:9-10':{ref:'Proverbios 3:9-10',text:'Honra a Jehová con tus bienes, y con las primicias de todos tus frutos; y serán llenos tus graneros con abundancia, y tus lagares rebosarán de mosto.'},
    'Proverbs 11:24-26':{ref:'Proverbios 11:24-26',text:'Hay quienes reparten, y les es añadido más; y hay quienes retienen más de lo que es justo, pero vienen a pobreza. El alma generosa será prosperada; y el que saciare, él también será saciado. Al que acapara el grano, el pueblo lo maldecirá; pero bendición será sobre la cabeza del que lo vende.'},
    'Proverbs 11:27-28':{ref:'Proverbios 11:27-28',text:'El que procura el bien buscará favor; mas al que busca el mal, éste le vendrá. El que confía en sus riquezas caerá; mas los justos reverdecerán como ramas.'},
    'Matthew 6:22-23':{ref:'Mateo 6:22-23',text:'La lámpara del cuerpo es el ojo; así que, si tu ojo es bueno, todo tu cuerpo estará lleno de luz; pero si tu ojo es maligno, todo tu cuerpo estará en tinieblas. Así que, si la luz que en ti hay es tinieblas, ¿cuántas no serán las mismas tinieblas?'},
    'Proverbs 23:4-5':{ref:'Proverbios 23:4-5',text:'No te afanes por hacerte rico; sé prudente, y desiste. ¿Has de poner tus ojos en las riquezas, siendo ningunas? Porque se harán alas como alas de águila, y volarán al cielo.'},
    'Matthew 6:24':{ref:'Mateo 6:24',text:'Ninguno puede servir a dos señores; porque o aborrecerá al uno y amará al otro, o estimará al uno y menospreciará al otro. No podéis servir a Dios y a las riquezas.'},
    '1 Timothy 6:6-8':{ref:'1 Timoteo 6:6-8',text:'Pero gran ganancia es la piedad acompañada de contentamiento; porque nada hemos traído a este mundo, y sin duda nada podremos sacar. Así que, teniendo sustento y abrigo, estemos contentos con esto.'},
    '1 Timothy 6:9-10':{ref:'1 Timoteo 6:9-10',text:'Porque los que quieren enriquecerse caen en tentación y lazo, y en muchas codicias necias y dañosas, que hunden a los hombres en destrucción y perdición; porque raíz de todos los males es el amor al dinero, el cual codiciando algunos, se extraviaron de la fe, y fueron traspasados de muchos dolores.'},
    'Matthew 6:25':{ref:'Mateo 6:25',text:'Por tanto os digo: No os afanéis por vuestra vida, qué habéis de comer o qué habéis de beber; ni por vuestro cuerpo, qué habéis de vestir. ¿No es la vida más que el alimento, y el cuerpo más que el vestido?'},
    'Matthew 6:26':{ref:'Mateo 6:26',text:'Mirad las aves del cielo, que no siembran, ni siegan, ni recogen en graneros; y vuestro Padre celestial las alimenta. ¿No valéis vosotros mucho más que ellas?'},
    'Matthew 6:27-30':{ref:'Mateo 6:27-30',text:'¿Y quién de vosotros podrá, por mucho que se afane, añadir a su estatura un codo? Y por el vestido, ¿por qué os afanáis? Considerad los lirios del campo, cómo crecen: no trabajan ni hilan; pero os digo, que ni aun Salomón con toda su gloria se vistió así como uno de ellos. Y si la hierba del campo que hoy es, y mañana se echa en el horno, Dios la viste así, ¿no hará mucho más a vosotros, hombres de poca fe?'},
    'Matthew 6:31-32':{ref:'Mateo 6:31-32',text:'No os afanéis, pues, diciendo: ¿Qué comeremos, o qué beberemos, o qué vestiremos? Porque los gentiles buscan todas estas cosas; pero vuestro Padre celestial sabe que tenéis necesidad de todas estas cosas.'},
    'Matthew 6:33-34':{ref:'Mateo 6:33-34',text:'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas. Así que, no os afanéis por el día de mañana, porque el día de mañana traerá su afán. Basta a cada día su propio mal.'},
    'Haggai 1:5-6':{ref:'Hageo 1:5-6',text:'Pues así ha dicho Jehová de los ejércitos: Meditad bien sobre vuestros caminos. Sembráis mucho, y recogéis poco; coméis, y no os saciáis; bebéis, y no quedáis satisfechos; os vestís, y no os calentáis; y el que trabaja a jornal recibe su jornal en saco roto.'},
    'Haggai 1:7':{ref:'Hageo 1:7',text:'Así ha dicho Jehová de los ejércitos: Meditad sobre vuestros caminos.'}
  };

  function apply(payload){
    if(!payload)return;
    (payload.verseBank||[]).forEach(function(v){const e=ES[v.ref];if(e){v.ref_es=e.ref;v.rvr=e.text;}});
    (payload.scriptureMap||[]).forEach(function(sc){const e=ES[sc.ref_en];if(e){sc.ref_es=e.ref;sc.text_es=e.text;}});
    try{
      if(window.LESSON_SLUG==='lesson-2'){
        (VERSE_BANK||[]).forEach(function(v){const e=ES[v.ref];if(e){v.ref_es=e.ref;v.rvr=e.text;}});
        (SCRIPTURE_MAP||[]).forEach(function(sc){const e=ES[sc.ref_en];if(e){sc.ref_es=e.ref;sc.text_es=e.text;}});
      }
    }catch(e){}
  }

  function boot(){
    apply(window.KINGDOM_LESSON2);
    [300,1200,3400].forEach(function(delay){setTimeout(function(){apply(window.KINGDOM_LESSON2);},delay);});
    window.KINGDOM_LESSON2_SPANISH=ES;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
