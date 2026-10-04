import Link from "next/link";
import { Plus, Pencil, Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteProductAction } from "@/app/admin/actions";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const total = products?.length ?? 0;
  const published = products?.filter((p) => p.published).length ?? 0;

  return (
    <div>
      {/* En-tête */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Catalogue
          </p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[32px]">
            Produits
          </h1>
          <p className="mt-2 text-[13.5px] text-zinc-500">
            {total} produit{total > 1 ? "s" : ""} · {published} publié
            {published > 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/produits/nouveau"
          className="inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Nouveau produit
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <div className="rounded-2xl border border-zinc-200 bg-white px-6 py-16 text-center">
          <Package className="mx-auto h-8 w-8 text-zinc-300" strokeWidth={1.5} />
          <p className="mt-5 text-[14px] font-bold text-navy-900">
            Aucun produit pour l&apos;instant
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-zinc-500">
            Ajoutez vos premiers produits pour les afficher dans le catalogue
            du site public.
          </p>
          <Link
            href="/admin/produits/nouveau"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Créer le premier produit
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {/* En-tête tableau (desktop) */}
          <div className="hidden border-b border-zinc-200 bg-zinc-50/60 px-6 py-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 lg:grid lg:grid-cols-[80px_1fr_140px_120px_140px] lg:gap-4">
            <div>Image</div>
            <div>Produit</div>
            <div>Catégorie</div>
            <div>Statut</div>
            <div className="text-right">Actions</div>
          </div>

          <ul className="divide-y divide-zinc-100">
            {products.map((product) => (
              <li
                key={product.id}
                className="group grid gap-4 px-6 py-4 transition hover:bg-zinc-50/60 lg:grid-cols-[80px_1fr_140px_120px_140px] lg:items-center"
              >
                {/* Image */}
                <div className="hidden h-14 w-14 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 lg:block">
                  {product.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image_url}
                      alt={product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-zinc-300">
                      <Package className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                  )}
                </div>

                {/* Titre + description */}
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold tracking-tight text-navy-900">
                    {product.title}
                  </p>
                  <p className="mt-1 truncate text-[11.5px] text-zinc-500">
                    {product.brand ? `${product.brand} · ` : ""}
                    {product.short_description}
                  </p>
                </div>

                {/* Catégorie */}
                <div>
                  <span className="inline-flex rounded-2xl border border-zinc-200 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                    {product.category}
                  </span>
                </div>

                {/* Statut */}
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (product.published ? "bg-emerald-500" : "bg-amber-500")
                    }
                  />
                  <span className="text-[12px] font-semibold text-zinc-700">
                    {product.published ? "Publié" : "Brouillon"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={`/admin/produits/${product.id}`}
                    title="Modifier"
                    className="flex h-8 w-8 items-center justify-center rounded-2xl border border-zinc-200 text-zinc-400 transition hover:border-navy-300 hover:bg-white hover:text-navy-900"
                  >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                  <DeleteButton
                    action={deleteProductAction.bind(null, product.id)}
                    title={product.title}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}