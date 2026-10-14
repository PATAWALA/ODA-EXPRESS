import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const type = String(body.type ?? "supplier").trim();
    const sectorId = String(body.sector_id ?? "").trim() || null;
    const contactName =
      String(body.contact_name ?? "").trim() || null;
    const wechat = String(body.wechat ?? "").trim() || null;
    const whatsapp = String(body.whatsapp ?? "").trim() || null;
    const email = String(body.email ?? "").trim() || null;
    const country = String(body.country ?? "").trim() || null;
    const city = String(body.city ?? "").trim() || null;
    const description = String(body.description ?? "").trim() || null;
    const website = String(body.website ?? "").trim() || null;

    const productFiles: string[] = Array.isArray(body.product_files)
      ? body.product_files.filter(
          (u: unknown) => typeof u === "string" && u.length > 0,
        )
      : [];

    // Honeypot anti-spam
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

    // 1. Créer le partenaire
    const { data: partner, error: partnerError } = await supabase
      .from("partners")
      .insert({
        name,
        type,
        sector_id: sectorId,
        contact_name: contactName,
        wechat,
        whatsapp,
        email,
        country,
        city,
        description,
        website,
      })
      .select("id")
      .single();

    if (partnerError || !partner) {
      console.error("[api/partners/register]", partnerError);
      return NextResponse.json(
        { ok: false, error: "Erreur lors de l'enregistrement." },
        { status: 400 },
      );
    }

    // 2. Ajouter les fichiers s'il y en a
    if (productFiles.length > 0) {
      const products = productFiles.map((url) => ({
        partner_id: partner.id,
        image_url: url,
      }));

      const { error: productsError } = await supabase
        .from("partner_products")
        .insert(products);

      if (productsError) {
        console.error("[api/partners/register] products", productsError);
      }
    }

    return NextResponse.json({ ok: true, partnerId: partner.id });
  } catch (err) {
    console.error("[api/partners/register] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}