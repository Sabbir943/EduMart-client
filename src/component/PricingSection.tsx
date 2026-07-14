"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiZap, FiStar, FiShield } from "react-icons/fi";

const PRICING_PLANS = [
  {
    id: "starter",
    name: "Student Pass",
    badge: "Flexible",
    icon: FiZap,
    priceMonthly: "$0",
    priceYearly: "$0",
    description: "Perfect for exploring the platform and trying out rented course materials.",
    features: [
      { name: "Access to free course previews", included: true },
      { name: "Pay-as-you-go Course Rentals (Borrowing)", included: true },
      { name: "Standard community Q&A forum access", included: true },
      { name: "Standard video playback speed (1x)", included: true },
      { name: "Downloadable course completion certificates", included: false },
      { name: "Direct mentor 1-on-1 messaging", included: false },
    ],
    buttonText: "Get Started Free",
    buttonVariant: "outline",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro Learner",
    badge: "Most Popular",
    icon: FiStar,
    priceMonthly: "$29",
    priceYearly: "$24",
    billingNote: "per month, billed annually",
    description: "Ideal for committed students looking for unlimited rentals and career progress.",
    features: [
      { name: "Unlimited Course Borrowing (Rentals)", included: true },
      { name: "Full lifetime purchase discounts (20% OFF)", included: true },
      { name: "Downloadable completion certificates", included: true },
      { name: "Priority mentor Q&A response", included: true },
      { name: "Offline video downloading (Mobile & Web)", included: true },
      { name: "Direct mentor 1-on-1 messaging", included: false },
    ],
    buttonText: "Start 7-Day Free Trial",
    buttonVariant: "primary",
    popular: true,
  },
  {
    id: "lifetime",
    name: "Mentor & Unlimited",
    badge: "Best Value",
    icon: FiShield,
    priceMonthly: "$79",
    priceYearly: "$65",
    billingNote: "per month, billed annually",
    description: "Complete platform access for aspiring mentors, creators, and power learners.",
    features: [
      { name: "Unlimited lifetime access to all core courses", included: true },
      { name: "Mentor Course Creation & Publishing tools", included: true },
      { name: "1-on-1 direct messaging with top mentors", included: true },
      { name: "Verified Mentor / Pro Learner Profile Badge", included: true },
      { name: "24/7 Dedicated Priority Customer Support", included: true },
      { name: "Early access to new course drops", included: true },
    ],
    buttonText: "Upgrade to Ultimate",
    buttonVariant: "dark",
    popular: false,
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="pricing">
      
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 inline-block"
          >
            Flexible & Fair Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Invest in Your Career Path
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400 text-base sm:text-lg"
          >
            Choose a plan tailored to your learning goals. Borrow individual courses or unlock unlimited access with membership.
          </motion.p>

          {/* Billing Toggle Switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            viewport={{ once: true }}
            className="pt-4 flex items-center justify-center gap-4"
          >
            <span className={`text-sm font-medium ${!isYearly ? "text-white" : "text-gray-400"}`}>
              Monthly
            </span>
            
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-8 bg-slate-800 border border-slate-700 rounded-full p-1 transition-colors relative focus:outline-none"
            >
              <motion.div
                animate={{ x: isYearly ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-6 h-6 bg-indigo-500 rounded-full shadow-md"
              />
            </button>

            <span className={`text-sm font-medium flex items-center gap-1.5 ${isYearly ? "text-white" : "text-gray-400"}`}>
              Annual
              <span className="text-[10px] uppercase tracking-wider font-bold bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">
                Save 20%
              </span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PRICING_PLANS.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                  plan.popular
                    ? "bg-slate-800/90 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20"
                    : "bg-slate-800/40 border border-slate-700/60 hover:border-slate-600"
                } backdrop-blur-xl`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg border border-indigo-400">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-700/50 border border-slate-600 text-indigo-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    {!plan.popular && (
                      <span className="text-xs text-gray-400 font-medium px-2.5 py-1 bg-slate-700/30 rounded-full border border-slate-700">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-400 leading-relaxed">{plan.description}</p>

                  {/* Price */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      {isYearly ? plan.priceYearly : plan.priceMonthly}
                    </span>
                    <span className="text-sm font-medium text-gray-400">/ month</span>
                  </div>
                  {isYearly && plan.billingNote && (
                    <p className="text-xs text-indigo-300 mt-1">{plan.billingNote}</p>
                  )}

                  {/* Divider */}
                  <div className="my-6 border-t border-slate-700/60" />

                  {/* Feature List */}
                  <ul className="space-y-3.5 text-sm">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        {feature.included ? (
                          <FiCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                        ) : (
                          <FiX className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? "text-gray-200" : "text-gray-500 line-through"}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Action Button */}
                <div className="mt-8 pt-4">
                  <button
                    className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md ${
                      plan.buttonVariant === "primary"
                        ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30"
                        : plan.buttonVariant === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-white"
                        : "bg-transparent border border-slate-600 hover:bg-slate-800 text-gray-200"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}