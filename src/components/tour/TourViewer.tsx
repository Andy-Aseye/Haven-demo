"use client";

import { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Hotspot from "./Hotspot";
import NavArrow from "./NavArrow";
import type { ResidenceHotspot } from "@/data/residences";
import type { NavHotspot } from "@/data/tourScenes";

// ─── HDR Panorama Sphere ────────────────────────────────────
function PanoramaSphere({ url }: { url: string }) {
  const texture = useLoader(THREE.TextureLoader, url);

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[50, 128, 128]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

// ─── Auto-Rotate Controller ─────────────────────────────────
function Controls({
  autoRotate,
  controlsRef,
}: {
  autoRotate: boolean;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
}) {
  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={0.1}
      maxDistance={100}
      minPolarAngle={0.3}
      maxPolarAngle={Math.PI - 0.3}
      dampingFactor={0.12}
      rotateSpeed={-0.3}
      zoomSpeed={0.8}
      autoRotate={autoRotate}
      autoRotateSpeed={0.4}
      makeDefault
    />
  );
}

// ─── Scene Content ──────────────────────────────────────────
function SceneContent({
  panoramaUrl,
  autoRotate,
  activeHotspot,
  onHotspotClick,
  onNavigate,
  controlsRef,
  onLoaded,
  hotspots,
  navHotspots,
}: {
  panoramaUrl: string;
  autoRotate: boolean;
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
  onNavigate: (targetSceneId: string) => void;
  controlsRef: React.RefObject<React.ComponentRef<typeof OrbitControls> | null>;
  onLoaded: () => void;
  hotspots: ResidenceHotspot[];
  navHotspots: NavHotspot[];
}) {
  useEffect(() => {
    const timer = setTimeout(onLoaded, 300);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <>
      <Controls autoRotate={autoRotate} controlsRef={controlsRef} />
      <PanoramaSphere url={panoramaUrl} />
      {hotspots.map((hotspot) => (
        <Hotspot
          key={hotspot.id}
          data={hotspot}
          isActive={activeHotspot === hotspot.id}
          onClick={onHotspotClick}
        />
      ))}
      {navHotspots.map((nav) => (
        <NavArrow key={nav.id} data={nav} onClick={onNavigate} />
      ))}
    </>
  );
}

// ─── Loading Screen ─────────────────────────────────────────
function LoadingOverlay({ progress }: { progress: number }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        gap: "1.5rem",
      }}
    >
      {/* Progress bar along the top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.08)" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "rgba(255,255,255,0.75)",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "2px solid rgba(255,255,255,0.1)",
          borderTop: "2px solid rgba(255,255,255,0.8)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <p
        style={{
          fontFamily: "var(--font-body, sans-serif)",
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.6)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Loading Environment{progress > 0 ? ` — ${Math.round(progress)}%` : "…"}
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// ─── Exported TourViewer ────────────────────────────────────
export interface TourViewerHandle {
  zoomIn: () => void;
  zoomOut: () => void;
}

const TourViewer = forwardRef<
  TourViewerHandle,
  {
    panoramaUrl: string;
    hotspots?: ResidenceHotspot[];
    navHotspots?: NavHotspot[];
    autoRotate: boolean;
    activeHotspot: string | null;
    onHotspotClick: (id: string) => void;
    onNavigate?: (targetSceneId: string) => void;
    onLoaded?: () => void;
  }
>(function TourViewer(
  { panoramaUrl, hotspots = [], navHotspots = [], autoRotate, activeHotspot, onHotspotClick, onNavigate, onLoaded },
  ref
) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // Reset loading state whenever the panorama changes
  useEffect(() => {
    setIsLoading(true);
    setProgress(0);
  }, [panoramaUrl]);

  // Animate fake progress bar while loading (climbs to ~85%, waits for real load)
  useEffect(() => {
    if (!isLoading) { setProgress(100); return; }
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 85) { clearInterval(interval); return 85; }
        return Math.min(prev + Math.random() * 5, 85);
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isLoading, panoramaUrl]);

  const handleLoaded = useCallback(() => {
    setIsLoading(false);
    onLoaded?.();
  }, [onLoaded]);

  useImperativeHandle(ref, () => ({
    zoomIn: () => {
      const controls = controlsRef.current;
      if (controls) {
        const camera = controls.object as THREE.PerspectiveCamera;
        camera.fov = Math.max(camera.fov - 5, 30);
        camera.updateProjectionMatrix();
      }
    },
    zoomOut: () => {
      const controls = controlsRef.current;
      if (controls) {
        const camera = controls.object as THREE.PerspectiveCamera;
        camera.fov = Math.min(camera.fov + 5, 100);
        camera.updateProjectionMatrix();
      }
    },
  }));

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {isLoading && <LoadingOverlay progress={progress} />}
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75, near: 0.01, far: 1000 }}
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContent
            key={panoramaUrl}
            panoramaUrl={panoramaUrl}
            autoRotate={autoRotate}
            activeHotspot={activeHotspot}
            onHotspotClick={onHotspotClick}
            onNavigate={onNavigate ?? (() => {})}
            controlsRef={controlsRef}
            onLoaded={handleLoaded}
            hotspots={hotspots}
            navHotspots={navHotspots}
          />
        </Suspense>
      </Canvas>
    </div>
  );
});

export default TourViewer;
