import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ODA SOURCES — Import & Export Chine · Afrique",
  description:
    "Sourcing produits, inspection usine et fret maritime. Commandez vos produits en Chine, nous livrons en Afrique.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans text-navy-900 antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}