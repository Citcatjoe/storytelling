// ---------------------------------------------------------------------------
// 📝 CONFIGURATION DE LA STORY
// C'est le SEUL fichier à modifier pour configurer une nouvelle story.
// ---------------------------------------------------------------------------

export const STORY = {
  // Infos générales
  title: "Comment Orlatti met la main sur les parcelles réservées aux agriculteurs",
  titleDisplay: "Comment Orlatti met la main<br>sur les parcelles réservées<br>aux agriculteurs",
  description: "La description de mon format web viendra s'afficher ici. Etes-vous prêts pour cet événement?",
  author: "Camille Krafft",
  publicationDate: "2025-12-15", // Format YYYY-MM-DD (utile pour Schema.org)
  publicationDisplayDate: "12 novembre 2025",
  
  // URLs
  // L'URL finale où sera hébergé le projet (Important pour le SEO Facebook/Twitter)
  url: "https://storytelling.blick.ch/fr/_sandbox/lausanne2/",
  
  // Nom de l'image dans le dossier 'public' (ex: "social.jpg")
  socialImageFilename: "social.jpg", 
  
  // Crédits de fin d'article
  credits: [
    { name: "Blick Suisse romande", produces: "Production" },
    { name: "Camille Krafft", person: true, job: "Journaliste Blick", produces: "Texte", img: "camille-krafft.jpg", link: "https://www.blick.ch/fr/auteurs/camille-krafft-journaliste-blick-id20560911.html" },
    { name: "Julie de Tribolet", person: true, job: "Photographe", produces: "Images", img: "julie-de-tribolet.jpg" },
    { name: "César Greppin", person: true, job: "Développement", produces: "Développement", img: "cesar-greppin.jpg" }
  ],

  // Esthétique
  themeColor: "#ff0000", // Couleur de la barre au dessus du navigateur (mobile)
  logoColor: "#000000", // Couleur du logo Blick dans le header
  
  // Technique (ne touchez pas si vous n'avez pas besoin)
  siteName: "Blick.ch/fr",
  twitterHandle: "@Blick_fr",
  faviconBaseUrl: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon",
};

// Helper calculé automatiquement (ne pas toucher)
export const ABSOLUTE_SOCIAL_URL = `${STORY.url.replace(/\/$/, "")}/${STORY.socialImageFilename}`;
