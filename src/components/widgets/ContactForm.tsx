"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { saveLead } from "@/lib/leads";

const SERVICES = [
  { value: "sourcing", label: "Global Sourcing & Achat" },
  { value: "controle-qualite", label: "Vérification & Contrôle Qualité" },
  { value: "shipping", label: "Shipping & Logistique" },
  { value: "visa-hotel", label: "Assistance Visa & Hôtel" },
  { value: "paiement-fournisseur", label: "Paiement Fournisseur" },
  { value: "autre", label: "Autre / Je ne sais pas encore" },
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) return setError("Merci d'indiquer votre nom.");
    if (!form.email.trim() || !form.email.includes("@"))
      return setError("Merci de saisir un email valide.");
    if (!form.message.trim())
      return setError("Merci de décrire brièvement votre projet.");

    setError(null);
    setState("loading");

    const result = await saveLead({
      email: form.email,
      name: form.name,
      phone: form.phone,
      message: form.message,
      source: "contact",
      metadata: { service: form.service },
    });

    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue.");
      setState("idle");
      return;
    }
    setState("done");
  }

  if (state === "done") {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-emerald-300 bg-white">
          <CheckCircle2
            className="h-6 w-6 text-emerald-700"
            strokeWidth={1.75}
          />
        </div>
        <p className="mt-5 text-[16px] font-bold text-emerald-900">
          Message bien reçu.
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-emerald-800">
          Merci {form.name.split(" ")[0]}, nous vous répondons sous 24 heures
          ouvrées à l&apos;adresse {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(1,18,52,0.04)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Input
          label="Nom complet"
          name="name"
          placeholder="Ex. Jean Mbala"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="vous@exemple.com"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          required
        />
        <Input
          label="Téléphone / WhatsApp"
          name="phone"
          type="tel"
          placeholder="+243 81 23 45 678"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        <Select
          label="Service concerné"
          name="service"
          placeholder="Sélectionner un service"
          options={SERVICES}
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
        />
        <div className="sm:col-span-2">
          <Textarea
            label="Votre projet"
            name="message"
            rows={5}
            placeholder="Décrivez votre produit, votre volume, votre ville de livraison..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            required
          />
        </div>
      </div>

      {error && (
        <p className="mt-5 border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] font-medium text-amber-800">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-zinc-400">
          Vos informations restent confidentielles et ne sont jamais partagées.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state === "loading"}
          className="sm:min-w-[200px]"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          {state === "loading" ? "Envoi..." : "Envoyer le message"}
        </Button>
      </div>
    </form>
  );
}