"use client";

import React, { useEffect, useRef, memo } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";

// Use the token extracted from the other components
mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVsYWJibGlja2ZyIiwiYSI6ImNsZDRjbTM5bjByM3Mzb2wwYXBzN3B3MDYifQ.H5aWzNdSibf-Vd4rPmwhYA';

interface LandfillMapProps {
  triggerRef?: React.RefObject<HTMLDivElement | null>;
}

interface LandfillLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  popupText: string;
}

const locations: LandfillLocation[] = [
  // Point 3 : Le plus au sud
  {
    id: "elisa_serment",
    name: "Rue Elisa-Serment 2b",
    coordinates: [6.6211873, 46.5388708],
    popupText: "Rue Elisa-Serment 2b, Lausanne"
  },
  // Point 2 : Le point au milieu
  {
    id: "orllati_vaud",
    name: "Groupe Orllati - Vaud",
    coordinates: [6.5907399, 46.6217156],
    popupText: "Groupe Orllati - Vaud"
  },
  // Point 1 : Le plus au nord
  {
    id: "zi_eclepens",
    name: "Zone industrielle d'Eclépens",
    coordinates: [6.547672, 46.653287],
    popupText: "Zone industrielle d'Eclépens"
  }
];

interface ArrowConfig {
  id: string;
  startId: string;
  endId: string;
  inverted: boolean;
  curveFactor: number;
}

const arrowConfigs: ArrowConfig[] = [
  {
    id: "fleche_1",
    startId: "orllati_vaud",
    endId: "zi_eclepens",
    inverted: true,
    curveFactor: -0.26
  },
  {
    id: "fleche_2",
    startId: "orllati_vaud",
    endId: "elisa_serment",
    inverted: false,
    curveFactor: 0.6
  },
  {
    id: "fleche_3",
    startId: "orllati_vaud",
    endId: "elisa_serment",
    inverted: false,
    curveFactor: -0.6
  }
];

function getBezierPoints(
  start: [number, number],
  end: [number, number],
  steps = 50,
  curveFactor = 0.2
): [number, number][] {
  const [x0, y0] = start;
  const [x2, y2] = end;

  const mx = (x0 + x2) / 2;
  const my = (y0 + y2) / 2;

  const dx = x2 - x0;
  const dy = y2 - y0;

  const px = -dy;
  const py = dx;

  const cx = mx + px * curveFactor;
  const cy = my + py * curveFactor;

  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * cx + t * t * x2;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * cy + t * t * y2;
    points.push([x, y]);
  }
  return points;
}

function getBezierArrowGeoJSON(
  start: [number, number],
  end: [number, number],
  curveFactor = 0.25,
  arrowSize = 0.003
) {
  const linePoints = getBezierPoints(start, end, 50, curveFactor);
  
  const last = linePoints[linePoints.length - 1];
  const secondLast = linePoints[linePoints.length - 2];
  
  const dx = last[0] - secondLast[0];
  const dy = last[1] - secondLast[1];
  const len = Math.sqrt(dx * dx + dy * dy);
  
  const ux = dx / len;
  const uy = dy / len;
  
  const px = -uy;
  const py = ux;
  
  const leftWing = [
    last[0] - ux * arrowSize + px * arrowSize * 0.6,
    last[1] - uy * arrowSize + py * arrowSize * 0.6
  ];
  
  const rightWing = [
    last[0] - ux * arrowSize - px * arrowSize * 0.6,
    last[1] - uy * arrowSize - py * arrowSize * 0.6
  ];
  
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: linePoints
        },
        properties: { type: 'shaft' }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [leftWing, last, rightWing]
        },
        properties: { type: 'head' }
      }
    ]
  };
}

function LandfillMapInner({ triggerRef }: LandfillMapProps = {}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const swissBounds: mapboxgl.LngLatBoundsLike = [[5.9559, 45.8179], [10.4921, 47.8084]];
  const vaudBounds: mapboxgl.LngLatBoundsLike = [[6.0766, 46.1011], [7.2155, 47.0633]];

  useEffect(() => {
    if (!mapContainer.current) return;

    const animationFrameIds: number[] = [];
    const timeoutIds: number[] = [];

    let isMapLoaded: boolean = false;
    let isInViewport: boolean = false;
    let hasStarted: boolean = false;
    let pendingStart: (() => void) | null = null;

    const maybeStart = () => {
      if (isMapLoaded && isInViewport && !hasStarted) {
        hasStarted = true;
        if (pendingStart) pendingStart();
      }
    };

    // Initialize Mapbox map focused on Switzerland first, matching MapVis transition pattern (read-only/non-interactive)
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      bounds: swissBounds,
      fitBoundsOptions: { padding: 15 },
      interactive: false
    });

    // Translate map labels to French
    const language = new MapboxLanguage({ defaultLanguage: 'fr' });
    map.current.addControl(language);

    map.current.on('load', () => {
      if (!map.current) return;

      const arrowStarters: (() => void)[] = [];

      const layers = map.current.getStyle()?.layers;

      // Color the global map layers with the warm format colors
      if (layers) {
        layers.forEach((layer) => {
          if (layer.id === 'background') {
            map.current?.setPaintProperty(layer.id, 'background-color', '#FAF8F4'); // Warm cream background
          } else if (layer.id.includes('water') && layer.type === 'fill') {
            map.current?.setPaintProperty(layer.id, 'fill-color', '#A3CFD1'); // Teal water
          } else if ((layer.id.includes('landuse') || layer.id.includes('park') || layer.id.includes('wood') || layer.id.includes('sand')) && layer.type === 'fill') {
            map.current?.setPaintProperty(layer.id, 'fill-color', '#E5DEC9'); // Warm beige landuse
          } else if (layer.id.includes('road') && layer.type === 'line') {
            map.current?.setPaintProperty(layer.id, 'line-color', '#ffffff'); 
            map.current?.setPaintProperty(layer.id, 'line-opacity', 0.8);
          } else if (layer.id.includes('building') && layer.type === 'fill') {
            map.current?.setPaintProperty(layer.id, 'fill-color', '#f1f3f5');
          }
        });
      }      // Canton de Vaud GeoJSON Source
      map.current.addSource('vaud-boundary', {
        type: 'geojson',
        data: './CH-VD.geojson'
      });

      // Fill layer (kept hidden at 0 opacity)
      map.current.addLayer({
        'id': 'vaud-fill',
        'type': 'fill',
        'source': 'vaud-boundary',
        'layout': {},
        'paint': {
          'fill-color': '#E20000',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1500 }
        }
      });

      // Dotted border layer (kept hidden at 0 opacity)
      map.current.addLayer({
        'id': 'vaud-line',
        'type': 'line',
        'source': 'vaud-boundary',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': '#E20000',
          'line-width': 2.5,
          'line-dasharray': [0.1, 3],
          'line-opacity': 0,
          'line-opacity-transition': { duration: 1500 }
        }
      });

      // Build markers but do NOT add to map yet — they are added one by one after the zoom
      // markerRevealers[0] = north (first), [1] = middle (second), [2] = south (third)
      const markerRevealers: (() => void)[] = [];
      locations.forEach((loc, index) => {
        const el = document.createElement('div');
        el.className = `custom-marker marker-${loc.id}`;
        el.style.width = '14px';
        el.style.height = '14px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = '#E20000';
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 0 8px rgba(226, 0, 0, 0.6)';
        el.style.cursor = 'pointer';
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease';

        const popup = new mapboxgl.Popup({ offset: 15 })
          .setHTML(`<div style="font-family: sans-serif; font-size: 12px; font-weight: 600; color: #1a1a1a; padding: 2px;">${loc.popupText}</div>`);

        const dotMarker = new mapboxgl.Marker(el)
          .setLngLat(loc.coordinates)
          .setPopup(popup);

        // Separate label marker — dot element is untouched, so its position never changes
        const labelEl = document.createElement('div');
        labelEl.style.whiteSpace = 'nowrap';
        labelEl.style.backgroundColor = 'white';
        labelEl.style.border = '1px solid rgba(142, 131, 102, 0.35)';
        labelEl.style.borderRadius = '4px';
        labelEl.style.padding = '3px 8px';
        labelEl.style.fontFamily = 'sans-serif';
        labelEl.style.fontSize = '11px';
        labelEl.style.fontWeight = '600';
        labelEl.style.color = '#1a1a1a';
        labelEl.style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';
        labelEl.style.pointerEvents = 'none';
        labelEl.style.opacity = '0';
        labelEl.style.transition = 'opacity 0.6s ease';
        labelEl.textContent = loc.name;

        const labelPos = index === 0
          ? { anchor: 'top' as mapboxgl.Anchor,    offset: [0, 11] as [number, number] }
          : index === 2
          ? { anchor: 'bottom' as mapboxgl.Anchor, offset: [0, -11] as [number, number] }
          : { anchor: 'left' as mapboxgl.Anchor,   offset: [11, 0] as [number, number] };

        const labelMarker = new mapboxgl.Marker(labelEl, labelPos)
          .setLngLat(loc.coordinates);

        // Reveal order: index 2 (north/first)→[0], index 1 (middle)→[1], index 0 (south/third)→[2]
        const dm = dotMarker;
        const lm = labelMarker;
        markerRevealers[2 - index] = () => {
          if (map.current) {
            dm.addTo(map.current);
            lm.addTo(map.current);
            // Double RAF: wait for the element to be in the DOM and painted before starting the transition
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                el.style.opacity = '1';
                labelEl.style.opacity = '1';
              });
            });
          }
        };
      });

      // Draw curved arrows defined in arrowConfigs with path drawing animation
      arrowConfigs.forEach((arrow) => {
        const startLoc = locations.find(l => l.id === arrow.startId);
        const endLoc = locations.find(l => l.id === arrow.endId);

        if (startLoc && endLoc && map.current) {
          const actualStart = arrow.inverted ? endLoc : startLoc;
          const actualEnd = arrow.inverted ? startLoc : endLoc;
          // Invert curve factor sign if inverted, to preserve the visual arc path
          const actualCurveFactor = arrow.inverted ? -arrow.curveFactor : arrow.curveFactor;
          const arrowSize = 0.0035;

          // Generate the full curved path first with high precision (100 steps)
          const fullPoints = getBezierPoints(actualStart.coordinates, actualEnd.coordinates, 100, actualCurveFactor);

          // Find the start and end indices to trim the line along its actual curve path
          const offsetSize = 0.0035; // Gap offset in degrees

          let startIdx = 0;
          while (startIdx < fullPoints.length) {
            const dx = fullPoints[startIdx][0] - fullPoints[0][0];
            const dy = fullPoints[startIdx][1] - fullPoints[0][1];
            if (Math.sqrt(dx * dx + dy * dy) >= offsetSize) {
              break;
            }
            startIdx++;
          }

          let endIdx = fullPoints.length - 1;
          while (endIdx >= 0) {
            const dx = fullPoints[endIdx][0] - fullPoints[fullPoints.length - 1][0];
            const dy = fullPoints[endIdx][1] - fullPoints[fullPoints.length - 1][1];
            if (Math.sqrt(dx * dx + dy * dy) >= offsetSize) {
              break;
            }
            endIdx--;
          }

          // Slice points to get the curve trimmed along the tangent exit/entry angle
          const linePoints = fullPoints.slice(startIdx, endIdx + 1);

          const sourceId = `arrow-${arrow.id}`;
          const layerId = `arrow-${arrow.id}-line`;

          map.current.addSource(sourceId, {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: []
            }
          });

          map.current.addLayer({
            'id': layerId,
            'type': 'line',
            'source': sourceId,
            'layout': {
              'line-cap': 'round',
              'line-join': 'round'
            },
            'paint': {
              'line-color': '#E20000',
              'line-width': 3.5,
              'line-opacity': 0.85
            }
          });

          const last = linePoints[linePoints.length - 1];
          const secondLast = linePoints[linePoints.length - 2];
          const dx = last[0] - secondLast[0];
          const dy = last[1] - secondLast[1];
          const len = Math.sqrt(dx * dx + dy * dy);
          const ux = dx / len;
          const uy = dy / len;
          const px = -uy;
          const py = ux;
          
          const leftWing = [
            last[0] - ux * arrowSize + px * arrowSize * 0.6,
            last[1] - uy * arrowSize + py * arrowSize * 0.6
          ];
          const rightWing = [
            last[0] - ux * arrowSize - px * arrowSize * 0.6,
            last[1] - uy * arrowSize - py * arrowSize * 0.6
          ];

          const fullGeojson = {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: linePoints },
                properties: { type: 'shaft' }
              },
              {
                type: 'Feature',
                geometry: { type: 'LineString', coordinates: [leftWing, last, rightWing] },
                properties: { type: 'head' }
              }
            ]
          };

          let step = 0;
          const totalSteps = linePoints.length;
          let arrowTimeoutId: number;
          let animationFrameId: number;

          const animateLine = () => {
            if (!map.current) return;
            if (step >= totalSteps) {
              arrowTimeoutId = window.setTimeout(() => {
                step = 0;
                animateLine();
              }, 1800);
              timeoutIds.push(arrowTimeoutId);
              return;
            }

            const currentPoints = linePoints.slice(0, Math.max(2, step));
            const currentLast = currentPoints[currentPoints.length - 1];
            const currentSecondLast = currentPoints[currentPoints.length - 2];
            const cdx = currentLast[0] - currentSecondLast[0];
            const cdy = currentLast[1] - currentSecondLast[1];
            const clen = Math.sqrt(cdx * cdx + cdy * cdy);
            const cux = cdx / clen;
            const cuy = cdy / clen;
            const cpx = -cuy;
            const cpy = cux;
            
            const curLeftWing = [
              currentLast[0] - cux * arrowSize + cpx * arrowSize * 0.6,
              currentLast[1] - cuy * arrowSize + cpy * arrowSize * 0.6
            ];
            const curRightWing = [
              currentLast[0] - cux * arrowSize - cpx * arrowSize * 0.6,
              currentLast[1] - cuy * arrowSize - cpy * arrowSize * 0.6
            ];

            const geojson = {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  geometry: { type: 'LineString', coordinates: currentPoints },
                  properties: { type: 'shaft' }
                },
                {
                  type: 'Feature',
                  geometry: { type: 'LineString', coordinates: [curLeftWing, currentLast, curRightWing] },
                  properties: { type: 'head' }
                }
              ]
            };

            const source = map.current.getSource(sourceId) as mapboxgl.GeoJSONSource;
            if (source) {
              source.setData(geojson as any);
            }
            step += 1;
            animationFrameId = requestAnimationFrame(animateLine);
            animationFrameIds.push(animationFrameId);
          };

          arrowStarters.push(() => {
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            if (isMobile) {
              // On mobile: bypass 60fps setData animation to avoid WebGL crash. Draw the full arrow statically.
              arrowTimeoutId = window.setTimeout(() => {
                const source = map.current?.getSource(sourceId) as mapboxgl.GeoJSONSource;
                if (source) {
                  source.setData(fullGeojson as any);
                }
              }, 2200);
              timeoutIds.push(arrowTimeoutId);
            } else {
              // On desktop: use full animation
              arrowTimeoutId = window.setTimeout(() => {
                animateLine();
              }, 2200);
              timeoutIds.push(arrowTimeoutId);
            }
          });
        }
      });

      const threePointsBounds: mapboxgl.LngLatBoundsLike = [
        [6.547672, 46.5388708],
        [6.6211873, 46.653287]
      ];

      pendingStart = () => {
        const initialZoomTimer = window.setTimeout(() => {
          if (!map.current) return;
          map.current.fitBounds(threePointsBounds, { padding: 90, duration: 2500 });
          if (map.current.getLayer('vaud-fill')) map.current.setPaintProperty('vaud-fill', 'fill-opacity', 0);
          if (map.current.getLayer('vaud-line')) map.current.setPaintProperty('vaud-line', 'line-opacity', 0);
        }, 500);
        timeoutIds.push(initialZoomTimer);

        // Reveal dots + labels sequentially after zoom ends (500ms delay + 2500ms duration)
        const zoomEnd = 500 + 2500;
        markerRevealers.forEach((reveal, i) => {
          const t = window.setTimeout(() => reveal(), zoomEnd + i * 400);
          timeoutIds.push(t);
        });

        arrowStarters.forEach(s => s());
      };

      isMapLoaded = true;
      maybeStart();
    });

    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isInViewport = true;
        maybeStart();
        intersectionObserver.disconnect();
      }
    }, { threshold: 0 });
    const observationTarget = triggerRef?.current ?? mapContainer.current;
    if (observationTarget) {
      intersectionObserver.observe(observationTarget);
    }

    // Watch resizing to force redraw and adapt container height
    const resizeObserver = new ResizeObserver(() => {
      map.current?.resize();
    });
    if (mapContainer.current) {
      resizeObserver.observe(mapContainer.current);
    }

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
      animationFrameIds.forEach(id => cancelAnimationFrame(id));
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      map.current?.remove();
      map.current = null;
    };
  }, []);



  return (
    <div className="w-full h-full relative bg-neutral-100">
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export const LandfillMap = memo(LandfillMapInner);
