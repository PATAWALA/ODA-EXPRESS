"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  MessageCircle,
  Mail,
  Globe2,
  Pencil,
  Trash2,
  Plus,
  User,
  MessageSquare,
  Check,
  Factory,
  Truck,
} from "lucide-react";
import PartnerModal from "./PartnerModal";
import PartnerGallery from "./PartnerGallery";
import PartnerProductsUploader from "./PartnerProductsUploader";
import ConfirmDialog from "./ConfirmDialog";
import {
  addPartnerProductAction,
  deletePartnerAction,
} from "@/app/admin/actions";
import type {
  PartnerWithRelations,
  PartnerSector,
} from "@/lib/supabase/types";

interface SectorWithCount extends PartnerSector {
  partners_count: number;
}

interface PartnerDetailProps {
  partner: PartnerWithRelations;
  sectors: SectorWithCount[];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function PartnerDetail({
  partner,
  sectors,
}: PartnerDetailProps) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [addProductsOpen, setAddProductsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const location = [partner.city, partner.country].filter(Boolean).join(", ");

  async function handleDelete() {
    setDeleting(true);
    const result = await deletePartnerAction(partner.id);
    setDeleting(false);

    if (result?.error) {
      alert(result.error);
      return;
    }

    router.push("/admin/partners");
    router.refresh();
  }

  async function handleProductUploaded(url: string) {
    await addPartnerProductAction(partner.id, url);
    router.refresh();
  }

  function copyWeChat() {
    if (!partner.wechat) return;
    navigator.clipboard.writeText(partner.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      {/* En-tête */}
      <div className="mb-8 flex flex-wrap items-start gap-6 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
        {/* Logo */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 sm:h-24 sm:w-24">
          {partner.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="h-full w-full object-contain p-3"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[24px] font-bold text-navy-900 sm:text-[28px]">
                {getInitials(partner.name)}
              </span>
            </div>
          )}
        </div>

        {/* Infos principales */}
        <div className="min-w-0 flex-1">
          <h1 className="text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[28px]">
            {partner.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {partner.type === "logistic" ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                <Truck className="h-2.5 w-2.5" strokeWidth={2.5} />
                Logistic
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-express-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-express-700">
                <Factory className="h-2.5 w-2.5" strokeWidth={2.5} />
                Supplier
              </span>
            )}

            {partner.sector ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-navy-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-navy-700">
                <Building2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                {partner.sector.name}
              </span>
            ) : (
              <span className="inline-flex items-center rounded-2xl bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                Sans catégorie
              </span>
            )}

            {location && (
              <span className="inline-flex items-center gap-1 rounded-2xl border border-zinc-200 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                <MapPin className="h-2.5 w-2.5" strokeWidth={2.5} />
                {location}
              </span>
            )}
          </div>

          {partner.description && (
            <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-zinc-600">
              {partner.description}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => setEditOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-300"
          >
            <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
            Modifier
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            title="Supprimer"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Grille : contact + galerie */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Colonne contact */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Contact
            </p>

            <ul className="mt-5 space-y-4">
              {partner.contact_name && (
                <li className="flex items-start gap-3">
                  <User
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      Interlocuteur
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold text-navy-900">
                      {partner.contact_name}
                    </p>
                  </div>
                </li>
              )}

              {partner.wechat && (
                <li className="flex items-start gap-3">
                  <MessageSquare
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      WeChat
                    </p>
                    <button
                      type="button"
                      onClick={copyWeChat}
                      title="Cliquer pour copier"
                      className="mt-0.5 inline-flex items-center gap-1.5 break-all text-left text-[13px] font-semibold text-navy-900 transition hover:text-emerald-700"
                    >
                      {partner.wechat}
                      {copied && (
                        <Check
                          className="h-3 w-3 shrink-0 text-emerald-600"
                          strokeWidth={3}
                        />
                      )}
                    </button>
                  </div>
                </li>
              )}

              {partner.whatsapp && (
                <li className="flex items-start gap-3">
                  <MessageCircle
                    className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      WhatsApp
                    </p>
                    <a
                      href={`https://wa.me/${partner.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block text-[13px] font-semibold text-navy-900 transition hover:text-emerald-700"
                    >
                      {partner.whatsapp}
                    </a>
                  </div>
                </li>
              )}

              {partner.email && (
                <li className="flex items-start gap-3">
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      Email
                    </p>
                    <a
                      href={`mailto:${partner.email}`}
                      className="mt-0.5 block break-all text-[13px] font-semibold text-navy-900 transition hover:text-navy-700"
                    >
                      {partner.email}
                    </a>
                  </div>
                </li>
              )}

              {partner.website && (
                <li className="flex items-start gap-3">
                  <Globe2
                    className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
                    strokeWidth={1.75}
                  />
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-zinc-400">
                      Site web
                    </p>
                    <a
                      href={
                        partner.website.startsWith("http")
                          ? partner.website
                          : `https://${partner.website}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 block break-all text-[13px] font-semibold text-navy-900 transition hover:text-navy-700"
                    >
                      {partner.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                </li>
              )}
            </ul>

            {!partner.contact_name &&
              !partner.wechat &&
              !partner.whatsapp &&
              !partner.email &&
              !partner.website && (
                <p className="text-[12.5px] italic text-zinc-400">
                  Aucune information de contact renseignée.
                </p>
              )}
          </div>
        </div>

        {/* Colonne galerie */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Fichiers produits
              </p>
              <p className="mt-1 text-[12px] text-zinc-500">
                {partner.products.length} fichier
                {partner.products.length > 1 ? "s" : ""}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAddProductsOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-4 py-2.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              Ajouter des fichiers
            </button>
          </div>

          {addProductsOpen && (
            <div className="mb-6 rounded-2xl border border-navy-100 bg-navy-50/30 p-4">
              <PartnerProductsUploader
                onUploaded={handleProductUploaded}
                label="Nouveaux fichiers"
                hint="Images, PDF, Word, Excel, PowerPoint, ZIP, vidéo"
              />
              <button
                type="button"
                onClick={() => setAddProductsOpen(false)}
                className="mt-3 text-[11.5px] font-semibold text-zinc-500 transition hover:text-navy-900"
              >
                Fermer le panneau d&apos;ajout
              </button>
            </div>
          )}

          <PartnerGallery partnerId={partner.id} products={partner.products} />
        </div>
      </div>

      {/* Modale édition */}
      <PartnerModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={() => router.refresh()}
        partner={partner}
        sectors={sectors}
      />

      {/* Confirmation suppression */}
      <ConfirmDialog
        open={deleteOpen}
        onClose={() => !deleting && setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Supprimer ce partenaire ?"
        message={`« ${partner.name} » sera définitivement supprimé avec tous ses fichiers. Cette action est irréversible.`}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        variant="danger"
        loading={deleting}
      />
    </>
  );
}