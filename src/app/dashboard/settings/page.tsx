import DashboardLayout from "@/components/dashboard-layout";
import { redirect } from "next/navigation";
import { createClient } from "../../../../supabase/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default async function SettingsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Profile</h2>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={user.user_metadata?.full_name || ""}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={user.email}
                  className="col-span-3"
                  disabled
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Preferences</h2>
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications about your account and tracks.
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoplay">Autoplay Tracks</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically play tracks when previewing.
                  </p>
                </div>
                <Switch id="autoplay" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
