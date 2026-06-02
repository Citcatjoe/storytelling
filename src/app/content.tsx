import type { Metadata, Viewport } from "next";
import { STORY, ABSOLUTE_SOCIAL_URL } from "@/config/variables";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { SideBlock } from "@/components/SideBlock";
import { HighlightBlock } from "@/components/HighlightBlock";
import { ChapterHeader } from "@/components/ChapterHeader";
import { Clear } from "@/components/Clear";
import { Authors } from "@/components/Authors";
import { MapVis } from "@/components/MapVis";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: STORY.title,
  description: STORY.description,
  authors: [{ name: STORY.author }],

  openGraph: {
    title: STORY.title,
    siteName: STORY.siteName,
    url: STORY.url,
    description: STORY.description,
    type: "article",
    images: [
      {
        url: ABSOLUTE_SOCIAL_URL,
        width: 1200,
        height: 630,
        alt: STORY.title,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: STORY.twitterHandle,
    title: STORY.title,
    description: STORY.description,
    images: [ABSOLUTE_SOCIAL_URL],
  },

  alternates: {
    canonical: STORY.url,
  },

  icons: {
    icon: [
      { url: `${STORY.faviconBaseUrl}/favicon-48x48.png`, sizes: '48x48', type: 'image/png' },
    ],
    shortcut: [`${STORY.faviconBaseUrl}/favicon.ico`],
    apple: [
      { url: `${STORY.faviconBaseUrl}/apple-touch-icon.png`, sizes: '180x180' },
    ],
    other: [
      { rel: 'mask-icon', url: `${STORY.faviconBaseUrl}/safari-pinned-tab.svg`, color: '#5bbad5' },
    ],
  },

  other: {
    "color-scheme": "light only",
    "msapplication-TileColor": STORY.themeColor,
    "image_src": ABSOLUTE_SOCIAL_URL,
  },
};

export default function Content() {
  // Construction du JSON-LD pour Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": STORY.title,
    "image": ABSOLUTE_SOCIAL_URL,
    "author": {
      "@type": "Person",
      "name": STORY.author
    },
    "publisher": {
      "@type": "Organization",
      "name": STORY.siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${STORY.faviconBaseUrl}/favicon-48x48.png`
      }
    },
    "datePublished": STORY.publicationDate,
    "description": STORY.description
  };

  return (
    <>
      <article className="min-h-screen max-w-screen-2xl mx-auto bg-white p-4 md:p-7">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Header />

        <div id="hero" className="bg-trame py-20 -mx-4 md:-mx-7 -mt-4 md:-mt-7">
          <div id="hero-container" className="w-full mx-auto max-w-5xl px-4 md:px-0 [@container]">
            <span className="block text-center uppercase font-regular text-xl tracking-widest mb-10">Enquête</span>
            <h1 className="text-center text-[clamp(1.5rem,6cqw,4rem)] leading-[1.083] tracking-tighter font-black mb-12 subpixel-antialiased">
              {(STORY.titleDisplay || STORY.title).split("<br>").map((line, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
            <figure>
              <div className="w-full h-[500px] bg-gray-200"></div>
              {/* <figcaption>{STORY.description}</figcaption> */}
            </figure>
            <div className="w-full max-w-[672px] mx-auto my-12 text-gray-800 leading-relaxed">
              <h2 className="font-semibold text-2xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquet
              fringilla mauris, in iaculis leo congue nec. Praesent vel dolor eu
              lorem porttitor malesuada. Nulla facilisi.</h2>
            </div>
            
            <Authors 
              authors={STORY.credits
                .filter(credit => credit.person)
                .map(credit => ({
                  name: credit.name,
                  job: credit.job || "",
                  img: credit.img || "",
                  link: credit.link
                }))
              }
              date={STORY.publicationDisplayDate}
            />

          </div>  
        </div>

        {/* Colonne de texte standard de 672px */}
        <div className="w-full max-w-[672px] mx-auto my-12 text-gray-800 leading-relaxed">
          <section id="introduction">
            <p className="text-lg font-light mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Tout est parti d’un bruit. Le genre d’info qui galope de village en village, et que les gens répètent avec un regard lourd de sous-entendus: “Vous savez quoi? Le neveu d’Orllati a passé son CFC d’agriculteur”.  Orllati / agriculture. A priori, deux mondes que tout oppose. D’un côté, l’un des plus gros acteurs de la construction romands, actif également dans la promotion immobilière, les décharges et le béton. De l’autre, cette pratique ancestrale qui consiste à travailler la terre pour nourrir le peuple.
            </p>
            <p className="text-lg font-light mb-6">
              Mais dans un minuscule pays blindé de monde, où certains ne voudraient même plus laisser entrer personne, la frontière entre ces deux univers est aussi poreuse que la brique ou le ciment. Pour loger les gens, il faut construire. Et pour construire, il faut faire de la place: creuser, détruire - donc générer des déchets. C’est ici que les terres agricoles entrent en jeu: à la campagne, on trouve des lieux où ouvrir des gravières (pour faire du béton) et des décharges (pour enfouir ce qui sort des chantiers). Dans certains cas, on peut aussi tabler sur du long terme: un changement d’affectation, qui transforme des terres agricoles achetées à très bas prix en poule aux oeufs d’or - une zone constructible.
            </p>
            <p className="text-lg font-light mb-6">
              Avec mon collègue Antoine Harari, on a arpenté le canton de Vaud pendant des mois, de parcelle en parcelle et de ferme en ferme. Ce qu’on a constaté? Alors qu’elles sont censées être protégées légalement, les terres agricoles sont à la merci des constructeurs et exploitants de décharges et gravières. Grâce à un système “d’hommes de paille” paysans, à la tête de sociétés anonymes, Orllati et d’autres acteurs du secteur arrivent à contourner la loi pour acheter des parcelles qui devraient rester entre les mains d’agriculteurs.
            </p>
            <p className="text-lg font-light mb-6">
              Cela signifie que les gardes-fous mis en place par l’Etat ne fonctionnent pas. A commencer par la Commission foncière rurale (CFR I), cet organisme à qui le gouvernement délègue la tâche d’autoriser ou non l’achat de terres agricoles. En 2021, une “Exploration” publiée par le média heidi.news autour de la problématique du béton avait pourtant déjà mis le doigt sur certaines failles, dont un homme de paille.  Mais depuis, rien n’a changé. Dans les campagnes, une guerre sourde pour l’achat des terres les plus prometteuses financièrement continue, au détriment des paysans, et de notre système démocratique. Voici notre enquête.
            </p>
          </section>

          <ChapterHeader 
            chapterNumber="1"
            title="Les deux frères magouilles du Gros-de-Vaud"
          />
          
          {/* ==============================================
              SECTION 1 : IMAGES FLOTTANTES (ANCHORED FLOATS) 
              Problème résolu : La largeur fluide permet au bloc de toucher le texte
              ============================================== */}
          <h2 className="font-bold text-xl mt-12 mb-4">1. Photos Flottantes (Anchored)</h2>

          {/* STADE 1 : Aligné Marge 0 */}

          
         
          <p className="text-lg font-light mb-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio. Phasellus egestas, arcu ac pellentesque.
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          {/* EXEMPLE SideBlock DROITE */}
          <SideBlock side="right">
            <img 
              src="/images/placeholder2.png" 
              alt="Side Showcase Right"
              className="w-full h-auto object-cover mb-10"
            />
          </SideBlock>
        
          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Aliquamss euismod vel augue a elementum. Curabitur vel dapibus odio.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
          </p>

          {/* EXEMPLE SideBlock GAUCHE */}
          {/* <SideBlock side="left">
            <img 
              src="/images/placeholder2.png" 
              alt="Side Showcase Left"
              className="w-full h-auto object-cover mb-10"
            />
          </SideBlock> */}

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

         

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <HighlightBlock>
            <h3 className="text-3xl font-bold mb-10">Les propriété d'Orlatti ne sont pas toujours<br></br>acquises de manière top moumoute</h3>
            
            <MapVis />
          </HighlightBlock>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          <p className="mb-4 text-lg mt-6">
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>




          {/* ==============================================
              SECTION 2 : BLOCS INTER-PARAGRAPHES (GALERIES)
              ============================================== */}
          <h2 className="font-bold text-xl mt-16 mb-4">2. Galeries Inter-Paragraphes</h2>
          <p className="text-lg font-light mb-6">
            Un élément 'bloc' (non flottant) avec une marge horizontale négative (-mx) va **automatiquement** grandir pour occuper l'espace, sans avoir besoin de calculer sa `width`.
          </p>

          {/* STADE 1 : Aligné (mx-0) avec 1 photo */}
          <Gallery 
            images={["/images/placeholder.png"]} 
            overflow="low"
            caption="Une image paisiblement alignée sur la largeur de l'article."
          />
          
          <p className="text-lg font-light mb-6">
            Aliquam euismod vel augue a elementum. Curabitur vel dapibus odio.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          {/* STADE 2 : À mi-chemin avec 2 photos */}
          <Gallery 
            images={["/images/placeholder.png", "/images/placeholder.png"]} 
            overflow="med"
            caption="Duo de photos débordant à mi-chemin dans la marge négative."
          />

          <p className="text-lg font-light mb-6">
            Aliquam euismod vel augue a elementum. Curabitur vel dapibus odio.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>

          {/* STADE 3 : Hero Edge bilatéral avec 3 photos */}
          <Gallery 
            images={["/images/placeholder.png", "/images/placeholder.png", "/images/placeholder.png"]} 
            overflow="high"
            caption="Le mode spectaculaire à trois photos, s'étirant au maximum autorisé jusqu'à s'aligner sur la grille extrême du Hero (Sur desktop)."
          />

          <p className="text-lg font-light mb-6">
            Aliquam ddeuismod vel augue a elementum. Curabitur vel dapibus odio.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Mauris vel interdum risus. Suspendisse eu risus eget tellus sodales.
            Suspendisse potenti. Phasellus egestas, arcu ac pellentesque
            commodo, eros lorem viverra odio, nec imperdiet justo nisl in eros.
            Integer tristique volutpat dui. Integer tristique volutpat dui.
          </p>
          
          <Clear />
        </div>

        {/* Crédits */}
        {STORY.credits && STORY.credits.length > 0 && (
          <>
            <hr className="w-full max-w-[672px] mx-auto mt-16 border-gray-200" />
            <div className="w-full max-w-[672px] mx-auto mt-16 text-lg bg-gray-50 p-8">
            {STORY.credits.map((credit, idx) => (
              <div key={idx} className={idx === STORY.credits.length - 1 ? "" : "mb-4"}>
                <div className="font-bold text-black">{credit.produces}</div>
                <div className="text-gray-700">{credit.name}</div>
              </div>
            ))}
          </div>
        </>
        )}

        <div className="p-4 bg-gray-100 rounded-lg mt-12 w-full max-w-[672px] mx-auto">
          <p className="font-mono text-xs text-gray-600">
            Ce projet kéké est configuré en mode <strong>SSG (Static Site Generation)</strong> avec Next.js.
            <br />
            Vérifiez le code source de la page (ou le dossier <code>out/</code> après build) pour voir les balises SEO générées.
          </p>
        </div>
        
      </article>
    </>
  );
}
