"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createClient } from "../../../supabase/client";
import { Tables } from "@/types/supabase";
import { Check, Info } from "lucide-react";

type Package = Tables<"packages">;

export default function UpgradePackage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const supabase = createClient();

        // Fetch all available packages
        const { data: packagesData, error: packagesError } = await supabase
          .from("packages")
          .select("*")
          .eq("is_active", true)
          .order("price", { ascending: true });

        if (packagesError) throw packagesError;

        // Fetch current user's package
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data: userPackageData, error: userPackageError } =
            await supabase
              .from("user_packages")
              .select("*, package:packages(*)")
              .eq("user_id", user.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .single();

          if (!userPackageError && userPackageData) {
            setCurrentPackage(userPackageData.package as unknown as Package);
          }
        }

        setPackages(packagesData || []);
      } catch (err) {
        console.error("Error fetching packages:", err);
        setError("Failed to load packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleUpgrade = async (packageId: string) => {
    try {
      // This will be implemented in the next phase with Razorpay integration
      console.log("Upgrading to package:", packageId);
      alert("Razorpay integration will be implemented in the next phase.");
    } catch (err) {
      console.error("Error upgrading package:", err);
      setError("Failed to upgrade package. Please try again later.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading packages...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Upgrade Your Package</h2>
        <p className="text-muted-foreground">
          Choose a package that suits your needs and unlock premium features.
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {currentPackage && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <Info className="h-4 w-4" />
          <AlertDescription>
            Your current package: <strong>{currentPackage.name}</strong>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{pkg.name}</CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-3xl font-bold mb-4">
                {pkg.currency}
                {pkg.price}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  / {pkg.duration_days} days
                </span>
              </div>
              <ul className="space-y-2">
                {pkg.features &&
                  Array.isArray(pkg.features) &&
                  pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleUpgrade(pkg.id)}
                className="w-full"
                disabled={currentPackage?.id === pkg.id}
              >
                {currentPackage?.id === pkg.id
                  ? "Current Package"
                  : "Upgrade Now"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {packages.length === 0 && (
        <div className="text-center py-8">
          <p>No packages available at the moment. Please check back later.</p>
        </div>
      )}
    </div>
  );
}
