-- Create content_settings table for storing application settings
CREATE TABLE IF NOT EXISTS content_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable row level security
ALTER TABLE content_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for super admins to manage all settings
CREATE POLICY "Super admins can manage all settings" 
ON content_settings
FOR ALL
TO authenticated
USING (EXISTS (SELECT 1 FROM users WHERE users.id = auth.uid() AND users.is_super_admin = true));

-- Create policy for all users to read settings
CREATE POLICY "All users can read settings"
ON content_settings
FOR SELECT
TO authenticated
USING (true);

-- Add to realtime publication
-- Check if the table is already in the publication before adding it
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'content_settings'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE content_settings;
  END IF;
END
$$;