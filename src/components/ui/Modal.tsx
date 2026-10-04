"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showClose?: boolean;
}

export function Modal({
  open,
  onClose,
  children,
  className,
  showClose = true,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/85 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative w-full max-w-md rounded-t-2xl border border-zinc-200 bg-white shadow-2xl sm:rounded-2xl",
          className,
        )}
      >
        {showClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center text-zinc-400 transition hover:text-navy-900"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}