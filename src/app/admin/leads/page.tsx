import { createClient } from "@/lib/supabase/server";
import LeadsTable from "@/components/admin/LeadsTable";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Marketing
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Emails collectés
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] text-zinc-600">
          Contacts collectés pour vos campagnes marketing : newsletter et
          pop-up exit-intent. Les demandes de projet sont dans la section{" "}
          <span className="font-semibold text-navy-900">Projets</span>.
        </p>
      </div>

      <LeadsTable leads={leads ?? []} />
    </div>
  );
}