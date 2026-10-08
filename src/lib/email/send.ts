import { getResend, FROM_EMAIL, FROM_NAME, ADMIN_EMAIL } from "./resend";
import { WelcomeEmail } from "./templates/welcome";
import { NewsletterWelcomeEmail } from "./templates/newsletter-welcome";
import { AdminNotificationEmail } from "./templates/admin-notification";
import { NewArticleEmail } from "./templates/new-article";
import { RecommendationEmail } from "./templates/recommendation";
import { MonthlyDigestEmail } from "./templates/monthly-digest";

const FROM = `${FROM_NAME} <${FROM_EMAIL}>`;

/* Mode test : si RESEND_TEST_MODE=true, on log au lieu d'envoyer */
const TEST_MODE = process.env.RESEND_TEST_MODE === "true";

const SOURCE_LABELS: Record<string, string> = {
  contact: "le formulaire de contact",
  newsletter: "la newsletter",
  "exit-intent": "le formulaire d'inscription",
  project: "votre demande de projet",
  admin: "notre site",
};

/* -------------------------------------------------------------------------- */
/*  1. Confirmation au prospect                                                */
/* -------------------------------------------------------------------------- */

export async function sendWelcomeEmail(params: {
  email: string;
  name?: string;
  source: string;
}): Promise<{ ok: boolean; error?: string }> {
  const firstName = params.name?.split(" ")[0];
  const sourceLabel = SOURCE_LABELS[params.source] ?? "notre site";

  // Détection du type d'inscription
  const isNewsletterSignup =
    params.source === "newsletter" || params.source === "exit-intent";

  // Choisir le bon template
  const emailTemplate = isNewsletterSignup
    ? NewsletterWelcomeEmail({ firstName })
    : WelcomeEmail({ firstName: firstName ?? "cher client", sourceLabel });

  const subject = isNewsletterSignup
    ? "Bienvenue dans la veille import ODA Sources 🌍"
    : "Nous avons bien reçu votre demande — ODA Sources";

  if (TEST_MODE) {
    console.log("\n========== [TEST MODE] EMAIL AU PROSPECT ==========");
    console.log("À       :", params.email);
    console.log(
      "Type    :",
      isNewsletterSignup ? "Bienvenue newsletter" : "Confirmation demande",
    );
    console.log("Sujet   :", subject);
    console.log("Prénom  :", firstName ?? "—");
    console.log("Source  :", sourceLabel);
    console.log("===================================================\n");
    return { ok: true };
  }

  const { error } = await getResend().emails.send({
    from: FROM,
    to: [params.email],
    replyTo: ADMIN_EMAIL,
    subject,
    react: emailTemplate,
  });

  if (error) {
    console.error("[sendWelcomeEmail]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  2. Notification à l'admin                                                  */
/* -------------------------------------------------------------------------- */

export async function sendAdminNotification(params: {
  name?: string;
  email: string;
  phone?: string;
  source: string;
  message?: string;
  images?: string[];
}): Promise<{ ok: boolean; error?: string }> {
  const sourceLabel = SOURCE_LABELS[params.source] ?? params.source;
  const images = params.images ?? [];

  if (TEST_MODE) {
    console.log("\n========== [TEST MODE] EMAIL À L'ADMIN ==========");
    console.log("À       :", ADMIN_EMAIL);
    console.log("Sujet   :", `Nouvelle demande — ${params.name ?? params.email}`);
    console.log("Contenu : AdminNotificationEmail");
    console.log("  Nom    :", params.name ?? "—");
    console.log("  Email  :", params.email);
    console.log("  Tél    :", params.phone ?? "—");
    console.log("  Source :", sourceLabel);
    console.log("  Message:", params.message ?? "—");
    console.log(
      "  Images :",
      images.length > 0 ? `${images.length} image(s)` : "—",
    );
    images.forEach((url, i) => console.log(`    #${i + 1} :`, url));
    console.log("===============================================\n");
    return { ok: true };
  }

  const { error } = await getResend().emails.send({
    from: FROM,
    to: [ADMIN_EMAIL],
    replyTo: params.email,
    subject: `Nouvelle demande — ${params.name ?? params.email}`,
    react: AdminNotificationEmail({
      name: params.name ?? null,
      email: params.email,
      phone: params.phone ?? null,
      source: sourceLabel,
      message: params.message ?? null,
      images,
    }),
  });

  if (error) {
    console.error("[sendAdminNotification]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  3. Nouvel article envoyé à tous les leads                                  */
/* -------------------------------------------------------------------------- */

export async function sendNewArticleEmail(params: {
  recipients: string[];
  title: string;
  excerpt: string;
  slug: string;
  imageUrl?: string | null;
}): Promise<{ ok: boolean; sent: number; error?: string }> {
  if (params.recipients.length === 0) {
    return { ok: true, sent: 0 };
  }

  const uniqueRecipients = Array.from(
    new Set(params.recipients.filter((e) => e && e.includes("@"))),
  );

  if (TEST_MODE) {
    console.log("\n========== [TEST MODE] NOUVEL ARTICLE ==========");
    console.log("Destinataires :", uniqueRecipients.length, "leads");
    console.log("Sujet         :", `Nouveauté ODA Sources — ${params.title}`);
    console.log("Contenu       : NewArticleEmail");
    console.log("  Titre   :", params.title);
    console.log("  Extrait :", params.excerpt);
    console.log("  Lien    :", `/actualites/${params.slug}`);
    console.log("  Image   :", params.imageUrl ?? "—");
    console.log("================================================\n");
    return { ok: true, sent: uniqueRecipients.length };
  }

  const batches: string[][] = [];
  for (let i = 0; i < uniqueRecipients.length; i += 50) {
    batches.push(uniqueRecipients.slice(i, i + 50));
  }

  let totalSent = 0;
  let lastError: string | undefined;

  for (const batch of batches) {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: batch,
      subject: `Nouveauté ODA Sources — ${params.title}`,
      react: NewArticleEmail({
        title: params.title,
        excerpt: params.excerpt,
        slug: params.slug,
        imageUrl: params.imageUrl ?? null,
      }),
    });

    if (error) {
      console.error("[sendNewArticleEmail] Erreur batch :", error);
      lastError = error.message;
    } else {
      totalSent += batch.length;
    }
  }

  return { ok: !lastError, sent: totalSent, error: lastError };
}

/* -------------------------------------------------------------------------- */
/*  4. Confirmation de projet au client                                        */
/* -------------------------------------------------------------------------- */

export async function sendProjectConfirmationToClient(params: {
  email: string;
  name: string;
  service: string | null;
  message: string;
  images: string[];
}): Promise<{ ok: boolean; error?: string }> {
  const firstName = params.name.split(" ")[0];

  if (TEST_MODE) {
    console.log("\n===== [TEST MODE] CONFIRMATION PROJET CLIENT =====");
    console.log("À       :", params.email);
    console.log("Prénom  :", firstName);
    console.log("Service :", params.service ?? "—");
    console.log("Images  :", params.images.length);
    console.log("==================================================\n");
    return { ok: true };
  }

  const { error } = await getResend().emails.send({
    from: FROM,
    to: [params.email],
    replyTo: ADMIN_EMAIL,
    subject: "Nous avons bien reçu votre projet — ODA Sources",
    react: WelcomeEmail({
      firstName,
      sourceLabel: "votre demande de projet",
    }),
  });

  if (error) {
    console.error("[sendProjectConfirmationToClient]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  5. Notification de projet à l'admin                                        */
/* -------------------------------------------------------------------------- */

export async function sendProjectNotificationToAdmin(params: {
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  images: string[];
  projectId: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (TEST_MODE) {
    console.log("\n===== [TEST MODE] PROJET ADMIN =====");
    console.log("Nom     :", params.name);
    console.log("Email   :", params.email);
    console.log("Service :", params.service ?? "—");
    console.log("Images  :", params.images.length);
    console.log("Projet  :", params.projectId);
    console.log("====================================\n");
    return { ok: true };
  }

  const { error } = await getResend().emails.send({
    from: FROM,
    to: [ADMIN_EMAIL],
    replyTo: params.email,
    subject: `Nouveau projet — ${params.name}`,
    react: AdminNotificationEmail({
      name: params.name,
      email: params.email,
      phone: params.phone,
      source: params.service ?? "Projet",
      message: params.message,
      images: params.images,
    }),
  });

  if (error) {
    console.error("[sendProjectNotificationToAdmin]", error);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/* -------------------------------------------------------------------------- */
/*  7. Email de recommandation — "Partagez à un proche"                        */
/* -------------------------------------------------------------------------- */

export async function sendRecommendationEmail(params: {
  recipients: string[];
}): Promise<{ ok: boolean; sent: number; error?: string }> {
  if (params.recipients.length === 0) {
    return { ok: true, sent: 0 };
  }

  const uniqueRecipients = Array.from(
    new Set(params.recipients.filter((e) => e && e.includes("@"))),
  );

  console.log(
    "[sendRecommendationEmail] Début envoi à",
    uniqueRecipients.length,
    "contacts",
  );

  if (TEST_MODE) {
    console.log("\n===== [TEST MODE] EMAIL RECOMMANDATION =====");
    console.log("Destinataires :", uniqueRecipients.length, "emails");
    console.log("===========================================\n");
    return { ok: true, sent: uniqueRecipients.length };
  }

  // ⚠️ SÉCURITÉ : limiter à 100 destinataires par envoi
  const limitedRecipients = uniqueRecipients.slice(0, 100);

  const batches: string[][] = [];
  for (let i = 0; i < limitedRecipients.length; i += 50) {
    batches.push(limitedRecipients.slice(i, i + 50));
  }

  console.log("[sendRecommendationEmail]", batches.length, "batch(es) à envoyer");

  let totalSent = 0;
  let lastError: string | undefined;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(
      `[sendRecommendationEmail] Envoi batch ${i + 1}/${batches.length} (${batch.length} emails)...`,
    );

    try {
      const { error } = await getResend().emails.send({
        from: FROM,
        to: batch,
        subject: "Vous connaissez quelqu'un qui importe de Chine ?",
        react: RecommendationEmail({}),
      });

      if (error) {
        console.error(
          `[sendRecommendationEmail] Erreur batch ${i + 1} :`,
          error,
        );
        lastError = error.message;
      } else {
        console.log(
          `[sendRecommendationEmail] Batch ${i + 1} OK (${batch.length} envoyés)`,
        );
        totalSent += batch.length;
      }
    } catch (err) {
      console.error(`[sendRecommendationEmail] Exception batch ${i + 1} :`, err);
      lastError = err instanceof Error ? err.message : "Erreur inconnue";
    }
  }

  console.log(
    "[sendRecommendationEmail] Terminé. Total envoyé :",
    totalSent,
    "/",
    limitedRecipients.length,
  );

  return { ok: !lastError, sent: totalSent, error: lastError };
}

/* -------------------------------------------------------------------------- */
/*  8. Veille import mensuelle                                                 */
/* -------------------------------------------------------------------------- */

export async function sendMonthlyDigest(params: {
  recipients: string[];
  month: string;
  productHighlight: {
    title: string;
    description: string;
    imageUrl?: string;
  };
  freightUpdate: string;
  tip: string;
}): Promise<{ ok: boolean; sent: number; error?: string }> {
  if (params.recipients.length === 0) {
    return { ok: true, sent: 0 };
  }

  const uniqueRecipients = Array.from(
    new Set(params.recipients.filter((e) => e && e.includes("@"))),
  );

  if (TEST_MODE) {
    console.log("\n===== [TEST MODE] VEILLE MENSUELLE =====");
    console.log("Mois          :", params.month);
    console.log("Destinataires :", uniqueRecipients.length, "emails");
    console.log("Produit       :", params.productHighlight.title);
    console.log("========================================\n");
    return { ok: true, sent: uniqueRecipients.length };
  }

  const batches: string[][] = [];
  for (let i = 0; i < uniqueRecipients.length; i += 50) {
    batches.push(uniqueRecipients.slice(i, i + 50));
  }

  let totalSent = 0;
  let lastError: string | undefined;

  for (const batch of batches) {
    const { error } = await getResend().emails.send({
      from: FROM,
      to: batch,
      subject: `📦 Veille import ${params.month} — Nouveautés & conseils`,
      react: MonthlyDigestEmail({
        month: params.month,
        productHighlight: params.productHighlight,
        freightUpdate: params.freightUpdate,
        tip: params.tip,
      }),
    });

    if (error) {
      console.error("[sendMonthlyDigest] Erreur batch :", error);
      lastError = error.message;
    } else {
      totalSent += batch.length;
    }
  }

  return { ok: !lastError, sent: totalSent, error: lastError };
}