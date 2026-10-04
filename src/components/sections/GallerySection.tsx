"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import GalleryLightbox from "@/components/widgets/GalleryLightbox";
import { REALISATIONS } from "@/content/realisations";

const LIMIT = 8;

export default function GallerySection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const items = REALISATIONS.slice(0, LIMIT);

  return (
    <section className="border-b border-zinc-200 bg-white py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionTitle
          badge="Nos réalisations"
          title="Une sélection de projets accompagnés"
          subtitle="Camions, engins de chantier, machines industrielles, conteneurs — un aperçu des marchandises que nos clients nous confient régulièrement."
        />

        {/* Grille masonry */}
        <div className="mx-auto mt-14 max-w-6xl columns-1 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden border border-zinc-200 bg-zinc-100 text-left"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />

              {/* Overlay au survol */}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent opacity-0 transition group-hover:opacity-100">
                <div className="p-4">
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-express-400">
                    {item.category}
                  </p>
                  <p className="mt-1.5 text-[14px] font-bold text-white">
                    {item.title}
                  </p>
                </div>
              </div>

              {/* Badge vidéo */}
              {item.type === "video" && (
                <span className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-2xl border border-white/30 bg-navy-950/70 text-white backdrop-blur">
                  <Play className="h-3.5 w-3.5" fill="currentColor" />
                </span>
              )}
            </button>
          ))}
        </div>

        {/* CTA bas de section */}
        <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-[14px] text-zinc-600">
            Un projet similaire à nous confier ?
          </p>

          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-2xl border border-navy-900 bg-white px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-navy-900 transition hover:bg-navy-50"
          >
            Se faire accompagner
            <ArrowRight
              className="h-3.5 w-3.5 transition group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </Container>

      {/* Lightbox */}
      {openIndex !== null && (
        <GalleryLightbox
          items={items}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </section>
  );
}