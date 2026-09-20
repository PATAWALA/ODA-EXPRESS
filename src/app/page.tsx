import ConversionWizard from "@/components/ConversionWizard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import TrackingSection from "@/components/TrackingSection";
import TrustProof from "@/components/TrustProof";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <ConversionWizard />
        <TrackingSection />
        <TrustProof />
      </main>
      <Footer />
    </>
  );
}