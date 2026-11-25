"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  MapPin,
  Award,
} from "lucide-react";
import { BUSINESS_INFO, SERVICE_OPTIONS, PARTNERSHIP_BRANDS } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { saveBookingItem, BookingLead } from "@/lib/admin-store";

interface FormState {
  name: string;
  mobile: string;
  service: string;
  location: string;
  description: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  service?: string;
  location?: string;
}

export default function ContactBooking() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    mobile: "",
    service: "",
    location: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name";
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Please enter your 10-digit mobile number";
    } else if (!mobileRegex.test(formData.mobile.trim())) {
      newErrors.mobile = "Enter a valid 10-digit Indian mobile number (e.g. 9876543210)";
    }

    if (!formData.service) {
      newErrors.service = "Please select a required chimney service";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Please enter your locality or city area";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Generate unique Lead ID
    const newLeadId = `RKS-${Math.floor(1000 + Math.random() * 9000)}`;

    // Smart city detection from location text
    const locLower = formData.location.toLowerCase();
    let detectedCity: BookingLead["city"] = "Delhi";
    if (locLower.includes("noida") || locLower.includes("greater noida")) detectedCity = "Noida";
    else if (locLower.includes("gurgaon") || locLower.includes("gurugram")) detectedCity = "Gurgaon";
    else if (
      locLower.includes("ghaziabad") ||
      locLower.includes("indirapuram") ||
      locLower.includes("vaishali") ||
      locLower.includes("vasundhara")
    )
      detectedCity = "Ghaziabad";
    else if (locLower.includes("faridabad")) detectedCity = "Faridabad";

    // Smart price estimation based on selected service
    let quotedPrice = 799;
    const srvLower = formData.service.toLowerCase();
    if (srvLower.includes("deep") || srvLower.includes("full service") || srvLower.includes("island full")) {
      quotedPrice = 1099;
    } else if (srvLower.includes("island")) {
      quotedPrice = 1050;
    } else if (srvLower.includes("hob full") || srvLower.includes("hob deep")) {
      quotedPrice = 799;
    } else if (srvLower.includes("hob")) {
      quotedPrice = 599;
    } else if (srvLower.includes("microwave") || srvLower.includes("oven")) {
      quotedPrice = 599;
    } else if (srvLower.includes("cooktop")) {
      quotedPrice = 275;
    } else if (
      srvLower.includes("repair") ||
      srvLower.includes("installation") ||
      srvLower.includes("motor") ||
      srvLower.includes("uninstallation")
    ) {
      quotedPrice = 350;
    }

    // Save directly to Admin Control Center
    const newLead: BookingLead = {
      id: newLeadId,
      customerName: formData.name.trim(),
      phone: formData.mobile.trim(),
      service: formData.service,
      serviceSlug: formData.service.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      chimneyBrand: "Kitchen Appliance",
      location: formData.location.trim(),
      city: detectedCity,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      timeSlot: "Doorstep Slot",
      quotedPrice,
      status: "Pending",
      assignedTech: "Unassigned",
      paymentStatus: "Unpaid",
      notes: formData.description.trim() || "Website Doorstep Booking Enquiry",
      createdAt: "Just now",
    };
    saveBookingItem(newLead);
    setSubmittedLeadId(newLeadId);
    setIsSubmitted(true);

    // Form is valid! Generate WhatsApp URL
    const message = `*Kitchen Chimney Service Enquiry - Shree Balaji Electronics*
• Booking ID: ${newLeadId}
• Name: ${formData.name.trim()}
• Phone: ${formData.mobile.trim()}
• Service: ${formData.service}
• Location: ${formData.location.trim()}
• Problem Description: ${
      formData.description.trim() ? formData.description.trim() : "Not specified"
    }`;

    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Open WhatsApp in a new tab/window
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-white text-royal-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-surface border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-4">
            <WhatsAppIcon className="w-4 h-4 fill-royal-gold" />
            <span>Connect &amp; Schedule</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-royal-black tracking-tight mb-4">
            Book Doorstep Chimney Service
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-6 rounded-full" />
          <p className="text-base sm:text-lg text-royal-muted leading-relaxed">
            Call us directly or send your service requirements below. Your enquiry will
            open directly in WhatsApp for quick confirmation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-royal-black text-white border border-royal-border shadow-xl overflow-hidden">
              <div className="mb-6">
                <div className="relative h-12 sm:h-14 w-full max-w-[220px] sm:max-w-[250px]">
                  <Image
                    src="/images/shree-balaji-logo-trans.png"
                    alt="Shree Balaji Electronics"
                    fill
                    sizes="(max-width: 640px) 200px, 250px"
                    className="object-contain object-left"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Contact our Shree Balaji Electronics service desk for fast doorstep support, filter
                cleaning bookings, or urgent kitchen chimney repair visits.
              </p>

              {/* Contact details */}
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
                    <Phone className="w-5 h-5 fill-royal-gold" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Helpline Number
                    </span>
                    <a
                      href={BUSINESS_INFO.callLink}
                      className="block text-lg font-bold text-white hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded"
                    >
                      {BUSINESS_INFO.displayPhone}
                    </a>
                    <span className="text-xs text-gray-400">Tap to call directly</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                    <WhatsAppIcon className="w-5 h-5 fill-emerald-500" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      WhatsApp
                    </span>
                    <a
                      href={BUSINESS_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-bold text-white hover:text-emerald-400 transition-colors focus:outline-none focus-visible-gold rounded"
                    >
                      {BUSINESS_INFO.displayPhone}
                    </a>
                    <span className="text-xs text-gray-400">Instant chat &amp; booking</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Official Email
                    </span>
                    <a
                      href={BUSINESS_INFO.emailLink}
                      className="block text-sm sm:text-base font-medium text-white hover:text-royal-gold transition-colors break-all focus:outline-none focus-visible-gold rounded"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                    <span className="text-xs text-gray-400">Direct booking enquiries</span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
                    <MapPin className="w-5 h-5 text-royal-gold" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Service Office / Address
                    </span>
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {BUSINESS_INFO.address}
                    </p>
                    <span className="text-xs text-gray-400">Doorstep Assistance Delhi NCR</span>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                  <div className="w-11 h-11 rounded-xl bg-royal-dark border border-white/10 flex items-center justify-center text-gray-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-medium">
                      Service Timings
                    </span>
                    <p className="text-sm font-medium text-gray-200">
                      {BUSINESS_INFO.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="p-4 rounded-xl bg-royal-surface border border-gray-200 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-royal-gold shrink-0" />
              <p className="text-xs text-gray-600 leading-snug">
                Your contact details are used solely to coordinate your chimney service visit.
              </p>
            </div>
          </div>

          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-royal-surface rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm">
              <h3 className="font-serif text-2xl font-bold text-royal-black mb-2">
                Send Service Request
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-6">
                Fill in the details below. Once submitted, your enquiry will open
                directly in WhatsApp for immediate response.
              </p>

              {isSubmitted && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm flex items-start gap-3.5 shadow-sm animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-emerald-950">Service Request Booked &amp; Logged!</p>
                      {submittedLeadId && (
                        <span className="text-[11px] font-mono bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded font-bold">
                          Lead #{submittedLeadId}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      Your enquiry has been successfully registered in our Admin Control Center. A technician has been notified and our dispatch team will confirm your slot shortly.
                    </p>
                    <p className="text-xs text-emerald-700 mt-2 font-medium">
                      WhatsApp chat was also initiated for quick confirmation. If it did not open automatically, you can call us directly at <strong>{BUSINESS_INFO.displayPhone}</strong>.
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-emerald-200/80 flex flex-wrap items-center gap-3">
                      <a
                        href="/admin?tab=bookings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold shadow-xs transition"
                      >
                        <span>Open Admin Leads Dashboard</span>
                        <span>&rarr;</span>
                      </a>
                      <span className="text-[11px] text-emerald-800">
                        (Live status: Pending &bull; Ref #{submittedLeadId})
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="customer-name"
                    className="block text-xs sm:text-sm font-semibold text-royal-black mb-1.5"
                  >
                    Customer Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-royal-text text-sm transition-colors focus:outline-none min-h-[48px] ${
                      errors.name
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                        : "border-gray-300 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label
                    htmlFor="customer-mobile"
                    className="block text-xs sm:text-sm font-semibold text-royal-black mb-1.5"
                  >
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="customer-mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-royal-text text-sm transition-colors focus:outline-none min-h-[48px] ${
                      errors.mobile
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                        : "border-gray-300 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
                    }`}
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.mobile}
                    </p>
                  )}
                </div>

                {/* Select Service */}
                <div>
                  <label
                    htmlFor="customer-service"
                    className="block text-xs sm:text-sm font-semibold text-royal-black mb-1.5"
                  >
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="customer-service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-royal-text text-sm transition-colors focus:outline-none min-h-[48px] ${
                      errors.service
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                        : "border-gray-300 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
                    }`}
                  >
                    <option value="">-- Choose a service --</option>
                    {SERVICE_OPTIONS.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.service}
                    </p>
                  )}
                </div>

                {/* City / Location */}
                <div>
                  <label
                    htmlFor="customer-location"
                    className="block text-xs sm:text-sm font-semibold text-royal-black mb-1.5"
                  >
                    City / Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="customer-location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter your locality or area"
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-royal-text text-sm transition-colors focus:outline-none min-h-[48px] ${
                      errors.location
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400"
                        : "border-gray-300 focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.location}
                    </p>
                  )}
                </div>

                {/* Problem Description (Optional) */}
                <div>
                  <label
                    htmlFor="customer-description"
                    className="block text-xs sm:text-sm font-semibold text-royal-black mb-1.5"
                  >
                    Problem Description{" "}
                    <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="customer-description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="E.g. low suction, strange vibration, heavy grease on filters, new chimney fitting..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-royal-text text-sm transition-colors focus:outline-none focus:border-royal-gold focus:ring-1 focus:ring-royal-gold"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-royal-gold hover:bg-warm-gold text-royal-black font-bold text-base transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[50px] active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="w-5 h-5 fill-royal-black" />
                    <span>Proceed via WhatsApp</span>
                  </button>

                  <p className="text-[12px] text-gray-500 text-center mt-3">
                    Note: Clicking &apos;Proceed&apos; will open WhatsApp with your enquiry
                    pre-filled so you can send it directly.
                  </p>
                </div>
              </form>
            </div>

            {/* Brand Partnerships Section */}
            <div className="mt-6 bg-royal-surface rounded-2xl p-6 sm:p-7 border border-gray-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 shrink-0">
                    <Award className="w-5 h-5 text-royal-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        Multi-Brand Service Partnership
                      </span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-royal-black leading-tight mt-0.5">
                      Brand Partnerships &amp; Certified Support
                    </h4>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    100% Genuine Spare Parts
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-600 mt-3.5 mb-4 leading-relaxed">
                We provide certified doorstep cleaning, electronic motor diagnostics, switch PCB repairs, and original manufacturer replacement parts for all major brands:
              </p>

              {/* 6 Logos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {PARTNERSHIP_BRANDS.map((brand) => (
                  <div
                    key={brand.name}
                    className="bg-white rounded-xl p-3 border border-gray-200 shadow-xs hover:shadow-md hover:border-royal-gold/60 transition-all duration-200 flex flex-col items-center justify-center text-center group min-h-[86px]"
                  >
                    <div className="h-9 w-full flex items-center justify-center px-1">
                      <Image
                        src={brand.logo}
                        alt={brand.alt}
                        width={120}
                        height={32}
                        unoptimized
                        className="max-h-7 max-w-full w-auto h-auto object-contain transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-royal-black mt-2 tracking-tight group-hover:text-amber-600">
                      {brand.name}
                    </span>
                    <span className="text-[9px] text-gray-500 font-medium">
                      {brand.tagline}
                    </span>
                  </div>
                ))}
              </div>

              {/* Trust Badges Row */}
              <div className="mt-4 pt-3.5 border-t border-gray-200/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center">
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Original Brand Components</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-medium">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Factory-Trained Engineers</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-700 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-royal-gold shrink-0" />
                  <span>90-Day Post-Service Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
