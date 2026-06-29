"use client";

import React, { useEffect, useRef, useState } from "react";

interface RecipeBookProps {
  className?: string;
}

interface Ingredient {
  label: string;      // libellé complet dans la liste de gauche
  chipLabel?: string; // libellé générique dans les pastilles d'étape (évite p. ex. de compter 100'000 francs plusieurs fois)
}

const INGREDIENTS: Ingredient[] = [
  { label: "100’000 francs", chipLabel: "De l’argent" },
  { label: "Un ou deux paysans avec un numéro d’exploitant" },
  { label: "Un réseau d’informateurs" },
  { label: "Un notaire coulant" },
  { label: "Des membres de Commission foncière aux petits oignons" },
  { label: "Des autorités cuites au bain marie" },
  { label: "Une louche de temps" },
];

// Chaque étape référence les ingrédients requis par leur index dans INGREDIENTS
const STEPS: { title: string; ingredients: number[] }[] = [
  { title: "Intégrer des paysans dans une société anonyme agricole", ingredients: [0, 1, 3] },
  { title: "Trouver un terrain à acquérir", ingredients: [2, 6] },
  { title: "Formaliser la vente", ingredients: [3, 0] },
  { title: "Obtenir l’aval de la Commission foncière", ingredients: [4, 5] },
  { title: "Faire mûrir son investissement", ingredients: [6] },
];

/* ------------------------------------------------------------------ */
/* Icônes des panneaux (panier pour les ingrédients, liste ordonnée    */
/* pour les étapes) — réutilisées dans les onglets mobiles.            */
/* ------------------------------------------------------------------ */

function BasketIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

function ChefHatIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
      <path d="M6 17h12" />
    </svg>
  );
}

function UtensilsIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function StepsIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M10 12h11" />
      <path d="M10 18h11" />
      <path d="M10 6h11" />
      <path d="M4 10h2" />
      <path d="M4 6h1v4" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

/** Titre de panneau commun aux deux zones — typographie alignée sur h4.lpi-title */
function PanelTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2.5 font-extrabold tracking-tight text-base md:text-lg text-[#755e45] leading-snug">
      <span className="shrink-0 text-[#E20000]">{icon}</span>
      {children}
    </h4>
  );
}

/**
 * « La recette » — infographie interactive double-zone.
 * Desktop : ingrédients et étapes côte à côte.
 * Mobile : deux onglets (même style que le commutateur de LandPriceIsometric).
 * Zone de gauche : liste statique des ingrédients (les ingrédients requis
 * par l'étape active sont subtilement mis en avant).
 * Zone de droite : les étapes, feuilletables en fondu, avec la sous-liste
 * des ingrédients requis en pastilles. Toutes les étapes sont empilées dans
 * la même cellule de grille pour figer la hauteur sur la plus grande d'entre
 * elles (pas de saut de layout). Navigation calquée sur LandfillInfographic.
 */
export function RecipeBook({ className = "" }: RecipeBookProps) {
  // Page 0 = page de garde, pages 1..5 = les étapes, dernière page = bon appétit
  const PAGE_COUNT = STEPS.length + 2;
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState<"ingredients" | "steps">("ingredients");
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % PAGE_COUNT);
    setHasInteracted(true);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1 + PAGE_COUNT) % PAGE_COUNT);
    setHasInteracted(true);
  };

  const handleDotClick = (index: number) => {
    setPage(index);
    setHasInteracted(true);
  };

  // Sur la page de garde et la page finale, aucun ingrédient n'est mis en évidence
  const activeIngredients =
    page >= 1 && page <= STEPS.length ? STEPS[page - 1].ingredients : [];

  // La liste des ingrédients ne se déroule que lorsque le lecteur arrive
  // à la hauteur du composant (une seule fois), comme LandPriceIsometric
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const fallback = setTimeout(() => setRevealed(true), 0);
      return () => clearTimeout(fallback);
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      // Déclenchement volontairement tardif : il faut presque la moitié du
      // composant à l'écran, et la bande basse du viewport (occupée par la
      // mini-carte fixée) est exclue du calcul
      { threshold: 0.45, rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`w-full ${className}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes rb-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .rb-fade { animation: rb-fade 0.45s cubic-bezier(0.25, 0.6, 0.3, 1) both; }
        @keyframes rb-slide-in {
          from { opacity: 0; transform: translateX(-16px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .rb-slide-in { animation: rb-slide-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) both; }
      `}} />

      <div className="mx-auto max-w-[920px]">

        {/* ————— ONGLETS (mobile uniquement, style du commutateur LandPriceIsometric) ————— */}
        <div className="mb-3 flex w-full rounded-full border border-[#8E8366]/25 bg-[#efe8d4] p-1 shadow-inner md:hidden" role="tablist" aria-label="La recette">
          {([
            ["ingredients", "Les ingrédients", <BasketIcon key="i" className="h-4 w-4" />],
            ["steps", "Les étapes", <StepsIcon key="s" className="h-4 w-4" />],
          ] as const).map(([key, label, icon]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-0 py-2.5 text-center text-sm font-bold transition-all ${
                tab === key
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span className={tab === key ? "text-[#E20000]" : "text-gray-400"}>{icon}</span>
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_3fr] md:gap-4">

          {/* ————— ZONE DE GAUCHE : LES INGRÉDIENTS ————— */}
          <div className={`${tab === "ingredients" ? "block" : "hidden"} rounded-2xl bg-[#8E8366]/10 p-4 md:block md:p-8`}>
            <PanelTitle icon={<BasketIcon className="h-5 w-5 md:h-7 md:w-7" />}>Les ingrédients</PanelTitle>

            <ul className="mt-3 md:mt-5 space-y-2 md:space-y-3">
              {INGREDIENTS.map((ingredient, i) => {
                const isActive = activeIngredients.includes(i);
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-3 ${revealed ? "rb-slide-in" : "opacity-0"}`}
                    style={revealed ? { animationDelay: `${i * 150}ms` } : undefined}
                  >
                    {/* La mise en évidence ne s'applique qu'à partir de md :
                        sur mobile les panneaux sont en onglets, le lien visuel
                        avec l'étape affichée n'aurait aucun sens */}
                    <span
                      className={`mt-[9px] md:mt-[11px] h-[7px] w-[7px] shrink-0 rounded-[1.5px] bg-[#8E8366]/50 transition-colors duration-500 ${
                        isActive ? "md:bg-[#E20000]" : ""
                      }`}
                    />
                    <span
                      className={`font-hand text-xl md:text-[26px] font-semibold leading-tight text-[#736a52]/80 transition-all duration-500 ${
                        isActive ? "md:text-[#5c5440]" : ""
                      }`}
                    >
                      {ingredient.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* ————— ZONE DE DROITE : LES ÉTAPES ————— */}
          <div className={`${tab === "steps" ? "flex" : "hidden"} flex-col rounded-2xl bg-[#FAF8F4] p-4 md:flex md:p-8`}>
            <PanelTitle icon={<StepsIcon className="h-5 w-5 md:h-7 md:w-7" />}>Les étapes</PanelTitle>

            {/* Toutes les étapes occupent la même cellule de grille : la zone
                prend la hauteur de la plus grande, le contenu change sans saut */}
            <div className="grid flex-1">

              {/* Page de garde du livre de recettes */}
              <div
                aria-hidden={page !== 0}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center py-5 md:py-6 text-center ${
                  page === 0 ? "rb-fade" : "invisible pointer-events-none"
                }`}
              >
                <ChefHatIcon className="h-8 w-8 text-[#E20000] md:h-12 md:w-12" />
                <h5 className="font-hand mt-3 md:mt-4 max-w-[400px] text-2xl md:text-4xl font-bold leading-none text-[#5c5440]">
                  Comment mettre la main sur des terres agricoles sans être
                  agriculteur, en cinq étapes et sept ingrédients.
                </h5>
                {/* <p
                  className={`mt-2 md:mt-3 max-w-[360px] text-sm md:text-[15px] font-light leading-relaxed text-[#736a52] ${page === 0 ? "rb-fade" : ""}`}
                  style={page === 0 ? { animationDelay: "120ms" } : undefined}
                >
                  
                </p> */}
                <button
                  type="button"
                  onClick={handleNext}
                  className={`mt-4 md:mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#E20000] px-4 py-2 md:px-5 md:py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#c40000] ${page === 0 ? "rb-fade" : ""}`}
                  style={page === 0 ? { animationDelay: "220ms" } : undefined}
                >
                  Commencer la recette
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>

              {STEPS.map((s, i) => {
                const isCurrent = page === i + 1;
                return (
                  <div
                    key={i}
                    aria-hidden={!isCurrent}
                    className={`col-start-1 row-start-1 flex flex-col items-center justify-center py-5 md:py-6 text-center ${
                      isCurrent ? "rb-fade" : "invisible pointer-events-none"
                    }`}
                  >
                    <p className="inline-flex items-center gap-2 rounded-full border border-[#8E8366]/25 bg-white/80 px-3 py-1.5 md:px-4 md:py-2 shadow-sm">
                      <span className="text-xs md:text-sm font-bold uppercase leading-none tracking-[0.08em] text-[#736a52]">Étape</span>
                      <span className="text-xl md:text-3xl font-extrabold leading-none text-[#E20000]">{i + 1}</span>
                      <span className="text-xs md:text-sm font-semibold leading-none text-[#736a52]/60">/ {STEPS.length}</span>
                    </p>

                    <h5 className="mt-3 md:mt-4 max-w-[440px] text-xl md:text-[28px] font-bold leading-snug tracking-tight text-[#5c5440]">
                      {s.title}
                    </h5>

                    {/* Les ingrédients à combiner, empilés */}
                    <p
                      className={`font-hand mt-4 md:mt-6 text-base md:text-xl font-semibold leading-none text-[#736a52]/70 ${isCurrent ? "rb-fade" : ""}`}
                      style={isCurrent ? { animationDelay: "120ms" } : undefined}
                    >
                      {s.ingredients.length > 1
                        ? "Combiner les ingrédients suivants :"
                        : "Ajouter l’ingrédient suivant :"}
                    </p>
                    <div className="mt-2 md:mt-3 flex flex-col items-center gap-1.5 md:gap-2">
                      {s.ingredients.map((ingIdx, j) => (
                        <span
                          key={ingIdx}
                          className={`font-hand inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-[#8E8366]/25 bg-white/80 px-3 py-1 md:px-4 md:py-1.5 text-base md:text-[22px] font-semibold leading-none text-[#736a52] ${
                            isCurrent ? "rb-fade" : ""
                          }`}
                          style={isCurrent ? { animationDelay: `${200 + j * 110}ms` } : undefined}
                        >
                          <span className="h-[6px] w-[6px] shrink-0 rounded-[1.5px] bg-[#E20000]" />
                          {INGREDIENTS[ingIdx].chipLabel ?? INGREDIENTS[ingIdx].label}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Page finale : bon appétit */}
              <div
                aria-hidden={page !== PAGE_COUNT - 1}
                className={`col-start-1 row-start-1 flex flex-col items-center justify-center py-5 md:py-6 text-center ${
                  page === PAGE_COUNT - 1 ? "rb-fade" : "invisible pointer-events-none"
                }`}
              >
                <UtensilsIcon className="h-8 w-8 text-[#E20000] md:h-12 md:w-12" />
                <h5 className="font-hand mt-3 md:mt-4 max-w-[400px] text-2xl md:text-4xl font-bold leading-tight text-[#5c5440]">
                  Bon appétit !
                </h5>
                <p
                  className={`mt-2 md:mt-3 max-w-[380px] text-sm md:text-[15px] font-light leading-relaxed text-[#736a52] ${page === PAGE_COUNT - 1 ? "rb-fade" : ""}`}
                  style={page === PAGE_COUNT - 1 ? { animationDelay: "120ms" } : undefined}
                >
                  Félicitations : vous avez mis la main sur des terres agricoles
                  sans être agriculteur. Laissez mijoter quelques années, le
                  terrain prendra de la valeur tout seul.
                </p>
                <button
                  type="button"
                  onClick={() => handleDotClick(0)}
                  className={`mt-4 md:mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#8E8366]/40 bg-white/80 px-4 py-2 md:px-5 md:py-2.5 text-sm font-bold text-[#736a52] shadow-sm transition-all hover:border-[#8E8366]/70 hover:bg-[#f7f3ea] ${page === PAGE_COUNT - 1 ? "rb-fade" : ""}`}
                  style={page === PAGE_COUNT - 1 ? { animationDelay: "220ms" } : undefined}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5" />
                  </svg>
                  Revoir la recette
                </button>
              </div>
            </div>

            {/* Navigation (même mécanique que LandfillInfographic) */}
            <div className="mt-2 flex items-center justify-between border-t border-[#8E8366]/20 pt-4 font-mono text-xs text-neutral-400 md:mt-6">
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#8E8366]">{page + 1} / {PAGE_COUNT}</span>
                <div className="flex gap-1.5">
                  {Array.from({ length: PAGE_COUNT }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleDotClick(index)}
                      className={`h-2.5 w-2.5 cursor-pointer rounded-full transition-all ${
                        index === page
                          ? "w-5 bg-[#E20000] shadow-[0_0_8px_rgba(226,0,0,0.3)]"
                          : "bg-[#8E8366]/30 hover:bg-[#8E8366]/60"
                      }`}
                      aria-label={
                        index === 0
                          ? "Aller à la page de garde"
                          : index === PAGE_COUNT - 1
                            ? "Aller à la page finale"
                            : `Aller à l'étape ${index}`
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#8E8366]/40 bg-[#f7f3ea] text-[#8E8366] shadow-sm transition-all hover:border-[#8E8366]/70 hover:bg-[#ebe4d6] hover:text-[#736a52]"
                  aria-label="Étape précédente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className={`pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#8E8366]/40 bg-[#f7f3ea] text-[#8E8366] shadow-sm transition-all hover:border-[#8E8366]/70 hover:bg-[#ebe4d6] hover:text-[#736a52] ${
                    !hasInteracted ? "halo-pulse" : ""
                  }`}
                  aria-label="Étape suivante"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
