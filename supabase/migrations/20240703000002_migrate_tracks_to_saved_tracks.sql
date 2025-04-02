-- Migrate existing tracks to saved_tracks
INSERT INTO saved_tracks (user_id, track_title, track_url, affirmations, settings, duration, created_at, updated_at)
SELECT user_id, track_title, track_url, affirmations, settings, 
       CASE WHEN duration IS NULL OR duration <= 0 THEN 10 ELSE duration END, 
       created_at, updated_at
FROM tracks
ON CONFLICT DO NOTHING;
