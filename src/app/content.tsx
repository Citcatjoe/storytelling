import type { Metadata, Viewport } from "next";
import { STORY, ABSOLUTE_SOCIAL_URL } from "@/config/variables";
import { Header } from "@/components/Header";
import { Gallery } from "@/components/Gallery";
import { SideBlock } from "@/components/SideBlock";
import { HighlightBlock } from "@/components/HighlightBlock";
import { ChapterHeader } from "@/components/ChapterHeader";
import { ChapterHeader2 } from "@/components/ChapterHeader2";
import { Clear } from "@/components/Clear";
import { Authors } from "@/components/Authors";
import { MapVis } from "@/components/MapVis";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ActivityGrid } from "@/components/ActivityGrid";
import { VerticalVideo } from "@/components/VerticalVideo";
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
          <div id="hero-container" className="w-full mx-auto max-w-6xl px-4 md:px-0 [@container]">
            <span className="block text-center uppercase font-regular text-xl tracking-widest mb-10">Enquête</span>
            <h1 className="text-center text-[clamp(1.5rem,6cqw,4rem)] leading-[1.083] tracking-tighter font-black mb-12 antialiased">
              {(STORY.titleDisplay || STORY.title).split("<br>").map((line, i) => (
                <span key={i} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
            <Gallery 
              placeholderCount={1}
              ratio="21/9"
              placeholderTxt="Illustration principale"
              overflow="high"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie"
              badgeColor="violet"
            />
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

        {/* ==============================================
            FLUX DE L'ARTICLE (SECTIONS SŒURS LINEAIRES)
            ============================================== */}

        {/* 1. Introduction (étroite) */}
        <section id="introduction" className="w-full max-w-[672px] mx-auto my-12 text-gray-800 leading-relaxed">
          <p className="text-lg mb-6  first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
            Tout est parti d’un bruit. Le genre d’info qui galope de village en village, et que les gens répètent avec un regard lourd de sous-entendus: “Vous savez quoi? Le neveu d’Orllati a passé son CFC d’agriculteur”.  Orllati / agriculture. A priori, deux mondes que tout oppose. D’un côté, l’un des plus gros acteurs de la construction romands, actif également dans la promotion immobilière, les décharges et le béton. De l’autre, cette pratique ancestrale qui consiste à travailler la terre pour nourrir le peuple.
          </p>
          <p className="text-lg mb-6">
            Mais dans un minuscule pays blindé de monde, où certains ne voudraient même plus laisser entrer personne, la frontière entre ces deux univers est aussi poreuse que la brique ou le ciment. Pour loger les gens, il faut construire. Et pour construire, il faut faire de la place: creuser, détruire - donc générer des déchets. C’est ici que les terres agricoles entrent en jeu: à la campagne, on trouve des lieux où ouvrir des gravières (pour faire du béton) et des décharges (pour enfouir ce qui sort des chantiers). Dans certains cas, on peut aussi tabler sur du long terme: un changement d’affectation, qui transforme des terres agricoles achetées à très bas prix en poule aux oeufs d’or - une zone constructible.
          </p>
          <p className="text-lg mb-6">
            Avec mon collègue Antoine Harari, on a arpenté le canton de Vaud pendant des mois, de parcelle en parcelle et de ferme en ferme. Ce qu’on a constaté? Alors qu’elles sont censées être protégées légalement, les terres agricoles sont à la merci des constructeurs et exploitants de décharges et gravières. Grâce à un système “d’hommes de paille” paysans, à la tête de sociétés anonymes, Orllati et d’autres acteurs du secteur arrivent à contourner la loi pour acheter des parcelles qui devraient rester entre les mains d’agriculteurs.
          </p>
          <p className="text-lg mb-6">
            Cela signifie que les gardes-fous mis en place par l’Etat ne fonctionnent pas. A commencer par la Commission foncière rurale (CFR I), cet organisme à qui le gouvernement délègue la tâche d’autoriser ou non l’achat de terres agricoles. En 2021, une “Exploration” publiée par le média heidi.news autour de la problématique du béton avait pourtant déjà mis le doigt sur certaines failles, dont un homme de paille.  Mais depuis, rien n’a changé. Dans les campagnes, une guerre sourde pour l’achat des terres les plus prometteuses financièrement continue, au détriment des paysans, et de notre système démocratique. Voici notre enquête.
          </p>
        </section>

        {/* 2. Chapitre 1 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-1" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="1"
            title="Cap sur les champs du canton de Vaud"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte et photos flottantes du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              C’est une cuisine immaculée comme on en trouve souvent dans les fermes vaudoises, avec la machine à café qui ronronne par intermittence. Assis à l’autre bout de la table, Eric* secoue la tête, ses grandes mains aux ongles terreux croisées devant lui: “Orllati, c’est le huitième conseiller d’Etat. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jamais avoir une exploitation agricole dans le canton.”
            </p>


            <QuoteBlock 
              quote="Orllati, c’est le huitième conseiller d’Etat. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jam  ais avoir une exploitation agricole dans le canton."
              author="Un paysan souhaitant garder l’anonymat"
              info={undefined}
              accent="accent2"
            />

           

            <p className="text-lg mb-6 ">
              Alentours, le paysage du Gros-de-Vaud est morose en ce vendredi de février. Du brun et du vert délavés, un ciel bas au-dessus des chemins boueux, quelques restes de neige. Si nous sommes venus voir Eric, c’est parce qu’il connaît bien le promoteur Orllati. Comme beaucoup de paysans, il a côtoyé Avni, le fondateur et administrateur délégué de la société, dans le cadre de la vente ou de la location de terres agricoles.  
            </p>

            <Gallery 
              placeholderCount={1}
              ratio="3/2"
              placeholderTxt="Illustration 'Chez Eric'"
              overflow="low"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              Actif dans la construction, la promotion immobilière, les décharges et le béton, le groupe que dirige Avni Orllati est l’acteur le plus puissant du canton dans son domaine, avec 400 millions de francs de chiffre d’affaires. A ses débuts dans l’immobilier, l’entreprise sise à Biolay-Orjullaz s’était spécialisée dans la reconversion de friches industrielles. Comme celle de l’ancien laboratoire Kodak de Renens,  transformé il y a une quinzaine d’années en un espace mixte qui abrite, entre autres, le Ministère public. Mais “aujourd’hui, ce type de projet ne fonctionne plus”, relève Eric. En effet, le Canton souhaite désormais conserver ses zones dévolues à l’industrie. Orllati a donc opéré un virage hors des grands centres urbains, où il a réalisé d’importants projets immobiliers, dont l’écoquartier de Gruvatiez à Orbe en 2021.
            </p>
          </div>

          <Gallery 
            images={["/images/renens/50_Orllati_Renens.jpg"]}
            ratio="3/2"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Pour une entreprise avec un tel profil, certains terrains sis en zone agricole valent de l’or. On y trouve du gravier nécessaire à la fabrication du béton, des trous où enterrer les déchets, des futurs sites où construire en cas de changement d’affectation. Mais à la campagne, les terres appartiennent généralement à des paysans. Un monde où le silence résonne comme une évidence: à quatre reprises au moins, des paysans qui avaient accepté de nous rencontrer ont annulé le rendez-vous à la dernière minute, estimant qu’il était trop dangereux pour eux de s’exprimer, même sous le couvert de l’anonymat.
            </p>
          </div>

          <HighlightBlock 
            title="Titre infographie comment il se fait du pognon (domaines d’activité)"
            badge="Pour Julie. Camille réfléchit à l'ajout de 'Géothermie'"
            badgeColor="violet"
          >
            <ActivityGrid />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              “J’ai un partenaire qui représente 300’000 à 800’000 francs par année pour moi. Il m’a dit: si tu parles d’Orllati, je fais plus affaire avec toi. Je risque la faillite”, nous a expliqué l’un d’entre eux, qui aurait pourtant eu beaucoup de choses à raconter. Il lâche, malgré tout: “Dans ma région, 60% des agriculteurs arrivent en bout de course dans les cinq prochaines années. D’ici dix ans, Orllati possédera 15 à 20% des terres vaudoises”.
            </p>
          </div>
        </section>

        

        {/* 4. Highlight Block (Plein écran sur 1536px max) */}
        {/* <HighlightBlock title="Les propriété d'Orlatti ne sont pas toujours acquises de manière top moumoute">
          <MapVis />
        </HighlightBlock> */}

        {/* 3. Chapitre 2 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-2" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="2"
            title="Le neveu d’Avni sur les bancs de l’école d’agriculture"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            <SideBlock 
              side="right"
              ratio="3/4"
              placeholderText="Illustration sur la base de photo : le neveu"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - A confirmer si basé sur véritable photo"
              badgeColor="rouge"
            />

            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Dans ce contexte, une anecdote fait grenouiller la campagne vaudoise depuis des mois. “Allez voir au village, les paysans ne parlent que de ça”, assure Eric. Parmi les soixante diplômés en agriculture du centre de formation de Granges-Verney en juin 2025, un nom clignote comme sur un fond turquoise. C’est celui de G.Orllati, fils du frère jumeau d’Avni. Ce jeune père de famille de 26 ans travaillait il y a peu en tant que logisticien dans l’entreprise familiale, d’après cet article du magazine mensuel des chauffeurs professionnels où il vante les mérites d’un camion balayeur-nettoyeur dernier cri.   
            </p> 
            <p className="text-lg mb-6">
              Dans le milieu paysan, le profil est insolite: “Évidemment qu’on en parlait. On se demandait ce qu’il allait bien pouvoir faire d’un CFC d’agriculteur”, souffle un diplômé de la même volée. “J’ai essayé de le cuisiner, raconte un autre. C’est quelqu’un d’hyper sympa, avec de l’entregent. Il arrivait aux cours avec une grosse BMW et il disait qu’il avait envie d’une vie plus simple, plus proche de la terre. Je pense qu’il était dans une vraie démarche de compréhension de la profession, mais personne n’a réussi à en savoir davantage. Il me semble qu’il n’avait pas de projet précis pour la suite.” 
            </p>
          </div>

          <Gallery 
            images={[
              "/images/moudon/56_Orllati_Moudon.jpg",
              "/images/moudon/63_Orllati_Moudon.jpg"
            ]}
            ratio="3/2"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Déjà titulaire d’un CFC, Genti Orllati a effectué la seconde partie de son apprentissage chez Jacques Gottofrey, un ancien conseiller communal UDC et agriculteur à Echallens, qui est également le président de l’association romande de lutte suisse. Nous l’avons contacté, et voici ce qu’il nous a dit: “C’est un très bon chauffeur. On m’a demandé de le prendre suite à une interruption de son stage chez un paysan à Fribourg. Son rêve c’était de monter une petite ferme éducative avec quelques bâches et chèvres et moutons et être tranquille”. Mais l’agriculteur admet ne plus avoir eu de nouvelles depuis plusieurs années et avoir simplement entendu qu’il “avait monté une société de réparation de machines agricoles”.
            </p>

            <QuoteBlock 
              quote="Il arrivait aux cours avec une grosse BMW et il disait qu’il avait envie d’une vie plus simple, proche de la terre. Je pense qu’il était dans une vraie démarche de compréhension de la profession, mais personne n’a réussi à en savoir davantage"
              author="Un diplômé de la même volée"
              accent="accent2"
            />

            <SideBlock 
              side="right"
              ratio="3/4"
              placeholderTxt="Illustration de base de photo : Emmanuel Crausaz"
              caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              badge="Pour Julie"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              En effet, au registre du commerce vaudois, deux sociétés ont été inscrites tout récemment, avec Genti Orllati comme administrateur. L’une a pour but les travaux agricoles, l’autre l’exploitation d’un atelier mécanique et l’importation de machines. Toutes deux peuvent par ailleurs acheter et vendre des immeubles agricoles en vertu de la Loi sur le droit foncier rural, ce qui nécessite un numéro d’exploitant - qui va généralement de pair avec un CFC. Dans la seconde société, “le neveu” n’est pas seul: il est associé à un jeune agriculteur du nord-vaudois, actionnaire majoritaire, ainsi qu’à un Fribourgeois répondant au nom d’Emmanuel Crausaz. Nous retrouverons le nom de cet éleveur de cochons tout au long de cette enquête, car il joue un rôlé clé dans l’accès du groupe Orllati à des parcelles agricoles. 
            </p>

            <p className="text-lg mb-6">
              Très populaire dans le monde paysan et disposant d’un excellent réseau, Emmanuel Crausaz est connu pour avoir présidé jusqu’en 2019 l’association fribourgeoise de lutte suisse. De 2013 à 2018, il a aussi administré la société Orllati environnement SA, spécialisée dans l’exploitation de gravières et déchets à Fribourg. 
            </p>

            <p className="text-lg mb-6">
              Comme l’avait révélé le média heidi.news en 2020, cet homme à l’imposante carrure, qui affiche des lunettes noires de bodyguard sur son profil Linkedin, allait rendre visite à des agriculteurs en compagnie de l’ancien hydrogéologue cantonal pour les convaincre de vendre leur terre à Orllati. 
            </p>
          </div>
        </section>

        {/* 4. Chapitre 3 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-3" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="3"
            title="Des paysans de paille pour infiltrer les paysans"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Si l’obtention d’un CFC d’agriculteur par un membre de cette famille de constructeurs suscite autant d’interrogations, ce n’est pas juste parce que le “neveu de” est hors sérail. Dans les villages, le groupe installé à Biolay-Orjullaz, ainsi que d’autres sociétés moins importantes, sont connues pour faire appel à des “hommes de paille” paysans. Un manque de contrôle permet en effet  à des entreprises actives dans l’immobilier ou la production de béton d’acquérir des parcelles censées rester entre les mains d’agriculteurs.  Dans le cadre de la révision de la Loi sur le droit foncier rural (LDFR) l’automne dernier, le Conseil fédéral a pourtant été clair: il veut “renforcer le principe de l’exploitation à titre personnel, selon lequel les immeubles agricoles doivent être exploités par les personnes qui les ont acquis.”
            </p>
          </div>

          <HighlightBlock 
            title="Infographie explicative homme de paille en infiltration (recette)"
            badge="Pour Julie - Livre qui servira de canevas à César"
            badgeColor="violet"
          >
            <Gallery 
              placeholderCount={1}
              ratio="16/9"
              placeholderTxt="Infographie"
              overflow="med"
            />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Ce garde-fou est censé éviter que les terres agricoles ne fassent l’objet de spéculation foncière ou soient détournées de leur usage. Mais apparemment, il est facile de s’asseoir dessus, du moins dans le canton de Vaud. Comment? En s’adjoignant les services d’agriculteurs au bénéfice de CFC, avec des parts majoritaires dans des sociétés anonymes pilotées en sous-marin. Autrement dit, des paysans au service d’entités extérieures au monde agricole, qui jouent parfois le simple rôle de figurant habilités à signer, contre rémunération ou garantie d’exploiter les terrains pour l’agriculture en attendant que le nouveau propriétaire puisse en faire usage. 
            </p>

            <p className="text-lg mb-6">
              “Orllati achète grâce à nous. Sur le papier, on est majoritaires. Mais en réalité, c’est à lui”, confirme l’un de ces paysans, qui figure au registre du commerce comme administrateur d’une de ces sociétés, propriétaire de trois parcelles à Arnex-sur-Nyon et à Crans-près-Céligny. Il ajoute: “Orllati est correct. Il nous achète les terres sous le nez, mais il ne les cultive pas. On est obligés de trouver des solutions. Sinon, on va tous crever”. 
            </p>

            <p className="text-lg mb-6">
              Il s’agit d’une des zones où Orllati a un projet de décharge, autrefois en mains d’un autre spécialiste du secteur, Ronchi SA. “ça lui coûte moins cher d’acheter les terrains que de payer au mètre cube. Si j’ai 15 hectares, il me les achète à 2 francs, qui est le prix licite. ça lui coûte donc 300’000 francs une fois pour toutes”, relève l’agriculteur “Et puis, une fois qu’on a bouché le trou, on peut exploiter à nouveau”. La méthode plus classique consiste en effet à louer les terres aux propriétaires sur la base de conventions, le temps d’exploiter la gravière ou la décharge. 
            </p>

            <p className="text-lg mb-6">
            Favorisés par la loi, les exploitants à titre personnel peuvent en effet acquérir directement des parcelles agricoles. Un non-exploitant peut aussi acheter ce type de terrain, mais uniquement à condition qu’il n’y ait pas de paysans sur le coup. C’est ce qu’avait fait Orllati dans le cadre de la vente de parcelles à Blonay, comme Blick l’avait raconté l’an dernier. 

            </p>
          </div>

          <Gallery 
            images={[
              "/images/blonay/03_Orllati_Blonay.jpg",
              "/images/blonay/04_Orllati_Blonay.jpg"
            ]}
            ratio="3/2"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Selon nos informations, la société avait alors dû convaincre quatre agriculteurs, qui s’étaient portés acquéreurs, de retirer leurs offres en échange d’un autre terrain ou de la possibilité d’exploiter provisoirement les parcelles en question. Quant au paysan qui bénéficiait d’un droit de préemption (acheteur prioritaire) en tant qu’exploitant d’une des parcelles, il s’est vu proposer des terres près de l’ancienne central thermique de Chavalon (VS), rachetée par Orllati il y a quelques années. Problème: le terrain est en talus, ce qui rend tout type de culture quasiment impossible. Contacté, il n’a pas souhaité s’étendre mais il confirme: ”ça ne valait pas l’échange, c’est clair… Mais dans la vie on arrive pas à tout faire, il faut être pragmatique”. Une réponse évasive que nous avons souvent rencontrée au cours de notre enquête. 
            </p>

            <QuoteBlock 
              quote="ça ne valait pas l’échange, c’est clair… Mais dans la vie on arrive pas à tout faire, il faut être pragmatique"
              author="Le paysan bénéficiaire du droit de préemption"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              La conseillère d’Etat Valérie Dittli avait recouru contre cette vente à Orllati, en vain: après s’être penchée une nouvelle fois sur le dossier, la Commission foncière rurale (CFR I), qui avait délivré l’autorisation d’acquérir au groupe de Biolay-Orjullaz, a réitéré sa décision sans investiguer davantage, avec  une motivation différente. Quant au département, il a fini par baster. 
            </p>

             <p className="text-lg mb-6">
             Plus simple sans doute, et moins risqué, le système des hommes de paille présente plusieurs avantage. Avec des paysans dans la poche, exit la concurrence, les contreparties, et les appels d’offre publiés dans la FAO. Blick a identifié trois sociétés liées à Orllati qui fonctionnent de cette manière. 
            </p>
          </div>
        </section>

        {/* 5. Chapitre 4 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-4" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="4"
            title="Les deux frères magouilles du Gros-de-Vaud"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            

            <SideBlock 
              side="left"
              ratio="3/4"
              placeholderTxt="Roger et Victor"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - basé sur photo"
              badgeColor="violet"
            />

            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              C’est cette méthode plus directe, et moins visible, qu’Orllati a commencé à appliquer en 2016 à travers la création de Henny Frères SA, du nom de deux frères agriculteurs du Gros-de-Vaud que nous nommerons Roger* et Victor*. Selon ses statuts, les actions de cette société ne peuvent être détenues majoritairement que par des exploitants agricoles ou viticoles à titre personnel. Le transfert des actions et certaines modifications des statuts sont soumis à l’approbation de la Commission foncière rurale, soit l’organe auquel le Conseil d’Etat vaudois délègue l’application de la Loi sur le droit foncier rural.  
            </p>

            <p className="text-lg mb-6">
              De source sûre, Roger était un ancien employé d’Orllati. Pas assez riche pour acheter un domaine, lui et son frère auraient accepté d’entrer dans Henny frères SA en échange d’un morceau de terrain à cultiver. Mais Orllati, qui aurait même avancé le capital de départ, n’aurait pas rempli ses engagements. En 2019, excédé par les promesses non tenues, Roger est parti et a été remplacé au Conseil d’administration par Emmanuel Crausaz, le lutteur aux lunettes noires que nous avons introduit dans le premier chapitre. 
            </p>

            <QuoteBlock 
              quote="Beaucoup de paysans sont vulnérables d’un point de vue relationnel. Chez les Orllati, on les écoute, on s’intéresse à leur réalité"
              author="Un jeune diplômé en agriculture"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Quant au second frère, Victor, il a présidé Henny Frères SA depuis le départ de Roger. Après plusieurs appels du pied pour pouvoir quitter la société, il aurait donné sa démission tout récemment, initialement pour être remplacé par “le neveu”. Selon nos sources, la reprise du flambeau serait en stand-by. 
            </p>

            <p className="text-lg mb-6">
              Contactés, les deux frères ont refusé de répondre à nos questions. “Je ne fais plus partie de la société”, nous assure Victor, dont le nom figure pourtant toujours au Registre du commerce (RC). “Pour moi, c’est de l’histoire ancienne”, explique Roger avant de raccrocher.
            </p>

            <p className="text-lg mb-6">
              En arrière-plan de cette histoire, et d’autres récits que Blick a écoutés ces dernières semaines, on trouve cette fraction du monde agricole qui se débat avec des dettes, de la paperasse, des hypothèques. Et, parfois, une piètre image de soi. “Beaucoup de paysans vivent une crise identitaire, ils ne se sentent pas reconnus, explique un jeune diplômé en agriculture. Ils sont vulnérables d’un point de vue relationnel. Chez les Orllati, on les écoute, on s’intéresse à leur réalité. Ils ont les moyens et l’aura pour emmener une partie du monde agricole derrière eux.” 
            </p>

            <QuoteBlock 
              quote="La plupart des autres agriculteurs du coin ne me parlent plus, parce qu’ils sont jaloux"
              author="Un paysan ayant fait des affaires avec Orllati"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Dans les campagnes, ce choc entre économie rurale et spéculation fait des ravages au niveau des relations entre voisins, selon plusieurs personnes avec qui nous avons échangé. Quand le promoteur n’achète pas les terres, directement ou via des sociétés anonymes, elles sont en effet louées sur la base de conventions, le temps d’exploiter la gravière ou la décharge. Une méthode plus classique, mais semeuse de discorde. “La plupart des autres agriculteurs du coin ne me parlent plus, parce qu’ils sont jaloux”, explique un paysan qui a accepté de faire des affaires avec Orllati. 
            </p>
          </div>
        </section>

        {/* 6. Chapitre 5 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-5" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="5"
            title="Un promoteur au milieu de «Sauvez Lavaux»"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Plus à l’est du canton, les villages de Chardonne et Corseaux offrent une vue sublime sur le Léman. Avec, au premier plan, les vignobles en terrasse d’où coule le “joli vin blanc” si cher au coeur des Vaudois. Un décor de carte postale qui se paie cher: sur la Riviera, les prix de l’immobilier sont plus élevés que la moyenne cantonale de près de 30%, selon une étude de la BCV de novembre 2025. A Corseaux, le coût d’une maison individuelle standard est de 2,2 à 2,3 millions de francs. 
            </p>

            <p className="text-lg mb-6">
              Sous l’autoroute A9, à cheval entre les deux villages, Henny Frères SA est l’heureuse propriétaire au registre foncier de six parcelles offrant un dégagement spectaculaire sur la plaine du Rhône. Autrefois occupées par des maraîchers, d’immenses serres y sont laissées à l’abandon depuis des années: les vitres sont cassées et des arbres poussent à l’intérieur. Juste en face, un petit immeuble a été rénové il y a deux ans pour devenir habitable, malgré sa situation en dehors de la zone à bâtir. Le reste des terrains est composé de vignes, situées dans la zone de Lavaux, qui est inconstructible et protégée dans la Constitution en tant que paysage exceptionnel, selon la volonté du peuple vaudois.  
            </p>
          </div>

          {/* Galerie 2 images, débordement moyen (med) */}
          <Gallery 
            images={[
              "/images/corseaux/11_Orllati_Corseaux.jpg",
              "/images/corseaux/11_Orllati_Corseaux.jpg"
            ]}
            ratio="3/2"
            overflow="med"
            badge="Pour César - poser une video"
            badgeColor="rouge"
          />

          <Gallery 
            images={[
              "/images/corseaux/___Orllati_Corseaux_09.jpg"
            ]}
            ratio="3/2"
            overflow="med"
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Le jour de notre visite, les Alpes sont encore nimbées d’une neige de printemps qui scintille au soleil. “C’est Orllati qui est propriétaire, confirme d’entrée de jeu un ouvrier occupé à des travaux de terrassement devant les serres. Évidemment qu’il rêve de construire ici, mais je ne sais pas quand ce sera possible.”
            </p>

            <QuoteBlock 
              quote="La vente devait avoir lieu au cinéma Rex de Vevey. Mais sur place on a appris qu’Orllati avait tout racheté la veille"
              author="Un habitant de Corseaux"
              accent="accent2"
            />

            {/* SideBlock à droite (portrait) placé avant le premier des deux paragraphes pour float desktop correct */}
            <SideBlock 
              side="right"
              ratio="3/4"
              placeholderTxt="Illustration : un vigneron / grappes de raisin"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              De sources concordantes, cette vente porte également la griffe du lutteur Emmanuel Crausaz. Les parcelles concernées devaient être vendues aux enchères durant le Covid, à la suite de la faillite du propriétaire précédent, un entrepreneur genevois reconverti dans l’agriculture. “J’aurais voulu racheter une partie des vignes, explique un habitant de Corseaux. La vente devait avoir lieu au cinéma Rex de Vevey. Mais sur place on a appris qu’Orllati avait tout racheté la veille. Il a dû mettre un bon prix.” Il ajoute: “C’est vraiment dommage de laisser ces serres à l’abandon. Des gens demandent souvent à la commune s’ils ne pourraient pas avoir un espace pour cultiver à l’intérieur.” 
            </p>

            <p className="text-lg mb-6">
              Une situation qui interroge sachant que dans la pratique on considère qu’un exploitant doit se trouver à une quinzaine de kilomètres pour pouvoir acheter. Mais comme l’explique un paysan qui avait eu l’occasion de récupérer un terrain au nez et à la barbe d’…Emmanuel Crausaz et d’Orllati, “En ce qui concerne les 14 kilomètres, normalement c’est à vol d’oiseau. Mais l’Etat l’applique un peu à son bon vouloir. En fait, l’oiseau, il peut voler plus à gauche ou plus à droite. Il semblerait que selon les districts ils l’appliquent pas la même chose”.
            </p>

            {/* SideBlock à gauche (carré) placé avant le paragraphe sur la fondation Franz Weber */}
            <SideBlock 
              side="left"
              ratio="3/4"
              placeholderTxt="Illustration sur phot de Anna Zanger"
              caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
              badge="Pour Julie - vraie photo OK"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              Nous avons contacté la fondation Franz Weber, qui couve Lavaux comme le plus précieux des trésors. Comment réagit-elle au fait que le groupe Orllati possède indirectement plusieurs parcelles en zone viticole protégée? “Avec inquiétude”, nous répond Anna Zangger, membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra. “En principe, les parcelles colloquées en zone agricole (ou viticole) sont inconstructibles et doublement protégées, en Lavaux, par la Loi sur l’aménagement du territoire et la Loi sur le plan de protection de Lavaux. Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales.” 
            </p>

            <QuoteBlock 
              quote="Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales."
              author="Anna Zangger, co-directrice d’Helvetia Nostra"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              L’avocate de profession s’interroge en outre sur “le mécanisme qui a permis à un groupe de promotion immobilière d’acquérir ces parcelles, même indirectement.” Selon elle, “ce type de montage mérite une vigilance particulière. Les communes et la Commission foncière doivent également prendre leurs responsabilités pour empêcher des projets immobiliers hors zone à bâtir, la protection de leurs villages et paysage, tout particulièrement en Lavaux, et éviter de manière générale le contournement des lois.” 
            </p>

            <p className="text-lg mb-6">
              Quant à la commune de Chardonne, voici ce qu’elle répond, par l’intermédiaire de sa syndique Maria Alice Reymond: 
            </p>

            <Clear />
          </div>
        </section>

        {/* 7. Chapitre 6 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-6" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="6"
            title="Le coût humain avec au moins encore une ligne"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Ces entorses à (l’esprit de) la loi n’atteignent pas que le paysage. Elles touchent aussi les “vrais” paysans, qui font les frais des ambitions des mastodontes. Agriculteur à la retraite, Charles-Henri Fuchs a vécu durant vingt-cinq ans avec sa femme et ses quatre enfants à la Flogère, un domaine enchanté situé dans le district de Morges. Propriété d’Henny Frères SA depuis 2019, le complexe est depuis laissé à l’abandon, à l’image des serres de Lavaux. Lors de nos visites, seules quelques vaches appartenant à un agriculteur du coin étaient présentes dans le hangar, et la ferme était envahie de végétation. 
            </p>
          </div>

          {/* Galerie double débordement moyen (med) */}
          <Gallery 
            images={[
              "/images/yens/36_Orllati_Eclépens.jpg",
              "/images/yens/36_Orllati_Eclépens.jpg"
            ]}
            ratio="3/2"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            badge="Pour César - placer une video"
            badgeColor="rouge"
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Sur un mur du salon (immaculé) de l’appartement de Montricher où Charles-Henri Fuchs vit désormais avec son épouse, on trouve une photographie de l’exploitation durant ses grandes années. Arrivé en 1992, l’agriculteur était actif dans l’engraissement de taureaux et les cultures: blé, orge, maïs, colza. Il n’a jamais été propriétaire de la Flogère. Le domaine était en mains d’une héritière du groupe Von Roll, vestige d’une époque où les industriels s’offraient des biens immobiliers au milieu des vallons. “En 2013, une façade de la maison menaçait de s’effondrer, raconte Charles-Henri Fuchs devant une tasse de café. La propriétaire a voulu vendre, pour 2,8 millions. Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs.”
            </p>

            <QuoteBlock 
              quote="Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs"
              author="Charles-Henri Fuchs, Agriculteur"
              accent="accent2"
            />

            {/* SideBlock à droite (vidéo portrait) placé avant les 3 paragraphes pour float desktop correct */}
            <SideBlock 
              side="right"
            >
             <VerticalVideo 
              videoSrc="https://cdn.jwplayer.com/videos/OMQ2B8Qw-W5hRqR0L.mp4"
              caption="Lorem ipsum dolor sit amet."
            />
            </SideBlock>

            <p className="text-lg mb-6">
              En tant qu’exploitant au bénéfice d’un bail à ferme durant de nombreuses années, Charles-Henri Fuchs aurait pourtant été prioritaire pour le rachat du domaine. 
            </p>

            <p className="text-lg mb-6">
              Mais au lieu de cela, il a assisté, impuissant, à un étrange ballet: “D’abord, la maison bernoise Marti (active dans la construction ndlr) est arrivée, avec un paysan de Lucerne nommé Urs Bernet. Je pensais qu’ils allaient faire une offre d’achat, mais il ont seulement loué, et ce Monsieur Bernet m’a engagé comme employé durant quelques années, avant de résilier mon contrat au motif que je coûtais trop cher.” 
            </p>

            <p className="text-lg mb-6">
              Urs Bernet n’est pas n’importe qui. Selon un article publié en 2016 par la Luzerner Zeitung, il a été durant des années une figure majeure de l’industrie du gravier dans l’arrière-pays lucernois, ainsi que l’un des plus importants éleveurs du canton. Autrement dit, le mélange des genres n’est pas l’apanage d’Orllati, ni même des Vaudois. 
            </p>

            <p className="text-lg mb-6">
              Le présence à la Flogère de cette personnalité controversée dans son canton, qui a subitement disparu des radars en 2016, n’est pas un hasard. Car ce domaine est situé au-dessus d’un important gisement de gravier, dans la prolongation du bois de Ballens, occupé en 2024 par des activistes du mouvement Grondements des terres. Comme l’avait révélé heidi.news en 2021, les géants Holcim et Orllati s’y font la guerre pour la maîtrise des parcelles porteuses de revenus colossaux. 
            </p>

            

            <QuoteBlock 
              quote="Je leur ai dit, aux gens de l’Etat: les premier fautifs de cette situation, c’est vous."
              author="Charles-Henri Fuchs"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              A la Flogère, ce sont les hommes d’Orllati qui ont succédé à ceux du Bernois Marti. Sans surprise, notre Fribourgeois Emmanuel Crausaz était présent lors de la visite en vue de l’acquisition, mais pas seulement. Selon Pierre-Henri Fuchs, une personnalité de poids s’est également rendue sur les lieux à cette occasion: Pierre-François Veillon, qui fut conseiller d’Etat, puis conseiller national sous la bannière de l’UDC, avant de retourner à son bureau de comptabilité et de gestion agricole à Bex. Un nom que l’on retrouve dans le cadre de la vente des Ursins, ce somptueux domaine situé dans le district de Morges dont nous vous racontions l’histoire récemment. A quel titre était-il impliqué dans ces ventes? Contacté, il….
            </p>
          </div>

          {/* Galerie double débordement moyen (med) */}
          <Gallery 
            placeholderCount={2}
            ratio="3/2"
            placeholderTxt="Photos archives. Camille arrive avec"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Contrairement à sa femme, qui n’a “jamais pu y remettre les pieds”, Charles-Henri Fuchs est retourné plusieurs fois sur les lieux où ses enfants ont grandi. Parce qu’il “veillait à toujours garder tout en ordre”, l’état d’abandon où la ferme a été laissée l’affecte. Mais cela s’arrête là. “Mon fils s’était déjà projeté dans une reprise de l’exploitation, donc ça été plus dur pour lui que pour moi. Il serait du reste toujours intéressé à s’investir sur place.” 
            </p>

            <p className="text-lg mb-6">
              Récemment, l’agriculteur et son épouse ont été entendus par la commission du Grand Conseil qui planche sur les problèmes au sein de la Commission foncière rurale, révélés notamment par des enquêtes de Blick. S’il n’a pas beaucoup parlé, Charles-Henri Fuchs a tenu à s’exprimer sur un point qui lui tient à coeur “Je leur ai dit, aux gens de l’Etat: les premier fautifs de cette situation, c’est vous.”
            </p>

            <Clear />
          </div>
        </section>

        {/* 8. Chapitre 7 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-7" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="7"
            title="Les coups de poker"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Avant de poursuivre, un petite parenthèse législative s’impose. En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux: encourager la propriété foncière rurale et maintenir les entreprises familiales, lutter contre les prix exagérés des parcelles agricoles et la spéculation, et  renforcer la position du paysan exploitant à titre personnel (y compris celle du fermier) en cas d’acquisition de terres ou de domaines.   
            </p>

            <p className="text-lg mb-6">
              La LDFR comprend des exceptions: son article 64 stipule ainsi qu’il est possible de déroger au principe de l’exploitant à titre personnel lorsque l’achat a pour but d’exploiter les ressources du sol permise par le droit de l’aménagement du territoire, ce qui est le cas du gravier. En théorie, Orllati aurait donc pu acheter la Flogère directement, sans passer par ses hommes de paille.  Sauf que la loi comporte un obstacle de taille: si le terrain n’est pas utilisé dans les quinze ans à compter de son acquisition, il doit être revendu. Or, le domaine des gravières est mouvant, incertain, tendu. Il souffre notamment des rebuffades des citoyens, qui refusent de cautionner le béton ou la détérioration de leur environnement direct. Mieux vaut donc acheter sous l’étiquette d’un paysan.
            </p>
          </div>

          {/* Galerie full débordement, 2 images */}
          <Gallery 
            images={[
              "/images/vernand/42_Orllati_Vernand-Dessous.jpg",
              "/images/vernand/44_Orllati_Vernand-Dessous.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Outre les vignes de Lavaux et le “ranch” de la Flogère, Henny Frères a acheté plusieurs terrains agricoles près de la zone industrielle de Vernand, dans l’Est lausannois, entre 2017 et 2021. L’une d’entre elles a coûté plusieurs millions, car elle était grevée d’hypothèques. Au moment de l’acquisition, des terrains étaient exploités par un paysan, qui aurait pu se revendiquer du droit de préemption. Au lieu de cela, la parcelle a été vendue à Henny frères SA et l’agriculteur a signé un contrat pour pouvoir continuer à exploiter. Contacté, il n’a pas souhaité s’exprimer. De sources concordantes, le paysan n’avait pas les moyens financiers pour s’aligner.
            </p>

            <QuoteBlock 
              quote="Tous les terrains qui ont une cuvette intéressent Orllati, relève un agriculteur. Son but est de les remplir. Pour 100’000 m3 à 15 balles le m3, je vous laisse faire le calcul… "
              author="Un agriculteur"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Par le biais de la même société anonyme, le seigneur de Biolay-Orjulaz a également fait l’acquisition d’une belle ferme située au coeur du hameau de Vernand-Dessous. Une histoire tragique, relatée par le voisinage: après le décès de la fille de la propriétaire, le beau-fils de cette dernière aurait revendu à son insu à Orllati, qui y loge actuellement des employés à l’étage. Contactée, l’ancienne propriétaire n’a pas donné suite. On sait par contre qu’Avni Orllati s’est rendu régulièrement dans le hameau ces dernières années, pour tenter de convaincre les autres propriétaires de lui vendre leurs biens. Une veuve aurait ainsi reçu la visite du promoteur deux semaines après la mort de son mari. 
            </p>
          </div>

          <HighlightBlock 
            title="INFOG Le business des décharges est lucratif"
            badge="Pour César"
            badgeColor="rouge"
          >
            <Gallery 
              placeholderCount={1}
              ratio="16/9"
              placeholderTxt="Infographie : Le business des décharges est lucratif"
            />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Fait troublant, la jolie ferme vendue à Henny Frères par le beau-fils de la propriétaire est aujourd’hui en mains de la société Orllati Real Estate SA, selon le registre foncier. Cela signifie que la société co-administrée par Emmanuel Crausaz a revendu directement le bâtiment au groupe de Biolay-Orjullaz. Comment Orllati Real Estate, dont les statuts n’ont rien à voir avec l’agriculture a-t-elle pu acquérir un bâtiment situé en zone agricole? Que compte-t-elle développer dans le secteur? Combien d’autres biens ont-ils été achetés par le biais d’hommes de paille avant d’être revendus au promoteur de Biolay-Orjulaz? Et combien d’autres sociétés actives dans l’immobilier font de même? Contacté,….
            </p>

            <p className="text-lg mb-6">
              Jusqu’à il y a quelques années, il était possible de connaître le nom du propriétaire d’une parcelle par le biais d’une simple recherche sur le site du guichet cartographique cantonal. Au motif que des propriétaires étaient harcelés par des courtiers, l’Etat a décidé de restreindre l’accès à ces données à cinq demandes par jour et par personne, à effectuer par courriel. Une décision qui participe à l’opacité de cette situation.
            </p>

            <p className="text-lg mb-6">
              Le hameau et ses champs attenants, détenus ou convoités par Orllati, sont situés à côté de la zone industrielle de Vernand, où le constructeur nourrissait de grands projets de logements freinés par le Canton. Ils sont au coeur d’un secteur clé dont le développement est en train d’être repensé. Une partie est située sur le site d’une décharge où le constructeur enfouit la terre d’excavation des chantiers, dont personne ne sait plus que faire. “Tous les terrains qui ont une cuvette intéressent Orllati, relève un agriculteur. Son but est de les remplir. Pour 100’000 m3 à 15 balles le m3, je vous laisse faire le calcul… “
            </p>

            <Clear />
          </div>
        </section>

        {/* 9. Chapitre 8 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-8" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="8"
            title="Mais que fait la commission foncière rurale?"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              Au total, la société Henny Frères a acheté vingt parcelles agricoles pour plusieurs millions de francs. Et elle n’est pas la seule société liée à Orllati à fonctionner ainsi: selon nos recherches, deux autres sociétés anonymes au moins sont propriétaires de parcelles à Eclépens (où un site de développement d’activités industrielles est en cours d’élaboration), ou du côté d’Arnex-sur-Nyon, dans un secteur qui doit accueillir une future décharge. La première se nomme CRAFO SA. C’est Emmanuel Crausaz qui est désormais son président, mais jusqu’en 2024, elle était administrée par un autre personnage: Alexandre Fontannaz, qui n’est autre que le vice-syndic UDC de Bettens, commune voisine de Biolay-Orjullaz. Contacté….
            </p>
          </div>

          {/* Galerie 1 image, débordement moyen (med) */}
          <Gallery 
            placeholderCount={1}
            ratio="3/2"
            placeholderTxt="Eclépens"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            badge="Pour César - placer une video"
            badgeColor="rouge"
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              Pour un entrepreneur comme Orllati, l’achat de ces terrains relève souvent du coup de poker: un nouveau plan, un dézonage, une autorisation d’exploiter une décharge, et en avant le cash. Mais ces pratiques sont déloyales, et elles font du mal. Parce que la terre, à l’échelle paysanne, est aussi une affaire d’affect. 
            </p>

            <QuoteBlock 
              quote="QUOTE FONTANNAZ"
              author="Alexandre Fontannaz"
              accent="accent2"
            />

            {/* SideBlock à gauche (portrait) placé avant les 3 paragraphes pour float desktop correct */}
            <SideBlock 
              side="left"
              ratio="3/4"
              placeholderTxt="Illustration de Christian Aeberhard et Jean-Claude Mathey sur la base de photos?"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - Ressemblance OK"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              N’importe quel achat de terres agricoles doit en outre obtenir le feu vert de cette commission. Comment cet organe, censée faire appliquer la loi, a-t-il pu adouber des prêtes-noms aussi flagrants au service d’un grand groupe de construction?
            </p>

            <p className="text-lg mb-6">
              La révision de la loi sur le droit foncier rural, qui est en cours actuellement, va dans le sens de davantage de contrôles, pour vérifier notamment que les terres sont bien exploitées par la personne qui les a achetées. Aujourd’hui déjà, la commission foncière rurale a dix ans pour invalider une autorisation donnée sous de mauvais prétextes. Le fera-t-elle concernant les parcelles de Yens, de Vernand ou d’Eclépens? Contactée, la Commission foncière nous répond: 
            </p>

            <p className="text-lg mb-6">
              Confronté en 2021 déjà par heidi.news, la CFR1 avait promis qu’elle agirait rapidement. Son vice-président Christian Aeberhard, qui est également cadre chez Prométerre, s’était plaint alors: “Pourquoi, alors que tout le monde respecte les limitations de vitesse, vous ne vous intéressez qu’aux chauffards qui roulent à 160 sur l’autoroute?”. Cinq ans plus tard, rien ne semble avoir changé. La situation interroge d’autant plus “lorsqu’on connaît les demandes de justification parfois très invasives que peut exiger la CFR1 dans certains dossiers”, relève un agriculteur. 
            </p>

            <Clear />
          </div>
        </section>

        {/* 10. Chapitre 9 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-9" className="w-full my-12 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="9"
            title="Deux poids, deux mesures"
            ratio="16/7"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0 mt-12">
            
            <p className="text-lg mb-6 first-letter:text-8xl first-letter:font-bold first-letter:float-left first-letter:-mt-1.5 first-letter:mr-4 first-letter:leading-none first-letter:-mb-2">
              La situation est d’autant plus questionnante que certains rêvent de mettre la main sur des terres agricoles, non pas pour les détourner de leur fonction, mais pour les cultiver. C’est le cas de “néo-ruraux”, ces paysans qui ne sont pas issus du monde agricole et qui ont toutes les peines du monde à trouver un terrain exploitable à un prix décent. “Il faudrait élargir pour permettre aux néo-ruraux d’exploiter tout en serrant la vis autour de la spéculation, relève Alexia Tissière. Le paysage agricole va changer drastiquement durant les quinze prochaine années. L’Union suisse des paysans affirme que les prix sont limités par la LDFR. Mais il y a un immense marché spéculatif sous le tapis, où chacun y va de ses dessous de table. Les plus petits disparaissent, les plus grands augmentent.”
            </p>
          </div>

          {/* Composant de vidéo verticale centré (320px max-width) */}
          <VerticalVideo 
            videoSrc="https://cdn.jwplayer.com/videos/ZG7KJDpY-W5hRqR0L.mp4"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-4 md:px-0">
            <p className="text-lg mb-6">
              D’autres encore ambitionnent de devenir propriétaires de ce type de parcelles afin de les protéger. Une gageure, selon le secrétaire général de Pro Natura, Alberto Mocchi: “Notre organisation a acheté des millions d’hectares de terres agricoles dans les années 1970. Mais aujourd’hui, la CFR1 refuse systématiquement. Nous voulions par exemple acheter 20 hectares de terrain au Larzet, à Ormont-dessus. Ce sont des parcelles de prairies sèches qui ont une grande valeur en termes de biodiversité. L’idée n’est pas de les rendre à la nature - on n’a jamais fait ça - mais de les maintenir en exploitation.”
            </p>

            <QuoteBlock 
              quote="Il y a un immense marché spéculatif sous le tapis, où chacun y va de ses dessous de table. Les plus petits disparaissent, les plus grands augmentent."
              author="Alexia Tissière"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Ces témoignages illustrent parfaitement les immenses difficultés que rencontrent les personnes qui souhaitent sincèrement exploiter la terre, mais ne sont pas issues du monde paysan lorsqu’elles veulent acquérir des terres. Alors que le groupe Orllati, lui, y parvient sans peine grâce à son système opaque de prêtes-noms et d'investissements indirects.
            </p>

            <p className="text-lg mb-6">
              La question se pose de manière d’autant plus criante que le système des dessous-de-table et de l'argent occulte semble s'être généralisé dans le milieu foncier. 
            </p>

            <p className="text-lg mb-6">
              “En plus, il faut toujours payer des commissions sous la table, confie un agriculteur excédé. Tous les domaines qui ont une cuvette l’intéressent. Son but est de les remplir. Il descend et remonte le niveau de la terre comme bon lui semble. Pour 100’000 m3 à 15 balles le m3, vous laissez faire le calcul…”
            </p>

            <p className="text-lg mb-6">
              Alors même que la Commission foncière rurale dispose de dix ans pour révoquer des décisions d'autorisation litigieuses obtenues sous de faux prétextes, l'inertie de l'État laisse le champ libre à une spéculation rampante qui redessine silencieusement les campagnes romandes.
            </p>

            <Clear />
          </div>
        </section>

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
