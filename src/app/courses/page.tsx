"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiSearch, FiFilter, FiTrendingUp, FiClock,
    FiStar, FiChevronLeft, FiChevronRight, FiEye,
    FiDollarSign
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
    courseType?: string; // Free or Premium
}

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            try {
                // 🛠️ ফিক্সড কোয়েরি বিল্ডার: ডেটা যাতে আনডিফাইনড না যায়
                const params: Record<string, string> = {
                    page: page.toString(),
                    limit: "6",
                    sort: sort || "default"
                };

                if (search.trim()) params.search = search.trim();
                if (category && category !== "All") params.category = category;

                const query = new URLSearchParams(params);

                const res = await fetch(`http://localhost:8000/api/courses?${query.toString()}`);
                
                // 🛠️ HTML রেসপন্স ক্র্যাশ গার্ড: রেসপন্স টাইপ চেক করা
                const contentType = res.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    console.error("Backend did not return JSON! Check server logs.");
                    setCourses([]);
                    return;
                }

                const data = await res.json();

                if (data.success && Array.isArray(data.courses)) {
                    setCourses(data.courses);
                    setTotalPages(data.totalPages || 1);
                } else {
                    setCourses([]);
                }
            } catch (error) {
                console.error("Failed to fetch courses:", error);
                setCourses([]);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchCourses();
        }, 400); // 💡 ডিবউন্স টাইম সামান্য বাড়িয়ে ৪০০ms করা হলো স্মুথ টাইপিং এক্সপেরিয়েন্সের জন্য

        return () => clearTimeout(delayDebounce);
    }, [page, search, category, sort]);

    const handleFilterChange = (type: string, value: string) => {
        if (type === "category") setCategory(value);
        if (type === "sort") setSort(value);
        if (type === "search") setSearch(value);
        setPage(1);
    };

    return (
        <div className="w-full mt-10 space-y-8 max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">

            {/* 🛠️ Glassmorphic Filter & Search Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-2xl shadow-2xl relative z-10 backdrop-blur-md">

                {/* Search Control */}
                <div className="relative group">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by course name..."
                        value={search}
                        onChange={(e) => handleFilterChange("search", e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative group">
                    <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <select
                        value={category}
                        onChange={(e) => handleFilterChange("category", e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                        <option value="All" className="bg-slate-950 text-white">All Categories</option>
                        <option value="Web Development" className="bg-slate-950 text-white">Web Development</option>
                        <option value="UI/UX Design" className="bg-slate-950 text-white">UI/UX Design</option>
                        <option value="App Development" className="bg-slate-950 text-white">App Development</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px] bg-slate-950 pl-2🚀">▼</div>
                </div>

                {/* Sort Rule Selector */}
                <div className="relative group sm:col-span-2 lg:col-span-1">
                    <FiTrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-400 transition-colors w-4 h-4" />
                    <select
                        value={sort}
                        onChange={(e) => handleFilterChange("sort", e.target.value)}
                        className="w-full pl-11 pr-10 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
                    >
                        <option value="default" className="bg-slate-950 text-white">Sort Options (Default)</option>
                        <option value="price-low" className="bg-slate-950 text-white">Price: Low to High</option>
                        <option value="price-high" className="bg-slate-950 text-white">Price: High to Low</option>
                        <option value="rating" className="bg-slate-950 text-white">Highest Rated</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px] bg-slate-950 pl-2">▼</div>
                </div>
            </div>

            {/* 🎨 Cards Grid Layout */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, idx) => (
                        <div key={idx} className="h-[390px] bg-slate-900/30 border border-slate-800 rounded-2xl animate-pulse" />
                    ))}
                </div>
            ) : (
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                    <AnimatePresence mode="popLayout">
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <motion.div
                                    key={course._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    whileHover={{ y: -5 }}
                                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-[390px] transition-all duration-300 group shadow-md hover:shadow-xl text-black"
                                >
                                    {/* Thumbnail Cover Image */}
                                    <div className="relative h-44 w-full bg-gray-100 overflow-hidden shrink-0 border-b border-gray-100">
                                        <img
                                            src={course.imgUrl}
                                            alt={course.name}
                                            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                                        />

                                        {/* 🏷️ Left: Category Badge */}
                                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white tracking-wider uppercase shadow-sm backdrop-blur-sm">
                                            {course.category}
                                        </span>

                                        {/* 🌟 Right: Dynamic Free / Premium Badge */}
                                        <span className={`absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase shadow-sm ${course.courseType === "Free"
                                                ? "bg-emerald-500 text-white"
                                                : "bg-indigo-600 text-white"
                                            }`}>
                                            {course.courseType || "Premium"}
                                        </span>
                                    </div>

                                    {/* Body Text Specs Area */}
                                    <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                                        <div className="space-y-1.5">
                                            <h3 className="font-bold text-sm text-gray-900 tracking-tight capitalize group-hover:text-indigo-600 transition-colors line-clamp-1">
                                                {course.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-normal">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* Meta Status indicators */}
                                        <div className="flex items-center justify-between text-[11px] font-semibold pt-2 border-t border-gray-100">
                                            <span className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2.5 py-0.5 rounded-md">
                                                <FiClock className="w-3.5 h-3.5 text-indigo-500" /> {course.duration}
                                            </span>
                                            <span className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-md">
                                                <FiStar className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {Number(course.rating).toFixed(1)}
                                            </span>
                                        </div>

                                        {/* Pricing and Action Footer */}
                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
                                            <div className="flex items-center text-gray-900 font-black text-base tracking-tight">
                                                <FiDollarSign className="w-3.5 h-3.5 text-gray-500 -mr-0.5" />
                                                <span>
                                                    {course.courseType === "Free" ? "0.00" : Number(course.price).toFixed(2)}
                                                </span>
                                            </div>
                                            <Link
                                                href={`/courses/${course._id}`}
                                                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-indigo-600/10 active:scale-95 cursor-pointer"
                                            >
                                                <FiEye className="w-3.5 h-3.5" />
                                                <span>View Details</span>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-16 text-center text-xs font-medium text-slate-500 border border-dashed border-slate-800 rounded-2xl bg-slate-900/10----">
                                No active courses match your filter parameters.
                            </div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* 🎛️ Pagination Row */}
            {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-5 pt-4 relative z-10">
                    <button
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-30 rounded-xl text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold shadow-lg cursor-pointer"
                    >
                        <FiChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <span className="text-xs text-slate-400 font-medium bg-slate-900/80 px-4 py-1.5 rounded-xl border border-slate-800/60">
                        Page <strong className="text-white mx-1">{page}</strong> of {totalPages}
                    </span>

                    <button
                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 disabled:opacity-30 rounded-xl text-slate-300 transition-colors flex items-center gap-1 text-xs font-bold shadow-lg cursor-pointer"
                    >
                        Next <FiChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}