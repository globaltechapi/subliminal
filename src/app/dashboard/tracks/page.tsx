import DashboardLayout from "@/components/dashboard-layout";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Music, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrackCard } from "@/components/tracks/TrackCard";

export default async function TracksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch the user's tracks from the saved_tracks table
  const { data: savedTracks, error } = await supabase
    .from("saved_tracks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching saved tracks:", error);
  }

  const userTracks = savedTracks || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Saved Tracks</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your saved subliminal tracks.
          </p>
        </div>

        {userTracks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userTracks.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No saved tracks yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You haven't saved any subliminal tracks yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/create">Create Your First Track</Link>
            </Button>
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-lg flex items-start gap-3 mt-8">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1">About Subliminal Tracks</h4>
            <p className="text-sm text-muted-foreground">
              Subliminal tracks combine your chosen music with positive
              affirmations at a volume level that's just below conscious
              awareness. Regular listening can help reinforce positive thinking
              patterns and support your personal growth goals.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
