"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import SectionDivider from "@/components/ui/SectionDivider";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    number: "01",
    title: "Brief & cadrage",
    description:
      "Vous nous décrivez votre produit, votre quantité, votre budget et votre marché. Nous cadrons ensemble le cahier des charges précis.",
  },
  {
    number: "02",
    title: "Recherche & négociation",
    description:
      "Nous identifions les fournisseurs adaptés, négocions les prix et conditions, et vous transmettons les meilleures options avec échantillons.",
  },
  {
    number: "03",
    title: "Vérification & contrôle",
    description:
      "Visite d'usine, contrôle qualité complet, rapport photo et vidéo sous 24 heures. Rien n'est payé sans votre validation finale.",
  },
  {
    number: "04",
    title: "Expédition & livraison",
    description:
      "Emballage, consolidation, dédouanement et livraison finale à votre entrepôt. Un seul interlocuteur du début à la fin.",
  },
];

function StepItem({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[number];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const baseAnim = "transition-all duration-700 ease-out";
  const visibleState = visible
    ? "translate-y-0 opacity-100"
    : "translate-y-6 opacity-0";

  return (
    <div ref={ref}>
      {/* ───── MOBILE ───── */}
      <div className="flex gap-5 lg:hidden">
        <div className="flex shrink-0 flex-col items-center">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border-2 border-express-600 bg-white shadow-sm",
              baseAnim,
              visibleState,
            )}
          >
            <span className="h-2.5 w-2.5 rounded-2xl bg-express-600" />
          </span>

          {!isLast && (
            <span
              aria-hidden
              className={cn(
                "mt-2 w-0.5 flex-1 bg-express-600",
                baseAnim,
                visible ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDelay: `${index * 80 + 300}ms` }}
            />
          )}
        </div>

        <div className={cn("flex-1 pb-14", baseAnim, visibleState)}>
          <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-express-600">
            Étape {step.number}
          </span>
          <h3 className="mt-2 text-[18px] font-bold leading-tight tracking-tight text-navy-900">
            {step.title}
          </h3>
          <p className="mt-2 text-[14px] leading-[1.75] text-navy-800/80">
            {step.description}
          </p>
        </div>
      </div>

      {/* ───── DESKTOP ───── */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col lg:items-center lg:text-center",
          baseAnim,
          visibleState,
        )}
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.22em] text-express-600">
          Étape {step.number}
        </span>
        <h3 className="mt-4 text-[20px] font-bold leading-tight tracking-tight text-navy-900">
          {step.title}
        </h3>
        <p className="mt-3 text-[14px] leading-[1.75] text-navy-800/80 lg:max-w-xs">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-50 via-[#eef3fb] to-white py-20 sm:py-24 lg:py-28">
        {/* Halo bleu en haut à droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-navy-200/50 via-navy-100/25 to-transparent blur-3xl"
        />
        {/* Halo express en bas à gauche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-express-100/50 via-navy-100/20 to-transparent blur-3xl"
        />
        {/* Motif de points discret */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #01215b 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <Container className="relative">
          <SectionTitle
            badge="Notre méthode"
            title="Comment nous travaillons, concrètement"
            subtitle="Une méthode en quatre étapes, de votre brief initial jusqu'à la livraison à votre entrepôt."
          />

          <div className="mx-auto mt-16 max-w-6xl">
            {/* Ligne horizontale desktop */}
            <div className="relative hidden lg:block">
              <div className="absolute left-0 right-0 top-5 h-px bg-navy-200" />
              <div className="grid grid-cols-4 gap-8">
                {STEPS.map((step) => (
                  <div key={step.number} className="flex justify-center">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-express-600 bg-white shadow-md">
                      <span className="h-2.5 w-2.5 rounded-2xl bg-express-600" />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Grille étapes */}
            <div className="lg:mt-8 lg:grid lg:grid-cols-4 lg:gap-8">
              {STEPS.map((step, index) => (
                <StepItem
                  key={step.number}
                  step={step}
                  index={index}
                  isLast={index === STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ✅ SVG curve : vers Products (navy-50) — plus ample que tilt */}
      <SectionDivider
        variant="curve"
        bg="white"
        color="navy-50"
        height="lg"
      />
    </>
  );
}