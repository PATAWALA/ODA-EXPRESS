"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Package, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonLink } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FAMILIES,
} from "@/content/products";

export default function ProduitsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return PRODUCT_FAMILIES.filter((family) => {
      const matchCategory =
        activeCategory === "all" || family.categoryId === activeCategory;
      const matchSearch =
        q === "" ||
        family.title.toLowerCase().includes(q) ||
        family.category.toLowerCase().includes(q) ||
        family.items.some((item) => item.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      {/* En-tête */}
      <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/40 to-white py-16 sm:py-20">
        <Container>
          <SectionTitle
            badge="Catalogue"
            title="Nos familles de produits sourcés"
            subtitle="Voici les principaux types de produits que nous sourçons et expédions régulièrement pour nos clients. Chaque famille est personnalisable selon vos besoins."
          />
        </Container>
      </section>

      {/* Filtres + recherche */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="flex flex-col gap-5">
            {/* Recherche */}
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
                className="w-full rounded-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-[13.5px] outline-none transition focus:border-navy-700 focus:ring-4 focus:ring-navy-100"
              />
            </div>

            {/* Catégories */}
            <div className="flex flex-wrap justify-center gap-2">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={
                    "rounded-full border px-4 py-2 text-[12.5px] font-semibold transition " +
                    (activeCategory === cat.id
                      ? "border-navy-700 bg-navy-700 text-white"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-navy-200")
                  }
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grille */}
          <div className="mt-12">
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-10 text-center">
                <p className="text-[13.5px] font-semibold text-navy-700">
                  Aucun produit ne correspond à votre recherche.
                </p>
                <p className="mt-2 text-[12.5px] text-zinc-500">
                  Vous ne trouvez pas votre produit ? Envoyez-nous le lien,
                  nous le sourçons pour vous.
                </p>
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="mt-5"
                >
                  Envoyer ma demande
                </ButtonLink>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((family) => (
                  <article
                    key={family.slug}
                    id={family.slug}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_1px_2px_rgba(1,18,52,0.04)] transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(1,18,52,0.15)]"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={family.image}
                        alt={family.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent" />

                      <div className="absolute left-3 top-3">
                        <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-700 shadow-sm backdrop-blur">
                          {family.category}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-navy-700 shadow-sm backdrop-blur">
                          <Package className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[15px] font-bold tracking-tight text-navy-700">
                        {family.title}
                      </h3>

                      {family.description && (
                        <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-600">
                          {family.description}
                        </p>
                      )}

                      <ul className="mt-4 space-y-1.5 border-t border-zinc-100 pt-4">
                        {family.items.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="text-[11.5px] leading-relaxed text-zinc-600"
                          >
                            · {item}
                          </li>
                        ))}
                        {family.items.length > 3 && (
                          <li className="pt-1 text-[11.5px] font-semibold text-express-600">
                            + {family.items.length - 3} autres références
                          </li>
                        )}
                      </ul>

                      <div className="mt-5 flex-1" />

                      <ButtonLink
                        href="/contact"
                        variant="primary"
                        size="sm"
                        className="w-full"
                      >
                        Demander un devis
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </ButtonLink>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* CTA bas de page */}
      <section className="border-t border-zinc-100 bg-gradient-to-b from-white to-navy-50/40 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[24px] font-bold tracking-tight text-navy-700 sm:text-[28px]">
              Vous cherchez un produit spécifique ?
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
              Envoyez-nous le lien AliExpress, 1688, Taobao ou une photo.
              Nous trouvons le fournisseur, négocions et livrons.
            </p>
            <ButtonLink
              href="/contact"
              variant="primary"
              size="lg"
              className="mt-8"
            >
              Envoyer ma demande
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}