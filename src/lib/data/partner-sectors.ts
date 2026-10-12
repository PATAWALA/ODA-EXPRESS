import { createClient } from "@/lib/supabase/server";
import type {
  PartnerSector,
  PartnerSectorInsert,
  PartnerSectorUpdate,
} from "@/lib/supabase/types";

/* -------------------------------------------------------------------------- */
/*  LECTURE                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Récupère tous les secteurs, triés par nom alphabétique.
 */
export async function getPartnerSectors(): Promise<PartnerSector[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_sectors")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("[getPartnerSectors]", error);
    return [];
  }

  return data ?? [];
}

/**
 * Récupère un secteur par ID.
 */
export async function getPartnerSectorById(
  id: string,
): Promise<PartnerSector | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_sectors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getPartnerSectorById]", error);
    return null;
  }

  return data;
}

/**
 * Récupère les secteurs avec le nombre de partenaires dans chacun.
 * Utile pour la page de gestion des secteurs.
 */
export interface SectorWithCount extends PartnerSector {
  partners_count: number;
}

export async function getPartnerSectorsWithCount(): Promise<
  SectorWithCount[]
> {
  const supabase = await createClient();

  // Récupère les secteurs
  const { data: sectors, error: sectorsError } = await supabase
    .from("partner_sectors")
    .select("*")
    .order("name", { ascending: true });

  if (sectorsError || !sectors) {
    console.error("[getPartnerSectorsWithCount]", sectorsError);
    return [];
  }

  // Récupère les counts en parallèle
  const counts = await Promise.all(
    sectors.map(async (sector) => {
      const { count } = await supabase
        .from("partners")
        .select("id", { count: "exact", head: true })
        .eq("sector_id", sector.id);
      return { id: sector.id, count: count ?? 0 };
    }),
  );

  // Fusionne
  return sectors.map((sector) => ({
    ...sector,
    partners_count: counts.find((c) => c.id === sector.id)?.count ?? 0,
  }));
}

/* -------------------------------------------------------------------------- */
/*  CRÉATION                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Crée un nouveau secteur.
 */
export async function createPartnerSector(
  input: PartnerSectorInsert,
): Promise<{ ok: boolean; data?: PartnerSector; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_sectors")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    console.error("[createPartnerSector]", error);
    // Message d'erreur plus clair si doublon
    if (error.code === "23505") {
      return {
        ok: false,
        error: "Un secteur avec ce nom existe déjà.",
      };
    }
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

/* -------------------------------------------------------------------------- */
/*  MISE À JOUR                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Met à jour un secteur.
 */
export async function updatePartnerSector(
  id: string,
  input: PartnerSectorUpdate,
): Promise<{ ok: boolean; data?: PartnerSector; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partner_sectors")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("[updatePartnerSector]", error);
    if (error.code === "23505") {
      return {
        ok: false,
        error: "Un secteur avec ce nom existe déjà.",
      };
    }
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

/* -------------------------------------------------------------------------- */
/*  SUPPRESSION                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Supprime un secteur.
 * ⚠️ Les partenaires associés NE SONT PAS supprimés (ON DELETE SET NULL).
 */
export async function deletePartnerSector(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("partner_sectors")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("[deletePartnerSector]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}