"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  CalendarCheck2,
  Headphones,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ContactBooking from "@/components/ContactBooking";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";

export default function ContactPage() {
  const serviceAreas = [
    { city: "Delhi", areas: "South Delhi, Dwarka, Rohini, Janakpuri, Laxmi Nagar, Vasant Kunj & all zones" },
    { city: "Noida", areas: "Sector 18, 50, 62, 75, 76, 78, 137, Expressway & Greater Noida West" },
    { city: "Gurgaon", areas: "DLF Phase 1-5, Cyber City, Sohna Road, Golf Course Road, Sector 56 & 57" },
    { city: "Ghaziabad", areas: "Indirapuram, Vaishali, Vasundhara, Raj Nagar Extension & Crossings Republik" },
    { city: "Faridabad", areas: "Sector 14, 15, 16, 21C, NIT, Greater Faridabad & Neharpar" },
  ];

  return (
    <div className="min-h-screen bg-royal-bg text-royal-text flex flex-col font-sans">
      {/* 1. Global Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - MATCHING HOME, SERVICES & PRICING
        ========================================================================= */}
        <section
          id="contact-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Shree Balaji Electronics Doorstep Service Contact"
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
                <span>Doorstep Assistance Across Delhi NCR</span>
              </div>

              {/* Breadcrumb Navigation in Dark */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-royal-gold transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="text-royal-gold font-medium">Contact Us</span>
              </nav>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Contact &amp; Book{" "}
                <span className="text-royal-gold italic block sm:inline">
                  Doorstep Technician Visit
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                Have a question or need urgent kitchen chimney service? Reach out
                directly by phone, WhatsApp, or submit your booking details below for an
                instant confirmation call.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call {BUSINESS_INFO.displayPhone}</span>
                </a>

                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="#booking-form"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <CalendarCheck2 className="w-4 h-4 text-royal-gold" />
                  <span>Fill Booking Form</span>
                </a>
              </div>

              {/* Quick Hours & Address Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-royal-gold" />
                  <span>Operating 7 Days: 8:00 AM – 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-royal-gold" />
                  <span>{BUSINESS_INFO.address}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CONTACT CHANNELS & INTERACTIVE BOOKING FORM
        ========================================================================= */}
        <ContactBooking />

        {/* =========================================================================
            4. SERVICE AREA COVERAGE
        ========================================================================= */}
        <section className="py-16 bg-white border-t border-royal-border/60 text-royal-text">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-3">
                <MapPin className="w-4 h-4 text-royal-gold" />
                <span>Service Coverage Map</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-royal-black tracking-tight mb-3">
                Doorstep Service Across Delhi NCR
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Our technicians are stationed locally across key NCR hubs for rapid response within 60–90 minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {serviceAreas.map((area) => (
                <div
                  key={area.city}
                  className="p-5 rounded-2xl bg-royal-surface border border-royal-border/70 hover:border-royal-gold/50 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-2 font-serif font-bold text-lg text-royal-black mb-2">
                    <MapPin className="w-4 h-4 text-royal-gold" />
                    <span>{area.city}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{area.areas}</p>
                </div>
              ))}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-royal-card to-royal-black text-white border border-royal-gold/30 shadow-sm flex flex-col justify-center">
                <div className="flex items-center gap-2 font-serif font-bold text-base text-royal-gold mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Outside these areas?</span>
                </div>
                <p className="text-xs text-gray-300 mb-3">
                  Call our helpline to check if a technician can be dispatched to your location.
                </p>
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-royal-gold hover:underline"
                >
                  <span>Call {BUSINESS_INFO.displayPhone}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Global Footer & Floating Actions */}
      <Footer />
      <FloatingActions />
    </div>
  );
}
