"use client";

import { useState } from "react";
import {
  Download,
  Mail,
  Phone,
  MessageSquare,
  X,
  Image as ImageIcon,
} from "lucide-react";
import {
  deleteProjectAction,
  updateProjectStatusAction,
} from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";

interface Project {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  images: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

function serviceLabel(service: string | null): string {
  if (!service) return "Non précisé";
  const labels: Record<string, string> = {
    sourcing: "Global Sourcing & Achat",
    "controle-qualite": "Vérification & Contrôle Qualité",
    shipping: "Shipping & Logistique",
    "visa-hotel": "Assistance Visa & Hôtel",
    "paiement-fournisseur": "Paiement Fournisseur",
    autre: "Autre",
  };
  return labels[service] ?? service;
}

function statusLabel(status: string): string {
  if (status === "new") return "À traiter";
  if (status === "contacted") return "En cours";
  return "Traité";
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.status === filter);

  function exportCSV() {
    const headers = [
      "Nom",
      "Email",
      "Téléphone",
      "Service",
      "Message",
      "Images",
      "Statut",
      "Reçu le",
    ];
    const rows = projects.map((p) => [
      p.name,
      p.email,
      p.phone ?? "",
      serviceLabel(p.service),
      p.message.replace(/\n/g, " "),
      (p.images ?? []).join(" | "),
      statusLabel(p.status),
      new Date(p.created_at).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `projets-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const counts = {
    all: projects.length,
    new: projects.filter((p) => p.status === "new").length,
    contacted: projects.filter((p) => p.status === "contacted").length,
    closed: projects.filter((p) => p.status === "closed").length,
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "new", "contacted", "closed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={
                "rounded-2xl border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
                (filter === f
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300")
              }
            >
              {f === "all"
                ? "Tous"
                : f === "new"
                  ? "À traiter"
                  : f === "contacted"
                    ? "En cours"
                    : "Traités"}{" "}
              ({counts[f]})
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} />
          Exporter CSV
        </button>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-[13.5px] text-zinc-500">
            Aucun projet dans cette catégorie.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {filtered.map((project) => (
              <li
                key={project.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:p-5"
              >
                {project.images && project.images.length > 0 && (
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.images[0]}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-bold text-navy-900">
                      {project.name}
                    </p>
                    <span
                      className={
                        "rounded-2xl px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] " +
                        (project.status === "new"
                          ? "bg-express-600 text-white"
                          : project.status === "contacted"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-zinc-100 text-zinc-500")
                      }
                    >
                      {statusLabel(project.status)}
                    </span>
                    {project.images && project.images.length > 0 && (
                      <span className="inline-flex items-center gap-1 rounded-2xl border border-zinc-200 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.1em] text-zinc-500">
                        <ImageIcon className="h-2.5 w-2.5" strokeWidth={2} />
                        {project.images.length}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[12px] text-zinc-500">
                    {serviceLabel(project.service)} · {project.email}
                    {project.phone && ` · ${project.phone}`}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right md:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                    Dernière activité
                  </p>
                  <p className="mt-0.5 text-[12px] text-zinc-700">
                    {formatDate(project.updated_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(project)}
                    className="flex h-9 items-center gap-1.5 rounded-2xl border border-zinc-200 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 transition hover:bg-zinc-50"
                  >
                    <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Voir
                  </button>

                  <DeleteButton
                    action={deleteProjectAction.bind(null, project.id)}
                    title={project.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/85 px-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Détail du projet
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-2xl text-zinc-400 hover:text-navy-900"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-4 overflow-y-auto p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Nom
                </p>
                <p className="mt-1 text-[14px] font-semibold text-navy-900">
                  {selected.name}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Service concerné
                </p>
                <p className="mt-1 text-[14px] font-semibold text-navy-900">
                  {serviceLabel(selected.service)}
                </p>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Email
                </p>
                <a
                  href={`mailto:${selected.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-[14px] font-semibold text-express-600 hover:underline"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {selected.email}
                </a>
              </div>

              {selected.phone && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Téléphone
                  </p>
                  <a
                    href={`tel:${selected.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-[14px] font-semibold text-express-600 hover:underline"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {selected.phone}
                  </a>
                </div>
              )}

              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Message
                </p>
                <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-zinc-700">
                  {selected.message}
                </p>
              </div>

              {selected.images && selected.images.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Photos du projet ({selected.images.length})
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {selected.images.map((url) => (
                      <a
                        key={url}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={url}
                          alt="Photo du projet"
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-6 border-t border-zinc-200 pt-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Reçu le
                  </p>
                  <p className="mt-1 text-[13px] text-zinc-700">
                    {new Date(selected.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Dernière mise à jour
                  </p>
                  <p className="mt-1 text-[13px] text-zinc-700">
                    {new Date(selected.updated_at).toLocaleString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Statut
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["new", "contacted", "closed"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={async () => {
                        await updateProjectStatusAction(selected.id, s);
                        setSelected({ ...selected, status: s });
                      }}
                      className={
                        "rounded-2xl border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
                        (selected.status === s
                          ? "border-navy-900 bg-navy-900 text-white"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")
                      }
                    >
                      {statusLabel(s)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}