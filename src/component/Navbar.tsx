"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; // Your Better Auth client import
import toast from "react-hot-toast";

// Icons (using react-icons)
import { FiSearch, FiUser, FiLogOut, FiMenu, FiX, FiBookOpen } from "react-icons/fi";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch session data from Better Auth
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Search submit handler
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Logout handler
  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success("Signed out successfully");
      router.push("/");
    } catch (err: any) {
      toast.error(err?.message || "Failed to sign out");
    }
  };

  // Helper function to render role badge with appropriate styling
  const renderRoleBadge = (role?: string) => {
    const roleNormalized = role?.toLowerCase() || "student";

    switch (roleNormalized) {
      case "admin":
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-100 text-red-700 border border-red-300">
            Admin
          </span>
        );
      case "mentor":
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-700 border border-purple-300">
            Mentor
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700 border border-blue-300">
            Student
          </span>
        );
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* 1. Logo & Platform Title */}
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/" className="flex items-center gap-2 text-indigo-600 font-bold text-xl">
              <FiBookOpen className="w-7 h-7" />
              <span className="hidden sm:inline">EduPlatform</span>
            </Link>
          </div>

          {/* 2. Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link href="/courses" className="hover:text-indigo-600 transition-colors">
              Courses
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
            <Link href="/about" className="hover:text-indigo-600 transition-colors">
              About Us
            </Link>
          </div>

          {/* 3. Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xs relative hidden sm:block">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>

          {/* 4. Authentication / Profile Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isPending ? (
              <div className="h-8 w-20 bg-gray-200 animate-pulse rounded-md" />
            ) : user ? (
              /* Authenticated User Menu */
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 p-1 rounded-lg focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {user.name ? user.name[0].toUpperCase() : <FiUser />}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  
                  {/* Dynamic Role Badge */}
                  {renderRoleBadge((user as any).role)}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-xs text-gray-500">Signed in as</p>
                      <p className="text-sm font-semibold truncate">{user.email}</p>
                    </div>

                    <Link
                      href={`/dashboard/${(user as any).role || "student"}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated Buttons */
              <div className="flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-3">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mt-2">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-2 pt-2 text-sm font-medium">
            <Link href="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
            <Link href="/courses" className="text-gray-700 hover:text-indigo-600">Courses</Link>
            <Link href="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-600">About Us</Link>
          </div>

          {/* Mobile Auth Status */}
          <div className="pt-3 border-t border-gray-100">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                  {renderRoleBadge((user as any).role)}
                </div>
                <Link
                  href={`/dashboard/${(user as any).role || "student"}`}
                  className="block text-sm text-indigo-600 font-medium"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left text-sm text-red-600 flex items-center gap-1 pt-1"
                >
                  <FiLogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/sign-in"
                  className="w-full text-center py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="w-full text-center py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}