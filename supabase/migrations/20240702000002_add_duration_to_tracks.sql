-- Add duration column to tracks table
ALTER TABLE tracks ADD COLUMN IF NOT EXISTS duration FLOAT DEFAULT 0;
