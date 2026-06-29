"use client";

import { STORY } from "@/config/variables";
import { Image } from "./Image";

interface Hero2Props {
  titleDisplay?: string;
  subtitle?: string;
  category?: string;
  imageSrc?: string;
  imageAlt?: string;
  badge?: string;
}

/**
 * Hero2 — Variante créative "dossier d'investigation".
 *
 * Concept : long-read éditorial premium, mise en page asymétrique façon
 * dossier d'enquête déclassifié. Titre massif débordant, trame papier,
 * étiquette d'archive et apparition fluide échelonnée au chargement.
 *
 * Palette dérivée des variables du projet (teal "orlatti", rouge accent,
 * crème "trame") déclinée en HSL pour des dégradés et ombres harmonieux.
 */
export function Hero2({
  titleDisplay = STORY.titleDisplay || STORY.title,
  subtitle = STORY.description,
  category = "Enquête",
  imageSrc,
  imageAlt = "Illustration principale",
  badge = "Pour Julie",
}: Hero2Props) {
  // Numéro de dossier "fictif" dérivé de la date de publication pour l'ambiance archive.
  const fileRef = STORY.publicationDate?.replace(/-/g, ".") ?? "00.00.0000";
  const titleLines = titleDisplay.split("<br>");

  return (
    <header
      id="hero2"
      className="relative overflow-hidden -mx-4 md:-mx-7 -mt-4 md:-mt-7 isolate"
      style={{
        // Trame papier + halo lumineux teal très subtil = profondeur "dossier"
        backgroundColor: "hsl(43 38% 95%)",
        backgroundImage: [
          "radial-gradient(120% 80% at 85% -10%, hsl(184 100% 34% / 0.10) 0%, transparent 55%)",
          "radial-gradient(90% 70% at -10% 110%, hsl(8 100% 58% / 0.07) 0%, transparent 50%)",
          "linear-gradient(hsl(40 25% 12% / 0.035) 1px, transparent 1px)",
          "linear-gradient(90deg, hsl(40 25% 12% / 0.035) 1px, transparent 1px)",
        ].join(", "),
        backgroundSize: "auto, auto, 28px 28px, 28px 28px",
      }}
    >
      {/* Style scoped : keyframes d'apparition + lueur du badge tampon */}
      <style>{`
        @keyframes hero2-rise {
          from { opacity: 0; transform: translateY(26px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero2-stamp {
          0%   { opacity: 0; transform: rotate(-14deg) scale(1.4); }
          60%  { opacity: 1; }
          100% { opacity: 1; transform: rotate(-7deg) scale(1); }
        }
        .hero2-rise { opacity: 0; animation: hero2-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .hero2-stamp { opacity: 0; animation: hero2-stamp 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s forwards; }
        @media (prefers-reduced-motion: reduce) {
          .hero2-rise, .hero2-stamp { animation: none; opacity: 1; transform: none; }
        }
      `}</style>

      {/* Filet supérieur tricolore = signature "édition spéciale" */}
      <div
        className="absolute inset-x-0 top-0 h-1.5 z-20"
        style={{
          background:
            "linear-gradient(90deg, hsl(8 100% 58%) 0%, hsl(0 100% 44%) 50%, hsl(184 100% 34%) 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 pt-12 pb-10 md:pt-20 md:pb-16">
        {/* En-tête de dossier : catégorie + référence d'archive */}
        <div
          className="hero2-rise flex flex-wrap items-center gap-x-4 gap-y-2"
          style={{ animationDelay: "0.05s" }}
        >
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-[0.7rem] font-mono font-bold uppercase tracking-[0.18em] text-white"
            style={{
              backgroundColor: "hsl(0 100% 44%)",
              boxShadow: "3px 3px 0 hsl(40 30% 14%)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "hsl(43 60% 88%)" }}
            />
            {category}
          </span>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-neutral-500">
            Dossier&nbsp;Nº&nbsp;{fileRef}
          </span>
          <span
            className="hidden sm:block flex-1 h-px"
            style={{ backgroundColor: "hsl(40 25% 12% / 0.18)" }}
          />
        </div>

        {/* Titre massif, débordant et aligné à gauche */}
        <h1 className="mt-8 md:mt-12 font-black tracking-[-0.035em] leading-[0.94] text-balance">
          {titleLines.map((line, i) => (
            <span
              key={i}
              className="hero2-rise block text-[clamp(2.1rem,7vw,5.2rem)]"
              style={{
                animationDelay: `${0.12 + i * 0.08}s`,
                color: "hsl(40 30% 11%)",
              }}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* Figure débordante + tampon d'archive */}
        <figure
          className="hero2-rise relative mt-10 md:mt-14"
          style={{ animationDelay: "0.35s" }}
        >
          <div
            className="relative overflow-hidden rounded-xl"
            style={{
              boxShadow:
                "0 1px 0 hsl(0 0% 100% / 0.6), 0 30px 60px -22px hsl(40 30% 14% / 0.45), 0 12px 24px -16px hsl(184 60% 20% / 0.35)",
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              placeholderTxt="Illustration principale"
              ratio="16/9"
              className="rounded-xl"
            />
            {/* Vignette : fusionne le bas de l'image avec la trame de fond */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, hsl(43 38% 95% / 0.0) 70%, hsl(43 38% 95% / 0.55) 100%)",
                boxShadow: "inset 0 0 0 1px hsl(40 25% 12% / 0.06)",
              }}
            />
          </div>

          {/* Tampon "Pour Julie" façon cachet d'archive */}
          {badge && (
            <div className="hero2-stamp absolute -top-3 right-3 md:-top-5 md:right-6 z-10 select-none">
              <span
                className="inline-flex items-center px-4 py-2 text-[0.7rem] font-mono font-bold uppercase tracking-[0.18em] text-white"
                style={{
                  backgroundColor: "hsl(184 100% 30%)",
                  border: "2px solid hsl(40 30% 14%)",
                  boxShadow: "3px 3px 0 hsl(40 30% 14%)",
                }}
              >
                {badge}
              </span>
            </div>
          )}
        </figure>

        {/* Chapô / sous-titre : colonne resserrée, filet d'accent */}
        {subtitle && (
          <div
            className="hero2-rise mt-9 md:mt-12 max-w-2xl"
            style={{ animationDelay: "0.45s" }}
          >
            <p
              className="pl-5 text-lg md:text-2xl font-medium leading-snug"
              style={{
                borderLeft: "3px solid hsl(8 100% 58%)",
                color: "hsl(40 18% 22%)",
              }}
            >
              {subtitle}
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
