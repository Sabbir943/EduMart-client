"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiClock, FiStar, FiBookOpen, FiDollarSign, 
    FiHeart, FiThumbsUp, FiThumbsDown, FiAlertCircle, 
    FiSend, FiMessageSquare, FiUser, FiChevronLeft 
} from "react-icons/fi";
import Link from "next/link";

interface Course {
    _id: string;
    name: string;
    imgUrl: string;
    description: string;
    duration: string;
    rating: number;
    price: number;
    category: string;
    courseType?: string;
    interactions?: {
        likes: number;
        dislikes: number;
        love: number;
        reports: number;
        comments: Array<{
            id: string;
            username: string;
            text: string;
            createdAt: string;
        }>;
    };
}

export default function CourseDetailsPage() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);

    const fetchCourseDetails = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/courses/${id}`);
            const data = await res.json();
            if (data.success) {
                setCourse(data.course);
            }
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchCourseDetails();
    }, [id]);

    const handleInteraction = async (type: string, payload?: any) => {
        if (!course) return;
        try {
            const res = await fetch(`http://localhost:8000/api/courses/${id}/interaction`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, payload }),
            });
            const data = await res.json();
            if (data.success) {
                fetchCourseDetails(); // ডাটা রিফ্রেশ করুন
                if (type === "comment") setCommentText("");
            }
        } catch (error) {
            console.error("Interaction failed:", error);
        } finally {
            if (type === "comment") setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
                <FiAlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
                <h2 className="text-xl font-bold tracking-tight mb-2">Course Matrix Not Found</h2>
                <p className="text-slate-400 text-sm mb-6 text-center max-w-sm">The course configuration you are looking for does not exist or has been removed.</p>
                <Link href="/courses" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg">
                    <FiChevronLeft /> Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 px-4 sm:px-6 lg:px-8 pt-10">
            <div className="max-w-6xl mx-auto space-y-10">
                
                {/* 🔙 Back Button */}
                <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-indigo-400 transition-colors bg-slate-900/50 border border-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-md">
                    <FiChevronLeft className="w-4 h-4" /> Back to Catalog
                </Link>

                {/* 💎 Hero Main Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left: Banner Cover & Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl group">
                            <img src={course.imgUrl} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                            <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600/90 text-white text-[11px] font-black uppercase rounded-lg tracking-wider backdrop-blur-sm shadow-md">
                                {course.category}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight capitalize leading-tight">
                                {course.name}
                            </h1>
                            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-normal">
                                {course.description}
                            </p>
                        </div>

                        {/* Stats Info Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400"><FiClock className="w-5 h-5" /></div>
                                <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Duration</p><p className="text-sm font-bold text-white">{course.duration}</p></div>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3">
                                <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400"><FiStar className="w-5 h-5 fill-amber-400/20" /></div>
                                <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Rating</p><p className="text-sm font-bold text-white">{Number(course.rating).toFixed(1)} / 5.0</p></div>
                            </div>
                            <div className="bg-slate-900/60 border border-slate-800 p-3.5 rounded-2xl flex items-center gap-3 col-span-2 sm:col-span-1">
                                <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400"><FiBookOpen className="w-5 h-5" /></div>
                                <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Status</p><p className="text-sm font-bold text-white">{course.courseType || "Premium"}</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Dynamic Interaction Card */}
                    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6 lg:sticky lg:top-8">
                        <div>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Course Tuition Price</p>
                            <div className="flex items-baseline text-white font-black text-4xl tracking-tight">
                                <FiDollarSign className="text-slate-500 text-2xl -mr-1 self-center" />
                                <span>{course.courseType === "Free" ? "0.00" : Number(course.price).toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-sm rounded-2xl shadow-xl shadow-indigo-600/20 transition-all active:scale-[0.98] tracking-wide uppercase">
                            Enroll Workspace Now
                        </button>

                        <div className="border-t border-slate-800/80 pt-4">
                            <p className="text-[10px] text-slate-500 font-black uppercase tracking-wider mb-3 text-center">Community Reactions</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => handleInteraction("love")} className="flex flex-col items-center gap-1 py-2.5 bg-slate-950 border border-slate-800/80 hover:border-pink-500/40 hover:bg-pink-500/5 text-slate-400 hover:text-pink-400 rounded-xl transition-all font-bold text-xs">
                                    <FiHeart className="w-4 h-4" /> <span>Love ({course.interactions?.love || 0})</span>
                                </button>
                                <button onClick={() => handleInteraction("like")} className="flex flex-col items-center gap-1 py-2.5 bg-slate-950 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-indigo-500/5 text-slate-400 hover:text-indigo-400 rounded-xl transition-all font-bold text-xs">
                                    <FiThumbsUp className="w-4 h-4" /> <span>Like ({course.interactions?.likes || 0})</span>
                                </button>
                                <button onClick={() => handleInteraction("dislike")} className="flex flex-col items-center gap-1 py-2.5 bg-slate-950 border border-slate-800/80 hover:border-rose-500/40 hover:bg-rose-500/5 text-slate-400 hover:text-rose-400 rounded-xl transition-all font-bold text-xs">
                                    <FiThumbsDown className="w-4 h-4" /> <span>Dislike ({course.interactions?.dislikes || 0})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 💬 Discussion Board Section */}
                <div className="bg-slate-900/50 border border-slate-800/80 p-5 sm:p-8 rounded-3xl shadow-xl backdrop-blur-md space-y-6">
                    <div className="flex items-center gap-2.5 border-b border-slate-800/80 pb-4">
                        <FiMessageSquare className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-lg font-bold tracking-tight text-white">
                            Discussion Board ({course.interactions?.comments?.length || 0})
                        </h2>
                    </div>

                    {/* Comment Input Control */}
                    <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <div className="flex-1 relative">
                            <textarea 
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts or queries regarding this module structure..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 pr-12 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none leading-relaxed"
                            />
                            <button 
                                disabled={!commentText.trim() || submittingComment}
                                onClick={() => {
                                    setSubmittingComment(true);
                                    handleInteraction("comment", { text: commentText });
                                }}
                                className="absolute right-3.5 bottom-4 p-2 bg-indigo-600 disabled:opacity-30 disabled:bg-slate-800 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-md active:scale-95"
                            >
                                <FiSend className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Comments Render Area */}
                    <div className="space-y-4 pt-2">
                        <AnimatePresence mode="popLayout">
                            {course.interactions?.comments && course.interactions.comments.length > 0 ? (
                                [...course.interactions.comments].reverse().map((comment) => (
                                    <motion.div 
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-start gap-3.5 bg-slate-950/60 border border-slate-850 p-4 rounded-2xl"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs shrink-0 uppercase">
                                            {comment.username.charAt(0)}
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-baseline gap-2">
                                                <h4 className="text-xs font-bold text-slate-200 capitalize">{comment.username}</h4>
                                                <span className="text-[10px] text-slate-500 font-medium">
                                                    {new Date(comment.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">{comment.text}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-10 border border-dashed border-slate-800 rounded-2xl bg-slate-950/20">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Be the first to leave a constructive comment on this course workspace!</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}