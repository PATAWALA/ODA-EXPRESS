"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { saveLead } from "@/lib/leads";

export default function NewsletterInlineForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Merci de saisir un email valide.");
      return;
    }
    setError(null);
    setState("loading");

    const result = await saveLead({ email, source: "newsletter" });
    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue.");
      setState("idle");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 p-5">
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
          strokeWidth={2}
        />
        <div>
          <p className="text-[14px] font-bold text-emerald-900">
            Vous êtes bien inscrit.
          </p>
          <p className="mt-1 text-[12.5px] leading-relaxed text-emerald-800">
            Vous recevrez la prochaine veille directement dans votre boîte.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          Votre email
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          className="w-full rounded border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
        />
      </label>

      {error && (
        <p className="border border-amber-200 bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="group inline-flex w-full items-center justify-between gap-3 rounded bg-express-600 px-5 py-4 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
      >
        {state === "loading" ? "Inscription..." : "Je m'inscris"}
        <ArrowRight
          className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </button>

      <p className="text-center text-[11px] text-zinc-400">
        1 email par mois maximum. Désinscription en un clic.
      </p>
    </form>
  );
}