"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { FiBookOpen, FiClock, FiCalendar, FiArrowRight, FiActivity } from "react-icons/fi";
import Link from "next/link";

interface EnrolledCourse {
    enrollmentId: string;
    enrolledAt: string;
    _id: string;
    name: string;
    category: string;
    price: any;
    courseType?: string;
    duration: string;
}

const MyCart = () => {
    const { data: session, isPending: authPending } = authClient.useSession();
    const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEnrolledCourses = async () => {
        if (!session?.user?.email) return;
        setLoading(true);
        try {
            // ব্যাকএন্ডের ডাইনামিক এনরোলমেন্ট এপিআই রুট কল করা হচ্ছে
            const res = await fetch(
                `http://localhost:8000/api/student/my-courses?email=${session.user.email}&page=1&limit=20`
            );
            const data = await res.json();
            if (data.success) {
                setEnrolledCourses(data.courses || []);
            }
        } catch (error) {
            console.error("Failed to sync enrollment log matrix:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (session?.user?.email) {
            fetchEnrolledCourses();
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
            {/* ড্যাশবোর্ড হেডার */}
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
                    Enrolled Workspace
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Monitor your active classroom matrices, enrollment logs, and processing subscription timestamps.
                </p>
            </div>

            {/* ট্যাবুলার ডেটা কন্ট্রোলার */}
            {enrolledCourses && enrolledCourses.length > 0 ? (
                <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-black uppercase tracking-wider text-slate-500">
                                    <th className="py-4 px-6">Workspace Module</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Duration</th>
                                    <th className="py-4 px-6">Enrollment Timestamp</th>
                                    <th className="py-4 px-6 text-right">Action Workspace</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200/80 text-sm">
                                {enrolledCourses.map((item) => {
                                    const enrollDate = new Date(item.enrolledAt);
                                    const formattedDate = enrollDate.toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    });
                                    const formattedTime = enrollDate.toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });

                                    return (
                                        <tr key={item.enrollmentId} className="hover:bg-slate-50/80 transition-colors group">
                                            {/* কোর্স নেম */}
                                            <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate capitalize">
                                                {item.name}
                                            </td>
                                            {/* ক্যাটাগরি */}
                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                                                    {item.category}
                                                </span>
                                            </td>
                                            {/* ডিউরেশন */}
                                            <td className="py-4 px-6 font-semibold text-slate-600 flex items-center gap-1.5 pt-5">
                                                <FiClock className="w-3.5 h-3.5 text-slate-400" />
                                                {item.duration}
                                            </td>
                                            {/* ডেট এবং টাইমস্ট্যাম্প */}
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-bold text-slate-800 flex items-center gap-1">
                                                        <FiCalendar className="w-3.5 h-3.5 text-indigo-500" /> {formattedDate}
                                                    </span>
                                                    <span className="text-[11px] font-medium text-slate-400 pl-4">
                                                        {formattedTime}
                                                    </span>
                                                </div>
                                            </td>
                                            {/* অ্যাকশন বাটন লিংক */}
                                            <td className="py-4 px-6 text-right">
                                                <Link 
                                                    href={`/courses/${item._id}`}
                                                    className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl"
                                                >
                                                    Enter Class 
                                                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* এম্পটি ড্যাশবোর্ড স্টেট */
                <div className="text-center py-20 border border-dashed border-slate-200 rounded-3xl bg-slate-50/50 max-w-xl mx-auto space-y-4">
                    <div className="w-12 h-12 bg-slate-100 border border-slate-200 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                        <FiBookOpen className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-sm text-slate-800">No active enrollments detected</h3>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">You have not registered for any streams inside this database engine architecture yet.</p>
                    </div>
                    <Link href="/courses" className="inline-flex items-center text-xs font-black px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-colors">
                        Explore Catalog
                    </Link>
                </div>
            )}
        </div>
    );
};

export default MyCart;