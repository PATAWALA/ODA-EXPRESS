"use client";

import { useState } from "react";

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
        <h2 className="text-[22px] font-semibold tracking-tight text-zinc-900 sm:text-[28px]">
          Suivre un colis
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-500">
          Entrez votre numéro ODA pour voir l'état de votre expédition.
        </p>

        <div className="mt-8 flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="ODA-8839-2026"
            className="flex-1 rounded-full border border-zinc-200 px-5 py-3 text-[13px] outline-none transition focus:border-zinc-400"
          />
          <button
            type="button"
            onClick={search}
            className="rounded-full bg-zinc-900 px-6 py-3 text-[12.5px] font-medium text-white transition hover:bg-zinc-800"
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
          <div className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50 px-5 py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              État actuel
            </p>
            <p className="mt-2 text-[15px] font-semibold text-zinc-900">
              {result}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}