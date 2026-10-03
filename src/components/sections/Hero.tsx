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
  "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1600&q=85",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=85",
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=1600&q=85",
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
      className={`relative overflow-hidden bg-white ${fraunces.variable}`}
    >
      {/* Dégradé bleu subtil en bas de section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-50/70 via-white/40 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-8 sm:px-12 lg:px-20 xl:px-28">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-24 lg:py-28">
          {/* Colonne texte — 1re sur mobile, 1re sur desktop */}
          <div className="order-1">
            {/* Titre serif deux tons + mots soulignés */}
            <h1
              className="text-[36px] leading-[1.15] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[54px]"
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontWeight: 500,
              }}
            >
              Vos achats en Chine,
              <br />
              <span className="underline decoration-express-600 decoration-[3px] underline-offset-[8px]">
                vérifiés
              </span>{" "}
              et{" "}
              <span className="underline decoration-express-600 decoration-[3px] underline-offset-[8px]">
                livrés
              </span>
              <br />
              <span className="text-express-600">
                jusqu&apos;à votre entrepôt.
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.7] text-zinc-600 sm:text-[17px]">
              Nous accompagnons les commerçants, distributeurs, industriels et
              investisseurs africains à chaque étape de leurs opérations
              d&apos;import : recherche de fournisseurs, négociation, contrôle
              qualité, fret international et livraison finale.
            </p>

            {/* CTA + micro-réassurance */}
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

              <p className="mt-5 flex flex-col items-center gap-1.5 text-[12.5px] text-zinc-500 sm:flex-row sm:justify-start sm:gap-0">
                <span>Réponse sous 24 h</span>
                <span className="hidden px-2 sm:inline">·</span>
                <span>Sans engagement</span>
                <span className="hidden px-2 sm:inline">·</span>
                <span>Un seul interlocuteur</span>
              </p>
            </div>
          </div>

          {/* Colonne image — 2e sur mobile, 2e sur desktop */}
          <div className="relative order-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg shadow-[0_30px_70px_-25px_rgba(1,18,52,0.3)]">
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

              <div className="absolute bottom-6 left-6 rounded-xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur">
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