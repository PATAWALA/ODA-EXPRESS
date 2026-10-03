import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function FinalCTA() {
  return (
    <section className="bg-navy-950 py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
            Prêt à démarrer ?
          </p>

          <h2 className="mt-6 text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-[38px] lg:text-[44px]">
            Parlons de votre prochain
            <br />
            projet d&apos;import depuis la Chine.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-navy-200">
            Décrivez-nous votre produit, votre volume ou votre besoin. Nous vous
            répondons sous 24 h avec une solution claire et un devis précis.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <ButtonLink
              href="/contact"
              variant="white"
              size="lg"
              className="group min-w-[210px] shadow-lg"
            >
              Se faire accompagner
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </ButtonLink>

            <ButtonLink
              href="https://wa.me/8619515660197"
              variant="whatsapp"
              size="lg"
              className="min-w-[210px] shadow-lg"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Écrire sur WhatsApp
            </ButtonLink>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-[13px] text-navy-300">
            <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />
            odaxpress10@gmail.com
          </p>
        </div>
      </Container>
    </section>
  );
}