"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS, SERVICES_DATA } from "@/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-black text-white border-t border-royal-border pt-16 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-royal-gold/40 shadow-sm shrink-0 bg-royal-dark">
                <Image
                  src="/images/logo-icon.png"
                  alt="Royal Kitchen Solution Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-wide text-white leading-tight">
                  Royal Kitchen
                </span>
                <span className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-gold">
                  S O L U T I O N
                </span>
                <span className="text-[9px] tracking-wider uppercase text-gray-400 mt-0.5">
                  Cleaning · Repair · Installation
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Professional kitchen chimney cleaning, repair, installation, and maintenance
              services. We deliver dedicated doorstep assistance to keep your kitchen
              smoke-free and hygienic.
            </p>

            <div className="pt-2">
              <span className="inline-block px-3 py-1 rounded-full bg-royal-dark border border-royal-gold/30 text-royal-gold text-xs font-medium">
                Doorstep Assistance Available
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-base font-bold text-royal-gold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded py-0.5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-royal-gold uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a
                    href="#services"
                    className="hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded py-0.5 block"
                  >
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-base font-bold text-royal-gold uppercase tracking-wider">
              Contact Desk
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-royal-gold shrink-0" />
                <a
                  href={BUSINESS_INFO.callLink}
                  className="hover:text-royal-gold transition-colors font-medium focus:outline-none focus-visible-gold rounded"
                >
                  {BUSINESS_INFO.displayPhone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible-gold rounded"
                >
                  WhatsApp: +91 70115 46526
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-royal-gold shrink-0" />
                <a
                  href={BUSINESS_INFO.emailLink}
                  className="hover:text-royal-gold transition-colors break-all focus:outline-none focus-visible-gold rounded"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <p className="text-xs text-gray-400">
                Operating Hours:
                <br />
                {BUSINESS_INFO.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {currentYear} {BUSINESS_INFO.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-royal-gold transition-colors">
              Back to Top
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">Premium Kitchen Chimney Care</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
