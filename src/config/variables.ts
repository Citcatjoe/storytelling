// ---------------------------------------------------------------------------
// 📝 CONFIGURATION DE LA STORY
// C'est le SEUL fichier à modifier pour configurer une nouvelle story.
// ---------------------------------------------------------------------------

export const STORY = {
  // Infos générales
  title: "Business de l’ombre: comment le groupe Orllati accapare des terres agricoles ",
  titleDisplay: "Business de l’ombre:<br>comment le groupe Orllati<br>accapare des terres agricoles ",
  description: "Via des sociétés agricoles, le groupe de construction Orllati acquiert des parcelles normalement réservées aux paysans. Enquête sur un business de l'ombre",
  author: "Camille Krafft",
  publicationDate: "2026-06-26", // Format YYYY-MM-DD (utile pour Schema.org)
  publicationDisplayDate: "26 juin 2026",
  
  // URLs
  // L'URL finale où sera hébergé le projet (Important pour le SEO Facebook/Twitter)
  url: "https://storytelling.blick.ch/fr/2026/orllati-accaparement-terres-agricoles/",
  
  // Nom de l'image dans le dossier 'public' (ex: "social.jpg")
  socialImageFilename: "images/social.jpg", 
  
  // Crédits de fin d'article
  credits: [
    { name: "Blick Suisse romande", produces: "Production", inCredits: true },
    { name: "Camille Krafft", isAuthor: true, inCredits: true, job: "Journaliste Blick", produces: "Enquête", img: "camille-krafft.jpg", link: "https://www.blick.ch/fr/auteurs/camille-krafft-journaliste-blick-id20560911.html" },
    { name: "Antoine Harari", isAuthor: true, inCredits: true, job: "Journaliste indépendant", produces: "Enquête", img: "antoine-harari.jpg" },
    { name: "Julie Body", isAuthor: false, inCredits: true, job: "Ai creative director", produces: "Visuels", img: "julie-body.jpg" },
    { name: "Blaise Kormann", isAuthor: false, inCredits: true, job: "Photographe", produces: "Photos", img: null },
    { name: "Alexandre Caporal", isAuthor: false, inCredits: true, job: "Vidéaste", produces: "Montages vidéos", img: null },
    { name: "Adam Malard", isAuthor: false, inCredits: true, job: "Vidéaste", produces: "Montages vidéos", img: null },
    { name: "César Greppin", isAuthor: false, inCredits: true, job: "Développement", produces: "Format web", img: "cesar-greppin.jpg" }
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
