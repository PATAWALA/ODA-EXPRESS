import { Mail, Users, Share2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import NewsletterActions from "@/components/admin/NewsletterActions";
import VeilleForm from "@/components/admin/VeilleForm";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const { count: totalLeads } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true });

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("email, source, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Marketing
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Newsletter
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-zinc-600">
          Envoyez vos campagnes email à tous vos contacts inscrits. Deux types
          d&apos;emails, un par mois chacun.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-900 text-white">
              <Users className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Contacts inscrits
              </p>
              <p className="mt-1 text-[28px] font-bold leading-none text-navy-900">
                {totalLeads ?? 0}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy-700 text-white">
              <Mail className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Veille import
              </p>
              <p className="mt-1 text-[14px] font-semibold text-navy-900">
                1× / mois
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white">
              <Share2 className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-500">
                Recommandation
              </p>
              <p className="mt-1 text-[14px] font-semibold text-navy-900">
                1× / mois
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommandation (envoi direct) */}
      <div className="mt-8">
        <NewsletterActions />
      </div>

      {/* Veille mensuelle (formulaire) */}
      <div className="mt-8">
        <VeilleForm />
      </div>

      {/* Derniers inscrits */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 px-6 py-5">
          <p className="text-[14px] font-bold tracking-tight text-navy-900">
            Derniers inscrits
          </p>
          <p className="mt-0.5 text-[11.5px] text-zinc-500">
            Les 10 derniers contacts collectés
          </p>
        </div>
        {!recentLeads || recentLeads.length === 0 ? (
          <p className="p-8 text-center text-[13px] text-zinc-500">
            Aucun contact pour l&apos;instant.
          </p>
        ) : (
          <ul className="divide-y divide-zinc-100">
            {recentLeads.map((lead, i) => (
              <li
                key={`${lead.email}-${i}`}
                className="flex items-center justify-between gap-4 px-6 py-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-navy-900">
                    {lead.email}
                  </p>
                  <p className="mt-0.5 text-[11px] text-zinc-500">
                    Source : {lead.source}
                  </p>
                </div>
                <span className="shrink-0 text-[11px] text-zinc-400">
                  {new Date(lead.created_at).toLocaleDateString("fr-FR")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}