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
  ExternalLink,
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

const AVATARS = [
  {
    src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&q=80",
    alt: "Importateur",
  },
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    alt: "Importateur",
  },
  {
    src: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=100&q=80",
    alt: "Importateur",
  },
  {
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&q=80",
    alt: "Importateur",
  },
];

export default function NewsletterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      {/* ============ BLOC HAUT — FOND NAVY PROFOND ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 pt-14 pb-24 sm:pt-16 sm:pb-28">
        {/* Halo bleu en haut à droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-express-600/25 via-navy-500/15 to-transparent blur-3xl"
        />

        {/* Halo rouge en bas à gauche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-express-600/20 via-navy-500/10 to-transparent blur-3xl"
        />

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            {/* Logo — non cliquable */}
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/logo/logo-white-1920.png"
                alt="ODA Sources"
                className="h-auto w-[160px] object-contain opacity-90"
              />
            </div>

            {/* Chiffre géant */}
            <div className="mt-12">
              <p className="text-[80px] font-bold leading-none tracking-tight text-white sm:text-[110px]">
                +500
              </p>
              <p className="mt-3 text-[14px] font-bold uppercase tracking-[0.22em] text-express-400">
                Importateurs inscrits
              </p>
            </div>

            {/* Titre */}
            <h1 className="mx-auto mt-8 max-w-lg text-[22px] font-bold leading-[1.25] tracking-tight text-white sm:text-[26px]">
              Reçoivent chaque mois notre veille import.
            </h1>

            <p className="mx-auto mt-5 max-w-md text-[14.5px] leading-[1.75] text-navy-200">
              Opportunités produits, prix du fret et conseils pratiques pour
              importer depuis la Chine sans vous faire piéger.
            </p>
          </div>
        </Container>
      </section>

      {/* ============ FORMULAIRE — CHEVAUCHEMENT ============ */}
      <section className="relative -mt-16 pb-16 sm:-mt-20 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-xl">
            {/* Carte formulaire avec halo */}
            <div className="relative">
              {/* Halo bleu derrière la carte */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br from-navy-100/60 via-express-50/40 to-navy-50/60 blur-2xl"
              />

              <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(1,18,52,0.25)] sm:p-8">
                {/* Badges de réassurance */}
                <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
                    100% gratuit
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-navy-200 bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-navy-700">
                    1 email / mois
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-2xl border border-navy-200 bg-white px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-navy-700">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2.5} />
                    Désinscription 1 clic
                  </span>
                </div>

                {/* Formulaire */}
                <NewsletterInlineForm />

                {/* Preuve sociale */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-zinc-100 pt-6">
                  <div className="flex -space-x-2.5">
                    {AVATARS.map((avatar) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={avatar.src}
                        src={avatar.src}
                        alt={avatar.alt}
                        className="h-8 w-8 rounded-full border-2 border-white object-cover shadow-sm"
                      />
                    ))}
                  </div>
                  <p className="text-[12.5px] text-zinc-600">
                    <strong className="text-navy-900">+500 importateurs</strong>{" "}
                    sont déjà inscrits
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ BLOC WHATSAPP ============ */}
      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mx-auto max-w-xl">
            {/* Séparateur */}
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                ou
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
            </div>

            {/* Carte WhatsApp */}
            <div className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white via-white to-emerald-50/50 p-6 shadow-[0_4px_24px_-12px_rgba(5,150,105,0.15)] transition-all duration-300 hover:shadow-[0_12px_40px_-16px_rgba(5,150,105,0.25)] sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-emerald-200/40 via-emerald-100/20 to-transparent blur-2xl"
              />

              <div className="relative flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md">
                  <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[15px] font-bold tracking-tight text-navy-900">
                    Un projet d&apos;import en tête ?
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-zinc-600">
                    Décrivez votre produit, votre volume ou votre besoin
                    directement à Mr ODA sur WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href="https://wa.me/8619515660197?text=Bonjour%20Mr%20ODA%2C%20je%20souhaite%20discuter%20de%20mon%20projet%20d%27import."
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative mt-6 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(5,150,105,0.5)]"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
                Écrire à Mr ODA sur WhatsApp
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </a>

              <p className="relative mt-3 text-center text-[11.5px] text-zinc-500">
                Disponible du lundi au samedi · 9h — 19h (heure de Chine)
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ 3 AVANTAGES ============ */}
      <section className="border-t border-zinc-100 bg-gradient-to-b from-white to-navy-50/30 pb-16 pt-16 sm:pb-20 sm:pt-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              Ce que vous recevez
            </p>

            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-3">
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
        </Container>
      </section>

      {/* ============ FOOTER SIMPLE ============ */}
      <footer className="border-t border-zinc-200 bg-white pb-10 pt-10">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            {/* Nom */}
            <p className="text-[13px] font-bold tracking-tight text-navy-900">
              ODA SOURCES IMPORT & EXPORT CO., LIMITED
            </p>
            <p className="mt-1 text-[11.5px] font-medium text-zinc-500">
              Sourcing · Contrôle qualité · Fret maritime Chine — Afrique
            </p>

            {/* Contacts */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-zinc-500">
              <a
                href="mailto:contact@odasources.com"
                className="transition hover:text-navy-900"
              >
                contact@odasources.com
              </a>
              <span className="hidden h-3 w-px bg-zinc-200 sm:block" />
              <a
                href="https://wa.me/8619515660197"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-navy-900"
              >
                +86 195 1566 0197
              </a>
            </div>

            {/* Bouton visiter le site */}
            <div className="mt-8">
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-navy-900 bg-navy-900 px-6 py-3.5 text-[12.5px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:bg-navy-800 hover:shadow-lg"
              >
                <ExternalLink className="h-4 w-4" strokeWidth={1.75} />
                Visiter le site
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </main>
  );
}