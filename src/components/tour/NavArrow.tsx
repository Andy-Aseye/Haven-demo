"use client";

import { useRef, useCallback } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { NavHotspot } from "@/data/tourScenes";

interface NavArrowProps {
  data: NavHotspot;
  onClick: (targetSceneId: string) => void;
}

export default function NavArrow({ data, onClick }: NavArrowProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);

  const handleClick = useCallback(
    (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation();
      onClick(data.targetSceneId);
    },
    [data.targetSceneId, onClick]
  );

  useFrame((_, delta) => {
    if (ringRef.current) {
      pulseRef.current += delta * 1.8;
      const scale = 1 + Math.sin(pulseRef.current) * 0.25;
      ringRef.current.scale.setScalar(scale);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.25 + Math.sin(pulseRef.current) * 0.15;
    }
  });

  return (
    <group position={data.position}>
      {/* Invisible click target */}
      <mesh
        onClick={handleClick}
        onPointerOver={() => { document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Pulsing ground ring in brand gold */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.2, 32]} />
        <meshBasicMaterial color="#C9A96E" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>

      {/* HTML arrow + label — always faces camera */}
      <Html center distanceFactor={14} style={{ pointerEvents: "auto", userSelect: "none" }}>
        <div
          onClick={() => onClick(data.targetSceneId)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            cursor: "pointer",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.12) translateY(-4px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1) translateY(0)"; }}
        >
          {/* Chevron circle */}
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "rgba(201, 169, 110, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(201, 169, 110, 0.65)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(201, 169, 110, 0.25), 0 4px 16px rgba(0,0,0,0.4)",
            }}
          >
            {/* Upward chevron — "go this way" */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M5 14L11 8L17 14"
                stroke="#C9A96E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Room name pill */}
          <span
            style={{
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "0.65rem",
              fontWeight: 600,
              color: "#fff",
              background: "rgba(0, 0, 0, 0.55)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              padding: "0.2rem 0.65rem",
              borderRadius: "1rem",
              whiteSpace: "nowrap",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              border: "1px solid rgba(201, 169, 110, 0.25)",
            }}
          >
            {data.label}
          </span>
        </div>
      </Html>
    </group>
  );
}
