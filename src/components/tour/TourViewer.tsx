"use client";

import { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef, Suspense } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import * as THREE from "three";
import Hotspot from "./Hotspot";
import NavArrow from "./NavArrow";
import type { ResidenceHotspot } from "@/data/residences";
import type { NavHotspot } from "@/data/tourScenes";

// ─── HDR Panorama Sphere ────────────────────────────────────
function PanoramaSphere({ url }: { url: string }) {
  const texture = useLoader(RGBELoader, url);
  const { gl } = useThree();

  useEffect(() => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
  }, [texture, gl]);

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
function LoadingOverlay() {
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
        Loading Environment…
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

  // Reset loading state whenever the panorama changes
  useEffect(() => {
    setIsLoading(true);
  }, [panoramaUrl]);

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
      {isLoading && <LoadingOverlay />}
      <Canvas
        camera={{ position: [0, 0, 0.1], fov: 75, near: 0.01, far: 1000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
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
