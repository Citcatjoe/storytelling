"use client";

import React, { useEffect, useRef, memo } from "react";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import "mapbox-gl/dist/mapbox-gl.css";

// Use the token extracted from the other components
mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVsYWJibGlja2ZyIiwiYSI6ImNsZDRjbTM5bjByM3Mzb2wwYXBzN3B3MDYifQ.H5aWzNdSibf-Vd4rPmwhYA';

function getGeojsonBounds(geojson: any): mapboxgl.LngLatBoundsLike | null {
  let minLng = 180, maxLng = -180, minLat = 90, maxLat = -90;
  let hasCoords = false;

  const processCoord = (coord: [number, number]) => {
    const [lng, lat] = coord;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    hasCoords = true;
  };

  const processGeometry = (geom: any) => {
    if (!geom) return;
    if (geom.type === 'Point') {
      processCoord(geom.coordinates);
    } else if (geom.type === 'LineString' || geom.type === 'MultiPoint') {
      geom.coordinates.forEach(processCoord);
    } else if (geom.type === 'Polygon' || geom.type === 'MultiLineString') {
      geom.coordinates.forEach((ring: any) => ring.forEach(processCoord));
    } else if (geom.type === 'MultiPolygon') {
      geom.coordinates.forEach((poly: any) => poly.forEach((ring: any) => ring.forEach(processCoord)));
    }
  };

  if (geojson.type === 'FeatureCollection') {
    geojson.features.forEach((f: any) => processGeometry(f.geometry));
  } else if (geojson.type === 'Feature') {
    processGeometry(geojson.geometry);
  } else {
    processGeometry(geojson);
  }

  return hasCoords ? [[minLng, minLat], [maxLng, maxLat]] : null;
}

interface ZoningPoint {
  id: string;
  name: string;
  coordinates: [number, number];
  anchor: mapboxgl.Anchor;
  offset: [number, number];
}

const zoningPoints: ZoningPoint[] = [
  {
    id: "orllati_vaud",
    name: "Groupe Orllati - Vaud",
    coordinates: [6.5907399, 46.6217156],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "grange_verney",
    name: "Ecole d'agrilogie de Grange-Verney",
    coordinates: [6.8081789, 46.6794510],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "decharge_planifiee",
    name: "Décharge planifiée",
    coordinates: [6.199159, 46.370290],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "henny_freres",
    name: "Société Henny Frères SA",
    coordinates: [6.5836671, 46.6073866],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "zone_viticole",
    name: "Parcelles en zone viticole",
    coordinates: [6.833717, 46.474034],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "domaine_flogere",
    name: "Domaine de la Flogère",
    coordinates: [6.39121, 46.52923],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "hameau_convoite",
    name: "Hameau convoité par Orllati",
    coordinates: [6.6084864, 46.5770538],
    anchor: "bottom",
    offset: [0, -11]
  },
  {
    id: "commission_fonciere",
    name: "Secrétariat de la commission foncière",
    coordinates: [6.6277618, 46.5095115],
    anchor: "bottom",
    offset: [0, -11]
  }
];

function ZoningMapInner() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const pointMarkersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const labelMarkersRef = useRef<Record<string, mapboxgl.Marker>>({});
  const pointDotsRef = useRef<Record<string, HTMLDivElement>>({});
  const pointLabelsRef = useRef<Record<string, HTMLDivElement>>({});

  const swissBounds: mapboxgl.LngLatBoundsLike = [[5.9559, 45.8179], [10.4921, 47.8084]];
  const vaudBounds: mapboxgl.LngLatBoundsLike = [[6.0766, 46.1011], [7.2155, 47.0633]];

  useEffect(() => {
    if (!mapContainer.current) return;

    const timeoutIds: number[] = [];
    let mapLoaded = false;
    let geojsonLoaded = false;
    let intersected = false;
    let animationTriggered = false;
    let dynamicBounds: mapboxgl.LngLatBoundsLike | null = null;
    let cameraTimeoutId: number;
    let markerTimeoutId: number;
    let resizeTimeoutId: number;
    let initialZoomCompleted = false;
    let scrollHandler: (() => void) | null = null;

    // Map States mapping section IDs to views and highlights
    interface MapStateValues {
      center: [number, number];
      zoom: number;
    }

    interface MapState {
      desktop?: MapStateValues;
      mobile?: MapStateValues;
      center?: [number, number];
      bounds?: mapboxgl.LngLatBoundsLike;
      zoom?: number;
      highlightedPoints?: string[];
    }

    const SECTION_MAP_STATES: Record<string, MapState> = {
      "introduction": {
        mobile: {
          center: [6.5088800, 46.5137548],
          zoom: 8.04
        }
      },
      "chapitre-1": {
        desktop: {
          center: [6.6589635, 46.5852257],
          zoom: 8.87
        },
        mobile: {
          center: [6.6264170, 46.6008984],
          zoom: 8.84
        },
        highlightedPoints: ["orllati_vaud"]
      },
      "chapitre-2": {
        desktop: {
          center: [6.7295744, 46.6435337],
          zoom: 9.23
        },
        mobile: {
          center: [6.7935869, 46.6739208],
          zoom: 9.52
        },
        highlightedPoints: ["grange_verney"]
      },
      "chapitre-3": {
        desktop: {
          center: [6.2937794, 46.4085003],
          zoom: 9.23
        },
        mobile: {
          center: [6.2678241, 46.4049140],
          zoom: 9.26
        },
        highlightedPoints: ["decharge_planifiee"]
      },
      "chapitre-4": {
        desktop: {
          center: [6.6329336, 46.5733769],
          zoom: 9.30
        },
        mobile: {
          center: [6.6217462, 46.5896646],
          zoom: 9.33
        },
        highlightedPoints: ["henny_freres"]
      },
      "chapitre-5": {
        desktop: {
          center: [6.7466815, 46.4968733],
          zoom: 9.30
        },
        mobile: {
          center: [6.7750385, 46.4982540],
          zoom: 9.10
        },
        highlightedPoints: ["zone_viticole"]
      },
      "chapitre-6": {
        desktop: {
          center: [6.4502312, 46.5450134],
          zoom: 8.76
        },
        mobile: {
          center: [6.4502312, 46.5450134],
          zoom: 8.76
        },
        highlightedPoints: ["domaine_flogere"]
      },
      "chapitre-7": {
        desktop: {
          center: [6.6328458, 46.5582027],
          zoom: 9.35
        },
        mobile: {
          center: [6.6328458, 46.5582027],
          zoom: 9.35
        },
        highlightedPoints: ["hameau_convoite"]
      },
      "chapitre-8": {
        desktop: {
          center: [6.6244500, 46.5266913],
          zoom: 10.13
        },
        mobile: {
          center: [6.6287718, 46.5468162],
          zoom: 9.35
        },
        highlightedPoints: ["commission_fonciere"]
      }
    };

    const sectionIds = [
      "story-header",
      "introduction",
      "chapitre-1",
      "chapitre-2",
      "chapitre-3",
      "chapitre-4",
      "chapitre-5",
      "chapitre-6",
      "chapitre-7",
      "chapitre-8",
      "chapitre-9"
    ];

    let activeSectionId = "story-header";

    // Pre-create and prepare the custom markers in refs
    zoningPoints.forEach((loc) => {
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
      pointDotsRef.current[loc.id] = el;

      const dotMarker = new mapboxgl.Marker(el)
        .setLngLat(loc.coordinates);
      pointMarkersRef.current[loc.id] = dotMarker;

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
      pointLabelsRef.current[loc.id] = labelEl;

      const labelMarker = new mapboxgl.Marker(labelEl, {
        anchor: loc.anchor,
        offset: loc.offset
      }).setLngLat(loc.coordinates);
      labelMarkersRef.current[loc.id] = labelMarker;
    });

    const applyMapCamera = (sectionId: string, duration = 1500) => {
      if (!map.current) return;

      const state = SECTION_MAP_STATES[sectionId] || {
        bounds: dynamicBounds || vaudBounds
      };

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      const responsiveValues = isMobile ? state.mobile : state.desktop;

      if (responsiveValues) {
        map.current.flyTo({
          center: responsiveValues.center,
          zoom: responsiveValues.zoom,
          duration: duration,
          essential: true
        });
      } else if (state.center && state.zoom !== undefined) {
        map.current.flyTo({
          center: state.center,
          zoom: state.zoom,
          duration: duration,
          essential: true
        });
      } else {
        const targetBounds = state.bounds || dynamicBounds || vaudBounds;
        map.current.fitBounds(targetBounds, {
          padding: 25,
          duration: duration
        });
      }
    };

    const handleSectionChange = (sectionId: string) => {
      if (!map.current) return;

      // Dispatch a custom window event to notify other components of the active section change
      if (typeof window !== 'undefined') {
        const event = new CustomEvent("zoning-map-section-change", { detail: { sectionId } });
        window.dispatchEvent(event);
      }

      const state = SECTION_MAP_STATES[sectionId] || {
        bounds: dynamicBounds || vaudBounds
      };

      const zoomDuration = 1500;
      const delayDuration = sectionId.startsWith("chapitre-") ? 1000 : 350; // 1s delay for all chapter focuses, 350ms reset delay for others

      const targetPoints = state.highlightedPoints || [];
      console.log(`[ZoningMap] handleSectionChange: ${sectionId}, targetPoints:`, targetPoints);

      // 1. Hide points that are not highlighted in this section (fade out immediately)
      zoningPoints.forEach((point) => {
        const dotEl = pointDotsRef.current[point.id];
        const labelEl = pointLabelsRef.current[point.id];

        if (!targetPoints.includes(point.id)) {
          if (dotEl) dotEl.style.opacity = '0';
          if (labelEl) labelEl.style.opacity = '0';

          const removeTimeout = window.setTimeout(() => {
            // Only remove if this section is still active
            if (activeSectionId !== sectionId) return;
            if (!targetPoints.includes(point.id)) {
              console.log(`[ZoningMap] Removing marker from map for: ${point.id}`);
              pointMarkersRef.current[point.id]?.remove();
              labelMarkersRef.current[point.id]?.remove();
            }
          }, 600);
          timeoutIds.push(removeTimeout);
        }
      });

      // 2. Cancel any pending camera movements and reveals
      window.clearTimeout(cameraTimeoutId);
      window.clearTimeout(markerTimeoutId);

      // 3. Schedule the camera zoom and focus after the transition delay
      cameraTimeoutId = window.setTimeout(() => {
        console.log(`[ZoningMap] cameraTimeoutId fired for: ${sectionId}, activeSectionId is: ${activeSectionId}`);
        if (activeSectionId !== sectionId) return;
        applyMapCamera(sectionId, zoomDuration);
      }, delayDuration);
      timeoutIds.push(cameraTimeoutId);

      // 4. Highlight and fade in markers synchronized with the camera movement start
      if (targetPoints.length > 0) {
        markerTimeoutId = window.setTimeout(() => {
          console.log(`[ZoningMap] markerTimeoutId fired for: ${sectionId}, activeSectionId is: ${activeSectionId}`);
          if (activeSectionId !== sectionId) return;

          targetPoints.forEach((pointId) => {
            const point = zoningPoints.find(p => p.id === pointId);
            if (!point || !map.current) {
              console.log(`[ZoningMap] Point ${pointId} not found or map.current is null`);
              return;
            }

            const dotEl = pointDotsRef.current[point.id];
            const labelEl = pointLabelsRef.current[point.id];
            const dotMarker = pointMarkersRef.current[point.id];
            const labelMarker = labelMarkersRef.current[point.id];

            console.log(`[ZoningMap] Point ${pointId} markers:`, {
              dotElExists: !!dotEl,
              labelElExists: !!labelEl,
              dotMarkerExists: !!dotMarker,
              labelMarkerExists: !!labelMarker
            });

            if (dotMarker && labelMarker) {
              console.log(`[ZoningMap] Adding marker and label to map for: ${pointId}`);
              dotMarker.addTo(map.current);
              labelMarker.addTo(map.current);

              // Set opacity to 0 initially and force browser reflow to register the transition state
              if (dotEl) {
                dotEl.style.opacity = '0';
                void dotEl.offsetHeight;
              }
              if (labelEl) {
                labelEl.style.opacity = '0';
                void labelEl.offsetHeight;
              }

              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  if (dotEl) {
                    dotEl.style.opacity = '1';
                    console.log(`[ZoningMap] Set dot opacity to 1 for: ${pointId}`);
                  }
                  if (labelEl) {
                    labelEl.style.opacity = '1';
                    console.log(`[ZoningMap] Set label opacity to 1 for: ${pointId}`);
                  }
                });
              });
            }
          });
        }, delayDuration);
        timeoutIds.push(markerTimeoutId);
      }
      timeoutIds.push(cameraTimeoutId);
    };

    const checkAndTrigger = () => {
      if (map.current) {
        map.current.resize();
      }
      if (mapLoaded && geojsonLoaded && intersected && !animationTriggered) {
        animationTriggered = true;
        
        // Wait 0.5 seconds before initiating the zoom and layer fade-in
        const initialTimeout = window.setTimeout(() => {
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          
          if (isMobile) {
            map.current?.flyTo({
              center: [6.5088800, 46.5137548],
              zoom: 8.04,
              duration: 2500
            });
          } else {
            const targetBounds = dynamicBounds || vaudBounds;
            map.current?.fitBounds(targetBounds, { padding: 25, duration: 2500 });
          }

          // Delay fade-in of all layers until AFTER the zoom finishes
          const initialZoomDuration = 2500;
          const startObserverTimeout = window.setTimeout(() => {
            if (map.current?.getLayer('commune-fills')) {
              map.current.setPaintProperty('commune-fills', 'fill-opacity', 0.12);
            }
            if (map.current?.getLayer('commune-borders')) {
              map.current.setPaintProperty('commune-borders', 'line-opacity', 0.6);
            }
            if (map.current?.getLayer('commune-labels')) {
              map.current.setPaintProperty('commune-labels', 'text-opacity', 1);
            }

            // Use a robust scroll listener instead of IntersectionObserver
            // to guarantee bulletproof section detection on all devices and scroll speeds.
            const detectActiveSection = () => {
              const viewportCenter = window.innerHeight * 0.5;
              let bestSection = activeSectionId;
              let minDistance = Infinity;

              for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (!el) continue;
                const rect = el.getBoundingClientRect();
                
                // If the section spans across the viewport center, it's the active one
                if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
                  bestSection = id;
                  minDistance = 0;
                  break;
                }
                
                // Otherwise, find the section closest to the center
                const sectionCenter = (rect.top + rect.bottom) / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);
                if (distance < minDistance) {
                  minDistance = distance;
                  bestSection = id;
                }
              }

              if (bestSection !== activeSectionId) {
                activeSectionId = bestSection;
                handleSectionChange(bestSection);
              }
            };

            let ticking = false;
            scrollHandler = () => {
              if (!ticking) {
                window.requestAnimationFrame(() => {
                  detectActiveSection();
                  ticking = false;
                });
                ticking = true;
              }
            };

            window.addEventListener('scroll', scrollHandler, { passive: true });
            window.addEventListener('resize', scrollHandler, { passive: true });

            initialZoomCompleted = true;
            
            // Initial check to set the first active section
            detectActiveSection();
          }, initialZoomDuration);
          timeoutIds.push(startObserverTimeout);
        }, 500);
        timeoutIds.push(initialTimeout);
      }
    };

    // Initialize Mapbox map focused on Switzerland
    const isMobileInit = typeof window !== 'undefined' && window.innerWidth < 768;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      interactive: false,
      ...(isMobileInit ? {
        center: [8.3062266, 46.8154387],
        zoom: 5.0
      } : {
        bounds: swissBounds,
        fitBoundsOptions: { padding: 15 }
      })
    });

    // Console log exact coordinates and zoom levels on movements and zooms
    // map.current.on('moveend', () => {
    //   if (!map.current) return;
    //   const center = map.current.getCenter();
    //   console.log(`[ZoningMap] Center: [${center.lng.toFixed(7)}, ${center.lat.toFixed(7)}], Zoom: ${map.current.getZoom().toFixed(2)}`);
    // });

    // map.current.on('zoomend', () => {
    //   if (!map.current) return;
    //   console.log(`[ZoningMap] Zoom Level: ${map.current.getZoom().toFixed(2)}`);
    // });

    // Translate map labels to French
    const language = new MapboxLanguage({ defaultLanguage: 'fr' });
    map.current.addControl(language);

    map.current.on('load', () => {
      if (!map.current) return;

      const layers = map.current.getStyle()?.layers;

      // Color the global map layers with the warm format colors to match the rest of the site
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
          } else if (layer.type === 'symbol' && layer.id.includes('settlement')) {
            map.current?.setLayoutProperty(layer.id, 'visibility', 'none');
          }
        });
      }

      // Fetch local communes GeoJSON and add it to the map
      fetch('./communes.geojson')
        .then(res => res.json())
        .then(data => {
          if (!map.current) return;

          // Compute dynamic bounds from GeoJSON features to zoom closer
          const bounds = getGeojsonBounds(data);
          if (bounds) {
            dynamicBounds = bounds;
          }

          map.current.addSource('communes', {
            type: 'geojson',
            data: data
          });

          // Add fill layer for Polygons/MultiPolygons (Initial opacity = 0, transition duration = 1500)
          map.current.addLayer({
            'id': 'commune-fills',
            'type': 'fill',
            'source': 'communes',
            'filter': ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']],
            'paint': {
              'fill-color': '#E20000',
              'fill-opacity': 0,
              'fill-opacity-transition': { duration: 1500 }
            }
          });

          // Add dotted line layer for borders (Initial opacity = 0, transition duration = 1500)
          map.current.addLayer({
            'id': 'commune-borders',
            'type': 'line',
            'source': 'communes',
            'filter': ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']],
            'paint': {
              'line-color': '#E20000',
              'line-width': 1.5,
              'line-dasharray': [2, 2],
              'line-opacity': 0,
              'line-opacity-transition': { duration: 1500 }
            }
          });

          // Add labels for all features (Initial opacity = 0, transition duration = 1500)
          // Filter to only administrative polygon features to show commune names
          map.current.addLayer({
            'id': 'commune-labels',
            'type': 'symbol',
            'source': 'communes',
            'filter': ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']],
            'layout': {
              'text-field': ['get', 'name'],
              'text-size': 11,
              'text-anchor': 'top',
              'text-offset': [0, 0.6],
              'text-max-width': 8
            },
            'paint': {
              'text-color': '#1a1a1a',
              'text-halo-color': '#ffffff',
              'text-halo-width': 1.5,
              'text-opacity': 0,
              'text-opacity-transition': { duration: 1500 }
            }
          });

          geojsonLoaded = true;
          checkAndTrigger();
        })
        .catch(err => console.error("Error loading communes GeoJSON on zoning map:", err));

      mapLoaded = true;
      checkAndTrigger();
    });

    // Intersection observer to wait until the map is actually visible on screen
    const visibilityObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        intersected = true;
        checkAndTrigger();
        visibilityObserver.disconnect(); // Only trigger once
      }
    }, { threshold: 0 }); // Use 0 to match LandfillMap which works on Android Chrome

    if (mapContainer.current) {
      visibilityObserver.observe(mapContainer.current);
    }

    // Resize observer to handle map resizing dynamically (e.g. when detached)
    const resizeObserver = new ResizeObserver(() => {
      if (!map.current) return;
      map.current.resize();

      if (initialZoomCompleted) {
        // Debounce camera re-centering to run after the resize animation stabilizes
        window.clearTimeout(resizeTimeoutId);
        resizeTimeoutId = window.setTimeout(() => {
          applyMapCamera(activeSectionId, 800); // smooth snap in 800ms
        }, 150);
        timeoutIds.push(resizeTimeoutId);
      }
    });
    if (mapContainer.current) {
      resizeObserver.observe(mapContainer.current);
    }

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", scrollHandler);
      }
      window.clearTimeout(cameraTimeoutId);
      window.clearTimeout(resizeTimeoutId);
      timeoutIds.forEach(clearTimeout);
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-neutral-100">
      <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
      <div ref={sentinelRef} className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none" />
    </div>
  );
}

export const ZoningMap = memo(ZoningMapInner);
