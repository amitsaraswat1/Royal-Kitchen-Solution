"use client";

import React from "react";
import Link from "next/link";
import { Check, AlertCircle, Sparkles, ArrowRight, FileSpreadsheet } from "lucide-react";
import { PRICING_DATA, BUSINESS_INFO, PricingItem } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Pricing() {
  const getWhatsAppPricingLink = (title: string, priceDisplay: string) => {
    const text = `Hello Shree Balaji Electronics, I would like to book or ask about "${title}" (${priceDisplay}). Please share the exact quote.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;
  };

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-royal-light text-royal-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <span>Transparent Rates</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            Service Pricing &amp; Estimates
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-royal-muted leading-relaxed mb-4">
            Every chimney setup has unique ventilation requirements. Final service
            charges are quoted transparently based on your chimney model, condition, and
            work needed.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Exact price is confirmed on call or after physical inspection. No hidden fees.
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_DATA.map((plan: PricingItem) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl p-7 border transition-all duration-300 flex flex-col justify-between ${
                plan.popular
                  ? "border-royal-gold ring-2 ring-royal-gold/20 shadow-gold"
                  : "border-gray-200 hover:border-royal-gold/40 shadow-sm hover:shadow-md"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Requested</span>
                </div>
              )}

              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-black mb-2">
                  {plan.title}
                </h3>
                
                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-gray-100">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-extrabold text-royal-black tracking-tight">
                      {plan.priceDisplay}
                    </span>
                  </div>
                  {plan.isPlaceholderPrice && (
                    <span className="inline-block mt-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 font-medium">
                      Estimated / Confirmed on call
                    </span>
                  )}
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {plan.notes}
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button: All yellow/gold as requested */}
              <a
                href={getWhatsAppPricingLink(plan.title, plan.priceDisplay)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px] bg-royal-gold hover:bg-warm-gold text-royal-black shadow-gold hover:shadow-gold-glow active:scale-95"
              >
                <WhatsAppIcon className="w-5 h-5 fill-royal-black" />
                <span>Book Now</span>
              </a>
            </div>
          ))}
        </div>

        {/* Complete Rate Card CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/pricing#rate-card"
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full bg-royal-black hover:bg-black text-white hover:text-royal-gold border border-royal-gold/40 hover:border-royal-gold font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg group"
          >
            <FileSpreadsheet className="w-5 h-5 text-royal-gold" />
            <span>View Complete Appliance Rate Card (All 21 Services)</span>
            <ArrowRight className="w-4 h-4 text-royal-gold group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-gray-500 mt-2 font-medium">
            Kitchen Chimneys • Island Chimneys • Built-In Hobs • Cooktops • Microwaves • Ovens
          </p>
        </div>
      </div>
    </section>
  );
}
