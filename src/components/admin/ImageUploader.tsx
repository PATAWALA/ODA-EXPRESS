"use client";

import { useRef, useState } from "react";
import { Upload, X, Check, AlertCircle, Loader2 } from "lucide-react";
import { uploadImageAction } from "@/app/admin/actions";

interface ImageUploaderProps {
  name: string;
  label?: string;
  folder?: string;
  defaultValue?: string;
  hint?: string;
}

export default function ImageUploader({
  name,
  label = "Image",
  folder = "general",
  defaultValue = "",
  hint,
}: ImageUploaderProps) {
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
    formData.append("folder", folder);

    const result = await uploadImageAction(formData);

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
    <div>
      {label && (
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
          {label}
        </span>
      )}

      {/* Input caché qui envoie vraiment la valeur */}
      <input type="hidden" name={name} value={url} />

      {url ? (
        // Aperçu si image déjà définie
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Aperçu"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-zinc-200 px-4 py-3">
            <div className="flex min-w-0 items-center gap-2">
              <Check
                className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                strokeWidth={2.5}
              />
              <p className="truncate text-[11.5px] text-zinc-500">
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
                title="Retirer l'image"
                className="flex h-8 w-8 items-center justify-center rounded-2xl border border-zinc-200 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Zone de dépôt
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={
            "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-white px-6 py-10 text-center transition " +
            (dragging
              ? "border-navy-700 bg-navy-50/40"
              : "border-zinc-200 hover:border-navy-300 hover:bg-zinc-50/60")
          }
        >
          {uploading ? (
            <>
              <Loader2
                className="h-6 w-6 animate-spin text-navy-700"
                strokeWidth={1.75}
              />
              <p className="mt-3 text-[13px] font-semibold text-navy-900">
                Upload en cours...
              </p>
            </>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-navy-900">
                <Upload className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <p className="mt-4 text-[13px] font-bold text-navy-900">
                Cliquez ou glissez une image
              </p>
              <p className="mt-1 text-[11.5px] text-zinc-500">
                JPG, PNG, WebP ou GIF · 5 Mo max
              </p>
            </>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
          <AlertCircle
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600"
            strokeWidth={2}
          />
          <p className="text-[11.5px] text-red-800">{error}</p>
        </div>
      )}

      {hint && <p className="mt-2 text-[11px] text-zinc-400">{hint}</p>}
    </div>
  );
}