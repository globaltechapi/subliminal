import { createClient } from "../../supabase/server";
import { redirect } from "next/navigation";

export async function checkSuperAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Direct check for known admin email
  if (user.email === "rajan.knm18@gmail.com") {
    return user;
  }

  // First try to get user by ID
  const { data: userData, error } = await supabase
    .from("users")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  // If found and is admin, return
  if (userData?.is_super_admin) {
    return user;
  }

  // If not found or not admin, try by email as fallback
  if (user.email) {
    const { data: userByEmail } = await supabase
      .from("users")
      .select("is_super_admin")
      .eq("email", user.email)
      .single();

    if (userByEmail?.is_super_admin) {
      return user;
    }
  }

  // Not an admin, redirect
  redirect("/dashboard");
}

export async function getSuperAdminStatus() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data: userData, error } = await supabase
    .from("users")
    .select("is_super_admin")
    .eq("id", user.id)
    .single();

  return userData?.is_super_admin || false;
}
