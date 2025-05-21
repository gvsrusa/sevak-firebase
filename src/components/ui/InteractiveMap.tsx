"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import React, { useRef, useEffect } from "react";
import L, { LatLngExpression } from "leaflet"; // Import LatLngExpression
import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet"; // Import useMap
import { EditControl } from "react-leaflet-draw";

export type MapMode = 'cuttingArea' | 'dropOffPoint' | 'homeBase';

interface InteractiveMapProps {
  className?: string;
  currentMode: MapMode;
  onSetCuttingArea: (coords: string) => void;
  onSetDropOffPoint: (coords: string) => void;
  onSetHomeBase: (coords: string) => void;
  initialCuttingArea?: string;
  initialDropOffPoint?: string;
  initialHomeBase?: string;
}

// Simple hack to fix icon issues with Leaflet and Webpack
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", // Ensure these are correct or use local assets
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  className,
  currentMode,
  onSetCuttingArea,
  onSetDropOffPoint,
  onSetHomeBase,
  initialCuttingArea,
  initialDropOffPoint,
  initialHomeBase,
}) => {
  const defaultPosition: LatLngExpression = [51.505, -0.09]; // Use LatLngExpression for flexibility
  const defaultZoom: number = 13;
  const featureGroupRef = useRef<L.FeatureGroup>(null);
  const map = useMap(); // Get map instance

  // Utility to parse POINT string: "POINT(lat lon)"
  const parsePointString = (pointStr: string): L.LatLng | null => {
    const match = pointStr.match(/POINT\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
    if (match && match.length === 3) {
      const lat = parseFloat(match[1]);
      const lon = parseFloat(match[2]);
      if (!isNaN(lat) && !isNaN(lon)) {
        return L.latLng(lat, lon);
      }
    }
    console.warn("Failed to parse POINT string:", pointStr);
    return null;
  };

  // Utility to parse POLYGON string: "POLYGON((lat1 lon1, lat2 lon2, ...))"
  const parsePolygonString = (polygonStr: string): L.LatLng[] | null => {
    const match = polygonStr.match(/POLYGON\(\s*\(\s*(.+?)\s*\)\s*\)/i);
    if (match && match.length === 2) {
      const coordPairs = match[1].split(/\s*,\s*/);
      const latLngs: L.LatLng[] = [];
      for (const pair of coordPairs) {
        const parts = pair.split(/\s+/);
        if (parts.length === 2) {
          const lat = parseFloat(parts[0]);
          const lon = parseFloat(parts[1]);
          if (!isNaN(lat) && !isNaN(lon)) {
            latLngs.push(L.latLng(lat, lon));
          } else {
            console.warn("Invalid coordinate pair in POLYGON:", pair);
            return null; 
          }
        } else {
            console.warn("Invalid format for coordinate pair in POLYGON:", pair);
            return null;
        }
      }
      // A valid polygon needs at least 3 distinct points, and the last point should ideally be the same as the first.
      // Leaflet handles closing the polygon visually if the last point isn't the same as the first.
      if (latLngs.length >= 3) {
        return latLngs;
      } else {
        console.warn("Polygon string resulted in too few points:", polygonStr);
        return null;
      }
    }
    console.warn("Failed to parse POLYGON string:", polygonStr);
    return null;
  };
  
  // Effect to draw initial shapes from props and when currentMode changes
  useEffect(() => {
    if (!featureGroupRef.current || !map) return;

    featureGroupRef.current.clearLayers();
    let boundsToFit: L.LatLngBounds | null = null;

    if (currentMode === 'cuttingArea' && initialCuttingArea) {
      const latLngs = parsePolygonString(initialCuttingArea);
      if (latLngs) {
        const polygon = L.polygon(latLngs);
        featureGroupRef.current.addLayer(polygon);
        boundsToFit = polygon.getBounds();
      }
    } else if (currentMode === 'dropOffPoint' && initialDropOffPoint) {
      const latLng = parsePointString(initialDropOffPoint);
      if (latLng) {
        const marker = L.marker(latLng);
        featureGroupRef.current.addLayer(marker);
        boundsToFit = L.latLngBounds(latLng, latLng); // For a single marker
      }
    } else if (currentMode === 'homeBase' && initialHomeBase) {
      const latLng = parsePointString(initialHomeBase);
      if (latLng) {
        const marker = L.marker(latLng);
        featureGroupRef.current.addLayer(marker);
        boundsToFit = L.latLngBounds(latLng, latLng); // For a single marker
      }
    }

    if (boundsToFit && boundsToFit.isValid()) {
      map.fitBounds(boundsToFit, { padding: [50, 50], maxZoom: 16 });
    } else if (!featureGroupRef.current.getLayers().length) { // Only reset if no valid shape was drawn for current mode
        // map.setView(defaultPosition, defaultZoom); // Reset to default if no shape
    }
  }, [currentMode, initialCuttingArea, initialDropOffPoint, initialHomeBase, map]);


  const _onCreated = (e: any) => {
    if (!featureGroupRef.current) return;

    featureGroupRef.current.clearLayers(); // Clear previous layers of this type
    const layer = e.layer;
    featureGroupRef.current.addLayer(layer);

    const type = e.layerType;

    if (type === "marker") {
      const latLng: L.LatLng = layer.getLatLng();
      const formattedCoords = `POINT(${latLng.lat.toFixed(6)} ${latLng.lng.toFixed(6)})`;
      if (currentMode === "dropOffPoint") {
        onSetDropOffPoint(formattedCoords);
      } else if (currentMode === "homeBase") {
        onSetHomeBase(formattedCoords);
      }
    } else if (type === "polygon") {
      const latLngs: L.LatLng[][] = layer.getLatLngs(); // For simple polygons, it's LatLng[]
      if (latLngs.length > 0 && latLngs[0].length > 2) {
        let coordsString = "POLYGON((";
        const points = latLngs[0].map(
          (latlng) => `${latlng.lat.toFixed(6)} ${latlng.lng.toFixed(6)}`
        );
        coordsString += points.join(", ");
        // Ensure polygon is closed
        coordsString += `, ${points[0]}))`;
        if (currentMode === "cuttingArea") {
          onSetCuttingArea(coordsString);
        }
      }
    }
  };
  
  const drawOptions = {
    polygon: currentMode === 'cuttingArea' ? {
      allowIntersection: false,
      drawError: { color: "#e1e100", message: "Error!" },
      shapeOptions: { color: "#97009c" },
    } : false,
    marker: currentMode === 'dropOffPoint' || currentMode === 'homeBase',
    polyline: false,
    rectangle: false,
    circle: false,
    circlemarker: false,
  };

  return (
    // Removed the outer div that was for placeholder UI. The MapContainer will use className for sizing.
    // This wrapper is needed because useMap must be a child of MapContainer
    // We can't call useMap in the main component body if it's not wrapped by MapContainer yet.
    // So we create a small inner component or move the logic that uses `map` into such a component.
    // For simplicity here, we assume InteractiveMap is always rendered inside a MapContainer provider,
    // which is true if we instantiate MapContainer here.
    // The `map` instance from `useMap()` will be available after the initial render of MapContainer.

    // No changes needed for the MapContainer and EditControl setup itself for this task.
    // The logic is handled in useEffect and parsing utilities.

    return (
      // The MapContainer itself doesn't need to change for this subtask
      // The key is that the `map` instance is available to the useEffect.
      <MapContainer
        center={defaultPosition} // defaultPosition is already LatLngExpression
        zoom={defaultZoom}
        className={className}
        whenCreated={(mapInstance) => { /* console.log("Map instance created"); */ }} // Optional: if needed for direct map instance manipulation outside hooks
      >
        <MapComponentInner
          currentMode={currentMode}
          onSetCuttingArea={onSetCuttingArea}
          onSetDropOffPoint={onSetDropOffPoint}
          onSetHomeBase={onSetHomeBase}
          initialCuttingArea={initialCuttingArea}
          initialDropOffPoint={initialDropOffPoint}
          initialHomeBase={initialHomeBase}
          featureGroupRef={featureGroupRef}
          defaultPosition={defaultPosition}
          defaultZoom={defaultZoom}
        />
      </MapContainer>
    );
};

// Inner component to safely use `useMap` and access props
const MapComponentInner: React.FC<InteractiveMapProps & { featureGroupRef: React.RefObject<L.FeatureGroup>, defaultPosition: LatLngExpression, defaultZoom: number }> = ({
    className, // className is for the MapContainer, not used directly here
    currentMode,
    onSetCuttingArea,
    onSetDropOffPoint,
    onSetHomeBase,
    initialCuttingArea,
    initialDropOffPoint,
    initialHomeBase,
    featureGroupRef, // Passed down
    defaultPosition,
    defaultZoom
}) => {
    const map = useMap();

    // Utility to parse POINT string: "POINT(lat lon)"
    const parsePointString = (pointStr: string): L.LatLng | null => {
        const match = pointStr.match(/POINT\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/i);
        if (match && match.length === 3) {
            const lat = parseFloat(match[1]);
            const lon = parseFloat(match[2]);
            if (!isNaN(lat) && !isNaN(lon)) {
            return L.latLng(lat, lon);
            }
        }
        console.warn("Failed to parse POINT string:", pointStr);
        return null;
    };

    // Utility to parse POLYGON string: "POLYGON((lat1 lon1, lat2 lon2, ...))"
    const parsePolygonString = (polygonStr: string): L.LatLng[] | null => {
        const match = polygonStr.match(/POLYGON\(\s*\(\s*(.+?)\s*\)\s*\)/i);
        if (match && match.length === 2) {
            const coordPairs = match[1].split(/\s*,\s*/);
            const latLngs: L.LatLng[] = [];
            for (const pair of coordPairs) {
            const parts = pair.split(/\s+/);
            if (parts.length === 2) {
                const lat = parseFloat(parts[0]);
                const lon = parseFloat(parts[1]);
                if (!isNaN(lat) && !isNaN(lon)) {
                latLngs.push(L.latLng(lat, lon));
                } else {
                console.warn("Invalid coordinate pair in POLYGON:", pair);
                return null; 
                }
            } else {
                console.warn("Invalid format for coordinate pair in POLYGON:", pair);
                return null;
            }
            }
            if (latLngs.length >= 3) {
            return latLngs;
            } else {
            console.warn("Polygon string resulted in too few points:", polygonStr);
            return null;
            }
        }
        console.warn("Failed to parse POLYGON string:", polygonStr);
        return null;
    };

    useEffect(() => {
        if (!featureGroupRef.current || !map) return;

        featureGroupRef.current.clearLayers();
        let boundsToFit: L.LatLngBounds | null = null;
        let shapeDrawn = false;

        if (currentMode === 'cuttingArea' && initialCuttingArea) {
            const latLngs = parsePolygonString(initialCuttingArea);
            if (latLngs) {
            const polygon = L.polygon(latLngs);
            featureGroupRef.current.addLayer(polygon);
            boundsToFit = polygon.getBounds();
            shapeDrawn = true;
            }
        } else if (currentMode === 'dropOffPoint' && initialDropOffPoint) {
            const latLng = parsePointString(initialDropOffPoint);
            if (latLng) {
            const marker = L.marker(latLng);
            featureGroupRef.current.addLayer(marker);
            boundsToFit = L.latLngBounds(latLng, latLng);
            shapeDrawn = true;
            }
        } else if (currentMode === 'homeBase' && initialHomeBase) {
            const latLng = parsePointString(initialHomeBase);
            if (latLng) {
            const marker = L.marker(latLng);
            featureGroupRef.current.addLayer(marker);
            boundsToFit = L.latLngBounds(latLng, latLng);
            shapeDrawn = true;
            }
        }

        if (boundsToFit && boundsToFit.isValid()) {
            map.fitBounds(boundsToFit, { padding: [50, 50], maxZoom: 16 });
        } else if (!shapeDrawn && map.getZoom() !== defaultZoom) { // Only reset if no valid shape drawn and not already at default
            // Check if map is already at default to avoid unnecessary view reset
            const currentCenter = map.getCenter();
            if (currentCenter.lat !== (defaultPosition as L.LatLngTuple)[0] || currentCenter.lng !== (defaultPosition as L.LatLngTuple)[1] || map.getZoom() !== defaultZoom) {
                 // map.setView(defaultPosition, defaultZoom); // Decided against auto-resetting view to default, could be jarring.
            }
        }
    }, [currentMode, initialCuttingArea, initialDropOffPoint, initialHomeBase, map, featureGroupRef, defaultPosition, defaultZoom]); // Added defaultPosition and defaultZoom as dependencies


    const _onCreated = (e: any) => {
        if (!featureGroupRef.current) return;

        featureGroupRef.current.clearLayers(); 
        const layer = e.layer;
        featureGroupRef.current.addLayer(layer);

        const type = e.layerType;

        if (type === "marker") {
        const latLng: L.LatLng = layer.getLatLng();
        const formattedCoords = `POINT(${latLng.lat.toFixed(6)} ${latLng.lng.toFixed(6)})`;
        if (currentMode === "dropOffPoint") {
            onSetDropOffPoint(formattedCoords);
        } else if (currentMode === "homeBase") {
            onSetHomeBase(formattedCoords);
        }
        } else if (type === "polygon") {
        const latLngsLeaflet: L.LatLng[] = layer.getLatLngs()[0]; // For simple polygons
        if (latLngsLeaflet.length > 2) {
            let coordsString = "POLYGON((";
            const points = latLngsLeaflet.map(
            (ll) => `${ll.lat.toFixed(6)} ${ll.lng.toFixed(6)}`
            );
            coordsString += points.join(", ");
            coordsString += `, ${points[0]}))`; // Close the polygon
            if (currentMode === "cuttingArea") {
            onSetCuttingArea(coordsString);
            }
        }
        }
    };

    const drawOptions = {
        polygon: currentMode === 'cuttingArea' ? {
        allowIntersection: false,
        drawError: { color: "#e1e100", message: "Error!" },
        shapeOptions: { color: "#97009c" },
        } : false,
        marker: currentMode === 'dropOffPoint' || currentMode === 'homeBase',
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
    };
    
    return (
        <>
            <FeatureGroup ref={featureGroupRef}>
                <EditControl
                position="topright"
                onCreated={_onCreated}
                onDeleted={() => { 
                    if (featureGroupRef.current) featureGroupRef.current.clearLayers();
                    if (currentMode === 'cuttingArea') onSetCuttingArea("");
                    else if (currentMode === 'dropOffPoint') onSetDropOffPoint("");
                    else if (currentMode === 'homeBase') onSetHomeBase("");
                }}
                draw={drawOptions}
                edit={{
                    featureGroup: featureGroupRef.current!,
                    edit: false, 
                    remove: true, 
                }}
                />
            </FeatureGroup>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </>
    );
};
          onCreated={_onCreated}
          onDeleted={() => { // Also clear form field if a shape is deleted by user (if delete is enabled)
            if (featureGroupRef.current) featureGroupRef.current.clearLayers();
            if (currentMode === 'cuttingArea') onSetCuttingArea("");
            else if (currentMode === 'dropOffPoint') onSetDropOffPoint("");
            else if (currentMode === 'homeBase') onSetHomeBase("");
          }}
          draw={drawOptions}
          edit={{
            featureGroup: featureGroupRef.current!,
            edit: false, 
            remove: true, // Enable remove to allow user to clear their drawing
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default InteractiveMap;
