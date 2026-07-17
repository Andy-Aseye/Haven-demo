import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

export function createLenis(): Lenis {
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  return lenis;
}
