import { Check, Search, ShieldCheck, Ship } from "lucide-react";

const SERVICES = [
  {
    icon: Search,
    title: "Sourcing & Achat",
    line: "Nous trouvons et négocions votre fournisseur en Chine, au prix départ usine.",
    points: ["Produits certifiés 1688 / Alibaba", "Photos et prix fermes avant paiement"],
  },
  {
    icon: ShieldCheck,
    title: "Inspection Usine",
    line: "Nous vérifions votre marchandise avant que vous ne payiez le solde.",
    points: ["Visite physique à Guangzhou / Yiwu", "Rapport photo & vidéo sous 24 h"],
  },
  {
    icon: Ship,
    title: "Fret & Shipping",
    line: "Nous expédions vers 12 pays d'Afrique, dédouanement et livraison inclus.",
    points: ["Aérien express : 5 à 7 jours", "Maritime : dès $180 / CBM"],
  },
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Nos services
          </p>
          <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
            Trois services, un seul contact
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            Chaque étape est réalisée par notre propre équipe en Chine. Vous ne
            dépendez d&apos;aucun intermédiaire.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="group relative rounded-2xl border border-zinc-100 bg-white p-6 transition hover:border-zinc-200 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.08)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 text-zinc-700 transition group-hover:from-zinc-900 group-hover:to-zinc-700 group-hover:text-white">
                <service.icon className="h-5 w-5" strokeWidth={1.5} />
              </span>

              <h3 className="mt-5 text-[15px] font-semibold tracking-tight text-zinc-900">
                {service.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500">
                {service.line}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-zinc-100 pt-5">
                {service.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600"
                      strokeWidth={2.5}
                    />
                    <span className="text-[12.5px] leading-relaxed text-zinc-600">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}