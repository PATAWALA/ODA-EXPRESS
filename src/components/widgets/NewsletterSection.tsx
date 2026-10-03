"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { saveLead } from "@/lib/leads";

export default function NewsletterSection() {
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

  return (
    <section className="border-b border-zinc-200 bg-zinc-50/50 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center border border-zinc-200 bg-white text-navy-900">
            <Mail className="h-5 w-5" strokeWidth={1.6} />
          </div>

          <h2 className="mt-6 text-[24px] font-bold tracking-tight text-navy-900 sm:text-[28px]">
            Restez informé des opportunités d&apos;import
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-zinc-600">
            Recevez nos guides, nouveautés produits et conseils logistiques
            Chine — Afrique, une fois par mois.
          </p>

          {state === "done" ? (
            <div className="mt-8 inline-flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-5 py-4">
              <CheckCircle2
                className="h-5 w-5 text-emerald-700"
                strokeWidth={2}
              />
              <p className="text-[13.5px] font-semibold text-emerald-800">
                Merci, vous êtes bien inscrit.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                className="flex-1 border border-zinc-200 bg-white px-5 py-3.5 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
                required
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex items-center justify-center gap-2 bg-express-600 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
              >
                {state === "loading" ? "Envoi..." : "M'inscrire"}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </form>
          )}

          {error && (
            <p className="mt-3 text-[12.5px] text-amber-700">{error}</p>
          )}

          <p className="mt-4 text-[11.5px] text-zinc-500">
            Vos données sont confidentielles. Désinscription en un clic.
          </p>
        </div>
      </Container>
    </section>
  );
}