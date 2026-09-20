export default function Hero() {
  return (
    <section id="top" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-[30px] font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[44px]">
          Vos achats en Chine, livrés en Afrique.
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-[14.5px] leading-relaxed text-zinc-500">
          Sourcing, inspection et fret. Un seul interlocuteur, basé physiquement
          à Guangzhou. Estimez votre coût en 60 secondes, sans intermédiaire.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#devis"
            className="w-full rounded-full bg-zinc-900 px-6 py-3.5 text-[13.5px] font-medium text-white transition hover:bg-zinc-800 sm:w-auto"
          >
            Calculer mon devis
          </a>
          <a
            href="#suivi"
            className="w-full rounded-full border border-zinc-200 px-6 py-3.5 text-[13.5px] font-medium text-zinc-700 transition hover:border-zinc-300 sm:w-auto"
          >
            Suivre un colis
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 divide-x divide-zinc-100 border-y border-zinc-100">
          <Stat value="+500" label="inspections d'usines" />
          <Stat value="12" label="pays desservis" />
          <Stat value="99.4%" label="livraisons à l'heure" />
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
      <p className="mt-1.5 text-[11.5px] leading-snug text-zinc-500">{label}</p>
    </div>
  );
}