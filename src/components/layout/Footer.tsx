"use client";
import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

const Column = ({ title, items }: { title: string; items: string[] }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", minWidth: "120px" }}>
    <h4 style={{ fontSize: "0.75rem", fontWeight: 600, marginBottom: "0.5rem" }}>{title}</h4>
    {items.map((item, idx) => (
      <span key={idx} style={{ fontSize: "0.875rem", opacity: 0.8, cursor: "pointer" }}>
        {item}
      </span>
    ))}
  </div>
);

export default function Footer() {
  const isMobile = useIsMobile();
  const footerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const middleSectionRef = useRef<HTMLDivElement>(null);
  const logoSectionRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      },
    });

    if (headlineRef.current) {
      tl.from(headlineRef.current, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" });
    }
    
    if (middleSectionRef.current) {
      tl.from(
        middleSectionRef.current.children,
        { opacity: 0, y: 20, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        "-=0.4"
      );
    }

    if (logoSectionRef.current) {
      tl.from(
        logoSectionRef.current.children,
        { opacity: 0, y: 30, duration: 1, stagger: 0.2, ease: "power3.out" },
        "-=0.4"
      );
    }

    if (bottomBarRef.current) {
      tl.from(bottomBarRef.current, { opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.2");
    }
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: "#16312a", // Dark green from reference
        color: "#f0ecd3", // Cream text color
        padding: isMobile ? "3rem 1.25rem 2rem" : "6rem 2.5rem 2rem",
        fontFamily: "var(--font-body)",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* Top Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            fontWeight: 400,
            maxWidth: "700px",
            marginBottom: "4rem",
            lineHeight: 1.2,
          }}
        >
          A sanctuary of quiet luxury on the Ghanaian coast.
        </h2>

        {/* Middle Sections (Columns + Button) */}
        <div
          ref={middleSectionRef}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(240,236,211,0.2)",
            paddingTop: "3rem",
            marginBottom: "6rem",
            gap: "3rem",
          }}
        >
          {/* 4 columns */}
          <div style={{ display: "flex", gap: isMobile ? "2rem" : "4rem", flexWrap: "wrap", flex: 1 }}>
            <Column title="Navigate" items={["Experience", "Residences", "Amenities", "Location"]} />
            <Column title="Contact" items={["info@havenresort.com", "+233 30 000 0000", "Labadi Beach, Accra, Ghana"]} />
            <Column title="Socials" items={["Instagram", "Twitter", "LinkedIn"]} />
            <Column title="Downloads" items={["Resort Brochure", "Press Kit"]} />
          </div>

          {/* Button */}
          <div>
            <button
              style={{
                border: "1px solid #f0ecd3",
                borderRadius: "2rem",
                padding: "0.875rem 1.75rem",
                background: "transparent",
                color: "#f0ecd3",
                fontSize: "0.75rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                whiteSpace: "nowrap",
                textTransform: "uppercase",
              }}
            >
              Join the Newsletter
            </button>
          </div>
        </div>

        {/* Bottom Large Logo & Graphic */}
        <div ref={logoSectionRef} style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", gap: "2rem", marginBottom: "3rem" }}>
          <Image
            src="/logo-v2.png"
            alt="Haven Icon"
            width={isMobile ? 72 : 120}
            height={isMobile ? 72 : 120}
            style={{
              objectFit: "contain",
              filter: "brightness(0) invert(1) sepia(1) hue-rotate(10deg) saturate(2)", // Attempt to match cream color
              opacity: 0.9,
            }}
          />
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: isMobile ? "clamp(2.5rem, 14vw, 8rem)" : "clamp(5rem, 18vw, 15rem)",
              fontWeight: 400,
              margin: 0,
              lineHeight: 0.8,
              letterSpacing: "-0.02em",
            }}
          >
            Haven
          </h1>
        </div>

        {/* Very Bottom Bar */}
        <div
          ref={bottomBarRef}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.75rem",
            borderTop: "1px solid rgba(240,236,211,0.2)",
            paddingTop: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
            opacity: 0.8,
          }}
        >
          <span>Website by Rubicx®</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top ↑
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span style={{ cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ cursor: "pointer" }}>General Information</span>
            <span style={{ cursor: "pointer" }}>Accessibility</span>
            <span style={{ cursor: "pointer" }}>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
