import Link from "next/link";
import { Plus, Pencil, ExternalLink, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteArticleAction } from "@/app/admin/actions";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  const total = articles?.length ?? 0;
  const published = articles?.filter((a) => a.published).length ?? 0;
  const drafts = total - published;

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div>
      {/* En-tête */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-express-600">
            Contenu
          </p>
          <h1 className="mt-3 text-[28px] font-bold leading-tight tracking-tight text-navy-900 sm:text-[32px]">
            Actualités
          </h1>
          <p className="mt-2 text-[13.5px] text-zinc-500">
            {total} article{total > 1 ? "s" : ""} · {published} publié
            {published > 1 ? "s" : ""} · {drafts} brouillon
            {drafts > 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/articles/nouveau"
          className="group inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
          Nouvel article
        </Link>
      </div>

      {/* Liste */}
      {!articles || articles.length === 0 ? (
        <div className="border border-zinc-200 bg-white px-6 py-16 text-center">
          <FileText
            className="mx-auto h-8 w-8 text-zinc-300"
            strokeWidth={1.5}
          />
          <p className="mt-5 text-[14px] font-bold text-navy-900">
            Aucun article pour l&apos;instant
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-zinc-500">
            Créez votre premier article pour le publier sur la page Actualités
            du site public.
          </p>
          <Link
            href="/admin/articles/nouveau"
            className="mt-6 inline-flex items-center gap-2 bg-navy-900 px-5 py-3 text-[12px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-navy-800"
          >
            <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
            Créer le premier article
          </Link>
        </div>
      ) : (
        <div className="border border-zinc-200 bg-white">
          {/* En-tête tableau (desktop) */}
          <div className="hidden border-b border-zinc-200 bg-zinc-50/60 px-6 py-3 text-[10.5px] font-bold uppercase tracking-[0.15em] text-zinc-500 lg:grid lg:grid-cols-[1fr_140px_120px_120px_140px] lg:gap-4">
            <div>Article</div>
            <div>Catégorie</div>
            <div>Statut</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          <ul className="divide-y divide-zinc-100">
            {articles.map((article) => (
              <li
                key={article.id}
                className="group grid gap-4 px-6 py-4 transition hover:bg-zinc-50/60 lg:grid-cols-[1fr_140px_120px_120px_140px] lg:items-center"
              >
                {/* Titre + slug */}
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold tracking-tight text-navy-900">
                    {article.title}
                  </p>
                  <p className="mt-1 truncate font-mono text-[11px] text-zinc-500">
                    /actualites/{article.slug}
                  </p>
                </div>

                {/* Catégorie */}
                <div>
                  <span className="inline-flex border border-zinc-200 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.1em] text-zinc-600">
                    {article.category}
                  </span>
                </div>

                {/* Statut */}
                <div className="flex items-center gap-2">
                  <span
                    className={
                      "h-1.5 w-1.5 rounded-full " +
                      (article.published ? "bg-emerald-500" : "bg-amber-500")
                    }
                  />
                  <span className="text-[12px] font-semibold text-zinc-700">
                    {article.published ? "Publié" : "Brouillon"}
                  </span>
                </div>

                {/* Date */}
                <div className="text-[12px] text-zinc-500">
                  {formatDate(article.created_at)}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-1.5">
                  <Link
                    href={`/actualites/${article.slug}`}
                    target="_blank"
                    title="Voir sur le site"
                    className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-400 transition hover:border-navy-300 hover:bg-white hover:text-navy-900"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                  <Link
                    href={`/admin/articles/${article.id}`}
                    title="Modifier"
                    className="flex h-8 w-8 items-center justify-center border border-zinc-200 text-zinc-400 transition hover:border-navy-300 hover:bg-white hover:text-navy-900"
                  >
                    <Pencil className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                  <DeleteButton
                    action={deleteArticleAction.bind(null, article.id)}
                    title={article.title}
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