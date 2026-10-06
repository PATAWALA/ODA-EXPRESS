import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "S'abonner à la veille import — ODA Sources",
    template: `%s | ODA Sources`,
  },
  description:
    "Rejoignez la communauté des importateurs Chine — Afrique. Chaque mois : opportunités produits, prix du fret et guides pratiques pour importer sans vous faire piéger. Gratuit, sans spam.",
  keywords: [
    "veille import Chine",
    "newsletter sourcing Chine",
    "opportunités produits Chine Afrique",
    "prix fret maritime",
    "guides import",
    "ODA Sources",
  ],
  alternates: { canonical: "/newsletter" },
  openGraph: {
    type: "website",
    url: "/newsletter",
    siteName: "ODA Sources",
    title: "Rejoignez +500 importateurs Chine — Afrique | ODA Sources",
    description:
      "Chaque mois : opportunités produits, prix du fret et guides pratiques. Gratuit, 1 email par mois, désinscription en 1 clic.",
    locale: "fr_FR",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rejoignez la communauté des importateurs Chine — ODA Sources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rejoignez +500 importateurs Chine — Afrique | ODA Sources",
    description:
      "Chaque mois : opportunités produits, prix du fret et guides pratiques. Gratuit, sans spam.",
    images: ["/og/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}