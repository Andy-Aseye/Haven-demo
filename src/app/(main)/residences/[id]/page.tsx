"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import residences from "@/data/residences";
import UIOverlay from "@/components/tour/UIOverlay";
import type { TourViewerHandle } from "@/components/tour/TourViewer";

const TourViewer = dynamic(() => import("@/components/tour/TourViewer"), {
  ssr: false,
});

export default function ResidencePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const residence = residences.find((r) => r.id === id);

  const [tourOpen, setTourOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [tourResidenceId, setTourResidenceId] = useState(residence?.id ?? "");
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const viewerRef = useRef<TourViewerHandle>(null);
  const tourContainerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const openTour = useCallback(() => {
    setTourOpen(true);
    setAutoRotate(true);
    setActiveHotspot(null);
    setTourResidenceId(residence?.id ?? "");
    document.body.style.overflow = "hidden";
  }, [residence?.id]);

  const closeTour = useCallback(() => {
    setTourOpen(false);
    setActiveHotspot(null);
    setTourResidenceId(residence?.id ?? "");
    document.body.style.overflow = "";
  }, [residence?.id]);

  const handleNavigate = useCallback((targetId: string) => {
    if (isTransitioning || targetId === tourResidenceId) return;
    setIsTransitioning(true);
    setFadeOpacity(1);
    setActiveHotspot(null);
    setAutoRotate(true);
    setTimeout(() => {
      setTourResidenceId(targetId);
      setTimeout(() => {
        setFadeOpacity(0);
        setTimeout(() => setIsTransitioning(false), 400);
      }, 200);
    }, 400);
  }, [isTransitioning, tourResidenceId]);

  const handleHotspotClick = useCallback((id: string) => {
    setActiveHotspot((prev) => (prev === id ? null : id));
    setAutoRotate(false);
  }, []);

  const handleCloseHotspot = useCallback(() => {
    setActiveHotspot(null);
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (!tourContainerRef.current) return;
    if (!document.fullscreenElement) {
      tourContainerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && tourOpen) closeTour();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [tourOpen, closeTour]);

  if (!residence) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg-light)" }}>
        <p style={{ fontFamily: "var(--font-body)", color: "var(--color-text-muted)" }}>Residence not found.</p>
      </div>
    );
  }

  const tourResidence = residences.find((r) => r.id === tourResidenceId) ?? residence;

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: "var(--color-bg-light)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          paddingTop: "80px",
        }}
        className="residence-detail-grid"
      >
        {/* ─── Left: Sticky Image ───────────────────── */}
        <div
          style={{
            position: "sticky",
            top: "80px",
            height: "calc(100vh - 80px)",
            overflow: "hidden",
          }}
        >
          <Image
            src={residence.image}
            alt={residence.name}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="50vw"
          />
          {/* Gradient overlay for depth */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(14,13,12,0.5) 0%, transparent 50%)",
            }}
          />
          {/* Price badge */}
          <div
            style={{
              position: "absolute",
              bottom: "2rem",
              left: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "0.25rem",
              }}
            >
              Starting from
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "2.5rem",
                fontWeight: 300,
                color: "#fff",
                lineHeight: 1,
              }}
            >
              ${residence.pricePerNight.toLocaleString()}
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.6)",
                  marginLeft: "0.4rem",
                }}
              >
                / night
              </span>
            </p>
          </div>
        </div>

        {/* ─── Right: Scrollable Details ─────────────── */}
        <div
          style={{
            padding: "3rem 3.5rem 5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0",
          }}
        >
          {/* Back link */}
          <button
            onClick={() => router.push("/#residences")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              textTransform: "uppercase",
              marginBottom: "3rem",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All Residences
          </button>

          {/* Room name */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "0.75rem",
            }}
          >
            Haven Residence
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 4vw, 3.75rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-text-dark)",
              lineHeight: 1.1,
              marginBottom: "0.75rem",
            }}
          >
            {residence.name}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              marginBottom: "2.5rem",
              fontStyle: "italic",
            }}
          >
            {residence.tagline}
          </p>

          <div
            style={{
              width: "40px",
              height: "1px",
              background: "var(--color-accent)",
              marginBottom: "2.5rem",
              opacity: 0.6,
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              color: "var(--color-text-dark)",
              lineHeight: 1.8,
              marginBottom: "3rem",
              opacity: 0.8,
            }}
          >
            {residence.description}
          </p>

          {/* Specs grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0",
              border: "1px solid rgba(26,25,22,0.1)",
              borderRadius: "12px",
              overflow: "hidden",
              marginBottom: "2.5rem",
            }}
          >
            {residence.specs.map((spec, i) => (
              <div
                key={spec.key}
                style={{
                  padding: "1.25rem 1.5rem",
                  borderBottom: i < residence.specs.length - 2 ? "1px solid rgba(26,25,22,0.08)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid rgba(26,25,22,0.08)" : "none",
                  background: "rgba(255,255,255,0.5)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {spec.key}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9375rem",
                    color: "var(--color-text-dark)",
                    fontWeight: 500,
                  }}
                >
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          {/* Amenities */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              marginBottom: "1rem",
            }}
          >
            Amenities
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "3.5rem",
            }}
          >
            {residence.amenities.map((amenity) => (
              <span
                key={amenity}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-dark)",
                  background: "rgba(26,25,22,0.05)",
                  border: "1px solid rgba(26,25,22,0.1)",
                  borderRadius: "2rem",
                  padding: "0.375rem 0.875rem",
                }}
              >
                {amenity}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={openTour}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 1.75rem",
                background: "var(--color-text-dark)",
                color: "#fff",
                border: "none",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                cursor: "pointer",
                transition: "opacity 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
              View 3D Tour
            </button>

            <a
              href="#reserve"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.6rem",
                padding: "1rem 1.75rem",
                background: "transparent",
                color: "var(--color-text-dark)",
                border: "1px solid rgba(26,25,22,0.2)",
                borderRadius: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                textDecoration: "none",
                transition: "border-color 200ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(26,25,22,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(26,25,22,0.2)"; }}
            >
              Reserve Now
            </a>
          </div>
        </div>
      </div>

      {/* ─── 3D Tour Overlay ───────────────────────── */}
      {tourOpen && (
        <div
          ref={tourContainerRef}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
          }}
        >
          <TourViewer
            ref={viewerRef}
            panoramaUrl={tourResidence.panoramaUrl}
            hotspots={tourResidence.hotspots}
            navHotspots={tourResidence.navHotspots}
            onNavigate={handleNavigate}
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
            hotspots={tourResidence.hotspots}
            sceneName={tourResidence.name}
          />

          {/* Suite transition fade overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#000",
              opacity: fadeOpacity,
              transition: "opacity 0.4s ease",
              pointerEvents: isTransitioning ? "all" : "none",
              zIndex: 10000,
            }}
          />

          {/* Close button */}
          <button
            onClick={closeTour}
            style={{
              position: "absolute",
              top: "1.25rem",
              left: "1.25rem",
              zIndex: 10001,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "2rem",
              padding: "0.5rem 1rem 0.5rem 0.75rem",
              color: "#fff",
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.04em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to {residence.name}
          </button>
        </div>
      )}

      {/* Mobile stack styles */}
      <style>{`
        @media (max-width: 768px) {
          .residence-detail-grid {
            grid-template-columns: 1fr !important;
            padding-top: 80px !important;
          }
          .residence-detail-grid > div:first-child {
            position: relative !important;
            top: auto !important;
            height: 60vw !important;
          }
        }
      `}</style>
    </>
  );
}
