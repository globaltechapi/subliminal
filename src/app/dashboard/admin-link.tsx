"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../../supabase/client";
import Link from "next/link";

export default function AdminLink() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("users")
            .select("is_super_admin")
            .eq("id", user.id)
            .single();

          if (error) {
            console.error("Error fetching admin status:", error);
            setLoading(false);
            return;
          }

          console.log("Admin status data:", data);
          setIsAdmin(!!data?.is_super_admin);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading) return null;

  // Debug: Always show the link during development to verify it works
  // Remove this comment and the next line in production
  // return (
  //   <Link
  //     href="/admin"
  //     className="flex items-center p-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
  //   >
  //     <span className="mr-2">⚙️</span>
  //     Admin Panel (Debug Mode)
  //   </Link>
  // );

  if (!isAdmin) return null;

  return (
    <Link
      href="/admin"
      className="flex items-center p-2 text-sm font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
    >
      <span className="mr-2">⚙️</span>
      Admin Panel
    </Link>
  );
}
