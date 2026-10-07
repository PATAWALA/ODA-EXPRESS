import { createClient } from "@/lib/supabase/server";
import ProjectsTable from "@/components/admin/ProjectsTable";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
          Commercial
        </p>
        <h1 className="mt-2 text-[24px] font-bold tracking-tight text-navy-900">
          Demandes de projet
        </h1>
        <p className="mt-2 text-[13px] text-zinc-600">
          Toutes les demandes reçues via le formulaire de contact, avec les
          photos du produit et les coordonnées complètes.
        </p>
      </div>

      <ProjectsTable projects={projects ?? []} />
    </div>
  );
}