CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  duration_days INTEGER NOT NULL,
  features JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

alter publication supabase_realtime add table packages;

-- Create policy to allow read access to all users
DROP POLICY IF EXISTS "Allow read access to packages" ON packages;
CREATE POLICY "Allow read access to packages"
  ON packages FOR SELECT
  USING (true);

-- Create policy to allow only super admins to modify packages
DROP POLICY IF EXISTS "Allow super admins to modify packages" ON packages;
CREATE POLICY "Allow super admins to modify packages"
  ON packages FOR ALL
  USING (auth.uid() IN (SELECT id FROM users WHERE is_super_admin = true));

-- Enable RLS on packages table
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;