"use client";

import React, { useEffect, useRef, useState } from "react";

/* ----------------------------------------------------------------------------
 * LandPriceIsometric
 * ----------------------------------------------------------------------------
 * Dataviz isométrique des prix du foncier genevois (LDFR vs zone à bâtir).
 * Cinq "parcelles de terre" extrudées en perspective 2:1 — forêt, champ
 * labouré, serre dérogatoire, coteau viticole — face au monolithe de béton
 * du terrain constructible (Fr. 2'270.-/m²).
 *
 * Deux modes d'échelle (animés en rAF, easing organique):
 *  - "zoom"  : focale sur le terroir (2-15 CHF), la tour crève le cadre
 *              et se perd dans les nuages (effet tronqué).
 *  - "real"  : échelle réelle — la tour écrase la scène, les parcelles
 *              agricoles deviennent des confettis plats au sol.
 * ------------------------------------------------------------------------- */

interface PlotData {
  id: string;
  label: string;
  shortLabel: string[];
  price: number;
  priceLabel: string;
  swatch: string;          // pastille du panneau de détail
  description: string;
  detail: string;
}

const PLOTS: PlotData[] = [
  {
    id: "foret",
    label: "Forêt liée à terrain agricole",
    shortLabel: ["Forêt"],
    price: 2,
    priceLabel: "2.-",
    swatch: "bg-[#6d7a55]",
    description:
      "Les bois attenants à un domaine agricole se négocient au prix d'un café le mètre carré. Indissociables des terres qu'ils bordent, ils en suivent le destin.",
    detail:
      "Prix maximum licite fixé par la Commission foncière agricole, en vertu de la LDFR.",
  },
  {
    id: "agricole",
    label: "Terrain agricole",
    shortLabel: ["Terrain", "agricole"],
    price: 8,
    priceLabel: "8.-",
    swatch: "bg-[#a3825e]",
    description:
      "La LDFR plafonne le prix des terres cultivables pour barrer la route à la spéculation. En principe, seuls les exploitants à titre personnel peuvent acquérir.",
    detail:
      "C'est ce verrou que contournent les montages avec hommes de paille agricoles.",
  },
  {
    id: "speciale",
    label: "Zone agricole spéciale (dérogation)",
    shortLabel: ["Zone agricole", "spéciale"],
    price: 12,
    priceLabel: "12.-",
    swatch: "bg-[#4f8d8a]",
    description:
      "La dérogation qui autorise serres et cultures hors-sol fait grimper le mètre carré de 50%. Un premier indice: dès qu'on peut construire, la terre s'envole.",
    detail:
      "Dérogation au principe d'inconstructibilité de la zone agricole.",
  },
  {
    id: "viticole",
    label: "Terrain viticole",
    shortLabel: ["Terrain", "viticole"],
    price: 15,
    priceLabel: "15.-",
    swatch: "bg-[#748257]",
    description:
      "Le sommet de l'échelle agricole: les coteaux genevois, culture exigeante et forte valeur paysagère. Quinze francs le mètre carré — toujours 150 fois moins que le béton.",
    detail:
      "Foncier rare, soumis lui aussi au prix maximum licite de la LDFR.",
  },
  {
    id: "batir",
    label: "Terrain à bâtir (Genève 2025)",
    shortLabel: ["Terrain", "à bâtir"],
    price: 2270,
    priceLabel: "2'270.-",
    swatch: "bg-[#E20000]",
    description:
      "2'270 francs le mètre carré: sortir une parcelle de la zone agricole multiplie sa valeur par 284. Le déclassement est le jackpot foncier — d'où l'intérêt d'acheter des terres à 8 francs… et d'attendre.",
    detail:
      "Prix moyen indicatif du m² constructible. Hors de toute protection LDFR: ici, le marché est libre.",
  },
];

/* ------------------------------------------------------------------ */
/* Géométrie isométrique 2:1                                           */
/* ------------------------------------------------------------------ */

// Position des parcelles dans la scène (860 x 560)
const LAYOUT = [
  { cx: 100, cy: 428, w: 56 },
  { cx: 244, cy: 440, w: 56 },
  { cx: 388, cy: 430, w: 56 },
  { cx: 532, cy: 442, w: 56 },
  { cx: 700, cy: 436, w: 72 }, // la tour, empattement plus large
];

const H_ZOOM_MAX = 150;  // hauteur du viticole (15.-) en mode zoom
const H_TOWER_ZOOM = 580; // la tour crève le cadre (clippée par le SVG)
const H_REAL_MAX = 322;  // hauteur de la tour en échelle réelle

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (t: number) => Math.min(Math.max(t, 0), 1);
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const linearEase = (t: number) => t;
// Léger dépassement élastique pour l'apparition des parcelles
const easeOutBack = (t: number) => {
  const c1 = 1.2;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

/** Interpole une valeur cible avec une animation rAF organique. */
function useAnimatedNumber(
  target: number,
  duration = 1100,
  ease: (t: number) => number = easeInOutCubic
): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (current.current === target) return;
    const from = current.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = duration <= 0 ? 1 : Math.min((now - start) / duration, 1);
      const v = lerp(from, target, ease(p));
      current.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, ease]);

  return value;
}

/** Paramétrage (u,v) ∈ [0,1]² du plateau d'une parcelle, z = altitude. */
type IsoFn = (u: number, v: number, z?: number) => [number, number];

const makeIso = (cx: number, cyTop: number, w: number): IsoFn => {
  const hh = w / 2;
  return (u, v, z = 0) => [cx + (u - v) * w, cyTop + (u + v - 1) * hh - z];
};

const poly = (pts: [number, number][]) =>
  pts.map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

/* ------------------------------------------------------------------ */
/* Décors végétaux & bâtis (posés sur le plateau, suivent la hauteur)  */
/* ------------------------------------------------------------------ */

function Trees({ iso, k }: { iso: IsoFn; k: number }) {
  const spots: [number, number, number][] = [
    [0.3, 0.28, 1.1],
    [0.68, 0.2, 0.85],
    [0.22, 0.68, 0.9],
    [0.55, 0.55, 1.2],
    [0.8, 0.62, 0.75],
  ];
  return (
    <g>
      {spots.map(([u, v, size], i) => {
        const s = size * k;
        const [x, y] = iso(u, v);
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y - 5 * s} stroke="#5d4a33" strokeWidth={1.6 * s} />
            <polygon
              points={poly([[x - 6 * s, y - 4 * s], [x + 6 * s, y - 4 * s], [x, y - 14 * s]])}
              fill="#4f6644"
            />
            <polygon
              points={poly([[x - 4.5 * s, y - 9 * s], [x + 4.5 * s, y - 9 * s], [x, y - 17 * s]])}
              fill="#66794f"
            />
          </g>
        );
      })}
    </g>
  );
}

function Furrows({ iso, k }: { iso: IsoFn; k: number }) {
  const rows = [0.18, 0.36, 0.54, 0.72, 0.9];
  const wheat: [number, number][] = [
    [0.2, 0.27], [0.45, 0.27], [0.7, 0.27],
    [0.3, 0.63], [0.55, 0.63], [0.8, 0.63],
  ];
  return (
    <g>
      {rows.map((v, i) => {
        const [x1, y1] = iso(0.06, v);
        const [x2, y2] = iso(0.94, v);
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#7d5c38" strokeWidth={2.2} strokeLinecap="round" opacity={0.85} />
        );
      })}
      {wheat.map(([u, v], i) => {
        const [x, y] = iso(u, v);
        return (
          <g key={i}>
            <line x1={x} y1={y} x2={x} y2={y - 8 * k} stroke="#cfa45c" strokeWidth={1.4} />
            <ellipse cx={x} cy={y - 9 * k} rx={2 * k} ry={3.2 * k} fill="#d9bc80" />
          </g>
        );
      })}
    </g>
  );
}

function Greenhouse({ iso, k }: { iso: IsoFn; k: number }) {
  const gh = 16 * k;       // hauteur des parois
  const rh = 9 * k;        // surélévation du faîte
  const u0 = 0.26, u1 = 0.8, v0 = 0.3, v1 = 0.74;
  const B = iso(u1, v0), C = iso(u1, v1), D = iso(u0, v1);
  const A2 = iso(u0, v0, gh), B2 = iso(u1, v0, gh), C2 = iso(u1, v1, gh), D2 = iso(u0, v1, gh);
  const M0 = iso(u0, (v0 + v1) / 2, gh + rh);
  const M1 = iso(u1, (v0 + v1) / 2, gh + rh);
  const glass = { fill: "#bcd6d0", fillOpacity: 0.55, stroke: "#ffffff", strokeWidth: 1 };
  return (
    <g opacity={k <= 0.05 ? 0 : 1}>
      {/* pan de toit arrière */}
      <polygon points={poly([A2, B2, M1, M0])} {...glass} fillOpacity={0.4} />
      {/* pignon droit */}
      <polygon points={poly([B, C, C2, B2])} {...glass} fillOpacity={0.45} />
      {/* paroi avant */}
      <polygon points={poly([D, C, C2, D2])} {...glass} />
      {/* pan de toit avant */}
      <polygon points={poly([D2, C2, M1, M0])} {...glass} fillOpacity={0.7} />
      {/* faîte */}
      <line x1={M0[0]} y1={M0[1]} x2={M1[0]} y2={M1[1]} stroke="#4f8d8a" strokeWidth={1.2} />
    </g>
  );
}

function Vines({ iso, k }: { iso: IsoFn; k: number }) {
  const rows = [0.25, 0.5, 0.75];
  const posts = [0.12, 0.31, 0.5, 0.69, 0.88];
  return (
    <g>
      {rows.map((v, i) => {
        const [wx1, wy1] = iso(0.12, v, 8 * k);
        const [wx2, wy2] = iso(0.88, v, 8 * k);
        return (
          <g key={i}>
            <line x1={wx1} y1={wy1} x2={wx2} y2={wy2} stroke="#6b7a4f" strokeWidth={1} opacity={0.7} />
            {posts.map((u, j) => {
              const [x, y] = iso(u, v);
              const [tx, ty] = iso(u, v, 9 * k);
              return (
                <g key={j}>
                  <line x1={x} y1={y} x2={tx} y2={ty} stroke="#6b5536" strokeWidth={1.5} />
                  <circle cx={tx} cy={ty} r={3 * k} fill="#748257" />
                  <circle cx={tx + 1.5 * k} cy={ty + 2.5 * k} r={1.3 * k} fill="#6d5570" />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
}

function Cloud({ x, y, s = 1, dur = 11, delay = 0 }: { x: number; y: number; s?: number; dur?: number; delay?: number }) {
  return (
    <g
      className="lpi-cloud lpi-anim"
      style={{ animation: `lpi-drift ${dur}s ease-in-out ${delay}s infinite alternate` }}
      opacity={0.92}
    >
      <ellipse cx={x} cy={y} rx={34 * s} ry={13 * s} fill="#ffffff" />
      <ellipse cx={x - 20 * s} cy={y + 4 * s} rx={20 * s} ry={9 * s} fill="#ffffff" />
      <ellipse cx={x + 22 * s} cy={y + 5 * s} rx={22 * s} ry={9 * s} fill="#ffffff" />
      <ellipse cx={x + 4 * s} cy={y - 8 * s} rx={18 * s} ry={10 * s} fill="#ffffff" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Composant principal                                                 */
/* ------------------------------------------------------------------ */

export default function LandPriceIsometric() {
  const [mode, setMode] = useState<"zoom" | "real">("zoom");
  // Sélection fixée au clic (desktop) ou au tap (mobile) — pas de survol
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Apparition à la découverte de la zone (une seule fois)
  const rootRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false)
  );

  // Visite guidée: un "faux survol" parcourt les parcelles jusqu'à la
  // première interaction réelle du lecteur.
  const [hintId, setHintId] = useState<string | null>(null);
  const [interacted, setInteracted] = useState(false);

  // 0 = zoom agricole, 1 = échelle réelle — anime toutes les hauteurs d'un geste
  const mix = useAnimatedNumber(mode === "real" ? 1 : 0, 1200);
  // 0 → 1 linéaire, le stagger + easing par parcelle est calculé localement
  const reveal = useAnimatedNumber(revealed ? 1 : 0, reduceMotion ? 0 : 2000, linearEase);

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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || interacted) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setHintId(PLOTS[0].id);
      i = 1;
      interval = setInterval(() => {
        if (i >= PLOTS.length) {
          setHintId(null);
          clearInterval(interval);
          return;
        }
        setHintId(PLOTS[i].id);
        i += 1;
      }, 1300);
    }, 2400); // démarre une fois les parcelles sorties de terre
    return () => {
      clearTimeout(start);
      if (interval) clearInterval(interval);
    };
  }, [revealed, interacted]);

  const selectPlot = (id: string) => {
    setInteracted(true);
    setHintId(null);
    setSelectedId(id);
  };

  const heightOf = (price: number) => {
    const hZoom = price <= 15 ? (price / 15) * H_ZOOM_MAX : H_TOWER_ZOOM;
    const hReal = Math.max((price / 2270) * H_REAL_MAX, 3);
    return lerp(hZoom, hReal, mix);
  };

  const focusId = selectedId ?? hintId;
  const activeItem = PLOTS.find((p) => p.id === focusId) ?? PLOTS[4];

  return (
    <div ref={rootRef} className="lpi-root w-full flex flex-col gap-4 select-none">
      <style>{`
        @keyframes lpi-drift { from { transform: translateX(-26px); } to { transform: translateX(26px); } }
        @keyframes lpi-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.15; } }
        
        .lpi-labels {
          transition: transform 0.3s ease;
        }
        @media (max-width: 640px) {
          .lpi-labels {
            transform: scale(1.85) translateY(12px);
          }
        }
        @media (prefers-reduced-motion: reduce) { .lpi-anim { animation: none !important; } }
      `}</style>

      {/* En-tête + commutateur d'échelle */}
      <div className="lpi-header flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-[#8E8366]/15 pb-4">
        <h4 className="lpi-title font-semibold text-sm md:text-base text-[#755e45] leading-snug max-w-[560px]">
          {`Prix maxima licites de vente pour les immeubles agricoles soumis à la loi fédérale sur le droit foncier rural fixés par la La commission foncière agricole pour l'année en cours:`}
        </h4>

        <div className="lpi-toggle flex bg-[#efe8d4] p-1 rounded-full border border-[#8E8366]/25 w-full sm:w-auto sm:max-w-xs shrink-0 shadow-inner">
          <button
            onClick={() => setMode("zoom")}
            className={`lpi-toggle-zoom flex-1 sm:flex-none text-center py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              mode === "zoom" ? "bg-white text-gray-800 shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Zoom agricole
          </button>
          <button
            onClick={() => setMode("real")}
            className={`lpi-toggle-real flex-1 sm:flex-none text-center py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              mode === "real" ? "bg-[#E20000] text-white shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            Échelle réelle
          </button>
        </div>
      </div>

      {/* Scène isométrique */}
      <div className="lpi-scene w-full rounded-xl overflow-hidden bg-gradient-to-b from-[#edeadd] via-[#f5f1e6]/70 to-transparent pb-10 sm:pb-6">
        <svg
          viewBox="0 0 860 550"
          overflow="visible"
          className="lpi-svg w-full h-auto block"
          role="img"
          aria-label="Comparaison isométrique des prix du foncier à Genève: de 2 francs le m² de forêt à 2'270 francs le m² constructible"
        >
          <defs>
            {/* fenêtres de la tour, inclinées pour épouser les faces iso */}
            <pattern id="lpi-win-l" width="16" height="18" patternUnits="userSpaceOnUse" patternTransform="skewY(26.57)">
              <rect x="4" y="5" width="6" height="8" rx="0.5" fill="#49453a" opacity="0.38" />
            </pattern>
            <pattern id="lpi-win-r" width="16" height="18" patternUnits="userSpaceOnUse" patternTransform="skewY(-26.57)">
              <rect x="4" y="5" width="6" height="8" rx="0.5" fill="#49453a" opacity="0.3" />
            </pattern>
            {/* voile de troncature: la tour se dissout dans le ciel */}
            <linearGradient id="lpi-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#edeadd" stopOpacity="1" />
              <stop offset="55%" stopColor="#edeadd" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#edeadd" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* ciel: soleil, oiseaux */}
          <circle cx={92} cy={66} r={38} fill="#f4d9a1" opacity={0.25} />
          <circle cx={92} cy={66} r={24} fill="#f4d9a1" opacity={0.9} />
          <path d="m296 96 q5 -5 10 0 q5 -5 10 0" stroke="#978f7d" strokeWidth={1.4} fill="none" strokeLinecap="round" />
          <path d="m338 80 q4 -4 8 0 q4 -4 8 0" stroke="#978f7d" strokeWidth={1.2} fill="none" strokeLinecap="round" />

          {/* plateau de campagne */}
          <polygon
            points={poly([[430, 240], [918, 484], [430, 728], [-58, 484]])}
            fill="#efe8d6"
            opacity={0.85}
          />
          <polygon
            points={poly([[430, 248], [906, 486], [430, 724], [-46, 486]])}
            fill="none"
            stroke="#d9cdaf"
            strokeWidth={1.5}
            opacity={0.6}
          />

          {/* les cinq parcelles */}
          {PLOTS.map((plot, i) => {
            const { cx, cy, w } = LAYOUT[i];
            const hh = w / 2;
            // sortie de terre staggerée, avec un léger rebond
            const grow = easeOutBack(clamp01((reveal - i * 0.13) / 0.48));
            const h = heightOf(plot.price) * grow;
            const cyTop = cy - h;
            const iso = makeIso(cx, cyTop, w);
            const isTower = plot.id === "batir";
            const isSelected = focusId === plot.id;

            const N: [number, number] = [cx, cyTop - hh];
            const E: [number, number] = [cx + w, cyTop];
            const S: [number, number] = [cx, cyTop + hh];
            const W: [number, number] = [cx - w, cyTop];

            const faceL = poly([W, S, [cx, cy + hh], [cx - w, cy]]);
            const faceR = poly([E, S, [cx, cy + hh], [cx + w, cy]]);
            const top = poly([N, E, S, W]);

            const colors = isTower
              ? { top: "#d3cec3", left: "#837c6e", right: "#a9a293" }
              : {
                  top: { foret: "#6d7a55", agricole: "#a3825e", speciale: "#a5a06b", viticole: "#97825b" }[plot.id]!,
                  left: "#6e5639",
                  right: "#8a6d4b",
                };

            const hitTop = Math.max(cyTop - hh - 34, 0);

            return (
              <g
                key={plot.id}
                onClick={() => selectPlot(plot.id)}
                className={`lpi-plot lpi-plot-${plot.id} cursor-pointer`}
              >
                {/* ombre portée */}
                <ellipse
                  className="lpi-plot-shadow"
                  cx={cx} cy={cy + 5}
                  rx={w + 12} ry={hh * 0.58}
                  fill="#4a3f2c"
                  opacity={isSelected ? 0.16 : 0.09}
                  style={{ transition: "opacity .3s ease" }}
                />

                {/* prisme + décor: se soulève au survol */}
                <g
                  className="lpi-plot-body"
                  style={{
                    transform: `translateY(${isSelected ? -8 : 0}px)`,
                    transition: "transform .35s cubic-bezier(.34,1.56,.64,1)",
                  }}
                >
                  <polygon points={faceL} fill={colors.left} />
                  <polygon points={faceR} fill={colors.right} />
                  {isTower && (
                    <>
                      <polygon points={faceL} fill="url(#lpi-win-l)" />
                      <polygon points={faceR} fill="url(#lpi-win-r)" />
                    </>
                  )}
                  <polygon points={top} fill={colors.top} />
                  <polyline
                    points={poly([W, N, E])}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={1.2}
                    opacity={isTower ? 0.55 : 0.35}
                  />

                  {/* décor par catégorie — visible quelle que soit l'échelle */}
                  {!isTower && (
                    <g pointerEvents="none">
                      {plot.id === "foret" && <Trees iso={iso} k={1} />}
                      {plot.id === "agricole" && <Furrows iso={iso} k={1} />}
                      {plot.id === "speciale" && <Greenhouse iso={iso} k={1} />}
                      {plot.id === "viticole" && <Vines iso={iso} k={1} />}
                    </g>
                  )}

                  {isTower && (
                    <g pointerEvents="none">
                      {/* parapet */}
                      <polygon
                        points={poly([[cx, cyTop - hh * 0.72], [cx + w * 0.72, cyTop], [cx, cyTop + hh * 0.72], [cx - w * 0.72, cyTop]])}
                        fill="none" stroke="#b6afa1" strokeWidth={1}
                      />
                      {/* balise rouge */}
                      <line x1={N[0]} y1={N[1]} x2={N[0]} y2={N[1] - 14} stroke="#6a6458" strokeWidth={1.5} />
                      <circle
                        cx={N[0]} cy={N[1] - 17} r={3.2} fill="#E20000"
                        className="lpi-anim"
                        style={{ animation: "lpi-blink 1.8s ease-in-out infinite" }}
                      />
                      {/* grue de chantier — visible en échelle réelle */}
                      <g opacity={mix} stroke="#E20000" strokeWidth={2.2} strokeLinecap="round" fill="none">
                        <line x1={cx - 14} y1={cyTop + 2} x2={cx - 14} y2={cyTop - 46} />
                        <line x1={cx - 46} y1={cyTop - 46} x2={cx + 40} y2={cyTop - 46} />
                        <line x1={cx - 14} y1={cyTop - 58} x2={cx - 46} y2={cyTop - 46} strokeWidth={1.2} />
                        <line x1={cx - 14} y1={cyTop - 58} x2={cx + 40} y2={cyTop - 46} strokeWidth={1.2} />
                        <line x1={cx - 14} y1={cyTop - 58} x2={cx - 14} y2={cyTop - 46} strokeWidth={1.2} />
                        <line x1={cx + 30} y1={cyTop - 46} x2={cx + 30} y2={cyTop - 30} strokeWidth={1.2} />
                        <rect x={cx + 26} y={cyTop - 30} width={8} height={6} fill="#E20000" stroke="none" />
                      </g>
                    </g>
                  )}
                </g>

                {/* étiquette de prix en badge */}
                <g className="lpi-labels" style={{ transformOrigin: `${cx}px 484px` }}>
                  {(() => {
                    const bw = plot.priceLabel.length * 9.5 + 24;
                    return (
                      <>
                        <rect
                          className="lpi-price-badge"
                          x={cx - bw / 2} y={484} width={bw} height={26} rx={13}
                          fill={isSelected ? "#E20000" : "#fbf7ec"}
                          stroke="#8E8366" strokeOpacity={0.35} strokeWidth={1}
                          style={{ transition: "fill .25s ease" }}
                        />
                        <text
                          className="lpi-price-text"
                          x={cx} y={502} textAnchor="middle"
                          fontSize={15.5} fontWeight={700}
                          fill={isSelected ? "#ffffff" : "#473b2b"}
                          style={{ fontFamily: "var(--font-mono)", transition: "fill .25s ease" }}
                        >
                          {plot.priceLabel}
                        </text>
                      </>
                    );
                  })()}
                  <text
                    className="lpi-plot-label"
                    x={cx} y={526} textAnchor="middle"
                    fontSize={12.5} fontWeight={500}
                    fill={isSelected ? "#1f2937" : "#6b7280"}
                    style={{ transition: "fill .25s ease" }}
                  >
                    {plot.shortLabel.map((line, li) => (
                      <tspan key={li} x={cx} dy={li === 0 ? 0 : 13}>{line}</tspan>
                    ))}
                  </text>
                </g>

                {/* zone de survol invisible */}
                <rect className="lpi-hit" x={cx - w - 10} y={hitTop} width={2 * w + 20} height={536 - hitTop} fill="transparent" />
              </g>
            );
          })}

          {/* nuages devant la tour: elle s'y perd en mode zoom */}
          <Cloud x={646} y={96} s={1.15} dur={13} />
          <Cloud x={760} y={158} s={0.85} dur={10} delay={1.2} />
          <Cloud x={186} y={64} s={0.75} dur={15} delay={0.6} />

          {/* voile de troncature + mention hors échelle (mode zoom) */}
          <g className="lpi-veil" opacity={1 - mix} pointerEvents="none">
            <rect x={596} y={0} width={216} height={132} fill="url(#lpi-fade)" />
            <rect x={552} y={14} width={296} height={42} rx={21} fill="#ffffff" opacity={0.92} />
            <text
              x={700} y={41} textAnchor="middle" fontSize={16.5} fontWeight={700} fill="#E20000"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {`Fr. 2'270.-/m² — hors échelle`}
            </text>
          </g>

          {/* annotation du choc foncier (échelle réelle) */}
          <g className="lpi-annotation" opacity={mix} pointerEvents="none">
            <line x1={612} y1={146} x2={646} y2={158} stroke="#E20000" strokeWidth={1.2} />
            <text x={606} y={132} textAnchor="end" fontSize={26} fontWeight={800} fill="#E20000"
              style={{ fontFamily: "var(--font-mono)" }}>
              × 284
            </text>
            <text x={606} y={150} textAnchor="end" fontSize={10.5} fontWeight={600} fill="#7a4a3a">
              <tspan x={606} dy={0}>1 m² à bâtir vaut</tspan>
              <tspan x={606} dy={12}>284 m² de terre agricole</tspan>
            </text>
          </g>
        </svg>
      </div>

      {/* Panneau de détail */}
      <div className="lpi-legend bg-white/50 border border-[#8E8366]/15 rounded-xl p-4 transition-all duration-300">
        <div className="lpi-legend-header flex items-center gap-2 mb-1">
          <span className={`lpi-legend-swatch w-3 h-3 rounded-full shrink-0 ${activeItem.swatch}`} />
          <h5 className="lpi-legend-title font-bold text-xs md:text-base text-gray-800 tracking-tight">
            {activeItem.label}
          </h5>
          <span className="lpi-legend-price font-mono text-xs md:text-sm text-gray-500 font-bold ml-auto shrink-0 whitespace-nowrap">
            Fr. {activeItem.priceLabel} / m²
          </span>
        </div>
        <p className="lpi-legend-desc text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
          {activeItem.description}
        </p>
        <p className="lpi-legend-detail text-[10px] md:text-xs text-gray-400 font-mono mt-1">
          {activeItem.detail}
        </p>
      </div>

      <p className="lpi-footnote text-[10px] text-gray-400 font-mono text-right -mt-2">
        Prix maxima licites 2025 · Commission foncière agricole, Genève
      </p>
    </div>
  );
}
