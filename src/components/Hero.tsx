import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 py-20 sm:py-28"
    >
      {/* Fond dégradé subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50/80 via-white to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-br from-emerald-100/40 via-zinc-100/40 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-3xl text-center">
        <div className="fade-up inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-zinc-600 shadow-sm">
          <span className="relative flex h-1.5 w-1.5">
            <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-600" />
          </span>
          Équipe basée à Guangzhou, Chine
        </div>

        <h1 className="fade-up fade-up-delay-1 mt-7 text-[30px] font-semibold leading-[1.15] tracking-tight text-zinc-900 sm:text-[46px]">
          Vos achats en Chine,
          <br />
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
            livrés en Afrique.
          </span>
        </h1>

        <p className="fade-up fade-up-delay-2 mx-auto mt-6 max-w-lg text-[14.5px] leading-relaxed text-zinc-500">
          Sourcing, inspection et fret — sans intermédiaire. Décrivez votre
          besoin, obtenez une estimation, et laissez-nous gérer le reste.
        </p>

        <div className="fade-up fade-up-delay-3 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#devis"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 px-6 py-3.5 text-[13.5px] font-medium text-white shadow-sm transition hover:shadow-md sm:w-auto"
          >
            Calculer mon devis
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </a>
          <a
            href="#suivi"
            className="w-full rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-[13.5px] font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50 sm:w-auto"
          >
            Suivre un colis
          </a>
        </div>

        <p className="fade-up fade-up-delay-3 mt-6 flex items-center justify-center gap-1.5 text-[11.5px] text-zinc-400">
          <MapPin className="h-3 w-3" strokeWidth={1.75} />
          Guangzhou · Foshan · Yiwu → 12 pays d&apos;Afrique
        </p>

        <div className="fade-up fade-up-delay-3 mt-16 grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100">
          <Stat value="+500" label="inspections d'usines réalisées" />
          <Stat value="12" label="pays d'Afrique desservis" />
          <Stat value="99.4%" label="livraisons dans les délais" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-6">
      <p className="text-[24px] font-semibold tracking-tight text-zinc-900">
        {value}
      </p>
      <p className="mt-1.5 text-[11.5px] leading-snug text-zinc-500">
        {label}
      </p>
    </div>
  );
}