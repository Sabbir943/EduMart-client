"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { FiHeart, FiThumbsUp, FiBookOpen, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

interface Course {
    _id: string;
    name: string;
    category: string;
    price: number;
    courseType?: string;
    duration: string;
    interactions?: {
        likes: number;
        love: number;
    };
}

const SavedCourse = () => {
    const { data: session, isPending: authPending } = authClient.useSession();
    const [savedCourses, setSavedCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSavedCourses = async () => {
        if (!session?.user?.email) return;
        setLoading(true);
        try {
            // ব্যাকএন্ডের কুয়েরি প্যারামিটার (email এবং username) অনুযায়ী ডেটা ফেচ করা হচ্ছে
            const res = await fetch(
                `http://localhost:8000/api/student/saved-courses?email=${session.user.email}&username=${session.user.name || ""}`
            );
            const data = await res.json();
            if (data.success) {
                setSavedCourses(data.courses || []);
            }
        } catch (error) {
            console.error("Error resolving saved course schema matrix:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchSavedCourses();
        }
    }, [session]);

    if (authPending || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-4 sm:p-6 lg:p-8">
            {/* হেডার এরিয়া */}
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
                    Saved Artifacts
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    View and manage courses you have interacted with via likes, loves, or bookmarked streams.
                </p>
            </div>

            {/* ট্যাবুলার ডাটা ভিউ */}
            {savedCourses && savedCourses.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                                    <th className="py-4 px-6">Course Directory</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Tuition Price</th>
                                    <th className="py-4 px-6 text-center">Interactions</th>
                                    <th className="py-4 px-6 text-right">Workspace Metrics</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/80 text-sm">
                                {savedCourses.map((course) => (
                                    <tr key={course._id} className="hover:bg-slate-50/80 transition-colors group">
                                        {/* কোর্স নেম */}
                                        <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate capitalize">
                                            {course.name}
                                        </td>
                                        {/* ক্যাটাগরি */}
                                        <td className="py-4 px-6">
                                            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                                                {course.category}
                                            </span>
                                        </td>
                                        {/* প্রাইস */}
                                        <td className="py-4 px-6 font-semibold text-slate-700">
                                            {course.courseType === "Free" ? (
                                                <span className="text-emerald-600 font-bold">Free</span>
                                            ) : (
                                                `$${Number(course.price || 0).toFixed(2)}`
                                            )}
                                        </td>
                                        {/* মেটা রিঅ্যাকশন কাউন্টার */}
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500">
                                                <span className="flex items-center gap-1 text-pink-600">
                                                    <FiHeart className="fill-pink-500 w-4 h-4" /> 
                                                    {course.interactions?.love || 0}
                                                </span>
                                                <span className="flex items-center gap-1 text-indigo-600">
                                                    <FiThumbsUp className="fill-indigo-500/20 w-4 h-4" /> 
                                                    {course.interactions?.likes || 0}
                                                </span>
                                            </div>
                                        </td>
                                        {/* অ্যাকশন লিংক */}
                                        <td className="py-4 px-6 text-right">
                                            <Link 
                                                href={`/courses/${course._id}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl"
                                            >
                                                View Module 
                                                <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* এম্পটি স্টেট */
                <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 max-w-xl mx-auto space-y-4">
                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                        <FiHeart className="w-5 h-5 text-rose-400" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-sm text-slate-800">Your bookmark register is empty</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">Courses you interact with or express interest in will be compiled inside this workspace infrastructure.</p>
                    </div>
                    <Link href="/courses" className="inline-flex items-center text-xs font-black px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-colors">
                        Explore Modules
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SavedCourse;