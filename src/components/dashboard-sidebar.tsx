"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Music,
  Settings,
  Download,
  LogOut,
  MessageSquareText,
} from "lucide-react";
import { signOutAction } from "@/app/actions";
import { useEffect, useState } from "react";
import { createClient } from "../../supabase/client";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function DashboardSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;

        // Check if user email matches admin email
        if (user.email === "rajan.knm18@gmail.com") {
          setIsAdmin(true);
          return;
        }

        // Fallback to database check
        const { data } = await supabase
          .from("users")
          .select("is_super_admin")
          .eq("id", user.id)
          .single();

        setIsAdmin(!!data?.is_super_admin);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdmin();
  }, []);

  const dashboardItems = [
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
      title: "Affirmations",
      href: "/dashboard/affirmations",
      icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ];

  const mainMenuItems = [
    {
      title: "Subliminal Guide",
      href: "/subliminal-guide",
      icon: <Download className="mr-2 h-4 w-4" />,
    },
    {
      title: "Affirmation Tips",
      href: "/affirmation-tips",
      icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    },
    {
      title: "FAQ",
      href: "/faq",
      icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      icon: <MessageSquareText className="mr-2 h-4 w-4" />,
    },
  ];

  return (
    <div className={cn("pb-12 h-full bg-muted/40", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">
            Cognitive Rewire
          </h2>
          <div className="space-y-1">
            <h3 className="px-3 text-sm font-semibold text-muted-foreground">
              Dashboard
            </h3>
            <nav className="space-y-2">
              {dashboardItems.map((item) => (
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
              {/* Admin Link */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200"
                >
                  <span className="mr-2">⚙️</span>
                  Admin Panel
                </Link>
              )}
            </nav>

            <h3 className="mt-6 px-3 text-sm font-semibold text-muted-foreground">
              Resources
            </h3>
            <nav className="space-y-2">
              {mainMenuItems.map((item) => (
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
      <div className="px-4 fixed bottom-4 w-64 pr-8">
        <form action={signOutAction}>
          <Button
            variant="outline"
            className="w-full justify-start rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
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
