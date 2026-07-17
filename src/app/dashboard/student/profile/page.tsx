"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { FiUser, FiMail, FiShield, FiEdit3, FiCheck, FiX, FiCamera, FiLoader } from "react-icons/fi";

const ProfilePage = () => {
    const { data: session, isPending: authPending } = authClient.useSession();
    
    // 🎛️ Profile States
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [updating, setUpdating] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    // সেশন থেকে ডাটা ইনপুটে পুশ করা
    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
        }
    }, [session]);

    // 💾 Profile Update Request Handler
    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !session?.user?.email) return;

        setUpdating(true);
        setMessage(null);

        try {
            // আমাদের কাস্টম ব্যাকএন্ড এপিআই-তে রিকোয়েস্ট পাঠানো হচ্ছে
            const res = await fetch("http://localhost:8000/api/user/update-profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: session.user.email,
                    name: name,
                    image: image
                }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage({ type: "success", text: "Profile matrix updated successfully!" });
                setIsEditing(false);
                
                // সেশন ক্লায়েন্ট রিফ্রেশ করার জন্য পেজটি ১ সেকেন্ড পর রিলোড হবে
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                setMessage({ type: "error", text: data.message || "Failed to sync credentials." });
            }
        } catch (err) {
            setMessage({ type: "error", text: "Database connection rejection error." });
        } finally {
            setUpdating(false);
        }
    };

    if (authPending) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center bg-white">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const userRole = (session?.user as any)?.role || "student";

    return (
        <div className="min-h-screen bg-white text-black p-4 sm:p-6 lg:p-8">
            {/* হেডার */}
            <div className="mb-8 space-y-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2.5">
                    Account Profile
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Manage your personal identity configurations, profile metadata, and security parameters.
                </p>
            </div>

            {/* নোটিফিকেশন টোস্ট */}
            {message && (
                <div className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-bold border ${
                    message.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : "bg-rose-50 border-rose-200 text-rose-700"
                }`}>
                    {message.text}
                </div>
            )}

            <div className="max-w-3xl border border-slate-200 rounded-3xl p-6 sm:p-8 bg-white shadow-sm space-y-8">
                {/* প্রোফাইল প্রাকদর্শন এরিয়া */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-200">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden text-3xl font-black uppercase">
                            {session?.user?.image ? (
                                <img src={session.user.image} alt={name} className="w-full h-full object-cover" />
                            ) : (
                                session?.user?.name?.charAt(0) || "U"
                            )}
                        </div>
                        {isEditing && (
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                                <FiCamera className="w-4 h-4" />
                            </div>
                        )}
                    </div>

                    <div className="text-center sm:text-left space-y-1.5 flex-1">
                        <h2 className="text-xl font-black text-slate-900 capitalize tracking-tight">
                            {session?.user?.name}
                        </h2>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                            <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase rounded-lg tracking-wide flex items-center gap-1">
                                <FiShield className="w-3 h-3" /> {userRole}
                            </span>
                            <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-lg flex items-center gap-1">
                                <FiMail className="w-3 h-3" /> {session?.user?.email}
                            </span>
                        </div>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-black text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                        >
                            <FiEdit3 className="w-3.5 h-3.5" /> Edit Profile
                        </button>
                    )}
                </div>

                {/* প্রোফাইল এডিট ফর্ম */}
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* ইনপুট: নাম */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <FiUser className="w-3.5 h-3.5" /> Identity Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={!isEditing || updating}
                                className={`w-full text-sm font-bold bg-white border rounded-2xl p-3.5 text-black focus:outline-none transition-all ${
                                    isEditing
                                        ? "border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
                                        : "border-slate-200 bg-slate-50/60 cursor-not-allowed text-slate-600"
                                }`}
                                placeholder="Enter full identity name"
                            />
                        </div>

                        {/* ইনপুট: ইমেজ ইউআরএল */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <FiCamera className="w-3.5 h-3.5" /> Avatar Stream URL
                            </label>
                            <input
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                disabled={!isEditing || updating}
                                className={`w-full text-sm font-bold bg-white border rounded-2xl p-3.5 text-black focus:outline-none transition-all ${
                                    isEditing
                                        ? "border-indigo-600 focus:ring-2 focus:ring-indigo-600/10"
                                        : "border-slate-200 bg-slate-50/60 cursor-not-allowed text-slate-600"
                                }`}
                                placeholder="https://example.com/photo.jpg"
                            />
                        </div>
                    </div>

                    {/* এডিট অ্যাকশন কন্ট্রোলস */}
                    {isEditing && (
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setName(session?.user?.name || "");
                                    setImage(session?.user?.image || "");
                                    setMessage(null);
                                }}
                                disabled={updating}
                                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                                <FiX className="w-3.5 h-3.5" /> Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={updating || !name.trim()}
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                            >
                                {updating ? (
                                    <>
                                        <FiLoader className="w-3.5 h-3.5 animate-spin" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <FiCheck className="w-3.5 h-3.5" /> Confirm Changes
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;