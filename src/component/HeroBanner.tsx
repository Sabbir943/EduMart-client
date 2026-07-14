"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// Icons
import { FiSearch, FiBookOpen, FiUsers, FiAward, FiStar, FiArrowRight } from "react-icons/fi";

// Mock Slide Data
const SLIDES = [
  {
    id: 1,
    badge: "🚀 Unlock Your Potential",
    title: "Master New Skills with Top Industry Mentors",
    subtitle: "Explore 1,000+ courses in Web Development, AI, Design, and Business. Learn at your own pace with lifetime or rental access.",
    stat1: "50k+",
    stat1Label: "Active Students",
    stat2: "1.2k+",
    stat2Label: "Top Mentors",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    badge: "💡 Flexible Learning Options",
    title: "Borrow or Buy Courses on Your Own Terms",
    subtitle: "Short on budget? Rent courses for short-term access or buy full lifetime access. Knowledge should be accessible to everyone.",
    stat1: "98%",
    stat1Label: "Satisfaction Rate",
    stat2: "500+",
    stat2Label: "Borrowable Courses",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    badge: "🌟 Become an Instructor",
    title: "Share Your Expertise & Mentor Thousands",
    subtitle: "Join our community of elite educators. Create impactful courses, inspire passionate learners worldwide, and grow your personal brand.",
    stat1: "4.9/5",
    stat1Label: "Average Rating",
    stat2: "$2M+",
    stat2Label: "Mentor Earnings",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function HeroBanner() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white overflow-hidden py-12 lg:py-20">
      
      {/* Background Decorative Gradient Blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".swiper-custom-pagination" }}
          loop={true}
          className="hero-swiper"
        >
          {SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px]">
                
                {/* Left Content Side */}
                <div className="lg:col-span-7 space-y-6 text-left">
                  
                  {/* Badge */}
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 backdrop-blur-md">
                    {slide.badge}
                  </span>

                  {/* Dynamic CTA Heading */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
                    {slide.title}
                  </h1>

                  {/* Subtext */}
                  <p className="text-base sm:text-lg text-indigo-100 max-w-2xl leading-relaxed font-normal">
                    {slide.subtitle}
                  </p>

                  {/* Quick Search Field */}
                  <form onSubmit={handleSearch} className="pt-2 max-w-xl">
                    <div className="relative flex items-center bg-white/10 border border-white/20 rounded-2xl p-1.5 backdrop-blur-lg focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
                      <FiSearch className="w-5 h-5 text-indigo-200 ml-3 shrink-0" />
                      <input
                        type="text"
                        placeholder="What do you want to learn today? (e.g., Next.js, UI/UX)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-indigo-200/70 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="shrink-0 bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-lg"
                      >
                        <span>Search</span>
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {/* Quick Stats Grid */}
                  <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-indigo-700/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/20">
                        <FiUsers className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-white">{slide.stat1}</p>
                        <p className="text-xs text-indigo-200">{slide.stat1Label}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/20">
                        <FiAward className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-white">{slide.stat2}</p>
                        <p className="text-xs text-indigo-200">{slide.stat2Label}</p>
                      </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/20">
                        <FiStar className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xl sm:text-2xl font-bold text-white">4.9 Stars</p>
                        <p className="text-xs text-indigo-200">10k+ Reviews</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right Image / Card Display Side */}
                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="relative w-full max-w-md lg:max-w-none h-80 sm:h-96 lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                    
                    {/* Background Graphic Image */}
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Floating Badge Card */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500 rounded-lg text-white">
                          <FiBookOpen className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-indigo-200 font-medium">Featured Platform</p>
                          <p className="text-sm font-semibold text-white">Interactive Hands-on Learning</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Swiper Pagination Dots Styling Container */}
        <div className="swiper-custom-pagination flex justify-center gap-2 mt-8" />
      </div>

      {/* Custom Styles for Pagination */}
      <style jsx global>{`
        .swiper-custom-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .swiper-custom-pagination .swiper-pagination-bullet-active {
          width: 32px;
          background: #6366f1;
        }
      `}</style>
    </section>
  );
}