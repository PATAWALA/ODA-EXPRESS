export const WHATSAPP = "8619515660197";
export const PHONE_DISPLAY = "+86 195 1566 0197";
export const EMAIL = "odaxpress10@gmail.com";

export const SEA_PER_CBM = 180;
export const SEA_MIN_CBM = 1;
export const CONTAINER_20_FT = 28;
export const CONTAINER_40_FT = 58;

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

export const CATEGORIES = [
  { id: "machines", label: "Machines" },
  { id: "materiaux", label: "Matériaux" },
  { id: "electronique", label: "Électronique" },
  { id: "textile", label: "Textile" },
  { id: "maison", label: "Maison" },
  { id: "auto", label: "Auto / Moto" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export interface Product {
  id: string;
  category: CategoryId;
  title: string;
  brand: string;
  unit: string;
  image: string;
  short: string;
  minOrder: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "presse-hydraulique-50t",
    category: "machines",
    title: "Presse hydraulique 50T",
    brand: "ODA Industrial",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=900&q=85",
    short: "Presse hydraulique 50 tonnes pour atelier métallique.",
    minOrder: 1,
  },
  {
    id: "broyeur-plastique-500",
    category: "machines",
    title: "Broyeur plastique 500 kg/h",
    brand: "ODA Recycling",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=900&q=85",
    short: "Broyeur à couteaux pour recyclage plastique et bois.",
    minOrder: 1,
  },
  {
    id: "carrelage-foshan-60",
    category: "materiaux",
    title: "Carrelage Foshan 60×60 poli",
    brand: "Foshan Ceramics",
    unit: "m²",
    image:
      "https://images.unsplash.com/photo-1615874694520-474822394e73?w=900&q=85",
    short: "Carrelage poli 60×60, pose sol intérieur.",
    minOrder: 100,
  },
  {
    id: "sanitaire-complet-salle-bain",
    category: "materiaux",
    title: "Pack sanitaire salle de bain",
    brand: "ODA Bath",
    unit: "kit",
    image:
      "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=85",
    short: "WC, lavabo, robinetterie et colonne douche.",
    minOrder: 10,
  },
  {
    id: "panneau-solaire-450w",
    category: "electronique",
    title: "Panneau solaire 450 W",
    brand: "SunPower CN",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=85",
    short: "Panneau solaire 450 W haute efficacité.",
    minOrder: 4,
  },
  {
    id: "onduleur-hybride-5kw",
    category: "electronique",
    title: "Onduleur hybride 5 kW MPPT",
    brand: "Growatt CN",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=900&q=85",
    short: "Onduleur hybride solaire 5 kW avec MPPT.",
    minOrder: 1,
  },
  {
    id: "batterie-solaire-lithium-5kwh",
    category: "electronique",
    title: "Batterie solaire lithium 5 kWh",
    brand: "SunPower CN",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1611365892117-00d1b1e2e1a9?w=900&q=85",
    short: "Batterie LiFePO4 48 V / 100 Ah pour stockage solaire.",
    minOrder: 1,
  },
  {
    id: "chaussures-sport-gros",
    category: "textile",
    title: "Chaussures sport en gros (lot 60 paires)",
    brand: "Guangzhou Shoes",
    unit: "lot de 60 paires",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
    short: "Lot 60 paires, tailles et coloris mélangés.",
    minOrder: 1,
  },
  {
    id: "salon-cuir-angle",
    category: "maison",
    title: "Salon d'angle cuir synthétique 5 places",
    brand: "Foshan Home",
    unit: "unité",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=85",
    short: "Canapé d'angle 5 places, cuir PU haut de gamme.",
    minOrder: 1,
  },
  {
    id: "piece-moto-125",
    category: "auto",
    title: "Kit pièces détachées moto 125 cc",
    brand: "Guangzhou Moto",
    unit: "kit",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
    short: "Kit complet pièces courantes moto 125 cc.",
    minOrder: 1,
  },
];

export function buildProductWhatsApp(product: Product): string {
  const message = [
    "Bonjour ODA SOURCES,",
    "",
    "Je suis intéressé(e) par ce produit :",
    "",
    `Produit : ${product.title}`,
    `Référence : ${product.id}`,
    `Unité : ${product.unit}`,
    `Commande minimum : ${product.minOrder} ${product.unit}`,
    "",
    "Merci de me communiquer le tarif et le délai de livraison.",
  ].join("\n");

  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/* ---------- Actualités ---------- */

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

export const ARTICLES: Article[] = [
  {
    id: "import-chine-2026",
    title: "Importer de Chine en 2026 : ce qui change pour l'Afrique",
    excerpt:
      "Nouvelles routes maritimes, délais réduits et solutions de dédouanement simplifiées : ce qu'il faut savoir cette année.",
    category: "Guide",
    date: "15 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=900&q=85",
  },
  {
    id: "choisir-fournisseur",
    title: "Comment vérifier un fournisseur chinois avant de payer",
    excerpt:
      "5 signes qui distinguent une vraie usine d'un intermédiaire. Notre méthode d'inspection sur place.",
    category: "Conseils",
    date: "8 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=900&q=85",
  },
  {
    id: "conteneur-partage",
    title: "Conteneur partagé : optimiser ses coûts quand on débute",
    excerpt:
      "Vous n'avez pas besoin de remplir un conteneur entier pour importer. Voici comment fonctionne le groupage.",
    category: "Logistique",
    date: "2 janvier 2026",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=900&q=85",
  },
];