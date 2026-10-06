"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight, Mail } from "lucide-react";
import Logo from "@/components/Logo";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Produits", href: "/produits" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "À propos", href: "/a-propos" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
          {/* ========== MOBILE : hamburger + CTA ========== */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Ouvrir le menu"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 text-navy-900 transition hover:border-navy-900 hover:bg-navy-50 lg:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Icône abonnement mobile */}
            <Link
              href="/newsletter"
              aria-label="S'abonner à la veille"
              title="S'abonner à la veille import"
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-2xl border transition",
                isActive("/newsletter")
                  ? "border-navy-900 bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md"
                  : "border-zinc-200 bg-white text-navy-900 hover:border-navy-300 hover:bg-navy-50",
              )}
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-express-600" />
            </Link>

            {/* CTA principal mobile */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-express-600 to-express-700 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-sm transition hover:shadow-md"
            >
              Se faire accompagner
            </Link>
          </div>

          {/* ========== DESKTOP : logo + nav + actions ========== */}
          <div className="hidden shrink-0 items-center lg:flex">
            <Logo variant="navbar" width={170} priority />
          </div>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] font-semibold tracking-tight transition",
                    active
                      ? "text-navy-900"
                      : "text-zinc-500 hover:text-navy-900",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-express-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions desktop */}
          <div className="hidden items-center gap-2.5 lg:flex">
            {/* Icône abonnement — style discret */}
            <Link
              href="/newsletter"
              aria-label="S'abonner à la veille import"
              title="S'abonner à la veille import"
              className={cn(
                "group relative flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-300",
                isActive("/newsletter")
                  ? "border-navy-900 bg-gradient-to-br from-navy-700 to-navy-900 text-white shadow-md"
                  : "border-zinc-200 bg-white text-navy-900 hover:border-navy-300 hover:bg-gradient-to-br hover:from-navy-50 hover:to-white hover:shadow-sm",
              )}
            >
              <Mail
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={1.75}
              />
              {/* Point rouge clignotant */}
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-express-600" />

              {/* Tooltip au survol */}
              <span className="pointer-events-none absolute -bottom-11 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-2xl border border-navy-100 bg-white px-2.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-navy-900 opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
                S&apos;abonner
              </span>
            </Link>

            {/* CTA principal */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-express-600 to-express-700 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white shadow-md transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(191,8,8,0.5)]"
            >
              Se faire accompagner
              <ArrowRight
                className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}