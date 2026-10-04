import Link from "next/link";
import { Plus, Pencil, Image as ImageIcon, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteRealisationAction } from "@/app/admin/actions";

export default async function AdminRealisationsPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("realisations")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  const total = items?.length ?? 0;
  const featured = items?.filter((i) => i.featured).length ?? 0;
  const published = items?.filter((i) => i.published).length ?? 0;

  return (
    <div>
      {/* En-tête */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Galerie
          </p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[32px]">
            Réalisations
          </h1>
          <p className="mt-2 text-[13.5px] text-zinc-500">
            {total} réalisation{total > 1 ? "s" : ""} · {featured} en vedette ·{" "}
            {published} publiée{published > 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/realisations/nouveau"
          className="inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Nouvelle réalisation
        </Link>
      </div>

      {!items || items.length === 0 ? (
        <div className="border border-zinc-200 bg-white px-6 py-16 text-center">
          <ImageIcon
            className="mx-auto h-8 w-8 text-zinc-300"
            strokeWidth={1.5}
          />
          <p className="mt-5 text-[14px] font-bold text-navy-900">
            Aucune réalisation pour l&apos;instant
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-zinc-500">
            Ajoutez vos projets pour enrichir la galerie du site public.
          </p>
          <Link
            href="/admin/realisations/nouveau"
            className="mt-6 inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Créer la première réalisation
          </Link>
        </div>
      ) : (
        <div className="border border-zinc-200 bg-white">
          <ul className="divide-y divide-zinc-100">
            {items.map((item) => (
              <li
                key={item.id}
                className="group flex items-center gap-5 px-6 py-4 transition hover:bg-zinc-50/60"
              >
                {/* Image */}
                <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-zinc-200 bg-zinc-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {item.featured && (
                    <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center bg-express-600 text-white">
                      <Star
                        className="h-2.5 w-2.5"
                        fill="currentColor"
                        strokeWidth={0}
                      />
                    </span>
                  )}
                </div>

                {/* Contenu */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-bold tracking-tight text-navy-900">
                    {item.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <span className="inline-flex border border-zinc-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                      {item.category}
                    </span>
                    <span
                      className={
                        "h-1.5 w-1.5 rounded-full " +
                        (item.published ? "bg-emerald-500" : "bg-amber-500")
                      }
                    />
                    <span className="text-[11px] font-semibold text-zinc-600">
                      {item.published ? "Publié" : "Brouillon"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-1.5">
                  <Link
                    href={`/admin/realisations/${item.id}`}
                    title="Modifier"
                    className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-400 transition hover:border-navy-300 hover:bg-white hover:text-navy-900"
                  >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                  <DeleteButton
                    action={deleteRealisationAction.bind(null, item.id)}
                    title={item.title}
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