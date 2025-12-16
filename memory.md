# Contexte du Projet : Migration Storytelling (PHP/Twig vers Next.js SSG)

## 📅 Date : 15 Décembre 2025

## 🎯 Objectif
Remplacer un ancien workflow basé sur PHP/Twig par une stack moderne **React / Next.js** pour créer des pages de storytelling "One Page".
- **Contrainte principale** : Le SEO (Google Discover, réseaux sociaux) doit être impeccable.
- **Contrainte de déploiement** : Les pages sont hébergées dans des sous-dossiers variés sur un serveur FTP (ex: `storytelling.blick.ch/fr/_sandbox/lausanne2/`).

## 🛠️ Stack Technique
- **Framework** : Next.js 16 (App Router)
- **Mode** : Static Site Generation (SSG) via `output: 'export'`
- **Langage** : TypeScript
- **Styles** : Tailwind CSS v4

## 💡 Décisions Importantes

### 1. Configuration SSG & Chemins Relatifs
Pour que le site fonctionne quel que soit le sous-dossier où il est déployé ("path agnostic"), nous avons configuré `next.config.ts` spécifiquement :

```typescript
const nextConfig: NextConfig = {
  output: "export", // Génère des fichiers statiques html/css/js
  
  // CRITIQUE : Permet aux assets (JS/CSS) d'être chargés en relatif (./_next/...)
  // Cela évite les erreurs 404 quand le site n'est pas à la racine du domaine.
  assetPrefix: process.env.NODE_ENV === "production" ? "." : undefined,
  
  images: {
    unoptimized: true, // Désactivé car pas de serveur Node pour redimensionner
  },
};
```

### 2. Gestion du SEO (Metadata)
Tout le SEO est géré dans `src/app/page.tsx` via l'objet `metadata`.
On y définit manuellement les infos cruciales pour chaque story :
- Titre & Description
- Images OpenGraph (Facebook/LinkedIn) & Twitter Cards
- URL Canonique
- Scripts tiers (OneTrust, GTM) sont gérés dans `src/app/layout.tsx`.

### 3. Scripts Tiers
- **Google Tag Manager** : Intégré via le composant `@next/third-parties/google` dans `layout.tsx`.
- **OneTrust** : Intégré via `next/script` dans `layout.tsx`.

## 📂 Structure du projet pour l'éditeur

| Fichier | Rôle |
|---------|------|
| `src/app/page.tsx` | **Contenu principal**. C'est ici qu'on édite le texte, les images de la story ET les balises SEO (titre, og:image). |
| `src/app/layout.tsx` | **Coquille**. Contient `<head>`, les polices (Poppins), et les scripts analytiques. À ne pas toucher souvent. |
| `src/app/globals.css` | **Styles globaux**. |
| `next.config.ts` | **Config Build**. Touche pas à ça p'tit con (sauf si tu sais ce que tu fais). |

## 🚀 Commandes
- Dev : `npm run dev`
- Build : `npm run build` (Le résultat est dans le dossier `out/`, prêt à être uploadé via FTP).
