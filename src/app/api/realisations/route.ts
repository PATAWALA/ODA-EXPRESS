import { NextResponse } from "next/server";
import { getRealisations } from "@/lib/data/realisations";

export async function GET() {
  const realisations = await getRealisations();
  return NextResponse.json(realisations);
}