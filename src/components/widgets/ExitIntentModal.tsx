"use client";

import { useEffect, useState } from "react";
import { Mail, X, ArrowRight, CheckCircle2 } from "lucide-react";
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
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Avant de partir
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fermer"
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="p-8">
          {state === "done" ? (
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
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
                className="mt-6 inline-flex items-center justify-center rounded-2xl border border-navy-900 bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-navy-900">
                <Mail className="h-5 w-5" strokeWidth={1.6} />
              </div>

              <h2 className="mt-6 text-[22px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[24px]">
                Ne manquez aucune
                <br />
                opportunité d&apos;import.
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
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
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
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-express-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
              >
                {state === "loading" ? "Envoi..." : "Je m'inscris"}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
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