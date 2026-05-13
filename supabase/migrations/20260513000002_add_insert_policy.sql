-- Allow authenticated users to insert new posts
CREATE POLICY "Authenticated users can insert posts" ON public.posts
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');
