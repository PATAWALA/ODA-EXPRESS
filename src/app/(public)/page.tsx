import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import ServicesSection from "@/components/sections/ServicesSection";
import SectorsSection from "@/components/sections/SectorsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProductsSection from "@/components/sections/ProductsSection";
import GallerySection from "@/components/sections/GallerySection";
import NewsletterSection from "@/components/widgets/NewsletterSection";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesSection />
      <SectorsSection />
      <ProcessSection />
      <ProductsSection />
      <GallerySection />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}