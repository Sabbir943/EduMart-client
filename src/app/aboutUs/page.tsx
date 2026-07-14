"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Icons
import {
  FiBookOpen,
  FiTarget,
  FiEye,
  FiAward,
  FiUsers,
  FiCheckCircle,
  FiArrowRight,
  FiGlobe,
  FiZap,
} from "react-icons/fi";

// Mock Team / Mentors Data
const TEAM_MEMBERS = [
  {
    name: "Alex Rivera",
    role: "Founder & Lead Architect",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    bio: "Passionate about democratizing education and building scalable full-stack learning systems.",
  },
  {
    name: "Dr. Sarah Chen",
    role: "Head of Curriculum",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    bio: "Former University Professor specializing in AI-driven pedagogy and interactive learning.",
  },
  {
    name: "Marcus Vance",
    role: "Senior Engineering Mentor",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    bio: "Full-Stack Dev Advocate helping thousands of students bridge the gap to senior roles.",
  },
  {
    name: "Elena Rostova",
    role: "Lead UI/UX Designer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
    bio: "Crafting intuitive, glassmorphic design systems that make complex topics easy to digest.",
  },
];

const VALUES = [
  {
    icon: FiGlobe,
    title: "Accessible Education",
    desc: "We believe financial barriers shouldn't hold back talent. Our course borrowing model keeps top-tier tech education accessible.",
  },
  {
    icon: FiZap,
    title: "Hands-on Mastery",
    desc: "Learning by doing. Real-world projects, live code reviews, and structured feedback from active industry mentors.",
  },
  {
    icon: FiAward,
    title: "Quality Over Quantity",
    desc: "Every course on our platform undergoes strict peer review to ensure up-to-date curricula and production-grade standards.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block"
          >
            Reinventing Tech Education
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
          >
            Empowering the Next Generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Digital Creators</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            We're building an ecosystem where ambitious developers, designers, and innovators learn from top-tier mentors through flexible borrowing and lifetime learning pathways.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl text-center"
        >
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400">50,000+</p>
            <p className="text-xs sm:text-sm text-gray-400">Active Students</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-purple-400">1,200+</p>
            <p className="text-xs sm:text-sm text-gray-400">Expert Mentors</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-pink-400">500+</p>
            <p className="text-xs sm:text-sm text-gray-400">Borrowable Courses</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400">98%</p>
            <p className="text-xs sm:text-sm text-gray-400">Completion Satisfaction</p>
          </div>
        </motion.div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 hover:border-indigo-500/40 transition-colors"
          >
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 inline-block">
              <FiTarget className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              To dismantle educational entry barriers by providing flexible course borrowing, high-impact practical projects, and direct access to active industry leaders—ensuring every student can turn learning into career success.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-xl space-y-4 hover:border-purple-500/40 transition-colors"
          >
            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-purple-400 inline-block">
              <FiEye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              To become the global standard for modern tech mentorship, where learning is interactive, financial models are fair, and developers build real solutions that shape the future.
            </p>
          </motion.div>

        </div>

        {/* Core Values Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Guiding Principles</h2>
            <p className="text-sm text-gray-400">The core values driving our platform choices every day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4 hover:border-slate-700 transition-colors"
                >
                  <div className="p-3 bg-slate-800 rounded-2xl text-indigo-400 inline-block">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{val.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Meet the Team Showcase */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white">Meet the Visionaries</h2>
            <p className="text-sm text-gray-400">Driven by passion, industry expertise, and a commitment to mentorship.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-3xl bg-slate-900/60 border border-slate-800 overflow-hidden backdrop-blur-xl hover:border-indigo-500/50 transition-all duration-300"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                </div>
                
                <div className="p-5 space-y-2 relative -mt-8">
                  <h3 className="text-lg font-bold text-white">{member.name}</h3>
                  <p className="text-xs font-semibold text-indigo-400">{member.role}</p>
                  <p className="text-xs text-gray-400 pt-1 leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 border border-indigo-500/30 p-8 sm:p-12 overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Advance Your Skills?
            </h2>
            <p className="text-sm text-indigo-200 leading-relaxed">
              Explore hundreds of hand-picked courses or start borrowing individual modules to kickstart your journey.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href="/courses"
              className="py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>Explore Courses</span>
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}