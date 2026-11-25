import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Phone,
  Tag,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Info,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BUSINESS_INFO } from "@/data/content";
import { BLOG_POSTS, BlogPost } from "@/data/blogs-content";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Article Not Found | Royal Kitchen Solution",
    };
  }

  return {
    title: `${post.title} | Royal Kitchen Solution`,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const getWhatsAppBookingText = () => {
    const text = `Hello Royal Kitchen Solution, I read your guide "${post.title}" and would like to book a doorstep chimney service or inspection.`;
    return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* 1. Header */}
      <Header />

      <main id="main-content">
        {/* =========================================================================
            ARTICLE HERO HEADER - LUXURY BLACK THEME
        ========================================================================= */}
        <section
          id="article-hero"
          className="relative flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-royal-black text-white"
        >
          {/* Background Image with Dark & Gold Overlays */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/hero-bg.jpg"
              alt="Kitchen Chimney care guides"
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
                <Link href="/blogs" className="hover:text-royal-gold transition-colors">
                  Blogs &amp; Guides
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <span className="text-royal-gold font-medium truncate max-w-xs sm:max-w-md">
                  {post.title}
                </span>
              </nav>

              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3.5 py-1 rounded-full bg-royal-gold text-royal-black text-xs font-bold uppercase tracking-wider shadow-xs">
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Calendar className="w-3.5 h-3.5 text-royal-gold" />
                  <span>{post.publishedDate}</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-300 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-royal-gold" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <h1 className="font-serif text-xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                {post.title}
              </h1>

              <p className="text-sm sm:text-lg lg:text-xl text-gray-200 leading-relaxed font-light mb-8 max-w-3xl">
                {post.excerpt}
              </p>

              {/* Author Byline */}
              <div className="pt-6 border-t border-white/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-royal-card border border-royal-gold/40 flex items-center justify-center text-royal-gold font-bold text-sm">
                    RK
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Royal Kitchen Solution Team
                    </div>
                    <div className="text-xs text-gray-300">
                      Certified Kitchen Appliance Specialists · Delhi NCR
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-royal-gold" />
                  <span className="text-xs text-gray-300 font-medium">
                    Verified Appliance Advice
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            FEATURED IMAGE
        ========================================================================= */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-12">
          <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden shadow-md border border-gray-200">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        {/* =========================================================================
            ARTICLE BODY & SIDEBAR
        ========================================================================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content Area */}
            <article className="lg:col-span-8 space-y-10">
              {/* Key Takeaways Box */}
              <div className="bg-royal-light rounded-2xl p-6 sm:p-8 border border-royal-gold/30 shadow-xs">
                <h3 className="font-serif text-lg font-bold text-royal-black mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-royal-gold shrink-0" />
                  <span>Key Summary &amp; Essential Takeaways</span>
                </h3>
                <ul className="space-y-2.5 text-sm sm:text-base text-gray-700">
                  {post.summaryHighlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-royal-gold font-bold mt-0.5">✓</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sections */}
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-4">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-royal-black tracking-tight border-b border-gray-100 pb-2">
                    {section.heading}
                  </h2>

                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-gray-700 text-sm sm:text-base leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}

                  {section.listItems && (
                    <ul className="space-y-2.5 my-4 pl-2">
                      {section.listItems.map((item, lIdx) => (
                        <li
                          key={lIdx}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-royal-gold mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div
                      className={`rounded-xl p-5 border my-6 ${
                        section.callout.type === "warning"
                          ? "bg-amber-50/70 border-amber-300 text-amber-900"
                          : section.callout.type === "tip"
                          ? "bg-emerald-50/70 border-emerald-300 text-emerald-900"
                          : "bg-blue-50/70 border-blue-300 text-blue-900"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm mb-1.5">
                        {section.callout.type === "warning" && (
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                        )}
                        {section.callout.type === "tip" && (
                          <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {section.callout.type === "note" && (
                          <Info className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              ))}

              {/* FAQs Accordion / List */}
              {post.faqs && post.faqs.length > 0 && (
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-royal-black mb-6 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-royal-gold" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-4">
                    {post.faqs.map((faq, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-royal-light rounded-xl p-5 border border-gray-200"
                      >
                        <h4 className="font-semibold text-royal-black text-sm sm:text-base mb-2">
                          {faq.question}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Tags */}
              <div className="pt-6 border-t border-gray-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 mr-2">
                  Tagged under:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-xs font-medium"
                  >
                    <Tag className="w-3 h-3 text-gray-400" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar Sticky Booking Card */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 bg-royal-black text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-royal-gold/30">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-card border border-royal-gold/40 text-royal-gold text-xs font-semibold mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Delhi NCR Doorstep Care</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-white mb-2 leading-snug">
                  Need Help With Your Kitchen Chimney?
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                  Our certified technicians provide same-day deep cleaning, diagnostic repairs,
                  and installation across Delhi NCR with a 30-day warranty.
                </p>

                <div className="space-y-3">
                  <a
                    href={BUSINESS_INFO.callLink}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-royal-gold hover:bg-warm-gold text-royal-black font-semibold text-sm transition-all shadow-gold"
                  >
                    <Phone className="w-4 h-4 fill-royal-black" />
                    <span>Call {BUSINESS_INFO.displayPhone}</span>
                  </a>

                  <a
                    href={getWhatsAppBookingText()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-md"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp Booking</span>
                  </a>
                </div>

                <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-royal-gold">✓</span>
                    <span>100% Genuine Spare Parts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-royal-gold">✓</span>
                    <span>Caustic-Free Degreasing Formulas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-royal-gold">✓</span>
                    <span>Transparent Upfront Pricing</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* =========================================================================
            RELATED GUIDES SECTION
        ========================================================================= */}
        {relatedPosts.length > 0 && (
          <section className="py-14 bg-royal-light border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-serif text-2xl font-bold text-royal-black mb-8">
                Related Kitchen Chimney Guides
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blogs/${rel.slug}`}
                    className="group bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-royal-gold">
                          {rel.category}
                        </span>
                        <h4 className="font-serif text-base font-bold text-royal-black group-hover:text-royal-gold transition-colors mt-1 mb-2 line-clamp-2">
                          {rel.title}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {rel.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                        <span>{rel.readTime}</span>
                        <span className="text-royal-gold font-semibold group-hover:underline">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Actions */}
      <FloatingActions />
    </div>
  );
}
