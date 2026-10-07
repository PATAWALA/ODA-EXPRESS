import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendWelcomeEmail, sendAdminNotification } from "@/lib/email/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    // Récupérer les images si fournies (tableau d'URLs)
    const images: string[] = Array.isArray(body.images)
      ? body.images.filter((u: unknown) => typeof u === "string" && u.length > 0)
      : [];

    // Fusionner avec le metadata existant
    const metadata = {
      ...(body.metadata ?? {}),
      ...(images.length > 0 ? { images } : {}),
    };

    // UPSERT dans Supabase (admin contourne le RLS)
    const { error } = await supabase.from("leads").upsert(
      {
        email,
        name: body.name?.trim() || null,
        phone: body.phone?.trim() || null,
        message: body.message?.trim() || null,
        source: body.source ?? "newsletter",
        metadata,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "email", ignoreDuplicates: false },
    );

    if (error) {
      console.error("[api/leads] Erreur upsert :", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 },
      );
    }

    // ========== DEBUG TEMPORAIRE ==========
    console.log("\n===== [DEBUG] DÉBUT ENVOI EMAILS =====");
    console.log("[DEBUG] email client :", email);
    console.log("[DEBUG] email admin  :", process.env.ADMIN_EMAIL);
    console.log("[DEBUG] images       :", images.length);
    console.log("[DEBUG] source       :", body.source);
    console.log("[DEBUG] name         :", body.name);

    // Email client
    sendWelcomeEmail({
      email,
      name: body.name,
      source: body.source ?? "newsletter",
    })
      .then((r) => console.log("[DEBUG] welcome →", JSON.stringify(r)))
      .catch((err) => console.error("[DEBUG] welcome ERROR →", err));

    // Email admin
    sendAdminNotification({
      email,
      name: body.name,
      phone: body.phone,
      source: body.source ?? "newsletter",
      message: body.message,
      images,
    })
      .then((r) => console.log("[DEBUG] admin →", JSON.stringify(r)))
      .catch((err) => console.error("[DEBUG] admin ERROR →", err));

    console.log("===== [DEBUG] FIN DÉCLENCHEMENT =====\n");
    // ========== FIN DEBUG ==========

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/leads] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}