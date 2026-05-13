-- Add detailed columns to posts table
ALTER TABLE public.posts 
ADD COLUMN content TEXT,
ADD COLUMN author_name TEXT DEFAULT '해탈한 개발자',
ADD COLUMN author_avatar_url TEXT DEFAULT '/images/react_hooks_garden.png',
ADD COLUMN read_time INTEGER DEFAULT 5;
