import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasResendKey: !!process.env.RESEND_API_KEY,
    resendKeyStart: process.env.RESEND_API_KEY?.slice(0, 6) ?? "absent",
    fromEmail: process.env.RESEND_FROM_EMAIL ?? "absent",
    adminEmail: process.env.ADMIN_EMAIL ?? "absent",
  });
}