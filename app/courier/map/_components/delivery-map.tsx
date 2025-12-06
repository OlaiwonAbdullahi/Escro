"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export interface DeliveryPoint {
  id: string;
  type: "pickup" | "dropoff" | "courier";
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  status?: "pending" | "active" | "completed";
  isUrgent?: boolean;
  estimatedTime?: string;
  earnings?: string;
  phone?: string;
}

interface DeliveryMapProps {
  deliveries: DeliveryPoint[];
  courierLocation?: [number, number];
  onMarkerClick?: (delivery: DeliveryPoint) => void;
  selectedDeliveryId?: string | null;
  showRoute?: boolean;
  className?: string;
}

const DeliveryMap = ({
  deliveries,
  courierLocation,
  onMarkerClick,
  selectedDeliveryId,
  showRoute = true,
  className = "",
}: DeliveryMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const courierMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Create custom marker elements
  const createMarkerElement = useCallback(
    (delivery: DeliveryPoint, isSelected: boolean) => {
      const el = document.createElement("div");
      el.className = "delivery-marker";

      const isPickup = delivery.type === "pickup";
      const isUrgent = delivery.isUrgent;
      const isCompleted = delivery.status === "completed";

      // Base styles
      el.style.cssText = `
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 4px 14px -3px rgba(0,0,0,0.3);
      transform: ${isSelected ? "scale(1.2)" : "scale(1)"};
      z-index: ${isSelected ? 100 : 10};
    `;

      // Color based on type and status
      let bgColor: string;
      let iconColor: string;

      if (isCompleted) {
        bgColor = "#10b981";
        iconColor = "#ffffff";
      } else if (isUrgent) {
        bgColor = "#ef4444";
        iconColor = "#ffffff";
      } else if (isPickup) {
        bgColor = "#3b82f6";
        iconColor = "#ffffff";
      } else {
        bgColor = "#10b981";
        iconColor = "#ffffff";
      }

      el.style.backgroundColor = bgColor;

      // Add inner icon
      const inner = document.createElement("div");
      inner.innerHTML = isPickup
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`;

      el.appendChild(inner);

      // Add pulse animation for urgent or selected
      if (isUrgent || isSelected) {
        el.style.animation = "pulse 2s infinite";
      }

      // Add label
      const label = document.createElement("div");
      label.className = "marker-label";
      label.textContent = delivery.name;
      label.style.cssText = `
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 4px;
      padding: 4px 8px;
      background: white;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #1f2937;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      opacity: ${isSelected ? 1 : 0};
      transition: opacity 0.2s;
      pointer-events: none;
    `;
      el.appendChild(label);

      // Show label on hover
      el.addEventListener("mouseenter", () => {
        label.style.opacity = "1";
      });
      el.addEventListener("mouseleave", () => {
        if (!isSelected) label.style.opacity = "0";
      });

      return el;
    },
    []
  );

  // Create courier marker
  const createCourierMarker = useCallback(() => {
    const el = document.createElement("div");
    el.className = "courier-marker";
    el.style.cssText = `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3), 0 4px 14px -3px rgba(0,0,0,0.3);
    animation: courierPulse 2s infinite;
    z-index: 1000;
  `;

    const inner = document.createElement("div");
    inner.innerHTML = `
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="2"></circle>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
    </svg>
  `;
    el.appendChild(inner);

    // Add "You" label
    const label = document.createElement("div");
    label.textContent = "You";
    label.style.cssText = `
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 6px;
    padding: 4px 12px;
    background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    border-radius: 12px;
    font-size: 11px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  `;
    el.appendChild(label);

    return el;
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Default center (Lagos, Nigeria)
    const defaultCenter: [number, number] = [3.3792, 6.5244];
    const center = courierLocation || defaultCenter;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/positron",
      center: center,
      zoom: 13,
      pitch: 0,
      attributionControl: false,
    });

    // Add navigation controls
    map.current.addControl(
      new maplibregl.NavigationControl({
        visualizePitch: true,
        showCompass: true,
        showZoom: true,
      }),
      "top-right"
    );

    // Add scale
    map.current.addControl(
      new maplibregl.ScaleControl({
        maxWidth: 100,
        unit: "metric",
      }),
      "bottom-left"
    );

    // Add geolocate control
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        showUserHeading: true,
      }),
      "top-right"
    );

    // Add fullscreen control
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.current.on("load", () => {
      setMapLoaded(true);

      // Add route source and layer for potential routing
      if (map.current) {
        map.current.addSource("route", {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: [],
            },
          },
        });

        map.current.addLayer({
          id: "route",
          type: "line",
          source: "route",
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#10b981",
            "line-width": 5,
            "line-opacity": 0.8,
          },
        });

        // Add route outline for better visibility
        map.current.addLayer(
          {
            id: "route-outline",
            type: "line",
            source: "route",
            layout: {
              "line-join": "round",
              "line-cap": "round",
            },
            paint: {
              "line-color": "#059669",
              "line-width": 8,
              "line-opacity": 0.3,
            },
          },
          "route"
        );
      }
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [courierLocation]);

  // Update markers when deliveries change
  useEffect(() => {
    if (!map.current || !mapLoaded) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add delivery markers
    deliveries.forEach((delivery) => {
      if (delivery.type === "courier") return; // Skip courier, handled separately

      const isSelected = selectedDeliveryId === delivery.id;
      const el = createMarkerElement(delivery, isSelected);

      const marker = new maplibregl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat(delivery.coordinates)
        .addTo(map.current!);

      // Add click handler
      el.addEventListener("click", () => {
        onMarkerClick?.(delivery);
      });

      markersRef.current.push(marker);
    });

    // Update route if showing
    if (showRoute && deliveries.length > 0) {
      const routeCoordinates = deliveries
        .filter((d) => d.type !== "courier")
        .map((d) => d.coordinates);

      if (courierLocation) {
        routeCoordinates.unshift(courierLocation);
      }

      if (routeCoordinates.length >= 2) {
        const routeSource = map.current.getSource(
          "route"
        ) as maplibregl.GeoJSONSource;
        if (routeSource) {
          routeSource.setData({
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: routeCoordinates,
            },
          });
        }
      }
    }
  }, [
    deliveries,
    mapLoaded,
    selectedDeliveryId,
    showRoute,
    courierLocation,
    onMarkerClick,
    createMarkerElement,
  ]);

  // Update courier marker
  useEffect(() => {
    if (!map.current || !mapLoaded || !courierLocation) return;

    if (courierMarkerRef.current) {
      courierMarkerRef.current.setLngLat(courierLocation);
    } else {
      const el = createCourierMarker();
      courierMarkerRef.current = new maplibregl.Marker({
        element: el,
        anchor: "center",
      })
        .setLngLat(courierLocation)
        .addTo(map.current);
    }
  }, [courierLocation, mapLoaded, createCourierMarker]);

  // Fit bounds to show all markers
  const fitBounds = useCallback(() => {
    if (!map.current || deliveries.length === 0) return;

    const coordinates = deliveries.map((d) => d.coordinates);
    if (courierLocation) {
      coordinates.push(courierLocation);
    }

    if (coordinates.length === 1) {
      map.current.flyTo({
        center: coordinates[0],
        zoom: 15,
        duration: 1000,
      });
    } else {
      const bounds = coordinates.reduce(
        (bounds, coord) => bounds.extend(coord as maplibregl.LngLatLike),
        new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
      );

      map.current.fitBounds(bounds, {
        padding: { top: 100, bottom: 100, left: 50, right: 50 },
        duration: 1000,
      });
    }
  }, [deliveries, courierLocation]);

  // Expose fitBounds through a custom event
  useEffect(() => {
    const handleFitBounds = () => fitBounds();
    window.addEventListener("fitMapBounds", handleFitBounds);
    return () => window.removeEventListener("fitMapBounds", handleFitBounds);
  }, [fitBounds]);

  // Initial fit bounds
  useEffect(() => {
    if (mapLoaded && deliveries.length > 0) {
      setTimeout(fitBounds, 500);
    }
  }, [mapLoaded, deliveries.length, fitBounds]);

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            box-shadow: 0 4px 14px -3px rgba(0, 0, 0, 0.3);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 8px 25px -5px rgba(0, 0, 0, 0.4);
          }
        }

        @keyframes courierPulse {
          0%,
          100% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3),
              0 4px 14px -3px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(16, 185, 129, 0.1),
              0 4px 14px -3px rgba(0, 0, 0, 0.3);
          }
        }

        .maplibregl-ctrl-group {
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 4px 20px -4px rgba(0, 0, 0, 0.15) !important;
        }

        .maplibregl-ctrl-group button {
          width: 36px !important;
          height: 36px !important;
        }

        .maplibregl-ctrl-geolocate {
          border-radius: 12px !important;
        }

        .maplibregl-ctrl-fullscreen {
          border-radius: 12px !important;
        }
      `}</style>
      <div
        ref={mapContainer}
        className={`w-full h-full rounded-xl overflow-hidden ${className}`}
        style={{ minHeight: "400px" }}
      />
    </>
  );
};

export default DeliveryMap;
