import type { Metadata } from 'next';

/**
 * Ceci est l'équivalent Next.js de votre snippet Twig pour les Metas.
 * Dans Next.js, on n'injecte pas de balises <meta> brutes dans le HTML.
 * On utilise l'API Metadata qui générera exactement ce dont vous avez besoin.
 * 
 * Vous pourrez utiliser cette fonction plus tard dans vos pages (ex: page.tsx) 
 * en l'important : `export const metadata = generateTwigMetas(...)`
 */

interface TwigMetaProps {
  title: string;
  description: string;
  authors: { writer: { fname: string; lname: string } };
  appUrl: string;
  imgSocial: string;
  titlesocial: string;
}

export function generateTwigMetas(props: TwigMetaProps): Metadata {
  const authorName = `${props.authors.writer.fname} ${props.authors.writer.lname}`;
  const absoluteImageUrl = `${props.appUrl}${props.imgSocial}`;

  return {
    title: props.title,
    description: props.description,
    authors: [{ name: authorName }],
    
    // <meta name="color-scheme" content="light only">
    // <meta name="msapplication-TileColor" content="#da532c">
    other: {
      "color-scheme": "light only",
      "msapplication-TileColor": "#da532c",
    },

    // Favicons et Apple Touch Icons
    icons: {
      icon: [
        { url: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" }
      ],
      apple: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon/apple-touch-icon.png",
      shortcut: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon/favicon.ico",
      other: [
        { rel: "mask-icon", url: "https://storytelling.blick.ch/fr/__is_embed_somewhere/favicon/safari-pinned-tab.svg", color: "#5bbad5" }
      ]
    },

    // OpenGraph (Facebook)
    openGraph: {
      title: props.titlesocial,
      siteName: "Blick.ch/fr",
      images: [
        {
          url: absoluteImageUrl,
        }
      ],
      type: "article",
      url: props.appUrl,
      description: props.description,
    },

    // Twitter
    twitter: {
      card: "summary_large_image",
      site: "@Blick_fr",
      description: props.description,
      images: [absoluteImageUrl],
    },

    // Google tag est géré via la balise GTM (components/scripts/GTM.tsx)
    
    // Canonical
    alternates: {
      canonical: props.appUrl,
    }
  };
}
