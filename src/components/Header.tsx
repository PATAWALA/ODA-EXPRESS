"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "Accueil", href: "/", match: "exact" as const },
  { label: "Boutique", href: "/catalogue", match: "prefix" as const },
  { label: "Maritime", href: "/maritime", match: "prefix" as const },
  { label: "Actualités", href: "/actualites", match: "prefix" as const },
  { label: "À propos", href: "/a-propos", match: "prefix" as const },
];

export default function Header() {
  const pathname = usePathname();

  function isActive(match: "exact" | "prefix", href: string) {
    if (match === "exact") return pathname === href;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpeg"
            alt="ODA SOURCES"
            className="h-9 w-9 rounded-lg object-cover"
          />
          <span className="leading-tight">
            <span className="block text-[14.5px] font-bold tracking-tight text-navy-900">
              ODA SOURCES
            </span>
            <span className="hidden text-[10.5px] font-medium uppercase tracking-wider text-zinc-500 sm:block">
              Import & Export
            </span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => {
            const active = isActive(item.match, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "relative text-[12.5px] font-semibold transition " +
                  (active
                    ? "text-navy-900"
                    : "text-zinc-500 hover:text-navy-900")
                }
              >
                {item.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 w-4 rounded-full bg-express-600" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA desktop */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/#sur-mesure"
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-4 py-2 text-[12.5px] font-semibold text-navy-900 transition hover:border-navy-700 hover:bg-navy-50"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2} />
            Envoyer un produit
          </Link>

          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-express-500 to-express-700 px-4 py-2 text-[12.5px] font-bold text-white shadow-sm transition hover:shadow-md"
          >
            Voir la boutique
          </Link>
        </div>

        {/* CTA mobile : uniquement un bouton stratégique */}
        <Link
          href="/catalogue"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-br from-express-500 to-express-700 px-4 py-2 text-[12px] font-bold text-white shadow-sm transition hover:shadow-md lg:hidden"
        >
          Boutique
        </Link>
      </div>
    </header>
  );
}