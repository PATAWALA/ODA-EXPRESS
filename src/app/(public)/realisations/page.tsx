"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import GalleryLightbox from "@/components/widgets/GalleryLightbox";
import CustomProjectCTA from "@/components/widgets/CustomProjectCTA";
import { REALISATION_CATEGORIES } from "@/content/realisations";
import type { RealisationDisplay } from "@/lib/data/realisations";
import { cn } from "@/lib/utils";

export default function RealisationsPage() {
  const [items, setItems] = useState<RealisationDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/realisations")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = useMemo(() => items.filter((i) => i.featured), [items]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((i) => i.categoryId === activeCategory);
  }, [items, activeCategory]);

  function openLightbox(item: RealisationDisplay) {
    const index = filtered.findIndex((r) => r.id === item.id);
    if (index >= 0) setOpenIndex(index);
  }

  return (
    <>
      {/* Hero */}
      <section className="border-b border-zinc-200 bg-white">
        <Container>
          <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Nos réalisations
              </p>

              <h1 className="mt-6 text-[36px] leading-[1.1] tracking-[-0.02em] text-navy-900 sm:text-[44px] lg:text-[50px]">
                Une sélection de projets
                <br />
                que nous avons
                <br />
                <span className="text-express-600">accompagnés.</span>
              </h1>

              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.75] text-zinc-600">
                Camions, engins de chantier, machines industrielles, conteneurs
                — découvrez un aperçu des marchandises que nos clients nous
                confient régulièrement.
              </p>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_30px_70px_-25px_rgba(1,18,52,0.25)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=85"
                alt="Réalisations"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Projets phares */}
      {featured.length > 0 && (
        <section className="border-b border-zinc-200 bg-white py-16 sm:py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
                Projets phares
              </p>
              <h2 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[30px]">
                Quelques projets marquants
              </h2>
            </div>

            <div className="mx-auto mt-14 grid max-w-6xl gap-px overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-200 lg:grid-cols-2">
              {featured.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(item)}
                  className="group relative flex flex-col bg-white text-left transition"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-navy-950/10 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-2xl border border-white/30 bg-navy-950/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">
                      {item.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <h3 className="text-[18px] font-bold tracking-tight text-navy-900 transition group-hover:text-express-600 sm:text-[20px]">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="mt-3 text-[13.5px] leading-[1.75] text-zinc-600">
                        {item.description}
                      </p>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-zinc-400 transition group-hover:gap-2.5 group-hover:text-express-600">
                      Voir le projet
                      <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Galerie complète */}
      <section className="border-b border-zinc-200 bg-zinc-50/50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
              Galerie complète
            </p>
            <h2 className="mt-5 text-[24px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[30px]">
              Toutes nos réalisations
            </h2>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {REALISATION_CATEGORIES.map((cat) => (
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

          {loading ? (
            <p className="mt-12 rounded-2xl border border-zinc-200 bg-white p-10 text-center text-[13.5px] text-zinc-500">
              Chargement...
            </p>
          ) : (
            <div className="mx-auto mt-12 max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(item)}
                  className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 text-left"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent opacity-0 transition group-hover:opacity-100">
                    <div className="p-4">
                      <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-express-400">
                        {item.category}
                      </p>
                      <p className="mt-1.5 text-[14px] font-bold text-white">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  {item.type === "video" && (
                    <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/30 bg-navy-950/70 text-white backdrop-blur">
                      <Play className="h-3.5 w-3.5" fill="currentColor" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
            <p className="mt-12 rounded-2xl border border-zinc-200 bg-white p-10 text-center text-[14px] text-zinc-500">
              Aucune réalisation dans cette catégorie pour l&apos;instant.
            </p>
          )}
        </Container>
      </section>

      {/* CTA projet différent */}
      <CustomProjectCTA />

      {/* Lightbox */}
      {openIndex !== null && (
        <GalleryLightbox
          items={filtered}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  );
}