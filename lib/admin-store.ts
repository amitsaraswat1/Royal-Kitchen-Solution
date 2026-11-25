"use client";

import { DETAILED_SERVICES, DetailedService } from "@/data/services-content";
import { BLOG_POSTS, BlogPost } from "@/data/blogs-content";
import { PRICING_DATA, PricingItem, BUSINESS_INFO } from "@/data/content";
import { RATE_CARD_ITEMS, RateCardItem } from "@/data/rate-card";
import {
  BookingLead,
  Technician,
  AdminServiceItem,
  INITIAL_BOOKINGS,
  INITIAL_TECHNICIANS,
  INITIAL_ADMIN_SERVICES,
} from "@/data/admin-mock-data";

export type { DetailedService, BlogPost, PricingItem, BookingLead, Technician, AdminServiceItem, RateCardItem };

export interface AdminCredentials {
  username: string;
  password: string;
}

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: "admin",
  password: "admin123",
};

export interface BusinessSettings {
  helplinePhone: string;
  whatsappNumber: string;
  workingHours: string;
  serviceAreas: string;
  emergencySupport: boolean;
  doorstepNotice: string;
}

const STORAGE_KEYS = {
  SERVICES: "rks_store_services_v3",
  PRICING: "rks_store_pricing_v3",
  RATE_CARD: "rks_store_rate_card_v3",
  BLOGS: "rks_store_blogs_v3",
  TECHNICIANS: "rks_store_techs_v3",
  BOOKINGS: "rks_store_bookings_v3",
  SETTINGS: "rks_store_settings_v3",
  CREDENTIALS: "sb_admin_credentials_v1",
};

// Dispatch global event so all pages and components re-render immediately
export const notifyStoreChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("rks_store_updated"));
  }
};

// =========================================================================
// SERVICES CRUD
// =========================================================================
export const getStoredServices = (): DetailedService[] => {
  if (typeof window === "undefined") return DETAILED_SERVICES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading services from storage", e);
  }
  return DETAILED_SERVICES;
};

export const saveServiceItem = (service: DetailedService) => {
  if (typeof window === "undefined") return;
  const current = getStoredServices();
  const index = current.findIndex((s) => s.slug === service.slug || s.id === service.id);
  let updated: DetailedService[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = service;
  } else {
    updated = [service, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
  notifyStoreChange();
};

export const deleteServiceItem = (slugOrId: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredServices();
  const updated = current.filter((s) => s.slug !== slugOrId && s.id !== slugOrId);
  localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// PRICING CRUD
// =========================================================================
export const getStoredPricing = (): PricingItem[] => {
  if (typeof window === "undefined") return PRICING_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRICING);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading pricing from storage", e);
  }
  return PRICING_DATA;
};

export const savePricingItem = (item: PricingItem) => {
  if (typeof window === "undefined") return;
  const current = getStoredPricing();
  const index = current.findIndex((p) => p.id === item.id);
  let updated: PricingItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = item;
  } else {
    updated = [...current, item];
  }
  localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(updated));
  notifyStoreChange();
};

export const deletePricingItem = (id: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredPricing();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.PRICING, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// RATE CARD CRUD (OFFICIAL COMPLETE APPLIANCE PRICE LIST)
// =========================================================================
export const getStoredRateCard = (): RateCardItem[] => {
  if (typeof window === "undefined") return RATE_CARD_ITEMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RATE_CARD);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading rate card from storage", e);
  }
  return RATE_CARD_ITEMS;
};

export const saveRateCardItem = (item: RateCardItem) => {
  if (typeof window === "undefined") return;
  const current = getStoredRateCard();
  const normalizedItem: RateCardItem = {
    ...item,
    priceDisplay: item.priceDisplay || `₹${item.price}`,
  };
  const index = current.findIndex((p) => p.id === normalizedItem.id);
  let updated: RateCardItem[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = normalizedItem;
  } else {
    updated = [normalizedItem, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.RATE_CARD, JSON.stringify(updated));
  notifyStoreChange();
};

export const deleteRateCardItem = (id: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredRateCard();
  const updated = current.filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEYS.RATE_CARD, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// BLOGS CRUD
// =========================================================================
export const getStoredBlogs = (): BlogPost[] => {
  if (typeof window === "undefined") return BLOG_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BLOGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading blogs from storage", e);
  }
  return BLOG_POSTS;
};

export const saveBlogItem = (blog: BlogPost) => {
  if (typeof window === "undefined") return;
  const current = getStoredBlogs();
  const index = current.findIndex((b) => b.slug === blog.slug);
  let updated: BlogPost[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = blog;
  } else {
    updated = [blog, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  notifyStoreChange();
};

export const deleteBlogItem = (slug: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredBlogs();
  const updated = current.filter((b) => b.slug !== slug);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// TECHNICIANS CRUD
// =========================================================================
export const getStoredTechnicians = (): Technician[] => {
  if (typeof window === "undefined") return INITIAL_TECHNICIANS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TECHNICIANS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading technicians from storage", e);
  }
  return INITIAL_TECHNICIANS;
};

export const saveTechnicianItem = (tech: Technician) => {
  if (typeof window === "undefined") return;
  const current = getStoredTechnicians();
  const index = current.findIndex((t) => t.id === tech.id);
  let updated: Technician[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = tech;
  } else {
    updated = [...current, tech];
  }
  localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(updated));
  notifyStoreChange();
};

export const deleteTechnicianItem = (id: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredTechnicians();
  const updated = current.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// BOOKINGS CRUD
// =========================================================================
export const getStoredBookings = (): BookingLead[] => {
  if (typeof window === "undefined") return INITIAL_BOOKINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error("Error reading bookings from storage", e);
  }
  return INITIAL_BOOKINGS;
};

export const saveBookingItem = (booking: BookingLead) => {
  if (typeof window === "undefined") return;
  const current = getStoredBookings();
  const index = current.findIndex((b) => b.id === booking.id);
  let updated: BookingLead[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = booking;
  } else {
    updated = [booking, ...current];
  }
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  notifyStoreChange();
};

export const deleteBookingItem = (id: string) => {
  if (typeof window === "undefined") return;
  const current = getStoredBookings();
  const updated = current.filter((b) => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  notifyStoreChange();
};

// =========================================================================
// BUSINESS SETTINGS
// =========================================================================
export const DEFAULT_BUSINESS_SETTINGS: BusinessSettings = {
  helplinePhone: BUSINESS_INFO.displayPhone,
  whatsappNumber: BUSINESS_INFO.whatsappNumber,
  workingHours: BUSINESS_INFO.hours,
  serviceAreas: "Delhi, Noida, Gurgaon, Ghaziabad, Greater Noida, Faridabad",
  emergencySupport: true,
  doorstepNotice: "Delivering uninterrupted same-day chimney service across Delhi NCR.",
};

export const getStoredBusinessSettings = (): BusinessSettings => {
  if (typeof window === "undefined") return DEFAULT_BUSINESS_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return { ...DEFAULT_BUSINESS_SETTINGS, ...parsed };
    }
  } catch (e) {
    console.error("Error reading settings from storage", e);
  }
  return DEFAULT_BUSINESS_SETTINGS;
};

export const saveStoredBusinessSettings = (settings: BusinessSettings) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  notifyStoreChange();
};

// =========================================================================
// ADMIN CREDENTIALS (USERNAME & PASSWORD)
// =========================================================================
export const getStoredAdminCredentials = (): AdminCredentials => {
  if (typeof window === "undefined") return DEFAULT_ADMIN_CREDENTIALS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CREDENTIALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.username && parsed.password) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading admin credentials from storage", e);
  }
  return DEFAULT_ADMIN_CREDENTIALS;
};

export const saveStoredAdminCredentials = (credentials: AdminCredentials) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials));
  notifyStoreChange();
};

// =========================================================================
// RESET ALL STORE DATA TO FACTORY DEFAULTS
// =========================================================================
export const resetStoreToDefaults = () => {
  if (typeof window === "undefined") return;
  Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  notifyStoreChange();
};
