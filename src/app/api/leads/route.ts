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

    // UPSERT dans Supabase (admin contourne le RLS)
    const { error } = await supabase.from("leads").upsert(
      {
        email,
        name: body.name?.trim() || null,
        phone: body.phone?.trim() || null,
        message: body.message?.trim() || null,
        source: body.source ?? "newsletter",
        metadata: body.metadata ?? {},
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

    // Envoi des emails en arrière-plan
    Promise.all([
      sendWelcomeEmail({
        email,
        name: body.name,
        source: body.source ?? "newsletter",
      }),
      sendAdminNotification({
        email,
        name: body.name,
        phone: body.phone,
        source: body.source ?? "newsletter",
        message: body.message,
      }),
    ]).catch((err) => {
      console.error("[api/leads] Erreur envoi emails :", err);
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/leads] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}