-- Run in Supabase SQL Editor

create table if not exists site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null unique,   -- e.g. "gallery_header", "videos_header"
  title text not null,
  subtitle text,
  year text,
  updated_at timestamptz default now()
);

alter table site_content enable row level security;
create policy "public read site_content"  on site_content for select using (true);
create policy "admin all site_content"    on site_content for all   using (auth.role() = 'authenticated');

-- Seed defaults so frontend always has fallback data
insert into site_content (section, title, subtitle, year) values
  ('gallery_header', 'Event Gallery',      'Moments captured from our finest events', '2024'),
  ('videos_header',  'Event Highlights',   'Relive the best moments',                 '2024')
on conflict (section) do nothing;
