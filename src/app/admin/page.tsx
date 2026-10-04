import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Newspaper,
  Package,
  Image as ImageIcon,
  Users,
  Plus,
  ExternalLink,
  Circle,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_NAME, getGreeting } from "@/lib/admin";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    articles,
    products,
    realisations,
    demandes,
    nouvellesDemandes,
    recentesDemandes,
  ] = await Promise.all([
    supabase.from("articles").select("id", { count: "exact", head: true }),
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("realisations").select("id", { count: "exact", head: true }),
    supabase.from("leads").select("id", { count: "exact", head: true }),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("leads")
      .select("id, name, email, phone, source, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const counts = {
    articles: articles.count ?? 0,
    products: products.count ?? 0,
    realisations: realisations.count ?? 0,
    demandes: demandes.count ?? 0,
    nouvelles: nouvellesDemandes.count ?? 0,
  };

  const greeting = getGreeting();
  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatRelative(dateString: string): string {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    const diffH = Math.floor(diffMs / 3600000);
    const diffD = Math.floor(diffMs / 86400000);
    if (diffMin < 1) return "à l'instant";
    if (diffMin < 60) return `il y a ${diffMin} min`;
    if (diffH < 24) return `il y a ${diffH} h`;
    if (diffD < 7) return `il y a ${diffD} j`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  }

  function sourceLabel(source: string): string {
    if (source === "contact") return "Formulaire";
    if (source === "newsletter") return "Newsletter";
    if (source === "exit-intent") return "Pop-up";
    if (source === "project") return "Projet";
    return source;
  }

  function statusIcon(status: string) {
    if (status === "new")
      return (
        <Circle
          className="h-2 w-2 fill-express-600 text-express-600"
          strokeWidth={0}
        />
      );
    if (status === "contacted")
      return <Clock className="h-3 w-3 text-amber-600" strokeWidth={2} />;
    return <CheckCircle2 className="h-3 w-3 text-emerald-600" strokeWidth={2} />;
  }

  function statusLabel(status: string): string {
    if (status === "new") return "À traiter";
    if (status === "contacted") return "En cours";
    return "Traité";
  }

  const modules = [
    {
      label: "Actualités",
      href: "/admin/articles",
      newHref: "/admin/articles/nouveau",
      icon: Newspaper,
      count: counts.articles,
      hint: "Articles publiés",
    },
    {
      label: "Produits",
      href: "/admin/produits",
      newHref: "/admin/produits/nouveau",
      icon: Package,
      count: counts.products,
      hint: "Familles au catalogue",
    },
    {
      label: "Réalisations",
      href: "/admin/realisations",
      newHref: "/admin/realisations/nouveau",
      icon: ImageIcon,
      count: counts.realisations,
      hint: "Projets dans la galerie",
    },
    {
      label: "Demandes",
      href: "/admin/leads",
      newHref: null,
      icon: Users,
      count: counts.demandes,
      hint: "Messages reçus du site",
      badge:
        counts.nouvelles > 0
          ? `${counts.nouvelles} nouvelle${counts.nouvelles > 1 ? "s" : ""}`
          : null,
    },
  ];

  return (
    <div>
      {/* ============ EN-TÊTE ============ */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Tableau de bord
          </p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[34px]">
            {greeting}, {ADMIN_NAME}
          </h1>
          <p className="mt-2 text-[13.5px] capitalize text-zinc-500">
            {today}
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="group inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:border-navy-900"
        >
          <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
          Voir le site public
          <ArrowUpRight
            className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>

      {/* ============ BANDEAU ALERTE ============ */}
      {counts.nouvelles > 0 && (
        <Link
          href="/admin/leads"
          className="group mb-8 flex items-center justify-between gap-6 rounded-2xl border-l-2 border-express-600 bg-express-600/[0.04] px-6 py-5 transition hover:bg-express-600/[0.08]"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-express-600 text-white">
              <Users className="h-4 w-4" strokeWidth={2} />
            </span>
            <div>
              <p className="text-[14px] font-bold text-navy-900">
                {counts.nouvelles} nouvelle{counts.nouvelles > 1 ? "s" : ""}{" "}
                demande{counts.nouvelles > 1 ? "s" : ""} à traiter
              </p>
              <p className="mt-0.5 text-[12.5px] text-zinc-600">
                Des personnes attendent une réponse de votre part.
              </p>
            </div>
          </div>
          <ArrowRight
            className="h-4 w-4 shrink-0 text-express-600 transition group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      )}

      {/* ============ MODULES ============ */}
      <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((mod) => (
          <div key={mod.href} className="group relative flex flex-col bg-white">
            <Link
              href={mod.href}
              className="flex flex-1 flex-col p-6 transition hover:bg-zinc-50/70"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-navy-900 transition group-hover:border-navy-900 group-hover:bg-navy-900 group-hover:text-white">
                  <mod.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
                {mod.badge && (
                  <span className="rounded-2xl bg-express-600 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white">
                    {mod.badge}
                  </span>
                )}
              </div>

              <p className="mt-7 text-[38px] font-bold leading-none tracking-tight text-navy-900">
                {mod.count}
              </p>
              <p className="mt-2 text-[13.5px] font-bold text-navy-900">
                {mod.label}
              </p>
              <p className="mt-1 text-[11.5px] text-zinc-500">{mod.hint}</p>
            </Link>

            <div className="border-t border-zinc-100 px-6 py-3">
              {mod.newHref ? (
                <Link
                  href={mod.newHref}
                  className="group/btn inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400 transition hover:gap-2.5 hover:text-express-600"
                >
                  <Plus className="h-3 w-3" strokeWidth={2.5} />
                  Créer
                </Link>
              ) : (
                <Link
                  href={mod.href}
                  className="group/btn inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400 transition hover:gap-2.5 hover:text-express-600"
                >
                  Consulter
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ============ ACTIVITÉ + RACCOURCIS ============ */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        {/* Demandes récentes */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
            <div>
              <p className="text-[14px] font-bold tracking-tight text-navy-900">
                Dernières demandes
              </p>
              <p className="mt-0.5 text-[11.5px] text-zinc-500">
                Les 6 derniers messages reçus
              </p>
            </div>
            <Link
              href="/admin/leads"
              className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-zinc-400 transition hover:gap-2.5 hover:text-express-600"
            >
              Tout voir
              <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
            </Link>
          </div>

          {!recentesDemandes.data || recentesDemandes.data.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <Users
                className="mx-auto h-6 w-6 text-zinc-300"
                strokeWidth={1.5}
              />
              <p className="mt-4 text-[13px] font-semibold text-navy-900">
                Aucune demande pour l&apos;instant
              </p>
              <p className="mt-1.5 text-[12px] text-zinc-500">
                Les messages reçus via le site apparaîtront ici.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {recentesDemandes.data.map((demande) => (
                <li
                  key={demande.id}
                  className="flex items-center gap-4 px-6 py-4 transition hover:bg-zinc-50/60"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-zinc-100 text-[12px] font-bold uppercase text-navy-900">
                    {(demande.name ?? demande.email).charAt(0).toUpperCase()}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-navy-900">
                      {demande.name ?? demande.email}
                    </p>
                    <p className="mt-0.5 truncate text-[11.5px] text-zinc-500">
                      {demande.email}
                    </p>
                  </div>

                  <span className="hidden shrink-0 rounded-2xl border border-zinc-200 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-zinc-500 md:block">
                    {sourceLabel(demande.source)}
                  </span>

                  <div className="hidden shrink-0 items-center gap-1.5 md:flex">
                    {statusIcon(demande.status)}
                    <span className="text-[11px] font-semibold text-zinc-600">
                      {statusLabel(demande.status)}
                    </span>
                  </div>

                  <span className="shrink-0 text-[11px] text-zinc-400">
                    {formatRelative(demande.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Raccourcis */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-6 py-5">
            <p className="text-[14px] font-bold tracking-tight text-navy-900">
              Actions rapides
            </p>
            <p className="mt-0.5 text-[11.5px] text-zinc-500">
              Les tâches courantes
            </p>
          </div>

          <div>
            <QuickAction
              label="Nouvel article"
              href="/admin/articles/nouveau"
            />
            <QuickAction
              label="Nouveau produit"
              href="/admin/produits/nouveau"
            />
            <QuickAction
              label="Nouvelle réalisation"
              href="/admin/realisations/nouveau"
            />
            <QuickAction
              label="Consulter les demandes"
              href="/admin/leads"
            />
            <QuickAction
              label="Voir le site public"
              href="/"
              external
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({
  label,
  href,
  external,
  isLast,
}: {
  label: string;
  href: string;
  external?: boolean;
  isLast?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={
        "group flex items-center justify-between gap-3 px-6 py-3.5 text-[13px] font-medium text-navy-900 transition hover:bg-zinc-50 " +
        (isLast ? "" : "border-b border-zinc-100")
      }
    >
      <span>{label}</span>
      <ArrowUpRight
        className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:express-600"
        strokeWidth={2}
      />
    </Link>
  );
}