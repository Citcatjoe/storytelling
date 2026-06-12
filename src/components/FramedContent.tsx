"use client";

import React from 'react';
import { mergeMargins } from '@/config/layout';

interface FramedContentProps {
  title: string;
  description: string;
  className?: string;
}

/**
 * FramedContent component with a borderless yellow-100 background, rounded corners,
 * and a centered borderless info icon straddling the top edge. All text is set to text-sm.
 */
export function FramedContent({ 
  title, 
  description, 
  className = "" 
}: FramedContentProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const truncateText = (text: string, limit = 75) => {
    if (text.length <= limit) return text;
    const sub = text.substring(0, limit);
    const lastSpace = sub.lastIndexOf(' ');
    return (lastSpace > 30 ? sub.substring(0, lastSpace) : sub).trim();
  };

  const shouldTruncate = isMobile && !isExpanded && description.length > 75;
  const displayText = shouldTruncate ? `${truncateText(description)}...` : description;

  return (
    <div className={`${mergeMargins("mt-10 mb-8 md:mb-10", className)} w-full bg-yellow-100 rounded-2xl p-5 md:p-7.5 text-black relative transition-all duration-300 subpixel-antialiased`}>
      {/* Centered borderless info icon straddling the top edge directly */}
      <img 
        src="images/icon-info.svg" 
        alt="Info" 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 select-none" 
      />
      
      {/* Text Content in text-sm */}
      <div className="flex flex-col gap-1.5 text-left">
        {/* <h4 className="font-bold uppercase tracking-wider text-gray-900">
          {title}
        </h4> */}
        <div className="text-base font-base text-black">
          <span className="font-extrabold">{title} </span> 
          {displayText}
          {shouldTruncate && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="ml-1 text-black font-bold underline cursor-pointer hover:opacity-80 inline-block align-baseline"
            >
              lire plus
            </button>
          )}
          {isMobile && isExpanded && (
            <button 
              onClick={() => setIsExpanded(false)}
              className="ml-2 text-black font-bold underline cursor-pointer hover:opacity-80 inline-block align-baseline"
            >
              lire moins
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
