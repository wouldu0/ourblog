-- Create posts table
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  excerpt text,
  image_url text,
  categories text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.posts enable row level security;

-- Create policy to allow all users to read posts
create policy "Posts are viewable by everyone." on public.posts
  for select using (true);
