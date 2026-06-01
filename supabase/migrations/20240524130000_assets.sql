-- Assets table: separate resume, portfolio, and website builder products per user.

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  slug text,
  data jsonb not null default '{}'::jsonb,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint assets_type_check check (type in ('resume', 'portfolio', 'website'))
);

comment on table public.assets is 'User-owned builder assets: resume, portfolio, website';
comment on column public.assets.data is 'Asset-specific JSON payload (editor state)';
comment on column public.assets.slug is 'Optional URL slug, unique per user when set';

create index if not exists assets_user_id_idx on public.assets (user_id);
create index if not exists assets_type_idx on public.assets (type);
create index if not exists assets_slug_idx on public.assets (slug) where slug is not null;

create unique index if not exists assets_user_id_slug_key
  on public.assets (user_id, slug)
  where slug is not null;

-- Keep updated_at current on writes
create or replace function public.set_assets_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists assets_set_updated_at on public.assets;

create trigger assets_set_updated_at
before update on public.assets
for each row
execute function public.set_assets_updated_at();

-- Row-level security
alter table public.assets enable row level security;

drop policy if exists "Users can view own assets" on public.assets;
create policy "Users can view own assets"
on public.assets
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own assets" on public.assets;
create policy "Users can insert own assets"
on public.assets
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own assets" on public.assets;
create policy "Users can update own assets"
on public.assets
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete own assets" on public.assets;
create policy "Users can delete own assets"
on public.assets
for delete
to authenticated
using (auth.uid() = user_id);

-- Public read for published assets (future public asset routes)
drop policy if exists "Anyone can view published assets" on public.assets;
create policy "Anyone can view published assets"
on public.assets
for select
to anon, authenticated
using (is_published = true);
