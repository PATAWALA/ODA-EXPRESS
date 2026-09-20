"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AIR_PER_KG,
  CITIES,
  PRODUCTS,
  SEA_PER_CBM,
  SERVICES,
  WHATSAPP,
  type Service,
} from "@/data/oda";

type Mode = "air" | "sea";

export default function Wizard() {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<Service | null>(null);
  const [product, setProduct] = useState("");
  const [city, setCity] = useState("");
  const [mode, setMode] = useState<Mode>("air");
  const [weight, setWeight] = useState("");

  const estimate = useMemo(() => {
    const w = Number.parseFloat(weight.replace(",", "."));
    if (!Number.isFinite(w) || w <= 0) return null;
    return Math.round(w * (mode === "air" ? AIR_PER_KG : SEA_PER_CBM));
  }, [weight, mode]);

  const whatsapp = useMemo(() => {
    const lines = ["Bonjour Mr ODA,", ""];
    if (service) lines.push(`Service : ${service.title}`);
    if (product) lines.push(`Produit : ${product}`);
    if (city) lines.push(`Ville de livraison : ${city}`);
    if (step === 3) {
      lines.push(`Mode : ${mode === "air" ? "Aérien express" : "Maritime groupé"}`);
      if (weight) lines.push(`Poids estimé : ${weight} kg`);
      if (estimate) lines.push(`Estimation indicative : $${estimate}`);
    }
    lines.push("", "Merci de me confirmer le tarif et le délai.");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [service, product, city, mode, weight, estimate, step]);

  const canContinue =
    (step === 1 && service !== null) ||
    (step === 2 && product !== "" && city !== "") ||
    step === 3;

  return (
    <section id="devis" className="border-t border-zinc-100 px-5 py-20">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
            Votre demande en 3 étapes
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
            60 secondes, aucune inscription. À la fin, votre demande part
            directement sur WhatsApp.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={
                "h-1 flex-1 rounded-full transition " +
                (step >= n ? "bg-zinc-900" : "bg-zinc-100")
              }
            />
          ))}
        </div>

        <div className="mt-10">
          {step === 1 && (
            <div className="space-y-3">
              <p className="text-[12.5px] font-medium text-zinc-500">
                Quel est votre besoin ?
              </p>
              {SERVICES.map((item) => {
                const active = service?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setService(item)}
                    className={
                      "flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition " +
                      (active
                        ? "border-zinc-900 bg-zinc-50"
                        : "border-zinc-200 hover:border-zinc-300")
                    }
                  >
                    <item.icon
                      className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700"
                      strokeWidth={1.75}
                    />
                    <span>
                      <span className="block text-[13.5px] font-semibold text-zinc-900">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-[12px] leading-relaxed text-zinc-500">
                        {item.line}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <p className="text-[12.5px] font-medium text-zinc-500">
                Détails de votre marchandise.
              </p>
              <Select
                label="Produit"
                value={product}
                onChange={setProduct}
                options={PRODUCTS}
                placeholder="Choisir une catégorie"
              />
              <Select
                label="Ville de livraison"
                value={city}
                onChange={setCity}
                options={CITIES}
                placeholder="Choisir une ville"
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <p className="text-[12.5px] font-medium text-zinc-500">
                Votre estimation indicative.
              </p>

              <div className="grid grid-cols-2 gap-2">
                <ModeButton
                  active={mode === "air"}
                  onClick={() => setMode("air")}
                  label="Aérien"
                />
                <ModeButton
                  active={mode === "sea"}
                  onClick={() => setMode("sea")}
                  label="Maritime"
                />
              </div>

              <label className="block">
                <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                  Poids estimé (kg)
                </span>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex. 150"
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-3 text-[13.5px] outline-none transition focus:border-zinc-400"
                />
              </label>

              <div className="rounded-2xl bg-zinc-900 p-6 text-center">
                <p className="text-[11px] uppercase tracking-wider text-zinc-400">
                  Estimation
                </p>
                <p className="mt-2 text-[28px] font-semibold tracking-tight text-white">
                  {estimate ? `$${estimate}` : "—"}
                </p>
                <p className="mt-1 text-[11.5px] text-zinc-500">
                  {mode === "air"
                    ? "Transit 5 à 7 jours"
                    : "Transit 35 à 50 jours"}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 px-5 py-2.5 text-[12.5px] font-medium text-zinc-700 transition hover:border-zinc-300"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                Retour
              </button>
            ) : (
              <span />
            )}

            {step < 3 ? (
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep(step + 1)}
                className={
                  "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-[12.5px] font-medium text-white transition " +
                  (canContinue
                    ? "bg-zinc-900 hover:bg-zinc-800"
                    : "cursor-not-allowed bg-zinc-300")
                }
              >
                Continuer
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            ) : (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-[12.5px] font-medium text-white transition hover:bg-emerald-700"
              >
                Envoyer sur WhatsApp
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Helpers ---------- */

function Select({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] outline-none transition focus:border-zinc-400"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

function ModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-xl border py-3 text-[12.5px] font-medium transition " +
        (active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 text-zinc-700 hover:border-zinc-300")
      }
    >
      {label}
    </button>
  );
}