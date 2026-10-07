"use client";

import { useRef, useState } from "react";
import {
  Send,
  CheckCircle2,
  MessageCircle,
  X,
  ImagePlus,
} from "lucide-react";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { saveProject, uploadProjectImage } from "@/lib/projects";

const SERVICES = [
  { value: "sourcing", label: "Global Sourcing & Achat" },
  { value: "controle-qualite", label: "Vérification & Contrôle Qualité" },
  { value: "shipping", label: "Shipping & Logistique" },
  { value: "visa-hotel", label: "Assistance Visa & Hôtel" },
  { value: "paiement-fournisseur", label: "Paiement Fournisseur" },
  { value: "autre", label: "Autre / Je ne sais pas encore" },
];

const WHATSAPP_NUMBER = "8619515660197";
const MAX_IMAGES = 3;
const MAX_SIZE_MB = 5;

interface UploadedImage {
  file: File;
  previewUrl: string;
  uploadedUrl: string | null;
  uploading: boolean;
  error: string | null;
}

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [successImages, setSuccessImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) {
      setError(`Maximum ${MAX_IMAGES} images.`);
      return;
    }

    const toAdd = files.slice(0, remaining);

    for (const file of toAdd) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`${file.name} dépasse ${MAX_SIZE_MB} Mo.`);
        return;
      }
      if (
        !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
          file.type,
        )
      ) {
        setError(
          `${file.name} n'est pas un format accepté (JPG, PNG, WebP, GIF).`,
        );
        return;
      }
    }

    setError(null);

    const newImages: UploadedImage[] = toAdd.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      uploadedUrl: null,
      uploading: true,
      error: null,
    }));

    setImages((prev) => [...prev, ...newImages]);

    newImages.forEach(async (img) => {
      const result = await uploadProjectImage(img.file);
      setImages((prev) =>
        prev.map((item) =>
          item.previewUrl === img.previewUrl
            ? {
                ...item,
                uploading: false,
                uploadedUrl: result.ok ? result.url ?? null : null,
                error: result.ok ? null : result.error ?? "Erreur d'upload.",
              }
            : item,
        ),
      );
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(previewUrl: string) {
    setImages((prev) => {
      const item = prev.find((i) => i.previewUrl === previewUrl);
      if (item) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.previewUrl !== previewUrl);
    });
  }

  function buildWhatsAppMessage(imageUrls: string[] = []): string {
    const serviceLabel =
      SERVICES.find((s) => s.value === form.service)?.label ?? form.service;

    const lines: (string | null)[] = [
      "Bonjour ODA SOURCES,",
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

    if (imageUrls.length > 0) {
      lines.push("");
      lines.push(`Photos du projet (${imageUrls.length}) :`);
      imageUrls.forEach((url, i) => {
        lines.push(`${i + 1}. ${url}`);
      });
    }

    return lines.filter((l): l is string => l !== null).join("\n");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) return setError("Merci d'indiquer votre nom.");
    if (!form.email.trim() || !form.email.includes("@"))
      return setError("Merci de saisir un email valide.");
    if (!form.message.trim())
      return setError("Merci de décrire brièvement votre projet.");

    const stillUploading = images.some((i) => i.uploading);
    if (stillUploading) {
      setError("Veuillez patienter pendant l'upload des images.");
      return;
    }

    const failedUploads = images.filter((i) => !i.uploadedUrl);
    if (failedUploads.length > 0) {
      setError(
        "Certaines images n'ont pas pu être envoyées. Réessayez ou retirez-les.",
      );
      return;
    }

    setError(null);
    setState("loading");

    const imageUrls = images
      .map((i) => i.uploadedUrl)
      .filter((u): u is string => u !== null);

    const result = await saveProject({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      message: form.message,
      images: imageUrls,
    });

    if (!result.ok) {
      setError(result.error ?? "Une erreur est survenue.");
      setState("idle");
      return;
    }

    setSuccessImages(imageUrls);

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      buildWhatsAppMessage(imageUrls),
    )}`;
    window.open(url, "_blank");

    setState("done");
  }

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
          <div>
            <p className="text-[16px] font-bold text-emerald-900">
              Demande envoyée.
            </p>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-emerald-800">
              Votre projet a bien été transmis à notre équipe.
              {successImages.length > 0 &&
                ` ${successImages.length} photo${
                  successImages.length > 1 ? "s" : ""
                } ${successImages.length > 1 ? "ont" : "a"} été enregistrée${
                  successImages.length > 1 ? "s" : ""
                }.`}{" "}
              Une fenêtre WhatsApp s&apos;est ouverte — cliquez sur « Envoyer »
              pour finaliser votre demande.
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            buildWhatsAppMessage(successImages),
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-emerald-700"
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
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(1,18,52,0.04)] sm:p-8"
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

        <div className="sm:col-span-2">
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Photos du produit{" "}
            <span className="font-medium normal-case tracking-normal text-zinc-400">
              (optionnel · {MAX_IMAGES} max)
            </span>
          </label>

          <p className="mb-3 text-[11.5px] leading-relaxed text-zinc-500">
            Ajoutez 1 à {MAX_IMAGES} photos d&apos;exemple du produit que vous
            recherchez. Formats acceptés : JPG, PNG, WebP, GIF ({MAX_SIZE_MB} Mo
            max par image).
          </p>

          {images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-3">
              {images.map((img) => (
                <div
                  key={img.previewUrl}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt="Aperçu"
                    className="h-full w-full object-cover"
                  />

                  {img.uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                        Envoi...
                      </span>
                    </div>
                  )}

                  {img.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-950/60 p-2">
                      <span className="text-center text-[10px] font-bold leading-tight text-white">
                        Échec
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(img.previewUrl)}
                    aria-label="Retirer l'image"
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-2xl bg-white/95 text-zinc-600 shadow-md backdrop-blur transition hover:bg-white hover:text-red-600"
                  >
                    <X className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </button>

                  {!img.uploading && !img.error && (
                    <div className="absolute bottom-1.5 left-1.5 flex h-5 w-5 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {images.length < MAX_IMAGES && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 px-4 py-6 text-[12px] font-bold uppercase tracking-[0.1em] text-zinc-500 transition hover:border-navy-700 hover:bg-navy-50/50 hover:text-navy-900"
            >
              <ImagePlus className="h-4 w-4" strokeWidth={2} />
              Ajouter une photo
              {images.length > 0 && (
                <span className="text-zinc-400">
                  ({images.length}/{MAX_IMAGES})
                </span>
              )}
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            multiple
            onChange={onFilesChange}
            className="hidden"
          />
        </div>
      </div>

      {error && (
        <p className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-[12.5px] font-medium text-amber-800">
          {error}
        </p>
      )}

      <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] leading-relaxed text-zinc-400">
          Après l&apos;envoi, WhatsApp s&apos;ouvre avec votre demande
          pré-remplie
          {images.length > 0 && " et les liens vers vos photos"}.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={state === "loading" || images.some((i) => i.uploading)}
          className="sm:min-w-[200px]"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2} />
          {state === "loading" ? "Envoi..." : "Envoyer ma demande"}
        </Button>
      </div>
    </form>
  );
}