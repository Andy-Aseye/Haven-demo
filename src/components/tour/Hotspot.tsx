"use client";

import { useRef, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { ResidenceHotspot } from "@/data/residences";
import * as THREE from "three";

interface HotspotProps {
  data: ResidenceHotspot;
  isActive: boolean;
  onClick: (id: string) => void;
}

export default function Hotspot({ data, isActive, onClick }: HotspotProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick(data.id);
    },
    [data.id, onClick]
  );

  useFrame((_, delta) => {
    if (ringRef.current) {
      pulseRef.current += delta * 2;
      const scale = 1 + Math.sin(pulseRef.current) * 0.3;
      ringRef.current.scale.setScalar(scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.4 + Math.sin(pulseRef.current) * 0.2;
    }
  });

  return (
    <group position={data.position}>
      <mesh ref={meshRef} onClick={handleClick} onPointerOver={() => { document.body.style.cursor = "pointer"; }} onPointerOut={() => { document.body.style.cursor = "default"; }}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.35, 0.45, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      <Html center distanceFactor={12} style={{ pointerEvents: "auto", userSelect: "none" }}>
        <div
          onClick={() => onClick(data.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isActive ? "0 0 20px rgba(255,255,255,0.4)" : "0 4px 16px rgba(0,0,0,0.2)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="8" y1="3" x2="8" y2="13" />
              <line x1="3" y1="8" x2="13" y2="8" />
            </svg>
          </div>
          <span
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "0.75rem",
              fontWeight: 500,
              color: "#fff",
              background: "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              padding: "0.25rem 0.625rem",
              borderRadius: "1rem",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
            }}
          >
            {data.label}
          </span>
        </div>
      </Html>
    </group>
  );
}
