"use client";

import { useState } from "react";
import { ArrowRight, Package } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/odaData";
import QualificationModal from "./QualificationModal";

export default function ProductCatalog() {
  const [selected, setSelected] = useState<Product | null>(null);

  return (
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
            Ce que nous importons pour vous
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-zinc-600">
            Six familles de produits et services. Cliquez sur une carte pour
            soumettre votre projet — nous revenons vers vous avec un devis précis.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_1px_2px_rgba(10,25,49,0.04)] transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(10,25,49,0.15)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent" />

                <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-navy-900 shadow-sm backdrop-blur">
                  <product.icon className="h-4 w-4" strokeWidth={1.75} />
                </span>

                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                  {product.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-navy-900 backdrop-blur"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[15px] font-bold tracking-tight text-navy-900">
                  {product.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-zinc-600">
                  {product.short}
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-zinc-100 pt-4 text-[11px] font-medium text-zinc-500">
                  <span className="inline-flex items-center gap-1">
                    <Package className="h-3 w-3" strokeWidth={1.75} />
                    {product.unit}
                  </span>
                  <span className="h-3 w-px bg-zinc-200" />
                  <span>Min. {product.minOrder}</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(product)}
                  className="mt-5 inline-flex w-full items-center justify-between rounded-xl bg-gradient-to-br from-navy-900 to-navy-700 px-4 py-3 text-[12.5px] font-semibold text-white shadow-sm transition hover:shadow-md"
                >
                  Je veux ce produit
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <QualificationModal
          product={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}