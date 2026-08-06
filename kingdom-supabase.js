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
  const recentVotes = new Map();

  let db = null;
  let session = null;
  let pollsPromise = null;
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
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
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

    if(error){
      console.warn('Kingdom session load failed', error.message);
      return null;
    }

    session = data;
    return session;
  }

  async function loadPolls(){
    if(pollsPromise) return pollsPromise;

    pollsPromise = (async function(){
      const current = await loadSession();
      const client = createClient();
      if(!current || !client) return [];

      const { data, error } = await client
        .from('polls')
        .select('id,poll_key,question,options')
        .eq('session_id', current.id)
        .order('created_at', { ascending: true });

      if(error){
        console.warn('Poll bank load failed', error.message);
        pollsPromise = null;
        return [];
      }

      return Array.isArray(data) ? data : [];
    })();

    return pollsPromise;
  }

  function normalize(value){
    return String(value || '')
      .toLowerCase()
      .replace(/[“”‘’]/g, '')
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  async function resolvePollRow(poll){
    if(!poll) return null;
    const rows = await loadPolls();
    const pollQuestion = normalize(poll.question);
    const pollId = normalize(poll.id);

    return rows.find(function(row){
      return normalize(row.question) === pollQuestion || normalize(row.poll_key) === pollId;
    }) || null;
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

    if(error){
      console.warn('Attendee sync failed', error.message);
      return;
    }

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
    const questionKey = (sectionName + ':' + number)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-|-$/g,'');

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

  async function saveVote(poll, selected, anonymous){
    const current = await loadSession();
    const client = createClient();
    const row = await resolvePollRow(poll);
    if(!current || !client || !row || selected == null) return;

    const options = Array.isArray(row.options) ? row.options : [];
    const selectedKey = normalize(selected);
    const optionIndex = options.findIndex(function(option){
      return normalize(option) === selectedKey;
    });

    if(optionIndex < 0){
      console.warn('Vote option did not match the seeded poll', selected);
      return;
    }

    const signature = row.id + ':' + optionIndex;
    const now = Date.now();
    if(now - (recentVotes.get(signature) || 0) < 600) return;
    recentVotes.set(signature, now);

    const { error } = await client.from('votes').upsert({
      session_id: current.id,
      poll_id: row.id,
      attendee_id: anonymous ? null : attendeeId,
      client_id: clientId(),
      option_index: optionIndex
    }, { onConflict: 'poll_id,client_id' });

    if(error) console.warn('Vote sync failed', error.message);
  }

  function debounceAnswer(textarea){
    const prior = timers.get(textarea);
    if(prior) clearTimeout(prior);
    timers.set(textarea, setTimeout(function(){
      saveWorkbookAnswer(textarea);
    }, 850));
  }

  function wrapLogin(){
    const original = window.checkPw;
    if(typeof original !== 'function' || original.__kingdomSupabaseWrapped) return;

    const wrapped = function(){
      const adminMode = document.body.classList.contains('kp-admin-modal');
      const name = document.getElementById('mo-name')?.value?.trim();
      const email = document.getElementById('mo-email')?.value?.trim();
      const result = original.apply(this, arguments);

      if(!adminMode && name && email){
        queueMicrotask(function(){ saveAttendee(name, email); });
      }

      return result;
    };

    wrapped.__kingdomSupabaseWrapped = true;
    window.checkPw = wrapped;
    try{ checkPw = wrapped; }catch(error){}
  }

  function wrapQuestionSubmit(){
    const original = window.submitAskQuestion;
    if(typeof original !== 'function' || original.__kingdomSupabaseWrapped) return;

    const wrapped = function(){
      const text = document.getElementById('ask-ta')?.value?.trim();
      const result = original.apply(this, arguments);
      if(text) queueMicrotask(function(){ saveQuestion(text); });
      return result;
    };

    wrapped.__kingdomSupabaseWrapped = true;
    window.submitAskQuestion = wrapped;
  }

  function wrapPollSubmit(){
    const original = window.submitPollVote;
    if(typeof original !== 'function' || original.__kingdomSupabaseWrapped) return;

    const wrapped = function(){
      const poll = window.pollState?.active || null;
      const selected = window.pollState?.selected;
      const anonymous = Boolean(document.getElementById('poll-anon')?.checked);
      const result = original.apply(this, arguments);

      if(poll && selected != null){
        queueMicrotask(function(){ saveVote(poll, selected, anonymous); });
      }

      return result;
    };

    wrapped.__kingdomSupabaseWrapped = true;
    window.submitPollVote = wrapped;
  }

  function wrapOnlineVote(){
    const original = window.onlineVote;
    if(typeof original !== 'function' || original.__kingdomSupabaseWrapped) return;

    const wrapped = function(answer){
      const poll = window.onlineViewerState?.poll || window.pollState?.active || null;
      const result = original.apply(this, arguments);
      if(poll && answer != null){
        queueMicrotask(function(){ saveVote(poll, answer, false); });
      }
      return result;
    };

    wrapped.__kingdomSupabaseWrapped = true;
    window.onlineVote = wrapped;
  }

  function installHooks(){
    wrapLogin();
    wrapQuestionSubmit();
    wrapPollSubmit();
    wrapOnlineVote();
  }

  function bindEvents(){
    document.addEventListener('input', function(event){
      const target = event.target;
      if(target && target.matches('.q-ta')) debounceAnswer(target);
    }, { passive: true });
  }

  async function subscribeToState(){
    const current = await loadSession();
    const client = createClient();
    if(!current || !client) return;

    client.channel('kingdom-session-' + current.id)
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'sync_state',
        filter: 'session_id=eq.' + current.id
      }, function(payload){
        window.dispatchEvent(new CustomEvent('kingdom:sync-state', {
          detail: payload.new
        }));
      })
      .subscribe();
  }

  function boot(){
    createClient();
    bindEvents();
    installHooks();
    subscribeToState();

    [250,900,1800].forEach(function(delay){
      setTimeout(installHooks, delay);
    });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  }else{
    boot();
  }
})();
