-- Add is_super_admin column to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN DEFAULT FALSE;

-- Create policy to allow super admins to view all users
DROP POLICY IF EXISTS "Super admins can view all users" ON users;
CREATE POLICY "Super admins can view all users"
  ON users FOR SELECT
  USING (auth.uid() IN (SELECT id FROM users WHERE is_super_admin = true));

-- Create policy to allow super admins to update users
DROP POLICY IF EXISTS "Super admins can update users" ON users;
CREATE POLICY "Super admins can update users"
  ON users FOR UPDATE
  USING (auth.uid() IN (SELECT id FROM users WHERE is_super_admin = true));

-- Create content_settings table for website content management
CREATE TABLE IF NOT EXISTS content_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table content_settings;

-- Create policy to allow read access to all users for content_settings
DROP POLICY IF EXISTS "Allow read access to content_settings" ON content_settings;
CREATE POLICY "Allow read access to content_settings"
  ON content_settings FOR SELECT
  USING (true);

-- Create policy to allow only super admins to modify content_settings
DROP POLICY IF EXISTS "Allow super admins to modify content_settings" ON content_settings;
CREATE POLICY "Allow super admins to modify content_settings"
  ON content_settings FOR ALL
  USING (auth.uid() IN (SELECT id FROM users WHERE is_super_admin = true));

-- Enable RLS on content_settings table
ALTER TABLE content_settings ENABLE ROW LEVEL SECURITY;