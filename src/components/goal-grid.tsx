"use client";

import { motion } from "motion/react";
import { goal } from "@/lib/site";

const cell = {
  off: { scale: 0 },
  on: { scale: 1, transition: { type: "spring" as const, stiffness: 500, damping: 22 } },
};

// One cell per basket; the funded ones pop in with a spring when the grid scrolls into view.
export function GoalGrid() {
  const { funded, total } = goal;
  return (
    <motion.div
      className="cells"
      role="progressbar"
      aria-label="Baskets funded"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={funded}
      aria-valuetext={`${funded} of ${total} baskets funded`}
      initial="off"
      whileInView="on"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ on: { transition: { staggerChildren: 0.014 } } }}
    >
      {Array.from({ length: total }, (_, i) =>
        i < funded ? (
          <motion.span key={i} className="is-filled" variants={cell} />
        ) : (
          <span key={i} />
        ),
      )}
    </motion.div>
  );
}
