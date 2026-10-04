import { createClient } from "@/lib/supabase/client";

export type LeadSource = "newsletter" | "exit-intent" | "contact" | "project";

interface SaveLeadInput {
  email: string;
  name?: string;
  phone?: string;
  message?: string;
  source: LeadSource;
  metadata?: Record<string, unknown>;
}

export async function saveLead(
  input: SaveLeadInput,
): Promise<{ ok: boolean; error?: string }> {
  const supabase = createClient();

  const email = input.email.trim().toLowerCase();

  // UPSERT : si l'email existe déjà, on met à jour. Sinon on insère.
  const { error } = await supabase.from("leads").upsert(
    {
      email,
      name: input.name?.trim() || null,
      phone: input.phone?.trim() || null,
      message: input.message?.trim() || null,
      source: input.source,
      metadata: (input.metadata as never) ?? {},
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "email",
      ignoreDuplicates: false,
    },
  );

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}