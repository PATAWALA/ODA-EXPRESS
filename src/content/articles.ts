export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  keyPoints?: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "importer-chine-2026",
    title: "Importer de Chine en 2026 : ce qui change pour l'Afrique",
    excerpt:
      "Nouvelles routes maritimes, délais réduits et solutions de dédouanement simplifiées : ce qu'il faut savoir cette année.",
    category: "Guide",
    date: "15 janvier 2026",
    readTime: "5 min",
    author: "DA Olivier",
    image:
      "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1400&q=85",
    keyPoints: [
      "Délais moyens réduits de 5 à 7 jours sur le corridor Chine — Afrique de l'Ouest",
      "Nouvelles procédures de dédouanement simplifiées dans plusieurs pays",
      "Hausse des capacités de groupage maritime au départ de Nansha (Guangzhou)",
      "Recommandation : anticiper ses commandes avant les périodes de pointe",
    ],
    content: [
      "L'année 2026 marque un tournant pour les importateurs africains qui s'approvisionnent en Chine. Plusieurs changements structurels transforment la manière dont les marchandises circulent entre Guangzhou, Yiwu, Foshan et les grands ports d'Afrique de l'Ouest et centrale.",
      "Premier changement notable : l'augmentation des capacités de groupage maritime au départ du port de Nansha, à Guangzhou. Les armateurs ont renforcé leurs fréquences vers Douala, Abidjan, Lomé et Pointe-Noire. Cela signifie plus de départs disponibles par mois, donc des délais raccourcis pour les expéditions en groupage.",
      "Deuxième changement : plusieurs pays africains ont simplifié leur procédure de dédouanement, avec la mise en place de guichets uniques numériques. Pour l'importateur, cela se traduit par moins de documents papier et un passage plus rapide en douane — à condition que la documentation fournie soit complète et conforme dès le départ.",
      "Troisième changement, plus discret mais important : la hausse du coût du carburant maritime a légèrement augmenté les tarifs au CBM. Les écarts restent modérés, mais anticiper ses commandes permet de sécuriser les meilleurs tarifs.",
      "En résumé, 2026 est une année favorable pour importer de Chine, à condition de travailler avec un partenaire présent sur place, capable de vérifier les fournisseurs, de consolider les colis et de gérer la documentation d'export.",
    ],
  },
  {
    slug: "verifier-fournisseur-chinois",
    title: "Comment vérifier un fournisseur chinois avant de payer",
    excerpt:
      "5 signes qui distinguent une vraie usine d'un intermédiaire. Notre méthode d'inspection sur place.",
    category: "Conseils",
    date: "8 janvier 2026",
    readTime: "6 min",
    author: "DA Olivier",
    image:
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1400&q=85",
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
    ],
  },
  {
    slug: "groupage-maritime-optimiser",
    title: "Groupage maritime : optimiser ses coûts quand on débute",
    excerpt:
      "Vous n'avez pas besoin de remplir un conteneur entier pour importer. Voici comment fonctionne le groupage.",
    category: "Logistique",
    date: "2 janvier 2026",
    readTime: "5 min",
    author: "DA Olivier",
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1400&q=85",
    keyPoints: [
      "Le groupage permet d'expédier à partir d'1 CBM seulement",
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
    ],
  },
  {
    slug: "visiter-usines-chine",
    title: "Préparer son premier voyage d'affaires en Chine",
    excerpt:
      "Visa, hôtel, déplacements, interprète : le guide complet pour un séjour productif à Guangzhou ou Yiwu.",
    category: "Guide",
    date: "18 décembre 2025",
    readTime: "7 min",
    author: "DA Olivier",
    image:
      "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1400&q=85",
    keyPoints: [
      "Demander le visa au moins 4 semaines avant le départ",
      "Choisir un hôtel proche des zones d'usines",
      "Prévoir un interprète pour les négociations",
      "Bloquer 2 jours de visite par fournisseur sérieux",
    ],
    content: [
      "Vous avez décidé de venir vous-même en Chine pour rencontrer vos fournisseurs ? Excellente décision. Rien ne remplace une visite sur place pour juger de la réalité d'une usine, de sa capacité et de sa rigueur.",
      "Première étape : le visa. Comptez au moins 4 semaines entre la demande et l'obtention. Préparez votre lettre d'invitation, votre itinéraire, vos réservations d'hôtel et vos justificatifs financiers. Nous pouvons vous accompagner sur la partie invitation si vous passez par nos services.",
      "Deuxième étape : le choix de l'hôtel. À Guangzhou, privilégiez un hôtel proche du métro ou de la zone de votre fournisseur. À Yiwu, la ville est compacte et la plupart des marchés sont accessibles en taxi en moins de 20 minutes.",
      "Troisième étape : l'organisation des visites. Ne prévoyez pas plus de deux visites d'usines par jour. Chaque visite sérieuse demande au moins 2 heures : présentation, atelier, questions techniques, négociation. Enchaîner 4 visites dans une journée donne un résultat médiocre.",
      "Quatrième étape : l'interprète. Si vous ne parlez pas chinois, c'est indispensable. Un interprète professionnel ne se contente pas de traduire : il vous aide à négocier, à détecter les non-dits, et à formaliser les engagements par écrit.",
      "Enfin, prévoyez du temps pour les marchés physiques. Guangzhou et Yiwu concentrent des dizaines de milliers de stands. Vous n'y trouverez pas forcément le meilleur prix, mais vous y verrez des produits, des emballages, des tendances — des informations précieuses que vous ne trouverez pas en ligne.",
    ],
  },
  {
    slug: "controle-qualite-avant-expedition",
    title: "Contrôle qualité avant expédition : pourquoi c'est non négociable",
    excerpt:
      "Un colis expédié sans contrôle, c'est un risque à 100 %. Voici comment nous sécurisons chaque commande.",
    category: "Conseils",
    date: "10 décembre 2025",
    readTime: "4 min",
    author: "DA Olivier",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1400&q=85",
    keyPoints: [
      "Un contrôle coûte moins cher qu'un retour de marchandise",
      "Inspecter avant le paiement du solde, jamais après",
      "Rapport photo et vidéo systématique",
      "Bloquer le paiement en cas d'écart constaté",
    ],
    content: [
      "Quand vous commandez en Chine, deux moments déterminent la réussite de votre projet : la qualité de la production, et la conformité de la marchandise expédiée. Si vous ne contrôlez pas, vous acceptez le risque.",
      "Un contrôle qualité coûte en moyenne moins de 1 % du montant de la commande. Un retour de marchandise, lui, coûte souvent plus que la marchandise elle-même : fret retour, droits de douane perdus, rupture de stock, clients mécontents.",
      "La règle d'or : contrôlez avant de payer le solde. Une fois que vous avez payé l'intégralité, votre pouvoir de négociation disparaît. Le fournisseur n'a plus aucune raison de corriger un écart, et vous n'avez aucun recours pratique à distance.",
      "Chez ODA SOURCES, chaque contrôle donne lieu à un rapport photo et vidéo détaillé, envoyé sous 24 heures. Vous voyez la marchandise réelle, vous jugez par vous-même, et vous validez — ou vous refusez.",
      "En cas d'écart constaté, nous bloquons le paiement et engageons la discussion avec le fournisseur : correction, remplacement, ou renégociation du prix. Vous restez toujours décideur.",
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, count = 3): Article[] {
  return ARTICLES.filter((a) => a.slug !== slug).slice(0, count);
}