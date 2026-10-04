import { createClient } from "@/lib/supabase/server";
import LeadsTable from "@/components/admin/LeadsTable";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Prospects
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Leads collectés
        </h1>
        <p className="mt-2 text-[13px] text-zinc-600">
          Toutes les demandes issues du site : formulaire, newsletter, exit-intent.
        </p>
      </div>

      <LeadsTable leads={leads ?? []} />
    </div>
  );
}