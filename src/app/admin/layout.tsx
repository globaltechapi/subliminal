import { checkSuperAdmin } from "@/utils/admin";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  FileText,
  ArrowLeft,
  Settings,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the user is a super admin
  await checkSuperAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Admin Sidebar */}
        <div className="w-72 bg-white shadow-lg border-r border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <span className="bg-amethyst-600 text-white p-1.5 rounded mr-2">
                <Settings className="h-5 w-5" />
              </span>
              Admin Panel
            </h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-1">
              <li>
                <a
                  href="/admin"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amethyst-50 hover:text-amethyst-700 transition-all group"
                >
                  <LayoutDashboard className="h-5 w-5 text-gray-500 group-hover:text-amethyst-600" />
                  <span className="font-medium">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amethyst-50 hover:text-amethyst-700 transition-all group"
                >
                  <Users className="h-5 w-5 text-gray-500 group-hover:text-amethyst-600" />
                  <span className="font-medium">User Management</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/packages"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amethyst-50 hover:text-amethyst-700 transition-all group"
                >
                  <Package className="h-5 w-5 text-gray-500 group-hover:text-amethyst-600" />
                  <span className="font-medium">Package Management</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/content"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amethyst-50 hover:text-amethyst-700 transition-all group"
                >
                  <FileText className="h-5 w-5 text-gray-500 group-hover:text-amethyst-600" />
                  <span className="font-medium">Content Management</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/payment-settings"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-amethyst-50 hover:text-amethyst-700 transition-all group"
                >
                  <Settings className="h-5 w-5 text-gray-500 group-hover:text-amethyst-600" />
                  <span className="font-medium">Payment Settings</span>
                </a>
              </li>
              <li className="pt-4 mt-4 border-t border-gray-100">
                <a
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all group"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
                  <span className="font-medium">Back to Dashboard</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
