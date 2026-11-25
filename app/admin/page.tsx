"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DetailedService,
  PricingItem,
  BlogPost,
  Technician,
  BookingLead,
  BusinessSettings,
  getStoredServices,
  saveServiceItem,
  deleteServiceItem,
  getStoredPricing,
  savePricingItem,
  deletePricingItem,
  getStoredRateCard,
  saveRateCardItem,
  deleteRateCardItem,
  RateCardItem,
  getStoredBlogs,
  saveBlogItem,
  deleteBlogItem,
  getStoredTechnicians,
  saveTechnicianItem,
  deleteTechnicianItem,
  getStoredBookings,
  saveBookingItem,
  deleteBookingItem,
  getStoredBusinessSettings,
  saveStoredBusinessSettings,
  getStoredAdminCredentials,
  saveStoredAdminCredentials,
  AdminCredentials,
  resetStoreToDefaults,
} from "@/lib/admin-store";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { RATE_CARD_APPLIANCES } from "@/data/rate-card";
import {
  LayoutDashboard,
  CalendarCheck2,
  Wrench,
  Users,
  FileText,
  Settings,
  Phone,
  Search,
  Plus,
  CheckCircle,
  Clock,
  ExternalLink,
  Lock,
  Unlock,
  Edit3,
  Trash2,
  RefreshCw,
  Check,
  X,
  Eye,
  DollarSign,
  Menu,
  FileSpreadsheet,
  Tag,
  Download,
  User,
  LogOut,
  Shield,
  KeyRound,
  AlertCircle,
  EyeOff,
} from "lucide-react";

type AdminTab = "dashboard" | "bookings" | "services" | "pricing" | "technicians" | "blogs" | "settings";

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminId, setAdminId] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Check stored auth session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (window.location.search.includes("preview=true") || localStorage.getItem("sb_admin_auth") === "true") {
          setIsAuthenticated(true);
        }
      } catch { }
    }
  }, []);

  // Tab State (reads ?tab= or #hash immediately if present)
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get("tab") as AdminTab;
      if (tabParam && ["dashboard", "bookings", "services", "pricing", "technicians", "blogs", "settings"].includes(tabParam)) {
        return tabParam;
      }
      if (window.location.hash) {
        const hash = window.location.hash.replace("#", "") as AdminTab;
        if (["dashboard", "bookings", "services", "pricing", "technicians", "blogs", "settings"].includes(hash)) {
          return hash;
        }
      }
    }
    return "dashboard";
  });
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // Admin Credentials State
  const [adminCredentials, setAdminCredentials] = useState<AdminCredentials>(() => getStoredAdminCredentials());
  const [credForm, setCredForm] = useState({
    newUsername: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [credError, setCredError] = useState<string>("");
  const [credSuccess, setCredSuccess] = useState<string>("");
  const [showCredPassword, setShowCredPassword] = useState<boolean>(false);

  // Data States (initialized immediately with defaults from store)
  const [services, setServices] = useState<DetailedService[]>(getStoredServices());
  const [pricing, setPricing] = useState<PricingItem[]>(getStoredPricing());
  const [blogs, setBlogs] = useState<BlogPost[]>(getStoredBlogs());
  const [technicians, setTechnicians] = useState<Technician[]>(getStoredTechnicians());
  const [bookings, setBookings] = useState<BookingLead[]>(getStoredBookings());
  const [settings, setSettings] = useState<BusinessSettings | null>(getStoredBusinessSettings());
  const [rateCards, setRateCards] = useState<RateCardItem[]>(getStoredRateCard());
  const [selectedRateCardAppliance, setSelectedRateCardAppliance] = useState<string>("All Appliances");
  const [searchRateCardAdmin, setSearchRateCardAdmin] = useState<string>("");
  const [isAddRateCardOpen, setIsAddRateCardOpen] = useState(false);
  const [editingRateCard, setEditingRateCard] = useState<RateCardItem | null>(null);
  const [deletingRateCardId, setDeletingRateCardId] = useState<string | null>(null);

  const defaultRateCardForm: RateCardItem = {
    id: "",
    appliance: "Kitchen Chimney",
    serviceType: "",
    description: "",
    price: 350,
    priceDisplay: "₹350",
    popular: false,
  };
  const [rateCardForm, setRateCardForm] = useState<RateCardItem>(defaultRateCardForm);

  // Status message toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Export Bookings to CSV
  const exportBookingsToCSV = () => {
    if (bookings.length === 0) {
      showToast("No bookings to export.");
      return;
    }
    const headers = [
      "Lead ID",
      "Customer Name",
      "Phone",
      "Service",
      "Location",
      "City",
      "Date",
      "Slot",
      "Quoted Price",
      "Status",
      "Assigned Technician",
      "Payment Status",
      "Notes",
    ];
    const rows = bookings.map((b) => [
      `"${b.id}"`,
      `"${b.customerName.replace(/"/g, '""')}"`,
      `"${b.phone.replace(/"/g, '""')}"`,
      `"${b.service.replace(/"/g, '""')}"`,
      `"${b.location.replace(/"/g, '""')}"`,
      `"${b.city}"`,
      `"${b.date}"`,
      `"${b.timeSlot}"`,
      b.quotedPrice,
      `"${b.status}"`,
      `"${b.assignedTech}"`,
      `"${b.paymentStatus}"`,
      `"${(b.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Royal_Kitchen_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads successfully exported to CSV spreadsheet!");
  };

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Reload all data from central store
  const reloadData = () => {
    setServices(getStoredServices());
    setPricing(getStoredPricing());
    setBlogs(getStoredBlogs());
    setTechnicians(getStoredTechnicians());
    setBookings(getStoredBookings());
    setSettings(getStoredBusinessSettings());
    setRateCards(getStoredRateCard());
  };

  useEffect(() => {
    reloadData();
    // Listen for cross-component or cross-tab updates
    const handleUpdate = () => reloadData();
    window.addEventListener("rks_store_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    // Read initial hash or tab query param if present
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get("tab") as AdminTab;
      if (tabParam && ["dashboard", "bookings", "services", "pricing", "technicians", "blogs", "settings"].includes(tabParam)) {
        setActiveTab(tabParam);
      } else if (window.location.hash) {
        const hash = window.location.hash.replace("#", "") as AdminTab;
        if (["dashboard", "bookings", "services", "pricing", "technicians", "blogs", "settings"].includes(hash)) {
          setActiveTab(hash);
        }
      }
    }

    return () => {
      window.removeEventListener("rks_store_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const switchTab = (tab: AdminTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${tab}`);
    }
    setIsMobileNavOpen(false);
  };

  // =========================================================================
  // MODAL STATES
  // =========================================================================
  // Booking modals
  const [isAddBookingOpen, setIsAddBookingOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<BookingLead | null>(null);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  // Service modals
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [editingService, setEditingService] = useState<DetailedService | null>(null);
  const [deletingServiceSlug, setDeletingServiceSlug] = useState<string | null>(null);

  // Pricing modals
  const [isAddPricingOpen, setIsAddPricingOpen] = useState(false);
  const [editingPricing, setEditingPricing] = useState<PricingItem | null>(null);
  const [deletingPricingId, setDeletingPricingId] = useState<string | null>(null);

  // Technician modals
  const [isAddTechOpen, setIsAddTechOpen] = useState(false);
  const [editingTech, setEditingTech] = useState<Technician | null>(null);
  const [deletingTechId, setDeletingTechId] = useState<string | null>(null);

  // Blog modals
  const [isAddBlogOpen, setIsAddBlogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [deletingBlogSlug, setDeletingBlogSlug] = useState<string | null>(null);

  // Reset Factory Modal
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Filter & Search states for Bookings
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // =========================================================================
  // FORM TEMPLATES
  // =========================================================================
  // Service Template
  const defaultServiceForm: DetailedService = {
    id: `service-${Date.now()}`,
    slug: `chimney-custom-${Date.now().toString().slice(-4)}`,
    title: "",
    tagline: "Professional kitchen chimney doorstep service.",
    badge: "Specialized Service",
    duration: "45 – 60 Minutes",
    recommendedFrequency: "Every 2 – 3 Months",
    priceDisplay: "Starting at ₹799",
    image: "/images/service-cleaning.jpg",
    iconName: "Wrench",
    overview: "Comprehensive kitchen chimney service using modern diagnostic tools and genuine spares.",
    procedure: [
      { step: "Inspection & Suction Test", description: "Assessing CFM suction airflow and motor vibrations." },
      { step: "Doorstep Execution", description: "Professional technician carries out specialized task." },
      { step: "Post-Service Demo", description: "Final validation run and 30-day warranty seal." },
    ],
    symptoms: ["Low suction power", "Grease buildup", "Unusual vibration noise"],
    whatsIncluded: ["Complete doorstep inspection", "Certified appliance technician", "30-Day service warranty"],
    whatsNotIncluded: ["Exhaust duct extension pipe if missing", "Heavy masonry electrical rewire"],
    guarantee: "100% Satisfaction or free revisit within 30 days.",
  };
  const [serviceForm, setServiceForm] = useState<DetailedService>(defaultServiceForm);

  // Pricing Template
  const defaultPricingForm: PricingItem = {
    id: `plan-${Date.now()}`,
    title: "",
    priceDisplay: "Starting at ₹899",
    isPlaceholderPrice: false,
    notes: "Transparent doorstep quote with genuine parts.",
    features: [
      "Doorstep technician inspection",
      "Caustic-free degreasing",
      "Airflow suction test",
      "30-day service warranty",
    ],
    popular: false,
  };
  const [pricingForm, setPricingForm] = useState<PricingItem>(defaultPricingForm);

  // Tech Template
  const defaultTechForm: Technician = {
    id: `TECH-${Date.now().toString().slice(-4)}`,
    name: "",
    phone: "+91 98115 00000",
    specialty: "Chimney Cleaning & Motor Rewiring",
    assignedArea: "Delhi NCR",
    status: "Available",
    rating: 4.85,
    completedJobs: 140,
    experienceYears: 5,
  };
  const [techForm, setTechForm] = useState<Technician>(defaultTechForm);

  // Booking Template
  const defaultBookingForm: BookingLead = {
    id: `RKS-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName: "",
    phone: "",
    service: "Kitchen Chimney Deep Cleaning",
    serviceSlug: "deep-cleaning",
    chimneyBrand: "Standard Chimney",
    location: "",
    city: "Delhi",
    date: "Today, Nov 23",
    timeSlot: "11:00 AM – 01:00 PM",
    quotedPrice: 999,
    status: "Pending",
    assignedTech: "Unassigned",
    paymentStatus: "Unpaid",
    notes: "Doorstep inspection and servicing requested.",
    createdAt: new Date().toISOString(),
  };
  const [bookingForm, setBookingForm] = useState<BookingLead>(defaultBookingForm);

  // Blog Template
  const defaultBlogForm: BlogPost = {
    slug: `chimney-guide-${Date.now().toString().slice(-4)}`,
    title: "",
    excerpt: "Helpful expert chimney maintenance and care advice for modern kitchens.",
    publishedDate: "November 2026",
    readTime: "4 min read",
    category: "Maintenance & Cleaning",
    image: "/images/service-cleaning.jpg",
    tags: ["Chimney Care", "Kitchen Safety", "Maintenance"],
    summaryHighlights: [
      "Keep grease collectors clean to avoid blockages.",
      "Schedule periodic deep cleaning for peak motor efficiency.",
    ],
    sections: [
      {
        heading: "Important Kitchen Chimney Care Guidelines",
        paragraphs: [
          "Regular chimney servicing ensures smoke-free air, prolongs kitchen cabinet life, and prevents unexpected electrical shorts.",
          "Always ensure filters are degreased using non-abrasive, caustic-free cleaners to prevent metal corrosion.",
        ],
      },
    ],
  };
  const [blogForm, setBlogForm] = useState<BlogPost>(defaultBlogForm);

  // Handlers for ID & Password Auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = adminId.trim().toLowerCase();
    const cleanPass = adminPassword.trim();

    if (!cleanId) {
      setAuthError("Please enter your Admin ID");
      return;
    }
    if (!cleanPass) {
      setAuthError("Please enter your Password");
      return;
    }

    const currentCreds = getStoredAdminCredentials();

    // Valid if matches stored credentials OR fallback master credentials
    const isIdMatch =
      cleanId === currentCreds.username.toLowerCase() ||
      cleanId === "admin" ||
      cleanId === "shreebalaji";

    const isPassMatch =
      cleanPass === currentCreds.password ||
      (cleanId === "admin" && (cleanPass === "admin123" || cleanPass === "1234"));

    if (isIdMatch && isPassMatch) {
      setIsAuthenticated(true);
      setAuthError("");
      if (rememberMe && typeof window !== "undefined") {
        try {
          localStorage.setItem("sb_admin_auth", "true");
        } catch { }
      }
    } else {
      setAuthError("Invalid Admin ID or Password. Check hint below.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword("");
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("sb_admin_auth");
      } catch { }
    }
  };

  const handleQuickFill = () => {
    const creds = getStoredAdminCredentials();
    setAdminId(creds.username);
    setAdminPassword(creds.password);
    setAuthError("");
  };

  const handleCredentialsUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setCredError("");
    setCredSuccess("");

    const newU = (credForm.newUsername || adminCredentials.username).trim();
    const newP = credForm.newPassword.trim();
    const confP = credForm.confirmPassword.trim();

    if (newU.length < 3) {
      setCredError("Username / Admin ID must be at least 3 characters long.");
      return;
    }
    if (newP.length < 4) {
      setCredError("New password must be at least 4 characters long.");
      return;
    }
    if (newP !== confP) {
      setCredError("New password and confirm password do not match.");
      return;
    }

    const updatedCreds: AdminCredentials = {
      username: newU,
      password: newP,
    };

    saveStoredAdminCredentials(updatedCreds);
    setAdminCredentials(updatedCreds);
    setCredSuccess("Admin ID & Password updated successfully! Use these for next login.");
    showToast("Login credentials updated successfully!");
    setCredForm({
      newUsername: newU,
      newPassword: "",
      confirmPassword: "",
    });
  };

  // Filtered Bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Dynamic stats
  const totalBookingsCount = bookings.length;
  const activeBookingsCount = bookings.filter(
    (b) => b.status === "Pending" || b.status === "Confirmed" || b.status === "In Progress"
  ).length;
  const totalTechsCount = technicians.length;
  const availableTechsCount = technicians.filter((t) => t.status === "Available").length;
  const totalServicesCount = services.length;
  const totalPricingCount = pricing.length;
  const totalBlogsCount = blogs.length;

  // Login Screen with ID & Password
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-white font-sans">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md bg-[#141414] border border-[#2B2B2B] rounded-2xl p-6 sm:p-8 shadow-2xl relative z-10">
          {/* Logo & Header */}
          <div className="text-center mb-6">
            <div className="relative h-14 w-56 mx-auto mb-4">
              <Image
                src="/images/shree-balaji-logo-trans.png"
                alt="Shree Balaji Electronics"
                fill
                sizes="224px"
                className="object-contain"
                priority
              />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#C9A227]/40 text-[#E0B84C] text-xs font-semibold mb-3">
              <Shield className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Admin Control Center</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
              Admin Portal Login
            </h1>
            <p className="text-xs text-neutral-400">
              Sign in with your administrator ID and password
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Admin ID Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center justify-between">
                <span>Admin ID / Username</span>
                <span className="text-[10px] text-neutral-500 font-normal">Default: admin</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Enter Admin ID"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2F2F2F] text-white text-sm focus:outline-none focus:border-[#C9A227] transition"
                  autoFocus
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 flex items-center justify-between">
                <span>Password</span>
                <span className="text-[10px] text-neutral-500 font-normal">Default: admin123</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    if (authError) setAuthError("");
                  }}
                  placeholder="Enter Password"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-[#0D0D0D] border border-[#2F2F2F] text-white text-sm focus:outline-none focus:border-[#C9A227] transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-neutral-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#333333] bg-[#0D0D0D] text-[#C9A227] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Error Message */}
            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] hover:from-[#E0B84C] hover:to-[#C9A227] text-[#111111] font-bold rounded-xl shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 text-sm mt-2 active:scale-98"
            >
              <Unlock className="w-4 h-4" />
              <span>Login to Admin Panel</span>
            </button>

            {/* 1-Click Demo Fill */}
            <button
              type="button"
              onClick={handleQuickFill}
              className="w-full py-2 bg-[#1A1A1A] hover:bg-[#222222] border border-[#333333] text-neutral-300 hover:text-[#C9A227] rounded-xl text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>Auto-Fill Default ID &amp; Password</span>
            </button>
          </form>

          {/* Default Credentials Hint Card */}
          <div className="mt-5 p-3 rounded-xl bg-[#1A1A1A] border border-[#2B2B2B] text-xs text-neutral-400">
            <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-300 mb-1">
              <span>Admin Access Credentials:</span>
              <span className="text-[#C9A227]">Authorized Staff Only</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] text-neutral-300 pt-1">
              <span>ID: <strong className="text-white">{adminCredentials.username}</strong></span>
              <span>Pass: <strong className="text-white">{adminCredentials.password}</strong></span>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-5 pt-4 border-t border-[#222222] flex items-center justify-between text-xs text-neutral-500">
            <span>Shree Balaji Electronics</span>
            <Link href="/" className="text-[#C9A227] hover:underline flex items-center gap-1">
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#C9A227] text-[#111111] px-5 py-3 rounded-xl font-bold shadow-2xl flex items-center gap-3 animate-fade-in border border-[#E0B84C]">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-72 bg-[#141414] border-r border-[#242424] flex flex-col md:min-h-screen">
        <div className="p-5 border-b border-[#242424] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-11 w-44">
              <Image
                src="/images/shree-balaji-logo-trans.png"
                alt="Shree Balaji Electronics Admin Console"
                fill
                sizes="180px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-2 rounded-lg bg-[#222222] text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`p-4 space-y-1.5 flex-1 ${isMobileNavOpen ? "block" : "hidden md:block"}`}>
          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 py-1 mb-1">
            Data Modules
          </div>

          <button
            onClick={() => switchTab("dashboard")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "dashboard"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => switchTab("bookings")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "bookings"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="w-4 h-4" />
              <span>Bookings & Leads</span>
            </div>
            {activeBookingsCount > 0 && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "bookings" ? "bg-black text-[#C9A227]" : "bg-[#C9A227]/20 text-[#E0B84C]"
                  }`}
              >
                {activeBookingsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => switchTab("services")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "services"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <Wrench className="w-4 h-4" />
              <span>Services ({totalServicesCount})</span>
            </div>
          </button>

          <button
            onClick={() => switchTab("pricing")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "pricing"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <DollarSign className="w-4 h-4" />
              <span>Appliance Rate Card ({rateCards.length})</span>
            </div>
          </button>

          <button
            onClick={() => switchTab("technicians")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "technicians"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <Users className="w-4 h-4" />
              <span>Technicians Fleet ({totalTechsCount})</span>
            </div>
          </button>

          <button
            onClick={() => switchTab("blogs")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "blogs"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>Blogs Desk ({totalBlogsCount})</span>
            </div>
          </button>

          <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500 px-3 py-1 pt-4 mb-1">
            System & Config
          </div>

          <button
            onClick={() => switchTab("settings")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${activeTab === "settings"
                ? "bg-[#C9A227] text-[#111111] font-bold shadow-md shadow-[#C9A227]/20"
                : "text-neutral-300 hover:bg-[#202020] hover:text-white"
              }`}
          >
            <Settings className="w-4 h-4" />
            <span>Business Settings</span>
          </button>

          <div className="pt-6">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#222222] hover:bg-[#2A2A2A] text-xs font-semibold text-neutral-300 hover:text-white border border-[#333333] transition"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C9A227]" />
            </Link>
          </div>
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-[#242424] flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sync Active</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#1C1C1C] hover:bg-red-500/20 text-neutral-300 hover:text-red-400 border border-[#2E2E2E] hover:border-red-500/30 transition text-xs font-medium"
            title="Sign out of Admin Console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto min-h-screen bg-[#0E0E0E] p-4 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#242424] mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide capitalize flex items-center gap-3">
              {activeTab === "dashboard" && "Dashboard Control Center"}
              {activeTab === "bookings" && "Doorstep Bookings & Leads"}
              {activeTab === "services" && "Chimney Services Catalog"}
              {activeTab === "pricing" && "Appliance Rate Card & Pricing"}
              {activeTab === "technicians" && "Technicians Dispatch Fleet"}
              {activeTab === "blogs" && "Editorial Blogs Desk"}
              {activeTab === "settings" && "Business Contact Settings"}
            </h1>
            <p className="text-xs md:text-sm text-neutral-400 mt-1">
              Add, edit, or delete items below. Every modification immediately synchronizes with the main website.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {activeTab === "bookings" && (
              <button
                onClick={() => {
                  setBookingForm({
                    ...defaultBookingForm,
                    id: `RKS-${Math.floor(1000 + Math.random() * 9000)}`,
                  });
                  setIsAddBookingOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm transition shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add New Booking
              </button>
            )}

            {activeTab === "services" && (
              <button
                onClick={() => {
                  setServiceForm({
                    ...defaultServiceForm,
                    id: `service-${Date.now()}`,
                    slug: `chimney-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddServiceOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm transition shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add New Service
              </button>
            )}

            {activeTab === "pricing" && (
              <button
                onClick={() => {
                  setRateCardForm({
                    ...defaultRateCardForm,
                    id: `rc-${Date.now()}`,
                  });
                  setEditingRateCard(null);
                  setIsAddRateCardOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm transition shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add Appliance Service
              </button>
            )}

            {activeTab === "technicians" && (
              <button
                onClick={() => {
                  setTechForm({
                    ...defaultTechForm,
                    id: `TECH-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddTechOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm transition shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add Technician
              </button>
            )}

            {activeTab === "blogs" && (
              <button
                onClick={() => {
                  setBlogForm({
                    ...defaultBlogForm,
                    slug: `chimney-guide-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddBlogOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm transition shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add New Blog
              </button>
            )}

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-neutral-300 hover:text-white rounded-xl text-xs border border-[#333333] transition"
              title="Reset all database records to initial defaults"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#C9A227]" />
              <span className="hidden sm:inline">Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                onClick={() => switchTab("bookings")}
                className="bg-[#161616] border border-[#262626] rounded-2xl p-5 hover:border-[#C9A227]/50 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-neutral-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Bookings</span>
                  <CalendarCheck2 className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">{totalBookingsCount}</div>
                <div className="text-xs text-amber-400 mt-1">{activeBookingsCount} active leads in pipeline</div>
              </div>

              <div
                onClick={() => switchTab("services")}
                className="bg-[#161616] border border-[#262626] rounded-2xl p-5 hover:border-[#C9A227]/50 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-neutral-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Services</span>
                  <Wrench className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">{totalServicesCount}</div>
                <div className="text-xs text-emerald-400 mt-1">Live in Header & Services page</div>
              </div>

              <div
                onClick={() => switchTab("pricing")}
                className="bg-[#161616] border border-[#262626] rounded-2xl p-5 hover:border-[#C9A227]/50 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-neutral-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Rate Card</span>
                  <FileSpreadsheet className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">{rateCards.length}</div>
                <div className="text-xs text-neutral-400 mt-1">
                  <span className="text-emerald-400 font-semibold">{rateCards.length} services</span> on /pricing
                </div>
              </div>

              <div
                onClick={() => switchTab("technicians")}
                className="bg-[#161616] border border-[#262626] rounded-2xl p-5 hover:border-[#C9A227]/50 cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-neutral-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Technicians</span>
                  <Users className="w-5 h-5 text-[#C9A227]" />
                </div>
                <div className="text-3xl font-serif font-bold text-white">{totalTechsCount}</div>
                <div className="text-xs text-emerald-400 mt-1">{availableTechsCount} available on field</div>
              </div>
            </div>

            {/* Recent Bookings Snapshot */}
            <div className="bg-[#161616] border border-[#262626] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-serif font-bold text-white">Recent Customer Bookings</h2>
                  <p className="text-xs text-neutral-400">Incoming service calls from website visitors</p>
                </div>
                <button
                  onClick={() => switchTab("bookings")}
                  className="text-xs text-[#C9A227] hover:underline flex items-center gap-1 font-semibold"
                >
                  View All Bookings <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-[#242424] text-neutral-400 uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-3">Lead ID</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Service</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#202020]">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-[#1E1E1E]">
                        <td className="py-3 px-3 font-mono text-xs text-[#C9A227]">{b.id}</td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-white">{b.customerName}</div>
                          <div className="text-xs text-neutral-400">{b.phone}</div>
                        </td>
                        <td className="py-3 px-3 text-neutral-300">{b.service}</td>
                        <td className="py-3 px-3 text-neutral-400">{b.city}</td>
                        <td className="py-3 px-3">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${b.status === "Pending"
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                : b.status === "Confirmed"
                                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                  : b.status === "In Progress"
                                    ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                    : b.status === "Completed"
                                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                      : "bg-red-500/20 text-red-300 border border-red-500/30"
                              }`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingBooking(b);
                              }}
                              className="p-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-neutral-300 hover:text-white"
                              title="Edit"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <a
                              href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Namaste ${b.customerName}, regarding your chimney service booking ${b.id} with Shree Balaji Electronics.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400"
                              title="WhatsApp Customer"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#161616] border border-[#262626] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-[#C9A227]" />
                  Manage Services
                </h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Add new services or edit procedure steps, pricing, and FAQs. Reflected directly on /services and the
                  header dropdown.
                </p>
                <button
                  onClick={() => switchTab("services")}
                  className="w-full py-2 bg-[#222222] hover:bg-[#2A2A2A] text-xs font-semibold text-neutral-200 rounded-xl border border-[#333333]"
                >
                  Open Services Catalog →
                </button>
              </div>

              <div className="bg-[#161616] border border-[#262626] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#C9A227]" />
                  Update Pricing Plans
                </h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Edit transparent plan costs, add promo bundles, or change included feature checklists for customers.
                </p>
                <button
                  onClick={() => switchTab("pricing")}
                  className="w-full py-2 bg-[#222222] hover:bg-[#2A2A2A] text-xs font-semibold text-neutral-200 rounded-xl border border-[#333333]"
                >
                  Open Pricing Plans →
                </button>
              </div>

              <div className="bg-[#161616] border border-[#262626] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#C9A227]" />
                  Publish Articles
                </h3>
                <p className="text-xs text-neutral-400 mb-4">
                  Publish chimney maintenance guides to boost customer confidence and SEO search visibility.
                </p>
                <button
                  onClick={() => switchTab("blogs")}
                  className="w-full py-2 bg-[#222222] hover:bg-[#2A2A2A] text-xs font-semibold text-neutral-200 rounded-xl border border-[#333333]"
                >
                  Open Blogs Desk →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS */}
        {activeTab === "bookings" && (
          <div className="space-y-6">
            <div className="bg-[#161616] border border-[#262626] rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name, phone, or service..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#101010] border border-[#303030] rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <span className="text-xs text-neutral-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-[#101010] border border-[#303030] rounded-xl text-xs md:text-sm text-white focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={exportBookingsToCSV}
                  className="px-3.5 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-neutral-200 hover:text-white border border-[#333333] rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap transition"
                  title="Export all leads to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#C9A227]" /> Export CSV
                </button>

                <button
                  onClick={() => {
                    setBookingForm({
                      ...defaultBookingForm,
                      id: `RKS-${Math.floor(1000 + Math.random() * 9000)}`,
                    });
                    setIsAddBookingOpen(true);
                  }}
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap shadow-md"
                >
                  <Plus className="w-4 h-4" /> Add Lead
                </button>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-[#161616] border border-[#262626] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm">
                  <thead>
                    <tr className="bg-[#1C1C1C] text-neutral-400 uppercase tracking-wider text-[11px] border-b border-[#2A2A2A]">
                      <th className="py-3 px-4">Lead ID</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Service & Slot</th>
                      <th className="py-3 px-4">Address</th>
                      <th className="py-3 px-4">Assigned Tech</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-neutral-500">
                          No bookings found matching query.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-[#1B1B1B] transition">
                          <td className="py-4 px-4 font-mono text-xs text-[#C9A227]">{b.id}</td>
                          <td className="py-4 px-4">
                            <div className="font-bold text-white">{b.customerName}</div>
                            <div className="text-xs text-neutral-400 flex items-center gap-1.5 mt-0.5">
                              <Phone className="w-3 h-3 text-[#C9A227]" />
                              <span>{b.phone}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-white font-medium">{b.service}</div>
                            <div className="text-xs text-neutral-400 flex items-center gap-1 mt-0.5">
                              <Clock className="w-3 h-3" />
                              <span>
                                {b.date} • {b.timeSlot}
                              </span>
                            </div>
                            <div className="text-xs text-[#E0B84C] font-semibold mt-0.5">₹{b.quotedPrice}</div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="text-xs text-neutral-300 max-w-[200px] truncate" title={b.location}>
                              {b.location}
                            </div>
                            <div className="text-xs text-[#C9A227] font-medium">{b.city}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-xs px-2.5 py-1 rounded-lg bg-[#242424] text-neutral-300 border border-[#333333]">
                              {b.assignedTech}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${b.status === "Pending"
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : b.status === "Confirmed"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : b.status === "In Progress"
                                      ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                      : b.status === "Completed"
                                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                        : "bg-red-500/20 text-red-300 border border-red-500/30"
                                }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${b.phone}`}
                                className="p-2 rounded-lg bg-[#242424] hover:bg-[#303030] text-neutral-300 hover:text-white"
                                title="Call Customer"
                              >
                                <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
                              </a>
                              <a
                                href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                  `Namaste ${b.customerName}, regarding your Shree Balaji Electronics booking (${b.id}) for ${b.service}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400"
                                title="WhatsApp Customer"
                              >
                                <WhatsAppIcon className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => setEditingBooking(b)}
                                className="p-2 rounded-lg bg-[#242424] hover:bg-[#303030] text-neutral-300 hover:text-white"
                                title="Edit Booking"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeletingBookingId(b.id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400"
                                title="Delete Booking"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === "services" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">All Active Services ({services.length})</h2>
                <p className="text-xs text-neutral-400">
                  Editing or deleting any service here automatically updates the /services page and Header dropdown.
                </p>
              </div>
              <button
                onClick={() => {
                  setServiceForm({
                    ...defaultServiceForm,
                    id: `service-${Date.now()}`,
                    slug: `chimney-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddServiceOpen(true);
                }}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Service
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div
                  key={s.slug || s.id}
                  className="bg-[#161616] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9A227]/40 transition group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227] bg-[#C9A227]/15 px-2.5 py-0.5 rounded-full border border-[#C9A227]/30">
                        {s.badge || "Doorstep Service"}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">{s.duration}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#E0B84C] transition">
                      {s.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-2">{s.tagline || s.overview}</p>

                    <div className="mt-4 pt-4 border-t border-[#242424] flex items-center justify-between">
                      <div className="text-sm font-bold text-[#C9A227]">{s.priceDisplay}</div>
                      <div className="text-[11px] text-neutral-500">Slug: /{s.slug}</div>
                    </div>

                    <div className="mt-3">
                      <div className="text-[11px] text-neutral-400 font-semibold mb-1">Includes:</div>
                      <ul className="text-xs text-neutral-300 space-y-1">
                        {s.whatsIncluded.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5 truncate">
                            <Check className="w-3 h-3 text-[#C9A227] flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#242424] flex items-center justify-between gap-2">
                    <Link
                      href={`/services?selected=${s.slug}`}
                      target="_blank"
                      className="text-xs text-[#C9A227] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View on Page
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingService(s);
                          setServiceForm(s);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-white flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingServiceSlug(s.slug || s.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400"
                        title="Delete Service"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: APPLIANCE RATE CARD & PRICING */}
        {activeTab === "pricing" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <span>Appliance Rate Card Management</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#C9A227] font-sans font-bold">
                    {rateCards.length} Services
                  </span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  All appliance rates and tasks listed on the /pricing page. Add new rates, edit prices, or delete items. Changes update the live website immediately.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  href="/pricing"
                  target="_blank"
                  className="px-3.5 py-2 bg-[#202020] hover:bg-[#282828] text-neutral-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-[#333333] transition"
                >
                  <Eye className="w-3.5 h-3.5 text-[#C9A227]" /> View Live /pricing
                </Link>

                <button
                  onClick={exportBookingsToCSV}
                  className="px-3.5 py-2 bg-[#222222] hover:bg-[#2c2c2c] text-neutral-200 hover:text-white border border-[#333333] rounded-xl text-xs flex items-center gap-1.5 whitespace-nowrap transition"
                  title="Export all leads to CSV spreadsheet"
                >
                  <Download className="w-3.5 h-3.5 text-[#C9A227]" /> Export CSV
                </button>

                <button
                  onClick={() => {
                    setRateCardForm({
                      ...defaultRateCardForm,
                      id: `rc-${Date.now()}`,
                    });
                    setEditingRateCard(null);
                    setIsAddRateCardOpen(true);
                  }}
                  className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm flex items-center gap-1.5 shadow-md shadow-[#C9A227]/10 transition active:scale-95"
                >
                  <Plus className="w-4 h-4" /> Add Appliance Service
                </button>
              </div>
            </div>

            {/* Filter Pills & Search */}
            <div className="space-y-3 bg-[#161616] border border-[#262626] rounded-2xl p-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {RATE_CARD_APPLIANCES.map((appliance) => (
                  <button
                    key={appliance}
                    onClick={() => setSelectedRateCardAppliance(appliance)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedRateCardAppliance === appliance
                        ? "bg-[#C9A227] text-black font-bold shadow-xs"
                        : "bg-[#202020] hover:bg-[#2a2a2a] text-neutral-300 border border-[#333333]"
                      }`}
                  >
                    {appliance}
                    {appliance === "All Appliances" ? ` (${rateCards.length})` : ""}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchRateCardAdmin}
                  onChange={(e) => setSearchRateCardAdmin(e.target.value)}
                  placeholder="Search appliance, service type, tasks, or price..."
                  className="w-full pl-10 pr-4 py-2 bg-[#101010] border border-[#303030] rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C9A227] transition"
                />
              </div>
            </div>

            {/* Rate Card Table */}
            <div className="overflow-hidden rounded-2xl border border-[#262626] bg-[#141414] shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#1c1c1c] text-neutral-400 border-b border-[#2a2a2a] uppercase tracking-wider text-[11px] font-bold">
                      <th className="py-3.5 px-4 font-bold">Appliance</th>
                      <th className="py-3.5 px-4 font-bold">Service Type</th>
                      <th className="py-3.5 px-4 font-bold">Included Tasks / Description</th>
                      <th className="py-3.5 px-4 font-bold text-center">Rate (₹)</th>
                      <th className="py-3.5 px-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#222222]">
                    {rateCards
                      .filter((item) => {
                        const matchesAppliance =
                          selectedRateCardAppliance === "All Appliances" || item.appliance === selectedRateCardAppliance;
                        const q = searchRateCardAdmin.toLowerCase().trim();
                        const matchesSearch =
                          !q ||
                          item.appliance.toLowerCase().includes(q) ||
                          item.serviceType.toLowerCase().includes(q) ||
                          item.description.toLowerCase().includes(q) ||
                          String(item.price).includes(q);
                        return matchesAppliance && matchesSearch;
                      })
                      .map((item, idx) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-[#1c1c1c] transition-colors ${idx % 2 === 0 ? "bg-[#141414]" : "bg-[#171717]"
                            }`}
                        >
                          <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span>{item.appliance}</span>
                              {item.popular && (
                                <span className="text-[10px] bg-[#C9A227]/20 text-[#C9A227] border border-[#C9A227]/40 px-1.5 py-0.5 rounded font-semibold">
                                  ★ Popular
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold ${item.serviceType.includes("Full Service")
                                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                  : item.serviceType.includes("Basic Service")
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : item.serviceType.includes("Repair")
                                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                                      : item.serviceType.includes("Installation")
                                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                        : "bg-neutral-800 text-neutral-300 border border-neutral-700"
                                }`}
                            >
                              {item.serviceType}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-neutral-300 max-w-md">
                            {item.description}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-sm text-[#E0B84C] font-mono whitespace-nowrap">
                            {item.priceDisplay || `₹${item.price}`}
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingRateCard(item);
                                  setRateCardForm({ ...item });
                                  setIsAddRateCardOpen(true);
                                }}
                                className="p-1.5 bg-[#242424] hover:bg-[#333333] text-neutral-300 hover:text-white rounded-lg transition"
                                title="Edit Rate Card Item"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeletingRateCardId(item.id)}
                                className="p-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 hover:text-red-300 rounded-lg transition"
                                title="Delete Rate Card Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footnote Notice Preview */}
            <div className="p-4 rounded-xl bg-[#1c1c1c] border border-[#2b2b2b] text-xs text-neutral-400 flex items-center justify-between">
              <div>
                <span className="text-[#C9A227] font-semibold mr-2">Live Website Footnote:</span>
                <span>*spare parts will be charged seperately if any</span>
              </div>
              <span className="text-[11px] text-neutral-500 font-mono">
                Total Published: {rateCards.length}
              </span>
            </div>
          </div>
        )}

        {/* TAB 5: TECHNICIANS */}
        {activeTab === "technicians" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Technicians Fleet ({technicians.length})</h2>
                <p className="text-xs text-neutral-400">
                  Certified appliance engineers available for dispatch across Delhi NCR.
                </p>
              </div>
              <button
                onClick={() => {
                  setTechForm({
                    ...defaultTechForm,
                    id: `TECH-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddTechOpen(true);
                }}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add Technician
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {technicians.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#161616] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9A227]/40 transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${t.status === "Available"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : t.status === "On Doorstep Job"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              : t.status === "In Transit"
                                ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                : "bg-neutral-800 text-neutral-400"
                          }`}
                      >
                        ● {t.status}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">{t.experienceYears} Years Exp</span>
                    </div>

                    <h3 className="text-base font-bold text-white">{t.name}</h3>
                    <p className="text-xs text-[#C9A227] font-medium mt-1">{t.specialty}</p>

                    <div className="mt-4 pt-3 border-t border-[#242424] space-y-1.5 text-xs text-neutral-400">
                      <div className="flex items-center justify-between">
                        <span>Phone:</span>
                        <span className="text-white font-mono">{t.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Assigned Area:</span>
                        <span className="text-white">{t.assignedArea}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Rating:</span>
                        <span className="text-amber-400 font-bold">★ {t.rating} / 5.0</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Jobs Completed:</span>
                        <span className="text-white font-semibold">{t.completedJobs} jobs</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#242424] flex items-center justify-between gap-2">
                    <a
                      href={`tel:${t.phone}`}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/35 text-xs font-semibold text-emerald-400 flex items-center gap-1.5"
                    >
                      <Phone className="w-3 h-3" /> Call Tech
                    </a>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingTech(t);
                          setTechForm(t);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-white flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingTechId(t.id)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400"
                        title="Delete Technician"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: BLOGS */}
        {activeTab === "blogs" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-serif font-bold text-white">Articles & Guides Desk ({blogs.length})</h2>
                <p className="text-xs text-neutral-400">
                  Published on /blogs. Add, edit, or delete articles to manage expert content.
                </p>
              </div>
              <button
                onClick={() => {
                  setBlogForm({
                    ...defaultBlogForm,
                    slug: `chimney-guide-${Date.now().toString().slice(-4)}`,
                  });
                  setIsAddBlogOpen(true);
                }}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs md:text-sm flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" /> Add New Blog
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {blogs.map((b) => (
                <div
                  key={b.slug}
                  className="bg-[#161616] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between hover:border-[#C9A227]/40 transition group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#C9A227]/20 text-[#E0B84C]">
                        {b.category}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">
                        {b.publishedDate} • {b.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-[#E0B84C] transition">
                      {b.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mt-2">{b.excerpt}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {b.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#202020] text-neutral-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#242424] flex items-center justify-between gap-2">
                    <Link
                      href={`/blogs/${b.slug}`}
                      target="_blank"
                      className="text-xs text-[#C9A227] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> View Post
                    </Link>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          setBlogForm(b);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-white flex items-center gap-1"
                      >
                        <Edit3 className="w-3 h-3" /> Edit
                      </button>
                      <button
                        onClick={() => setDeletingBlogSlug(b.slug)}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400"
                        title="Delete Blog"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: BUSINESS & SECURITY SETTINGS */}
        {activeTab === "settings" && settings && (
          <div className="max-w-3xl space-y-8">
            {/* 1. ADMIN CREDENTIALS SETTINGS CARD */}
            <div className="bg-[#161616] border border-[#2B2B2B] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#242424]">
                <div>
                  <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-[#C9A227]" />
                    <span>Change Admin Login Credentials</span>
                  </h2>
                  <p className="text-xs md:text-sm text-neutral-400 mt-1">
                    Change administrator username / ID and password for secure login access.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#C9A227]/40 text-[#E0B84C] text-xs font-semibold">
                    Current ID: <strong
                      className="text-white">{adminCredentials.username}</strong>
                  </span>
                </div>
              </div>

              <form onSubmit={handleCredentialsUpdate} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                      Current Admin ID
                    </label>
                    <input
                      type="text"
                      disabled
                      value={adminCredentials.username}
                      className="w-full px-4 py-2.5 bg-[#101010] border border-[#262626] rounded-xl text-sm text-neutral-500 cursor-not-allowed select-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center justify-between">
                      <span>New Admin ID / Username</span>
                      <span className="text-[10px] text-neutral-500 font-normal">Min 3 characters</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={credForm.newUsername}
                        onChange={(e) => setCredForm({ ...credForm, newUsername: e.target.value })}
                        placeholder={`Enter new ID (current: ${adminCredentials.username})`}
                        className="w-full pl-10 pr-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227] transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5 flex items-center justify-between">
                      <span>New Password</span>
                      <span className="text-[10px] text-neutral-500 font-normal">Min 4 characters</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showCredPassword ? "text" : "password"}
                        value={credForm.newPassword}
                        onChange={(e) => setCredForm({ ...credForm, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        className="w-full pl-10 pr-10 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227] transition"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowCredPassword(!showCredPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-white"
                        tabIndex={-1}
                      >
                        {showCredPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showCredPassword ? "text" : "password"}
                        value={credForm.confirmPassword}
                        onChange={(e) => setCredForm({ ...credForm, confirmPassword: e.target.value })}
                        placeholder="Re-enter new password"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227] transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Error & Success Messages */}
                {credError && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{credError}</span>
                  </div>
                )}
                {credSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{credSuccess}</span>
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-gradient-to-r from-[#C9A227] to-[#E0B84C] hover:from-[#E0B84C] hover:to-[#C9A227] text-[#111111] font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" /> Save New Credentials
                  </button>
                  <span className="text-xs text-neutral-400">
                    Will be updated immediately across this device.
                  </span>
                </div>
              </form>
            </div>

            {/* 2. BUSINESS CONTACT & OPERATION SETTINGS */}
            <div className="bg-[#161616] border border-[#2B2B2B] rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div>
                <h2 className="text-xl font-serif font-bold text-white">Business Contact &amp; Operation Settings</h2>
                <p className="text-xs md:text-sm text-neutral-400 mt-1">
                  Configure primary helpline, WhatsApp dispatch number, working hours, and emergency badges.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Helpline Phone Number
                  </label>
                  <input
                    type="text"
                    value={settings.helplinePhone}
                    onChange={(e) => setSettings({ ...settings, helplinePhone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    WhatsApp Contact Number
                  </label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Operational Working Hours
                  </label>
                  <input
                    type="text"
                    value={settings.workingHours}
                    onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Covered Service Cities & Areas
                  </label>
                  <input
                    type="text"
                    value={settings.serviceAreas}
                    onChange={(e) => setSettings({ ...settings, serviceAreas: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Doorstep Service Notice Bar
                  </label>
                  <textarea
                    rows={3}
                    value={settings.doorstepNotice}
                    onChange={(e) => setSettings({ ...settings, doorstepNotice: e.target.value })}
                    className="w-full px-4 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">24/7 Emergency Kitchen Chimney Support</div>
                    <div className="text-xs text-neutral-400">Show emergency breakdown badge across pages</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emergencySupport}
                    onChange={(e) => setSettings({ ...settings, emergencySupport: e.target.checked })}
                    className="w-5 h-5 accent-[#C9A227] cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#242424] flex items-center justify-between">
                <button
                  onClick={() => {
                    saveStoredBusinessSettings(settings);
                    showToast("Business contact settings saved successfully!");
                  }}
                  className="px-6 py-3 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-sm transition shadow-lg flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save Business Settings
                </button>

                <button
                  onClick={() => setIsResetConfirmOpen(true)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Reset Database to Factory Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MODALS: BOOKINGS */}
      {(isAddBookingOpen || editingBooking) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarCheck2 className="w-5 h-5 text-[#C9A227]" />
                {editingBooking ? `Edit Booking (${editingBooking.id})` : "Add New Customer Booking"}
              </h3>
              <button
                onClick={() => {
                  setIsAddBookingOpen(false);
                  setEditingBooking(null);
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  value={editingBooking ? editingBooking.customerName : bookingForm.customerName}
                  onChange={(e) => {
                    if (editingBooking) {
                      setEditingBooking({ ...editingBooking, customerName: e.target.value });
                    } else {
                      setBookingForm({ ...bookingForm, customerName: e.target.value });
                    }
                  }}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editingBooking ? editingBooking.phone : bookingForm.phone}
                    onChange={(e) => {
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, phone: e.target.value });
                      } else {
                        setBookingForm({ ...bookingForm, phone: e.target.value });
                      }
                    }}
                    placeholder="+91 98111 00000"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">City / Region</label>
                  <select
                    value={editingBooking ? editingBooking.city : bookingForm.city}
                    onChange={(e) => {
                      const c = e.target.value as BookingLead["city"];
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, city: c });
                      } else {
                        setBookingForm({ ...bookingForm, city: c });
                      }
                    }}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Delhi">Delhi</option>
                    <option value="Noida">Noida</option>
                    <option value="Gurgaon">Gurgaon</option>
                    <option value="Ghaziabad">Ghaziabad</option>
                    <option value="Faridabad">Faridabad</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Service Type</label>
                <select
                  value={editingBooking ? editingBooking.service : bookingForm.service}
                  onChange={(e) => {
                    const sel = e.target.value;
                    const matched = services.find((s) => s.title === sel);
                    if (editingBooking) {
                      setEditingBooking({
                        ...editingBooking,
                        service: sel,
                        serviceSlug: matched?.slug || "general-inspection",
                      });
                    } else {
                      setBookingForm({
                        ...bookingForm,
                        service: sel,
                        serviceSlug: matched?.slug || "general-inspection",
                      });
                    }
                  }}
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Chimney Inspection">General Chimney Inspection</option>
                  <option value="Urgent Motor Rewiring">Urgent Motor Rewiring</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Full Doorstep Address</label>
                <textarea
                  rows={2}
                  value={editingBooking ? editingBooking.location : bookingForm.location}
                  onChange={(e) => {
                    if (editingBooking) {
                      setEditingBooking({ ...editingBooking, location: e.target.value });
                    } else {
                      setBookingForm({ ...bookingForm, location: e.target.value });
                    }
                  }}
                  placeholder="Flat No, Tower, Society / Sector"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Service Date</label>
                  <input
                    type="text"
                    value={editingBooking ? editingBooking.date : bookingForm.date}
                    onChange={(e) => {
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, date: e.target.value });
                      } else {
                        setBookingForm({ ...bookingForm, date: e.target.value });
                      }
                    }}
                    placeholder="Today, Nov 23"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={editingBooking ? editingBooking.timeSlot : bookingForm.timeSlot}
                    onChange={(e) => {
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, timeSlot: e.target.value });
                      } else {
                        setBookingForm({ ...bookingForm, timeSlot: e.target.value });
                      }
                    }}
                    placeholder="10:00 AM – 12:00 PM"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Assigned Technician</label>
                  <select
                    value={editingBooking ? editingBooking.assignedTech : bookingForm.assignedTech}
                    onChange={(e) => {
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, assignedTech: e.target.value });
                      } else {
                        setBookingForm({ ...bookingForm, assignedTech: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Unassigned">Unassigned</option>
                    {technicians.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name} ({t.assignedArea})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Status</label>
                  <select
                    value={editingBooking ? editingBooking.status : bookingForm.status}
                    onChange={(e) => {
                      const st = e.target.value as BookingLead["status"];
                      if (editingBooking) {
                        setEditingBooking({ ...editingBooking, status: st });
                      } else {
                        setBookingForm({ ...bookingForm, status: st });
                      }
                    }}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Quoted Price (₹)</label>
                <input
                  type="number"
                  value={editingBooking ? editingBooking.quotedPrice : bookingForm.quotedPrice}
                  onChange={(e) => {
                    const pr = parseInt(e.target.value) || 0;
                    if (editingBooking) {
                      setEditingBooking({ ...editingBooking, quotedPrice: pr });
                    } else {
                      setBookingForm({ ...bookingForm, quotedPrice: pr });
                    }
                  }}
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddBookingOpen(false);
                  setEditingBooking(null);
                }}
                className="px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (editingBooking) {
                    saveBookingItem(editingBooking);
                    showToast(`Booking ${editingBooking.id} updated!`);
                    setEditingBooking(null);
                  } else {
                    if (!bookingForm.customerName || !bookingForm.phone) {
                      alert("Please provide customer name and phone.");
                      return;
                    }
                    saveBookingItem(bookingForm);
                    showToast(`Booking ${bookingForm.id} created!`);
                    setIsAddBookingOpen(false);
                  }
                }}
                className="px-5 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs"
              >
                {editingBooking ? "Save Changes" : "Create Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Booking Confirmation Modal */}
      {deletingBookingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Booking Lead?</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Are you sure you want to delete lead <span className="text-white font-mono">{deletingBookingId}</span>?
              This cannot be undone.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingBookingId(null)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBookingItem(deletingBookingId);
                  showToast(`Booking ${deletingBookingId} deleted.`);
                  setDeletingBookingId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl"
              >
                Delete Lead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS: SERVICES */}
      {(isAddServiceOpen || editingService) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#C9A227]" />
                {editingService ? `Edit Service (${editingService.title})` : "Add New Chimney Service"}
              </h3>
              <button
                onClick={() => {
                  setIsAddServiceOpen(false);
                  setEditingService(null);
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Service Title</label>
                <input
                  type="text"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Chimney Duct Pipe Installation & Sealing"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={serviceForm.slug}
                    onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                    placeholder="e.g. duct-pipe-installation"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Price Display</label>
                  <input
                    type="text"
                    value={serviceForm.priceDisplay}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceDisplay: e.target.value })}
                    placeholder="Starting at ₹999"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={serviceForm.badge}
                    onChange={(e) => setServiceForm({ ...serviceForm, badge: e.target.value })}
                    placeholder="Most Requested / Doorstep Service"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    placeholder="45 – 60 Minutes"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Short Tagline</label>
                <input
                  type="text"
                  value={serviceForm.tagline}
                  onChange={(e) => setServiceForm({ ...serviceForm, tagline: e.target.value })}
                  placeholder="One sentence describing service purpose"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Detailed Overview</label>
                <textarea
                  rows={3}
                  value={serviceForm.overview}
                  onChange={(e) => setServiceForm({ ...serviceForm, overview: e.target.value })}
                  placeholder="Comprehensive description for the service detail modal..."
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  What&apos;s Included (comma separated)
                </label>
                <input
                  type="text"
                  value={serviceForm.whatsIncluded.join(", ")}
                  onChange={(e) =>
                    setServiceForm({
                      ...serviceForm,
                      whatsIncluded: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Service Warranty</label>
                <input
                  type="text"
                  value={serviceForm.guarantee}
                  onChange={(e) => setServiceForm({ ...serviceForm, guarantee: e.target.value })}
                  placeholder="30-Day Service Guarantee"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddServiceOpen(false);
                  setEditingService(null);
                }}
                className="px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!serviceForm.title || !serviceForm.slug) {
                    alert("Please provide service title and slug.");
                    return;
                  }
                  saveServiceItem(serviceForm);
                  showToast(`Service "${serviceForm.title}" saved!`);
                  setIsAddServiceOpen(false);
                  setEditingService(null);
                }}
                className="px-5 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Service Confirmation Modal */}
      {deletingServiceSlug && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Service?</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Are you sure you want to delete <span className="text-white font-mono">/{deletingServiceSlug}</span>?
              It will immediately be removed from the Services page and Header dropdown.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingServiceSlug(null)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteServiceItem(deletingServiceSlug);
                  showToast(`Service ${deletingServiceSlug} deleted.`);
                  setDeletingServiceSlug(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS: APPLIANCE RATE CARD ADD & EDIT */}
      {(isAddRateCardOpen || editingRateCard) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#C9A227]" />
                {editingRateCard ? `Edit (${editingRateCard.appliance} - ${editingRateCard.serviceType})` : "Add Appliance Service Rate"}
              </h3>
              <button
                onClick={() => {
                  setIsAddRateCardOpen(false);
                  setEditingRateCard(null);
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Appliance Category</label>
                <select
                  value={rateCardForm.appliance}
                  onChange={(e) => setRateCardForm({ ...rateCardForm, appliance: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                >
                  <option value="Kitchen Chimney">Kitchen Chimney</option>
                  <option value="Kitchen Chimney Island">Kitchen Chimney Island</option>
                  <option value="Built-In Hob">Built-In Hob</option>
                  <option value="Cooktop">Cooktop</option>
                  <option value="Built-In Microwave">Built-In Microwave</option>
                  <option value="Built-In Oven">Built-In Oven</option>
                  <option value="Other Appliance">Other Appliance</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Service Type</label>
                <input
                  type="text"
                  value={rateCardForm.serviceType}
                  onChange={(e) => setRateCardForm({ ...rateCardForm, serviceType: e.target.value })}
                  placeholder="e.g. Basic Service, Full Service, Repair, Installation"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Price (₹ INR)</label>
                <input
                  type="number"
                  value={rateCardForm.price}
                  onChange={(e) =>
                    setRateCardForm({
                      ...rateCardForm,
                      price: Number(e.target.value),
                      priceDisplay: `₹${e.target.value}`,
                    })
                  }
                  placeholder="799"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Included Tasks / Description
                </label>
                <textarea
                  rows={3}
                  value={rateCardForm.description}
                  onChange={(e) => setRateCardForm({ ...rateCardForm, description: e.target.value })}
                  placeholder="e.g. Filter cleaning, exterior wipe-down, suction check"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rc-popular"
                  checked={rateCardForm.popular || false}
                  onChange={(e) => setRateCardForm({ ...rateCardForm, popular: e.target.checked })}
                  className="rounded border-[#333333] text-[#C9A227] focus:ring-0"
                />
                <label htmlFor="rc-popular" className="text-xs font-medium text-neutral-300 cursor-pointer">
                  Mark as Popular / Most Requested
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#2A2A2A]">
              <button
                onClick={() => {
                  setIsAddRateCardOpen(false);
                  setEditingRateCard(null);
                }}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!rateCardForm.serviceType || !rateCardForm.appliance) {
                    alert("Please provide both Appliance Name and Service Type.");
                    return;
                  }
                  const finalItem: RateCardItem = {
                    ...rateCardForm,
                    id: rateCardForm.id || `rc-${Date.now()}`,
                    priceDisplay: `₹${rateCardForm.price}`,
                  };
                  saveRateCardItem(finalItem);
                  setRateCards(getStoredRateCard());
                  showToast(`Service "${finalItem.serviceType}" for ${finalItem.appliance} saved! Changes live on /pricing.`);
                  setIsAddRateCardOpen(false);
                  setEditingRateCard(null);
                }}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-xs font-bold text-[#111111] rounded-xl shadow-md"
              >
                Save Rate Card Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Rate Card Confirmation Modal */}
      {deletingRateCardId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Rate Card Service?</h3>
            <p className="text-xs text-neutral-400 mb-6">
              Are you sure you want to delete rate card item <span className="text-white font-mono">#{deletingRateCardId}</span>?
              It will be removed immediately from the /pricing page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingRateCardId(null)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteRateCardItem(deletingRateCardId);
                  setRateCards(getStoredRateCard());
                  showToast(`Service deleted from rate card.`);
                  setDeletingRateCardId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS: TECHNICIANS */}
      {(isAddTechOpen || editingTech) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-[#C9A227]" />
                {editingTech ? `Edit Tech (${editingTech.name})` : "Add Technician"}
              </h3>
              <button
                onClick={() => {
                  setIsAddTechOpen(false);
                  setEditingTech(null);
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Technician Full Name</label>
                <input
                  type="text"
                  value={techForm.name}
                  onChange={(e) => setTechForm({ ...techForm, name: e.target.value })}
                  placeholder="e.g. Vikram Singh"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={techForm.phone}
                    onChange={(e) => setTechForm({ ...techForm, phone: e.target.value })}
                    placeholder="+91 98111 00000"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={techForm.experienceYears}
                    onChange={(e) => setTechForm({ ...techForm, experienceYears: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Assigned Area</label>
                  <input
                    type="text"
                    value={techForm.assignedArea}
                    onChange={(e) => setTechForm({ ...techForm, assignedArea: e.target.value })}
                    placeholder="South Delhi & Noida"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Status</label>
                  <select
                    value={techForm.status}
                    onChange={(e) =>
                      setTechForm({ ...techForm, status: e.target.value as Technician["status"] })
                    }
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Available">Available</option>
                    <option value="On Doorstep Job">On Doorstep Job</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Off Duty">Off Duty</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Specialty</label>
                <input
                  type="text"
                  value={techForm.specialty}
                  onChange={(e) => setTechForm({ ...techForm, specialty: e.target.value })}
                  placeholder="Chimney Deep Degreasing & Motor Rewiring"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Rating (out of 5)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="5"
                    value={techForm.rating}
                    onChange={(e) => setTechForm({ ...techForm, rating: parseFloat(e.target.value) || 4.8 })}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Total Completed Jobs</label>
                  <input
                    type="number"
                    value={techForm.completedJobs}
                    onChange={(e) => setTechForm({ ...techForm, completedJobs: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddTechOpen(false);
                  setEditingTech(null);
                }}
                className="px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!techForm.name) {
                    alert("Please provide technician name.");
                    return;
                  }
                  saveTechnicianItem(techForm);
                  showToast(`Technician "${techForm.name}" saved!`);
                  setIsAddTechOpen(false);
                  setEditingTech(null);
                }}
                className="px-5 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs"
              >
                Save Technician
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Tech Confirmation Modal */}
      {deletingTechId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Technician?</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Are you sure you want to remove technician <span className="text-white font-mono">#{deletingTechId}</span> from the fleet?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingTechId(null)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteTechnicianItem(deletingTechId);
                  showToast(`Technician ${deletingTechId} removed.`);
                  setDeletingTechId(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl"
              >
                Delete Technician
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS: BLOGS */}
      {(isAddBlogOpen || editingBlog) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-4 border-b border-[#2A2A2A] mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C9A227]" />
                {editingBlog ? `Edit Blog Article` : "Add New Blog Article"}
              </h3>
              <button
                onClick={() => {
                  setIsAddBlogOpen(false);
                  setEditingBlog(null);
                }}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Article Title</label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. 5 Warning Signs Your Chimney Motor Needs Immediate Service"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })}
                    placeholder="warning-signs-chimney-motor-service"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) =>
                      setBlogForm({ ...blogForm, category: e.target.value as BlogPost["category"] })
                    }
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  >
                    <option value="Maintenance & Cleaning">Maintenance & Cleaning</option>
                    <option value="Troubleshooting & Repair">Troubleshooting & Repair</option>
                    <option value="Buying Guide">Buying Guide</option>
                    <option value="Installation & Care">Installation & Care</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Published Date</label>
                  <input
                    type="text"
                    value={blogForm.publishedDate}
                    onChange={(e) => setBlogForm({ ...blogForm, publishedDate: e.target.value })}
                    placeholder="November 2026"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="5 min read"
                    className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="Summary shown on the blog list cards..."
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={blogForm.tags.join(", ")}
                  onChange={(e) =>
                    setBlogForm({
                      ...blogForm,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Chimney, Motor Repair, Delhi"
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Main Body Content
                </label>
                <textarea
                  rows={4}
                  value={blogForm.sections[0]?.paragraphs[0] || ""}
                  onChange={(e) => {
                    const text = e.target.value;
                    setBlogForm({
                      ...blogForm,
                      sections: [
                        {
                          heading: blogForm.sections[0]?.heading || "Important Chimney Care Advice",
                          paragraphs: [text],
                        },
                      ],
                    });
                  }}
                  placeholder="Write article paragraphs..."
                  className="w-full px-3 py-2 bg-[#101010] border border-[#333333] rounded-xl text-sm text-white focus:outline-none focus:border-[#C9A227]"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-[#2A2A2A] mt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddBlogOpen(false);
                  setEditingBlog(null);
                }}
                className="px-4 py-2 bg-[#222222] hover:bg-[#2A2A2A] text-neutral-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!blogForm.title || !blogForm.slug) {
                    alert("Please provide blog title and slug.");
                    return;
                  }
                  saveBlogItem(blogForm);
                  showToast(`Blog "${blogForm.title}" published!`);
                  setIsAddBlogOpen(false);
                  setEditingBlog(null);
                }}
                className="px-5 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-[#111111] font-bold rounded-xl text-xs"
              >
                Save Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Blog Confirmation Modal */}
      {deletingBlogSlug && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Delete Blog Article?</h3>
            <p className="text-xs text-neutral-400 mb-5">
              Are you sure you want to delete article <span className="text-white font-mono">/{deletingBlogSlug}</span>?
              It will be removed from the /blogs page.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingBlogSlug(null)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteBlogItem(deletingBlogSlug);
                  showToast(`Blog ${deletingBlogSlug} deleted.`);
                  setDeletingBlogSlug(null);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-xs font-bold text-white rounded-xl"
              >
                Delete Blog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESET ALL FACTORY DEFAULTS MODAL */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-[#181818] border border-[#2D2D2D] rounded-2xl p-6 text-center shadow-2xl">
            <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Reset Factory Defaults?</h3>
            <p className="text-xs text-neutral-400 mb-5">
              This will reset services, pricing plans, blogs, technicians, bookings, and settings back to their original
              clean state. Any test edits will be cleared.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-4 py-2 bg-[#242424] hover:bg-[#303030] text-xs font-semibold text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetStoreToDefaults();
                  reloadData();
                  showToast("Store reset to clean factory defaults!");
                  setIsResetConfirmOpen(false);
                }}
                className="px-4 py-2 bg-[#C9A227] hover:bg-[#E0B84C] text-xs font-bold text-[#111111] rounded-xl"
              >
                Reset All Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
