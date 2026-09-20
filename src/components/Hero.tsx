import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  MapPin,
  Package,
  Plane,
  Ship,
  Truck,
} from "lucide-react";
import { PRICING_HIGHLIGHTS } from "@/data/odaData";

const STATS = [
  { value: "+500", label: "inspections d'usines réalisées en Chine" },
  { value: "12", label: "pays d'Afrique desservis chaque mois" },
  { value: "99.4%", label: "de livraisons arrivées dans les délais" },
];

const ROUTE = [
  {
    title: "Guangzhou, Chine",
    subtitle: "Réception, contrôle et emballage renforcé",
    icon: Package,
    state: "done" as const,
  },
  {
    title: "Transit international",
    subtitle: "Aérien express ou maritime groupé",
    icon: Plane,
    state: "active" as const,
  },
  {
    title: "Kinshasa, RDC",
    subtitle: "Dédouanement et livraison à votre entrepôt",
    icon: MapPin,
    state: "next" as const,
  },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-slate-200 bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:64px_64px] opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Colonne gauche */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wider text-slate-600 shadow-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="oda-pulse absolute inline-flex h-full w-full rounded-full bg-brand-500" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-600" />
              </span>
              Expert Sourcing Chine & Shipping Afrique
            </span>

            <h1 className="mt-6 text-[32px] font-bold leading-[1.12] tracking-tight text-slate-900 sm:text-[42px] lg:text-[48px]">
              Sécurisez vos achats en Chine et vos expéditions vers l&apos;Afrique,
              sans intermédiaires.
            </h1>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-slate-600 sm:text-base">
              Finies les pertes de temps dans les commentaires TikTok. Calculez vos
              coûts, vérifiez vos fournisseurs et lancez votre expédition en 2 clics.
              Un seul interlocuteur, basé physiquement à Guangzhou.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#devis"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
              >
                <Calculator className="h-4 w-4" />
                Calculer mon devis gratuit
              </a>
              <a
                href="#suivi"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <Truck className="h-4 w-4" />
                Suivre mon colis
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Devis en dollars, euros ou FCFA
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-600" />
                Aucune inscription requise
              </span>
            </div>
          </div>

          {/* Colonne droite : carte logistique */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-slate-100 via-white to-brand-50"
            />
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                    <Package className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[13px] font-bold text-slate-900">
                      Dossier ODA-8839-2026
                    </p>
                    <p className="text-[11.5px] font-medium text-slate-500">
                      Guangzhou → Kinshasa
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-brand-700">
                  En transit
                </span>
              </div>

              <ol className="mt-6 space-y-5">
                {ROUTE.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4">
                    {index < ROUTE.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[19px] top-10 h-[calc(100%-4px)] w-px bg-slate-200"
                      />
                    )}
                    <span
                      className={
                        step.state === "done"
                          ? "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-200 bg-brand-50 text-brand-700"
                          : step.state === "active"
                            ? "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white"
                            : "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400"
                      }
                    >
                      <step.icon className="h-5 w-5" />
                    </span>
                    <div className="pt-1">
                      <p className="text-[13.5px] font-semibold text-slate-900">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-500">
                        {step.subtitle}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                {PRICING_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5"
                  >
                    <item.icon className="h-4 w-4 text-brand-600" />
                    <p className="mt-2.5 text-[11.5px] font-semibold text-slate-500">
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-[15px] font-bold text-slate-900">
                      {item.price}
                    </p>
                    <p className="mt-1 text-[11px] font-medium text-slate-500">
                      {item.delay}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6">
              <dt className="text-[28px] font-bold tracking-tight text-slate-900">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[13px] font-medium leading-relaxed text-slate-500">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* Bandeau corridor */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12.5px] font-semibold text-slate-500">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-brand-600" />
            Guangzhou · Foshan · Yiwu
          </span>
          <span className="hidden h-3 w-px bg-slate-200 sm:block" />
          <span className="flex items-center gap-2">
            <Plane className="h-4 w-4 text-brand-600" />
            Fret aérien express 5 à 7 jours
          </span>
          <span className="hidden h-3 w-px bg-slate-200 sm:block" />
          <span className="flex items-center gap-2">
            <Ship className="h-4 w-4 text-brand-600" />
            Maritime dès $180 / CBM
          </span>
        </div>
      </div>
    </section>
  );
}