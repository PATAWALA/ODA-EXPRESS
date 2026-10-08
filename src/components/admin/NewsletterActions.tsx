"use client";

import { useState } from "react";
import { Share2, Check, AlertCircle } from "lucide-react";
import { sendRecommendationEmailAction } from "@/app/admin/actions";

export default function NewsletterActions() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  async function handleSend() {
    if (
      !confirm(
        "Envoyer l'email de recommandation à TOUS les contacts inscrits ?",
      )
    ) {
      return;
    }

    setState({ loading: true, error: null, success: null });
    const result = await sendRecommendationEmailAction();

    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Email envoyé.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-md">
          <Share2 className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="flex-1">
          <p className="text-[15px] font-bold text-navy-900">
            Email de recommandation
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
            Invitez vos contacts à partager votre service à leur proche
            commerçant, distributeur ou investisseur. Contient un bouton
            WhatsApp et un lien discret vers votre site.
          </p>

          {state.error && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                strokeWidth={2}
              />
              <p className="text-[12.5px] text-red-800">{state.error}</p>
            </div>
          )}

          {state.success && (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                strokeWidth={2.5}
              />
              <p className="text-[12.5px] text-emerald-800">{state.success}</p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSend}
            disabled={state.loading}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700 disabled:opacity-60"
          >
            <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
            {state.loading ? "Envoi en cours..." : "Envoyer maintenant"}
          </button>
        </div>
      </div>
    </div>
  );
}