import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SECTORS } from "@/content/sectors";

export default function SectorsSection() {
  return (
    <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionTitle
          badge="Secteurs d'intervention"
          title="Ce que nos clients nous confient régulièrement"
          subtitle="Des équipements lourds aux marchandises en gros, nous sourçons et expédions dans tous les grands secteurs d'activité."
        />

        {/* Grille */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {SECTORS.map((sector) => (
            <Link
              key={sector.slug}
              href="/produits"
              className="group relative flex flex-col bg-white p-7 transition hover:bg-zinc-50"
            >
              {/* Icône */}
              <span className="flex h-11 w-11 items-center justify-center border border-zinc-200 text-navy-900 transition group-hover:border-express-600 group-hover:bg-express-600 group-hover:text-white">
                <sector.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>

              {/* Titre */}
              <h3 className="mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                {sector.title}
              </h3>

              {/* Description */}
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-600">
                {sector.description}
              </p>

              {/* Petit indicateur "En savoir +" */}
              <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition group-hover:gap-2.5 group-hover:text-express-600">
                Voir les produits
                <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </Link>
          ))}
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