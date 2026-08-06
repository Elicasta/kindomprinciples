create extension if not exists pgcrypto;

create or replace function public.request_client_id()
returns uuid
language plpgsql
stable
set search_path = ''
as $$
declare
  raw_value text;
begin
  raw_value := nullif((current_setting('request.headers', true)::jsonb ->> 'x-client-id'), '');
  if raw_value is null then
    return null;
  end if;
  return raw_value::uuid;
exception when others then
  return null;
end;
$$;

revoke all on function public.request_client_id() from public;
grant execute on function public.request_client_id() to anon, authenticated;

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  series_slug text not null,
  lesson_slug text not null,
  title text not null,
  status text not null default 'draft' check (status in ('draft','live','ended')),
  starts_at timestamptz,
  ended_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.sync_state (
  session_id uuid primary key references public.sessions(id) on delete cascade,
  active_slide integer not null default 0 check (active_slide >= 0),
  active_scripture jsonb,
  active_poll_id uuid,
  poll_open boolean not null default false,
  questionnaire_open boolean not null default false,
  presentation_started boolean not null default false,
  timer_started_at timestamptz,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.attendees (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  client_id uuid not null,
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 320),
  language text not null default 'en' check (language in ('en','es')),
  watching_online boolean not null default false,
  joined_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (session_id, client_id)
);

create table public.polls (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  poll_key text not null,
  question text not null,
  options jsonb not null check (jsonb_typeof(options) = 'array'),
  correct_index smallint,
  is_open boolean not null default false,
  opened_at timestamptz,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, poll_key)
);

alter table public.sync_state
  add constraint sync_state_active_poll_fk
  foreign key (active_poll_id) references public.polls(id) on delete set null;

create table public.votes (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  poll_id uuid not null references public.polls(id) on delete cascade,
  attendee_id uuid references public.attendees(id) on delete set null,
  client_id uuid not null,
  option_index smallint not null check (option_index >= 0),
  created_at timestamptz not null default now(),
  unique (poll_id, client_id)
);

create table public.questions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  attendee_id uuid references public.attendees(id) on delete set null,
  client_id uuid not null,
  question text not null check (char_length(question) between 1 and 2000),
  status text not null default 'new' check (status in ('new','reviewed','answered','archived')),
  answer text,
  answered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.responses (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.sessions(id) on delete cascade,
  attendee_id uuid references public.attendees(id) on delete set null,
  client_id uuid not null,
  lesson_slug text not null,
  question_key text not null,
  response text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (session_id, client_id, lesson_slug, question_key)
);

create index attendees_session_idx on public.attendees(session_id, joined_at desc);
create index polls_session_idx on public.polls(session_id, created_at);
create index votes_poll_idx on public.votes(poll_id, option_index);
create index questions_session_status_idx on public.questions(session_id, status, created_at desc);
create index responses_session_client_idx on public.responses(session_id, client_id, updated_at desc);

alter table public.sessions enable row level security;
alter table public.sync_state enable row level security;
alter table public.attendees enable row level security;
alter table public.polls enable row level security;
alter table public.votes enable row level security;
alter table public.questions enable row level security;
alter table public.responses enable row level security;

grant select on public.sessions, public.sync_state, public.polls to anon, authenticated;
grant select, insert, update on public.attendees to anon, authenticated;
grant insert, select on public.votes to anon, authenticated;
grant insert, select on public.questions to anon, authenticated;
grant insert, select, update on public.responses to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;

create policy sessions_public_read on public.sessions
for select to anon, authenticated using (true);

create policy sync_state_public_read on public.sync_state
for select to anon, authenticated using (true);

create policy polls_public_read on public.polls
for select to anon, authenticated using (true);

create policy attendees_own_read on public.attendees
for select to anon, authenticated
using (client_id = public.request_client_id());

create policy attendees_own_insert on public.attendees
for insert to anon, authenticated
with check (client_id = public.request_client_id());

create policy attendees_own_update on public.attendees
for update to anon, authenticated
using (client_id = public.request_client_id())
with check (client_id = public.request_client_id());

create policy votes_own_read on public.votes
for select to anon, authenticated
using (client_id = public.request_client_id());

create policy votes_own_insert on public.votes
for insert to anon, authenticated
with check (client_id = public.request_client_id());

create policy questions_own_read on public.questions
for select to anon, authenticated
using (client_id = public.request_client_id());

create policy questions_own_insert on public.questions
for insert to anon, authenticated
with check (client_id = public.request_client_id());

create policy responses_own_read on public.responses
for select to anon, authenticated
using (client_id = public.request_client_id());

create policy responses_own_insert on public.responses
for insert to anon, authenticated
with check (client_id = public.request_client_id());

create policy responses_own_update on public.responses
for update to anon, authenticated
using (client_id = public.request_client_id())
with check (client_id = public.request_client_id());

insert into public.sessions (slug, series_slug, lesson_slug, title, status, starts_at)
values ('kingdom-principles-live', 'kingdom-principles', 'lesson-1', 'The Principle of Identity', 'live', now())
on conflict (slug) do update
set series_slug = excluded.series_slug,
    lesson_slug = excluded.lesson_slug,
    title = excluded.title,
    status = excluded.status,
    updated_at = now();

insert into public.sync_state (session_id)
select id from public.sessions where slug = 'kingdom-principles-live'
on conflict (session_id) do nothing;

insert into public.polls (session_id, poll_key, question, options, correct_index)
select s.id, p.poll_key, p.question, p.options, p.correct_index
from public.sessions s
cross join (values
  ('identity-first', 'When pressure comes, what area do people usually question first?', '["Their schedule","Their identity","Their finances","Their talents"]'::jsonb, 1::smallint),
  ('declaration-challenged', 'In Matthew 4, what did the enemy challenge when he said, “If thou be the Son of God”?', '["Jesus’ hunger","Jesus’ location","God’s declaration","The disciples’ faith"]'::jsonb, 2::smallint),
  ('appetite', 'Which identity pressure is connected to immediate desire?', '["Appetite","Approval","Control","Comparison"]'::jsonb, 0::smallint),
  ('approval', 'Which identity pressure asks, “Whose validation do you require?”', '["Appetite","Approval","Control","Fear"]'::jsonb, 1::smallint),
  ('control', 'Which identity pressure tries to reach the destination without God’s process?', '["Appetite","Approval","Control","Confusion"]'::jsonb, 2::smallint),
  ('scripture-response', 'What did Jesus use to answer temptation?', '["Emotion","Explanation","Scripture","Silence only"]'::jsonb, 2::smallint),
  ('lesson-summary', 'Which statement best summarizes the lesson?', '["God only speaks after we succeed.","Identity is earned through performance.","Settled identity produces stable obedience.","Pressure means God has left us."]'::jsonb, 2::smallint)
) as p(poll_key, question, options, correct_index)
where s.slug = 'kingdom-principles-live'
on conflict (session_id, poll_key) do update
set question = excluded.question,
    options = excluded.options,
    correct_index = excluded.correct_index,
    updated_at = now();

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'sync_state'
  ) then
    alter publication supabase_realtime add table public.sync_state;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'polls'
  ) then
    alter publication supabase_realtime add table public.polls;
  end if;
end $$;