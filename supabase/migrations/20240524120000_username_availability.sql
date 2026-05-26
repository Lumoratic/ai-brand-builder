-- Username availability check (ignores the requesting user's own profile)

create or replace function public.is_username_available(
  p_username text,
  p_user_id uuid default auth.uid()
)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select not exists (
    select 1
    from public.profiles
    where username = lower(trim(p_username))
      and username is not null
      and id is distinct from p_user_id
  );
$$;

grant execute on function public.is_username_available(text, uuid) to authenticated;
