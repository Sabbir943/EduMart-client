"use client";

import React, { useState } from "react";
import { FiPlusCircle, FiLink, FiClock, FiDollarSign, FiStar, FiFileText, FiLayers, FiShield } from "react-icons/fi";

export default function AddCoursePage() {
  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    description: "",
    duration: "",
    rating: "5.0",
    price: "",
    category: "Web Development",
    courseType: "Premium", // নতুন যোগ করা টাইপ (Free/Premium)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // যদি টাইপ 'Free' সিলেক্ট করা হয়, তাহলে প্রাইজ অটোমেটিক ০ হয়ে যাবে
    if (name === "courseType" && value === "Free") {
      setFormData((prev) => ({ ...prev, [name]: value, price: "0" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("http://localhost:8000/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price) || 0,
          rating: parseFloat(formData.rating) || 5.0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Course added successfully to Workspace!" });
        setFormData({ 
          name: "", 
          imgUrl: "", 
          description: "", 
          duration: "", 
          rating: "5.0", 
          price: "", 
          category: "Web Development",
          courseType: "Premium"
        });
      } else {
        setMessage({ type: "error", text: data.message || "Failed to add course." });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Server connection failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-0">
      
      {/* Header section (High Contrast text) */}
      <div className="flex items-center gap-3 mt-4">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
          <FiPlusCircle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight sm:text-3xl">Create New Course</h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Fill out the specific fields below to publish a new course.</p>
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-2xl relative z-10">
        
        {/* Status Message */}
        {message.text && (
          <div className={`p-4 rounded-xl text-xs font-semibold border ${
            message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Course Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase">Course Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="e.g. Mastering Next.js App Router" className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Image URL link */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiLink className="w-3 h-3 text-slate-400" /> Image URL Link</label>
            <input type="url" name="imgUrl" value={formData.imgUrl} onChange={handleChange} required placeholder="https://images.unsplash.com/..." className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Course Duration */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiClock className="w-3 h-3 text-slate-400" /> Course Duration</label>
            <input type="text" name="duration" value={formData.duration} onChange={handleChange} required placeholder="e.g. 14 Hours or 4 Weeks" className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>

          {/* Category Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiLayers className="w-3 h-3 text-slate-400" /> Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer">
              <option value="Web Development" className="bg-slate-950 text-white">Web Development</option>
              <option value="UI/UX Design" className="bg-slate-950 text-white">UI/UX Design</option>
              <option value="App Development" className="bg-slate-950 text-white">App Development</option>
            </select>
          </div>

          {/* 🌟 New Field: Course Type (Free / Premium) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1">
              <FiShield className="w-3 h-3 text-slate-400" /> Access Tier
            </label>
            <select name="courseType" value={formData.courseType} onChange={handleChange} className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer">
              <option value="Premium" className="bg-slate-950 text-white">Premium (Paid)</option>
              <option value="Free" className="bg-slate-950 text-white">Free Course</option>
            </select>
          </div>

          {/* Course Price */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiDollarSign className="w-3 h-3 text-slate-400" /> Course Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={formData.price} 
              onChange={handleChange} 
              required 
              disabled={formData.courseType === "Free"}
              placeholder={formData.courseType === "Free" ? "0.00 (Free)" : "e.g. 49.99"} 
              step="0.01" 
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" 
            />
          </div>

          {/* Course Rating */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiStar className="w-3 h-3 text-slate-400" /> Initial Rating</label>
            <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="1.0" max="5.0" step="0.1" className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors" />
          </div>
        </div>

        {/* Course Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-200 tracking-wide uppercase flex items-center gap-1"><FiFileText className="w-3 h-3 text-slate-400" /> Course Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} placeholder="Write a comprehensive guide or breakdown of your course outline..." className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none" />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button type="submit" disabled={loading} className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 disabled:opacity-50 active:scale-95">
            {loading ? "Adding Course..." : "Add Course Workspace"}
          </button>
        </div>
      </form>
    </div>
  );
}