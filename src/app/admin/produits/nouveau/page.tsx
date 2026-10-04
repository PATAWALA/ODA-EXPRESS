import AdminForm from "@/components/admin/AdminForm";
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

export default function NewProductPage() {
  return (
    <AdminForm
      title="Nouveau produit"
      backHref="/admin/produits"
      saveAction={saveProductAction.bind(null, null)}
      fields={[
        {
          name: "title",
          label: "Nom du produit",
          required: true,
          placeholder: "Ex. Pelle hydraulique 22 tonnes",
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/produits/",
          required: true,
        },
        {
          name: "category",
          label: "Catégorie",
          type: "select",
          options: CATEGORIES,
          required: true,
        },
        {
          name: "brand",
          label: "Marque",
          placeholder: "Ex. Hyundai, Sinotruk...",
          hint: "Laissez vide si pas de marque",
        },
        {
          name: "short_description",
          label: "Description courte",
          type: "textarea",
          required: true,
          placeholder: "1 à 2 phrases qui présentent le produit",
          hint: "Affichée dans la grille du catalogue",
        },
        {
          name: "description",
          label: "Description complète",
          type: "textarea",
          hint: "Optionnel — détails techniques, utilisation, garanties",
        },
        {
          name: "image_url",
          label: "Image du produit",
          placeholder: "Collez l'URL d'une image",
        },
        {
          name: "unit",
          label: "Unité de vente",
          defaultValue: "unité",
          placeholder: "Ex. unité, m², lot, kit",
        },
        {
          name: "min_order",
          label: "Commande minimum",
          type: "number",
          defaultValue: 1,
        },
        {
          name: "featured",
          label: "Mettre en avant sur la page d'accueil",
          type: "checkbox",
        },
        {
          name: "published",
          label: "Publier sur le site",
          type: "checkbox",
          defaultValue: true,
        },
      ]}
    />
  );
}