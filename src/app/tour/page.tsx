"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import UIOverlay from "@/components/tour/UIOverlay";
import type { TourViewerHandle } from "@/components/tour/TourViewer";

const TourViewer = dynamic(() => import("@/components/tour/TourViewer"), {
  ssr: false,
});

export default function TourPage() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const viewerRef = useRef<TourViewerHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        panoramaUrl="/glasshouse_interior_4k.hdr"
        autoRotate={autoRotate}
        activeHotspot={activeHotspot}
        onHotspotClick={handleHotspotClick}
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
      />
    </div>
  );
}
