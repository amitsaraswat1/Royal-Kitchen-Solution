import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Shree Balaji Electronics - Kitchen Chimney Specialists",
  description:
    "Learn about Shree Balaji Electronics, Delhi NCR's trusted doorstep kitchen chimney specialists. Over 15+ years of experience in chimney deep cleaning, motor rewinding, and appliance maintenance.",
  keywords: [
    "about Shree Balaji Electronics",
    "kitchen chimney specialists Delhi NCR",
    "chimney repair company Noida Gurgaon",
    "certified chimney technicians",
    "doorstep kitchen appliance service",
  ],
  openGraph: {
    title: "About Us | Shree Balaji Electronics - Kitchen Chimney Specialists",
    description:
      "Trusted kitchen chimney cleaning, repair, and installation specialists serving Delhi NCR with 15+ years of excellence.",
    type: "website",
    locale: "en_IN",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
