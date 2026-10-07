import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: "+3 ans", label: "d'expérience terrain" },
  { value: "5 pôles", label: "d'expertise intégrés" },
  { value: "24 h", label: "délai de réponse" },
];

export default function AboutSection() {
  return (
    <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image équipe */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/team/equipe-showroom.jpeg"
                alt="Notre équipe en Chine"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-zinc-200 bg-white px-5 py-4 shadow-xl lg:block">
              <p className="text-[20px] font-bold leading-none text-navy-900">
                +500
              </p>
              <p className="mt-1.5 text-[11px] uppercase tracking-[0.15em] text-zinc-500">
                projets accompagnés
              </p>
            </div>
          </div>

          {/* Contenu */}
          <div className="order-1 lg:order-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              À propos d&apos;ODA Sources
            </p>

            <h2 className="mt-6 text-[30px] font-bold leading-[1.15] tracking-tight text-navy-900 sm:text-[38px] lg:text-[44px]">
              Une expertise
              <br />
              construite sur le terrain,
              <br />
              <span className="text-express-600">
                au cœur de la Chine.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-[15px] leading-[1.75] text-zinc-600">
              ODA SOURCES IMPORT & EXPORT CO., LIMITED est une société
              spécialisée dans le sourcing, l&apos;import-export et
              l&apos;accompagnement des opérations commerciales internationales,
              avec une présence permanente en Chine 🇨🇳.
            </p>

            <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-zinc-600">
              Nous accompagnons les commerçants, distributeurs, industriels et
              investisseurs africains dans leurs approvisionnements en Chine,
              avec transparence, rigueur et maîtrise des risques.
            </p>

            {/* Chiffres clés */}
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-zinc-200 pt-8">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-[22px] font-bold tracking-tight text-navy-900">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 text-[11.5px] leading-snug text-zinc-500">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10">
              <Link
                href="/a-propos"
                className="group inline-flex items-center gap-2 rounded-2xl border border-navy-900 bg-white px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
              >
                En savoir plus
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}