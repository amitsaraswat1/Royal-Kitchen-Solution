"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  Clock,
  CheckCircle2,
  HeartHandshake,
  Wrench,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO, ABOUT_DATA } from "@/data/content";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-royal-bg text-royal-text flex flex-col font-sans">
      {/* 1. Global Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - MATCHING HOME, SERVICES & PRICING
        ========================================================================= */}
        <section
          id="about-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Shree Balaji Electronics Kitchen Chimney Specialists"
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
                <span>About Shree Balaji Electronics · Delhi NCR</span>
              </div>

              {/* Breadcrumb Navigation in Dark */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-royal-gold transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="text-royal-gold font-medium">About Us</span>
              </nav>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Dedicated to Keeping Your Kitchen{" "}
                <span className="text-royal-gold italic block sm:inline">
                  Fresh, Safe &amp; Smoke-Free
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                Over 15+ years of dedicated excellence in kitchen appliance care,
                precision chimney deep cleaning, motor rewinding, and genuine spare
                replacements across Delhi, Noida, Gurgaon, Ghaziabad &amp; Faridabad.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call Technician Now</span>
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
                  href="/pricing"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <span>View Rate Card</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-6 border-t border-white/15">
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-royal-gold">15+</div>
                  <div className="text-xs text-gray-300">Years Experience</div>
                </div>
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-royal-gold">5,000+</div>
                  <div className="text-xs text-gray-300">Happy Kitchens</div>
                </div>
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-royal-gold">30 Days</div>
                  <div className="text-xs text-gray-300">Service Warranty</div>
                </div>
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                  <div className="font-serif text-xl sm:text-2xl font-bold text-royal-gold">4.9 ★</div>
                  <div className="text-xs text-gray-300">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CORE ABOUT CONTENT & VALUES
        ========================================================================= */}
        <About />

        {/* =========================================================================
            4. COMPANY MISSION & VISION
        ========================================================================= */}
        <section className="py-16 sm:py-20 bg-royal-dark text-white border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
                <Award className="w-4 h-4 text-royal-gold" />
                <span>Our Principles</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
                What Sets Shree Balaji Electronics Apart
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                We believe that regular maintenance should be simple, transparent, and completely stress-free for homeowners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-royal-card border border-royal-gold/20 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-royal-gold/20 border border-royal-gold flex items-center justify-center mb-5 text-royal-gold">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Customer-First Transparency
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Zero hidden charges. Our technicians inspect the appliance in front of you, explain the exact issue, and provide an upfront quotation before beginning any work.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-royal-card border border-royal-gold/20 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-royal-gold/20 border border-royal-gold flex items-center justify-center mb-5 text-royal-gold">
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Genuine OEM Spare Parts
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We use only high-grade copper windings, heavy-gauge stainless steel baffle filters, and certified capacitors compatible with Faber, Hindware, Elica, Glen, Kaff &amp; more.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-royal-card border border-royal-gold/20 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-royal-gold/20 border border-royal-gold flex items-center justify-center mb-5 text-royal-gold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Safe &amp; Caustic-Free Chemicals
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  We never use harsh industrial acids or caustic soda that damage aluminum blowers or leave toxic residues in your kitchen cooking environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. WHY CHOOSE US
        ========================================================================= */}
        <WhyChooseUs />

        {/* =========================================================================
            6. TESTIMONIALS
        ========================================================================= */}
        <Testimonials />

        {/* =========================================================================
            7. CALL TO ACTION BANNER
        ========================================================================= */}
        <section className="py-14 sm:py-16 bg-gradient-to-r from-royal-black via-royal-card to-royal-black border-t border-royal-gold/30 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to restore your chimney’s suction &amp; freshness?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 font-light">
              Book a doorstep technician visit today. Same-day emergency inspection available across Delhi, Noida, Gurgaon &amp; Faridabad.
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
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 8. Global Footer & Floating Actions */}
      <Footer />
      <FloatingActions />
    </div>
  );
}
