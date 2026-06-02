"use client";

import React, { useLayoutEffect, useRef, useState, useMemo } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_switzerlandLow from "@amcharts/amcharts5-geodata/switzerlandLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import dataAll from "@/data/data-proprio-all.json";
import coordsLookup from "@/data/municipality-coords.json";

interface DataItem {
  owner: string;
  place: string;
  origin: string;
  id: number;
}

const MorphingMap = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<am5.Root | null>(null);
  const [view, setView] = useState<"map" | "grid">("map");

  // --- DATA PREPARATION ---
  const swarmData = useMemo(() => {
    const counts: Record<string, number> = {};
    
    return (dataAll as DataItem[]).map((item) => {
      const place = item.place || "Inconnu";
      const baseCoords = (coordsLookup as any)[place] || { lat: 46.5, lng: 6.6 };
      
      const index = counts[place] || 0;
      counts[place] = index + 1;
      
      const angle = index * 0.5;
      const radius = 0.002 * Math.sqrt(index); 
      
      return {
        ...item,
        latitude: baseCoords.lat + radius * Math.cos(angle),
        longitude: baseCoords.lng + radius * Math.sin(angle)
      };
    });
  }, []);

  useLayoutEffect(() => {
    if (!chartRef.current) return;

    const root = am5.Root.new(chartRef.current);
    rootRef.current = root;
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
        homeGeoPoint: { latitude: 46.5, longitude: 6.6 },
        homeZoomLevel: 10
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_switzerlandLow,
        include: ["CH-VD"]
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color(0xe5e7eb),
      stroke: am5.color(0x9ca3af),
      strokeWidth: 0.5
    });

    const pointSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        latitudeField: "latitude",
        longitudeField: "longitude",
        autoScale: true // Dots grow when zooming in
      })
    );

    pointSeries.bullets.push((root, series, dataItem) => {
      const dataContext = dataItem.dataContext as any;
      const origin = dataContext?.origin;
      const color = origin === "hdp" ? am5.color(0xef4444) : am5.color(0x3b82f6);
      
      const circle = am5.Circle.new(root, {
        radius: origin === "hdp" ? 2.5 : 1.8, // Middle ground
        fill: color,
        fillOpacity: 0.8,
        stroke: am5.color(0xffffff),
        strokeWidth: 0.3,
        tooltipText: "{owner}\n{place}"
      });

      if (origin === "hdp") {
        circle.animate({
            key: "fillOpacity",
            to: 1,
            from: 0.6,
            duration: 2000,
            loops: Infinity,
            easing: am5.ease.yoyo(am5.ease.linear)
        });
      }

      return am5.Bullet.new(root, { sprite: circle });
    });

    pointSeries.data.setAll(swarmData);

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    return () => { root.dispose(); };
  }, [swarmData]);

  return (
    <div className="relative w-full border border-gray-100 rounded-3xl bg-[#f8fafc] overflow-hidden shadow-xl" style={{ height: '600px' }}>
      <div ref={chartRef} className="w-full h-full" />
      
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-gray-100 pointer-events-auto max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <h4 className="font-bold text-xs uppercase tracking-widest text-gray-500">Explorateur Vaudois</h4>
          </div>
          <div className="space-y-2.5">
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-red-500 animate-pulse border-2 border-white shadow-sm"></span>
              <span className="text-xs text-gray-700 font-semibold tracking-tight">Holding Spéculative (HDP)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></span>
              <span className="text-xs text-gray-600 font-medium">Parcelles Orllati</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 leading-relaxed font-medium">
            1'900+ parcelles cartographiées. Chaque point est une unité foncière réelle. Les points "swarment" autour de leur commune pour révéler la densité sans superposition.
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default MorphingMap;
