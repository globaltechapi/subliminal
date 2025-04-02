import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Subliminal Guide | Cognitive Rewire",
  description:
    "Learn how to effectively use subliminal audio for personal growth and transformation.",
};

export default function SubliminalGuidePage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Subliminal Audio Guide
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            What Are Subliminal Audios?
          </h2>
          <p className="mb-4">
            Subliminal audios are recordings that contain positive affirmations
            or suggestions that are played at a volume level just below the
            threshold of conscious hearing. While your conscious mind may not
            perceive these messages, your subconscious mind can still process
            and absorb them.
          </p>
          <p className="mb-4">
            The theory behind subliminal messaging is that by bypassing the
            critical factor of the conscious mind, positive suggestions can more
            easily be accepted by the subconscious mind, potentially leading to
            changes in beliefs, behaviors, and habits over time.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            How Subliminal Audio Works
          </h2>
          <p className="mb-4">
            Our minds operate on two primary levels: the conscious and
            subconscious. The conscious mind is analytical and critical, often
            rejecting new ideas that contradict existing beliefs. The
            subconscious mind, however, is more receptive and stores our
            deep-seated beliefs, habits, and automatic responses.
          </p>
          <p className="mb-4">
            Subliminal audio works by delivering positive affirmations directly
            to your subconscious mind, bypassing the critical factor of your
            conscious mind. This allows for the potential reprogramming of
            limiting beliefs and the establishment of new, empowering thought
            patterns.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Benefits of Using Subliminal Audio
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Potential to change limiting beliefs and negative thought patterns
            </li>
            <li>May help reduce stress and anxiety</li>
            <li>Can support personal development goals</li>
            <li>Convenient and easy to incorporate into daily routines</li>
            <li>Non-invasive approach to personal transformation</li>
            <li>Can be used alongside other self-improvement techniques</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            How to Use Subliminal Audios Effectively
          </h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Consistency is key</strong> - Listen to your subliminal
              audio regularly, ideally daily, for at least 30 days to see
              potential results.
            </li>
            <li>
              <strong>Choose the right time</strong> - Many people find that
              listening before sleep or upon waking, when the mind is naturally
              more receptive, can be particularly effective.
            </li>
            <li>
              <strong>Create a relaxed environment</strong> - Minimize
              distractions and find a comfortable position when listening to
              your subliminal audio.
            </li>
            <li>
              <strong>Maintain a positive mindset</strong> - Approach the
              experience with an open mind and positive expectations.
            </li>
            <li>
              <strong>Combine with visualization</strong> - While listening, try
              to visualize yourself already having achieved the desired outcome.
            </li>
            <li>
              <strong>Be patient</strong> - Changes in deeply held beliefs and
              behaviors take time. Give the process at least 30-90 days before
              evaluating results.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Creating Your Own Subliminal Audio
          </h2>
          <p className="mb-4">
            With Cognitive Rewire, you can create personalized subliminal audios
            tailored to your specific goals and preferences. Our platform allows
            you to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Choose from a library of background music or upload your own
            </li>
            <li>
              Create custom affirmations or select from our pre-written
              collection
            </li>
            <li>Adjust the volume levels of both the music and affirmations</li>
            <li>Set the frequency of affirmation repetition</li>
            <li>
              Download your finished subliminal track for offline listening
            </li>
          </ul>
          <p className="mt-4">
            Get started today by visiting our{" "}
            <a
              href="/dashboard/create"
              className="text-blue-600 hover:underline"
            >
              Create Subliminal
            </a>{" "}
            page.
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
