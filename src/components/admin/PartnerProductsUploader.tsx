"use client";

import { useRef, useState } from "react";
import { ImagePlus, X, Loader2, CheckCircle2 } from "lucide-react";
import { uploadPartnerProductImageAction } from "@/app/admin/actions";

interface UploadedImage {
  localId: string;
  previewUrl: string;
  uploadedUrl: string | null;
  uploading: boolean;
  error: string | null;
}

interface PartnerProductsUploaderProps {
  onUploaded?: (url: string) => void;
  label?: string;
  hint?: string;
  maxFiles?: number;
}

const MAX_SIZE_MB = 5;

export default function PartnerProductsUploader({
  onUploaded,
  label = "Photos produits",
  hint = "JPG, PNG, WebP · 5 Mo max par image · Illimité",
  maxFiles,
}: PartnerProductsUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

    function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    let toAdd = files;
    if (maxFiles !== undefined) {
      const remaining = maxFiles - images.length;
      if (remaining <= 0) {
        setGlobalError(`Maximum ${maxFiles} images.`);
        return;
      }
      toAdd = files.slice(0, remaining);
    }

    // Validation
    for (const file of toAdd) {
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setGlobalError(`${file.name} dépasse ${MAX_SIZE_MB} Mo.`);
        return;
      }
      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setGlobalError(`${file.name} : format non accepté (JPG, PNG, WebP).`);
        return;
      }
    }

    setGlobalError(null);

    const newImages: UploadedImage[] = toAdd.map((file) => ({
      localId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      previewUrl: URL.createObjectURL(file),
      uploadedUrl: null,
      uploading: true,
      error: null,
    }));

    setImages((prev) => [...prev, ...newImages]);

    newImages.forEach(async (img, index) => {
      const file = toAdd[index];
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPartnerProductImageAction(formData);

      // Détection succès : { success: string, url: string }
      const isSuccess =
        !!result &&
        typeof result === "object" &&
        "success" in result &&
        "url" in result &&
        typeof result.url === "string" &&
        result.url.length > 0;

      const uploadedUrl = isSuccess ? result.url : null;

      // Message d'erreur safe
      let errorMessage: string | null = null;
      if (!isSuccess) {
        if (result && typeof result === "object" && "error" in result && typeof result.error === "string") {
          errorMessage = result.error;
        } else {
          errorMessage = "Erreur upload";
        }
      }

      setImages((prev) =>
        prev.map((item) =>
          item.localId === img.localId
            ? {
                ...item,
                uploading: false,
                uploadedUrl,
                error: errorMessage,
              }
            : item,
        ),
      );

      if (isSuccess && uploadedUrl && onUploaded) {
        onUploaded(uploadedUrl);
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

  return (
    <div>
      {label && (
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </span>
      )}

      {hint && (
        <p className="mb-3 text-[11.5px] leading-relaxed text-zinc-500">
          {hint}
        </p>
      )}

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
                    className="h-5 w-5 animate-spin text-white"
                    strokeWidth={2}
                  />
                </div>
              )}

              {img.error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-950/60 p-1">
                  <span className="text-center text-[9px] font-bold leading-tight text-white">
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
                aria-label="Retirer"
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-2xl bg-white/95 text-zinc-600 shadow-md backdrop-blur transition hover:bg-white hover:text-red-600"
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
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50/50 px-4 py-5 text-[12px] font-bold uppercase tracking-[0.1em] text-zinc-500 transition hover:border-navy-700 hover:bg-navy-50/50 hover:text-navy-900"
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

      {globalError && (
        <p className="mt-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11.5px] text-red-700">
          {globalError}
        </p>
      )}
    </div>
  );
}