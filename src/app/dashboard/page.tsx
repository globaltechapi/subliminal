import DashboardLayout from "@/components/dashboard-layout";
import { InfoIcon, UserCircle, Music, Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
            <InfoIcon size="14" />
            <span>Welcome to your Subliminal Creator dashboard</span>
          </div>
        </header>

        {/* Quick Actions */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card rounded-xl p-6 border shadow-sm flex flex-col justify-between">
            <div className="space-y-2">
              <Music className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">Create New Track</h3>
              <p className="text-sm text-muted-foreground">
                Create a personalized subliminal track with your own
                affirmations.
              </p>
            </div>
            <Button asChild className="mt-4">
              <Link href="/dashboard/create">
                <Plus className="mr-2 h-4 w-4" /> Create Track
              </Link>
            </Button>
          </div>

          <div className="bg-card rounded-xl p-6 border shadow-sm">
            <div className="space-y-2">
              <Music className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold text-lg">My Tracks</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your saved subliminal tracks.
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4">
              <Link href="/dashboard/tracks">View Tracks</Link>
            </Button>
          </div>
        </section>

        {/* User Profile Section */}
        <section className="bg-card rounded-xl p-6 border shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <UserCircle size={48} className="text-primary" />
            <div>
              <h2 className="font-semibold text-xl">User Profile</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
            <pre className="text-xs font-mono max-h-48 overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
