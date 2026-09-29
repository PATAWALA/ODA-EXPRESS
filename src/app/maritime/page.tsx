"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Container } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  CONTAINER_20_FT,
  CONTAINER_40_FT,
  SEA_MIN_CBM,
  SEA_PER_CBM,
  WHATSAPP,
} from "@/data/odaData";

export default function MaritimePage() {
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [cartons, setCartons] = useState("1");

  const cbm = useMemo(() => {
    const l = Number.parseFloat(length.replace(",", "."));
    const w = Number.parseFloat(width.replace(",", "."));
    const h = Number.parseFloat(height.replace(",", "."));
    const n = Number.parseInt(cartons, 10);
    if (![l, w, h, n].every((v) => Number.isFinite(v) && v > 0)) return 0;
    return (l * w * h * n) / 1_000_000;
  }, [length, width, height, cartons]);

  const billable = cbm > 0 ? Math.max(cbm, SEA_MIN_CBM) : 0;
  const cost = billable > 0 ? Math.round(billable * SEA_PER_CBM) : 0;

  const containerType =
    billable > 0 && billable <= CONTAINER_20_FT
      ? "Groupage LCL"
      : billable > CONTAINER_20_FT && billable <= CONTAINER_40_FT
        ? "Conteneur 40' conseillé"
        : billable > CONTAINER_40_FT
          ? "Plusieurs conteneurs 40'"
          : "—";

  const whatsapp = useMemo(() => {
    const lines: (string | null)[] = [
      "Bonjour ODA SOURCES,",
      "",
      "Je souhaite un devis pour un envoi maritime.",
      "",
      `Volume estimé : ${billable.toFixed(2)} CBM`,
      length && width && height
        ? `Dimensions colis : ${length} × ${width} × ${height} cm`
        : null,
      cartons ? `Nombre de colis : ${cartons}` : null,
      `Type conseillé : ${containerType}`,
      "",
      "Merci de me confirmer le tarif maritime et le délai.",
    ];
    const msg = lines.filter((l): l is string => l !== null).join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }, [billable, length, width, height, cartons, containerType]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/50 to-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
              Simulateur maritime
            </p>
            <h1 className="mt-3 text-[28px] font-bold tracking-tight text-navy-900 sm:text-[36px]">
              Calculez votre CBM
            </h1>
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
              Renseignez les dimensions d&apos;un colis pour obtenir une              estimation immédiate du volume et du coût maritime.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_-12px_rgba(10,25,49,0.12)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field
                label="Longueur (cm)"
                value={length}
                onChange={setLength}
                placeholder="Ex. 120"
              />
              <Field
                label="Largeur (cm)"
                value={width}
                onChange={setWidth}
                placeholder="Ex. 80"
              />
              <Field
                label="Hauteur (cm)"
                value={height}
                onChange={setHeight}
                placeholder="Ex. 100"
              />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field
                label="Nombre de colis"
                value={cartons}
                onChange={setCartons}
                placeholder="1"
                type="number"
              />
              <div className="sm:col-span-2">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Résultat
                </span>
                <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-gradient-to-br from-navy-50/60 to-white px-4 py-3">
                  <Container
                    className="h-4 w-4 shrink-0 text-navy-700"
                    strokeWidth={1.75}
                  />
                  <p className="text-[13px] font-semibold text-navy-900">
                    {billable > 0
                      ? `${billable.toFixed(2)} CBM · ≈ $${cost}`
                      : "En attente des dimensions"}
                  </p>
                </div>
              </div>
            </div>

            {billable > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-700 px-5 py-4 text-white">
                <p className="text-[12px] font-medium text-navy-100">
                  Type conseillé :
                </p>
                <p className="text-[13px] font-bold">{containerType}</p>
              </div>
            )}

            <a
              href={billable > 0 ? whatsapp : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (billable <= 0) e.preventDefault();
              }}
              className={
                "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold text-white shadow-sm transition " +
                (billable > 0
                  ? "bg-gradient-to-br from-express-500 to-express-700 hover:shadow-md"
                  : "cursor-not-allowed bg-zinc-300 shadow-none")
              }
            >
              Demander mon devis maritime
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>

            <p className="mt-3 text-center text-[10.5px] text-zinc-400">
              Tarif indicatif : {SEA_PER_CBM} $ / CBM · Minimum {SEA_MIN_CBM} CBM
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
      />
    </label>
  );
}