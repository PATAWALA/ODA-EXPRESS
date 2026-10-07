import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  sendProjectConfirmationToClient,
  sendProjectNotificationToAdmin,
} from "@/lib/email/send";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim() || null;
    const service = String(body.service ?? "").trim() || null;
    const message = String(body.message ?? "").trim();

    if (!name) {
      return NextResponse.json(
        { ok: false, error: "Le nom est obligatoire." },
        { status: 400 },
      );
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Email invalide." },
        { status: 400 },
      );
    }
    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Le message est obligatoire." },
        { status: 400 },
      );
    }

    const images: string[] = Array.isArray(body.images)
      ? body.images.filter((u: unknown) => typeof u === "string" && u.length > 0)
      : [];

    const supabase = createAdminClient();

    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        name,
        email,
        phone,
        service,
        message,
        images,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("[api/projects] Erreur insert :", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 },
      );
    }

    sendProjectConfirmationToClient({
      email,
      name,
      service,
      message,
      images,
    }).catch((err) => console.error("[projects] welcome error:", err));

    sendProjectNotificationToAdmin({
      name,
      email,
      phone,
      service,
      message,
      images,
      projectId: project?.id ?? "",
    }).catch((err) => console.error("[projects] admin error:", err));

    return NextResponse.json({ ok: true, projectId: project?.id });
  } catch (err) {
    console.error("[api/projects] Erreur :", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}