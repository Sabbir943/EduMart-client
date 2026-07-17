"use client";

import React, { useState, useEffect } from "react";
import { FiActivity, FiUser, FiMail, FiCalendar, FiClock, FiLayers, FiAlertCircle } from "react-icons/fi";
import { authClient } from "@/lib/auth-client"; 

interface EnrollmentLog {
  _id: string;
  courseId: string;
  userEmail: string;
  userName: string;
  mentorEmail: string;
  enrolledAt: string;
}

export default function MentorBorrowedCoursesPage() {
  const [historyLogs, setHistoryLogs] = useState<EnrollmentLog[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Better Auth Client Session
  const { data: session, isPending } = authClient.useSession();

useEffect(() => {
    const fetchEnrollmentHistory = async () => {
      if (!session?.user?.email) return;
      try {
        setLoading(true);
        
        // 🛠️ ফিক্স: রোল অনুযায়ী সঠিক কোয়েরি প্যারামিটার পাঠানো হচ্ছে
        const userRole = (session.user as any).role;
        const paramType = userRole === "mentor" ? "mentorEmail" : "userEmail";
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/enrollments?${paramType}=${session?.user?.email}`);
        const data = await res.json();
        if (data.success) {
          setHistoryLogs(data.history || []);
        }
      } catch (err) {
        console.error("Failed to fetch transaction metrics:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchEnrollmentHistory();
    }
  }, [session, isPending]);

  if (loading || isPending) {
    return (
      <div className="min-h-[60vh] bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full mt-6 space-y-6 text-white max-w-7xl mx-auto px-4">
      
      {/* 📋 Header Widget */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-xl font-black text-white sm:text-2xl tracking-tight flex items-center gap-2">
            <FiActivity className="text-indigo-400" /> Enrollment & Purchase Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review live metrics of students who initialized workspace checkout parameters for your modules.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300">
          Total Workspace Orders: <span className="text-indigo-400 font-black">{historyLogs.length}</span>
        </div>
      </div>

      {/* 📊 Tabular Transaction Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Transaction ID</th>
                <th className="py-4 px-6">Student Workspace Info</th>
                <th className="py-4 px-6">Course Ref Block</th>
                <th className="py-4 px-6">Registration Date</th>
                <th className="py-4 px-6">Timestamp</th>
              </tr>
            </thead>
            {/* 🛠️ ফিক্স: এখানে বডির টেক্সট সম্পূর্ণ হোয়াইট এবং বোল্ড করা হয়েছে */}
            <tbody className="divide-y divide-slate-800 text-xs font-bold text-white">
              {historyLogs.length > 0 ? (
                historyLogs.map((log) => {
                  const dateObj = new Date(log.enrolledAt);
                  const formattedDate = dateObj.toLocaleDateString(undefined, { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  });
                  const formattedTime = dateObj.toLocaleTimeString(undefined, { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                  });

                  return (
                    <tr key={log._id} className="hover:bg-slate-800/40 transition-colors">
                      {/* Transaction ID Hash - Bold White */}
                      <td className="py-4 px-6 font-mono text-white select-all">
                        #{log._id.slice(-8).toUpperCase()}
                      </td>
                      
                      {/* User Information - Bold White */}
                      <td className="py-4 px-6 space-y-1">
                        <div className="flex items-center gap-1.5 text-white capitalize">
                          <FiUser className="text-slate-400" /> {log?.userName || "Anonymous Student"}
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300 text-[11px]">
                          <FiMail className="text-slate-400" /> {log?.userEmail}
                        </div>
                      </td>

                      {/* Course Identity */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-indigo-400 bg-indigo-950/50 border border-indigo-900/50 px-3 py-1 rounded-lg w-fit">
                          <FiLayers className="w-3.5 h-3.5" />
                          <span className="max-w-[200px] truncate">Course Core ID: {log?.courseId.slice(-6)}</span>
                        </div>
                      </td>

                      {/* Date - Bold White */}
                      <td className="py-4 px-6 text-white">
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="text-slate-400" /> {formattedDate}
                        </div>
                      </td>

                      {/* Time - Bold White */}
                      <td className="py-4 px-6 text-white">
                        <div className="flex items-center gap-1.5">
                          <FiClock className="text-slate-400" /> {formattedTime}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16 bg-slate-900">
                    <div className="flex flex-col items-center justify-center space-y-2 text-slate-500">
                      <FiAlertCircle className="w-8 h-8 text-slate-600 animate-pulse" />
                      <p className="text-xs font-bold uppercase tracking-wider">No transaction pipelines found.</p>
                      <p className="text-[11px] text-slate-400 max-w-xs">When a user purchases your modules, live ledger synchronization matrix parameters will appear here.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}