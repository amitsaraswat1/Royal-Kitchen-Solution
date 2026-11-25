"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Wrench,
  Flame,
  ArrowRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import Gallery from "@/components/Gallery";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-royal-bg text-royal-text flex flex-col font-sans">
      {/* 1. Global Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - MATCHING HOME, SERVICES & PRICING
        ========================================================================= */}
        <section
          id="gallery-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Shree Balaji Electronics Kitchen Chimney Work Gallery"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
            />
            {/* Asymmetric layered gradients so the Indian chimney on the right is clearly visible while text on the left stays crisp */}
            <div className="absolute inset-0 bg-gradient-to-r from-royal-black/95 via-royal-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-royal-black/80 via-transparent to-royal-black/20" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-royal-gold/10 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              {/* Top badge with official logo mark */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-royal-card/90 border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                <div className="relative w-5 h-5 rounded-md overflow-hidden bg-royal-black shrink-0">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Shree Balaji Electronics Icon"
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </div>
                <span>Service Portfolio &amp; Visual Showcase</span>
              </div>

              {/* Breadcrumb Navigation in Dark */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-royal-gold transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="text-royal-gold font-medium">Gallery</span>
              </nav>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Kitchen Chimney{" "}
                <span className="text-royal-gold italic block sm:inline">
                  Work &amp; Service Gallery
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                Explore real snapshots of oil degreasing, baffle filter restoration, 100%
                copper motor rewinding, and modern chimney installations delivered with
                precision across Delhi NCR.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call For Service</span>
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp Booking</span>
                </a>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <span>Explore Services</span>
                </Link>
              </div>

              {/* Quality Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/15 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-royal-gold" />
                  <span>Real Doorstep Photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-royal-gold" />
                  <span>30-Day Work Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-royal-gold" />
                  <span>Caustic-Free Organic Degreasing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTERACTIVE GALLERY COMPONENT
        ========================================================================= */}
        <Gallery />

        {/* =========================================================================
            4. WORK TRANSFORMATION SHOWCASE
        ========================================================================= */}
        <section className="py-16 sm:py-20 bg-white text-royal-text">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
                <Wrench className="w-4 h-4 text-royal-gold" />
                <span>Our Technical Standards</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-black tracking-tight mb-4">
                What Happens During a Professional Service Visit?
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Every service visit follows a rigorous 6-step SOP to ensure optimum suction, low noise, and safety against kitchen grease fires.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-royal-surface border border-royal-border/60 hover:border-royal-gold/50 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-royal-gold/15 text-royal-gold font-serif font-bold text-lg flex items-center justify-center mb-4">
                  01
                </div>
                <h3 className="font-serif text-lg font-bold text-royal-black mb-2">
                  Pre-Check &amp; Suction Test
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We measure airflow, check motor RPM, and inspect the electrical harness before disassembly.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-royal-surface border border-royal-border/60 hover:border-royal-gold/50 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-royal-gold/15 text-royal-gold font-serif font-bold text-lg flex items-center justify-center mb-4">
                  02
                </div>
                <h3 className="font-serif text-lg font-bold text-royal-black mb-2">
                  Complete Degreasing
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Blower wheel, housing, and baffle filters are soaked in food-safe degreasers to dissolve hardened carbon.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-royal-surface border border-royal-border/60 hover:border-royal-gold/50 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-royal-gold/15 text-royal-gold font-serif font-bold text-lg flex items-center justify-center mb-4">
                  03
                </div>
                <h3 className="font-serif text-lg font-bold text-royal-black mb-2">
                  Motor Bearing Lubrication
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  High-temperature synthetic lubricant is applied to eliminate squeaks and reduce mechanical vibration.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-royal-surface border border-royal-border/60 hover:border-royal-gold/50 transition-all shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-royal-gold/15 text-royal-gold font-serif font-bold text-lg flex items-center justify-center mb-4">
                  04
                </div>
                <h3 className="font-serif text-lg font-bold text-royal-black mb-2">
                  Post-Service Airflow Demo
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  The unit is reassembled and suction is demonstrated live to the homeowner with a 30-day warranty card.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. CALL TO ACTION BANNER
        ========================================================================= */}
        <section className="py-14 sm:py-16 bg-gradient-to-r from-royal-black via-royal-card to-royal-black border-t border-royal-gold/30 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Want your kitchen chimney to look &amp; perform like new?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 font-light">
              Connect with our technicians today for doorstep service in Delhi, Noida, Gurgaon, Ghaziabad &amp; Faridabad.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BUSINESS_INFO.callLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold"
              >
                <Phone className="w-5 h-5 fill-royal-black" />
                <span>Call {BUSINESS_INFO.displayPhone}</span>
              </a>
              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>WhatsApp Booking</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Global Footer & Floating Actions */}
      <Footer />
      <FloatingActions />
    </div>
  );
}
