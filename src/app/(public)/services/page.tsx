import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SERVICES } from "@/content/services";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Les 5 pôles d'expertise ODA SOURCES : Sourcing & Achat, Vérification & Contrôle Qualité, Shipping & Logistique, Visa & Hôtel, Paiement Fournisseur.",
};

export default function ServicesPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-100/70 via-navy-50/30 to-white"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
        />

        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
        />

        <Container className="relative">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="inline-flex items-center rounded-2xl border border-navy-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600 shadow-sm backdrop-blur">
                Nos services
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Cinq pôles intégrés
                <br />
                pour sécuriser
                <br />
                <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                  chaque étape de votre import.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Du sourcing fournisseur jusqu&apos;au paiement international,
                nous couvrons l&apos;ensemble de vos opérations en Chine. Un
                seul interlocuteur, une seule chaîne, aucune zone d&apos;ombre.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=85"
                alt="Terminal à conteneurs"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* Navigation rapide par ancres */}
          <div className="border-t border-navy-100/60 py-8">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              Accès direct
            </p>
            <div className="flex flex-wrap gap-3">
              {SERVICES.map((service, index) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-zinc-600 shadow-sm transition-all duration-300 hover:border-navy-300 hover:bg-navy-50/60 hover:text-navy-900 hover:shadow-md"
                >
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-express-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service.title}
                  <ArrowRight
                    className="h-3 w-3 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-express-600"
                    strokeWidth={2.5}
                  />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ============ LES 5 SERVICES ============ */}
      {SERVICES.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="relative scroll-mt-24 overflow-hidden border-b border-zinc-200 py-20 sm:py-24"
          >
            {/* Dégradé de fond alternant */}
            <div
              aria-hidden
              className={
                "pointer-events-none absolute inset-0 bg-gradient-to-b " +
                (isEven
                  ? "from-white via-navy-50/30 to-white"
                  : "from-white via-express-50/25 to-white")
              }
            />

            {/* Halo diffus */}
            <div
              aria-hidden
              className={
                "pointer-events-none absolute h-96 w-96 rounded-full blur-3xl " +
                (isEven
                  ? "-right-32 top-1/3 bg-gradient-to-br from-navy-100/50 via-express-50/30 to-transparent"
                  : "-left-32 top-1/3 bg-gradient-to-br from-express-100/50 via-navy-50/30 to-transparent")
              }
            />

            <Container className="relative">
              <div className="mx-auto max-w-6xl">
                {/* En-tête service */}
                <div className="flex items-start gap-6">
                  <span className="hidden shrink-0 text-[12px] font-bold uppercase tracking-[0.22em] text-express-600 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span
                        className={
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md " +
                          (isEven
                            ? "bg-gradient-to-br from-navy-700 to-navy-900"
                            : "bg-gradient-to-br from-express-600 to-express-700")
                        }
                      >
                        <service.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h2 className="text-[24px] font-bold tracking-tight text-navy-900 sm:text-[30px]">
                        {service.title}
                      </h2>
                    </div>

                    <p className="mt-5 max-w-3xl text-[16px] font-medium leading-relaxed text-navy-900">
                      {service.intro}
                    </p>
                  </div>
                </div>

                {/* Corps : description + image */}
                <div
                  className={
                    "mt-12 grid gap-10 lg:items-start lg:gap-16 " +
                    (isEven
                      ? "lg:grid-cols-[1.15fr_1fr]"
                      : "lg:grid-cols-[1fr_1.15fr]")
                  }
                >
                  {/* Texte */}
                  <div className={isEven ? "" : "lg:order-2"}>
                    <div className="space-y-5">
                      {service.paragraphs.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-[14.5px] leading-[1.75] text-zinc-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Features */}
                    <ul className="mt-8 space-y-3 border-t border-zinc-200/70 pt-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-express-500/15 to-express-600/10">
                            <Check
                              className="h-2.5 w-2.5 text-express-600"
                              strokeWidth={3}
                            />
                          </span>
                          <span className="text-[14px] leading-relaxed text-navy-900">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image */}
                  <div
                    className={"relative " + (isEven ? "" : "lg:order-1")}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.35)] lg:sticky lg:top-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Méthode : 4 étapes */}
                <div className="mt-16 border-t border-zinc-200/70 pt-12">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                    Notre méthode
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {service.steps.map((step, stepIndex) => (
                      <div
                        key={step.title}
                        className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white via-white to-navy-50/50 p-6 transition-all duration-300 hover:border-navy-200 hover:to-express-50/50 hover:shadow-[0_8px_28px_-12px_rgba(1,18,52,0.15)]"
                      >
                        {/* Halo interne */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-navy-200/40 to-transparent blur-xl transition-opacity duration-300 group-hover:from-express-200/50"
                        />

                        <div className="relative flex items-center gap-2.5">
                          <span
                            className={
                              "flex h-8 w-8 items-center justify-center rounded-2xl text-[11px] font-bold text-white shadow-sm " +
                              (isEven
                                ? "bg-gradient-to-br from-navy-700 to-navy-900"
                                : "bg-gradient-to-br from-express-600 to-express-700")
                            }
                          >
                            {String(stepIndex + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                            Étape
                          </span>
                        </div>

                        <h3 className="relative mt-5 text-[15px] font-bold tracking-tight text-navy-900">
                          {step.title}
                        </h3>
                        <p className="relative mt-2 text-[13px] leading-relaxed text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bénéfices */}
                <div className="mt-16 border-t border-zinc-200/70 pt-12">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                    Ce que vous obtenez
                  </p>

                  <div className="mt-8 grid gap-5 sm:grid-cols-3">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 transition-all duration-300 hover:border-express-200 hover:shadow-[0_8px_28px_-12px_rgba(191,8,8,0.15)]"
                      >
                        <div
                          aria-hidden
                          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-express-500 to-express-700"
                        />
                        <div className="pl-4">
                          <h3 className="text-[14.5px] font-bold tracking-tight text-navy-900">
                            {benefit.title}
                          </h3>
                          <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-16 flex flex-col items-start gap-4 border-t border-zinc-200/70 pt-12 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[14px] text-zinc-600">
                    Un projet lié à ce service ?
                  </p>

                  <ButtonLink
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="group"
                  >
                    Se faire accompagner
                    <ArrowRight
                      className="h-4 w-4 transition group-hover:translate-x-0.5"
                      strokeWidth={2.5}
                    />
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      {/* ============ CTA FINAL ============ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 py-20 sm:py-24">
        {/* Halo bleu */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-express-600/30 via-navy-500/20 to-transparent blur-3xl"
        />
        {/* Halo rouge */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-express-600/25 via-navy-500/15 to-transparent blur-3xl"
        />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
              Prochaine étape
            </p>

            <h2 className="mt-6 text-[28px] font-bold leading-[1.15] tracking-tight text-white sm:text-[38px]">
              Un seul partenaire pour toute
              <br />
              votre chaîne d&apos;import.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-navy-200">
              Décrivez-nous votre produit, votre volume ou votre projet. Nous
              vous répondons sous 24 heures ouvrées avec une solution claire.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ButtonLink
                href="/contact"
                variant="white"
                size="lg"
                className="group shadow-lg"
              >
                Se faire accompagner
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </ButtonLink>

              <Link
                href="/produits"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                Voir le catalogue
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}