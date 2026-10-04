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