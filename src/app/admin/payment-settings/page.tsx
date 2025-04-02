import { checkSuperAdmin } from "@/utils/admin";
import RazorpaySettings from "@/components/admin/RazorpaySettings";

export default async function PaymentSettingsPage() {
  // Ensure user is a super admin, will redirect if not
  await checkSuperAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Payment Gateway Settings</h1>
        <p className="text-muted-foreground">
          Configure payment gateway integration for subscription packages
        </p>
      </div>

      <div className="grid gap-6">
        <RazorpaySettings />
      </div>
    </div>
  );
}
