"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

interface ParallaxImageProps {
  src: string;
  alt: string;
  intensity?: number;
  priority?: boolean;
}

export default function ParallaxImage({
  src,
  alt,
  intensity = 20,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !innerRef.current) return;
    const tween = gsap.to(innerRef.current, {
      yPercent: intensity,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      if (tween.scrollTrigger) tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      style={{ overflow: "hidden", width: "100%", height: "100%", position: "relative" }}
    >
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          inset: 0,
          height: "120%",
          top: "-10%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
