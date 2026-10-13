"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendNewArticleEmail,
  sendRecommendationEmail,
  sendMonthlyDigest,
} from "@/lib/email/send";
import {
  createPartnerSector,
  updatePartnerSector,
  deletePartnerSector,
} from "@/lib/data/partner-sectors";
import {
  createPartner,
  updatePartner,
  deletePartner,
} from "@/lib/data/partners";
import {
  createPartnerProduct,
  deletePartnerProduct,
} from "@/lib/data/partner-products";

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

/* ---------- NEWSLETTER : VEILLE MENSUELLE ---------- */

export async function sendMonthlyDigestAction(formData: FormData) {
  const month = String(formData.get("month") ?? "").trim();
  const productTitle = String(formData.get("product_title") ?? "").trim();
  const productDescription = String(
    formData.get("product_description") ?? "",
  ).trim();
  const productImageUrl = String(
    formData.get("product_image_url") ?? "",
  ).trim();
  const freightUpdate = String(formData.get("freight_update") ?? "").trim();
  const tip = String(formData.get("tip") ?? "").trim();

  if (!month || !productTitle || !productDescription || !freightUpdate || !tip) {
    return { error: "Tous les champs obligatoires doivent être remplis." };
  }

  const supabase = createAdminClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("email")
    .not("email", "is", null);

  if (!leads || leads.length === 0) {
    return { error: "Aucun contact à qui envoyer la veille." };
  }

  const result = await sendMonthlyDigest({
    recipients: leads.map((l) => l.email),
    month,
    productHighlight: {
      title: productTitle,
      description: productDescription,
      imageUrl: productImageUrl || undefined,
    },
    freightUpdate,
    tip,
  });

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de l'envoi." };
  }

  revalidatePath("/admin/newsletter");
  return {
    success: `Veille envoyée à ${result.sent} contact${
      result.sent > 1 ? "s" : ""
    }.`,
  };
}

/* ---------- NEWSLETTER : RECOMMANDATION ---------- */

export async function sendRecommendationEmailAction() {
  const supabase = createAdminClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("email")
    .not("email", "is", null);

  if (!leads || leads.length === 0) {
    return { error: "Aucun contact à qui envoyer l'email." };
  }

  const result = await sendRecommendationEmail({
    recipients: leads.map((l) => l.email),
  });

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de l'envoi." };
  }

  revalidatePath("/admin/newsletter");
  return {
    success: `Email de recommandation envoyé à ${result.sent} contact${
      result.sent > 1 ? "s" : ""
    }.`,
  };
}

/* ---------- NEWSLETTER : VEILLE PROGRAMMÉE ---------- */

export async function createVeilleAction(formData: FormData) {
  const scheduledFor = String(formData.get("scheduled_for") ?? "").trim();
  const monthLabel = String(formData.get("month_label") ?? "").trim();
  const productTitle = String(formData.get("product_title") ?? "").trim();
  const productDescription = String(
    formData.get("product_description") ?? "",
  ).trim();
  const productImageUrl = String(
    formData.get("product_image_url") ?? "",
  ).trim();
  const freightUpdate = String(formData.get("freight_update") ?? "").trim();
  const tip = String(formData.get("tip") ?? "").trim();

  if (!scheduledFor || !monthLabel || !productTitle || !productDescription || !freightUpdate || !tip) {
    return { error: "Tous les champs obligatoires doivent être remplis." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("newsletter_veilles").insert({
    scheduled_for: new Date(scheduledFor).toISOString(),
    month_label: monthLabel,
    product_title: productTitle,
    product_description: productDescription,
    product_image_url: productImageUrl || null,
    freight_update: freightUpdate,
    tip,
    status: "pending",
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/newsletter/programmer");
  return {
    success: `Veille programmée pour le ${new Date(scheduledFor).toLocaleDateString("fr-FR")}.`,
  };
}

export async function deleteVeilleAction(id: string) {
  const supabase = await createClient();
  await supabase.from("newsletter_veilles").delete().eq("id", id);
  revalidatePath("/admin/newsletter/programmer");
}

/* -------------------------------------------------------------------------- */
/*  PARTENAIRES & RÉSEAU                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Crée ou met à jour un partenaire.
 * Si `id` est fourni → update. Sinon → insert.
 */
export async function savePartnerAction(
  id: string | null,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Le nom du partenaire est obligatoire." };
  }

  const type = String(formData.get("type") ?? "supplier").trim();
  const sectorId = String(formData.get("sector_id") ?? "").trim() || null;
  const contactName =
    String(formData.get("contact_name") ?? "").trim() || null;
  const whatsapp = String(formData.get("whatsapp") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim() || null;
  const email = String(formData.get("email") ?? "").trim() || null;
  const country = String(formData.get("country") ?? "").trim() || null;
  const city = String(formData.get("city") ?? "").trim() || null;
  const description = String(formData.get("description") ?? "").trim() || null;
  const logoUrl = String(formData.get("logo_url") ?? "").trim() || null;
  const website = String(formData.get("website") ?? "").trim() || null;

  const payload = {
    name,
    type,
    sector_id: sectorId,
    contact_name: contactName,
    whatsapp,
    phone,
    email,
    country,
    city,
    description,
    logo_url: logoUrl,
    website,
  };

  let result;
  if (id) {
    result = await updatePartner(id, payload);
  } else {
    result = await createPartner(payload);
  }

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de l'enregistrement." };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/admin/partners/" + (id ?? "nouveau"));

  return {
    success: id
      ? `Le partenaire « ${name} » a été mis à jour.`
      : `Le partenaire « ${name} » a été créé.`,
  };
}

/**
 * Supprime un partenaire.
 */
export async function deletePartnerAction(id: string) {
  const result = await deletePartner(id);
  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de la suppression." };
  }
  revalidatePath("/admin/partners");
  return { success: "Partenaire supprimé." };
}

/* -------------------------------------------------------------------------- */
/*  SECTEURS DE PARTENAIRES                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Crée un nouveau secteur.
 */
export async function createPartnerSectorAction(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Le nom de la catégorie est obligatoire." };
  }

  const description =
    String(formData.get("description") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "supplier").trim();

  const result = await createPartnerSector({ name, description, type });

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de la création." };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/admin/partners/secteurs");

  return {
    success: `La catégorie « ${name} » a été créée.`,
    sector: result.data,
  };
}

/**
 * Met à jour un secteur existant.
 */
export async function updatePartnerSectorAction(
  id: string,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  if (!name) {
    return { error: "Le nom de la catégorie est obligatoire." };
  }

  const description =
    String(formData.get("description") ?? "").trim() || null;
  const type = String(formData.get("type") ?? "supplier").trim();

  const result = await updatePartnerSector(id, { name, description, type });

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de la mise à jour." };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/admin/partners/secteurs");

  return { success: `La catégorie « ${name} » a été mise à jour.` };
}

/**
 * Supprime un secteur.
 * ⚠️ Les partenaires associés ne sont pas supprimés, ils perdent juste leur secteur.
 */
export async function deletePartnerSectorAction(id: string) {
  const result = await deletePartnerSector(id);
  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de la suppression." };
  }

  revalidatePath("/admin/partners");
  revalidatePath("/admin/partners/secteurs");

  return { success: "Secteur supprimé." };
}

/* -------------------------------------------------------------------------- */
/*  UPLOAD LOGO PARTENAIRE                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Upload une image de logo pour un partenaire.
 * Réutilise le bucket "media" avec le dossier "partners".
 */
export async function uploadPartnerLogoAction(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "Aucun fichier reçu." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: "Le fichier dépasse 5 Mo." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml"];
  if (!allowed.includes(file.type)) {
    return {
      error: "Format non supporté (JPG, PNG, WebP, SVG uniquement).",
    };
  }

  const supabase = await createClient();

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `partners/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return { error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return {
    success: "Logo uploadé.",
    url: urlData.publicUrl,
  };
}

/* -------------------------------------------------------------------------- */
/*  UPLOAD PRODUIT PARTENAIRE                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Upload une image de produit partenaire.
 * Réutilise le bucket "media" avec le dossier "partner-products".
 */
export async function uploadPartnerProductImageAction(formData: FormData) {
  const file = formData.get("file") as File | null;

  if (!file) {
    return { error: "Aucun fichier reçu." };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { error: "Le fichier dépasse 5 Mo." };
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return { error: "Format non supporté (JPG, PNG, WebP uniquement)." };
  }

  const supabase = await createClient();

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const fileName = `partner-products/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}.${ext}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    return { error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return {
    success: "Produit uploadé.",
    url: urlData.publicUrl,
  };
}

/* -------------------------------------------------------------------------- */
/*  AJOUTER / SUPPRIMER PRODUIT PARTENAIRE                                     */
/* -------------------------------------------------------------------------- */

/**
 * Ajoute une image produit à un partenaire.
 */
export async function addPartnerProductAction(
  partnerId: string,
  imageUrl: string,
  title?: string,
) {
  const result = await createPartnerProduct({
    partner_id: partnerId,
    image_url: imageUrl,
    title: title ?? null,
  });

  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de l'ajout." };
  }

  revalidatePath(`/admin/partners/${partnerId}`);
  revalidatePath("/admin/partners");
  return { success: "Produit ajouté." };
}

/**
 * Supprime une image produit.
 */
export async function deletePartnerProductAction(
  productId: string,
  partnerId: string,
) {
  const result = await deletePartnerProduct(productId);
  if (!result.ok) {
    return { error: result.error ?? "Erreur lors de la suppression." };
  }

  revalidatePath(`/admin/partners/${partnerId}`);
  revalidatePath("/admin/partners");
  return { success: "Produit supprimé." };
}

