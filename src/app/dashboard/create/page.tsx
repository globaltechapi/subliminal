import DashboardLayout from "@/components/dashboard-layout";
import { SubliminalTrackCreator } from "@/components/SubliminalTrackCreator";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";

export default async function CreateSubliminalPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Create Subliminal Track
          </h1>
          <p className="text-muted-foreground mt-2">
            Create your personalized subliminal audio track by combining music
            with custom affirmations.
          </p>
        </div>
        <SubliminalTrackCreator userId={user.id} />
      </div>
    </DashboardLayout>
  );
}
