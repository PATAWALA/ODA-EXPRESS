import { Building2, ShieldCheck, Globe2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

const POINTS = [
  {
    icon: Building2,
    title: "Présence locale",
    description: "Équipe permanente en Chine 🇨🇳.",
    gradient: "from-navy-700 to-navy-900",
    hover: "group-hover:from-navy-600 group-hover:to-navy-800",
    halo: "from-navy-200/50",
  },
  {
    icon: ShieldCheck,
    title: "Vérification terrain",
    description: "Visites d'usines physiques avant tout paiement.",
    gradient: "from-express-600 to-express-700",
    hover: "group-hover:from-express-500 group-hover:to-express-600",
    halo: "from-express-200/60",
  },
  {
    icon: Globe2,
    title: "Réseau international",
    description: "Chine · Afrique · reste du monde.",
    gradient: "from-navy-700 to-navy-900",
    hover: "group-hover:from-navy-600 group-hover:to-navy-800",
    halo: "from-navy-200/50",
  },
  {
    icon: Clock,
    title: "Réponse rapide",
    description: "Sous 24 heures ouvrées, sans exception.",
    gradient: "from-express-600 to-express-700",
    hover: "group-hover:from-express-500 group-hover:to-express-600",
    halo: "from-express-200/60",
  },
];

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden">
      {/* Halo décoratif central */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-navy-100/40 via-express-100/30 to-navy-100/40 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <div
              key={point.title}
              className="group relative overflow-hidden bg-gradient-to-br from-white via-white to-navy-50/60 p-6 transition-all duration-300 hover:to-navy-100/70 sm:p-7"
            >
              {/* Halo interne au survol */}
              <div
                aria-hidden
                className={
                  "pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity duration-300 opacity-60 group-hover:opacity-100 " +
                  point.halo
                }
              />

              {/* Icône avec dégradé */}
              <span
                className={
                  "relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-md transition-all duration-300 group-hover:scale-105 " +
                  point.gradient +
                  " " +
                  point.hover
                }
              >
                <point.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>

              {/* Texte */}
              <p className="relative mt-5 text-[14px] font-bold tracking-tight text-navy-900">
                {point.title}
              </p>
              <p className="relative mt-1.5 text-[13px] leading-relaxed text-zinc-600">
                {point.description}
              </p>

              {/* Trait de fin */}
              <div
                aria-hidden
                className="relative mt-5 h-px w-8 bg-gradient-to-r from-express-600 to-transparent transition-all duration-300 group-hover:w-16"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}