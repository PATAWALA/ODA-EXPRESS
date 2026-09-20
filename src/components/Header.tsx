"use client";

import { useState } from "react";
import {
  ArrowRight,
  MapPin,
  Menu,
  Package,
  PhoneCall,
  Truck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency, type CurrencyCode } from "@/lib/currency";
import { CONTACT_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/data/odaData";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Devis express", href: "#devis" },
  { label: "Suivi colis", href: "#suivi" },
  { label: "Pourquoi nous", href: "#confiance" },
  { label: "Contact", href: "#contact" },
];

const CURRENCIES: CurrencyCode[] = ["USD", "EUR", "XOF"];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"FR" | "EN">("FR");
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      {/* Bandeau institutionnel */}
      <div className="hidden bg-slate-900 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-[11.5px] font-medium tracking-wide text-slate-300">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand-400" />
              Entrepôt & équipe à Guangzhou, Chine
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-brand-400" />
              Livraison dans 12 pays d&apos;Afrique
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${CONTACT_PHONE_DISPLAY.replace(/\s/g, "")}`}
              className="transition hover:text-white"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
            <span className="h-3 w-px bg-slate-700" />
            <span className="text-slate-400">
              Réponse WhatsApp en moins de 30 minutes
            </span>
          </div>
        </div>
      </div>

      {/* Barre principale */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Package className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-tight text-slate-900">
              ODA EXPRESS
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              Sourcing & Fret Chine — Afrique
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Bascule devise */}
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 md:flex">
            {CURRENCIES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                  currency === code
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900",
                )}
              >
                {code}
              </button>
            ))}
          </div>

          {/* Bascule langue */}
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-0.5 md:flex">
            {(["FR", "EN"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLanguage(code)}
                title={
                  code === "EN"
                    ? "Interface anglaise en cours de déploiement"
                    : "Interface française"
                }
                className={cn(
                  "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
                  language === code
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900",
                )}
              >
                {code}
              </button>
            ))}
          </div>

          <a
            href="#suivi"
            className="hidden items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 text-[13px] font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 lg:inline-flex"
          >
            <Truck className="h-4 w-4" />
            Suivre un colis
          </a>

          <a
            href="#devis"
            className="hidden items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-slate-800 sm:inline-flex"
          >
            Démarrer une demande
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-3.5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-brand-700 sm:hidden"
          >
            <PhoneCall className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Ouvrir le menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-50 xl:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
                {CURRENCIES.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setCurrency(code)}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-[11px] font-bold transition",
                      currency === code
                        ? "bg-slate-900 text-white"
                        : "text-slate-500",
                    )}
                  >
                    {code}
                  </button>
                ))}
              </div>

              <a
                href="#devis"
                onClick={() => setMenuOpen(false)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Démarrer une demande
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}