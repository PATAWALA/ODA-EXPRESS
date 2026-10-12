"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  SlidersHorizontal,
  X,
  Building2,
  Tag,
  Users,
  LayoutGrid,
  MessageCircle,
  Sparkles,
  QrCode,
} from "lucide-react";
import PartnerCard from "./PartnerCard";
import PartnerModal from "./PartnerModal";
import SectorsManager from "./SectorsManager";
import PartnerQRModal from "./PartnerQRModal";
import ConfirmDialog from "./ConfirmDialog";
import { deletePartnerAction } from "@/app/admin/actions";
import type {
  PartnerWithSector,
  PartnerSector,
} from "@/lib/supabase/types";

interface SectorWithCount extends PartnerSector {
  partners_count: number;
}

interface Stats {
  total: number;
  sectors: number;
  withWhatsApp: number;
  addedThisMonth: number;
}

interface PartnersManagerProps {
  partners: PartnerWithSector[];
  sectors: SectorWithCount[];
  stats: Stats;
}

export default function PartnersManager({
  partners,
  sectors,
  stats,
}: PartnersManagerProps) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [activeSectorId, setActiveSectorId] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] =
    useState<PartnerWithSector | null>(null);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);
  const [deletingPartner, setDeletingPartner] =
    useState<PartnerWithSector | null>(null);
  const [deleting, setDeleting] = useState(false);

  /* ------- Filtrage ------- */
  const filtered = useMemo(() => {
    let result = partners;

    if (activeSectorId === "none") {
      result = result.filter((p) => !p.sector_id);
    } else if (activeSectorId !== "all") {
      result = result.filter((p) => p.sector_id === activeSectorId);
    }

    const q = search.trim().toLowerCase();
    if (q) {
      result = result.filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          (p.description ?? "").toLowerCase().includes(q) ||
          (p.city ?? "").toLowerCase().includes(q) ||
          (p.country ?? "").toLowerCase().includes(q) ||
          (p.email ?? "").toLowerCase().includes(q) ||
          (p.whatsapp ?? "").toLowerCase().includes(q)
        );
      });
    }

    return result;
  }, [partners, activeSectorId, search]);

  const withoutSector = useMemo(
    () => partners.filter((p) => !p.sector_id).length,
    [partners],
  );

  function openCreate() {
    setEditingPartner(null);
    setModalOpen(true);
  }

  function openEdit(partner: PartnerWithSector) {
    setEditingPartner(partner);
    setModalOpen(true);
  }

  function handleSaved() {
    router.refresh();
  }

  async function handleConfirmDelete() {
    if (!deletingPartner) return;
    setDeleting(true);
    const result = await deletePartnerAction(deletingPartner.id);
    setDeleting(false);
    if (result?.error) {
      console.error(result.error);
      return;
    }
    setDeletingPartner(null);
    router.refresh();
  }

  return (
    <div>
            {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Users className="h-5 w-5" strokeWidth={1.75} />}
          value={stats.total}
          title="Partenaires"
          description="Contacts dans votre réseau"
          color="navy"
        />
        <StatCard
          icon={<LayoutGrid className="h-5 w-5" strokeWidth={1.75} />}
          value={stats.sectors}
          title="Secteurs"
          description="Domaines disponibles"
          color="express"
        />
        <StatCard
          icon={<MessageCircle className="h-5 w-5" strokeWidth={1.75} />}
          value={stats.withWhatsApp}
          title="Sur WhatsApp"
          description="Joignables directement"
          color="emerald"
        />
        <StatCard
          icon={<Sparkles className="h-5 w-5" strokeWidth={1.75} />}
          value={stats.addedThisMonth}
          title="Ce mois-ci"
          description="Nouveaux ajouts"
          color="navy"
        />
      </div>

      {/* Barre d'actions */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
            strokeWidth={1.75}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un partenaire (nom, ville, contact...)"
            className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-10 pr-4 text-[13px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-navy-900"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSectorsOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-300"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />
          Secteurs
          <span className="text-zinc-400">({sectors.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setQrOpen(true)}
          className="inline-flex items-center gap-2 rounded-2xl border border-express-200 bg-express-50/60 px-4 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-express-700 transition hover:border-express-300 hover:bg-express-50"
        >
          <QrCode className="h-3.5 w-3.5" strokeWidth={2} />
          QR public
        </button>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Nouveau partenaire
        </button>
      </div>

      {/* Filtres par secteur */}
      <div className="mb-6 -mx-1 flex flex-wrap items-center gap-2 px-1">
        <SectorPill
          active={activeSectorId === "all"}
          onClick={() => setActiveSectorId("all")}
          icon={<Building2 className="h-3 w-3" strokeWidth={2.5} />}
        >
          Tous ({partners.length})
        </SectorPill>

        {sectors.map((s) => (
          <SectorPill
            key={s.id}
            active={activeSectorId === s.id}
            onClick={() => setActiveSectorId(s.id)}
            icon={<Tag className="h-3 w-3" strokeWidth={2.5} />}
          >
            {s.name} ({s.partners_count})
          </SectorPill>
        ))}

        {withoutSector > 0 && (
          <SectorPill
            active={activeSectorId === "none"}
            onClick={() => setActiveSectorId("none")}
          >
            Sans secteur ({withoutSector})
          </SectorPill>
        )}
      </div>

      {/* Grille */}
      {filtered.length === 0 ? (
        <EmptyState
          hasSearch={!!search}
          hasSector={activeSectorId !== "all"}
          onReset={() => {
            setSearch("");
            setActiveSectorId("all");
          }}
          onCreate={openCreate}
          total={partners.length}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PartnerCard
              key={p.id}
              partner={p}
              onEdit={openEdit}
              onDelete={setDeletingPartner}
            />
          ))}
        </div>
      )}

      {/* Modales */}
      <PartnerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={handleSaved}
        partner={editingPartner}
        sectors={sectors}
      />

      <SectorsManager
        open={sectorsOpen}
        onClose={() => setSectorsOpen(false)}
        sectors={sectors}
        onChanged={handleSaved}
      />

      <PartnerQRModal open={qrOpen} onClose={() => setQrOpen(false)} />

      <ConfirmDialog
        open={!!deletingPartner}
        onClose={() => !deleting && setDeletingPartner(null)}
        onConfirm={handleConfirmDelete}
        title="Supprimer ce partenaire ?"
        message={
          deletingPartner
            ? `« ${deletingPartner.name} » sera définitivement supprimé. Cette action est irréversible.`
            : ""
        }
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        loading={deleting}
      />
    </div>
  );
}

/* ---------- Sous-composants ---------- */

function StatCard({
  icon,
  value,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  value: number;
  title: string;
  description: string;
  color: "navy" | "express" | "emerald";
}) {
  const colorClasses = {
    navy: "bg-navy-900 text-white",
    express: "bg-express-600 text-white",
    emerald: "bg-emerald-600 text-white",
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 transition hover:border-navy-200 hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <span
          className={
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl " +
            colorClasses[color]
          }
        >
          {icon}
        </span>
        <p className="text-[32px] font-bold leading-none tracking-tight text-navy-900">
          {value}
        </p>
      </div>

      <p className="mt-4 text-[13.5px] font-bold tracking-tight text-navy-900">
        {title}
      </p>

      <p className="mt-1.5 text-[11.5px] leading-relaxed text-zinc-500">
        {description}
      </p>
    </div>
  );
}

function SectorPill({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex shrink-0 items-center gap-1.5 rounded-2xl border px-3 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
        (active
          ? "border-navy-900 bg-navy-900 text-white"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300 hover:text-navy-900")
      }
    >
      {icon}
      {children}
    </button>
  );
}

function EmptyState({
  hasSearch,
  hasSector,
  onReset,
  onCreate,
  total,
}: {
  hasSearch: boolean;
  hasSector: boolean;
  onReset: () => void;
  onCreate: () => void;
  total: number;
}) {
  if (total === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center">
        <Building2
          className="mx-auto h-8 w-8 text-zinc-300"
          strokeWidth={1.5}
        />
        <p className="mt-5 text-[14px] font-bold text-navy-900">
          Aucun partenaire pour l&apos;instant
        </p>
        <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-zinc-500">
          Ajoutez vos premiers contacts (transitaires, fournisseurs,
          cabinets...) pour les retrouver en un clic plus tard.
        </p>
        <button
          type="button"
          onClick={onCreate}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Ajouter mon premier partenaire
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center">
      <Search className="mx-auto h-8 w-8 text-zinc-300" strokeWidth={1.5} />
      <p className="mt-5 text-[14px] font-bold text-navy-900">
        Aucun résultat
      </p>
      <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-zinc-500">
        {hasSearch
          ? "Aucun partenaire ne correspond à votre recherche."
          : "Aucun partenaire dans ce secteur."}
      </p>
      {(hasSearch || hasSector) && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
          Réinitialiser les filtres
        </button>
      )}
    </div>
  );
}