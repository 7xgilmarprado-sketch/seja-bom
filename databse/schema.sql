-- --------------------------------------------------------
-- MINIMISSÕES - SUPABASE SCHEMA (IDEMPOTENTE)
-- Pode ser rodado múltiplas vezes sem quebrar.
-- --------------------------------------------------------

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. TABLES (Usando IF NOT EXISTS)

-- PROFILES
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar_url text,
  streak_count int default 0,
  total_missions int default 0,
  last_mission_date date,
  created_at timestamptz default now()
);

-- DAILY MISSIONS
create table if not exists public.daily_missions (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  category text check (category in ('kindness', 'gratitude', 'connection', 'self-care')),
  xp_reward int default 50,
  active_date date unique
);

-- COMPLETIONS
create table if not exists public.completions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mission_id uuid references public.daily_missions(id) not null,
  reflection_text text,
  is_public boolean default true,
  created_at timestamptz default now(),
  constraint one_mission_per_day unique (user_id, mission_id)
);

-- REACTIONS
create table if not exists public.reactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  completion_id uuid references public.completions(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, completion_id)
);

-- 3. VIEWS
create or replace view public.feed_posts as
  select 
    c.id,
    c.user_id,
    p.username as user_name,
    p.avatar_url as user_avatar,
    m.title as mission_title,
    c.reflection_text as reflection,
    c.created_at as timestamp,
    (select count(*) from public.reactions r where r.completion_id = c.id) as reactions
  from public.completions c
  join public.profiles p on c.user_id = p.id
  join public.daily_missions m on c.mission_id = m.id
  where c.is_public = true
  order by c.created_at desc;

-- 4. TRIGGERS & FUNCTIONS

-- Handle new user
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id, 
    coalesce(new.raw_user_meta_data->>'full_name', 'User ' || substr(new.id::text, 1, 4)), 
    coalesce(new.raw_user_meta_data->>'avatar_url', 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || new.id)
  )
  on conflict (id) do nothing; -- Prevents error if profile exists
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Toxicity check
create or replace function check_toxicity() returns trigger as $$
begin
  if length(new.reflection_text) > 400 then
    raise exception 'Texto muito longo (máximo 400 caracteres).';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists toxicity_check on completions;
create trigger toxicity_check
before insert on completions
for each row execute function check_toxicity();

-- 5. RLS POLICIES (Recriando para garantir consistência)

alter table public.profiles enable row level security;
alter table public.daily_missions enable row level security;
alter table public.completions enable row level security;
alter table public.reactions enable row level security;

-- Drop existing policies to avoid "policy already exists" errors
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Missions are viewable by everyone" on daily_missions;
drop policy if exists "Completions are viewable by everyone" on completions;
drop policy if exists "Users can insert own completion" on completions;
drop policy if exists "Reactions are viewable by everyone" on reactions;
drop policy if exists "Users can insert own reaction" on reactions;
drop policy if exists "Users can remove own reaction" on reactions;

-- Re-create policies
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

create policy "Missions are viewable by everyone" on daily_missions for select using (true);

create policy "Completions are viewable by everyone" on completions for select using (true);
create policy "Users can insert own completion" on completions for insert with check (auth.uid() = user_id);

create policy "Reactions are viewable by everyone" on reactions for select using (true);
create policy "Users can insert own reaction" on reactions for insert with check (auth.uid() = user_id);
create policy "Users can remove own reaction" on reactions for delete using (auth.uid() = user_id);

-- 6. SEED DATA (Apenas insere se não existir para o dia)
insert into daily_missions (title, description, category, xp_reward, active_date)
values 
('Elogio Sincero', 'Encontre algo que você genuinamente admira em um colega ou amigo e diga a ele.', 'kindness', 50, CURRENT_DATE)
on conflict (active_date) do nothing;

-- 7. STORAGE CONFIGURATION (AVATARS) - ESSENCIAL PARA AS FOTOS

-- Create 'avatars' bucket if not exists
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- FORCE PUBLIC: This fixes the issue if the bucket was created as private
update storage.buckets
set public = true
where id = 'avatars';

-- Drop storage policies to recreate them cleanly
drop policy if exists "Avatar images are publicly accessible" on storage.objects;
drop policy if exists "Anyone can upload an avatar" on storage.objects;
drop policy if exists "Anyone can update their own avatar" on storage.objects;

-- Storage Policies
create policy "Avatar images are publicly accessible"
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar"
  on storage.objects for insert
  with check ( bucket_id = 'avatars' and auth.role() = 'authenticated' );
  
create policy "Anyone can update their own avatar"
  on storage.objects for update
  using ( bucket_id = 'avatars' and auth.uid() = owner )
  with check ( bucket_id = 'avatars' and auth.uid() = owner );
