"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  createSubliminalTrack,
  createDownloadableFile,
} from "@/lib/audioMixer";
import { getAudioDuration, formatDuration } from "@/lib/audioUtils";
import { Download, Save, Music, Clock } from "lucide-react";

import { VoiceType, Affirmation } from "../affirmations/AffirmationEditor";

interface TrackDownloaderProps {
  music: File | null;
  musicUrl: string;
  affirmations: Affirmation[];
  voiceType: VoiceType;
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
  voiceType,
  settings,
  userId,
  onTrackGenerated,
}: TrackDownloaderProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [trackTitle, setTrackTitle] = useState("My Subliminal Track");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackDuration, setTrackDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Start generating the track when component mounts
    generateTrack();

    // Clean up function to revoke object URLs when component unmounts
    return () => {
      if (downloadUrl && downloadUrl.startsWith("blob:")) {
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

      if (affirmations.length === 0) {
        throw new Error("No affirmations added");
      }

      console.log(
        "Using music source:",
        typeof musicSource === "string" ? musicSource : musicSource.name,
      );
      console.log(
        "Affirmations to mix:",
        affirmations.map((a) => ({ text: a.text, type: a.type })),
      );
      console.log("Settings:", settings);

      // Generate the subliminal track with affirmations mixed in
      const audioBlob = await createSubliminalTrack(
        musicSource,
        affirmations,
        settings,
        voiceType,
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
        artist: "Cognitive Rewire",
        album: "Custom Subliminals",
      });

      // Verify the URL was created
      if (!url) {
        throw new Error("Failed to create downloadable URL");
      }

      // Get the duration of the audio
      const duration = await getAudioDuration(audioBlob);
      setTrackDuration(duration);
      console.log("Track duration:", duration, "seconds");

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
      // Get the actual duration from the audio element
      let actualDuration = 0;
      if (
        audioRef.current &&
        !isNaN(audioRef.current.duration) &&
        audioRef.current.duration > 0
      ) {
        actualDuration = audioRef.current.duration;
        console.log(
          "Using actual audio duration for saving:",
          actualDuration,
          "seconds",
        );
      } else {
        console.log(
          "Audio element duration not available, will determine from blob",
        );
      }

      // Create a form to submit the track data
      const form = new FormData();
      form.append("trackTitle", trackTitle);

      // Always fetch the blob and store as data URL to ensure we have the complete file
      const audioResponse = await fetch(downloadUrl);
      const blob = await audioResponse.blob();

      // Make sure we're saving as MP3
      const mp3Blob = new Blob([blob], { type: "audio/mp3" });

      // Get the actual duration from the blob
      try {
        const blobDuration = await getAudioDuration(mp3Blob);
        console.log("Determined duration from blob:", blobDuration, "seconds");
        // Use the blob duration as it's more reliable
        actualDuration = blobDuration;
        console.log("Using actual blob duration for saving");
      } catch (err) {
        console.error("Error getting duration from blob:", err);
        // If we can't get the duration from the blob, use what we have
        if (actualDuration <= 0) {
          actualDuration = trackDuration > 0 ? trackDuration : 10;
          console.log("Using fallback duration:", actualDuration, "seconds");
        }
      }

      console.log(
        "Saving track with actual duration:",
        actualDuration,
        "seconds",
      );

      // Convert blob to data URL
      const reader = new FileReader();
      reader.readAsDataURL(mp3Blob);

      await new Promise((resolve, reject) => {
        reader.onloadend = () => {
          // Store the data URL with the complete audio data
          form.append("trackUrl", reader.result as string);
          // Add the duration to the form data
          form.append("duration", actualDuration.toString());
          resolve(null);
        };
        reader.onerror = reject;
      });

      // Add affirmations, voice type, and settings as JSON strings
      // For affirmations, we need to handle the audio files separately
      const affirmationsData = affirmations.map((aff) => ({
        id: aff.id,
        text: aff.text,
        type: aff.type,
        // We don't include the audioFile or audioUrl here as they can't be serialized
      }));
      form.append("affirmations", JSON.stringify(affirmationsData));
      form.append("voiceType", voiceType);
      form.append("settings", JSON.stringify(settings));

      // Add each audio file separately
      affirmations.forEach((aff, index) => {
        if (aff.type === "audio" && aff.audioFile) {
          form.append(`affirmationAudio_${aff.id}`, aff.audioFile);
        }
      });

      // Submit the form to the server action
      const saveResponse = await fetch("/api/save-track", {
        method: "POST",
        body: form,
      });

      if (!saveResponse.ok) {
        throw new Error("Failed to save track");
      }

      // Redirect to the tracks page or show success message
      window.location.href =
        "/dashboard/tracks?message=Track+saved+successfully";
    } catch (err) {
      console.error("Error saving track:", err);
      setError("Failed to save track. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Update duration when audio metadata is loaded
  const handleAudioMetadataLoaded = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setTrackDuration(audioRef.current.duration);
      console.log(
        "Audio metadata loaded, duration:",
        audioRef.current.duration,
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Subliminal Track</h3>
        <p className="text-sm text-muted-foreground">
          Your track contains {affirmations.length} affirmations (
          {affirmations.filter((a) => a.type === "text").length} text,{" "}
          {affirmations.filter((a) => a.type === "audio").length} recorded) with{" "}
          {affirmations.filter((a) => a.type === "text").length > 0
            ? `a ${voiceType} voice`
            : ""}
          mixed with your music at {settings.volume * 100}% volume, repeating{" "}
          {settings.repeatCycles} times every {settings.frequency} seconds.
        </p>
        <p className="text-xs text-muted-foreground">
          Your affirmations are spoken with a real human voice and mixed with
          your music track at the volume level you specified. The affirmations
          are distributed throughout the track based on your frequency settings.
        </p>

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
                <div className="flex-1">
                  <h4 className="font-medium">Track Ready</h4>
                  <p className="text-sm text-muted-foreground">
                    Your subliminal track has been successfully created.
                  </p>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm">
                    {formatDuration(trackDuration)}
                  </span>
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
                  ref={audioRef}
                  controls
                  className="w-full mt-4"
                  src={downloadUrl}
                  preload="metadata"
                  crossOrigin="anonymous"
                  onLoadedMetadata={handleAudioMetadataLoaded}
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
