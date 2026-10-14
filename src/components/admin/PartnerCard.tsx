"use client";

import Link from "next/link";
import {
  Building2,
  MessageCircle,
  Globe2,
  MapPin,
  ImageIcon,
  ArrowRight,
  MessageSquare,
  Factory,
  Truck,
} from "lucide-react";
import type { PartnerWithSector } from "@/lib/supabase/types";

interface PartnerCardProps {
  partner: PartnerWithSector & { products_count?: number };
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function PartnerCard({ partner }: PartnerCardProps) {
  const country = partner.country?.trim();
  const city = partner.city?.trim();
  const location = [city, country].filter(Boolean).join(", ");
  const productsCount = partner.products_count ?? 0;

  return (
    <Link
      href={`/admin/partners/${partner.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:border-navy-300 hover:shadow-lg hover:shadow-navy-900/5"
    >
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
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {partner.type === "logistic" ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-emerald-50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-emerald-700">
                <Truck className="h-2.5 w-2.5" strokeWidth={2.5} />
                Logistic
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-express-50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-express-700">
                <Factory className="h-2.5 w-2.5" strokeWidth={2.5} />
                Supplier
              </span>
            )}

            {partner.sector ? (
              <span className="inline-flex items-center gap-1 rounded-2xl bg-navy-50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-navy-700">
                <Building2 className="h-2.5 w-2.5" strokeWidth={2.5} />
                {partner.sector.name}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Description */}
      {partner.description && (
        <p className="line-clamp-2 px-5 text-[12.5px] leading-relaxed text-zinc-600">
          {partner.description}
        </p>
      )}

      {/* Footer */}
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
          <p className="flex items-center gap-1.5 text-[11.5px] text-zinc-500">
            <Globe2
              className="h-3 w-3 shrink-0 text-zinc-400"
              strokeWidth={1.75}
            />
            <span className="truncate">
              {partner.website.replace(/^https?:\/\//, "")}
            </span>
          </p>
        )}

        {/* Badges + CTA */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {productsCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-2xl border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                <ImageIcon className="h-2.5 w-2.5" strokeWidth={2} />
                {productsCount}
              </span>
            )}

            {partner.wechat && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <MessageSquare className="h-3 w-3" strokeWidth={2.5} />
                WeChat
              </span>
            )}

            {partner.whatsapp && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <MessageCircle className="h-3 w-3" strokeWidth={2.5} />
                WhatsApp
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-700 transition group-hover:text-express-600">
            Détails
            <ArrowRight
              className="h-3 w-3 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </span>
        </div>
      </div>
    </Link>
  );
}