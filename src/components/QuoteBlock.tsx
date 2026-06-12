"use client";

import React from "react";
import { mergeMargins } from "@/config/layout";

interface QuoteBlockProps {
  quote: string;
  author: string;
  info?: string; // ex: "Zurich, Janvier 2016"
  imageSrc?: string;
  accent?: "accent1" | "accent2";
  className?: string;
}

/**
 * Composant de citation éditorial (Blockquote) haut de gamme.
 * Présente un portrait circulaire coloré, une citation centrée en gras,
 * et une attribution stylisée utilisant les couleurs d'accentuation du projet.
 */
export function QuoteBlock({
  quote,
  author,
  info,
  imageSrc,
  accent = "accent2", // Default to accent2 (deep red)
  className = "",
}: QuoteBlockProps) {
  // Sélection de la couleur d'accentuation en fonction du prop accent
  const accentTextClass = accent === "accent2" ? "text-accent2" : "text-accent1";
  const accentBgClass = accent === "accent2" ? "bg-accent2" : "bg-accent1";
  const accentBorderClass = accent === "accent2" ? "border-accent2" : "border-accent1";

  return (
    <blockquote className={`${mergeMargins("mt-12 mb-12 md:mt-16 md:mb-16", className)} mx-auto w-full max-w-[600px] flex flex-col items-center select-none text-center`}>
      {/* Pastille circulaire de l'auteur (64x64 px on mobile, 96x96 px on desktop) */}
      <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden mb-6 md:mb-8 ${accentBgClass} flex items-center justify-center border-2 ${accentBorderClass} transition-all duration-300 hover:scale-105`}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={author}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      {/* Texte de la citation (20px on mobile, 30px on desktop) */}
      <div className="text-xl md:text-3xl font-semibold text-black leading-snug tracking-tight mb-4 md:mb-6 subpixel-antialiased px-4">
        {quote.startsWith("«") || quote.startsWith("“") ? quote : `« ${quote} »`}
      </div>

      {/* Signature / Attribution (16px on mobile, 18px on desktop) */}
      <cite className={`not-italic font-semibold text-base md:text-lg ${accentTextClass} tracking-wide transition-colors duration-300`}>
        — {author}{info ? `, ${info}` : ""}
      </cite>
    </blockquote>
  );
}
