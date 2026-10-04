"use client";

import { useState } from "react";
import { Download, Trash2, Mail, Phone, MessageSquare, X } from "lucide-react";
import { deleteLeadAction, updateLeadStatusAction } from "@/app/admin/actions";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  source: string;
  message: string | null;
  status: string;
  created_at: string;
}

export default function LeadsTable({ leads }: { leads: Lead[] }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<Lead | null>(null);

  const filtered =
    filter === "all" ? leads : leads.filter((l) => l.status === filter);

  function exportCSV() {
    const headers = ["Email", "Nom", "Téléphone", "Source", "Message", "Statut", "Date"];
    const rows = leads.map((l) => [
      l.email,
      l.name ?? "",
      l.phone ?? "",
      l.source,
      (l.message ?? "").replace(/\n/g, " "),
      l.status,
      new Date(l.created_at).toLocaleDateString("fr-FR"),
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "new", "contacted", "closed"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
                (filter === f
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300")
              }
            >
              {f === "all" ? "Tous" : f === "new" ? "Nouveaux" : f === "contacted" ? "Contactés" : "Fermés"}{" "}
              ({counts[f]})
            </button>
          ))}
        </div>

        <button
          onClick={exportCSV}
          className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-zinc-50"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} />
          Exporter CSV
        </button>
      </div>

      <div className="border border-zinc-200 bg-white">
        {filtered.length === 0 ? (
          <p className="p-10 text-center text-[13.5px] text-zinc-500">
            Aucun lead dans cette catégorie.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-200">
            {filtered.map((lead) => (
              <li key={lead.id} className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
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
                      {lead.status}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                      {lead.source}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] text-zinc-500">
                    {lead.email}
                    {lead.phone && ` · ${lead.phone}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelected(lead)}
                    className="flex h-9 items-center gap-1.5 border border-zinc-200 px-3 text-[11px] font-bold uppercase tracking-[0.08em] text-zinc-500 transition hover:bg-zinc-50"
                  >
                    <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                    Voir
                  </button>
                  <form
                    action={async () => {
                      if (confirm("Supprimer ce lead ?")) await deleteLeadAction(lead.id);
                    }}
                  >
                    <button
                      type="submit"
                      className="flex h-9 w-9 items-center justify-center border border-zinc-200 text-zinc-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </button>
                  </form>
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
            className="w-full max-w-lg border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Détail du lead
              </p>
              <button
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

              <div className="border-t border-zinc-200 pt-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                  Statut
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["new", "contacted", "closed"] as const).map((s) => (
                    <form
                      key={s}
                      action={async () => {
                        await updateLeadStatusAction(selected.id, s);
                        setSelected({ ...selected, status: s });
                      }}
                    >
                      <button
                        type="submit"
                        className={
                          "border px-4 py-2 text-[11.5px] font-bold uppercase tracking-[0.08em] transition " +
                          (selected.status === s
                            ? "border-navy-900 bg-navy-900 text-white"
                            : "border-zinc-200 text-zinc-600 hover:bg-zinc-50")
                        }
                      >
                        {s === "new" ? "Nouveau" : s === "contacted" ? "Contacté" : "Fermé"}
                      </button>
                    </form>
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