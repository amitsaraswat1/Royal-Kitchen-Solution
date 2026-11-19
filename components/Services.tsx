"use client";

import React from "react";
import Image from "next/image";
import {
  Sparkles,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Cpu,
  CalendarClock,
  ArrowRight,
  Check,
} from "lucide-react";
import { SERVICES_DATA, BUSINESS_INFO, ServiceItem } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-royal-gold" />,
  Wrench: <Wrench className="w-5 h-5 text-royal-gold" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-royal-gold" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-royal-gold" />,
  Cpu: <Cpu className="w-5 h-5 text-royal-gold" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-royal-gold" />,
};

export default function Services() {
  const getWhatsAppServiceLink = (serviceTitle: string) => {
    const text = `Hello Royal Kitchen Solution, I would like to book or enquire about "${serviceTitle}". Please share details.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;
  };

  return (
    <section id="services" className="py-20 sm:py-24 bg-royal-light text-royal-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4 shadow-sm">
            <span>Specialized Services</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            Comprehensive Kitchen Chimney Services
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-royal-muted leading-relaxed">
            From intensive deep cleaning and filter degreasing to motor repairs and
            professional chimney installation, our technicians ensure your kitchen remains
            fresh, clean, and smoke-free.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-royal-gold/60 shadow-sm hover:shadow-gold transition-all duration-300 flex flex-col h-full transform motion-safe:hover:-translate-y-1"
            >
              {/* Card Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-royal-dark">
                <Image
                  src={service.image}
                  alt={`${service.title} - Royal Kitchen Solution`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-black/80 via-transparent to-transparent" />
                
                {/* Floating Icon badge */}
                <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-royal-black/90 border border-royal-gold/40 flex items-center justify-center shadow-md backdrop-blur-sm">
                  {iconMap[service.iconName] || <Wrench className="w-5 h-5 text-royal-gold" />}
                </div>

                {/* Service Tag */}
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-xs uppercase tracking-wider text-royal-gold font-semibold drop-shadow-sm">
                    Doorstep Service
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-black mb-2.5 group-hover:text-royal-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Highlights list */}
                  <ul className="space-y-2 mb-6 pt-2 border-t border-gray-100">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                        <Check className="w-4 h-4 text-royal-gold shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons: Yellow/gold button as requested */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <a
                    href={getWhatsAppServiceLink(service.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-royal-gold hover:bg-warm-gold text-royal-black font-bold text-sm transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[44px] active:scale-95"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-royal-black" />
                    <span>Book on WhatsApp</span>
                  </a>
                  
                  <a
                    href="#contact"
                    className="p-2.5 rounded-xl bg-gray-100 hover:bg-royal-gold hover:text-royal-black text-gray-700 transition-colors focus:outline-none focus-visible-gold min-w-[44px] min-h-[44px] flex items-center justify-center"
                    title={`Enquire for ${service.title}`}
                    aria-label={`Enquire for ${service.title}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
