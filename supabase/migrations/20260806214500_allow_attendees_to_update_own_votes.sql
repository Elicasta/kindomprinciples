grant update on public.votes to anon, authenticated;

create policy votes_own_update
on public.votes
for update
to anon, authenticated
using (client_id = public.request_client_id())
with check (client_id = public.request_client_id());