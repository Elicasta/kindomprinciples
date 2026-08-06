/* Kingdom Principles resilient sync transport.
   Uses REST polling when Supabase Realtime is unavailable.
*/
(function(){
  'use strict';

  const URL = 'https://vpppznyhrickcabpfvfx.supabase.co';
  const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcHB6bnlocmlja2NhYnBmdmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNDIwNjYsImV4cCI6MjEwMTYxODA2Nn0.G8W6ERO4jWvCjSPEKiz46325Rog4d4QT_G2VCv0hI6k';
  const INTERVAL_MS = 700;
  let lastUpdatedAt = '';
  let timer = null;
  let inFlight = false;
  let stopped = false;
  let healthy = false;

  function setStatus(text, live){
    const targets = [
      document.getElementById('cmd-p2lbl'),
      document.getElementById('p1-status'),
      document.getElementById('sp-wait-status')
    ].filter(Boolean);
    targets.forEach(function(el){
      el.textContent = text;
      el.classList.toggle('live', Boolean(live));
    });
    const dots = [
      document.getElementById('cmd-p2dot'),
      document.getElementById('sp-live-dot')
    ].filter(Boolean);
    dots.forEach(function(el){ el.classList.toggle('live', Boolean(live)); });
  }

  function installStatusGuard(){
    const original = window.markRealtimeStatus;
    if(typeof original !== 'function' || original.__kingdomGuarded) return;
    const guarded = function(text, live){
      if(healthy && /error|timed out|failed/i.test(String(text || ''))){
        setStatus('Live ✓', true);
        return;
      }
      return original.apply(this, arguments);
    };
    guarded.__kingdomGuarded = true;
    window.markRealtimeStatus = guarded;
    try{ markRealtimeStatus = guarded; }catch(error){}
  }

  function isController(){
    const path = location.pathname.replace(/^\/+|\/+$/g,'').toLowerCase();
    return path === 'admin' || document.body.classList.contains('admin-mode');
  }

  function applyPayload(row){
    if(!row || !row.payload || row.updated_at === lastUpdatedAt) return;
    lastUpdatedAt = row.updated_at || '';
    let message = row.payload;
    if(typeof message === 'string'){
      try{ message = JSON.parse(message); }catch(error){ return; }
    }
    if(!message || typeof message !== 'object' || isController()) return;
    const handler = window.handleMessage;
    if(typeof handler === 'function') handler(message);
  }

  async function poll(){
    if(stopped || inFlight) return;
    inFlight = true;
    try{
      const response = await fetch(
        URL + '/rest/v1/sync_state?id=eq.1&select=payload,updated_at&limit=1',
        {
          cache: 'no-store',
          headers: {
            apikey: KEY,
            Authorization: 'Bearer ' + KEY,
            'Cache-Control': 'no-cache'
          }
        }
      );
      if(!response.ok) throw new Error('sync state request failed: ' + response.status);
      const rows = await response.json();
      const row = Array.isArray(rows) ? rows[0] : null;
      applyPayload(row);
      healthy = true;
      setStatus('Live ✓', true);
      document.documentElement.dataset.kpSyncTransport = 'rest-fallback';
    }catch(error){
      healthy = false;
      setStatus('Sync retrying', false);
      console.warn('Kingdom sync fallback retrying', error);
    }finally{
      inFlight = false;
    }
  }

  function start(){
    if(timer) return;
    installStatusGuard();
    setTimeout(installStatusGuard, 300);
    setTimeout(installStatusGuard, 1200);
    poll();
    timer = window.setInterval(poll, INTERVAL_MS);
    window.addEventListener('online', poll);
    document.addEventListener('visibilitychange', function(){
      if(document.visibilityState === 'visible') poll();
    });
  }

  window.addEventListener('beforeunload', function(){
    stopped = true;
    if(timer) clearInterval(timer);
  }, { once: true });

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
