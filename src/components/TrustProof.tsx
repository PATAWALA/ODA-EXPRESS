import { Building2, CheckCircle2, MapPin, PhoneCall } from "lucide-react";
import { TRUST_REASONS, WAREHOUSE_ADDRESS } from "@/data/odaData";

const GUARANTEES = [
  "Vérification physique du fournisseur avant tout paiement",
  "Photos et vidéos réelles de votre marchandise",
  "Documents d'exportation conformes et dédouanement pris en charge",
  "Un interlocuteur unique joignable sur WhatsApp",
];

export default function TrustProof() {
  return (
    <section id="confiance" className="border-b border-slate-200 bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Colonne gauche */}
          <div>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
              Pourquoi Mr ODA
            </span>
            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[36px]">
              Importateurs africains, arrêtez de prendre des risques à l&apos;aveugle
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              La majorité des pertes dans le commerce Chine — Afrique viennent de
              fournisseurs non vérifiés et de colis expédiés sans contrôle. Notre
              méthode supprime ces deux risques.
            </p>

            <ul className="mt-8 space-y-3.5">
              {GUARANTEES.map((item) => (
                <li key={item} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-600" />
                  <span className="text-[13.5px] leading-relaxed text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-9 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-start gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-slate-900" />
                <div>
                  <p className="text-[13.5px] font-bold text-slate-900">
                    Notre base opérationnelle
                  </p>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
                    {WAREHOUSE_ADDRESS}
                  </p>
                  <p className="mt-3 flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-700">
                    <MapPin className="h-3.5 w-3.5" />
                    Guangzhou · Foshan · Yiwu
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#devis"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-[13.5px] font-semibold text-white transition hover:bg-slate-800"
            >
              <PhoneCall className="h-4 w-4" />
              Parler à Mr ODA maintenant
            </a>
          </div>

          {/* Colonne droite */}
          <div className="grid gap-5 sm:grid-cols-2">
            {TRUST_REASONS.map((reason) => (
              <article
                key={reason.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow-md"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-900">
                  <reason.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-[15px] font-bold tracking-tight text-slate-900">
                  {reason.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
                  {reason.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}