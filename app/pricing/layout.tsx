import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Chimney Service Pricing & Plans | Shree Balaji Electronics",
  description:
    "Transparent kitchen chimney cleaning starting at ₹999, repair estimates, and AMC maintenance contracts in Delhi NCR. Upfront quotes with zero hidden fees.",
  keywords: [
    "chimney cleaning price delhi ncr",
    "kitchen chimney deep cleaning cost",
    "chimney repair charges",
    "chimney amc cost",
    "chimney installation charges",
    "transparent chimney service pricing",
  ],
  openGraph: {
    title: "Kitchen Chimney Service Pricing & Plans | Shree Balaji Electronics",
    description:
      "Transparent kitchen chimney service rates starting at ₹999, repair diagnostics, and AMC plans across Delhi NCR.",
    type: "website",
    locale: "en_IN",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
