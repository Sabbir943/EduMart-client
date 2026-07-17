"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { FiBookOpen, FiClock, FiCalendar, FiArrowRight, FiTrash2, FiAlertCircle, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
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

    // 🎛️ Unenroll Modal States
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState<{ id: string; name: string } | null>(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchEnrolledCourses = async () => {
        if (!session?.user?.email) return;
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER}/api/student/my-courses?email=${session.user.email}&page=1&limit=20`
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

    // 🗑️ Handle Unenrollment Function
    const handleUnenroll = async () => {
        if (!selectedEnrollment) return;
        setDeleteLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/student/enrollments/${selectedEnrollment.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.success) {
                // স্টেট থেকে ইনস্ট্যান্ট রিমুভ করা
                setEnrolledCourses(prev => prev.filter(item => item.enrollmentId !== selectedEnrollment.id));
                setShowDeleteModal(false);
                setSelectedEnrollment(null);
            }
        } catch (error) {
            console.error("Unenrollment request failed:", error);
        } finally {
            setDeleteLoading(false);
        }
    };

    if (authPending || loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black p-4 sm:p-6 lg:p-8 relative">
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
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    });
                                    const formattedTime = enrollDate.toLocaleTimeString(undefined, {
                                        hour: '2-digit', minute: '2-digit'
                                    });

                                    return (
                                        <tr key={item.enrollmentId} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="py-4 px-6 font-bold text-slate-900 max-w-xs truncate capitalize">
                                                {item.name}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-semibold text-slate-600">
                                                <div className="flex items-center gap-1.5">
                                                    <FiClock className="w-3.5 h-3.5 text-slate-400" />
                                                    {item.duration}
                                                </div>
                                            </td>
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
                                            <td className="py-4 px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* 🚨 রিমুভ বাটন */}
                                                    <button 
                                                        onClick={() => {
                                                            setSelectedEnrollment({ id: item.enrollmentId, name: item.name });
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="p-2 text-slate-400 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                                                        title="Drop Module"
                                                    >
                                                        <FiTrash2 className="w-4 h-4" />
                                                    </button>
                                                    <Link 
                                                        href={`/courses/${item._id}`}
                                                        className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 hover:text-indigo-700 transition-colors bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-xl"
                                                    >
                                                        Enter Class 
                                                        <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
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

            {/* 🛠️ কনফার্মেশন মডাল (Confirmation Modal with Framer Motion) */}
            <AnimatePresence>
                {showDeleteModal && selectedEnrollment && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-200 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center"
                        >
                            <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-600 border border-rose-100 mb-1">
                                <FiAlertCircle className="w-6 h-6 animate-pulse" />
                            </div>
                            <h3 className="font-extrabold text-base text-black tracking-tight">Drop Matrix Workspace?</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Are you sure you want to cancel enrollment for <strong className="text-slate-800 capitalize">{selectedEnrollment.name}</strong>? This will wipe your access credentials from this segment.
                            </p>
                            
                            <div className="flex items-center justify-center gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => { setShowDeleteModal(false); setSelectedEnrollment(null); }} 
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                                    disabled={deleteLoading}
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleUnenroll} 
                                    disabled={deleteLoading}
                                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    {deleteLoading ? "Processing..." : "Yes, Drop Course"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MyCart;