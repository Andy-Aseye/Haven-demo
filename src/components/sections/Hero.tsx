"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function Hero() {
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const frenchTextRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    // Content reveal
    const tl = gsap.timeline({ delay: 0.5 });
    if (headlineRef.current) {
      tl.from(headlineRef.current, { opacity: 0, y: 32, duration: 1.2, ease: "power3.out" });
    }
    if (frenchTextRef.current) {
      tl.from(frenchTextRef.current, { opacity: 0, y: 20, duration: 1, ease: "power2.out" }, "-=0.8");
    }
    if (subtextRef.current) {
      tl.from(
        subtextRef.current,
        { opacity: 0, y: 20, duration: 1, ease: "power2.out" },
        "-=0.6"
      );
    }

    // Parallax scroll effect
    if (videoRef.current && imageWrapperRef.current) {
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        backgroundColor: "#fff", // Framed with white background
        padding: "5rem 1rem 1rem 1rem", // reduced padding to expand container
        display: "flex",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "14px",
          overflow: "hidden",
        }}
        ref={imageWrapperRef}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://res.cloudinary.com/dhxwwwqt8/video/upload/so_0/v1784542992/new-lux_odchdt.jpg"
          style={{
            position: "absolute",
            width: "100%",
            height: "130%", // Taller to allow parallax without cutting off
            objectFit: "cover",
            top: "-15%", // Offset for parallax
            left: 0,
          }}
        >
          <source
            src="https://res.cloudinary.com/dhxwwwqt8/video/upload/f_webm,q_auto/v1784542992/new-lux_odchdt.webm"
            type="video/webm"
          />
          <source
            src="https://res.cloudinary.com/dhxwwwqt8/video/upload/q_auto/v1784542992/new-lux_odchdt.mp4"
            type="video/mp4"
          />
        </video>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.3)", // subtle overlay to make text readable
          }}
        />
        
        {/* Left Aligned Content */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            textAlign: "left",
            padding: "0 4rem",
          }}
        >
          <h1
            ref={headlineRef}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "#fff",
              marginBottom: "0.5rem",
              maxWidth: "800px",
            }}
          >
            A tale <span style={{ fontStyle: "italic" }}>of</span> excellence and<br />sustainability
          </h1>
          
          <p
            ref={frenchTextRef}
            style={{
              fontFamily: "'Cookie', cursive",
              fontSize: "clamp(2rem, 3vw, 2rem)",
              color: "#e8e6e3ff",
              margin: 0,
              fontWeight: 400,
            }}
          >
            L'élégance du calme absolu
          </p>
        </div>

        {/* Bottom Left Location */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "4rem",
          }}
        >
          <p
            ref={subtextRef}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.9)",
              letterSpacing: "0.05em",
            }}
          >
            Accra, Ghana
          </p>
        </div>
      </div>
    </section>
  );
}
