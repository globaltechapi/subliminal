CREATE TABLE IF NOT EXISTS user_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, package_id, start_date)
);

alter publication supabase_realtime add table user_packages;

-- Create policy to allow users to view their own packages
DROP POLICY IF EXISTS "Users can view own packages" ON user_packages;
CREATE POLICY "Users can view own packages"
  ON user_packages FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow super admins to view and modify all user packages
DROP POLICY IF EXISTS "Super admins can manage all user packages" ON user_packages;
CREATE POLICY "Super admins can manage all user packages"
  ON user_packages FOR ALL
  USING (auth.uid() IN (SELECT id FROM users WHERE is_super_admin = true));

-- Enable RLS on user_packages table
ALTER TABLE user_packages ENABLE ROW LEVEL SECURITY;