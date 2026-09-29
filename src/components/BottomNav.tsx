"use client";

import { Boxes, Container, Home, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Accueil", href: "/", icon: Home, match: "exact" as const },
  { label: "Boutique", href: "/catalogue", icon: Boxes, match: "prefix" as const },
  { label: "Maritime", href: "/maritime", icon: Container, match: "prefix" as const },
  { label: "Actus", href: "/actualites", icon: Newspaper, match: "prefix" as const },
];

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(match: "exact" | "prefix", href: string) {
    if (match === "exact") return pathname === href;
    // Sécurité : "/" ne doit jamais matcher en mode prefix
    if (href === "/") return pathname === "/";
    // Match strict : "/catalogue" ou "/catalogue/xxx", mais PAS "/catalogues"
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-100 bg-white/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {ITEMS.map((item) => {
          const active = isActive(item.match, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10.5px] font-semibold transition " +
                (active ? "text-navy-900" : "text-zinc-400")
              }
            >
              <span
                className={
                  "flex h-8 w-8 items-center justify-center rounded-xl transition " +
                  (active
                    ? "bg-gradient-to-br from-navy-900 to-express-600 text-white shadow-sm"
                    : "bg-zinc-50 text-zinc-500")
                }
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}