import DashboardLayout from "@/components/dashboard-layout";
import Affirmations from "@/components/affirmations/Affirmations";

export const metadata = {
  title: "Affirmations Library | Cognitive Rewire",
  description:
    "Browse and select from our library of powerful affirmations for your subliminal tracks.",
};

export default function AffirmationsPage() {
  return (
    <DashboardLayout>
      <Affirmations />
    </DashboardLayout>
  );
}
