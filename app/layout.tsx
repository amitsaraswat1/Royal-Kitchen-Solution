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
  title: "Kitchen Chimney Service & Repair | Royal Kitchen Solution",
  description:
    "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Royal Kitchen Solution. Call 7011546526.",
  keywords: [
    "Kitchen Chimney Service",
    "Chimney Cleaning Service",
    "Chimney Repair",
    "Chimney Installation",
    "Kitchen Chimney Maintenance",
    "Filter Replacement",
    "Motor Repair",
  ],
  authors: [{ name: "Royal Kitchen Solution" }],
  creator: "Royal Kitchen Solution",
  publisher: "Royal Kitchen Solution",
  metadataBase: new URL("https://royalkitchensolution.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://royalkitchensolution.com",
    siteName: "Royal Kitchen Solution",
    title: "Kitchen Chimney Service & Repair | Royal Kitchen Solution",
    description:
      "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Royal Kitchen Solution. Call 7011546526.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Royal Kitchen Solution - Professional Kitchen Chimney Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kitchen Chimney Service & Repair | Royal Kitchen Solution",
    description:
      "Book professional kitchen chimney cleaning, repair, installation and maintenance services with Royal Kitchen Solution. Call 7011546526.",
    images: ["/images/hero-bg.jpg"],
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
    url: "https://royalkitchensolution.com",
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
