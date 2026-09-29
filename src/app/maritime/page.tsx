"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEA_PER_CBM, WHATSAPP } from "@/data/odaData";

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

  const cost = cbm > 0 ? Math.round(cbm * SEA_PER_CBM) : 0;

  const whatsapp = useMemo(() => {
    const msg = [
      "Bonjour ODA SOURCES,",
      "",
      "Je souhaite un devis pour un envoi maritime.",
      "",
      cbm > 0 ? `Volume estimé : ${cbm.toFixed(2)} m³` : null,
      length && width && height
        ? `Dimensions colis : ${length} × ${width} × ${height} cm`
        : null,
      cartons ? `Nombre de colis : ${cartons}` : null,
      "",
      "Merci de me confirmer le tarif maritime et le délai.",
    ]
      .filter((l): l is string => l !== null)
      .join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }, [cbm, length, width, height, cartons]);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/50 to-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
              Transport maritime
            </p>
            <h1 className="mt-3 text-[28px] font-bold tracking-tight text-navy-900 sm:text-[36px]">
              Estimez le volume de votre marchandise
            </h1>
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
              Vous n&apos;avez pas besoin de connaître les termes techniques.
              Indiquez simplement la taille d&apos;un carton : nous calculons
              l&apos;espace qu&apos;il occupe dans le conteneur.
            </p>
          </div>
        </section>

        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl rounded-3xl border border-zinc-100 bg-white p-6 shadow-[0_4px_24px_-12px_rgba(10,25,49,0.12)] sm:p-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Longueur (cm)" value={length} onChange={setLength} placeholder="Ex. 120" />
              <Field label="Largeur (cm)" value={width} onChange={setWidth} placeholder="Ex. 80" />
              <Field label="Hauteur (cm)" value={height} onChange={setHeight} placeholder="Ex. 100" />
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Field
                label="Nombre de cartons"
                value={cartons}
                onChange={setCartons}
                placeholder="1"
                type="number"
              />
              <div className="sm:col-span-2">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Espace occupé dans le conteneur
                </span>
                <div className="flex items-center gap-3 rounded-xl border border-navy-100 bg-gradient-to-br from-navy-50/60 to-white px-4 py-3">
                  <Package className="h-4 w-4 shrink-0 text-navy-700" strokeWidth={1.75} />
                  <p className="text-[13px] font-semibold text-navy-900">
                    {cbm > 0
                      ? `${cbm.toFixed(2)} m³ · coût estimé ≈ $${cost}`
                      : "Renseignez les dimensions pour voir le résultat"}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={cbm > 0 ? whatsapp : undefined}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (cbm <= 0) e.preventDefault();
              }}
              className={
                "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[13px] font-bold text-white shadow-sm transition " +
                (cbm > 0
                  ? "bg-gradient-to-br from-express-500 to-express-700 hover:shadow-md"
                  : "cursor-not-allowed bg-zinc-300 shadow-none")
              }
            >
              Recevoir mon devis maritime
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </a>

            <p className="mt-3 text-center text-[10.5px] text-zinc-400">
              Tarif indicatif : {SEA_PER_CBM} $ par m³ transporté
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