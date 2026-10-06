"use client";

import { useEffect, useState } from "react";
import { Mail, X, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { saveLead } from "@/lib/leads";

const STORAGE_KEY = "oda-exit-intent-shown";

export default function ExitIntentModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    let hasTriggered = false;

    function trigger() {
      if (hasTriggered) return;
      hasTriggered = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    }

    function onMouseLeave(event: MouseEvent) {
      if (event.clientY <= 0) trigger();
    }

    const timer = window.setTimeout(trigger, 20_000);

    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Merci de saisir un email valide.");
      return;
    }
    setError(null);
    setState("loading");

    const result = await saveLead({ email, source: "exit-intent" });
    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue.");
      setState("idle");
      return;
    }
    setState("done");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/85 px-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-2xl"
      >
        {/* Halo bleu en haut à droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-navy-100/70 via-express-50/40 to-transparent blur-3xl"
        />

        {/* Halo rouge en bas à gauche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-gradient-to-tr from-express-100/60 via-navy-50/30 to-transparent blur-3xl"
        />

        {/* En-tête avec dégradé subtil */}
        <div className="relative flex items-center justify-between border-b border-navy-100/60 bg-gradient-to-b from-navy-50/40 to-white px-6 py-4">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            <Sparkles className="h-3 w-3" strokeWidth={2} />
            Avant de partir
          </p>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-white hover:text-navy-900 hover:shadow-sm"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="relative p-8">
          {state === "done" ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/60 shadow-[0_8px_24px_-12px_rgba(5,150,105,0.4)]">
                <CheckCircle2
                  className="h-6 w-6 text-emerald-700"
                  strokeWidth={1.75}
                />
              </div>
              <p className="mt-6 text-[18px] font-bold tracking-tight text-navy-900">
                Merci, vous êtes bien inscrit.
              </p>
              <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
                Vous recevrez nos prochains guides et opportunités d&apos;import
                directement dans votre boîte.
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-2xl border border-navy-900 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50 hover:shadow-md"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md">
                <Mail className="h-5 w-5" strokeWidth={1.75} />
              </div>

              <h2 className="mt-6 text-[22px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[24px]">
                Ne manquez aucune
                <br />
                <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                  opportunité d&apos;import.
                </span>
              </h2>

              <p className="mt-4 text-[13.5px] leading-relaxed text-zinc-600">
                Recevez nos guides pratiques, nouveautés produits et conseils
                logistiques Chine — Afrique, une fois par mois maximum.
              </p>

              <div className="mt-6">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Votre email
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
                  />
                </label>
              </div>

              {error && (
                <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-express-600 to-express-700 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(191,8,8,0.5)] disabled:opacity-60"
              >
                {state === "loading" ? "Envoi..." : "Je m'inscris"}
                <ArrowRight
                  className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </button>

              <p className="mt-4 text-center text-[11px] text-zinc-400">
                Pas de spam. Désinscription en un clic.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}