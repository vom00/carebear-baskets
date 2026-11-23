"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

// Rolls from 0 to `to` the first time it scrolls into view. The real number is
// in the HTML for screen readers and search engines from the start.
export function CountUp({
  to,
  prefix,
  suffix,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.8 });
  return (
    <>
      <span className="sr-only">
        {prefix}
        {to.toLocaleString("en-US")}
        {suffix}
      </span>
      <AnimatedCounter
        ref={ref}
        aria-hidden
        value={seen ? to : 0}
        prefix={prefix}
        suffix={suffix}
        duration={1.1}
      />
    </>
  );
}
