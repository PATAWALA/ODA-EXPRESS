"use client";

import { useState } from "react";
import { Mail, Check, AlertCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { sendMonthlyDigestAction } from "@/app/admin/actions";

export default function VeilleForm() {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  async function handleSubmit(formData: FormData) {
    if (
      !confirm(
        "Envoyer la veille import à TOUS les contacts inscrits ? (action irréversible)",
      )
    ) {
      return;
    }

    setState({ loading: true, error: null, success: null });
    const result = await sendMonthlyDigestAction(formData);

    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Veille envoyée.",
      });
    }
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md">
          <Mail className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div className="flex-1">
          <p className="text-[15px] font-bold text-navy-900">
            Veille import mensuelle
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">
            Composez et envoyez votre veille mensuelle : nouveauté produit,
            info fret et conseil pratique.
          </p>
        </div>
      </div>

      <form action={handleSubmit} className="mt-6 space-y-5">
        <Input
          label="Mois de la veille"
          name="month"
          required
          placeholder="Ex. Novembre 2026"
          defaultValue={new Date().toLocaleDateString("fr-FR", {
            month: "long",
            year: "numeric",
          })}
        />

        <div className="border-t border-zinc-100 pt-5">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600">
            🆕 Nouveauté produit
          </p>
          <div className="space-y-4">
            <Input
              label="Titre"
              name="product_title"
              required
              placeholder="Ex. Nouvelle gamme de tracteurs 80CV"
            />
            <Textarea
              label="Description"
              name="product_description"
              required
              rows={3}
              placeholder="2-3 phrases qui présentent la nouveauté..."
            />
            <Input
              label="URL image (optionnel)"
              name="product_image_url"
              placeholder="https://..."
            />
          </div>
        </div>

        <div className="border-t border-zinc-100 pt-5">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600">
            📊 Info fret
          </p>
          <Textarea
            label="Mise à jour"
            name="freight_update"
            required
            rows={3}
            placeholder="Ex. Les tarifs maritimes vers l'Afrique de l'Ouest ont baissé de 8% ce mois-ci."
          />
        </div>

        <div className="border-t border-zinc-100 pt-5">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600">
            💡 Conseil pratique
          </p>
          <Textarea
            label="Conseil du mois"
            name="tip"
            required
            rows={3}
            placeholder="Ex. Vérifiez toujours l'existence physique d'une usine avant de payer un acompte."
          />
        </div>

        {state.error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
              strokeWidth={2}
            />
            <p className="text-[12.5px] text-red-800">{state.error}</p>
          </div>
        )}

        {state.success && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              strokeWidth={2.5}
            />
            <p className="text-[12.5px] text-emerald-800">{state.success}</p>
          </div>
        )}

        <div className="flex justify-end border-t border-zinc-100 pt-5">
          <button
            type="submit"
            disabled={state.loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800 disabled:opacity-60"
          >
            <Mail className="h-3.5 w-3.5" strokeWidth={2} />
            {state.loading ? "Envoi en cours..." : "Envoyer à tous les contacts"}
          </button>
        </div>
      </form>
    </div>
  );
}