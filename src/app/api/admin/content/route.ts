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

// GET content settings
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    
    let query = supabase.from("content_settings").select("*");
    
    // Filter by key if provided
    if (key) {
      query = query.eq("key", key);
    }

    const { data, error } = await query;

    if (error) throw error;

    // If key was provided, return the single item or null
    if (key) {
      return NextResponse.json(data[0] || null, { status: 200 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching content settings:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch content settings" },
      { status: 500 }
    );
  }
}

// POST create or update content setting
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check if user is a super admin
    if (!(await isSuperAdmin(supabase))) {
      return NextResponse.json(
        { error: "Unauthorized: Only super admins can manage content" },
        { status: 403 }
      );
    }

    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Key and value are required" },
        { status: 400 }
      );
    }

    // Check if content setting already exists
    const { data: existingData, error: existingError } = await supabase
      .from("content_settings")
      .select("id")
      .eq("key", key)
      .maybeSingle();

    if (existingError) throw existingError;

    let result;

    if (existingData) {
      // Update existing content
      const { data, error } = await supabase
        .from("content_settings")
        .update({ value, updated_at: new Date().toISOString() })
        .eq("key", key)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new content
      const { data, error } = await supabase
        .from("content_settings")
        .insert({ key, value })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error saving content setting:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save content setting" },
      { status: 500 }
    );
  }
}

// DELETE a content setting
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Check if user is a super admin