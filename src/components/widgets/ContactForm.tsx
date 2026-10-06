"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageCircle } from "lucide-react";
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

const WHATSAPP_NUMBER = "8619515660197";

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

  function buildWhatsAppMessage(): string {
    const serviceLabel =
      SERVICES.find((s) => s.value === form.service)?.label ?? form.service;

    const lines: (string | null)[] = [
      "Bonjour Mr ODA,",
      "",
      "Nouvelle demande depuis odasources.com :",
      "",
      `Nom : ${form.name}`,
      `Email : ${form.email}`,
      form.phone.trim() ? `Téléphone : ${form.phone}` : null,
      serviceLabel ? `Service : ${serviceLabel}` : null,
      "",
      "Projet :",
      form.message,
    ];

    return lines.filter((l): l is string => l !== null).join("\n");
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

    // 1. Sauvegarder dans Supabase + envoyer l'email admin
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

    // 2. Ouvrir WhatsApp avec le message pré-rempli
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildWhatsAppMessage(),
    )}`;
    window.open(url, "_blank");

    setState("done");
  }

  if (state === "done") {
    return (
      <div className="border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-emerald-300 bg-white">
            <CheckCircle2
              className="h-6 w-6 text-emerald-700"
              strokeWidth={1.75}
            />
          </span>
          <div>
            <p className="text-[16px] font-bold text-emerald-900">
              Demande envoyée.
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-emerald-800">
              Votre projet a bien été transmis à Mr ODA. Une fenêtre WhatsApp
              s&apos;est ouverte — cliquez sur « Envoyer » pour finaliser votre
              demande et recevoir une réponse immédiate.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            buildWhatsAppMessage(),
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded bg-emerald-600 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} />
          Rouvrir WhatsApp
        </a>

        <p className="mt-4 text-center text-[11.5px] text-emerald-700">
          Réponse sous 24 heures ouvrées · Sans engagement
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
          Après l&apos;envoi, WhatsApp s&apos;ouvre avec votre demande
          pré-remplie pour une réponse immédiate.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state === "loading"}
          className="sm:min-w-[200px]"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          {state === "loading" ? "Envoi..." : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}