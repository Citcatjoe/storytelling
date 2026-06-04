"use client";

import { BREAKOUTS } from "@/config/layout";

interface ChapterHeader2Props {
  title: string;
  chapterNumber?: string | number;
  src?: string;
  ratio?: string; // e.g., "16/9" or "21/9"
  placeholderTxt?: string;
  badge?: string;             // Badge label text
  badgeColor?: string;        // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
}

const colorMap: Record<string, string> = {
  violet: "bg-purple-600",
  purple: "bg-purple-600",
  rouge: "bg-[#E20000]", // Accent color 2
  red: "bg-[#E20000]",
  jaune: "bg-amber-500", // Warm yellow
  yellow: "bg-amber-500",
  vert: "bg-[#009FAB]", // Orllati brand color
  green: "bg-[#009FAB]",
};

/**
 * Version alternative de ChapterHeader avec le titre en superposition (Overlay)
 * s'étendant sur toute la largeur (Hero Edge).
 * La hauteur est déterminée par le ratio de la figure.
 */
export function ChapterHeader2({
  title,
  chapterNumber,
  src,
  ratio = "16/9",
  placeholderTxt = "Zoning En-tête",
  badge,
  badgeColor = "rouge"
}: ChapterHeader2Props) {
  // Formatage du numéro de chapitre (ex: 1 -> 01)
  const formattedNumber = chapterNumber !== undefined
    ? (typeof chapterNumber === 'number' || !isNaN(Number(chapterNumber))
      ? String(chapterNumber).padStart(2, '0')
      : chapterNumber)
    : null;

  const hasImage = !!src;

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  return (
    <header className={`relative ${BREAKOUTS.high.container} my-20 transition-all duration-300 group`}>
      {/* Background Figure/Container that dictates the height */}
      <figure
        className={`w-full relative overflow-hidden rounded-2xl transition-all duration-300 ${
          hasImage
            ? "bg-black"
            : "bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none"
        }`}
        style={{ aspectRatio: ratio }}
      >
        {badge && (
          <div className="absolute top-4 right-4 z-20 select-none">
            <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
              {badge}
            </span>
          </div>
        )}
        {hasImage ? (
          /* Mode 1: Image réelle avec zoom progressif au survol */
          <>
            <img
              src={src}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dégradé sombre très léger pour faire ressortir la carte blanche du fond */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Mode 2: Place-holder de zoning avec style premium (au centre) */
          <div className="flex flex-col items-center justify-center mb-16 md:mb-20">
            {/* Icône de gabarit discrète */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[#A69B7B] opacity-40 mb-3 transition-transform duration-700 group-hover:scale-110"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>

            {placeholderTxt && (
              <span className="text-sm font-medium text-[#8E8366] leading-tight mb-2 max-w-[80%]">
                {placeholderTxt}
              </span>
            )}

            {ratio && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-60">
                Ratio {ratio}
              </span>
            )}
          </div>
        )}

        {/* Conteneur de texte absolu, en bas à gauche de la figure, stylisé en carte flottante blanche */}
        <div
          className="absolute bottom-4 left-4 md:bottom-[30px] md:left-[30px] w-[calc(100%-32px)] md:w-auto max-w-[600px] bg-white p-5 md:p-6  border border-gray-100/50 flex flex-col items-start text-left pointer-events-auto transform transition-transform duration-500 ease-out group-hover:translate-y-[-4px]"
        >
          {formattedNumber && (
            <span className="inline-block text-4xl md:text-5xl lg:text-6xl font-mono font-black text-accent2 select-none mb-2">
              {formattedNumber}
            </span>
          )}
          <h2 className="text-xl md:text-3xl lg:text-5xl font-black tracking-tight leading-tight text-gray-900">
            {title}
          </h2>
        </div>
      </figure>
    </header>
  );
}
