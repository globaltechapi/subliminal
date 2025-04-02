"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Music, Settings, Download, LogOut } from "lucide-react";
import { signOutAction } from "@/app/actions";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  const items = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Create Subliminal",
      href: "/dashboard/create",
      icon: <Music className="mr-2 h-4 w-4" />,
    },
    {
      title: "My Tracks",
      href: "/dashboard/tracks",
      icon: <Music className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className={cn("pb-12 h-full bg-muted/40", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Subliminal Creator
          </h2>
          <div className="space-y-1">
            <nav className="space-y-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent",
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="px-4 absolute bottom-4 w-full">
        <form action={signOutAction}>
          <Button
            variant="outline"
            className="w-full justify-start"
            type="submit"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
