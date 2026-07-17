"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Text reveal
    if (textRef.current) {
      gsap.from(textRef.current.children, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });
    }

    // Cards stagger
    if (cardsRef.current) {
      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <section ref={sectionRef} style={{ backgroundColor: "#fff", color: "#111", padding: "8rem 2.5rem" }}>
      <div style={{ width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", gap: "6rem" }}>
        
        {/* Main Text Area */}
        <div ref={textRef} style={{ maxWidth: "80vw", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 500,
              lineHeight: 1.4,
              color: "#333",
              margin: "0 0 3rem 0",
            }}
          >
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, color: "#111" }}>
              Unmatched Experiences —
            </span>{" "}
            We believe a retreat is only as good as its surroundings. If you can dream it, you can experience it. From tranquil spa treatments to exhilarating mountain hikes and efficient personalized services, we cover the entire spectrum of relaxation.
          </p>
          
          {/* Sub-text features */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#666",
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            Luxury spa / Guided hikes / Fine dining / Wellness programs / Private tours
          </p>
        </div>

        {/* Card Carousel Area */}
        <div
          ref={cardsRef}
          style={{
            display: "flex",
            gap: "2rem",
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "1rem 0 2rem",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              minWidth: "350px",
              flex: "1 0 350px",
              height: "450px",
              borderRadius: "2rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
            }}
          >
            <Image 
              src="/feature_wellness.png" 
              alt="Wellness & Spa" 
              fill 
              style={{ objectFit: "cover" }} 
            />
            {/* Gradient Overlay for text readability */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)" }} />
            <h3
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                margin: 0,
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Wellness & Spa
            </h3>
          </div>

          {/* Card 2 */}
          <div
            style={{
              minWidth: "350px",
              flex: "1 0 350px",
              height: "450px",
              borderRadius: "2rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", // fallback gradient
            }}
          >
            {/* Using the same image as placeholder for now, or just gradient if image fails */}
            <Image 
              src="/feature_wellness.png" 
              alt="Outdoor Adventures" 
              fill 
              style={{ objectFit: "cover", filter: "hue-rotate(90deg)" }} // Trick to make it look different
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)" }} />
            <h3
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                margin: 0,
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Outdoor Adventures
            </h3>
          </div>

          {/* Card 3 */}
          <div
            style={{
              minWidth: "350px",
              flex: "1 0 350px",
              height: "450px",
              borderRadius: "2rem",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)", // fallback gradient
            }}
          >
            <Image 
              src="/feature_wellness.png" 
              alt="Culinary Excellence" 
              fill 
              style={{ objectFit: "cover", filter: "saturate(1.5) sepia(0.2)" }} // Trick to make it look different
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)" }} />
            <h3
              style={{
                position: "absolute",
                bottom: "2rem",
                left: "2rem",
                margin: 0,
                color: "#fff",
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                fontWeight: 500,
              }}
            >
              Culinary Excellence
            </h3>
          </div>
        </div>

      </div>
    </section>
  );
}
