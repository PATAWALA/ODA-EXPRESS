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

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  content: string[];
  keyPoints?: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "import-chine-2026",
    title: "Importer de Chine en 2026 : ce qui change pour l'Afrique",
    excerpt:
      "Nouvelles routes maritimes, délais réduits et solutions de dédouanement simplifiées : ce qu'il faut savoir cette année.",
    category: "Guide",
    date: "15 janvier 2026",
    readTime: "4 min",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=85",
    keyPoints: [
      "Délais moyens réduits de 5 à 7 jours sur le corridor Guangzhou — Afrique de l'Ouest",
      "Nouvelles procédures de dédouanement simplifiées dans 4 pays",
      "Hausse des capacités de groupage maritime au départ de Nansha",
      "Recommandation : anticiper ses commandes avant les périodes de pointe",
    ],
    content: [
      "L'année 2026 marque un tournant pour les importateurs africains qui s'approvisionnent en Chine. Plusieurs changements structurels transforment la manière dont les marchandises circulent entre Guangzhou, Yiwu, Foshan et les grands ports d'Afrique de l'Ouest et centrale.",
      "Premier changement notable : l'augmentation des capacités de groupage maritime au départ du port de Nansha, à Guangzhou. Les armateurs ont renforcé leurs fréquences vers Douala, Abidjan, Lomé et Pointe-Noire. Cela signifie plus de départs disponibles par mois, donc des délais raccourcis pour les expéditions en groupage.",
      "Deuxième changement : plusieurs pays africains ont simplifié leur procédure de dédouanement, avec la mise en place de guichets uniques numériques. Pour l'importateur, cela se traduit par moins de documents papier et un passage plus rapide en douane — à condition que la documentation fournie soit complète et conforme dès le départ.",
      "Troisième changement, plus discret mais important : la hausse du coût du carburant maritime a légèrement augmenté les tarifs au CBM. Les écarts restent modérés, mais anticiper ses commandes permet de sécuriser les meilleurs tarifs.",
      "En résumé, 2026 est une année favorable pour importer de Chine, à condition de travailler avec un partenaire présent sur place, capable de vérifier les fournisseurs, de consolider les colis et de gérer la documentation d'export. C'est exactement ce que nous faisons chaque jour à Guangzhou.",
    ],
  },
  {
    id: "choisir-fournisseur",
    title: "Comment vérifier un fournisseur chinois avant de payer",
    excerpt:
      "5 signes qui distinguent une vraie usine d'un intermédiaire. Notre méthode d'inspection sur place.",
    category: "Conseils",
    date: "8 janvier 2026",
    readTime: "6 min",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&q=85",
    keyPoints: [
      "Une vraie usine a un numéro de licence vérifiable",
      "Méfiance si le fournisseur refuse une visite sur place",
      "Vérifier l'adresse physique : bureaux ≠ usine",
      "Toujours demander un rapport d'inspection avant le solde",
    ],
    content: [
      "Le premier risque pour un importateur africain, ce n'est pas le fret : c'est le fournisseur. Chaque année, des commerçants perdent de l'argent parce qu'ils ont payé un intermédiaire qui se faisait passer pour une usine.",
      "Voici les 5 signes qui distinguent une vraie usine d'un simple intermédiaire. Premier signe : la licence commerciale. Une usine sérieuse fournit un numéro de licence vérifiable dans le registre chinois. Si le fournisseur évite le sujet, méfiance.",
      "Deuxième signe : l'adresse physique. Beaucoup d'intermédiaires annoncent une adresse dans une tour de bureaux en centre-ville. Une usine se trouve en zone industrielle, avec des lignes de production visibles. Une visite sur place tranche immédiatement.",
      "Troisième signe : la capacité de production. Demandez combien d'unités l'usine peut produire par mois et dans quel délai. Un intermédiaire donnera souvent une réponse vague. Une usine donnera un chiffre précis, aligné avec votre commande.",
      "Quatrième signe : la disposition à recevoir un contrôle. Une usine qui refuse une inspection avant paiement cache quelque chose. Une usine confiante accepte sans problème, et souvent avec fierté.",
      "Cinquième signe : la documentation. Une vraie usine fournit une facture d'exportation conforme, un packing list détaillé et les certificats nécessaires selon la marchandise. Sans ces documents, le dédouanement à l'arrivée devient un cauchemar.",
      "Chez ODA SOURCES, nous visitons physiquement chaque usine avant tout paiement. Nous filmons, nous photographions, nous vérifions les licences. C'est ce qui protège nos clients contre les mauvaises surprises.",
    ],
  },
  {
    id: "conteneur-partage",
    title: "Conteneur partagé : optimiser ses coûts quand on débute",
    excerpt:
      "Vous n'avez pas besoin de remplir un conteneur entier pour importer. Voici comment fonctionne le groupage.",
    category: "Logistique",
    date: "2 janvier 2026",
    readTime: "5 min",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=85",
    keyPoints: [
      "Le groupage permet d'expédier à partir d'1 m³ seulement",
      "Vous payez uniquement votre volume réel",
      "Délais légèrement plus longs qu'un conteneur complet",
      "Idéal pour tester un nouveau produit avant un gros achat",
    ],
    content: [
      "Beaucoup de commerçants pensent qu'il faut remplir un conteneur entier pour importer de Chine. C'est faux. Le groupage maritime permet d'expédier à partir d'un simple mètre cube, en partageant le conteneur avec d'autres marchandises.",
      "Comment ça marche ? Vous déposez vos colis à notre entrepôt de Guangzhou. Nous les emballons, les étiquetons et les consolidons avec d'autres expéditions vers la même destination. Une fois le conteneur complet, il part vers votre port.",
      "L'avantage principal : vous ne payez que votre volume réel. Si vous avez 3 m³ à expédier, vous payez 3 m³. Pas besoin d'acheter tout le conteneur. C'est idéal pour tester un nouveau produit ou compléter un stock sans immobiliser trop de trésorerie.",
      "La contrepartie : les délais sont légèrement plus longs qu'un conteneur complet, puisqu'il faut attendre que le conteneur soit rempli avant le départ. En général, comptez 35 à 50 jours de transit maritime.",
      "Notre conseil pour les débutants : commencez par un envoi en groupage de 2 à 5 m³. Une fois que le produit se vend bien, vous pourrez passer au conteneur complet de 28 ou 58 m³, avec des tarifs au mètre cube plus avantageux.",
      "Le groupage maritime est une porte d'entrée accessible pour tester le commerce Chine — Afrique sans engager de grosses sommes. C'est la stratégie que nous recommandons à tous nos nouveaux clients.",
    ],
  },
];

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}