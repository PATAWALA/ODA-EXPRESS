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
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
        {/* Dégradé de fond */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-100/70 via-navy-50/30 to-white"
        />

        {/* Halo bleu en haut à droite */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-navy-200/40 via-express-100/30 to-transparent blur-3xl"
        />

        {/* Halo rouge en bas à gauche */}
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gradient-to-tr from-express-100/40 via-navy-100/30 to-transparent blur-3xl"
        />

        <Container className="relative">
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="inline-flex items-center rounded-2xl border border-navy-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-express-600 shadow-sm backdrop-blur">
                Catalogue
              </p>
              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Nos familles
                <br />
                <span className="bg-gradient-to-r from-navy-900 via-navy-700 to-express-600 bg-clip-text text-transparent">
                  de produits sourcés.
                </span>
              </h1>
              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Voici les principaux types de produits que nous sourçons et
                expédions régulièrement pour nos clients. Chaque famille est
                personnalisable selon vos besoins.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.35)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=85"
                alt="Catalogue produits"
                className="h-full w-full object-cover"
              />
              {/* Voile bleu subtil */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ============ FILTRES + GRILLE ============ */}
      <section className="relative overflow-hidden bg-white py-16 sm:py-20">
        {/* Dégradé de section */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-navy-50/30 to-white"
        />

        <Container className="relative">
          {/* Filtres + recherche */}
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
                className="w-full rounded-2xl border border-zinc-200 bg-white py-3 pl-11 pr-4 text-[13.5px] text-navy-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "rounded-2xl border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] transition-all duration-300",
                    activeCategory === cat.id
                      ? "border-express-600 bg-gradient-to-br from-express-600 to-express-700 text-white shadow-md"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-300 hover:bg-navy-50/60 hover:text-navy-900",
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille */}
          <div className="mt-14">
            {loading ? (
              <p className="rounded-2xl border border-zinc-200 bg-white p-10 text-center text-[13.5px] text-zinc-500 shadow-sm">
                Chargement...
              </p>
            ) : filtered.length === 0 ? (
              <div className="rounded-2xl border border-navy-100 bg-gradient-to-br from-white via-navy-50/40 to-express-50/40 p-10 text-center shadow-sm">
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
              <div className="grid gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 shadow-[0_4px_24px_-12px_rgba(1,18,52,0.12)] sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product) => (
                  <article
                    key={product.id}
                    id={product.slug}
                    className="group scroll-mt-24 overflow-hidden bg-gradient-to-br from-white via-white to-navy-50/40 transition-all duration-300 hover:to-express-50/50"
                  >
                    {product.image && (
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.image}
                          alt={product.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                        />

                        {/* Voile bleu au survol */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent opacity-60 transition group-hover:opacity-100" />

                        {/* Badge catégorie */}
                        <div className="absolute left-3 top-3">
                          <span className="rounded-2xl border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
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
                        <ul className="mt-5 space-y-2 border-t border-zinc-200/80 pt-5">
                          {product.items.slice(0, 3).map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-[12.5px] leading-relaxed text-zinc-600"
                            >
                              <span className="mt-2 h-1 w-1 shrink-0 bg-gradient-to-br from-express-500 to-express-700" />
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
                          className="group/btn w-full"
                        >
                          Demander un devis
                          <ArrowRight
                            className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5"
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

      {/* ============ CTA PRODUIT INTROUVABLE ============ */}
      <ProductRequestCTA />
    </>
  );
}