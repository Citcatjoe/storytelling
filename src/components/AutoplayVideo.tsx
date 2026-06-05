"use client";

import React, { useRef, useState, useEffect } from 'react';
import { BREAKOUTS } from '@/config/layout';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface AutoplayVideoProps {
  videoSrc: string;
  ratio?: string; // e.g. "16/9", "3/2"
  overflow?: "low" | "med" | "high";
  caption?: string;
  className?: string;
}

/**
 * AutoplayVideo component designed for autoplaying, looping, inline video presentations.
 * Perfect for landscape video loops, drone shots, or animated galleries.
 */
export function AutoplayVideo({
  videoSrc,
  ratio = "16/9",
  overflow = "high",
  caption,
  className = ""
}: AutoplayVideoProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize Video.js for Autoplay Looping Video
  useEffect(() => {
    if (!videoSrc) return;

    const videoElement = document.createElement("video");
    videoElement.className = "video-js w-full h-full object-cover";
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");
    videoElement.muted = true; // Ensure native mute is set

    if (videoContainerRef.current) {
      videoContainerRef.current.appendChild(videoElement);
    }

    const player = videojs(videoElement, {
      controls: false,
      autoplay: true,
      muted: true,
      loop: true,
      preload: 'auto',
      fluid: false,
      fill: true,
      sources: [{
        src: videoSrc,
        type: videoSrc.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
      }]
    });

    playerRef.current = player;

    player.on('play', () => {
      setIsLoaded(true);
    });

    player.on('playing', () => {
      setIsLoaded(true);
    });

    // Intersection Observer to pause/play based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (playerRef.current) {
          if (entry.isIntersecting) {
            playerRef.current.play().catch((err: any) => {
              console.log("Autoplay play was prevented or failed:", err);
            });
          } else {
            playerRef.current.pause();
          }
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

  // Breakout layouts
  let containerClass = "w-full max-w-[672px] mx-auto px-4 md:px-0"; // low
  if (overflow === "med") {
    containerClass = BREAKOUTS.med.container;
  } else if (overflow === "high") {
    containerClass = BREAKOUTS.high.container;
  }

  return (
    <figure className={`my-12 ${containerClass} relative transition-all duration-300 ${className}`}>
      <div 
        ref={outerContainerRef}
        className="relative w-full overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: ratio }}
      >
        {/* Shimmer skeleton until the video actually plays */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center overflow-hidden z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
          </div>
        )}

        <div
          ref={videoContainerRef}
          className={`w-full h-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {caption && (
        <figcaption className="mt-3 text-xs text-black text-left font-light leading-snug">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
