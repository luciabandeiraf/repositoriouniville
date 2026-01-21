-- Create storage bucket for academic work PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('academic-pdfs', 'academic-pdfs', true);

-- Allow anyone to read PDFs (public access for downloads)
CREATE POLICY "PDFs are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'academic-pdfs');

-- Allow authenticated users to upload PDFs
CREATE POLICY "Authenticated users can upload PDFs"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'academic-pdfs' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update PDFs"
ON storage.objects FOR UPDATE
USING (bucket_id = 'academic-pdfs' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete PDFs
CREATE POLICY "Authenticated users can delete PDFs"
ON storage.objects FOR DELETE
USING (bucket_id = 'academic-pdfs' AND auth.role() = 'authenticated');