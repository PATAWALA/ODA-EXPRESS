"use client";

import { Container, Menu, PhoneCall, Plus, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { WHATSAPP } from "@/data/odaData";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Catalogue", href: "/#catalogue" },
  { label: "Maritime", href: "/maritime" },
  { label: "Actualités", href: "/actualites" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-navy-900 via-navy-700 to-express-600 text-white shadow-sm">
            <Container className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block text-[14.5px] font-bold tracking-tight text-navy-900">
              ODA SOURCES
            </span>
            <span className="block text-[10.5px] font-medium uppercase tracking-wider text-zinc-500">
              Import & Export
            </span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                "text-[12.5px] font-semibold transition " +
                (isActive(item.href)
                  ? "text-navy-900"
                  : "text-zinc-600 hover:text-navy-900")
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-navy-900 transition hover:border-navy-700 hover:bg-navy-50"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={1.75} />
          </a>

          <Link
            href="/#sur-mesure"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-navy-900 transition hover:border-navy-700 hover:bg-navy-50"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Envoyer un produit
          </Link>

          <Link
            href="/#catalogue"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-express-500 to-express-700 px-4 py-2 text-[12.5px] font-bold text-white shadow-sm transition hover:shadow-md"
          >
            Demander un devis
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-navy-900 lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-zinc-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={
                  "rounded-xl px-3 py-2.5 text-[13px] font-semibold transition " +
                  (isActive(item.href)
                    ? "bg-navy-50 text-navy-900"
                    : "text-navy-900 hover:bg-zinc-50")
                }
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-3 flex flex-col gap-2 border-t border-zinc-100 pt-3">
              <Link
                href="/#sur-mesure"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-3 text-[13px] font-semibold text-navy-900"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2} />
                Envoyer un produit
              </Link>
              <Link
                href="/#catalogue"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-express-500 to-express-700 px-4 py-3 text-[13px] font-bold text-white"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}