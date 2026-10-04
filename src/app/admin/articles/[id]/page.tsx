import { notFound } from "next/navigation";
import AdminForm from "@/components/admin/AdminForm";
import { createClient } from "@/lib/supabase/server";
import { saveArticleAction } from "@/app/admin/actions";

const CATEGORIES = [
  { value: "Guide", label: "Guide" },
  { value: "Conseils", label: "Conseils" },
  { value: "Logistique", label: "Logistique" },
  { value: "Sourcing", label: "Sourcing" },
  { value: "Actualité", label: "Actualité" },
];

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: article } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <AdminForm
      title="Modifier l'article"
      backHref="/admin/articles"
      saveAction={saveArticleAction.bind(null, id)}
      fields={[
        {
          name: "title",
          label: "Titre de l'article",
          required: true,
          defaultValue: article.title,
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/actualites/",
          required: true,
          defaultValue: article.slug,
        },
        {
          name: "category",
          label: "Catégorie",
          type: "select",
          options: CATEGORIES,
          required: true,
          defaultValue: article.category,
        },
        {
          name: "excerpt",
          label: "Résumé court",
          type: "textarea",
          required: true,
          defaultValue: article.excerpt,
        },
        {
          name: "content",
          label: "Contenu de l'article",
          type: "textarea",
          required: true,
          defaultValue: article.content,
        },
        {
          name: "cover_image",
          label: "Image de couverture",
          type: "image",
          prefix: "articles",
          defaultValue: article.cover_image ?? "",
        },
        {
          name: "published",
          label: "Publier sur le site",
          type: "checkbox",
          defaultValue: article.published,
        },
      ]}
    />
  );
}