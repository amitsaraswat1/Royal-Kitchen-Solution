"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";
import {
  DETAILED_SERVICES,
  CHIMNEY_TYPES_SUPPORTED,
  BRANDS_SERVICED,
  SERVICES_PAGE_FAQS,
  DetailedService,
} from "@/data/services-content";
import { getStoredServices } from "@/lib/admin-store";
import {
  Sparkles,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Cpu,
  CalendarClock,
  Phone,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertTriangle,
  HelpCircle,
  Check,
  ChevronDown,
  ChevronUp,
  Star,
  CheckCircle,
  Flame,
  ArrowUpRight,
  Shield,
  Layers,
} from "lucide-react";

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-royal-gold" />,
  Wrench: <Wrench className="w-5 h-5 text-royal-gold" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-royal-gold" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-royal-gold" />,
  Cpu: <Cpu className="w-5 h-5 text-royal-gold" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-royal-gold" />,
};

export default function ServicesPage() {
  const [servicesList, setServicesList] = useState<DetailedService[]>(DETAILED_SERVICES);
  const [selectedSlug, setSelectedSlug] = useState<string>("deep-cleaning");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync with store on mount and on storage events
  useEffect(() => {
    const syncServices = () => {
      const stored = getStoredServices();
      setServicesList(stored);
      if (stored.length > 0 && !stored.some((s) => s.slug === selectedSlug)) {
        setSelectedSlug(stored[0].slug);
      }
    };

    syncServices();

    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const stored = getStoredServices();
      if (hash && stored.some((s) => s.slug === hash || s.id === hash)) {
        const found = stored.find((s) => s.slug === hash || s.id === hash);
        if (found) setSelectedSlug(found.slug);
      }

      window.addEventListener("rks_store_updated", syncServices);
      window.addEventListener("storage", syncServices);
      return () => {
        window.removeEventListener("rks_store_updated", syncServices);
        window.removeEventListener("storage", syncServices);
      };
    }
  }, [selectedSlug]);

  const handleSelectService = (slug: string) => {
    setSelectedSlug(slug);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}`);
      const detailEl = document.getElementById("active-service-detail");
      if (detailEl) {
        detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const activeService =
    servicesList.find((s) => s.slug === selectedSlug) || servicesList[0] || DETAILED_SERVICES[0];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const getWhatsAppLink = (serviceTitle: string) => {
    const text = `Hello Shree Balaji Electronics, I would like to book or enquire about "${serviceTitle}". Please share slot availability.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* 1. Header with Dropdown */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - MATCHING HOME & PRICING HERO HEIGHT & STYLING
        ========================================================================= */}
        <section
          id="services-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Modern luxury modular kitchen with premium kitchen chimney range hood"
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
                <span>Doorstep Kitchen Chimney Specialists · Delhi NCR</span>
              </div>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Comprehensive Kitchen{" "}
                <span className="text-royal-gold italic block sm:inline">Chimney Services</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                From intensive caustic-free deep cleaning and motor repairs to precision
                fitting. Click any service below to open its step-by-step procedure and
                transparent details.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
                {/* Call Now */}
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call Now</span>
                </a>

                {/* WhatsApp Booking */}
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp Booking</span>
                </a>

                {/* Explore Services Anchor */}
                <a
                  href="#services-selection"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <Sparkles className="w-4 h-4 text-royal-gold" />
                  <span>Select a Service</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-6 border-t border-white/15">
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Doorstep Service
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Assistance right at your home
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Cleaning &amp; Repair
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    End-to-end chimney solutions
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Quick WhatsApp
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Direct instant confirmation
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Transparent Price
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Upfront pricing clarification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. INTERACTIVE SERVICE DROPDOWN - ONLY DROPDOWN KEPT AS REQUESTED
        ========================================================================= */}
        <div
          id="services-selection"
          className="sticky top-[60px] sm:top-[68px] z-40 bg-royal-black/95 backdrop-blur-md border-b border-royal-border py-3.5 sm:py-4 shadow-xl text-white"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
              {/* Dropdown Selector */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <label
                  htmlFor="service-dropdown-select"
                  className="text-xs sm:text-sm uppercase tracking-wider text-royal-gold font-bold shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-royal-gold" />
                  <span>Select Service:</span>
                </label>
                <div className="relative w-full sm:w-96">
                  <select
                    id="service-dropdown-select"
                    value={selectedSlug}
                    onChange={(e) => handleSelectService(e.target.value)}
                    className="w-full appearance-none bg-royal-dark border-2 border-royal-gold/80 hover:border-royal-gold text-white font-bold text-xs sm:text-sm rounded-xl py-2.5 sm:py-3 pl-4 pr-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-royal-gold cursor-pointer transition-all"
                  >
                    {servicesList.map((s) => (
                      <option
                        key={s.slug}
                        value={s.slug}
                        className="bg-royal-black text-white py-2"
                      >
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-royal-gold">
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Active Service Status Indicator */}
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>
                  Showing Details:{" "}
                  <strong className="text-royal-gold font-semibold">
                    {activeService.title}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. ONLY THE ACTIVE SELECTED SERVICE OPENS WITH FULL DETAILS
        ========================================================================= */}
        <section id="active-service-detail" className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-royal-light rounded-3xl border border-royal-gold/30 p-6 sm:p-10 lg:p-12 shadow-sm">
              {/* Header of Active Service */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-gray-200">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-3">
                    <span className="px-3.5 py-1 rounded-full bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-wider">
                      {activeService.badge}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 font-medium">
                      <Clock className="w-3.5 h-3.5 text-royal-gold" />
                      <span>{activeService.duration}</span>
                    </span>
                    <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                      • {activeService.recommendedFrequency}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-royal-black leading-tight">
                    {activeService.title}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-3xl leading-relaxed">
                    {activeService.tagline}
                  </p>
                </div>

                {/* Price & Primary Booking Action */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                  <div className="text-left lg:text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">
                      Transparent Rate
                    </div>
                    <div className="font-serif text-xl sm:text-2xl font-black text-royal-black">
                      {activeService.priceDisplay}
                    </div>
                  </div>

                  <a
                    href={getWhatsAppLink(activeService.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Book on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Overview & Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-8 border-b border-gray-200">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-royal-black">
                    Service Overview
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {activeService.overview}
                  </p>

                  {/* Warning Symptoms */}
                  <div className="mt-6 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-royal-black mb-3 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Signs You Need This Service:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeService.symptoms.map((symptom, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-2 text-xs text-gray-700 bg-white p-2.5 rounded-xl border border-gray-200"
                        >
                          <span className="text-amber-600 font-bold shrink-0">⚠</span>
                          <span>{symptom}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
                    <Image
                      src={activeService.image}
                      alt={activeService.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 500px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-royal-black/90 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-white">
                      <div className="flex items-center gap-2 text-royal-gold text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{activeService.guarantee}</span>
                      </div>
                      <p className="text-[11px] text-gray-300 mt-0.5">
                        100% genuine parts and verified technician doorstep workmanship.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Procedure */}
              <div className="py-8 border-b border-gray-200">
                <div className="mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-royal-gold">
                    Professional Standard
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-black mt-1">
                    Step-by-Step Service Procedure
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Exact step-by-step checklist executed by our verified technician on every visit.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activeService.procedure.map((p, pIdx) => (
                    <div
                      key={pIdx}
                      className="bg-white rounded-2xl p-5 border border-gray-200 shadow-2xs hover:border-royal-gold/50 transition-colors"
                    >
                      <div className="flex items-center gap-2 mb-2 font-serif font-bold text-sm text-royal-black">
                        <span className="w-6 h-6 rounded-full bg-royal-gold text-royal-black text-xs font-bold flex items-center justify-center shrink-0">
                          {pIdx + 1}
                        </span>
                        <span>{p.step}</span>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed pl-8">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included vs Not Included */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                {/* Included */}
                <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs">
                  <h4 className="font-serif text-base font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>What&apos;s Included in This Service</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                    {activeService.whatsIncluded.map((inc, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5">
                        <span className="text-emerald-600 font-bold shrink-0">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                  <h4 className="font-serif text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0" />
                    <span>Important Exclusions &amp; Add-ons</span>
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                    {activeService.whatsNotIncluded.map((exc, eIdx) => (
                      <li key={eIdx} className="flex items-start gap-2.5">
                        <span className="text-gray-400 font-bold shrink-0">•</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[11px] text-gray-400 mt-4 pt-3 border-t border-gray-100">
                    Note: Additional hardware or spares are always quoted upfront with your approval.
                  </p>
                </div>
              </div>

              {/* Bottom Switcher / Direct Helpline Bar */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  Viewing: <strong className="text-royal-black">{activeService.title}</strong>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={BUSINESS_INFO.callLink}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-royal-gold text-royal-black font-semibold text-xs sm:text-sm shadow-gold"
                  >
                    <Phone className="w-4 h-4 fill-royal-black" />
                    <span>Call Technician</span>
                  </a>

                  <Link
                    href={`/services/${activeService.slug}`}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-gray-100 text-royal-black border border-gray-200 text-xs sm:text-sm font-semibold"
                  >
                    <span>Permanent URL</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. CHIMNEY MODELS & CONFIGURATIONS SUPPORTED
        ========================================================================= */}
        <section className="py-16 sm:py-20 bg-royal-light border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-black mb-3">
                All Chimney Models &amp; Configurations Supported
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-4 rounded-full" />
              <p className="text-sm sm:text-base text-gray-600">
                Whether your kitchen has a sleek designer curved glass hood or an auto-clean thermal unit, our technicians have the exact diagnostic schematics and tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {CHIMNEY_TYPES_SUPPORTED.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-gray-200/80 hover:border-royal-gold/60 shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center mb-4 group-hover:bg-royal-gold transition-colors">
                    {serviceIcons[item.icon] || <Wrench className="w-5 h-5 text-royal-gold group-hover:text-royal-black" />}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-royal-black mb-2 group-hover:text-royal-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. BRANDS WE SERVICE
        ========================================================================= */}
        <section className="py-14 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs uppercase tracking-widest text-royal-gold font-bold">
                Universal Appliance Compatibility
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-royal-black mt-1">
                We Service All Leading Chimney Brands
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {BRANDS_SERVICED.map((brandName) => (
                <div
                  key={brandName}
                  className="bg-royal-light p-3.5 rounded-xl border border-gray-200/80 text-center hover:border-royal-gold hover:shadow-xs transition-all"
                >
                  <span className="text-xs sm:text-sm font-bold text-royal-black block truncate">
                    {brandName}
                  </span>
                  <span className="text-[10px] text-gray-500 block truncate mt-0.5">
                    All Models
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. SERVICES FAQS
        ========================================================================= */}
        <section className="py-16 sm:py-20 bg-royal-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-wider text-royal-gold font-bold">
                Got Questions?
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-royal-black mt-1 mb-3">
                Services Frequently Asked Questions
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-4 rounded-full" />
            </div>

            <div className="space-y-4">
              {SERVICES_PAGE_FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      type="button"
                      className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-sm sm:text-base text-royal-black hover:bg-gray-50 transition-colors focus:outline-none"
                    >
                      <span className="pr-4">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-royal-gold shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            9. HELPLINE BANNER
        ========================================================================= */}
        <section className="py-14 bg-royal-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Fast Doorstep Response
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Book Your Kitchen Chimney Service?
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
              Speak directly with our service desk or book instantly via WhatsApp for guaranteed doorstep assistance across Delhi NCR.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={BUSINESS_INFO.callLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all shadow-gold"
              >
                <Phone className="w-5 h-5 fill-royal-black" />
                <span>Call {BUSINESS_INFO.displayPhone}</span>
              </a>

              <a
                href={BUSINESS_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                <span>Instant WhatsApp Booking</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
}
