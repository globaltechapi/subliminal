"use client";

import { useState, useRef, useEffect } from "react";
import { Music, Download, Trash2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatDuration, getAudioDuration } from "@/lib/audioUtils";

interface TrackCardProps {
  track: {
    id: string;
    track_title: string;
    track_url: string;
    created_at: string;
    affirmations: string[] | null;
    duration?: number;
  };
}

export function TrackCard({ track }: TrackCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioData, setAudioData] = useState<string | null>(null);
  const [trackDuration, setTrackDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const router = useRouter();

  // Convert base64 to blob
  const base64ToBlob = (base64: string, mimeType: string) => {
    const byteString = atob(base64.split(",")[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeType });
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this track?")) return;

    setIsDeleting(true);

    try {
      const formData = new FormData();
      formData.append("trackId", track.id);

      const response = await fetch("/api/delete-track", {
        method: "POST",
        body: formData,
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Failed to delete track");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting track:", error);
      alert("Failed to delete track. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Load the audio data when component mounts
  useEffect(() => {
    // First use the duration from the database if available
    if (track.duration && track.duration > 0) {
      setTrackDuration(track.duration);
      console.log("Using duration from database:", track.duration);
    }

    // Check if the track URL is a data URL (base64)
    if (track.track_url.startsWith("data:")) {
      setAudioData(track.track_url);
      if (audioRef.current) {
        audioRef.current.src = track.track_url;
      }
    }
  }, [track.track_url, track.duration]);

  // Use database duration but log the metadata duration for debugging
  const handleAudioMetadataLoaded = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      console.log(
        "Audio metadata loaded, duration:",
        audioRef.current.duration,
        "(using DB value:",
        trackDuration,
        ")",
      );
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);

      // If we already have the audio data loaded in the audio element
      if (audioRef.current.src) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error playing audio:", err);
            setIsLoading(false);
          });
      }
      // If we need to set the source
      else if (track.track_url.startsWith("data:")) {
        audioRef.current.src = track.track_url;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error playing audio:", err);
            setIsLoading(false);
          });
      }
      // Try to load from URL
      else {
        audioRef.current.src = track.track_url;
        audioRef.current.load();
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Error playing audio:", err);
            setIsLoading(false);
            alert("Could not play audio. The file may no longer be available.");
          });
      }
    }
  };

  const handleDownload = () => {
    setIsLoading(true);

    try {
      // If we have a data URL
      if (track.track_url.startsWith("data:")) {
        // Convert data URL to blob
        const mimeType =
          track.track_url.split(";")[0].split(":")[1] || "audio/mp3";
        const blob = base64ToBlob(track.track_url, mimeType);

        // Create MP3 blob
        const mp3Blob = new Blob([blob], { type: "audio/mp3" });
        const url = URL.createObjectURL(mp3Blob);

        // Download the file
        const a = document.createElement("a");
        a.href = url;
        a.download = `${track.track_title.replace(/\s+/g, "_")}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up
        setTimeout(() => URL.revokeObjectURL(url), 100);
        setIsLoading(false);
      }
      // If it's a regular URL
      else {
        fetch(track.track_url)
          .then((response) => response.blob())
          .then((blob) => {
            // Ensure it's MP3 format
            const mp3Blob = new Blob([blob], { type: "audio/mp3" });
            const url = URL.createObjectURL(mp3Blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `${track.track_title.replace(/\s+/g, "_")}.mp3`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            // Clean up
            setTimeout(() => URL.revokeObjectURL(url), 100);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error("Download error:", err);
            alert(
              "Could not download audio. The file may no longer be available.",
            );
            setIsLoading(false);
          });
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Could not download audio. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Music className="h-10 w-10 text-primary p-2 bg-primary/10 rounded-full" />
          <div className="flex-1">
            <h3 className="font-medium">{track.track_title}</h3>
            <p className="text-xs text-muted-foreground">
              {new Date(track.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span className="text-sm">{formatDuration(trackDuration)}</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            {track.affirmations?.length || 0} affirmations
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 rounded-full"
              onClick={handlePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pause"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-play"
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </Button>
            <audio
              ref={audioRef}
              className="w-full h-10"
              preload="metadata"
              crossOrigin="anonymous"
              onLoadedMetadata={handleAudioMetadataLoaded}
              onEnded={() => setIsPlaying(false)}
              onError={(e) => {
                console.error("Audio playback error:", e);
                setIsPlaying(false);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
            />
          </div>
        </div>
      </div>

      <div className="border-t p-3 bg-muted/30 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDownload}
          disabled={isLoading}
          className="inline-flex items-center"
        >
          {isLoading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting || isLoading}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
