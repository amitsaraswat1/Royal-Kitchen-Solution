"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Eye, Sparkles } from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/content";

// TODO: Replace demo images with real work photos before publishing.
export default function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const closeModal = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const showNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! + 1) % GALLERY_ITEMS.length);
  }, [selectedIdx]);

  const showPrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx(
      (prev) => (prev! - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
    );
  }, [selectedIdx]);

  // Keyboard navigation: Esc to close, Arrow keys to navigate
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, closeModal, showNext, showPrev]);

  return (
    <section id="gallery" className="py-20 sm:py-24 bg-royal-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-royal-gold" />
            <span>Visual Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            Chimney Service Gallery
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
            Explore snapshots of grease removal, baffle filter degreasing, motor diagnosis,
            and flawless modern kitchen chimney installations.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item: GalleryItem, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIdx(idx)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedIdx(idx);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open photo of ${item.title}`}
              className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-royal-gold/60 cursor-pointer shadow-premium-dark transition-all duration-300 focus:outline-none focus-visible-gold"
            >
              <Image
                src={item.image}
                alt={`${item.title} - Royal Kitchen Solution`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-royal-black/90 via-royal-black/30 to-transparent group-hover:opacity-90 transition-opacity" />

              {/* Demo Image Badge (Required by prompt) */}
              {item.isDemo && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 rounded-full bg-royal-black/85 border border-royal-gold/40 text-[11px] font-medium text-royal-gold shadow-sm backdrop-blur-sm">
                    Demo image
                  </span>
                </div>
              )}

              {/* Category pill */}
              <div className="absolute top-4 right-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold text-white">
                  {item.category}
                </span>
              </div>

              {/* Bottom Info & Preview icon */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-3">
                <div>
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-royal-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                    {item.description}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-royal-gold text-royal-black flex items-center justify-center shrink-0 shadow-gold group-hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={closeModal}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            aria-label="Close image lightbox"
            className="absolute top-5 right-5 z-50 p-3 rounded-full bg-royal-card border border-royal-border text-white hover:text-royal-gold focus:outline-none focus-visible-gold min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 z-50 p-3 rounded-full bg-royal-card border border-royal-border text-white hover:text-royal-gold focus:outline-none focus-visible-gold min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 z-50 p-3 rounded-full bg-royal-card border border-royal-border text-white hover:text-royal-gold focus:outline-none focus-visible-gold min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[55vh] sm:h-[65vh] rounded-2xl overflow-hidden border border-royal-border bg-royal-black">
              <Image
                src={GALLERY_ITEMS[selectedIdx].image}
                alt={GALLERY_ITEMS[selectedIdx].title}
                fill
                sizes="(max-width: 1024px) 100vw, 80vw"
                className="object-contain"
              />
              
              {GALLERY_ITEMS[selectedIdx].isDemo && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/80 border border-royal-gold/40 text-xs font-medium text-royal-gold">
                    Demo image
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 text-center text-white">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1">
                {GALLERY_ITEMS[selectedIdx].title}
              </h3>
              <p className="text-sm text-gray-300">
                {GALLERY_ITEMS[selectedIdx].description}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Use Left / Right arrow keys to navigate, Esc to close
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
