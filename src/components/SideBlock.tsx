import React from 'react';

interface SideBlockProps {
  side: 'left' | 'right';
  children?: React.ReactNode;
  imageSrc?: string;
  alt?: string;
  caption?: string;
  ratio?: string; // "3/2", "1/1", "4/3", "9/16" etc. instead of width/height
  placeholderText?: string;
  placeholderTxt?: string; // Unified alias prop
  className?: string;
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
  badgeColor = "rouge"
}: SideBlockProps) {
  const isRight = side === 'right';
  const textToShow = placeholderText || placeholderTxt;
  
  // Base responsive logic for floating and negative margins
  const floatClass = isRight ? "md:float-right" : "md:float-left";
  
  // Margin logic to repel text
  const marginClass = isRight ? "md:ml-16" : "md:mr-16";
  
  // Breakout logic: negative margins that increase with screen size
  const breakoutClass = isRight
    ? "-mr-[0px] lg:-mr-[150px] xl:-mr-[200px] 2xl:-mr-[250px]"
    : "-ml-[0px] lg:-ml-[150px] xl:-ml-[200px] 2xl:-ml-[250px]";

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  return (
    <div className={`w-full md:w-[350px] mb-8 transition-all duration-300 ${floatClass} ${marginClass} ${breakoutClass} ${className}`}>
      <figure className="w-full relative">
        {badge && (
          <div className="absolute top-4 right-4 z-10 select-none">
            <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
              {badge}
            </span>
          </div>
        )}
        {/* Priorité 1 : Rendu de l'image si imageSrc est fournie */}
        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt={alt}
            className="w-full h-auto object-cover rounded-xl shadow-md border border-gray-100"
            style={{ aspectRatio: ratio }}
          />
        ) : children ? (
          /* Priorité 2 : Rendu des enfants si fournis (compatibilité) */
          children
        ) : (
          /* Priorité 3 : Gabarit de zoning (Placeholder) ultra-premium */
          <div 
            className="w-full rounded-2xl bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none"
            style={{ aspectRatio: ratio }}
          >
            {/* Icône de gabarit discrète */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 text-[#A69B7B] opacity-40 mb-3"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            
            {textToShow && (
              <span className="text-sm font-medium text-[#8E8366] leading-tight mb-1.5 max-w-[80%]">
                {textToShow}
              </span>
            )}
            
            {ratio && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-75">
                Ratio {ratio}
              </span>
            )}
          </div>
        )}

        {/* Légende commune alignée avec les styles du composant Gallery */}
        {caption && (
          <figcaption className="mt-3 text-xs text-black text-left font-light">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  );
}
