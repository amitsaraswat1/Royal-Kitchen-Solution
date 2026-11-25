"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Sparkles,
  Phone,
  Tag,
  CheckCircle2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";
import { BLOG_POSTS, BlogPost } from "@/data/blogs-content";
import { getStoredBlogs } from "@/lib/admin-store";

const CATEGORIES = [
  "All",
  "Maintenance & Cleaning",
  "Troubleshooting & Repair",
  "Buying Guide",
  "Installation & Care",
] as const;

export default function BlogsPage() {
  const [blogsList, setBlogsList] = useState<BlogPost[]>(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  React.useEffect(() => {
    const syncBlogs = () => {
      const stored = getStoredBlogs();
      if (stored && stored.length > 0) {
        setBlogsList(stored);
      }
    };
    syncBlogs();

    window.addEventListener("rks_store_updated", syncBlogs);
    window.addEventListener("storage", syncBlogs);
    return () => {
      window.removeEventListener("rks_store_updated", syncBlogs);
      window.removeEventListener("storage", syncBlogs);
    };
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? blogsList
      : blogsList.filter((post) => post.category === selectedCategory);

  const featuredPost = blogsList[0] || BLOG_POSTS[0];

  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* 1. Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            2. HERO SECTION - MATCHING HOME & SERVICES HERO EXACT HEIGHT & STYLING
        ========================================================================= */}
        <section
          id="blogs-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays - EXACT match with Home & Services */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kitchen Chimney care guides and blogs by Shree Balaji Electronics"
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
            <div className="max-w-3xl">
              {/* Top badge with official logo mark */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-royal-card/90 border border-royal-gold/40 text-royal-gold text-xs sm:text-sm font-medium mb-6 shadow-sm backdrop-blur-sm">
                <div className="relative w-5 h-5 rounded-md overflow-hidden bg-royal-black shrink-0">
                  <Image
                    src="/images/logo-icon.png"
                    alt="Shree Balaji Electronics Icon"
                    fill
                    sizes="20px"
                    className="object-contain"
                  />
                </div>
                <span>Kitchen Appliance Care Knowledge Hub</span>
              </div>

              {/* Main H1 Heading */}
              <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5">
                Kitchen Chimney{" "}
                <span className="text-royal-gold italic block sm:inline">Blogs &amp; Guides</span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl font-light">
                Expert tips on cleaning frequency, low suction troubleshooting,
                filterless vs baffle comparisons, and motor care directly from certified
                appliance technicians.
              </p>



              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-6 border-t border-white/15">
                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Practical Advice
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Tested in Indian cooking
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      DIY vs Pro
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Clear guidance on repairs
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Fire &amp; Safety
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Grease hazard prevention
                  </p>
                </div>

                <div className="bg-royal-card/60 border border-white/10 rounded-xl p-2.5 sm:p-3 backdrop-blur-sm min-w-0">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-royal-gold shrink-0" />
                    <span className="font-semibold text-[11px] sm:text-sm text-white truncate">
                      Delhi NCR Care
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-gray-300 leading-snug line-clamp-2">
                    Doorstep support guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. CATEGORY FILTER TABS
        ========================================================================= */}
        <div className="sticky top-[60px] sm:top-[68px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold shrink-0 mr-2 hidden sm:inline">
                Filter by Category:
              </span>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-royal-gold text-royal-black shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. FEATURED BLOG ARTICLE (Shown on 'All' view)
        ========================================================================= */}
        {selectedCategory === "All" && featuredPost && (
          <section className="py-12 bg-royal-light border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 text-royal-gold text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                <span>Featured Guide</span>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 hover:shadow-md transition-shadow">
                <div className="relative lg:col-span-5 min-h-[260px] lg:min-h-full">
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-wide shadow-sm">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.publishedDate}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-royal-black mb-3 leading-snug">
                      <Link
                        href={`/blogs/${featuredPost.slug}`}
                        className="hover:text-royal-gold transition-colors"
                      >
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                      {featuredPost.excerpt}
                    </p>

                    {/* Key highlights preview */}
                    <div className="bg-royal-light rounded-xl p-4 mb-6 border border-gray-200">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-royal-black mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-royal-gold" />
                        Key Takeaways
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-700">
                        {featuredPost.summaryHighlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-royal-gold font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {featuredPost.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 text-xs font-medium"
                        >
                          <Tag className="w-3 h-3 text-gray-400" />
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blogs/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-royal-black hover:bg-royal-gold hover:text-royal-black text-white text-sm font-semibold transition-colors shadow-sm"
                    >
                      <span>Read Complete Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            5. ALL ARTICLES GRID
        ========================================================================= */}
        <section id="articles" className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-royal-gold font-bold text-xs uppercase tracking-wider">
                  Knowledge Library
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-royal-black mt-1">
                  {selectedCategory === "All"
                    ? "All Kitchen Chimney Articles"
                    : `${selectedCategory} Guides`}
                </h2>
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md bg-royal-black/85 backdrop-blur-sm text-royal-gold text-xs font-semibold uppercase tracking-wider border border-white/10">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.publishedDate}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-royal-black group-hover:text-royal-gold transition-colors leading-snug mb-3">
                        <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>

                      {/* Summary list snippet */}
                      <div className="border-t border-gray-100 pt-3 space-y-1">
                        {post.summaryHighlights.slice(0, 2).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 text-xs text-gray-500"
                          >
                            <span className="text-royal-gold shrink-0">▪</span>
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">
                      Doorstep Appliance Guide
                    </span>
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal-black group-hover:text-royal-gold transition-colors"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            6. DOORSTEP BOOKING BANNER
        ========================================================================= */}
        <section className="py-14 bg-royal-black text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs font-semibold uppercase tracking-wider mb-4">
                Need Professional Assistance in Delhi NCR?
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-extrabold text-white mb-4">
                Prefer an Expert Technician to Handle It?
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                From deep caustic-free baffle degreasing and motor rewinding to duct pipe
                installation, Shree Balaji Electronics provides transparent doorstep service
                with a 30-day warranty.
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
                  href={BUSINESS_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-white" />
                  <span>Instant WhatsApp Booking</span>
                </a>
              </div>
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
