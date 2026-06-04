"use client";

import { ReactNode } from "react";
import { BREAKOUTS } from "@/config/layout";

interface HighlightBlockProps {
  title?: string;
  children: ReactNode;
  bgColor?: string;
  className?: string;
  badge?: string;         // Badge label text
  badgeColor?: string;    // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
}

// Map standard French/English color names to the design system or Tailwind classes
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
 * Composant de mise en avant avec débordement (Breakout).
 * Le fond s'étend sur toute la largeur de l'article (Hero Edge).
 * Le contenu interne est aligné sur le mode "med" des galeries.
 * Supporte l'affichage d'un badge d'annotation en haut à droite.
 */
export function HighlightBlock({ 
  title,
  children, 
  bgColor = "bg-trame",
  className = "",
  badge,
  badgeColor = "rouge"
}: HighlightBlockProps) {
  
  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  return (
    <div className={`relative highlight ${bgColor} ${BREAKOUTS.high.pageFullWidth} py-12 my-16 transition-all duration-300 ${className}`}>
      
      {/* Rendu du badge en haut à droite, aligné avec le conteneur interne pour un rendu premium */}
      {badge && (
        <div className="absolute top-4 right-4 md:right-10 z-10 select-none">
          <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
            {badge}
          </span>
        </div>
      )}

      <div className={`${BREAKOUTS.med.container} text-gray-800`}>
        {title && (
          <h3 className="text-3xl font-bold mb-10 max-w-[500px] leading-tight">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>
  );
}
