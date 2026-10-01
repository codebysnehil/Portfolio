"use client";

import React from "react";
import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

// Fade + rise + de-blur as it enters the viewport.
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// Glowing line that draws itself across the top of a section.
export function SectionLine() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, ease }}
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        width: "min(1072px, calc(100% - 48px))",
        marginLeft: "calc(min(1072px, calc(100% - 48px)) / -2)",
        height: 1,
        transformOrigin: "left",
        background:
          "linear-gradient(90deg, var(--accent), rgba(var(--accent-rgb), 0.15) 60%, transparent)",
      }}
    />
  );
}
