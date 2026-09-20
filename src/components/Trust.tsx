const REASONS = [
  {
    title: "Présence physique en Chine",
    line: "Notre équipe est basée à Guangzhou et visite vos fournisseurs sur place.",
  },
  {
    title: "Inspection vidéo en direct",
    line: "Vous assistez au contrôle avant paiement. Aucun écart à l'arrivée.",
  },
  {
    title: "Zéro blocage douanier",
    line: "Documents conformes et partenaires agréés dans 12 pays d'Afrique.",
  },
  {
    title: "Un seul interlocuteur",
    line: "De la recherche du fournisseur à la livraison, Mr ODA suit votre dossier.",
  },
];

export default function Trust() {
  return (
    <section id="confiance" className="border-t border-zinc-100 px-5 py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
            Pourquoi travailler avec Mr ODA
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            La méthode qui supprime les deux risques du commerce Chine — Afrique :
            fournisseur non vérifié et colis expédié sans contrôle.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-zinc-100 p-6"
            >
              <h3 className="text-[14.5px] font-semibold tracking-tight text-zinc-900">
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