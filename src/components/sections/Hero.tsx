"use client";

import { useEffect, useState } from "react";
import { Fraunces } from "next/font/google";
import { ArrowRight } from "lucide-react";
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
    <section
      className={`relative overflow-hidden bg-gradient-to-b from-white via-navy-100 to-navy-200 ${fraunces.variable}`}
    >
      {/* ============ DÉCOR DE FOND ============ */}

      {/* Halo bleu intense en haut à droite */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-navy-400/40 via-navy-300/25 to-transparent blur-3xl"
      />

      {/* Halo rouge subtil en bas à gauche (touche express) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-express-300/40 via-navy-200/30 to-transparent blur-3xl"
      />

      {/* Halo bleu moyen au centre-bas (pour renforcer le contraste près de la vague) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[900px] -translate-x-1/2 translate-y-1/4 rounded-full bg-gradient-to-t from-navy-300/50 via-navy-200/30 to-transparent blur-3xl"
      />

      {/* Motif de points discret */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #01215b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ============ CONTENU ============ */}
      <div className="relative mx-auto w-full max-w-[1440px] px-8 pb-8 sm:px-12 sm:pb-10 lg:px-20 lg:pb-12 xl:px-28">
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[1.15fr_1fr] lg:items-stretch lg:gap-20 lg:py-16">
          {/* Colonne texte */}
          <div className="order-1 flex flex-col justify-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              ODA SOURCES
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-navy-700 sm:text-[11.5px]">
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

            <p className="mt-5 max-w-2xl text-[15px] leading-[1.65] text-navy-800/80 sm:text-[16px]">
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
                  className="group shadow-lg shadow-express-600/20"
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
                  className="group border-navy-300 bg-white/60 backdrop-blur-sm"
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
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-2xl border border-white/60 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.4)]">
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

              {/* Léger voile pour que le badge ressorte */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/25 via-transparent to-transparent"
              />

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

      {/* ============ SVG VAGUE ============ */}
      {/* La vague blanche "monte" depuis le navy-200 du Hero vers le blanc de la TrustBar */}
      <SectionDivider variant="wave" bg="navy-200" color="white" />
    </section>
  );
}