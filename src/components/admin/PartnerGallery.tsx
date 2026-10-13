"use client";

import { useState } from "react";
import {
  Trash2,
  X,
  ImageIcon,
  FileText,
  FileSpreadsheet,
  File,
  Film,
  Archive,
  Presentation,
  Download,
  ExternalLink,
} from "lucide-react";
import { deletePartnerProductAction } from "@/app/admin/actions";
import type { PartnerProduct } from "@/lib/supabase/types";

interface PartnerGalleryProps {
  partnerId: string;
  products: PartnerProduct[];
  editable?: boolean;
}

/* ---------- Détection du type ---------- */

function getFileInfo(url: string) {
  const clean = url.split("?")[0];
  const ext = clean.split(".").pop()?.toLowerCase() ?? "";

  if (["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
    return { kind: "image" as const, ext, color: "text-navy-700" };
  }
  if (ext === "pdf")
    return { kind: "pdf" as const, ext, color: "text-red-600" };
  if (["doc", "docx"].includes(ext))
    return { kind: "doc" as const, ext, color: "text-blue-600" };
  if (["xls", "xlsx"].includes(ext))
    return { kind: "excel" as const, ext, color: "text-emerald-600" };
  if (["ppt", "pptx"].includes(ext))
    return { kind: "ppt" as const, ext, color: "text-orange-600" };
  if (["mp4", "webm", "mov"].includes(ext))
    return { kind: "video" as const, ext, color: "text-purple-600" };
  if (ext === "zip")
    return { kind: "zip" as const, ext, color: "text-zinc-600" };

  return { kind: "other" as const, ext, color: "text-zinc-500" };
}

function FileIcon({ kind, color }: { kind: string; color: string }) {
  const cls = `h-8 w-8 ${color}`;
  switch (kind) {
    case "pdf":
    case "doc":
      return <FileText className={cls} strokeWidth={1.5} />;
    case "excel":
      return <FileSpreadsheet className={cls} strokeWidth={1.5} />;
    case "ppt":
      return <Presentation className={cls} strokeWidth={1.5} />;
    case "video":
      return <Film className={cls} strokeWidth={1.5} />;
    case "zip":
      return <Archive className={cls} strokeWidth={1.5} />;
    default:
      return <File className={cls} strokeWidth={1.5} />;
  }
}

/* ---------- Composant principal ---------- */

export default function PartnerGallery({
  partnerId,
  products,
  editable = true,
}: PartnerGalleryProps) {
  const [items, setItems] = useState(products);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(productId: string) {
    if (!confirm("Supprimer ce fichier ?")) return;

    setDeleting(productId);
    const result = await deletePartnerProductAction(productId, partnerId);
    setDeleting(null);

    if (result?.error) {
      alert(result.error);
      return;
    }

    setItems((prev) => prev.filter((p) => p.id !== productId));
    if (lightbox !== null) setLightbox(null);
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-12 text-center">
        <ImageIcon
          className="mx-auto h-6 w-6 text-zinc-300"
          strokeWidth={1.5}
        />
        <p className="mt-3 text-[13px] font-semibold text-navy-900">
          Aucun fichier produit
        </p>
        <p className="mt-1 text-[11.5px] text-zinc-500">
          Ajoutez des photos, PDF, vidéos ou documents pour illustrer ce que
          propose ce partenaire.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((item, index) => {
          const info = getFileInfo(item.image_url);
          const isImage = info.kind === "image";
          const fileName = item.image_url.split("/").pop() ?? "";

          return (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-navy-300"
            >
              {/* Contenu : image ou icône */}
              {isImage ? (
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  className="block h-full w-full"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.title ?? "Produit"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </button>
              ) : (
                <a
                  href={item.image_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center gap-2 p-2 text-center"
                >
                  <FileIcon kind={info.kind} color={info.color} />
                  <p className="line-clamp-2 break-all text-[9.5px] font-semibold leading-tight text-zinc-600">
                    {fileName}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.08em] text-navy-700">
                    <ExternalLink className="h-2.5 w-2.5" strokeWidth={2.5} />
                    Ouvrir
                  </span>
                </a>
              )}

              {/* Bouton supprimer */}
              {editable && (
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-2xl bg-white/95 text-zinc-500 opacity-0 shadow-md backdrop-blur transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                  title="Supprimer"
                >
                  {deleting === item.id ? (
                    <span className="text-[9px] font-bold">...</span>
                  ) : (
                    <Trash2 className="h-3 w-3" strokeWidth={2} />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Lightbox images */}
      {lightbox !== null && items[lightbox] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>

          <a
            href={items[lightbox].image_url}
            download
            onClick={(e) => e.stopPropagation()}
            className="absolute left-4 top-4 z-10 flex h-11 items-center gap-2 rounded-2xl border border-white/20 px-4 text-white transition hover:border-white/50 hover:bg-white/10 sm:left-6 sm:top-6"
          >
            <Download className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
              Télécharger
            </span>
          </a>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-[90vw]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={items[lightbox].image_url}
              alt={items[lightbox].title ?? "Produit"}
              className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}