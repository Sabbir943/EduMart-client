"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

// Icons
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiChevronDown,
  FiMessageSquare,
  FiHelpCircle,
} from "react-icons/fi";

type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  category: "General Inquiry" | "Course Borrowing / Billing" | "Mentor Partnership" | "Technical Support";
  message: string;
};

const FAQS = [
  {
    q: "How does the course borrowing system work?",
    a: "Our borrowing system allows you to rent full course access for a flexible period at a fraction of the full purchase price. Once the rental duration ends, access automatically expires.",
  },
  {
    q: "How long does it take to get a response from support?",
    a: "Our support team typically responds to all inquiries within 12 to 24 business hours.",
  },
  {
    q: "I want to become a mentor. How do I apply?",
    a: "Select 'Mentor Partnership' in the contact form topic or sign up as a Mentor through our Sign Up page to unlock course creation features.",
  },
  {
    q: "Can I upgrade from borrowing to full lifetime ownership?",
    a: "Yes! You can upgrade to lifetime ownership at any time directly from your Student Dashboard with a rental credit deduction.",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setLoading(true);

    try {
      // Simulate API submission delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success("Message sent successfully! Our team will reach out shortly.");
      reset();
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Glow Orbs */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block">
            We'd Love to Hear From You
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Get in Touch with Us
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed">
            Have questions about borrowing courses, platform pricing, or becoming a mentor? Our team is here to help you every step of the way.
          </p>
        </div>

        {/* Main Grid: Form + Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <FiMessageSquare className="text-indigo-400" />
                <span>Contact Information</span>
              </h2>

              <div className="space-y-6">
                {/* Email Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 shrink-0">
                    <FiMail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Us</p>
                    <p className="text-sm font-medium text-white mt-0.5">support@eduplatform.com</p>
                    <p className="text-xs text-gray-500">24/7 digital support response</p>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 shrink-0">
                    <FiPhone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Call Us</p>
                    <p className="text-sm font-medium text-white mt-0.5">+1 (800) 555-0199</p>
                    <p className="text-xs text-gray-500">Mon - Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shrink-0">
                    <FiMapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Office Location</p>
                    <p className="text-sm font-medium text-white mt-0.5">100 Innovation Way, Suite 400</p>
                    <p className="text-xs text-gray-500">Tech District, CA 94103</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 shrink-0">
                    <FiClock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Working Hours</p>
                    <p className="text-sm font-medium text-white mt-0.5">Monday - Friday</p>
                    <p className="text-xs text-gray-500">9:00 AM – 6:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sub Banner Card */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white">Looking for Quick Help?</h3>
              <p className="text-xs text-indigo-200 mt-1 leading-relaxed">
                Check out our student resources or visit your dashboard to manage current course rentals directly.
              </p>
              <Link
                href="/courses"
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Browse Available Courses &rarr;</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-2">Send Us a Message</h2>
            <p className="text-sm text-gray-400 mb-8">
              Fill out the form below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName", { required: "Full name is required" })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Inquiry Topic</label>
                  <select
                    {...register("category")}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Course Borrowing / Billing">Course Borrowing / Billing</option>
                    <option value="Mentor Partnership">Mentor Partnership</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brief summary"
                    {...register("subject", { required: "Subject is required" })}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
                </div>
              </div>

              {/* Message Body */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help you..."
                  {...register("message", {
                    required: "Message content is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

        {/* FAQ Accordion Section */}
        <div className="pt-10 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <FiHelpCircle className="text-indigo-400" />
              <span>Frequently Asked Questions</span>
            </h2>
            <p className="text-sm text-gray-400">Quick answers to common questions about our platform.</p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-5 text-left text-sm font-semibold text-white flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown
                    className={`w-5 h-5 text-indigo-400 shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs text-gray-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}