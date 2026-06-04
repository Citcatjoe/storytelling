"use client";

import React from "react";

interface QuoteBlockProps {
  quote: string;
  author: string;
  info?: string; // ex: "Zurich, Janvier 2016"
  imageSrc?: string;
  accent?: "accent1" | "accent2";
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
}: QuoteBlockProps) {
  // Sélection de la couleur d'accentuation en fonction du prop accent
  const accentTextClass = accent === "accent2" ? "text-accent2" : "text-accent1";
  const accentBgClass = accent === "accent2" ? "bg-accent2" : "bg-accent1";
  const accentBorderClass = accent === "accent2" ? "border-accent2" : "border-accent1";

  return (
    <blockquote className="my-16 mx-auto w-full max-w-[600px] flex flex-col items-center select-none text-center">
      {/* Pastille circulaire de l'auteur (96x96 px) */}
      <div className={`w-24 h-24 rounded-full overflow-hidden mb-8 ${accentBgClass} flex items-center justify-center border-2 ${accentBorderClass} transition-all duration-300 hover:scale-105`}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={author}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>

      {/* Texte de la citation (30px / text-3xl, font-weight 600 / font-semibold) */}
      <div className="text-3xl font-semibold text-black leading-snug tracking-tight mb-6 subpixel-antialiased px-4">
        {quote.startsWith("«") || quote.startsWith("“") ? quote : `« ${quote} »`}
      </div>

      {/* Signature / Attribution (18px / text-lg, font-weight 600 / font-semibold, colorAccent2) */}
      <cite className={`not-italic font-semibold text-lg ${accentTextClass} tracking-wide transition-colors duration-300`}>
        — {author}{info ? `, ${info}` : ""}
      </cite>
    </blockquote>
  );
}
