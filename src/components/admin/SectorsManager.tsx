"use client";

import { useEffect, useState } from "react";
import {
  X,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Building2,
  Pencil,
} from "lucide-react";
import {
  createPartnerSectorAction,
  deletePartnerSectorAction,
  updatePartnerSectorAction,
} from "@/app/admin/actions";
import type { PartnerSector } from "@/lib/supabase/types";

interface SectorWithCount extends PartnerSector {
  partners_count: number;
}

interface SectorsManagerProps {
  open: boolean;
  onClose: () => void;
  sectors: SectorWithCount[];
  onChanged: () => void;
}

export default function SectorsManager({
  open,
  onClose,
  sectors: initialSectors,
  onChanged,
}: SectorsManagerProps) {
  const [sectors, setSectors] = useState(initialSectors);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setSectors(initialSectors);
      setNewName("");
      setError(null);
      setEditingId(null);
    }
  }, [open, initialSectors]);

  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onClose]);

  async function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    setCreating(true);
    setError(null);

    const fd = new FormData();
    fd.append("name", name);
    const result = await createPartnerSectorAction(fd);

    if (result?.error) {
      setError(result.error);
      setCreating(false);
      return;
    }

    if (result?.sector) {
      setSectors((prev) =>
        [...prev, { ...result.sector!, partners_count: 0 }].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );
    }
    setNewName("");
    setCreating(false);
    onChanged();
  }

  async function handleRename(id: string) {
    const name = editingName.trim();
    if (!name) return;
    setBusyId(id);
    setError(null);

    const fd = new FormData();
    fd.append("name", name);
    const result = await updatePartnerSectorAction(id, fd);

    if (result?.error) {
      setError(result.error);
      setBusyId(null);
      return;
    }

    setSectors((prev) =>
      prev
        .map((s) => (s.id === id ? { ...s, name } : s))
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
    setEditingId(null);
    setEditingName("");
    setBusyId(null);
    onChanged();
  }

  async function handleDelete(sector: SectorWithCount) {
    if (sector.partners_count > 0) {
      setError(
        `Impossible de supprimer « ${sector.name} » : ${sector.partners_count} partenaire${
          sector.partners_count > 1 ? "s y sont associés" : " y est associé"
        }. Réassignez-les d'abord.`,
      );
      return;
    }
    if (!confirm(`Supprimer définitivement le secteur « ${sector.name} » ?`))
      return;

    setBusyId(sector.id);
    setError(null);
    const result = await deletePartnerSectorAction(sector.id);
    if (result?.error) {
      setError(result.error);
      setBusyId(null);
      return;
    }
    setSectors((prev) => prev.filter((s) => s.id !== sector.id));
    setBusyId(null);
    onChanged();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 px-4 py-8 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[15px] font-bold tracking-tight text-navy-900">
                Gérer les secteurs
              </p>
              <p className="mt-0.5 text-[11.5px] text-zinc-500">
                {sectors.length} secteur{sectors.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Contenu */}
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto p-6">
          {/* Ajout rapide */}
          <div className="mb-5">
            <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
              Ajouter un nouveau secteur
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreate();
                  }
                }}
                placeholder="Ex. Juridique, Immigration..."
                className="flex-1 rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-[13px] text-navy-900 outline-none transition focus:border-navy-700"
              />
              <button
                type="button"
                onClick={handleCreate}
                disabled={creating || !newName.trim()}
                className="inline-flex items-center gap-1 rounded-2xl bg-navy-900 px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy-800 disabled:opacity-50"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
                Ajouter
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-3 py-2">
              <AlertCircle
                className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-600"
                strokeWidth={2}
              />
              <p className="text-[11.5px] text-red-800">{error}</p>
            </div>
          )}

          {/* Liste */}
          {sectors.length === 0 ? (
            <p className="rounded-2xl border border-zinc-200 bg-zinc-50/60 px-4 py-8 text-center text-[12.5px] text-zinc-500">
              Aucun secteur pour l&apos;instant.
            </p>
          ) : (
            <ul className="space-y-2">
              {sectors.map((sector) => {
                const isEditing = editingId === sector.id;
                const isBusy = busyId === sector.id;

                return (
                  <li
                    key={sector.id}
                    className="group flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 transition hover:border-navy-200"
                  >
                    {/* Nom éditable */}
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleRename(sector.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        autoFocus
                        className="flex-1 rounded-2xl border border-navy-300 bg-white px-2 py-1 text-[13px] text-navy-900 outline-none"
                      />
                    ) : (
                      <span className="flex-1 text-[13px] font-semibold text-navy-900">
                        {sector.name}
                      </span>
                    )}

                    {/* Compteur */}
                    <span className="shrink-0 rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-zinc-500">
                      {sector.partners_count} partenaire
                      {sector.partners_count > 1 ? "s" : ""}
                    </span>

                    {/* Actions */}
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => handleRename(sector.id)}
                        disabled={isBusy}
                        className="flex h-7 w-7 items-center justify-center rounded-2xl bg-emerald-600 text-white transition hover:bg-emerald-700 disabled:opacity-50"
                      >
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(sector.id);
                          setEditingName(sector.name);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-2xl text-zinc-400 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-100 hover:text-navy-900"
                        title="Renommer"
                      >
                        <Pencil className="h-3 w-3" strokeWidth={2} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDelete(sector)}
                      disabled={isBusy}
                      className="flex h-7 w-7 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      title="Supprimer"
                    >
                      <Trash2 className="h-3 w-3" strokeWidth={2} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Pied */}
        <div className="flex justify-end border-t border-zinc-200 bg-zinc-50/60 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}