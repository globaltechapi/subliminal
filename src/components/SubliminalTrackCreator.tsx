"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { MusicSelector } from "./music/MusicSelector";
import { AffirmationEditor } from "./affirmations/AffirmationEditor";
import { TrackSettings } from "./settings/TrackSettings";
import { TrackDownloader } from "./download/TrackDownloader";

interface SubliminalTrackCreatorProps {
  userId: string;
}

export function SubliminalTrackCreator({
  userId,
}: SubliminalTrackCreatorProps) {
  const [activeTab, setActiveTab] = useState("music");
  const [selectedMusic, setSelectedMusic] = useState<File | null>(null);
  const [selectedMusicUrl, setSelectedMusicUrl] = useState<string>("");
  const [affirmations, setAffirmations] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    frequency: 60, // seconds
    volume: 0.2, // 0-1
    repeatCycles: 3,
  });
  const [finalTrackUrl, setFinalTrackUrl] = useState<string>("");

  const handleMusicSelected = (file: File | null, url: string) => {
    setSelectedMusic(file);
    setSelectedMusicUrl(url);
    if (file || url) {
      setActiveTab("affirmations");
    }
  };

  const handleAffirmationsComplete = (affirmationsList: string[]) => {
    setAffirmations(affirmationsList);
    setActiveTab("settings");
  };

  const handleSettingsComplete = (newSettings: typeof settings) => {
    setSettings(newSettings);
    setActiveTab("download");
  };

  const isTabDisabled = (tabName: string) => {
    switch (tabName) {
      case "music":
        return false;
      case "affirmations":
        return !selectedMusic && !selectedMusicUrl;
      case "settings":
        return affirmations.length === 0;
      case "download":
        return !settings;
      default:
        return false;
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="music" disabled={isTabDisabled("music")}>
            Music
          </TabsTrigger>
          <TabsTrigger
            value="affirmations"
            disabled={isTabDisabled("affirmations")}
          >
            Affirmations
          </TabsTrigger>
          <TabsTrigger value="settings" disabled={isTabDisabled("settings")}>
            Settings
          </TabsTrigger>
          <TabsTrigger value="download" disabled={isTabDisabled("download")}>
            Download
          </TabsTrigger>
        </TabsList>

        <TabsContent value="music" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <MusicSelector onMusicSelected={handleMusicSelected} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affirmations" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <AffirmationEditor
                onComplete={handleAffirmationsComplete}
                initialAffirmations={affirmations}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <TrackSettings
                settings={settings}
                onComplete={handleSettingsComplete}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="download" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <TrackDownloader
                music={selectedMusic}
                musicUrl={selectedMusicUrl}
                affirmations={affirmations}
                settings={settings}
                userId={userId}
                onTrackGenerated={setFinalTrackUrl}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
