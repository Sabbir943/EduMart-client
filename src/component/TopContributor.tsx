"use client";

import React from "react";
import { FiAward, FiBookOpen, FiArrowRight, FiActivity } from "react-icons/fi";
import Link from "next/link";

const TopContributor = () => {
    // 📝 Unsplash থেকে কালেক্ট করা প্রিমিয়াম প্রফেশনাল পোর্ট্রেট অবতার ইমেজ ইউআরএল
    const mentor = {
        name: "Sabbir Ahmed",
        email: "mdsabbirahmedgopalgonj@gmail.com",
        // 🌟 Unsplash Professional Portrait Studio Image URL
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300", 
        totalCourses: 5,
        role: "Senior Engineering Lead"
    };

    return (
        <section className="py-16 bg-white text-black border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* সেকশন হেডার */}
                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase rounded-lg tracking-wider">
                        <FiActivity className="w-3.5 h-3.5 animate-pulse" /> Platform Analytics
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Top Contributor of the Month
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium">
                        Recognizing the instructional architecture leads deployed within our open-access knowledge channels.
                    </p>
                </div>

                {/* প্রোফাইল কার্ড কন্টেইনার */}
                <div className="relative border border-slate-200 rounded-3xl p-6 sm:p-10 bg-white shadow-sm overflow-hidden flex flex-col md:flex-row items-center gap-8 max-w-4xl">
                    
                    {/* ব্যাকগ্রাউন্ড ডেকোরেশন ব্যাজ */}
                    <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 text-slate-50 pointer-events-none -z-0">
                        <FiAward className="w-48 h-48 opacity-40 text-slate-100" />
                    </div>

                    {/* মেন্টর প্রোফাইল ইমেজ অবতার */}
                    <div className="relative z-10 flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-100 border-2 border-slate-200/80 overflow-hidden flex items-center justify-center text-slate-400 text-3xl font-black uppercase shadow-sm">
                            {mentor.image ? (
                                <img 
                                    src={mentor.image} 
                                    alt={mentor.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                mentor.name.charAt(0)
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-md border border-indigo-500">
                            <FiAward className="w-4 h-4" />
                        </div>
                    </div>

                    {/* মেন্টর মেটা কন্টেন্ট */}
                    <div className="flex-1 text-center md:text-left space-y-4 relative z-10">
                        <div className="space-y-1.5">
                            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight capitalize">
                                {mentor.name}
                            </h3>
                            <p className="text-xs text-indigo-600 font-bold tracking-wide uppercase">
                                {mentor.role}
                            </p>
                            <span className="inline-block px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg">
                                {mentor.email}
                            </span>
                        </div>

                        {/* স্ট্যাটিক курс কাউন্টার ম্যাট্রিক্স */}
                        <div className="flex items-center justify-center md:justify-start gap-4">
                            <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3 px-5 flex items-center gap-3">
                                <div className="p-2 bg-white border border-slate-200 rounded-xl text-indigo-600 shadow-sm">
                                    <FiBookOpen className="w-4 h-4" />
                                </div>
                                <div className="text-left">
                                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-wide">Ecosystem Growth</span>
                                    <span className="block font-black text-sm sm:text-base text-slate-900 leading-tight">
                                        {mentor.totalCourses} Active Workspaces Published
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* অ্যাকশন লিংক বাটন */}
                    <div className="relative z-10 w-full md:w-auto">
                        <Link 
                            href={`/courses?instructor=${mentor.email}`}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-slate-900 hover:bg-indigo-600 rounded-xl px-5 py-3.5 shadow-md transition-all whitespace-nowrap cursor-pointer"
                        >
                            Explore Mentor Workspace <FiArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default TopContributor;