import { createClient } from "@/lib/supabase/server";
import type {
  PartnerProduct,
  PartnerProductInsert,
} from "@/lib/supabase/types";

/* -------------------------------------------------------------------------- */
/*  LECTURE                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Récupère tous les produits d'un partenaire (triés du plus récent au plus ancien).
 */
export async function getPartnerProducts(
  partnerId: string,
): Promise<PartnerProduct[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_products")
    .select("*")
    .eq("partner_id", partnerId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getPartnerProducts]", error);
    return [];
  }

  return data ?? [];
}

/* -------------------------------------------------------------------------- */
/*  CRÉATION                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Ajoute un produit (image) à un partenaire.
 */
export async function createPartnerProduct(
  input: PartnerProductInsert,
): Promise<{ ok: boolean; data?: PartnerProduct; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_products")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    console.error("[createPartnerProduct]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

/**
 * Ajoute plusieurs produits d'un coup.
 */
export async function createPartnerProducts(
  inputs: PartnerProductInsert[],
): Promise<{ ok: boolean; count: number; error?: string }> {
  if (inputs.length === 0) return { ok: true, count: 0 };

  const supabase = await createClient();
  const { error } = await supabase.from("partner_products").insert(inputs);

  if (error) {
    console.error("[createPartnerProducts]", error);
    return { ok: false, count: 0, error: error.message };
  }

  return { ok: true, count: inputs.length };
}

/* -------------------------------------------------------------------------- */
/*  SUPPRESSION                                                                */
/* -------------------------------------------------------------------------- */

export async function deletePartnerProduct(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("partner_products")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[deletePartnerProduct]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}