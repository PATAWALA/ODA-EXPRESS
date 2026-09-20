import { Search, ShieldCheck, Ship, type LucideIcon } from "lucide-react";

export const WHATSAPP = "8619515660197";
export const PHONE = "+86 195 1566 0197";
export const EMAIL = "odaxpress10@gmail.com";

/* ---------- Services ---------- */

export interface Service {
  id: "sourcing" | "inspection" | "shipping";
  icon: LucideIcon;
  title: string;
  line: string;
  points: string[];
}

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    icon: Search,
    title: "Sourcing & Achat",
    line: "Nous trouvons et négocions votre fournisseur en Chine.",
    points: [
      "Produits certifiés 1688 / Alibaba",
      "Prix départ usine négocié",
    ],
  },
  {
    id: "inspection",
    icon: ShieldCheck,
    title: "Inspection Usine",
    line: "Nous vérifions votre marchandise avant votre paiement.",
    points: [
      "Visite physique à Guangzhou / Yiwu",
      "Rapport photo & vidéo sous 24 h",
    ],
  },
  {
    id: "shipping",
    icon: Ship,
    title: "Fret & Shipping",
    line: "Nous expédions vers 12 pays d'Afrique, dédouanement inclus.",
    points: [
      "Aérien express : 5 à 7 jours",
      "Maritime : dès $180 / CBM",
    ],
  },
];

/* ---------- Destinations ---------- */

export const CITIES = [
  "Kinshasa", "Lubumbashi", "Douala", "Yaoundé",
  "Abidjan", "Dakar", "Libreville", "Brazzaville",
  "Pointe-Noire", "Ouagadougou", "Cotonou", "Lomé",
];

/* ---------- Produits ---------- */

export const PRODUCTS = [
  "Téléphones & accessoires",
  "Électronique",
  "Pièces auto / moto",
  "Textile & chaussures",
  "Mobilier",
  "Matériel médical",
  "Machines industrielles",
  "Autre",
];

/* ---------- Tarifs ---------- */

export const AIR_PER_KG = 10;
export const SEA_PER_CBM = 180;