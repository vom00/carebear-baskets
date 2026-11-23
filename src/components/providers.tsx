"use client";

import { MotionConfig } from "motion/react";

// Every Motion animation on the site honours the visitor's reduced-motion setting.
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
