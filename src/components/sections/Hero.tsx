"use client";

import { useEffect, useState } from "react";
import { Fraunces } from "next/font/google";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const IMAGES = [
  "/team/fondateur-voiture-noire.jpeg",
  "/team/equipe-showroom.jpeg",
  "/team/fondateur-voiture-blanche.jpeg",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`relative overflow-hidden bg-navy-50 ${fraunces.variable}`}>
      {/* Halos décoratifs (inchangés) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
      />

      {/* ============ MOBILE : structure originale (inchangée) ============ */}
      <div className="relative mx-auto w-full max-w-[1440px] px-8 pb-16 sm:px-12 sm:pb-20 lg:hidden">
        <div className="grid gap-10 py-10 sm:py-12">
          {/* Colonne texte mobile */}
          <div className="order-1 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              ODA SOURCES
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-[11.5px]">
              Sourcing · Vérification · Contrôle qualité · Shipping
            </p>

            <h1
              className="mt-5 text-[32px] leading-[1.12] tracking-[-0.02em] text-navy-900 sm:text-[40px]"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
              }}
            >
              Votre partenaire en Chine,
              <br />
              <span className="text-express-600">
                du sourcing à l&apos;expédition.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-zinc-600 sm:text-[16px]">
              Nous accompagnons{" "}
              <span className="font-semibold text-navy-900">entreprises</span>,{" "}
              <span className="font-semibold text-navy-900">commerçants</span>{" "}
              et{" "}
              <span className="font-semibold text-navy-900">investisseurs</span>{" "}
              dans leurs achats en Chine :{" "}
              <span className="font-semibold text-navy-900">
                recherche et vérification de fournisseurs
              </span>
              ,{" "}
              <span className="font-semibold text-navy-900">négociation</span>,{" "}
              <span className="font-semibold text-navy-900">
                contrôle qualité
              </span>{" "}
              et{" "}
              <span className="font-semibold text-navy-900">
                organisation de l&apos;expédition internationale
              </span>{" "}
              jusqu&apos;à votre destination.
            </p>

            <div className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="lg"
                  className="group"
                >
                  Se faire accompagner
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </ButtonLink>

                <ButtonLink
                  href="/services"
                  variant="outline"
                  size="lg"
                  className="group"
                >
                  Nos services
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Colonne image mobile (inchangée) */}
          <div className="relative order-2">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl shadow-[0_30px_70px_-25px_rgba(1,18,52,0.3)]">
              {IMAGES.map((src, index) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt=""
                  className={
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 " +
                    (index === active ? "opacity-100" : "opacity-0")
                  }
                />
              ))}

              <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
                <p className="text-[20px] font-bold leading-none text-navy-900">
                  +500
                </p>
                <p className="mt-1.5 text-[12px] leading-none text-zinc-500">
                  projets accompagnés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ DESKTOP : image en fond + texte centré ============ */}
      <div className="relative hidden lg:block">
        {/* Image de fond (carrousel) */}
        <div className="absolute inset-0">
          {IMAGES.map((src, index) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className={
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 " +
                (index === active ? "opacity-100" : "opacity-0")
              }
            />
          ))}
          {/* Voile navy pour lisibilité du texte blanc */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/75 to-navy-950/60" />
        </div>

        {/* Contenu centré */}
        <div className="relative mx-auto flex min-h-[560px] w-full max-w-[1440px] items-center justify-center px-20 py-24 xl:px-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.22em] text-express-400">
              ODA SOURCES
            </p>
            <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.18em] text-navy-300">
              Sourcing · Vérification · Contrôle qualité · Shipping
            </p>

            <h1
              className="mt-6 text-[48px] leading-[1.1] tracking-[-0.02em] text-white xl:text-[56px]"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
              }}
            >
              Votre partenaire en Chine,
              <br />
              <span className="text-express-400">
                du sourcing à l&apos;expédition.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.7] text-navy-100">
              Nous accompagnons{" "}
              <strong className="font-semibold text-white">entreprises</strong>,{" "}
              <strong className="font-semibold text-white">commerçants</strong>{" "}
              et{" "}
              <strong className="font-semibold text-white">investisseurs</strong>{" "}
              dans leurs achats en Chine :{" "}
              <strong className="font-semibold text-white">
                recherche et vérification de fournisseurs
              </strong>
              ,{" "}
              <strong className="font-semibold text-white">négociation</strong>,{" "}
              <strong className="font-semibold text-white">
                contrôle qualité
              </strong>{" "}
              et{" "}
              <strong className="font-semibold text-white">
                organisation de l&apos;expédition internationale
              </strong>{" "}
              jusqu&apos;à votre destination.
            </p>

            {/* Boutons */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* CTA principal : blanc sur navy */}
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

              {/* ✅ SOLUTION : lien stylisé au lieu du ButtonLink outline */}
              <Link
                href="/services"
                className="group inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/5 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Nos services
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </div>

            {/* Petit badge stats en bas */}
            <div className="mt-12 inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
              <span className="text-[22px] font-bold leading-none text-white">
                +500
              </span>
              <span className="text-[13px] leading-tight text-navy-200">
                projets accompagnés
                <br />
                depuis la Chine
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ SVG en bloc (inchangé) */}
      <SectionDivider variant="wave" bg="navy-50" color="white" />
    </section>
  );
}