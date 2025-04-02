"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { CreditCard, AlertCircle, CheckCircle2 } from "lucide-react";

export default function RazorpaySettings() {
  const [keyId, setKeyId] = useState("");
  const [keySecret, setKeySecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchRazorpaySettings();
  }, []);

  const fetchRazorpaySettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("content_settings")
        .select("*")
        .eq("key", "razorpay_settings")
        .maybeSingle();

      if (error) {
        console.error("Database error:", error);
        // Don't throw error here, just log it and continue
      }

      if (data?.value) {
        setKeyId(data.value.key_id || "");
        setKeySecret(data.value.key_secret || "");
      }
    } catch (err) {
      console.error("Error fetching Razorpay settings:", err);
      setError("Failed to load Razorpay settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      if (!keyId || !keySecret) {
        setError("Both Key ID and Key Secret are required");
        return;
      }

      const response = await fetch("/api/razorpay", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ keyId, keySecret }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setSuccess(true);
    } catch (err) {
      console.error("Error saving Razorpay settings:", err);
      setError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" /> Razorpay Payment Gateway
        </CardTitle>
        <CardDescription>
          Configure your Razorpay payment gateway integration settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-4">Loading settings...</div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="key_id">Key ID</Label>
              <Input
                id="key_id"
                value={keyId}
                onChange={(e) => setKeyId(e.target.value)}
                placeholder="rzp_live_xxxxxxxxxxxx or rzp_test_xxxxxxxxxxxx"
              />
              <p className="text-sm text-muted-foreground">
                Your Razorpay Key ID from the Razorpay Dashboard
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="key_secret">Key Secret</Label>
              <Input
                id="key_secret"
                type="password"
                value={keySecret}
                onChange={(e) => setKeySecret(e.target.value)}
                placeholder="••••••••••••••••••••••••"
              />
              <p className="text-sm text-muted-foreground">
                Your Razorpay Key Secret from the Razorpay Dashboard
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                  Razorpay settings saved successfully
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSaveSettings}
          disabled={saving || loading}
          className="w-full"
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
}
