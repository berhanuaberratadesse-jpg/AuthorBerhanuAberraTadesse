-- Allow ANONYMOUS to DELETE posts (protected on frontend by your password)
CREATE POLICY "Allow public delete access" 
ON public.posts FOR DELETE USING (true);
