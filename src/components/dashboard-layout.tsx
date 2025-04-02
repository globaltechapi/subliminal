import { DashboardSidebar } from "./dashboard-sidebar";
import DashboardNavbar from "./dashboard-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavbar />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r md:block">
          <DashboardSidebar />
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
