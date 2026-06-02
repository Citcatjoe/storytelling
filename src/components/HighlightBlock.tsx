"use client";

import { ReactNode } from "react";
import { BREAKOUTS } from "@/config/layout";

interface HighlightBlockProps {
  children: ReactNode;
  bgColor?: string;
  className?: string;
}

/**
 * Composant de mise en avant avec débordement (Breakout).
 * Le fond s'étend sur toute la largeur de l'article (Hero Edge).
 * Le contenu interne est aligné sur le mode "med" des galeries.
 */
export function HighlightBlock({ 
  children, 
  bgColor = "bg-trame",
  className = ""
}: HighlightBlockProps) {
  return (
    <div className={`highlight ${bgColor} ${BREAKOUTS.high.pageFullWidth} py-12 my-16 transition-all duration-300 ${className}`}>
      <div className={`${BREAKOUTS.med.container} px-6 md:px-0 text-gray-800`}>
        {children}
      </div>
    </div>
  );
}
