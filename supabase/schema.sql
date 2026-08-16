create extension if not exists "pgcrypto";

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'website',
  submitted_at timestamptz not null default now()
);

alter table public.inquiries enable row level security;

create policy "Allow public insert"
on public.inquiries
for insert
with check (true);

create policy "Allow authenticated read"
on public.inquiries
for select
using (auth.role() = 'authenticated');
