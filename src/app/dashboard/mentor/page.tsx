"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiTrendingUp, FiAward, FiArrowRight, FiActivity } from "react-icons/fi";

export default function LandingDash() {
  // Mock data for a quick attractive statistic grid
  const stats = [
    { id: 1, name: "Active Progress", value: "78%", icon: FiActivity, color: "text-indigo-400", bg: "bg-indigo-500/10" },
    { id: 2, name: "Hours Learned", value: "42.5 hrs", icon: FiTrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
    { id: 3, name: "Completed Certs", value: "4 Badges", icon: FiAward, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Elegant Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-slate-850 shadow-2xl backdrop-blur-xl"
      >
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 tracking-wider uppercase">
            Workspace Active
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Welcome to your Dashboard Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Manage your dynamic tasks, view updated analytics, track your custom actions, or continue working where you left off.
          </p>
          <div className="pt-2">
            <button className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group">
              <span>View detailed global statistics</span>
              <FiArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Quick Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md flex items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 tracking-wide">{stat.name}</p>
                <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
              </div>
              <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} border border-slate-800 shadow-inner shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty Slate / Activity Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl border-2 border-dashed border-slate-800/80 p-12 text-center flex flex-col items-center justify-center space-y-3"
      >
        <div className="p-4 bg-slate-900 border border-slate-800 text-gray-500 rounded-full">
          <FiBookOpen className="w-6 h-6" />
        </div>
        <div className="max-w-xs space-y-1">
          <h3 className="text-sm font-semibold text-gray-300">No recent activity found</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Your primary metrics dashboard layout is fully connected and ready. Start adding items to view data updates.
          </p>
        </div>
      </motion.div>

    </div>
  );
}