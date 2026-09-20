"use client";

import { useState } from "react";
import { MapPin, Package } from "lucide-react";

const STATES = [
  "Reçu à Guangzhou",
  "Contrôle qualité",
  "Départ international",
  "En transit",
  "Arrivé au port",
  "Livré",
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) % 99991;
  return h;
}

export default function Tracking() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState(false);

  function search() {
    const c = code.trim();
    if (c.length < 5) {
      setError(true);
      setResult(null);
      return;
    }
    setError(false);
    setResult(STATES[hash(c.toUpperCase()) % STATES.length]);
  }

  return (
    <section id="suivi" className="border-t border-zinc-100 px-5 py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Suivi de colis
        </p>
        <h2 className="mt-3 text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
          Où se trouve votre marchandise
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
          Entrez votre numéro ODA pour voir l&apos;état de votre expédition, de
          Guangzhou jusqu&apos;à votre ville.
        </p>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="ODA-8839-2026"
            className="flex-1 rounded-full border border-zinc-200 bg-white px-5 py-3 text-[13px] outline-none transition focus:border-zinc-400 focus:shadow-sm"
          />
          <button
            type="button"
            onClick={search}
            className="rounded-full bg-gradient-to-br from-zinc-900 to-zinc-700 px-6 py-3 text-[12.5px] font-medium text-white shadow-sm transition hover:shadow-md"
          >
            Suivre
          </button>
        </div>

        {error && (
          <p className="mt-4 text-[12px] text-amber-700">
            Numéro invalide. Format attendu : ODA-8839-2026
          </p>
        )}

        {result && (
          <div className="fade-up mt-6 overflow-hidden rounded-2xl border border-zinc-100 bg-gradient-to-br from-zinc-50 to-white px-5 py-6">
            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              <Package className="h-3.5 w-3.5" strokeWidth={1.75} />
              État actuel
            </div>
            <p className="mt-2 text-[16px] font-semibold text-zinc-900">
              {result}
            </p>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-[11.5px] text-zinc-500">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              Corridor Chine — Afrique
            </p>
          </div>
        )}
      </div>
    </section>
  );
}