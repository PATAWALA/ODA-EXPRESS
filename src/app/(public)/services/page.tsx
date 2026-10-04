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
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Nos services
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Cinq pôles intégrés
                <br />
                pour sécuriser
                <br />
                <span className="text-express-600">
                  chaque étape de votre import.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Du sourcing fournisseur jusqu'au paiement international, nous
                couvrons l'ensemble de vos opérations en Chine. Un seul
                interlocuteur, une seule chaîne, aucune zone d'ombre.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=85"
                alt="Terminal à conteneurs"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Navigation rapide par ancres */}
          <div className="border-t border-zinc-200 py-8">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
              Accès direct
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {SERVICES.map((service, index) => (
                <a
                  key={service.slug}
                  href={`#${service.slug}`}
                  className="group inline-flex items-center gap-2 text-[13px] font-semibold text-zinc-600 transition hover:text-express-600"
                >
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {service.title}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Les 5 services */}
      {SERVICES.map((service, index) => {
        const isEven = index % 2 === 0;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className={
              "scroll-mt-24 border-b border-zinc-200 py-20 sm:py-24 " +
              (isEven ? "bg-white" : "bg-zinc-50/50")
            }
          >
            <Container>
              <div className="mx-auto max-w-6xl">
                {/* En-tête service */}
                <div className="flex items-start gap-6">
                  <span className="hidden shrink-0 text-[12px] font-bold uppercase tracking-[0.22em] text-express-600 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-express-600 bg-express-600 text-white">
                        <service.icon className="h-5 w-5" strokeWidth={1.6} />
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
                    <ul className="mt-8 space-y-3 border-t border-zinc-200 pt-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex gap-3">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center border border-express-600/30 bg-express-600/5">
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
                    className={
                      "relative " + (isEven ? "" : "lg:order-1")
                    }
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)] lg:sticky lg:top-24">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Méthode : 4 étapes */}
                <div className="mt-16 border-t border-zinc-200 pt-12">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                    Notre méthode
                  </p>

                  <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {service.steps.map((step, stepIndex) => (
                      <div key={step.title}>
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-600">
                          Étape {String(stepIndex + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-3 text-[15px] font-bold tracking-tight text-navy-900">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bénéfices */}
                <div className="mt-16 border-t border-zinc-200 pt-12">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                    Ce que vous obtenez
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-3">
                    {service.benefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="border-l-2 border-express-600 pl-5"
                      >
                        <h3 className="text-[14.5px] font-bold tracking-tight text-navy-900">
                          {benefit.title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                          {benefit.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-16 flex flex-col items-start gap-4 border-t border-zinc-200 pt-12 sm:flex-row sm:items-center sm:justify-between">
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

      {/* CTA final */}
      <section className="bg-navy-950 py-20 sm:py-24">
        <Container>
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
                className="group"
              >
                Se faire accompagner
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </ButtonLink>

              <Link
                href="/produits"
                className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-white/80 transition hover:text-white"
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