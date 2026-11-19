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
} from "lucide-react";
import { BUSINESS_INFO, SERVICE_OPTIONS } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

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

    // Form is valid! Generate WhatsApp URL
    const message = `*Kitchen Chimney Service Enquiry - Royal Kitchen Solution*
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

    setIsSubmitted(true);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-2xl bg-royal-black text-white border border-royal-border shadow-xl">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-royal-gold/40 shrink-0 bg-royal-dark shadow-sm">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Royal Kitchen Solution"
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white leading-tight">
                    Royal Kitchen
                  </h3>
                  <span className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-gold block">
                    S O L U T I O N
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-8 leading-relaxed">
                Contact our service desk for fast support, filter cleaning bookings, or
                urgent chimney breakdown visits.
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
                      WhatsApp Chat
                    </span>
                    <a
                      href={BUSINESS_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-lg font-bold text-white hover:text-emerald-400 transition-colors focus:outline-none focus-visible-gold rounded"
                    >
                      +91 70115 46526
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
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Enquiry Prepared!</p>
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Your WhatsApp application has been opened with your details. If it
                      did not open automatically, please click below or call us at 7011546526.
                    </p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
