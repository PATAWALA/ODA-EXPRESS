"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Newspaper,
  Package,
  Image as ImageIcon,
  Users,
  FolderKanban,
  LogOut,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Search,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/admin/actions";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const SECTIONS: NavSection[] = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        label: "Tableau de bord",
        href: "/admin",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },
  {
    title: "Contenu",
    items: [
      { label: "Actualités", href: "/admin/articles", icon: Newspaper },
      { label: "Produits", href: "/admin/produits", icon: Package },
      { label: "Réalisations", href: "/admin/realisations", icon: ImageIcon },
    ],
  },
  {
    title: "Commercial",
    items: [
      { label: "Projets", href: "/admin/projects", icon: FolderKanban },
      { label: "Demandes", href: "/admin/leads", icon: Users },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Paramètres", href: "/admin/parametres", icon: Settings },
    ],
  },
];

// Onglets mobile (bottom nav)
const MOBILE_NAV: NavItem[] = [
  { label: "Accueil", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Actus", href: "/admin/articles", icon: Newspaper },
  { label: "Produits", href: "/admin/produits", icon: Package },
  { label: "Projets", href: "/admin/projects", icon: FolderKanban },
  { label: "Demandes", href: "/admin/leads", icon: Users },
];

const STORAGE_KEY = "oda-admin-sidebar-collapsed";

type BreadcrumbItem = { label: string; href?: string };

function getBreadcrumb(pathname: string): BreadcrumbItem[] {
  if (pathname === "/admin") return [{ label: "Tableau de bord" }];
  if (pathname.startsWith("/admin/articles")) {
    const parts: BreadcrumbItem[] = [
      { label: "Actualités", href: "/admin/articles" },
    ];
    if (pathname.endsWith("/nouveau")) parts.push({ label: "Nouveau" });
    else if (pathname.match(/\/admin\/articles\/[^/]+$/))
      parts.push({ label: "Éditer" });
    return parts;
  }
  if (pathname.startsWith("/admin/produits")) {
    const parts: BreadcrumbItem[] = [
      { label: "Produits", href: "/admin/produits" },
    ];
    if (pathname.endsWith("/nouveau")) parts.push({ label: "Nouveau" });
    else if (pathname.match(/\/admin\/produits\/[^/]+$/))
      parts.push({ label: "Éditer" });
    return parts;
  }
  if (pathname.startsWith("/admin/realisations")) {
    const parts: BreadcrumbItem[] = [
      { label: "Réalisations", href: "/admin/realisations" },
    ];
    if (pathname.endsWith("/nouveau")) parts.push({ label: "Nouveau" });
    else if (pathname.match(/\/admin\/realisations\/[^/]+$/))
      parts.push({ label: "Éditer" });
    return parts;
  }
  if (pathname.startsWith("/admin/projects")) return [{ label: "Projets" }];
  if (pathname.startsWith("/admin/leads")) return [{ label: "Demandes" }];
  if (pathname.startsWith("/admin/parametres"))
    return [{ label: "Paramètres" }];
  return [{ label: "Admin" }];
}

/* ---------- Menu profil utilisateur ---------- */

function UserMenu({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = email.charAt(0).toUpperCase();

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", onClick);
      return () => document.removeEventListener("mousedown", onClick);
    }
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-3 py-2 transition hover:bg-zinc-50"
      >
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-2xl bg-navy-900 text-[11px] font-bold text-white">
          {initial}
        </span>
        <span className="hidden min-w-0 text-left lg:block">
          <span className="block max-w-[160px] truncate text-[12px] font-semibold text-navy-900">
            {email}
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-400">
            Administrateur
          </span>
        </span>
        <ChevronDown
          className={cn(
            "hidden h-3.5 w-3.5 shrink-0 text-zinc-400 transition lg:block",
            open && "rotate-180",
          )}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+6px)] z-50 w-64 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl">
          <div className="border-b border-zinc-200 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Compte
            </p>
            <p className="mt-1.5 truncate text-[12.5px] font-semibold text-navy-900">
              {email}
            </p>
          </div>

          <div className="p-1.5">
            <Link
              href="/admin/parametres"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[12.5px] font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-navy-900"
            >
              <Settings
                className="h-3.5 w-3.5 shrink-0"
                strokeWidth={1.75}
              />
              Paramètres
            </Link>

            <Link
              href="/"
              target="_blank"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-[12.5px] font-medium text-zinc-600 transition hover:bg-zinc-50 hover:text-navy-900"
            >
              <ExternalLink
                className="h-3.5 w-3.5 shrink-0"
                strokeWidth={1.75}
              />
              Voir le site public
            </Link>

            <form action={logoutAction}>
              <button
                type="submit"
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-[12.5px] font-medium text-zinc-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                Se déconnecter
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Layout principal ---------- */

export default function AdminShell({
  children,
  user,
}: {
  children: React.ReactNode;
  user: { email: string } | null;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setCollapsed(true);
  }, []);

  function toggleCollapsed() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }

  if (pathname === "/admin/login" || !user) {
    return <>{children}</>;
  }

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  const breadcrumb = getBreadcrumb(pathname);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* ============ SIDEBAR DESKTOP ============ */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-zinc-200 bg-white transition-all duration-300 lg:flex",
          collapsed ? "w-16" : "w-64",
        )}
      >
        {/* En-tête : logo + toggle */}
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-zinc-200 transition-all",
            collapsed ? "justify-center px-2" : "justify-between px-4",
          )}
        >
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-3 overflow-hidden",
              collapsed && "justify-center",
            )}
            title="Accueil back-office"
          >
            {collapsed ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/brand/mark/logo-mark-256.png"
                alt="ODA Sources"
                className="h-8 w-8 shrink-0 object-contain"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/brand/navbar/logo-navbar@3x.png"
                alt="ODA Sources — Import & Export"
                className="h-auto max-h-10 w-[150px] object-contain object-left"
              />
            )}
          </Link>

          <button
            type="button"
            onClick={toggleCollapsed}
            title={collapsed ? "Déployer" : "Replier"}
            className="flex h-8 w-8 items-center justify-center rounded-2xl text-zinc-400 transition hover:bg-zinc-100 hover:text-navy-900"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <PanelLeftClose className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 overflow-y-auto overflow-x-hidden",
            collapsed ? "px-2 py-5" : "px-3 py-6",
          )}
        >
          {SECTIONS.map((section, sectionIndex) => (
            <div
              key={section.title}
              className={sectionIndex > 0 ? "mt-7" : ""}
            >
              {!collapsed ? (
                <p className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-400">
                  {section.title}
                </p>
              ) : (
                sectionIndex > 0 && (
                  <div className="mx-auto mb-4 h-px w-6 bg-zinc-200" />
                )
              )}

              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active = isActive(item.href, item.exact);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group relative flex items-center rounded-2xl transition",
                          collapsed
                            ? "justify-center px-0 py-2.5"
                            : "gap-3 px-3 py-2.5",
                          active
                            ? "bg-navy-900 text-white"
                            : "text-zinc-600 hover:bg-zinc-50 hover:text-navy-900",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition",
                            active
                              ? "text-white"
                              : "text-zinc-400 group-hover:text-navy-700",
                          )}
                          strokeWidth={1.75}
                        />

                        {!collapsed && (
                          <span className="flex-1 truncate text-[13px] font-medium">
                            {item.label}
                          </span>
                        )}

                        {collapsed && (
                          <span className="pointer-events-none absolute left-full z-50 ml-2 hidden whitespace-nowrap rounded-2xl border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-navy-900 opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
                            {item.label}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Pied : lien vers le site */}
        <div
          className={cn(
            "shrink-0 border-t border-zinc-200",
            collapsed ? "p-2" : "p-3",
          )}
        >
          <Link
            href="/"
            target="_blank"
            title={collapsed ? "Voir le site" : undefined}
            className={cn(
              "group relative flex items-center rounded-2xl transition",
              collapsed ? "justify-center py-2.5" : "gap-2.5 px-3 py-2.5",
              "text-[12px] font-medium text-zinc-500 hover:bg-zinc-50 hover:text-navy-900",
            )}
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            {!collapsed && <span>Voir le site public</span>}
            {collapsed && (
              <span className="pointer-events-none absolute left-full z-50 ml-2 hidden whitespace-nowrap rounded-2xl border border-zinc-200 bg-white px-2.5 py-1.5 text-[11.5px] font-semibold text-navy-900 opacity-0 shadow-lg transition group-hover:opacity-100 lg:block">
                Voir le site public
              </span>
            )}
          </Link>
        </div>
      </aside>

      {/* ============ CONTENU PRINCIPAL ============ */}
      <div
        className={cn(
          "flex min-h-screen flex-col transition-all duration-300",
          collapsed ? "lg:pl-16" : "lg:pl-64",
        )}
      >
        {/* Topbar desktop */}
        <header className="sticky top-0 z-30 hidden h-16 shrink-0 items-center gap-6 border-b border-zinc-200 bg-white/95 px-8 backdrop-blur-md lg:flex lg:px-12">
          {/* Breadcrumb */}
          <div className="flex min-w-0 shrink-0 items-center gap-2 text-[12.5px]">
            {breadcrumb.map((item, index) => (
              <div key={item.label} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="h-3.5 w-3.5 shrink-0 text-zinc-300"
                    strokeWidth={2}
                  />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-medium text-zinc-500 transition hover:text-navy-900"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="truncate font-bold text-navy-900">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Barre de recherche */}
          <div className="flex flex-1 justify-center">
            <div className="relative w-full max-w-xl">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.75}
              />
              <input
                type="text"
                placeholder="Rechercher un article, un produit, une demande..."
                className="h-10 w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 pl-10 pr-14 text-[12.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:bg-white"
              />
              <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-2xl border border-zinc-200 bg-white px-1.5 py-0.5 text-[9.5px] font-bold text-zinc-400">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Menu profil */}
          <UserMenu email={user.email} />
        </header>

        {/* Topbar mobile */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-zinc-200 bg-white/95 px-4 backdrop-blur-md lg:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mark/logo-mark-256.png"
            alt="ODA"
            className="h-7 w-7 shrink-0 object-contain"
          />

          <div className="flex min-w-0 flex-1 items-center gap-1.5 text-[12px]">
            {breadcrumb.map((item, index) => (
              <div
                key={item.label}
                className="flex min-w-0 items-center gap-1.5"
              >
                {index > 0 && (
                  <ChevronRight
                    className="h-3 w-3 shrink-0 text-zinc-300"
                    strokeWidth={2}
                  />
                )}
                <span
                  className={cn(
                    "truncate",
                    index === breadcrumb.length - 1
                      ? "font-bold text-navy-900"
                      : "font-medium text-zinc-500",
                  )}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Menu profil mobile */}
          <UserMenu email={user.email} />
        </header>

        {/* Contenu */}
        <main className="flex-1 px-6 pb-24 pt-8 sm:px-8 sm:pt-10 lg:px-12 lg:pb-16 lg:pt-12">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* ============ BOTTOM NAV MOBILE ============ */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-md items-stretch justify-between px-2 py-2">
          {MOBILE_NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-semibold transition",
                  active ? "text-navy-900" : "text-zinc-400",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-2xl transition",
                    active
                      ? "bg-navy-900 text-white"
                      : "bg-transparent text-zinc-500",
                  )}
                >
                  <item.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}