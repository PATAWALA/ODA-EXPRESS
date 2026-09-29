"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/odaData";

type Filter = CategoryId | "all";

export default function CataloguePage() {
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
        {/* En-tête */}
        <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/50 to-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
              Boutique
            </p>
            <h1 className="mt-3 text-[28px] font-bold tracking-tight text-navy-900 sm:text-[36px]">
              Voici les produits que nos clients commandent le plus
            </h1>
            <p className="mt-3 max-w-2xl text-[13.5px] leading-relaxed text-zinc-600">
              Cliquez sur « Je veux ce produit » : votre demande part
              directement sur WhatsApp avec toutes les informations.
            </p>

            {/* Recherche */}
            <div className="relative mt-8 max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit..."
                className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-[13.5px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
              />
            </div>

            {/* Filtres */}
            <div className="mt-6 flex flex-wrap gap-2">
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
          </div>
        </section>

        {/* Grille produits */}
        <section className="px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-6xl">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-10 text-center">
                <p className="text-[13.5px] font-semibold text-navy-900">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <p className="mt-2 text-[12.5px] text-zinc-500">
                  Vous ne trouvez pas ce que vous cherchez ? Envoyez-nous le lien
                  du produit, nous le sourçons pour vous.
                </p>
                <a
                  href="/#sur-mesure"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-express-500 to-express-700 px-5 py-3 text-[12.5px] font-bold text-white shadow-sm"
                >
                  Envoyer ma demande
                </a>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bloc produit introuvable */}
        <section className="border-t border-zinc-100 bg-gradient-to-b from-navy-50/40 to-white px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.18em] text-express-600">
              Produit introuvable ?
            </p>
            <h2 className="mt-3 text-[22px] font-bold tracking-tight text-navy-900 sm:text-[28px]">
              Vous ne voyez pas votre produit dans la liste ?
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
              Envoyez-nous le lien AliExpress, 1688 ou Taobao, ou une simple
              photo. Nous le sourçons et vous répondons sous 24 h.
            </p>
            <a
              href="/#sur-mesure"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-navy-900 to-navy-700 px-6 py-3.5 text-[13px] font-bold text-white shadow-sm transition hover:shadow-md"
            >
              Envoyer mon lien produit
            </a>
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