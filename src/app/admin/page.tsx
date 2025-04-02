import { createClient } from "../../../supabase/server";
import { checkSuperAdmin } from "@/utils/admin";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Ensure user is a super admin, will redirect if not
  await checkSuperAdmin();

  const supabase = await createClient();

  // Fetch summary data
  const { count: userCount } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true });

  const { count: packageCount } = await supabase
    .from("packages")
    .select("*", { count: "exact", head: true });

  const { count: trackCount } = await supabase
    .from("tracks")
    .select("*", { count: "exact", head: true });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{userCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">
            Total Packages
          </h2>
          <p className="text-3xl font-bold mt-2">{packageCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Total Tracks</h2>
          <p className="text-3xl font-bold mt-2">{trackCount || 0}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="/admin/users"
            className="block p-4 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <h3 className="font-medium">User Management</h3>
            <p className="text-sm text-gray-600 mt-1">
              View and manage user accounts
            </p>
          </a>

          <a
            href="/admin/packages"
            className="block p-4 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
          >
            <h3 className="font-medium">Package Management</h3>
            <p className="text-sm text-gray-600 mt-1">
              Create and edit subscription packages
            </p>
          </a>

          <a
            href="/admin/content"
            className="block p-4 bg-purple-50 rounded-lg border border-purple-100 hover:bg-purple-100 transition-colors"
          >
            <h3 className="font-medium">Content Management</h3>
            <p className="text-sm text-gray-600 mt-1">
              Update website content and settings
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
