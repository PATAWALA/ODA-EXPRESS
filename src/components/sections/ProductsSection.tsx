"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FAMILIES,
} from "@/content/products";
import { cn } from "@/lib/utils";

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    if (activeCategory === "all") return PRODUCT_FAMILIES;
    return PRODUCT_FAMILIES.filter(
      (family) => family.categoryId === activeCategory,
    );
  }, [activeCategory]);

  return (
    <section className="border-b border-zinc-200 bg-zinc-50/50 py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionTitle
          badge="Nos produits"
          title="Ce que nos clients nous confient"
          subtitle="Machines, poids lourds, textile, construction — découvrez les familles de produits que nous sourçons et expédions régulièrement."
        />

        {/* Filtres */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-2">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "rounded-2xl border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition",
                activeCategory === cat.id
                  ? "border-navy-900 bg-navy-900 text-white"
                  : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300 hover:text-navy-900",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille produits */}
        <div className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((family) => (
            <Link
              key={family.slug}
              href={`/produits#${family.slug}`}
              className="group relative flex flex-col bg-white transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={family.image}
                  alt={family.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="absolute left-3 top-3 rounded-2xl border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                  {family.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[15px] font-bold tracking-tight text-navy-900 transition group-hover:text-express-600">
                  {family.title}
                </h3>

                {family.description && (
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-zinc-600">
                    {family.description}
                  </p>
                )}

                <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition group-hover:gap-2.5 group-hover:text-express-600">
                  Voir les produits
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mx-auto mt-12 max-w-6xl rounded-2xl border border-zinc-200 bg-white p-10 text-center">
            <p className="text-[14px] font-semibold text-navy-900">
              Aucun produit dans cette catégorie pour l&apos;instant.
            </p>
          </div>
        )}

        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-[14px] text-zinc-600">
            Vous cherchez un produit qui n&apos;apparaît pas dans la liste ?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-navy-900 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
          >
            Décrire mon produit
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}