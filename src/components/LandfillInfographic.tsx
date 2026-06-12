"use client";

import React, { useState, useRef } from "react";
import { LandfillMap } from "./LandfillMap";

interface Step {
  title: string;
  text1: string;
  isTitle?: boolean;
}

const steps: Step[] = [
  {
    isTitle: true,
    title: "Le business des<br>décharges",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum.",
  },
  {
    title: "Démolition",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  },
  {
    title: "Excavation",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. df sdf sf sf sf fsd fdsfdsf sf sdf dsf sf sfd sdf sdf sd f",
  },
  {
    title: "Transport",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  },
  {
    title: "Stockage",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  },
  {
    title: "Remblayage",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  },
  {
    title: "Extraction",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  },
  {
    title: "Construction",
    text1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor.",
  }
];

export function LandfillInfographic() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  const handleNext = () => {
    nextStep();
    setHasInteracted(true);
  };

  const handlePrev = () => {
    prevStep();
    setHasInteracted(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentStep(index);
    setHasInteracted(true);
  };

  const current = steps[currentStep];

  return (
    <div className="flex flex-col md:flex-row items-stretch w-full min-h-0">

      {/* Left Column: Map/Visual container (square aspect ratio) */}
      <div className="w-full md:w-[58%] aspect-square relative bg-neutral-100 border-[2px] border-[#8E8366]/40 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none border-b-0 md:border-b-[2px] md:border-r-[2px] overflow-hidden flex flex-col justify-center items-center">
        <LandfillMap triggerRef={sentinelRef} />
      </div>
      
      {/* Right Column: Textual information container (stretches to match left column height, takes remaining width) */}
      <div className="w-full h-70 overflow-hidden md:h-auto md:overflow-visible md:flex-1 flex flex-col justify-between min-h-0 bg-white pt-4 pr-6 pb-5 pl-6 md:pt-8 md:pr-8 md:pb-5 md:pl-8 border-[2px] border-[#8E8366]/40 rounded-b-2xl md:rounded-r-2xl md:rounded-bl-none md:border-l-0">
        <div className="flex-1 min-h-0 overflow-y-auto pr-2">
          {current.isTitle ? (
            <div className="flex flex-col justify-center h-full py-2">
              <h4 className="text-xl md:text-2xl font-black text-neutral-900 leading-tight mb-3">
                {current.title.split('<br>').map((part, i) => <span key={i} className="block">{part}</span>)}
              </h4>
              <p className="text-sm md:text-base text-neutral-500 leading-relaxed">{current.text1}</p>
            </div>
          ) : (
            <>
              <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-neutral-900 border-b pb-2 md:pb-3 border-neutral-100 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E20000] shrink-0"></span>
                <span className="truncate">{currentStep}. {current.title}</span>
              </h4>
              <div className="space-y-3 text-neutral-600 leading-relaxed">
                <p className="text-sm md:text-base mb-0">{current.text1}</p>
              </div>
            </>
          )}
        </div>
        
        {/* Footer Navigation */}
        <div className="mt-2 md:mt-6 pt-4 border-t border-neutral-100 flex justify-between items-center text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#8E8366] font-bold">{currentStep + 1} / {steps.length}</span>
            <div className="flex gap-1.5">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    index === currentStep
                      ? "bg-[#E20000] w-5 shadow-[0_0_8px_rgba(226,0,0,0.3)]"
                      : "bg-[#8E8366]/30 hover:bg-[#8E8366]/60"
                  }`}
                  aria-label={`Aller à l'étape ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-[#f7f3ea] border border-[#8E8366]/40 text-[#8E8366] hover:bg-[#ebe4d6] hover:text-[#736a52] hover:border-[#8E8366]/70 transition-all pointer-events-auto shadow-sm cursor-pointer"
              aria-label="Étape précédente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={handleNext}
              className={`flex items-center justify-center w-10 h-10 rounded-full bg-[#f7f3ea] border border-[#8E8366]/40 text-[#8E8366] hover:bg-[#ebe4d6] hover:text-[#736a52] hover:border-[#8E8366]/70 transition-all pointer-events-auto shadow-sm cursor-pointer ${
                !hasInteracted ? "halo-pulse" : ""
              }`}
              aria-label="Étape suivante"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
        <div ref={sentinelRef} aria-hidden="true" />
      </div>
    </div>
  );
}
