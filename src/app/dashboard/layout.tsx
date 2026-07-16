"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";


import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "@/component/dash/Sidebar";


interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function MainDashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // URL পাথ থেকে রোল ডিটেক্ট করা হচ্ছে (e.g., /dashboard/mentor -> mentor)
  let currentRole: "student" | "mentor" | "admin" = "student";
  if (pathname.includes("/dashboard/mentor")) {
    currentRole = "mentor";
  } else if (pathname.includes("/dashboard/admin")) {
    currentRole = "admin";
  }

  // হেডার ইনফো ডাইনামিক করার জন্য
  const userProfileInfo = {
    student: { name: "Alex Learner", email: "student@eduplatform.com" },
    mentor: { name: "Dr. Sarah Chen", email: "mentor@eduplatform.com" },
    admin: { name: "Chief Admin", email: "admin@eduplatform.com" },
  };

  const currentUser = userProfileInfo[currentRole];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex overflow-hidden relative">
      
      {/* Background Neon Glow Aesthetic */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* --- desktop sidebar --- */}
      <div className="hidden lg:flex z-20">
        <Sidebar role={currentRole} />
      </div>

      {/* --- mobile sidebar drawer --- */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Click to Close */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          <div className="relative z-10 flex animate-slide-in">
            <Sidebar role={currentRole} />
            {/* Close Button Inside Drawer */}
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-[-50px] p-2 bg-slate-900 border border-slate-800 rounded-xl text-white"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}

      {/* --- main content wrapper --- */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden z-10">
        
        {/* Top Header Row */}
        <div className="flex items-center bg-slate-900/80 border-b border-slate-800/60 sticky top-0 z-30 backdrop-blur-md">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden ml-4 p-2 bg-slate-800/50 hover:bg-slate-800 text-gray-400 hover:text-white rounded-xl transition-colors border border-slate-700/40"
          >
            <FiMenu className="w-5 h-5" />
          </button>
          
          {/* Dashboard Header Component */}
          
        </div>

        {/* --- scrollable page content --- */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>
      </div>

    </div>
  );
}