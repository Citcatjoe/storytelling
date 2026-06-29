"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface FlipCardProps {
  children: React.ReactNode;      
  backContent: React.ReactNode;  
  className?: string;
  showHintOnScroll?: boolean;
  title?: string;
}

type AnimState = 'idle' | 'opening' | 'open' | 'closing';

export function FlipCard({ children, backContent, className = "", showHintOnScroll, title }: FlipCardProps) {
  const [animState, setAnimState] = useState<AnimState>('idle');
  const [isHinting, setIsHinting] = useState(false);
  const hintHasRun = useRef(false);
  const [targetScale, setTargetScale] = useState<number>(3);

  useEffect(() => {
    if (slotRef.current) {
      const rect = slotRef.current.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const tSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.8, 450);
      setTargetScale(tSize / rect.width);
    }
  }, []);

  useEffect(() => {
    if (!showHintOnScroll || !slotRef.current || hintHasRun.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hintHasRun.current) {
        hintHasRun.current = true;
        setTimeout(() => {
          setIsHinting(true);
          setTimeout(() => {
            setIsHinting(false);
          }, 800);
        }, 1200);
      }
    }, { threshold: 0.9, rootMargin: "0px 0px -15% 0px" });
    
    observer.observe(slotRef.current);
    return () => observer.disconnect();
  }, [showHintOnScroll]);
  // Store the exact pixel rect of the card in the grid to lock its physical size
  const [cardRect, setCardRect] = useState<{ width: number, height: number, top: number, left: number } | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [mounted, setMounted] = useState(false);
  
  const slotRef = useRef<HTMLDivElement>(null);
  const cardIdRef = useRef<string>("");
  if (!cardIdRef.current) {
    cardIdRef.current = Math.random().toString(36).substring(2, 9);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle FLIP animation states
  useEffect(() => {
    if (animState === 'opening') {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!cardRect) return;
          const viewportWidth = document.documentElement.clientWidth;
          const viewportHeight = document.documentElement.clientHeight;
          
          const targetSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.8, 450);
          const targetScale = targetSize / cardRect.width;
          
          const cx = cardRect.left + cardRect.width / 2;
          const cy = cardRect.top + cardRect.height / 2;
          const targetCx = viewportWidth / 2;
          const targetCy = viewportHeight / 2;
          
          const tx = targetCx - cx;
          const ty = targetCy - cy;
          
          setTransformStyle(`translate(${tx}px, ${ty}px) scale(${targetScale})`);
          setScale(targetScale);
          setAnimState('open');
        });
      });
      return () => cancelAnimationFrame(raf);
    } else if (animState === 'closing') {
      const timer = setTimeout(() => {
        setAnimState('idle');
        setCardRect(null);
        setScale(1);
      }, 400); // duration matches CSS
      return () => clearTimeout(timer);
    }
  }, [animState, cardRect]);

  // Lock body scroll when a card is zoomed & manage global active list
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__activeFlipCards = (window as any).__activeFlipCards || new Set<string>();
    }

    if (animState !== 'idle') {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    const isVisuallyOpen = animState === 'opening' || animState === 'open';
    if (isVisuallyOpen) {
      if (typeof window !== "undefined") {
        (window as any).__activeFlipCards.add(cardIdRef.current);
        window.dispatchEvent(new CustomEvent('active-flip-cards-change'));
      }
    } else {
      if (typeof window !== "undefined") {
        (window as any).__activeFlipCards.delete(cardIdRef.current);
        window.dispatchEvent(new CustomEvent('active-flip-cards-change'));
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (typeof window !== "undefined" && (window as any).__activeFlipCards) {
        (window as any).__activeFlipCards.delete(cardIdRef.current);
        window.dispatchEvent(new CustomEvent('active-flip-cards-change'));
      }
    };
  }, [animState]);

  const toggleFlip = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    if (animState === 'idle') {
      const rect = slotRef.current?.getBoundingClientRect();
      if (!rect) return;

      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const targetSize = Math.min(viewportWidth * 0.9, viewportHeight * 0.8, 450);
      const computedScale = targetSize / rect.width;

      // Lock the exact physical DOM dimensions so there is ZERO layout reflow!
      // This makes the card animate as one single solid paper object.
      setCardRect({ width: rect.width, height: rect.height, top: rect.top, left: rect.left });
      setScale(computedScale);
      setTransformStyle(`translate(0px, 0px) scale(1)`);
      setAnimState('opening');
      
    } else if (animState === 'open') {
      const rect = slotRef.current?.getBoundingClientRect();
      if (!rect || !cardRect) return;

      // Calculate the transform needed to return to the current grid slot position (in case of scroll)
      const targetCx = rect.left + rect.width / 2;
      const targetCy = rect.top + rect.height / 2;
      const currentBaseCx = cardRect.left + cardRect.width / 2;
      const currentBaseCy = cardRect.top + cardRect.height / 2;
      
      const tx = targetCx - currentBaseCx;
      const ty = targetCy - currentBaseCy;
      const targetScale = rect.width / cardRect.width;
      
      setTransformStyle(`translate(${tx}px, ${ty}px) scale(${targetScale})`);
      setAnimState('closing');
    }
  };

  const isActive = animState !== 'idle';
  const isVisuallyFlipped = animState === 'opening' || animState === 'open';
  const shouldBeFlipped = isVisuallyFlipped || isHinting;

  const cardStyle: React.CSSProperties = isActive && cardRect ? {
    position: 'fixed',
    top: cardRect.top,
    left: cardRect.left,
    width: cardRect.width,
    height: cardRect.height,
    transformOrigin: 'center center',
    transform: transformStyle,
    transition: animState === 'opening' ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.05, 0.64, 1)',
    zIndex: 50,
  } : {};

  return (
    <div className={`relative w-full flex flex-col ${className}`}>
      <div className="relative w-full aspect-square" ref={slotRef}>
        <style dangerouslySetInnerHTML={{ __html: `
          .flip-card {
            perspective: 1000px;
            border-radius: 0.5rem;
          }
          .flip-card.inline-card {
            transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .flip-card.inline-card:hover {
            transform: scale(1.03);
            box-shadow: 0 12px 30px rgba(213, 201, 163, 0.35);
          }
          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.4s cubic-bezier(0.34, 1.05, 0.64, 1);
            transform-style: preserve-3d;
          }
          .flip-card.flipped .flip-card-inner {
            transform: rotateY(180deg);
          }
          .flip-card-front {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 0.5rem; 
            transform: rotateY(0deg) translateZ(1px); /* Anti z-fighting layer */
          }
          .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 0.5rem; 
            transform: rotateY(180deg) translateZ(1px); /* Anti z-fighting layer */
          }
          .flip-card-active {
            /* Ombre retirée à la demande de l'utilisateur */
          }
          .flip-card-back p {
            font-size: calc(14px / var(--target-scale, 3)) !important;
            line-height: 1.5 !important;
          }
          @media (min-width: 768px) {
            .flip-card-back p {
              font-size: calc(16px / var(--target-scale, 3)) !important;
            }
          }
          .flip-card-back h1,
          .flip-card-back h2,
          .flip-card-back h3,
          .flip-card-back h4 {
            font-size: calc(16px / var(--target-scale, 3)) !important;
            line-height: 1.3 !important;
            font-weight: 700 !important;
          }
          @media (min-width: 768px) {
            .flip-card-back h1,
            .flip-card-back h2,
            .flip-card-back h3,
            .flip-card-back h4 {
              font-size: calc(18px / var(--target-scale, 3)) !important;
            }
          }
          .flip-card-back span {
            font-size: calc(9px / var(--target-scale, 3)) !important;
            line-height: 1.3 !important;
          }
          .flip-card-close-btn {
            position: absolute;
            bottom: calc(-18px / var(--target-scale, 3)) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: calc(36px / var(--target-scale, 3)) !important;
            height: calc(36px / var(--target-scale, 3)) !important;
            border-radius: 9999px !important;
            background-color: black !important;
            color: white !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;
            border: calc(1px / var(--target-scale, 3)) solid rgba(255, 255, 255, 0.2) !important;
            cursor: pointer !important;
            z-index: 50 !important;
          }
          .flip-card-close-btn svg {
            width: calc(20px / var(--target-scale, 3)) !important;
            height: calc(20px / var(--target-scale, 3)) !important;
          }
        `}} />

        {/* The Actual Card */}
        <div 
          onClick={toggleFlip}
          style={{
            ...cardStyle,
            "--card-scale": scale,
            "--target-scale": targetScale,
          } as React.CSSProperties}
          className={`flip-card group cursor-pointer select-none ${shouldBeFlipped ? "flipped" : ""} ${isActive ? 'flip-card-active' : 'inline-card absolute inset-0 w-full h-full'}`}
        >
          <div className="flip-card-inner w-full h-full relative">
            {/* RECTO (FACE) */}
            <div className="flip-card-front w-full h-full overflow-hidden relative">
              {children}
              <div className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-10 ${isActive ? 'hidden' : ''}`} />
            </div>

            {/* VERSO (DOS) */}
            <div className={`flip-card-back w-full h-full ${isActive ? "" : "overflow-hidden"} bg-[#f7f3ea] text-black p-3 md:p-6 flex flex-col justify-between relative transition-all duration-300 ${isHinting ? "border-2 border-dashed border-[#CBBFA0]" : "border border-[#CBBFA0]/20"} ${isActive ? "" : "group-hover:border-[#CBBFA0]/50 group-hover:bg-[#E5DCC3]/20"}`}>
              <div className="z-10 h-full w-full">
                {backContent}
              </div>
              
              {isVisuallyFlipped && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFlip(e);
                  }}
                  className="flip-card-close-btn"
                  aria-label="Fermer"
                  title="Fermer la carte"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}

              <div className={`absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-0 ${isActive ? 'hidden' : ''}`} />
            </div>
          </div>
        </div>
      </div>

      {/* Card Title below the card */}
      {title && (
        <div className="text-center mt-3 text-sm sm:text-base font-semibold text-gray-800 uppercase tracking-wider select-none leading-tight">
          {title}
        </div>
      )}

      {/* Full-screen Dark Backdrop */}
      {mounted && createPortal(
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ease-out"
          style={{ 
            opacity: isVisuallyFlipped ? 1 : 0, 
            pointerEvents: isVisuallyFlipped ? 'auto' : 'none',
            zIndex: 40 
          }}
          onClick={isVisuallyFlipped ? toggleFlip : undefined}
        />,
        document.body
      )}
    </div>
  );
}
