import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendRecommendationEmail,
  sendMonthlyDigest,
} from "@/lib/email/send";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: Request) {
  // 🔐 Vérification du secret Vercel Cron
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    console.error("[cron/newsletter] CRON_SECRET manquant");
    return NextResponse.json(
      { ok: false, error: "CRON_SECRET non configuré" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { ok: false, error: "Non autorisé" },
      { status: 401 },
    );
  }

  const supabase = createAdminClient();
  const results: Record<string, unknown> = {};
  const today = new Date();

  try {
    // ================================================================
    // 1. VEILLES PROGRAMMÉES — Envoyer celles dont la date est arrivée
    // ================================================================
    const { data: veilles } = await supabase
      .from("newsletter_veilles")
      .select("*")
      .eq("status", "pending")
      .lte("scheduled_for", today.toISOString())
      .order("scheduled_for", { ascending: true });

    if (veilles && veilles.length > 0) {
      const { data: leads } = await supabase
        .from("leads")
        .select("email")
        .not("email", "is", null);

      const recipients = (leads ?? []).map((l) => l.email);

      for (const veille of veilles) {
        console.log(`[cron/newsletter] Envoi veille : ${veille.month_label}`);

        const result = await sendMonthlyDigest({
          recipients,
          month: veille.month_label,
          productHighlight: {
            title: veille.product_title,
            description: veille.product_description,
            imageUrl: veille.product_image_url || undefined,
          },
          freightUpdate: veille.freight_update,
          tip: veille.tip,
        });

        await supabase
          .from("newsletter_veilles")
          .update({
            status: result.ok ? "sent" : "pending",
            sent_at: result.ok ? new Date().toISOString() : null,
            recipients_count: result.sent,
          })
          .eq("id", veille.id);

        results[`veille_${veille.id}`] = result;
      }
    } else {
      results.veilles = { info: "Aucune veille programmée" };
    }

    // ================================================================
    // 2. RECOMMANDATION — Envoyer si on est le 15 du mois
    // ================================================================
    const dayOfMonth = today.getDate();

    if (dayOfMonth === 15) {
      console.log("[cron/newsletter] Envoi recommandation mensuelle");

      const { data: leads } = await supabase
        .from("leads")
        .select("email")
        .not("email", "is", null);

      const recipients = (leads ?? []).map((l) => l.email);

      if (recipients.length > 0) {
        const result = await sendRecommendationEmail({ recipients });
        results.recommendation = result;
      } else {
        results.recommendation = { ok: true, sent: 0, info: "Aucun contact" };
      }
    } else {
      results.recommendation = {
        ok: true,
        skipped: true,
        info: `Pas le 15 (aujourd'hui : ${dayOfMonth})`,
      };
    }

    return NextResponse.json({
      ok: true,
      executedAt: today.toISOString(),
      results,
    });
  } catch (err) {
    console.error("[cron/newsletter] Erreur :", err);
    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "Erreur inconnue",
      },
      { status: 500 },
    );
  }
}