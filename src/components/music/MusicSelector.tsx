"use client";

import { useState, useRef } from "react";
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
import { Upload, Music, Play, Pause } from "lucide-react";

interface MusicSelectorProps {
  onMusicSelected: (file: File | null, url: string) => void;
}

const SAMPLE_TRACKS = [
  {
    id: 1,
    name: "Calm Piano",
    duration: "3:42",
    url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1bab.mp3",
  },
  {
    id: 2,
    name: "Ambient Nature",
    duration: "5:21",
    url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_1fb1757218.mp3",
  },
  {
    id: 3,
    name: "Meditation Bells",
    duration: "4:15",
    url: "https://cdn.pixabay.com/download/audio/2022/03/10/audio_1dde665c95.mp3",
  },
  {
    id: 4,
    name: "Ocean Waves",
    duration: "6:30",
    url: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_8a49069f5c.mp3",
  },
];

export function MusicSelector({ onMusicSelected }: MusicSelectorProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedLibraryTrack, setSelectedLibraryTrack] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);
      // Create a temporary URL for the file
      const fileUrl = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = fileUrl;
      }
      setSelectedLibraryTrack("");
    }
  };

  const handleLibraryTrackSelect = (url: string) => {
    setSelectedLibraryTrack(url);
    if (audioRef.current) {
      audioRef.current.src = url;
      audioRef.current.load(); // Explicitly load the audio
    }
    setSelectedFile(null);
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleContinue = () => {
    onMusicSelected(selectedFile, selectedLibraryTrack);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
        </TabsContent>

        <TabsContent value="library" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SAMPLE_TRACKS.map((track) => (
              <Card
                key={track.id}
                className={`cursor-pointer transition-all ${selectedLibraryTrack === track.url ? "border-primary" : ""}`}
                onClick={() => handleLibraryTrackSelect(track.url)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{track.name}</CardTitle>
                  <CardDescription>{track.duration}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLibraryTrackSelect(track.url);
                      togglePlayPause();
                    }}
                  >
                    {isPlaying && selectedLibraryTrack === track.url ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={(e) => console.error("Audio error:", e)}
        className="hidden"
        preload="auto"
      />

      <div className="flex justify-end mt-10 sticky bottom-0 bg-background pt-4 pb-2 z-10">
        <Button
          onClick={handleContinue}
          disabled={!selectedFile && !selectedLibraryTrack}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
