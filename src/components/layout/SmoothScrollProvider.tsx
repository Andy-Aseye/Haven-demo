"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createLenis } from "@/lib/lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Disable browser scroll restoration so it doesn't fight Lenis
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  // Jump to top synchronously on every route change
  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const lenis = createLenis();
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
