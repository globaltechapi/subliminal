import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Create your personalized subliminal audio tracks in just a few
              simple steps.
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
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
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
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Affirmations Created</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Background Tracks</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Private & Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Create Your Subliminal Track Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your mindset and achieve your goals with personalized
            subliminal audio.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
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
