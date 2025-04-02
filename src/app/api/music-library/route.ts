import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Fetch all tracks from the music_library table
    const { data: tracks, error } = await supabase
      .from("music_library")
      .select("*")
      .order("name");

    if (error) {
      console.error("Error fetching music library:", error);
      return NextResponse.json(
        { error: `Failed to fetch music library: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ tracks });
  } catch (error) {
    console.error("Error in music-library route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
