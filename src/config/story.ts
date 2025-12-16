// ---------------------------------------------------------------------------
// 📝 CONFIGURATION DE LA STORY
// C'est le SEUL fichier à modifier pour configurer une nouvelle story.
// ---------------------------------------------------------------------------

export const STORY = {
  // Infos générales
  title: "Le titre de mon format ici",
  description: "La description de mon format web viendra s'afficher ici. Etes-vous prêts pour cet événement?",
  author: "Camille Krafft",
  publicationDate: "2025-12-15", // Format YYYY-MM-DD (utile pour Schema.org)
  
  // URLs
  // L'URL finale où sera hébergé le projet (Important pour le SEO Facebook/Twitter)
  url: "https://storytelling.blick.ch/fr/_sandbox/lausanne2/",
  
  // Nom de l'image dans le dossier 'public' (ex: "social.jpg")
  socialImageFilename: "social.jpg", 
  
  // Esthétique
  themeColor: "#ff0000", // Couleur de la barre au dessus du navigateur (mobile)
  
  // Technique (ne touchez pas si vous n'avez pas besoin)
  siteName: "Blick.ch/fr",
  twitterHandle: "@Blick_fr",
  faviconBaseUrl: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon",
};

// Helper calculé automatiquement (ne pas toucher)
export const ABSOLUTE_SOCIAL_URL = `${STORY.url.replace(/\/$/, "")}/${STORY.socialImageFilename}`;
