"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewArticleEmail } from "@/lib/email/send";

/* ---------- AUTH ---------- */

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/admin");

  if (!email || !password) return { error: "Email et mot de passe obligatoires." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Identifiants incorrects." };

  revalidatePath("/admin", "layout");
  redirect(redirectTo);
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/admin", "layout");
  redirect("/admin/login");
}

/* ---------- ARTICLES ---------- */

export async function saveArticleAction(id: string | null, formData: FormData) {
  const supabase = await createClient();
  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
    category: String(formData.get("category") ?? "Guide").trim(),
    cover_image: String(formData.get("cover_image") ?? "").trim() || null,
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  if (!payload.slug || !payload.title || !payload.excerpt || !payload.content)
    return { error: "Slug, titre, résumé et contenu sont obligatoires." };

  // Détecter si c'est une nouvelle publication
  let isNewPublication = !id; // Création + publié immédiatement

  let error;
  if (id) {
    // Vérifier l'état publié actuel avant la mise à jour
    const { data: existing } = await supabase
      .from("articles")
      .select("published")
      .eq("id", id)
      .single();

    // Nouvelle publication si :
    // - Il était brouillon et on le publie
    const wasDraft = existing?.published === false;
    isNewPublication = wasDraft && payload.published;

    ({ error } = await supabase.from("articles").update(payload).eq("id", id));
  } else {
    ({ error } = await supabase.from("articles").insert(payload));
  }

  if (error) return { error: error.message };

  // Envoyer l'article à tous les leads (uniquement si nouvelle publication)
  if (isNewPublication && payload.published) {
    try {
      const admin = createAdminClient();
      const { data: leads } = await admin
        .from("leads")
        .select("email")
        .not("email", "is", null);

      if (leads && leads.length > 0) {
        // Envoyer en arrière-plan sans bloquer la redirection
        sendNewArticleEmail({
          recipients: leads.map((l) => l.email),
          title: payload.title,
          excerpt: payload.excerpt,
          slug: payload.slug,
          imageUrl: payload.cover_image,
        }).catch((err) => {
          console.error("[saveArticleAction] Erreur envoi email :", err);
        });
      }
    } catch (err) {
      console.error("[saveArticleAction] Erreur récupération leads :", err);
      // On ne bloque pas l'enregistrement si l'envoi échoue
    }
  }

  revalidatePath("/admin/articles");
  revalidatePath("/actualites");
  redirect("/admin/articles");
}

export async function deleteArticleAction(id: string) {
  const supabase = await createClient();
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/actualites");
}

/* ---------- PRODUITS ---------- */

export async function saveProductAction(id: string | null, formData: FormData) {
  const supabase = await createClient();
  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    brand: String(formData.get("brand") ?? "").trim() || null,
    category: String(formData.get("category") ?? "").trim(),
    short_description: String(formData.get("short_description") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim() || null,
    unit: String(formData.get("unit") ?? "unité").trim(),
    min_order: Number(formData.get("min_order") ?? 1),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  if (
    !payload.slug ||
    !payload.title ||
    !payload.category ||
    !payload.short_description
  )
    return {
      error: "Slug, titre, catégorie et description courte sont obligatoires.",
    };

  // Détecter si c'est une nouveauté à annoncer
  let isNewFeaturedProduct = false;

  let error;
  if (id) {
    // Vérifier l'état actuel avant la mise à jour
    const { data: existing } = await supabase
      .from("products")
      .select("published, featured")
      .eq("id", id)
      .single();

    // Nouveauté si :
    // - Il était brouillon/non-featured et devient publié ET featured
    const wasNotFeatured =
      existing?.published === false || existing?.featured === false;
    isNewFeaturedProduct =
      wasNotFeatured && payload.published && payload.featured;

    ({ error } = await supabase.from("products").update(payload).eq("id", id));
  } else {
    // Nouveau produit publié ET featured
    isNewFeaturedProduct = payload.published && payload.featured;

    ({ error } = await supabase.from("products").insert(payload));
  }

  if (error) return { error: error.message };

  // Envoyer le produit à tous les leads (uniquement si nouveauté mise en avant)
  if (isNewFeaturedProduct) {
    try {
      const admin = createAdminClient();
      const { data: leads } = await admin
        .from("leads")
        .select("email")
        .not("email", "is", null);

      if (leads && leads.length > 0) {
        // Envoyer en arrière-plan sans bloquer la redirection
        sendNewArticleEmail({
          recipients: leads.map((l) => l.email),
          title: `Nouveau produit : ${payload.title}`,
          excerpt: payload.short_description,
          slug: payload.slug,
          imageUrl: payload.image_url,
        }).catch((err) => {
          console.error("[saveProductAction] Erreur envoi email :", err);
        });
      }
    } catch (err) {
      console.error("[saveProductAction] Erreur récupération leads :", err);
    }
  }

  revalidatePath("/admin/produits");
  revalidatePath("/produits");
  redirect("/admin/produits");
}

export async function deleteProductAction(id: string) {
  const supabase = await createClient();
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/admin/produits");
  revalidatePath("/produits");
}

/* ---------- RÉALISATIONS ---------- */

export async function saveRealisationAction(id: string | null, formData: FormData) {
  const supabase = await createClient();
  const payload = {
    slug: String(formData.get("slug") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    category_id: String(formData.get("category_id") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    image_url: String(formData.get("image_url") ?? "").trim(),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
    display_order: Number(formData.get("display_order") ?? 0),
    updated_at: new Date().toISOString(),
  };

  if (!payload.slug || !payload.title || !payload.category || !payload.category_id || !payload.image_url)
    return { error: "Slug, titre, catégorie et image sont obligatoires." };

  let error;
  if (id) ({ error } = await supabase.from("realisations").update(payload).eq("id", id));
  else ({ error } = await supabase.from("realisations").insert(payload));

  if (error) return { error: error.message };
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
  redirect("/admin/realisations");
}

export async function deleteRealisationAction(id: string) {
  const supabase = await createClient();
  await supabase.from("realisations").delete().eq("id", id);
  revalidatePath("/admin/realisations");
  revalidatePath("/realisations");
}

/* ---------- LEADS ---------- */

export async function updateLeadStatusAction(id: string, status: string) {
  const supabase = await createClient();
  await supabase.from("leads").update({ status }).eq("id", id);
  revalidatePath("/admin/leads");
}

export async function deleteLeadAction(id: string) {
  const supabase = await createClient();
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
}

/* ---------- PROFIL ---------- */

export async function updateProfileNameAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return { error: "Le nom est obligatoire." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { name },
  });

  if (error) return { error: error.message };
  revalidatePath("/admin", "layout");
  return { success: "Nom mis à jour." };
}

export async function updateProfileEmailAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  if (!email || !email.includes("@"))
    return { error: "Email invalide." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ email });

  if (error) return { error: error.message };
  return {
    success:
      "Un email de confirmation a été envoyé à la nouvelle adresse. Cliquez sur le lien pour valider.",
  };
}

export async function updateProfilePasswordAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8)
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };
  if (password !== confirm)
    return { error: "Les deux mots de passe ne correspondent pas." };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) return { error: error.message };
  return { success: "Mot de passe mis à jour." };
}

/* ---------- UTILISATEURS ---------- */

export async function createUserAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const name = String(formData.get("name") ?? "").trim();

  if (!email || !email.includes("@"))
    return { error: "Email invalide." };
  if (password.length < 8)
    return { error: "Le mot de passe doit contenir au moins 8 caractères." };

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { name: name || email },
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/parametres");
  return { success: `Utilisateur ${email} créé avec succès.` };
}

export async function deleteUserAction(userId: string) {
  const admin = createAdminClient();
  await admin.auth.admin.deleteUser(userId);
  revalidatePath("/admin/parametres");
  return { success: "Utilisateur supprimé." };
}

/* ---------- UPLOAD D'IMAGES ---------- */

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File | null;
  const folder = String(formData.get("folder") ?? "general");

  if (!file) return { error: "Aucun fichier reçu." };

  // Vérifications
  if (file.size > 5 * 1024 * 1024) {
    return { error: "Le fichier dépasse 5 Mo." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowed.includes(file.type)) {
    return { error: "Format non supporté (JPG, PNG, WebP, GIF uniquement)." };
  }

  const supabase = await createClient();

  // Nom unique : dossiers/date-uuid.ext
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `${folder}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) return { error: error.message };

  // URL publique
  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return {
    success: "Image uploadée.",
    url: urlData.publicUrl,
  };
}
/* ---------- PROJETS ---------- */

export async function updateProjectStatusAction(id: string, status: string) {
  const supabase = await createClient();
  await supabase
    .from("projects")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  revalidatePath("/admin/projects");
}

export async function deleteProjectAction(id: string) {
  const supabase = await createClient();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
}