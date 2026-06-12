import type { Metadata, Viewport } from "next";
import { STORY, ABSOLUTE_SOCIAL_URL } from "@/config/variables";
import { Header } from "@/components/Header";
import { MediaGrid } from "@/components/MediaGrid";
import { Image } from "@/components/Image";
import { SideBlock } from "@/components/SideBlock";
import { DetachableBlock } from "@/components/DetachableBlock";
import { HighlightBlock } from "@/components/HighlightBlock";
import { ChapterHeader } from "@/components/ChapterHeader";
import { ChapterHeader2 } from "@/components/ChapterHeader2";
import { Clear } from "@/components/Clear";
import { Authors3 } from "@/components/Authors3";
import { MapVis } from "@/components/MapVis";
import { LandfillInfographic } from "@/components/LandfillInfographic";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ActivityGrid } from "@/components/ActivityGrid";
import { VerticalVideo } from "@/components/VerticalVideo";
import { FlipCard } from "@/components/FlipCard";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { FramedContent } from "@/components/FramedContent";
import { RecipeBook } from "@/components/RecipeBook";
import { ZoningMap } from "@/components/ZoningMap";
import { Credits } from "@/components/Credits";
import LandPriceChart from "@/components/LandPriceChart";
import LandPriceIsometric from "@/components/LandPriceIsometric";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
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

        <div id="hero" className="bg-trame pt-8 pb-8 md:pt-20 md:pb-14 -mx-4 md:-mx-7 -mt-4 md:-mt-7">
          <div id="hero-container" className="w-full mx-auto max-w-6xl px-4 md:px-0 [@container]">
            <div className="flex justify-center select-none">
              <span className="inline-flex items-center px-1 md:px-4 py-0.5 md:py-2 rounded-none text-xs md:text-sm font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform hover:scale-105 transition-all duration-200 bg-accent2">
                Enquête
              </span>
            </div>
            <h1 className="text-center text-[clamp(1.5rem,6cqw,4rem)] leading-[1.083] tracking-tighter font-black mt-6 md:mt-10 antialiased">
              {(STORY.titleDisplay || STORY.title).split("<br>").map((line, i) => (
                <span key={i} className="block sm:whitespace-nowrap">
                  {line}
                </span>
              ))}
            </h1>
            <figure className="mt-10 md:mt-12 -mx-4 w-[calc(100%+2rem)] md:mx-auto md:w-full md:max-w-screen-2xl md:px-7 relative transition-all duration-300">
              <div className="absolute top-4 right-4 md:right-11 z-10 select-none">
                <span className="inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 bg-purple-600">
                  Pour Julie
                </span>
              </div>
              <Image 
                placeholderTxt="Illustration principale"
                ratio="16/9"
                className="rounded-none md:rounded-lg"
              />
            </figure>
            <div className="w-full max-w-[672px] mx-auto mt-8 md:mt-12 text-gray-800 leading-relaxed">
              <h2 className="font-medium text-xl md:text-2xl">Par le biais de sociétés dont le but est l’agriculture, le promoteur vaudois également actif dans les décharges et le béton fait l’acquisition de parcelles qui devraient être réservées aux exploitants agricole. Avec des avantages stratégiques et financiers à la clé.</h2>
            </div>
            
            <Authors3 
              authors={STORY.credits
                .filter(credit => credit.isAuthor)
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
        <section id="introduction" className="w-full max-w-[672px] mx-auto mt-12 md:mt-20 text-gray-800 leading-relaxed">
          <p className="text-lg mb-6 lettrine">
            Tout est parti d’un bruit. Le genre d’info qui galope de village en village, et que les gens répètent avec un regard lourd de sous-entendus: “<span className="italic">Vous savez quoi? Le neveu d’Orllati a passé son CFC d’agriculteur</span>”.  Orllati / agriculture. A priori, deux mondes que tout oppose. D’un côté, l’un des plus gros acteurs de la construction romands, actif également dans la promotion immobilière, les décharges et le béton. De l’autre, cette pratique ancestrale qui consiste à travailler la terre pour nourrir le peuple. 
          </p>
          <p className="text-lg mb-6">
            Mais dans un minuscule pays blindé de monde, où certains ne voudraient même plus laisser entrer personne, la frontière entre ces deux univers est aussi poreuse que la brique ou le ciment. Pour loger les gens, il faut construire. Et pour construire, il faut faire de la place: creuser, détruire - donc générer des déchets. C’est ici que les terres agricoles entrent en jeu: à la campagne, on trouve des lieux où ouvrir des gravières (pour faire du béton) et des décharges (pour enfouir ce qui sort des chantiers). Dans certains cas, on peut aussi tabler sur du long terme: un changement d’affectation, qui transforme des terres agricoles achetées à très bas prix en poule aux oeufs d’or - une zone constructible.
          </p>

          <DetachableBlock
            ratio="16/9"
            caption="Test de la carte détachable (zoning)."
            title="Itinéraire de notre récit"
          >
            <ZoningMap />
          </DetachableBlock>

          <p className="text-lg mb-6">
            Avec mon collègue Antoine Harari, nous avons a arpenté le canton de Vaud pendant des mois, de parcelle en parcelle et de ferme en ferme. Notre constat? Alors qu’elles sont censées être protégées par la loi, les terres agricoles sont à la merci des constructeurs et exploitants de décharges et gravières. Grâce à un système “<span className="italic">d’hommes de paille</span>” paysans, à la tête de sociétés anonymes, Orllati arrive à faire l’acquisition de parcelles qui devraient rester entre les mains d’agriculteurs.
          </p>
          <p className="text-lg mb-6">
            Cela signifie que les gardes-fous mis en place par l’Etat ne fonctionnent pas. A commencer par la Commission foncière rurale (CFR I), cet organisme à qui le gouvernement délègue la tâche d’autoriser ou non l’achat de terres agricoles. Dans les campagnes, les manoeuvres pour l’achat des terres les plus prometteuses financièrement battent leur plein, au détriment des paysans, et de notre système démocratique. Voici notre enquête.
          </p>
        </section>

        {/* 2. Chapitre 1 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-1" className="w-full mt-16 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="1"
            titlePart1="Gros-de-Vaud"
            titlePart2="«D’ici dix ans, Orllati possédera 15 à 20% des terres vaudoises»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte et photos flottantes du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            <p className="text-lg mb-6 lettrine">
             C’est une cuisine immaculée comme on en trouve souvent dans les fermes vaudoises, avec la machine à café qui ronronne par intermittence. Assis à l’autre bout de la table, Eric* secoue la tête, ses grandes mains aux ongles terreux croisées devant lui: “<span className="italic">Orllati, c’est le huitième conseiller d’Etat. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jamais avoir une exploitation agricole dans le canton.</span>”
            </p>


            <QuoteBlock 
              quote="Orllati, c’est le huitième conseiller d’Etat. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jam  ais avoir une exploitation agricole dans le canton."
              author="Eric, agriculteur (nom d'emprunt)"
              info={undefined}
              accent="accent2"
            />

           

            <p className="text-lg mb-6 ">
              Alentours, le paysage du Gros-de-Vaud est morose en ce vendredi de février. Du brun et du vert délavés, un ciel bas au-dessus des chemins boueux, quelques restes de neige. Si nous sommes venus voir Eric, c’est parce qu’il connaît bien le promoteur Orllati. Comme beaucoup de paysans, il a côtoyé Avni, le fondateur et administrateur délégué de la société, dans le cadre de la vente ou de la location de terres agricoles.  
            </p>

            <MediaGrid 
              placeholderCount={1}
              ratio="3/2"
              placeholderTxt="Illustration 'Chez Eric'"
              overflow="low"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - Ressemblance OK"
              badgeColor="violet"
            />

            <p className="text-lg mb-6">
              Actif dans la construction, la promotion immobilière, les décharges et le béton, le groupe que dirige Avni Orllati est l’acteur le plus puissant du canton dans son domaine, avec 400 millions de francs de chiffre d'affaires. A ses débuts dans l’immobilier, l’entreprise sise à Biolay-Orjullaz s’était spécialisée dans la reconversion de friches industrielles. Comme celle de l’ancien laboratoire Kodak de Renens,  transformé il y a une quinzaine d’années en un espace mixte qui abrite, entre autres, le Ministère public. Mais “<span className="italic">aujourd’hui, ce type de projet ne fonctionne plus</span>”, relève Eric. En effet, le Canton souhaite désormais conserver ses zones dévolues à l’industrie. Orllati a donc opéré un virage hors des grands centres urbains, où il a réalisé d’importants projets immobiliers, dont l’écoquartier de Gruvatiez à Orbe inauguré en 2021.
            </p>
          </div>

          <MediaGrid 
            images={["images/orllati/renens/50_Orllati_Renens.jpg"]}
            ratio="3/2"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Pour une entreprise avec un tel profil, certains terrains sis en zone agricole valent de l’or. On y trouve du gravier nécessaire à la fabrication du béton, des trous où enterrer les déchets, des futurs sites où construire en cas de changement d’affectation. Mais à la campagne, les terres appartiennent généralement à des paysans. Un monde où le silence résonne comme une évidence: à quatre reprises au moins, des paysans qui avaient accepté de nous rencontrer ont annulé le rendez-vous à la dernière minute, estimant qu’il était trop dangereux pour eux de s’exprimer, même sous le couvert de l’anonymat.
            </p>
          </div>

          <HighlightBlock 
            title="Titre infographie comment il se fait du pognon (domaines d’activité)"
            text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos, ex magni harum corrupti placeat soluta consequuntur ea dolorem exercitationem dolores"
            badge="Pour Julie. (dos des carte présent!)'"
            badgeColor="violet"
          >
            {/* <ActivityGrid /> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Décharges</h3>
                      <p className="text-black leading-relaxed font-light">
                        En raison de son explosion démographique, le canton de Vaud ne sait plus que faire de ses déchets de chantier. Cinq des 28 décharges vaudoises sont exploitées à ce jour par Orllati, qui compte encore s’étendre avec des projets à Chavornay et à Daillens/Oulens. Le second doit aussi accueillir des scories de l’usine d’incinération lausannoise Tridel.
                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Décharges" />
              </FlipCard>

              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Gravières</h3>
                      <p className="text-black leading-relaxed font-light">
                        Le sable, que l’on trouve sous les forêts et les champs, est un élément clé de la composition du béton. C’est dire si les sites qui contiennent du gravier sont précieux pour un groupe comme Orllati, qui possède une centrale à béton. Mais les citoyens se rebiffent comme récemment à La Chaux, près de Cossonay.

                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Gravières" />
              </FlipCard>

              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Promotion immobilière</h3>
                      <p className="text-black leading-relaxed font-light">
                        Le groupe Orllati développe des projets immobiliers et des quartiers entiers, dans le canton de Vaud et ailleurs.  C’est lui qui porte notamment un projet de tour arborisée de 117 mètres de haut à Chavannes-près-Renens ou le campus Plein Sud à Estavayer, dans le canton de Fribourg. 

                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Promotion immobilière" />
              </FlipCard>

              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Construction</h3>
                      <p className="text-black leading-relaxed font-light">
                       Arrivés en Suisse à l’âge de 14 ans, les frères jumeaux Avni et Basri Orllati ont commencé à travailler dans la démolition en 1995, avant d’acquérir des machines de chantier et se spécialiser dans le gros œuvre et le génie civil. Ce n’est que dix ans plus tard qu’ils acquièrent des terrains en vue de la promotion immobilière.

                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Construction" />
              </FlipCard>

              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Géothermie</h3>
                      <p className="text-black leading-relaxed font-light">
                       Le canton de Vaud concentre le plus grand nombre de projets géothermiques subventionnés par la Confédération. Dans ce domaine en plein essor, Orllati figure en pole position. En mai 2026, le groupe a annoncé l’investissement de 4,25 millions de francs dans un forage exploratoire à Assens.
                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Géothermie" />
              </FlipCard>

              <FlipCard 
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Activités annexes</h3>
                      <p className="text-black leading-relaxed font-light">
                       En sus des autres secteurs, le groupe Orllati est également actif dans le désamiantage, le métal et les travaux ferroviaires. À Bioley-Orjulaz, il gère en outre une plateforme de lavage des matériaux d’excavation pollués. En 2020, il a ussi annoncé la création d’un centre romand pour la valorisation de scories, en partenariat avec Cridec et Tridel. 

                      </p>
                    </div>
                    <span className="text-[9px] text-black/50 font-mono block mt-2">Cliquez pour retourner</span>
                  </div>
                }
              >
                <Image ratio="1/1" placeholderTxt="Carte Activités annexes" />
              </FlipCard>
            </div>
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              A la campagne, les terres cultivables et leurs fermes appartiennent par définition aux agriculteurs, qui sont censés se les passer de main en main, avec l’aval de la Commission foncière rurale. Cette dernière est chargée de délivrer les autorisations pour l’acquisition de tous les terrains situés en zone agricole. Un monde où le silence est un second langage: à quatre reprises au moins, des paysans qui avaient accepté de nous rencontrer ont annulé le rendez-vous à la dernière minute, estimant qu’il était trop dangereux pour eux de s’exprimer, même sous le couvert de l’anonymat.
            </p>

            <p className="text-lg mb-6">
              “<span className="italic">J’ai un partenaire qui représente 300’000 à 800’000 francs par année pour moi. Il m’a dit: si tu parles d’Orllati, je fais plus affaire avec toi. Je risque la faillite</span>”, nous a expliqué l’un d’entre eux, qui aurait pourtant eu beaucoup de choses à raconter. Il lâche, malgré tout: “<span className="italic">Dans ma région, 60% des agriculteurs arrivent en bout de course dans les cinq prochaines années. D’ici dix ans, Orllati possédera 15 à 20% des terres vaudoises</span>”.
            </p>
          </div>
        </section>

        

        {/* 4. Highlight Block (Plein écran sur 1536px max) */}
        {/* <HighlightBlock title="Les propriété d'Orlatti ne sont pas toujours acquises de manière top moumoute">
          <MapVis />
        </HighlightBlock> */}

        {/* 3. Chapitre 2 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-2" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="2"
            titlePart1="Moudon"
            titlePart2="«On se demandait ce que le neveu d’Avni Orllati allait faire d’un CFC d’agriculteur»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            <SideBlock 
              side="right"
              ratio="3/4"
              placeholderText="Illustration sur la base de photo : le neveu"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - Ne pas représenter réellement le neveu"
              badgeColor="violet"
            />

            <p className="text-lg mb-6 lettrine">
              Dans ce contexte que personne ne semble ignorer, une anecdote fait grenouiller la campagne depuis des mois, de la Côte au Gros-de-Vaud. “<span className="italic">Allez voir au village, les paysans ne parlent que de ça</span>”, assure Eric. Parmi les soixante diplômés en agriculture du centre de formation de Granges-Verney en juin 2025, un nom clignote comme sur un fond turquoise. C’est celui fils du frère jumeau d’Avni. Ce jeune père de famille de 26 ans travaillait il y a peu en tant que logisticien dans l’entreprise familiale, d’après un article publié en 2021 dans le magazine mensuel des chauffeurs professionnels où il vante les mérites d’un camion balayeur-nettoyeur dernier cri.    
            </p> 
            <p className="text-lg mb-6">
              Dans le milieu paysan, le profil est insolite: “<span className="italic">Évidemment qu’on en parlait. On se demandait ce qu’il allait bien pouvoir faire d’un CFC d’agriculteur</span>”, souffle un diplômé de la même volée. “<span className="italic">J’ai essayé de le cuisiner, raconte un autre. C’est quelqu’un d’hyper sympa, avec de l’entregent. Il arrivait aux cours avec une grosse BMW et il disait qu’il avait envie d’une vie plus simple, plus proche de la terre. Je pense qu’il était dans une vraie démarche de compréhension de la profession, mais personne n’a réussi à en savoir davantage. Il me semble qu’il n’avait pas de projet précis pour la suite.</span>” 
            </p>
          </div>

          <MediaGrid 
            images={[
              "images/orllati/moudon/56_Orllati_Moudon.jpg",
              "images/orllati/moudon/63_Orllati_Moudon.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Déjà titulaire d’un CFC, le neveu a effectué la seconde partie de son apprentissage chez Jacques Gottofrey, un ancien conseiller communal UDC et agriculteur à Echallens, qui est également le président de l’association romande de lutte suisse. Nous l’avons contacté, et voici ce qu’il nous a dit: “<span className="italic">C’est un très bon chauffeur. On m’a demandé de le prendre suite à une interruption de son stage chez un paysan à Fribourg. Son rêve c’était de monter une petite ferme éducative avec quelques bâches et chèvres et moutons et être tranquille</span>”. 
              Mais l’agriculteur admet ne plus avoir eu de nouvelles depuis plusieurs années et avoir simplement entendu qu’il “<span className="italic">avait monté une société de réparation de machines agricoles</span>”.

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
              En effet, deux sociétés ont été inscrites tout récemment  au registre du commerce vaudois, avec le neveu comme administrateur.  L’une a pour but les travaux agricoles, l’autre l’exploitation d'un atelier mécanique et l'importation de machines. Toutes deux peuvent par ailleurs acheter et vendre des immeubles et parcelles agricoles en vertu de la Loi sur le droit foncier rural, ce qui nécessite un numéro d’exploitant -  qui va généralement de pair avec un CFC. Dans la seconde société, “<span className="italic">le neveu</span>” n’est pas seul: il est associé à un jeune agriculteur du nord-vaudois, actionnaire majoritaire, ainsi qu’à un Fribourgeois répondant au nom d’Emmanuel Crausaz. Selon plusieurs sources concordantes, c’est chez cet éleveur que le neveu a fait la première partie de son apprentissage. Nous retrouverons son nom tout au long de cette enquête, car il joue un rôlé clé dans l’accès du groupe Orllati à des parcelles agricoles.  
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
        <section id="chapitre-3" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="3"
            titlePart1="Arnex-sur-Nyon"
            titlePart2="«A cinq francs le mètre carré, ça lui coûte moins cher d’acheter les terrains»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            <p className="text-lg mb-6 lettrine">
              Si l’obtention d’un CFC d’agriculteur par le “<span className="italic">neveu de</span>” suscite autant d’interrogations, ce n’est pas juste parce que le jeune homme est hors sérail. Dans les villages, le groupe fondé par son père et son oncle est connu pour faire appel à des “<span className="italic">hommes de paille</span>” paysans. Un manque de contrôle permet en effet  à des entreprises actives dans l’immobilier, les décharges ou la production de béton d’acquérir des parcelles censées rester entre les mains d’agriculteurs.  Dans le cadre de la <a href="https://www.ekm.admin.ch/fr/newnsb/zvgtbwfMkA2r71bm8bOlT" target="_blank" rel="noopener noreferrer" className="font-bold underline underline-offset-2 hover:text-[#E20000] hover:text-accent2 transition-colors duration-200">révision de la Loi sur le droit foncier rural</a> (LDFR) l’automne dernier, le Conseil fédéral a pourtant été clair: il veut “<span className="italic">renforcer le principe de l’exploitation à titre personnel, selon lequel les immeubles agricoles doivent être exploités par les personnes qui les ont acquis.</span>”
            </p>
          </div>

          <HighlightBlock 
            title="La recette d'une bonne infiltration"
            
          >
            <RecipeBook className="mt-8 md:mt-10" />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <SideBlock side="right" className="mb-8 md:mb-6">
              <FramedContent 
                title="En janvier 1994, la Loi sur le droit foncier rural (LDFR)"
                description="est entrée en vigueur, avec trois objectifs principaux: encourager la propriété foncière rurale et maintenir les entreprises familiales, lutter contre les prix exagérés des parcelles agricoles et la spéculation, et  renforcer la position du paysan exploitant à titre personnel (y compris celle du fermier) en cas d’acquisition de terres ou de domaines. Selon la jurisprudence du Tribunal fédéral, une société anonyme peut toutefois acquérir des parcelles et bâtiments situés en zone agricole, à condition que la majorité des personnes qui la détiennent remplissent les exigences de l’exploitation à titre personnel - soit qu’elles possèdent les qualités professionnelles pour mettre en valeur les terrains. Ajoutons que la volonté d’exploiter personnellement les terres doit exister non seulement lors de l’octroi de l’autorisation d’acquérir, mais aussi sur le long terme."
                className="my-0 mt-0 mb-0"
              />
            </SideBlock>

            <p className="text-lg mb-6 font-light">
              Ce garde-fou est censé éviter que les terres agricoles ne fassent l’objet de spéculation foncière ou soient détournées de leur usage. Mais apparemment, il est facile de s’asseoir dessus, du moins dans le canton de Vaud. Comment? En s’adjoignant les services d’agriculteurs avec des parts majoritaires dans des sociétés anonymes pilotées en sous-marin, dont le but officiel est de faire de l’agriculture. Autrement dit, des paysans au service d’entités extérieures au monde agricole, qui jouent parfois le simple rôle de figurant habilités à signer, contre rémunération ou garantie d’exploiter les terrains pour la culture ou l’élevage - en attendant que le nouveau propriétaire puisse en faire usage. 
            </p>

            <p className="text-lg mb-6">
              Selon la jurisprudence du Tribunal fédéral, une société anonyme peut en effet acquérir des parcelles et bâtiments situés en zone agricole, à condition que la majorité des personnes qui la détiennent remplissent les exigences de l’exploitation à titre personnel - soit qu’elles possèdent les qualités professionnelles pour mettre en valeur les terrains. Ajoutons que la volonté d’exploiter personnellement les terres doit exister non seulement lors de l’octroi de l’autorisation d’acquérir, mais aussi sur le long terme.
            </p>

            <QuoteBlock 
              quote="A cinq francs le prix licite au mètre carré, ça lui coûte moins cher d’acheter les terrains que de payer les propriétaires au mètre cube durant toute l’exploitation de la décharge"
              author="Un agriculteur du district de Nyon"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Dans le district de Nyon, à la frontière avec le canton de Genève, 15 hectares (l’équivalent d’une vingtain de terraines de foot) de surface agricole jouxtant l’autoroute sont propriété d’une société agricole apppelée Porla. Inscrite au registre du commerce, cette SA est présidée par Miguel Sanchez, qui figure également au conseil d’administration du groupe Orllati. Cet acteur-clé de l’entreprise de Biolay-Orjulaz, qui a également travaillé pour Holcim, partage la gestion de Porla SA avec trois paysans de la région.
            </p>
          </div>

          {/* <HighlightBlock 
            title="Prix des terrains: l’exemple genevois"
            text="Prix maxima licites de vente pour les immeubles agricoles soumis à la loi fédérale sur le droit foncier rural fixés par la La commission foncière agricole pour l’année en cours:"
            badge="Pour César"
            badgeColor="rouge"
          >
            <LandPriceChart />
          </HighlightBlock> */}

          

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Par une après-midi de mai écrasée de soleil, nous nous rendons dans la région où différentes sources proches du dossier nous confirment que c’est bien Orllati qui est (indirectement) propriétaire des parcelles en question. Comme dans d’autres exemples, des agriculteurs avaient le droit de préemption (priorité pour l’achat, nldr), mais pas les fonds. “<span className="italic">Orllati est correct, souffle un paysan, que nous croisons près de sa ferme. Il nous rafle les terres sous le nez, mais il ne les cultive pas.</span>” Un autre ajoute: “<span className="italic">J’ai fait un deal parce que ça m’arrangeait. Je ne vais pas mettre un coup de pied dans la fourmilière maintenant.</span>”
            </p>
          </div>

          <HighlightBlock
            title="Prix des terrains: l’exemple genevois"
           
          >
            <LandPriceIsometric />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-8">
            <SideBlock side="right" className="mb-8 md:mb-6">
              <FramedContent 
                title="Fixé par la Commission foncière rurale, le prix licite"
                description="est le prix maximum qu’un acheteur peut payer pour un bien agricole. En l’occurence, les deux parcelles situées sur le site de la décharge recouvrent une surface de quelque 15 hectares (l’équivalent d’une vingtain de terraines de foot). Leur valeur est donc d’environ 750 000 francs. Au vu du nombre de mètres cubes prévus pour l’exploitation (1,3 million), et du prix des déchets (entre 35 et 100 francs le mètre cube pour des déchets de type A et B) elle pourrait rapporter au propriétaire un revenu brut de 50 millions de francs."
                className="my-0 mt-0 mb-0"
              />
            </SideBlock>

            <p className="text-lg mb-6">
              Orllati ne cultive pas les terres, mais il projette, bien sûr, d’en tirer profit autrement. La zone où se situent les parcelles en question doit en effet accueillir à terme une décharge de matériaux d’excavation (déchets de chantier) pas ou faiblement pollués. Autrefois porté par un autre spécialiste du secteur, la société Ronchi basée à Gland, le projet est désormais entre les mains du géant de Biolay-Orjulaz. Un paysan ajoute: “<span className="italic">A cinq francs le prix licite au mètre carré, ça lui coûte moins cher d’acheter les terrains que de payer les propriétaires au mètre cube durant toute l’exploitation de la décharge. Et puis, une fois que le trou est bouché, les terres pourront être cultivées à nouveau.</span>”
            </p>

            <p className="text-lg mb-6">
              Le groupe Orllati exploite à ce jour cinq des 28 décharges que compte le canton de Vaud. Cela fait de lui un acteur majeur du secteur, qui compte une multitude de petits exploitants. Et le seigneur de Biolay-Orjullaz va encore s’étendre, avec des projets à Chavornay et à Daillens/Oulens. En raison de son explosion démographique, Vaud ne sait plus que faire de ses déchets de chantier. “<span className="italic">Tous les terrains qui ont une cuvette intéressent Orllati, relève un agriculteur. Son but est de les remplir.</span>”
            </p>

            <p className="text-lg mb-6">
              Dans ce domaine, la méthode traditionnelle consiste, pour les exploitants de décharge, à signer des conventions avec les propriétaires des terrains, qui sont rémunérés le temps de l’exploitation. Etant donné la concurrence féroce qui règne dans le milieu, acheter directement les terres semble non seulement avantageux financièrement, mais également plus sécure.
            </p>
          </div>

          {/* <HighlightBlock 
            title="INFOG Le business des décharges est lucratif"
            badge="Pour César (à terminer selon storyboard à venir)"
            badgeColor="jaune"
          >
            <LandfillInfographic />
          </HighlightBlock> */}

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-8">
            <p className="text-lg mb-6">
              De plus, comme les actionnaires majoritaires de la société sont officiellement des exploitants à titre personnel, ils peuvent acquérir directement les terrains. Un non-exploitant pourrait aussi prétendre à l’achat, mais uniquement à condition qu’il n’y ait pas de paysans sur le coup. C’est ce qu’avait fait Orllati pour des parcelles situées à Blonay dans le cadre de l’acquisition de l’ancienne clinique de Mottex, comme Blick l’avait raconté l’an dernier.
            </p>
          </div>

          <MediaGrid 
            images={[
              "images/orllati/blonay/03_Orllati_Blonay.jpg",
              "images/orllati/blonay/04_Orllati_Blonay.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-8">
            <p className="text-lg mb-6">
              Selon nos informations, Orllati Real Estate avait alors dû convaincre quatre agriculteurs, qui s’étaient portés acquéreurs, de retirer leurs offres en échange d’un autre terrain ou de la possibilité d’exploiter provisoirement les parcelles en question. Avec des paysans de paille, exit la concurrence, les contreparties, et les appels d’offre publiés dans la FAO. Autrement dit, du pain bénit pour Orllati. 
            </p>
          </div>
        </section>

        {/* 5. Chapitre 4 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-4" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="4"
            titlePart1="Boussens"
            titlePart2="«Beaucoup de paysans vivent une crise identitaire»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            

            <SideBlock 
              side="left"
              ratio="3/4"
              placeholderTxt="Roger et Victor"
              caption="Lorem ipsum dolor sit amet."
              badge="Pour Julie - base photo pas ok!!"
              badgeColor="violet"
            />

            <p className="text-lg mb-6 lettrine">
              C’est cette méthode plus directe, et moins visible, qu’Orllati a commencé à appliquer en 2016 à travers la création de Henny Frères SA, du nom de deux frères agriculteurs du Gros-de-Vaud que nous nommerons Roger* et Victor*. Selon ses statuts, les actions de cette société ne peuvent être détenues majoritairement que par des exploitants agricoles ou viticoles à titre personnel. Le transfert des actions et certaines modifications des statuts sont soumis à l’approbation de la Commission foncière rurale, soit l’organe auquel le Conseil d’Etat vaudois délègue l’application de la Loi sur le droit foncier rural.  
            </p>

            <p className="text-lg mb-6">
              De source sûre, Roger était un ancien employé d’Orllati. Pas assez riche pour acheter un domaine, lui et son frère auraient accepté d’entrer dans Henny frères SA en échange d’un morceau de terrain à cultiver. Mais Orllati, qui aurait même avancé le capital de départ, n’aurait pas rempli ses engagements. En 2019, excédé par les promesses non tenues, Roger est parti et a été remplacé au Conseil d’administration par Emmanuel Crausaz, le lutteur aux lunettes noires que nous avons introduit dans le premier chapitre. 
            </p>

            <QuoteBlock 
              quote="Beaucoup de paysans sont vulnérables d’un point de vue relationnel. Chez les Orllati, on les écoute, on s’intéresse à leur réalité"
              author="Un agriculteur dans la précarité"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Quant au second frère, Victor, il a présidé Henny Frères SA depuis le départ de Roger. Après plusieurs appels du pied pour pouvoir quitter la société, il aurait donné sa démission tout récemment, initialement pour être remplacé par “<span className="italic">le neveu</span>”. Selon nos sources, la reprise du flambeau serait en stand-by. 
            </p>

            <p className="text-lg mb-6">
              Contactés, les deux frères ont refusé de répondre à nos questions. “<span className="italic">Je ne fais plus partie de la société</span>”, nous assure Victor, dont le nom figure pourtant toujours au Registre du commerce (RC). “<span className="italic">Pour moi, c’est de l’histoire ancienne</span>”, explique Roger avant de raccrocher.
            </p>

            <p className="text-lg mb-6">
              En arrière-plan de cette histoire, et d’autres récits que Blick a écoutés ces dernières semaines, on trouve cette fraction du monde agricole qui se débat avec des dettes, de la paperasse, des hypothèques. Et, parfois, une piètre image de soi. “<span className="italic">Beaucoup de paysans vivent une crise identitaire, ils ne se sentent pas reconnus, explique un jeune diplômé en agriculture. Ils sont vulnérables d’un point de vue relationnel. Chez les Orllati, on les écoute, on s’intéresse à leur réalité. Ils ont les moyens et l’aura pour emmener une partie du monde agricole derrière eux.</span>” 
            </p>

            {/* <QuoteBlock 
              quote="La plupart des autres agriculteurs du coin ne me parlent plus, parce qu’ils sont jaloux"
              author="Un paysan ayant fait des affaires avec Orllati"
              accent="accent2"
            /> */}

            <p className="text-lg mb-6">
              Dans les campagnes, ce choc entre économie rurale et spéculation fait des ravages au niveau des relations entre voisins, selon plusieurs personnes avec qui nous avons échangé. Quand le promoteur n’achète pas les terres, directement ou via des sociétés anonymes, elles sont en effet louées sur la base de conventions, le temps d’exploiter la gravière ou la décharge. Une méthode plus classique, mais semeuse de discorde. “<span className="italic">La plupart des autres agriculteurs du coin ne me parlent plus, parce qu’ils sont jaloux</span>”, explique un paysan qui a accepté de faire des affaires avec Orllati. 
            </p>
          </div>
        </section>

        {/* 6. Chapitre 5 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-5" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="5"
            titlePart1="Chardonne"
            titlePart2="«En principe, les parcelles sont doublement protégées en Lavaux»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Plus à l’est du canton, les villages de Chardonne et Corseaux offrent une vue sublime sur le Léman. Avec, au premier plan, les vignobles en terrasse d’où coule le “<span className="italic">joli vin blanc</span>” si cher au coeur des Vaudois. Un décor de carte postale qui se paie cher: sur la Riviera, les prix de l’immobilier sont plus élevés que la moyenne cantonale de près de 30%, selon une étude de la BCV de novembre 2025. A Corseaux, le coût d’une maison individuelle standard est de 2,2 à 2,3 millions de francs. 
            </p>

            <p className="text-lg mb-6">
              Sous l’autoroute A9, à cheval entre les deux villages, Henny Frères SA est l’heureuse propriétaire au registre foncier de six parcelles offrant un dégagement spectaculaire sur la plaine du Rhône. Autrefois occupées par des maraîchers, d’immenses serres y sont laissées à l’abandon depuis des années: les vitres sont cassées et des arbres poussent à l’intérieur. Juste en face, un petit immeuble a été rénové il y a deux ans pour devenir habitable, malgré sa situation en dehors de la zone à bâtir. Le reste des terrains est composé de vignes, situées dans la zone de Lavaux, qui est inconstructible et protégée dans la Constitution en tant que paysage exceptionnel, selon la volonté du peuple vaudois.  
            </p>
          </div>

          {/* Galerie 2 images, débordement élevé (high) */}
          <MediaGrid 
            images={[
              "images/orllati/corseaux/16_Orllati_Corseaux.jpg",
              "images/orllati/corseaux/24_Orllati_Corseaux.jpg"
            ]}
            ratio="3/2"
            overflow="med"
           
            className="mb-6"
          />

          <AutoplayVideo 
            videoSrc="https://cdn.jwplayer.com/manifests/qUOqzUvd.m3u8"
            ratio="3/2"
            overflow="med"
            className="-mt-2 mb-8 md:mb-12"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Le jour de notre visite, les Alpes sont encore nimbées d’une neige de printemps qui scintille au soleil. “<span className="italic">C’est Orllati qui est propriétaire, confirme d’entrée de jeu un ouvrier occupé à des travaux de terrassement devant les serres. Évidemment qu’il rêve de construire ici, mais je ne sais pas quand ce sera possible.</span>”
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
              De sources concordantes, cette vente porte également la griffe du lutteur Emmanuel Crausaz. Les parcelles concernées devaient être vendues aux enchères durant le Covid, à la suite de la faillite du propriétaire précédent, un entrepreneur genevois reconverti dans l’agriculture. “<span className="italic">J’aurais voulu racheter une partie des vignes, explique un habitant de Corseaux. La vente devait avoir lieu au cinéma Rex de Vevey. Mais sur place on a appris qu’Orllati avait tout racheté la veille. Il a dû mettre un bon prix.</span>” Il ajoute: “<span className="italic">C’est vraiment dommage de laisser ces serres à l’abandon. Des gens demandent souvent à la commune s’ils ne pourraient pas avoir un espace pour cultiver à l’intérieur.</span>” 
            </p>

            <p className="text-lg mb-6">
              Une situation qui interroge sachant que dans la pratique on considère qu’un exploitant doit se trouver à une quinzaine de kilomètres pour pouvoir acheter. Mais comme l’explique un paysan qui avait eu l’occasion de récupérer un terrain au nez et à la barbe d’…Emmanuel Crausaz et d’Orllati, “<span className="italic">En ce qui concerne les 14 kilomètres, normalement c’est à vol d’oiseau. Mais l’Etat l’applique un peu à son bon vouloir. En fait, l’oiseau, il peut voler plus à gauche ou plus à droite. Il semblerait que selon les districts ils l’appliquent pas la même chose</span>”.
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
              Nous avons contacté la fondation Franz Weber, qui couve Lavaux comme le plus précieux des trésors. Comment réagit-elle au fait que le groupe Orllati possède indirectement plusieurs parcelles en zone viticole protégée? “<span className="italic">Avec inquiétude</span>”, nous répond Anna Zangger, membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra. “<span className="italic">En principe, les parcelles colloquées en zone agricole (ou viticole) sont inconstructibles et doublement protégées, en Lavaux, par la Loi sur l’aménagement du territoire et la Loi sur le plan de protection de Lavaux. Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales.</span>” 
            </p>

            <QuoteBlock 
              quote="Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales."
              author="Anna Zangger, avocate membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              L’avocate de profession s’interroge en outre sur “<span className="italic">le mécanisme qui a permis à un groupe de promotion immobilière d’acquérir ces parcelles, même indirectement.</span>” Selon elle, “<span className="italic">ce type de montage mérite une vigilance particulière. Les communes et la Commission foncière doivent également prendre leurs responsabilités pour empêcher des projets immobiliers hors zone à bâtir, la protection de leurs villages et paysage, tout particulièrement en Lavaux, et éviter de manière générale le contournement des lois.</span>” 
            </p>

            <p className="text-lg mb-6">
              Quant à la commune de Chardonne, voici ce qu’elle répond, par l’intermédiaire de sa syndique Maria Alice Reymond: 
            </p>

            <Clear />
          </div>
        </section>

        {/* 7. Chapitre 6 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-6" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="6"
            titlePart1="Yens"
            titlePart2="«Le premier fautif, c’est l’Etat»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Ces entorses à (l’esprit de) la loi n’atteignent pas que le paysage. Elles touchent aussi les “<span className="italic">vrais</span>” paysans, qui font les frais des ambitions des mastodontes. Agriculteur à la retraite, Charles-Henri Fuchs a vécu durant vingt-cinq ans avec sa femme et ses quatre enfants à la Flogère, un domaine enchanté situé dans le district de Morges. Propriété d’Henny Frères SA depuis 2019, le complexe est depuis laissé à l’abandon, à l’image des serres de Lavaux. Lors de nos visites, seules quelques vaches appartenant à un agriculteur du coin étaient présentes dans le hangar, et la ferme était envahie de végétation. 
            </p>
          </div>

          {/* Galerie double débordement élevé (high) */}
          <MediaGrid 
            ratio="3/2"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            <Image src="images/orllati/yens/36_Orllati_Eclépens.jpg" ratio="3/2" />
            <AutoplayVideo videoSrc="https://cdn.jwplayer.com/manifests/5xPFHaFs.m3u8" ratio="3/2" bare />
          </MediaGrid>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Sur un mur du salon (immaculé) de l’appartement de Montricher où Charles-Henri Fuchs vit désormais avec son épouse, on trouve une photographie de l’exploitation durant ses grandes années. Arrivé en 1992, l’agriculteur était actif dans l’engraissement de taureaux et les cultures: blé, orge, maïs, colza. Il n’a jamais été propriétaire de la Flogère. Le domaine était en mains d’une héritière du groupe Von Roll, vestige d’une époque où les industriels s’offraient des biens immobiliers au milieu des vallons. “<span className="italic">En 2013, une façade de la maison menaçait de s’effondrer, raconte Charles-Henri Fuchs devant une tasse de café. La propriétaire a voulu vendre, pour 2,8 millions. Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs.</span>”
            </p>

            <QuoteBlock 
              quote="Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs"
              author="Charles-Henri Fuchs, agriculteur"
              accent="accent2"
            />

            {/* SideBlock à droite (vidéo portrait) placé avant les 3 paragraphes pour float desktop correct */}
            <SideBlock 
              side="right"
            >
             <VerticalVideo 
              videoSrc="https://cdn.jwplayer.com/manifests/OMQ2B8Qw.m3u8"
              caption="Lorem ipsum dolor sit amet."
            />
            </SideBlock>

            <p className="text-lg mb-6">
              En tant qu’exploitant au bénéfice d’un bail à ferme durant de nombreuses années, Charles-Henri Fuchs aurait pourtant été prioritaire pour le rachat du domaine. 
            </p>

            <p className="text-lg mb-6">
              Mais au lieu de cela, il a assisté, impuissant, à un étrange ballet: “<span className="italic">D’abord, la maison bernoise Marti (active dans la construction ndlr) est arrivée, avec un paysan de Lucerne nommé Urs Bernet. Je pensais qu’ils allaient faire une offre d’achat, mais il ont seulement loué, et ce Monsieur Bernet m’a engagé comme employé durant quelques années, avant de résilier mon contrat au motif que je coûtais trop cher.</span>” 
            </p>

            <p className="text-lg mb-6">
              Urs Bernet n’est pas n’importe qui. Selon un article publié en 2016 par la Luzerner Zeitung, il a été durant des années une figure majeure de l’industrie du gravier dans l’arrière-pays lucernois, ainsi que l’un des plus importants éleveurs du canton. Autrement dit, le mélange des genres n’est pas l’apanage d’Orllati, ni même des Vaudois. 
            </p>

            <p className="text-lg mb-6">
              Le présence à la Flogère de cette personnalité controversée dans son canton, qui a subitement disparu des radars en 2016, n’est pas un hasard. Car ce domaine est situé au-dessus d’un important gisement de gravier, dans la prolongation du bois de Ballens, occupé en 2024 par des activistes du mouvement Grondements des terres. Comme l’avait révélé heidi.news en 2021, les géants Holcim et Orllati s’y font la guerre pour la maîtrise des parcelles porteuses de revenus colossaux. 
            </p>

            

            <QuoteBlock 
              quote="Je leur ai dit, aux gens de l’Etat: les premier fautifs de cette situation, c’est vous."
              author="Charles-Henri Fuchs, agriculteur"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              A la Flogère, ce sont les hommes d’Orllati qui ont succédé à ceux du Bernois Marti. Sans surprise, notre Fribourgeois Emmanuel Crausaz était présent lors de la visite en vue de l’acquisition, mais pas seulement. Selon Pierre-Henri Fuchs, une personnalité de poids s’est également rendue sur les lieux à cette occasion: Pierre-François Veillon, qui fut conseiller d’Etat, puis conseiller national sous la bannière de l’UDC, avant de retourner à son bureau de comptabilité et de gestion agricole à Bex. Un nom que l’on retrouve dans le cadre de la vente des Ursins, ce somptueux domaine situé dans le district de Morges dont nous vous racontions l’histoire récemment. A quel titre était-il impliqué dans ces ventes? Contacté, il….
            </p>
          </div>

          {/* Galerie double débordement élevé (high) */}
          <MediaGrid 
            images={[
              "images/orllati/foret1.jpg",
              "images/orllati/foret2.jpg"
            ]}
            ratio="3/2"
            placeholderTxt="Photos archives. Camille arrive avec"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Contrairement à sa femme, qui n’a “<span className="italic">jamais pu y remettre les pieds</span>”, Charles-Henri Fuchs est retourné plusieurs fois sur les lieux où ses enfants ont grandi. Parce qu’il “<span className="italic">veillait à toujours garder tout en ordre</span>”, l’état d’abandon où la ferme a été laissée l’affecte. Mais cela s’arrête là. “<span className="italic">Mon fils s’était déjà projeté dans une reprise de l’exploitation, donc ça été plus dur pour lui que pour moi. Il serait du reste toujours intéressé à s’investir sur place.</span>” 
            </p>

            <p className="text-lg mb-6">
              Récemment, l’agriculteur et son épouse ont été entendus par la commission du Grand Conseil qui planche sur les problèmes au sein de la Commission foncière rurale, révélés notamment par des enquêtes de Blick. S’il n’a pas beaucoup parlé, Charles-Henri Fuchs a tenu à s’exprimer sur un point qui lui tient à coeur “<span className="italic">Je leur ai dit, aux gens de l’Etat: les premier fautifs de cette situation, c’est vous.</span>”
            </p>

            <Clear />
          </div>
        </section>

        {/* 8. Chapitre 7 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-7" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="7"
            titlePart1="Lausanne"
            titlePart2="«J’ai 90 ans et je ne veux pas parler de ça parce que ça me rend triste»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Avant de poursuivre, un petite parenthèse législative s’impose. En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux: encourager la propriété foncière rurale et maintenir les entreprises familiales, lutter contre les prix exagérés des parcelles agricoles et la spéculation, et  renforcer la position du paysan exploitant à titre personnel (y compris celle du fermier) en cas d’acquisition de terres ou de domaines.   
            </p>

            <p className="text-lg mb-6">
              La LDFR comprend des exceptions: son article 64 stipule ainsi qu’il est possible de déroger au principe de l’exploitant à titre personnel lorsque l’achat a pour but d’exploiter les ressources du sol permise par le droit de l’aménagement du territoire, ce qui est le cas du gravier. En théorie, Orllati aurait donc pu acheter la Flogère directement, sans passer par ses hommes de paille.  Sauf que la loi comporte un obstacle de taille: si le terrain n’est pas utilisé dans les quinze ans à compter de son acquisition, il doit être revendu. Or, le domaine des gravières est mouvant, incertain, tendu. Il souffre notamment des rebuffades des citoyens, qui refusent de cautionner le béton ou la détérioration de leur environnement direct. Mieux vaut donc acheter sous l’étiquette d’un paysan.
            </p>
          </div>

          {/* Galerie full débordement, 2 images */}
          {/* <MediaGrid 
            images={[
              "images/orllati/vernand/42_Orllati_Vernand-Dessous.jpg",
              "images/orllati/vernand/44_Orllati_Vernand-Dessous.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          /> */}

          <AutoplayVideo 
            videoSrc="https://cdn.jwplayer.com/manifests/mrrzdYkY.m3u8"
            ratio="16/9"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Outre les vignes de Lavaux et le “<span className="italic">ranch</span>” de la Flogère, Henny Frères a acheté plusieurs terrains agricoles près de la zone industrielle de Vernand, dans l’Est lausannois, entre 2017 et 2021. L’une d’entre elles a coûté plusieurs millions, car elle était grevée d’hypothèques. Au moment de l’acquisition, des terrains étaient exploités par un paysan, qui aurait pu se revendiquer du droit de préemption. Au lieu de cela, la parcelle a été vendue à Henny frères SA et l’agriculteur a signé un contrat pour pouvoir continuer à exploiter. Contacté, il n’a pas souhaité s’exprimer. De sources concordantes, le paysan n’avait pas les moyens financiers pour s’aligner.
            </p>

            {/* <QuoteBlock 
              quote="Tous les terrains qui ont une cuvette intéressent Orllati, relève un agriculteur. Son but est de les remplir. Pour 100’000 m3 à 15 balles le m3, je vous laisse faire le calcul… "
              author="Un agriculteur"
              accent="accent2"
            /> */}

            <p className="text-lg mb-6">
              Par le biais de la même société anonyme, le seigneur de Biolay-Orjulaz a également fait l’acquisition d’une belle ferme située au coeur du hameau de Vernand-Dessous. Une histoire tragique, relatée par le voisinage: après le décès de la fille de la propriétaire, le beau-fils de cette dernière aurait revendu à son insu à Orllati, qui y loge actuellement des employés à l’étage. Contactée, l’ancienne propriétaire n’a pas donné suite. On sait par contre qu’Avni Orllati s’est rendu régulièrement dans le hameau ces dernières années, pour tenter de convaincre les autres propriétaires de lui vendre leurs biens. Une veuve aurait ainsi reçu la visite du promoteur deux semaines après la mort de son mari. 
            </p>
          </div>

          <MediaGrid 
            placeholderCount={1}
            ratio="16/9"
            placeholderTxt="Illustration de Renaud Marcelpoix"
            badge="Pour Julie"
            badgeColor="violet"
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
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
        <section id="chapitre-8" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="8"
            titlePart1="Jordils"
            titlePart2="«Vous ne vous intéressez qu’aux chauffards»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Au total, la société Henny Frères a acheté vingt parcelles agricoles pour plusieurs millions de francs. Et elle n’est pas la seule société liée à Orllati à fonctionner ainsi: selon nos recherches, deux autres sociétés anonymes au moins sont propriétaires de parcelles à Eclépens (où un site de développement d’activités industrielles est en cours d’élaboration), ou du côté d’Arnex-sur-Nyon, dans un secteur qui doit accueillir une future décharge. La première se nomme CRAFO SA. C’est Emmanuel Crausaz qui est désormais son président, mais jusqu’en 2024, elle était administrée par un autre personnage: Alexandre Fontannaz, qui n’est autre que le vice-syndic UDC de Bettens, commune voisine de Biolay-Orjullaz. Contacté….
            </p>
          </div>

          {/* Galerie 1 image, débordement élevé (high) */}
          <MediaGrid 
            ratio="16/9"
            overflow="med"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          >
            {/* Actif : tbj7GKnS */}
            <AutoplayVideo videoSrc="https://cdn.jwplayer.com/manifests/tbj7GKnS.m3u8" ratio="16/9" bare />
            {/* Alternative pour test : https://cdn.jwplayer.com/players/F5fXKHRI-L2ArGylc.js */}
          </MediaGrid>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Pour un entrepreneur comme Orllati, l’achat de ces terrains relève souvent du coup de poker: un nouveau plan, un dézonage, une autorisation d’exploiter une décharge, et en avant le cash. Mais ces pratiques sont déloyales, et elles font du mal. Parce que la terre, à l’échelle paysanne, est aussi une affaire d’affect. 
            </p>

            <QuoteBlock 
              quote="Pourquoi, alors que tout le monde respecte les limitations de vitesse, vous ne vous intéressez qu’aux chauffards qui roulent à 160 sur l’autoroute?"
              author="Christian Aeberhard, Prométerre"
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
              Confronté en 2021 déjà par heidi.news, la CFR1 avait promis qu’elle agirait rapidement. Son vice-président Christian Aeberhard, qui est également cadre chez Prométerre, s’était plaint alors: “<span className="italic">Pourquoi, alors que tout le monde respecte les limitations de vitesse, vous ne vous intéressez qu’aux chauffards qui roulent à 160 sur l’autoroute?</span>”. Cinq ans plus tard, rien ne semble avoir changé. La situation interroge d’autant plus “<span className="italic">lorsqu’on connaît les demandes de justification parfois très invasives que peut exiger la CFR1 dans certains dossiers</span>”, relève un agriculteur. 
            </p>

            <Clear />
          </div>
        </section>

        {/* 10. Chapitre 9 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-9" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader2 
            chapterNumber="9"
            titlePart1="Epilogue"
            titlePart2="«Les plus petits disparaissent, les plus grands s’agrandissent»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-12">
            
            <p className="text-lg mb-6 lettrine">
              La situation est d’autant plus questionnante que certains rêvent de mettre la main sur des terres agricoles, non pas pour les détourner de leur fonction, mais pour les cultiver. C’est le cas de “<span className="italic">néo-ruraux</span>”, ces paysans qui ne sont pas issus du monde agricole et qui ont toutes les peines du monde à trouver un terrain exploitable à un prix décent. “<span className="italic">Il faudrait élargir pour permettre aux néo-ruraux d’exploiter tout en serrant la vis autour de la spéculation, relève Alexia Tissière. Le paysage agricole va changer drastiquement durant les quinze prochaine années. L’Union suisse des paysans affirme que les prix sont limités par la LDFR. Mais il y a un immense marché spéculatif sous le tapis, où chacun y va de ses dessous de table. Les plus petits disparaissent, les plus grands augmentent.</span>”
            </p>
          </div>

          {/* Composant de vidéo verticale centré (320px max-width) */}
          <VerticalVideo 
            videoSrc="https://cdn.jwplayer.com/manifests/ZG7KJDpY.m3u8"
            caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              D’autres encore ambitionnent de devenir propriétaires de ce type de parcelles afin de les protéger. Une gageure, selon le secrétaire général de Pro Natura, Alberto Mocchi: “<span className="italic">Notre organisation a acheté des millions d’hectares de terres agricoles dans les années 1970. Mais aujourd’hui, la CFR1 refuse systématiquement. Nous voulions par exemple acheter 20 hectares de terrain au Larzet, à Ormont-dessus. Ce sont des parcelles de prairies sèches qui ont une grande valeur en termes de biodiversité. L’idée n’est pas de les rendre à la nature - on n’a jamais fait ça - mais de les maintenir en exploitation.</span>”
            </p>

            <QuoteBlock 
              quote="Il y a un immense marché spéculatif sous le tapis, où chacun y va de ses dessous de table. Les plus petits disparaissent, les plus grands augmentent."
              author="Une avocate membre des avocat.e.s pour le climat"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              Ces témoignages illustrent parfaitement les immenses difficultés que rencontrent les personnes qui souhaitent sincèrement exploiter la terre, mais ne sont pas issues du monde paysan lorsqu’elles veulent acquérir des terres. Alors que le groupe Orllati, lui, y parvient sans peine grâce à son système opaque de prêtes-noms et d'investissements indirects.
            </p>

            <p className="text-lg mb-6">
              La question se pose de manière d’autant plus criante que le système des dessous-de-table et de l'argent occulte semble s'être généralisé dans le milieu foncier. 
            </p>

            <p className="text-lg mb-6">
              “<span className="italic">En plus, il faut toujours payer des commissions sous la table, confie un agriculteur excédé. Tous les domaines qui ont une cuvette l’intéressent. Son but est de les remplir. Il descend et remonte le niveau de la terre comme bon lui semble. Pour 100’000 m3 à 15 balles le m3, vous laissez faire le calcul…</span>”
            </p>

            <p className="text-lg mb-6">
              Alors même que la Commission foncière rurale dispose de dix ans pour révoquer des décisions d'autorisation litigieuses obtenues sous de faux prétextes, l'inertie de l'État laisse le champ libre à une spéculation rampante qui redessine silencieusement les campagnes romandes.
            </p>

            <Clear />
          </div>
        </section>

        {/* Crédits */}
        <Credits items={STORY.credits.filter(credit => credit.inCredits)} />

        <div className="p-4 bg-gray-100 rounded-lg mt-12 w-full max-w-[672px] mx-auto">
          <p className="font-mono text-xs text-gray-600">
           Illustrations générées par intelligence artificielle
          </p>
        </div>
        
      </article>
    </>
  );
}
