import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  TrendingUp,
  Ship,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import NewsletterInlineForm from "@/components/widgets/NewsletterInlineForm";

export const metadata: Metadata = {
  title: "S'abonner à la veille import — ODA Sources",
  description:
    "Rejoignez la communauté des importateurs Chine — Afrique. Chaque mois : opportunités produits, prix du fret et guides pratiques. Gratuit, sans spam.",
};

const AVANTAGES = [
  {
    icon: TrendingUp,
    title: "Opportunités produits",
    description: "Les nouvelles usines et produits que nous sourçons chaque mois.",
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
];

export default function NewsletterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* ============ FOND DÉGRADÉ ============ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-100/80 via-navy-50/40 to-white"
      />

      {/* Halo bleu en haut à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
      />

      {/* Halo rouge en bas à gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
      />

      <Container className="relative">
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center py-12 sm:py-16">
          {/* ============ LOGO ============ */}
          <div className="flex justify-center">
            <Link href="/" aria-label="ODA Sources — Accueil">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/navbar/logo-navbar@3x.png"
                alt="ODA Sources"
                className="h-auto w-[180px] object-contain"
              />
            </Link>
          </div>

          {/* ============ TITRE ============ */}
          <div className="mt-10 text-center">
            <h1 className="text-[30px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[40px]">
              Rejoignez la communauté
              <br />
              <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                des importateurs Chine.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-md text-[15px] leading-[1.75] text-zinc-600">
              Chaque mois, recevez les nouvelles opportunités produits,
              l&apos;évolution des prix du fret et des conseils pratiques pour
              importer depuis la Chine sans vous faire piéger.
            </p>

            {/* Badges de réassurance */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                100% gratuit
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl border border-navy-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-navy-700">
                1 email / mois
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-2xl border border-navy-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-navy-700">
                <ShieldCheck className="h-3 w-3" strokeWidth={2.5} />
                Désinscription 1 clic
              </span>
            </div>
          </div>

          {/* ============ CARTE FORMULAIRE ============ */}
          <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_12px_40px_-16px_rgba(1,18,52,0.20)] sm:p-8">
            <NewsletterInlineForm />

            {/* Preuve sociale */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-zinc-100 pt-6">
              <div className="flex -space-x-2">
                {[
                  { initial: "A", color: "bg-navy-700" },
                  { initial: "K", color: "bg-express-600" },
                  { initial: "M", color: "bg-emerald-600" },
                  { initial: "S", color: "bg-amber-600" },
                ].map((avatar) => (
                  <span
                    key={avatar.initial}
                    className={
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white " +
                      avatar.color
                    }
                  >
                    {avatar.initial}
                  </span>
                ))}
              </div>
              <p className="text-[12.5px] text-zinc-600">
                <strong className="text-navy-900">+500 importateurs</strong>{" "}
                reçoivent déjà notre veille
              </p>
            </div>
          </div>

          {/* ============ SÉPARATEUR "OU" ============ */}
          <div className="my-10 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              ou
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
          </div>

          {/* ============ BLOC WHATSAPP ============ */}
          <div className="text-center">
            <p className="text-[15px] font-bold tracking-tight text-navy-900">
              Vous avez un projet d&apos;import précis ?
            </p>
            <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-zinc-600">
              Décrivez votre produit, votre volume ou votre besoin directement
              à Mr ODA sur WhatsApp. Réponse sous 24 heures ouvrées.
            </p>

            <a
              href="https://wa.me/8619515660197?text=Bonjour%20Mr%20ODA%2C%20je%20souhaite%20discuter%20de%20mon%20projet%20d%27import."
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(5,150,105,0.5)]"
            >
              <MessageCircle className="h-4 w-4" strokeWidth={2} />
              Écrire à Mr ODA sur WhatsApp
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </a>

            <p className="mt-3 text-[11.5px] text-zinc-500">
              Disponible du lundi au samedi · 9h — 19h (heure de Chine)
            </p>
          </div>

          {/* ============ 3 AVANTAGES ============ */}
          <div className="mt-14">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              Ce que vous recevez
            </p>

            <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
              {AVANTAGES.map((item) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-navy-50/50 p-5 transition-all duration-300 hover:to-express-50/50"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br from-navy-200/40 to-transparent blur-xl transition group-hover:from-express-200/50"
                  />

                  <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:from-express-600 group-hover:to-express-700">
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>

                  <p className="relative mt-4 text-[13px] font-bold tracking-tight text-navy-900">
                    {item.title}
                  </p>
                  <p className="relative mt-1 text-[11.5px] leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ============ CONTACTS DISCRETS ============ */}
          <div className="mt-14 border-t border-zinc-200 pt-8 text-center">
            <p className="text-[11.5px] font-medium text-zinc-500">
              <strong className="text-navy-900">ODA SOURCES</strong> · Guangzhou,
              Chine
            </p>
            <p className="mt-1 text-[11.5px] text-zinc-500">
              <a
                href="mailto:contact@odasources.com"
                className="transition hover:text-navy-900"
              >
                contact@odasources.com
              </a>
              {" · "}
              <a
                href="https://www.odasources.com"
                className="transition hover:text-navy-900"
              >
                odasources.com
              </a>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}