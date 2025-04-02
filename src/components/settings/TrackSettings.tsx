"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface TrackSettingsProps {
  settings: {
    frequency: number;
    volume: number;
    repeatCycles: number;
  };
  onComplete: (settings: {
    frequency: number;
    volume: number;
    repeatCycles: number;
  }) => void;
}

export function TrackSettings({ settings, onComplete }: TrackSettingsProps) {
  const [frequency, setFrequency] = useState(settings.frequency);
  const [volume, setVolume] = useState(settings.volume * 100); // Convert to 0-100 for slider
  const [repeatCycles, setRepeatCycles] = useState(settings.repeatCycles);

  const handleFrequencyChange = (value: number[]) => {
    setFrequency(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const handleRepeatCyclesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setRepeatCycles(value);
    }
  };

  const handleContinue = () => {
    onComplete({
      frequency,
      volume: volume / 100, // Convert back to 0-1 range
      repeatCycles,
    });
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Track Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize how your affirmations are mixed with the music.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="frequency">Affirmation Frequency</Label>
                <span className="text-sm text-muted-foreground">
                  {frequency} seconds
                </span>
              </div>
              <Slider
                id="frequency"
                min={10}
                max={300}
                step={5}
                value={[frequency]}
                onValueChange={handleFrequencyChange}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                How often affirmations will play (every {frequency} seconds)
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <Label htmlFor="volume">Affirmation Volume</Label>
                <span className="text-sm text-muted-foreground">{volume}%</span>
              </div>
              <Slider
                id="volume"
                min={5}
                max={100}
                step={5}
                value={[volume]}
                onValueChange={handleVolumeChange}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Volume level of affirmations relative to music
              </p>
            </div>

            <div>
              <Label htmlFor="repeatCycles">Repeat Cycles</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input
                  id="repeatCycles"
                  type="number"
                  min={1}
                  max={20}
                  value={repeatCycles}
                  onChange={handleRepeatCyclesChange}
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">times</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                How many times each affirmation repeats when played
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleContinue}>Continue</Button>
      </div>
    </div>
  );
}
