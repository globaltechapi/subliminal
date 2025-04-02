import { checkSuperAdmin } from "@/utils/admin";
import { redirect } from "next/navigation";

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
        <div className="w-64 bg-white shadow-md">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Admin Panel</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin"
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  User Management
                </a>
              </li>
              <li>
                <a
                  href="/admin/packages"
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Package Management
                </a>
              </li>
              <li>
                <a
                  href="/admin/content"
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Content Management
                </a>
              </li>
              <li className="pt-4 mt-4 border-t">
                <a
                  href="/dashboard"
                  className="block p-2 rounded hover:bg-gray-100 transition-colors"
                >
                  Back to Dashboard
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">{children}</div>
      </div>
    </div>
  );
}
