"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { BUSINESS_INFO, NAV_LINKS } from "@/data/content";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { getStoredServices } from "@/lib/admin-store";

export const SERVICE_DROPDOWN_ITEMS = [
  {
    name: "Chimney Deep Cleaning",
    slug: "deep-cleaning",
    href: "/services/deep-cleaning",
    desc: "Complete filter, blower & internal degreasing",
  },
  {
    name: "Chimney Repair & Diagnostics",
    slug: "repair-diagnostics",
    href: "/services/repair-diagnostics",
    desc: "Low suction, strange noise & motor fixes",
  },
  {
    name: "Installation & Fitting",
    slug: "installation-uninstallation",
    href: "/services/installation-uninstallation",
    desc: "Precision wall mounting & duct routing",
  },
  {
    name: "Filter Replacement",
    slug: "filter-replacement",
    href: "/services/filter-replacement",
    desc: "OEM stainless baffle & carbon filters",
  },
  {
    name: "Motor Repair & Winding",
    slug: "motor-repair",
    href: "/services/motor-repair",
    desc: "100% copper rewinding & capacitor swap",
  },
  {
    name: "Annual AMC Contracts",
    slug: "annual-maintenance",
    href: "/services/annual-maintenance",
    desc: "Quarterly cleaning & unlimited breakdown visits",
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(true);
  const [headerServices, setHeaderServices] = useState(SERVICE_DROPDOWN_ITEMS);
  const pathname = usePathname();

  useEffect(() => {
    const syncHeader = () => {
      const stored = getStoredServices();
      if (stored && stored.length > 0) {
        setHeaderServices(
          stored.map((s) => ({
            name: s.title.split("&")[0].trim(),
            slug: s.slug,
            href: `/services/${s.slug}`,
            desc: s.tagline || s.badge,
          }))
        );
      }
    };
    syncHeader();

    window.addEventListener("rks_store_updated", syncHeader);
    window.addEventListener("storage", syncHeader);
    return () => {
      window.removeEventListener("rks_store_updated", syncHeader);
      window.removeEventListener("storage", syncHeader);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Helper to resolve links properly across all standalone pages
  const getHref = (linkHref: string) => {
    if (linkHref === "/services") return "/services";
    if (linkHref === "/blogs") return "/blogs";
    if (linkHref === "/pricing") return "/pricing";
    if (linkHref === "/about") return "/about";
    if (linkHref === "/gallery") return "/gallery";
    if (linkHref === "/contact") return "/contact";
    if (linkHref === "/") return "/";
    if (pathname !== "/") {
      // If we are on other pages, link back to home with anchor
      if (linkHref.startsWith("#")) {
        return `/${linkHref}`;
      }
      return linkHref;
    }
    return linkHref;
  };

  const isLinkActive = (linkHref: string) => {
    if (linkHref === "/" && pathname === "/") return true;
    if (linkHref === "/services" && pathname.startsWith("/services")) return true;
    if (linkHref === "/blogs" && pathname.startsWith("/blogs")) return true;
    if (linkHref === "/pricing" && pathname.startsWith("/pricing")) return true;
    if (linkHref === "/about" && pathname.startsWith("/about")) return true;
    if (linkHref === "/gallery" && pathname.startsWith("/gallery")) return true;
    if (linkHref === "/contact" && pathname.startsWith("/contact")) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-2.5 sm:py-3 shadow-md border-b border-gray-200"
          : "bg-white/95 backdrop-blur-sm py-3 sm:py-4 border-b border-gray-100 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between w-full">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible-gold rounded-lg py-1 shrink-0"
            aria-label="Shree Balaji Electronics Home"
          >
            <div className="relative h-11 sm:h-13 md:h-14 w-44 sm:w-52 md:w-56 transition-transform group-hover:scale-105">
              <Image
                src="/images/logo-header-light.png"
                alt="Shree Balaji Electronics"
                fill
                sizes="(max-width: 640px) 180px, (max-width: 1024px) 210px, 230px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const href = getHref(link.href);
              const isActive = isLinkActive(link.href);

              if (link.name === "Services") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <Link
                      href="/services"
                      className={`text-sm font-semibold transition-colors focus:outline-none focus-visible-gold rounded px-1.5 py-1 flex items-center gap-1 ${
                        isActive
                          ? "text-royal-gold font-bold underline underline-offset-4 decoration-royal-gold"
                          : "text-gray-800 hover:text-royal-gold"
                      }`}
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isServicesDropdownOpen ? "rotate-180 text-royal-gold" : "text-gray-700"
                        }`}
                      />
                    </Link>

                    {/* Dropdown Menu - Clean White Card Theme */}
                    {isServicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1">
                        <div className="bg-white border border-gray-200 rounded-2xl p-2.5 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
                          <div className="px-3 py-2 border-b border-gray-100 mb-1 flex items-center justify-between bg-gray-50 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-royal-gold">
                              Kitchen Chimney Services
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">Doorstep</span>
                          </div>
                          {headerServices.map((item) => (
                            <Link
                              key={item.slug}
                              href={item.href}
                              onClick={() => setIsServicesDropdownOpen(false)}
                              className="group flex flex-col p-2.5 rounded-xl hover:bg-amber-50/60 border border-transparent transition-all"
                            >
                              <span className="text-sm font-semibold text-gray-900 group-hover:text-royal-gold transition-colors">
                                {item.name}
                              </span>
                              <span className="text-xs text-gray-500 group-hover:text-gray-700 line-clamp-1">
                                {item.desc}
                              </span>
                            </Link>
                          ))}
                          <div className="pt-2 mt-1 border-t border-gray-100">
                            <Link
                              href="/services"
                              onClick={() => setIsServicesDropdownOpen(false)}
                              className="block text-center py-2 px-3 text-xs font-bold text-royal-gold hover:text-warm-gold hover:underline bg-gray-50 rounded-xl"
                            >
                              View All Services Hub →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={href}
                  className={`text-sm font-semibold transition-colors focus:outline-none focus-visible-gold rounded px-1.5 py-1 ${
                    isActive
                      ? "text-royal-gold font-bold underline underline-offset-4 decoration-royal-gold"
                      : "text-gray-800 hover:text-royal-gold"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={BUSINESS_INFO.callLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-royal-gold hover:bg-warm-gold text-royal-black font-bold text-sm transition-all duration-200 shadow-gold hover:shadow-gold-glow focus:outline-none focus-visible-gold min-h-[44px]"
            >
              <Phone className="w-4 h-4 fill-royal-black" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Mobile Right Controls: Hamburger menu */}
          <div className="flex items-center lg:hidden shrink-0 ml-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-900 hover:text-royal-gold focus:outline-none focus-visible-gold min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center shrink-0 shadow-sm"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
              ) : (
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-gray-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 shadow-2xl">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const href = getHref(link.href);
              const isActive = isLinkActive(link.href);

              if (link.name === "Services") {
                return (
                  <div key={link.name} className="flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium text-gray-900 hover:bg-gray-50">
                      <Link
                        href="/services"
                        onClick={closeMenu}
                        className={`flex-1 ${
                          isActive ? "text-royal-gold font-bold" : "text-gray-900"
                        }`}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="p-1 rounded text-gray-700 hover:text-royal-gold"
                        aria-label="Toggle services list"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isMobileServicesOpen ? "rotate-180 text-royal-gold" : "text-gray-700"
                          }`}
                        />
                      </button>
                    </div>

                    {isMobileServicesOpen && (
                      <div className="pl-6 pr-2 py-1 space-y-1 bg-gray-50 rounded-xl my-1 border border-gray-200">
                        {headerServices.map((item) => (
                          <Link
                            key={item.slug}
                            href={item.href}
                            onClick={closeMenu}
                            className="block py-2 text-sm text-gray-800 hover:text-royal-gold transition-colors font-medium"
                          >
                            • {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={href}
                  onClick={closeMenu}
                  className={`px-4 py-3 rounded-lg text-base font-semibold transition-colors focus:outline-none focus-visible-gold min-h-[44px] flex items-center ${
                    isActive
                      ? "text-royal-gold bg-amber-50 font-bold"
                      : "text-gray-900 hover:text-royal-gold hover:bg-gray-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
            <a
              href={BUSINESS_INFO.callLink}
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-royal-gold text-royal-black font-bold text-base transition-colors focus:outline-none focus-visible-gold min-h-[48px]"
            >
              <Phone className="w-5 h-5 fill-royal-black" />
              <span>Call Now: {BUSINESS_INFO.displayPhone}</span>
            </a>
            <a
              href={BUSINESS_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-base transition-colors focus:outline-none focus-visible-gold min-h-[48px]"
            >
              <WhatsAppIcon className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
