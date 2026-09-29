import {
  Boxes,
  Building2,
  Container,
  Cpu,
  Package,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export const WHATSAPP = "8619515660197";
export const PHONE_DISPLAY = "+86 195 1566 0197";
export const EMAIL = "odaxpress10@gmail.com";

/* ---------- Catalogue ---------- */

export interface Product {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  image: string;
  tags: string[];
  unit: string;
  minOrder: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "machines-industrielles",
    icon: Building2,
    title: "Machines industrielles",
    short:
      "Lignes de production, presses, broyeurs, machines agricoles et équipements d'atelier.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    tags: ["1688", "Alibaba"],
    unit: "à l'unité",
    minOrder: "1 conteneur 20' ou 40'",
  },
  {
    id: "materiaux-construction",
    icon: Boxes,
    title: "Matériaux de construction",
    short:
      "Carrelage, sanitaires, portes, profilés aluminium, tôles et quincaillerie en gros.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    tags: ["Foshan", "Yiwu"],
    unit: "par lot",
    minOrder: "5 CBM ou conteneur complet",
  },
  {
    id: "electronique-gros",
    icon: Cpu,
    title: "Électronique en gros",
    short:
      "Téléphones, accessoires, panneaux solaires, onduleurs, éclairage LED et petit électroménager.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    tags: ["Shenzhen", "Guangzhou"],
    unit: "carton / palette",
    minOrder: "1 CBM ou conteneur",
  },
  {
    id: "sourcing-sur-mesure",
    icon: Search,
    title: "Sourcing sur-mesure 1688 / Taobao",
    short:
      "Vous nous donnez la référence ou la photo. Nous trouvons le fournisseur, négocions et vérifions.",
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
    tags: ["1688", "Taobao"],
    unit: "forfait",
    minOrder: "1 référence",
  },
  {
    id: "inspection-usine",
    icon: ShieldCheck,
    title: "Inspection usine",
    short:
      "Visite physique du fournisseur à Guangzhou, Foshan ou Yiwu. Rapport photo & vidéo sous 24 h.",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80",
    tags: ["Guangzhou", "Yiwu"],
    unit: "par usine",
    minOrder: "1 visite",
  },
  {
    id: "groupage-maritime",
    icon: Package,
    title: "Groupage maritime CBM",
    short:
      "Consolidation de vos colis en conteneur partagé, départ Guangzhou vers votre port en Afrique.",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80",
    tags: ["FCL", "LCL"],
    unit: "par CBM",
    minOrder: "1 CBM",
  },
];

/* ---------- Ports de destination ---------- */

export const PORTS = [
  { country: "RD Congo", port: "Matadi / Kinshasa" },
  { country: "Cameroun", port: "Douala" },
  { country: "Côte d'Ivoire", port: "Abidjan" },
  { country: "Sénégal", port: "Dakar" },
  { country: "Gabon", port: "Libreville / Owendo" },
  { country: "Congo", port: "Pointe-Noire" },
  { country: "Bénin", port: "Cotonou" },
  { country: "Togo", port: "Lomé" },
  { country: "Ghana", port: "Tema" },
  { country: "Nigeria", port: "Lagos / Apapa" },
  { country: "Angola", port: "Luanda" },
  { country: "Guinée", port: "Conakry" },
];

/* ---------- Tarifs maritimes ---------- */

export const SEA_PER_CBM = 180;
export const SEA_MIN_CBM = 1;
export const CONTAINER_20_FT = 28;
export const CONTAINER_40_FT = 58;

/* ---------- Bottom Nav ---------- */

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Accueil", href: "#top", icon: Package },
  { label: "Catalogue", href: "#catalogue", icon: Boxes },
  { label: "Maritime", href: "#maritime", icon: Container },
  { label: "Demande", href: "#demande", icon: ShieldCheck },
];