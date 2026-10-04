import AdminForm from "@/components/admin/AdminForm";
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

export default function NewRealisationPage() {
  return (
    <AdminForm
      title="Nouvelle réalisation"
      backHref="/admin/realisations"
      saveAction={saveRealisationAction.bind(null, null)}
      fields={[
        {
          name: "title",
          label: "Titre de la réalisation",
          required: true,
          placeholder: "Ex. Pelle hydraulique 22 tonnes",
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/realisations/",
          required: true,
        },
        {
          name: "category",
          label: "Catégorie (affichée sur le site)",
          type: "select",
          options: CATEGORIES,
          required: true,
        },
        {
          name: "category_id",
          label: "Filtre technique",
          type: "select",
          options: CATEGORY_IDS,
          required: true,
          hint: "Utilisé pour les boutons de filtre sur la page Réalisations",
        },
        {
          name: "description",
          label: "Description courte",
          type: "textarea",
          placeholder: "Quelques mots sur ce projet",
        },
        {
          name: "image_url",
          label: "Image de la réalisation",
          required: true,
          placeholder: "Collez l'URL de l'image",
        },
        {
          name: "display_order",
          label: "Ordre d'affichage",
          type: "number",
          defaultValue: 0,
          hint: "0 = en premier, 1 = après, etc.",
        },
        {
          name: "featured",
          label: "Marquer comme projet phare",
          type: "checkbox",
          hint: "Les projets phares apparaissent en grand sur la page Réalisations",
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