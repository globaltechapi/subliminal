-- Enable RLS on users table if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;

-- Create policies for users table
CREATE POLICY "Users can insert their own data" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id OR auth.uid() IS NULL);

CREATE POLICY "Users can view their own data" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Enable realtime for users table
alter publication supabase_realtime add table public.users;