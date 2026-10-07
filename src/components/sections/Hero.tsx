"use client";

import { useEffect, useState } from "react";
import { Fraunces } from "next/font/google";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

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
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-navy-100/70 via-navy-50/30 to-white ${fraunces.variable}`}
    >
      {/* Halo bleu en haut à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
      />
      {/* Halo rouge en bas à gauche */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-8 sm:px-12 lg:px-20 xl:px-28">
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.15fr_1fr] lg:items-stretch lg:gap-20 lg:py-20">
          {/* Colonne texte */}
          <div className="order-1 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              ODA SOURCES
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 sm:text-[11.5px]">
              Sourcing · Vérification · Contrôle qualité · Shipping
            </p>

            <h1
              className="mt-5 text-[32px] leading-[1.12] tracking-[-0.02em] text-navy-900 sm:text-[40px] lg:text-[46px]"
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

          {/* Colonne image */}
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
    </section>
  );
}