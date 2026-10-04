import { Resend } from "resend";

let _resend: Resend | null = null;

export function getResend(): Resend {
  if (_resend) return _resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY manquante. Vérifiez votre fichier .env.local.",
    );
  }

  _resend = new Resend(apiKey);
  return _resend;
}

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "contact@odasources.com";

export const FROM_NAME = process.env.RESEND_FROM_NAME ?? "ODA Sources";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "odaxpress10@gmail.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.odasources.com";