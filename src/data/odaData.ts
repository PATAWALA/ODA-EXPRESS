import { Plane, Search, ShieldCheck, Ship, type LucideIcon } from "lucide-react";

export const WHATSAPP = "8619515660197";

/* --- Services (1 ligne chacun) --- */
export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  line: string;
}

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    icon: Search,
    title: "Sourcing produit",
    line: "Nous trouvons et négocions votre fournisseur en Chine.",
  },
  {
    id: "inspection",
    icon: ShieldCheck,
    title: "Inspection usine",
    line: "Nous vérifions la marchandise avant votre paiement.",
  },
  {
    id: "shipping",
    icon: Ship,
    title: "Fret & Shipping",
    line: "Aérien 5-7 jours ou maritime dès $180 / CBM.",
  },
];

/* --- Destinations courtes --- */
export const CITIES = [
  "Kinshasa", "Lubumbashi", "Douala", "Yaoundé",
  "Abidjan", "Dakar", "Libreville", "Brazzaville",
  "Pointe-Noire", "Ouagadougou", "Cotonou", "Lomé",
];

/* --- Produits (liste courte) --- */
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

/* --- Assistance à l'estimation --- */
export const AIR_PER_KG = 10;
export const SEA_PER_CBM = 180;