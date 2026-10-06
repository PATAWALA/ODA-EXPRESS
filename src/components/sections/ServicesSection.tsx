"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonLink } from "@/components/ui/Button";
import { SERVICES } from "@/content/services";
import { cn } from "@/lib/utils";

export default function ServicesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(SERVICES[0].slug);

  function toggle(slug: string) {
    setOpenSlug((current) => (current === slug ? null : slug));
  }

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
      {/* Dégradé de section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-navy-50/40 to-white"
      />

      {/* Halo bleu en haut à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gradient-to-br from-navy-100/60 via-express-50/40 to-transparent blur-3xl"
      />

      {/* Halo rouge en bas à gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-express-100/50 via-navy-100/30 to-transparent blur-3xl"
      />

      <Container className="relative">
        <SectionTitle
          badge="Nos expertises"
          title="Cinq pôles intégrés pour sécuriser chaque étape"
          subtitle="De la recherche du fournisseur jusqu'au paiement international, nous couvrons l'ensemble de vos opérations en Chine."
        />

        {/* Cartes services */}
        <div className="mx-auto mt-16 max-w-5xl space-y-3">
          {SERVICES.map((service, index) => {
            const isOpen = openSlug === service.slug;

            return (
              <div
                key={service.slug}
                className={cn(
                  "group/card relative overflow-hidden rounded-2xl border transition-all duration-300",
                  isOpen
                    ? "border-navy-200 bg-gradient-to-br from-white via-navy-50/40 to-navy-100/50 shadow-[0_12px_40px_-16px_rgba(1,18,52,0.20)]"
                    : "border-zinc-200 bg-gradient-to-br from-white to-navy-50/30 hover:border-navy-200 hover:shadow-[0_4px_24px_-12px_rgba(1,18,52,0.10)]",
                )}
              >
                {/* Halo interne décoratif */}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity duration-300",
                    isOpen
                      ? "from-express-200/60 opacity-100"
                      : "from-navy-200/40 opacity-60 group-hover/card:opacity-100",
                  )}
                />

                {/* En-tête cliquable */}
                <button
                  type="button"
                  onClick={() => toggle(service.slug)}
                  aria-expanded={isOpen}
                  className="relative flex w-full items-center gap-6 px-6 py-6 text-left transition"
                >
                  {/* Numéro */}
                  <span
                    className={cn(
                      "hidden shrink-0 text-[12px] font-bold uppercase tracking-[0.2em] transition sm:block",
                      isOpen ? "text-express-600" : "text-zinc-400",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icône avec dégradé */}
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-md transition-all duration-300",
                      isOpen
                        ? "bg-gradient-to-br from-express-600 to-express-700 shadow-[0_8px_20px_-8px_rgba(191,8,8,0.5)]"
                        : "bg-gradient-to-br from-navy-700 to-navy-900 group-hover/card:from-express-600 group-hover/card:to-express-700",
                    )}
                  >
                    <service.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>

                  {/* Titre + court */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[16px] font-bold tracking-tight text-navy-900 sm:text-[18px]">
                      {service.title}
                    </p>
                    <p className="mt-1 truncate text-[13px] text-zinc-500">
                      {service.short}
                    </p>
                  </div>

                  {/* Plus / croix */}
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl transition-all duration-300",
                      isOpen
                        ? "bg-gradient-to-br from-express-600 to-express-700 text-white shadow-md"
                        : "border border-zinc-200 bg-white text-navy-900 group-hover/card:border-navy-300 group-hover/card:bg-navy-50",
                    )}
                  >
                    <Plus
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      strokeWidth={2}
                    />
                  </span>
                </button>

                {/* Contenu dépliable */}
                <div
                  className={cn(
                    "relative overflow-hidden transition-all duration-500 ease-out",
                    isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <div className="grid gap-8 px-6 pb-10 sm:pl-[100px] lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                    {/* Colonne texte */}
                    <div>
                      <p className="text-[14px] leading-[1.75] text-zinc-600">
                        {service.intro}
                      </p>

                      <ul className="mt-6 space-y-2.5">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-express-500/15 to-express-600/10">
                              <Check
                                className="h-2.5 w-2.5 text-express-600"
                                strokeWidth={3}
                              />
                            </span>
                            <span className="text-[13.5px] leading-relaxed text-navy-900">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/services#${service.slug}`}
                        className="group/link mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600 transition hover:gap-3"
                      >
                        En savoir plus
                        <ArrowRight
                          className="h-3.5 w-3.5 transition group-hover/link:translate-x-0.5"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>

                    {/* Colonne image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[0_8px_32px_-12px_rgba(1,18,52,0.25)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      {/* Voile bleu subtil sur l'image */}
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA bas de section */}
        <div className="mx-auto mt-14 flex max-w-5xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[14px] text-zinc-600">
            Un besoin spécifique qui sort de ces 5 pôles ?
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
      </Container>
    </section>
  );
}