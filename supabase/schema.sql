-- UOPlatform schema. Run once in the Supabase SQL editor.
-- Assumes a Storage bucket named "post-images" will be created (see end of file).

-- =========================================================================
-- profiles: 1:1 with auth.users, holds public-facing user info
-- =========================================================================
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique,
  display_name text,
  avatar_url  text,
  bio         text,
  created_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles readable by anyone"
  on public.profiles for select
  using (true);

create policy "users insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =========================================================================
-- posts
-- =========================================================================
create table if not exists public.posts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  title       text not null,
  body        text,
  image_url   text,
  channel     text,
  tags        text[] default '{}',
  created_at  timestamptz not null default now()
);

create index if not exists posts_user_id_idx on public.posts(user_id);
create index if not exists posts_created_at_idx on public.posts(created_at desc);

alter table public.posts enable row level security;

create policy "posts readable by anyone"
  on public.posts for select
  using (true);

create policy "users insert own posts"
  on public.posts for insert
  with check (auth.uid() = user_id);

create policy "users delete own posts"
  on public.posts for delete
  using (auth.uid() = user_id);

-- =========================================================================
-- comments
-- =========================================================================
create table if not exists public.comments (
  id          uuid primary key default gen_random_uuid(),
  post_id     uuid not null references public.posts(id) on delete cascade,
  user_id     uuid not null references public.profiles(id) on delete cascade,
  body        text not null,
  created_at  timestamptz not null default now()
);

create index if not exists comments_post_id_idx on public.comments(post_id);
create index if not exists comments_user_id_idx on public.comments(user_id);

alter table public.comments enable row level security;

create policy "comments readable by anyone"
  on public.comments for select
  using (true);

create policy "users insert own comments"
  on public.comments for insert
  with check (auth.uid() = user_id);

create policy "users delete own comments"
  on public.comments for delete
  using (auth.uid() = user_id);

-- =========================================================================
-- Storage bucket: post-images
-- Create the bucket via Dashboard (Storage → New bucket → "post-images", public),
-- then run the policies below.
-- =========================================================================
-- insert into storage.buckets (id, name, public) values ('post-images', 'post-images', true)
--   on conflict (id) do nothing;

create policy "post-images public read"
  on storage.objects for select
  using (bucket_id = 'post-images');

create policy "post-images authenticated insert"
  on storage.objects for insert
  with check (bucket_id = 'post-images' and auth.role() = 'authenticated');

create policy "post-images owner delete"
  on storage.objects for delete
  using (bucket_id = 'post-images' and auth.uid() = owner);
