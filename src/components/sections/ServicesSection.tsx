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
    <section className="border-b border-zinc-200/60 bg-zinc-50/40 py-20 sm:py-24 lg:py-28">
      <Container size="xl">
        <SectionTitle
          badge="Nos expertises"
          title="Cinq pôles intégrés pour sécuriser chaque étape"
          subtitle="De la recherche du fournisseur jusqu'au paiement international, nous couvrons l'ensemble de vos opérations en Chine."
        />

        {/* Cartes services */}
        <div className="mx-auto mt-16 max-w-6xl space-y-4">
          {SERVICES.map((service, index) => {
            const isOpen = openSlug === service.slug;

            return (
              <div
                key={service.slug}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-md"
              >
                {/* En-tête cliquable */}
                <button
                  type="button"
                  onClick={() => toggle(service.slug)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-6 px-6 py-7 text-left transition hover:bg-zinc-50/60 sm:px-8"
                >
                  {/* Numéro */}
                  <span
                    className={cn(
                      "hidden shrink-0 text-[13px] font-bold uppercase tracking-[0.2em] transition sm:block",
                      isOpen ? "text-express-600" : "text-zinc-400",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Icône */}
                  <span
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition",
                      isOpen
                        ? "border-express-600 bg-express-600 text-white"
                        : "border-zinc-200 bg-white text-navy-900 group-hover:border-navy-300",
                    )}
                  >
                    <service.icon className="h-5.5 w-5.5" strokeWidth={1.6} />
                  </span>

                  {/* Titre + court */}
                  <div className="min-w-0 flex-1">
                    <p className="text-[18px] font-bold tracking-tight text-navy-900 sm:text-[20px]">
                      {service.title}
                    </p>
                    <p className="mt-1.5 truncate text-[14.5px] text-zinc-500">
                      {service.short}
                    </p>
                  </div>

                  {/* Plus / croix */}
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition",
                      isOpen
                        ? "border-express-600 bg-express-600 text-white"
                        : "border-zinc-200 bg-white text-navy-900 group-hover:border-navy-300",
                    )}
                  >
                    <Plus
                      className={cn(
                        "h-4.5 w-4.5 transition-transform duration-300",
                        isOpen && "rotate-45",
                      )}
                      strokeWidth={2}
                    />
                  </span>
                </button>

                {/* Contenu dépliable */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-out",
                    isOpen
                      ? "max-h-[1200px] opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="grid gap-8 px-6 pb-10 sm:pl-[110px] sm:pr-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                    {/* Colonne texte */}
                    <div>
                      <p className="text-[15.5px] leading-[1.8] text-zinc-600">
                        {service.intro}
                      </p>

                      <ul className="mt-6 space-y-3">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex gap-3">
                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-2xl border border-express-600/30 bg-express-600/5">
                              <Check
                                className="h-3 w-3 text-express-600"
                                strokeWidth={3}
                              />
                            </span>
                            <span className="text-[15px] leading-relaxed text-navy-900">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <Link
                        href={`/services#${service.slug}`}
                        className="group mt-7 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-express-600 transition hover:gap-3"
                      >
                        En savoir plus
                        <ArrowRight
                          className="h-3.5 w-3.5"
                          strokeWidth={2.5}
                        />
                      </Link>
                    </div>

                    {/* Colonne image */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA bas de section */}
        <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[15.5px] text-zinc-600">
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