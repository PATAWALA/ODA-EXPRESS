"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  loading?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = "Confirmer l'action",
  message = "Cette action est irréversible.",
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
  variant = "danger",
  loading = false,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && !loading) onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose, loading]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 px-4 backdrop-blur-sm"
      onClick={() => !loading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md border border-zinc-200 bg-white shadow-2xl"
      >
        {/* En-tête */}
        <div className="flex items-start gap-4 border-b border-zinc-200 px-6 py-5">
          <span
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center",
              variant === "danger"
                ? "bg-red-50 text-red-600"
                : "bg-zinc-100 text-navy-900",
            )}
          >
            <AlertTriangle className="h-5 w-5" strokeWidth={1.75} />
          </span>

          <div className="min-w-0 flex-1 pt-0.5">
            <p className="text-[15px] font-bold tracking-tight text-navy-900">
              {title}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-600">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 shrink-0 items-center justify-center text-zinc-400 transition hover:text-navy-900 disabled:opacity-40"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="inline-flex items-center justify-center border border-zinc-200 bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50 disabled:opacity-60"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={cn(
              "inline-flex items-center justify-center px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition disabled:opacity-60",
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-navy-900 hover:bg-navy-800",
            )}
          >
            {loading ? "Suppression..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}