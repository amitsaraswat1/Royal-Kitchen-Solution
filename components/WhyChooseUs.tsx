"use client";

import React from "react";
import {
  BadgeCheck,
  Users,
  Tag,
  PhoneCall,
  CheckCircle,
  Headphones,
} from "lucide-react";
import { WHY_CHOOSE_US, WhyChooseItem } from "@/data/content";

const iconMap: Record<string, React.ReactNode> = {
  BadgeCheck: <BadgeCheck className="w-6 h-6 text-royal-gold" />,
  Users: <Users className="w-6 h-6 text-royal-gold" />,
  Tag: <Tag className="w-6 h-6 text-royal-gold" />,
  PhoneCall: <PhoneCall className="w-6 h-6 text-royal-gold" />,
  CheckCircle: <CheckCircle className="w-6 h-6 text-royal-gold" />,
  Headphones: <Headphones className="w-6 h-6 text-royal-gold" />,
};

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 sm:py-24 bg-royal-dark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <span>Our Commitment</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Why Choose Royal Kitchen Solution
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            We deliver honest, dependable kitchen chimney care with convenient doorstep
            assistance, clear communication, and skilled handling.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item: WhyChooseItem) => (
            <div
              key={item.id}
              className="dark-luxury-card rounded-2xl p-7 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-royal-black border border-royal-gold/30 flex items-center justify-center mb-6 group-hover:border-royal-gold transition-colors shadow-inner">
                  {iconMap[item.iconName] || <BadgeCheck className="w-6 h-6 text-royal-gold" />}
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-royal-gold transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-royal-gold/90 font-medium">
                <span>Verified Service Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
