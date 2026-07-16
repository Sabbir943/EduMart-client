"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icons
import {
  FiBookOpen,
  FiPlusCircle,
  FiBook,
  FiClock,
  FiGrid,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiPieChart,
  FiFileText,
  FiBarChart2,
  FiLogOut,
} from "react-icons/fi";

interface SidebarProps {
  role: "student" | "mentor" | "admin";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  // ১. Mentor Links (As per your instruction)
  const mentorLinks = [
    { name: "Add Course", href: "/dashboard/mentor/add-course", icon: FiPlusCircle },
    { name: "My Course", href: "/dashboard/mentor/my-courses", icon: FiBook },
    { name: "Borrowed Course", href: "/dashboard/mentor/borrowed-courses", icon: FiClock },
    { name: "Manage Course", href: "/dashboard/mentor/manage-courses", icon: FiGrid },
  ];

  // ২. Student Links (As per your instruction)
  const studentLinks = [
    { name: "My Course", href: "/dashboard/student/my-courses", icon: FiBook },
    { name: "Saved Course", href: "/dashboard/student/saved-courses", icon: FiHeart },
    { name: "My Cart", href: "/dashboard/student/cart", icon: FiShoppingCart },
    { name: "My Profile", href: "/dashboard/student/profile", icon: FiUser },
  ];

  // ৩. Admin Links (As per your instruction)
  const adminLinks = [
    { name: "Overview", href: "/dashboard/admin/overview", icon: FiPieChart },
    { name: "Manage Course", href: "/dashboard/admin/manage-courses", icon: FiGrid },
    { name: "Report", href: "/dashboard/admin/reports", icon: FiFileText },
    { name: "Analytics Chart", href: "/dashboard/admin/analytics", icon: FiBarChart2 },
  ];

  // রোলের উপর ভিত্তি করে লিঙ্ক সিলেক্ট করা
  const links =
    role === "mentor"
      ? mentorLinks
      : role === "admin"
      ? adminLinks
      : studentLinks;

  return (
    <aside className="w-66 bg-slate-900 border-r border-slate-800/60 shrink-0 h-screen p-4 flex flex-col justify-between relative z-20">
      <div>
        {/* Logo/Brand */}
        <div className="h-14 flex items-center px-2 mb-6">
          <Link href="/" className="flex items-center gap-2 text-indigo-400 font-bold text-xl tracking-tight">
            <FiBookOpen className="w-7 h-7 text-indigo-500 fill-indigo-500/10" />
            <span className="text-white">EduPlatform</span>
          </Link>
        </div>

        {/* Dynamic Workspace Badge */}
        <div className="px-2 mb-5">
          <span className={`inline-block px-3 py-1 text-[11px] font-semibold rounded-full border tracking-wide uppercase ${
            role === 'admin' 
              ? 'bg-red-500/10 text-red-400 border-red-500/20' 
              : role === 'mentor' 
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
              : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
          }`}>
            {role} workspace
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-gray-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                  isActive ? "text-white" : "text-gray-400 group-hover:text-indigo-400"
                }`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer Action */}
      <div className="pt-4 border-t border-slate-800/60">
        <button
          onClick={() => console.log("Sign out behavior connected to Better Auth")}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group"
        >
          <FiLogOut className="w-5 h-5 text-gray-500 group-hover:text-red-400" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}