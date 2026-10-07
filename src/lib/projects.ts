export type ProjectStatus = "new" | "contacted" | "closed";

interface SaveProjectInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  images?: string[];
}

export async function saveProject(
  input: SaveProjectInput,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch("/api/projects", {
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
    console.error("[saveProject] Erreur réseau :", err);
    return { ok: false, error: "Erreur de connexion." };
  }
}

/**
 * Upload une image vers Supabase Storage (bucket "media", dossier "projects").
 */
export async function uploadProjectImage(
  file: File,
): Promise<{ ok: boolean; url?: string; error?: string }> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "projects");

    const response = await fetch("/api/projects/upload", {
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
    console.error("[uploadProjectImage] Erreur réseau :", err);
    return { ok: false, error: "Erreur de connexion." };
  }
}