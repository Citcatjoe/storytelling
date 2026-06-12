"use client";

import React, { useState } from "react";

interface LandItem {
  id: string;
  label: string;
  price: number;
  colorClass: string;
  description: string;
  detail: string;
}

const landData: LandItem[] = [
  {
    id: "foret",
    label: "Forêt liée à terrain agricole",
    price: 2,
    colorClass: "bg-slate-500",
    description: "Bois et forêts attenants à des exploitations agricoles.",
    detail: "Prix indicatif d'achat pour des boisés indissociables d'un domaine agricole."
  },
  {
    id: "agricole",
    label: "Terrain agricole",
    price: 8,
    colorClass: "bg-[#009FAB]", // orlatti brand teal
    description: "Terres agricoles protégées par la Loi sur le droit foncier rural (LDFR).",
    detail: "Prix maximum licite moyen fixé pour garantir le maintien des structures paysannes."
  },
  {
    id: "speciale",
    label: "Zone agricole spéciale",
    price: 12,
    colorClass: "bg-[#FF4F28]", // accent1 orange-red
    description: "Terres agricoles bénéficiant d'une dérogation exceptionnelle à l'inconstructibilité.",
    detail: "Autorisation spéciale permettant certaines constructions liées à l'exploitation."
  },
  {
    id: "viticole",
    label: "Terrain viticole",
    price: 15,
    colorClass: "bg-purple-600",
    description: "Vignes de haute valeur paysagère et de culture exigeante.",
    detail: "Foncier viticole en coteaux, souvent soumis à de fortes pressions d'acquisition."
  },
  {
    id: "batir",
    label: "Terrain à bâtir (Genève 2025)",
    price: 2270,
    colorClass: "bg-[#E20000]", // accent2 blick red
    description: "Prix moyen indicatif du m² pour la construction résidentielle ou commerciale.",
    detail: "La poule aux œufs d'or : le passage de la zone agricole à la zone à bâtir multiplie la valeur par 150 à 300."
  }
];

export default function LandPriceChart() {
  const [scaleMode, setScaleMode] = useState<"focus" | "real">("focus");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Maximum value for the agricultural scale zoom
  const maxAgri = 15;
  const maxReal = 2270;

  // Find currently selected or hovered item to show details
  const activeItem = landData.find((item) => item.id === (hoveredId || "agricole")) || landData[1];

  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-[2px] border-[#8E8366]/20 rounded-2xl p-4 md:p-6 shadow-xl flex flex-col gap-6 select-none transition-all duration-300">
      
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#8E8366]/10 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-100 text-amber-800 border border-amber-200 mb-1">
            Genève & Région
          </span>
          <h4 className="font-bold text-sm text-gray-700 uppercase tracking-widest">
            Comparatif des prix au m² (CHF)
          </h4>
        </div>
        
        {/* Toggle Switch */}
        <div className="flex bg-[#f7f3ea] p-1 rounded-full border border-[#8E8366]/20 w-full sm:w-auto max-w-xs shrink-0 shadow-inner">
          <button
            onClick={() => setScaleMode("focus")}
            className={`flex-1 sm:flex-none text-center py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              scaleMode === "focus"
                ? "bg-white text-gray-800 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Zoom Agricole
          </button>
          <button
            onClick={() => setScaleMode("real")}
            className={`flex-1 sm:flex-none text-center py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              scaleMode === "real"
                ? "bg-[#E20000] text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Échelle Réelle (Choc)
          </button>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="relative w-full h-[280px] md:h-[340px] flex items-end justify-between gap-2 md:gap-4 px-2 md:px-6 pt-10 border-b border-[#8E8366]/20 pb-2 overflow-visible">
        
        {/* Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-between pt-10 pb-2">
          <div className="w-full border-t border-dashed border-gray-200"></div>
          <div className="w-full border-t border-dashed border-gray-200"></div>
          <div className="w-full border-t border-dashed border-gray-200"></div>
        </div>

        {landData.map((item) => {
          const isBuildable = item.id === "batir";
          
          // Calculate percentage height
          let heightPercent = 0;
          let isTruncated = false;

          if (scaleMode === "focus") {
            if (isBuildable) {
              heightPercent = 100; // Capped/Truncated
              isTruncated = true;
            } else {
              heightPercent = (item.price / maxAgri) * 85; // Max agricultural is 85% of total height to leave space for labels
            }
          } else {
            // Real scale comparison
            heightPercent = Math.max((item.price / maxReal) * 90, 1.2); // Set a minimum of 1.2% so it doesn't disappear completely
          }

          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              className="flex-1 flex flex-col items-center group relative h-full justify-end cursor-pointer"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip on Top */}
              <div 
                className={`absolute -top-4 bg-gray-900 text-white text-[10px] font-mono py-1 px-2 rounded shadow-md pointer-events-none transition-all duration-300 transform -translate-y-2 z-20 ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
              >
                Fr. {item.price.toLocaleString("fr-CH")}.- / m²
              </div>

              {/* Bar Column */}
              <div 
                style={{ height: `${heightPercent}%` }}
                className={`w-full max-w-[48px] md:max-w-[64px] rounded-t-lg transition-all duration-500 ease-out relative flex flex-col justify-start items-center ${item.colorClass} ${
                  isHovered ? "brightness-105 shadow-[0_0_12px_rgba(0,0,0,0.15)] scale-x-105" : "shadow-md"
                }`}
              >
                {/* Truncated Waves Effect for buildable land in Zoom mode */}
                {isTruncated && scaleMode === "focus" && (
                  <div className="absolute -top-3 left-0 w-full overflow-hidden h-6 flex flex-col justify-start pointer-events-none">
                    <svg className="w-full text-white fill-current animate-pulse" viewBox="0 0 100 20" preserveAspectRatio="none">
                      <path d="M0,10 C25,20 25,0 50,10 C75,20 75,0 100,10 L100,20 L0,20 Z" />
                    </svg>
                    <div className="w-full bg-white h-full"></div>
                  </div>
                )}

                {/* Price Display Inside / On Top of Bar */}
                <div 
                  className={`absolute -top-6 font-mono text-[10px] md:text-xs font-bold transition-all duration-300 ${
                    isTruncated && scaleMode === "focus" 
                      ? "text-[#E20000] -top-10 bg-red-50 px-1.5 py-0.5 rounded border border-red-200" 
                      : "text-gray-800"
                  }`}
                >
                  {isTruncated && scaleMode === "focus" ? (
                    <span className="whitespace-nowrap">Fr. 2'270.- (Hors norme)</span>
                  ) : (
                    <span>Fr. {item.price}.-</span>
                  )}
                </div>
              </div>

              {/* Category Icon / Dot indicator at bottom */}
              <div className={`w-2 h-2 rounded-full mt-3 ${item.colorClass} ${isHovered ? "scale-125" : ""}`} />
            </div>
          );
        })}
      </div>

      {/* Axis Labels */}
      <div className="grid grid-cols-5 gap-2 text-center text-[9px] md:text-xs text-gray-500 font-semibold tracking-tight">
        {landData.map((item) => (
          <div 
            key={item.id} 
            className={`px-1 leading-snug cursor-pointer transition-colors ${
              hoveredId === item.id ? "text-gray-900 font-bold" : ""
            }`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {item.label}
          </div>
        ))}
      </div>

      {/* Detail Panel at the bottom */}
      <div className="bg-[#f7f3ea]/50 border border-[#8E8366]/15 rounded-xl p-4 transition-all duration-300">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-3 h-3 rounded-full shrink-0 ${activeItem.colorClass}`} />
          <h5 className="font-bold text-xs md:text-sm text-gray-800 font-sans tracking-tight">
            {activeItem.label}
          </h5>
          <span className="font-mono text-xs text-gray-500 font-bold ml-auto shrink-0">
            Fr. {activeItem.price.toLocaleString("fr-CH")}.- / m²
          </span>
        </div>
        <p className="text-xs text-gray-600 font-medium leading-relaxed">
          {activeItem.description}
        </p>
        <p className="text-[10px] text-gray-400 font-mono mt-1">
          {activeItem.detail}
        </p>
      </div>

    </div>
  );
}
