import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY!);

export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "contact@odasources.com";

export const FROM_NAME =
  process.env.RESEND_FROM_NAME ?? "ODA Sources";

export const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? "odaxpress10@gmail.com";

export const SITE_URL = "https://www.odasources.com";