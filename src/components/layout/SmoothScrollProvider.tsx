"use client";

import { useEffect } from "react";
import { createLenis } from "@/lib/lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = createLenis();
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
