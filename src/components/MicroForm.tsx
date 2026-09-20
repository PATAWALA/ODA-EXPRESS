"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Plane,
  Search,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { WHATSAPP, type Need } from "@/data/options";

export default function MicroForm({
  need,
  onBack,
}: {
  need: Need;
  onBack: () => void;
}) {
  const [product, setProduct] = useState("");
  const [city, setCity] = useState("");
  const [supplierCity, setSupplierCity] = useState("");
  const [mode, setMode] = useState<"air" | "sea">("air");
  const [weight, setWeight] = useState("");

  const valid =
    need === "sourcing"
      ? product.trim() !== "" && city.trim() !== ""
      : need === "inspection"
        ? supplierCity.trim() !== ""
        : weight.trim() !== "";

  const href = useMemo(() => {
    const lines: string[] = ["Bonjour Mr ODA,", ""];

    if (need === "sourcing") {
      lines.push("Besoin : Sourcing & Achat");
      if (product.trim()) lines.push(`Produit : ${product.trim()}`);
      if (city.trim()) lines.push(`Ville de livraison : ${city.trim()}`);
    }

    if (need === "inspection") {
      lines.push("Besoin : Inspection Usine");
      if (supplierCity.trim())
        lines.push(`Ville du fournisseur en Chine : ${supplierCity.trim()}`);
    }

    if (need === "shipping") {
      lines.push("Besoin : Expédition Fret");
      lines.push(
        `Mode : ${mode === "air" ? "Aérien express" : "Maritime groupé"}`,
      );
      if (weight.trim()) lines.push(`Poids estimé : ${weight.trim()} kg`);
    }

    lines.push("", "Merci de me confirmer le tarif et le délai.");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}`;
  }, [need, product, city, supplierCity, mode, weight]);

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-zinc-500 transition hover:text-zinc-900"
      >
        <ArrowRight className="h-3.5 w-3.5 rotate-180" strokeWidth={1.75} />
        Changer de besoin
      </button>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50/60 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-zinc-700 ring-1 ring-zinc-200">
            {need === "sourcing" && (
              <Search className="h-4 w-4" strokeWidth={1.75} />
            )}
            {need === "inspection" && (
              <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
            )}
            {need === "shipping" && (
              <Ship className="h-4 w-4" strokeWidth={1.75} />
            )}
          </span>
          <p className="text-[13px] font-semibold tracking-tight text-zinc-900">
            {need === "sourcing" && "Sourcing & Achat"}
            {need === "inspection" && "Inspection Usine"}
            {need === "shipping" && "Expédition Fret"}
          </p>
        </div>

        {need === "sourcing" && (
          <div className="mt-5 space-y-3">
            <Field
              label="Nom du produit"
              value={product}
              onChange={setProduct}
              placeholder="Ex. Téléphones, mobilier"
            />
            <Field
              label="Ville de livraison"
              value={city}
              onChange={setCity}
              placeholder="Ex. Kinshasa, Douala"
            />
          </div>
        )}

        {need === "inspection" && (
          <div className="mt-5">
            <Field
              label="Ville du fournisseur en Chine"
              value={supplierCity}
              onChange={setSupplierCity}
              placeholder="Ex. Guangzhou, Yiwu"
            />
          </div>
        )}

        {need === "shipping" && (
          <div className="mt-5 space-y-4">
            <div>
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Mode d&apos;expédition
              </span>
              <div className="grid grid-cols-2 gap-2">
                <ModeButton
                  active={mode === "air"}
                  onClick={() => setMode("air")}
                  icon={<Plane className="h-3.5 w-3.5" strokeWidth={1.75} />}
                  label="Aérien"
                />
                <ModeButton
                  active={mode === "sea"}
                  onClick={() => setMode("sea")}
                  icon={<Ship className="h-3.5 w-3.5" strokeWidth={1.75} />}
                  label="Maritime"
                />
              </div>
            </div>

            <Field
              label="Poids estimé (kg)"
              value={weight}
              onChange={setWeight}
              placeholder="Ex. 150"
              type="number"
            />
          </div>
        )}
      </div>

      <a
        href={valid ? href : undefined}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => {
          if (!valid) event.preventDefault();
        }}
        className={
          "mt-4 flex w-full items-center justify-between rounded-2xl px-5 py-4 text-[13.5px] font-semibold transition " +
          (valid
            ? "bg-emerald-600 text-white hover:bg-emerald-700"
            : "cursor-not-allowed bg-zinc-100 text-zinc-400")
        }
      >
        <span className="flex items-center gap-2.5">
          <Check className="h-4 w-4" strokeWidth={2} />
          Envoyer à Mr ODA sur WhatsApp
        </span>
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </a>
    </div>
  );
}

/* ---------- petits helpers internes ---------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-[13.5px] text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
      />
    </label>
  );
}

function ModeButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12.5px] font-semibold transition " +
        (active
          ? "border-zinc-900 bg-zinc-900 text-white"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300")
      }
    >
      {icon}
      {label}
    </button>
  );
}