-- Create saved_tracks table with proper structure
CREATE TABLE IF NOT EXISTS saved_tracks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  track_title TEXT NOT NULL,
  track_url TEXT NOT NULL,
  affirmations JSONB,
  settings JSONB,
  duration FLOAT DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS saved_tracks_user_id_idx ON saved_tracks(user_id);

-- Add RLS policies
ALTER TABLE saved_tracks ENABLE ROW LEVEL SECURITY;

-- Policy for users to view only their own tracks
DROP POLICY IF EXISTS "Users can view their own saved tracks" ON saved_tracks;
CREATE POLICY "Users can view their own saved tracks"
  ON saved_tracks FOR SELECT
  USING (auth.uid() = user_id);

-- Policy for users to insert their own tracks
DROP POLICY IF EXISTS "Users can insert their own saved tracks" ON saved_tracks;
CREATE POLICY "Users can insert their own saved tracks"
  ON saved_tracks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own tracks
DROP POLICY IF EXISTS "Users can update their own saved tracks" ON saved_tracks;
CREATE POLICY "Users can update their own saved tracks"
  ON saved_tracks FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy for users to delete their own tracks
DROP POLICY IF EXISTS "Users can delete their own saved tracks" ON saved_tracks;
CREATE POLICY "Users can delete their own saved tracks"
  ON saved_tracks FOR DELETE
  USING (auth.uid() = user_id);
