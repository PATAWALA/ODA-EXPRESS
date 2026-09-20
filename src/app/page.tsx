import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Wizard from "@/components/Wizard";
import Tracking from "@/components/Tracking";
import Trust from "@/components/Trust";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Wizard />
        <Tracking />
        <Trust />
      </main>
      <Footer />
    </>
  );
}