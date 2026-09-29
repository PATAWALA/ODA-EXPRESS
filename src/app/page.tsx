"use client";

import { useMemo, useState } from "react";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/odaData";

type Filter = CategoryId | "all";

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = filter === "all" || p.category === filter;
      const matchSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [filter, search]);

  return (
    <>
      <Header />
      <main>
        <Hero />

        <section
          id="catalogue"
          className="border-t border-zinc-100 px-4 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
                Catalogue
              </p>
              <h2 className="mt-3 text-[24px] font-bold tracking-tight text-navy-900 sm:text-[32px]">
                Produits disponibles à l&apos;import
              </h2>
              <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
                Cliquez sur « Je veux ce produit » : votre demande part
                directement sur WhatsApp, déjà pré-remplie avec la référence.
              </p>
            </div>

            {/* Filtres + recherche */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  active={filter === "all"}
                  onClick={() => setFilter("all")}
                  label="Tous"
                />
                {CATEGORIES.map((cat) => (
                  <FilterButton
                    key={cat.id}
                    active={filter === cat.id}
                    onClick={() => setFilter(cat.id)}
                    label={cat.label}
                  />
                ))}
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full rounded-full border border-zinc-200 bg-white px-4 py-2.5 text-[13px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100 sm:max-w-xs"
              />
            </div>

            {/* Grille */}
            <div className="mt-10">
              {filtered.length === 0 ? (
                <p className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-10 text-center text-[13px] text-zinc-500">
                  Aucun produit ne correspond à votre recherche.
                </p>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full border px-3.5 py-1.5 text-[12px] font-semibold transition " +
        (active
          ? "border-navy-900 bg-navy-900 text-white"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300")
      }
    >
      {label}
    </button>
  );
}