import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODA SOURCES — Import & Export Chine · Afrique | Fret Maritime",
  description:
    "Sourcing sécurisé, inspection usine et fret maritime groupé (CBM) ou conteneur complet. Un seul interlocuteur à Guangzhou pour vos importations vers l'Afrique.",
  keywords: [
    "sourcing Chine Afrique",
    "import Chine",
    "fret maritime CBM",
    "groupage conteneur",
    "ODA Sources",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-navy-900 antialiased">
        {children}
      </body>
    </html>
  );
}