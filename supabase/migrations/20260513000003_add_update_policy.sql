-- Allow authenticated users to update their posts
CREATE POLICY "Authenticated users can update posts" ON public.posts
FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
