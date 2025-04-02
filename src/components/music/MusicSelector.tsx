"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Upload, Music, Play, Pause, Loader2 } from "lucide-react";

interface MusicSelectorProps {
  onMusicSelected: (file: File | null, url: string) => void;
}

interface Track {
  id: string;
  name: string;
  duration: string;
  url: string;
  category?: string;
}

// Reliable tracks that are guaranteed to work
const RELIABLE_TRACKS = [
  {
    id: "1",
    name: "Calm Piano",
    duration: "3:42",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    category: "Piano",
  },
  {
    id: "2",
    name: "Ambient Nature",
    duration: "5:21",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    category: "Nature",
  },
  {
    id: "3",
    name: "Meditation Bells",
    duration: "4:15",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    category: "Meditation",
  },
  {
    id: "4",
    name: "Ocean Waves",
    duration: "6:30",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    category: "Nature",
  },
  {
    id: "5",
    name: "Peaceful Ambient",
    duration: "2:55",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    category: "Ambient",
  },
  {
    id: "6",
    name: "Relaxing Atmosphere",
    duration: "3:10",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    category: "Ambient",
  },
];

export function MusicSelector({ onMusicSelected }: MusicSelectorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLibraryTrack, setSelectedLibraryTrack] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] =
    useState<string>("");
  const [audioError, setAudioError] = useState<string>("");
  const [libraryTracks, setLibraryTracks] = useState<Track[]>(RELIABLE_TRACKS);
  const [isLoadingTracks, setIsLoadingTracks] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  // Create an actual HTML audio element instead of using the Audio constructor
  useEffect(() => {
    // Create an audio element that will be added to the DOM
    const audioElement = document.createElement("audio");
    audioElement.crossOrigin = "anonymous";
    audioElement.preload = "auto";

    audioElement.onended = () => setIsPlaying(false);
    audioElement.oncanplay = () => {
      console.log("Audio ready to play");
      setAudioError("");
    };
    audioElement.onerror = (e) => {
      console.error("Audio error:", e);
      setIsPlaying(false);
      setAudioError("Error loading audio. Please try another track.");
    };

    // Add the audio element to the DOM (but hidden)
    audioElement.style.display = "none";
    document.body.appendChild(audioElement);

    // Store references to both the Audio API and DOM element
    audioRef.current = audioElement;
    audioElementRef.current = audioElement;

    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = "";
        document.body.removeChild(audioElement);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      setSelectedFile(file);
      setAudioError("");

      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = fileUrl;
        audioRef.current.load();
      }
      setSelectedLibraryTrack("");
      setCurrentlyPlayingTrack("");
    }
  };

  const handleLibraryTrackSelect = (url: string) => {
    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    setSelectedLibraryTrack(url);
    setCurrentlyPlayingTrack(""); // Reset currently playing track
    setAudioError("");
  };

  const playTrack = (url: string) => {
    if (!audioRef.current) return;

    try {
      setAudioError("");
      // Set the track URL
      audioRef.current.src = url;
      audioRef.current.load();
      setCurrentlyPlayingTrack(url);

      // Play after a short delay to ensure loading
      setTimeout(() => {
        if (!audioRef.current) return;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAudioError("");
            })
            .catch((error) => {
              console.error("Audio playback error:", error);
              setIsPlaying(false);
              setAudioError("Could not play audio. Please try another track.");
            });
        }
      }, 500); // Increased delay for better loading
    } catch (error) {
      console.error("Error playing track:", error);
      setAudioError("Error playing audio. Please try another track.");
    }
  };

  const togglePlayPause = (trackUrl?: string) => {
    if (!audioRef.current) return;

    // If a specific track URL is provided and it's different from what's currently playing
    if (trackUrl && trackUrl !== currentlyPlayingTrack) {
      audioRef.current.pause();
      setIsPlaying(false);
      playTrack(trackUrl);
      return;
    }

    // Normal play/pause toggle for current track
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Make sure we have a track selected
      if (
        !audioRef.current.src ||
        audioRef.current.src === window.location.href
      ) {
        if (selectedLibraryTrack) {
          playTrack(selectedLibraryTrack);
        } else if (selectedFile) {
          const fileUrl = URL.createObjectURL(selectedFile);
          playTrack(fileUrl);
        } else {
          return; // No track to play
        }
      } else {
        // Play the current track
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAudioError("");
            })
            .catch((error) => {
              console.error("Audio playback error:", error);
              setIsPlaying(false);
              setAudioError("Could not play audio. Please try another track.");
            });
        }
      }
    }
  };

  const handleContinue = () => {
    // Stop any playing audio before continuing
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }

    // Pass the selected music to the parent component
    onMusicSelected(selectedFile, selectedLibraryTrack);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get the name of the currently selected track for the continue button
  const getSelectedTrackName = () => {
    if (selectedFile) {
      return selectedFile.name.length > 20
        ? selectedFile.name.substring(0, 20) + "..."
        : selectedFile.name;
    } else if (selectedLibraryTrack) {
      const track = libraryTracks.find((t) => t.url === selectedLibraryTrack);
      return track ? track.name : "Selected Track";
    }
    return "Continue";
  };

  return (
    <div className="space-y-6 pb-10">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Music</TabsTrigger>
          <TabsTrigger value="library">Choose from Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={triggerFileInput}
          >
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">MP3, WAV up to 10MB</p>
            <Input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Music className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => togglePlayPause()}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          {audioError && (
            <div className="p-2 text-sm text-red-500 bg-red-50 rounded-md">
              {audioError}
            </div>
          )}

          {isLoadingTracks ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading music library...</span>
            </div>
          ) : libraryTracks.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No tracks available</h3>
              <p className="text-sm text-muted-foreground">
                The music library is currently empty.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
              {libraryTracks.map((track) => (
                <Card
                  key={track.id}
                  id={`track-${track.id}`}
                  className={`cursor-pointer transition-all ${selectedLibraryTrack === track.url ? "border-primary bg-primary/5" : ""}`}
                  onClick={() => {
                    handleLibraryTrackSelect(track.url);
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{track.name}</CardTitle>
                    <CardDescription>
                      {track.duration}
                      {track.category && ` • ${track.category}`}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause(track.url);
                      }}
                    >
                      {isPlaying && currentlyPlayingTrack === track.url ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-10 sticky bottom-0 bg-background pt-4 pb-2 z-10">
        <Button
          onClick={handleContinue}
          disabled={!selectedFile && !selectedLibraryTrack}
          size="lg"
          className="px-8"
        >
          {selectedFile || selectedLibraryTrack
            ? `Continue with ${getSelectedTrackName()}`
            : "Continue"}
        </Button>
      </div>
    </div>
  );
}
