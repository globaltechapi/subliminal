import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const trackId = formData.get("trackId")?.toString();

    if (!trackId) {
      return NextResponse.json(
        { error: "Track ID is required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to delete tracks" },
        { status: 401 },
      );
    }

    // Delete the track from saved_tracks table
    const { error } = await supabase
      .from("saved_tracks")
      .delete()
      .eq("id", trackId)
      .eq("user_id", user.id); // Ensure user can only delete their own tracks

    if (error) {
      console.error("Error deleting track:", error);
      return NextResponse.json(
        { error: `Failed to delete track: ${error.message}` },
        { status: 500 },
      );
    }

    // Revalidate the tracks page to show updated list
    revalidatePath("/dashboard/tracks");

    // Return success response instead of redirecting
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in delete-track route:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
