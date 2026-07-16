"use client";

import React, { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

interface AnimatedTextProps {
  children: string;
  as?: keyof React.JSX.IntrinsicElements;
  trigger?: string;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedText({
  children,
  as: Tag = "p",
  trigger,
  delay = 0,
  className,
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    const split = new SplitText(ref.current, { type: "words" });
    const tween = gsap.from(split.words, {
      y: 30,
      opacity: 0,
      stagger: 0.04,
      duration: 0.7,
      delay,
      ease: "power2.out",
      scrollTrigger: trigger
        ? {
            trigger: ref.current,
            start: trigger,
          }
        : undefined,
    });
    return () => {
      tween.kill();
      split.revert();
    };
  }, []);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
