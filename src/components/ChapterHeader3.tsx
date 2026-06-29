"use client";

import { useRef, useState, useEffect } from "react";
import type { CSSProperties } from "react";
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { Image } from "./Image";

interface ChapterHeader3Props {
  titlePart1?: string;
  titlePart2?: string;
  chapterNumber?: string | number;
  src?: string;
  videoSrc?: string;
  ratio?: string; // e.g., "16/9" or "21/9"
  placeholderTxt?: string;
  badge?: string;             // Badge label text
  badgeColor?: string;        // Badge background color (violet, rouge, jaune, vert or Tailwind bg-class)
  alt?: string;
}

const colorMap: Record<string, string> = {
  violet: "bg-purple-600",
  purple: "bg-purple-600",
  rouge: "bg-[#E20000]", // Accent color 2
  red: "bg-[#E20000]",
  jaune: "bg-amber-500", // Warm yellow
  yellow: "bg-amber-500",
  vert: "bg-[#009FAB]", // Orllati brand color
  green: "bg-[#009FAB]",
};

/**
 * Traditional centered overlay version of ChapterHeader:
 * Centered white text box/card sitting astride the bottom boundary of the background image/video.
 * This creates a clean "insert" (inset) overlapping the bottom of the media,
 * freeing up the rest of the visual to breathe.
 */
export function ChapterHeader3({
  titlePart1,
  titlePart2,
  chapterNumber,
  src,
  videoSrc,
  ratio = "16/9",
  placeholderTxt = "Zoning En-tête",
  badge,
  badgeColor = "rouge",
  alt
}: ChapterHeader3Props) {
  const headerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  // Formatage du numéro de chapitre (ex: 1 -> 01)
  const formattedNumber = chapterNumber !== undefined
    ? (typeof chapterNumber === 'number' || !isNaN(Number(chapterNumber))
      ? String(chapterNumber).padStart(2, '0')
      : chapterNumber)
    : null;

  const resolvedAlt = alt || (titlePart1 && titlePart2 ? `${titlePart1} : ${titlePart2}` : (titlePart1 || titlePart2 || ""));

  const hasVideo = !!videoSrc;
  const hasImage = !hasVideo && !!src;
  const hasBg = hasVideo || hasImage;

  // Resolve badge background color
  const resolvedBgColor = badgeColor.startsWith("bg-") 
    ? badgeColor 
    : (colorMap[badgeColor.toLowerCase()] || "bg-gray-500");

  const hasTitle = !!(formattedNumber || titlePart1 || titlePart2);

  // Initialize Video.js for autoplaying loop if videoSrc is provided
  useEffect(() => {
    if (!videoSrc) return;

    // Resolve JW Player ID or URLs to manifests
    let resolvedSrc = videoSrc;
    if (!videoSrc.includes("://") && !videoSrc.includes("/")) {
      resolvedSrc = `https://cdn.jwplayer.com/manifests/${videoSrc}.m3u8`;
    } else {
      const match = videoSrc.match(/\/players\/([a-zA-Z0-9]+)-[a-zA-Z0-9]+\.js/);
      if (match && match[1]) {
        resolvedSrc = `https://cdn.jwplayer.com/manifests/${match[1]}.m3u8`;
      }
    }

    const videoElement = document.createElement("video");
    videoElement.className = "video-js w-full h-full object-cover scale-[1.015]";
    videoElement.setAttribute("playsinline", "true");
    videoElement.setAttribute("webkit-playsinline", "true");
    videoElement.muted = true;

    if (videoContainerRef.current) {
      videoContainerRef.current.appendChild(videoElement);
    }

    const player = videojs(videoElement, {
      controls: false,
      autoplay: false, // Controlled by IntersectionObserver
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

    const onPlayOrLoaded = () => {
      setIsVideoLoaded(true);
    };

    player.on('loadedmetadata', onPlayOrLoaded);
    player.on('play', onPlayOrLoaded);
    player.on('playing', onPlayOrLoaded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (playerRef.current) {
          if (entry.isIntersecting) {
            playerRef.current.play().catch((err: any) => {
              console.log("Autoplay play was prevented:", err);
            });
          } else {
            playerRef.current.pause();
          }
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
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
    <header ref={headerRef} className="relative -mx-4 w-[calc(100%+2rem)] md:mx-auto md:w-full max-w-screen-2xl px-0 md:px-7 -mb-6 md:mb-12 transition-all duration-300 group">
      {/* Background Figure/Container that dictates the height. */}
      <figure
        className={`w-full relative overflow-hidden rounded-none md:rounded-2xl transition-all duration-300 aspect-(--header-ratio) ${
          hasBg
            ? "bg-black"
            : "bg-[#E5DCC3]/15 border-2 border-dashed border-[#CBBFA0] flex flex-col items-center justify-center p-6 text-center select-none"
        }`}
        style={{ "--header-ratio": ratio } as CSSProperties}
      >
        {badge && (
          <div className="absolute top-4 right-4 z-20 select-none">
            <span className={`inline-flex items-center px-4 py-2 rounded-none text-xs font-mono font-bold uppercase tracking-wider text-white border-2 border-black shadow-[3px_3px_0px_#000] transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-200 ${resolvedBgColor}`}>
              {badge}
            </span>
          </div>
        )}

        {hasVideo ? (
          <>
            {/* Shimmer skeleton until the video actually plays */}
            {!isVideoLoaded && (
              <div className="absolute inset-0 bg-neutral-200 flex items-center justify-center overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer" />
              </div>
            )}
            
            <div
              ref={videoContainerRef}
              className={`absolute inset-0 w-full h-full rounded-none md:rounded-2xl transition-opacity duration-500 ${
                isVideoLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            {/* Un très léger dégradé sombre en bas pour un effet de profondeur discret */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none z-10" />
          </>
        ) : hasImage ? (
          /* Mode 1: Image réelle avec zoom progressif au survol */
          <>
            <Image
              src={src}
              alt={resolvedAlt}
              zoomable={false}
              className="absolute inset-0 w-full h-full rounded-none md:rounded-2xl bg-transparent"
              imgClassName="w-full h-full object-cover"
            />
            {/* Un très léger dégradé sombre en bas pour un effet de profondeur discret */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </>
        ) : (
          /* Mode 2: Place-holder de zoning (pas d'image réelle) */
          <div className="flex flex-col items-center justify-center mb-14 md:mb-20">
            {/* Icône de gabarit discrète */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-[#A69B7B] opacity-40 mb-3 transition-transform duration-700 group-hover:scale-110"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>

            {placeholderTxt && (
              <span className="text-sm font-medium text-[#8E8366] leading-tight mb-2 max-w-[80%]">
                {placeholderTxt}
              </span>
            )}

            {ratio && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A69B7B] opacity-60">
                Ratio {ratio}
              </span>
            )}
          </div>
        )}
      </figure>

      {/* Box blanche de titre à cheval sur le bas de l'image/vidéo (insert) */}
      {hasTitle && (
        <div className="relative z-10 mx-auto mt-3 md:-mt-20 w-[calc(100%-2rem)] max-w-[672px] md:w-full md:max-w-[736px] bg-white px-0 py-2.5 md:p-8 md:rounded-2xl flex flex-col items-start text-left transition-all duration-300">
          {formattedNumber && (
            <div className="flex flex-col items-start mb-0.5 select-none">
              <span className="text-3xl md:text-5xl lg:text-6xl font-mono font-black leading-none text-accent2">
                {formattedNumber}
              </span>
            </div>
          )}

          {/* Liseré horizontal graphique rouge sous le numéro */}
          <div className="w-12 h-[3px] bg-accent2 my-2 md:my-4" />

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-snug md:leading-tight text-gray-900">
            {titlePart1 && <>{titlePart1}{titlePart2 ? " : " : ""}</>}
            {titlePart2 && <span className="italic">{titlePart2}</span>}
          </h2>
        </div>
      )}
    </header>
  );
}
