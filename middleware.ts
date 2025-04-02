import React from "react";
import { updateSession } from "./supabase/middleware";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Check for admin routes
  if (pathname.startsWith("/admin")) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.log("Missing Supabase URL or key");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Get the session from the response cookies
    const cookies = response.cookies.getAll();
    const supabaseClient = await import("@supabase/supabase-js").then(
      ({ createClient }) =>
        createClient(supabaseUrl, supabaseKey, {
          auth: {
            flowType: "pkce",
            autoRefreshToken: true,
            detectSessionInUrl: false,
            persistSession: true,
          },
          cookies: {
            get(name) {
              return cookies.find((cookie) => cookie.name === name)?.value;
            },
          },
        }),
    );

    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession();

    if (sessionError) {
      console.log("Session error:", sessionError);
    }

    if (!session) {
      console.log("No session found, redirecting to sign-in");
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    console.log("Session found for user:", session.user.email);

    // Check if user is a super admin
    const { data: userData, error: userError } = await supabaseClient
      .from("users")
      .select("is_super_admin")
      .eq("id", session.user.id)
      .single();

    if (userError) {
      console.log("Error fetching user data:", userError);
    }

    console.log("User data:", userData);

    if (!userData?.is_super_admin) {
      console.log("User is not a super admin, redirecting to dashboard");
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    console.log("User is a super admin, allowing access to admin route");
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
