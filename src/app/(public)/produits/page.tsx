"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ButtonLink } from "@/components/ui/Button";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_FAMILIES,
} from "@/content/products";
import { cn } from "@/lib/utils";

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
          {/* Recherche + filtres */}
          <div className="flex flex-col gap-6">
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
                className="w-full border border-zinc-200 bg-white py-3 pl-11 pr-4 text-[13.5px] text-navy-900 outline-none transition placeholder:text-zinc-400 focus:border-navy-700"
              />
            </div>

            {/* Catégories */}
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

          {/* Grille */}
          <div className="mt-14">
            {filtered.length === 0 ? (
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
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </ButtonLink>
              </div>
            ) : (
              <div className="grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((family) => (
                  <article
                    key={family.slug}
                    id={family.slug}
                    className="scroll-mt-24 bg-white"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={family.image}
                        alt={family.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-3 top-3">
                        <span className="border border-white/30 bg-navy-950/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                          {family.category}
                        </span>
                      </div>
                    </div>

                    {/* Contenu */}
                    <div className="flex flex-col p-6">
                      <h3 className="text-[15.5px] font-bold tracking-tight text-navy-900">
                        {family.title}
                      </h3>

                      {family.description && (
                        <p className="mt-2.5 text-[13px] leading-relaxed text-zinc-600">
                          {family.description}
                        </p>
                      )}

                      <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-5">
                        {family.items.slice(0, 3).map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[12.5px] leading-relaxed text-zinc-600"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 bg-express-600" />
                            {item}
                          </li>
                        ))}
                        {family.items.length > 3 && (
                          <li className="pt-1 text-[11.5px] font-bold uppercase tracking-[0.1em] text-express-600">
                            + {family.items.length - 3} autres références
                          </li>
                        )}
                      </ul>

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

      {/* CTA bas de page */}
      <section className="border-t border-zinc-200 bg-navy-950 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-400">
              Produit introuvable ?
            </p>
            <h2 className="mt-6 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[32px]">
              Vous cherchez un produit
              <br />
              spécifique ?
            </h2>
            <p className="mt-5 text-[14.5px] leading-relaxed text-navy-200">
              Envoyez-nous le lien AliExpress, 1688, Taobao ou une photo. Nous
              trouvons le fournisseur, négocions et livrons.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href="/contact"
                variant="white"
                size="lg"
                className="group"
              >
                Se faire accompagner
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}