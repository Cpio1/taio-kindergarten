"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  as?: "div" | "li" | "article";
};

/** Айналдыру кезінде жұмсақ пайда болу (prefers-reduced-motion қолдауымен) */
export default function Reveal({ children, className, delay = 0, from = "up", as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const offsets = {
    up: { y: 24 },
    left: { x: -28 },
    right: { x: 28 },
    scale: { scale: 0.94 },
  } as const;
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.65, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
