export type LeadSource = "newsletter" | "exit-intent" | "contact" | "project";

interface SaveLeadInput {
  email: string;
  name?: string;
  phone?: string;
  message?: string;
  source: LeadSource;
  metadata?: Record<string, unknown>;
  /** URLs publiques des images uploadées (déjà stockées dans Supabase Storage) */
  images?: string[];
}

export async function saveLead(
  input: SaveLeadInput,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error ?? "Une erreur est survenue." };
    }

    return { ok: true };
  } catch (err) {
    console.error("[saveLead] Erreur réseau :", err);
    return { ok: false, error: "Erreur de connexion." };
  }
}

/**
 * Upload une image vers Supabase Storage (bucket "media", dossier "leads").
 * Utilisé par ContactForm pour envoyer les images du projet AVANT de créer le lead.
 */
export async function uploadLeadImage(
  file: File,
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "leads");

    const response = await fetch("/api/leads/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok || !data.url) {
      return {
        ok: false,
        error: data.error ?? "Erreur lors de l'upload de l'image.",
      };
    }

    return { ok: true, url: data.url };
  } catch (err) {
    console.error("[uploadLeadImage] Erreur réseau :", err);
    return { ok: false, error: "Erreur de connexion." };
  }
}