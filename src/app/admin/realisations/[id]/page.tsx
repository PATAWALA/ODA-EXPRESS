import { notFound } from "next/navigation";
import AdminForm from "@/components/admin/AdminForm";
import { createClient } from "@/lib/supabase/server";
import { saveRealisationAction } from "@/app/admin/actions";

const CATEGORIES = [
  { value: "Engins de chantier", label: "Engins de chantier" },
  { value: "Poids lourds", label: "Poids lourds" },
  { value: "Machines industrielles", label: "Machines industrielles" },
  { value: "Transport & véhicules", label: "Transport & véhicules" },
  { value: "Fret maritime", label: "Fret maritime" },
];

const CATEGORY_IDS = [
  { value: "engins", label: "engins" },
  { value: "poids-lourds", label: "poids-lourds" },
  { value: "machines", label: "machines" },
  { value: "transport", label: "transport" },
  { value: "conteneurs", label: "conteneurs" },
];

export default async function EditRealisationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("realisations")
    .select("*")
    .eq("id", id)
    .single();

  if (!item) notFound();

  return (
    <AdminForm
      title="Modifier la réalisation"
      backHref="/admin/realisations"
      saveAction={saveRealisationAction.bind(null, id)}
      fields={[
        {
          name: "title",
          label: "Titre de la réalisation",
          required: true,
          defaultValue: item.title,
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/realisations/",
          required: true,
          defaultValue: item.slug,
        },
        {
          name: "category",
          label: "Catégorie (affichée sur le site)",
          type: "select",
          options: CATEGORIES,
          required: true,
          defaultValue: item.category,
        },
        {
          name: "category_id",
          label: "Filtre technique",
          type: "select",
          options: CATEGORY_IDS,
          required: true,
          defaultValue: item.category_id,
          hint: "Utilisé pour les boutons de filtre sur la page Réalisations",
        },
        {
          name: "description",
          label: "Description courte",
          type: "textarea",
          defaultValue: item.description ?? "",
        },
        {
          name: "image_url",
          label: "Image de la réalisation",
          type: "image",
          prefix: "realisations",
          defaultValue: item.image_url,
        },
        {
          name: "display_order",
          label: "Ordre d'affichage",
          type: "number",
          defaultValue: item.display_order ?? 0,
        },
        {
          name: "featured",
          label: "Marquer comme projet phare",
          type: "checkbox",
          defaultValue: item.featured,
        },
        {
          name: "published",
          label: "Publier sur le site",
          type: "checkbox",
          defaultValue: item.published,
        },
      ]}
    />
  );
}