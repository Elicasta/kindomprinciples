/* Kingdom Principles live-system health panel. Read-only diagnostics only. */
(function(){
  'use strict';

  function isAdminVisible(){
    const hub=document.getElementById('admin-hub');
    return document.body.classList.contains('am') || Boolean(hub && hub.classList.contains('on'));
  }

  function slideCount(){
    try{return Array.isArray(LESSON1_SLIDES)?LESSON1_SLIDES.length:0;}catch(error){return 0;}
  }

  function syncLabel(){
    const transport=document.documentElement.dataset.kpSyncTransport;
    if(transport==='rest-fallback') return 'SYNC LIVE';
    const status=document.getElementById('cmd-p2lbl')?.textContent || '';
    if(/live|connected/i.test(status)) return 'SYNC LIVE';
    if(/retry|error/i.test(status)) return 'SYNC RETRYING';
    return 'SYNC LOCAL';
  }

  function openOutput(path){
    window.open(path,'_blank','noopener,noreferrer');
  }

  function createPanel(){
    if(document.getElementById('kp-system-health')) return document.getElementById('kp-system-health');

    const style=document.createElement('style');
    style.id='kp-system-health-style';
    style.textContent=`
      #kp-system-health{position:fixed;right:14px;bottom:14px;z-index:9998;font-family:Montserrat,Arial,sans-serif;color:#E8E3D9;display:none}
      #kp-system-health.on{display:block}
      .kp-health-pill{border:1px solid rgba(214,166,59,.45);background:rgba(7,21,33,.96);box-shadow:0 14px 40px rgba(0,0,0,.32);padding:9px 12px;display:flex;gap:9px;align-items:center;cursor:pointer;user-select:none}
      .kp-health-dot{width:8px;height:8px;border-radius:50%;background:#D6A63B;box-shadow:0 0 12px rgba(214,166,59,.6)}
      .kp-health-title{font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
      .kp-health-panel{display:none;width:min(330px,calc(100vw - 28px));margin-top:8px;border:1px solid rgba(214,166,59,.3);background:#071521;box-shadow:0 20px 60px rgba(0,0,0,.42);padding:14px}
      #kp-system-health.open .kp-health-panel{display:block}
      .kp-health-head{font-family:'Bebas Neue',Impact,sans-serif;font-size:24px;letter-spacing:.05em;text-transform:uppercase;margin-bottom:3px}
      .kp-health-sub{font-size:9px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#A7A9A6;margin-bottom:12px}
      .kp-health-grid{display:grid;grid-template-columns:1fr auto;gap:7px 14px;padding:10px 0;border-top:1px solid rgba(232,227,217,.1);border-bottom:1px solid rgba(232,227,217,.1);font-size:10px}
      .kp-health-grid span:nth-child(odd){color:#A7A9A6;text-transform:uppercase;letter-spacing:.08em;font-weight:700}
      .kp-health-grid span:nth-child(even){font-weight:700;text-align:right}
      .kp-health-actions{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:11px}
      .kp-health-actions button{border:1px solid rgba(232,227,217,.14);background:#0D2232;color:#E8E3D9;padding:9px 7px;font:700 9px Montserrat,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer}
      .kp-health-actions button:hover{border-color:#D6A63B;color:#F2D48A}
      @media(max-width:700px){#kp-system-health{right:8px;bottom:8px}.kp-health-panel{max-height:70vh;overflow:auto}}
    `;
    document.head.appendChild(style);

    const root=document.createElement('div');
    root.id='kp-system-health';
    root.innerHTML=`
      <div class="kp-health-pill" role="button" aria-label="Open system health">
        <span class="kp-health-dot"></span><span class="kp-health-title" id="kp-health-pill-label">System Ready</span>
      </div>
      <div class="kp-health-panel">
        <div class="kp-health-head">Live System</div>
        <div class="kp-health-sub">Kingdom Principles · diagnostics</div>
        <div class="kp-health-grid">
          <span>Presentation</span><span id="kp-health-runtime">Checking</span>
          <span>Slides</span><span id="kp-health-slides">Checking</span>
          <span>Sync</span><span id="kp-health-sync">Checking</span>
          <span>Supabase data</span><span id="kp-health-data">Checking</span>
          <span>P2 mode</span><span id="kp-health-p2">Checking</span>
        </div>
        <div class="kp-health-actions">
          <button data-path="/projector">Open P1</button>
          <button data-path="/scriptures">Open P2</button>
          <button data-path="/obslowerthirds">OBS Lower</button>
          <button data-path="/confidence">Confidence</button>
          <button id="kp-health-reload">Reload Outputs</button>
          <button id="kp-health-close">Close</button>
        </div>
      </div>`;
    document.body.appendChild(root);

    root.querySelector('.kp-health-pill').addEventListener('click',function(){root.classList.toggle('open');});
    root.querySelectorAll('[data-path]').forEach(function(button){
      button.addEventListener('click',function(){openOutput(button.dataset.path);});
    });
    root.querySelector('#kp-health-close').addEventListener('click',function(){root.classList.remove('open');});
    root.querySelector('#kp-health-reload').addEventListener('click',function(){
      try{if(typeof reloadProjectors==='function') reloadProjectors();}catch(error){}
    });
    return root;
  }

  function update(){
    const root=createPanel();
    root.classList.toggle('on',isAdminVisible());
    if(!isAdminVisible()) return;

    const count=slideCount();
    const runtime=window.KP_STABLE_RUNTIME==='native-slides-v1';
    const dataReady=window.kingdomDataReady===true || Boolean(window.kingdomSupabase);
    const p2Ready=Boolean(document.querySelector('script[src*="kingdom-p2-scripture-only.js"]'));
    const sync=syncLabel();

    document.getElementById('kp-health-runtime').textContent=runtime?'NATIVE · READY':'CHECK';
    document.getElementById('kp-health-slides').textContent=count===22?'22 · READY':String(count||'CHECK');
    document.getElementById('kp-health-sync').textContent=sync;
    document.getElementById('kp-health-data').textContent=dataReady?'READY':'STARTING';
    document.getElementById('kp-health-p2').textContent=p2Ready?'SCRIPTURE ONLY':'CHECK';

    const healthy=runtime && count===22 && dataReady && p2Ready && !/RETRYING/.test(sync);
    document.getElementById('kp-health-pill-label').textContent=healthy?'System Ready':'Check System';
  }

  function boot(){
    createPanel();
    update();
    window.setInterval(update,1500);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
