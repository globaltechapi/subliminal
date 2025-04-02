import { createClient } from "../../../supabase/server";
import { checkSuperAdmin } from "@/utils/admin";
import { redirect } from "next/navigation";
import { Users, Package, Music, FileText, CreditCard } from "lucide-react";

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
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-3 text-blue-600">
            {userCount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">Registered accounts</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Packages
            </h2>
            <div className="p-2 bg-green-50 rounded-lg">
              <Package className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-3 text-green-600">
            {packageCount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Active subscription plans
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Tracks
            </h2>
            <div className="p-2 bg-purple-50 rounded-lg">
              <Music className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold mt-3 text-purple-600">
            {trackCount || 0}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Created subliminal tracks
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Admin Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <a
            href="/admin/users"
            className="flex flex-col p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm w-fit mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">
              User Management
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              View and manage user accounts
            </p>
          </a>

          <a
            href="/admin/packages"
            className="flex flex-col p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm w-fit mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Package className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-green-700">
              Package Management
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Create and edit subscription packages
            </p>
          </a>

          <a
            href="/admin/content"
            className="flex flex-col p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm w-fit mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">
              Content Management
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Update website content and settings
            </p>
          </a>

          <a
            href="/admin/payment-settings"
            className="flex flex-col p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl border border-amber-200 hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-white rounded-lg shadow-sm w-fit mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-800 group-hover:text-amber-700">
              Payment Settings
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Configure Razorpay payment gateway
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
