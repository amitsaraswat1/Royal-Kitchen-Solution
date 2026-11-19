"use client";

import React from "react";
import { MessageSquareQuote, AlertCircle } from "lucide-react";
import { TESTIMONIALS_DATA, TestimonialItem } from "@/data/content";

export default function Testimonials() {
  // Gracefully hide section automatically if array is empty
  if (!TESTIMONIALS_DATA || TESTIMONIALS_DATA.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 sm:py-24 bg-white text-royal-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <MessageSquareQuote className="w-4 h-4 text-royal-gold" />
            <span>Customer Feedback</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-royal-muted leading-relaxed">
            We value honest feedback from every homeowner we serve.
          </p>

          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Section ready for real reviews. Placeholders marked below.</span>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((item: TestimonialItem) => (
            <div
              key={item.id}
              className="bg-royal-surface rounded-2xl p-7 border border-gray-200/90 hover:border-royal-gold/50 transition-all duration-300 flex flex-col justify-between shadow-sm relative group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-white border border-royal-gold/30 flex items-center justify-center text-royal-gold mb-4 shadow-sm">
                  <MessageSquareQuote className="w-5 h-5" />
                </div>

                <p className="text-sm text-gray-700 leading-relaxed italic mb-6">
                  &ldquo;{item.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-semibold text-royal-black">
                    {item.customerName}
                  </h4>
                  <span className="text-[11px] text-gray-500">{item.dateNote}</span>
                </div>

                {item.isPlaceholder && (
                  <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-medium text-[10px]">
                    Placeholder
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
