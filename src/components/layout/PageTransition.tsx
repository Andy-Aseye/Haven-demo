"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(() => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 0.3,
      onComplete: () => setDone(true),
    });
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        backgroundColor: "var(--color-bg-dark)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          letterSpacing: "0.3em",
          color: "var(--color-text-primary)",
          fontWeight: 300,
          textTransform: "uppercase",
        }}
      >
        Haven
      </span>
    </div>
  );
}
