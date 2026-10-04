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

      {/* WhatsApp en bas */}
      <section className="bg-zinc-50/60 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-start gap-6 rounded-2xl border border-zinc-200 bg-white p-8 sm:flex-row sm:items-center sm:p-10">
              {/* Icône */}
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
              </span>

              {/* Texte */}
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Préférez-vous discuter ?
                </p>
                <p className="mt-1.5 text-[18px] font-bold tracking-tight text-navy-900 sm:text-[20px]">
                  Écrivez-nous sur WhatsApp
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600">
                  Disponibles du lundi au samedi, 9h — 19h (heure de Chine).
                </p>
              </div>

              {/* Bouton */}
              <a
                href="https://wa.me/8619515660197"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
                Ouvrir WhatsApp
              </a>
            </div>

            {/* Note discrète */}
            <p className="mt-6 text-center text-[11.5px] text-zinc-500">
              Réponse sous 24 heures ouvrées · Sans engagement
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}