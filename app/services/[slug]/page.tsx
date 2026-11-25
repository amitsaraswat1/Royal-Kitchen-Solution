import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";
import {
  DETAILED_SERVICES,
  DetailedService,
  CHIMNEY_TYPES_SUPPORTED,
} from "@/data/services-content";
import {
  Sparkles,
  Wrench,
  ShieldCheck,
  RefreshCw,
  Cpu,
  CalendarClock,
  Phone,
  ArrowRight,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ArrowLeft,
  Check,
} from "lucide-react";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceIcons: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5 text-royal-gold" />,
  Wrench: <Wrench className="w-5 h-5 text-royal-gold" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-royal-gold" />,
  RefreshCw: <RefreshCw className="w-5 h-5 text-royal-gold" />,
  Cpu: <Cpu className="w-5 h-5 text-royal-gold" />,
  CalendarClock: <CalendarClock className="w-5 h-5 text-royal-gold" />,
};

export function generateStaticParams() {
  return DETAILED_SERVICES.map((s) => ({
    slug: s.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = DETAILED_SERVICES.find((s) => s.slug === params.slug);
  if (!service) {
    return {
      title: "Service Not Found | Royal Kitchen Solution",
    };
  }

  return {
    title: `${service.title} in Delhi NCR | Royal Kitchen Solution`,
    description: service.tagline,
    keywords: [
      service.title,
      "chimney service delhi ncr",
      "kitchen chimney doorstep assistance",
      "royal kitchen solution",
    ],
    openGraph: {
      title: `${service.title} | Royal Kitchen Solution`,
      description: service.tagline,
      type: "website",
      images: [service.image],
    },
  };
}

export default function SingleServicePage({ params }: PageProps) {
  const service = DETAILED_SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const otherServices = DETAILED_SERVICES.filter((s) => s.slug !== service.slug);

  const getWhatsAppLink = (serviceTitle: string) => {
    const text = `Hello Royal Kitchen Solution, I would like to book "${serviceTitle}". Please share slot availability.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* 1. Header with Dropdown */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            SERVICE HERO HEADER - EXACT BLACK LUXURY BACKGROUND MATCHING HOME & SERVICES
        ========================================================================= */}
        <section
          id="service-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays - EXACT match */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kitchen Chimney service background"
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
            <div className="max-w-4xl">
              {/* Breadcrumb Navigation in Dark */}
              <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-royal-gold transition-colors">
                  Home
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <Link href="/services" className="hover:text-royal-gold transition-colors">
                  Services
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="text-royal-gold font-medium truncate max-w-xs sm:max-w-md">
                  {service.title}
                </span>
              </nav>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3.5 py-1 rounded-full bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-wider shadow-sm">
                  {service.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-royal-gold" />
                  <span>{service.duration}</span>
                </span>
                <span className="text-xs text-gray-300 font-medium">
                  • {service.recommendedFrequency}
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                {service.title}
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-3xl font-light">
                {service.tagline}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-10">
                {/* Call Now */}
                <a
                  href={BUSINESS_INFO.callLink}
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm sm:text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <Phone className="w-5 h-5 fill-royal-black" />
                  <span>Call Technician</span>
                </a>

                {/* WhatsApp Booking */}
                <a
                  href={getWhatsAppLink(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus-visible-gold min-h-[48px] active:scale-95"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Book on WhatsApp</span>
                </a>

                {/* All Services */}
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-royal-gold/60 font-medium text-sm sm:text-base backdrop-blur-sm transition-all duration-200 focus:outline-none focus-visible-gold min-h-[48px]"
                >
                  <ArrowLeft className="w-4 h-4 text-royal-gold" />
                  <span>All Services Dropdown</span>
                </Link>
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
                    Verified appliance expert
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
                    <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Transparent Rate
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    {service.priceDisplay}
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Genuine Spares
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    OEM-grade parts only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SERVICE FULL DETAILS CONTAINER
        ========================================================================= */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
          {/* Overview & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-royal-black">
                Comprehensive Overview
              </h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {service.overview}
              </p>

              {/* Symptoms */}
              <div className="mt-6 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-royal-black mb-3 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>When You Should Book This Service:</span>
                </h3>
                <div className="space-y-2">
                  {service.symptoms.map((symptom, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 bg-royal-light p-3 rounded-xl border border-gray-200"
                    >
                      <span className="text-amber-600 font-bold shrink-0">⚠</span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200 sticky top-28">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-royal-black/90 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-white">
                  <div className="flex items-center gap-2 text-royal-gold text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{service.guarantee}</span>
                  </div>
                  <p className="text-[11px] text-gray-300 mt-1">
                    Doorstep technician workmanship with transparent upfront rate confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step-by-Step Procedure */}
          <div className="pt-8 border-t border-gray-200">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-gold">
                Technician Checklist
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-royal-black mt-1">
                Step-by-Step Execution Procedure
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Standardized procedure carried out on every doorstep visit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.procedure.map((p, pIdx) => (
                <div
                  key={pIdx}
                  className="bg-royal-light rounded-2xl p-5 border border-gray-200 shadow-2xs"
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

          {/* Included vs Excluded */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs">
              <h3 className="font-serif text-base font-bold text-emerald-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>What&apos;s Included</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-700">
                {service.whatsIncluded.map((inc, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2.5">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs">
              <h3 className="font-serif text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gray-400 shrink-0" />
                <span>Exclusions &amp; Add-ons</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                {service.whatsNotIncluded.map((exc, eIdx) => (
                  <li key={eIdx} className="flex items-start gap-2.5">
                    <span className="text-gray-400 font-bold shrink-0">•</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Other Services Switcher */}
          <div className="pt-12 border-t border-gray-200">
            <h3 className="font-serif text-xl font-bold text-royal-black mb-6">
              Other Kitchen Chimney Services
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group bg-royal-light hover:bg-white p-4 rounded-xl border border-gray-200 hover:border-royal-gold/60 transition-all flex items-center justify-between shadow-2xs hover:shadow-xs"
                >
                  <div className="pr-3">
                    <span className="font-serif text-sm font-bold text-royal-black group-hover:text-royal-gold transition-colors block">
                      {other.title}
                    </span>
                    <span className="text-[11px] text-gray-500 line-clamp-1">
                      {other.duration} • {other.priceDisplay}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-royal-gold shrink-0 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            DOORSTEP BOOKING BANNER
        ========================================================================= */}
        <section className="py-14 bg-royal-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs font-semibold uppercase tracking-wider mb-4">
              Need {service.title}?
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-4">
              Book Certified Technicians in Delhi NCR
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8">
              Same-day slot availability with a 30-day doorstep workmanship warranty.
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
                href={getWhatsAppLink(service.title)}
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
