import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const maxDuration = 60;

// Taille max par catégorie (en octets)
const MAX_SIZES = {
  image: 5 * 1024 * 1024, // 5 Mo
  document: 20 * 1024 * 1024, // 20 Mo
  video: 50 * 1024 * 1024, // 50 Mo
  archive: 50 * 1024 * 1024, // 50 Mo
};

// Types MIME acceptés
const ALLOWED_MIME: Record<string, keyof typeof MAX_SIZES> = {
  // Images
  "image/jpeg": "image",
  "image/png": "image",
  "image/webp": "image",
  "image/gif": "image",
  "image/svg+xml": "image",
  // Documents
  "application/pdf": "document",
  "application/msword": "document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "document",
  "application/vnd.ms-excel": "document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "document",
  "application/vnd.ms-powerpoint": "document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "document",
  // Vidéos
  "video/mp4": "video",
  "video/webm": "video",
  "video/quicktime": "video",
  // Archives
  "application/zip": "archive",
  "application/x-zip-compressed": "archive",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { ok: false, error: "Aucun fichier reçu." },
        { status: 400 },
      );
    }

    // Type connu ?
    const category = ALLOWED_MIME[file.type];
    if (!category) {
      // Fallback : vérifier par extension
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      const extMap: Record<string, keyof typeof MAX_SIZES> = {
        jpg: "image",
        jpeg: "image",
        png: "image",
        webp: "image",
        gif: "image",
        svg: "image",
        pdf: "document",
        doc: "document",
        docx: "document",
        xls: "document",
        xlsx: "document",
        ppt: "document",
        pptx: "document",
        mp4: "video",
        webm: "video",
        mov: "video",
        zip: "archive",
      };
      const inferredCategory = extMap[ext];
      if (!inferredCategory) {
        return NextResponse.json(
          { ok: false, error: "Format non supporté." },
          { status: 400 },
        );
      }
      return handleUpload(file, inferredCategory);
    }

    // Vérifier la taille
    const maxSize = MAX_SIZES[category];
    if (file.size > maxSize) {
      const mb = Math.round(maxSize / (1024 * 1024));
      return NextResponse.json(
        { ok: false, error: `Fichier trop volumineux (max ${mb} Mo).` },
        { status: 400 },
      );
    }

    return handleUpload(file, category);
  } catch (err) {
    console.error("[api/partners/upload-product]", err);
    return NextResponse.json(
      { ok: false, error: "Erreur serveur." },
      { status: 500 },
    );
  }
}

async function handleUpload(
  file: File,
  category: keyof typeof MAX_SIZES,
) {
  const maxSize = MAX_SIZES[category];
  if (file.size > maxSize) {
    const mb = Math.round(maxSize / (1024 * 1024));
    return NextResponse.json(
      { ok: false, error: `Fichier trop volumineux (max ${mb} Mo).` },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const ext = file.name.split(".").pop()?.toLowerCase() ?? "bin";
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
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 },
    );
  }

  const { data: urlData } = supabase.storage
    .from("media")
    .getPublicUrl(fileName);

  return NextResponse.json({
    ok: true,
    url: urlData.publicUrl,
    category,
    name: file.name,
  });
}