"use client";

export default function AvailabilityFloater() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 90,
        width: "90%",
        maxWidth: "1024px",
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "3rem",
        padding: "0.75rem 1rem 0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        color: "#fff", // assuming dark background or text with shadow
      }}
    >
      {/* Arrival */}
      <div style={{ display: "flex", flexDirection: "column", paddingLeft: "1rem", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 400 }}>Arrival</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", opacity: 0.9 }}>July 13, 2026</span>
      </div>

      <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.3)" }} />

      {/* Departure */}
      <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 400 }}>Departure</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", opacity: 0.9 }}>July 14, 2026</span>
      </div>

      <div style={{ width: "1px", height: "40px", background: "rgba(255,255,255,0.3)" }} />

      {/* Guests */}
      <div style={{ display: "flex", flexDirection: "column", paddingRight: "1rem" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "1.125rem", fontWeight: 400 }}>Guests</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", opacity: 0.9 }}>1 adult, 0 children, 1 room</span>
      </div>

      {/* Check availability button */}
      <button
        style={{
          background: "#B19F68", // goldish accent
          color: "#fff",
          border: "none",
          borderRadius: "2rem",
          padding: "1rem 2rem",
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "background 200ms",
        }}
      >
        Check availability
      </button>
    </div>
  );
}
