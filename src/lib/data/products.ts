import { createClient } from "@/lib/supabase/server";
import { PRODUCT_FAMILIES } from "@/content/products";

export interface ProductDisplay {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  category: string;
  categoryId: string;
  description?: string;
  image: string;
  items: string[];
  featured?: boolean;
  source: "supabase" | "local";
}

export async function getProducts(): Promise<ProductDisplay[]> {
  const local = getStaticProducts();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return local;
    }

    const remote: ProductDisplay[] = data.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title,
      brand: p.brand ?? undefined,
      category: p.category,
      categoryId: p.category.toLowerCase().replace(/\s+/g, "-"),
      description: p.short_description,
      image: p.image_url ?? "",
      items: [],
      featured: p.featured,
      source: "supabase",
    }));

    // Éviter les doublons par slug
    const remoteSlugs = new Set(remote.map((r) => r.slug));
    const localFiltered = local.filter((l) => !remoteSlugs.has(l.slug));

    // Supabase en premier, local en second
    return [...remote, ...localFiltered];
  } catch {
    return local;
  }
}

function getStaticProducts(): ProductDisplay[] {
  return PRODUCT_FAMILIES.map((p) => ({
    id: `local-${p.slug}`,
    slug: p.slug,
    title: p.title,
    category: p.category,
    categoryId: p.categoryId,
    description: p.description,
    image: p.image,
    items: p.items,
    featured: p.featured,
    source: "local",
  }));
}