"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { FiBookOpen, FiClock, FiStar, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";

interface Course {
    _id: string;
    name: string;
    imgUrl: string;
    description: string;
    duration: string;
    rating: number;
    category: string;
    courseType?: string;
    enrolledAt?: string;
}

const MyCourse = () => {
    const { data: session, isPending: authPending } = authClient.useSession();
    const [courses, setCourses] = useState<Course[]>(null);
    const [loading, setLoading] = useState(true);
    
    // পেজিনেশন স্টেট
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6; // প্রতি পেজে অন্তত ৬টি কার্ড দেখাবে

    const fetchMyCourses = async () => {
        if (!session?.user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/student/my-courses?email=${session.user.email}&page=${page}&limit=${limit}`);
            const data = await res.json();
            if (data.success) {
                setCourses(data.courses);
                setTotalPages(data.totalPages || 1);
            }
        } catch (error) {
            console.error("Error loading student matrix courses:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchMyCourses();
        }
    }, [session, page]);

    if (authPending || loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-4 sm:p-6 lg:p-8">
            {/* হেডার সেকশন */}
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    My Learning Workspace
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Monitor your current modules, configuration structures, and educational tracking logs.
                </p>
            </div>

            {/* কোর্সের গ্রিড লেআউট */}
            <AnimatePresence mode="wait">
                {courses && courses.length > 0 ? (
                    <div className="space-y-10">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {courses.map((course) => (
                                <div 
                                    key={course._id} 
                                    className="group bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                                >
                                    {/* ইমেজ ব্যানার */}
                                    <div className="relative h-44 w-full overflow-hidden bg-slate-100 shrink-0">
                                        <img 
                                            src={course.imgUrl} 
                                            alt={course.name} 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <span className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm">
                                            {course.category}
                                        </span>
                                    </div>

                                    {/* কন্টেন্ট বডি */}
                                    <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-base font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1 capitalize">
                                                {course.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-normal leading-relaxed line-clamp-2">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* মেটা ইনফো গ্রিড */}
                                        <div className="grid grid-cols-2 gap-2 border-t border-b border-slate-200/60 py-3 text-[11px] font-bold text-slate-600">
                                            <div className="flex items-center gap-1.5">
                                                <FiClock className="text-indigo-500 w-4 h-4" />
                                                <span>{course.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 justify-end">
                                                <FiStar className="text-amber-500 fill-amber-400 w-4 h-4" />
                                                <span>{Number(course.rating || 5).toFixed(1)} / 5.0</span>
                                            </div>
                                        </div>

                                        {/* অ্যাকশন বাটন */}
                                        <Link 
                                            href={`/courses/${course._id}`}
                                            className="w-full py-3 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-2 group/btn shadow-sm active:scale-[0.99]"
                                        >
                                            Enter Module Matrix 
                                            <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </motion.div>

                        {/* 🎛️ প্রিমিয়াম পেজিনেরশন কন্ট্রোল */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 pt-4 border-t border-slate-100">
                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:hover:text-slate-600 cursor-pointer transition-colors shadow-sm"
                                >
                                    <FiChevronLeft className="w-4 h-4" />
                                </button>
                                
                                <div className="text-xs font-bold px-4 text-slate-700">
                                    Page {page} of {totalPages}
                                </div>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:text-indigo-600 disabled:opacity-40 disabled:hover:text-slate-600 cursor-pointer transition-colors shadow-sm"
                                >
                                    <FiChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    // নো কোর্স বাটন এম্পটি স্টেট
                    <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 max-w-xl mx-auto space-y-4">
                        <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                            <FiBookOpen className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-bold text-sm text-slate-800">No active configurations found</h3>
                            <p className="text-xs text-slate-400 max-w-xs mx-auto">You have not registered or checked out any technical workspace matrices yet.</p>
                        </div>
                        <Link href="/courses" className="inline-flex items-center text-xs font-black px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-colors">
                            Explore Catalog Map
                        </Link>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyCourse;