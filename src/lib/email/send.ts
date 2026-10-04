import { getResend, FROM_EMAIL, FROM_NAME, ADMIN_EMAIL } from "./resend";
import { WelcomeEmail } from "./templates/welcome";
import { AdminNotificationEmail } from "./templates/admin-notification";
import { NewArticleEmail } from "./templates/new-article";

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
  const firstName = params.name?.split(" ")[0] ?? "cher client";
  const sourceLabel = SOURCE_LABELS[params.source] ?? "notre site";

  if (TEST_MODE) {
    console.log("\n========== [TEST MODE] EMAIL AU PROSPECT ==========");
    console.log("À       :", params.email);
    console.log("Sujet   :", "Nous avons bien reçu votre demande — ODA Sources");
    console.log("Contenu : WelcomeEmail");
    console.log("  Bonjour", firstName);
    console.log("  Source :", sourceLabel);
    console.log("===================================================\n");
    return { ok: true };
  }

  const { error } = await getResend().emails.send({
    from: FROM,
    to: [params.email],
    replyTo: ADMIN_EMAIL,
    subject: "Nous avons bien reçu votre demande — ODA Sources",
    react: WelcomeEmail({ firstName, sourceLabel }),
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
}): Promise<{ ok: boolean; error?: string }> {
  const sourceLabel = SOURCE_LABELS[params.source] ?? params.source;

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
    console.log("  Bouton : Se connecter au back-office → /admin/login");
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