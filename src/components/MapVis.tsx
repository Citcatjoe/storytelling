"use client";

import React, { useState, useEffect, useRef } from "react";
import { FilterCheckbox } from "./FilterCheckbox";
import mapboxgl from "mapbox-gl";
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = 'pk.eyJ1IjoiY3JlYXRpdmVsYWJibGlja2ZyIiwiYSI6ImNsZDRjbTM5bjByM3Mzb2wwYXBzN3B3MDYifQ.H5aWzNdSibf-Vd4rPmwhYA';

export function MapVis() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  const swissBounds: mapboxgl.LngLatBoundsLike = [[5.9559, 45.8179], [10.4921, 47.8084]];
  const vaudBounds: mapboxgl.LngLatBoundsLike = [[6.0766, 46.1011], [7.2155, 47.0633]];

  const [filters, setFilters] = useState<Record<string, boolean>>({
    "Orllati Real Estate SA": true,
    "Orllati Management SA": true,
    "Orllati Granulats & Béton SA": true,
    "Orllati (VD) SA": true,
    "Avni Orllati": true,
    "Henny Frères SA": true,
    "CRAFO SA": true,
    "Porla SA": true,
  });

  const toggleFilter = (key: string) => (checked: boolean) => {
    setFilters(prev => ({ ...prev, [key]: checked }));
  };

  const orlattiGroup = [
    "Orllati Real Estate SA", "Orllati Management SA", "Orllati Granulats & Béton SA", "Orllati (VD) SA", "Avni Orllati"
  ];
  const hdpGroup = [
    "Henny Frères SA", "CRAFO SA", "Porla SA"
  ];

  useEffect(() => {
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      bounds: swissBounds,
      fitBoundsOptions: { padding: 20 }
    });

    map.current.on('load', () => {
      // Language & Controls
      const language = new MapboxLanguage({ defaultLanguage: 'fr' });
      map.current?.addControl(language);
      map.current?.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right');

      // Canton de Vaud GeoJSON Source
      map.current?.addSource('vaud-boundary', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/hyperknot/country-levels-export/master/geojson/high/iso2/CH/CH-VD.geojson'
      });

      // Fill layer (Initially transparent for fade-in)
      map.current?.addLayer({
        'id': 'vaud-fill',
        'type': 'fill',
        'source': 'vaud-boundary',
        'layout': {},
        'paint': {
          'fill-color': '#10b981',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1500 }
        }
      });

      // Optional Dotted border layer (Initially transparent)
      map.current?.addLayer({
        'id': 'vaud-line',
        'type': 'line',
        'source': 'vaud-boundary',
        'layout': {
          'line-cap': 'round',
          'line-join': 'round'
        },
        'paint': {
          'line-color': '#059669',
          'line-width': 1.5,
          'line-dasharray': [0.1, 3],
          'line-opacity': 0,
          'line-opacity-transition': { duration: 1500 }
        }
      });
    });

    // Transition vers Vaud avec Fade-in
    const timer = setTimeout(() => {
      map.current?.fitBounds(vaudBounds, { padding: 5, duration: 2500 });
      
      // Declencher le fade-in
      map.current?.setPaintProperty('vaud-fill', 'fill-opacity', 0.05);
      map.current?.setPaintProperty('vaud-line', 'line-opacity', 1);
    }, 1500);

    return () => {
      clearTimeout(timer);
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return (
    <div id="vis1" className="flex h-[500px] bg-white overflow-hidden border border-gray-200 text-gray-800">
      {/* Sidebar Filtres */}
      <div id="vis1-filters" className="w-4/12 h-full bg-transparent p-6 border-r border-gray-100 flex flex-col gap-6 overflow-y-auto">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold mb-3">Sociétés Orlatti</span>
          {orlattiGroup.map(owner => (
            <FilterCheckbox key={owner} id={owner} label={owner} checked={filters[owner]} onChange={toggleFilter(owner)} color="emerald" />
          ))}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold mb-3">Via hommes de paille</span>
          {hdpGroup.map(owner => (
            <FilterCheckbox key={owner} id={owner} label={owner} checked={filters[owner]} onChange={toggleFilter(owner)} color="amber" />
          ))}
        </div>
      </div>
      
      {/* Map Area */}
      <div id="vis1-map-container" className="flex-1 h-full relative">
        <div ref={mapContainer} className="absolute inset-0 h-full w-full" />
        
        {/* Custom Home Button */}
        <div className="absolute top-[80px] right-[10px] z-[999] pointer-events-auto">
            <button 
                onClick={() => map.current?.fitBounds(vaudBounds, { padding: 5, duration: 1500 })}
                title="Reset view to Vaud"
                className="w-[29px] h-[29px] bg-white rounded border border-gray-300 shadow flex items-center justify-center hover:bg-gray-100 cursor-pointer transition-colors group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 group-hover:text-black">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
}
