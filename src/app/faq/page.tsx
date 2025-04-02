import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Cognitive Rewire",
  description:
    "Find answers to common questions about subliminal audio, affirmations, and our platform.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">
              About Subliminal Audio
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  What is subliminal audio?
                </h3>
                <p>
                  Subliminal audio contains positive affirmations or messages
                  that are played at a volume level just below the threshold of
                  conscious hearing. While your conscious mind may not perceive
                  these messages, your subconscious mind can still process and
                  absorb them, potentially influencing your thoughts, behaviors,
                  and beliefs over time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Are subliminal audios scientifically proven to work?
                </h3>
                <p>
                  Research on subliminal messaging shows mixed results. Some
                  studies suggest that subliminal messages can influence
                  behavior and attitudes, while others show limited effects. The
                  effectiveness may vary from person to person and depends on
                  factors such as the quality of the subliminal content,
                  consistency of use, and individual receptivity. Many users
                  report positive results, but individual experiences may vary.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How long does it take to see results from subliminal audio?
                </h3>
                <p>
                  The timeframe for experiencing results varies widely among
                  individuals. Some people report noticing changes in their
                  thoughts or feelings within a few days, while for others, it
                  may take weeks or months of consistent listening. For best
                  results, we recommend listening to your subliminal audio daily
                  for at least 30-90 days.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Is subliminal audio safe?
                </h3>
                <p>
                  Yes, subliminal audio is generally considered safe for most
                  people. The messages contained in our subliminal tracks are
                  positive affirmations designed to support personal growth and
                  well-being. However, if you have a diagnosed mental health
                  condition, we recommend consulting with a healthcare
                  professional before using subliminal audio as a complementary
                  approach.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Using Our Platform</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  How do I create my own subliminal track?
                </h3>
                <p>
                  Creating your own subliminal track is simple with our
                  platform. Navigate to the "Create Subliminal" page in your
                  dashboard, select background music (or upload your own), add
                  your desired affirmations, adjust the settings for volume and
                  frequency, and then generate your track. Once processed, you
                  can download it for personal use.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Can I use my own music for subliminal tracks?
                </h3>
                <p>
                  Yes, you can upload your own music files to use as background
                  for your subliminal tracks. We support common audio formats
                  like MP3, WAV, and AAC. Please ensure you have the rights to
                  use any music you upload.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How many affirmations should I include in my track?
                </h3>
                <p>
                  We recommend using 5-15 affirmations for optimal
                  effectiveness. Too few may limit the scope of your subliminal
                  messaging, while too many might dilute the impact. Focus on
                  affirmations that are aligned with a specific goal or theme
                  for best results.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Can I share my created tracks with others?
                </h3>
                <p>
                  Yes, you can share your created tracks with friends and
                  family. However, please note that our terms of service
                  prohibit commercial distribution or sale of tracks created on
                  our platform without appropriate licensing.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Account & Billing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  What are the different subscription plans?
                </h3>
                <p>
                  We offer several subscription tiers to meet different needs.
                  Our free plan allows basic track creation with limited
                  options, while premium plans offer additional features such as
                  higher quality audio, more storage, advanced customization
                  options, and priority processing. Visit our pricing page for
                  detailed information on current plans and pricing.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How do I cancel my subscription?
                </h3>
                <p>
                  You can cancel your subscription at any time by going to the
                  Settings page in your dashboard and selecting the
                  "Subscription" tab. Follow the prompts to cancel your
                  subscription. You'll continue to have access to premium
                  features until the end of your current billing period.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Is my payment information secure?
                </h3>
                <p>
                  Yes, we use industry-standard encryption and secure payment
                  processors to handle all transactions. We do not store your
                  full credit card details on our servers. All payment
                  processing is handled by trusted third-party payment
                  processors that comply with PCI DSS standards.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Can I get a refund if I'm not satisfied?
                </h3>
                <p>
                  We offer a 14-day money-back guarantee for new subscribers. If
                  you're not satisfied with our service within the first 14 days
                  of your subscription, contact our support team to request a
                  refund. Please note that refunds for subscriptions active
                  longer than 14 days are considered on a case-by-case basis.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Technical Support</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">
                  What devices can I use to listen to my tracks?
                </h3>
                <p>
                  You can listen to your tracks on any device that supports
                  audio playback, including smartphones, tablets, computers, and
                  MP3 players. We recommend using headphones for optimal
                  results, as they provide a more immersive experience and
                  ensure you catch all the subtle elements of your subliminal
                  track.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  I'm having trouble downloading my track. What should I do?
                </h3>
                <p>
                  If you're experiencing download issues, try the following
                  troubleshooting steps: clear your browser cache, try a
                  different browser, check your internet connection, or disable
                  any download blockers or extensions. If problems persist,
                  please contact our support team with details about the issue,
                  including any error messages you receive.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  How do I contact customer support?
                </h3>
                <p>
                  You can reach our customer support team through the Contact Us
                  page on our website, or by emailing
                  support@cognitiverewire.com. We aim to respond to all
                  inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-12 p-6 bg-slate-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Still Have Questions?</h2>
          <p className="mb-4">
            If you couldn't find the answer to your question, please don't
            hesitate to reach out to our support team. We're here to help!
          </p>
          <a
            href="/contact-us"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
      <Footer />
    </>
  );
}
