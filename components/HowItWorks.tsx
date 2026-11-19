"use client";

import React from "react";
import { PhoneForwarded, Calendar, Home, CheckCircle2 } from "lucide-react";
import { HOW_IT_WORKS, StepItem } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  PhoneForwarded: <PhoneForwarded className="w-6 h-6 text-royal-gold" />,
  Calendar: <Calendar className="w-6 h-6 text-royal-gold" />,
  Home: <Home className="w-6 h-6 text-royal-gold" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-royal-gold" />,
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-white text-royal-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <span>Seamless Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            How It Works
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-royal-muted leading-relaxed">
            Getting your kitchen chimney professionally cleaned or repaired is quick and
            hassle-free in just 4 simple steps.
          </p>
        </div>

        {/* 4 Steps Timeline */}
        <div className="relative">
          {/* Horizontal connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-royal-gold/30 via-royal-gold to-royal-gold/30 -translate-y-8 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS.map((step: StepItem, idx) => (
              <div
                key={step.stepNumber}
                className="bg-royal-surface rounded-2xl p-6 border border-gray-200/80 hover:border-royal-gold/50 transition-all duration-300 flex flex-col items-center text-center group shadow-sm hover:shadow-md"
              >
                {/* Step badge & icon: White box with gold border as requested */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-royal-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    {iconMap[step.iconName] || <CheckCircle2 className="w-6 h-6 text-royal-gold" />}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-royal-gold text-royal-black text-xs font-bold flex items-center justify-center shadow">
                    {idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-black mb-2 group-hover:text-royal-gold transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
