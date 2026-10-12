"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Send,
  AlertCircle,
  Plus,
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import type { PartnerSector } from "@/lib/supabase/types";

export default function PublicPartnerForm({
  sectors,
}: {
  sectors: PartnerSector[];
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdName, setCreatedName] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      sector_id: selectedSector,
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      _hp: String(formData.get("_hp") ?? "").trim(),
    };

    if (!payload.name) {
      setError("Le nom est obligatoire.");
      return;
    }

    setError(null);
    setState("loading");

    try {
      const res = await fetch("/api/partners/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement.");
        setState("idle");
        return;
      }

      setCreatedName(payload.name);
      setState("done");
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion.");
      setState("idle");
    }
  }

  /* ---------- Écran de succès ---------- */
  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-300 bg-white">
            <CheckCircle2
              className="h-6 w-6 text-emerald-700"
              strokeWidth={1.75}
            />
          </span>
          <div className="flex-1">
            <p className="text-[16px] font-bold text-emerald-900">
              Bien reçu, merci !
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-emerald-800">
              « {createdName} » a été enregistré dans notre réseau. Nous vous
              recontacterons si besoin.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            setState("idle");
            setCreatedName("");
            setSelectedSector("");
          }}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Enregistrer un autre partenaire
        </button>
      </div>
    );
  }

  /* ---------- Formulaire ---------- */
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_-20px_rgba(1,18,52,0.15)] sm:p-8"
    >
      <div className="space-y-5">
        <Input
          label="Nom du partenaire *"
          name="name"
          required
          placeholder="Ex. Guangzhou Transit Co."
        />

        {/* Secteur */}
        <div>
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Secteur d&apos;activité
          </label>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700"
          >
            <option value="">— Sélectionner un secteur —</option>
            {sectors.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="WhatsApp"
            name="whatsapp"
            placeholder="+86 195 1566 0197"
            hint="Pour vous joindre rapidement"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="contact@exemple.com"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Pays" name="country" placeholder="Chine, Bénin..." />
          <Input label="Ville" name="city" placeholder="Guangzhou, Cotonou..." />
        </div>

        <Input label="Site web" name="website" placeholder="https://..." />

        <Textarea
          label="Notes / Description"
          name="description"
          rows={3}
          placeholder="Que faites-vous ? Avec qui travaillez-vous ?"
        />

        {/* Honeypot anti-spam (invisible pour l'humain) */}
        <div className="hidden">
          <input
            type="text"
            name="_hp"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
            <AlertCircle
              className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
              strokeWidth={2}
            />
            <p className="text-[12.5px] text-red-800">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-express-600 px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60"
        >
          <Send className="h-4 w-4" strokeWidth={2} />
          {state === "loading"
            ? "Enregistrement..."
            : "Enregistrer mes informations"}
        </button>

        <p className="text-center text-[11px] text-zinc-400">
          Vos informations restent confidentielles et internes à ODA Sources.
        </p>
      </div>
    </form>
  );
}