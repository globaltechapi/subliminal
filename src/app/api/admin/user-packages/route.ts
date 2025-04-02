import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

// Helper function to check if user is a super admin
async function isSuperAdmin(supabase: any) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data, error } = await supabase
    .from("users")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  return data?.is_super_admin || false;
}

// GET user packages (either for a specific user or all if admin)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if super admin
    const isAdmin = await isSuperAdmin(supabase);

    // If not admin, can only view own packages
    if (!isAdmin && userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden: You can only view your own packages" },
        { status: 403 },
      );
    }

    let query = supabase.from("user_packages").select(`
        *,
        package:package_id(id, name, price, currency, duration_days, features)
      `);

    // Filter by user ID if provided
    if (userId) {
      query = query.eq("user_id", userId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching user packages:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch user packages" },
      { status: 500 },
    );
  }
}

// POST assign a package to a user
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can assign packages" },
        { status: 403 },
      );
    }

    const { userId, packageId, startDate, endDate } = await request.json();

    if (!userId || !packageId) {
      return NextResponse.json(
        { error: "User ID and Package ID are required" },
        { status: 400 },
      );
    }

    // Validate user exists
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", userId)
      .single();

    if (userError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Validate package exists
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .select("id, duration_days")
      .eq("id", packageId)
      .single();

    if (packageError || !packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Calculate end date if not provided
    let calculatedEndDate = endDate;
    if (!calculatedEndDate) {
      const start = startDate ? new Date(startDate) : new Date();
      calculatedEndDate = new Date(start);
      calculatedEndDate.setDate(
        calculatedEndDate.getDate() + packageData.duration_days,
      );
      calculatedEndDate = calculatedEndDate.toISOString();
    }

    const { data, error } = await supabase
      .from("user_packages")
      .insert({
        user_id: userId,
        package_id: packageId,
        start_date: startDate || new Date().toISOString(),
        end_date: calculatedEndDate,
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Error assigning package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to assign package" },
      { status: 500 },
    );
  }
}

// PATCH update a user package (e.g., deactivate)
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can update user packages" },
        { status: 403 },
      );
    }

    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "User Package ID is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("user_packages")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error updating user package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update user package" },
      { status: 500 },
    );
  }
}

// DELETE a user package
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can delete user packages" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "User Package ID is required" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("user_packages")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "User package deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting user package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete user package" },
      { status: 500 },
    );
  }
}
