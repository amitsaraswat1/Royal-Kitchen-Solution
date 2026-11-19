"use client";

import React, { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { BUSINESS_INFO } from "@/data/content";

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop Floating Action Buttons (Bottom Right) */}
      <aside
        aria-label="Quick contact shortcuts"
        className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none"
      >
        {/* Scroll to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="pointer-events-auto p-3 rounded-full bg-royal-card/90 hover:bg-royal-card border border-white/20 text-white hover:text-royal-gold shadow-lg backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-w-[44px] min-h-[44px] flex items-center justify-center hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Floating Button */}
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp with Royal Kitchen Solution"
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm shadow-xl hover:shadow-2xl transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px] hover:-translate-y-1 active:scale-95 group"
        >
          <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
          <span className="font-semibold tracking-wide">WhatsApp Booking</span>
        </a>

        {/* Direct Call Floating Button */}
        <a
          href={BUSINESS_INFO.callLink}
          aria-label="Call Royal Kitchen Solution helpline"
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-bold text-sm shadow-gold hover:shadow-gold-glow transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px] hover:-translate-y-1 active:scale-95 group"
        >
          <Phone className="w-5 h-5 fill-royal-black group-hover:scale-110 transition-transform" />
          <span className="tracking-wide">Call Helpline</span>
        </a>
      </aside>

      {/* Mobile Fixed Bottom Bar (Fixed sticky bar for phone & WhatsApp) */}
      <nav
        aria-label="Mobile quick actions"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-royal-black/95 border-t border-royal-border backdrop-blur-md px-3 py-2.5 shadow-2xl"
      >
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          {/* Call Now */}
          <a
            href={BUSINESS_INFO.callLink}
            aria-label="Call Royal Kitchen Solution"
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-royal-gold text-royal-black font-bold text-sm shadow-sm active:scale-95 focus:outline-none focus-visible-gold min-h-[48px]"
          >
            <Phone className="w-4 h-4 fill-royal-black" />
            <span>Call Now</span>
          </a>

          {/* WhatsApp */}
          <a
            href={BUSINESS_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Royal Kitchen Solution"
            className="flex items-center justify-center gap-2 px-3 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-sm active:scale-95 focus:outline-none focus-visible-gold min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </>
  );
}
