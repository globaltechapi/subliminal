import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if the current user is a super admin
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify the current user is a super admin
    const { data: currentUserData, error: currentUserError } = await supabase
      .from("users")
      .select("is_super_admin")
      .eq("id", user.id)
      .single();

    if (currentUserError || !currentUserData?.is_super_admin) {
      return NextResponse.json(
        { error: "Forbidden: Only super admins can perform this action" },
        { status: 403 },
      );
    }

    // Get the user ID to make admin from the request body
    const { userId, isAdmin } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    // Update the user's admin status
    const { error: updateError } = await supabase
      .from("users")
      .update({ is_super_admin: isAdmin })
      .eq("id", userId);

    if (updateError) {
      return NextResponse.json(
        { error: "Failed to update user admin status" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { success: true, message: `User admin status updated to ${isAdmin}` },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in make-admin API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
