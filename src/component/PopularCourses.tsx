"use client";

import React, { useState, useEffect } from "react";
import { FiClock, FiTag, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface PopularCourse {
    _id: string;
    name: string;
    category: string;
    price: any;
    duration: string;
    image?: string;
    enrollmentCount: number;
}

const PopularCourses = () => {
    const [courses, setCourses] = useState<PopularCourse[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularCourses = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/courses/popular`);
                const data = await res.json();
                if (data.success) {
                    setCourses(data.courses || []);
                }
            } catch (error) {
                console.error("Failed to fetch pipeline tracking matrices:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopularCourses();
    }, []);

    if (loading) {
        return (
            <div className="py-12 text-center">
                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
        );
    }

    if (courses.length === 0) return null; // যদি কোনো এনরোলমেন্ট ডাটা না থাকে সেকশনটি হাইড থাকবে

    return (
        <section className="py-16 bg-white text-black border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                
                {/* সেকশন হেডার */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase rounded-lg tracking-wider">
                            <FiTrendingUp className="w-3.5 h-3.5" /> Analytics Choice
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                            Most Popular Workspaces
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-500 max-w-xl font-medium">
                            Join the highest density student enrollment channels inside our continuous academic matrix.
                        </p>
                    </div>
                    <Link 
                        href="/courses" 
                        className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-xl self-start sm:self-auto"
                    >
                        View All Catalog <FiArrowRight />
                    </Link>
                </div>

                {/* কোর্সের ৩টি গ্রিড কার্ড */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div 
                            key={course._id} 
                            className="group border border-slate-200 rounded-3xl overflow-hidden bg-white hover:shadow-xl hover:border-slate-300 transition-all flex flex-col justify-between"
                        >
                            <div className="p-5 space-y-4">
                                {/* ক্যাটাগরি এবং স্টুডেন্ট কাউন্ট ব্যাজ */}
                                <div className="flex items-center justify-between gap-2">
                                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                                        {course.category}
                                    </span>
                                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                                        {course.enrollmentCount} Enrolled
                                    </span>
                                </div>

                                {/* কোর্সের নাম */}
                                <h3 className="font-black text-base text-slate-900 group-hover:text-indigo-600 transition-colors tracking-tight capitalize line-clamp-2 min-h-[48px]">
                                    {course.name}
                                </h3>

                                {/* ডিউরেশন ও মেটা ডাটা */}
                                <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 pt-1">
                                    <span className="flex items-center gap-1">
                                        <FiClock className="w-3.5 h-3.5 text-slate-400" /> {course.duration}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FiTag className="w-3.5 h-3.5 text-slate-400" /> Premium Module
                                    </span>
                                </div>
                            </div>

                            {/* ফুটারে প্রাইস এবং এন্ট্রি বাটন */}
                            <div className="p-5 pt-0 border-t border-slate-100/80 bg-slate-50/40 flex items-center justify-between gap-4">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tuition Fee</span>
                                    <span className="font-black text-slate-900 text-base">
                                        {course.price === 0 || course.price === "0" || !course.price ? "Free" : `$${course.price}`}
                                    </span>
                                </div>
                                <Link 
                                    href={`/courses/${course._id}`}
                                    className="inline-flex items-center gap-1.5 text-xs font-black text-white bg-slate-900 hover:bg-indigo-600 rounded-xl px-4 py-2.5 shadow-sm transition-all"
                                >
                                    Explore Matrix
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default PopularCourses;