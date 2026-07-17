"use client";

import { RefObject } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

export { useGSAP, gsap, ScrollTrigger };

// Legacy hook — preserved for backward compatibility
export function useFadeInUp(
  ref: RefObject<HTMLElement | null>,
  options?: { delay?: number; start?: string }
) {
  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: options?.delay ?? 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: options?.start ?? "top 85%",
        },
      });
    },
    { scope: ref }
  );
}

// Stagger reveal hook for lists/grids
export function useStaggerReveal(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  options?: { start?: string; stagger?: number; y?: number }
) {
  useGSAP(
    () => {
      if (!containerRef.current) return;
      const items = containerRef.current.querySelectorAll(selector);
      if (!items.length) return;
      gsap.from(items, {
        y: options?.y ?? 40,
        opacity: 0,
        stagger: options?.stagger ?? 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: options?.start ?? "top 85%",
        },
      });
    },
    { scope: containerRef }
  );
}
