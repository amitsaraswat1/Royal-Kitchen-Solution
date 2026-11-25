import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import ServiceablePinCodes from "@/components/ServiceablePinCodes";
import ContactBooking from "@/components/ContactBooking";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white text-royal-text selection:bg-royal-gold selection:text-white">
      {/* Sticky Header */}
      <Header />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Services */}
        <Services />

        {/* 3. About Us */}
        <About />

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 7. Before & After Gallery with Lightbox */}
        <Gallery />

        {/* 8. Testimonials (Driven by data, hidden if empty) */}
        <Testimonials />

        {/* 9. FAQ Accordion */}
        <Faq />

        {/* 10. Serviceable PIN Codes & Localities */}
        <ServiceablePinCodes />

        {/* 11. Contact & Booking Form */}
        <ContactBooking />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Call & WhatsApp Actions + Mobile Sticky Bar */}
      <FloatingActions />
    </div>
  );
}
