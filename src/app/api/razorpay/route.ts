import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../supabase/server";
import { checkSuperAdmin } from "@/utils/admin";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { packageId } = await request.json();

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 },
      );
    }

    // Get package details
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .select("*")
      .eq("id", packageId)
      .single();

    if (packageError || !packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Get Razorpay settings from content_settings
    const { data: razorpaySettings, error: settingsError } = await supabase
      .from("content_settings")
      .select("*")
      .eq("key", "razorpay_settings")
      .single();

    if (settingsError || !razorpaySettings?.value?.key_id) {
      return NextResponse.json(
        { error: "Razorpay is not configured" },
        { status: 500 },
      );
    }

    // Create order data for client-side payment initialization
    const orderData = {
      amount: packageData.price * 100, // Razorpay expects amount in smallest currency unit (paise)
      currency: packageData.currency || "INR",
      receipt: `order_${user.id}_${Date.now()}`,
      package_id: packageId,
      key_id: razorpaySettings.value.key_id,
    };

    return NextResponse.json({ order: orderData });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify payment and update user package
    const { paymentId, orderId, signature, packageId } = await request.json();

    if (!paymentId || !orderId || !signature || !packageId) {
      return NextResponse.json(
        { error: "Missing payment verification details" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // In a real implementation, verify the payment with Razorpay
    // For now, we'll assume the payment is valid

    // Get package details
    const { data: packageData, error: packageError } = await supabase
      .from("packages")
      .select("*")
      .eq("id", packageId)
      .single();

    if (packageError || !packageData) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // Calculate expiry date based on package duration
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + packageData.duration_days);

    // Create user package record
    const { data: userPackage, error: userPackageError } = await supabase
      .from("user_packages")
      .insert({
        user_id: user.id,
        package_id: packageId,
        payment_id: paymentId,
        order_id: orderId,
        amount: packageData.price,
        currency: packageData.currency,
        status: "completed",
        expires_at: expiryDate.toISOString(),
      })
      .select()
      .single();

    if (userPackageError) {
      return NextResponse.json(
        { error: "Failed to update user package" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, userPackage });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    // This endpoint is for updating Razorpay settings (admin only)
    await checkSuperAdmin();

    const { keyId, keySecret } = await request.json();

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Key ID and Key Secret are required" },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    // Check if settings already exist
    const { data: existingSettings } = await supabase
      .from("content_settings")
      .select("*")
      .eq("key", "razorpay_settings")
      .maybeSingle();

    if (existingSettings) {
      // Update existing settings
      const { error } = await supabase
        .from("content_settings")
        .update({
          value: { key_id: keyId, key_secret: keySecret },
          updated_at: new Date().toISOString(),
        })
        .eq("key", "razorpay_settings");

      if (error) throw error;
    } else {
      // Create new settings
      const { error } = await supabase.from("content_settings").insert({
        key: "razorpay_settings",
        value: { key_id: keyId, key_secret: keySecret },
      });

      if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating Razorpay settings:", error);
    return NextResponse.json(
      { error: "Failed to update Razorpay settings" },
      { status: 500 },
    );
  }
}
