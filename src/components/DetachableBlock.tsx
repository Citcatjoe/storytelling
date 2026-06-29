"use client";

import React, { useState, useEffect, useRef } from "react";
import { mergeMargins } from "@/config/layout";

interface DetachableBlockProps {
  children: React.ReactNode;
  ratio?: string; // "16/9", "3/2", "3/4", "1/1", etc.
  caption?: string | null;
  badge?: string;
  badgeColor?: string;
  className?: string;
  title?: string;
}

const colorMap: Record<string, string> = {
  violet: "bg-purple-600",
  purple: "bg-purple-600",
  rouge: "bg-[#E20000]",
  red: "bg-[#E20000]",
  jaune: "bg-amber-500",
  yellow: "bg-amber-500",
  vert: "bg-[#009FAB]",
  green: "bg-[#009FAB]",
};

export function DetachableBlock({
  children,
  ratio = "16/9",
  caption,
  badge,
  badgeColor = "rouge",
  className = "",
  title,
}: DetachableBlockProps) {
  const [isDetached, setIsDetached] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFlipCardOpen, setIsFlipCardOpen] = useState(false);
  const [hideDetached, setHideDetached] = useState(false);
  
  const anchorRef = useRef<HTMLDivElement>(null);
  const prevIsDetachedRef = useRef<boolean>(false);
  const renderPrevDetachedRef = useRef<boolean>(false);

  const isFlipCardOpenRef = useRef(isFlipCardOpen);
  const lastClosedTimeRef = useRef<number>(0);

  const wasMinimizedAutomaticallyRef = useRef(false);
  const isMinimizedRef = useRef(isMinimized);

  useEffect(() => {
    isMinimizedRef.current = isMinimized;
  }, [isMinimized]);

  const [isContentVisible, setIsContentVisible] = useState(true);
  const intendedMinimizedRef = useRef(false);

  const animateMinimize = (shouldMinimize: boolean) => {
    intendedMinimizedRef.current = shouldMinimize;
    if (shouldMinimize) {
      // 1: fade-out content
      setIsContentVisible(false);
      // 2: shrink container after fade-out finishes (200ms)
      setTimeout(() => {
        if (intendedMinimizedRef.current) {
          setIsMinimized(true);
        }
      }, 200);
    } else {
      // 1: expand container
      setIsMinimized(false);
      // 2: fade-in content after expand transition finishes (300ms)
      setTimeout(() => {
        if (!intendedMinimizedRef.current) {
          setIsContentVisible(true);
        }
      }, 300);
    }
  };

  useEffect(() => {
    isFlipCardOpenRef.current = isFlipCardOpen;
    if (!isFlipCardOpen) {
      lastClosedTimeRef.current = Date.now();
      const timer = setTimeout(() => setHideDetached(false), 50);
      return () => clearTimeout(timer);
    } else {
      setHideDetached(true);
    }
  }, [isFlipCardOpen]);

  const enableTransition = isDetached && renderPrevDetachedRef.current;

  useEffect(() => {
    renderPrevDetachedRef.current = isDetached;
  });

  useEffect(() => {
    const handleActiveCardsChange = () => {
      const activeCards = (window as any).__activeFlipCards;
      setIsFlipCardOpen(activeCards ? activeCards.size > 0 : false);
    };

    window.addEventListener("active-flip-cards-change", handleActiveCardsChange);
    handleActiveCardsChange();

    return () => {
      window.removeEventListener("active-flip-cards-change", handleActiveCardsChange);
    };
  }, []);

  useEffect(() => {
    const handleIntersectionOrScroll = (bottom: number) => {
      const newDetached = bottom < 80;
      const isCooldown = (Date.now() - lastClosedTimeRef.current) < 800;
      const ignoreDetachChange = isFlipCardOpenRef.current || isCooldown;

      if (ignoreDetachChange && !newDetached) {
        return;
      }

      if (newDetached !== prevIsDetachedRef.current) {
        prevIsDetachedRef.current = newDetached;
        requestAnimationFrame(() => {
          setIsDetached(newDetached);
          if (!newDetached) {
            setIsMinimized(false);
            setIsContentVisible(true);
            intendedMinimizedRef.current = false;
            wasMinimizedAutomaticallyRef.current = false;
          }
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        handleIntersectionOrScroll(entry.boundingClientRect.bottom);
      },
      {
        threshold: 0,
        rootMargin: "-80px 0px 999999px 0px", // Énorme marge bas pour s'assurer qu'on déclenche bien l'event quand on croise la ligne
      }
    );

    const currentAnchor = anchorRef.current;
    if (currentAnchor) {
      observer.observe(currentAnchor);
      
      // Fallback check pour attraper la restauration de scroll asynchrone des navigateurs
      const checkPosition = () => {
        if (anchorRef.current) {
          handleIntersectionOrScroll(anchorRef.current.getBoundingClientRect().bottom);
        }
      };
      setTimeout(checkPosition, 100);
      setTimeout(checkPosition, 500);
    }

    return () => {
      if (currentAnchor) {
        observer.unobserve(currentAnchor);
      }
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleSectionChange = (e: Event) => {
      const sectionId = (e as CustomEvent).detail.sectionId;
      if (sectionId === "chapitre-9") {
        if (!isMinimizedRef.current && !intendedMinimizedRef.current) {
          animateMinimize(true);
          wasMinimizedAutomaticallyRef.current = true;
        }
      } else {
        if (wasMinimizedAutomaticallyRef.current) {
          animateMinimize(false);
          wasMinimizedAutomaticallyRef.current = false;
        }
      }
    };

    window.addEventListener("zoning-map-section-change", handleSectionChange);
    return () => {
      window.removeEventListener("zoning-map-section-change", handleSectionChange);
    };
  }, []);

  const widthVal = 380;

  const formattedRatio = ratio.includes("/") ? ratio.replace("/", " / ") : ratio;

  const containerStyle = isDetached
    ? isMinimized
      ? { width: "56px", height: "56px", borderRadius: "28px" }
      : { 
          width: isMobile ? "calc((100vw - 2rem) * 0.75)" : "calc(100vw - 3rem)", 
          maxWidth: `${widthVal}px`, 
          borderRadius: "16px",
          height: "auto",
          minHeight: "0px",
          minWidth: "0px"
        }
    : { 
        aspectRatio: formattedRatio,
        height: "auto",
        minHeight: "0px",
        minWidth: "0px"
      };

  const resolvedBgColor = badgeColor.startsWith("bg-")
    ? badgeColor
    : colorMap[badgeColor.toLowerCase()] || "bg-gray-500";

  return (
    <div className={`${mergeMargins("mt-10 mb-8", className)} w-full`}>
      <figure
        ref={anchorRef}
        className="w-full relative block overflow-hidden"
        style={{
          aspectRatio: formattedRatio,
          height: "auto",
          minHeight: "0px",
          minWidth: "0px",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Cadre de remplacement (quand détaché) */}
        {isDetached && (
          <div className="absolute inset-0 border-2 border-dashed border-[#CBBFA0] bg-[#E5DCC3]/10 rounded-2xl flex flex-col items-center justify-center p-4 text-center">
            <span className="text-[9px] font-mono text-[#8E8366] uppercase tracking-widest leading-normal select-none">
              Carte détachée
            </span>
            <span className="text-[8px] font-mono text-[#8E8366]/70 uppercase tracking-wider leading-normal mt-1 select-none">
              {isMinimized ? "(cliquez sur l'icône pour rouvrir)" : "(voir en bas à gauche)"}
            </span>
          </div>
        )}

        {/* 1. Badge (Affiché uniquement inline) */}
        {!isDetached && badge && (
          <div className="absolute top-4 right-4 z-10 select-none">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}
            >
              {badge}
            </span>
          </div>
        )}

        {/* Titre (Affiché uniquement inline et en haut à gauche) */}
        {!isDetached && title && (
          <div className="absolute top-4 left-4 z-10 select-none">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-xs font-semibold text-gray-800 rounded-xl border border-gray-100/50 shadow-md font-sans"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E20000] shrink-0" />
              {title}
            </span>
          </div>
        )}

        {/* 2. Le conteneur de contenu unique (préservé dans le DOM pour éviter le remount) */}
        <div
          className={
            isDetached
              ? `fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 bg-white shadow-2xl border border-gray-100 ${
                  enableTransition ? "transition-detachable" : ""
                } ${
                  isMinimized 
                    ? "cursor-pointer hover:scale-110 active:scale-95 border-2 border-black flex items-center justify-center p-0 overflow-hidden transition-transform duration-200" 
                    : "cursor-default p-[5px]"
                } ${
                  hideDetached ? "opacity-0 pointer-events-none" : "opacity-100"
                }`
              : "absolute inset-0 w-full h-full rounded-2xl overflow-hidden border border-gray-100 shadow-none bg-white"
          }
          style={isDetached ? containerStyle : {}}
          onClick={isDetached && isMinimized ? () => {
            animateMinimize(false);
            wasMinimizedAutomaticallyRef.current = false;
          } : undefined}
          title={isDetached && isMinimized ? "Ouvrir la carte" : undefined}
        >
          {/* Bouton de minimisation */}
          {isDetached && !isMinimized && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                animateMinimize(true);
                wasMinimizedAutomaticallyRef.current = false;
              }}
              className="absolute bottom-2 right-2 bg-black text-white rounded-full w-9 h-9 flex items-center justify-center shadow-lg border border-white/20 cursor-pointer z-50"
              aria-label="Réduire"
              title="Réduire la carte"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Calque 1 : Icône de Carte (minimisé) */}
          {isDetached && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isMinimized ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-black"
              >
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                <line x1="9" y1="3" x2="9" y2="18" />
                <line x1="15" y1="6" x2="15" y2="21" />
              </svg>
            </div>
          )}

          {/* Calque 2 : Contenu Média Réel */}
          <div
            className={`w-full rounded-xl overflow-hidden relative bg-neutral-50 transition-opacity duration-200 ${
              !isDetached || isMinimized ? "h-full" : ""
            } ${isContentVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            style={isDetached && !isMinimized ? { aspectRatio: formattedRatio } : {}}
          >
            {children}
          </div>
        </div>
      </figure>

      {/* 3. Légende */}
      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light leading-snug">
          {caption}
        </figcaption>
      )}
    </div>
  );
}
