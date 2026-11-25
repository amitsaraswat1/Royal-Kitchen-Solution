import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Chimney Services & Repair in Delhi NCR | Shree Balaji Electronics",
  description:
    "Explore comprehensive kitchen chimney services by Shree Balaji Electronics: deep cleaning, motor repair, baffle filter replacement, installation, and AMC plans. Doorstep service with 30-day warranty.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Kitchen Chimney Services & Repair | Shree Balaji Electronics",
    description:
      "Professional kitchen chimney deep cleaning, motor repair, installation and AMC plans across Delhi NCR. Call +91 87968 86094.",
    url: "https://shreebalajielectronics.com/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
