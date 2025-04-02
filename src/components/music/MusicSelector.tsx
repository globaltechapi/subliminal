"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Upload, Music, Play, Pause } from "lucide-react";

interface MusicSelectorProps {
  onMusicSelected: (file: File | null, url: string) => void;
}

export function MusicSelector({ onMusicSelected }: MusicSelectorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string>("");
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
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;

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
        if (selectedFile) {
          const fileUrl = URL.createObjectURL(selectedFile);
          audioRef.current.src = fileUrl;
          audioRef.current.load();

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
                  setAudioError(
                    "Could not play audio. Please try another track.",
                  );
                });
            }
          }, 500);
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
    onMusicSelected(selectedFile, "");
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
    }
    return "Continue";
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-4">
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
              <Button variant="ghost" size="icon" onClick={togglePlayPause}>
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        )}

        {audioError && (
          <div className="p-2 text-sm text-red-500 bg-red-50 rounded-md">
            {audioError}
          </div>
        )}
      </div>

      <div className="flex justify-end mt-10 sticky bottom-0 bg-background pt-4 pb-2 z-10">
        <Button
          onClick={handleContinue}
          disabled={!selectedFile}
          size="lg"
          className="px-8"
        >
          {selectedFile
            ? `Continue with ${getSelectedTrackName()}`
            : "Continue"}
        </Button>
      </div>
    </div>
  );
}
