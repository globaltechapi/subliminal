import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to save tracks" },
        { status: 401 },
      );
    }

    const trackTitle = formData.get("trackTitle")?.toString();
    const trackUrl = formData.get("trackUrl")?.toString();
    const affirmationsJson = formData.get("affirmations")?.toString();
    const settingsJson = formData.get("settings")?.toString();
    const durationStr = formData.get("duration")?.toString();

    if (!trackTitle || !trackUrl) {
      return NextResponse.json(
        { error: "Track title and URL are required" },
        { status: 400 },
      );
    }

    let affirmations = null;
    let settings = null;
    let duration = 0;

    try {
      if (affirmationsJson) {
        affirmations = JSON.parse(affirmationsJson);
      }
      if (settingsJson) {
        settings = JSON.parse(settingsJson);
      }
      if (durationStr) {
        const parsedDuration = parseFloat(durationStr);
        if (!isNaN(parsedDuration) && parsedDuration > 0) {
          duration = parsedDuration;
          console.log(
            "Saving track with actual duration:",
            duration,
            "seconds",
          );
        }
      }
    } catch (error) {
      console.error("Error parsing JSON or duration:", error);
    }

    // Save to the new saved_tracks table instead of tracks
    const { error } = await supabase.from("saved_tracks").insert({
      user_id: user.id,
      track_title: trackTitle,
      track_url: trackUrl,
      affirmations: affirmations,
      settings: settings,
      duration: duration,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Error saving track:", error);
      return NextResponse.json(
        { error: `Failed to save track: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in save-track route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
