"use client";

import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { BREAKOUTS } from '@/config/layout';

interface GalleryProps {
  images?: string[];
  ratio?: string;             // Aspect ratio for placeholders, e.g. "3/2", "16/9"
  placeholderCount?: number;  // Number of placeholder images to display (1, 2, or 3)
  placeholderTxt?: string;    // Custom text to show inside each placeholder
  overflow?: "low" | "med" | "high";
  caption?: string;
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

export function Gallery({ 
  images, 
  ratio = "3/2", 
  placeholderCount, 
  placeholderTxt = "Zoning Image",
  overflow = "low", 
  caption,
  badge,
  badgeColor = "rouge"
}: GalleryProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const handleImageLoad = (idx: number) => {
    setLoadedImages(prev => ({ ...prev, [idx]: true }));
  };

  // Détermination de la largeur d'échappement (Breakout)
  let containerClass = "w-full max-w-[672px] mx-auto px-4 md:px-0"; // low
  if (overflow === "med") {
    containerClass = BREAKOUTS.med.container; 
  } else if (overflow === "high") {
    containerClass = BREAKOUTS.high.container;
  }

  // Détermination du nombre de colonnes pour la grille
  const colCount = images && images.length > 0 ? images.length : (placeholderCount || 1);
  let gridClass = "grid-cols-1";
  if (colCount === 2) gridClass = "grid-cols-1 sm:grid-cols-2 gap-4";
  if (colCount >= 3) gridClass = "grid-cols-1 sm:grid-cols-3 gap-4";

  const hasImages = images && images.length > 0;
  
  // Générer un tableau d'index pour les placeholders
  const placeholderArray = Array.from({ length: colCount });

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  return (
    <figure className={`my-12 ${containerClass} relative transition-all duration-300`}>
      {badge && (
        <div className="absolute top-4 right-4 z-10 select-none">
          <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
            {badge}
          </span>
        </div>
      )}
      <div className={`grid ${gridClass}`}>
        {hasImages ? (
          /* Mode 1 : Rendu des images réelles avec lazy loading & loading overlay */
          images.map((src, idx) => {
            const isLoaded = loadedImages[idx];
            return (
              <div key={idx} className="relative w-full overflow-hidden rounded-lg bg-[#E5DCC3]/10">
                {/* Shimmer / Skeleton activity indicator */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center min-h-[220px] overflow-hidden">
                    {/* Shimmer Wave (high-contrast white sweep) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
                    
                    {/* Subtle image icon placeholder */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="1" 
                      className="w-10 h-10 text-neutral-400/40 animate-pulse relative z-10"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                )}
                <Zoom>
                  <img 
                    ref={(el) => {
                      if (el && el.complete && !isLoaded) {
                        setTimeout(() => handleImageLoad(idx), 0);
                      }
                    }}
                    src={src} 
                    alt={caption ? `${caption} - image ${idx + 1}` : `Image ${idx + 1}`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(idx)}
                    className={`w-full h-auto bg-slate-50 cursor-zoom-in rounded-lg transition-opacity duration-500 ease-out ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Zoom>
              </div>
            );
          })
        ) : (
          /* Mode 2 : Rendu des placeholders de zoning */
          placeholderArray.map((_, idx) => (
            <div 
              key={idx}
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
              
              {placeholderTxt && (
                <span className="text-sm font-medium text-[#8E8366] leading-tight mb-1.5 max-w-[80%]">
                  {placeholderTxt} {colCount > 1 ? `${idx + 1}` : ""}
                </span>
              )}
              
              {ratio && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-75">
                  Ratio {ratio}
                </span>
              )}
            </div>
          ))
        )}
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
