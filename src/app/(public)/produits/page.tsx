"use client";

import { useMemo, useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import ProductRequestCTA from "@/components/widgets/ProductRequestCTA";
import { PRODUCT_CATEGORIES } from "@/content/products";
import type { ProductDisplay } from "@/lib/data/products";
import { cn } from "@/lib/utils";

export default function ProduitsPage() {
  const [products, setProducts] = useState<ProductDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory =
        activeCategory === "all" || p.categoryId === activeCategory;
      const matchSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.items.some((item) => item.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [products, search, activeCategory]);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Catalogue
              </p>
              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Nos familles
                <br />
                de produits sourcés.
              </h1>
              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Voici les principaux types de produits que nous sourçons et
                expédions régulièrement pour nos clients. Chaque famille est
                personnalisable selon vos besoins.
              </p>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=85"
                alt="Catalogue produits"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Filtres + grille */}
      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6">
            <div className="relative mx-auto w-full max-w-md">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                strokeWidth={1.75}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher un produit ou une catégorie..."
                className="w-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition",
                    activeCategory === cat.id
                      ? "border-navy-900 bg-navy-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300 hover:text-navy-900",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-14">
            {loading ? (
              <p className="border border-zinc-200 bg-white p-10 text-center text-[13.5px] text-zinc-500">
                Chargement...
              </p>
            ) : filtered.length === 0 ? (
              <div className="border border-zinc-200 bg-zinc-50/50 p-10 text-center">
                <p className="text-[14px] font-semibold text-navy-900">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <p className="mt-2 text-[13px] text-zinc-500">
                  Vous ne trouvez pas votre produit ? Envoyez-nous le lien,
                  nous le sourçons pour vous.
                </p>
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="mt-6"
                >
                  Envoyer ma demande
                </ButtonLink>
              </div>
            ) : (
              <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    id={product.slug}
                    className="scroll-mt-24 bg-white"
                  >
                    {product.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute left-3 top-3">
                          <span className="border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col p-6">
                      {product.brand && (
                        <p className="text-[10.5px] font-bold uppercase tracking-[0.15em] text-express-600">
                          {product.brand}
                        </p>
                      )}
                      <h3 className="mt-1 text-[15.5px] font-bold tracking-tight text-navy-900">
                        {product.title}
                      </h3>

                      {product.description && (
                        <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                          {product.description}
                        </p>
                      )}

                      {product.items.length > 0 && (
                        <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-5">
                          {product.items.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-[12.5px] leading-relaxed text-zinc-600"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="mt-6">
                        <ButtonLink
                          href="/contact"
                          variant="primary"
                          size="sm"
                          className="group w-full"
                        >
                          Demander un devis
                          <ArrowRight
                            className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
                            strokeWidth={2.5}
                          />
                        </ButtonLink>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA produit introuvable */}
      <ProductRequestCTA />
    </>
  );
}