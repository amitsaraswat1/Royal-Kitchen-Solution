import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us & Book Doorstep Visit | Shree Balaji Electronics",
  description:
    "Contact Shree Balaji Electronics for doorstep kitchen chimney service in Delhi, Noida, Gurgaon, Ghaziabad & Faridabad. Call +91 8796886094 or book online.",
  keywords: [
    "contact kitchen chimney service",
    "book chimney technician Delhi",
    "chimney repair customer care Noida Gurgaon",
    "Shree Balaji Electronics contact number",
    "doorstep chimney appointment",
  ],
  openGraph: {
    title: "Contact Us & Book Doorstep Visit | Shree Balaji Electronics",
    description:
      "Call +91 8796886094 or book a certified doorstep technician for kitchen chimney cleaning, repair, and installation in Delhi NCR.",
    type: "website",
    locale: "en_IN",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
