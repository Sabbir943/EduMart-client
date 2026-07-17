"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { 
  FiSliders, FiHeart, FiThumbsUp, FiThumbsDown, 
  FiMessageSquare, FiStar, FiX, FiActivity, FiMessageCircle
} from "react-icons/fi";

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
  category: string;
  mentorEmail: string;
  interactions?: {
    likes: number;
    dislikes: number;
    love: number;
    reports: number;
    comments?: Comment[];
    feedbacks?: Feedback[];
  };
}

export default function ManageCoursePage() {
  const { data: sessionData, isPending } = authClient.useSession();
  const user = sessionData?.user;

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 🔘 Popup Modal States
  const [activeModal, setActiveModal] = useState<{
    type: "comments" | "feedbacks";
    courseName: string;
    data: any[];
  } | null>(null);

  // 🔄 কারেন্ট লগইন থাকা মেন্টরের নিজস্ব কোর্স ডাটাবেজ থেকে ফেচ করা
  useEffect(() => {
    const fetchMentorCourses = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/mentor/courses?email=${user.email}`);
        const data = await res.json();
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (err) {
        console.error("Failed to load mentor intelligence matrix:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending && user?.email) {
      fetchMentorCourses();
    }
  }, [user, isPending]);

  if (isPending || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-950 text-white">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-0 pt-4 text-white">
      
      {/* Top Identity Framework Panel */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
          <FiSliders className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">Course Management Hub</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Audit student reactions, comments, and deployment logs in real-time.</p>
        </div>
      </div>

      {/* Tabular Interaction Ledger */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-black tracking-wider text-slate-400 uppercase">
                <th className="py-4 px-6">Course Artifact</th>
                <th className="py-4 px-4 text-center"><span className="flex items-center justify-center gap-1.5"><FiHeart className="text-pink-500 fill-pink-500/10" /> Love</span></th>
                <th className="py-4 px-4 text-center"><span className="flex items-center justify-center gap-1.5"><FiThumbsUp className="text-indigo-400" /> Likes</span></th>
                <th className="py-4 px-4 text-center"><span className="flex items-center justify-center gap-1.5"><FiThumbsDown className="text-rose-400" /> Dislikes</span></th>
                <th className="py-4 px-6 text-center"><span className="flex items-center justify-center gap-1.5"><FiActivity className="w-3.5 h-3.5 text-emerald-400" /> Analysis Streams</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm font-medium text-slate-200">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-800/30 transition-colors">
                    
                    {/* Course Title Context */}
                    <td className="py-4 px-6">
                      <p className="text-sm font-bold text-white capitalize tracking-tight">{course.name}</p>
                      <span className="text-[10px] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md mt-1 inline-block font-bold uppercase tracking-wider">{course.category}</span>
                    </td>
                    
                    {/* Reaction Metrics Cells */}
                    <td className="py-4 px-4 text-center font-extrabold text-pink-400">{course.interactions?.love || 0}</td>
                    <td className="py-4 px-4 text-center font-extrabold text-indigo-400">{course.interactions?.likes || 0}</td>
                    <td className="py-4 px-4 text-center font-extrabold text-slate-400">{course.interactions?.dislikes || 0}</td>
                    
                    {/* Review Popups Launchers */}
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        {/* Comments Modal Trigger */}
                        <button 
                          onClick={() => setActiveModal({
                            type: "comments",
                            courseName: course.name,
                            data: course.interactions?.comments || []
                          })}
                          className="px-3 py-1.5 bg-slate-950 border border-slate-800/80 hover:border-indigo-500/50 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 text-slate-300 hover:text-white"
                        >
                          <FiMessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Comments ({course.interactions?.comments?.length || 0})</span>
                        </button>

                        {/* Feedbacks Modal Trigger */}
                        <button 
                          onClick={() => setActiveModal({
                            type: "feedbacks",
                            courseName: course.name,
                            data: course.interactions?.feedbacks || []
                          })}
                          className="px-3 py-1.5 bg-slate-950 border border-slate-800/80 hover:border-amber-500/50 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 text-slate-300 hover:text-white"
                        >
                          <FiStar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Reviews ({course.interactions?.feedbacks?.length || 0})</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-500 font-bold tracking-wide uppercase text-xs">
                    No active course matrix pipelines registered under your mentor signature.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔮 Dynamic Core Overlay Dialog Engine */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative border-t-indigo-500/30">
            
            {/* Close Switch */}
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-slate-950 border border-slate-800/80 rounded-xl hover:text-rose-400 transition-colors cursor-pointer"
            >
              <FiX className="w-4 h-4" />
            </button>

            {/* Modal Header Metadata */}
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${activeModal.type === 'comments' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-amber-500/10 text-amber-400'}`}>
                {activeModal.type === 'comments' ? <FiMessageCircle className="w-5 h-5" /> : <FiStar className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-black text-lg tracking-tight text-white capitalize">{activeModal.type} Terminal</h3>
                <p className="text-[11px] text-slate-400 font-medium mt-0.5 max-w-xs sm:max-w-sm truncate">Course: {activeModal.courseName}</p>
              </div>
            </div>

            {/* Content Feed Scroller */}
            <div className="max-h-72 overflow-y-auto space-y-3 pr-1 border-t border-slate-800/80 pt-4 custom-scrollbar">
              {activeModal.data.length > 0 ? (
                activeModal.data.map((item, index) => (
                  <div key={index} className="bg-slate-950/70 border border-slate-800/50 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="text-indigo-400">@{item.username || item.user || "Anonymous Student"}</span>
                      {activeModal.type === "feedbacks" && (
                        <span className="flex items-center gap-0.5 text-amber-400 font-black bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                          {item.rating} <FiStar className="fill-amber-400 w-3 h-3 inline ml-0.5" />
                        </span>
                      )}
                    </div>
                    {activeModal.type === "comments" && (
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">{item.text}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-600 text-xs font-bold uppercase tracking-wider">
                  No tracking signals captured inside this interface link yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}