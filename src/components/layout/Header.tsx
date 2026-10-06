"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Produits", href: "/produits" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Actualités", href: "/actualites" },
  { label: "Veille", href: "/newsletter" },
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
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 text-navy-900 transition hover:border-navy-900 lg:hidden"
          >
            <Menu className="h-4 w-4" strokeWidth={2} />
          </button>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-express-600 px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 lg:hidden"
          >
            Se faire accompagner
          </Link>

          {/* ========== DESKTOP : logo + nav + CTA ========== */}
          {/* Logo — il crée déjà son propre lien vers "/", pas besoin de l'envelopper */}
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

          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-2xl bg-express-600 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-express-700 lg:inline-flex"
          >
            Se faire accompagner
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}