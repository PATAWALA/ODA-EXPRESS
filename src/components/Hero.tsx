import { Anchor, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=2000&q=85')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#0a1931",
      }}
    >
      {/* Voile bleu nuit par-dessus l'image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/70"
      />

      {/* Halo rouge décoratif */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-100px] top-[-100px] h-[420px] w-[420px] rounded-full bg-express-600/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[11.5px] font-semibold text-white/90 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="pulse-soft absolute inline-flex h-full w-full rounded-full bg-express-500" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-express-500" />
            </span>
            Sourcing · Inspection · Fret maritime
          </div>

          <h1 className="fade-up fade-up-d1 mt-7 text-[32px] font-bold leading-[1.1] tracking-tight text-white sm:text-[54px]">
            Nous achetons et vérifions
            <br />
            <span className="bg-gradient-to-r from-white via-white to-express-400 bg-clip-text text-transparent">
              pour vous, en Chine.
            </span>
          </h1>

          <p className="fade-up fade-up-d2 mt-6 max-w-xl text-[14.5px] leading-relaxed text-navy-100">
            Vous avez un produit en tête ? Envoyez-nous le lien ou la photo.
            Nous trouvons le fournisseur, négocions le prix et livrons en
            Afrique par voie maritime.
          </p>

          <div className="fade-up fade-up-d3 mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#catalogue"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-[13.5px] font-bold text-navy-900 shadow-sm transition hover:shadow-lg"
            >
              Voir le catalogue
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
            <Link
              href="/#sur-mesure"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-[13.5px] font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              <Anchor className="h-3.5 w-3.5" strokeWidth={2} />
              Envoyer mon lien produit
            </Link>
          </div>

          <dl className="fade-up fade-up-d3 mt-16 grid grid-cols-3 divide-x divide-white/10 border-y border-white/10">
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
      <dt className="text-[22px] font-bold tracking-tight text-white sm:text-[26px]">
        {value}
      </dt>
      <dd className="mt-1 text-[11.5px] leading-snug text-navy-200">{label}</dd>
    </div>
  );
}