import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PRODUCT_FAMILIES } from "@/content/products";

export default function FeaturedProducts() {
  const featured = PRODUCT_FAMILIES.filter((p) => p.featured).slice(0, 6);

  return (
    <section className="border-b border-zinc-100 bg-gradient-to-b from-navy-50/30 to-white py-20 sm:py-24">
      <Container>
        <SectionTitle
          badge="Catalogue"
          title="Voici les produits que nos clients commandent le plus"
          subtitle="Une sélection de familles de produits que nous sourçons régulièrement pour nos clients en Afrique et dans le monde."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <Link
              key={product.slug}
              href={`/produits#${product.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_1px_2px_rgba(1,18,52,0.04)] transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(1,18,52,0.15)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-navy-900/10 to-transparent" />

                <div className="absolute left-3 top-3">
                  <span className="rounded-2xl bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-700 shadow-sm backdrop-blur">
                    {product.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-white/95 text-navy-700 shadow-sm backdrop-blur">
                    <Package className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[15px] font-bold tracking-tight text-navy-700">
                  {product.title}
                </h3>
                {product.description && (
                  <p className="mt-2 flex-1 text-[12.5px] leading-relaxed text-zinc-600">
                    {product.description}
                  </p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-express-600 transition group-hover:gap-2.5">
                  Demander un devis
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/produits"
            className="inline-flex items-center gap-2 rounded-2xl border border-navy-200 bg-white px-6 py-3 text-[13px] font-bold text-navy-700 transition hover:border-navy-700 hover:bg-navy-50"
          >
            Voir tout le catalogue
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}