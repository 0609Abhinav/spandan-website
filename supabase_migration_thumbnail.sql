-- Run in Supabase SQL Editor
alter table events add column if not exists thumbnail_url text;
alter table events add column if not exists video_url     text;
