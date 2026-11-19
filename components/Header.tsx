"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Menu, X, Flame } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS } from "@/data/content";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-royal-black/95 backdrop-blur-md py-2.5 sm:py-3 shadow-lg border-b border-royal-border"
          : "bg-royal-black/80 backdrop-blur-sm py-3 sm:py-4 border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-1.5 sm:gap-2 group focus:outline-none focus-visible-gold rounded-lg py-1 pr-1 shrink min-w-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shadow-sm group-hover:border-royal-gold transition-colors shrink-0">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-royal-gold transition-transform group-hover:scale-110" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-xl font-bold tracking-wide text-white truncate">
                Royal <span className="text-royal-gold">Kitchen</span> Solution
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-widest uppercase text-gray-400 truncate">
                Chimney Care Specialists
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-200 hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded px-1 py-0.5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={BUSINESS_INFO.callLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[44px]"
            >
              <Phone className="w-4 h-4 fill-royal-black" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Right Controls: Only Hamburger menu since bottom bar already has Call Now */}
          <div className="flex items-center lg:hidden shrink-0 ml-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2 sm:p-2.5 rounded-xl bg-royal-card border border-royal-border text-gray-200 hover:text-royal-gold focus:outline-none focus-visible-gold min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center shrink-0 shadow-sm"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-royal-black/98 border-b border-royal-border px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-royal-gold hover:bg-white/5 transition-colors focus:outline-none focus-visible-gold min-h-[44px] flex items-center"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.callLink}
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-royal-gold text-royal-black font-semibold text-base transition-colors focus:outline-none focus-visible-gold min-h-[48px]"
            >
              <Phone className="w-5 h-5 fill-royal-black" />
              <span>Call Now: {BUSINESS_INFO.displayPhone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base transition-colors focus:outline-none focus-visible-gold min-h-[48px]"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
