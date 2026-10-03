import {
  Truck,
  Tractor,
  Factory,
  Shirt,
  Building2,
  Sofa,
  Cpu,
  Cog,
  type LucideIcon,
} from "lucide-react";

export interface Sector {
  slug: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SECTORS: Sector[] = [
  {
    slug: "camions-poids-lourds",
    icon: Truck,
    title: "Camions & poids lourds",
    description:
      "Camions bennes, porteurs, semi-remorques et véhicules utilitaires.",
  },
  {
    slug: "engins-agricoles",
    icon: Tractor,
    title: "Tracteurs & engins agricoles",
    description:
      "Tracteurs, motoculteurs, décortiqueuses et matériel d'irrigation.",
  },
  {
    slug: "machines-industrielles",
    icon: Factory,
    title: "Machines industrielles",
    description:
      "Presses, broyeurs, lignes de production et équipements d'atelier.",
  },
  {
    slug: "textile-gros",
    icon: Shirt,
    title: "Textile & habillement en gros",
    description:
      "Vêtements, chaussures, sacs et accessoires pour revente.",
  },
  {
    slug: "materiaux-btp",
    icon: Building2,
    title: "Matériaux de construction",
    description:
      "Carrelage, sanitaires, portes, profilés et quincaillerie.",
  },
  {
    slug: "mobilier-decoration",
    icon: Sofa,
    title: "Mobilier & décoration",
    description: "Salons, chambres, bureaux et articles de maison.",
  },
  {
    slug: "electronique-solaire",
    icon: Cpu,
    title: "Électronique & solaire",
    description:
      "Panneaux, onduleurs, batteries et petit électroménager.",
  },
  {
    slug: "pieces-auto-moto",
    icon: Cog,
    title: "Pièces auto & moto",
    description:
      "Pièces détachées, accessoires et consommables pour ateliers.",
  },
];