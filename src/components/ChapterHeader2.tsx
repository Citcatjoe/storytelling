"use client";

import { useRef, useEffect } from "react";
import type { CSSProperties } from "react";
import { BREAKOUTS } from "@/config/layout";
import { Image } from "./Image";

interface ChapterHeader2Props {
  titlePart1?: string;
  titlePart2?: string;
  chapterNumber?: string | number;
  src?: string;
  ratio?: string; // e.g., "16/9" or "21/9"
  placeholderTxt?: string;
  badge?: string;             // Badge label text
  badgeColor?: string;        // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
  alt?: string;
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
  titlePart1,
  titlePart2,
  chapterNumber,
  src,
  ratio = "16/9",
  placeholderTxt = "Zoning En-tête",
  badge,
  badgeColor = "rouge",
  alt
}: ChapterHeader2Props) {
  // Formatage du numéro de chapitre (ex: 1 -> 01)
  const formattedNumber = chapterNumber !== undefined
    ? (typeof chapterNumber === 'number' || !isNaN(Number(chapterNumber))
      ? String(chapterNumber).padStart(2, '0')
      : chapterNumber)
    : null;

  const resolvedAlt = alt || (titlePart1 && titlePart2 ? `${titlePart1} : ${titlePart2}` : (titlePart1 || titlePart2 || ""));

  const hasImage = !!src;

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  const hasTitle = !!(formattedNumber || titlePart1 || titlePart2);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const card = cardRef.current;
    if (!header || !card || typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        card.style.transform = "";
        card.style.transition = "";
        return;
      }

      const rect = header.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      if (rect.top < viewHeight && rect.bottom > 0) {
        const viewportCenter = viewHeight / 2;
        const headerCenter = rect.top + rect.height / 2;
        const distanceFromCenter = headerCenter - viewportCenter;
        const parallaxY = -distanceFromCenter * 0.08;
        card.style.transition = "none";
        card.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header ref={headerRef} className="relative -mx-4 w-[calc(100%+2rem)] md:mx-auto md:w-full max-w-screen-2xl px-0 md:px-7 mb-12 md:mb-20 transition-all duration-300 group">
      {/* Background Figure/Container that dictates the height.
          Sur mobile le ratio est forcé en 4/3 (plus haut) car la carte titre
          chevauche le bas de l'image ; le ratio fourni s'applique dès md. */}
      <figure
        className={`w-full relative overflow-hidden rounded-none md:rounded-2xl transition-all duration-300 aspect-[4/3] md:aspect-(--header-ratio) ${
          hasImage
            ? "bg-black"
            : "bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none"
        }`}
        style={{ "--header-ratio": ratio } as CSSProperties}
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
            <Image
              src={src}
              alt={resolvedAlt}
              zoomable={false}
              className="absolute inset-0 w-full h-full rounded-2xl bg-transparent"
              imgClassName="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
            />
            {/* Dégradé sombre très léger pour faire ressortir la carte blanche du fond */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Mode 2: Place-holder de zoning avec style premium (au centre) */
          <div className="flex flex-col items-center justify-center mb-14 md:mb-20">
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

      </figure>

      {/* Carte titre.
          Mobile : dans le flux, sous l'image, remontée pour chevaucher légèrement
          le bas de l'illustration (l'image reste presque entièrement visible).
          Desktop (md+) : overlay absolu en bas à gauche de la figure. */}
      {hasTitle && (
        <div
          ref={cardRef}
          className="relative z-10 -mt-14 mx-4 bg-white p-4 rounded-xl border border-gray-100/50 shadow-lg md:absolute md:bottom-2 md:left-14 md:mt-0 md:mx-0 md:max-w-[560px] md:p-5 md:rounded-xl md:shadow-xl flex flex-col items-start text-left transform transition-transform duration-500 ease-out"
        >
          {formattedNumber && (
            <div className="flex items-center gap-4 mb-2 md:mb-3 select-none">
              <span className="text-3xl md:text-5xl lg:text-6xl font-mono font-black leading-none text-accent2">
                {formattedNumber}
              </span>
              <span aria-hidden className="block h-[3px] w-10 md:w-14 bg-accent2" />
            </div>
          )}
          <h2 className="text-xl md:text-2xl lg:text-4xl font-black tracking-tight leading-snug md:leading-tight text-gray-900">
            {titlePart1 && <>{titlePart1}{titlePart2 ? " : " : ""}</>}
            {titlePart2 && <span className="italic">{titlePart2}</span>}
          </h2>
        </div>
      )}
    </header>
  );
}
