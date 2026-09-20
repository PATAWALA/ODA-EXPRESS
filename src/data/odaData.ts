import { Plane, SearchCheck, Ship, ShieldCheck, type LucideIcon } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  CONTACTS OFFICIELS                                                        */
/* -------------------------------------------------------------------------- */

export const WHATSAPP_NUMBER = "8619515660197";
export const CONTACT_PHONE_DISPLAY = "+86 195 1566 0197";
export const CONTACT_EMAIL = "odaxpress10@gmail.com";
export const WAREHOUSE_ADDRESS = "Entrepôt ODA Express — Guangzhou, Guangdong, Chine";

/* -------------------------------------------------------------------------- */
/*  SERVICES                                                                  */
/* -------------------------------------------------------------------------- */

export type ServiceId = "sourcing" | "inspection" | "shipping";
export type ShippingMode = "air" | "sea";

export interface Service {
  id: ServiceId;
  title: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  wizardLabel: string;
  wizardDescription: string;
}

export const SERVICES: Service[] = [
  {
    id: "sourcing",
    title: "Sourcing & Achat Fournisseur",
    tagline: "Le bon produit, au prix départ usine",
    description:
      "Nous identifions, vérifions et négocions directement auprès d'usines certifiées sur 1688, Alibaba et Yiwu. Vous recevez des photos réelles et un prix ferme avant tout paiement.",
    icon: SearchCheck,
    features: [
      "Recherche de produits certifiés 1688 / Alibaba",
      "Négociation directe avec l'usine (prix départ usine)",
      "Vérification des licences et capacités de production",
      "Échantillons et photos avant validation",
    ],
    wizardLabel: "Sourcing produit",
    wizardDescription: "Trouver et négocier un fournisseur en Chine",
  },
  {
    id: "inspection",
    title: "Inspection & Contrôle Qualité",
    tagline: "Voir avant de payer",
    description:
      "Notre équipe se déplace physiquement dans l'usine à Guangzhou, Foshan ou Yiwu. Vous recevez un rapport photo et vidéo complet sous 24 heures, avant le paiement final.",
    icon: ShieldCheck,
    features: [
      "Visite physique de l'usine en Chine",
      "Rapport photo + vidéo sous 24 heures",
      "Contrôle des quantités, finitions et emballages",
      "Blocage du paiement en cas d'écart constaté",
    ],
    wizardLabel: "Inspection fournisseur Chine",
    wizardDescription: "Vérifier la marchandise avant le paiement final",
  },
  {
    id: "shipping",
    title: "Fret & Shipping Afrique",
    tagline: "Aérien express ou maritime groupé",
    description:
      "Nous consolidons, emballons et expédions votre marchandise vers 12 pays d'Afrique, avec dédouanement pris en charge et livraison finale à votre porte.",
    icon: Ship,
    features: [
      "Fret aérien express : 5 à 7 jours",
      "Fret maritime groupage ou conteneur complet",
      "Dédouanement pris en charge à l'arrivée",
      "Livraison finale à votre entrepôt ou boutique",
    ],
    wizardLabel: "Expédition de fret",
    wizardDescription: "Expédier ma marchandise vers l'Afrique",
  },
];

/* -------------------------------------------------------------------------- */
/*  DESTINATIONS AFRIQUE                                                      */
/* -------------------------------------------------------------------------- */

export interface DestinationCountry {
  country: string;
  cities: string[];
}

export const AFRICA_DESTINATIONS: DestinationCountry[] = [
  { country: "RD Congo", cities: ["Kinshasa", "Lubumbashi", "Goma", "Matadi"] },
  { country: "Cameroun", cities: ["Douala", "Yaoundé", "Garoua"] },
  { country: "Côte d'Ivoire", cities: ["Abidjan", "San Pédro", "Bouaké"] },
  { country: "Sénégal", cities: ["Dakar", "Thiès", "Touba"] },
  { country: "Gabon", cities: ["Libreville", "Port-Gentil", "Franceville"] },
  { country: "Congo", cities: ["Brazzaville", "Pointe-Noire", "Dolisie"] },
  { country: "Burkina Faso", cities: ["Ouagadougou", "Bobo-Dioulasso"] },
  { country: "Mali", cities: ["Bamako", "Sikasso", "Ségou"] },
  { country: "Bénin", cities: ["Cotonou", "Porto-Novo", "Parakou"] },
  { country: "Togo", cities: ["Lomé", "Kara", "Sokodé"] },
  { country: "Guinée", cities: ["Conakry", "Kankan", "Kindia"] },
  { country: "Niger", cities: ["Niamey", "Zinder", "Maradi"] },
];

/* -------------------------------------------------------------------------- */
/*  TARIFS INDICATIFS                                                         */
/* -------------------------------------------------------------------------- */

export const RATES = {
  airPerKg: 10,
  seaPerCbm: 180,
  sourcingFee: 50,
  inspectionFee: 99,
} as const;

export interface PricingHighlight {
  label: string;
  price: string;
  delay: string;
  detail: string;
  icon: LucideIcon;
}

export const PRICING_HIGHLIGHTS: PricingHighlight[] = [
  {
    label: "Fret aérien express",
    price: "dès $10 / kg",
    delay: "5 à 7 jours",
    detail: "Idéal pour les urgences, les échantillons et les marchandises à forte valeur.",
    icon: Plane,
  },
  {
    label: "Fret maritime",
    price: "dès $180 / CBM",
    delay: "35 à 50 jours",
    detail: "Groupage ou conteneur complet pour les volumes importants et le mobilier.",
    icon: Ship,
  },
];

/* -------------------------------------------------------------------------- */
/*  CATÉGORIES PRODUITS (assistant de devis)                                  */
/* -------------------------------------------------------------------------- */

export const PRODUCT_CATEGORIES = [
  "Téléphones & accessoires",
  "Électronique & électroménager",
  "Pièces détachées auto / moto",
  "Textile, chaussures & sacs",
  "Mobilier & décoration",
  "Matériel médical & paramédical",
  "Machines & équipements industriels",
  "Cosmétiques & produits de soin",
  "Emballage & packaging",
  "Matériaux de construction",
  "Autre (à préciser sur WhatsApp)",
];

/* -------------------------------------------------------------------------- */
/*  MOTEUR D'ESTIMATION                                                       */
/* -------------------------------------------------------------------------- */

export interface QuoteInput {
  service: ServiceId;
  shippingMode: ShippingMode;
  weightKg: number;
  volumeM3: number;
  withInspection: boolean;
}

export interface QuoteLine {
  label: string;
  detail: string;
  amountUsd: number | null;
}

export interface QuoteResult {
  lines: QuoteLine[];
  totalUsd: number;
  isPartial: boolean;
  delay: string;
}

export function computeQuote(input: QuoteInput): QuoteResult {
  const lines: QuoteLine[] = [];
  const isAir = input.shippingMode === "air";

  if (isAir && input.weightKg > 0) {
    lines.push({
      label: "Fret aérien express",
      detail: `${input.weightKg} kg × $${RATES.airPerKg} / kg`,
      amountUsd: Math.round(input.weightKg * RATES.airPerKg),
    });
  } else if (!isAir && input.volumeM3 > 0) {
    lines.push({
      label: "Fret maritime (groupage)",
      detail: `${input.volumeM3} m³ × $${RATES.seaPerCbm} / CBM`,
      amountUsd: Math.round(input.volumeM3 * RATES.seaPerCbm),
    });
  } else {
    lines.push({
      label: isAir ? "Fret aérien express" : "Fret maritime",
      detail: isAir
        ? "Poids à confirmer avec le fournisseur"
        : "Volume à confirmer avec le fournisseur",
      amountUsd: null,
    });
  }

  if (input.service === "sourcing") {
    lines.push({
      label: "Sourcing & négociation fournisseur",
      detail: "Forfait recherche + obtention du prix départ usine",
      amountUsd: RATES.sourcingFee,
    });
  }

  if (input.service === "inspection" || input.withInspection) {
    lines.push({
      label: "Inspection qualité en usine",
      detail: "Visite sur site + rapport photo / vidéo sous 24 h",
      amountUsd: RATES.inspectionFee,
    });
  }

  const totalUsd = lines.reduce((sum, line) => sum + (line.amountUsd ?? 0), 0);
  const isPartial = lines.some((line) => line.amountUsd === null);

  const transit = isAir
    ? "5 à 7 jours de transit aérien"
    : "35 à 50 jours de transit maritime";

  const delay =
    input.service === "sourcing"
      ? `3 à 5 jours de sourcing, puis ${transit}`
      : transit;

  return { lines, totalUsd, isPartial, delay };
}

/* -------------------------------------------------------------------------- */
/*  SUIVI DE COLIS                                                            */
/* -------------------------------------------------------------------------- */

export interface TrackingStep {
  title: string;
  location: string;
  description: string;
}

export const TRACKING_STEPS: TrackingStep[] = [
  {
    title: "Marchandise réceptionnée",
    location: "Entrepôt ODA — Guangzhou, Chine",
    description: "Vos colis sont réceptionnés, pesés, mesurés et référencés.",
  },
  {
    title: "Inspection qualité",
    location: "Entrepôt ODA — Guangzhou, Chine",
    description: "Contrôle visuel, comptage et rapport photo / vidéo envoyé sous 24 h.",
  },
  {
    title: "Emballage renforcé & consolidation",
    location: "Guangzhou, Chine",
    description: "Palettisation, filmage et consolidation avec les autres marchandises.",
  },
  {
    title: "Départ international",
    location: "Port / Aéroport de Guangzhou",
    description: "Exportation déclarée et départ du navire ou de l'avion.",
  },
  {
    title: "En transit international",
    location: "Corridor Chine — Afrique",
    description: "Suivi actif du conteneur ou du lot aérien par notre équipe.",
  },
  {
    title: "Arrivée & dédouanement",
    location: "Port de destination",
    description: "Dédouanement réalisé avec nos partenaires agréés, sans blocage.",
  },
  {
    title: "Livraison finale",
    location: "Votre adresse en Afrique",
    description: "Remise de la marchandise avec confirmation de réception signée.",
  },
];

/* -------------------------------------------------------------------------- */
/*  RÉASSURANCE                                                               */
/* -------------------------------------------------------------------------- */

export interface TrustReason {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TRUST_REASONS: TrustReason[] = [
  {
    title: "Une présence physique en Chine",
    description:
      "Notre entrepôt et notre équipe sont basés à Guangzhou. Nous allons voir vos fournisseurs sur place, pas derrière un écran.",
    icon: SearchCheck,
  },
  {
    title: "Inspection vidéo en direct",
    description:
      "Vous assistez au contrôle de votre marchandise en appel vidéo avant le paiement final. Aucun écart, aucune surprise à l'arrivée.",
    icon: ShieldCheck,
  },
  {
    title: "Zéro risque de blocage douanier",
    description:
      "Documents conformes, classifications douanières validées et partenaires agréés dans chacun des 12 pays desservis.",
    icon: Ship,
  },
  {
    title: "Un seul interlocuteur",
    description:
      "De la recherche du fournisseur jusqu'à la livraison finale, Mr ODA suit personnellement votre dossier de bout en bout.",
    icon: Plane,
  },
];