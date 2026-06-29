"use client";

import { STORY } from "@/config/variables";
import { Image } from "./Image";
import { Authors3 } from "./Authors3";

interface HeroProps {
  category?: string;
  title?: string;
  titleDisplay?: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: string; // e.g. "violet", "rouge", "jaune", "vert" or tailwind bg-class
  imageSrc?: string;
  imageAlt?: string;
  ratio?: string;
}

const colorMap: Record<string, string> = {
  violet: "bg-purple-600",
  purple: "bg-purple-600",
  rouge: "bg-[#E20000]",
  red: "bg-[#E20000]",
  jaune: "bg-amber-500",
  yellow: "bg-amber-500",
  vert: "bg-[#009FAB]",
  green: "bg-[#009FAB]",
};

export function Hero({
  category = "Enquête",
  title = STORY.title,
  titleDisplay = STORY.titleDisplay || STORY.title,
  subtitle = "En s’appuyant sur des agriculteurs placés dans des sociétés anonymes, le promoteur vaudois, également actif dans les décharges et le béton, contrôle des parcelles qui devraient être réservées à des paysans exploitant eux-mêmes leurs terres. Avec des avantages stratégiques et financiers à la clé. ",
  badge,
  badgeColor = "violet",
  imageSrc,
  imageAlt = "Illustration principale",
  ratio = "16/9",
}: HeroProps) {
  // Resolve badge color
  const resolvedBgColor = badgeColor.startsWith("bg-")
    ? badgeColor
    : (colorMap[badgeColor.toLowerCase()] || "bg-purple-600");

  return (
    <div id="hero" className="bg-trame pt-8 pb-8 md:pt-20 md:pb-14 -mx-4 md:-mx-7 -mt-4 md:-mt-7">
      <div id="hero-container" className="w-full mx-auto max-w-6xl px-4 md:px-0 [@container]">
        {category && (
          <div className="flex items-center justify-center gap-4 select-none text-sm md:text-lg font-mono font-black uppercase tracking-[0.35em] text-[#E20000]">
            <span className="h-[2px] md:h-[2px] w-12 md:w-20 bg-[#E20000]" />
            <span>{category}</span>
            <span className="h-[2px] md:h-[2px] w-12 md:w-20 bg-[#E20000]" />
          </div>
        )}

        <h1 className="text-center text-[clamp(1.5rem,6cqw,4rem)] leading-[1.083] tracking-tighter font-black mt-6 md:mt-10 antialiased">
          {titleDisplay.split("<br>").map((line, i) => (
            <span key={i} className="block sm:whitespace-nowrap">
              {line}
            </span>
          ))}
        </h1>

        <figure className="mt-6 md:mt-12 -mx-4 w-[calc(100%+2rem)] md:mx-auto md:w-full md:max-w-screen-2xl md:px-7 relative transition-all duration-300">
          {badge && (
            <div className="absolute top-4 right-4 md:right-11 z-10 select-none">
              <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
                {badge}
              </span>
            </div>
          )}
          <Image 
            src={imageSrc}
            alt={imageAlt}
            placeholderTxt="Illustration principale"
            ratio={ratio}
            forceRatio={true}
            className="rounded-none md:rounded-lg"
          />
        </figure>

        {subtitle && (
          <div className="w-full max-w-[672px] mx-auto mt-8 md:mt-12 text-gray-800 leading-relaxed">
            <h2 className="font-medium text-xl md:text-2xl">{subtitle}</h2>
          </div>
        )}

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
  );
}
