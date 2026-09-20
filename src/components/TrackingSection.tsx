"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Package,
  Search,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TRACKING_STEPS } from "@/data/odaData";

const DEMO_CODE = "ODA-8839-2026";

function hashString(value: string): number {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 1_000_003;
  }
  return hash;
}

export default function TrackingSection() {
  const [query, setQuery] = useState("");
  const [trackedCode, setTrackedCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentIndex = trackedCode
    ? hashString(trackedCode.toUpperCase()) % TRACKING_STEPS.length
    : -1;

  const progress =
    currentIndex >= 0
      ? Math.round(((currentIndex + 1) / TRACKING_STEPS.length) * 100)
      : 0;

  function runTracking(value: string) {
    const cleaned = value.trim();

    if (cleaned.length < 5) {
      setError("Merci de saisir un numéro de suivi valide (ex. ODA-8839-2026).");
      setTrackedCode(null);
      return;
    }

    setError(null);
    setTrackedCode(cleaned);
  }

  return (
    <section id="suivi" className="border-b border-slate-200 bg-slate-50/70 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Colonne gauche */}
          <div>
            <span className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-700">
              Suivi de colis
            </span>
            <h2 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[36px]">
              Où se trouve votre marchandise, à tout moment
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-600">
              Chaque dossier reçoit un numéro unique. Suivez l&apos;avancement de votre
              conteneur depuis notre entrepôt de Guangzhou jusqu&apos;à la livraison
              finale dans votre ville.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <label
                htmlFor="tracking-code"
                className="mb-2 block text-[12.5px] font-semibold uppercase tracking-wide text-slate-600"
              >
                Numéro de suivi
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Package className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="tracking-code"
                    type="text"
                    placeholder="ODA-8839-2026"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") runTracking(query);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-3 pl-10 pr-4 text-[14px] font-medium uppercase tracking-wide text-slate-900 outline-none transition placeholder:font-normal placeholder:normal-case placeholder:tracking-normal placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => runTracking(query)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-[13.5px] font-semibold text-white transition hover:bg-slate-800"
                >
                  <Search className="h-4 w-4" />
                  Suivre
                </button>
              </div>

              {error && (
                <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] font-medium text-amber-800">
                  {error}
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  setQuery(DEMO_CODE);
                  runTracking(DEMO_CODE);
                }}
                className="mt-4 inline-flex items-center gap-2 text-[12.5px] font-semibold text-brand-700 transition hover:text-brand-800"
              >
                Essayer avec le numéro de démonstration {DEMO_CODE}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
              <p className="text-[13px] leading-relaxed text-slate-600">
                Vous ne retrouvez pas votre numéro ? Écrivez directement à Mr ODA sur
                WhatsApp avec le nom de votre fournisseur, il vous répond en moins de
                30 minutes.
              </p>
            </div>
          </div>

          {/* Colonne droite : résultat */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {trackedCode === null ? (
              <div className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-400">
                  <Truck className="h-6 w-6" />
                </span>
                <p className="mt-5 text-[15px] font-semibold text-slate-900">
                  Aucun colis sélectionné
                </p>
                <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-slate-500">
                  Saisissez votre numéro de suivi pour afficher l&apos;état détaillé de
                  votre expédition.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
                  <div>
                    <p className="text-[11.5px] font-semibold uppercase tracking-wide text-slate-400">
                      Numéro de suivi
                    </p>
                    <p className="mt-1 text-[20px] font-bold tracking-tight text-slate-900">
                      {trackedCode.toUpperCase()}
                    </p>
                  </div>
                  <span className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-brand-700">
                    {TRACKING_STEPS[currentIndex].title}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 py-5 sm:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Origine
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-slate-900">
                      Guangzhou, Chine
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Destination
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-slate-900">
                      Afrique — 12 pays
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Progression
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-slate-900">
                      {progress}%
                    </p>
                  </div>
                </div>

                <div className="py-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-brand-600 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <ol className="space-y-1">
                  {TRACKING_STEPS.map((item, index) => {
                    const isDone = index < currentIndex;
                    const isCurrent = index === currentIndex;

                    return (
                      <li key={item.title} className="relative flex gap-4 pb-5 last:pb-0">
                        {index < TRACKING_STEPS.length - 1 && (
                          <span
                            aria-hidden
                            className={cn(
                              "absolute left-[13px] top-8 h-[calc(100%-16px)] w-px",
                              isDone ? "bg-brand-500" : "bg-slate-200",
                            )}
                          />
                        )}

                        <span className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border">
                          {isDone ? (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white">
                              <CheckCircle2 className="h-4 w-4" />
                            </span>
                          ) : isCurrent ? (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full border-brand-600 bg-white">
                              <span className="relative flex h-2 w-2">
                                <span className="oda-pulse absolute inline-flex h-full w-full rounded-full bg-brand-500" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
                              </span>
                            </span>
                          ) : (
                            <span className="h-7 w-7 rounded-full border-slate-200 bg-white" />
                          )}
                        </span>

                        <div className="pt-0.5">
                          <p
                            className={cn(
                              "text-[13.5px] font-semibold",
                              isCurrent
                                ? "text-slate-900"
                                : isDone
                                  ? "text-slate-700"
                                  : "text-slate-400",
                            )}
                          >
                            {item.title}
                          </p>
                          <p
                            className={cn(
                              "mt-0.5 text-[11.5px] font-medium",
                              isCurrent || isDone ? "text-brand-700" : "text-slate-400",
                            )}
                          >
                            {item.location}
                          </p>
                          {(isCurrent || isDone) && (
                            <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}