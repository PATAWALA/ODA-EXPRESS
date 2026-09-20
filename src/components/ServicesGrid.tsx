import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES } from "@/data/odaData";

export default function ServicesGrid() {
  return (
    <section id="services" className="border-b border-slate-200 bg-slate-50/70 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
            Nos trois piliers
          </span>
          <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[36px]">
            De la recherche du fournisseur jusqu&apos;à la livraison à votre porte
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
            Chaque étape est réalisée par notre propre équipe en Chine. Vous ne
            dépendez d&apos;aucun intermédiaire et vous gardez la maîtrise de vos coûts.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <service.icon className="h-6 w-6" />
              </span>

              <h3 className="mt-6 text-[19px] font-bold tracking-tight text-slate-900">
                {service.title}
              </h3>
              <p className="mt-1.5 text-[12.5px] font-semibold uppercase tracking-wide text-brand-700">
                {service.tagline}
              </p>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
                {service.description}
              </p>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    <span className="text-[13.5px] leading-relaxed text-slate-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#devis"
                className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-slate-900 transition group-hover:text-brand-700"
              >
                Démarrer cette demande
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}