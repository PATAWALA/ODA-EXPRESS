import AdminForm from "@/components/admin/AdminForm";
import { saveArticleAction } from "@/app/admin/actions";

const CATEGORIES = [
  { value: "Guide", label: "Guide" },
  { value: "Conseils", label: "Conseils" },
  { value: "Logistique", label: "Logistique" },
  { value: "Sourcing", label: "Sourcing" },
  { value: "Actualité", label: "Actualité" },
];

export default function NewArticlePage() {
  return (
    <AdminForm
      title="Nouvel article"
      backHref="/admin/articles"
      saveAction={saveArticleAction.bind(null, null)}
      fields={[
        {
          name: "title",
          label: "Titre de l'article",
          required: true,
          placeholder: "Ex. Importer de Chine en 2026",
          hint: "Le titre apparaît en haut de l'article",
        },
        {
          name: "slug",
          label: "Lien de la page",
          type: "slug",
          prefix: "/actualites/",
          required: true,
          hint: "Utilisez le bouton « Générer depuis le titre » pour aller plus vite",
        },
        {
          name: "category",
          label: "Catégorie",
          type: "select",
          options: CATEGORIES,
          required: true,
          defaultValue: "Guide",
        },
        {
          name: "excerpt",
          label: "Résumé court",
          type: "textarea",
          required: true,
          placeholder: "1 à 2 phrases qui résument l'article",
          hint: "Affiché dans la liste des articles et sur les réseaux sociaux",
        },
        {
          name: "content",
          label: "Contenu de l'article",
          type: "textarea",
          required: true,
          placeholder:
            "Rédigez votre article. Laissez une ligne vide entre chaque paragraphe.",
          hint: "Chaque paragraphe doit être séparé par une ligne vide",
        },
        {
          name: "cover_image",
          label: "Image de couverture",
          placeholder:
            "Collez l'URL d'une image (ou laissez vide pour l'image par défaut)",
          hint: "Recommandé : 1400 x 800 px",
        },
        {
          name: "published",
          label: "Publier immédiatement sur le site",
          type: "checkbox",
          defaultValue: true,
          hint: "Décochez pour enregistrer en brouillon",
        },
      ]}
    />
  );
}