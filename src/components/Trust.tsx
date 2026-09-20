import { Building2, ShieldCheck, Ship, UserCheck } from "lucide-react";

const REASONS = [
  {
    icon: Building2,
    title: "Présence physique en Chine",
    line: "Notre équipe est basée à Guangzhou et visite vos fournisseurs sur place, pas derrière un écran.",
  },
  {
    icon: ShieldCheck,
    title: "Inspection vidéo en direct",
    line: "Vous assistez au contrôle avant le paiement final. Aucun écart, aucune surprise à l'arrivée.",
  },
  {
    icon: Ship,
    title: "Zéro blocage douanier",
    line: "Documents conformes et partenaires agréés dans chacun des 12 pays d'Afrique desservis.",
  },
  {
    icon: UserCheck,
    title: "Un seul interlocuteur",
    line: "De la recherche du fournisseur à la livraison finale, Mr ODA suit personnellement votre dossier.",
  },
];

export default function Trust() {
  return (
    <section
      id="confiance"
      className="relative overflow-hidden border-t border-zinc-100 px-5 py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-zinc-50/60 via-white to-white"
      />

      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
            Pourquoi nous
          </p>
          <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
            La méthode qui supprime les risques
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            La majorité des pertes dans le commerce Chine — Afrique viennent de
            fournisseurs non vérifiés et de colis expédiés sans contrôle. Nous
            avons construit notre méthode autour de ces deux points.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="group rounded-2xl border border-zinc-100 bg-white p-6 transition hover:border-zinc-200 hover:shadow-[0_4px_24px_-8px_rgba(0,0,0,0.06)]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-50 text-zinc-700 transition group-hover:from-zinc-900 group-hover:to-zinc-700 group-hover:text-white">
                <reason.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-[14.5px] font-semibold tracking-tight text-zinc-900">
                {reason.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-500">
                {reason.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}