import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Mail,
  ClipboardList,
  TrendingUp,
  Ship,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import NewsletterInlineForm from "@/components/widgets/NewsletterInlineForm";
import ContactForm from "@/components/widgets/ContactForm";

export const metadata: Metadata = {
  title: "La Veille Import Chine — Afrique",
  description:
    "Recevez chaque mois l'essentiel pour vos achats en Chine : nouvelles opportunités produits, évolution des prix et délais de fret, guides pratiques.",
};

const AVANTAGES = [
  {
    icon: TrendingUp,
    title: "Opportunités produits",
    description: "Les nouveaux produits et usines que nous sourçons chaque mois.",
  },
  {
    icon: Ship,
    title: "Prix & délais de fret",
    description: "L'évolution des tarifs maritimes et aériens vers l'Afrique.",
  },
  {
    icon: FileText,
    title: "Guides pratiques",
    description: "Des conseils clairs pour importer sans vous faire piéger.",
  },
  {
    icon: ShieldCheck,
    title: "Zéro spam",
    description: "1 email par mois maximum. Désinscription en un clic.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl py-16 text-center sm:py-20 lg:py-24">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              La Veille Import Chine — Afrique
            </p>

            <h1 className="mt-6 text-[32px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[42px]">
              L&apos;essentiel de l&apos;import
              <br />
              <span className="text-express-600">
                dans votre boîte, chaque mois.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.75] text-zinc-600">
              Nouvelles usines, prix du fret, guides pratiques. Tout ce qu&apos;il
              faut savoir pour sourcer en Chine sans mauvaise surprise — envoyé
              une fois par mois.
            </p>
          </div>

          {/* Avantages */}
          <div className="mx-auto grid max-w-5xl gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {AVANTAGES.map((item) => (
              <div key={item.title} className="bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center border border-zinc-200 text-navy-900">
                  <item.icon className="h-4 w-4" strokeWidth={1.6} />
                </span>
                <p className="mt-4 text-[13.5px] font-bold tracking-tight text-navy-900">
                  {item.title}
                </p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-zinc-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ 2 PARCOURS ============ */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Choisissez votre parcours
            </p>
            <h2 className="mt-5 text-[26px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[32px]">
              Vous vous informez, ou vous passez à l&apos;action ?
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-8 lg:grid-cols-2">
            {/* ========== Parcours 1 : Inscription ========== */}
            <div className="flex flex-col border border-zinc-200 bg-white p-8 sm:p-10">
              {/* En-tête */}
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-navy-900 text-white">
                  <Mail className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Parcours 1
                  </p>
                  <p className="mt-0.5 text-[16px] font-bold tracking-tight text-navy-900">
                    Je m&apos;inscris
                  </p>
                </div>
              </div>

              <h3 className="mt-6 text-[20px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[22px]">
                Restez informé
                <br />
                des opportunités d&apos;import.
              </h3>

              <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
                Recevez chaque mois l&apos;essentiel pour vos achats en Chine.
                Gratuit, sans engagement.
              </p>

              {/* Bénéfices */}
              <ul className="mt-6 space-y-2.5 border-t border-zinc-100 pt-6">
                {[
                  "Nouvelles opportunités produits",
                  "Évolution des prix du fret",
                  "Guides pratiques et conseils",
                  "Aucune publicité, aucun spam",
                ].map((point) => (
                  <li key={point} className="flex gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-express-600"
                      strokeWidth={2.5}
                    />
                    <span className="text-[13px] leading-relaxed text-navy-900">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Formulaire */}
              <div className="mt-8 flex-1">
                <NewsletterInlineForm />
              </div>
            </div>

            {/* ========== Parcours 2 : Projet ========== */}
            <div className="flex flex-col border border-zinc-200 bg-zinc-50/60 p-8 sm:p-10">
              {/* En-tête */}
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-express-600 text-white">
                  <ClipboardList className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <div>
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Parcours 2
                  </p>
                  <p className="mt-0.5 text-[16px] font-bold tracking-tight text-navy-900">
                    J&apos;ai un projet
                  </p>
                </div>
              </div>

              <h3 className="mt-6 text-[20px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[22px]">
                Décrivez votre projet.
                <br />
                Réponse sous 24 h.
              </h3>

              <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
                Vous cherchez un produit précis, un fournisseur, ou vous voulez
                faire vérifier une usine ? Expliquez-nous, nous revenons vers
                vous avec un devis clair.
              </p>

              <div className="mt-8 flex-1">
                <ContactForm />
              </div>
            </div>
          </div>

          {/* Note bas de page */}
          <p className="mx-auto mt-10 max-w-xl text-center text-[12.5px] leading-relaxed text-zinc-500">
            Vous ne savez pas encore lequel choisir ?{" "}
            <Link
              href="/contact"
              className="font-semibold text-express-600 hover:underline"
            >
              Écrivez-nous sur WhatsApp
            </Link>
            , nous vous orientons.
          </p>
        </Container>
      </section>
    </>
  );
}

