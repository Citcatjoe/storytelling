# Contexte du Projet : Migration Storytelling (PHP/Twig vers Next.js SSG)

## 📅 Date : Avril 2026

## 🎯 Objectif
Remplacer un ancien workflow basé sur PHP/Twig par une stack moderne **React / Next.js** pour créer des pages de storytelling "One Page".
- **Contrainte principale** : Le SEO (Google Discover, réseaux sociaux) doit être impeccable.
- **Contrainte de déploiement** : Les pages sont hébergées dans des sous-dossiers variés sur un serveur FTP (ex: `storytelling.blick.ch/fr/_sandbox/lausanne2/`).

## 🛠️ Stack Technique
- **Framework** : Next.js 16 (App Router)
- **Mode** : Static Site Generation (SSG) via `output: 'export'`
- **Langage** : TypeScript
- **Styles** : Tailwind CSS v4

---

## 💡 Décisions Importantes (Carcasse du projet)

### 1. Configuration SSG & Chemins Relatifs (Déploiement)
Pour que le site fonctionne quel que soit le sous-dossier FTP où il est déployé ("path agnostic"), nous avons configuré `next.config.ts` avec :
```typescript
{
  output: "export",
  assetPrefix: process.env.NODE_ENV === "production" ? "." : undefined,
  images: { unoptimized: true }, // Désactivé car pas d'UI backend Server-side
}
```

### 2. Variables du projet (`src/config/story.ts`)
Pour être réutilisable projet après projet, les métadonnées de l'article ne sont plus inscrites en dur, mais gérées dans un seul fichier : **`story.ts`**.
Ce fichier contient :
- Les URLs dynamiques, Titres, Descriptions, et Noms d'auteurs.
- Les **Crédits** de fin d'page (un tableau itéré).
La page s'alimente directement via cet export pour construire le contenu dynamique et les balises SEO.

### 3. Gestion SEO & Metas
Tout le SEO exploite l'API Native `metadata` de Next.js (dans `page.tsx`).
- Historique & Référence : Pour traduire les anciens templates Twig, nous gardons un dictionnaire comparatif dans `src/config/metaSnippet.ts`.
- Dark Mode : Désactivé au niveau global du projet (`globals.css`) forçant un fond strict blanc et texte noir pour que l'apparence des formats longs reste prévisible sur tous les systèmes, avec l'utilisation de la typographie globale *Poppins*.

### 4. La Navigation Interactive (Header & Partage)
- **Header "Headroom" sur-mesure (`src/components/Header.tsx`)** : Plutôt qu'utiliser une libraire externe encombrante, un hook natif React gère le header classiquement "fixe au scroll up" mais masqué au "scroll down" au-delà d'un delta de sécurité (100px).
- **Menu Partage (Slide Over)** : Toujours dans ce composant Header, un panneau interactif de bout en bout qui défile de la droite (100% de la hauteur), couplant un overlay ombré entre le header et le contenu principal (`z-index` configuré rigoureusement).

### 5. Scripts Tiers Modularisés
Pour un `layout.tsx` irréprochable et épuré, chaque comportement externe complexe a été encapsulé dans son propre module composant de la coquille :
- **Consentement (OneTrust)** : Isolable et placé dans `src/components/scripts/Consent.tsx` (se charge en `beforeInteractive`).
- **Google Tag Manager** : Remplacé par l'interface ultra-optimisée `<GoogleTagManager>` de Next.js. Externeisé dans `src/components/scripts/GTM.tsx` (gère la balise script *ET* noscript instantanément).

### 6. Système de Layout et Breakouts (Style Editorial)
Pour un rendu haut de gamme type "long-read", nous utilisons un système de débordement contrôlé, centralisé dans **`src/config/layout.ts`**.

- **Source de Vérité** : Toute modification des marges ou des largeurs de conteneurs (`med`, `high`) doit se faire dans `layout.ts`.
- **Alignement Synchronisé** : Les modes `med` (Galleries intermédiaires, HighlightBlock, ChapterHeader) et `high` (Galleries Hero Edge) **doivent partager les mêmes valeurs** sur les breakpoints `md` et `lg` pour garantir que tous les éléments de la page restent alignés verticalement.
- **Breakouts types** : 
  - `med` : Largeur modérée (environ 840px à 968px), utilisée pour les respirations éditoriales.
  - `high` : Largeur maximale (jusqu'à 1536px), utilisée pour les photos d'impact.
- **Composants liés** : `Gallery.tsx`, `HighlightBlock.tsx`, `ChapterHeader.tsx`. Ces composants importent tous les constantes `BREAKOUTS` de la config.


---

## 📂 Structure du projet pour l'éditeur

| Fichier / Dossier | Rôle |
|---------|------|
| `src/config/story.ts` | **Variables du Projet**. Éditez ceci pour changer d'article (SEO, date, crédits). |
| `src/config/layout.ts` | **Système de Grille**. Centralise les valeurs des breakouts (`med`, `high`) pour l'alignement global. |
| `src/data/` | **Données Statiques**. Contient les fichiers JSON (ex: `data.json`) servant de source aux infographies et composants interactifs. |
| `src/app/page.tsx` | **Contenu principal**. Balisage de l'histoire, des embeds de l'article et rendu dynamique des crédits et de `STORY`. |
| `src/components/SideBlock.tsx` | **Débordement flottant**. Conteneur pour placer du contenu sur les bords du texte. |
| `src/components/Gallery.tsx` | **Grilles d'images**. Gère 1 à 3 images avec breakout automatique. |
| `src/components/HighlightBlock.tsx` | **Bloc de mise en avant**. Zone colorée avec texte aligné sur le mode `med`. |
| `src/components/ChapterHeader.tsx` | **Titre de Chapitre**. Split layout (50/50) aligné sur le mode `med`. |
| `src/app/layout.tsx` | **Coquille de l'application**. Gère l'encapsulation de l'app sur le DOM HTML, import de la typo *Poppins* et des scripts analytiques via le dossier `scripts/`. |
| `src/components/Header.tsx` | Le code de la barre de navigation UI supérieure et du panneau latéral de partage. |
| `src/components/scripts/`| Regroupement des injections externes propres (`GTM.tsx`, `Consent.tsx`). |
| `src/app/globals.css` | **Styles globaux Tailwind**. |

## 🚀 Commandes
- Dev : `npm run dev`
- Build : `npm run build` (Le résultat est dans le dossier `out/`, prêt à être uploadé via FTP).

---

## 🗺️ Visualisation Cartographique (Mapbox)
- **Token Mapbox** : `pk.eyJ1IjoiY3JlYXRpdmVsYWJibGlja2ZyIiwiYSI6ImNsZDRjbTM5bjByM3Mzb2wwYXBzN3B3MDYifQ.H5aWzNdSibf-Vd4rPmwhYA`
- **Source Frontières Vaud** (GeoJSON) : `https://raw.githubusercontent.com/hyperknot/country-levels-export/master/geojson/high/iso2/CH/CH-VD.geojson`
- **Configuration Dotted Border** : 
  - `line-cap : round`
  - `line-dasharray : [0.1, 3]`
  - `line-width : 1.5`
- **Animation** : Transition fluide via `fill-opacity-transition` et `line-opacity-transition` (1500ms) déclenchée lors du zoom.
