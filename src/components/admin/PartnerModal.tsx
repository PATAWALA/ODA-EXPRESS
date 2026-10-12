"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Save,
  AlertCircle,
  Plus,
  Building2,
  Check,
} from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import PartnerLogoUploader from "./PartnerLogoUploader";
import {
  savePartnerAction,
  createPartnerSectorAction,
} from "@/app/admin/actions";
import type {
  PartnerWithSector,
  PartnerSector,
} from "@/lib/supabase/types";

interface PartnerModalProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  partner: PartnerWithSector | null;
  sectors: PartnerSector[];
}

export default function PartnerModal({
  open,
  onClose,
  onSaved,
  partner,
  sectors: initialSectors,
}: PartnerModalProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sectors, setSectors] = useState<PartnerSector[]>(initialSectors);
  const [showNewSector, setShowNewSector] = useState(false);
  const [newSectorName, setNewSectorName] = useState("");
  const [creatingSector, setCreatingSector] = useState(false);
  const [sectorError, setSectorError] = useState<string | null>(null);
  const [selectedSectorId, setSelectedSectorId] = useState<string>("");
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({ loading: false, error: null });

  const isEdit = !!partner;

  useEffect(() => {
    if (open) {
      setSectors(initialSectors);
      setSelectedSectorId(partner?.sector_id ?? "");
      setShowNewSector(false);
      setNewSectorName("");
      setSectorError(null);
      setState({ loading: false, error: null });
    }
  }, [open, partner, initialSectors]);

  useEffect(() => {
    if (!open) return;
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape" && !state.loading) onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, state.loading, onClose]);

  async function handleSubmit(formData: FormData) {
    setState({ loading: true, error: null });
    formData.set("sector_id", selectedSectorId);
    const result = await savePartnerAction(partner?.id ?? null, formData);
    if (result?.error) {
      setState({ loading: false, error: result.error });
      return;
    }
    setState({ loading: false, error: null });
    onSaved();
    onClose();
  }

  async function handleCreateSector() {
    const name = newSectorName.trim();
    if (!name) {
      setSectorError("Nom obligatoire.");
      return;
    }
    setCreatingSector(true);
    setSectorError(null);

    const fd = new FormData();
    fd.append("name", name);
    const result = await createPartnerSectorAction(fd);

    if (result?.error) {
      setSectorError(result.error);
      setCreatingSector(false);
      return;
    }

    if (result?.sector) {
      setSectors((prev) =>
        [...prev, result.sector!].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      );
      setSelectedSectorId(result.sector.id);
    }

    setNewSectorName("");
    setShowNewSector(false);
    setCreatingSector(false);
  }

  function triggerSubmit() {
    formRef.current?.requestSubmit();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-navy-950/60 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-4 sm:py-8"
      onClick={() => !state.loading && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
      >
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[14px] font-bold tracking-tight text-navy-900 sm:text-[15px]">
                {isEdit ? "Modifier le partenaire" : "Nouveau partenaire"}
              </p>
              <p className="mt-0.5 text-[11px] text-zinc-500 sm:text-[11.5px]">
                Seul le nom est obligatoire
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={state.loading}
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900 disabled:opacity-40"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Formulaire */}
        <form
          ref={formRef}
          action={handleSubmit}
          className="max-h-[calc(100vh-160px)] space-y-5 overflow-y-auto p-4 sm:max-h-none sm:p-6"
        >
          <Input
            label="Nom du partenaire *"
            name="name"
            required
            defaultValue={partner?.name ?? ""}
            placeholder="Ex. Guangzhou Transit Co."
          />

          {/* Secteur */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Secteur
              </label>
              <button
                type="button"
                onClick={() => setShowNewSector((v) => !v)}
                className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-express-600 transition hover:text-express-700"
              >
                <Plus className="h-3 w-3" strokeWidth={2.5} />
                Nouveau secteur
              </button>
            </div>

            {showNewSector && (
              <div className="mb-3 rounded-2xl border border-express-200 bg-express-50/60 p-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSectorName}
                    onChange={(e) => setNewSectorName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleCreateSector();
                      }
                    }}
                    placeholder="Nom du nouveau secteur"
                    className="flex-1 rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-[12.5px] text-navy-900 outline-none transition focus:border-navy-700"
                  />
                  <button
                    type="button"
                    onClick={handleCreateSector}
                    disabled={creatingSector || !newSectorName.trim()}
                    className="inline-flex items-center gap-1 rounded-2xl bg-navy-900 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-navy-800 disabled:opacity-50"
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                    Créer
                  </button>
                </div>
                {sectorError && (
                  <p className="mt-2 text-[11px] text-red-700">
                    {sectorError}
                  </p>
                )}
              </div>
            )}

            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[13.5px] text-navy-900 outline-none transition focus:border-navy-700"
            >
              <option value="">— Aucun secteur —</option>
              {sectors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {sectors.length === 0 && !showNewSector && (
              <p className="mt-2 text-[11.5px] text-zinc-500">
                Aucun secteur pour l&apos;instant. Cliquez sur{" "}
                <strong className="text-express-600">Nouveau secteur</strong>{" "}
                pour en créer un.
              </p>
            )}
          </div>

          {/* Nom du contact */}
          <Input
            label="Nom du contact"
            name="contact_name"
            defaultValue={partner?.contact_name ?? ""}
            placeholder="Ex. M. Zhang Wei"
            hint="Interlocuteur principal chez ce partenaire"
          />

          {/* WhatsApp + Téléphone */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="WhatsApp"
              name="whatsapp"
              defaultValue={partner?.whatsapp ?? ""}
              placeholder="+86 195 1566 0197"
              hint="Format international"
            />
            <Input
              label="Téléphone"
              name="phone"
              defaultValue={partner?.phone ?? ""}
              placeholder="+86 20 1234 5678"
            />
          </div>

          {/* Email + Site web */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Email"
              name="email"
              type="email"
              defaultValue={partner?.email ?? ""}
              placeholder="contact@exemple.com"
            />
            <Input
              label="Site web"
              name="website"
              defaultValue={partner?.website ?? ""}
              placeholder="https://..."
            />
          </div>

          {/* Pays + Ville */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Pays"
              name="country"
              defaultValue={partner?.country ?? ""}
              placeholder="Chine, Bénin..."
            />
            <Input
              label="Ville"
              name="city"
              defaultValue={partner?.city ?? ""}
              placeholder="Guangzhou, Cotonou..."
            />
          </div>

          {/* Description */}
          <Textarea
            label="Description / Notes"
            name="description"
            rows={3}
            defaultValue={partner?.description ?? ""}
            placeholder="Informations utiles pour retrouver ce partenaire rapidement..."
          />

          {/* Logo */}
          <PartnerLogoUploader
            name="logo_url"
            label="Logo (optionnel)"
            defaultValue={partner?.logo_url ?? ""}
          />

          {state.error && (
            <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3">
              <AlertCircle
                className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
                strokeWidth={2}
              />
              <p className="text-[12.5px] text-red-800">{state.error}</p>
            </div>
          )}
        </form>

        {/* Pied */}
        <div className="flex items-center justify-end gap-3 border-t border-zinc-200 bg-zinc-50/60 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={state.loading}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50 disabled:opacity-60 sm:px-5 sm:text-[12px]"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={triggerSubmit}
            disabled={state.loading}
            className="inline-flex items-center gap-2 rounded-2xl bg-express-600 px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 disabled:opacity-60 sm:px-5 sm:text-[12px]"
          >
            <Save className="h-3.5 w-3.5" strokeWidth={2} />
            {state.loading
              ? "Enregistrement..."
              : isEdit
                ? "Enregistrer"
                : "Créer le partenaire"}
          </button>
        </div>
      </div>
    </div>
  );
}