"use client";

import React, { useRef, useState, useEffect } from 'react';
import { BREAKOUTS, mergeMargins } from '@/config/layout';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface AutoplayVideoProps {
  videoSrc: string;
  ratio?: string; // e.g. "16/9", "3/2"
  overflow?: "low" | "med" | "high";
  caption?: string | null;
  className?: string;
  bare?: boolean;
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
  className = "",
  bare = false
}: AutoplayVideoProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoRatio, setVideoRatio] = useState<string | null>(null);

  // Initialize Video.js for Autoplay Looping Video
  useEffect(() => {
    if (!videoSrc) return;

    // Resolve JW Player script urls automatically to HLS streams
    let resolvedSrc = videoSrc;
    const match = videoSrc.match(/\/players\/([a-zA-Z0-9]+)-[a-zA-Z0-9]+\.js/);
    if (match && match[1]) {
      resolvedSrc = `https://cdn.jwplayer.com/manifests/${match[1]}.m3u8`;
    }

    const videoElement = document.createElement("video");
    videoElement.className = "video-js w-full h-full object-cover scale-[1.015]";
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");
    videoElement.muted = true; // Ensure native mute is set

    if (videoContainerRef.current) {
      videoContainerRef.current.appendChild(videoElement);
    }

    const player = videojs(videoElement, {
      controls: false,
      autoplay: false, // Disabling native autoplay so IntersectionObserver controls it
      muted: true,
      loop: true,
      preload: 'auto',
      fluid: false,
      fill: true,
      sources: [{
        src: resolvedSrc,
        type: resolvedSrc.endsWith('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
      }]
    });

    playerRef.current = player;

    const updateRatio = () => {
      const width = player.videoWidth();
      const height = player.videoHeight();
      if (width && height) {
        setVideoRatio(`${width}/${height}`);
      }
      setIsLoaded(true);
    };

    player.on('loadedmetadata', updateRatio);
    player.on('play', updateRatio);
    player.on('playing', updateRatio);

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

  if (bare) {
    return (
      <div 
        ref={outerContainerRef}
        className={`relative w-full overflow-hidden rounded-2xl bg-black ${className}`}
        style={{ aspectRatio: videoRatio || ratio }}
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
    );
  }

  // Breakout layouts
  let containerClass = "w-full max-w-[672px] mx-auto px-0"; // low
  if (overflow === "med") {
    containerClass = "w-full max-w-[968px] mx-auto px-0 md:px-7";
  } else if (overflow === "high") {
    containerClass = "w-full max-w-screen-2xl mx-auto px-0 md:px-7";
  }

  return (
    <figure className={`${mergeMargins("mt-12 mb-12", className)} ${containerClass} relative transition-all duration-300`}>
      <div 
        ref={outerContainerRef}
        className="relative w-full overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: videoRatio || ratio }}
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
