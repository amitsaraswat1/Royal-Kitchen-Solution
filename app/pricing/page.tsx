"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Sparkles,
  ShieldCheck,
  Wrench,
  Check,
  X,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Layers,
  CheckCircle2,
  CalendarCheck2,
  BadgePercent,
  Coins,
  ShieldAlert,
  ArrowRight,
  Search,
  FileSpreadsheet,
  Tag,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";
import { SERVICE_COMPARISON_PLANS } from "@/data/services-content";
import { getStoredRateCard } from "@/lib/admin-store";
import {
  RATE_CARD_ITEMS,
  RATE_CARD_APPLIANCES,
  RATE_CARD_FOOTNOTE,
  RateCardItem,
} from "@/data/rate-card";

const PRICING_FAQS = [
  {
    question: "Why is the exact price confirmed after inspection or on call?",
    answer:
      "Every kitchen chimney is unique — differing in model (baffle vs. filterless), age, grease saturation level, and mounting height. Rather than quoting inflated flat rates, our technician inspects your appliance and gives an accurate, fair quote before starting work.",
  },
  {
    question: "Are spare parts included in repair quotes?",
    answer:
      "Standard servicing and cleaning rates cover all degreasing solvents, labour, and safety testing. If replacement parts (such as a motor capacitor, push switch, or carbon filter) are required, our technician explains the cost of the genuine OEM part upfront for your approval.",
  },
  {
    question: "Is there any inspection fee if I decide to go ahead with the service?",
    answer:
      "When you proceed with the recommended repair or deep cleaning, any nominal visiting charge is fully adjusted into the final invoice, so you never pay twice.",
  },
  {
    question: "What payment methods do technicians accept?",
    answer:
      "Technicians accept all convenient digital payment modes including UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash directly upon service completion and your total satisfaction.",
  },
  {
    question: "Do you offer any discount for multiple chimneys or society group bookings?",
    answer:
      "Yes! If you have multiple kitchen chimneys or book alongside neighbors in the same apartment society, we offer customized package discounts. Contact our helpline on WhatsApp for custom rates.",
  },
];

export default function PricingPage() {
  const [rateCardList, setRateCardList] = useState<RateCardItem[]>(RATE_CARD_ITEMS);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedAppliance, setSelectedAppliance] = useState<string>("All Appliances");
  const [searchRateCard, setSearchRateCard] = useState<string>("");

  useEffect(() => {
    const syncRateCard = () => {
      const stored = getStoredRateCard();
      if (stored && stored.length > 0) {
        setRateCardList(stored);
      }
    };
    syncRateCard();

    window.addEventListener("rks_store_updated", syncRateCard);
    window.addEventListener("storage", syncRateCard);
    return () => {
      window.removeEventListener("rks_store_updated", syncRateCard);
      window.removeEventListener("storage", syncRateCard);
    };
  }, []);

  const filteredRateCards = rateCardList.filter((item) => {
    const matchesAppliance =
      selectedAppliance === "All Appliances" || item.appliance === selectedAppliance;
    const q = searchRateCard.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.appliance.toLowerCase().includes(q) ||
      item.serviceType.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.priceDisplay.includes(q);
    return matchesAppliance && matchesSearch;
  });

  const getWhatsAppRateCardLink = (item: RateCardItem) => {
    const text = `Hello Shree Balaji Electronics, I would like to book "${item.appliance} - ${item.serviceType}" (${item.priceDisplay}). Work: ${item.description}. Please confirm technician slot.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* 1. Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - EXACT MATCH WITH HOME, SERVICES & BLOGS HERO
        ========================================================================= */}
        <section
          id="pricing-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kitchen Chimney service pricing and transparent estimates by Shree Balaji Electronics"
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
                <span>Upfront &amp; Transparent Estimates · Delhi NCR</span>
              </div>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Kitchen Chimney{" "}
                <span className="text-royal-gold italic block sm:inline">Pricing &amp; Plans</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                Clear, upfront rates with zero surprise fees. Intensive deep cleaning
                starting at ₹799, genuine spare replacements, and customized Annual
                Maintenance Contracts (AMC).
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
                {/* Call Now */}
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call for Price Quote</span>
                </a>

                {/* WhatsApp Booking */}
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>WhatsApp Quote</span>
                </a>

                {/* Rate Card Anchor */}
                <a
                  href="#rate-card"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <FileSpreadsheet className="w-4 h-4 text-royal-gold" />
                  <span>View 21-Service Rate Card</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-6 border-t border-white/15">
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      From ₹250
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Standard doorstep rates
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Pre-Work Quote
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    No work starts without approval
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      30-Day Warranty
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Free doorstep re-check
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Zero Hidden Fees
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Clear itemized invoices
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. STICKY QUICK JUMP BAR
        ========================================================================= */}
        <div className="sticky top-[60px] sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold shrink-0 mr-2 hidden sm:inline">
                Jump to Section:
              </span>
              <a
                href="#rate-card"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 hover:bg-royal-gold hover:text-royal-black text-amber-950 text-xs font-bold border border-amber-300 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-royal-gold" />
                <span>Appliance Rate Card ({rateCardList.length} Services)</span>
              </a>
              <a
                href="#comparison"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-royal-gold hover:text-royal-black text-gray-800 text-xs font-semibold border border-gray-200/80 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <span>Compare Care Plans</span>
              </a>
              <a
                href="#transparency"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-royal-gold hover:text-royal-black text-gray-800 text-xs font-semibold border border-gray-200/80 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <span>Pricing Assurances</span>
              </a>
              <a
                href="#faqs"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-100 hover:bg-royal-gold hover:text-royal-black text-gray-800 text-xs font-semibold border border-gray-200/80 whitespace-nowrap transition-colors shrink-0 shadow-xs"
              >
                <span>Pricing FAQs</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. SINGLE OFFICIAL COMPLETE APPLIANCE RATE CARD (EXACT USER SPECIFICATION)
        ========================================================================= */}
        <section id="rate-card" className="py-20 sm:py-24 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-gold/15 border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-semibold mb-3">
                <FileSpreadsheet className="w-4 h-4 text-royal-gold" />
                <span>Official Transparent Rate Card</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
                Complete Kitchen Appliance Price List
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-4 rounded-full" />
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                Standard doorstep charges for Kitchen Chimneys, Island Chimneys, Built-In Hobs, Cooktops, Built-In Microwaves, and Ovens.
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="mb-8 space-y-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                {RATE_CARD_APPLIANCES.map((appliance) => (
                  <button
                    key={appliance}
                    onClick={() => setSelectedAppliance(appliance)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                      selectedAppliance === appliance
                        ? "bg-royal-black text-white shadow-md border border-royal-black"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {appliance}
                    {appliance === "All Appliances" ? ` (${rateCardList.length})` : ""}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchRateCard}
                  onChange={(e) => setSearchRateCard(e.target.value)}
                  placeholder="Search appliance, service, or task (e.g. Filter clean, Motor, Hob, Microwave)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm text-royal-black placeholder-gray-400 focus:outline-none focus:border-royal-gold focus:bg-white transition"
                />
              </div>
            </div>

            {/* Rate Card Table (Desktop & Tablet) */}
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-md bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#111111] text-white text-xs uppercase tracking-wider border-b border-gray-800">
                    <th className="py-4 px-5 font-bold">Appliance Name</th>
                    <th className="py-4 px-5 font-bold">Service Type</th>
                    <th className="py-4 px-5 font-bold">Included Tasks / Description</th>
                    <th className="py-4 px-5 font-bold text-center">Service Rate</th>
                    <th className="py-4 px-5 font-bold text-right">Quick Booking</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {filteredRateCards.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500">
                        No service matching &quot;{searchRateCard}&quot;. Please try another keyword.
                      </td>
                    </tr>
                  ) : (
                    filteredRateCards.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`hover:bg-amber-50/40 transition-colors ${
                          idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                        }`}
                      >
                        <td className="py-4 px-5 font-bold text-royal-black">
                          {item.appliance}
                        </td>
                        <td className="py-4 px-5">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              item.serviceType.includes("Full Service")
                                ? "bg-amber-100 text-amber-900 border border-amber-300"
                                : item.serviceType.includes("Basic Service")
                                ? "bg-blue-100 text-blue-900 border border-blue-200"
                                : item.serviceType.includes("Repair")
                                ? "bg-orange-100 text-orange-900 border border-orange-200"
                                : item.serviceType.includes("Installation")
                                ? "bg-purple-100 text-purple-900 border border-purple-200"
                                : "bg-gray-200 text-gray-800 border border-gray-300"
                            }`}
                          >
                            {item.serviceType}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-gray-600 font-medium">
                          {item.description}
                        </td>
                        <td className="py-4 px-5 text-center font-bold text-lg text-royal-black font-serif">
                          <span className="text-[#B38728]">{item.priceDisplay}</span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <a
                            href={getWhatsAppRateCardLink(item)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                            <span>Book Now</span>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards View */}
            <div className="md:hidden space-y-3.5">
              {filteredRateCards.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-royal-gold transition"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-royal-black text-sm">{item.appliance}</span>
                    <span className="font-serif font-extrabold text-base text-[#B38728]">
                      {item.priceDisplay}
                    </span>
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                      {item.serviceType}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3.5 leading-relaxed">{item.description}</p>
                  <a
                    href={getWhatsAppRateCardLink(item)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Book on WhatsApp ({item.priceDisplay})</span>
                  </a>
                </div>
              ))}
            </div>

            {/* Footnote Notice from Image */}
            <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{RATE_CARD_FOOTNOTE}</span>
              </div>
              <div className="text-xs text-amber-800/80 font-medium">
                Transparent doorstep inspection • Genuine OEM spares • 30-Day guarantee
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. SERVICE COMPARISON MATRIX (IMAGE 1 CONTENT)
        ========================================================================= */}
        <section id="comparison" className="py-20 sm:py-24 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-gold/10 border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-3">
                <Layers className="w-4 h-4 text-royal-gold" />
                <span>Transparent Comparison</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-royal-black tracking-tight mb-4">
                Compare Our Service Care Plans
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto mb-4 rounded-full" />
              <p className="text-sm sm:text-base text-gray-600">
                Choose the exact level of chimney care that fits your cooking habits and appliance condition.
              </p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-royal-black text-white border-b border-royal-border">
                    <th className="py-4 px-4 sm:px-6 font-semibold w-2/5">Care Feature / Task</th>
                    <th className="py-4 px-3 sm:px-4 text-center font-semibold text-gray-300">
                      Standard Wash
                    </th>
                    <th className="py-4 px-3 sm:px-4 text-center font-bold text-royal-gold bg-white/5 border-x border-royal-gold/30">
                      Deep Cleaning (Popular)
                    </th>
                    <th className="py-4 px-3 sm:px-4 text-center font-semibold text-gray-300">
                      Annual AMC Contract
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {SERVICE_COMPARISON_PLANS.map((plan, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50 hover:bg-gray-50"}
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-gray-900">
                        {plan.feature}
                      </td>

                      {/* Standard Clean */}
                      <td className="py-3.5 px-3 sm:px-4 text-center text-gray-600">
                        {typeof plan.standardClean === "boolean" ? (
                          plan.standardClean ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs text-gray-500 font-medium">
                            {plan.standardClean}
                          </span>
                        )}
                      </td>

                      {/* Deep Clean */}
                      <td className="py-3.5 px-3 sm:px-4 text-center font-semibold text-royal-black bg-royal-gold/5 border-x border-royal-gold/20">
                        {typeof plan.deepClean === "boolean" ? (
                          plan.deepClean ? (
                            <Check className="w-4 h-4 text-royal-gold mx-auto stroke-[2.5]" />
                          ) : (
                            <X className="w-4 h-4 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs text-royal-gold font-bold">
                            {plan.deepClean}
                          </span>
                        )}
                      </td>

                      {/* Annual AMC */}
                      <td className="py-3.5 px-3 sm:px-4 text-center text-gray-700">
                        {typeof plan.annualAmc === "boolean" ? (
                          plan.annualAmc ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-gray-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-xs text-emerald-700 font-bold">
                            {plan.annualAmc}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. PRICING ASSURANCES
        ========================================================================= */}
        <section id="transparency" className="py-16 sm:py-20 bg-royal-light border-y border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-gold">
                Our Pricing Standards
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-royal-black mt-1 mb-3">
                Why Shree Balaji Electronics Pricing Is 100% Honest
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                We believe in lasting customer relationships built on trust, genuine workmanship, and zero hidden markups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-royal-black mb-2">
                  Pre-Service Approval
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Our technician always inspects first, explains the required work, and gets your go-ahead before touching a screw.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-royal-black mb-2">
                  100% Genuine Spares
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Any replacement capacitor, PCB relay, switch, or motor component is OEM-grade with manufacturer compatibility.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                  <Wrench className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-royal-black mb-2">
                  30-Day Service Guarantee
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  If the same fault recurs within 30 days of service, our technician revisits your home free of cost.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold mb-4">
                  <Coins className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base font-bold text-royal-black mb-2">
                  Inspection Fee Adjusted
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  When you proceed with the recommended cleaning or repair, visiting charges are fully absorbed into your bill.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. PRICING FAQS ACCORDION
        ========================================================================= */}
        <section id="faqs" className="py-16 sm:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-gold">
                Got Questions?
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-royal-black mt-1 mb-3">
                Frequently Asked Pricing Questions
              </h2>
              <div className="w-16 h-1 bg-royal-gold mx-auto rounded-full" />
            </div>

            <div className="space-y-3.5">
              {PRICING_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-base sm:text-lg font-bold text-royal-black hover:text-royal-gold transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    {openFaqIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-royal-gold shrink-0 ml-3" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0 ml-3" />
                    )}
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-gray-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            8. DOORSTEP HELPLINE BANNER
        ========================================================================= */}
        <section className="py-14 bg-royal-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Fast Doorstep Confirmation
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-4">
                Get an Exact Chimney Quote in 2 Minutes
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                Share your chimney brand, location in Delhi NCR, and issue on WhatsApp for an immediate transparent rate estimate.
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
