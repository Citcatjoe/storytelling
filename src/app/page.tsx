import type { Metadata, Viewport } from "next";
import { STORY, ABSOLUTE_SOCIAL_URL } from "@/config/story";

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
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    site: STORY.twitterHandle,
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

export default function Home() {
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
      <article className="min-h-screen p-8 max-w-7xl mx-auto">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      
        <header className="absolute top-0 left-0 right-0 h-16 bg-sky-500 opacity-50">
          test
        </header>

        <div id="hero" className="w-full h-96 bg-amber-100">

        </div>


        <h1 className="text-4xl font-bold mb-6 font-sans">
          {STORY.title}
        </h1>
        <p className="text-lg mb-4 text-gray-700">
          {STORY.description}
        </p>
        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="font-mono text-sm text-gray-600">
            Ce projet lol est configuré en mode <strong>SSG (Static Site Generation)</strong> avec Next.js.
            <br />
            Vérifiez le code source de la page (ou le dossier <code>out/</code> après build) pour voir les balises SEO générées.
          </p>
        </div>
      </article>
    </>
  );
}
