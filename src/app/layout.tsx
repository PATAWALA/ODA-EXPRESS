import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/lib/currency";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODA EXPRESS — Sourcing Chine & Shipping Afrique | Mr ODA",
  description:
    "Sécurisez vos achats en Chine et vos expéditions vers l'Afrique : sourcing fournisseur, inspection qualité en usine et fret aérien ou maritime. Devis qualifié en 60 secondes sur WhatsApp.",
  keywords: [
    "sourcing Chine Afrique",
    "import Chine RDC",
    "fret aérien Guangzhou Kinshasa",
    "inspection usine Chine",
    "Mr ODA",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-slate-900 antialiased">
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  );
}