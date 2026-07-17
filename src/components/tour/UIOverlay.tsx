"use client";

import { useRef, useEffect, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ArrowLeft,
  Maximize,
  Minimize,
  MapPin,
} from "lucide-react";
import defaultHotspots from "@/data/tourHotspots";
import type { ResidenceHotspot } from "@/data/residences";
import Link from "next/link";

interface UIOverlayProps {
  activeHotspot: string | null;
  onCloseHotspot: () => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  hotspots?: ResidenceHotspot[];
  sceneName?: string;
}

export default function UIOverlay({
  activeHotspot,
  onCloseHotspot,
  autoRotate,
  onToggleAutoRotate,
  onZoomIn,
  onZoomOut,
  isFullscreen,
  onToggleFullscreen,
  hotspots = defaultHotspots,
  sceneName = "Glasshouse Interior",
}: UIOverlayProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sidebarContentRef = useRef<HTMLDivElement>(null);

  const hotspotData: ResidenceHotspot | undefined = activeHotspot
    ? hotspots.find((h) => h.id === activeHotspot)
    : undefined;

  useEffect(() => {
    if (!sidebarRef.current) return;
    if (activeHotspot && hotspotData) {
      gsap.to(sidebarRef.current, { x: 0, duration: 0.6, ease: "power3.out" });
      if (sidebarContentRef.current) {
        gsap.from(sidebarContentRef.current.children, {
          y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power2.out", delay: 0.2,
        });
      }
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.4, ease: "power3.in" });
    }
  }, [activeHotspot, hotspotData]);

  const controlBtnStyle: React.CSSProperties = {
    width: "40px", height: "40px", borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)",
    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.2s ease",
    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
  };

  const handleControlHover = useCallback((e: React.MouseEvent, entering: boolean) => {
    const target = e.currentTarget as HTMLElement;
    target.style.background = entering ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)";
    target.style.borderColor = entering ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.15)";
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none" }}>
      {/* ─── Header Bar ──────────────────────────────── */}
      <header
        style={{
          position: "absolute", top: "1.25rem", left: "1.25rem", right: "1.25rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          pointerEvents: "auto", zIndex: 20,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            color: "#fff", textDecoration: "none",
            fontFamily: "var(--font-body, sans-serif)", fontSize: "0.875rem", fontWeight: 500,
            padding: "0.5rem 1rem", borderRadius: "2rem",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.2s ease",
          }}
        >
          <ArrowLeft size={16} />
          Haven
        </Link>

        <div
          style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 1.25rem", borderRadius: "2rem",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontFamily: "var(--font-body, sans-serif)",
            fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em",
          }}
        >
          <MapPin size={14} />
          {sceneName}
        </div>

        <div
          style={{
            padding: "0.5rem 1rem", borderRadius: "2rem",
            background: "rgba(0,0,0,0.3)", backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-body, sans-serif)",
            fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase",
          }}
        >
          {hotspots.length} Points of Interest
        </div>
      </header>

      {/* ─── Control Bar ─────────────────────────────── */}
      <div
        style={{
          position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem",
          borderRadius: "2rem", background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.1)", pointerEvents: "auto",
        }}
      >
        <button onClick={onZoomIn} style={controlBtnStyle} title="Zoom In"
          onMouseEnter={(e) => handleControlHover(e, true)} onMouseLeave={(e) => handleControlHover(e, false)}>
          <ZoomIn size={18} />
        </button>
        <button onClick={onZoomOut} style={controlBtnStyle} title="Zoom Out"
          onMouseEnter={(e) => handleControlHover(e, true)} onMouseLeave={(e) => handleControlHover(e, false)}>
          <ZoomOut size={18} />
        </button>
        <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.15)", margin: "0 0.25rem" }} />
        <button onClick={onToggleAutoRotate}
          style={{ ...controlBtnStyle, background: autoRotate ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)", borderColor: autoRotate ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)" }}
          title={autoRotate ? "Stop Rotation" : "Auto Rotate"}
          onMouseEnter={(e) => handleControlHover(e, true)} onMouseLeave={(e) => handleControlHover(e, false)}>
          <RotateCcw size={18} />
        </button>
        <button onClick={onToggleFullscreen} style={controlBtnStyle} title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          onMouseEnter={(e) => handleControlHover(e, true)} onMouseLeave={(e) => handleControlHover(e, false)}>
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button>
      </div>

      {/* ─── Info Sidebar ────────────────────────────── */}
      <div
        ref={sidebarRef}
        style={{
          position: "absolute", top: 0, right: 0,
          width: "min(420px, 90vw)", height: "100%",
          transform: "translateX(100%)",
          background: "rgba(10, 10, 10, 0.55)", backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)", borderLeft: "1px solid rgba(255,255,255,0.08)",
          pointerEvents: "auto", overflowY: "auto", zIndex: 30,
        }}
      >
        {hotspotData && (
          <div ref={sidebarContentRef} style={{ padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
              <button
                onClick={onCloseHotspot}
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "1rem", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body, sans-serif)", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Point of Interest
            </div>

            <h2 style={{ fontFamily: "var(--font-display, sans-serif)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, color: "#fff", lineHeight: 1.15, marginBottom: "1.5rem", letterSpacing: "-0.02em" }}>
              {hotspotData.label}
            </h2>

            <p style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.9375rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6, marginBottom: "2.5rem" }}>
              {hotspotData.description}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2.5rem", padding: "1.5rem", borderRadius: "1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {hotspotData.metadata.map((meta, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: idx < hotspotData.metadata.length - 1 ? "1rem" : undefined, borderBottom: idx < hotspotData.metadata.length - 1 ? "1px solid rgba(255,255,255,0.06)" : undefined }}>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{meta.key}</span>
                  <span style={{ fontFamily: "var(--font-body, sans-serif)", fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.9)" }}>{meta.value}</span>
                </div>
              ))}
            </div>

            <button
              style={{ width: "100%", padding: "1rem", borderRadius: "0.75rem", background: "#fff", color: "#111", border: "none", fontFamily: "var(--font-body, sans-serif)", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.02em", cursor: "pointer", transition: "all 0.2s ease" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Schedule a Viewing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
