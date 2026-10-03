# ODA Sources — Pack logo & guide d'intégration Next.js

Ce guide explique **chaque fichier du pack**, **où le placer dans le projet Next.js**, et **où il est référencé dans le code**.
Il est écrit pour être lu par toi *et* par une IA (DeepSeek) : un prompt prêt à coller se trouve en section 8.

---

## 1. Identité visuelle

| Élément | Valeur |
|---|---|
| Bleu marine (principal) | `#01215B` |
| Rouge (accent) | `#BF0808` |
| Fond du site | Blanc `#FFFFFF` (pas de thème sombre) |
| Nature du logo | Lettrage vectorisé (SVG). Aucune police à installer. |
| Format source | Le logo a été vectorisé à partir de ton image d'origine (`source/logo-original.jpg`). |

Utilisation recommandée dans Tailwind (`tailwind.config` ou `@theme` selon ta version) :
`brand-navy = #01215B`, `brand-red = #BF0808`.

---

## 2. Installation rapide (3 étapes)

Depuis la **racine du projet Next.js** (là où se trouve `package.json`), avec le dossier du pack dézippé à côté :

```bash
# 1) Copier tous les assets publics
cp -r oda-sources-brand-pack/public/* ./public/

# 2) ⚠ SUPPRIMER le favicon par défaut de Next.js (sinon conflit avec /public/favicon.ico)
rm -f src/app/favicon.ico app/favicon.ico

# 3) Copier le composant logo
mkdir -p src/components && cp oda-sources-brand-pack/snippets/Logo.tsx src/components/Logo.tsx
```

Ensuite **fusionner** `snippets/layout.tsx` dans `src/app/layout.tsx` (voir section 5) et remplacer l'URL du site.

> Le projet n'utilise pas de dossier `src/` ? Remplace `src/app` par `app` et `src/components` par `components`.

---

## 3. Arborescence finale dans le projet

```
mon-projet/
├─ public/
│  ├─ favicon.ico                    ← onglet navigateur (16/32/48 px dans un seul fichier)
│  ├─ favicon.svg                    ← onglet navigateur moderne (vectoriel)
│  ├─ favicon-16x16.png
│  ├─ favicon-32x32.png
│  ├─ favicon-48x48.png
│  ├─ apple-touch-icon.png           ← icône iPhone/iPad (écran d'accueil) 180×180
│  ├─ safari-pinned-tab.svg          ← onglet épinglé Safari (monochrome)
│  ├─ mstile-150x150.png             ← tuile Windows (optionnel)
│  ├─ browserconfig.xml              ← config tuile Windows (optionnel)
│  ├─ manifest.webmanifest           ← PWA : nom, couleurs, liste des icônes
│  ├─ icons/                         ← icônes PWA / Android
│  │  ├─ icon-72|96|128|144|152|192|384|512.png
│  │  └─ icon-maskable-192.png, icon-maskable-512.png
│  ├─ og/                            ← images de partage réseaux sociaux
│  │  ├─ og-image.png                (1200×630)
│  │  ├─ twitter-image.png           (1200×600)
│  │  └─ og-square-1200.png          (1200×1200)
│  ├─ social/                        ← photos de profil
│  │  ├─ avatar-1024.png
│  │  └─ avatar-round-1024.png
│  └─ brand/
│     ├─ logo/                       ← logos complets (SVG + PNG)
│     ├─ navbar/                     ← logos prêts pour la barre de navigation
│     └─ mark/                       ← icône carrée « ODA »
├─ src/
│  ├─ app/layout.tsx                 ← métadonnées (favicons, PWA, partage)
│  └─ components/Logo.tsx            ← composant logo réutilisable
```

---

## 4. Rôle de chaque fichier

### 4.1 Logos complets — `public/brand/logo/`

| Fichier | Usage | Fond |
|---|---|---|
| `logo-full.svg` | **Version maître**, vectorielle, couleurs d'origine. À privilégier partout où le SVG est accepté (impression, signature, etc.). | Transparent |
| `logo-full-3840.png` | Très haute définition (grands panneaux, bannières, export). | Transparent |
| `logo-full-1920.png` | Usage web haute définition (hero, footer, page « À propos »). | Transparent |
| `logo-full-960.png` | Usage web standard, JSON-LD / SEO. | Transparent |
| `logo-full-480.png` | Petits emplacements, miniatures. | Transparent |
| `logo-full-1920-white-bg.png` | Emails, Word/PDF, WhatsApp Business, plateformes qui n'acceptent pas la transparence. | **Blanc** |
| `logo-wordmark.svg` / `logo-wordmark-960.png` / `-1920.png` | « ODA SOURCES » **sans** « IMPORT & EXPORT ». Pour les petits espaces où la baseline serait illisible. | Transparent |
| `logo-mono-navy.svg` / `-960.png` / `-1920.png` | Tout en bleu marine (tampons, factures noir & blanc, filigrane). | Transparent |
| `logo-white.svg` / `-960.png` / `-1920.png` | Tout en blanc, pour **fonds foncés ou photos** (footer sombre, bannière bleue). | Transparent |
| `logo-wordmark-white.svg` / `-1920.png` | Version blanche sans baseline. | Transparent |

### 4.2 Barre de navigation — `public/brand/navbar/`

| Fichier | Taille | Usage |
|---|---|---|
| `logo-navbar.png` / `@2x` / `@3x` | 365×64 / 730×128 / 1095×192 | Navbar avec la baseline (écrans larges). `@2x`/`@3x` = écrans Retina. |
| `logo-navbar-compact.png` / `@2x` / `@3x` | 331×40 / 662×80 / 994×120 | Navbar **sans** baseline (barre fine, tablette). |
| `logo-navbar.svg`, `logo-navbar-compact.svg` | vectoriel | Alternative SVG (avec `<img>` simple). |

Le composant `Logo.tsx` choisit déjà le bon fichier (`variant="navbar"` ou `"compact"`).

### 4.3 Icône carrée « ODA » — `public/brand/mark/`

| Fichier | Usage |
|---|---|
| `logo-mark.svg` | Icône carrée à coins arrondis (fond bleu, « ODA » blanc, trait rouge). |
| `logo-mark-256.png`, `logo-mark-1024.png` | Version PNG : navbar mobile (`variant="mark"`), avatar, vignettes. |
| `logo-mark-fullbleed.svg` | Version plein cadre sans coins arrondis (base des icônes maskable / avatar). |

### 4.4 Favicons — racine de `public/`

| Fichier | Taille | Rôle |
|---|---|---|
| `favicon.ico` | 16+32+48 | Compatibilité universelle (anciens navigateurs, `/favicon.ico` demandé automatiquement). |
| `favicon.svg` | vectoriel | Onglets Chrome/Firefox/Edge modernes, très net. |
| `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png` | 16/32/48 | Onglets, favoris, résultats de recherche Google (48 px). |
| `apple-touch-icon.png` | 180×180 | iPhone/iPad « Ajouter à l'écran d'accueil ». Fond plein (iOS arrondit lui-même). |
| `safari-pinned-tab.svg` | vectoriel | Onglets épinglés Safari macOS (monochrome, couleur donnée dans le layout). |
| `mstile-150x150.png` + `browserconfig.xml` | 150×150 | Tuile Windows épinglée (legacy, optionnel). |

### 4.5 PWA — `public/icons/` et `public/manifest.webmanifest`

| Fichier | Rôle |
|---|---|
| `icon-72` … `icon-512.png` | Icônes « any » (coins arrondis) listées dans le manifest. |
| `icon-maskable-192.png`, `icon-maskable-512.png` | Icônes **maskable** : plein cadre, logo dans la zone de sécurité de 80 %. Android les découpe en cercle/carré/goutte selon le téléphone. |
| `manifest.webmanifest` | Déclare le nom (`ODA Sources`), `theme_color #01215B`, `background_color #FFFFFF`, `display: standalone` et toutes les icônes. |

### 4.6 Partage réseaux sociaux — `public/og/` et `public/social/`

| Fichier | Taille | Rôle |
|---|---|---|
| `og/og-image.png` | 1200×630 | Aperçu du lien sur **Facebook, WhatsApp, LinkedIn, Telegram, Slack**… (balise `og:image`). |
| `og/twitter-image.png` | 1200×600 | Aperçu sur **X/Twitter** (`summary_large_image`). |
| `og/og-square-1200.png` | 1200×1200 | Version carrée de secours (certaines apps, partages manuels). |
| `social/avatar-1024.png` | 1024×1024 | Photo de profil carrée (WhatsApp Business, LinkedIn, Facebook, Instagram). Les plateformes la recadrent en cercle : le logo reste centré. |
| `social/avatar-round-1024.png` | 1024×1024 | Même avatar avec coins totalement arrondis (aperçu / usage où le rond est déjà appliqué). |

---

## 5. Où chaque fichier est référencé dans le code

| Fichier de code | Ce qu'il y a à faire | Fichiers du pack concernés |
|---|---|---|
| `src/app/layout.tsx` | Fusionner `snippets/layout.tsx` : `metadata.icons`, `metadata.manifest`, `openGraph`, `twitter`, `viewport.themeColor`, JSON-LD. **Remplacer `SITE_URL`** par le vrai domaine. | `favicon.*`, `apple-touch-icon.png`, `safari-pinned-tab.svg`, `manifest.webmanifest`, `og/*`, `browserconfig.xml`, `brand/logo/logo-full-960.png` |
| `src/components/Logo.tsx` | Copier tel quel depuis `snippets/Logo.tsx`. | `brand/navbar/*`, `brand/logo/*`, `brand/mark/*` |
| Composant Navbar / Header | Importer `<Logo variant="navbar" priority />` (et `variant="mark"` sur mobile). | `brand/navbar/logo-navbar@3x.png`, `brand/mark/logo-mark-256.png` |
| Composant Footer | `<Logo variant="full" />` (fond blanc) ou `<Logo variant="white" />` (fond foncé). | `brand/logo/logo-full-1920.png` / `logo-white-1920.png` |
| `public/manifest.webmanifest` | Déjà prêt. Les chemins `/icons/...` doivent rester tels quels. | `icons/*` |
| `.env.local` | Ajouter `NEXT_PUBLIC_SITE_URL=https://ton-domaine.com` | — |
| `src/app/favicon.ico` | **À SUPPRIMER** (fichier par défaut de Next, conflit avec `public/favicon.ico`). | — |

Chemins publics (côté navigateur) : un fichier `public/og/og-image.png` s'appelle **`/og/og-image.png`** dans le code (sans `public`).

### Si le projet utilise le Pages Router (`pages/`)
Pas de `layout.tsx` : place le contenu de `<head>` dans `pages/_document.tsx` ou `pages/_app.tsx` (via `next/head`) :

```tsx
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#01215B" />
<link rel="manifest" href="/manifest.webmanifest" />
<meta name="theme-color" content="#01215B" />
<meta property="og:image" content="https://TON-DOMAINE/og/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://TON-DOMAINE/og/twitter-image.png" />
```

---

## 6. Vérifications après intégration

1. `npm run dev`, puis ouvre `http://localhost:3000/favicon.ico`, `/manifest.webmanifest`, `/og/og-image.png` : chaque URL doit afficher le fichier (pas de 404).
2. Chrome → F12 → onglet **Application → Manifest** : les 10 icônes doivent apparaître, sans erreur, avec « maskable » détecté.
3. Onglet du navigateur : l'icône « ODA » bleue s'affiche. Si l'ancienne icône reste, vide le cache ou ouvre en navigation privée (les navigateurs gardent les favicons très longtemps).
4. Après déploiement (HTTPS), teste le partage du lien dans WhatsApp / Facebook / LinkedIn. **WhatsApp et Facebook mettent l'aperçu en cache** : si tu changes l'image plus tard, renomme le fichier (ex. `og-image-v2.png`) ou utilise l'outil de débogage de Facebook pour rafraîchir.
5. Sur Android Chrome : menu ⋮ → « Installer l'application » / « Ajouter à l'écran d'accueil » : l'icône maskable doit être découpée proprement.

**À savoir** : le manifest permet l'installation « écran d'accueil » (en HTTPS). Le **mode hors-ligne** demande en plus un service worker, non inclus dans ce pack.

---

## 7. Règles d'utilisation du logo

- Toujours garder une marge autour du logo au moins égale à la hauteur de la lettre « O ».
- Sur fond blanc : version couleur. Sur fond foncé / photo : version blanche. Impression monochrome : version bleu marine.
- Ne pas étirer, ne pas changer les couleurs, ne pas ajouter d'ombre.
- Taille minimale conseillée de la version complète (avec baseline) : **160 px de large**. En dessous, utiliser `logo-wordmark` ou l'icône carrée.

---

## 8. Prompt prêt à coller à DeepSeek

> Je te fournis un pack de logos pour mon projet Next.js (App Router). Lis `GUIDE-LOGO.md`, puis exécute exactement ceci :
> 1. Copie le contenu du dossier `public/` du pack dans le dossier `public/` du projet.
> 2. Supprime le favicon par défaut `src/app/favicon.ico` (ou `app/favicon.ico`) qui entre en conflit avec `public/favicon.ico`.
> 3. Copie `snippets/Logo.tsx` vers `src/components/Logo.tsx`.
> 4. Fusionne `snippets/layout.tsx` dans `src/app/layout.tsx` sans casser mes polices, mon `globals.css` ni mes providers existants. Garde `metadata.icons`, `manifest`, `openGraph`, `twitter`, `viewport` et le JSON-LD. Remplace `SITE_URL` par la valeur de `NEXT_PUBLIC_SITE_URL` (ajoute-la dans `.env.local` et `.env.example`).
> 5. Dans ma Navbar, remplace le logo/texte actuel par `<Logo variant="navbar" priority />` sur écran ≥ `sm` et `<Logo variant="mark" width={40} priority />` sur mobile. Dans le Footer, utilise `<Logo variant="full" />` (fond blanc).
> 6. Ne modifie aucun fichier image. Les chemins publics commencent par `/` (ex. `/og/og-image.png`).
> 7. Lance `npm run build` et corrige les erreurs éventuelles, puis vérifie que `/favicon.ico`, `/manifest.webmanifest` et `/og/og-image.png` répondent en 200.
