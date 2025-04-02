import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Affirmation Tips | Cognitive Rewire",
  description:
    "Learn how to create and use powerful affirmations for personal transformation.",
};

export default function AffirmationTipsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Affirmation Tips
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            What Are Affirmations?
          </h2>
          <p className="mb-4">
            Affirmations are positive statements that can help you challenge and
            overcome self-sabotaging and negative thoughts. When you repeat them
            often and believe in them, you can start to make positive changes in
            your life and mindset.
          </p>
          <p className="mb-4">
            The practice of using affirmations is based on the idea that our
            subconscious mind plays a major role in shaping our experiences, and
            by consciously directing positive thoughts toward specific goals, we
            can influence our behaviors, habits, and ultimately, our reality.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            The Science Behind Affirmations
          </h2>
          <p className="mb-4">
            Research in neuroscience suggests that affirmations can activate the
            reward centers in your brain. When you repeat positive statements
            about yourself, your brain's neural pathways begin to change,
            potentially creating new, positive thought patterns over time.
          </p>
          <p className="mb-4">
            Studies have shown that self-affirmation exercises can help reduce
            stress, increase problem-solving abilities under pressure, and
            improve overall well-being. The practice essentially helps rewire
            your brain to think more positively.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            How to Create Effective Affirmations
          </h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Use present tense</strong> - Phrase affirmations as if
              they are already happening, not as something you wish for in the
              future. For example, "I am confident and capable" rather than "I
              will be confident and capable."
            </li>
            <li>
              <strong>Keep them positive</strong> - Focus on what you want, not
              what you don't want. Say "I am healthy and energetic" instead of
              "I am not sick."
            </li>
            <li>
              <strong>Make them specific</strong> - The more specific your
              affirmations, the more powerful they can be. "I am successfully
              completing my project on time" is more effective than "I am
              successful."
            </li>
            <li>
              <strong>Include emotions</strong> - Adding emotional words can
              make affirmations more impactful. "I joyfully embrace new
              opportunities" carries more emotional weight than "I accept new
              opportunities."
            </li>
            <li>
              <strong>Keep them realistic</strong> - While affirmations should
              be positive and ambitious, they should also be believable to your
              subconscious mind.
            </li>
            <li>
              <strong>Make them personal</strong> - Always use "I" statements to
              make the affirmation directly about yourself.
            </li>
          </ol>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Examples of Powerful Affirmations
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">For Confidence</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>I am confident and capable in all that I do.</li>
                <li>
                  I trust my abilities and express myself with confidence.
                </li>
                <li>I am worthy of respect and acceptance.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">For Success</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>I am attracting success and prosperity into my life.</li>
                <li>I have the skills and abilities to achieve my goals.</li>
                <li>I turn challenges into opportunities for growth.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">For Health</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>My body is healthy, strong, and full of energy.</li>
                <li>I make choices that nourish my body and mind.</li>
                <li>I am in perfect health in body, mind, and spirit.</li>
              </ul>
            </div>
            <div className="bg-slate-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">For Relationships</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  I attract positive and loving relationships into my life.
                </li>
                <li>
                  I am worthy of love and respect in all my relationships.
                </li>
                <li>I communicate openly and honestly with those around me.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            How to Use Affirmations Effectively
          </h2>
          <ol className="list-decimal pl-6 space-y-4">
            <li>
              <strong>Consistency is crucial</strong> - Repeat your affirmations
              daily, ideally multiple times a day.
            </li>
            <li>
              <strong>Find the right time</strong> - Morning and evening, when
              your mind is more receptive, are ideal times for affirmations.
            </li>
            <li>
              <strong>Speak with conviction</strong> - Say your affirmations
              with feeling and belief, not just mechanically.
            </li>
            <li>
              <strong>Use multiple methods</strong> - Speak them aloud, write
              them down, listen to recorded affirmations, or create visual
              reminders.
            </li>
            <li>
              <strong>Combine with visualization</strong> - As you say your
              affirmations, visualize yourself already experiencing what you're
              affirming.
            </li>
            <li>
              <strong>Be patient</strong> - Changing deep-seated beliefs takes
              time. Give the process at least 30 days before evaluating results.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Using Affirmations in Subliminal Audio
          </h2>
          <p className="mb-4">
            Combining affirmations with subliminal audio can be a powerful way
            to reinforce positive messages to your subconscious mind. With
            Cognitive Rewire, you can:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Create custom affirmations tailored to your specific goals</li>
            <li>
              Record affirmations in your own voice for a more personal
              connection
            </li>
            <li>Layer affirmations with your favorite music</li>
            <li>
              Adjust the volume and frequency of affirmations for optimal effect
            </li>
          </ul>
          <p className="mt-4">
            Start creating your personalized affirmation-based subliminal audio
            by visiting our{" "}
            <a
              href="/dashboard/create"
              className="text-blue-600 hover:underline"
            >
              Create Subliminal
            </a>{" "}
            page or explore our{" "}
            <a
              href="/dashboard/affirmations"
              className="text-blue-600 hover:underline"
            >
              Affirmations Library
            </a>
            .
          </p>
        </section>
      </div>
      <Footer />
    </>
  );
}
