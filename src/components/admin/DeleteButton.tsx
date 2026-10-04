"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

interface DeleteButtonProps {
  action: () => Promise<void>;
  title?: string;
  label?: string;
}

export default function DeleteButton({
  action,
  title,
  label = "Supprimer",
}: DeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);
    try {
      await action();
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title={label}
        className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
      </button>

      <ConfirmDialog
        open={open}
        onClose={() => !loading && setOpen(false)}
        onConfirm={handleConfirm}
        title="Supprimer cet élément ?"
        message={
          title
            ? `« ${title} » sera définitivement supprimé. Cette action ne peut pas être annulée.`
            : "Cet élément sera définitivement supprimé. Cette action ne peut pas être annulée."
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        loading={loading}
      />
    </>
  );
}