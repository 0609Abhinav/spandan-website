-- Run in Supabase SQL Editor
alter table gallery add column if not exists year text default '2024';
alter table events  add column if not exists year text default '2024';
alter table videos  add column if not exists year text default '2024';

-- Update existing seeded data to 2024
update gallery set year = '2024' where year is null;
update events  set year = '2024' where year is null;
update videos  set year = '2024' where year is null;
