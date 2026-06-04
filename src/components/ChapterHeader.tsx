"use client";

import { BREAKOUTS } from "@/config/layout";

interface ChapterHeaderProps {
  title: string;
  chapterNumber?: string | number;
  src?: string;
  ratio?: string;
  placeholderTxt?: string;
}

/**
 * Composant de titre de chapitre avec mise en page split 50/50.
 * S'étend sur toute la largeur de l'article (Hero Edge).
 * Affiche l'image fournie ou génère un gabarit de zoning (placeholder) si aucune image n'est passée.
 */
export function ChapterHeader({ 
  title, 
  chapterNumber, 
  src,
  ratio = "3/2",
  placeholderTxt = "Zoning En-tête"
}: ChapterHeaderProps) {
  return (
    <div className={`chapter-header ${BREAKOUTS.med.container} border-b border-gray-100 pt-24 pb-0 my-20 transition-all duration-300`}>
      <div className="grid grid-cols-1 md:grid-cols-2 items-end min-h-[400px] pb-16">
        
        {/* Colonne Gauche : Texte */}
        <div className="flex flex-col justify-end pr-6 md:pr-12 py-12 md:pb-0 md:pt-8">
          {chapterNumber && (
            <div className="w-12 h-12 flex items-center justify-center border-2 border-accent2 text-accent2 font-bold text-lg mb-6 font-mono select-none">
              {typeof chapterNumber === 'number' || !isNaN(Number(chapterNumber))
                ? String(chapterNumber).padStart(2, '0')
                : chapterNumber}
            </div>
          )}
          <h2 className="text-3xl md:text-5xl font-black leading-none tracking-normal">
            {title}
          </h2>
        </div>

        {/* Colonne Droite : Image ou Gabarit de zoning (Placeholder) */}
        <div className="relative overflow-hidden w-full">
          {src ? (
            /* Mode 1 : Rendu de l'image si fournie en prop src */
            <img 
              src={src} 
              alt={title} 
              className="w-full h-auto transition-transform duration-700 hover:scale-105 rounded-lg object-cover" 
              style={{ aspectRatio: ratio }}
            />
          ) : (
            /* Mode 2 : Gabarit de zoning (Placeholder) si aucune src n'est passée */
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
              
              {placeholderTxt && (
                <span className="text-sm font-medium text-[#8E8366] leading-tight mb-1.5 max-w-[80%]">
                  {placeholderTxt}
                </span>
              )}
              
              {ratio && (
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-75">
                  Ratio {ratio}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
