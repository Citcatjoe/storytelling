import type { Metadata, Viewport } from "next";
import { STORY, ABSOLUTE_SOCIAL_URL } from "@/config/variables";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MediaGrid } from "@/components/MediaGrid";
import { Image } from "@/components/Image";
import { SideBlock } from "@/components/SideBlock";
import { DetachableBlock } from "@/components/DetachableBlock";
import { HighlightBlock } from "@/components/HighlightBlock";
import { ChapterHeader } from "@/components/ChapterHeader";
import { ChapterHeader2 } from "@/components/ChapterHeader2";
import { ChapterHeader3 } from "@/components/ChapterHeader3";
import { ChapterHeader4 } from "@/components/ChapterHeader4";
import { ChapterHeader5 } from "@/components/ChapterHeader5";
import { Clear } from "@/components/Clear";
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
  title: STORY.metaTitle || STORY.title,
  description: STORY.description,
  authors: [{ name: STORY.author }],

  openGraph: {
    title: STORY.ogTitle || STORY.title,
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
    title: STORY.ogTitle || STORY.title,
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

        <Hero imageSrc="images/orllati/BlickFR-ORLLATI_OUV_Main_HR.jpg" />

        {/* ==============================================
            FLUX DE L'ARTICLE (SECTIONS SŒURS LINEAIRES)
            ============================================== */}

        {/* 1. Introduction (étroite) */}
        <section id="introduction" className="w-full max-w-[672px] mx-auto mt-12 md:mt-20 text-[#7d6219] leading-relaxed">
          

          <p className="italic text-lg mb-6 lettrine">
            Tout est parti d’un bruit. Le genre d’info qui galope de village en village, et que les gens répètent avec un regard lourd de sous-entendus: «Vous savez quoi? Le neveu d’Orllati a fait son CFC d’agriculteur».  Orllati / agriculture. A priori, deux mondes que tout oppose. D’un côté, l’un des plus gros acteurs de la construction romands, actif par ailleurs dans la promotion immobilière, la géothermie, les décharges et le béton. De l’autre, cette pratique ancestrale qui consiste à travailler la terre pour nourrir le peuple. 
          </p>

          <DetachableBlock
            ratio="16/9"
            caption={null}
            title="Itinéraire de notre récit"
          >
            <ZoningMap />
          </DetachableBlock>
          <p className="italic text-lg mb-6">
            Mais dans un minuscule pays blindé de monde, où certains ne voudraient même plus laisser entrer personne, la frontière entre ces deux univers est aussi poreuse que la brique ou le ciment. Pour loger les gens, il faut construire. Et pour construire, il faut faire de la place: creuser, détruire — donc générer des déchets. C’est ici que les terres agricoles entrent en jeu: à la campagne, on trouve des lieux où ouvrir des gravières (pour faire du béton) et des décharges (pour enfouir ce qui sort des chantiers). Deux activités qui peuvent s’avérer extrêmement rentables. Dans certains cas, on peut aussi tabler sur du long terme: un changement d’affectation, qui transforme des terres agricoles, achetées à très bas prix, en poule aux œufs d’or — une zone constructible. 
          </p>

          

          <SideBlock 
            side="right"
            imageSrc="images/orllati/73_Orllati.jpg"
            alt="Activité du groupe Orllati"
            ratio="4/3"
            noShadow={true}
            caption="Établi à Bioley-Orjulaz, dans le Gros-de-Vaud, le groupe Orllati compte quelque 900 collaborateurs en Suisse romande.    "
          />

          <p className="italic text-lg mb-6">
            Nous avons arpenté le canton de Vaud, de parcelle en parcelle et de ferme en ferme. Notre constat? Alors qu’elles sont censées être protégées légalement, les terres agricoles sont à la merci d’entités extérieures au monde paysan. En s’appuyant sur des agriculteurs placés dans des sociétés anonymes, un groupe comme Orllati arrive à contrôler des terrains qui, selon l’esprit de la loi, devraient rester entre les mains de cultivateurs exploitant directement leurs terres. 
          </p>
          <p className="italic text-lg mb-6">
            Cela signifie que les gardes-fou mis en place par l’État ne fonctionnent pas. À commencer par la Commission foncière rurale (CFR&nbsp;I), cet organisme à qui l'État délègue la tâche d’autoriser ou non l’achat de terres agricoles. À la suite de nos découvertes, nous lui avons fait parvenir de nombreuses questions, auxquelles elle n’a pas répondu. Dans les campagnes, les manœuvres pour l’achat des terres les plus stratégiques et prometteuses financièrement se font au détriment des petits paysans, qui n’en finissent pas de perdre du terrain, et de notre système démocratique. Voici notre enquête.
          </p>
        </section>

        {/* 2. Chapitre 1 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-1" className="w-full mt-16 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="1"
            titlePart1="Gros-de-Vaud"
            titlePart2=" «Le groupe Orllati a un boulevard devant lui»"
            alignX="right"
            
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH1_OUV_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte et photos flottantes du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            <p className="text-lg mb-6 lettrine">
             C’est une cuisine immaculée comme on en trouve souvent dans les fermes vaudoises, avec la machine à café qui ronronne par intermittence. Assis à l’autre bout de la table, Eric* secoue la tête, ses grandes mains aux ongles terreux croisées devant lui: <em>«Orllati, c’est le huitième conseiller d’État. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jamais avoir une exploitation agricole dans le canton.»</em>
            </p>


            <QuoteBlock 
              quote="Orllati, c’est le huitième conseiller d’Etat. J’insiste, n’écrivez pas mon nom. Sinon, je ne pourrai plus jamais avoir une exploitation agricole dans le canton."
              author="Eric, agriculteur (nom d'emprunt)"
              info={undefined}
              accent="accent2"
            />

           

            <p className="text-lg mb-6 ">
              Aux alentours, le paysage du Gros-de-Vaud est morose en ce vendredi de février. Du brun et du vert délavés, un ciel bas au-dessus des chemins boueux, quelques restes de neige. Si nous sommes venus voir Eric, c’est parce qu’il connaît bien le groupe Orllati. Comme plusieurs autres paysans, il a côtoyé Avni, le fondateur et administrateur délégué de la société, dans le cadre de la vente ou de la location de terres agricoles.   
            </p>

            <MediaGrid 
              images={["images/orllati/BlickFR-ORLLATI_CH1_SEC_HR.jpg"]}
              ratio="3/2"
              overflow="low"
              caption={null}
              // badge="Pour Julie - Ressemblance OK"
              // badgeColor="violet"
            />

            <p className="text-lg mb-6">
             Actif dans la construction, la promotion immobilière, les décharges, le béton et la géothermie, le groupe que dirige Avni Orllati est l’acteur le plus puissant du canton de Vaud dans son domaine, avec 400 millions de francs de chiffre d'affaires. À ses débuts dans l’immobilier, l’entreprise sise à Bioley-Orjulaz s’était spécialisée dans la reconversion de friches industrielles. Comme celle de l’ancien laboratoire Kodak de Renens,  transformé il y a une quinzaine d’années en un espace mixte qui abrite, entre autres, le Ministère public vaudois. Mais <a href="https://www.economie-region-lausanne.ch/pas-de-logements-sur-un-site-industriel-strategique/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">alors que le Canton s’inquiète de la raréfaction des surfaces dédiées aux activités artisanales et industrielles</a>, le groupe Orllati a opéré un virage vers l’arrière-pays. Il y a réalisé d’importants projets immobiliers, dont l’écoquartier de Gruvatiez à Orbe, inauguré en 2021.
            </p>
          </div>

          <MediaGrid 
            images={["images/orllati/renens/50_Orllati_Renens_new.jpg"]}
            ratio="3/2"
            overflow="med"
            caption="En 2008, Orllati a racheté l’usine Kodak, à Renens, et l’a reconvertie en un complexe administratif. "
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Pour une entreprise avec un tel profil, certains terrains situés en zone agricole valent de l’or. On y trouve du gravier nécessaire à la fabrication du béton, des trous où enterrer les déchets des chantiers, des futurs sites où construire en cas de changement d’affectation.
            </p>

            <p className="text-lg mb-6">
             À la campagne, les terres cultivables et leurs fermes appartiennent par définition aux agriculteurs. Sauf exceptions, ces derniers sont censés se les vendre de l’un à l’autre, avec l’aval de la Commission foncière rurale (CFR&nbsp;I), l’organisme chargé de délivrer les autorisations pour l’acquisition des terrains situés en zone agricole. <a href="https://www.blick.ch/fr/dossiers/nos-enquetes-autour-des-terres-agricoles-id21984563/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">Une fois de plus</a>, notre enquête amène des questionnements sur cette structure et son manque de contrôle. 
            </p>
          </div>

          <HighlightBlock 
            title="Toutes les activités<br>de l’empire Orllati"
            text="Fondée il y a 30 ans, la société s’est diversifiée et est devenue un acteur-clé en Suisse romande dans de nombreux secteurs."
            // badge="Pour Julie. (dos des carte présent!)'"
            // badgeColor="violet"
          >
            {/* <ActivityGrid /> */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 ">
              <FlipCard 
                showHintOnScroll={true}
                title="Décharges"
                className="order-1"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Décharges</h3>
                      <p className="text-black leading-relaxed font-light">
                        En raison de son explosion démographique, le canton de Vaud ne sait plus que faire de ses déchets de chantier. Cinq des 28 décharges vaudoises sont exploitées à ce jour par Orllati, qui compte encore s’étendre <a href="https://www.blick.ch/fr/suisse/romande/dans-la-campagne-vaudoise-ces-citoyens-luttent-contre-des-projets-de-decharges-id21815692.html" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">avec des projets à Chavornay et à Daillens/Oulens</a>. Le second doit aussi accueillir des scories de l’usine d’incinération lausannoise Tridel.
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE01_Decheterie.jpg" alt="Carte Décharges" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>

              <FlipCard 
                title="Gravières"
                className="order-2"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Gravières</h3>
                      <p className="text-black leading-relaxed font-light">
                        Le gravier, que l’on trouve sous les forêts et les champs, est un élément clé de la composition du béton. C’est dire si les sites qui en contiennent sont précieux pour un groupe comme Orllati, qui possède une centrale à béton. Mais les citoyens se rebiffent comme récemment à La Chaux, près de Cossonay.
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE02_Graviere.jpg" alt="Carte Gravières" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>

              <FlipCard 
                title="Promotion immobilière"
                className="order-4 sm:order-3"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Promotion immobilière</h3>
                      <p className="text-black leading-relaxed font-light">
                        Le groupe Orllati développe des projets immobiliers et des quartiers entiers, dans le canton de Vaud et ailleurs.  C’est lui qui porte notamment un projet de tour arborisée de 117 mètres de haut à Chavannes-près-Renens ou le campus Plein Sud à Estavayer, dans le canton de Fribourg. 
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE03_Immo.jpg" alt="Carte Promotion immobilière" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>

              <FlipCard 
                title="Construction"
                className="order-3 sm:order-4"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Construction</h3>
                      <p className="text-black leading-relaxed font-light">
                       Arrivés en Suisse à l’âge de 14 ans, les frères jumeaux Avni et Basri Orllati ont commencé à travailler dans la démolition en 1995, avant d’acquérir des machines de chantier et se spécialiser dans le gros œuvre et le génie civil. Ce n’est que dix ans plus tard qu’ils acquièrent des terrains en vue de la promotion immobilière.
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE04_Construction.jpg" alt="Carte Construction" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>

              <FlipCard 
                title="Géothermie"
                className="order-5"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Géothermie</h3>
                      <p className="text-black leading-relaxed font-light">
                       Le canton de Vaud concentre le plus grand nombre de projets géothermiques subventionnés par la Confédération. Dans ce domaine en plein essor, Orllati figure en pole position. En mai 2026, le groupe a annoncé l’investissement de 4,25 millions de francs dans un forage exploratoire à Assens.
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE05_Geothermie.jpg" alt="Carte Géothermie" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>

              <FlipCard 
                title="Activités annexes"
                className="order-6"
                backContent={
                  <div className="flex flex-col justify-between h-full text-left">
                    <div className="space-y-2">
                      <h3 className="text-black">Activités annexes</h3>
                      <p className="text-black leading-relaxed font-light">
                       En sus des autres secteurs, le groupe Orllati est également actif dans le désamiantage, le métal et les travaux ferroviaires. À Bioley-Orjulaz, il gère en outre une plateforme de lavage des matériaux d’excavation pollués. En 2020, il a aussi annoncé la création d’un centre romand pour la valorisation de scories, en partenariat avec Cridec et Tridel. 
                      </p>
                    </div>
                  </div>
                }
              >
                <img src="images/orllati/BlickFR-ORLLATI_CH1_CARTE06_Annexe.jpg" alt="Carte Activités annexes" className="w-full h-full object-cover rounded-lg" loading="lazy" />
              </FlipCard>
            </div>
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">

            <p className="text-lg mb-6">
              Dans ce monde-là, le silence est un second langage: à quatre reprises au moins, des paysans qui avaient accepté de nous rencontrer ont annulé le rendez-vous à la dernière minute, estimant qu’il était trop dangereux pour leurs affaires de s’exprimer, même sous le couvert de l’anonymat. 
            </p>

            <p className="text-lg mb-6">
              <em>«J’ai un partenaire qui représente plus d’un demi-million de francs par année pour moi. Il m’a dit: si tu parles du groupe Orllati aux journalistes, je fais plus affaire avec toi. Je risque la faillite»</em>, nous a expliqué l’un d’entre eux — un élu au niveau local qui avait pourtant beaucoup de choses à raconter. Il lâche, malgré tout: <em>«Dans ma région, 60% des agriculteurs arrivent en bout de course dans les cinq prochaines années. D'ici à dix ans, j'estime que le groupe Orllati possédera 15% à 20% des terres vaudoises. Il a un boulevard devant lui»</em>.
            </p>
          </div>
        </section>

        

        {/* 4. Highlight Block (Plein écran sur 1536px max) */}
        {/* <HighlightBlock title="Les propriété d'Orlatti ne sont pas toujours acquises de manière top moumoute">
          <MapVis />
        </HighlightBlock> */}

        {/* 3. Chapitre 2 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-2" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="2"
            titlePart1="Moudon"
            titlePart2="«On se demandait ce que le neveu d’Avni Orllati allait faire d’un CFC d’agriculteur»"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH2_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            

            <p className="text-lg mb-6 lettrine">
              Dans ce contexte que personne ne semble ignorer, une anecdote fait grenouiller la campagne depuis des mois, de la Côte au Gros-de-Vaud. <em>«Allez voir au village, les paysans ne parlent que de ça»</em>, assure Eric. Parmi les soixante diplômés en agriculture du centre de formation de Granges-Verney en juin 2025, un nom clignote comme sur un fond turquoise. C’est celui du neveu d’Avni Orllati. Ce jeune père de famille travaillait il y a peu en tant que logisticien dans l’entreprise familiale.   
            </p> 

           

            <p className="text-lg mb-6">
              Dans le milieu paysan, le profil est insolite: <em>«Évidemment qu’on en parlait. On se demandait ce qu’il allait bien pouvoir faire d’un CFC d’agriculteur»</em>, souffle un diplômé de la même volée. <em>«J’ai essayé de le cuisiner, raconte un autre. C’est quelqu’un d’hyper sympa, avec de l’entregent. Il arrivait aux cours avec une belle voiture et il disait qu’il avait envie d’une vie plus simple, proche de la terre. Je pense qu’il était dans une vraie démarche de compréhension de la profession, mais personne n’a réussi à en savoir plus. Il me semble qu’il n’avait pas de projet précis pour la suite.»</em> 
            </p>
          </div>

          <MediaGrid 
            images={[
              "images/orllati/moudon/56_Orllati_Moudon_new.jpg",
              "images/orllati/moudon/63_Orllati_Moudon_new.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="L’école professionnelle Agrilogie de Grange-Verney, à Moudon, forme les futurs agriculteurs."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              En vue de l’obtention de son CFC, le neveu d’Avni Orllati a effectué une partie de son apprentissage chez un jeune agriculteur établi non loin de la frontière fribourgeoise. Le jeune homme, qui n’a pas répondu à nos questions, a ensuite terminé sa formation chez Jacques Gottofrey, un ancien conseiller communal UDC, agriculteur à Echallens et <a href="https://swsv.ch" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">ex-président de l’association romande de lutte suisse</a>. Contacté, il explique ne plus avoir eu de nouvelles de son ancien stagiaire par la suite. 
            </p>

            <QuoteBlock 
              quote="Il arrivait aux cours avec une grosse voiture et il disait qu’il avait envie d’une vie plus simple, proche de la terre. Je pense qu’il était dans une vraie démarche de compréhension de la profession, mais personne n’a réussi à en savoir davantage"
              author="Un diplômé de la même volée"
              accent="accent2"
            />

            <SideBlock 
              side="left"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_CRAUSAZ.jpg"
              alt="Emmanuel Crausaz"
              ratio="3/4"
              caption="Emmanuel Crausaz, agriculteur et ancien président de l’association fribourgeoise de lutte suisse."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="hidden md:block"
            />

            <p className="text-lg mb-6">
             Quant à la première partie de son apprentissage, <em>«le neveu»</em>, l’aurait effectuée chez un certain Emmanuel Crausaz, selon plusieurs sources concordantes. Nous retrouverons le nom de cet agriculteur fribourgeois, <a href="https://www.rts.ch/play/tv/forum/video/fete-federale-de-lutte-lheure-du-bilan-interview-demmanuel-crausaz?urn=urn:rts:video:13340005" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">connu pour avoir présidé jusqu’en 2019 l’association fribourgeoise de lutte suisse</a> (encore elle), tout au long de notre enquête. En effet, Emmanuel Crausaz, qui n’a pas souhaité nous parler, joue un rôle clé dans l’accès du groupe Orllati à des terres agricoles. 

            </p>

            <SideBlock 
              side="right"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_CRAUSAZ.jpg"
              alt="Emmanuel Crausaz"
              ratio="3/4"
              caption="Emmanuel Crausaz, agriculteur et ancien président de l’association fribourgeoise de lutte suisse."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="md:hidden w-1/2 mx-auto"
            />

            <p className="text-lg mb-6">
             De 2013 à 2018, il a aussi administré la société Orllati environnement SA, spécialisée dans l’exploitation de gravières et déchets à Fribourg. <a href="https://www.heidi.news/explorations/les-vaudois-et-leur-bac-a-sable-magique/des-paysans-en-embuscade-sur-le-front-de-l-est" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">Comme l’avait raconté le média heidi.news en 2020</a>, cet homme à l’imposante carrure, qui affiche des lunettes noires de <em>bodyguard</em> sur son profil LinkedIn, allait rendre visite à des agriculteurs en compagnie de l’ancien géologue cantonal pour les convaincre de signer des conventions avec Orllati en vue de  l’extraction du gravier présent sur leur terrain.
            </p>
          </div>
        </section>

        {/* 4. Chapitre 3 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-3" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="3"
            titlePart1="Arnex-sur-Nyon"
            titlePart2="«À cinq francs le mètre carré, ça lui coûte moins cher d’acheter les terrains»"
            align="bottom"
            alignX="left"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH3_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            <p className="text-lg mb-6 lettrine">
              Si l’obtention d’un CFC d’agriculteur par le <em>«neveu de»</em> suscite autant d’interrogations, ce n’est pas juste parce que le jeune homme est hors sérail. Dans les villages, le groupe co-fondé par son père est connu pour faire appel à des paysans, qui lui permettent de contrôler des terres en vertu de la Loi sur le droit foncier rural (LDFR).  <a href="https://www.ekm.admin.ch/fr/newnsb/zvgtbwfMkA2r71bm8bOlT" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">Dans le cadre de la révision de cette loi</a>, le Conseil fédéral a pourtant été clair: il veut <em>«renforcer le principe de l’exploitation à titre personnel, selon lequel les immeubles agricoles doivent être exploités par les personnes qui les ont acquis.»</em>
            </p>
          </div>

          <HighlightBlock 
            title="La recette du contrôle des<br>terres agricoles"
          >
            <RecipeBook className="mt-6 md:mt-8" />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            

            <p className="text-lg mb-6 font-light">
              Ce garde-fou est censé éviter que les terres agricoles ne fassent l’objet de spéculation foncière ou soient détournées de leur usage. Mais apparemment, il est facile de s’asseoir dessus, du moins dans le canton de Vaud. Comment? En s’adjoignant les services d’agriculteurs avec des parts majoritaires dans des sociétés anonymes dont le but est l’agriculture.
            </p>
            <p className="text-lg mb-6 font-light">
              Lorsque les actionnaires majoritaires de la société acquéreuse sont officiellement des exploitants agricoles à titre personnel, ils peuvent en effet acheter directement les terrains. Un non-exploitant, lui, devrait activer l’une des exceptions à la Loi sur le droit foncier rural, qui sont assez strictes. Passer par des paysans permet donc au groupe Orllati de s’assurer une maîtrise du foncier sur le long terme, en achetant les terres au prix que payeraient des agriculteurs.
            </p>

            <QuoteBlock 
              quote="Toutes les opérations du Groupe Orllati en lien avec des parcelles agricoles interviennent dans le respect de la LDFR, des procédures y relatives et sont soumises aux autorités d’application de cette loi"
              author="Le groupe Orllati"
              accent="accent2"
            />

            <SideBlock side="right" className="hidden md:block mb-8 md:mb-6">
              <FramedContent 
                title="L’exploitant à titre personnel: un principe sacré"
                description={
                  <>
                    En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux: encourager la propriété foncière rurale et maintenir les entreprises familiales, lutter contre les prix exagérés des parcelles agricoles et la spéculation, et  renforcer la position du paysan exploitant à titre personnel (y compris celle du fermier) en cas d’acquisition de terres ou de domaines. Par exploitant à titre personnel, on entend un agriculteur qui cultive lui-même les terres. Il doit avoir les compétences et la disponibilité pour le faire et <a href="https://www.bger.ch/ext/eurospider/live/fr/php/aza/http/index.php?lang=fr&type=show_document&highlight_docid=aza://21-12-2021-2C_520-2021&print=no" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">être domicilié non loin  de l’exploitation, selon la jurisprudence</a>. Toujours <a href="http://relevancy.bger.ch/php/aza/http/index.php?lang=de&type=show_document&highlight_docid=aza://01-03-2024-2C_317-2023&print=no" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">d’après le Tribunal fédéral</a>, une société anonyme peut acquérir des parcelles et des bâtiments situés en zone agricole, à condition que la majorité des personnes qui la détiennent remplissent les exigences de l’exploitation à titre personnel. Ajoutons que la volonté d’exploiter personnellement les terres doit exister non seulement lors de l’octroi de l’autorisation d’acquérir, mais aussi sur le long terme.
                  </>
                }
                shortDescription="En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux"
                className="my-0 mt-0 mb-0"
              />
            </SideBlock>

            <p className="text-lg mb-6">
              À la suite de notre enquête, nous avons envoyé de nombreuses questions au groupe de Bioley-Orjulaz. Voici ce qu’il nous a répondu: <em>«Dans le cadre des activités du Groupe Orllati liées aux gravières et aux décharges, pas un m2 cultivable n’a été soustrait à l’agriculture sans délivrance préalable d’un permis d’exploiter en bonne et due forme par les autorités compétentes. Par ailleurs, toutes les opérations du Groupe Orllati en lien avec des parcelles agricoles interviennent dans le respect de la LDFR, des procédures y relatives et sont soumises aux autorités d’application de cette loi.»</em>
            </p>

            <FramedContent 
              title="L’exploitant à titre personnel: un principe sacré"
              description={
                <>
                  En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux: encourager la propriété foncière rurale et maintenir les entreprises familiales, lutter contre les prix exagérés des parcelles agricoles et la spéculation, et  renforcer la position du paysan exploitant à titre personnel (y compris celle du fermier) en cas d’acquisition de terres ou de domaines. Par exploitant à titre personnel, on entend un agriculteur qui cultive lui-même les terres. Il doit avoir les compétences et la disponibilité pour le faire et <a href="https://www.bger.ch/ext/eurospider/live/fr/php/aza/http/index.php?lang=fr&type=show_document&highlight_docid=aza://21-12-2021-2C_520-2021&print=no" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">être domicilié non loin  de l’exploitation, selon la jurisprudence</a>. Toujours <a href="http://relevancy.bger.ch/php/aza/http/index.php?lang=de&type=show_document&highlight_docid=aza://01-03-2024-2C_317-2023&print=no" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">d’après le Tribunal fédéral</a>, une société anonyme peut acquérir des parcelles et des bâtiments situés en zone agricole, à condition que la majorité des personnes qui la détiennent remplissent les exigences de l’exploitation à titre personnel. Ajoutons que la volonté d’exploiter personnellement les terres doit exister non seulement lors de l’octroi de l’autorisation d’acquérir, mais aussi sur le long terme.
                </>
              }
              shortDescription="En janvier 1994, la Loi sur le droit foncier rural (LDFR) est entrée en vigueur, avec trois objectifs principaux"
              className="md:hidden mt-4 mb-6"
            />

            

            

            

            <p className="text-lg mb-6">
              Dans le district de Nyon, à la frontière avec le canton de Genève, 17 hectares environ (l’équivalent de 24 terrains de foot) de surface agricole situés le long de l’autoroute sont propriété d’une société appelée Porla, dont les buts sont liés à l'agriculture. La SA est présidée par Miguel Sanchez, qui figure également au conseil d’administration du groupe Orllati. Cet acteur-clé de l’entreprise de Bioley-Orjulaz, qui était auparavant directeur chez Holcim, partage la gestion de Porla SA avec trois paysans.
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
              Par une après-midi de mai écrasée de soleil, nous nous rendons dans la région, où différentes sources proches du dossier nous confirment que c’est bien le groupe Orllati qui est (indirectement) propriétaire des parcelles en question. Comme dans d’autres exemples, des agriculteurs auraient eu le droit de préemption (priorité pour l’achat, <em>ndlr</em>), mais pas les fonds. <em>«Orllati est correct»</em>, souffle un paysan, que nous croisons près de sa ferme. <em>«Il nous rafle les terres sous le nez, mais il ne les cultive pas.»</em> Un autre ajoute: <em>«J’ai fait un deal parce que ça m’arrangeait. Je ne vais pas mettre un coup de pied dans la fourmilière maintenant.»</em>
            </p>
          </div>

          <HighlightBlock
            title="Prix des terrains: l’exemple genevois"
           
          >
            <LandPriceIsometric />
          </HighlightBlock>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-8">
            

            <p className="text-lg mb-6">
              L’entreprise Orllati ne cultive pas les terres, mais elle projetterait d’en tirer profit autrement. La zone où se situent les parcelles en question figure dans la planification cantonale 2024 pour une décharge de matériaux d’excavation (déchets de chantier) pas ou faiblement pollués. À ce jour, rien n’a encore été mis à l’enquête. Mais l’emplacement est stratégique pour le groupe de Bioley-Orjulaz, qui est au coude à coude dans le secteur avec un autre exploitant de décharge, la société Ronchi basée à Gland. Orllati projette en effet la construction de six immeubles sur une vaste parcelle située au nord de Nyon, ce qui promet de générer quantité de terres d’excavation. 
            </p>

            <SideBlock side="right" className="mb-8 md:mb-6">
              <FramedContent 
                title="Une décharge à 40 millions"
                description={
                  <>
                    Selon <a href="https://actu.epfl.ch/news/favoriser-la-terre-crue-au-lieu-du-beton-pour-chan/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">un travail de master en architecture à l’EPFL</a>, la valeur d’un m3 de déchets de terre est estimée à 30 francs en 2022 (sans doute davantage aujourd’hui). La décharge d’Arnex-sur-Nyon ayant une capacité d’1,3 million de mètres cubes, cela signifie qu’elle pourrait générer 40 millions de francs. La méthode «traditionnelle» dans ce domaine consiste, pour les exploitants, à signer des conventions avec les propriétaires, qui sont rémunérés le temps de l’utilisation de leur parcelle. Toujours selon le même travail de master, sur les 30 francs par mètre cube, vingt-sept vont à l’exploitant et trois au propriétaire du terrain. Le président de l’Association Matériaux Construction Circulaires Vaud, Jean Malcotti, ajoute qu’il y a encore «beaucoup d’autres facteurs à prendre en compte. La charge administrative, les coûts d’exploitation et la main-d'œuvre qui peuvent énormément varier. En moyenne, il faut calculer un bénéfice de 5 à 10% sur une décharge.»
                  </>
                }
                shortDescription="Selon un travail de master en architecture à l’EPFL, la valeur d’un m3 de déchets de terre est estimée à 30 francs"
                className="my-0 mt-0 mb-0"
              />
            </SideBlock>

            <p className="text-lg mb-6">
              <em>«À cinq francs le prix licite au mètre carré, ça coûte moins cher à Orllati d’acheter les terrains que de payer les propriétaires au mètre cube durant toute l’exploitation de la décharge»</em>, commente un paysan. <em>«Et puis, une fois que le trou est bouché, les terres pourront être cultivées à nouveau.»</em> Le prix licite est le maximum qu’un acheteur peut payer pour un bien agricole. 
            </p>

            <p className="text-lg mb-6">
             Orllati exploite à ce jour cinq des <a href="https://www.vd.ch/environnement/dechets/decharges" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">28 décharges en activité</a> dans le canton de Vaud. Cela fait de lui un acteur majeur du secteur, qui compte une multitude de petits exploitants. Le groupe de Bioley-Orjulaz va encore s’étendre, <a href="https://www.blick.ch/fr/suisse/romande/dans-la-campagne-vaudoise-ces-citoyens-luttent-contre-des-projets-de-decharges-id21815692.html" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">avec des projets à Chavornay</a> et à Daillens/Oulens. Et pour cause: en raison de son explosion démographique, Vaud ne sait plus que faire de ses déchets de chantier. <em>«Tous les terrains qui ont une cuvette intéressent Orllati, relève un agriculteur de Lavaux. C'est une très bonne affaire de les remplir.»</em>
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
              Selon nos calculs, pour une décharge telle que celle qui figure dans la planification à Arnex-sur-Nyon, l’exploitant devrait payer au minimum 2,5 millions de francs aux propriétaires s’il louait les terres. 
            </p>

            <p className="text-lg mb-6">
              Étant donné la concurrence féroce qui règne dans ce secteur, comme dans celui des gravières, l’acquisition des terrains est nettement plus avantageuse financièrement, mais aussi plus sûre, car elle permet une planification sur le long terme. 
            </p>
          </div>

          <MediaGrid 
            images={[
              "images/orllati/blonay/03_Orllati_Blonay_new.jpg",
              "images/orllati/blonay/04_Orllati_Blonay_new.jpg"
            ]}
            ratio="3/2"
            overflow="high"
            caption="En 2023, la conseillère d’Etat Valérie Dittli a signé un recours de son département contre la vente à Orllati de parcelles agricoles dans le cadre de l’achat de l’ancienne clinique de Mottex, à Blonay."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-8">
            <p className="text-lg mb-6">
             De plus, lorsque les actionnaires majoritaires de la société acquéreuse sont officiellement des exploitants à titre personnel, ils peuvent acheter directement les terrains. <em>«Pour Orllati, un numéro d’exploitant agricole, c’est le Graal»</em>, résume un connaisseur du dossier. Un non-exploitant pourrait aussi prétendre à l’achat de parcelles situées en zone agricole, notamment s’il n’y a pas de paysans sur le coup.  
            </p>

            <p className="text-lg mb-6">
            C’est ce qu’avait fait Orllati pour des parcelles situées à Blonay dans le cadre de l’acquisition de l’ancienne clinique de Mottex, <a href="https://www.blick.ch/fr/suisse/romande/vendues-au-promoteur-orllati-en-defendant-des-terres-agricoles-valerie-dittli-a-crispe-le-gouvernement-vaudois-id20765039.html" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">comme Blick l’avait raconté l’an dernier</a>. Mais selon nos informations, Orllati Real Estate avait alors dû convaincre quatre agriculteurs, qui s’étaient portés acquéreurs, de retirer leurs offres en échange d’un autre terrain ou de la possibilité d’exploiter provisoirement les parcelles en question. 
            </p>

            <p className="text-lg mb-6">
             Avec des agriculteurs dans la poche, exit la concurrence, les contreparties et les appels d'offres publiés dans la FAO. Autrement dit, du pain bénit. 
            </p>
          </div>
        </section>

        {/* 5. Chapitre 4 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-4" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="4"
            titlePart1="Gros-de-Vaud"
            titlePart2="«Beaucoup de paysans vivent une crise identitaire»"
            alignX="center"
            align="top"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH1_OUV4_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            

            

            <p className="text-lg mb-6 lettrine">
              Sauf que dans ces histoires, les dindons de la farce sont souvent les paysans. En arrière-plan de ces achats, on trouve en effet cette fraction du monde agricole qui se débat avec des dettes, de la paperasse, des hypothèques, et qui en plus perd les terrains censés rester entre ses mains. <em>«Les voleurs, ce sont Migros, la Coop et l’État»</em>, assure un agriculteur rencontré près de Nyon. <em>«On importe, on importe, et les paysans ne tournent plus. On est obligés de trouver des combines pour pas crever».</em>  
            </p>

            <p className="text-lg mb-6">
             Un tableau sombre que l’on retrouve en filigrane d’une autre société, Henny Frères SA, du nom de deux frères du Gros-de-Vaud que nous nommerons Roger* et Victor*. Selon ses statuts, les actions de cette société anonyme ne peuvent être détenues majoritairement que par des exploitants agricoles ou viticoles à titre personnel. Le transfert des actions et certaines modifications des statuts sont soumis à l’approbation de la Commission foncière rurale, chargée d’appliquer la Loi sur le droit foncier rural.
            </p>

             <p className="text-lg mb-6">
             Selon nos informations, Roger était un ancien sous-traitant d’Orllati. Pas assez riche pour acheter un domaine, lui et son frère auraient accepté d’entrer dans Henny frères SA en 2016 déjà, avec 50% des actions chacun. C’est Orllati qui aurait avancé le capital de départ. En 2019, Roger est parti et a été remplacé au registre du commerce par Emmanuel Crausaz, le lutteur aux lunettes noires et à la carrure de <em>bodyguard</em> que nous avons rencontré dans le premier chapitre. Depuis 2021, ce dernier signe individuellement au sein de cette société, qui possède une vingtaine de parcelles agricoles sur des sites stratégiques.
            </p>

            <p className="text-lg mb-6">
             Quant au second frère, Victor, il a présidé Henny Frères SA depuis le départ de Roger. Après plusieurs appels du pied pour pouvoir quitter la société, il aurait donné sa démission, pour être remplacé par le neveu d’Avni Orllati. Selon nos sources, l’entrée de ce dernier dans la société serait en stand-by. Contactés, les deux frères ont refusé de répondre à nos questions. <em>«Je ne fais plus partie de la société»</em>, nous assure Victor, dont le nom figure pourtant toujours au Registre du commerce. <em>«Pour moi, c’est de l’histoire ancienne»</em>, explique Roger avant de raccrocher.
            </p>

            <QuoteBlock 
              quote="Chez les Orllati, on écoute les paysans, on s’intéresse à leur réalité"
              author="Un jeune agriculteur"
              accent="accent2"
            />

            <p className="text-lg mb-6">
             Outre les difficultés financières, un certain nombre de paysans se démènent avec une piètre image d’eux-mêmes, ce qui les rend vulnérables relationnellement, assure un jeune diplômé en agriculture: <em>«Beaucoup vivent une crise identitaire, ils ne se sentent pas reconnus. Chez les Orllati, on les écoute, on s’intéresse à leur réalité. Ils ont les moyens et l’aura pour emmener une partie du monde agricole derrière eux.»</em>
            </p>

            {/* <QuoteBlock 
              quote="La plupart des autres agriculteurs du coin ne me parlent plus, parce qu’ils sont jaloux"
              author="Un paysan ayant fait des affaires avec Orllati"
              accent="accent2"
            /> */}

            <p className="text-lg mb-6">
              Au cours de notre enquête, nous avons identifié au moins trois sociétés qui fonctionnent sur le même principe. Leur point commun: en dehors des <em>«émissaires d'Orllati»</em> comme Emmanuel Crausaz ou Miguel Sanchez, les agriculteurs qui coadministrent les sociétés n’ont pas l’air au courant de ce qui s’y passe. Selon nos informations, l’un d’entre eux était même convoqué chez le notaire juste avant la signature pour l’achat de terrains, sans vraiment savoir de quoi il retournait. Interrogé, le notaire en question nous a expliqué qu’il était à la retraite, avant de nous conseiller d’en <em>«parler directement avec le groupe»</em>. Comprendre l’entreprise Orllati elle-même. 
            </p>
          </div>
        </section>

        {/* 6. Chapitre 5 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-5" className="w-full mt-12 md:mt-20 text-gray-800">
          
          {/* <ChapterHeader4 
            chapterNumber="5"
            titlePart1="Chardonne"
            titlePart2="«En principe, les parcelles sont doublement protégées en Lavaux»"
            ratio="16/9"
            placeholderTxt="Illustration"
            badge="Pour Julie"
            badgeColor="violet"
          /> */}

          <ChapterHeader4 
            chapterNumber="5"
            titlePart1="Chardonne"
            titlePart2="«En principe, les parcelles sont doublement protégées en Lavaux»"
            align="top"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH05_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />
          

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Quittons à présent le Gros-de-Vaud pour la Riviera, où les villages de Chardonne et Corseaux offrent une vue sublime sur le Léman. Avec, au premier plan, les vignobles en terrasse d’où coule le <em>«joli vin blanc»</em> si cher au cœur des Vaudois. Un décor de carte postale qui se paie cher: dans la région, les prix de l’immobilier sont plus élevés que la moyenne cantonale de près de 30%, selon <a href="https://www.bcv.ch/pointsforts/dans-le-canton/bcv-immobilier/les-prix-de-l-immobilier-par-commune-et-par-district-vaudois2.html" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">une étude de la BCV de novembre 2025</a>.
            </p>

            <p className="text-lg mb-6">
              Sous l’autoroute A9, à cheval entre les deux villages, Henny Frères SA est l’heureuse propriétaire au registre foncier de six parcelles offrant un dégagement spectaculaire sur la plaine du Rhône. Autrefois occupées par des maraîchers, d’immenses serres y sont laissées à l’abandon depuis des années, au point que de la végétation pousse à l’intérieur. Juste en face, un petit immeuble a été rénové il y a deux ans pour devenir habitable, malgré sa situation en dehors de la zone à bâtir. Le reste des terrains est composé de parcelles agricoles et viticoles, situées dans la zone de Lavaux, qui est inconstructible et protégée dans la Constitution en tant que paysage exceptionnel, selon la volonté du peuple vaudois.  
            </p>
          </div>

          {/* Galerie 2 images, débordement élevé (high) */}
          <MediaGrid 
            images={[
              "images/orllati/corseaux/16_Orllati_Corseaux_new.jpg",
              "images/orllati/corseaux/24_Orllati_Corseaux_new.jpg"
            ]}
            ratio="3/2"
            overflow="med"
           
            className="mb-6"
          />

          <AutoplayVideo 
            videoSrc="https://cdn.jwplayer.com/manifests/msF8hZTY.m3u8"
            ratio="3/2"
            overflow="med"
            className="-mt-2 mb-8 md:mb-12"
            caption="À Chardonne et Corseaux, la société Henny Frères SA possède plusieurs parcelles en zone viticole protégée et zone agricole spécialisée."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Le jour de notre visite, les Alpes sont encore nimbées d’une neige de printemps qui scintille au soleil. <em>«C’est Orllati qui est propriétaire»</em>, confirme d’entrée de jeu un ouvrier occupé à des travaux de terrassement devant les serres. <em>«Évidemment qu’il rêve de construire ici, mais je ne sais pas quand ce sera possible.»</em>
            </p>

            {/* <QuoteBlock 
              quote="La vente devait avoir lieu au cinéma Rex de Vevey. Mais sur place on a appris qu’Orllati avait tout racheté la veille"
              author="Un habitant de Lavaux"
              accent="accent2"
            /> */}

            {/* SideBlock à droite (portrait) placé avant le premier des deux paragraphes pour float desktop correct */}
            <SideBlock 
              side="right"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_ZANGGER.jpg"
              alt="Anna Zangger"
              ratio="3/4"
              caption="Anna Zangger, avocate membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="hidden md:block"
            />

            <p className="text-lg mb-6">
              Selon plusieurs témoignages, cette acquisition porte également la griffe du lutteur Emmanuel Crausaz. Les parcelles concernées devaient être vendues aux enchères durant le Covid, à la suite de la faillite du propriétaire précédent. Deux vignerons étaient intéressés, mais impossible de régater. Selon l'ancien propriétaire, avec qui Blick s'est entretenu, l'ensemble a été vendu à Henny Frères SA pour un total de 1 370 000 francs*. Un habitant de la région ajoute: <em>«C’est vraiment dommage de laisser ces serres à l’abandon. Des gens demandent souvent à la commune s’ils ne pourraient pas avoir un espace pour cultiver à l’intérieur.»</em> Quant aux vignes, leur exploitation serait aujourd'hui sous-traitée à un viticulteur du coin.*
              <span className="block mt-6 text-sm italic text-gray-400">* Passage modifié le 24 juillet 2026 suite à des échanges avec l’ancien propriétaire.</span>
            </p>

            <SideBlock 
              side="right"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_ZANGGER.jpg"
              alt="Anna Zangger"
              ratio="3/4"
              caption="Anna Zangger, avocate membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="md:hidden w-1/2 mx-auto"
            />

            <p className="text-lg mb-6">
              Cet exemple est d'autant plus préoccupant que la Suisse romande vit actuellement une crise viticole. <em>«Il y a autour de moi des situations qui deviennent dramatiques»</em>, commente un viticulteur de la région. <em>«Et dans l’agriculture aussi. Nos revenus baissent et on a de moins en moins de moyens pour acheter des terres.»</em> En Lavaux, le groupe Orllati a en outre fait parler de lui en <a href="https://www.tdg.ch/ce-projet-est-une-insulte-a-la-memoire-de-mon-pere-134841816429" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">projetant de construire un complexe immobilier sur un ancien site viticole à Treytorrens</a>. 
            </p>

            {/* SideBlock à gauche (carré) placé avant le paragraphe sur la fondation Franz Weber */}
          

            <p className="text-lg mb-6">
              Nous avons contacté la fondation Franz Weber, qui couve Lavaux comme le plus précieux des trésors. Comment réagit-elle au fait que le groupe Orllati ait également mis la main sur les parcelles de Chardonne et Corseaux? <em>«Avec inquiétude»</em>, nous répond Anna Zangger, membre de la direction de la Fondation Franz Weber et codirectrice d’Helvetia Nostra. <em>«En principe, les parcelles colloquées en zone agricole (ou viticole) sont inconstructibles et doublement protégées, en Lavaux, par la Loi sur l’aménagement du territoire et la Loi sur le plan de protection de Lavaux. Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales.»</em> 
            </p>

            <QuoteBlock 
              quote="Il n’est pas impossible que certaines acquisitions puissent être une forme de spéculation immobilière, en espérant exploiter certaines exceptions légales"
              author="Anna Zangger, avocate membre de la direction de la Fondation Franz Weber et co-directrice d’Helvetia Nostra"
              accent="accent2"
            />

            <p className="text-lg mb-6">
             L’avocate de profession s’interroge en outre sur <em>«le mécanisme qui a permis à un groupe de promotion immobilière d’acquérir ces parcelles, même indirectement.»</em> Selon elle, <em>«ce type de montage mérite une vigilance particulière. Les communes et la Commission foncière doivent également prendre leurs responsabilités pour empêcher des projets immobiliers hors zone à bâtir, la protection de leurs villages et paysage, tout particulièrement en Lavaux, et éviter de manière générale le contournement des lois.»</em> 
            </p>

            <p className="text-lg mb-6">
              Nous avons tenté de questionner la syndique de Chardonne, Maria Alice Reymond. Il n’a pas été possible de lui parler au téléphone, le greffe nous ayant fait savoir qu’il fallait envoyer les questions par e-mail. La secrétaire nous a ensuite répondu par écrit que <em>«la Syndique a bien pris connaissance de votre demande et vous informe que ces questions relèvent du droit privé.»</em> Quant au syndic de Corseaux, Christian Minacci, il n’a pas donné suite à deux courriels et un appel au greffe.
            </p>

            <p className="text-lg mb-6">
              <em>«Les élus sont les premiers à nous avoir abandonnés. Si eux ont peur, que voulez-vous que nous fassions?»</em> demande un paysan désabusé qui a souhaité rester anonyme.
            </p>

            <Clear />
          </div>
        </section>

        {/* 7. Chapitre 6 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-6" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="6"
            titlePart1="Yens"
            titlePart2="«Le premier fautif, c’est l’État»"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH06_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Agriculteur à la retraite, Charles-Henri Fuchs a vécu durant vingt-cinq ans avec sa femme et ses quatre enfants à la Flogère, un domaine enchanté situé dans le district de Morges. Propriété d’Henny Frères SA, le complexe est laissé à l’abandon depuis plusieurs années, à l’image des serres de Lavaux. Lors de nos visites, seules quelques vaches appartenant à un agriculteur du coin étaient présentes dans le hangar, et la ferme était envahie de végétation. 
            </p>
          </div>

          {/* Galerie double débordement élevé (high) */}
          <MediaGrid 
            ratio="3/2"
            overflow="high"
            caption="Les bâtiments du domaine de la Flogère, qui couve du gravier nécessaire à la fabrication du béton, sont laissés à l’abandon depuis des années."
          >
            <Image 
              src="images/orllati/yens/36_Orllati_Eclépens_new.jpg" 
              ratio="3/2" 
              alt="Les bâtiments du domaine de la Flogère, qui couve du gravier nécessaire à la fabrication du béton, sont laissés à l’abandon depuis des années." 
            />
            <AutoplayVideo videoSrc="https://cdn.jwplayer.com/manifests/vAJy4U2m.m3u8" ratio="3/2" bare />
          </MediaGrid>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0"> 
            <p className="text-lg mb-6">
              Sur un mur du salon (lui aussi immaculé) de l’appartement de Montricher où Charles-Henri Fuchs vit désormais avec son épouse, on trouve une photographie de l’exploitation durant ses grandes années. Arrivé en 1992, l’agriculteur était actif dans l’engraissement de taureaux et les cultures:  blé, orge, maïs, colza. Il n’a jamais été propriétaire de la Flogère. Le domaine était en mains d’une héritière du groupe Von Roll, vestige d’une époque où les industriels s’offraient des biens agricoles — avant la Loi sur le droit foncier rural de 1991. <em>«En 2013, une façade de la maison menaçait de s’effondrer»</em>, raconte Charles-Henri Fuchs devant une tasse de café. <em>«La propriétaire a voulu vendre, pour 2,8 millions. Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs.»</em>
            </p>

            <QuoteBlock 
              quote="Je n’avais pas les moyens d’acheter. Les banques ne prêtaient pas, et Prométerre ne me proposait qu’un franc le mètre carré, soit 350’000 francs"
              author="Charles-Henri Fuchs, agriculteur"
              accent="accent2"
            />

            {/* SideBlock à droite (vidéo portrait) placé avant les 3 paragraphes pour float desktop correct */}
            <SideBlock 
              side="right"
              className="hidden md:block"
            >
             <VerticalVideo 
              videoSrc="https://cdn.jwplayer.com/manifests/OMQ2B8Qw.m3u8"
              poster="images/orllati/poster-maison.png"
              caption="La députée Ensemble à gauche Mathilde Marendaz."
            />
            </SideBlock>

            <p className="text-lg mb-6">
              En tant qu’exploitant au bénéfice d’un bail à ferme durant de nombreuses années, Charles-Henri Fuchs aurait pourtant été prioritaire pour le rachat du domaine. Mais au lieu de cela, il a assisté, impuissant, à un étrange ballet: <em>«D’abord, la maison bernoise Marti (active dans la construction, <em>ndlr</em>) est arrivée, avec un paysan de Lucerne nommé Urs Bernet. Je pensais qu’ils allaient faire une offre d’achat, mais ils ont seulement loué, et ce Monsieur Bernet m’a engagé comme employé durant quelques années, avant de résilier mon contrat au motif que je coûtais trop cher.»</em>
            </p>

            <SideBlock 
              side="right"
              className="md:hidden"
            >
             <VerticalVideo 
              videoSrc="https://cdn.jwplayer.com/manifests/OMQ2B8Qw.m3u8"
              poster="images/orllati/poster-maison.png"
              caption="La députée Ensemble à gauche Mathilde Marendaz."
            />
            </SideBlock>

            <p className="text-lg mb-6">
              Urs Bernet n’est pas n’importe qui. <a href="https://www.luzernerzeitung.ch/zentralschweiz/luzern/luzern-der-raetselhafte-abgang-des-kieshaendlers-urs-bernet-ld.98899" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">Selon un article publié en 2016 par la Luzerner Zeitung</a>, il a été durant des années une figure majeure de l’industrie du gravier dans l’arrière-pays lucernois, ainsi que l’un des plus importants éleveurs du canton. On lui prêtait un rôle similaire à celui d’Emmanuel Crausaz, soit d'être d'un paysan au service d’intérêts économiques étrangers à l’agriculture.
            </p>

            <p className="text-lg mb-6">
              La présence à la Flogère de cette personnalité alémanique, qui a depuis disparu des radars, n’est pas un hasard. Car ce domaine est situé au-dessus d’un important gisement de gravier, dans la prolongation du bois de Ballens, occupé en 2024 par des activistes du mouvement Grondements des terres. Les géants Holcim et Orllati s’y font la guerre pour la maîtrise des parcelles porteuses de revenus colossaux.
            </p>

            

            <QuoteBlock 
              quote="Mon fils s’était déjà projeté dans une reprise de l’exploitation, donc ça a été plus dur pour lui que pour moi"
              author="Charles-Henri Fuchs, agriculteur"
              accent="accent2"
            />

            <p className="text-lg mb-6">
             À la Flogère, ce sont les hommes d’Orllati qui ont succédé à ceux du Bernois Marti. Sans surprise, Emmanuel Crausaz était présent lors de la visite en vue de l’acquisition, mais pas seulement. Selon Charles-Henri Fuchs, une personnalité de poids s’est également rendue sur les lieux à cette occasion: Pierre-François Veillon, qui fut conseiller d’État avant de retourner à son bureau de comptabilité et de gestion agricole à Bex, puis conseiller national jusqu’en 2015 sous la bannière de l’UDC. Un nom que l’on retrouve dans le cadre de la vente des Ursins, ce somptueux domaine situé dans le district de Morges <a href="https://www.blick.ch/fr/suisse/le-cas-decole-qui-illustre-les-dysfonctionnements-terres-agricoles-derriere-le-clash-entre-jean-claude-mathey-et-valerie-dittli-id21924248.html" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">dont Blick vous racontait l’histoire récemment</a>. A quel titre l’ancien ministre était-il impliqué dans ces ventes? Contacté, il confirme avoir été <em>«mandaté par la propriétaire pour vendre le domaine»</em> et avoir eu <em>«des contacts avec Marti dans ce cadre-là»</em>. Mais conteste tout lien avec le groupe Orllati par la suite.

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
            caption="Occupé en 2024 par des activistes du mouvement Grondements des terres, le bois de Ballens fait l’objet d’une mobilisation citoyenne contre le béton."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Contrairement à sa femme, qui n’a <em>«jamais pu y remettre les pieds»</em>, Charles-Henri Fuchs est retourné plusieurs fois sur les lieux où ses enfants ont grandi. Parce qu’il <em>«veillait à toujours garder tout en ordre»</em>, l’état d’abandon où la ferme a été laissée l’affecte. Mais cela s’arrête là. <em>«Mon fils s’était déjà projeté dans une reprise de l’exploitation, donc ça a été plus dur pour lui que pour moi. Il serait du reste toujours intéressé à exploiter ces terres.»</em>
            </p>

            <p className="text-lg mb-6">
              Récemment, Charles-Henri Fuchs et son épouse ont été entendus par la commission du Grand Conseil qui planche sur les problèmes au sein de la Commission foncière rurale, révélés notamment par <a href="https://www.blick.ch/fr/dossiers/nos-enquetes-autour-des-terres-agricoles-id21984563/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">des enquêtes de Blick</a>. S’il n’a pas beaucoup parlé, Charles-Henri Fuchs a tenu à s’exprimer sur un point qui lui tient à cœur <em>«Je leur ai dit, aux gens de l’État:  les premiers fautifs de cette situation, c’est vous.»</em>
            </p>

            <p className="text-lg mb-6">
              Le cas de la Flogère, qui avait été soulevé par heidi.news en 2020, a fait l’objet en 2023 d’une interpellation au Grand Conseil, rédigée par la députée Ensemble à gauche Mathilde Marendaz. L’élue citait également le domaine des Ursins, dont Blick a raconté l’histoire récemment. Dans sa réponse, le Conseil d’État évoquait deux procédures de révocation en cours d’instruction par la Commission foncière rurale <em>«en lien avec les éléments exposés par l’interpellatrice».</em> Selon nos informations, ces procédures seraient toujours en cours, mais impossible d’en savoir plus. Contacté, le Département de l’agriculture en mains de Valérie Dittli nous a renvoyés vers la CFR&nbsp;I. Quant à cette dernière, elle n’a pas répondu à nos questions. 
            </p>

            <Clear />
          </div>
        </section>

        {/* 8. Chapitre 7 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-7" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="7"
            titlePart1="Lausanne"
            titlePart2="«J’ai 90 ans et je ne veux pas parler de ça parce que ça me rend triste»"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH7_OUV_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            
            <p className="text-lg mb-6 lettrine">
              Pourquoi Orllati n’a-t-il pas acheté directement les terrains de la Flogère, sans passer par des paysans? En effet, la Loi sur le droit foncier rural comprend une autre exception: son article 64 stipule qu’il est possible de déroger au principe de l’exploitant à titre personnel lorsque l’achat a pour but l’exploitation des ressources du sol permise par le droit de l’aménagement du territoire, ce qui est le cas du gravier.   
            </p>

            <p className="text-lg mb-6">
              En théorie, Orllati aurait donc pu acheter la Flogère en tant qu’exploitant de gravière.  Sauf que la loi comporte un obstacle de taille: si le terrain n’est pas utilisé dans les quinze ans à compter de son acquisition, il doit être revendu. Or, le domaine des gravières est mouvant, incertain, tendu et nécessite beaucoup de patience, comme l’expliquait Avni Orllati lui-même dans une interview accordée à <a href="https://www.rts.ch/play/tv/big-boss/video/avni-orllati-administrateur-delegue-groupe-orllati?urn=urn:rts:video:13343328" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">l’émission Big Boss de la RTS en 2022</a> . La planification souffre notamment des rebuffades des citoyens, qui refusent de cautionner le béton ou la détérioration de leur environnement direct, comme dans le cas des gravières <a href="https://sauvegardedesboisdeballens.ch/" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-2 hover:text-accent2 transition-colors">de Ballens</a> et de La Chaux (Cossonay). Par ailleurs, un terrain acheté en vue de l’exploitation d’une gravière coûte beaucoup plus cher en raison des revenus qui pourront en être dégagés. Ici encore, mieux vaut donc acheter avec l’étiquette d’un paysan.
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
            videoSrc="https://cdn.jwplayer.com/manifests/SRcUABGB.m3u8"
            ratio="16/9"
            overflow="med"
            caption="Par le biais de Henny Frères SA, Orllati contrôle également plusieurs parcelles agricoles dans l’Est lausannois."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Outre les vignes de Lavaux et le domaine de la Flogère, Henny Frères a acheté plusieurs parcelles situées en zone agricole près de la zone industrielle de Vernand, dans l’Est lausannois. L’une d’entre elles aurait coûté plusieurs millions, car elle était grevée d’hypothèques. Au moment de l’acquisition, des terrains étaient exploités par un paysan, qui aurait pu se revendiquer du droit de préemption. Au lieu de cela, les parcelles ont été vendues à Henny frères SA, et l’agriculteur a signé un contrat pour pouvoir continuer à exploiter. Contacté, il n’a pas souhaité s’exprimer. De sources concordantes, le paysan n’avait pas les moyens financiers pour s’aligner. Ici non plus, ce ne serait donc pas Henny frères qui s'occuperait directement des terres. 
            </p>

            

            <p className="text-lg mb-6">
              Au cœur d’un hameau situé dans le secteur se trouve également une belle ferme, directement propriété d’Orllati Real Estate selon le registre foncier. On ignore si une exception à la loi a été activée ici par le promoteur. Mais l’histoire, relatée par le voisinage, est tragique: après le décès de la fille de la propriétaire, le beau-fils de cette dernière aurait revendu à son insu à Orllati, qui y logerait actuellement des ouvriers à l’étage. Contactée, l’ancienne propriétaire n’a pas souhaité s’exprimer: <em>«J’ai 90 ans et je ne veux pas parler de ça, parce que ça me rend triste»</em>. On sait par contre qu’Avni Orllati s’est rendu régulièrement dans le hameau ces dernières années, pour tenter de convaincre les autres propriétaires de lui vendre leurs biens. Une veuve aurait ainsi reçu la visite du promoteur deux semaines après la mort de son mari. 
            </p>

            <MediaGrid 
              images={["images/orllati/BlickFR-ORLLATI_CH7_SEC.jpg"]}
              ratio="3/2"
              overflow="low"
              caption={null}
              // badge="Pour Julie - Ressemblance OK"
              // badgeColor="violet"
            />
          
            <p className="text-lg mb-6">
              Le hameau et ses champs attenants, détenus ou convoités par Orllati, sont situés à côté d'une zone industrielle, où le constructeur nourrissait de grands projets de logements freinés par le Canton, à qui le Tribunal cantonal a donné raison en 2024. Ils sont au cœur d’un secteur clé dont le développement est en train d’être repensé. Une partie est en outre également située sur le site d’une décharge pour de la terre d’excavation des chantiers.
            </p>

           

            

            <SideBlock 
              side="right"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_MARCELPOIX.jpg"
              alt="Renaud Marcelpoix"
              ratio="3/4"
              caption="Renaud Marcelpoix, chef de la division Géologie, sols, déchets et eaux souterraines à la direction générale de l’environnement, n'a pas souhaité s'exprimer."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="hidden md:block"
            />

            <p className="text-lg mb-6">
              Ces situations sont d’autant plus questionnantes que le groupe de Bioley-Orjulaz vient d’engager le chef de la division Géologie, sols, déchets et eaux souterraines à la direction générale de l’environnement, Renaud Marcelpoix, ainsi que son adjointe. Un cas de pantouflage qui n’est pas une première: Par le passé, Orllati avait déjà mandaté comme consultant le géologue cantonal à la retraite, Jean-Daniel Dubois. Plusieurs années après son départ de l'État, le groupe avait également octroyé des mandats à l’ex-chef du Service du développement territorial, Philippe Gmür, qui se rendait également sur le terrain comme consultant indépendant. Dans un autre registre, Orllati a par ailleurs engagé en 2024 l'ancien DRH du CHUV, Antonio Racciatti, comme directeur des ressources humaines.
            </p>

            <p className="text-lg mb-6">
              La planification et les autorisations dans le domaine de la géothermie, des gravières et des décharges sont gérées par la division que les deux fonctionnaires s'apprêtent à quitter. C'est dire si leur départ interroge quant à la protection d'informations sensibles et à de potentiels conflits d'intérêts.
            </p>

            <SideBlock 
              side="right"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_MARCELPOIX.jpg"
              alt="Renaud Marcelpoix"
              ratio="3/4"
              caption="Renaud Marcelpoix, chef de la division Géologie, sols, déchets et eaux souterraines à la direction générale de l’environnement."
              // badge="Pour Julie"
              // badgeColor="violet"
              className="md:hidden w-1/2 mx-auto"
            />

             <p className="text-lg mb-6">
              Contacté, le Département de la Jeunesse, de l’environnement et de la sécurité (DJES), en mains de l’écologiste Vassilis Venizelos, nous répond ceci: <em>«L’État prend très au sérieux la protection des informations sensibles ainsi que la prévention de tout risque de conflit d’intérêts. Dans le cas présent, des mesures ont été prises dès l’annonce de leur départ.»</em> Il ajoute que les collaborateurs et collaboratrices sont soumis au respect du secret de fonction, ainsi qu’à des obligations de confidentialité, et que ces obligations <em>«demeurent pleinement applicables après la fin des rapports de travail»</em> — comme le prévoit le code pénal, rappelle le département.  
            </p>

             <p className="text-lg mb-6">
              Concernant les décisions de planification et d’autorisation, elles <em>«reposent sur des procédures transparentes, documentées et soumises à plusieurs niveaux de contrôle administratif et politique. Ces dispositifs garantissent l’égalité de traitement entre les acteurs concernés et visent à préserver en tout temps l’intérêt public»</em>, selon le DJES. Il ajoute que <em>«l’État ne peut ni ne doit empêcher une personne de poursuivre sa carrière auprès d’un employeur privé.»</em> L’entreprise Orllati précise quant à elle qu’elle <em>«engage ses collaborateurs pour leurs compétences dans le plein respect du cadre légal applicable.»</em>
            </p>

            <Clear />
          </div>
        </section>

        {/* 9. Chapitre 8 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-8" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="8"
            titlePart1="Jordils"
            titlePart2="«Vous ne vous intéressez qu’aux chauffards»"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH08_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            
            <p className="text-lg mb-6 lettrine">
              La société Henny Frères a acheté une vingtaine de parcelles agricoles pour un total estimé à plusieurs dizaines de millions de francs. Une société agricole nommée CRAFO SA, elle aussi administrée par Emmanuel Crausaz, est propriétaires de terrains à Eclépens, sur un site stratégique de développement d’activités industrielles en cours d’élaboration, jouxtant la voie de chemin de fer. 
            </p>

            <p className="text-lg mb-6">
              Un centre de traitement et de valorisation des scories de l’usine lausannoise Tridel, ainsi qu'une plateforme de valorisation et de recyclage des matériaux d’excavation devraient y voir le jour, comme le confirme Yvan Buehner, directeur de la société Cridec SA, qui a des intérêts dans le développement de ces parcelles industrielles: <em>«Orllati nous a toujours confirmé qu’il maitrisait le foncier, sans que nous ayons connaissance de quelle manière.»</em>  
            </p>
          </div>

          {/* Galerie 1 image, débordement élevé (high) */}
          <MediaGrid 
            ratio="16/9"
            overflow="med"
            caption="À Eclépens, c’est une autre société agricole, CRAFO SA, qui permet à Orllati de «maîtriser le foncier»."
          >
            {/* Actif : tbj7GKnS */}
            <AutoplayVideo videoSrc="https://cdn.jwplayer.com/manifests/oyfn5WOS.m3u8" ratio="16/9" bare />
            {/* Alternative pour test : https://cdn.jwplayer.com/players/F5fXKHRI-L2ArGylc.js */}
          </MediaGrid>

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              Jusqu’en 2024, CRAFO SA était présidée par une autre personne: Alexandre Fontannaz, qui n’est autre que le vice-syndic de Bettens, commune voisine de Bioley-Orjulaz, et chez qui la société est encore domiciliée. Contacté, celui qui est aussi caissier de l’UDC Gros-de-Vaud assure ne pas savoir ce qu’il faisait au sein de CRAFO et renvoie vers Emmanuel Crausaz. Nous avons également tenté de questionner ce dernier, qui n’était <em>«pas intéressé»</em> à nous répondre. Au cours de notre enquête, un grand nombre d’intervenants nous a fait savoir que si nous poursuivions la rédaction de cet article, ils déposeraient des plaintes pénales à notre encontre. C’est dire si le sujet est sensible.
            </p>

            <QuoteBlock 
              quote="Pourquoi, alors que tout le monde respecte les limitations de vitesse, vous ne vous intéressez qu’aux chauffards qui roulent à 160 sur l’autoroute?"
              author="Christian Aeberhard, secrétaire de la CFR&nbsp;I"
              accent="accent2"
            />

            {/* SideBlock à gauche (portrait) placé avant les 3 paragraphes pour float desktop correct */}
            <SideBlock 
              side="left"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_AEBERHARD_SEUL.jpg"
              alt="Christian Aeberhard, secrétaire administratif de la CFR&nbsp;I."
              ratio="3/4"
              caption="Christian Aeberhard, secrétaire administratif de la CFR&nbsp;I."
              // badge="Pour Julie - Ressemblance OK"
              // badgeColor="violet"
              className="hidden md:block"
            />

            <p className="text-lg mb-6">
              Quant au neveu, il aurait été formé pour permettre au groupe Orllati de continuer à accéder à des terres agricoles, selon une source proche du dossier. Il administre depuis peu deux sociétés, l’une ayant pour but les travaux agricoles, et l’autre l’exploitation d'un atelier mécanique et l'importation de machines. Toutes deux peuvent par ailleurs acheter et vendre des immeubles et parcelles agricoles. Dans la seconde société, <em>«le neveu»</em> n’est pas seul: il est associé au jeune agriculteur chez qui il a effectué une partie de son apprentissage, ainsi qu’à… Emmanuel Crausaz.
            </p>

            <SideBlock 
              side="left"
              imageSrc="images/orllati/BlickFR-ORLLATI_PORTRAIT_AEBERHARD_SEUL.jpg"
              alt="Christian Aeberhard, secrétaire administratif de la CFR&nbsp;I."
              ratio="3/4"
              caption="Christian Aeberhard, secrétaire administratif de la CFR&nbsp;I."
              // badge="Pour Julie - Ressemblance OK"
              // badgeColor="violet"
              className="md:hidden w-1/2 mx-auto"
            />

            <p className="text-lg mb-6">
              Toutes ces situations questionnent sur l’absence de garde-fous et de contrôles. Comment la Commission foncière rurale a-t-elle pu adouber de telles opérations au service d’un grand groupe de construction? Et comment des paysans peuvent-ils prétendre cultiver des terres aussi loin de leur exploitation de base? La révision de la Loi sur le droit foncier rural va dans le sens de davantage de contrôles, pour vérifier notamment que les terres sont bien exploitées par la personne qui les a achetées. Aujourd’hui déjà, la Commission foncière rurale a dix ans pour invalider une autorisation donnée sous de mauvais prétextes. Le fera-t-elle concernant les parcelles de Yens, de Vernand, de Corseaux, d’Arnex-sur-Nyon ou d’Eclépens?
            </p>

            <p className="text-lg mb-6">
              Interpellée en 2021 déjà par heidi.news, la CFR&nbsp;I avait promis qu’elle agirait rapidement. Son vice-président d’alors, Christian Aeberhard, qui est également cadre chez Prométerre, s’était tout de même plaint: <em>«Pourquoi, alors que tout le monde respecte les limitations de vitesse, vous ne vous intéressez qu’aux chauffards qui roulent à 160 sur l’autoroute?»</em>. Cinq ans plus tard, rien ne semble avoir changé. La situation fait d’autant plus réagir que beaucoup d’agriculteurs ont été confrontés aux demandes de justification parfois très invasives que peut exiger la CFR&nbsp;I:  <em>«Ils vérifient jusqu’à la couture de votre pantalon»</em>, résume l’un d’entre eux. 
            </p>

            <Clear />
          </div>
        </section>

        {/* 10. Chapitre 9 (Encapsule l'en-tête et le corps du chapitre) */}
        <section id="chapitre-9" className="w-full mt-12 md:mt-20 text-gray-800">
          
          <ChapterHeader4 
            chapterNumber="9"
            titlePart1="Epilogue"
            titlePart2="«Les plus petits disparaissent, les plus grands s’agrandissent»"
            align="top"
            ratio="16/9"
            src="images/orllati/BlickFR-ORLLATI_CH9_OUV_Main_HR.jpg"
            // badge="Pour Julie"
            // badgeColor="violet"
          />

          {/* Corps de texte du chapitre */}
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0 mt-0 md:mt-12">
            
            <p className="text-lg mb-6 lettrine">
              La problématique qui fait l’objet de cette enquête s’inscrit dans un contexte de <em>«deux poids, deux mesures»</em> au bénéfice des plus puissants, comme le résument plusieurs de nos interlocuteurs. Car beaucoup de personnes souhaitent acquérir des terres agricoles pour les cultiver, mais n’y arrivent pas. C’est le cas de <em>«néoruraux»</em>, ces paysans qui ne sont pas issus du monde agricole et qui ont toutes les peines du monde à trouver un terrain exploitable à un prix décent. Et également des <em>«héritiers évincés»</em>, soit les frères et sœurs qui sont restés sur la touche lors de la remise du domaine.
            </p>

            <p className="text-lg mb-6">
              Selon une connaisseuse du dossier qui souhaite garder l’anonymat, <em>«il faudrait élargir pour permettre aux néoruraux d’exploiter tout en serrant la vis autour de la spéculation. Le paysage agricole va changer radicalement durant les quinze prochaines années. L’Union suisse des paysans affirme que les prix sont limités par la Loi sur le droit foncier rural. Mais il y a un immense marché spéculatif sous le tapis. Résultat: les plus petits disparaissent, les plus grands s’agrandissent.»</em> Cette situation offre également un boulevard aux entités extérieures au monde agricole. Car tous nos interlocuteurs confirment que <em>«l’argent mignon»</em> est monnaie courante dans ce secteur.  <em>«Sans ajouter une somme sous la table, vous ne pouvez pas acheter un terrain»</em>, est persuadé un paysan. <em>«C’est un énorme problème.»</em>
            </p>
          </div>

          {/* Composant de vidéo verticale centré (320px max-width) */}
          <VerticalVideo 
            videoSrc="https://cdn.jwplayer.com/manifests/ZG7KJDpY.m3u8"
            poster="images/orllati/poster-bureau.png"
            caption="Éline Müller, secrétaire politique de l’organisation paysanne indépendante Uniterre."
          />

          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <p className="text-lg mb-6">
              D’autres encore ambitionnent de devenir propriétaires de ce type de parcelles afin de les protéger, ce qui est possible en vertu de la loi. Mais dans la réalité, c’est une gageure, selon le secrétaire général de Pro Natura, Alberto Mocchi:  <em>«Notre organisation a acquis des centaines d’hectares de terres agricoles dans les années 1970. Mais aujourd’hui, la CFR&nbsp;I refuse systématiquement. Nous voulions par exemple acheter 20 hectares de terrain au Larzet, à Ormont-dessus. Ce sont des parcelles de prairies sèches qui ont une grande valeur en termes de biodiversité. L’idée n’était pourtant pas de les rendre à la nature - on n’a jamais fait ça - mais de les maintenir en exploitation.»</em> 
            </p>

            <QuoteBlock 
              quote="Il faudrait élargir pour permettre aux néoruraux d’exploiter tout en serrant la vis autour de la spéculation"
              author="Une connaisseuse du dossier"
              accent="accent2"
            />

            <p className="text-lg mb-6">
              La facilité avec laquelle un groupe actif dans l’immobilier et la construction semble pouvoir acquérir certains terrains est d’autant plus frappante. <em>«Pour nous, le fait que ce type d’entreprise ait accès à des terres agricoles pour y développer des gravières ou des carrières est une catastrophe»</em>, relève Éline Müller, secrétaire politique de l’organisation paysanne indépendante Uniterre. <em>«Chaque mètre carré de terre agricole en Suisse doit être préservé pour l’agriculture vivrière, à savoir celle qui produit de l’alimentation.»</em> 
            </p>

            <p className="text-lg mb-6">
              <em>*Noms connus de la rédaction</em>
            </p>


            <Clear />
          </div>
        </section>

        {/* <section className="w-full mt-16 md:mt-20 italic text-[#8f7d4d]">
          <div className="w-full max-w-[672px] mx-auto leading-relaxed px-0">
            <hr className="border-t border-gray-200 mb-12" />
            <p className="text-lg mb-6">
              Au terme de cette enquête, un paradoxe surgit. Il y a trente ans, la Loi sur le droit foncier rural a été pensée pour protéger la terre des appétits de ceux qui ne la cultivent pas. Dans le canton de Vaud, elle paraît aujourd'hui servir l'inverse : permettre à un groupe de construction de constituer une réserve foncière que rien ne destine à nourrir qui que ce soit. Entre les paysans qui se taisent par peur, les communes qui s’abritent derrière le «droit privé», les départements qui se renvoient la balle et une Commission foncière rurale aux abonnés absents, c'est tout un édifice de garde-fous qui dysfonctionne. La loi prévoit dix ans pour invalider une autorisation obtenue en fournissant de fausses informations. Le chronomètre tourne. La question est de savoir si quelqu'un, à l'État, le regarde encore.
            </p>
          </div>
        </section> */}

        {/* Crédits */}
        <Credits items={STORY.credits.filter(credit => credit.inCredits)} />

        <div className="p-4 bg-gray-50 rounded-md mt-6 mb-6 w-full max-w-[672px] mx-auto">
          <p className="font-mono text-xs text-gray-600">
           Ces visuels ont été conçus par une personne et réalisés à l’aide de l’IA.
          </p>
        </div>
        
      </article>
    </>
  );
}
