"use client";

import { Boxes, Container, Home, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "Accueil", href: "/", icon: Home, exact: true },
  { label: "Services", href: "/services", icon: Boxes },
  { label: "Produits", href: "/produits", icon: Container },
  { label: "Actus", href: "/actualites", icon: Newspaper },
];

export default function BottomNav() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur-md md:hidden">
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
        {ITEMS.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                "flex flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[10px] font-semibold uppercase tracking-[0.1em] transition " +
                (active ? "text-navy-900" : "text-zinc-400")
              }
            >
              <span
                className={
                  "flex h-8 w-8 items-center justify-center border transition " +
                  (active
                    ? "border-express-600 bg-express-600 text-white"
                    : "border-zinc-200 bg-white text-zinc-500")
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