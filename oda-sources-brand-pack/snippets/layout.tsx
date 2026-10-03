// Fichier cible : src/app/layout.tsx  (ou app/layout.tsx si le projet n'a pas de dossier src/)
// Remplace/fusionne avec ton layout existant : garde ton <body>, tes polices, tes providers.

import type { Metadata, Viewport } from "next";
import "./globals.css";

// ⚠️ Remplace par l'URL réelle du site (sans slash final). Indispensable pour les images de partage.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";
const SITE_NAME = "ODA Sources";
const SITE_TITLE = "ODA Sources — Import & Export";
const SITE_DESCRIPTION = "ODA Sources — Import & Export."; // ← remplace par ta vraie description (150-160 caractères)

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  // ---- Favicons / icônes (fichiers dans /public) ----
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#01215B" }],
  },

  // ---- PWA ----
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: SITE_NAME, statusBarStyle: "default" },
  formatDetection: { telephone: false },

  // ---- Partage réseaux sociaux (Facebook, WhatsApp, LinkedIn, Telegram...) ----
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "fr_FR",
    images: [
      { url: "/og/og-image.png", width: 1200, height: 630, alt: "ODA Sources — Import & Export" },
    ],
  },

  // ---- X / Twitter ----
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og/twitter-image.png"],
  },
};

// Site 100 % clair : pas de thème sombre. theme_color = barre du navigateur mobile.
export const viewport: Viewport = {
  themeColor: "#01215B",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        {/* Windows (tuiles épinglées) — optionnel */}
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#01215B" />
        {/* Données structurées : aide Google à afficher le logo dans les résultats */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: SITE_NAME,
              url: SITE_URL,
              logo: `${SITE_URL}/brand/logo/logo-full-960.png`,
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
