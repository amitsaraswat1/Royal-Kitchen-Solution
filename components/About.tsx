"use client";

import React from "react";
import Image from "next/image";
import { Phone, Mail, MessageCircle, ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import { ABOUT_DATA, BUSINESS_INFO } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white text-royal-text overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Luxury Decorative Gold Border & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative gold frame */}
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-royal-gold/20 via-transparent to-royal-gold/30 -z-10 blur-sm" />
              
              <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden border-2 border-royal-gold/30 shadow-2xl bg-royal-dark">
                <Image
                  src="/images/about-technician.jpg"
                  alt="Technician inspecting a kitchen chimney range hood - Royal Kitchen Solution"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-black/60 via-transparent to-transparent" />
                
                {/* Floating trust card on image */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-royal-black/90 border border-royal-gold/40 backdrop-blur-md text-white shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-royal-gold/20 border border-royal-gold flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-royal-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Doorstep Technician Visit</p>
                      <p className="text-xs text-gray-300">Dedicated assistance for your kitchen appliances</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
              <ShieldCheck className="w-4 h-4 text-royal-gold" />
              <span>About Our Company</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-6">
              {ABOUT_DATA.heading}
            </h2>

            <div className="w-16 h-1 bg-royal-gold mb-6 rounded-full" />

            {/* Required exact text */}
            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed mb-4">
              {ABOUT_DATA.text}
            </p>

            <p className="text-sm sm:text-base text-royal-muted leading-relaxed mb-8">
              {ABOUT_DATA.subtext}
            </p>

            {/* Core commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {ABOUT_DATA.values.map((val, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-royal-surface/80 border border-gray-200/80"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-royal-gold" />
                    <h4 className="font-semibold text-sm text-royal-black">
                      {val.title}
                    </h4>
                  </div>
                  <p className="text-xs text-royal-muted leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Contact Card with Call, WhatsApp and Email */}
            <div className="p-5 rounded-2xl bg-royal-black text-white border border-royal-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-royal-gold/40 shrink-0 bg-royal-dark shadow-sm">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Royal Kitchen Solution Brand Mark"
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-royal-gold font-semibold uppercase tracking-widest block">
                    Direct Helpline &amp; Doorstep Booking
                  </span>
                  <p className="text-lg font-bold font-serif tracking-wide text-white leading-tight">
                    {BUSINESS_INFO.displayPhone}
                  </p>
                  <p className="text-xs text-gray-300">
                    {BUSINESS_INFO.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm transition-all focus:outline-none focus-visible-gold min-h-[44px]"
                >
                  <Phone className="w-4 h-4 fill-royal-black" />
                  <span>Call Us</span>
                </a>
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-sm transition-all focus:outline-none focus-visible-gold min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
