import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";
const SITE_NAME = "ODA Sources";
const SITE_TITLE =
  "ODA SOURCES — GLOBAL SOURCING | VÉRIFICATION & CONTRÔLE QUALITÉ | SHIPPING";
const SITE_DESCRIPTION =
  "ODA SOURCES IMPORT & EXPORT CO., LIMITED — Votre partenaire stratégique pour vos opérations en Chine. Sourcing, vérification & contrôle qualité, shipping, assistance visa & hôtel, paiement fournisseur.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  keywords: [
    "sourcing Chine Afrique",
    "import Chine",
    "export Chine",
    "contrôle qualité usine",
    "shipping Chine Afrique",
    "ODA Sources",
    "ODA Sources Import Export",
    "logistique internationale",
    "paiement fournisseur Chine",
    "fret maritime Chine Afrique",
  ],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#01215B" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "fr_FR",
    images: [
      {
        url: "/og/og-image.png",
        width: 1200,
        height: 630,
        alt: "ODA Sources — Sourcing, Vérification & Contrôle Qualité, Shipping",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#01215B",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#01215B" />

        {/* ============ SCHEMA.ORG ENRICHI ============ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              name: "ODA SOURCES IMPORT & EXPORT CO., LIMITED",
              legalName: "ODA SOURCES IMPORT & EXPORT CO., LIMITED",
              alternateName: [
                "ODA Sources",
                "ODA Sources Import Export",
                "ODA Sources Chine Afrique",
              ],
              url: SITE_URL,
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/brand/logo/logo-full-1920.png`,
                width: 1920,
                height: 336,
              },
              image: `${SITE_URL}/og/og-image.png`,
              description: SITE_DESCRIPTION,
              foundingDate: "2023",
              founder: {
                "@type": "Person",
                name: "DA Olivier",
                jobTitle: "Fondateur",
                nationality: "Burkina Faso",
              },
              address: {
                "@type": "PostalAddress",
                addressCountry: "CN",
              },
              areaServed: [
                { "@type": "Country", name: "Chine" },
                { "@type": "Country", name: "Bénin" },
                { "@type": "Country", name: "Burkina Faso" },
                { "@type": "Country", name: "Mali" },
                { "@type": "Country", name: "Côte d'Ivoire" },
                { "@type": "Country", name: "Sénégal" },
                { "@type": "Country", name: "Niger" },
                { "@type": "Country", name: "Togo" },
              ],
              knowsLanguage: ["fr", "en", "zh"],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: "+86-195-1566-0197",
                  email: "contact@odasources.com",
                  availableLanguage: ["fr", "en", "zh"],
                  areaServed: ["CN", "BJ", "BF", "ML", "CI", "SN"],
                },
              ],
              knowsAbout: [
                "Import Chine Afrique",
                "Sourcing Chine",
                "Contrôle qualité usine",
                "Fret maritime Chine Afrique",
                "Export camions et engins",
                "Paiement fournisseur Chine",
                "Global Sourcing",
                "Vérification et contrôle qualité",
                "Shipping et logistique internationale",
              ],
              slogan: "Votre partenaire en Chine, du sourcing à l'expédition",
              sameAs: [
                // Ajoute ici tes profils sociaux plus tard
                // "https://www.tiktok.com/@oda.sources",
                // "https://www.facebook.com/odasources",
              ],
            }),
          }}
        />

        {/* ============ SCHEMA.ORG WEBSITE ============ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: SITE_NAME,
              description: SITE_DESCRIPTION,
              publisher: {
                "@id": `${SITE_URL}/#organization`,
              },
              inLanguage: "fr-FR",
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white font-sans text-navy-700 antialiased">
        {children}
      </body>
    </html>
  );
}