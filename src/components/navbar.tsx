import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import { User, UserCircle, Menu } from "lucide-react";
import UserProfile from "./user-profile";

export default async function Navbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-3 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          prefetch
          className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Cognitive Rewire
        </Link>

        {/* Main Menu - Centered */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-gray-50 rounded-full px-6 py-2 shadow-md">
          <div className="flex space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-300 font-medium"
            >
              About Us
            </Link>
            <Link
              href="/blog"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-300 font-medium"
            >
              Blog
            </Link>
            <Link
              href="/contact-us"
              className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-300 font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Only visible on mobile */}
        <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>

        {/* Auth Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Hidden by default, would be shown with JavaScript in a real implementation */}
      <div className="hidden md:hidden px-4 py-2 bg-white border-t border-gray-200">
        <div className="flex flex-col space-y-2">
          <Link
            href="/"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/blog"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact-us"
            className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
          >
            Contact Us
          </Link>
          {user ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
