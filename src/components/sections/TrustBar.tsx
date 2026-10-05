import { Building2, ShieldCheck, Globe2, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";

const POINTS = [
  {
    icon: Building2,
    title: "Présence locale",
    description: "Présence permanente en Chine 🇨🇳",
  },
  {
    icon: ShieldCheck,
    title: "Vérification terrain",
    description: "Visites d'usines avant paiement",
  },
  {
    icon: Globe2,
    title: "Réseau international",
    description: "Chine · Afrique · Monde",
  },
  {
    icon: Clock,
    title: "Réponse rapide",
    description: "Sous 24 heures ouvrées",
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-zinc-200 bg-white">
      <Container>
        <div className="grid gap-y-10 py-14 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-12 lg:py-16">
          {POINTS.map((point, index) => (
            <div
              key={point.title}
              className={
                "flex items-start gap-4 " +
                (index > 0
                  ? "lg:border-l lg:border-zinc-200 lg:pl-12"
                  : "")
              }
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-express-600/10 text-express-600">
                <point.icon className="h-5 w-5" strokeWidth={1.6} />
              </span>

              <div>
                <p className="text-[14px] font-bold tracking-tight text-navy-900">
                  {point.title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}