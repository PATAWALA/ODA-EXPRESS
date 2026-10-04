export interface RealisationCategory {
  id: string;
  label: string;
}

export const REALISATION_CATEGORIES: RealisationCategory[] = [
  { id: "all", label: "Tous" },
  { id: "engins", label: "Engins de chantier" },
  { id: "poids-lourds", label: "Poids lourds" },
  { id: "machines", label: "Machines industrielles" },
  { id: "transport", label: "Transport & véhicules" },
  { id: "conteneurs", label: "Fret maritime" },
];

export interface Realisation {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  categoryId: string;
  description?: string;
  country?: string;
  featured?: boolean;
}

export const REALISATIONS: Realisation[] = [
  {
    id: "pelle-hyundai-hx220",
    type: "image",
    src: "/realisations/pelle-hyundai-hx220.jpeg",
    title: "Pelle hydraulique 22 tonnes",
    category: "Engins de chantier",
    categoryId: "engins",
    description:
      "Pelle sur chenilles Hyundai HX220 livrée pour un chantier d'infrastructure.",
    featured: true,
  },
  {
    id: "poids-lourds-rouges",
    type: "image",
    src: "/realisations/poids-lourds-rouges.jpeg",
    title: "Flotte de tracteurs routiers",
    category: "Poids lourds",
    categoryId: "poids-lourds",
    description:
      "Ensemble de tracteurs routiers destinés au transport longue distance.",
    featured: true,
  },
  {
    id: "machine-bloc",
    type: "image",
    src: "/realisations/machine-bloc.jpeg",
    title: "Machine à blocs automatique",
    category: "Machines industrielles",
    categoryId: "machines",
    description:
      "Ligne de production de blocs en béton, installée pour un client industriel.",
    featured: true,
  },
  {
    id: "conteneurs-msc",
    type: "image",
    src: "/realisations/conteneurs-msc.jpeg",
    title: "Conteneurs 20' et 40'",
    category: "Fret maritime",
    categoryId: "conteneurs",
    description:
      "Consolidation et expédition de conteneurs complets vers l'Afrique.",
    featured: true,
  },
  {
    id: "pelle-hyundai",
    type: "image",
    src: "/realisations/pelle-hyundai.jpeg",
    title: "Chargeuse sur pneus",
    category: "Engins de chantier",
    categoryId: "engins",
  },
  {
    id: "camion-benne-jaune",
    type: "image",
    src: "/realisations/camion-benne-jaune.jpeg",
    title: "Camion benne 30 tonnes",
    category: "Poids lourds",
    categoryId: "poids-lourds",
  },
  {
    id: "camion-citerne",
    type: "image",
    src: "/realisations/camion-citerne.jpeg",
    title: "Camion citerne 30 000 L",
    category: "Poids lourds",
    categoryId: "poids-lourds",
  },
  {
    id: "generateur",
    type: "image",
    src: "/realisations/generateur.jpeg",
    title: "Groupes électrogènes 100 kVA",
    category: "Machines industrielles",
    categoryId: "machines",
  },
  {
    id: "bus-pmt",
    type: "image",
    src: "/realisations/bus-pmt.jpeg",
    title: "Bus de transport 45 places",
    category: "Transport & véhicules",
    categoryId: "transport",
  },
  {
    id: "remorque-blanche",
    type: "image",
    src: "/realisations/remorque-blanche.jpeg",
    title: "Remorque plateau extensible",
    category: "Transport & véhicules",
    categoryId: "transport",
  },
  {
    id: "livraison-vehicule",
    type: "image",
    src: "/realisations/livraison-vehicule.jpeg",
    title: "Véhicule SUV livré client",
    category: "Transport & véhicules",
    categoryId: "transport",
  },
];

export function getFeaturedRealisations(): Realisation[] {
  return REALISATIONS.filter((r) => r.featured);
}