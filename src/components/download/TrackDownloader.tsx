"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  createSubliminalTrack,
  createDownloadableFile,
} from "@/lib/audioMixer";
import { Download, Save, Music } from "lucide-react";

interface TrackDownloaderProps {
  music: File | null;
  musicUrl: string;
  affirmations: string[];
  settings: {
    frequency: number;
    volume: number;
    repeatCycles: number;
  };
  userId: string;
  onTrackGenerated: (url: string) => void;
}

export function TrackDownloader({
  music,
  musicUrl,
  affirmations,
  settings,
  userId,
  onTrackGenerated,
}: TrackDownloaderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState("My Subliminal Track");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Start generating the track when component mounts
    generateTrack();

    // Clean up function to revoke object URLs when component unmounts
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
    };
  }, []);

  const generateTrack = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      // Use either the file or the URL
      const musicSource = music || musicUrl;

      if (!musicSource) {
        throw new Error("No music selected");
      }

      console.log(
        "Using music source:",
        typeof musicSource === "string" ? musicSource : musicSource.name,
      );

      // Generate the subliminal track
      const audioBlob = await createSubliminalTrack(
        musicSource,
        affirmations,
        settings,
      );

      if (!audioBlob || audioBlob.size === 0) {
        throw new Error("Generated audio is empty");
      }

      console.log(
        "Audio blob generated:",
        audioBlob.type,
        audioBlob.size,
        "bytes",
      );

      // Create a downloadable file with metadata
      const url = createDownloadableFile(audioBlob, {
        title: trackTitle,
        artist: "Subliminal Creator",
        album: "Custom Subliminals",
      });

      // Verify the URL was created
      if (!url) {
        throw new Error("Failed to create downloadable URL");
      }

      setDownloadUrl(url);
      onTrackGenerated(url);
    } catch (err) {
      console.error("Error generating track:", err);
      setError(
        `Failed to generate track: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveTrack = async () => {
    setIsSaving(true);

    try {
      // In a real implementation, this would save the track to the user's account
      // For this demo, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success message or redirect could be implemented here
    } catch (err) {
      console.error("Error saving track:", err);
      setError("Failed to save track. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Subliminal Track</h3>

        {isGenerating ? (
          <div className="text-center py-12">
            <div className="animate-pulse flex flex-col items-center">
              <Music className="h-12 w-12 text-primary mb-4" />
              <p className="text-lg font-medium">
                Generating your subliminal track...
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This may take a few moments as we mix your music with
                affirmations.
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>{error}</p>
            <Button variant="outline" onClick={generateTrack} className="mt-4">
              Try Again
            </Button>
          </div>
        ) : downloadUrl ? (
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <div className="flex items-center gap-4 mb-6">
                <Music className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium">Track Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Your subliminal track has been successfully created.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trackTitle">Track Title</Label>
                  <Input
                    id="trackTitle"
                    value={trackTitle}
                    onChange={(e) => setTrackTitle(e.target.value)}
                    placeholder="Enter a title for your track"
                  />
                </div>

                <audio
                  controls
                  className="w-full mt-4"
                  src={downloadUrl}
                  preload="auto"
                  onError={(e) => {
                    console.error("Audio playback error:", e);
                    setError("Error playing audio. Please try again.");
                  }}
                ></audio>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={handleSaveTrack}
                disabled={isSaving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save to My Tracks"}
              </Button>

              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = downloadUrl;
                  a.download = `${trackTitle.replace(/\s+/g, "_")}.mp3`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                }}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download MP3
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
