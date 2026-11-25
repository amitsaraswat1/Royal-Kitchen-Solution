"use client";

import React, { useState } from "react";
import {
  MapPin,
  Search,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { BUSINESS_INFO } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export interface ServiceableArea {
  pincode: string;
  primaryArea: string;
  subAreas: string;
  zone: string;
  eta: string;
  isHub?: boolean;
}

export const SERVICEABLE_PIN_CODES: ServiceableArea[] = [
  {
    pincode: "110059",
    primaryArea: "Uttam Nagar & Mahindra Park",
    subAreas: "Mohan Garden, Hastsal, Bindapur, Matiala, Vikas Nagar, C2 Mahindra Park",
    zone: "West Delhi",
    eta: "30-45 Min (Primary Hub)",
    isHub: true,
  },
  {
    pincode: "110018",
    primaryArea: "Tilak Nagar & Fateh Nagar",
    subAreas: "Chaukhandi, Khyala, Vishnu Garden, Chand Nagar, Meenakshi Garden",
    zone: "West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110058",
    primaryArea: "Janakpuri & Jail Road",
    subAreas: "Blocks A, B, C, D Janakpuri, District Centre, Posangipur, Asalatpur",
    zone: "West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110075",
    primaryArea: "Dwarka Sector 1 to 10",
    subAreas: "Sector 6, Sector 10 Market, Sector 1, Sector 4, Matiala Extension",
    zone: "South West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110077",
    primaryArea: "Dwarka Sector 12 to 23",
    subAreas: "Sector 12, Sector 19, Sector 23, Pochanpur, Bagdola, Amberhai",
    zone: "South West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110078",
    primaryArea: "Dwarka Sector 3, 14 & Kakrola",
    subAreas: "Kakrola, NSIT, Sector 14 Metro, Bharat Vihar, Vegas Mall zone",
    zone: "South West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110027",
    primaryArea: "Rajouri Garden & Subhash Nagar",
    subAreas: "Tagore Garden, J-Block, Main Market, Pacific Mall Zone, Cambridge Road",
    zone: "West Delhi",
    eta: "45-60 Min Arrival",
  },
  {
    pincode: "110026",
    primaryArea: "Punjabi Bagh & Shivaji Park",
    subAreas: "East & West Punjabi Bagh, Shivaji Park, Madipur, Rohtak Road zone",
    zone: "West Delhi",
    eta: "60-75 Min Arrival",
  },
  {
    pincode: "110015",
    primaryArea: "Moti Nagar & Kirti Nagar",
    subAreas: "Ramesh Nagar, Karampura, Mansarover Garden, Industrial Area",
    zone: "West Delhi",
    eta: "60-75 Min Arrival",
  },
  {
    pincode: "110005",
    primaryArea: "Karol Bagh & Anand Parbat",
    subAreas: "Dev Nagar, Bank Street, Ajmal Khan Road, Military Road, Pusa Road",
    zone: "Central Delhi",
    eta: "60-90 Min Arrival",
  },
];

export default function ServiceablePinCodes() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAreas = SERVICEABLE_PIN_CODES.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;
    return (
      item.pincode.includes(term) ||
      item.primaryArea.toLowerCase().includes(term) ||
      item.subAreas.toLowerCase().includes(term) ||
      item.zone.toLowerCase().includes(term)
    );
  });

  const isExactPinMatched = SERVICEABLE_PIN_CODES.some(
    (a) => a.pincode === searchTerm.trim()
  );

  return (
    <section
      id="serviceable-pincodes"
      className="py-16 sm:py-20 bg-gradient-to-b from-royal-surface/40 via-white to-royal-surface/50 border-y border-royal-border/40 text-royal-text relative overflow-hidden"
    >
      {/* Subtle decorative glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-royal-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-royal-gold/10 border border-royal-gold/30 text-royal-gold text-xs sm:text-sm font-semibold mb-3 shadow-xs">
            <MapPin className="w-4 h-4 text-royal-gold" />
            <span>Doorstep Coverage Area</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-royal-black tracking-tight mb-3">
            Serviceable PIN Codes &amp; Localities
          </h2>
          <div className="w-16 h-1 bg-royal-gold mx-auto mb-4 rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our expert chimney service technicians are stationed locally across key
            Delhi hubs for quick 30–60 minute doorstep assistance with genuine spare parts.
          </p>

          {/* Quick PIN Search Input */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-royal-gold">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your PIN code (e.g. 110059) or locality..."
                className="w-full pl-11 pr-24 py-3 rounded-full bg-white border border-royal-gold/40 text-royal-black text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-royal-gold/50 focus:border-royal-gold transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Live Search Confirmation Badge */}
            {searchTerm.trim().length >= 3 && (
              <div className="mt-2 text-xs">
                {filteredAreas.length > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Doorstep service available for &quot;{searchTerm.trim()}&quot; ({filteredAreas.length} zone{filteredAreas.length > 1 ? "s" : ""})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-700 font-medium bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    No direct match found. Call {BUSINESS_INFO.displayPhone} to confirm immediate dispatch.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PIN Codes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {filteredAreas.map((area) => {
            const waBookingText = encodeURIComponent(
              `Hello Shree Balaji Electronics, I need kitchen chimney service at PIN Code ${area.pincode} (${area.primaryArea}). Please share available doorstep slots.`
            );
            const waUrl = `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${waBookingText}`;

            return (
              <div
                key={area.pincode}
                className={`relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 shadow-xs hover:shadow-md ${
                  area.isHub
                    ? "border-royal-gold shadow-gold/10 ring-1 ring-royal-gold/30"
                    : "border-gray-200 hover:border-royal-gold/60"
                }`}
              >
                {/* Top Badge: PIN Code */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-royal-black text-royal-gold font-mono font-bold text-xs tracking-wider">
                      <MapPin className="w-3 h-3 text-royal-gold" />
                      {area.pincode}
                    </span>

                    <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                      {area.zone}
                    </span>
                  </div>

                  {/* Primary Area */}
                  <h3 className="font-serif font-bold text-sm sm:text-base text-royal-black mb-1.5 leading-snug">
                    {area.primaryArea}
                  </h3>

                  {/* Sub Localities */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
                    {area.subAreas}
                  </p>
                </div>

                {/* Bottom ETA & WhatsApp Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-700">
                    <Zap className="w-3 h-3 text-amber-500 fill-amber-500 shrink-0" />
                    <span>{area.eta}</span>
                  </div>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition"
                    title={`Book via WhatsApp in ${area.pincode}`}
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-600" />
                    <span>Book</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Banner */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-royal-black text-white border border-royal-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-royal-dark border border-royal-gold/40 flex items-center justify-center text-royal-gold shrink-0">
              <ShieldCheck className="w-5 h-5 text-royal-gold" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Same-Day Doorstep Assistance Guaranteed</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-royal-gold text-royal-black font-extrabold">
                  All 10 PINs
                </span>
              </h4>
              <p className="text-xs text-gray-300">
                Technicians carry chimney degreasing kits, replacement filters, and motor rewinding parts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.callLink}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-royal-gold hover:bg-warm-gold text-royal-black font-bold text-xs sm:text-sm transition"
            >
              <Phone className="w-3.5 h-3.5 fill-royal-black" />
              <span>Call {BUSINESS_INFO.displayPhone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
