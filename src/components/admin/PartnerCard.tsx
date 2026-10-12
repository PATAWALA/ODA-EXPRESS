"use client";

import {
  Building2,
  MessageCircle,
  Globe2,
  MapPin,
  Pencil,
  Trash2,
} from "lucide-react";
import type { PartnerWithSector } from "@/lib/supabase/types";

interface PartnerCardProps {
  partner: PartnerWithSector;
  onEdit: (partner: PartnerWithSector) => void;
  onDelete: (partner: PartnerWithSector) => void;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

function cleanWhatsApp(number: string): string {
  return number.replace(/[^0-9]/g, "");
}

export default function PartnerCard({
  partner,
  onEdit,
  onDelete,
}: PartnerCardProps) {
  const whatsapp = partner.whatsapp?.trim();
  const country = partner.country?.trim();
  const city = partner.city?.trim();
  const location = [city, country].filter(Boolean).join(", ");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-navy-300 hover:shadow-lg hover:shadow-navy-900/5">
      {/* En-tête */}
      <div className="flex items-start gap-4 p-5 pb-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100">
          {partner.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={partner.logo_url}
              alt={partner.name}
              className="h-full w-full object-contain p-2"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-[16px] font-bold text-navy-900">
                {getInitials(partner.name)}
              </span>
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold tracking-tight text-navy-900">
            {partner.name}
          </h3>
          {partner.sector ? (
            <span className="mt-1.5 inline-flex items-center gap-1 rounded-2xl bg-navy-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-navy-700">
              <Building2 className="h-2.5 w-2.5" strokeWidth={2.5} />
              {partner.sector.name}
            </span>
          ) : (
            <span className="mt-1.5 inline-flex items-center rounded-2xl bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">
              Sans secteur
            </span>
          )}
        </div>

        {/* Actions au survol */}
        <div className="flex shrink-0 items-center gap-1 opacity-0 transition group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onEdit(partner)}
            title="Modifier"
            className="flex h-7 w-7 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 transition hover:border-navy-300 hover:text-navy-900"
          >
            <Pencil className="h-3 w-3" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(partner)}
            title="Supprimer"
            className="flex h-7 w-7 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-400 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 className="h-3 w-3" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Description */}
      {partner.description && (
        <p className="line-clamp-2 px-5 text-[12.5px] leading-relaxed text-zinc-600">
          {partner.description}
        </p>
      )}

      {/* Footer : localisation + contact */}
      <div className="mt-auto space-y-2 border-t border-zinc-100 px-5 py-3">
        {location && (
          <p className="flex items-center gap-1.5 text-[11.5px] text-zinc-500">
            <MapPin
              className="h-3 w-3 shrink-0 text-zinc-400"
              strokeWidth={1.75}
            />
            <span className="truncate">{location}</span>
          </p>
        )}

        {partner.website && (
          <a
            href={
              partner.website.startsWith("http")
                ? partner.website
                : `https://${partner.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11.5px] text-zinc-500 transition hover:text-navy-900"
          >
            <Globe2
              className="h-3 w-3 shrink-0 text-zinc-400"
              strokeWidth={1.75}
            />
            <span className="truncate">
              {partner.website.replace(/^https?:\/\//, "")}
            </span>
          </a>
        )}

        {whatsapp && (
          <a
            href={`https://wa.me/${cleanWhatsApp(whatsapp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-2xl bg-emerald-600 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-3 w-3" strokeWidth={2.5} />
            WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}