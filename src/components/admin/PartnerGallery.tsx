"use client";

import { useState } from "react";
import { Trash2, X, ImageIcon } from "lucide-react";
import { deletePartnerProductAction } from "@/app/admin/actions";
import type { PartnerProduct } from "@/lib/supabase/types";

interface PartnerGalleryProps {
  partnerId: string;
  products: PartnerProduct[];
  editable?: boolean;
}

export default function PartnerGallery({
  partnerId,
  products,
  editable = true,
}: PartnerGalleryProps) {
  const [items, setItems] = useState(products);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(productId: string) {
    if (!confirm("Supprimer cette image ?")) return;

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
          Aucune photo produit
        </p>
        <p className="mt-1 text-[11.5px] text-zinc-500">
          Ajoutez des photos pour illustrer ce que propose ce partenaire.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {items.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setLightbox(index)}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url}
              alt={product.title ?? "Produit"}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            {editable && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    handleDelete(product.id);
                  }
                }}
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-2xl bg-white/95 text-zinc-500 opacity-0 shadow-md backdrop-blur transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-600"
                title="Supprimer"
              >
                {deleting === product.id ? (
                  <span className="text-[9px] font-bold">...</span>
                ) : (
                  <Trash2 className="h-3 w-3" strokeWidth={2} />
                )}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
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