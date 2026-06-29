"use client";

import React from 'react';
import { BREAKOUTS, mergeMargins } from '@/config/layout';
import { Image } from './Image';

interface MediaGridProps {
  children?: React.ReactNode;
  images?: string[];
  ratio?: string;             // Aspect ratio for placeholders, e.g. "3/2", "16/9"
  placeholderCount?: number;  // Number of placeholder images to display (1, 2, or 3)
  placeholderTxt?: string;    // Custom text to show inside each placeholder
  overflow?: "low" | "med" | "high";
  caption?: string | null;
  badge?: string;             // Badge label text
  badgeColor?: string;        // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
  className?: string;         // Additional CSS classes
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
 * MediaGrid displays one or more media elements (Images, AutoplayVideos, etc.)
 * in a responsive grid layout. It includes support for captioning, badging,
 * and breakouts.
 */
export function MediaGrid({ 
  children,
  images, 
  ratio = "3/2", 
  placeholderCount, 
  placeholderTxt = "Zoning Image",
  overflow = "low", 
  caption,
  badge,
  badgeColor = "rouge",
  className = ""
}: MediaGridProps) {

  // Détermination de la largeur d'échappement (Breakout)
  let containerClass = "w-full max-w-[672px] mx-auto px-0"; // low
  if (overflow === "med") {
    containerClass = "w-full max-w-[968px] mx-auto px-0 md:px-7"; 
  } else if (overflow === "high") {
    containerClass = "w-full max-w-screen-2xl mx-auto px-0 md:px-7";
  }

  // Détermination des enfants à afficher (composition vs héritage des props)
  let renderedChildren: React.ReactNode[] = [];
  
  if (children) {
    renderedChildren = React.Children.toArray(children);
  } else if (images && images.length > 0) {
    renderedChildren = images.map((src, idx) => (
      <Image 
        key={idx} 
        src={src} 
        alt={caption ? `${caption} - image ${idx + 1}` : `Image ${idx + 1}`}
        ratio={ratio}
      />
    ));
  } else {
    const count = placeholderCount || 1;
    renderedChildren = Array.from({ length: count }).map((_, idx) => (
      <Image 
        key={idx} 
        ratio={ratio} 
        placeholderTxt={`${placeholderTxt} ${count > 1 ? idx + 1 : ""}`}
      />
    ));
  }

  // Détermination du nombre de colonnes pour la grille
  const colCount = renderedChildren.length;
  let gridClass = "grid-cols-1";
  if (colCount === 2) gridClass = "grid-cols-1 sm:grid-cols-2 gap-4";
  if (colCount >= 3) gridClass = "grid-cols-1 sm:grid-cols-3 gap-4";

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  return (
    <figure className={`${mergeMargins("mt-10 md:mt-12 mb-8 md:mb-12", className)} ${containerClass} relative transition-all duration-300`}>
      {badge && (
        <div className="absolute top-4 right-4 z-10 select-none">
          <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
            {badge}
          </span>
        </div>
      )}
      <div className={`grid ${gridClass}`}>
        {renderedChildren}
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light leading-snug px-0">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
