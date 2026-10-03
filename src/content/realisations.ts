export interface Realisation {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  category: string;
  country?: string;
}

export const REALISATIONS: Realisation[] = [
  {
    id: "pelle-hyundai",
    type: "image",
    src: "/realisations/pelle-hyundai.jpeg",
    title: "Pelle hydraulique 22 tonnes",
    category: "Engins de chantier",
  },
  {
    id: "camion-benne-jaune",
    type: "image",
    src: "/realisations/camion-benne-jaune.jpeg",
    title: "Camion benne 30 tonnes",
    category: "Poids lourds",
  },
  {
    id: "bus-pmt",
    type: "image",
    src: "/realisations/bus-pmt.jpeg",
    title: "Bus de transport 45 places",
    category: "Transport de personnes",
  },
  {
    id: "machine-bloc",
    type: "image",
    src: "/realisations/machine-bloc.jpeg",
    title: "Machine à blocs automatique",
    category: "Machines industrielles",
  },
  {
    id: "generateur",
    type: "image",
    src: "/realisations/generateur.jpeg",
    title: "Groupe électrogène 100 kVA",
    category: "Énergie",
  },
  {
    id: "conteneurs-msc",
    type: "image",
    src: "/realisations/conteneurs-msc.jpeg",
    title: "Conteneurs 20' et 40'",
    category: "Fret maritime",
  },
  {
    id: "poids-lourds-rouges",
    type: "image",
    src: "/realisations/poids-lourds-rouges.jpeg",
    title: "Tracteurs routiers",
    category: "Poids lourds",
  },
  {
    id: "camion-citerne",
    type: "image",
    src: "/realisations/camion-citerne.jpeg",
    title: "Camion citerne 30 000 L",
    category: "Véhicules spécialisés",
  },
  {
    id: "remorque-blanche",
    type: "image",
    src: "/realisations/remorque-blanche.jpeg",
    title: "Remorque plateau extensible",
    category: "Remorques",
  },
  {
    id: "livraison-vehicule",
    type: "image",
    src: "/realisations/livraison-vehicule.jpeg",
    title: "Véhicule SUV livré client",
    category: "Véhicules particuliers",
  },
];