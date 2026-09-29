import { Anchor, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-navy-50/80 via-white to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] top-[-120px] -z-10 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/40 to-transparent blur-3xl"
      />

      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-[11.5px] font-semibold text-zinc-600 shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-express-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-express-600" />
            </span>
            Fret maritime · Groupage & conteneur
          </div>

          <h1 className="fade-up fade-up-d1 mt-7 text-[32px] font-bold leading-[1.1] tracking-tight text-navy-900 sm:text-[52px]">
            Importez de Chine.
            <br />
            <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
              Livrez en Afrique.
            </span>
          </h1>

          <p className="fade-up fade-up-d2 mt-6 max-w-xl text-[14.5px] leading-relaxed text-zinc-600">
            Sourcing sécurisé, inspection usine et fret maritime groupé. Un seul
            interlocuteur à Guangzhou pour vos conteneurs et vos volumes CBM.
          </p>

          <div className="fade-up fade-up-d3 mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#catalogue"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 px-6 py-3.5 text-[13.5px] font-semibold text-white shadow-sm transition hover:shadow-md"
            >
              Voir le catalogue
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </a>
            <a
              href="#maritime"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-[13.5px] font-semibold text-navy-900 transition hover:border-zinc-300"
            >
              <Anchor className="h-3.5 w-3.5" strokeWidth={2} />
              Calculer mon CBM
            </a>
          </div>

          <dl className="fade-up fade-up-d3 mt-14 grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100">
            <Stat value="+500" label="usines inspectées" />
            <Stat value="12" label="ports desservis" />
            <Stat value="100%" label="fret maritime" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-5 sm:py-6">
      <dt className="text-[22px] font-bold tracking-tight text-navy-900 sm:text-[26px]">
        {value}
      </dt>
      <dd className="mt-1 text-[11.5px] leading-snug text-zinc-500">{label}</dd>
    </div>
  );
}