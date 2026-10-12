import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const sectorId = String(body.sector_id ?? "").trim() || null;
    const whatsapp = String(body.whatsapp ?? "").trim() || null;
    const email = String(body.email ?? "").trim() || null;
    const country = String(body.country ?? "").trim() || null;
    const city = String(body.city ?? "").trim() || null;
    const description = String(body.description ?? "").trim() || null;
    const website = String(body.website ?? "").trim() || null;

    // Honeypot anti-spam : si rempli, c'est un bot
    const honeypot = String(body._hp ?? "").trim();
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Le nom est obligatoire." },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("partners").insert({
      name,
      sector_id: sectorId,
      whatsapp,
      email,
      country,
      city,
      description,
      website,
    });

    if (error) {
      console.error("[api/partners/register]", error);
      return NextResponse.json(
        { ok: false, error: "Erreur lors de l'enregistrement." },
        { status: 400 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/partners/register] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}