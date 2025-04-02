-- Create music_library table to store track information
CREATE TABLE IF NOT EXISTS music_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some initial tracks to the music library
INSERT INTO music_library (name, duration, url, category) VALUES
('Calm Piano', '3:42', 'https://storage.googleapis.com/tempo-public-assets/audio/calm-piano.mp3', 'Piano'),
('Ambient Nature', '5:21', 'https://storage.googleapis.com/tempo-public-assets/audio/ambient-nature.mp3', 'Nature'),
('Meditation Bells', '4:15', 'https://storage.googleapis.com/tempo-public-assets/audio/meditation-bells.mp3', 'Meditation'),
('Ocean Waves', '6:30', 'https://storage.googleapis.com/tempo-public-assets/audio/ocean-waves.mp3', 'Nature'),
('Peaceful Ambient', '2:55', 'https://cdn.pixabay.com/audio/2022/04/27/audio_2a1fce8de4.mp3', 'Ambient'),
('Relaxing Atmosphere', '3:10', 'https://cdn.pixabay.com/audio/2022/01/26/audio_d1a01f0d6f.mp3', 'Ambient'),
('Soft Piano', '2:48', 'https://cdn.pixabay.com/audio/2022/01/20/audio_d16a577694.mp3', 'Piano'),
('Gentle Rain', '4:05', 'https://cdn.pixabay.com/audio/2022/03/09/audio_c4d617a4f0.mp3', 'Nature'),
('Dreamy Ambient', '3:22', 'https://cdn.pixabay.com/audio/2022/01/18/audio_e92d323c7e.mp3', 'Ambient'),
('Meditation Music', '5:15', 'https://cdn.pixabay.com/audio/2022/03/18/audio_c9b7d810d5.mp3', 'Meditation');

-- Enable realtime for the music_library table
alter publication supabase_realtime add table music_library;
