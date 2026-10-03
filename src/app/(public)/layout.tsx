import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import ExitIntentModal from "@/components/widgets/ExitIntentModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[60vh]">{children}</main>
      <Footer />
      <BottomNav />
      <WhatsAppFloat />
      <ExitIntentModal />
    </>
  );
}