import { Metadata } from "next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About Us | Cognitive Rewire",
  description:
    "Learn about our mission to help people transform their mindset with personalized subliminal audio.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          About Cognitive Rewire
        </h1>

        {/* Mission Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-center mb-8">
            At Cognitive Rewire, we're dedicated to empowering individuals to
            transform their mindset and achieve personal growth through the
            power of subliminal audio technology.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="italic text-center text-gray-700">
              "We believe that by combining positive affirmations with your
              favorite music, we can help you reprogram limiting beliefs and
              unlock your full potential."
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
              <p className="mb-4">
                Cognitive Rewire was founded in 2023 by a team of psychologists,
                audio engineers, and personal development enthusiasts who
                recognized the transformative potential of subliminal audio
                technology.
              </p>
              <p className="mb-4">
                After years of research and development, we created a platform
                that makes it easy for anyone to create personalized subliminal
                tracks that combine their favorite music with powerful
                affirmations tailored to their specific goals.
              </p>
              <p>
                What started as a passion project has grown into a community of
                thousands of users who are using our technology to overcome
                limiting beliefs, reduce stress, boost confidence, and achieve
                their personal and professional goals.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="mb-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-8 text-center">
            What Sets Us Apart
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">
                Science-Based Approach
              </h3>
              <p className="text-center text-gray-600">
                Our platform is built on established psychological principles
                and research on subliminal messaging and cognitive
                restructuring.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">
                Personalization
              </h3>
              <p className="text-center text-gray-600">
                We offer unparalleled customization, allowing you to create
                subliminal tracks that align perfectly with your unique goals
                and preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2 text-center">
                Supportive Community
              </h3>
              <p className="text-center text-gray-600">
                Join thousands of users who are sharing their journeys, tips,
                and success stories as they transform their lives with
                subliminal audio.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Dr. Sarah Johnson</h3>
              <p className="text-blue-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600">
                Clinical psychologist with over 15 years of experience in
                cognitive behavioral therapy and mindfulness practices.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                  alt="Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Michael Chen</h3>
              <p className="text-blue-600 mb-2">Chief Technology Officer</p>
              <p className="text-gray-600">
                Audio engineer and software developer with a passion for
                creating technology that enhances mental wellbeing.
              </p>
            </div>
            <div className="text-center">
              <div className="rounded-full overflow-hidden w-40 h-40 mx-auto mb-4">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                  alt="Emma Rodriguez"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium">Emma Rodriguez</h3>
              <p className="text-blue-600 mb-2">Head of Content</p>
              <p className="text-gray-600">
                Certified life coach and writer specializing in personal
                development and positive psychology.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Mindset?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already experiencing the benefits of
            personalized subliminal audio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/sign-up"
              className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Get Started Free
            </a>
            <a
              href="/contact-us"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
