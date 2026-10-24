import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import SectionDivider from "@/components/ui/SectionDivider";
import { SECTORS } from "@/content/sectors";

export default function SectorsSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-navy-200/40 via-navy-100/20 to-transparent blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/20 to-transparent blur-3xl"
        />

        <Container size="xl" className="relative">
          <SectionTitle
            badge="Secteurs d'intervention"
            title="Ce que nos clients nous confient régulièrement"
            subtitle="Des équipements lourds aux marchandises en gros, nous sourçons et expédions dans tous les grands secteurs d'activité."
          />

          <div className="mx-auto mt-16 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((sector) => (
              <Link
                key={sector.slug}
                href="/produits"
                className="group relative flex flex-col bg-white p-7 transition hover:bg-zinc-50 sm:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 text-navy-900 transition group-hover:border-express-600 group-hover:bg-express-600 group-hover:text-white">
                  <sector.icon className="h-5.5 w-5.5" strokeWidth={1.6} />
                </span>

                <h3 className="mt-5 text-[17px] font-bold tracking-tight text-navy-900">
                  {sector.title}
                </h3>

                <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-zinc-600">
                  {sector.description}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition group-hover:gap-2.5 group-hover:text-express-600">
                  Voir les produits
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-[15.5px] text-zinc-600">
              Vous cherchez un secteur qui n&apos;apparaît pas dans la liste ?
            </p>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl border border-navy-900 bg-white px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
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

      {/* ✅ SVG inchangé */}
      <SectionDivider variant="arc" bg="white" color="navy-50" height="lg" />
    </>
  );
}