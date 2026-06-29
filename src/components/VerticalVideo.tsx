"use client";

import React, { useState, useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { mergeMargins } from '@/config/layout';

interface VerticalVideoProps {
  videoSrc?: string;
  poster?: string;
  placeholderTxt?: string;
  caption?: string | null;
  className?: string;
}

/**
 * VerticalVideo component designed for 9:16 portrait video elements.
 * Centered inside the main reading column, it maintains a perfect editorial width (320px)
 * so it doesn't take up too much vertical screen space, while offering full zoning placeholder support.
 */
export function VerticalVideo({
  videoSrc,
  poster,
  placeholderTxt = "Zoning Vidéo 9:16",
  caption,
  className = ""
}: VerticalVideoProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const isDraggingRef = useRef(isDragging);
  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering video container clicks twice
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        const playPromise = playerRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err: any) => {
            console.error("Playback error:", err);
          });
        }
      }
    }
  };

  const updateProgressFromClientX = (clientX: number) => {
    if (playerRef.current && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = clientX - rect.left;
      const width = rect.width;
      if (width > 0) {
        const newPercentage = Math.min(Math.max(0, clickX / width), 1);
        const duration = playerRef.current.duration();
        if (duration && !isNaN(duration) && isFinite(duration)) {
          playerRef.current.currentTime(newPercentage * duration);
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

  // Initialize Video.js Player
  useEffect(() => {
    if (!videoSrc) return;

    const videoElement = document.createElement("video");
    videoElement.className = "video-js w-full h-full object-cover scale-[1.015] !bg-transparent";
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");
    if (poster) {
      videoElement.setAttribute("poster", poster);
    }

    if (videoContainerRef.current) {
      videoContainerRef.current.appendChild(videoElement);
    }

    const player = videojs(videoElement, {
      controls: false,
      autoplay: false,
      preload: 'auto',
      fluid: false,
      fill: true,
      poster: poster,
      sources: [{
        src: videoSrc,
        type: videoSrc.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
      }]
    });

    playerRef.current = player;

    player.on('play', () => setIsPlaying(true));
    player.on('pause', () => setIsPlaying(false));

    const handleTimeUpdate = () => {
      if (!isDraggingRef.current) {
        const current = player.currentTime();
        const duration = player.duration();
        if (current !== undefined && duration) {
          setProgress((current / duration) * 100);
        }
      }
    };

    player.on('timeupdate', handleTimeUpdate);

    // Intersection Observer to pause if it scrolls out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && playerRef.current) {
          playerRef.current.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (outerContainerRef.current) {
      observer.observe(outerContainerRef.current);
    }

    return () => {
      observer.disconnect();
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
      if (videoContainerRef.current) {
        videoContainerRef.current.innerHTML = '';
      }
    };
  }, [videoSrc]);

  return (
    <figure className={`${mergeMargins("mt-12 mb-6 md:mb-12", className)} w-full max-w-[320px] mx-auto transition-all duration-300`}>
      <style>{`
        .video-js, .video-js .vjs-tech, .video-js .vjs-poster, video { background-color: transparent !important; }
        video::-webkit-media-controls-start-playback-button { display: none !important; }
      `}</style>
      {videoSrc ? (
        /* Mode 1 : Rendu de la vidéo réelle */
        <div 
          ref={outerContainerRef}
          className={`relative w-full rounded-2xl overflow-hidden shadow-lg border border-gray-100 group bg-cover bg-center ${poster ? 'bg-transparent' : 'bg-transparent'}`}
          style={{ 
            aspectRatio: '9/16',
            backgroundImage: poster ? `url('${poster}')` : undefined
          }}
        >
          <div
            ref={videoContainerRef}
            className="w-full h-full"
          />

          {/* Clickable overlay to toggle play/pause */}
          <div 
            onClick={togglePlay} 
            className="absolute inset-0 cursor-pointer z-0" 
          />
          
          {/* Custom Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center px-6 pt-6 pb-12 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none z-10">
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
