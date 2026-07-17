"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { gsap, useGSAP } from "@/lib/gsap";

export default function SnapshotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const dataPanelRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Top block text reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    if (headlineRef.current) {
      tl.from(headlineRef.current, { opacity: 0, y: 30, duration: 1, ease: "power3.out" });
    }
    if (paragraphRef.current) {
      tl.from(paragraphRef.current, { opacity: 0, y: 20, duration: 0.8, ease: "power2.out" }, "-=0.6");
    }

    // Number counter animation
    if (countRef.current) {
      gsap.fromTo(
        countRef.current,
        { innerHTML: "0" },
        {
          innerHTML: "200",
          duration: 2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dataPanelRef.current,
            start: "top 80%",
          },
          snap: { innerHTML: 1 },
          onUpdate: function () {
            // Keep it as integer
            if (countRef.current) {
              countRef.current.innerHTML = Math.ceil(this.targets()[0].innerHTML).toString();
            }
          },
        }
      );
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#fff", color: "#111", padding: "6rem 2.5rem" }}>
      <div style={{ width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
        
        {/* Top Block */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "flex-start" }}>
          {/* Left: Headline */}
          <div style={{ flex: "1 1 400px" }}>
            <h2
              ref={headlineRef}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              One serene location,
              <br />
              boundless tranquility,
              <br />
              limitless rejuvenation.
            </h2>
          </div>

          {/* Right: Text & Button */}
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "2.5rem" }}>
            <p
              ref={paragraphRef}
              style={{
                fontFamily: "var(--font-display)", // using display font for that sleek, bold look
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Our retreat fuels relaxation, wellness, and self-discovery. Across our expansive private grounds, guests push boundaries in personal wellness, shaping a better future for themselves and connecting deeply with nature.
            </p>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                background: "#f0f0f0",
                color: "#111",
                border: "none",
                borderRadius: "2rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#e0e0e0")}
              onMouseOut={(e) => (e.currentTarget.style.background = "#f0f0f0")}
            >
              Explore Wellness Programs
              <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>
        </div>

        {/* Subtle Divider */}
        <hr style={{ border: "none", borderTop: "1px solid #eaeaea", margin: 0, width: "100%" }} />

        {/* Bottom Block */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "4rem" }}>
          {/* Left: Snapshot Title and Button */}
          <div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2vw, 2rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Resort Snapshot
            </h2>
            
            <button
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "transparent",
                color: "#111",
                border: "1px solid #e0e0e0",
                borderRadius: "2rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: 500,
                cursor: "pointer",
                marginTop: "auto",
                alignSelf: "flex-start",
                transition: "border-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = "#111")}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
            >
              View Full Map
              <ArrowUpRight size={16} weight="bold" />
            </button>
          </div>

          {/* Right: Data Panel */}
          <div
            ref={dataPanelRef}
            style={{
              flex: "2 1 600px",
              borderLeft: "1px solid #eaeaea",
              paddingLeft: "clamp(1rem, 4vw, 4rem)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Panel Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4rem" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 600 }}>
                Haven Luxury Retreat, Inc. (HLR)
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-body)", fontSize: "0.75rem" }}>
                <span style={{ background: "#e8f0fe", color: "#1967d2", padding: "0.125rem 0.375rem", borderRadius: "0.25rem", fontWeight: 600 }}>
                  Private
                </span>
                <span style={{ fontWeight: 500, color: "#666" }}>Estate</span>
              </div>
            </div>

            {/* Huge Number */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem" }}>
              <div style={{ display: "flex", alignItems: "baseline" }}>
                <span
                  ref={countRef}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(6rem, 15vw, 12rem)",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  200
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "#666",
                    marginLeft: "1rem",
                  }}
                >
                  ACRES
                </span>
              </div>
            </div>

            {/* Panel Footer Stats */}
            <div style={{ borderTop: "1px solid #eaeaea", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
              {[
                { label: "YEARLY AVG TEMP", value: "72°F" },
                { label: "GUEST CAPACITY", value: "85 Max" },
                { label: "NATURE TRAILS", value: "15+ Miles" },
                { label: "LAST RENOVATION", value: "3 Months ago" },
              ].map((stat, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.05em", color: "#666" }}>
                    {stat.label}
                  </span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", fontWeight: 500 }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
