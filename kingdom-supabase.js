/* Kingdom Principles Supabase client.
   Keeps typing local and sends writes in the background.
*/
(function(){
  'use strict';

  const CONFIG = Object.freeze({
    url: 'https://vpppznyhrickcabpfvfx.supabase.co',
    key: 'sb_publishable_ZvmCwSVoRGcxU3iBIwAh2Q_wqKiw9co',
    sessionSlug: 'kingdom-principles-live',
    lessonSlug: 'lesson-1'
  });

  const CLIENT_KEY = 'kp_client_id';
  const ATTENDEE_KEY = 'kp_attendee_id';
  const timers = new WeakMap();
  let db = null;
  let session = null;
  let attendeeId = localStorage.getItem(ATTENDEE_KEY) || null;

  function clientId(){
    let value = localStorage.getItem(CLIENT_KEY);
    if(!value){
      value = crypto.randomUUID();
      localStorage.setItem(CLIENT_KEY, value);
    }
    return value;
  }

  function createClient(){
    if(db) return db;
    if(!window.supabase || typeof window.supabase.createClient !== 'function') return null;
    db = window.supabase.createClient(CONFIG.url, CONFIG.key, {
      global: { headers: { 'x-client-id': clientId() } },
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
    });
    window.kingdomSupabase = db;
    return db;
  }

  async function loadSession(){
    if(session) return session;
    const client = createClient();
    if(!client) return null;
    const { data, error } = await client
      .from('sessions')
      .select('id,slug,status,lesson_slug')
      .eq('slug', CONFIG.sessionSlug)
      .single();
    if(error){ console.warn('Kingdom session load failed', error.message); return null; }
    session = data;
    return session;
  }

  async function saveAttendee(name, email){
    const current = await loadSession();
    const client = createClient();
    if(!current || !client || !name || !email) return;

    const payload = {
      session_id: current.id,
      client_id: clientId(),
      name: String(name).trim().slice(0,120),
      email: String(email).trim().toLowerCase().slice(0,320),
      language: document.body.classList.contains('tm-spanish-mode') ? 'es' : 'en',
      watching_online: Boolean(document.getElementById('mo-online')?.checked),
      last_seen_at: new Date().toISOString()
    };

    const { data, error } = await client
      .from('attendees')
      .upsert(payload, { onConflict: 'session_id,client_id' })
      .select('id')
      .single();

    if(error){ console.warn('Attendee sync failed', error.message); return; }
    attendeeId = data.id;
    localStorage.setItem(ATTENDEE_KEY, attendeeId);
  }

  async function saveQuestion(text){
    const current = await loadSession();
    const client = createClient();
    const question = String(text || '').trim();
    if(!current || !client || !question) return;

    const { error } = await client.from('questions').insert({
      session_id: current.id,
      attendee_id: attendeeId,
      client_id: clientId(),
      question: question.slice(0,2000)
    });
    if(error) console.warn('Question sync failed', error.message);
  }

  async function saveWorkbookAnswer(textarea){
    const current = await loadSession();
    const client = createClient();
    if(!current || !client || !textarea) return;

    const item = textarea.closest('.q-item');
    const section = textarea.closest('.q-section');
    const number = item?.querySelector('.q-item-num')?.textContent?.trim() || textarea.dataset.question || 'unknown';
    const sectionName = section?.querySelector('.q-section-title')?.textContent?.trim() || 'workbook';
    const questionKey = (sectionName + ':' + number).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

    const { error } = await client.from('responses').upsert({
      session_id: current.id,
      attendee_id: attendeeId,
      client_id: clientId(),
      lesson_slug: CONFIG.lessonSlug,
      question_key: questionKey,
      response: textarea.value,
      updated_at: new Date().toISOString()
    }, { onConflict: 'session_id,client_id,lesson_slug,question_key' });
    if(error) console.warn('Workbook sync failed', error.message);
  }

  function debounceAnswer(textarea){
    const prior = timers.get(textarea);
    if(prior) clearTimeout(prior);
    timers.set(textarea, setTimeout(function(){ saveWorkbookAnswer(textarea); }, 850));
  }

  function wrapLogin(){
    const original = window.checkPw;
    if(typeof original !== 'function' || original.__kingdomSupabaseWrapped) return;

    const wrapped = function(){
      const adminMode = document.body.classList.contains('kp-admin-modal');
      const name = document.getElementById('mo-name')?.value?.trim();
      const email = document.getElementById('mo-email')?.value?.trim();
      const result = original.apply(this, arguments);
      if(!adminMode && name && email) queueMicrotask(function(){ saveAttendee(name, email); });
      return result;
    };
    wrapped.__kingdomSupabaseWrapped = true;
    window.checkPw = wrapped;
    try{ checkPw = wrapped; }catch(error){}
  }

  function bindEvents(){
    document.addEventListener('input', function(event){
      const target = event.target;
      if(target && target.matches('.q-ta')) debounceAnswer(target);
    }, { passive: true });

    document.addEventListener('click', function(event){
      const button = event.target.closest('.ask-row button, .ask-drawer button');
      if(!button) return;
      const textarea = document.querySelector('.ask-ta');
      const text = textarea?.value?.trim();
      if(text) saveQuestion(text);
    }, true);
  }

  async function subscribeToState(){
    const current = await loadSession();
    const client = createClient();
    if(!current || !client) return;

    client.channel('kingdom-session-' + current.id)
      .on('postgres_changes', {
        event: 'UPDATE', schema: 'public', table: 'sync_state', filter: 'session_id=eq.' + current.id
      }, function(payload){
        window.dispatchEvent(new CustomEvent('kingdom:sync-state', { detail: payload.new }));
      })
      .subscribe();
  }

  function boot(){
    createClient();
    wrapLogin();
    bindEvents();
    subscribeToState();
    setTimeout(wrapLogin, 250);
    setTimeout(wrapLogin, 900);
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
