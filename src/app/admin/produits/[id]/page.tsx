import { notFound } from "next/navigation";
import AdminForm from "@/components/admin/AdminForm";
import { createClient } from "@/lib/supabase/server";
import { saveProductAction } from "@/app/admin/actions";

const CATEGORIES = [
  { value: "Machines", label: "Machines" },
  { value: "Poids lourds", label: "Poids lourds" },
  { value: "Matériaux", label: "Matériaux" },
  { value: "Électronique", label: "Électronique" },
  { value: "Textile", label: "Textile" },
  { value: "Maison", label: "Maison" },
  { value: "Auto", label: "Auto / Moto" },
  { value: "Emballage", label: "Emballage" },
  { value: "Beauté", label: "Beauté" },
  { value: "Médical", label: "Médical" },
];

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) notFound();

  return (
    <AdminForm
      title="Modifier le produit"
      backHref="/admin/produits"
      saveAction={saveProductAction.bind(null, id)}
      fields={[
        {
          name: "title",
          label: "Nom du produit",
          required: true,
          defaultValue: product.title,
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/produits/",
          required: true,
          defaultValue: product.slug,
        },
        {
          name: "category",
          label: "Catégorie",
          type: "select",
          options: CATEGORIES,
          required: true,
          defaultValue: product.category,
        },
        {
          name: "brand",
          label: "Marque",
          defaultValue: product.brand ?? "",
        },
        {
          name: "short_description",
          label: "Description courte",
          type: "textarea",
          required: true,
          defaultValue: product.short_description,
        },
        {
          name: "description",
          label: "Description complète",
          type: "textarea",
          defaultValue: product.description ?? "",
        },
        {
          name: "image_url",
          label: "Image du produit",
          type: "image",
          prefix: "products",
          defaultValue: product.image_url ?? "",
        },
        {
          name: "unit",
          label: "Unité de vente",
          defaultValue: product.unit ?? "unité",
        },
        {
          name: "min_order",
          label: "Commande minimum",
          type: "number",
          defaultValue: product.min_order ?? 1,
        },
        {
          name: "featured",
          label: "Mettre en avant sur la page d'accueil",
          type: "checkbox",
          defaultValue: product.featured,
        },
        {
          name: "published",
          label: "Publier sur le site",
          type: "checkbox",
          defaultValue: product.published,
        },
      ]}
    />
  );
}