"use client";

import { useRef, useState } from "react";
import {
  CheckCircle2,
  Send,
  AlertCircle,
  Plus,
  X,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import type { PartnerSector } from "@/lib/supabase/types";

interface UploadedImage {
  localId: string;
  previewUrl: string;
  uploadedUrl: string | null;
  uploading: boolean;
  error: string | null;
}

export default function PublicPartnerForm({
  sectors,
}: {
  sectors: PartnerSector[];
}) {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);
  const [createdName, setCreatedName] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [globalImageError, setGlobalImageError] = useState<string | null>(
    null,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  /* ---------- Gestion des images ---------- */

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    // Validation
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setGlobalImageError(`${file.name} dépasse 5 Mo.`);
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setGlobalImageError(
          `${file.name} : format non accepté (JPG, PNG, WebP).`,
        );
        return;
      }
    }

    setGlobalImageError(null);

    const newImages: UploadedImage[] = files.map((file) => ({
      localId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      previewUrl: URL.createObjectURL(file),
      uploadedUrl: null,
      uploading: true,
      error: null,
    }));

    setImages((prev) => [...prev, ...newImages]);

    newImages.forEach(async (img, index) => {
      const file = files[index];
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/partners/upload-product", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        setImages((prev) =>
          prev.map((item) =>
            item.localId === img.localId
              ? {
                  ...item,
                  uploading: false,
                  uploadedUrl: data.url ?? null,
                  error: data.ok ? null : (data.error ?? "Erreur upload"),
                }
              : item,
          ),
        );
      } catch {
        setImages((prev) =>
          prev.map((item) =>
            item.localId === img.localId
              ? { ...item, uploading: false, error: "Erreur réseau" }
              : item,
          ),
        );
      }
    });

    if (inputRef.current) inputRef.current.value = "";
  }

  function removeImage(localId: string) {
    setImages((prev) => {
      const img = prev.find((i) => i.localId === localId);
      if (img) URL.revokeObjectURL(img.previewUrl);
      return prev.filter((i) => i.localId !== localId);
    });
  }

  /* ---------- Submit ---------- */

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Bloquer si des images sont en cours d'upload
    if (images.some((i) => i.uploading)) {
      setError("Veuillez patienter pendant l'upload des images.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const productImages = images
      .map((i) => i.uploadedUrl)
      .filter((u): u is string => u !== null);

    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      sector_id: selectedSector,
      contact_name: String(formData.get("contact_name") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      country: String(formData.get("country") ?? "").trim(),
      city: String(formData.get("city") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim(),
      product_images: productImages,
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
    } catch {
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
            setImages([]);
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

        <Input
          label="Nom du contact"
          name="contact_name"
          placeholder="Ex. M. Zhang Wei"
          hint="Interlocuteur principal chez ce partenaire"
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
          {sectors.length === 0 && (
            <p className="mt-2 text-[11.5px] text-zinc-500">
              Aucun secteur disponible pour l&apos;instant.
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="WhatsApp"
            name="whatsapp"
            placeholder="+86 195 1566 0197"
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

        {/* Uploader photos produits */}
        <div className="border-t border-zinc-100 pt-5">
          <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
            Photos produits{" "}
            <span className="font-medium normal-case tracking-normal text-zinc-400">
              (optionnel · illimité)
            </span>
          </label>
          <p className="mb-3 text-[11.5px] leading-relaxed text-zinc-500">
            Ajoutez des photos de vos produits. JPG, PNG, WebP · 5 Mo max par
            image.
          </p>

          {images.length > 0 && (
            <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.localId}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.previewUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />

                  {img.uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                      <Loader2
                        className="h-4 w-4 animate-spin text-white"
                        strokeWidth={2}
                      />
                    </div>
                  )}

                  {img.error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-red-950/60 p-1">
                      <span className="text-center text-[9px] font-bold text-white">
                        Échec
                      </span>
                    </div>
                  )}

                  {!img.uploading && !img.error && (
                    <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                      <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeImage(img.localId)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-2xl bg-white/95 text-zinc-600 shadow-md backdrop-blur transition hover:bg-white hover:text-red-600"
                    aria-label="Retirer"
                  >
                    <X className="h-3 w-3" strokeWidth={2.5} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 px-4 py-4 text-[11.5px] font-bold uppercase tracking-[0.1em] text-zinc-500 transition hover:border-navy-700 hover:bg-navy-50/50 hover:text-navy-900"
          >
            <ImagePlus className="h-4 w-4" strokeWidth={2} />
            Ajouter des photos produits
            {images.length > 0 && (
              <span className="text-zinc-400">({images.length})</span>
            )}
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={onFilesChange}
            className="hidden"
          />

          {globalImageError && (
            <p className="mt-2 text-[11px] text-red-700">
              {globalImageError}
            </p>
          )}
        </div>

        {/* Honeypot */}
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
          disabled={state === "loading" || images.some((i) => i.uploading)}
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