import DashboardLayout from "@/components/dashboard-layout";
import {
  InfoIcon,
  Music,
  Plus,
  Settings,
  Headphones,
  Sparkles,
} from "lucide-react";
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Sparkles size={16} />
              <span>{user.email}</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 text-sm p-4 px-5 rounded-xl text-foreground flex gap-3 items-center border border-primary/10 shadow-sm">
            <InfoIcon size={18} className="text-primary" />
            <span className="font-medium">
              Create and manage your subliminal tracks from your personal
              dashboard
            </span>
          </div>
        </header>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-primary" />
            <span>Quick Actions</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="bg-primary/10 p-3 rounded-full w-fit">
                  <Music className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Create New Track</h3>
                <p className="text-sm text-muted-foreground">
                  Create a personalized subliminal track with your own
                  affirmations and music selection.
                </p>
              </div>
              <Button
                asChild
                className="mt-5 w-full bg-primary/90 hover:bg-primary shadow-sm"
              >
                <Link href="/dashboard/create">
                  <Plus className="mr-2 h-4 w-4" /> Create Track
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="bg-secondary/10 p-3 rounded-full w-fit">
                  <Headphones className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg">My Tracks</h3>
                <p className="text-sm text-muted-foreground">
                  View, manage and listen to your saved subliminal tracks
                  collection.
                </p>
              </div>
              <Button
                variant="outline"
                asChild
                className="mt-5 w-full border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5"
              >
                <Link href="/dashboard/tracks">
                  <Headphones className="mr-2 h-4 w-4" /> View Tracks
                </Link>
              </Button>
            </div>

            <div className="bg-gradient-to-br from-card to-card/80 rounded-xl p-6 border shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-3">
                <div className="bg-muted p-3 rounded-full w-fit">
                  <Settings className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Customize your account preferences and application settings.
                </p>
              </div>
              <Button variant="outline" asChild className="mt-5 w-full">
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" /> Manage Settings
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
