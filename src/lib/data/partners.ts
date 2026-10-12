import { createClient } from "@/lib/supabase/server";
import type {
  Partner,
  PartnerInsert,
  PartnerUpdate,
  PartnerWithSector,
} from "@/lib/supabase/types";

/* -------------------------------------------------------------------------- */
/*  LECTURE                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Récupère tous les partenaires avec leur secteur (jointure),
 * triés par date de création (plus récent en premier).
 */
export async function getPartners(): Promise<PartnerWithSector[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select(
      `
      *,
      sector:partner_sectors(*)
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[getPartners]", error);
    return [];
  }

  return (data ?? []) as PartnerWithSector[];
}

/**
 * Récupère les partenaires d'un secteur donné.
 */
export async function getPartnersBySector(
  sectorId: string,
): Promise<PartnerWithSector[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select(
      `
      *,
      sector:partner_sectors(*)
    `,
    )
    .eq("sector_id", sectorId)
    .order("name", { ascending: true });

  if (error) {
    console.error("[getPartnersBySector]", error);
    return [];
  }

  return (data ?? []) as PartnerWithSector[];
}

/**
 * Récupère un partenaire par ID.
 */
export async function getPartnerById(
  id: string,
): Promise<PartnerWithSector | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .select(
      `
      *,
      sector:partner_sectors(*)
    `,
    )
    .eq("id", id)
    .single();

  if (error) {
    console.error("[getPartnerById]", error);
    return null;
  }

  return data as PartnerWithSector;
}

/**
 * Recherche des partenaires par mot-clé (nom, description, ville, pays).
 * Utilise l'index full-text PostgreSQL.
 */
export async function searchPartners(
  query: string,
): Promise<PartnerWithSector[]> {
  const supabase = await createClient();
  const q = query.trim();

  if (!q) return getPartners();

  const { data, error } = await supabase
    .from("partners")
    .select(
      `
      *,
      sector:partner_sectors(*)
    `,
    )
    .or(
      `name.ilike.%${q}%,description.ilike.%${q}%,city.ilike.%${q}%,country.ilike.%${q}%`,
    )
    .order("name", { ascending: true });

  if (error) {
    console.error("[searchPartners]", error);
    return [];
  }

  return (data ?? []) as PartnerWithSector[];
}

/* -------------------------------------------------------------------------- */
/*  CRÉATION                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Crée un nouveau partenaire.
 * Seul `name` est obligatoire.
 */
export async function createPartner(
  input: PartnerInsert,
): Promise<{ ok: boolean; data?: Partner; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    console.error("[createPartner]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

/* -------------------------------------------------------------------------- */
/*  MISE À JOUR                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Met à jour un partenaire existant.
 */
export async function updatePartner(
  id: string,
  input: PartnerUpdate,
): Promise<{ ok: boolean; data?: Partner; error?: string }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("partners")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("[updatePartner]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true, data };
}

/* -------------------------------------------------------------------------- */
/*  SUPPRESSION                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Supprime un partenaire par ID.
 */
export async function deletePartner(
  id: string,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("partners").delete().eq("id", id);

  if (error) {
    console.error("[deletePartner]", error);
    return { ok: false, error: error.message };
  }

  return { ok: true };
}