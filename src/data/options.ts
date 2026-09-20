import { Search, ShieldCheck, Ship, type LucideIcon } from "lucide-react";

export const WHATSAPP = "8619515660197";

export type Need = "sourcing" | "inspection" | "shipping";

export interface Option {
  id: Need;
  title: string;
  sub: string;
  icon: LucideIcon;
}

export const OPTIONS: Option[] = [
  {
    id: "sourcing",
    title: "Sourcing & Achat",
    sub: "Trouver un produit en Chine",
    icon: Search,
  },
  {
    id: "inspection",
    title: "Inspection Usine",
    sub: "Vérifier une marchandise à Guangzhou",
    icon: ShieldCheck,
  },
  {
    id: "shipping",
    title: "Expédition Fret",
    sub: "Envoyer vers l'Afrique",
    icon: Ship,
  },
];