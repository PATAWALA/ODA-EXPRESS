"use client";

import { useState } from "react";
import {
  Calendar,
  Check,
  AlertCircle,
  Mail,
  Trash2,
  Clock,
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import {
  createVeilleAction,
  deleteVeilleAction,
} from "@/app/admin/actions";

interface Veille {
  id: string;
  scheduled_for: string;
  month_label: string;
  product_title: string;
  product_description: string;
  product_image_url: string | null;
  freight_update: string;
  tip: string;
  status: string;
  sent_at: string | null;
  recipients_count: number | null;
  created_at: string;
}

export default function VeilleProgrammer({
  veilles,
}: {
  veilles: Veille[];
}) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
    success: string | null;
  }>({ loading: false, error: null, success: null });

  async function handleSubmit(formData: FormData) {
    setState({ loading: true, error: null, success: null });
    const result = await createVeilleAction(formData);

    if (result?.error) {
      setState({ loading: false, error: result.error, success: null });
    } else {
      setState({
        loading: false,
        error: null,
        success: result?.success ?? "Veille programmée.",
      });
      // Recharger la page pour voir la nouvelle veille
      setTimeout(() => window.location.reload(), 1500);
    }
  }

  return (
    <div className="space-y-6">
      {/* Formulaire de programmation */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md">
            <Calendar className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[15px] font-bold text-navy-900">
              Nouvelle veille programmée
            </p>
            <p className="mt-1 text-[13px] text-zinc-600">
              Le système enverra cette veille automatiquement à la date
              choisie, sans que vous ayez à cliquer.
            </p>
          </div>
        </div>

        <form action={handleSubmit} className="mt-6 space-y-5">
          <Input
            label="Date d'envoi programmée *"
            name="scheduled_for"
            type="date"
            required
            hint="Le cron Vercel enverra cette veille le jour choisi à 9h UTC"
          />

          <Input
            label="Mois affiché dans l'email *"
            name="month_label"
            required
            placeholder="Ex. Novembre 2026"
          />

          <div className="border-t border-zinc-100 pt-5">
            <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.1em] text-express-600">
              🆕 Nouveauté produit
            </p>
            <div className="space-y-4">
              <Input
                label="Titre *"
                name="product_title"
                required
                placeholder="Ex. Nouvelle gamme de tracteurs 80CV"
              />
              <Textarea
                label="Description *"
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
              label="Mise à jour *"
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
              label="Conseil du mois *"
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
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              {state.loading ? "Programmation..." : "Programmer la veille"}
            </button>
          </div>
        </form>
      </div>

      {/* Liste des veilles programmées */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-6 py-5">
          <p className="text-[14px] font-bold tracking-tight text-navy-900">
            Veilles programmées
          </p>
          <p className="mt-0.5 text-[11.5px] text-zinc-500">
            {veilles.length} veille{veilles.length > 1 ? "s" : ""} au total
          </p>
        </div>

        {veilles.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Mail className="mx-auto h-6 w-6 text-zinc-300" strokeWidth={1.5} />
            <p className="mt-4 text-[13px] font-semibold text-navy-900">
              Aucune veille programmée
            </p>
            <p className="mt-1.5 text-[12px] text-zinc-500">
              Composez votre première veille ci-dessus.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {veilles.map((veille) => (
              <li
                key={veille.id}
                className="flex flex-wrap items-center gap-4 px-6 py-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-500">
                  <Clock className="h-4 w-4" strokeWidth={1.75} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-bold text-navy-900">
                      {veille.month_label}
                    </p>
                    <span
                      className={
                        "rounded-2xl px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] " +
                        (veille.status === "sent"
                          ? "bg-emerald-100 text-emerald-700"
                          : veille.status === "cancelled"
                            ? "bg-zinc-100 text-zinc-500"
                            : "bg-amber-100 text-amber-700")
                      }
                    >
                      {veille.status === "sent"
                        ? "Envoyée"
                        : veille.status === "cancelled"
                          ? "Annulée"
                          : "En attente"}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-zinc-500">
                    Envoi prévu :{" "}
                    {new Date(veille.scheduled_for).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                    {veille.status === "sent" && veille.recipients_count && (
                      <> · Envoyée à {veille.recipients_count} contacts</>
                    )}
                  </p>
                </div>

                <form action={deleteVeilleAction.bind(null, veille.id)}>
                  <button
                    type="submit"
                    title="Supprimer cette veille"
                    className="flex h-8 w-8 items-center justify-center rounded-2xl border border-zinc-200 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}