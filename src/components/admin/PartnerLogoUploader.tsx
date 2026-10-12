"use client";

import { useRef, useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
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
    if (result?.url) setUrl(result.url);
    setUploading(false);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function remove() {
    setUrl("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      {label && (
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </span>
      )}

      <input type="hidden" name={name} value={url} />

      {url ? (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt="Logo"
                className="h-full w-full object-contain p-2"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12.5px] font-semibold text-navy-900">
                Logo ajouté
              </p>
              <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                {url.split("/").pop()}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="rounded-2xl border border-zinc-200 bg-white px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-zinc-600 transition hover:border-navy-300 hover:text-navy-900"
              >
                Remplacer
              </button>
              <button
                type="button"
                onClick={remove}
                title="Retirer le logo"
                className="flex h-8 w-8 items-center justify-center rounded-2xl border border-zinc-200 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-200 bg-white px-4 py-6 text-center transition hover:border-navy-300 hover:bg-zinc-50/60"
        >
          {uploading ? (
            <>
              <Loader2
                className="h-5 w-5 animate-spin text-navy-700"
                strokeWidth={1.75}
              />
              <p className="mt-2 text-[12px] font-semibold text-navy-900">
                Upload en cours...
              </p>
            </>
          ) : (
            <>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-navy-900">
                <Upload className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <p className="mt-3 text-[12.5px] font-bold text-navy-900">
                Cliquez ou glissez un logo
              </p>
              <p className="mt-1 text-[11px] text-zinc-500">
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
        <p className="mt-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-[11.5px] text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}