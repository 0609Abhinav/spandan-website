-- Run in Supabase SQL Editor

create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  event_category text,
  created_at timestamptz default now()
);

create table if not exists teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  image_url text,
  bio text,
  created_at timestamptz default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  whatsapp text,
  roll_no text not null,
  section text,
  branch text,
  course text,
  year text,
  art_form text,
  reason text,
  created_at timestamptz default now()
);

-- RLS
alter table gallery enable row level security;
alter table teachers enable row level security;
alter table events enable row level security;
alter table registrations enable row level security;

-- Public read
create policy "public read gallery"        on gallery        for select using (true);
create policy "public read teachers"       on teachers       for select using (true);
create policy "public read events"         on events         for select using (true);
-- Public can insert registrations
create policy "public insert registrations" on registrations for insert with check (true);

-- Admin full access
create policy "admin all gallery"       on gallery        for all using (auth.role() = 'authenticated');
create policy "admin all teachers"      on teachers       for all using (auth.role() = 'authenticated');
create policy "admin all events"        on events         for all using (auth.role() = 'authenticated');
create policy "admin all registrations" on registrations  for all using (auth.role() = 'authenticated');
