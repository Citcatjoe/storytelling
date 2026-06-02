import React from 'react';

interface SideBlockProps {
  side: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

/**
 * SideBlock component for content floating on the sides of the main text column.
 * It implements a responsive "breakout" effect with negative margins on large screens.
 */
export function SideBlock({ side, children, className = "" }: SideBlockProps) {
  const isRight = side === 'right';
  
  // Base responsive logic for floating and negative margins
  const floatClass = isRight ? "md:float-right" : "md:float-left";
  
  // Margin logic to repel text
  const marginClass = isRight ? "md:ml-16" : "md:mr-16";
  
  // Breakout logic: negative margins that increase with screen size
  const breakoutClass = isRight
    ? "-mr-[0px] lg:-mr-[150px] xl:-mr-[200px] 2xl:-mr-[250px]"
    : "-ml-[0px] lg:-ml-[150px] xl:-ml-[200px] 2xl:-ml-[250px]";

  return (
    <div className={`w-full md:w-[350px] mb-8 transition-all duration-300 ${floatClass} ${marginClass} ${breakoutClass} ${className}`}>
      {children}
    </div>
  );
}
