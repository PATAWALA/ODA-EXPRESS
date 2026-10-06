import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SECTORS } from "@/content/sectors";

export default function SectorsSection() {
  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
      {/* Dégradé de section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-navy-50/40 to-white"
      />

      {/* Halo bleu en haut à gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-navy-100/60 via-express-50/40 to-transparent blur-3xl"
      />

      {/* Halo rouge en bas à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-tr from-express-100/50 via-navy-100/30 to-transparent blur-3xl"
      />

      <Container className="relative">
        <SectionTitle
          badge="Secteurs d'intervention"
          title="Ce que nos clients nous confient régulièrement"
          subtitle="Des équipements lourds aux marchandises en gros, nous sourçons et expédions dans tous les grands secteurs d'activité."
        />

        {/* Grille */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)] sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((sector) => (
              <Link
                key={sector.slug}
                href="/produits"
                className="group relative flex flex-col overflow-hidden bg-gradient-to-br from-white via-white to-navy-50/60 p-7 transition-all duration-300 hover:to-express-50/60"
              >
                {/* Halo interne au survol */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-navy-200/40 via-transparent to-transparent blur-2xl opacity-60 transition-opacity duration-300 group-hover:from-express-200/60 group-hover:opacity-100"
                />

                {/* Icône avec dégradé */}
                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md transition-all duration-300 group-hover:scale-105 group-hover:from-express-600 group-hover:to-express-700 group-hover:shadow-[0_8px_20px_-8px_rgba(191,8,8,0.5)]">
                  <sector.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>

                {/* Titre */}
                <h3 className="relative mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                  {sector.title}
                </h3>

                {/* Description */}
                <p className="relative mt-2 flex-1 text-[13px] leading-relaxed text-zinc-600">
                  {sector.description}
                </p>

                {/* Indicateur "Voir les produits" */}
                <span className="relative mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition-all duration-300 group-hover:gap-2.5 group-hover:text-express-600">
                  Voir les produits
                  <ArrowRight
                    className="h-3 w-3 transition group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </span>

                {/* Trait rouge qui s'allonge au survol */}
                <div
                  aria-hidden
                  className="relative mt-4 h-px w-8 bg-gradient-to-r from-express-600 to-transparent transition-all duration-300 group-hover:w-16"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* CTA bas de section */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[14px] text-zinc-600">
            Vous cherchez un secteur qui n&apos;apparaît pas dans la liste ?
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-navy-900 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
          >
            Nous consulter
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}