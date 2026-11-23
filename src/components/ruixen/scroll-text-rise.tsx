"use client";

import { FC, ReactNode, useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

interface ScrollTextRiseProps {
  text: string;
  className?: string;
  /** Text size classes */
  textClassName?: string;
}

// Carebear edit: driven by the page scroll (no nested scroll box), and the
// words inherit the text colour instead of hard-coded black/white.
const ScrollTextRise: FC<ScrollTextRiseProps> = ({
  text,
  className,
  textClassName,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  return (
    <div ref={containerRef} className={cn("relative h-[220vh]", className)}>
      <div className="h-full">
        <div className="sticky top-0 mx-auto flex h-svh max-w-4xl flex-col items-center justify-center">
          <p
            className={cn(
              "flex flex-wrap justify-center p-5 text-center text-xl font-medium sm:text-3xl md:p-8 md:text-[2rem] lg:p-10 lg:text-[2.5rem] xl:text-[3.1rem]",
              textClassName,
            )}
          >
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 0.03;
              return (
                <RevealWord
                  key={`${i}-${word}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {word}
                </RevealWord>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}

const RevealWord: FC<RevealWordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const reduce = useReducedMotion();

  return (
    <span className="relative mx-1 overflow-hidden lg:mx-2.5 xl:mx-3">
      <span className="absolute opacity-30" aria-hidden="true">
        {children}
      </span>
      <motion.span
        style={reduce ? undefined : { opacity, y }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
};

export { ScrollTextRise };
