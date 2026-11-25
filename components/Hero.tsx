"use client";

import React from "react";
import Image from "next/image";
import { Phone, CalendarCheck2, ShieldCheck, Wrench, Sparkles } from "lucide-react";
import { BUSINESS_INFO, TRUST_INDICATORS } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Hero() {
  return (
    <section
      id="home"
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
            <span>Doorstep Kitchen Chimney Specialists</span>
          </div>

          {/* Main H1 Heading */}
          <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
            Professional Kitchen <span className="block sm:inline">Chimney Service</span> at{" "}
            <span className="text-royal-gold italic block sm:inline">Your Doorstep</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
            Expert Chimney Cleaning, Repair, Installation &amp; Maintenance
            Services. Keep Your Kitchen Fresh, Clean and Smoke-Free with{" "}
            <span className="font-medium text-white">Shree Balaji Electronics</span>.
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

            {/* Book a Service (Scroll to form) */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
            >
              <CalendarCheck2 className="w-4 h-4 text-royal-gold" />
              <span>Book a Service</span>
            </a>
          </div>

          {/* Trust Indicators (Only verifiable items) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-6 border-t border-white/15">
            {TRUST_INDICATORS.map((indicator, idx) => (
              <div
                key={idx}
                className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0"
              >
                <div className="flex items-center gap-1.5 mb-1 min-w-0">
                  {idx === 0 && <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />}
                  {idx === 1 && <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />}
                  {idx === 2 && <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />}
                  {idx === 3 && <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />}
                  <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                    {indicator.label}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                  {indicator.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
