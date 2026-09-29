import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const POINTS = [
  "Notre entrepôt est basé à Guangzhou, au cœur des usines.",
  "Nous visitons chaque fournisseur avant tout paiement.",
  "Nous consolidons et expédions uniquement par voie maritime.",
  "Vous suivez votre dossier avec un seul interlocuteur.",
];

export default function AboutSection() {
  return (
    <section
      id="a-propos"
      className="relative overflow-hidden border-t border-zinc-100 px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&q=85"
              alt="Port de Guangzhou"
              className="col-span-2 aspect-[16/10] w-full rounded-2xl object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&q=85"
              alt="Inspection en usine"
              className="aspect-square w-full rounded-2xl object-cover"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=85"
              alt="Entrepôt de consolidation"
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        <div>
          <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
            À propos
          </p>
          <h2 className="mt-3 text-[24px] font-bold tracking-tight text-navy-900 sm:text-[32px]">
            Une équipe basée en Chine, au service des importateurs africains
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
            ODA SOURCES accompagne les commerçants, distributeurs et
            industriels africains qui importent de Chine. Nous sommes sur le
            terrain à Guangzhou, Foshan et Yiwu, en contact direct avec les
            usines.
          </p>

          <ul className="mt-6 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-express-600"
                  strokeWidth={2}
                />
                <span className="text-[13px] leading-relaxed text-navy-900">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-zinc-100 py-5">
            <Stat value="+500" label="usines inspectées" />
            <Stat value="+1 200" label="clients accompagnés" />
            <Stat value="12" label="pays desservis" />
          </div>

          <Link
            href="/a-propos"
            className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-navy-900 transition hover:text-express-600"
          >
            En savoir plus sur nous
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-[20px] font-bold tracking-tight text-navy-900">
        {value}
      </p>
      <p className="mt-0.5 text-[11px] leading-snug text-zinc-500">{label}</p>
    </div>
  );
}