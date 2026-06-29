import React from 'react';
import { Image } from './Image';
import { mergeMargins } from '@/config/layout';

interface SideBlockProps {
  side: 'left' | 'right';
  children?: React.ReactNode;
  imageSrc?: string;
  alt?: string;
  caption?: string | null;
  ratio?: string; // "3/2", "1/1", "4/3", "9/16" etc. instead of width/height
  placeholderText?: string;
  placeholderTxt?: string; // Unified alias prop
  className?: string;
  badge?: string;             // Badge label text
  badgeColor?: string;        // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
  noShadow?: boolean;
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
 * SideBlock component for content floating on the sides of the main text column.
 * It implements a responsive "breakout" effect with negative margins on large screens.
 * Features advanced "zoning" placeholders when no image is provided.
 */
export function SideBlock({ 
  side, 
  children, 
  imageSrc, 
  alt = "", 
  caption, 
  ratio = "3/2", // Default to classic 3:2 landscape
  placeholderText, 
  placeholderTxt,
  className = "",
  badge,
  badgeColor = "rouge",
  noShadow = true
}: SideBlockProps) {
  const isRight = side === 'right';
  const textToShow = placeholderText || placeholderTxt;
  
  // Base responsive logic for floating and negative margins
  const floatClass = isRight ? "md:float-right" : "md:float-left";
  
  // Margin logic to repel text
  const marginClass = isRight ? "md:ml-16" : "md:mr-16";
  
  // Breakout logic: negative margins that increase with screen size
  const breakoutClass = isRight
    ? "md:-mr-[0px] lg:-mr-[150px] xl:-mr-[200px] 2xl:-mr-[250px]"
    : "md:-ml-[0px] lg:-ml-[150px] xl:-ml-[200px] 2xl:-ml-[250px]"; // Keep breakout symmetry if needed

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  // Check if a custom mobile width has been passed in className (e.g. w-1/2, w-1/3, etc.)
  const customMobileWidth = className.split(/\s+/).find(c => /^w-(?!full$)/.test(c)) || "";
  const hasBaseWidth = className.split(/\s+/).some(c => /^w-/.test(c));
  const hasMdWidth = className.split(/\s+/).some(c => /^md:w-/.test(c));
  
  // If a custom mobile width was passed, we'll apply it to the image container inside rather than the outer wrapper,
  // allowing the caption to span the full width.
  const outerWidthClass = customMobileWidth ? "w-full" : (hasBaseWidth ? "" : "w-full");
  const innerWidthClass = customMobileWidth ? `${customMobileWidth} mx-auto md:w-full md:mx-0` : "w-full";
  const mdWidthClass = hasMdWidth ? "" : "md:w-[350px]";

  // Filter customMobileWidth and mx-auto out of outer className if we're moving it inside
  const outerClassName = customMobileWidth 
    ? className.split(/\s+/).filter(c => c !== customMobileWidth && c !== "mx-auto").join(" ")
    : className;

  return (
    <div className={`${mergeMargins("mb-8", outerClassName)} mt-10 md:mt-0 ${outerWidthClass} ${mdWidthClass} transition-all duration-300 ${floatClass} ${marginClass} ${breakoutClass}`}>
      <figure className="w-full relative">
        {badge && (
          <div className="absolute top-4 right-4 z-10 select-none">
            <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
              {badge}
            </span>
          </div>
        )}
        
        {/* Wrapper for the media content that can have restricted width on mobile */}
        <div className={innerWidthClass}>
          {imageSrc ? (
            <Image 
              src={imageSrc} 
              alt={alt || caption || "Image"}
              ratio={ratio}
              zoomable={true}
              forceRatio={true}
              className={`rounded-2xl ${noShadow ? "" : "shadow-md"}`}
              imgClassName="object-cover rounded-2xl w-full h-full"
            />
          ) : children ? (
            /* Priorité 2 : Rendu des enfants si fournis (compatibilité) */
            children
          ) : (
            /* Priorité 3 : Gabarit de zoning (Placeholder) ultra-premium */
            <Image 
              ratio={ratio}
              placeholderTxt={textToShow}
              zoomable={false}
              className="rounded-2xl border-none bg-transparent"
            />
          )}
        </div>

        {/* Légende commune alignée avec les styles du composant MediaGrid */}
        {caption && (
          <figcaption className="mt-3 text-xs text-black text-center md:text-left font-light w-full">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
