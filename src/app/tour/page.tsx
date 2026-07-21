"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import UIOverlay from "@/components/tour/UIOverlay";
import type { TourViewerHandle } from "@/components/tour/TourViewer";
import tourScenes from "@/data/tourScenes";

const TourViewer = dynamic(() => import("@/components/tour/TourViewer"), {
  ssr: false,
});

export default function TourPage() {
  const [currentSceneId, setCurrentSceneId] = useState<string>("lobby");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const viewerRef = useRef<TourViewerHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentScene = tourScenes.find((s) => s.id === currentSceneId) ?? tourScenes[0];

  const handleNavigate = useCallback((targetSceneId: string) => {
    if (isTransitioning || targetSceneId === currentSceneId) return;

    setIsTransitioning(true);
    setFadeOpacity(1);
    setActiveHotspot(null);
    setAutoRotate(true);

    setTimeout(() => {
      setCurrentSceneId(targetSceneId);
      setTimeout(() => {
        setFadeOpacity(0);
        setTimeout(() => setIsTransitioning(false), 400);
      }, 200);
    }, 400);
  }, [isTransitioning, currentSceneId]);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
    setAutoRotate(false);
  }, []);

  const handleCloseHotspot = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#0a0a0a" }}
    >
      <TourViewer
        ref={viewerRef}
        panoramaUrl={currentScene.panoramaUrl}
        navHotspots={currentScene.navHotspots}
        autoRotate={autoRotate}
        activeHotspot={activeHotspot}
        onHotspotClick={handleHotspotClick}
        onNavigate={handleNavigate}
      />

      <UIOverlay
        activeHotspot={activeHotspot}
        onCloseHotspot={handleCloseHotspot}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate((prev) => !prev)}
        onZoomIn={() => viewerRef.current?.zoomIn()}
        onZoomOut={() => viewerRef.current?.zoomOut()}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        sceneName={currentScene.label}
        scenes={tourScenes}
        currentSceneId={currentSceneId}
        onNavigate={handleNavigate}
      />

      {/* Scene transition fade overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "#000",
          opacity: fadeOpacity,
          transition: "opacity 0.4s ease",
          pointerEvents: isTransitioning ? "all" : "none",
          zIndex: 100,
        }}
      />
    </div>
  );
}
