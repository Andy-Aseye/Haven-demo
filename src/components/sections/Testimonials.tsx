"use client";

import { useState, useCallback, useEffect } from "react";
import SectionLabel from "@/components/ui/SectionLabel";

const testimonials = [
  {
    id: 1,
    quote:
      "I have stayed at the finest hotels across four continents. Haven redefined what luxury means to me — it is not abundance, it is presence.",
    author: "Adaeze O.",
    origin: "Lagos, Nigeria",
  },
  {
    id: 2,
    quote:
      "The silence here is extraordinary. We arrived exhausted and left restored. Every member of the team understands the art of being helpful without intruding.",
    author: "Laurent & Marie B.",
    origin: "Paris, France",
  },
  {
    id: 3,
    quote:
      "An act of genius — to build something this refined on the Ghanaian coast. Haven proves that world-class luxury can be rooted in place and culture.",
    author: "James W.",
    origin: "London, UK",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);

  const advance = useCallback(() => {
    setFading(true);
    setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
      setFading(false);
    }, 300);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const goTo = (index: number) => {
    if (index === active) return;
    setFading(true);
    setTimeout(() => {
      setActive(index);
      setFading(false);
    }, 300);
  };

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      style={{
        backgroundColor: "var(--color-bg-light)",
        padding: "8rem 2.5rem",
        borderTop: "1px solid rgba(26,25,22,0.08)",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <SectionLabel>Guest Voices</SectionLabel>

        <div
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 300ms ease",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-text-dark)",
              lineHeight: 1.5,
              marginBottom: "2rem",
            }}
          >
            &ldquo;{current.quote}&rdquo;
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-dark)",
              marginBottom: "0.25rem",
            }}
          >
            {current.author}
          </p>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
            }}
          >
            {current.origin}
          </p>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2.5rem",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                border: "none",
                cursor: "pointer",
                background: i === active ? "var(--color-accent)" : "var(--color-text-muted)",
                height: "6px",
                width: i === active ? "24px" : "6px",
                borderRadius: "3px",
                padding: 0,
                transition: "width 300ms ease, background 300ms ease",
                opacity: i === active ? 1 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
