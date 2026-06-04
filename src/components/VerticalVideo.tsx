"use client";

import React, { useState, useRef, useEffect } from 'react';

interface VerticalVideoProps {
  videoSrc?: string;
  placeholderTxt?: string;
  caption?: string;
  className?: string;
}

/**
 * VerticalVideo component designed for 9:16 portrait video elements.
 * Centered inside the main reading column, it maintains a perfect editorial width (320px)
 * so it doesn't take up too much vertical screen space, while offering full zoning placeholder support.
 */
export function VerticalVideo({
  videoSrc,
  placeholderTxt = "Zoning Vidéo 9:16",
  caption,
  className = ""
}: VerticalVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering video container clicks twice
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => {
          console.error("Playback error:", err);
        });
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const updateProgressFromClientX = (clientX: number) => {
    if (videoRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const width = rect.width;
      if (width > 0) {
        const newPercentage = Math.min(Math.max(0, clickX / width), 1);
        const duration = videoRef.current.duration;
        if (!isNaN(duration) && isFinite(duration)) {
          videoRef.current.currentTime = newPercentage * duration;
        }
        setProgress(newPercentage * 100);
      }
    }
  };

  const handleStartDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    updateProgressFromClientX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    if (e.touches.length > 0) {
      updateProgressFromClientX(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateProgressFromClientX(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateProgressFromClientX(e.touches[0].clientX);
      }
    };

    const handleEndDrag = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleEndDrag);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleEndDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEndDrag);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEndDrag);
    };
  }, [isDragging]);

  return (
    <figure className={`w-full max-w-[320px] mx-auto my-12 transition-all duration-300 ${className}`}>
      {videoSrc ? (
        /* Mode 1 : Rendu de la vidéo réelle */
        <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black group" style={{ aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            src={videoSrc}
            className="w-full h-full object-cover cursor-pointer"
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pt-6 pb-12 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none">
            <button
              onClick={togglePlay}
              className={`pointer-events-auto cursor-pointer w-28 h-12 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg border border-transparent ${
                isPlaying 
                  ? "bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border-white/20" 
                  : "bg-accent2 text-white hover:bg-accent2/90 shadow-[0_8px_20px_rgba(226,0,0,0.35)]"
              }`}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                /* Pause Icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                </svg>
              ) : (
                /* Play Icon (optically balanced at w-9 h-9, visually centered using pl-[2.5px]) */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-9 h-9 pl-[2.5px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
          </div>

          {/* Progress Bar (interactive dragging + hover height increase) */}
          <div 
            ref={progressBarRef}
            onMouseDown={handleStartDrag}
            onTouchStart={handleTouchStart}
            className="absolute bottom-0 inset-x-0 h-8 flex items-end cursor-pointer pointer-events-auto z-20 group/progress"
          >
            <div className="w-full h-1.5 bg-white/25 transition-all duration-200 group-hover/progress:h-3">
              <div 
                className="h-full bg-accent2 transition-all duration-75 ease-out" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2 : Gabarit de zoning (Placeholder) ultra-premium */
        <div
          className="w-full rounded-2xl bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer group hover:bg-[#E5DCC3]/25 transition-all duration-300"
          style={{ aspectRatio: '9/16' }}
        >
          {/* Cercle Play bouton premium */}
          <div className="w-14 h-14 rounded-full bg-[#CBBFA0]/20 flex items-center justify-center text-[#8E8366] group-hover:scale-110 transition-transform duration-300 mb-4 border border-[#CBBFA0]/40">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 ml-1 text-[#8E8366]"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          
          {placeholderTxt && (
            <span className="text-sm font-medium text-[#8E8366] leading-tight mb-1.5 max-w-[80%]">
              {placeholderTxt}
            </span>
          )}
          
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-75">
            Ratio 9/16
          </span>
        </div>
      )}

      {/* Légende alignée sur le design system */}
      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
