"use client";

import { useRef, useState } from "react";
import {
  ImagePlus,
  X,
  Loader2,
  CheckCircle2,
  FileText,
  FileSpreadsheet,
  File,
  Film,
  Archive,
  Presentation,
} from "lucide-react";
import { uploadPartnerProductImageAction } from "@/app/admin/actions";

interface UploadedFile {
  localId: string;
  previewUrl: string;
  uploadedUrl: string | null;
  uploading: boolean;
  error: string | null;
  fileName: string;
  fileType: string;
}

interface PartnerProductsUploaderProps {
  onUploaded?: (url: string) => void;
  label?: string;
  hint?: string;
  maxFiles?: number;
}

// Types de fichiers par extension
function getFileKind(fileName: string): {
  kind: "image" | "pdf" | "doc" | "excel" | "ppt" | "video" | "zip" | "other";
  color: string;
} {
  const ext = fileName.split(".").pop()?.toLowerCase() ?? "";

  if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
    return { kind: "image", color: "text-navy-700" };
  }
  if (ext === "pdf") return { kind: "pdf", color: "text-red-600" };
  if (["doc", "docx"].includes(ext)) {
    return { kind: "doc", color: "text-blue-600" };
  }
  if (["xls", "xlsx"].includes(ext)) {
    return { kind: "excel", color: "text-emerald-600" };
  }
  if (["ppt", "pptx"].includes(ext)) {
    return { kind: "ppt", color: "text-orange-600" };
  }
  if (["mp4", "webm", "mov"].includes(ext)) {
    return { kind: "video", color: "text-purple-600" };
  }
  if (ext === "zip") return { kind: "zip", color: "text-zinc-600" };

  return { kind: "other", color: "text-zinc-500" };
}

function FileIcon({ fileName }: { fileName: string }) {
  const { kind, color } = getFileKind(fileName);
  const cls = `h-6 w-6 ${color}`;

  switch (kind) {
    case "pdf":
      return <FileText className={cls} strokeWidth={1.75} />;
    case "doc":
      return <FileText className={cls} strokeWidth={1.75} />;
    case "excel":
      return <FileSpreadsheet className={cls} strokeWidth={1.75} />;
    case "ppt":
      return <Presentation className={cls} strokeWidth={1.75} />;
    case "video":
      return <Film className={cls} strokeWidth={1.75} />;
    case "zip":
      return <Archive className={cls} strokeWidth={1.75} />;
    default:
      return <File className={cls} strokeWidth={1.75} />;
  }
}

export default function PartnerProductsUploader({
  onUploaded,
  label = "Fichiers produits",
  hint = "Images, PDF, Word, Excel, PowerPoint, ZIP, vidéo · Formats illimités",
  maxFiles,
}: PartnerProductsUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    let toAdd = selected;
    if (maxFiles !== undefined) {
      const remaining = maxFiles - files.length;
      if (remaining <= 0) {
        setGlobalError(`Maximum ${maxFiles} fichiers.`);
        return;
      }
      toAdd = selected.slice(0, remaining);
    }

    setGlobalError(null);

    const newFiles: UploadedFile[] = toAdd.map((file) => ({
      localId: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      previewUrl: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : "",
      uploadedUrl: null,
      uploading: true,
      error: null,
      fileName: file.name,
      fileType: file.type,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    newFiles.forEach(async (fileItem, index) => {
      const file = toAdd[index];
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadPartnerProductImageAction(formData);

      const isSuccess =
        !!result &&
        typeof result === "object" &&
        "success" in result &&
        "url" in result &&
        typeof result.url === "string" &&
        result.url.length > 0;

      const uploadedUrl = isSuccess ? result.url : null;

      let errorMessage: string | null = null;
      if (!isSuccess) {
        if (
          result &&
          typeof result === "object" &&
          "error" in result &&
          typeof result.error === "string"
        ) {
          errorMessage = result.error;
        } else {
          errorMessage = "Erreur upload";
        }
      }

      setFiles((prev) =>
        prev.map((item) =>
          item.localId === fileItem.localId
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

  function removeFile(localId: string) {
    setFiles((prev) => {
      const f = prev.find((i) => i.localId === localId);
      if (f && f.previewUrl) URL.revokeObjectURL(f.previewUrl);
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

      {files.length > 0 && (
        <div className="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {files.map((item) => (
            <div
              key={item.localId}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white"
            >
              {/* Aperçu : image ou icône */}
              {item.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-2 text-center">
                  <FileIcon fileName={item.fileName} />
                  <p className="line-clamp-2 break-all text-[9.5px] font-semibold leading-tight text-zinc-600">
                    {item.fileName}
                  </p>
                </div>
              )}

              {/* Overlay upload */}
              {item.uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-navy-950/50">
                  <Loader2
                    className="h-5 w-5 animate-spin text-white"
                    strokeWidth={2}
                  />
                </div>
              )}

              {/* Overlay erreur */}
              {item.error && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-950/70 p-1">
                  <span className="text-center text-[9px] font-bold leading-tight text-white">
                    Échec
                  </span>
                </div>
              )}

              {/* Check de succès */}
              {!item.uploading && !item.error && (
                <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                </div>
              )}

              {/* Bouton retirer */}
              <button
                type="button"
                onClick={() => removeFile(item.localId)}
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
        Ajouter des fichiers
        {files.length > 0 && (
          <span className="text-zinc-400">({files.length})</span>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,video/mp4,video/webm,video/quicktime,application/zip"
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