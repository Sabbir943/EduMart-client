"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
    FiClock, FiStar, FiBookOpen, FiDollarSign, 
    FiHeart, FiThumbsUp, FiThumbsDown, FiAlertCircle, 
    FiSend, FiMessageSquare, FiUser, FiChevronLeft, FiX, FiCheckCircle
} from "react-icons/fi";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; 

interface Comment {
    id: string;
    username: string;
    text: string;
    createdAt: string;
}

interface Feedback {
    rating: number;
    user: string;
}

interface Course {
    _id: string;
    name: string;
    imgUrl: string;
    description: string;
    duration: string;
    rating: any; // 💡 ডাটাবেজের ডাইনামিক ফ্লোট/স্ট্রিং কাস্টিং হ্যান্ডেল করার জন্য any দেওয়া হলো
    price: any;  // 💡 ডাটাবেজের ডাইনামিক ফ্লোট/স্ট্রিং কাস্টিং হ্যান্ডেল করার জন্য any দেওয়া হলো
    category: string;
    courseType?: string;
    mentorEmail?: string; 
    interactions?: {
        likes: number;
        dislikes: number;
        love: number;
        reports: number;
        comments: Comment[];
        feedbacks?: Feedback[]; // 💡 ইন্টারফেসে ফিডব্যাক ডেটা স্ট্রাকচার যোগ করা হলো
    };
}

export default function CourseDetailsPage() {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [commentText, setCommentText] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    
    // 🎛️ Enrollment States
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [enrollLoading, setEnrollLoading] = useState(false);
    const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false); 
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 🔒 Better Auth Client Session Hook
    const { data: session, isPending } = authClient.useSession();

    // ১. কোর্সের বিস্তারিত তথ্য ফেচ করা
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

    // ২. ইউজার অলরেডি এনরোলড কি না তা ডেটাবেজ থেকে চেক করা
    const checkEnrollmentStatus = async () => {
        if (!id || !session?.user?.email) return;
        try {
            const res = await fetch(`http://localhost:8000/api/enrollments/check?courseId=${id}&userEmail=${session.user.email}`);
            const data = await res.json();
            if (data.success) {
                setIsAlreadyEnrolled(data.enrolled);
            }
        } catch (err) {
            console.error("Error checking enrollment status:", err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchCourseDetails();
        }
    }, [id]);

    useEffect(() => {
        if (id && session?.user?.email) {
            checkEnrollmentStatus();
        }
    }, [id, session]);

 const handleInteraction = async (type: string, payload?: any) => {
        if (!course) return;
        
        let targetPayload = payload;

        // 💡 MERN Stack Optimization: like অথবা love রিঅ্যাকশনের সময় ইউজারের সেশন ডেটা পে লোডে যুক্ত করা
        if (type === "like" || type === "love") {
            if (!session?.user?.email) {
                setErrorMessage("Please login to react or save this workspace artifacts.");
                setTimeout(() => setErrorMessage(null), 3000);
                return;
            }
            targetPayload = {
                email: session.user.email,
                username: session.user.name || "Anonymous Student"
            };
        }

        try {
            const res = await fetch(`http://localhost:8000/api/courses/${id}/interaction`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, payload: targetPayload }),
            });
            const data = await res.json();
            if (data.success) {
                fetchCourseDetails(); 
                if (type === "comment") setCommentText("");
            }
        } catch (error) {
            console.error("Interaction failed to sync with cloud map:", error);
        } finally {
            if (type === "comment") setSubmittingComment(false);
        }
    };

    // 🛠️ এনরোলমেন্ট কনফার্মেশন সাবমিট করা
    const handleEnrollment = async () => {
        if (!course || !session?.user) return;
        setEnrollLoading(true);
        setErrorMessage(null);

        const validMentorEmail = course.mentorEmail || (course as any).email || (course as any).userEmail || "admin@eduplatform.com";

        try {
            const res = await fetch("http://localhost:8000/api/enrollments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseId: course._id,
                    userEmail: session.user.email,
                    userName: session.user.name,
                    mentorEmail: validMentorEmail 
                })
            });

            const data = await res.json();

            if (data.success) {
                setSuccessMessage("Enrolled successfully in this workspace matrix!");
                setIsAlreadyEnrolled(true); 
                setShowEnrollModal(false);
                setTimeout(() => setSuccessMessage(null), 4000);
            } else {
                setErrorMessage(data.message || "Enrollment rejected by database server.");
            }
        } catch (err) {
            setErrorMessage("Failed to sync enrollment with database cloud.");
        } finally {
            setEnrollLoading(false);
        }
    };

    if (loading || isPending) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
                <FiAlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
                <h2 className="text-xl font-bold tracking-tight mb-2">Course Matrix Not Found</h2>
                <Link href="/courses" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 shadow-lg">
                    <FiChevronLeft /> Back to Catalog
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black pb-20 px-4 sm:px-6 lg:px-8 pt-10 relative">
            
            {/* Toasts */}
            <AnimatePresence>
                {(successMessage || errorMessage) && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-3 shadow-xl max-w-sm ${
                            successMessage ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                        }`}
                    >
                        {successMessage ? <FiCheckCircle className="w-5 h-5 shrink-0" /> : <FiAlertCircle className="w-5 h-5 shrink-0" />}
                        <span className="flex-1">{successMessage || errorMessage}</span>
                        <button onClick={() => { setSuccessMessage(null); setErrorMessage(null); }} className="p-1 hover:bg-black/5 rounded-lg text-slate-500 hover:text-black transition-colors"><FiX /></button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto space-y-10">
                
                <Link href="/courses" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
                    <FiChevronLeft className="w-4 h-4" /> Back to Catalog
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Left Frame */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-200 shadow-md group">
                            <img src={course.imgUrl} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
                            <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-[11px] font-black uppercase rounded-lg tracking-wider shadow-sm">
                                {course.category}
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-2xl sm:text-4xl font-black text-black tracking-tight capitalize leading-tight">{course.name}</h1>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{course.description}</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3">
                                <div className="p-2.5 bg-indigo-100 rounded-xl text-indigo-600"><FiClock className="w-5 h-5" /></div>
                                <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Duration</p><p className="text-sm font-bold text-black">{course.duration}</p></div>
                            </div>
                            
                            {/* 💡 ফিক্সড রেটিং ব্লক ট্যাগ পার্সিং এরর */}
                            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3">
                                <div className="p-2.5 bg-amber-100 rounded-xl text-amber-600"><FiStar className="w-5 h-5 fill-amber-500" /></div>
                                <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Rating</p><p className="text-sm font-bold text-black">{Number(course.rating || 5.0).toFixed(1)} / 5.0</p></div>
                            </div>

                            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex items-center gap-3 col-span-2 sm:col-span-1">
                                <div className="p-2.5 bg-emerald-100 rounded-xl text-emerald-600"><FiBookOpen className="w-5 h-5" /></div>
                                <div><p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Status</p><p className="text-sm font-bold text-black">{course.courseType || "Premium"}</p></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Card Panel */}
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-3xl shadow-lg space-y-6 lg:sticky lg:top-8">
                        <div>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Course Tuition Price</p>
                            <div className="flex items-baseline text-black font-black text-4xl tracking-tight">
                                <FiDollarSign className="text-slate-400 text-2xl -mr-1 self-center" />
                                <span>{course.courseType === "Free" ? "0.00" : Number(course.price || 0).toFixed(2)}</span>
                            </div>
                        </div>

                        <button 
                            disabled={isAlreadyEnrolled || (session?.user as any)?.role === "mentor"} 
                            onClick={() => {
                                if (!session) {
                                    setErrorMessage("Please login to register or checkout this workspace.");
                                    return;
                                }
                                setShowEnrollModal(true);
                            }}
                            className={`w-full py-4 font-black text-sm rounded-2xl shadow-md transition-all tracking-wide uppercase ${
                                isAlreadyEnrolled 
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-300 cursor-not-allowed shadow-none" 
                                : (session?.user as any)?.role === "mentor"
                                ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none" 
                                : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white cursor-pointer active:scale-[0.98]"
                            }`}
                        >
                            {isAlreadyEnrolled 
                                ? "Enrolled" 
                                : (session?.user as any)?.role === "mentor" 
                                ? "Mentor Account (Restricted)" 
                                : "Enroll Workspace Now"
                            }
                        </button>

                        <div className="border-t border-slate-200 pt-4">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mb-3 text-center">Community Reactions</p>
                            <div className="grid grid-cols-3 gap-2">
                                <button onClick={() => handleInteraction("love")} className="flex flex-col items-center gap-1 py-2.5 bg-white border border-slate-200 hover:border-pink-300 text-slate-600 hover:text-pink-600 rounded-xl transition-all font-bold text-xs cursor-pointer shadow-sm">
                                    <FiHeart className="w-4 h-4" /> <span>Love ({course.interactions?.love || 0})</span>
                                </button>
                                <button onClick={() => handleInteraction("like")} className="flex flex-col items-center gap-1 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 text-slate-600 hover:text-indigo-600 rounded-xl transition-all font-bold text-xs cursor-pointer shadow-sm">
                                    <FiThumbsUp className="w-4 h-4" /> <span>Like ({course.interactions?.likes || 0})</span>
                                </button>
                                <button onClick={() => handleInteraction("dislike")} className="flex flex-col items-center gap-1 py-2.5 bg-white border border-slate-200 hover:border-rose-300 text-slate-600 hover:text-rose-600 rounded-xl transition-all font-bold text-xs cursor-pointer shadow-sm">
                                    <FiThumbsDown className="w-4 h-4" /> <span>Dislike ({course.interactions?.dislikes || 0})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Discussion Board */}
                <div className="bg-slate-50 border border-slate-200 p-5 sm:p-8 rounded-3xl shadow-sm space-y-6">
                    <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4">
                        <FiMessageSquare className="w-5 h-5 text-indigo-600" />
                        <h2 className="text-lg font-bold tracking-tight text-black">
                            Discussion Board ({course.interactions?.comments?.length || 0})
                        </h2>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                            <FiUser className="w-4 h-4" />
                        </div>
                        <div className="flex-1 relative">
                            <textarea 
                                rows={3}
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts or queries regarding this module structure..."
                                className="w-full bg-white border border-slate-300 rounded-2xl p-4 pr-12 text-sm text-black placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all resize-y max-h-48 overflow-y-auto custom-scrollbar leading-relaxed"
                            />
                            <button 
                                disabled={!commentText.trim() || submittingComment}
                                onClick={() => {
                                    setSubmittingComment(true);
                                    handleInteraction("comment", { text: commentText, username: session?.user?.name || "Anonymous User" });
                                }}
                                className="absolute right-3.5 bottom-4 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-all shadow-md active:scale-95 cursor-pointer"
                            >
                                <FiSend className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 pt-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                            {course.interactions?.comments && course.interactions.comments.length > 0 ? (
                                [...course.interactions.comments].reverse().map((comment) => (
                                    <motion.div 
                                        key={comment.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-start gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-sm text-black"
                                    >
                                        <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-600 font-black text-xs shrink-0 uppercase">
                                            {comment.username ? comment.username.charAt(0) : "U"}
                                        </div>
                                        <div className="space-y-1.5 flex-1">
                                            <div className="flex items-baseline justify-between gap-2">
                                                <h4 className="text-xs font-bold text-slate-800 capitalize tracking-wide">{comment.username || "Anonymous"}</h4>
                                                <span className="text-[10px] text-slate-400 font-medium">
                                                    {new Date(comment.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                                                </span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed break-words whitespace-pre-line">{comment.text}</p>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-12 border border-dashed border-slate-200 rounded-3xl bg-slate-50">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Be the first to leave a constructive comment on this course workspace!</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>

            {/* Confirmation Enroll Modal */}
            <AnimatePresence>
                {showEnrollModal && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white border border-slate-200 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl text-center"
                        >
                            <div className="mx-auto w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 border border-indigo-100 mb-1">
                                <FiBookOpen className="w-6 h-6" />
                            </div>
                            <h3 className="font-extrabold text-base text-black tracking-tight">Confirm Enrollment</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Are you sure you want to enroll in <strong className="text-slate-800 capitalize">{course.name}</strong> workspace? This will save your entry configuration in our records.
                            </p>
                            
                            <div className="flex items-center justify-center gap-3 pt-2">
                                <button 
                                    type="button"
                                    onClick={() => setShowEnrollModal(false)} 
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleEnrollment} 
                                    disabled={enrollLoading}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                                >
                                    {enrollLoading ? "Enrolling..." : "Yes, Enroll"}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}