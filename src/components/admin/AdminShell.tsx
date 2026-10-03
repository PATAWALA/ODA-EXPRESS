"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Package,
  MessageSquareQuote,
  Users,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

const NAV = [
  { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Actualités", href: "/admin/articles", icon: Newspaper },
  { label: "Produits", href: "/admin/produits", icon: Package },
  { label: "Témoignages", href: "/admin/temoignages", icon: MessageSquareQuote },
  { label: "Leads", href: "/admin/leads", icon: Users },
];

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { email: string } | null;
}) {
  const pathname = usePathname();

  // Pas de sidebar sur la page de login
  if (pathname === "/admin/login" || !user) {
    return <>{children}</>;
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="flex min-h-screen bg-zinc-50">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-zinc-200 bg-white lg:flex lg:flex-col">
        <div className="border-b border-zinc-100 px-5 py-5">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-navy-700 to-express-600 text-[11px] font-bold text-white">
              ODA
            </span>
            <span className="leading-tight">
              <span className="block text-[12.5px] font-bold text-navy-700">
                Back-office
              </span>
              <span className="block text-[10.5px] text-zinc-500">
                ODA Sources
              </span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12.5px] font-semibold transition",
                  active
                    ? "bg-navy-700 text-white shadow-sm"
                    : "text-zinc-600 hover:bg-zinc-100 hover:text-navy-700",
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-zinc-100 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-navy-700"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            Voir le site
          </Link>

          <div className="mt-2 flex items-center gap-2 rounded-xl bg-zinc-50 px-3 py-2.5">
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11.5px] font-bold text-navy-700">
                {user.email}
              </p>
              <p className="text-[10px] text-zinc-500">Administrateur</p>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                title="Se déconnecter"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile : barre simple */}
      <div className="flex w-full flex-col">
        <header className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3 lg:hidden">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-navy-700 to-express-600 text-[10px] font-bold text-white">
              ODA
            </span>
            <span className="text-[12.5px] font-bold text-navy-700">
              Back-office
            </span>
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </form>
        </header>

        <nav className="flex gap-1 overflow-x-auto border-b border-zinc-200 bg-white px-2 py-2 lg:hidden">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-2 text-[11.5px] font-semibold transition",
                  active
                    ? "bg-navy-700 text-white"
                    : "text-zinc-600 hover:bg-zinc-100",
                )}
              >
                <item.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}