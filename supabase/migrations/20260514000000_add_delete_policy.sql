-- Allow authenticated users to delete posts
CREATE POLICY "Authenticated users can delete posts" ON public.posts
FOR DELETE
USING (auth.role() = 'authenticated');
