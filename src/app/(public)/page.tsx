import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import SectorsSection from "@/components/sections/SectorsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProductsSection from "@/components/sections/ProductsSection";
import GallerySection from "@/components/sections/GallerySection";
import AboutSection from "@/components/sections/AboutSection";
import NewsletterSection from "@/components/widgets/NewsletterSection";
import FinalCTA from "@/components/sections/FinalCTA";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";

export const metadata: Metadata = {
  title: "Sourcing & Import Chine-Afrique | ODA Sources",
  description: "ODA Sources vous accompagne dans le sourcing, le contrôle qualité et le shipping de vos produits depuis la Chine vers l'Afrique. Réponse sous 24h.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ODA Sources",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/produits?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <TrustBar />
      <ServicesSection />
      <SectorsSection />
      <ProcessSection />
      <ProductsSection />
      <GallerySection />
      <AboutSection />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}