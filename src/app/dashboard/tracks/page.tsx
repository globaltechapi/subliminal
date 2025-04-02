import DashboardLayout from "@/components/dashboard-layout";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Music, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TracksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real implementation, we would fetch the user's tracks from the database
  const tracks: any[] = [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Tracks</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your saved subliminal tracks.
          </p>
        </div>

        {tracks.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Track cards would go here */}
          </div>
        ) : (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <Music className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No tracks yet</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You haven't created any subliminal tracks yet.
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
