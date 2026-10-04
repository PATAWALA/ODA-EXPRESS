import { NextResponse } from "next/server";
import { getArticles } from "@/lib/data/articles";

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json(articles);
}