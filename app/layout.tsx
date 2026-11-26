import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS_INFO } from "@/data/content";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Kitchen Chimney Service & Repair | Shree Balaji Electronics",
  description:
    "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Shree Balaji Electronics. Call +91 87968 86094.",
  keywords: [
    "Kitchen Chimney Service",
    "Chimney Cleaning Service",
    "Chimney Repair",
    "Chimney Installation",
    "Kitchen Chimney Maintenance",
    "Filter Replacement",
    "Motor Repair",
  ],
  authors: [{ name: "Shree Balaji Electronics" }],
  creator: "Shree Balaji Electronics",
  publisher: "Shree Balaji Electronics",
  metadataBase: new URL("https://shreebalajielectronics.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/images/logo-icon.png", sizes: "198x198", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shreebalajielectronics.com",
    siteName: "Shree Balaji Electronics",
    title: "Kitchen Chimney & Appliance Service | Shree Balaji Electronics",
    description:
      "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Shree Balaji Electronics. Call +91 87968 86094.",
    images: [
      {
        url: "/images/logo-full.png",
        width: 1024,
        height: 341,
        alt: "Shree Balaji Electronics - Professional Kitchen Chimney Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Chimney & Appliance Service | Shree Balaji Electronics",
    description:
      "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Shree Balaji Electronics. Call +91 87968 86094.",
    images: ["/images/logo-full.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS_INFO.name,
    telephone: `+91${BUSINESS_INFO.phone}`,
    email: BUSINESS_INFO.email,
    url: "https://shreebalajielectronics.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C2 - GROUND FLOOR MAHINDRA PARK, Uttam Nagar",
      postalCode: "110059",
      addressLocality: "Uttam Nagar, Delhi",
      addressRegion: "Delhi",
      addressCountry: "IN",
    },
    openingHours: "Mo-Su 10:00-19:00",
  };

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-royal-text antialiased selection:bg-royal-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
