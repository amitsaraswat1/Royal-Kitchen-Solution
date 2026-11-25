import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen Chimney Blogs & Care Guides | Shree Balaji Electronics",
  description:
    "Expert tips on kitchen chimney cleaning, troubleshooting low suction, filterless vs baffle comparisons, installation heights, and motor maintenance by Shree Balaji Electronics Delhi NCR.",
  keywords: [
    "kitchen chimney blogs",
    "chimney cleaning tips india",
    "chimney low suction repair",
    "filterless vs baffle chimney",
    "chimney installation height guide",
    "chimney motor repair signs",
    "kitchen ventilation guide delhi ncr",
  ],
  openGraph: {
    title: "Kitchen Chimney Blogs & Care Guides | Shree Balaji Electronics",
    description:
      "Expert tips, troubleshooting checklists, and buying guides for kitchen chimneys in Indian kitchens.",
    type: "website",
    locale: "en_IN",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
