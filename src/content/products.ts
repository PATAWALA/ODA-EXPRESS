export interface ProductCategory {
  id: string;
  label: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "all", label: "Tous" },
  { id: "industrie", label: "Industrie" },
  { id: "construction", label: "Construction" },
  { id: "electronique", label: "Électronique" },
  { id: "textile", label: "Textile" },
  { id: "maison", label: "Maison" },
  { id: "auto", label: "Auto" },
  { id: "emballage", label: "Emballage" },
  { id: "beaute", label: "Beauté" },
  { id: "medical", label: "Médical" },
];

export interface ProductFamily {
  slug: string;
  title: string;
  description?: string;
  categoryId: string;
  category: string;
  image: string;
  items: string[];
  featured?: boolean;
}

export const PRODUCT_FAMILIES: ProductFamily[] = [
  {
    slug: "machines-industrielles",
    title: "Machines industrielles",
    description: "Presses, broyeurs, lignes de production et équipements d'atelier.",
    categoryId: "industrie",
    category: "Industrie",
    image:
      "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=85",
    items: [
      "Presses hydrauliques 10T à 200T",
      "Broyeurs plastique et bois",
      "Machines agricoles",
      "Compresseurs et groupes électrogènes",
      "Lignes d'embouteillage",
      "Machines à blocs et briques",
    ],
    featured: true,
  },
  {
    slug: "materiaux-construction",
    title: "Matériaux de construction",
    description: "Carrelage, sanitaires, portes, profilés aluminium et quincaillerie.",
    categoryId: "construction",
    category: "Construction",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85",
    items: [
      "Carrelage sol et mur",
      "Sanitaires et robinetterie",
      "Portes bois, acier et aluminium",
      "Profilés aluminium et vitrage",
      "Tôles, tubes et barres acier",
      "Peinture et finitions",
    ],
    featured: true,
  },
  {
    slug: "electronique-gros",
    title: "Électronique en gros",
    description: "Téléphones, accessoires, panneaux solaires et petit électroménager.",
    categoryId: "electronique",
    category: "Électronique",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85",
    items: [
      "Téléphones et tablettes",
      "Accessoires téléphones",
      "Panneaux solaires et onduleurs",
      "Éclairage LED",
      "Petit électroménager",
      "TV, sono et accessoires",
    ],
    featured: true,
  },
  {
    slug: "textile-chaussures",
    title: "Textile & chaussures",
    description: "Vêtements, chaussures, sacs et accessoires en gros.",
    categoryId: "textile",
    category: "Textile",
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=85",
    items: [
      "Chaussures sport et ville",
      "Vêtements homme, femme, enfant",
      "Sacs et bagagerie",
      "Accessoires de mode",
      "Uniformes professionnels",
      "Textiles techniques",
    ],
    featured: true,
  },
  {
    slug: "mobilier-decoration",
    title: "Mobilier & décoration",
    description: "Salons, chaises, tables et articles de maison.",
    categoryId: "maison",
    category: "Maison",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
    items: [
      "Salons et canapés",
      "Chaises et tables",
      "Lits et matelas",
      "Rangement et placards",
      "Décoration intérieure",
      "Articles de cuisine",
    ],
    featured: true,
  },
  {
    slug: "pieces-auto-moto",
    title: "Pièces auto & moto",
    description: "Pièces détachées, accessoires et consommables.",
    categoryId: "auto",
    category: "Auto",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=85",
    items: [
      "Pièces moteur",
      "Freins et suspensions",
      "Éclairage et signalisation",
      "Pneus et jantes",
      "Pièces moto 125cc",
      "Accessoires et consommables",
    ],
    featured: true,
  },
  {
    slug: "emballage-packaging",
    title: "Emballage & packaging",
    description: "Cartons, films, étiquettes et matériel d'emballage.",
    categoryId: "emballage",
    category: "Emballage",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1200&q=85",
    items: [
      "Cartons personnalisés",
      "Films et plastiques",
      "Sachets et poches",
      "Étiquettes et stickers",
      "Machines d'emballage",
      "Matériel de calage",
    ],
  },
  {
    slug: "cosmetiques-soin",
    title: "Cosmétiques & soin",
    description: "Produits de beauté, soins et hygiène.",
    categoryId: "beaute",
    category: "Beauté",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=85",
    items: [
      "Soins visage et corps",
      "Produits capillaires",
      "Maquillage",
      "Parfums et huiles",
      "Hygiène et accessoires",
      "Matériel professionnel",
    ],
  },
  {
    slug: "materiel-medical",
    title: "Matériel médical",
    description: "Équipements et consommables médicaux.",
    categoryId: "medical",
    category: "Médical",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=85",
    items: [
      "Équipements de diagnostic",
      "Consommables médicaux",
      "Mobilier médical",
      "Instruments chirurgicaux",
      "Protection et hygiène",
      "Matériel de laboratoire",
    ],
  },
];