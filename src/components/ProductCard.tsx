import { Package, PhoneCall } from "lucide-react";
import { buildProductWhatsApp, type Product } from "@/data/odaData";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-[0_1px_2px_rgba(10,25,49,0.04)] transition hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-[0_12px_32px_-12px_rgba(10,25,49,0.15)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-navy-900 shadow-sm backdrop-blur">
          {product.brand}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[14.5px] font-bold tracking-tight text-navy-900">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-zinc-600">
          {product.short}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
          <p className="text-[11.5px] font-medium text-zinc-500">
            Unité : {product.unit}
          </p>
          <span className="flex items-center gap-1 text-[10.5px] font-medium text-zinc-500">
            <Package className="h-3 w-3" strokeWidth={1.75} />
            Min. {product.minOrder}
          </span>
        </div>

        <a
          href={buildProductWhatsApp(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-express-500 to-express-700 px-4 py-3 text-[12.5px] font-bold text-white shadow-sm transition hover:shadow-md"
        >
          <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
          Je veux ce produit
        </a>
      </div>
    </article>
  );
}