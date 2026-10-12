"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2, CheckCircle2, ImageIcon } from "lucide-react";
import { uploadPartnerLogoAction } from "@/app/admin/actions";

interface PartnerLogoUploaderProps {
  name: string;
  defaultValue?: string;
  label?: string;
}

export default function PartnerLogoUploader({
  name,
  defaultValue = "",
  label = "Logo",
}: PartnerLogoUploaderProps) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadPartnerLogoAction(formData);

    if (result?.error) {
      setError(result.error);
      setUploading(false);
      return;
    }

    if (result?.url) {
      setUrl(result.url);
    }
    setUploading(false);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function remove() {
    setUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="w-full">
      {label && (
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </span>
      )}

      <input type="hidden" name={name} value={url} />

      {url ? (
        /* ---------- APERÇU (logo ajouté) ---------- */
        <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {/* Zone d'aperçu */}
          <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
            {/* Vignette logo */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 sm:h-16 sm:w-16">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Logo"
                className="h-full w-full object-contain p-1.5 sm:p-2"
              />
              {/* Badge vert "OK" */}
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-600 text-white shadow-md sm:h-6 sm:w-6">
                <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
              </div>
            </div>

            {/* Infos texte */}
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-bold text-navy-900 sm:text-[13px]">
                Logo ajouté
              </p>
              <p className="mt-0.5 truncate text-[10.5px] text-zinc-500 sm:text-[11px]">
                {url.split("/").pop()}
              </p>
            </div>
          </div>

          {/* Boutons actions */}
          <div className="flex flex-col gap-2 border-t border-zinc-100 p-3 sm:flex-row sm:items-center sm:justify-end sm:gap-2 sm:p-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-300 hover:bg-zinc-50 disabled:opacity-60 sm:w-auto sm:py-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                  Envoi...
                </>
              ) : (
                <>
                  <ImageIcon className="h-3.5 w-3.5" strokeWidth={2} />
                  Remplacer
                </>
              )}
            </button>
            <button
              type="button"
              onClick={remove}
              disabled={uploading}
              title="Retirer le logo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60 sm:w-auto sm:py-2"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Retirer
            </button>
          </div>
        </div>
      ) : (
        /* ---------- ZONE DE DÉPÔT (pas de logo) ---------- */
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={
            "flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-3 py-6 text-center transition sm:px-6 sm:py-8 " +
            (dragging
              ? "border-navy-700 bg-navy-50/40"
              : "border-zinc-200 bg-white hover:border-navy-300 hover:bg-zinc-50/60")
          }
        >
          {uploading ? (
            <>
              <Loader2
                className="h-5 w-5 animate-spin text-navy-700 sm:h-6 sm:w-6"
                strokeWidth={1.75}
              />
              <p className="mt-2 text-[12.5px] font-semibold text-navy-900 sm:mt-3 sm:text-[13px]">
                Upload en cours...
              </p>
            </>
          ) : (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-navy-900 sm:h-12 sm:w-12">
                <Upload className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.75} />
              </span>
              <p className="mt-3 text-[12.5px] font-bold text-navy-900 sm:mt-4 sm:text-[13px]">
                Cliquez ou glissez un logo
              </p>
              <p className="mt-1 max-w-[240px] text-[10.5px] leading-relaxed text-zinc-500 sm:max-w-none sm:text-[11.5px]">
                JPG, PNG, WebP ou SVG · 5 Mo max
              </p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/svg+xml"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <p className="mt-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700 sm:text-[11.5px]">
          {error}
        </p>
      )}
    </div>
  );
}