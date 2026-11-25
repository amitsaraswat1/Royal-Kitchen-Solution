"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ArrowUp, MapPin } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS, SERVICES_DATA } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-royal-black text-white border-t border-royal-border pt-16 pb-28 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#home" className="inline-block group" aria-label="Shree Balaji Electronics Home">
              <div className="relative h-14 sm:h-16 w-52 sm:w-60 transition-transform group-hover:scale-105">
                <Image
                  src="/images/shree-balaji-logo-trans.png"
                  alt="Shree Balaji Electronics Logo"
                  fill
                  sizes="(max-width: 640px) 210px, 240px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Professional kitchen chimney cleaning, repair, installation, and appliance maintenance
              services by Shree Balaji Electronics. We deliver dedicated doorstep assistance across Delhi NCR.
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
                  <Link
                    href={link.href}
                    className="hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded py-0.5"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="/#faq"
                  className="hover:text-royal-gold transition-colors focus:outline-none focus-visible-gold rounded py-0.5"
                >
                  FAQ
                </a>
              </li>
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
                <WhatsAppIcon className="w-4 h-4 fill-emerald-400 shrink-0" />
                <a
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors focus:outline-none focus-visible-gold rounded"
                >
                  WhatsApp: {BUSINESS_INFO.displayPhone}
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
              <li className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-royal-gold shrink-0 mt-0.5" />
                <span className="text-gray-300 text-xs leading-relaxed">
                  {BUSINESS_INFO.address}
                </span>
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
            <span className="text-gray-600">|</span>
            <Link href="/admin" className="text-gray-500 hover:text-royal-gold transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
