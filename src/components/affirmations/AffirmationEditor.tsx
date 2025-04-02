"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Card, CardContent } from "../ui/card";
import { Plus, X, Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";

export type VoiceType = "male" | "female";

interface AffirmationEditorProps {
  onComplete: (affirmations: string[], voiceType: VoiceType) => void;
  initialAffirmations?: string[];
  initialVoiceType?: VoiceType;
}

export function AffirmationEditor({
  onComplete,
  initialAffirmations = [],
  initialVoiceType = "male",
}: AffirmationEditorProps) {
  const [affirmations, setAffirmations] = useState<string[]>(
    initialAffirmations.length > 0
      ? initialAffirmations
      : ["I am confident and capable", "I attract positive energy"],
  );
  const [newAffirmation, setNewAffirmation] = useState("");
  const [previewingIndex, setPreviewingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceType, setVoiceType] = useState<VoiceType>(initialVoiceType);

  const handleAddAffirmation = () => {
    if (newAffirmation.trim()) {
      setAffirmations([...affirmations, newAffirmation.trim()]);
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
    newAffirmations[index] = value;
    setAffirmations(newAffirmations);
  };

  const previewAffirmation = (index: number) => {
    if (previewingIndex === index && isPlaying) {
      // Stop preview
      setIsPlaying(false);
      setPreviewingIndex(null);
      window.speechSynthesis.cancel();
    } else {
      // Start preview
      setPreviewingIndex(index);
      setIsPlaying(true);

      // Use speech synthesis to preview the affirmation
      const utterance = new SpeechSynthesisUtterance(affirmations[index]);
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
  };

  const handleContinue = () => {
    if (affirmations.length > 0) {
      onComplete(affirmations, voiceType);
    }
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
              <Card key={index} className="relative">
                <CardContent className="p-4 flex items-center justify-between">
                  <Textarea
                    value={affirmation}
                    onChange={(e) =>
                      handleUpdateAffirmation(index, e.target.value)
                    }
                    className="border-none focus-visible:ring-0 p-0 resize-none"
                  />
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
