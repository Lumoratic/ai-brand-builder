-- Public portfolio: username + publish state

alter table public.profiles
  add column if not exists username text,
  add column if not exists is_published boolean not null default false;

comment on column public.profiles.username is 'Public URL slug, lowercase, unique when set';
comment on column public.profiles.is_published is 'When true, portfolio is visible at /u/[username]';

-- Enforce lowercase URL-safe usernames at the database layer
alter table public.profiles
  drop constraint if exists profiles_username_format;

alter table public.profiles
  add constraint profiles_username_format
  check (
    username is null
    or (
      username = lower(username)
      and username ~ '^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])?$'
    )
  );

create unique index if not exists profiles_username_key
  on public.profiles (username)
  where username is not null;

-- Allow anonymous and authenticated visitors to read published profiles
drop policy if exists "Anyone can view published profiles" on public.profiles;

create policy "Anyone can view published profiles"
on public.profiles
for select
to anon, authenticated
using (is_published = true);
