"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

// Icons (using react-icons)
import {
  FiBookOpen,
  FiMail,
  FiSend,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiFacebook,
  FiHeart,
} from "react-icons/fi";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Mock successful subscription
    toast.success("Thank you for subscribing to our newsletter!");
    setNewsletterEmail("");
  };

  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Info (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-indigo-400 font-bold text-2xl">
              <FiBookOpen className="w-8 h-8 text-indigo-500" />
              <span className="text-white">EduPlatform</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Empowering learners worldwide through flexible learning pathways. Rent individual course modules or buy lifetime access from top industry mentors.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Subscribe to our newsletter
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex items-center max-w-md gap-2">
                <div className="relative flex-1">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Subscribe</span>
                  <FiSend className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses" className="hover:text-indigo-400 transition-colors">
                  Explore Courses
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-indigo-400 transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/borrow-info" className="hover:text-indigo-400 transition-colors">
                  Course Rentals (Borrow)
                </Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-indigo-400 transition-colors">
                  Top Mentors
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Top Categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/courses?category=web-development" className="hover:text-indigo-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/courses?category=data-science" className="hover:text-indigo-400 transition-colors">
                  Data Science & AI
                </Link>
              </li>
              <li>
                <Link href="/courses?category=ui-ux" className="hover:text-indigo-400 transition-colors">
                  UI/UX Design
                </Link>
              </li>
              <li>
                <Link href="/courses?category=cloud-computing" className="hover:text-indigo-400 transition-colors">
                  DevOps & Cloud
                </Link>
              </li>
              <li>
                <Link href="/courses?category=cybersecurity" className="hover:text-indigo-400 transition-colors">
                  Cyber Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support & Legal */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Help Center / Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-indigo-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/become-mentor" className="hover:text-indigo-400 transition-colors text-indigo-400 font-medium">
                  Become a Mentor
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          
          {/* Copyright */}
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} EduPlatform. All rights reserved. Built with
            <FiHeart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> for learners.
          </p>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
              aria-label="GitHub"
            >
              <FiGithub className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
              aria-label="Twitter"
            >
              <FiTwitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded-full transition-colors"
              aria-label="Facebook"
            >
              <FiFacebook className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}