import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingTable from "@/components/PricingTable";
import {
  ArrowUpRight,
  Music,
  Headphones,
  FileText,
  Sliders,
  Download,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amethyst-100 to-amethyst-200">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-amethyst-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              How Cognitive Rewire Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create your personalized subliminal audio tracks in just a few
              simple steps to transform your mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Music className="w-6 h-6" />,
                title: "Select Your Music",
                description:
                  "Upload your own tracks or choose from our instrumental library",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Write Affirmations",
                description:
                  "Create custom affirmations that resonate with your goals",
              },
              {
                icon: <Sliders className="w-6 h-6" />,
                title: "Adjust Settings",
                description:
                  "Control frequency, volume, and repetition of affirmations",
              },
              {
                icon: <Download className="w-6 h-6" />,
                title: "Download & Listen",
                description:
                  "Get your custom MP3 track ready for immediate use",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white/90 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-amethyst-700 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-amethyst-100">Affirmations Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-amethyst-100">Background Tracks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-amethyst-100">Private & Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingTable />

      {/* CTA Section */}
      <section className="py-20 bg-amethyst-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Cognitive Rewiring Today
          </h2>
          <p className="text-amethyst-800 mb-8 max-w-2xl mx-auto">
            Transform your mindset and achieve your goals with personalized
            subliminal audio.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-amethyst-600 rounded-lg hover:bg-amethyst-700 transition-colors"
          >
            Start Creating Now
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
