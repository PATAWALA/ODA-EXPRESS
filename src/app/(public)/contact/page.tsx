import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import ContactForm from "@/components/widgets/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Décrivez-nous votre projet d'import depuis la Chine. Nous vous répondons sous 24 heures ouvrées.",
};

export default function ContactPage() {
  return (
    <>
      {/* En-tête + formulaire */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl py-16 sm:py-20 lg:py-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Contact
            </p>

            <h1 className="mt-6 text-[32px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[40px]">
              Parlez-nous de votre projet
            </h1>

            <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-zinc-600">
              Remplissez le formulaire ci-dessous. Plus vous êtes précis sur le
              produit, la quantité et la destination, plus notre réponse sera
              rapide et adaptée.
            </p>

            <div className="mt-10">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}