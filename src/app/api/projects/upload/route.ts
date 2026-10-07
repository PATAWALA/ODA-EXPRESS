import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = String(formData.get("folder") ?? "projects");

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "Aucun fichier reçu." },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "Le fichier dépasse 5 Mo." },
        { status: 400 },
      );
    }

    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Format non supporté (JPG, PNG, WebP, GIF uniquement).",
        },
        { status: 400 },
      );
    }

    const supabase = createAdminClient();

    const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const fileName = `${folder}/${Date.now()}-${Math.random()
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
      console.error("[api/projects/upload] Erreur upload :", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 },
      );
    }

    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(fileName);

    return NextResponse.json({ ok: true, url: urlData.publicUrl });
  } catch (err) {
    console.error("[api/projects/upload] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}