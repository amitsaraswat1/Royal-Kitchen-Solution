import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Gallery | Shree Balaji Electronics - Work Portfolio",
  description:
    "Explore real work photos of kitchen chimney deep cleaning, baffle filter degreasing, copper motor rewinding, and modern range hood installations across Delhi NCR.",
  keywords: [
    "kitchen chimney service gallery",
    "chimney cleaning before and after",
    "baffle filter degreasing photos",
    "chimney motor rewinding",
    "chimney installation Delhi NCR",
  ],
  openGraph: {
    title: "Service Gallery | Shree Balaji Electronics - Work Portfolio",
    description:
      "Visual showcase of genuine kitchen chimney cleaning, repair, and precision installation work by Shree Balaji Electronics.",
    type: "website",
    locale: "en_IN",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
