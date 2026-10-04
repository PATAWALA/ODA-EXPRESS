"use client";

import { useState } from "react";
import { Download, Mail, Phone, MessageSquare, X } from "lucide-react";
import { deleteLeadAction, updateLeadStatusAction } from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  source: string;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

function sourceLabel(source: string): string {
  if (source === "contact") return "Formulaire";
  if (source === "newsletter") return "Newsletter";
  if (source === "exit-intent") return "Pop-up";
  if (source === "project") return "Projet";
  return source;
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

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered =
    filter === "all" ? leads : leads.filter((l) => l.status === filter);

  function exportCSV() {
    const headers = [
      "Email",
      "Nom",
      "Téléphone",
      "Source",
      "Message",
      "Statut",
      "Reçu le",
      "Mis à jour",
    ];
    const rows = leads.map((l) => [
      l.email,
      l.name ?? "",
      l.phone ?? "",
      sourceLabel(l.source),
      (l.message ?? "").replace(/\n/g, " "),
      statusLabel(l.status),
      new Date(l.created_at).toLocaleDateString("fr-FR"),
      new Date(l.updated_at).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `demandes-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const counts = {
    all: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    closed: leads.filter((l) => l.status === "closed").length,
  };

  return (
    <>
      {/* Filtres + export */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "new", "contacted", "closed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={
                "border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
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
          className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} />
          Exporter CSV
        </button>
      </div>

      {/* Liste */}
      <div className="border border-zinc-200 bg-white">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-[13.5px] text-zinc-500">
            Aucune demande dans cette catégorie.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {filtered.map((lead) => (
              <li
                key={lead.id}
                className="flex flex-wrap items-center gap-4 p-4 sm:p-5"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[14px] font-bold text-navy-900">
                      {lead.name ?? lead.email}
                    </p>
                    <span
                      className={
                        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] " +
                        (lead.status === "new"
                          ? "bg-express-600 text-white"
                          : lead.status === "contacted"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-zinc-100 text-zinc-500")
                      }
                    >
                      {statusLabel(lead.status)}
                    </span>
                    <span className="border border-zinc-200 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-zinc-500">
                      {sourceLabel(lead.source)}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-zinc-500">
                    {lead.email}
                    {lead.phone && ` · ${lead.phone}`}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right md:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                    Dernière activité
                  </p>
                  <p className="mt-0.5 text-[12px] text-zinc-700">
                    {formatDate(lead.updated_at)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(lead)}
                    className="flex h-9 items-center gap-1.5 border border-zinc-200 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 transition hover:bg-zinc-50"
                  >
                    <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Voir
                  </button>

                  <DeleteButton
                    action={deleteLeadAction.bind(null, lead.id)}
                    title={lead.name ?? lead.email}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal détail */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/85 px-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Détail de la demande
              </p>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-zinc-400 hover:text-navy-900"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="space-y-4 p-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Nom
                </p>
                <p className="mt-1 text-[14px] font-semibold text-navy-900">
                  {selected.name ?? "—"}
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

              {selected.message && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                    Message
                  </p>
                  <p className="mt-1 whitespace-pre-wrap text-[13.5px] leading-relaxed text-zinc-700">
                    {selected.message}
                  </p>
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
                        await updateLeadStatusAction(selected.id, s);
                        setSelected({ ...selected, status: s });
                      }}
                      className={
                        "border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
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