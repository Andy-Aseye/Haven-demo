"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const parallaxDivRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Image parallax
    if (parallaxDivRef.current && imageWrapperRef.current) {
      gsap.to(parallaxDivRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Text reveal
    if (textBlockRef.current) {
      gsap.from(textBlockRef.current.children, {
        scrollTrigger: {
          trigger: textBlockRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#fff", width: "100%" }}>
      {/* Full Height Image Block */}
      <div ref={imageWrapperRef} style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
        <div ref={parallaxDivRef} style={{ position: "absolute", top: "-10%", left: 0, width: "100%", height: "120%" }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/dining.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Text Block */}
      <div
        ref={textBlockRef}
        style={{
          width: "100%",
          maxWidth: "90vw",
          margin: "0 auto",
          padding: "6rem 2.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "4rem",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        {/* Left Column: Title */}
        <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 500,
              color: "#111",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Holistic Wellness
            <br />& Rejuvenation
          </h2>
        </div>

        {/* Right Column: Paragraph */}
        <div style={{ flex: "1 1 500px", maxWidth: "600px" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 400,
              color: "#111",
              lineHeight: 1.5,
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Haven contributes to your ultimate well-being through curated, immersive
            experiences—combining conceptual tranquility with applied practices from
            global wellness traditions. Engagements are tailored to complement your
            lifestyle and can take the form of private yoga sessions, intensive spa
            therapies, or integrated nature excursions.
          </p>
        </div>
      </div>
    </section>
  );
}
