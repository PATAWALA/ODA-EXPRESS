import { createClient } from "@/lib/supabase/server";
import { REALISATIONS } from "@/content/realisations";

export interface RealisationDisplay {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  categoryId: string;
  description?: string;
  featured?: boolean;
  source: "supabase" | "local";
}

export async function getRealisations(): Promise<RealisationDisplay[]> {
  const local = getStaticRealisations();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("realisations")
      .select("*")
      .eq("published", true)
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return local;
    }

    const remote: RealisationDisplay[] = data.map((r) => ({
      id: r.id,
      type: "image" as const,
      src: r.image_url,
      title: r.title,
      category: r.category,
      categoryId: r.category_id,
      description: r.description ?? undefined,
      featured: r.featured,
      source: "supabase",
    }));

    const remoteSlugs = new Set(remote.map((r) => r.title));
    const localFiltered = local.filter((l) => !remoteSlugs.has(l.title));

    return [...remote, ...localFiltered];
  } catch {
    return local;
  }
}

function getStaticRealisations(): RealisationDisplay[] {
  return REALISATIONS.map((r) => ({
    id: `local-${r.id}`,
    type: r.type,
    src: r.src,
    title: r.title,
    category: r.category,
    categoryId: r.categoryId,
    description: r.description,
    featured: r.featured,
    source: "local",
  }));
}