import {
  Search,
  ShieldCheck,
  Ship,
  Plane,
  CreditCard,
  type LucideIcon,
} from "lucide-react";

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: string;
  short: string;
  intro: string;
  paragraphs: string[];
  features: string[];
  image: string;
  steps: ServiceStep[];
  benefits: ServiceBenefit[];
}

export const SERVICES: Service[] = [
  {
    slug: "sourcing",
    icon: Search,
    title: "Global Sourcing & Achat",
    short: "Recherche de fournisseurs fiables et négociation directe.",
    intro:
      "Nous identifions, vérifions et négocions directement auprès des usines chinoises pour vous livrer le produit qui correspond réellement à votre besoin.",
    paragraphs: [
      "Notre rôle n'est pas de chercher le prix le plus bas, mais la solution la plus adaptée à vos contraintes : qualité attendue, fiabilité du fournisseur, quantité minimum de commande, délais de production et contraintes logistiques.",
      "Nous intervenons sur l'ensemble des marchés chinois : 1688, Alibaba, Taobao, ainsi que sur les grands salons professionnels de Guangzhou, Yiwu, Shenzhen et Foshan. Nous vérifions chaque fournisseur avant d'engager votre commande.",
      "Vous recevez des échantillons ou des photos réelles avant validation, un prix départ usine négocié, et une traçabilité complète de votre commande jusqu'à l'expédition.",
    ],
    features: [
      "Recherche de fournisseurs certifiés 1688 / Alibaba / Taobao",
      "Négociation commerciale et conditions de production",
      "Échantillons et photos avant validation",
      "Achat direct et sécurisé auprès de l'usine",
    ],
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85",
    steps: [
      {
        title: "Cadrage du besoin",
        description:
          "Vous nous décrivez le produit, la quantité, le budget et les délais souhaités.",
      },
      {
        title: "Recherche fournisseurs",
        description:
          "Nous identifions 3 à 5 fournisseurs potentiels sur les marchés adaptés.",
      },
      {
        title: "Négociation & échantillons",
        description:
          "Nous négocions les prix, obtenons des échantillons et vérifions la conformité.",
      },
      {
        title: "Commande & suivi",
        description:
          "Nous passons la commande et suivons la production jusqu'à la livraison.",
      },
    ],
    benefits: [
      {
        title: "Prix départ usine",
        description:
          "Vous achetez sans intermédiaire, avec un prix négocié directement.",
      },
      {
        title: "Zéro mauvaise surprise",
        description:
          "Échantillons et photos avant validation finale de la commande.",
      },
      {
        title: "Fournisseurs vérifiés",
        description:
          "Chaque usine est visitée et contrôlée avant tout engagement.",
      },
    ],
  },
  {
    slug: "controle-qualite",
    icon: ShieldCheck,
    title: "Vérification & Contrôle Qualité",
    short: "Inspection d'usine et rapport sous 24 h.",
    intro:
      "Nous visitons physiquement les usines et contrôlons la marchandise avant le paiement final, pour supprimer le risque de mauvaise surprise à l'arrivée.",
    paragraphs: [
      "Avant tout engagement, nous vérifions l'existence réelle de l'usine, sa licence commerciale, sa capacité de production réelle et la conformité de ses installations. Beaucoup d'intermédiaires se font passer pour des usines : nous faisons la différence.",
      "Une fois la production lancée, nous réalisons un contrôle qualité complet avant le paiement du solde : vérification des quantités, des finitions, des emballages et du marquage. Un rapport photo et vidéo détaillé vous est envoyé sous 24 heures.",
      "En cas d'écart constaté, nous bloquons le paiement et engageons la discussion avec le fournisseur : correction, remplacement, ou renégociation du prix. Vous restez toujours décideur.",
    ],
    features: [
      "Visite physique de l'usine en Chine",
      "Audit de conformité et vérification des licences",
      "Contrôle qualité complet avant expédition",
      "Rapport photo & vidéo sous 24 heures",
    ],
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=85",
    steps: [
      {
        title: "Vérification de l'usine",
        description:
          "Nous nous rendons sur place et vérifions l'existence réelle du site.",
      },
      {
        title: "Audit de conformité",
        description:
          "Contrôle des licences, capacités et conditions de production.",
      },
      {
        title: "Contrôle qualité",
        description:
          "Inspection complète de la marchandise avant expédition.",
      },
      {
        title: "Rapport sous 24 h",
        description:
          "Photo, vidéo et conclusion détaillée envoyés sous 24 heures.",
      },
    ],
    benefits: [
      {
        title: "Vous voyez avant de payer",
        description:
          "Rapport photo et vidéo avant tout paiement du solde.",
      },
      {
        title: "Fournisseurs réels",
        description:
          "Nous distinguons les usines des simples intermédiaires.",
      },
      {
        title: "Paiement encadré",
        description:
          "Blocage immédiat en cas d'écart constaté sur la marchandise.",
      },
    ],
  },
  {
    slug: "shipping",
    icon: Ship,
    title: "Shipping & Logistique",
    short: "Fret maritime, aérien et dédouanement.",
    intro:
      "Nous coordonnons l'ensemble de vos expéditions internationales, du choix du mode de transport jusqu'à la livraison finale à votre entrepôt.",
    paragraphs: [
      "Selon la nature de votre marchandise, vos volumes et vos délais, nous choisissons le mode de transport le plus adapté : fret maritime en groupage ou conteneur complet, fret aérien express, ou solution mixte.",
      "Nous prenons en charge l'emballage renforcé, la consolidation de vos colis, la documentation d'export, le dédouanement en Chine et à l'arrivée, ainsi que la livraison finale jusqu'à votre porte.",
      "Un seul interlocuteur suit votre dossier de l'usine jusqu'à la remise. Vous recevez des points d'étape à chaque phase du transport et une traçabilité complète.",
    ],
    features: [
      "Fret maritime : groupage et conteneur complet",
      "Fret aérien express",
      "Dédouanement Chine et Afrique",
      "Livraison finale à votre entrepôt",
    ],
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=85",
    steps: [
      {
        title: "Choix du mode",
        description:
          "Maritime ou aérien selon vos volumes, délais et budget.",
      },
      {
        title: "Emballage & consolidation",
        description:
          "Préparation et regroupement de vos colis dans notre entrepôt.",
      },
      {
        title: "Dédouanement",
        description:
          "Prise en charge complète des formalités en Chine et à l'arrivée.",
      },
      {
        title: "Livraison finale",
        description:
          "Acheminement jusqu'à votre entrepôt avec confirmation de réception.",
      },
    ],
    benefits: [
      {
        title: "Fret au meilleur coût",
        description:
          "Choix du mode le plus adapté à votre budget et vos délais.",
      },
      {
        title: "Zéro blocage douanier",
        description:
          "Documents conformes et partenaires agréés sur chaque corridor.",
      },
      {
        title: "Un seul interlocuteur",
        description:
          "Suivi complet de l'usine jusqu'à la livraison finale.",
      },
    ],
  },
  {
    slug: "visa-hotel",
    icon: Plane,
    title: "Assistance Visa & Réservation d'Hôtel",
    short: "Organisation complète de vos déplacements en Chine.",
    intro:
      "Vous souhaitez venir vous-même en Chine rencontrer vos fournisseurs ? Nous organisons votre séjour de A à Z.",
    paragraphs: [
      "Nous prenons en charge votre demande de visa, la constitution du dossier, la lettre d'invitation et le suivi de la procédure. Vous évitez les allers-retours administratifs et les délais inutiles.",
      "Nous réservons votre hôtel, organisons vos déplacements internes et coordonnons les visites d'usines et de marchés. Vous arrivez sans logistique à gérer, nous nous occupons du reste.",
      "Un interprète professionnel peut vous accompagner tout au long du séjour : traduction, négociation, formalisation des engagements. Vous ne perdez aucune opportunité à cause d'une barrière linguistique.",
    ],
    features: [
      "Assistance visa Chine",
      "Réservation hôtel et transport",
      "Interprète professionnel francophone",
      "Accompagnement aux usines et marchés",
    ],
    image:
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1400&q=85",
    steps: [
      {
        title: "Préparation du voyage",
        description:
          "Constitution du dossier de visa et planification du séjour.",
      },
      {
        title: "Réservations",
        description:
          "Hôtel, transport interne et visites d'usines organisées à l'avance.",
      },
      {
        title: "Accompagnement terrain",
        description:
          "Interprète et assistant commercial pendant tout le séjour.",
      },
      {
        title: "Suivi post-visite",
        description:
          "Compte-rendu des visites et suivi des engagements pris.",
      },
    ],
    benefits: [
      {
        title: "Visa simplifié",
        description:
          "Constitution du dossier prise en charge de bout en bout.",
      },
      {
        title: "Séjour organisé",
        description:
          "Hôtel, transport et visites coordonnés à l'avance.",
      },
      {
        title: "Interprète dédié",
        description:
          "Négociations fluides et engagements formalisés par écrit.",
      },
    ],
  },
  {
    slug: "paiement-fournisseur",
    icon: CreditCard,
    title: "Paiement Fournisseur",
    short: "Transferts sécurisés vers la Chine.",
    intro:
      "Nous sécurisons le règlement de vos factures fournisseurs en Chine et à l'international, de la vérification du compte jusqu'à la traçabilité complète.",
    paragraphs: [
      "Chaque compte bénéficiaire est vérifié avant tout transfert : cohérence entre l'entité juridique, le compte bancaire et la facture. C'est la première protection contre les fraudes classiques de faux RIB.",
      "Nous vérifions la conformité documentaire de chaque facture : facture commerciale, packing list, contrats, certifications éventuelles. Aucun paiement n'est engagé sans dossier complet.",
      "Nous encadrons le versement de l'acompte et du solde, avec traçabilité complète : vous savez à tout moment où se trouve votre argent et à quelle étape correspond chaque versement.",
    ],
    features: [
      "Vérification du compte bénéficiaire",
      "Transfert sécurisé de fonds",
      "Conformité documentaire",
      "Acompte et solde encadrés",
    ],
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=85",
    steps: [
      {
        title: "Vérification du bénéficiaire",
        description:
          "Contrôle du compte et de l'entité juridique du fournisseur.",
      },
      {
        title: "Contrôle documentaire",
        description:
          "Vérification des factures, contrats et certifications.",
      },
      {
        title: "Transfert encadré",
        description:
          "Exécution sécurisée de l'acompte puis du solde.",
      },
      {
        title: "Traçabilité",
        description:
          "Suivi complet et preuve de paiement à chaque étape.",
      },
    ],
    benefits: [
      {
        title: "Zéro fraude RIB",
        description:
          "Chaque compte bénéficiaire vérifié avant transfert.",
      },
      {
        title: "Conformité totale",
        description:
          "Documents contrôlés, aucune zone d'ombre sur le paiement.",
      },
      {
        title: "Traçabilité",
        description:
          "Preuve de paiement et historique complet pour chaque versement.",
      },
    ],
  },
];