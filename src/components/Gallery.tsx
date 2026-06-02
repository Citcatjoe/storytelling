"use client";

import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { BREAKOUTS } from '@/config/layout';

interface GalleryProps {
  images: string[];
  overflow?: "low" | "med" | "high";
  caption?: string;
}

export function Gallery({ images, overflow = "low", caption }: GalleryProps) {
  // Détermination de la marge d'échappement (Breakout)
  let marginClass = "mx-0"; // low
  if (overflow === "med") {
    marginClass = BREAKOUTS.med.margin; 
  } else if (overflow === "high") {
    marginClass = BREAKOUTS.high.galleryMargin;
  }

  // Détermination de la grille selon le nombre d'images
  const colCount = images.length;
  let gridClass = "grid-cols-1";
  if (colCount === 2) gridClass = "grid-cols-1 sm:grid-cols-2 gap-4";
  if (colCount >= 3) gridClass = "grid-cols-1 sm:grid-cols-3 gap-4";

  return (
    <figure className={`my-12 ${marginClass} transition-all duration-300`}>
      <div className={`grid ${gridClass}`}>
        {images.map((src, idx) => (
          <Zoom key={idx}>
            <img 
              key={idx}
              src={src} 
              alt={caption ? `${caption} - image ${idx + 1}` : `Image ${idx + 1}`}
              className="w-full h-auto object-cover bg-slate-100 cursor-zoom-in"
              style={{ aspectRatio: '3/2' }} // Placeholders ratio, à ajuster si besoin
            />
          </Zoom>
        ))}
      </div>
      
      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
