"use client";

import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Plus, X, Play, Pause, Upload, Mic, Volume2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export type VoiceType = "male" | "female";
export type AffirmationType = "text" | "audio";

export interface Affirmation {
  id: string;
  text: string;
  type: AffirmationType;
  audioFile?: File;
  audioUrl?: string;
}

interface AffirmationEditorProps {
  onComplete: (affirmations: Affirmation[], voiceType: VoiceType) => void;
  initialAffirmations?: Affirmation[];
  initialVoiceType?: VoiceType;
}

export function AffirmationEditor({
  onComplete,
  initialAffirmations = [],
  initialVoiceType = "male",
}: AffirmationEditorProps) {
  const [affirmations, setAffirmations] = useState<Affirmation[]>(
    initialAffirmations.length > 0
      ? initialAffirmations
      : [
          {
            id: crypto.randomUUID(),
            text: "I am confident and capable",
            type: "text",
          },
          {
            id: crypto.randomUUID(),
            text: "I attract positive energy",
            type: "text",
          },
        ],
  );
  const [newAffirmation, setNewAffirmation] = useState("");
  const [previewingIndex, setPreviewingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState<VoiceType>(initialVoiceType);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);

  const handleAddAffirmation = () => {
    if (newAffirmation.trim()) {
      setAffirmations([
        ...affirmations,
        {
          id: crypto.randomUUID(),
          text: newAffirmation.trim(),
          type: "text",
        },
      ]);
      setNewAffirmation("");
    }
  };

  const handleRemoveAffirmation = (index: number) => {
    const newAffirmations = [...affirmations];
    newAffirmations.splice(index, 1);
    setAffirmations(newAffirmations);
  };

  const handleUpdateAffirmation = (index: number, value: string) => {
    const newAffirmations = [...affirmations];
    newAffirmations[index] = {
      ...newAffirmations[index],
      text: value,
    };
    setAffirmations(newAffirmations);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an audio file
    if (!file.type.startsWith("audio/")) {
      setRecordingError("Please upload an audio file");
      return;
    }

    // Create a URL for the audio file
    const audioUrl = URL.createObjectURL(file);

    // Add the audio file as a new affirmation
    setAffirmations([
      ...affirmations,
      {
        id: crypto.randomUUID(),
        text: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension for display
        type: "audio",
        audioFile: file,
        audioUrl,
      },
    ]);

    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setRecordingError(null);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const previewAffirmation = (index: number) => {
    const affirmation = affirmations[index];

    if (previewingIndex === index && isPlaying) {
      // Stop preview
      setIsPlaying(false);
      setPreviewingIndex(null);
      window.speechSynthesis.cancel();

      // Stop audio playback if it's an audio file
      const audioElements = document.querySelectorAll("audio");
      audioElements.forEach((audio) => audio.pause());
    } else {
      // Start preview
      setPreviewingIndex(index);
      setIsPlaying(true);

      if (affirmation.type === "audio" && affirmation.audioUrl) {
        // Play the uploaded audio file
        const audio = new Audio(affirmation.audioUrl);
        audio.onended = () => {
          setIsPlaying(false);
          setPreviewingIndex(null);
        };
        audio.onerror = (event) => {
          console.error("Audio playback error:", event);
          setIsPlaying(false);
          setPreviewingIndex(null);
        };
        audio.play();
      } else {
        // Use speech synthesis to preview the text affirmation
        const utterance = new SpeechSynthesisUtterance(affirmation.text);
        utterance.rate = 0.9; // Slightly slower than normal
        utterance.volume = 1.0; // Full volume for preview
        utterance.pitch = 1.0; // Normal pitch

        // Set voice based on selected voice type
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice =
          voices.find((voice) => {
            const isEnglish = voice.lang.includes("en");
            const isFemale =
              voice.name.toLowerCase().includes("female") ||
              voice.name.toLowerCase().includes("woman") ||
              voice.name.includes("Samantha") ||
              voice.name.includes("Victoria");
            const isMale =
              voice.name.toLowerCase().includes("male") ||
              voice.name.toLowerCase().includes("man") ||
              voice.name.includes("Daniel") ||
              voice.name.includes("David");

            return isEnglish && (voiceType === "female" ? isFemale : isMale);
          }) ||
          voices.find((voice) => voice.lang.includes("en")) ||
          voices[0];

        if (preferredVoice) utterance.voice = preferredVoice;

        utterance.onend = () => {
          setIsPlaying(false);
          setPreviewingIndex(null);
        };
        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event);
          setIsPlaying(false);
          setPreviewingIndex(null);
        };
        window.speechSynthesis.cancel(); // Cancel any ongoing speech
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleContinue = () => {
    if (affirmations.length > 0) {
      onComplete(affirmations, voiceType);
    }
  };

  const getAffirmationIcon = (affirmation: Affirmation) => {
    return affirmation.type === "audio" ? (
      <Volume2 className="h-4 w-4 mr-2 text-blue-500" />
    ) : null;
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Affirmations</h3>
        <p className="text-sm text-muted-foreground">
          Add the affirmations you want to include in your subliminal track.
          These will be mixed with your selected music.
        </p>

        <div className="space-y-2">
          <Label htmlFor="voice-type">Voice Type</Label>
          <Select
            value={voiceType}
            onValueChange={(value) => setVoiceType(value as VoiceType)}
          >
            <SelectTrigger id="voice-type" className="w-full sm:w-[200px]">
              <SelectValue placeholder="Select voice type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male Voice</SelectItem>
              <SelectItem value="female">Female Voice</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Choose the voice type for your affirmations. You can preview how it
            sounds using the play button on each affirmation.
          </p>
        </div>

        {affirmations.length > 0 ? (
          <div className="space-y-3">
            {affirmations.map((affirmation, index) => (
              <Card key={affirmation.id} className="relative">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    {getAffirmationIcon(affirmation)}
                    {affirmation.type === "audio" ? (
                      <div className="flex-1 font-medium text-sm">
                        {affirmation.text}
                        <div className="text-xs text-muted-foreground">
                          Recorded audio
                        </div>
                      </div>
                    ) : (
                      <Textarea
                        value={affirmation.text}
                        onChange={(e) =>
                          handleUpdateAffirmation(index, e.target.value)
                        }
                        className="border-none focus-visible:ring-0 p-0 resize-none"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => previewAffirmation(index)}
                      className="h-8 w-8"
                    >
                      {previewingIndex === index && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveAffirmation(index)}
                      className="h-8 w-8 text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">
              No affirmations added yet. Add your first affirmation below.
            </p>
          </div>
        )}

        {recordingError && (
          <div className="text-sm text-destructive mb-2">{recordingError}</div>
        )}

        <div className="flex gap-2">
          <Input
            placeholder="Enter a new affirmation..."
            value={newAffirmation}
            onChange={(e) => setNewAffirmation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddAffirmation();
              }
            }}
          />
          <Button
            onClick={handleAddAffirmation}
            disabled={!newAffirmation.trim()}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
          <Button variant="outline" onClick={triggerFileUpload}>
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="audio/*"
            className="hidden"
          />
        </div>
      </div>

      <div className="flex justify-end mt-10 sticky bottom-0 bg-background pt-4 pb-2 z-10">
        <Button
          onClick={handleContinue}
          disabled={affirmations.length === 0}
          size="lg"
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
