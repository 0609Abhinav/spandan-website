-- Run in Supabase SQL Editor

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  youtube_url text not null,   -- full YouTube URL or embed URL
  thumbnail_url text,          -- custom thumbnail (Cloudinary) or leave blank to use YouTube auto-thumb
  created_at timestamptz default now()
);

alter table videos enable row level security;
create policy "public read videos"  on videos for select using (true);
create policy "admin all videos"    on videos for all    using (auth.role() = 'authenticated');

-- Seed the two original hardcoded videos
insert into videos (title, description, youtube_url) values
  ('Event Highlights 2024', 'A glimpse into our amazing events!', 'https://www.youtube.com/watch?v=TSODobJ0V7M'),
  ('Behind the Scenes',     'How we made it all happen!',         'https://www.youtube.com/watch?v=tgbNymZ7vqY');
