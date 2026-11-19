"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_DATA, FaqItem } from "@/data/content";

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First open by default

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-royal-light text-royal-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <HelpCircle className="w-4 h-4 text-royal-gold" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-black tracking-tight mb-4">
            Common Questions &amp; Answers
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-sm sm:text-base text-royal-muted leading-relaxed">
            Everything you need to know about our chimney cleaning, maintenance, and repair
            services.
          </p>
        </div>

        {/* Accessible Accordion */}
        <div className="space-y-4">
          {FAQ_DATA.map((item: FaqItem, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm transition-colors duration-200 hover:border-royal-gold/40"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible-gold min-h-[52px]"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-royal-black leading-snug">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-royal-surface flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-royal-gold/20 text-royal-gold" : "text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                    className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 animate-in fade-in duration-200"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
