"use client";

import React, { useState, useEffect } from "react";
import { FiEdit2, FiTrash2, FiLayers, FiClock, FiDollarSign, FiX, FiAlertTriangle, FiCheck } from "react-icons/fi";

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
}

export default function MyCoursesDashboard() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modals Controller States
  const [editCourse, setEditCourse] = useState<Course | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/courses`);
      const data = await res.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error("Failed to fetch mentor course compilation:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  // --- Handle Delete Operation ---
  const handleDelete = async () => {
    if (!deleteId) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/courses/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.filter(c => c._id !== deleteId));
        setDeleteId(null);
      }
    } catch (err) {
      console.error("Delete call failed:", err);
    } finally {
      setActionLoading(false);
    }
  };

  // --- Handle Update Form Submission ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCourse) return;
    setActionLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/courses/${editCourse._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCourse),
      });
      const data = await res.json();
      if (data.success) {
        setCourses(courses.map(c => c._id === editCourse._id ? editCourse : c));
        setEditCourse(null);
      }
    } catch (err) {
      console.error("Update operation crash:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="w-full mt-6 space-y-6 text-slate-100 max-w-7xl mx-auto px-4">
      
      {/* Header Info */}
      <div>
        <h1 className="text-xl font-black text-white sm:text-2xl tracking-tight">My Managed Courses</h1>
        <p className="text-xs text-slate-400 mt-1">Easily update modifications, prices, access tiers, or delete uploaded modules from your terminal.</p>
      </div>

      {/* 📊 Tabular Data Grid Layout */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md relative z-10">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/60 border-b border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-5">Course Info</th>
                <th className="py-4 px-5">Category</th>
                <th className="py-4 px-5">Duration</th>
                <th className="py-4 px-5">Access Tier</th>
                <th className="py-4 px-5">Price</th>
                <th className="py-4 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-xs">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="py-5 px-5 bg-slate-900/10 h-16 border-b border-slate-800/30"></td>
                  </tr>
                ))
              ) : courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course._id} className="hover:bg-slate-950/30 transition-colors">
                    {/* Course Banner + Title */}
                    <td className="py-4 px-5 flex items-center gap-3">
                      <img src={course.imgUrl} alt={course.name} className="w-12 h-8 rounded-lg object-cover border border-slate-800" />
                      <span className="font-bold text-white max-w-xs truncate capitalize">{course.name}</span>
                    </td>
                    {/* Category */}
                    <td className="py-4 px-5 text-slate-300 font-medium">{course.category}</td>
                    {/* Duration */}
                    <td className="py-4 px-5 text-slate-400 flex items-center gap-1.5 pt-6"><FiClock className="text-indigo-400" /> {course.duration}</td>
                    {/* Access Type Badge */}
                    <td className="py-4 px-5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${course.courseType === "Free" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"}`}>
                        {course.courseType || "Premium"}
                      </span>
                    </td>
                    {/* Price */}
                    <td className="py-4 px-5 font-black text-white flex items-center gap-0.5 pt-6"><FiDollarSign className="text-slate-500" /> {course.courseType === "Free" ? "0.00" : Number(course.price).toFixed(2)}</td>
                    {/* Actions Controller */}
                    <td className="py-4 px-5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => setEditCourse(course)} className="p-2 bg-indigo-500/10 hover:bg-indigo-500 text-indigo-400 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer" title="Edit Course Specs">
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => setDeleteId(course._id)} className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-lg transition-all active:scale-95 cursor-pointer" title="Delete Course">
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 font-medium">No courses have been published by your mentor log yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⚠️ MODAL: Delete Safe Confirmation Box */}
      {deleteId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 bg-rose-500/10 rounded-xl border border-rose-500/20"><FiAlertTriangle className="w-5 h-5" /></div>
              <h3 className="font-extrabold text-base text-white">Confirm Removal</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">Are you absolutely sure you want to terminate this course config model? This destructive workspace matrix operation cannot be undone.</p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleDelete} disabled={actionLoading} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/10 transition-colors cursor-pointer disabled:opacity-40">{actionLoading ? "Deleting..." : "Yes, Delete"}</button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 MODAL: Edit & Update Form Sheet */}
      {editCourse && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={handleUpdate} className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-white tracking-tight">Edit Course Configuration</h3>
              <button type="button" onClick={() => setEditCourse(null)} className="p-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 rounded-lg transition-colors cursor-pointer"><FiX className="w-4 h-4" /></button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Course Name</label>
                <input type="text" value={editCourse.name} onChange={e => setEditCourse({...editCourse, name: e.target.value})} required className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-normal focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Image Cover URL</label>
                <input type="url" value={editCourse.imgUrl} onChange={e => setEditCourse({...editCourse, imgUrl: e.target.value})} required className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-normal focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Duration</label>
                <input type="text" value={editCourse.duration} onChange={e => setEditCourse({...editCourse, duration: e.target.value})} required className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-normal focus:outline-none focus:border-indigo-500" />
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Category</label>
                <select value={editCourse.category} onChange={e => setEditCourse({...editCourse, category: e.target.value})} className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer">
                  <option value="Web Development" className="bg-slate-950">Web Development</option>
                  <option value="UI/UX Design" className="bg-slate-950">UI/UX Design</option>
                  <option value="App Development" className="bg-slate-950">App Development</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Access Tier</label>
                <select value={editCourse.courseType || "Premium"} onChange={e => setEditCourse({...editCourse, courseType: e.target.value, price: e.target.value === "Free" ? 0 : editCourse.price})} className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer">
                  <option value="Premium" className="bg-slate-950">Premium (Paid)</option>
                  <option value="Free" className="bg-slate-950">Free Course</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-slate-300 uppercase tracking-wide">Price ($)</label>
                <input type="number" step="0.01" disabled={editCourse.courseType === "Free"} value={editCourse.price} onChange={e => setEditCourse({...editCourse, price: parseFloat(e.target.value) || 0})} required className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-normal focus:outline-none focus:border-indigo-500 disabled:opacity-30 disabled:cursor-not-allowed" />
              </div>
            </div>

            <div className="space-y-1 text-xs font-semibold">
              <label className="text-slate-300 uppercase tracking-wide">Course Description</label>
              <textarea rows={4} value={editCourse.description} onChange={e => setEditCourse({...editCourse, description: e.target.value})} required className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-normal focus:outline-none focus:border-indigo-500 resize-none leading-relaxed" />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-800">
              <button type="button" onClick={() => setEditCourse(null)} className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer">Close</button>
              <button type="submit" disabled={actionLoading} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/10 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40">{actionLoading ? "Saving..." : <><FiCheck /> Save Changes</>}</button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}