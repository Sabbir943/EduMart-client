"use client";

import React from "react";
import Link from "next/link";
import { FiChevronLeft, FiAlertTriangle, FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            
            {/* ব্যাকগ্রাউন্ড ডেকোরেশন গ্রিড বা এলিমেন্ট (মিনিমাল ভাইব) */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-0" />

            <div className="max-w-md w-full text-center space-y-6 relative z-10">
                
                {/* অ্যানিমেটেড বা ভাইব্রেন্ট আইকন কন্টেইনার */}
                <div className="mx-auto w-16 h-16 bg-rose-50 border border-rose-200 text-rose-500 rounded-2xl flex items-center justify-center shadow-sm animate-bounce mb-2">
                    <FiAlertTriangle className="w-8 h-8" />
                </div>

                {/* এরর কোড ও টেক্সট ম্যাট্রিক্স */}
                <div className="space-y-2">
                    <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-slate-900 leading-none">
                        404
                    </h1>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight capitalize">
                        Matrix Segment Not Found
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                        The workspace routing configuration or active stream index you are trying to sync does not exist in this database engine.
                    </p>
                </div>

                {/* অ্যাকশন বাটন কন্ট্রোলস */}
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button 
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-5 py-3 rounded-xl transition-all cursor-pointer active:scale-95"
                    >
                        <FiChevronLeft className="w-4 h-4" /> Go Back
                    </button>
                    
                    <Link 
                        href="/" 
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl px-5 py-3 shadow-md transition-all active:scale-95"
                    >
                        <FiHome className="w-4 h-4" /> Return Home
                    </Link>
                </div>

                {/* কুয়িক ফুটনোট */}
                <div className="pt-8 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <FiSearch /> EduPlatform Ecosystem Log
                </div>

            </div>
        </div>
    );
}