import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Blog | Cognitive Rewire",
  description:
    "Explore articles about subliminal audio, affirmations, mindfulness, and personal growth.",
};

export default function BlogPage() {
  // Sample blog posts data
  // In a real application, this would come from a database or CMS
  const blogPosts = [
    {
      id: 1,
      title: "The Science Behind Subliminal Audio: How It Affects Your Brain",
      excerpt:
        "Explore the neuroscience of subliminal messaging and how it can influence your subconscious mind.",
      date: "June 15, 2024",
      author: "Dr. Sarah Johnson",
      category: "Science",
      imageUrl:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80",
      slug: "science-behind-subliminal-audio",
    },
    {
      id: 2,
      title: "10 Powerful Affirmations for Boosting Self-Confidence",
      excerpt:
        "Discover affirmations that can help you overcome self-doubt and build lasting confidence.",
      date: "June 10, 2024",
      author: "Michael Chen",
      category: "Affirmations",
      imageUrl:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80",
      slug: "powerful-affirmations-self-confidence",
    },
    {
      id: 3,
      title: "How to Create a Daily Subliminal Listening Routine",
      excerpt:
        "Learn how to incorporate subliminal audio into your daily life for maximum effectiveness.",
      date: "June 5, 2024",
      author: "Emma Rodriguez",
      category: "Practical Tips",
      imageUrl:
        "https://images.unsplash.com/photo-1470116945706-e6bf5d5a53ca?w=800&q=80",
      slug: "daily-subliminal-listening-routine",
    },
    {
      id: 4,
      title: "Combining Meditation with Subliminal Audio for Enhanced Results",
      excerpt:
        "Discover how pairing meditation with subliminal listening can amplify your personal growth journey.",
      date: "May 28, 2024",
      author: "Dr. James Wilson",
      category: "Mindfulness",
      imageUrl:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
      slug: "meditation-subliminal-audio-enhanced-results",
    },
    {
      id: 5,
      title: "Success Stories: Real People, Real Results with Subliminal Audio",
      excerpt:
        "Read inspiring testimonials from individuals who have transformed their lives using subliminal technology.",
      date: "May 20, 2024",
      author: "Olivia Parker",
      category: "Success Stories",
      imageUrl:
        "https://images.unsplash.com/photo-1552581234-26160f608093?w=800&q=80",
      slug: "success-stories-subliminal-audio",
    },
    {
      id: 6,
      title:
        "The History of Subliminal Messaging: From Controversy to Acceptance",
      excerpt:
        "Explore the fascinating evolution of subliminal technology and how it gained scientific credibility.",
      date: "May 15, 2024",
      author: "Professor Robert Thompson",
      category: "History",
      imageUrl:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80",
      slug: "history-subliminal-messaging",
    },
  ];

  // Categories for filter
  const categories = [
    "All",
    "Science",
    "Affirmations",
    "Practical Tips",
    "Mindfulness",
    "Success Stories",
    "History",
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Cognitive Rewire Blog
        </h1>
        <p className="text-center text-lg mb-12 max-w-3xl mx-auto">
          Explore our articles about subliminal audio, affirmations,
          mindfulness, and personal growth to enhance your journey toward
          positive change.
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full ${category === "All" ? "bg-blue-600 text-white" : "bg-slate-100 hover:bg-slate-200"}`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src={blogPosts[0].imageUrl}
              alt={blogPosts[0].title}
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm mb-3">
                {blogPosts[0].category}
              </span>
              <h2 className="text-3xl font-bold text-white mb-3">
                {blogPosts[0].title}
              </h2>
              <p className="text-white/90 mb-4">{blogPosts[0].excerpt}</p>
              <div className="flex items-center text-white/80 mb-4">
                <span>{blogPosts[0].date}</span>
                <span className="mx-2">•</span>
                <span>{blogPosts[0].author}</span>
              </div>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                Read Article
              </button>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm mb-3">
                  {post.category}
                </span>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-slate-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-slate-500 text-sm mb-4">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.author}</span>
                </div>
                <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Read More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-slate-50 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Stay updated with our latest articles, tips, and resources on
            subliminal audio and personal development.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-l-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
