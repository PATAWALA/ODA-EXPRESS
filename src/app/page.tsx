import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MaritimeCalculator from "@/components/MaritimeCalculator";
import ProductCatalog from "@/components/ProductCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductCatalog />
        <MaritimeCalculator />
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}