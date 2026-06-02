"use client";

import { BREAKOUTS } from "@/config/layout";

interface ChapterHeaderProps {
  title: string;
  chapterNumber?: string | number;
  imageSrc?: string;
}

/**
 * Composant de titre de chapitre avec mise en page split 50/50.
 * S'étend sur toute la largeur de l'article (Hero Edge).
 */
export function ChapterHeader({ 
  title, 
  chapterNumber, 
  imageSrc = "/images/placeholder.png" 
}: ChapterHeaderProps) {
  return (
    <div className={`chapter-header ${BREAKOUTS.med.margin} border-b border-gray-100 pt-24 pb-0 my-20 transition-all duration-300`}>
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

        {/* Colonne Droite : Image */}
        <div className="relative overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-auto transition-transform duration-700 hover:scale-105" 
          />
        </div>

      </div>
    </div>
  );
}
