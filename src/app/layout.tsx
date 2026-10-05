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
    "logistique internationale",
    "paiement fournisseur Chine",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "ODA SOURCES IMPORT & EXPORT CO., LIMITED",
              alternateName: "ODA Sources",
              url: SITE_URL,
              logo: `${SITE_URL}/brand/logo/logo-full-960.png`,
              description: SITE_DESCRIPTION,
              areaServed: ["Afrique", "Chine"],
              knowsLanguage: ["fr", "en", "zh"],
              address: [
                { "@type": "PostalAddress", addressCountry: "CN" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer service",
                  telephone: "+86-195-1566-0197",
                  email: "odaxpress10@gmail.com",
                  availableLanguage: ["fr", "en", "zh"],
                },
              ],
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