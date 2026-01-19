-- Add RLS policies for authenticated users to manage academic works

-- Policy for INSERT - authenticated users can create academic works
CREATE POLICY "Authenticated users can insert academic works" 
ON public.academic_works 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- Policy for UPDATE - authenticated users can update academic works
CREATE POLICY "Authenticated users can update academic works" 
ON public.academic_works 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy for DELETE - authenticated users can delete academic works
CREATE POLICY "Authenticated users can delete academic works" 
ON public.academic_works 
FOR DELETE 
TO authenticated
USING (true);