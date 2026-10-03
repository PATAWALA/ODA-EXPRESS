"use client";

import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Realisation } from "@/content/realisations";

interface Props {
  items: Realisation[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  items,
  index,
  onClose,
  onNavigate,
}: Props) {
  const current = items[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft")
        onNavigate((index - 1 + items.length) % items.length);
      if (e.key === "ArrowRight")
        onNavigate((index + 1) % items.length);
    }

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/95 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Compteur */}
      <div className="absolute left-6 top-6 z-10 text-[12px] font-bold uppercase tracking-[0.2em] text-white/70">
        {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
      </div>

      {/* Bouton fermer */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10"
      >
        <X className="h-5 w-5" strokeWidth={1.75} />
      </button>

      {/* Flèche précédent */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index - 1 + items.length) % items.length);
        }}
        aria-label="Précédent"
        className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Flèche suivante */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate((index + 1) % items.length);
        }}
        aria-label="Suivant"
        className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 text-white transition hover:border-white/50 hover:bg-white/10 sm:right-8"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Média */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] max-w-[90vw]"
      >
        {current.type === "video" ? (
          <video
            src={current.src}
            controls
            autoPlay
            className="max-h-[85vh] max-w-[90vw]"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current.src}
            alt={current.title}
            className="max-h-[85vh] max-w-[90vw] object-contain"
          />
        )}

        {/* Titre en bas */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/90 to-transparent px-6 py-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-express-400">
            {current.category}
          </p>
          <p className="mt-2 text-[16px] font-bold text-white">
            {current.title}
          </p>
        </div>
      </div>
    </div>
  );
}