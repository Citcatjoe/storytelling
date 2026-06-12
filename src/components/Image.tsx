"use client";

import React, { useState, useRef, useLayoutEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

interface ImageProps {
  src?: string;
  alt?: string;
  ratio?: string; // e.g. "3/2", "16/9"
  placeholderTxt?: string;
  className?: string;
  imgClassName?: string;
  zoomable?: boolean;
  forceRatio?: boolean;
}

/**
 * Composant Image utilisant des balises img HTML standards.
 * Évite les conflits de mise en page absolue de Next.js (fill) avec react-medium-image-zoom.
 * Supporte le chargement progressif avec shimmer et les gabarits de zoning.
 */
export function Image({
  src,
  alt = "Image",
  ratio,
  placeholderTxt = "Zoning Image",
  className = "",
  imgClassName = "",
  zoomable = true,
  forceRatio = false,
}: ImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    }
  }, [src]);

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => setIsLoaded(true); // Évite de bloquer sur le skeleton si l'image est cassée

  const hasImage = !!src;
  
  // Si forceRatio est activé (ou si c'est un placeholder), on applique le ratio d'aspect sur le conteneur.
  // Sinon, on laisse couler l'image naturellement (w-full h-auto) pour simplifier le zoom.
  const shouldApplyRatio = ratio && (!hasImage || forceRatio);
  const containerStyle = shouldApplyRatio ? { aspectRatio: ratio } : {};

  return (
    <div 
      className={`relative w-full overflow-hidden rounded-lg bg-[#E5DCC3]/10 ${
        shouldApplyRatio ? "image-fill-container" : ""
      } ${!isLoaded && hasImage && !shouldApplyRatio ? "min-h-[220px]" : ""} ${className}`}
      style={containerStyle}
    >
      {hasImage ? (
        <>
          {/* Shimmer / Skeleton activity indicator */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center min-h-[220px] overflow-hidden z-0">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
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
          
          {zoomable ? (
            <Zoom>
              <img
                ref={imgRef}
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={handleLoad}
                onError={handleError}
                className={`w-full bg-slate-50 cursor-zoom-in rounded-lg transition-opacity duration-500 ease-out ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } ${shouldApplyRatio ? "h-full object-cover" : "h-auto"} ${imgClassName}`}
              />
            </Zoom>
          ) : (
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={handleLoad}
              onError={handleError}
              className={`w-full transition-opacity duration-500 ease-out ${
                isLoaded ? "opacity-100" : "opacity-0"
              } ${shouldApplyRatio ? "h-full object-cover" : "h-auto"} ${imgClassName}`}
            />
          )}
        </>
      ) : (
        /* Mode 2 : Place-holder de zoning premium */
        <div 
          className="w-full h-full rounded-lg bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none"
          style={{ minHeight: ratio ? undefined : '220px', aspectRatio: ratio }}
        >
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
  );
}
