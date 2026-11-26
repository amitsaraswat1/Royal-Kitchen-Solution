"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  MessageSquareQuote,
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  MapPin,
} from "lucide-react";
import { TESTIMONIALS_DATA, TestimonialItem } from "@/data/content";

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  const totalItems = TESTIMONIALS_DATA?.length ?? 0;

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Clamp currentIndex if screen resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play slider
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, maxIndex, handleNext]);

  // Gracefully hide section automatically if array is empty
  if (!TESTIMONIALS_DATA || totalItems === 0) {
    return null;
  }

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 bg-white text-royal-text overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <MessageSquareQuote className="w-4 h-4 text-royal-gold" />
            <span>Customer Feedback</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            Customer Reviews
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-5 rounded-full" />

          <p className="text-base sm:text-lg text-royal-muted leading-relaxed mb-6">
            Trusted by homeowners across Delhi NCR for clean, reliable &amp; prompt chimney care.
          </p>

          {/* Overall Rating Summary Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-royal-surface border border-royal-gold/30 shadow-xs">
            <div className="flex items-center gap-1" aria-label="4.9 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-royal-gold fill-royal-gold"
                />
              ))}
            </div>
            <span className="text-sm font-bold text-royal-black">
              4.9 <span className="text-gray-500 font-normal">/ 5.0</span>
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
              <BadgeCheck className="w-4 h-4 text-emerald-600" />
              Verified Doorstep Reviews
            </span>
          </div>
        </div>

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows (Desktop & Tablet) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous review"
            className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-royal-black hover:bg-royal-black hover:text-royal-gold hover:border-royal-gold transition-all duration-200 focus:outline-none focus-visible-gold"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next review"
            className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-royal-black hover:bg-royal-black hover:text-royal-gold hover:border-royal-gold transition-all duration-200 focus:outline-none focus-visible-gold"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slider Track Viewport */}
          <div className="overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              }}
            >
              {TESTIMONIALS_DATA.map((item: TestimonialItem) => (
                <div
                  key={item.id}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <article className="h-full bg-royal-surface rounded-2xl p-6 sm:p-7 border border-gray-200/90 hover:border-royal-gold/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between shadow-sm">
                    <div>
                      {/* Top Row: Stars & Quote Icon */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1.5">
                          <div
                            className="flex items-center gap-0.5"
                            aria-label={`${item.rating} out of 5 stars`}
                          >
                            {[...Array(5)].map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className={`w-4 h-4 ${
                                  starIdx < item.rating
                                    ? "text-royal-gold fill-royal-gold"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-royal-black ml-1">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="w-9 h-9 rounded-xl bg-white border border-royal-gold/30 flex items-center justify-center text-royal-gold shadow-xs shrink-0">
                          <MessageSquareQuote className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Service Taken Pill */}
                      <div className="mb-3.5">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-semibold">
                          {item.serviceTaken}
                        </span>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-700 leading-relaxed mb-6">
                        &ldquo;{item.reviewText}&rdquo;
                      </p>
                    </div>

                    {/* Footer: Customer Details */}
                    <div className="pt-4 border-t border-gray-200/70 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-royal-black text-royal-gold font-bold text-xs flex items-center justify-center shrink-0 border border-royal-gold/40">
                          {getInitials(item.customerName)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold text-sm text-royal-black truncate">
                              {item.customerName}
                            </h4>
                            <BadgeCheck
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              aria-label="Verified Customer"
                            />
                          </div>
                          <p className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-royal-gold shrink-0" />
                            <span className="truncate">{item.location}</span>
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] text-gray-500 font-medium whitespace-nowrap shrink-0">
                        {item.dateNote}
                      </span>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Controls: Mobile Arrows + Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous review"
              className="md:hidden w-9 h-9 rounded-full bg-royal-surface border border-gray-300 flex items-center justify-center text-royal-black hover:bg-royal-black hover:text-royal-gold transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? "w-8 bg-royal-gold"
                      : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next review"
              className="md:hidden w-9 h-9 rounded-full bg-royal-surface border border-gray-300 flex items-center justify-center text-royal-black hover:bg-royal-black hover:text-royal-gold transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
