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

// GET all packages
export async function GET() {
  try {
    const supabase = await createClient();

    // No need to check for admin status for GET as packages are publicly readable
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .order("price", { ascending: true });

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching packages:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch packages" },
      { status: 500 },
    );
  }
}

// POST create a new package
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can create packages" },
        { status: 403 },
      );
    }

    const packageData = await request.json();

    // Validate required fields
    if (
      !packageData.name ||
      packageData.price === undefined ||
      !packageData.duration_days
    ) {
      return NextResponse.json(
        { error: "Name, price, and duration_days are required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("packages")
      .insert(packageData)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error("Error creating package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create package" },
      { status: 500 },
    );
  }
}

// PATCH update a package
export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can update packages" },
        { status: 403 },
      );
    }

    const { id, ...updateData } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("packages")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error updating package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update package" },
      { status: 500 },
    );
  }
}

// DELETE a package
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can delete packages" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    // Check if package is assigned to any users
    const { count, error: countError } = await supabase
      .from("user_packages")
      .select("*", { count: "exact", head: true })
      .eq("package_id", id);

    if (countError) throw countError;

    if (count && count > 0) {
      return NextResponse.json(
        { error: "Cannot delete package that is assigned to users" },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("packages").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "Package deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting package:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete package" },
      { status: 500 },
    );
  }
}
